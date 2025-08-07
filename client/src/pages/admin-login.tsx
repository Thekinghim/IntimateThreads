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
        localStorage.setItem('adminUser', JSON.stringify(result.user));
        
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
    <div className="min-h-screen bg-gradient-to-br from-stone-50 to-stone-100 flex items-center justify-center px-6">
      <div className="w-full max-w-md">
        <Card className="shadow-2xl border-0">
          <CardHeader className="text-center space-y-4 pb-8">
            <div className="mx-auto w-16 h-16 bg-gradient-to-br from-stone-700 to-stone-900 rounded-2xl flex items-center justify-center">
              <Shield className="h-8 w-8 text-white" />
            </div>
            <div>
              <CardTitle className="text-2xl font-bold text-stone-800">Admin Panel</CardTitle>
              <CardDescription className="text-stone-600 mt-2">
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
                      <FormLabel className="text-stone-700 font-medium">Användarnamn</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Ange ditt användarnamn"
                          className="h-12 border-stone-200 focus:border-stone-400 focus:ring-stone-400"
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
                      <FormLabel className="text-stone-700 font-medium">Lösenord</FormLabel>
                      <FormControl>
                        <div className="relative">
                          <Input
                            type={showPassword ? "text" : "password"}
                            placeholder="Ange ditt lösenord"
                            className="h-12 border-stone-200 focus:border-stone-400 focus:ring-stone-400 pr-12"
                            {...field}
                          />
                          <Button
                            type="button"
                            variant="ghost"
                            size="sm"
                            className="absolute right-2 top-1/2 -translate-y-1/2 h-8 w-8 p-0 text-stone-500 hover:text-stone-700"
                            onClick={() => setShowPassword(!showPassword)}
                          >
                            {showPassword ? (
                              <EyeOff className="h-4 w-4" />
                            ) : (
                              <Eye className="h-4 w-4" />
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
                  className="w-full h-12 bg-gradient-to-r from-stone-700 to-stone-800 hover:from-stone-800 hover:to-stone-900 text-white font-medium text-base"
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <div className="flex items-center space-x-2">
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                      <span>Loggar in...</span>
                    </div>
                  ) : (
                    <div className="flex items-center space-x-2">
                      <Lock className="h-4 w-4" />
                      <span>Logga in</span>
                    </div>
                  )}
                </Button>
              </form>
            </Form>

            <div className="mt-8 pt-6 border-t border-stone-200">
              <p className="text-center text-sm text-stone-500">
                Endast auktoriserad personal
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}