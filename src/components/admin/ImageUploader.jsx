import React, { useState } from 'react';
import { supabase } from '@/api/supabaseClient';
import { Upload, Loader2, CheckCircle2, AlertCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';

export default function ImageUploader({ onUpload, className = '' }) {
  const [uploading, setUploading] = useState(false);

  const handleUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setUploading(true);
    
    const fileExt = file.name.split('.').pop();
    const fileName = `${Math.random().toString(36).substring(2)}-${Date.now()}.${fileExt}`;
    const filePath = `images/${fileName}`;

    const { error } = await supabase.storage.from('public_assets').upload(filePath, file);
    
    if (error) {
      console.error('Error uploading image:', error);
      toast.error('Upload failed: ' + error.message);
    } else {
      const { data: { publicUrl } } = supabase.storage.from('public_assets').getPublicUrl(filePath);
      onUpload(publicUrl);
      toast.success('Image uploaded successfully');
    }
    
    setUploading(false);
  };

  return (
    <label className={`cursor-pointer group ${className}`}>
      <input type="file" accept="image/*" onChange={handleUpload} className="hidden" />
      <Button type="button" variant="outline" size="sm" disabled={uploading} className="bg-white/5 border-white/10 text-white hover:bg-white/10 pointer-events-none">
        {uploading ? <Loader2 size={14} className="animate-spin mr-2" /> : <Upload size={14} className="mr-2" />}
        {uploading ? 'Uploading...' : 'Upload Image'}
      </Button>
    </label>
  );
}
