import { useState } from "react";
import { useQuery, useMutation } from "@tanstack/react-query";
import { useAdminAuth } from "@/hooks/useAdminAuth";
import { queryClient } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { 
  Home,
  ShoppingBag, 
  Users, 
  Package,
  Settings,
  Search,
  Plus,
  Trash2,
  ChevronRight,
  Calendar,
  TrendingUp,
  BarChart3
} from "lucide-react";

function PromoCodesPanel() {
  const { getAuthHeader } = useAdminAuth();
  const { toast } = useToast();
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);

  const { data: promoCodes = [], refetch } = useQuery({
    queryKey: ['/api/admin/promo-codes'],
    queryFn: async () => {
      const authHeaders = getAuthHeader();
      const response = await fetch('/api/admin/promo-codes', {
        headers: authHeaders,
      });
      if (!response.ok) throw new Error('Failed to fetch promo codes');
      return response.json();
    },
  });

  const createPromoMutation = useMutation({
    mutationFn: async (promoData: any) => {
      const authHeaders = getAuthHeader();
      const response = await fetch('/api/admin/promo-codes', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          ...authHeaders,
        },
        body: JSON.stringify(promoData),
      });
      if (!response.ok) throw new Error('Failed to create promo code');
      return response.json();
    },
    onSuccess: () => {
      refetch();
      setIsCreateDialogOpen(false);
      toast({ title: "Rabattkod skapad", description: "Den nya rabattkoden är nu aktiv." });
    },
  });

  const deletePromoMutation = useMutation({
    mutationFn: async (id: string) => {
      const authHeaders = getAuthHeader();
      const response = await fetch(`/api/admin/promo-codes/${id}`, {
        method: 'DELETE',
        headers: authHeaders,
      });
      if (!response.ok) throw new Error('Failed to delete promo code');
    },
    onSuccess: () => {
      refetch();
      toast({ title: "Rabattkod raderad", description: "Rabattkoden har tagits bort." });
    },
  });

  const togglePromoMutation = useMutation({
    mutationFn: async ({ id, isActive }: { id: string; isActive: boolean }) => {
      const authHeaders = getAuthHeader();
      const response = await fetch(`/api/admin/promo-codes/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          ...authHeaders,
        },
        body: JSON.stringify({ isActive }),
      });
      if (!response.ok) throw new Error('Failed to update promo code');
      return response.json();
    },
    onSuccess: () => {
      refetch();
      toast({ title: "Rabattkod uppdaterad", description: "Status har ändrats." });
    },
  });

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold text-gray-900">Rabattkoder</h1>
        <Button
          onClick={() => setIsCreateDialogOpen(true)}
          className="bg-gray-900 hover:bg-gray-800 text-white"
        >
          <Plus className="h-4 w-4 mr-2" />
          Lägg till rabattkod
        </Button>
      </div>

      <Card className="border border-gray-200 shadow-sm">
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow className="border-b border-gray-200">
                <TableHead className="text-gray-600 font-medium">Kod</TableHead>
                <TableHead className="text-gray-600 font-medium">Rabatt</TableHead>
                <TableHead className="text-gray-600 font-medium">Användningar</TableHead>
                <TableHead className="text-gray-600 font-medium">Giltig till</TableHead>
                <TableHead className="text-gray-600 font-medium">Status</TableHead>
                <TableHead className="text-gray-600 font-medium">Åtgärder</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {promoCodes.map((promo: any) => (
                <TableRow key={promo.id} className="border-b border-gray-100 hover:bg-gray-50">
                  <TableCell className="font-medium text-gray-900">{promo.code}</TableCell>
                  <TableCell className="text-gray-700">{promo.discountKr} kr</TableCell>
                  <TableCell className="text-gray-700">
                    {promo.usageCount}{promo.maxUsage ? ` / ${promo.maxUsage}` : ''}
                  </TableCell>
                  <TableCell className="text-gray-700">
                    {promo.validUntil 
                      ? new Date(promo.validUntil).toLocaleDateString('sv-SE')
                      : '—'
                    }
                  </TableCell>
                  <TableCell>
                    <Badge className={promo.isActive ? "bg-green-100 text-green-800 border-green-200" : "bg-gray-100 text-gray-600 border-gray-200"}>
                      {promo.isActive ? 'Aktiv' : 'Inaktiv'}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center space-x-2">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => togglePromoMutation.mutate({ id: promo.id, isActive: !promo.isActive })}
                        className="text-gray-600 hover:text-gray-900"
                      >
                        {promo.isActive ? 'Inaktivera' : 'Aktivera'}
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => deletePromoMutation.mutate(promo.id)}
                        className="text-red-600 hover:text-red-800"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      <CreatePromoCodeDialog
        open={isCreateDialogOpen}
        onOpenChange={setIsCreateDialogOpen}
        onSubmit={(data) => createPromoMutation.mutate(data)}
        isLoading={createPromoMutation.isPending}
      />
    </div>
  );
}

function CreatePromoCodeDialog({ open, onOpenChange, onSubmit, isLoading }: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSubmit: (data: any) => void;
  isLoading: boolean;
}) {
  const [formData, setFormData] = useState({
    code: '',
    discountKr: '',
    description: '',
    maxUsage: '',
    validUntil: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({
      code: formData.code.toUpperCase(),
      discountKr: parseFloat(formData.discountKr),
      description: formData.description,
      maxUsage: formData.maxUsage ? parseInt(formData.maxUsage) : null,
      validUntil: formData.validUntil ? new Date(formData.validUntil) : null,
      isActive: true,
    });
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Skapa ny rabattkod</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1 text-gray-700">Kod</label>
            <Input
              value={formData.code}
              onChange={(e) => setFormData({ ...formData, code: e.target.value })}
              placeholder="SUMMER20"
              className="border-gray-300"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1 text-gray-700">Rabatt (kr)</label>
            <Input
              type="number"
              value={formData.discountKr}
              onChange={(e) => setFormData({ ...formData, discountKr: e.target.value })}
              placeholder="100"
              className="border-gray-300"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1 text-gray-700">Beskrivning</label>
            <Input
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              placeholder="Sommarkampanj 2025"
              className="border-gray-300"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1 text-gray-700">Max användningar (valfritt)</label>
            <Input
              type="number"
              value={formData.maxUsage}
              onChange={(e) => setFormData({ ...formData, maxUsage: e.target.value })}
              placeholder="100"
              className="border-gray-300"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1 text-gray-700">Giltig till (valfritt)</label>
            <Input
              type="date"
              value={formData.validUntil}
              onChange={(e) => setFormData({ ...formData, validUntil: e.target.value })}
              className="border-gray-300"
            />
          </div>
          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
              Avbryt
            </Button>
            <Button type="submit" disabled={isLoading} className="bg-gray-900 hover:bg-gray-800">
              {isLoading ? 'Skapar...' : 'Skapa rabattkod'}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}

export default function ShopifyStyleAdmin() {
  const { isAuthenticated, isLoading: authLoading, adminUser, logout, getAuthHeader } = useAdminAuth();
  const { toast } = useToast();
  const [selectedTab, setSelectedTab] = useState("home");
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);

  // Promo codes queries
  const { data: promoCodes = [], refetch } = useQuery({
    queryKey: ['/api/admin/promo-codes'],
    enabled: isAuthenticated,
    queryFn: async () => {
      const authHeaders = getAuthHeader();
      const response = await fetch('/api/admin/promo-codes', {
        headers: authHeaders,
      });
      if (!response.ok) throw new Error('Failed to fetch promo codes');
      return response.json();
    },
  });

  const createPromoMutation = useMutation({
    mutationFn: async (promoData: any) => {
      const authHeaders = getAuthHeader();
      const response = await fetch('/api/admin/promo-codes', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          ...authHeaders,
        },
        body: JSON.stringify(promoData),
      });
      if (!response.ok) throw new Error('Failed to create promo code');
      return response.json();
    },
    onSuccess: () => {
      refetch();
      setIsCreateDialogOpen(false);
      toast({ title: "Rabattkod skapad", description: "Den nya rabattkoden är nu aktiv." });
    },
  });

  const deletePromoMutation = useMutation({
    mutationFn: async (id: string) => {
      const authHeaders = getAuthHeader();
      const response = await fetch(`/api/admin/promo-codes/${id}`, {
        method: 'DELETE',
        headers: authHeaders,
      });
      if (!response.ok) throw new Error('Failed to delete promo code');
    },
    onSuccess: () => {
      refetch();
      toast({ title: "Rabattkod raderad", description: "Rabattkoden har tagits bort." });
    },
  });

  const togglePromoMutation = useMutation({
    mutationFn: async ({ id, isActive }: { id: string; isActive: boolean }) => {
      const authHeaders = getAuthHeader();
      const response = await fetch(`/api/admin/promo-codes/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          ...authHeaders,
        },
        body: JSON.stringify({ isActive }),
      });
      if (!response.ok) throw new Error('Failed to update promo code');
      return response.json();
    },
    onSuccess: () => {
      refetch();
      toast({ title: "Rabattkod uppdaterad", description: "Status har ändrats." });
    },
  });

  // Queries with authentication
  const { data: orders = [], isLoading: ordersLoading } = useQuery({
    queryKey: ['/api/admin/orders'],
    enabled: isAuthenticated,
    queryFn: async () => {
      const authHeaders = getAuthHeader();
      const response = await fetch('/api/admin/orders', {
        headers: authHeaders,
      });
      if (!response.ok) throw new Error('Failed to fetch orders');
      return response.json();
    },
  });

  const { data: products = [] } = useQuery({
    queryKey: ['/api/products'],
    enabled: isAuthenticated,
  });

  const { data: sellers = [] } = useQuery({
    queryKey: ['/api/sellers'],
    enabled: isAuthenticated,
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
    window.location.href = '/admin/login';
    return null;
  }

  // Calculate stats
  const stats = {
    sessions: orders.length,
    totalSales: orders.reduce((sum: number, order: any) => sum + parseFloat(order.totalAmountKr || 0), 0),
    totalOrders: orders.length,
    conversionRate: "33.33%",
  };

  // Sidebar navigation items exactly like Shopify
  const navigationItems = [
    { id: "home", label: "Home", icon: Home },
    { id: "orders", label: "Orders", icon: ShoppingBag },
    { id: "products", label: "Products", icon: Package },
    { id: "customers", label: "Customers", icon: Users },
    { id: "content", label: "Content", icon: Package },
    { id: "analytics", label: "Analytics", icon: BarChart3 },
    { id: "marketing", label: "Marketing", icon: TrendingUp },
    { id: "discounts", label: "Discounts", icon: TrendingUp },
  ];

  const salesChannelItems = [
    { id: "online-store", label: "Online Store", icon: Package },
    { id: "point-of-sale", label: "Point of Sale", icon: Package },
    { id: "buy-button", label: "Buy Button", icon: Package },
  ];

  const renderContent = () => {
    switch (selectedTab) {
      case "home":
        return (
          <div className="p-6">
            {/* Header exactly like Shopify */}
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center space-x-4">
                <Select defaultValue="today">
                  <SelectTrigger className="w-[100px] h-8 text-sm border-gray-300">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="today">Today</SelectItem>
                    <SelectItem value="week">This week</SelectItem>
                    <SelectItem value="month">This month</SelectItem>
                  </SelectContent>
                </Select>
                <Select defaultValue="all">
                  <SelectTrigger className="w-[140px] h-8 text-sm border-gray-300">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All channels</SelectItem>
                    <SelectItem value="online">Online Store</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="text-right">
                <p className="text-xs text-gray-500">Next payout</p>
                <p className="text-sm font-medium text-gray-900">${stats.totalSales}</p>
              </div>
            </div>

            {/* Stats Grid exactly like Shopify */}
            <div className="grid grid-cols-4 gap-4 mb-6">
              <div className="bg-gray-100 p-4 rounded-lg">
                <div className="text-xs text-gray-600 mb-1">Sessions</div>
                <div className="text-2xl font-bold text-gray-900">{stats.sessions}</div>
                <div className="text-xs text-gray-500">—</div>
              </div>
              <div className="bg-gray-100 p-4 rounded-lg">
                <div className="text-xs text-gray-600 mb-1">Total sales</div>
                <div className="text-2xl font-bold text-gray-900">${stats.totalSales}</div>
                <div className="text-xs text-gray-500">—</div>
              </div>
              <div className="bg-gray-100 p-4 rounded-lg">
                <div className="text-xs text-gray-600 mb-1">Total orders</div>
                <div className="text-2xl font-bold text-gray-900">{stats.totalOrders}</div>
                <div className="text-xs text-gray-500">—</div>
              </div>
              <div className="bg-gray-100 p-4 rounded-lg relative">
                <div className="text-xs text-gray-600 mb-1">Conversion rate</div>
                <div className="text-2xl font-bold text-gray-900">{stats.conversionRate}</div>
                <div className="text-xs text-gray-500">—</div>
                <button className="absolute top-2 right-2 text-gray-400 hover:text-gray-600">
                  <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
                  </svg>
                </button>
              </div>
            </div>

            {/* Chart section exactly like Shopify */}
            <div className="bg-white border border-gray-200 rounded-lg p-6">
              <div className="h-80 relative">
                {/* Chart area with grid lines */}
                <div className="absolute inset-0 bg-gray-50 rounded">
                  <svg className="w-full h-full">
                    {/* Grid lines */}
                    <defs>
                      <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
                        <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#e5e7eb" strokeWidth="1"/>
                      </pattern>
                    </defs>
                    <rect width="100%" height="100%" fill="url(#grid)" />
                    
                    {/* Mock Shopify-style chart line */}
                    <path 
                      d="M 60 320 L 120 280 L 180 260 L 240 200 L 300 80 L 360 60 L 420 50 L 480 100 L 540 120 L 600 300 L 660 280"
                      fill="none" 
                      stroke="#00b4d8" 
                      strokeWidth="2"
                    />
                    <path 
                      d="M 60 320 L 120 300 L 180 290 L 240 280 L 300 270 L 360 260 L 420 250 L 480 240 L 540 230 L 600 320 L 660 310"
                      fill="none" 
                      stroke="#ccc" 
                      strokeWidth="1"
                      strokeDasharray="5,5"
                    />
                  </svg>
                  
                  {/* Time labels */}
                  <div className="absolute bottom-2 left-0 w-full flex justify-between text-xs text-gray-500 px-4">
                    <span>12:00 AM</span>
                    <span>3:00 AM</span>
                    <span>6:00 AM</span>
                    <span>9:00 AM</span>
                    <span>12:00 PM</span>
                    <span>3:00 PM</span>
                    <span>6:00 PM</span>
                    <span>9:00 PM</span>
                  </div>

                  {/* Legend */}
                  <div className="absolute bottom-4 right-4 flex items-center space-x-4 text-xs">
                    <div className="flex items-center space-x-2">
                      <div className="w-3 h-0.5 bg-blue-500"></div>
                      <span className="text-gray-600">Sep 7, 2023</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <div className="w-3 h-0.5 bg-gray-400 border-dashed"></div>
                      <span className="text-gray-600">Sep 6, 2023</span>
                    </div>
                  </div>
                </div>

                {/* Y-axis labels */}
                <div className="absolute left-0 top-0 h-full flex flex-col justify-between text-xs text-gray-500 py-4">
                  <span>2</span>
                  <span>1.5</span>
                  <span>1</span>
                  <span>0.5</span>
                  <span>0</span>
                </div>
              </div>
            </div>
          </div>
        );

      case "orders":
        return (
          <div className="p-6">
            <div className="flex items-center justify-between mb-6">
              <h1 className="text-2xl font-semibold text-gray-900">Orders</h1>
            </div>
            <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
              <Table>
                <TableHeader>
                  <TableRow className="border-b border-gray-200 bg-gray-50">
                    <TableHead className="text-xs font-medium text-gray-600 uppercase tracking-wide px-6 py-3">Order</TableHead>
                    <TableHead className="text-xs font-medium text-gray-600 uppercase tracking-wide px-6 py-3">Date</TableHead>
                    <TableHead className="text-xs font-medium text-gray-600 uppercase tracking-wide px-6 py-3">Customer</TableHead>
                    <TableHead className="text-xs font-medium text-gray-600 uppercase tracking-wide px-6 py-3">Payment status</TableHead>
                    <TableHead className="text-xs font-medium text-gray-600 uppercase tracking-wide px-6 py-3">Total</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {orders.map((order: any) => (
                    <TableRow key={order.id} className="border-b border-gray-100 hover:bg-gray-50">
                      <TableCell className="px-6 py-4 font-medium text-blue-600">#{order.id.slice(-8)}</TableCell>
                      <TableCell className="px-6 py-4 text-sm text-gray-700">
                        {new Date(order.createdAt).toLocaleDateString('en-US')}
                      </TableCell>
                      <TableCell className="px-6 py-4 text-sm text-gray-700">{order.customerEmail}</TableCell>
                      <TableCell className="px-6 py-4">
                        <Badge className={
                          order.status === 'completed' ? "bg-green-100 text-green-800 border-green-200" :
                          order.status === 'pending' ? "bg-yellow-100 text-yellow-800 border-yellow-200" :
                          "bg-gray-100 text-gray-600 border-gray-200"
                        }>
                          {order.status}
                        </Badge>
                      </TableCell>
                      <TableCell className="px-6 py-4 text-sm font-medium text-gray-900">${order.totalAmountKr}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </div>
        );

      case "products":
        return (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h1 className="text-2xl font-semibold text-gray-900">Produkter</h1>
              <Button className="bg-gray-900 hover:bg-gray-800 text-white">
                <Plus className="h-4 w-4 mr-2" />
                Lägg till produkt
              </Button>
            </div>
            <Card className="border border-gray-200 shadow-sm">
              <CardContent className="p-0">
                <Table>
                  <TableHeader>
                    <TableRow className="border-b border-gray-200">
                      <TableHead className="text-gray-600 font-medium">Produkt</TableHead>
                      <TableHead className="text-gray-600 font-medium">Status</TableHead>
                      <TableHead className="text-gray-600 font-medium">Lager</TableHead>
                      <TableHead className="text-gray-600 font-medium">Säljare</TableHead>
                      <TableHead className="text-gray-600 font-medium">Pris</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {products.map((product: any) => (
                      <TableRow key={product.id} className="border-b border-gray-100 hover:bg-gray-50">
                        <TableCell className="font-medium text-gray-900">{product.title}</TableCell>
                        <TableCell>
                          <Badge className="bg-green-100 text-green-800 border-green-200">
                            Aktiv
                          </Badge>
                        </TableCell>
                        <TableCell className="text-gray-700">1 på lager</TableCell>
                        <TableCell className="text-gray-700">{product.seller?.alias}</TableCell>
                        <TableCell className="text-gray-900">{product.priceKr} kr</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </div>
        );

      case "customers":
        return (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h1 className="text-2xl font-semibold text-gray-900">Säljare</h1>
              <Button className="bg-gray-900 hover:bg-gray-800 text-white">
                <Plus className="h-4 w-4 mr-2" />
                Lägg till säljare
              </Button>
            </div>
            <Card className="border border-gray-200 shadow-sm">
              <CardContent className="p-0">
                <Table>
                  <TableHeader>
                    <TableRow className="border-b border-gray-200">
                      <TableHead className="text-gray-600 font-medium">Säljare</TableHead>
                      <TableHead className="text-gray-600 font-medium">Plats</TableHead>
                      <TableHead className="text-gray-600 font-medium">Ålder</TableHead>
                      <TableHead className="text-gray-600 font-medium">Status</TableHead>
                      <TableHead className="text-gray-600 font-medium">Provision</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {sellers.map((seller: any) => (
                      <TableRow key={seller.id} className="border-b border-gray-100 hover:bg-gray-50">
                        <TableCell className="font-medium text-gray-900">{seller.alias}</TableCell>
                        <TableCell className="text-gray-700">{seller.location}</TableCell>
                        <TableCell className="text-gray-700">{seller.age} år</TableCell>
                        <TableCell>
                          <Badge className={seller.isActive ? "bg-green-100 text-green-800 border-green-200" : "bg-red-100 text-red-800 border-red-200"}>
                            {seller.isActive ? 'Aktiv' : 'Inaktiv'}
                          </Badge>
                        </TableCell>
                        <TableCell className="text-gray-900">{(parseFloat(seller.commissionRate) * 100).toFixed(0)}%</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </div>
        );

      case "discounts":
        return (
          <div className="p-6">
            <div className="flex items-center justify-between mb-6">
              <h1 className="text-2xl font-semibold text-gray-900">Discounts</h1>
              <Button
                onClick={() => setIsCreateDialogOpen(true)}
                className="bg-gray-900 hover:bg-gray-800 text-white h-8 px-4 text-sm"
              >
                Create discount
              </Button>
            </div>
            <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
              <Table>
                <TableHeader>
                  <TableRow className="border-b border-gray-200 bg-gray-50">
                    <TableHead className="text-xs font-medium text-gray-600 uppercase tracking-wide px-6 py-3">Code</TableHead>
                    <TableHead className="text-xs font-medium text-gray-600 uppercase tracking-wide px-6 py-3">Discount</TableHead>
                    <TableHead className="text-xs font-medium text-gray-600 uppercase tracking-wide px-6 py-3">Uses</TableHead>
                    <TableHead className="text-xs font-medium text-gray-600 uppercase tracking-wide px-6 py-3">Valid until</TableHead>
                    <TableHead className="text-xs font-medium text-gray-600 uppercase tracking-wide px-6 py-3">Status</TableHead>
                    <TableHead className="text-xs font-medium text-gray-600 uppercase tracking-wide px-6 py-3">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {promoCodes.map((promo: any) => (
                    <TableRow key={promo.id} className="border-b border-gray-100 hover:bg-gray-50">
                      <TableCell className="px-6 py-4 font-medium text-gray-900">{promo.code}</TableCell>
                      <TableCell className="px-6 py-4 text-sm text-gray-700">${promo.discountKr}</TableCell>
                      <TableCell className="px-6 py-4 text-sm text-gray-700">
                        {promo.usageCount}{promo.maxUsage ? ` / ${promo.maxUsage}` : ''}
                      </TableCell>
                      <TableCell className="px-6 py-4 text-sm text-gray-700">
                        {promo.validUntil 
                          ? new Date(promo.validUntil).toLocaleDateString('en-US')
                          : '—'
                        }
                      </TableCell>
                      <TableCell className="px-6 py-4">
                        <Badge className={promo.isActive ? "bg-green-100 text-green-800 border-green-200" : "bg-gray-100 text-gray-600 border-gray-200"}>
                          {promo.isActive ? 'Active' : 'Inactive'}
                        </Badge>
                      </TableCell>
                      <TableCell className="px-6 py-4">
                        <div className="flex items-center space-x-2">
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => togglePromoMutation.mutate({ id: promo.id, isActive: !promo.isActive })}
                            className="text-xs text-gray-600 hover:text-gray-900 h-6 px-2"
                          >
                            {promo.isActive ? 'Disable' : 'Enable'}
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => deletePromoMutation.mutate(promo.id)}
                            className="text-xs text-red-600 hover:text-red-800 h-6 px-2"
                          >
                            <Trash2 className="h-3 w-3" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>

            <CreatePromoCodeDialog
              open={isCreateDialogOpen}
              onOpenChange={setIsCreateDialogOpen}
              onSubmit={(data) => createPromoMutation.mutate(data)}
              isLoading={createPromoMutation.isPending}
            />
          </div>
        );

      case "settings":
        return (
          <div className="space-y-6">
            <h1 className="text-2xl font-semibold text-gray-900">Inställningar</h1>
            <Card className="border border-gray-200 shadow-sm">
              <CardContent className="p-6">
                <p className="text-gray-600">Inställningar kommer här</p>
              </CardContent>
            </Card>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Shopify Header - Dark Navy Blue */}
      <header className="bg-[#1a1a1a] text-white h-14 flex items-center px-4">
        <div className="flex items-center justify-between w-full">
          {/* Left side */}
          <div className="flex items-center space-x-4">
            <div className="bg-green-500 text-white px-2 py-1 rounded text-sm font-semibold">S</div>
            <span className="text-white font-medium">scandiscent</span>
            <span className="text-gray-400 text-sm">Summer '25</span>
          </div>
          
          {/* Center search */}
          <div className="flex-1 max-w-md mx-8">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <input 
                type="text" 
                placeholder="Search" 
                className="w-full pl-10 pr-12 py-2 bg-gray-800 text-white border border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
              />
              <span className="absolute right-3 top-1/2 transform -translate-y-1/2 text-xs text-gray-400">Ctrl K</span>
            </div>
          </div>

          {/* Right side */}
          <div className="flex items-center space-x-3">
            <div className="bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">1</div>
            <span className="text-sm text-gray-300">Website Builder Insider...</span>
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={logout}
              className="text-white hover:bg-gray-800 h-8"
            >
              Logga ut
            </Button>
          </div>
        </div>
      </header>

      <div className="flex">
        {/* Sidebar - Light Gray like Shopify */}
        <aside className="w-64 bg-[#f1f1f1] min-h-screen border-r border-gray-300">
          <nav className="py-4">
            {/* Main Navigation */}
            <ul className="space-y-1">
              {navigationItems.map((item) => {
                const Icon = item.icon;
                return (
                  <li key={item.id}>
                    <button
                      onClick={() => setSelectedTab(item.id)}
                      className={`w-full flex items-center space-x-3 px-4 py-2 text-left text-sm transition-colors ${
                        selectedTab === item.id
                          ? 'bg-white text-gray-900 font-medium border-r-2 border-blue-500'
                          : 'text-gray-700 hover:bg-gray-200'
                      }`}
                    >
                      <Icon className="h-4 w-4" />
                      <span>{item.label}</span>
                    </button>
                  </li>
                );
              })}
            </ul>

            {/* Sales Channels Section */}
            <div className="mt-6">
              <div className="px-4 py-2">
                <h3 className="text-xs font-semibold text-gray-600 uppercase tracking-wide">Sales channels</h3>
                <button className="text-gray-500 hover:text-gray-700">
                  <ChevronRight className="h-4 w-4" />
                </button>
              </div>
              <ul className="space-y-1">
                {salesChannelItems.map((item) => {
                  const Icon = item.icon;
                  return (
                    <li key={item.id}>
                      <button
                        className="w-full flex items-center space-x-3 px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-200"
                      >
                        <Icon className="h-4 w-4" />
                        <span>{item.label}</span>
                      </button>
                    </li>
                  );
                })}
              </ul>
            </div>

            {/* Apps Section */}
            <div className="mt-6">
              <div className="px-4 py-2">
                <h3 className="text-xs font-semibold text-gray-600 uppercase tracking-wide">Apps</h3>
                <button className="text-gray-500 hover:text-gray-700">
                  <ChevronRight className="h-4 w-4" />
                </button>
              </div>
            </div>

            {/* Settings at bottom */}
            <div className="absolute bottom-4 w-full px-4">
              <button
                onClick={() => setSelectedTab("settings")}
                className={`w-full flex items-center space-x-3 px-4 py-2 text-left text-sm transition-colors rounded ${
                  selectedTab === "settings"
                    ? 'bg-white text-gray-900 font-medium'
                    : 'text-gray-700 hover:bg-gray-200'
                }`}
              >
                <Settings className="h-4 w-4" />
                <span>Settings</span>
              </button>
            </div>
          </nav>
        </aside>

        {/* Main Content */}
        <main className="flex-1 bg-white">
          {renderContent()}
        </main>
      </div>
    </div>
  );
}