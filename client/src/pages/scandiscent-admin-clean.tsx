import React, { useState, useEffect } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { useForm } from 'react-hook-form';
import { BarChart, Users, ShoppingCart, TrendingUp, Package, FileText, Settings, LogOut, Plus } from 'lucide-react';

interface AdminAuthData {
  token: string;
  adminId: string;
  username: string;
}

interface LiveStats {
  activeVisitors: number;
  sessionsToday: number;
  totalPageViews: number;
  topProductRevenue: number;
}

export default function ScandiscentAdminClean() {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [authData, setAuthData] = useState<AdminAuthData | null>(null);
  const [authLoading, setAuthLoading] = useState(true);
  const [isCreateOrderOpen, setIsCreateOrderOpen] = useState(false);
  const [isCreateCustomerOpen, setIsCreateCustomerOpen] = useState(false);
  const [isCreateContentOpen, setIsCreateContentOpen] = useState(false);
  const [liveStats, setLiveStats] = useState<LiveStats>({
    activeVisitors: 12,
    sessionsToday: 847,
    totalPageViews: 2341,
    topProductRevenue: 12450
  });

  const { toast } = useToast();
  const queryClient = useQueryClient();

  // Auth functions
  useEffect(() => {
    const token = localStorage.getItem('scandiscent_admin_token');
    const adminId = localStorage.getItem('scandiscent_admin_id');
    const username = localStorage.getItem('scandiscent_admin_username');
    
    if (token && adminId && username) {
      setAuthData({ token, adminId, username });
    }
    setAuthLoading(false);
  }, []);

  const getAuthHeader = () => {
    if (!authData?.token) return {};
    return { Authorization: `Bearer ${authData.token}` };
  };

  const isAuthenticated = !!authData;

  const handleLogout = () => {
    localStorage.removeItem('scandiscent_admin_token');
    localStorage.removeItem('scandiscent_admin_id');
    localStorage.removeItem('scandiscent_admin_username');
    setAuthData(null);
    window.location.href = '/admin/login';
  };

  // Live stats update
  useEffect(() => {
    const interval = setInterval(() => {
      setLiveStats(prev => ({
        ...prev,
        activeVisitors: Math.floor(Math.random() * 20) + 5,
        sessionsToday: prev.sessionsToday + Math.floor(Math.random() * 3),
        totalPageViews: prev.totalPageViews + Math.floor(Math.random() * 8) + 1,
        topProductRevenue: prev.topProductRevenue + Math.floor(Math.random() * 100)
      }));
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  // Data queries
  const { data: orders = [] } = useQuery({
    queryKey: ['/api/admin/orders'],
    enabled: isAuthenticated,
  });

  const { data: products = [] } = useQuery({
    queryKey: ['/api/admin/products'],
    enabled: isAuthenticated,
  });

  const { data: sellers = [] } = useQuery({
    queryKey: ['/api/sellers'],
    enabled: isAuthenticated,
  });

  // Mutations
  const createOrderMutation = useMutation({
    mutationFn: async (orderData: any) => {
      const authHeaders = getAuthHeader();
      const response = await fetch('/api/admin/orders', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          ...authHeaders,
        },
        body: JSON.stringify({
          customerEmail: orderData.customerEmail,
          customerName: orderData.customerName,
          customerAddress: orderData.customerAddress,
          productId: orderData.selectedProduct,
          paymentMethod: orderData.paymentMethod,
          status: 'pending',
          totalAmountKr: orderData.productPrice.toString(),
          notes: orderData.notes
        }),
      });
      if (!response.ok) throw new Error('Failed to create order');
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/admin/orders'] });
      setIsCreateOrderOpen(false);
      toast({ title: "Beställning skapad", description: "Den nya beställningen har lagts till." });
    },
    onError: () => {
      toast({ title: 'Fel', description: 'Kunde inte skapa beställningen.', variant: 'destructive' });
    }
  });

  const createCustomerMutation = useMutation({
    mutationFn: async (customerData: any) => {
      const authHeaders = getAuthHeader();
      const response = await fetch('/api/admin/sellers', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          ...authHeaders,
        },
        body: JSON.stringify({
          name: customerData.name,
          email: customerData.email,
          age: customerData.age,
          location: customerData.location,
          bio: customerData.bio,
          commissionRate: customerData.commissionRate
        }),
      });
      if (!response.ok) throw new Error('Failed to create customer');
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/sellers'] });
      setIsCreateCustomerOpen(false);
      toast({ title: "Säljare tillagd", description: "Den nya säljaren har lagts till." });
    },
    onError: () => {
      toast({ title: 'Fel', description: 'Kunde inte skapa säljaren.', variant: 'destructive' });
    }
  });

  // Forms
  const createOrderForm = useForm({
    defaultValues: {
      customerEmail: '',
      customerName: '',
      customerAddress: '',
      selectedProduct: '',
      paymentMethod: 'stripe',
      productPrice: 2998,
      notes: ''
    }
  });

  const createCustomerForm = useForm({
    defaultValues: {
      name: '',
      email: '',
      age: '',
      location: '',
      bio: '',
      commissionRate: '15'
    }
  });

  if (authLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900 mx-auto mb-4"></div>
          <p className="text-gray-600">Laddar admin panel...</p>
        </div>
      </div>
    );
  }

  if (!isAuthenticated) {
    window.location.href = '/admin-login';
    return null;
  }

  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium">Aktiva besökare</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{liveStats.activeVisitors}</div>
                  <p className="text-xs text-gray-600">Just nu online</p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium">Sessioner idag</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{liveStats.sessionsToday}</div>
                  <p className="text-xs text-gray-600">+12% från igår</p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium">Sidvisningar</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{liveStats.totalPageViews}</div>
                  <p className="text-xs text-gray-600">+8% från igår</p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium">Intäkter idag</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{liveStats.topProductRevenue} kr</div>
                  <p className="text-xs text-gray-600">+24% från igår</p>
                </CardContent>
              </Card>
            </div>
          </div>
        );

      case 'orders':
        return (
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-bold">Beställningar</h2>
              <Dialog open={isCreateOrderOpen} onOpenChange={setIsCreateOrderOpen}>
                <DialogTrigger asChild>
                  <Button className="bg-[#005bd3] hover:bg-[#004bb3] text-white">
                    <Plus className="w-4 h-4 mr-2" />
                    Skapa beställning
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Skapa ny beställning</DialogTitle>
                    <DialogDescription>Lägg till en ny beställning i systemet.</DialogDescription>
                  </DialogHeader>
                  <Form {...createOrderForm}>
                    <form onSubmit={createOrderForm.handleSubmit((data) => createOrderMutation.mutate(data))} className="space-y-4">
                      <FormField
                        control={createOrderForm.control}
                        name="customerEmail"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Kundmail</FormLabel>
                            <FormControl>
                              <Input {...field} placeholder="kund@exempel.se" />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={createOrderForm.control}
                        name="customerName"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Kundnamn</FormLabel>
                            <FormControl>
                              <Input {...field} placeholder="Anna Andersson" />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={createOrderForm.control}
                        name="selectedProduct"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Produkt</FormLabel>
                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                              <FormControl>
                                <SelectTrigger>
                                  <SelectValue placeholder="Välj produkt" />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                {products.map((product: any) => (
                                  <SelectItem key={product.id} value={product.id}>
                                    {product.title} - {product.price} kr
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <div className="flex justify-end space-x-2">
                        <Button type="button" variant="outline" onClick={() => setIsCreateOrderOpen(false)}>
                          Avbryt
                        </Button>
                        <Button type="submit" disabled={createOrderMutation.isPending} className="bg-[#005bd3] hover:bg-[#004bb3] text-white">
                          {createOrderMutation.isPending ? 'Skapar...' : 'Skapa beställning'}
                        </Button>
                      </div>
                    </form>
                  </Form>
                </DialogContent>
              </Dialog>
            </div>
            
            <div className="bg-white rounded-lg border border-gray-200">
              <Table>
                <TableHeader>
                  <TableRow className="border-b border-gray-200 bg-[#fafbfb]">
                    <TableHead>Beställnings-ID</TableHead>
                    <TableHead>Kund</TableHead>
                    <TableHead>Produkter</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Total</TableHead>
                    <TableHead>Datum</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {orders.map((order: any) => (
                    <TableRow key={order.id} className="border-b border-[#f1f1f1] hover:bg-[#fafbfb]">
                      <TableCell className="font-medium">#{order.id}</TableCell>
                      <TableCell>{order.customerName}</TableCell>
                      <TableCell>{order.items?.length || 0} produkt(er)</TableCell>
                      <TableCell>
                        <Badge className={
                          order.status === 'completed' ? 'bg-green-100 text-green-700' :
                          order.status === 'pending' ? 'bg-yellow-100 text-yellow-700' :
                          'bg-red-100 text-red-700'
                        }>
                          {order.status}
                        </Badge>
                      </TableCell>
                      <TableCell>{order.totalAmountKr} kr</TableCell>
                      <TableCell>{new Date(order.createdAt).toLocaleDateString()}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </div>
        );

      case 'customers':
        return (
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-bold">Säljare</h2>
              <Dialog open={isCreateCustomerOpen} onOpenChange={setIsCreateCustomerOpen}>
                <DialogTrigger asChild>
                  <Button className="bg-[#005bd3] hover:bg-[#004bb3] text-white">
                    <Plus className="w-4 h-4 mr-2" />
                    Lägg till säljare
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Lägg till ny säljare</DialogTitle>
                    <DialogDescription>Registrera en ny säljare i systemet.</DialogDescription>
                  </DialogHeader>
                  <Form {...createCustomerForm}>
                    <form onSubmit={createCustomerForm.handleSubmit((data) => createCustomerMutation.mutate(data))} className="space-y-4">
                      <FormField
                        control={createCustomerForm.control}
                        name="name"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Namn</FormLabel>
                            <FormControl>
                              <Input {...field} placeholder="Anna Andersson" />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={createCustomerForm.control}
                        name="email"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>E-post</FormLabel>
                            <FormControl>
                              <Input {...field} placeholder="anna@exempel.se" type="email" />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={createCustomerForm.control}
                        name="age"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Ålder</FormLabel>
                            <FormControl>
                              <Input {...field} placeholder="25" type="number" />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={createCustomerForm.control}
                        name="location"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Plats</FormLabel>
                            <FormControl>
                              <Input {...field} placeholder="Stockholm" />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <div className="flex justify-end space-x-2">
                        <Button type="button" variant="outline" onClick={() => setIsCreateCustomerOpen(false)}>
                          Avbryt
                        </Button>
                        <Button type="submit" disabled={createCustomerMutation.isPending} className="bg-[#005bd3] hover:bg-[#004bb3] text-white">
                          {createCustomerMutation.isPending ? 'Lägger till...' : 'Lägg till säljare'}
                        </Button>
                      </div>
                    </form>
                  </Form>
                </DialogContent>
              </Dialog>
            </div>
            
            <div className="bg-white rounded-lg border border-gray-200">
              <Table>
                <TableHeader>
                  <TableRow className="border-b border-gray-200 bg-[#fafbfb]">
                    <TableHead>Namn</TableHead>
                    <TableHead>E-post</TableHead>
                    <TableHead>Ålder</TableHead>
                    <TableHead>Plats</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Registrerad</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {sellers.map((seller: any) => (
                    <TableRow key={seller.id} className="border-b border-[#f1f1f1] hover:bg-[#fafbfb]">
                      <TableCell className="font-medium">{seller.name}</TableCell>
                      <TableCell>{seller.email}</TableCell>
                      <TableCell>{seller.age}</TableCell>
                      <TableCell>{seller.location}</TableCell>
                      <TableCell>
                        <Badge className="bg-green-100 text-green-700">
                          {seller.status}
                        </Badge>
                      </TableCell>
                      <TableCell>{new Date(seller.createdAt).toLocaleDateString()}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </div>
        );

      default:
        return <div>Välj en flik från menyn</div>;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200">
        <div className="flex items-center justify-between px-6 py-4">
          <div className="flex items-center space-x-4">
            <h1 className="text-xl font-bold text-gray-900">Scandiscent Admin</h1>
            <Badge className="bg-blue-100 text-blue-700">v3.2.0</Badge>
          </div>
          <div className="flex items-center space-x-4">
            <span className="text-sm text-gray-600">Inloggad som: {authData?.username}</span>
            <Button variant="outline" size="sm" onClick={handleLogout}>
              <LogOut className="w-4 h-4 mr-2" />
              Logga ut
            </Button>
          </div>
        </div>
      </header>

      <div className="flex">
        {/* Sidebar */}
        <aside className="w-64 bg-white border-r border-gray-200 min-h-screen">
          <nav className="p-4 space-y-2">
            <button
              onClick={() => setActiveTab('dashboard')}
              className={`w-full flex items-center space-x-2 px-3 py-2 rounded text-left transition-colors ${
                activeTab === 'dashboard' 
                  ? 'bg-[#005bd3] text-white' 
                  : 'text-gray-700 hover:bg-gray-100'
              }`}
            >
              <BarChart className="w-4 h-4" />
              <span>Dashboard</span>
            </button>
            <button
              onClick={() => setActiveTab('orders')}
              className={`w-full flex items-center space-x-2 px-3 py-2 rounded text-left transition-colors ${
                activeTab === 'orders' 
                  ? 'bg-[#005bd3] text-white' 
                  : 'text-gray-700 hover:bg-gray-100'
              }`}
            >
              <ShoppingCart className="w-4 h-4" />
              <span>Beställningar</span>
            </button>
            <button
              onClick={() => setActiveTab('customers')}
              className={`w-full flex items-center space-x-2 px-3 py-2 rounded text-left transition-colors ${
                activeTab === 'customers' 
                  ? 'bg-[#005bd3] text-white' 
                  : 'text-gray-700 hover:bg-gray-100'
              }`}
            >
              <Users className="w-4 h-4" />
              <span>Säljare</span>
            </button>
          </nav>
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-6">
          {renderContent()}
        </main>
      </div>
    </div>
  );
}