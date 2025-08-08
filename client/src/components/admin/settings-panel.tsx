import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useMutation } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { useAdminAuth } from "@/hooks/useAdminAuth";
import { 
  Settings, 
  Globe, 
  Shield, 
  CreditCard, 
  Mail, 
  Database,
  Server,
  Key,
  AlertCircle,
  CheckCircle,
  RefreshCw,
  Save
} from "lucide-react";

const settingsSchema = z.object({
  siteName: z.string().min(1, "Webbplatsnamn är obligatoriskt"),
  siteDescription: z.string().min(10, "Beskrivning måste vara minst 10 tecken"),
  contactEmail: z.string().email("Ogiltig e-postadress"),
  maintenanceMode: z.boolean(),
  allowRegistration: z.boolean(),
  defaultCommission: z.coerce.number().min(0.1).max(0.8),
});

type SettingsForm = z.infer<typeof settingsSchema>;

export default function SettingsPanel() {
  const [activeTab, setActiveTab] = useState("general");
  const { toast } = useToast();
  const { adminUser } = useAdminAuth();

  const form = useForm<SettingsForm>({
    resolver: zodResolver(settingsSchema),
    defaultValues: {
      siteName: "Scandiscent",
      siteDescription: "En exklusiv marknadsplats för diskreta personliga plagg från nordiska kvinnor",
      contactEmail: "admin@nordiccollection.se",
      maintenanceMode: false,
      allowRegistration: false,
      defaultCommission: 0.45,
    },
  });

  const saveSettingsMutation = useMutation({
    mutationFn: async (data: SettingsForm) => {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      localStorage.setItem('adminSettings', JSON.stringify(data));
      return data;
    },
    onSuccess: () => {
      toast({
        title: "Inställningar sparade",
        description: "Alla ändringar har sparats framgångsrikt",
      });
    },
    onError: () => {
      toast({
        title: "Fel",
        description: "Kunde inte spara inställningar",
        variant: "destructive",
      });
    },
  });

  const onSubmit = (data: SettingsForm) => {
    saveSettingsMutation.mutate(data);
  };

  const testConnectionMutation = useMutation({
    mutationFn: async () => {
      const response = await fetch('/api/products');
      if (!response.ok) throw new Error('Connection failed');
      return response.json();
    },
    onSuccess: () => {
      toast({
        title: "Anslutning OK",
        description: "Databasen svarar normalt",
      });
    },
    onError: () => {
      toast({
        title: "Anslutningsfel",
        description: "Kunde inte ansluta till databasen",
        variant: "destructive",
      });
    },
  });

  return (
    <div className="space-y-8 max-w-4xl">
      {/* Header */}
      <div>
        <h2 className="text-4xl font-bold text-deep-charcoal mb-2 font-poppins">Inställningar</h2>
        <p className="text-soft-taupe text-lg">Hantera systemkonfiguration och inställningar</p>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-4 bg-white/50 backdrop-blur-sm border border-dusty-rose/20 rounded-2xl p-2">
          <TabsTrigger value="general" className="rounded-xl data-[state=active]:bg-white data-[state=active]:shadow-md">
            <Globe className="h-4 w-4 mr-2" />
            Allmänt
          </TabsTrigger>
          <TabsTrigger value="security" className="rounded-xl data-[state=active]:bg-white data-[state=active]:shadow-md">
            <Shield className="h-4 w-4 mr-2" />
            Säkerhet
          </TabsTrigger>
          <TabsTrigger value="payments" className="rounded-xl data-[state=active]:bg-white data-[state=active]:shadow-md">
            <CreditCard className="h-4 w-4 mr-2" />
            Betalningar
          </TabsTrigger>
          <TabsTrigger value="system" className="rounded-xl data-[state=active]:bg-white data-[state=active]:shadow-md">
            <Database className="h-4 w-4 mr-2" />
            System
          </TabsTrigger>
        </TabsList>

        <div className="mt-8">
          <TabsContent value="general">
            <Card className="shadow-luxury border-dusty-rose/20 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-2xl text-deep-charcoal font-poppins flex items-center">
                  <Globe className="h-6 w-6 mr-3 text-soft-taupe" />
                  Allmänna Inställningar
                </CardTitle>
              </CardHeader>
              <CardContent>
                <Form {...form}>
                  <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <FormField
                        control={form.control}
                        name="siteName"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-deep-charcoal font-semibold">Webbplatsnamn</FormLabel>
                            <FormControl>
                              <Input className="glass border-dusty-rose/20" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="contactEmail"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-deep-charcoal font-semibold">Kontakt E-post</FormLabel>
                            <FormControl>
                              <Input type="email" className="glass border-dusty-rose/20" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>

                    <FormField
                      control={form.control}
                      name="siteDescription"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-deep-charcoal font-semibold">Webbplatsbeskrivning</FormLabel>
                          <FormControl>
                            <Textarea 
                              className="min-h-[100px] glass border-dusty-rose/20" 
                              {...field} 
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <FormField
                        control={form.control}
                        name="maintenanceMode"
                        render={({ field }) => (
                          <FormItem className="flex flex-row items-center justify-between rounded-2xl border border-dusty-rose/20 p-4 glass">
                            <div className="space-y-0.5">
                              <FormLabel className="text-deep-charcoal font-semibold">Underhållsläge</FormLabel>
                              <div className="text-sm text-soft-taupe">
                                Stäng av webbplatsen för underhåll
                              </div>
                            </div>
                            <FormControl>
                              <Switch
                                checked={field.value}
                                onCheckedChange={field.onChange}
                              />
                            </FormControl>
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="defaultCommission"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-deep-charcoal font-semibold">Standard Provision</FormLabel>
                            <FormControl>
                              <Input 
                                type="number" 
                                step="0.01"
                                min="0.1"
                                max="0.8"
                                className="glass border-dusty-rose/20" 
                                {...field} 
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>

                    <Button 
                      type="submit" 
                      className="btn-luxury rounded-2xl"
                      disabled={saveSettingsMutation.isPending}
                    >
                      {saveSettingsMutation.isPending ? (
                        <>
                          <RefreshCw className="h-4 w-4 mr-2 animate-spin" />
                          Sparar...
                        </>
                      ) : (
                        <>
                          <Save className="h-4 w-4 mr-2" />
                          Spara Inställningar
                        </>
                      )}
                    </Button>
                  </form>
                </Form>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="security">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <Card className="shadow-luxury border-dusty-rose/20 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="text-xl text-deep-charcoal font-poppins flex items-center">
                    <Shield className="h-5 w-5 mr-3 text-soft-taupe" />
                    Autentisering
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between p-4 bg-green-50 rounded-2xl border border-green-200">
                    <div className="flex items-center">
                      <CheckCircle className="h-5 w-5 text-green-600 mr-3" />
                      <div>
                        <p className="font-semibold text-green-800">Admin Autentisering</p>
                        <p className="text-sm text-green-600">Aktiv och säker</p>
                      </div>
                    </div>
                    <Badge className="bg-green-100 text-green-700">Aktiv</Badge>
                  </div>

                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-soft-taupe">Nuvarande användare:</span>
                      <span className="font-semibold text-deep-charcoal">{adminUser?.name || 'Admin'}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-soft-taupe">Senaste inloggning:</span>
                      <span className="font-semibold text-deep-charcoal">Just nu</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="shadow-luxury border-dusty-rose/20 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="text-xl text-deep-charcoal font-poppins flex items-center">
                    <Key className="h-5 w-5 mr-3 text-soft-taupe" />
                    API Nycklar
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-soft-taupe">NOWPayments:</span>
                      <Badge className="bg-yellow-100 text-yellow-700">Sandbox</Badge>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-soft-taupe">Revolut:</span>
                      <Badge className="bg-gray-100 text-gray-700">Ej konfigurerad</Badge>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-soft-taupe">Gumroad:</span>
                      <Badge className="bg-gray-100 text-gray-700">Ej konfigurerad</Badge>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="payments">
            <Card className="shadow-luxury border-dusty-rose/20 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-2xl text-deep-charcoal font-poppins flex items-center">
                  <CreditCard className="h-6 w-6 mr-3 text-soft-taupe" />
                  Betalningsinställningar
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                  <div className="bg-blue-50 rounded-2xl p-6 border border-blue-200">
                    <div className="flex items-center mb-4">
                      <div className="w-10 h-10 bg-blue-100 rounded-xl flex items-center justify-center">
                        <CreditCard className="h-5 w-5 text-blue-600" />
                      </div>
                      <div className="ml-3">
                        <h3 className="font-semibold text-blue-800">NOWPayments</h3>
                        <p className="text-xs text-blue-600">Kryptovaluta</p>
                      </div>
                    </div>
                    <Badge className="bg-green-100 text-green-700 mb-2">Aktiv</Badge>
                    <p className="text-sm text-blue-700">Bitcoin, Ethereum, USDT stöds</p>
                  </div>

                  <div className="bg-purple-50 rounded-2xl p-6 border border-purple-200">
                    <div className="flex items-center mb-4">
                      <div className="w-10 h-10 bg-purple-100 rounded-xl flex items-center justify-center">
                        <CreditCard className="h-5 w-5 text-purple-600" />
                      </div>
                      <div className="ml-3">
                        <h3 className="font-semibold text-purple-800">Revolut</h3>
                        <p className="text-xs text-purple-600">Traditionell betalning</p>
                      </div>
                    </div>
                    <Badge className="bg-gray-100 text-gray-700 mb-2">Inaktiv</Badge>
                    <p className="text-sm text-purple-700">Kräver API-nyckel</p>
                  </div>

                  <div className="bg-orange-50 rounded-2xl p-6 border border-orange-200">
                    <div className="flex items-center mb-4">
                      <div className="w-10 h-10 bg-orange-100 rounded-xl flex items-center justify-center">
                        <CreditCard className="h-5 w-5 text-orange-600" />
                      </div>
                      <div className="ml-3">
                        <h3 className="font-semibold text-orange-800">Gumroad</h3>
                        <p className="text-xs text-orange-600">Alternativ gateway</p>
                      </div>
                    </div>
                    <Badge className="bg-gray-100 text-gray-700 mb-2">Inaktiv</Badge>
                    <p className="text-sm text-orange-700">Kräver API-nyckel</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="system">
            <div className="space-y-8">
              <Card className="shadow-luxury border-dusty-rose/20 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="text-2xl text-deep-charcoal font-poppins flex items-center">
                    <Server className="h-6 w-6 mr-3 text-soft-taupe" />
                    Systemstatus
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    <div className="flex items-center justify-between p-4 bg-green-50 rounded-2xl border border-green-200">
                      <div className="flex items-center">
                        <CheckCircle className="h-5 w-5 text-green-600 mr-3" />
                        <div>
                          <p className="font-semibold text-green-800">Databas</p>
                          <p className="text-sm text-green-600">PostgreSQL</p>
                        </div>
                      </div>
                      <Badge className="bg-green-100 text-green-700">Online</Badge>
                    </div>

                    <div className="flex items-center justify-between p-4 bg-blue-50 rounded-2xl border border-blue-200">
                      <div className="flex items-center">
                        <CheckCircle className="h-5 w-5 text-blue-600 mr-3" />
                        <div>
                          <p className="font-semibold text-blue-800">Server</p>
                          <p className="text-sm text-blue-600">Express.js</p>
                        </div>
                      </div>
                      <Badge className="bg-blue-100 text-blue-700">Körs</Badge>
                    </div>

                    <div className="flex items-center justify-between p-4 bg-purple-50 rounded-2xl border border-purple-200">
                      <div className="flex items-center">
                        <CheckCircle className="h-5 w-5 text-purple-600 mr-3" />
                        <div>
                          <p className="font-semibold text-purple-800">Frontend</p>
                          <p className="text-sm text-purple-600">React + Vite</p>
                        </div>
                      </div>
                      <Badge className="bg-purple-100 text-purple-700">Aktiv</Badge>
                    </div>
                  </div>

                  <div className="mt-6 flex space-x-4">
                    <Button 
                      variant="outline" 
                      onClick={() => testConnectionMutation.mutate()}
                      disabled={testConnectionMutation.isPending}
                      className="rounded-2xl"
                    >
                      {testConnectionMutation.isPending ? (
                        <RefreshCw className="h-4 w-4 mr-2 animate-spin" />
                      ) : (
                        <Database className="h-4 w-4 mr-2" />
                      )}
                      Testa Databasanslutning
                    </Button>
                    <Button variant="outline" className="rounded-2xl">
                      <RefreshCw className="h-4 w-4 mr-2" />
                      Rensa Cache
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </div>
      </Tabs>
    </div>
  );
}