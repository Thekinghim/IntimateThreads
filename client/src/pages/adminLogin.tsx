import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { adminLoginSchema, type AdminLogin } from "@shared/schema";
import { apiRequest } from "@/lib/queryClient";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { useToast } from "@/hooks/use-toast";
import { Lock, User } from "lucide-react";
import { Checkbox } from "@/components/ui/checkbox";

export default function AdminLogin() {
  const [isLoading, setIsLoading] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const { toast } = useToast();

  // Kolla om användaren redan är inloggad
  useEffect(() => {
    const token = localStorage.getItem('adminToken');
    const adminUser = localStorage.getItem('adminUser');
    
    if (token && adminUser) {
      // Omdirigera direkt till admin-panelen
      window.location.href = '/admin';
    }
  }, []);

  const form = useForm<AdminLogin>({
    resolver: zodResolver(adminLoginSchema),
    defaultValues: {
      username: localStorage.getItem('adminUsername') || "admin1", // Auto-ifyll senaste användarnamn
      password: "",
    },
  });

  // Funktion för direktinloggning
  const quickLogin = (username: string, password: string) => {
    form.setValue('username', username);
    form.setValue('password', password);
    
    // Trigga inloggning direkt
    const loginData = { username, password };
    loginMutation.mutate(loginData);
  };

  const loginMutation = useMutation({
    mutationFn: async (data: AdminLogin) => {
      const response = await apiRequest('POST', '/api/admin/login', data);
      return response.json();
    },
    onSuccess: (data) => {
      // Spara token i localStorage
      localStorage.setItem('adminToken', data.token);
      localStorage.setItem('adminUser', JSON.stringify(data.admin));
      
      // Kom ihåg användarnamn om valt
      if (rememberMe) {
        localStorage.setItem('adminUsername', data.admin.username);
      } else {
        localStorage.removeItem('adminUsername');
      }
      
      toast({
        title: "Inloggning lyckades",
        description: `Välkommen, ${data.admin.name}!`,
      });

      // Omdirigera till admin-panelen
      window.location.href = '/admin';
    },
    onError: (error) => {
      toast({
        title: "Inloggningsfel",
        description: error.message || "Felaktigt användarnamn eller lösenord",
        variant: "destructive",
      });
    },
  });

  const onSubmit = (data: AdminLogin) => {
    setIsLoading(true);
    loginMutation.mutate(data, {
      onSettled: () => setIsLoading(false),
    });
  };

  return (
    <div className="min-h-screen bg-warm-beige flex items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl font-bold text-charcoal">Admin Inloggning</CardTitle>
          <CardDescription>
            Logga in för att komma åt admin-panelen
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <FormField
                control={form.control}
                name="username"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Användarnamn</FormLabel>
                    <FormControl>
                      <div className="relative">
                        <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                        <Input 
                          {...field} 
                          className="pl-10"
                          placeholder="Ange användarnamn"
                          disabled={isLoading}
                        />
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Lösenord</FormLabel>
                    <FormControl>
                      <div className="relative">
                        <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                        <Input 
                          {...field} 
                          type="password"
                          className="pl-10"
                          placeholder="Ange lösenord"
                          disabled={isLoading}
                        />
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              {/* Kom ihåg mig */}
              <div className="flex items-center space-x-2">
                <Checkbox 
                  id="remember" 
                  checked={rememberMe}
                  onCheckedChange={(checked) => setRememberMe(checked as boolean)}
                />
                <label 
                  htmlFor="remember" 
                  className="text-sm text-gray-600 cursor-pointer"
                >
                  Kom ihåg användarnamn
                </label>
              </div>
              
              <Button 
                type="submit" 
                className="w-full bg-powder-pink hover:bg-powder-pink/90 text-charcoal"
                disabled={isLoading}
              >
                {isLoading ? "Loggar in..." : "Logga in"}
              </Button>
              
              {/* Direktinloggning */}
              <div className="space-y-3 pt-4 border-t">
                <p className="text-center text-sm text-gray-500">Direktinloggning:</p>
                <div className="flex gap-2">
                  <Button 
                    type="button"
                    size="sm"
                    className="flex-1 bg-powder-pink/80 hover:bg-powder-pink text-charcoal"
                    onClick={() => quickLogin('admin1', 'adminpass123')}
                    disabled={isLoading}
                  >
                    {isLoading ? "..." : "Admin 1"}
                  </Button>
                  <Button 
                    type="button"
                    size="sm"
                    className="flex-1 bg-powder-pink/80 hover:bg-powder-pink text-charcoal"
                    onClick={() => quickLogin('admin2', 'adminpass123')}
                    disabled={isLoading}
                  >
                    {isLoading ? "..." : "Admin 2"}
                  </Button>
                </div>
                <p className="text-center text-xs text-gray-400">
                  Ett klick för att logga in direkt
                </p>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}