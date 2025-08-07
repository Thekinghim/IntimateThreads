import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import { Upload, Link, Image, X } from "lucide-react";

interface ImageUploadProps {
  currentImageUrl?: string;
  onImageChange: (imageUrl: string) => void;
  label?: string;
}

export default function ImageUpload({ currentImageUrl, onImageChange, label = "Product Image" }: ImageUploadProps) {
  const [imageUrl, setImageUrl] = useState(currentImageUrl || "");
  const [previewUrl, setPreviewUrl] = useState(currentImageUrl || "");
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleUrlChange = (url: string) => {
    setImageUrl(url);
    setPreviewUrl(url);
    onImageChange(url);
  };

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      // In a real app, you'd upload to a service like Cloudinary or AWS S3
      // For now, we'll use a placeholder service URL pattern
      const reader = new FileReader();
      reader.onload = (e) => {
        const result = e.target?.result as string;
        setPreviewUrl(result);
        // Simulate uploaded URL - in real app this would come from your upload service
        const simulatedUrl = `https://images.unsplash.com/photo-${Date.now()}?w=400`;
        setImageUrl(simulatedUrl);
        onImageChange(simulatedUrl);
      };
      reader.readAsDataURL(file);
    }
  };

  const clearImage = () => {
    setImageUrl("");
    setPreviewUrl("");
    onImageChange("");
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  // Curated high-quality Unsplash images for lingerie/intimate apparel
  const suggestedImages = [
    "https://images.unsplash.com/photo-1566479179817-c0df35d84ff3?w=400",
    "https://images.unsplash.com/photo-1571513722275-4b41940f54b8?w=400", 
    "https://images.unsplash.com/photo-1594736797933-d0f021b89484?w=400",
    "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400",
    "https://images.unsplash.com/photo-1588117472013-59bb13edafec?w=400",
    "https://images.unsplash.com/photo-1582142306909-195724d33045?w=400"
  ];

  return (
    <div className="space-y-4">
      <Label className="text-base font-medium text-stone-700">{label}</Label>
      
      {/* Current Image Preview */}
      {previewUrl && (
        <Card className="relative max-w-xs">
          <CardContent className="p-2">
            <img 
              src={previewUrl} 
              alt="Product preview" 
              className="w-full h-48 object-cover rounded-lg"
            />
            <Button
              variant="ghost"
              size="sm"
              onClick={clearImage}
              className="absolute top-2 right-2 bg-white/80 hover:bg-white rounded-full w-8 h-8 p-0"
            >
              <X className="h-4 w-4" />
            </Button>
          </CardContent>
        </Card>
      )}

      {/* Upload Options */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* URL Input */}
        <div className="space-y-2">
          <Label className="text-sm font-medium flex items-center gap-2">
            <Link className="h-4 w-4" />
            Image URL
          </Label>
          <div className="flex gap-2">
            <Input
              type="url"
              placeholder="https://example.com/image.jpg"
              value={imageUrl}
              onChange={(e) => handleUrlChange(e.target.value)}
              className="flex-1"
            />
            <Button 
              type="button" 
              variant="outline" 
              onClick={() => handleUrlChange(imageUrl)}
              disabled={!imageUrl}
            >
              Preview
            </Button>
          </div>
        </div>

        {/* File Upload */}
        <div className="space-y-2">
          <Label className="text-sm font-medium flex items-center gap-2">
            <Upload className="h-4 w-4" />
            Upload File
          </Label>
          <div className="flex gap-2">
            <Input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              onChange={handleFileUpload}
              className="flex-1"
            />
            <Button 
              type="button" 
              variant="outline"
              onClick={() => fileInputRef.current?.click()}
            >
              <Upload className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>

      {/* Suggested Images */}
      <div className="space-y-2">
        <Label className="text-sm font-medium flex items-center gap-2">
          <Image className="h-4 w-4" />
          Suggested Images
        </Label>
        <div className="grid grid-cols-3 md:grid-cols-6 gap-2">
          {suggestedImages.map((url, index) => (
            <button
              key={index}
              type="button"
              onClick={() => handleUrlChange(url)}
              className="relative aspect-square rounded-lg overflow-hidden border-2 border-transparent hover:border-stone-400 transition-colors"
            >
              <img 
                src={url} 
                alt={`Suggestion ${index + 1}`}
                className="w-full h-full object-cover"
              />
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}