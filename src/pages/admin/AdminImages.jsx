import React, { useState } from 'react';
import { supabase } from '@/api/supabaseClient';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { Plus, Trash2, X, Pencil, Check } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import ImageUploader from '../../components/admin/ImageUploader';
import { toast } from 'sonner';

const EMPTY_FORM = { section: 'in_action', image_url: '', caption: '', badge: '', order: 0 };
const SECTIONS = ['hero', 'in_action', 'about', 'general'];

export default function AdminImages() {
  const queryClient = useQueryClient();
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState(EMPTY_FORM);
  // inline editing state: { [id]: { caption, badge, order } }
  const [editing, setEditing] = useState({});

  const { data: images } = useQuery({
    queryKey: ['siteImages'],
    queryFn: async () => {
      const { data } = await supabase.from('siteimage').select('*').order('section', { ascending: true }).limit(200);
      return data || [];
    },
    initialData: [],
  });

  const createMutation = useMutation({
    mutationFn: async (data) => {
      const { error } = await supabase.from('siteimage').insert(data);
      if (error) throw error;
      return true;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['siteImages'] });
      setShowForm(false);
      setForm(EMPTY_FORM);
      toast.success('Image added');
    },
  });

  const updateMutation = useMutation({
    mutationFn: async ({ id, data }) => {
      const { error } = await supabase.from('siteimage').update(data).eq('id', id);
      if (error) throw error;
      return true;
    },
    onSuccess: (_, { id }) => {
      queryClient.invalidateQueries({ queryKey: ['siteImages'] });
      setEditing(prev => { const n = { ...prev }; delete n[id]; return n; });
      toast.success('Image updated');
    },
  });

  const deleteMutation = useMutation({
    mutationFn: async (id) => {
      const { error } = await supabase.from('siteimage').delete().eq('id', id);
      if (error) throw error;
      return true;
    },
    onSuccess: () => { queryClient.invalidateQueries({ queryKey: ['siteImages'] }); toast.success('Image removed'); },
  });

  const startEdit = (img) => {
    setEditing(prev => ({
      ...prev,
      [img.id]: { caption: img.caption || '', badge: img.badge || '', order: img.order || 0 },
    }));
  };

  const saveEdit = (id) => {
    updateMutation.mutate({ id, data: editing[id] });
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <h1 className="font-heading text-2xl font-bold text-white">Site Images</h1>
        <Button onClick={() => { setShowForm(!showForm); setForm(EMPTY_FORM); }} className="bg-crimson hover:bg-ember">
          <Plus size={16} className="mr-2" /> Add Image
        </Button>
      </div>

      {showForm && (
        <div className="bg-ash rounded-xl p-6 border border-white/10 mb-8">
          <div className="flex justify-between items-center mb-4">
            <h3 className="font-heading font-semibold text-white">New Image</h3>
            <button onClick={() => setShowForm(false)} className="text-white/40 hover:text-white"><X size={18} /></button>
          </div>
          <div className="space-y-4">
            <div>
              <label className="text-white/60 text-xs block mb-1">Section</label>
              <Select value={form.section} onValueChange={(v) => setForm({ ...form, section: v })}>
                <SelectTrigger className="bg-ink border-white/10 text-white">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {SECTIONS.map(s => <SelectItem key={s} value={s}>{s}</SelectItem>)}
                </SelectContent>
              </Select>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label className="text-white/60 text-xs block mb-1">Caption</label>
                <Input value={form.caption} onChange={(e) => setForm({ ...form, caption: e.target.value })} className="bg-ink border-white/10 text-white" />
              </div>
              <div>
                <label className="text-white/60 text-xs block mb-1">Badge Label</label>
                <Input value={form.badge} onChange={(e) => setForm({ ...form, badge: e.target.value })} placeholder="e.g. Advocacy" className="bg-ink border-white/10 text-white" />
              </div>
              <div>
                <label className="text-white/60 text-xs block mb-1">Order</label>
                <Input type="number" value={form.order} onChange={(e) => setForm({ ...form, order: Number(e.target.value) })} className="bg-ink border-white/10 text-white" />
              </div>
            </div>
            <div className="flex items-center gap-4">
              <ImageUploader onUpload={(url) => setForm(prev => ({ ...prev, image_url: url }))} />
              {form.image_url && <img src={form.image_url} alt="" className="w-20 h-14 object-cover" />}
            </div>
            <Button onClick={() => createMutation.mutate(form)} disabled={!form.image_url} className="bg-crimson hover:bg-ember">
              Add Image
            </Button>
          </div>
        </div>
      )}

      {SECTIONS.map(section => {
        const sectionImages = images.filter(img => img.section === section);
        if (sectionImages.length === 0) return null;
        return (
          <div key={section} className="mb-10">
            <h2 className="font-heading font-semibold text-white/40 text-xs uppercase tracking-widest mb-4">{section.replace('_', ' ')}</h2>
            <div className="space-y-3">
              {sectionImages.map(img => {
                const isEditing = !!editing[img.id];
                const editData = editing[img.id] || {};
                return (
                  <div key={img.id} className="bg-ash border border-white/5 flex gap-4 p-3 items-start">
                    <img src={img.image_url} alt={img.caption || ''} className="w-28 h-20 object-cover flex-shrink-0" />
                    <div className="flex-1 min-w-0">
                      {isEditing ? (
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                          <div>
                            <label className="text-white/40 text-[10px] uppercase tracking-wider block mb-1">Caption</label>
                            <Input
                              value={editData.caption}
                              onChange={(e) => setEditing(prev => ({ ...prev, [img.id]: { ...prev[img.id], caption: e.target.value } }))}
                              className="bg-ink border-white/10 text-white text-xs h-8"
                            />
                          </div>
                          <div>
                            <label className="text-white/40 text-[10px] uppercase tracking-wider block mb-1">Badge</label>
                            <Input
                              value={editData.badge}
                              onChange={(e) => setEditing(prev => ({ ...prev, [img.id]: { ...prev[img.id], badge: e.target.value } }))}
                              className="bg-ink border-white/10 text-white text-xs h-8"
                            />
                          </div>
                          <div>
                            <label className="text-white/40 text-[10px] uppercase tracking-wider block mb-1">Order</label>
                            <Input
                              type="number"
                              value={editData.order}
                              onChange={(e) => setEditing(prev => ({ ...prev, [img.id]: { ...prev[img.id], order: Number(e.target.value) } }))}
                              className="bg-ink border-white/10 text-white text-xs h-8"
                            />
                          </div>
                        </div>
                      ) : (
                        <div>
                          <p className="text-white text-sm font-heading font-semibold truncate">{img.caption || <span className="text-white/20 italic">No caption</span>}</p>
                          {img.badge && <span className="inline-block mt-1 px-2 py-0.5 bg-crimson/20 text-crimson text-[10px] font-heading font-bold uppercase tracking-wider">{img.badge}</span>}
                          <p className="text-white/20 text-[10px] mt-1">Order: {img.order ?? 0}</p>
                        </div>
                      )}
                    </div>
                    <div className="flex gap-2 flex-shrink-0 pt-0.5">
                      {isEditing ? (
                        <>
                          <button onClick={() => saveEdit(img.id)} className="text-white/40 hover:text-green-400 transition-colors" title="Save">
                            <Check size={14} />
                          </button>
                          <button onClick={() => setEditing(prev => { const n = { ...prev }; delete n[img.id]; return n; })} className="text-white/40 hover:text-white transition-colors" title="Cancel">
                            <X size={14} />
                          </button>
                        </>
                      ) : (
                        <button onClick={() => startEdit(img)} className="text-white/40 hover:text-crimson transition-colors" title="Edit">
                          <Pencil size={14} />
                        </button>
                      )}
                      <button onClick={() => deleteMutation.mutate(img.id)} className="text-white/40 hover:text-red-400 transition-colors" title="Delete">
                        <Trash2 size={14} />
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        );
      })}
    </div>
  );
}
