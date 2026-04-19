import React, { useState } from 'react';
import { supabase } from '@/api/supabaseClient';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { Plus, Trash2, X, Pencil, Check, Play, Video } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import ImageUploader from '../../components/admin/ImageUploader';
import { toast } from 'sonner';

const EMPTY_FORM = { name: '', role: '', quote: '', video_url: '', thumbnail_url: '', order: 0 };

export default function AdminTestimonials() {
  const queryClient = useQueryClient();
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState(EMPTY_FORM);
  const [editing, setEditing] = useState({});

  const { data: testimonials } = useQuery({
    queryKey: ['testimonials'],
    queryFn: async () => {
      const { data } = await supabase.from('testimonial').select('*').order('order', { ascending: true }).limit(50);
      return data || [];
    },
    initialData: [],
  });

  const createMutation = useMutation({
    mutationFn: async (data) => {
      const { error } = await supabase.from('testimonial').insert(data);
      if (error) throw error;
      return true;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['testimonials'] });
      setShowForm(false);
      setForm(EMPTY_FORM);
      toast.success('Testimonial added');
    },
    onError: (err) => {
      console.error('Error saving testimonial:', err);
      toast.error('Failed to save: ' + err.message);
    }
  });

  const updateMutation = useMutation({
    mutationFn: async ({ id, data }) => {
      const { error } = await supabase.from('testimonial').update(data).eq('id', id);
      if (error) throw error;
      return true;
    },
    onSuccess: (_, { id }) => {
      queryClient.invalidateQueries({ queryKey: ['testimonials'] });
      setEditing(prev => { const n = { ...prev }; delete n[id]; return n; });
      toast.success('Testimonial updated');
    },
    onError: (err) => {
      toast.error('Update failed: ' + err.message);
    }
  });

  const deleteMutation = useMutation({
    mutationFn: async (id) => {
      const { error } = await supabase.from('testimonial').delete().eq('id', id);
      if (error) throw error;
      return true;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['testimonials'] });
      toast.success('Testimonial removed');
    },
  });

  return (
    <div className="max-w-6xl mx-auto">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="font-heading text-2xl font-bold text-white">Member Testimonials</h1>
          <p className="text-white/40 text-sm mt-1">Manage video stories for the Membership page.</p>
        </div>
        <Button onClick={() => setShowForm(!showForm)} className="bg-kinetic hover:bg-kinetic/90">
          <Plus size={16} className="mr-2" /> Add Story
        </Button>
      </div>

      {showForm && (
        <div className="bg-ash rounded-xl p-6 border border-white/10 mb-8 space-y-4">
          <div className="flex justify-between items-center mb-2">
            <h3 className="font-heading font-semibold text-white">New Testimonial</h3>
            <button onClick={() => setShowForm(false)} className="text-white/40 hover:text-white"><X size={18} /></button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="text-white/60 text-xs block mb-1">Name</label>
              <Input value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} className="bg-ink border-white/10 text-white" />
            </div>
            <div>
              <label className="text-white/60 text-xs block mb-1">Role/Title</label>
              <Input value={form.role} onChange={(e) => setForm({ ...form, role: e.target.value })} placeholder="e.g. Lead Volunteer" className="bg-ink border-white/10 text-white" />
            </div>
          </div>
          <div>
            <label className="text-white/60 text-xs block mb-1">Quote</label>
            <Textarea value={form.quote} onChange={(e) => setForm({ ...form, quote: e.target.value })} className="bg-ink border-white/10 text-white min-h-[80px]" />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="text-white/60 text-xs block mb-1">Video URL (YouTube/Vimeo)</label>
              <Input value={form.video_url} onChange={(e) => setForm({ ...form, video_url: e.target.value })} placeholder="https://youtube.com/watch?v=..." className="bg-ink border-white/10 text-white" />
            </div>
            <div>
              <label className="text-white/60 text-xs block mb-1">Order</label>
              <Input type="number" value={form.order} onChange={(e) => setForm({ ...form, order: Number(e.target.value) })} className="bg-ink border-white/10 text-white" />
            </div>
          </div>
          <div className="space-y-2">
            <label className="text-white/60 text-xs block">Thumbnail Image</label>
            <div className="flex items-center gap-4">
              <ImageUploader onUpload={(url) => setForm({ ...form, thumbnail_url: url })} />
              {form.thumbnail_url && <img src={form.thumbnail_url} alt="" className="w-24 h-16 object-cover rounded" />}
            </div>
          </div>
          <Button onClick={() => createMutation.mutate(form)} disabled={!form.name || !form.video_url} className="w-full bg-kinetic hover:bg-kinetic/90 mt-4">
            Save Testimonial
          </Button>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {testimonials.map(t => {
          const isEditing = !!editing[t.id];
          const editData = editing[t.id] || {};
          
          return (
            <div key={t.id} className="bg-ash border border-white/5 rounded-xl overflow-hidden group">
              <div className="aspect-video relative bg-ink">
                {t.thumbnail_url ? (
                  <img src={t.thumbnail_url} alt="" className="w-full h-full object-cover opacity-60" />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-white/10">
                    <Video size={48} />
                  </div>
                )}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center group-hover:bg-white/20 transition-colors">
                    <Play size={24} className="text-white fill-white ml-1" />
                  </div>
                </div>
              </div>
              <div className="p-5">
                {isEditing ? (
                  <div className="space-y-3">
                    <Input value={editData.name} onChange={(e) => setEditing(prev => ({ ...prev, [t.id]: { ...prev[t.id], name: e.target.value } }))} className="bg-ink border-white/10 text-white text-xs h-8" />
                    <Input value={editData.video_url} onChange={(e) => setEditing(prev => ({ ...prev, [t.id]: { ...prev[t.id], video_url: e.target.value } }))} className="bg-ink border-white/10 text-white text-xs h-8" />
                    <div className="flex gap-2 justify-end mt-2">
                      <Button onClick={() => updateMutation.mutate({ id: t.id, data: editData })} size="sm" className="h-7 px-3 bg-green-600 hover:bg-green-700">Apply</Button>
                      <Button onClick={() => setEditing(prev => { const n = { ...prev }; delete n[t.id]; return n; })} size="sm" variant="ghost" className="h-7 px-3 text-white/40 hover:text-white">Cancel</Button>
                    </div>
                  </div>
                ) : (
                  <>
                    <div className="flex justify-between items-start mb-2">
                      <div>
                        <h4 className="font-heading font-bold text-white mb-0.5">{t.name}</h4>
                        <p className="text-kinetic text-xs font-heading font-semibold uppercase tracking-wider">{t.role}</p>
                      </div>
                      <div className="flex gap-1">
                        <button onClick={() => setEditing(prev => ({ ...prev, [t.id]: { ...t } }))} className="p-1.5 text-white/20 hover:text-white transition-colors"><Pencil size={14} /></button>
                        <button onClick={() => deleteMutation.mutate(t.id)} className="p-1.5 text-white/20 hover:text-red-400 transition-colors"><Trash2 size={14} /></button>
                      </div>
                    </div>
                    <p className="text-white/50 text-sm italic font-body line-clamp-2">"{t.quote}"</p>
                  </>
                )}
              </div>
            </div>
          );
        })}
      </div>
      
      {testimonials.length === 0 && !showForm && (
        <div className="text-center py-20 bg-ash/50 border border-dashed border-white/10 rounded-2xl">
          <p className="text-white/20 font-heading">No testimonials added yet.</p>
        </div>
      )}
    </div>
  );
}
