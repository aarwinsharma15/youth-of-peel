import React, { useState } from 'react';
import { supabase } from '@/api/supabaseClient';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { Plus, Trash2, X, Pencil } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import ImageUploader from '../../components/admin/ImageUploader';
import { toast } from 'sonner';

export default function AdminTeam() {
  const queryClient = useQueryClient();
  const [showForm, setShowForm] = useState(false);
  const [editId, setEditId] = useState(null);
  const [form, setForm] = useState({ name: '', role: '', bio: '', image_url: '', order: 0 });

  const { data: team } = useQuery({
    queryKey: ['team'],
    queryFn: async () => {
      const { data } = await supabase.from('teammember').select('*').order('order', { ascending: true }).limit(100);
      return data || [];
    },
    initialData: [],
  });

  const createMutation = useMutation({
    mutationFn: async (data) => {
      const { error } = await supabase.from('teammember').insert(data);
      if (error) throw error;
      return true;
    },
    onSuccess: () => { queryClient.invalidateQueries({ queryKey: ['team'] }); resetForm(); toast.success('Member added'); },
  });

  const updateMutation = useMutation({
    mutationFn: async ({ id, data }) => {
      const { error } = await supabase.from('teammember').update(data).eq('id', id);
      if (error) throw error;
      return true;
    },
    onSuccess: () => { queryClient.invalidateQueries({ queryKey: ['team'] }); resetForm(); toast.success('Member updated'); },
  });

  const deleteMutation = useMutation({
    mutationFn: async (id) => {
      const { error } = await supabase.from('teammember').delete().eq('id', id);
      if (error) throw error;
      return true;
    },
    onSuccess: () => { queryClient.invalidateQueries({ queryKey: ['team'] }); toast.success('Member removed'); },
  });

  const resetForm = () => { setShowForm(false); setEditId(null); setForm({ name: '', role: '', bio: '', image_url: '', order: 0 }); };

  const startEdit = (m) => {
    setEditId(m.id);
    setForm({ name: m.name, role: m.role, bio: m.bio || '', image_url: m.image_url || '', order: m.order || 0 });
    setShowForm(true);
  };

  const handleSubmit = () => {
    if (editId) updateMutation.mutate({ id: editId, data: form });
    else createMutation.mutate(form);
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <h1 className="font-heading text-2xl font-bold text-white">Team Members</h1>
        <Button onClick={() => { resetForm(); setShowForm(true); }} className="bg-kinetic hover:bg-kinetic/90">
          <Plus size={16} className="mr-2" /> Add Member
        </Button>
      </div>

      {showForm && (
        <div className="bg-navy/80 rounded-xl p-6 border border-white/10 mb-8">
          <div className="flex justify-between items-center mb-4">
            <h3 className="font-heading font-semibold text-white">{editId ? 'Edit' : 'New'} Member</h3>
            <button onClick={resetForm} className="text-white/40 hover:text-white"><X size={18} /></button>
          </div>
          <div className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="text-white/60 text-xs block mb-1">Name *</label>
                <Input value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} className="bg-navy border-white/10 text-white" />
              </div>
              <div>
                <label className="text-white/60 text-xs block mb-1">Role *</label>
                <Input value={form.role} onChange={(e) => setForm({ ...form, role: e.target.value })} className="bg-navy border-white/10 text-white" />
              </div>
            </div>
            <div>
              <label className="text-white/60 text-xs block mb-1">Bio</label>
              <Textarea value={form.bio} onChange={(e) => setForm({ ...form, bio: e.target.value })} rows={2} className="bg-navy border-white/10 text-white" />
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="text-white/60 text-xs block mb-1">Order</label>
                <Input type="number" value={form.order} onChange={(e) => setForm({ ...form, order: Number(e.target.value) })} className="bg-navy border-white/10 text-white" />
              </div>
            </div>
            <div className="flex items-center gap-4">
              <ImageUploader onUpload={(url) => setForm(prev => ({ ...prev, image_url: url }))} />
              {form.image_url && <img src={form.image_url} alt="" className="w-16 h-16 rounded-full object-cover" />}
            </div>
            <Button onClick={handleSubmit} disabled={!form.name || !form.role} className="bg-kinetic hover:bg-kinetic/90">
              {editId ? 'Update' : 'Add'} Member
            </Button>
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {team.map((m) => (
          <div key={m.id} className="bg-navy/80 rounded-xl p-4 border border-white/5 flex items-center gap-4">
            <div className="w-14 h-14 rounded-full overflow-hidden flex-shrink-0 bg-white/10">
              {m.image_url ? (
                <img src={m.image_url} alt={m.name} className="w-full h-full object-cover" />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-white/20 font-heading font-bold text-lg">
                  {m.name?.charAt(0)}
                </div>
              )}
            </div>
            <div className="flex-1 min-w-0">
              <h3 className="text-white font-heading font-semibold text-sm truncate">{m.name}</h3>
              <p className="text-kinetic text-xs">{m.role}</p>
            </div>
            <div className="flex gap-2">
              <button onClick={() => startEdit(m)} className="text-white/40 hover:text-kinetic"><Pencil size={14} /></button>
              <button onClick={() => deleteMutation.mutate(m.id)} className="text-white/40 hover:text-red-400"><Trash2 size={14} /></button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
