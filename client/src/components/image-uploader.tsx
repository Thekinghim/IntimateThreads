import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Upload, X } from "lucide-react";

interface ImageUploaderProps {
  value?: string;
  onChange: (url: string) => void;
  placeholder?: string;
}

export function ImageUploader({ value, onChange, placeholder = "Enter image URL" }: ImageUploaderProps) {
  const [previewUrl, setPreviewUrl] = useState(value || "");
  const [isUploading, setIsUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleUrlChange = (url: string) => {
    setPreviewUrl(url);
    onChange(url);
  };

  const handleFileSelect = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    setIsUploading(true);
    try {
      // Try to upload to Object Storage first
      try {
        const formData = new FormData();
        formData.append('file', file);
        
        // Get admin token for authenticated upload
        const token = localStorage.getItem('adminToken');
        const headers: any = {};
        if (token) {
          headers['Authorization'] = `Bearer ${token}`;
        }
        
        const response = await fetch('/api/upload-image', {
          method: 'POST',
          body: formData,
          headers
        });
        
        if (response.ok) {
          const { url } = await response.json();
          handleUrlChange(url);
          setIsUploading(false);
          return;
        }
      } catch (uploadError) {
        console.log('Object storage upload failed, using base64 fallback');
      }
      
      // Fallback to base64 if object storage fails
      const reader = new FileReader();
      reader.onload = (e) => {
        const base64 = e.target?.result as string;
        handleUrlChange(base64);
        setIsUploading(false);
      };
      reader.readAsDataURL(file);
    } catch (error) {
      console.error('Error processing file:', error);
      setIsUploading(false);
    }
  };

  const clearImage = () => {
    setPreviewUrl("");
    onChange("");
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  return (
    <div className="space-y-4">
      {/* Large Mobile-Optimized Upload Button */}
      <div className="w-full">
        <Button
          type="button"
          variant="outline"
          onClick={() => fileInputRef.current?.click()}
          disabled={isUploading}
          className="w-full h-16 text-lg flex items-center justify-center gap-3 border-2 border-dashed border-blue-300 hover:border-blue-500 bg-blue-50 hover:bg-blue-100"
        >
          <Upload className="w-6 h-6" />
          {isUploading ? "Laddar upp bild..." : "KLICKA FÖR ATT LADDA UPP BILD"}
        </Button>
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          onChange={handleFileSelect}
          className="hidden"
        />
      </div>
      
      {/* URL Input as secondary option */}
      <div className="space-y-2">
        <label className="text-sm text-gray-600">Eller ange bild-URL:</label>
        <div className="flex gap-2">
          <Input
            type="url"
            placeholder={placeholder}
            value={previewUrl}
            onChange={(e) => handleUrlChange(e.target.value)}
            className="flex-1"
          />
          {previewUrl && (
            <Button
              type="button"
              variant="outline"
              onClick={clearImage}
              className="px-3"
            >
              <X className="w-4 h-4" />
            </Button>
          )}
        </div>
      </div>
      
      {previewUrl && (
        <div className="w-full">
          <img 
            src={previewUrl} 
            alt="Preview" 
            className="w-full max-h-48 object-cover rounded-lg border"
            onError={(e) => {
              e.currentTarget.src = "https://images.unsplash.com/photo-1566479179817-c0df35d84ff3?w=400";
            }}
          />
        </div>
      )}
    </div>
  );
}