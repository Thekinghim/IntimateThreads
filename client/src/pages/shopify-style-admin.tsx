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
      <div className="min-h-screen bg-white flex items-center justify-center">
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
    totalOrders: orders.length,
    totalSales: orders.reduce((sum: number, order: any) => sum + parseFloat(order.totalAmountKr || 0), 0),
    totalProducts: products.length,
    conversionRate: "33.33%", // Mock conversion rate like Shopify
  };

  // Sidebar navigation items
  const navigationItems = [
    { id: "home", label: "Hem", icon: Home },
    { id: "orders", label: "Beställningar", icon: ShoppingBag },
    { id: "products", label: "Produkter", icon: Package },
    { id: "customers", label: "Säljare", icon: Users },
    { id: "discounts", label: "Rabattkoder", icon: TrendingUp },
    { id: "settings", label: "Inställningar", icon: Settings },
  ];

  const renderContent = () => {
    switch (selectedTab) {
      case "home":
        return (
          <div className="space-y-6">
            {/* Header */}
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-2xl font-semibold text-gray-900">Hem</h1>
                <div className="flex items-center space-x-4 mt-2">
                  <Select defaultValue="today">
                    <SelectTrigger className="w-[120px] border-gray-300">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="today">Idag</SelectItem>
                      <SelectItem value="week">Denna vecka</SelectItem>
                      <SelectItem value="month">Denna månad</SelectItem>
                    </SelectContent>
                  </Select>
                  <Select defaultValue="all">
                    <SelectTrigger className="w-[150px] border-gray-300">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">Alla kanaler</SelectItem>
                      <SelectItem value="online">Online Store</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="text-right">
                <p className="text-sm text-gray-600">Nästa utbetalning</p>
                <p className="text-lg font-semibold text-gray-900">{stats.totalSales.toLocaleString('sv-SE')} kr</p>
              </div>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-4 gap-6">
              <Card className="border border-gray-200 shadow-sm">
                <CardContent className="p-6">
                  <div className="text-sm text-gray-600 mb-1">Sessioner</div>
                  <div className="text-2xl font-semibold text-gray-900">{orders.length}</div>
                  <div className="text-sm text-gray-500">—</div>
                </CardContent>
              </Card>
              <Card className="border border-gray-200 shadow-sm">
                <CardContent className="p-6">
                  <div className="text-sm text-gray-600 mb-1">Total försäljning</div>
                  <div className="text-2xl font-semibold text-gray-900">{stats.totalSales.toLocaleString('sv-SE')} kr</div>
                  <div className="text-sm text-gray-500">—</div>
                </CardContent>
              </Card>
              <Card className="border border-gray-200 shadow-sm">
                <CardContent className="p-6">
                  <div className="text-sm text-gray-600 mb-1">Totala beställningar</div>
                  <div className="text-2xl font-semibold text-gray-900">{stats.totalOrders}</div>
                  <div className="text-sm text-gray-500">—</div>
                </CardContent>
              </Card>
              <Card className="border border-gray-200 shadow-sm">
                <CardContent className="p-6">
                  <div className="text-sm text-gray-600 mb-1">Konverteringsgrad</div>
                  <div className="text-2xl font-semibold text-gray-900">{stats.conversionRate}</div>
                  <div className="text-sm text-gray-500">—</div>
                </CardContent>
              </Card>
            </div>

            {/* Chart Placeholder */}
            <Card className="border border-gray-200 shadow-sm">
              <CardContent className="p-6">
                <div className="h-64 bg-gray-50 rounded-lg flex items-center justify-center">
                  <div className="text-center">
                    <BarChart3 className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                    <p className="text-gray-600">Försäljningsdiagram kommer här</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        );

      case "orders":
        return (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h1 className="text-2xl font-semibold text-gray-900">Beställningar</h1>
            </div>
            <Card className="border border-gray-200 shadow-sm">
              <CardContent className="p-0">
                <Table>
                  <TableHeader>
                    <TableRow className="border-b border-gray-200">
                      <TableHead className="text-gray-600 font-medium">Beställning</TableHead>
                      <TableHead className="text-gray-600 font-medium">Datum</TableHead>
                      <TableHead className="text-gray-600 font-medium">Kund</TableHead>
                      <TableHead className="text-gray-600 font-medium">Status</TableHead>
                      <TableHead className="text-gray-600 font-medium">Total</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {orders.map((order: any) => (
                      <TableRow key={order.id} className="border-b border-gray-100 hover:bg-gray-50">
                        <TableCell className="font-medium text-gray-900">#{order.id.slice(-8)}</TableCell>
                        <TableCell className="text-gray-700">
                          {new Date(order.createdAt).toLocaleDateString('sv-SE')}
                        </TableCell>
                        <TableCell className="text-gray-700">{order.customerEmail}</TableCell>
                        <TableCell>
                          <Badge className={
                            order.status === 'completed' ? "bg-green-100 text-green-800 border-green-200" :
                            order.status === 'pending' ? "bg-yellow-100 text-yellow-800 border-yellow-200" :
                            "bg-gray-100 text-gray-600 border-gray-200"
                          }>
                            {order.status}
                          </Badge>
                        </TableCell>
                        <TableCell className="text-gray-900">{order.totalAmountKr} kr</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
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
        return <PromoCodesPanel />;

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
    <div className="min-h-screen bg-white">
      {/* Top Header */}
      <header className="bg-gray-900 text-white px-4 py-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="text-lg font-semibold">Scandiscent</div>
            <div className="text-sm text-gray-300">Summer '25</div>
          </div>
          <div className="flex items-center space-x-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <input 
                type="text" 
                placeholder="Sök" 
                className="pl-10 pr-4 py-2 bg-gray-800 text-white border border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 w-64"
              />
            </div>
            <div className="text-sm">Välkommen, {adminUser?.name}</div>
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={logout}
              className="text-white hover:bg-gray-800"
            >
              Logga ut
            </Button>
          </div>
        </div>
      </header>

      <div className="flex">
        {/* Sidebar */}
        <aside className="w-64 bg-white border-r border-gray-200 min-h-screen">
          <nav className="p-4">
            <ul className="space-y-1">
              {navigationItems.map((item) => {
                const Icon = item.icon;
                return (
                  <li key={item.id}>
                    <button
                      onClick={() => setSelectedTab(item.id)}
                      className={`w-full flex items-center space-x-3 px-3 py-2 rounded-md text-left transition-colors ${
                        selectedTab === item.id
                          ? 'bg-gray-100 text-gray-900 font-medium'
                          : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                      }`}
                    >
                      <Icon className="h-5 w-5" />
                      <span>{item.label}</span>
                      {selectedTab === item.id && <ChevronRight className="h-4 w-4 ml-auto" />}
                    </button>
                  </li>
                );
              })}
            </ul>
          </nav>
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-8 bg-gray-50">
          {renderContent()}
        </main>
      </div>
    </div>
  );
}