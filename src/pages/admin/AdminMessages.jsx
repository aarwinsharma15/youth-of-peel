import React from 'react';
import { supabase } from '@/api/supabaseClient';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { Trash2, Check, Mail } from 'lucide-react';
import { toast } from 'sonner';
import { format } from 'date-fns';

export default function AdminMessages() {
  const queryClient = useQueryClient();

  const { data: messages } = useQuery({
    queryKey: ['messages'],
    queryFn: async () => {
      const { data } = await supabase.from('contactsubmission').select('*').order('created_date', { ascending: false }).limit(100);
      return data || [];
    },
    initialData: [],
  });

  const updateMutation = useMutation({
    mutationFn: async ({ id, data }) => {
      const { error } = await supabase.from('contactsubmission').update(data).eq('id', id);
      if (error) throw error;
      return true;
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['messages'] }),
  });

  const deleteMutation = useMutation({
    mutationFn: async (id) => {
      const { error } = await supabase.from('contactsubmission').delete().eq('id', id);
      if (error) throw error;
      return true;
    },
    onSuccess: () => { queryClient.invalidateQueries({ queryKey: ['messages'] }); toast.success('Message deleted'); },
  });

  return (
    <div>
      <h1 className="font-heading text-2xl font-bold text-white mb-8">Contact Messages</h1>

      {messages.length === 0 ? (
        <div className="text-center py-16">
          <Mail className="mx-auto text-white/20 mb-4" size={40} />
          <p className="text-white/40 font-body">No messages yet</p>
        </div>
      ) : (
        <div className="space-y-3">
          {messages.map((msg) => (
            <div
              key={msg.id}
              className={`bg-navy/80 rounded-xl p-5 border transition-all ${
                msg.read ? 'border-white/5' : 'border-kinetic/30'
              }`}
            >
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-3 mb-1">
                    <h3 className="text-white font-heading font-semibold text-sm">{msg.name}</h3>
                    {!msg.read && <span className="w-2 h-2 bg-kinetic rounded-full" />}
                  </div>
                  <p className="text-kinetic text-xs mb-1">{msg.email}</p>
                  {msg.subject && <p className="text-white/60 text-xs mb-2">{msg.subject}</p>}
                  <p className="text-white/80 text-sm font-body leading-relaxed">{msg.message}</p>
                  <p className="text-white/30 text-[10px] mt-2 font-body">
                    {msg.created_date ? format(new Date(msg.created_date), 'MMM d, yyyy h:mm a') : ''}
                  </p>
                </div>
                <div className="flex gap-2 flex-shrink-0">
                  {!msg.read && (
                    <button onClick={() => updateMutation.mutate({ id: msg.id, data: { read: true } })} className="text-white/40 hover:text-green-400 transition-colors" title="Mark as read">
                      <Check size={14} />
                    </button>
                  )}
                  <button onClick={() => deleteMutation.mutate(msg.id)} className="text-white/40 hover:text-red-400 transition-colors">
                    <Trash2 size={14} />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
