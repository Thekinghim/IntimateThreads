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
        
        const response = await fetch('/api/upload-image', {
          method: 'POST',
          body: formData
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
      <div className="flex gap-2">
        <Input
          type="url"
          placeholder={placeholder}
          value={previewUrl}
          onChange={(e) => handleUrlChange(e.target.value)}
          className="flex-1"
        />
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          onChange={handleFileSelect}
          className="hidden"
        />
        <Button
          type="button"
          variant="outline"
          onClick={() => fileInputRef.current?.click()}
          disabled={isUploading}
          className="flex-shrink-0"
        >
          <Upload className="h-4 w-4 mr-2" />
          {isUploading ? "Uploading..." : "Upload"}
        </Button>
        {previewUrl && (
          <Button
            type="button"
            variant="outline"
            size="icon"
            onClick={clearImage}
            className="flex-shrink-0"
          >
            <X className="h-4 w-4" />
          </Button>
        )}
      </div>
      
      {previewUrl && (
        <div className="mt-2">
          <img 
            src={previewUrl} 
            alt="Preview" 
            className="w-32 h-32 object-cover rounded-lg border"
            onError={(e) => {
              e.currentTarget.src = "https://images.unsplash.com/photo-1566479179817-c0df35d84ff3?w=400";
            }}
          />
        </div>
      )}
    </div>
  );
}