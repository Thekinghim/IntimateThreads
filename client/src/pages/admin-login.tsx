import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { useToast } from "@/hooks/use-toast";
import { Key } from "lucide-react";
import { SiApple, SiFacebook, SiGoogle } from "react-icons/si";

const loginSchema = z.object({
  username: z.string().min(1, "Email is required"),
  password: z.string().min(1, "Password is required"),
});

type LoginForm = z.infer<typeof loginSchema>;

export default function AdminLogin() {
  const [isLoading, setIsLoading] = useState(false);
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
        localStorage.setItem('adminToken', result.token);
        localStorage.setItem('adminUser', JSON.stringify(result.admin));
        
        toast({
          title: "Inloggning lyckades",
          description: "Omdirigerar till admin-panelen...",
        });

        setTimeout(() => {
          window.location.href = '/shopify-admin';
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
    <div 
      className="min-h-screen flex items-center justify-center px-4"
      style={{
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'
      }}
    >
      <Card className="w-full max-w-sm bg-white shadow-2xl border-0 rounded-xl">
        <CardHeader className="pb-6 pt-8">
          {/* Scandiscent Logo */}
          <div className="flex items-center justify-start mb-8">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-green-600 rounded flex items-center justify-center">
                <span className="text-white font-bold text-sm">S</span>
              </div>
              <span className="text-xl font-semibold text-gray-900">scandiscent</span>
            </div>
          </div>
          
          <div className="text-left">
            <CardTitle className="text-2xl font-semibold text-gray-900 mb-2">
              Log in
            </CardTitle>
            <CardDescription className="text-gray-600 font-normal">
              Continue to Scandiscent
            </CardDescription>
          </div>
        </CardHeader>
        
        <CardContent className="px-8 pb-8">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <FormField
                control={form.control}
                name="username"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-sm font-medium text-gray-700">
                      Email
                    </FormLabel>
                    <FormControl>
                      <div className="relative">
                        <Input
                          placeholder="admin1@scandiscent.com"
                          className="w-full px-3 py-3 h-12 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-base"
                          {...field}
                        />
                        {field.value && (
                          <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                            <div className="w-4 h-4 text-green-500">✓</div>
                          </div>
                        )}
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
                    <FormLabel className="text-sm font-medium text-gray-700">
                      Password
                    </FormLabel>
                    <FormControl>
                      <Input
                        type="password"
                        placeholder="adminpass123"
                        className="w-full px-3 py-3 h-12 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-base"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <Button
                type="submit"
                className="w-full bg-gray-800 hover:bg-gray-900 text-white py-3 px-4 h-12 rounded-md font-medium transition-colors text-base"
                disabled={isLoading}
              >
                {isLoading ? "Logging in..." : "Continue with email"}
              </Button>
            </form>
          </Form>

          {/* Sign in with passkey */}
          <div className="mt-4 text-center">
            <button className="text-gray-600 text-sm flex items-center justify-center space-x-2 hover:text-gray-800">
              <Key className="w-4 h-4" />
              <span>Sign in with passkey</span>
            </button>
          </div>

          {/* Divider */}
          <div className="mt-6 mb-6 text-center">
            <span className="text-gray-500 text-sm">or</span>
          </div>

          {/* Social Login Buttons */}
          <div className="space-y-3">
            <Button
              type="button"
              variant="outline"
              className="w-full bg-gray-50 border-gray-200 hover:bg-gray-100 py-3 px-4 rounded-md flex items-center justify-center space-x-3"
            >
              <SiApple className="w-5 h-5 text-gray-900" />
            </Button>
            
            <Button
              type="button"
              variant="outline"
              className="w-full bg-gray-50 border-gray-200 hover:bg-gray-100 py-3 px-4 rounded-md flex items-center justify-center space-x-3"
            >
              <SiFacebook className="w-5 h-5 text-blue-600" />
            </Button>
            
            <Button
              type="button"
              variant="outline"
              className="w-full bg-gray-50 border-gray-200 hover:bg-gray-100 py-3 px-4 rounded-md flex items-center justify-center space-x-3"
            >
              <SiGoogle className="w-5 h-5 text-red-500" />
            </Button>
          </div>

          {/* Admin Instructions */}
          <div className="mt-8 text-center">
            <p className="text-sm text-gray-600">
              New to Scandiscent?{" "}
              <a href="#" className="text-blue-600 hover:underline">
                Get started →
              </a>
            </p>
          </div>

          <div className="mt-4 flex justify-center space-x-4 text-xs text-gray-500">
            <a href="#" className="hover:text-gray-700">Help</a>
            <a href="#" className="hover:text-gray-700">Privacy</a>
            <a href="#" className="hover:text-gray-700">Terms</a>
          </div>

          {/* Dev credentials hint */}
          <div className="mt-6 text-center p-3 bg-gray-50 rounded-lg">
            <p className="text-xs text-gray-600">
              <strong>Dev Login:</strong> admin1 / adminpass123
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}