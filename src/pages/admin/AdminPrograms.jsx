import React, { useState } from 'react';
import { supabase } from '@/api/supabaseClient';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { Plus, Trash2, X, Pencil } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import ImageUploader from '../../components/admin/ImageUploader';
import { toast } from 'sonner';

export default function AdminPrograms() {
  const queryClient = useQueryClient();
  const [showForm, setShowForm] = useState(false);
  const [editId, setEditId] = useState(null);
  const [form, setForm] = useState({ title: '', description: '', link: '', image_url: '', order: 0 });

  const { data: programs } = useQuery({
    queryKey: ['programs'],
    queryFn: async () => {
      const { data } = await supabase.from('program').select('*').order('order', { ascending: true }).limit(100);
      return data || [];
    },
    initialData: [],
  });

  const createMutation = useMutation({
    mutationFn: async (data) => {
      const { error } = await supabase.from('program').insert(data);
      if (error) throw error;
      return true;
    },
    onSuccess: () => { queryClient.invalidateQueries({ queryKey: ['programs'] }); resetForm(); toast.success('Program added'); },
  });

  const updateMutation = useMutation({
    mutationFn: async ({ id, data }) => {
      const { error } = await supabase.from('program').update(data).eq('id', id);
      if (error) throw error;
      return true;
    },
    onSuccess: () => { queryClient.invalidateQueries({ queryKey: ['programs'] }); resetForm(); toast.success('Program updated'); },
  });

  const deleteMutation = useMutation({
    mutationFn: async (id) => {
      const { error } = await supabase.from('program').delete().eq('id', id);
      if (error) throw error;
      return true;
    },
    onSuccess: () => { queryClient.invalidateQueries({ queryKey: ['programs'] }); toast.success('Program deleted'); },
  });

  const resetForm = () => {
    setShowForm(false);
    setEditId(null);
    setForm({ title: '', description: '', link: '', image_url: '', order: 0 });
  };

  const startEdit = (program) => {
    setEditId(program.id);
    setForm({ title: program.title, description: program.description || '', link: program.link || '', image_url: program.image_url || '', order: program.order || 0 });
    setShowForm(true);
  };

  const handleSubmit = () => {
    if (editId) {
      updateMutation.mutate({ id: editId, data: form });
    } else {
      createMutation.mutate(form);
    }
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <h1 className="font-heading text-2xl font-bold text-white">Programs</h1>
        <Button onClick={() => { resetForm(); setShowForm(true); }} className="bg-kinetic hover:bg-kinetic/90">
          <Plus size={16} className="mr-2" /> Add Program
        </Button>
      </div>

      {showForm && (
        <div className="bg-navy/80 rounded-xl p-6 border border-white/10 mb-8">
          <div className="flex justify-between items-center mb-4">
            <h3 className="font-heading font-semibold text-white">{editId ? 'Edit' : 'New'} Program</h3>
            <button onClick={resetForm} className="text-white/40 hover:text-white"><X size={18} /></button>
          </div>
          <div className="space-y-4">
            <div>
              <label className="text-white/60 text-xs block mb-1">Title *</label>
              <Input value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} className="bg-navy border-white/10 text-white" />
            </div>
            <div>
              <label className="text-white/60 text-xs block mb-1">Description</label>
              <Textarea value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} rows={3} className="bg-navy border-white/10 text-white" />
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="text-white/60 text-xs block mb-1">Link (must start with https://)</label>
                <Input value={form.link} onChange={(e) => setForm({ ...form, link: e.target.value })} onBlur={(e) => { const v = e.target.value; if (v && !v.startsWith('http')) setForm(f => ({ ...f, link: 'https://' + v })); }} placeholder="https://..." className="bg-navy border-white/10 text-white" />
              </div>
              <div>
                <label className="text-white/60 text-xs block mb-1">Order</label>
                <Input type="number" value={form.order} onChange={(e) => setForm({ ...form, order: Number(e.target.value) })} className="bg-navy border-white/10 text-white" />
              </div>
            </div>
            <div className="flex items-center gap-4">
              <ImageUploader onUpload={(url) => setForm(prev => ({ ...prev, image_url: url }))} />
              {form.image_url && <img src={form.image_url} alt="" className="w-16 h-16 rounded-lg object-cover" />}
            </div>
            <Button onClick={handleSubmit} disabled={!form.title} className="bg-kinetic hover:bg-kinetic/90">
              {editId ? 'Update' : 'Create'} Program
            </Button>
          </div>
        </div>
      )}

      <div className="space-y-3">
        {programs.map((p) => (
          <div key={p.id} className="bg-navy/80 rounded-xl p-4 border border-white/5 flex items-center gap-4">
            {p.image_url && <img src={p.image_url} alt={p.title} className="w-16 h-16 rounded-lg object-cover flex-shrink-0" />}
            <div className="flex-1 min-w-0">
              <h3 className="text-white font-heading font-semibold text-sm truncate">{p.title}</h3>
              {p.description && <p className="text-white/40 text-xs truncate">{p.description}</p>}
            </div>
            <div className="flex gap-2">
              <button onClick={() => startEdit(p)} className="text-white/40 hover:text-kinetic transition-colors"><Pencil size={14} /></button>
              <button onClick={() => deleteMutation.mutate(p.id)} className="text-white/40 hover:text-red-400 transition-colors"><Trash2 size={14} /></button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
