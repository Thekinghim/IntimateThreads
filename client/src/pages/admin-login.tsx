import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { Shield, Lock, Eye, EyeOff } from "lucide-react";

const loginSchema = z.object({
  username: z.string().min(1, "Användarnamn krävs"),
  password: z.string().min(1, "Lösenord krävs"),
});

type LoginForm = z.infer<typeof loginSchema>;

export default function AdminLogin() {
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const { toast } = useToast();

  const form = useForm<LoginForm>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      username: "",
      password: "",
    },
  });

  const onSubmit = async (data: LoginForm) => {
    setIsLoading(true);
    
    try {
      const response = await fetch('/api/admin/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (response.ok) {
        // Spara token och användardata
        localStorage.setItem('adminToken', result.token);
        localStorage.setItem('adminUser', JSON.stringify(result.admin));
        
        toast({
          title: "Inloggning lyckades",
          description: "Omdirigerar till admin-panelen...",
        });

        // Omdirigera till admin panel
        setTimeout(() => {
          window.location.href = '/admin';
        }, 1000);
      } else {
        toast({
          title: "Inloggning misslyckades",
          description: result.message || "Kontrollera dina uppgifter och försök igen.",
          variant: "destructive",
        });
      }
    } catch (error) {
      toast({
        title: "Ett fel uppstod",
        description: "Kunde inte ansluta till servern. Försök igen senare.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen gradient-nordic flex items-center justify-center px-6 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-dusty-rose/10 to-sage-mist/10"></div>
      <div className="w-full max-w-lg relative">
        <Card className="glass shadow-luxury border-0 backdrop-blur-3xl">
          <CardHeader className="text-center space-y-6 pb-10">
            <div className="mx-auto w-20 h-20 gradient-charcoal rounded-3xl flex items-center justify-center shadow-luxury">
              <Shield className="h-10 w-10 text-nordic-cream" />
            </div>
            <div>
              <CardTitle className="text-3xl font-bold text-deep-charcoal font-poppins">Admin Panel</CardTitle>
              <CardDescription className="text-soft-taupe mt-3 text-lg font-light">
                Logga in för att komma åt administratörspanelen
              </CardDescription>
            </div>
          </CardHeader>
          
          <CardContent>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <FormField
                  control={form.control}
                  name="username"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-deep-charcoal font-medium text-lg">Användarnamn</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Ange ditt användarnamn"
                          className="h-14 border-2 border-dusty-rose/30 focus:border-dusty-rose focus:ring-dusty-rose/20 bg-white/90 text-deep-charcoal text-lg rounded-2xl shadow-luxury"
                          {...field}
                        />
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
                      <FormLabel className="text-deep-charcoal font-medium text-lg">Lösenord</FormLabel>
                      <FormControl>
                        <div className="relative">
                          <Input
                            type={showPassword ? "text" : "password"}
                            placeholder="Ange ditt lösenord"
                            className="h-14 border-2 border-dusty-rose/30 focus:border-dusty-rose focus:ring-dusty-rose/20 bg-white/90 text-deep-charcoal text-lg rounded-2xl shadow-luxury pr-14"
                            {...field}
                          />
                          <Button
                            type="button"
                            variant="ghost"
                            size="sm"
                            className="absolute right-3 top-1/2 -translate-y-1/2 h-10 w-10 p-0 text-soft-taupe hover:text-dusty-rose rounded-xl"
                            onClick={() => setShowPassword(!showPassword)}
                          >
                            {showPassword ? (
                              <EyeOff className="h-5 w-5" />
                            ) : (
                              <Eye className="h-5 w-5" />
                            )}
                          </Button>
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <Button
                  type="submit"
                  className="w-full h-16 btn-luxury text-nordic-cream font-medium text-lg rounded-2xl font-poppins"
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <div className="flex items-center space-x-3">
                      <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-nordic-cream"></div>
                      <span>Loggar in...</span>
                    </div>
                  ) : (
                    <div className="flex items-center space-x-3">
                      <Lock className="h-5 w-5" />
                      <span>Logga in</span>
                    </div>
                  )}
                </Button>
              </form>
            </Form>

            <div className="mt-10 pt-8 border-t border-dusty-rose/20">
              <p className="text-center text-lg text-soft-taupe font-light">
                Endast auktoriserad personal
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}