import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { useToast } from "@/hooks/use-toast";
import { apiRequest } from "@/lib/queryClient";
import { Plus, Users, MapPin, User, Percent } from "lucide-react";
import { useAdminAuth } from "@/hooks/useAdminAuth";

const sellerSchema = z.object({
  alias: z.string().min(1, "Alias är obligatoriskt"),
  location: z.string().min(1, "Plats är obligatoriskt"),
  age: z.coerce.number().min(18, "Ålder måste vara minst 18").max(65, "Ålder får vara max 65"),
  bio: z.string().min(10, "Bio måste vara minst 10 tecken"),
  commissionRate: z.coerce.number().min(0.1, "Provision måste vara minst 10%").max(0.8, "Provision får vara max 80%").optional(),
});

type SellerForm = z.infer<typeof sellerSchema>;

interface SellerManagerProps {
  seller?: any;
  isEdit?: boolean;
  onSuccess?: () => void;
}

export default function SellerManager({ seller, isEdit = false, onSuccess }: SellerManagerProps) {
  const [isOpen, setIsOpen] = useState(false);
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const { getAuthHeader } = useAdminAuth();

  const form = useForm<SellerForm>({
    resolver: zodResolver(sellerSchema),
    defaultValues: seller ? {
      alias: seller.alias,
      location: seller.location,
      age: seller.age,
      bio: seller.bio || "",
      commissionRate: parseFloat(seller.commissionRate) || 0.45,
    } : {
      alias: "",
      location: "",
      age: 25,
      bio: "",
      commissionRate: 0.45,
    },
  });

  const createSellerMutation = useMutation({
    mutationFn: async (data: SellerForm) => {
      const authHeaders = getAuthHeader();
      const response = await fetch(`/api/admin/sellers${isEdit ? `/${seller.id}` : ''}`, {
        method: isEdit ? 'PATCH' : 'POST',
        headers: {
          'Content-Type': 'application/json',
          ...authHeaders,
        },
        body: JSON.stringify({
          ...data,
          commissionRate: data.commissionRate?.toString() || "0.45"
        }),
      });
      if (!response.ok) throw new Error('Failed to save seller');
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/sellers'] });
      toast({
        title: "Framgång!",
        description: `Säljare ${isEdit ? 'uppdaterad' : 'skapad'} framgångsrikt`,
      });
      setIsOpen(false);
      form.reset();
      onSuccess?.();
    },
    onError: (error: any) => {
      toast({
        title: "Fel",
        description: error?.message || `Kunde inte ${isEdit ? 'uppdatera' : 'skapa'} säljare`,
        variant: "destructive",
      });
    },
  });

  const onSubmit = (data: SellerForm) => {
    console.log("Submitting seller data:", data);
    createSellerMutation.mutate(data);
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button className="btn-luxury">
          {isEdit ? (
            <>
              <User className="h-4 w-4 mr-2" />
              Redigera Säljare
            </>
          ) : (
            <>
              <Plus className="h-4 w-4 mr-2" />
              Lägg till Säljare
            </>
          )}
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-2xl glass backdrop-blur-xl border-dusty-rose/20">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-deep-charcoal font-poppins">
            {isEdit ? 'Redigera Säljare' : 'Lägg till Ny Säljare'}
          </DialogTitle>
        </DialogHeader>
        
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <FormField
                control={form.control}
                name="alias"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-deep-charcoal font-semibold flex items-center">
                      <Users className="h-4 w-4 mr-2 text-soft-taupe" />
                      Alias
                    </FormLabel>
                    <FormControl>
                      <Input 
                        placeholder="t.ex. Anna_Stockholm" 
                        className="glass border-dusty-rose/20"
                        {...field} 
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="location"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-deep-charcoal font-semibold flex items-center">
                      <MapPin className="h-4 w-4 mr-2 text-soft-taupe" />
                      Plats
                    </FormLabel>
                    <FormControl>
                      <Input 
                        placeholder="t.ex. Stockholm, Sverige" 
                        className="glass border-dusty-rose/20"
                        {...field} 
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="age"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-deep-charcoal font-semibold">Ålder</FormLabel>
                    <FormControl>
                      <Input 
                        type="number" 
                        placeholder="25" 
                        min="18" 
                        max="65"
                        className="glass border-dusty-rose/20"
                        {...field} 
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="commissionRate"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-deep-charcoal font-semibold flex items-center">
                      <Percent className="h-4 w-4 mr-2 text-soft-taupe" />
                      Provision (decimaler)
                    </FormLabel>
                    <FormControl>
                      <Input 
                        type="number" 
                        step="0.01"
                        min="0.1"
                        max="0.8"
                        placeholder="0.45" 
                        className="glass border-dusty-rose/20"
                        {...field} 
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name="bio"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-deep-charcoal font-semibold">Biografi</FormLabel>
                  <FormControl>
                    <Textarea 
                      placeholder="Berätta lite om säljaren..." 
                      className="min-h-[120px] glass border-dusty-rose/20"
                      {...field} 
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="flex justify-end space-x-4 pt-6">
              <Button 
                type="button" 
                variant="outline" 
                onClick={() => setIsOpen(false)}
                className="rounded-2xl"
              >
                Avbryt
              </Button>
              <Button 
                type="submit" 
                className="btn-luxury rounded-2xl"
                disabled={createSellerMutation.isPending}
              >
                {createSellerMutation.isPending ? "Sparar..." : (isEdit ? "Uppdatera" : "Skapa Säljare")}
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}