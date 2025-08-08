import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { useToast } from "@/hooks/use-toast";
import { apiRequest } from "@/lib/queryClient";
import ImageUpload from "@/components/image-upload";
import { Plus, Edit, Package } from "lucide-react";

const productSchema = z.object({
  title: z.string().min(1, "Title is required"),
  description: z.string().min(10, "Description must be at least 10 characters"),
  size: z.string().min(1, "Size is required"),
  color: z.string().min(1, "Color is required"),
  material: z.string().min(1, "Material is required"),
  priceKr: z.coerce.number().min(1, "Price must be greater than 0"),
  imageUrl: z.string().url("Valid image URL is required"),
  sellerId: z.string().min(1, "Seller must be selected"),
  wearDays: z.coerce.number().min(0).optional(),
  isAvailable: z.boolean().default(true),
});

type ProductForm = z.infer<typeof productSchema>;

interface ProductManagerProps {
  sellers: any[];
  product?: any;
  isEdit?: boolean;
  onSuccess?: () => void;
}

export default function ProductManager({ sellers = [], product, isEdit = false, onSuccess }: ProductManagerProps) {
  const [isOpen, setIsOpen] = useState(false);
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const form = useForm<ProductForm>({
    resolver: zodResolver(productSchema),
    defaultValues: product ? {
      title: product.title,
      description: product.description,
      size: product.size,
      color: product.color,
      material: product.material,
      priceKr: parseFloat(product.priceKr),
      imageUrl: product.imageUrl,
      sellerId: product.sellerId,
      wearDays: product.wearDays || 0,
      isAvailable: product.isAvailable ?? true,
    } : {
      title: "",
      description: "",
      size: "",
      color: "",
      material: "",
      priceKr: 0,
      imageUrl: "",
      sellerId: "",
      wearDays: 0,
      isAvailable: true,
    },
  });

  const createProductMutation = useMutation({
    mutationFn: async (data: ProductForm) => {
      const token = localStorage.getItem('adminToken');
      const response = await fetch(`/api/admin/products${isEdit ? `/${product?.id}` : ''}`, {
        method: isEdit ? 'PATCH' : 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify(data),
      });
      if (!response.ok) throw new Error('Failed to save product');
      return response.json();
    },
    onSuccess: () => {
      toast({
        title: isEdit ? "Product Updated" : "Product Created",
        description: `Product has been ${isEdit ? 'updated' : 'created'} successfully.`,
      });
      queryClient.invalidateQueries({ queryKey: ['/api/products'] });
      setIsOpen(false);
      onSuccess?.();
      if (!isEdit) {
        form.reset();
      }
    },
    onError: () => {
      toast({
        title: "Error",
        description: `Failed to ${isEdit ? 'update' : 'create'} product.`,
        variant: "destructive",
      });
    },
  });

  const onSubmit = (data: ProductForm) => {
    createProductMutation.mutate(data);
  };

  const sizeOptions = ["XS", "S", "M", "L", "XL", "XXL", "One Size"];
  const materialOptions = ["Cotton", "Lace", "Silk", "Satin", "Modal", "Bamboo", "Polyester", "Mesh"];
  const colorOptions = ["Black", "White", "Red", "Pink", "Blue", "Purple", "Green", "Yellow", "Beige", "Gray"];

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button className="flex items-center gap-2">
          {isEdit ? (
            <>
              <Edit className="h-4 w-4" />
              Edit Product
            </>
          ) : (
            <>
              <Plus className="h-4 w-4" />
              Add Product
            </>
          )}
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Package className="h-5 w-5" />
            {isEdit ? 'Edit Product' : 'Create New Product'}
          </DialogTitle>
        </DialogHeader>
        
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Left Column */}
              <div className="space-y-4">
                <FormField
                  control={form.control}
                  name="title"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Product Title</FormLabel>
                      <FormControl>
                        <Input placeholder="e.g., Black Lace Set" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="description"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Description</FormLabel>
                      <FormControl>
                        <Textarea 
                          placeholder="Detailed description of the item..." 
                          className="min-h-[100px]"
                          {...field} 
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div className="grid grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="size"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Size</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select size" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {sizeOptions.map(size => (
                              <SelectItem key={size} value={size}>{size}</SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="color"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Color</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select color" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {colorOptions.map(color => (
                              <SelectItem key={color} value={color}>{color}</SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="material"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Material</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select material" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {materialOptions.map(material => (
                              <SelectItem key={material} value={material}>{material}</SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="priceKr"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Price (SEK)</FormLabel>
                        <FormControl>
                          <Input 
                            type="number" 
                            placeholder="499" 
                            {...field}
                            onChange={e => field.onChange(Number(e.target.value))}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="sellerId"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Seller</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select seller" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {sellers.map(seller => (
                              <SelectItem key={seller.id} value={seller.id}>
                                {seller.alias} - {seller.location}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="wearDays"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Wear Days (Optional)</FormLabel>
                        <FormControl>
                          <Input 
                            type="number" 
                            placeholder="3"
                            {...field}
                            onChange={e => field.onChange(Number(e.target.value))}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </div>

              {/* Right Column - Image URL */}
              <div className="space-y-4">
                <FormField
                  control={form.control}
                  name="imageUrl"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Bild URL</FormLabel>
                      <FormControl>
                        <Input 
                          placeholder="https://example.com/image.jpg" 
                          {...field} 
                        />
                      </FormControl>
                      <FormMessage />
                      {field.value && (
                        <div className="mt-2">
                          <img 
                            src={field.value} 
                            alt="Preview" 
                            className="w-32 h-32 object-cover rounded-lg border"
                            onError={(e) => {
                              e.currentTarget.src = "https://images.unsplash.com/photo-1566479179817-c0df35d84ff3?w=400";
                            }}
                          />
                        </div>
                      )}
                    </FormItem>
                  )}
                />
              </div>
            </div>

            <div className="flex justify-end gap-2 pt-6 border-t">
              <Button 
                type="button" 
                variant="outline" 
                onClick={() => setIsOpen(false)}
              >
                Cancel
              </Button>
              <Button 
                type="submit" 
                disabled={createProductMutation.isPending}
                className="min-w-[120px]"
              >
                {createProductMutation.isPending 
                  ? (isEdit ? "Updating..." : "Creating...") 
                  : (isEdit ? "Update Product" : "Create Product")
                }
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}