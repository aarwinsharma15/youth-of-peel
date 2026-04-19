import React, { useState } from 'react';
import { supabase } from '@/api/supabaseClient';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { Plus, Trash2, X, Pencil } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import { toast } from 'sonner';

export default function AdminHiring() {
  const queryClient = useQueryClient();
  const [showForm, setShowForm] = useState(false);
  const [editId, setEditId] = useState(null);
  const [form, setForm] = useState({ title: '', description: '', requirements: '', application_link: '', is_open: true, order: 0 });

  const { data: positions } = useQuery({
    queryKey: ['positions-all'],
    queryFn: async () => {
      const { data } = await supabase.from('hiringposition').select('*').order('order', { ascending: true }).limit(100);
      return data || [];
    },
    initialData: [],
  });

  const createMutation = useMutation({
    mutationFn: async (data) => {
      const { error } = await supabase.from('hiringposition').insert(data);
      if (error) throw error;
      return true;
    },
    onSuccess: () => { queryClient.invalidateQueries({ queryKey: ['positions-all'] }); resetForm(); toast.success('Position added'); },
  });

  const updateMutation = useMutation({
    mutationFn: async ({ id, data }) => {
      const { error } = await supabase.from('hiringposition').update(data).eq('id', id);
      if (error) throw error;
      return true;
    },
    onSuccess: () => { queryClient.invalidateQueries({ queryKey: ['positions-all'] }); resetForm(); toast.success('Position updated'); },
  });

  const deleteMutation = useMutation({
    mutationFn: async (id) => {
      const { error } = await supabase.from('hiringposition').delete().eq('id', id);
      if (error) throw error;
      return true;
    },
    onSuccess: () => { queryClient.invalidateQueries({ queryKey: ['positions-all'] }); toast.success('Position deleted'); },
  });

  const resetForm = () => { setShowForm(false); setEditId(null); setForm({ title: '', description: '', requirements: '', application_link: '', is_open: true, order: 0 }); };

  const startEdit = (p) => {
    setEditId(p.id);
    setForm({ title: p.title, description: p.description || '', requirements: p.requirements || '', application_link: p.application_link || '', is_open: p.is_open !== false, order: p.order || 0 });
    setShowForm(true);
  };

  const handleSubmit = () => {
    if (editId) updateMutation.mutate({ id: editId, data: form });
    else createMutation.mutate(form);
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <h1 className="font-heading text-2xl font-bold text-white">Hiring Positions</h1>
        <Button onClick={() => { resetForm(); setShowForm(true); }} className="bg-kinetic hover:bg-kinetic/90">
          <Plus size={16} className="mr-2" /> Add Position
        </Button>
      </div>

      {showForm && (
        <div className="bg-navy/80 rounded-xl p-6 border border-white/10 mb-8">
          <div className="flex justify-between items-center mb-4">
            <h3 className="font-heading font-semibold text-white">{editId ? 'Edit' : 'New'} Position</h3>
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
            <div>
              <label className="text-white/60 text-xs block mb-1">Requirements</label>
              <Textarea value={form.requirements} onChange={(e) => setForm({ ...form, requirements: e.target.value })} rows={2} className="bg-navy border-white/10 text-white" />
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="text-white/60 text-xs block mb-1">Application Link (must start with https://)</label>
                <Input value={form.application_link} onChange={(e) => setForm({ ...form, application_link: e.target.value })} onBlur={(e) => { const v = e.target.value; if (v && !v.startsWith('http')) setForm(f => ({ ...f, application_link: 'https://' + v })); }} placeholder="https://..." className="bg-navy border-white/10 text-white" />
              </div>
              <div>
                <label className="text-white/60 text-xs block mb-1">Order</label>
                <Input type="number" value={form.order} onChange={(e) => setForm({ ...form, order: Number(e.target.value) })} className="bg-navy border-white/10 text-white" />
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Switch checked={form.is_open} onCheckedChange={(v) => setForm({ ...form, is_open: v })} />
              <span className="text-white/60 text-sm">Position is open</span>
            </div>
            <Button onClick={handleSubmit} disabled={!form.title} className="bg-kinetic hover:bg-kinetic/90">
              {editId ? 'Update' : 'Create'} Position
            </Button>
          </div>
        </div>
      )}

      <div className="space-y-3">
        {positions.map((p) => (
          <div key={p.id} className="bg-navy/80 rounded-xl p-4 border border-white/5 flex items-center gap-4">
            <div className={`w-3 h-3 rounded-full ${p.is_open !== false ? 'bg-green-400' : 'bg-white/20'}`} />
            <div className="flex-1 min-w-0">
              <h3 className="text-white font-heading font-semibold text-sm truncate">{p.title}</h3>
              <p className="text-white/40 text-xs">{p.is_open !== false ? 'Open' : 'Closed'}</p>
            </div>
            <div className="flex gap-2">
              <button onClick={() => startEdit(p)} className="text-white/40 hover:text-kinetic"><Pencil size={14} /></button>
              <button onClick={() => deleteMutation.mutate(p.id)} className="text-white/40 hover:text-red-400"><Trash2 size={14} /></button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
