// @ts-nocheck
import React, { useState } from 'react';
import { supabase } from '@/api/supabaseClient';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { Plus, Trash2, X, Image, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { toast } from 'sonner';

const EMPTY_FORM = {
  name: '',
  role: '',
  quote: '',
  thumbnail_url: '',
  order: 0,
};

function MediaUploadButton({ onUpload, accept, label, icon: Icon }) {
  const [uploading, setUploading] = useState(false);

  const handleUpload = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const MAX_MB = 20;

    if (file.size > MAX_MB * 1024 * 1024) {
      toast.error(`File too large. Max size is ${MAX_MB}MB.`);
      e.target.value = '';
      return;
    }

    setUploading(true);

    try {
      const fileExt = file.name.split('.').pop();
      const fileName = `${Math.random()
        .toString(36)
        .substring(2)}-${Date.now()}.${fileExt}`;

      const filePath = `testimonials/thumbnails/${fileName}`;

      const { error } = await supabase.storage
        .from('public_assets')
        .upload(filePath, file);

      if (error) throw error;

      const {
        data: { publicUrl },
      } = supabase.storage.from('public_assets').getPublicUrl(filePath);

      onUpload(publicUrl);

      toast.success(`${label} uploaded successfully`);
    } catch (err) {
      console.error('UPLOAD ERROR:', err);
      toast.error(`Upload failed: ${err.message}`);
    } finally {
      setUploading(false);
      e.target.value = '';
    }
  };

  return (
    <label className="inline-flex items-center gap-2 px-3 py-1.5 text-sm rounded-md border border-white/10 bg-white/5 text-white hover:bg-white/10 transition-colors cursor-pointer">
      <input
        type="file"
        accept={accept}
        onChange={handleUpload}
        disabled={uploading}
        className="hidden"
      />

      {uploading ? (
        <Loader2 size={14} className="animate-spin" />
      ) : (
        <Icon size={14} />
      )}

      {uploading ? 'Uploading...' : label}
    </label>
  );
}

export default function AdminTestimonials() {
  const queryClient = useQueryClient();

  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState(EMPTY_FORM);

  // ---------------- FETCH TESTIMONIALS ----------------
  const { data: testimonials = [], isLoading } = useQuery({
    queryKey: ['testimonials'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('testimonial')
        .select('*')
        .order('order', { ascending: true });

      if (error) {
        console.error('FETCH ERROR:', error);
        throw error;
      }

      return data || [];
    },
  });

  // ---------------- CREATE ----------------
  const createMutation = useMutation({
    mutationFn: async (payload) => {
      console.log('INSERT PAYLOAD:', payload);

      const { data, error } = await supabase
        .from('testimonial')
        .insert([payload]);

      if (error) {
        console.error('INSERT ERROR:', error);
        throw error;
      }

      return data;
    },

    onSuccess: async () => {
      toast.success('Testimonial added successfully');

      setForm(EMPTY_FORM);
      setShowForm(false);

      await queryClient.invalidateQueries({
        queryKey: ['testimonials'],
      });

      await queryClient.refetchQueries({
        queryKey: ['testimonials'],
      });
    },

    onError: (err) => {
      console.error('CREATE ERROR:', err);
      toast.error(`Failed to save: ${err.message}`);
    },
  });

  // ---------------- DELETE ----------------
  const deleteMutation = useMutation({
    mutationFn: async (id) => {
      const { error } = await supabase
        .from('testimonial')
        .delete()
        .eq('id', id);

      if (error) throw error;
    },

    onSuccess: async () => {
      toast.success('Testimonial removed');

      await queryClient.invalidateQueries({
        queryKey: ['testimonials'],
      });
    },

    onError: (err) => {
      console.error('DELETE ERROR:', err);
      toast.error(`Delete failed: ${err.message}`);
    },
  });

  // ---------------- HELPERS ----------------
  const handleImageUpload = (url) => {
    setForm((prev) => ({
      ...prev,
      thumbnail_url: url,
    }));
  };

  // ---------------- SUBMIT ----------------
  const handleAddTestimonial = () => {
    if (!form.name.trim()) {
      toast.error('Name is required');
      return;
    }

    if (!form.thumbnail_url) {
      toast.error('Please upload an image');
      return;
    }

    const payload = {
      name: form.name.trim(),
      role: form.role?.trim() || '',
      quote: form.quote?.trim() || '',
      thumbnail_url: form.thumbnail_url,
      order: Number(form.order) || 0,
    };

    createMutation.mutate(payload);
  };

  return (
    <div className="max-w-6xl mx-auto">
      {/* HEADER */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="font-heading text-2xl font-bold text-white">
            Member Testimonials
          </h1>

          <p className="text-white/40 text-sm mt-1">
            Upload images for member testimonials.
          </p>
        </div>

        <Button
          onClick={() => {
            setShowForm((prev) => !prev);

            if (showForm) {
              setForm(EMPTY_FORM);
            }
          }}
          className="bg-kinetic hover:bg-kinetic/90"
        >
          <Plus size={16} className="mr-2" />
          Add Testimonial
        </Button>
      </div>

      {/* FORM */}
      {showForm && (
        <div className="bg-ash rounded-xl p-6 border border-white/10 mb-8 space-y-4">
          <div className="flex justify-between items-center">
            <h3 className="font-heading font-semibold text-white">
              New Testimonial
            </h3>

            <button
              onClick={() => {
                setShowForm(false);
                setForm(EMPTY_FORM);
              }}
              className="text-white/40 hover:text-white"
            >
              <X size={18} />
            </button>
          </div>

          {/* NAME */}
          <div>
            <label className="text-white/60 text-xs block mb-1">Name *</label>

            <Input
              value={form.name}
              onChange={(e) =>
                setForm((prev) => ({
                  ...prev,
                  name: e.target.value,
                }))
              }
              className="bg-ink border-white/10 text-white"
            />
          </div>

          {/* ROLE */}
          <div>
            <label className="text-white/60 text-xs block mb-1">Role</label>

            <Input
              value={form.role}
              onChange={(e) =>
                setForm((prev) => ({
                  ...prev,
                  role: e.target.value,
                }))
              }
              className="bg-ink border-white/10 text-white"
            />
          </div>

          {/* QUOTE */}
          <div>
            <label className="text-white/60 text-xs block mb-1">Quote</label>

            <Textarea
              value={form.quote}
              onChange={(e) =>
                setForm((prev) => ({
                  ...prev,
                  quote: e.target.value,
                }))
              }
              className="bg-ink border-white/10 text-white min-h-[80px]"
            />
          </div>



          {/* IMAGE */}
          <div className="space-y-2 border-t border-white/5 pt-4">
            <label className="text-white/60 text-xs block">
              Upload Image
            </label>

            <div className="flex flex-wrap gap-3 items-center">
              <MediaUploadButton
                onUpload={handleImageUpload}
                accept="image/*"
                label="Upload Image"
                icon={Image}
              />

              {form.thumbnail_url && (
                <div className="flex items-center gap-2">
                  <img
                    src={form.thumbnail_url}
                    alt=""
                    className="w-24 h-16 object-cover rounded"
                  />

                  <span className="text-kinetic text-xs">image ✓</span>

                  <button
                    onClick={() =>
                      setForm((prev) => ({
                        ...prev,
                        thumbnail_url: '',
                      }))
                    }
                    className="text-white/30 hover:text-red-400"
                  >
                    <X size={12} />
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* ORDER */}
          <div>
            <label className="text-white/60 text-xs block mb-1">Order</label>

            <Input
              type="number"
              value={form.order}
              onChange={(e) =>
                setForm((prev) => ({
                  ...prev,
                  order: Number(e.target.value),
                }))
              }
              className="bg-ink border-white/10 text-white w-24"
            />
          </div>

          {/* SUBMIT */}
          <Button
            onClick={handleAddTestimonial}
            disabled={createMutation.isPending}
            className="w-full bg-kinetic hover:bg-kinetic/90"
          >
            {createMutation.isPending
              ? 'Adding Testimonial...'
              : 'Add Testimonial'}
          </Button>
        </div>
      )}

      {/* LIST */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {testimonials.map((t) => (
          <div
            key={t.id}
            className="bg-ash border border-white/5 rounded-xl overflow-hidden"
          >
            <div className="aspect-video relative bg-ink">
              {t.thumbnail_url ? (
                <img
                  src={t.thumbnail_url}
                  alt={t.name}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center">
                  <Image size={48} className="text-white/20" />
                </div>
              )}
            </div>

            <div className="p-5">
              <h4 className="font-heading font-bold text-white">{t.name}</h4>

              <p className="text-kinetic text-xs uppercase tracking-wider">
                {t.role}
              </p>

              <p className="text-white/50 italic mt-2">"{t.quote}"</p>

              <div className="flex gap-2 mt-4">
                <button
                  onClick={() => deleteMutation.mutate(t.id)}
                  className="p-1.5 text-white/20 hover:text-red-400"
                >
                  <Trash2 size={14} />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* EMPTY */}
      {!isLoading && testimonials.length === 0 && !showForm && (
        <div className="text-center py-20 bg-ash/50 border border-dashed border-white/10 rounded-2xl">
          <p className="text-white/20 font-heading">
            No testimonials added yet.
          </p>
        </div>
      )}
    </div>
  );
}