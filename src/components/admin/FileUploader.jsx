import React, { useState } from 'react';
import { supabase } from '@/api/supabaseClient';
import { Upload, Loader2, CheckCircle2, AlertCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';

export default function FileUploader({ onUpload, accept = '*', label = 'Upload File', className = '' }) {
  const [uploading, setUploading] = useState(false);

  const handleUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setUploading(true);
    
    const fileExt = file.name.split('.').pop();
    const fileName = `${Math.random().toString(36).substring(2)}-${Date.now()}.${fileExt}`;
    const filePath = `files/${fileName}`;

    const { error } = await supabase.storage.from('public_assets').upload(filePath, file);
    
    if (error) {
      console.error('Error uploading file:', error);
      toast.error('Upload failed: ' + error.message);
    } else {
      const { data: { publicUrl } } = supabase.storage.from('public_assets').getPublicUrl(filePath);
      onUpload(publicUrl);
      toast.success('File uploaded successfully');
    }

    setUploading(false);
  };

  return (
    <label className={`inline-flex items-center gap-2 px-3 py-1.5 text-sm rounded-md border border-white/10 bg-white/5 text-white hover:bg-white/10 transition-colors ${uploading ? 'opacity-60 cursor-not-allowed' : 'cursor-pointer'} ${className}`}>
      <input type="file" accept={accept} onChange={handleUpload} disabled={uploading} className="hidden" />
      {uploading ? <Loader2 size={14} className="animate-spin" /> : <Upload size={14} />}
      {uploading ? 'Uploading...' : label}
    </label>
  );
}
