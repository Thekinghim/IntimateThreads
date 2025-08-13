import { useState, useEffect } from "react";
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
  BarChart3,
  ArrowLeft,
  Copy,
  Mail,
  MapPin,
  CreditCard,
  Truck
} from "lucide-react";

function OrderDetailsModal({ order, isOpen, onClose }: { order: any; isOpen: boolean; onClose: () => void }) {
  if (!order) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-5xl max-h-[90vh] overflow-y-auto">
        <DialogHeader className="pb-4 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <Button
                variant="ghost"
                size="sm"
                onClick={onClose}
                className="h-8 w-8 p-0"
              >
                <ArrowLeft className="h-4 w-4" />
              </Button>
              <div>
                <DialogTitle className="text-xl font-semibold">Order #{order.id.slice(0, 8)}</DialogTitle>
                <p className="text-sm text-gray-600">
                  {new Date(order.createdAt).toLocaleDateString('sv-SE', { 
                    year: 'numeric', 
                    month: 'long', 
                    day: 'numeric',
                    hour: '2-digit',
                    minute: '2-digit'
                  })}
                </p>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <Badge className="bg-yellow-100 text-yellow-800 border-yellow-200">
                {order.status === 'pending' ? 'Unfulfilled' : order.status}
              </Badge>
              <Badge className="bg-green-100 text-green-800 border-green-200">
                Paid
              </Badge>
            </div>
          </div>
        </DialogHeader>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-6">
          {/* Left column - Order details */}
          <div className="lg:col-span-2 space-y-6">
            {/* Unfulfilled items */}
            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
              <div className="flex items-center space-x-2 mb-3">
                <div className="bg-yellow-500 rounded-full p-1">
                  <Package className="h-3 w-3 text-white" />
                </div>
                <h3 className="font-medium text-gray-900">Unfulfilled (1)</h3>
              </div>
              
              <div className="bg-white border border-gray-200 rounded p-3">
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 bg-gray-100 rounded flex items-center justify-center">
                    <Package className="h-6 w-6 text-gray-400" />
                  </div>
                  <div className="flex-1">
                    <h4 className="font-medium text-gray-900">{order.items?.[0]?.name || 'Product'}</h4>
                    <p className="text-sm text-gray-600">Plans / Small</p>
                    <p className="text-sm text-gray-600">SKU: {order.id.slice(0, 6)}</p>
                  </div>
                  <div className="text-right">
                    <p className="font-medium">${order.totalAmountKr} × 1</p>
                    <p className="text-sm text-gray-600">${order.totalAmountKr}</p>
                  </div>
                </div>
              </div>

              <div className="flex space-x-2 mt-3">
                <Button size="sm" variant="outline" className="text-xs">
                  Mark as fulfilled
                </Button>
                <Button size="sm" variant="outline" className="text-xs">
                  Create shipping label
                </Button>
              </div>
            </div>

            {/* Payment section */}
            <div className="bg-green-50 border border-green-200 rounded-lg p-4">
              <div className="flex items-center space-x-2 mb-3">
                <div className="bg-green-500 rounded-full p-1">
                  <CreditCard className="h-3 w-3 text-white" />
                </div>
                <h3 className="font-medium text-gray-900">Paid</h3>
              </div>

              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-600">Subtotal</span>
                  <span>${order.totalAmountKr}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Shipping</span>
                  <span>$7.09</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Tax</span>
                  <span>$0.00</span>
                </div>
                <div className="flex justify-between font-medium pt-2 border-t border-green-200">
                  <span>Total</span>
                  <span>${(parseFloat(order.totalAmountKr) + 7.09).toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-sm pt-2">
                  <span className="text-gray-600">Paid by customer</span>
                  <span>${(parseFloat(order.totalAmountKr) + 7.09).toFixed(2)}</span>
                </div>
              </div>

              <Button size="sm" variant="outline" className="mt-3 text-xs">
                Refund
              </Button>
            </div>
          </div>

          {/* Right column - Customer info */}
          <div className="space-y-6">
            {/* Notes */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <h3 className="font-medium text-gray-900">Notes</h3>
                <Button variant="ghost" size="sm" className="text-xs text-blue-600">
                  Edit
                </Button>
              </div>
              <p className="text-sm text-gray-600">No notes from customer</p>
            </div>

            {/* Customer */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <h3 className="font-medium text-gray-900">Customer</h3>
                <Button variant="ghost" size="sm" className="text-xs text-blue-600">
                  Edit
                </Button>
              </div>
              <div className="space-y-2">
                <div className="flex items-center space-x-2">
                  <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                    <span className="text-xs font-medium text-blue-600">
                      {order.customerEmail?.charAt(0).toUpperCase()}
                    </span>
                  </div>
                  <div>
                    <p className="text-sm font-medium">Customer #{order.id.slice(0, 4)}</p>
                    <p className="text-xs text-gray-600">1 order</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Contact information */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <h3 className="font-medium text-gray-900">Contact Information</h3>
                <Button variant="ghost" size="sm" className="text-xs text-blue-600">
                  Edit
                </Button>
              </div>
              <div className="space-y-1">
                <div className="flex items-center space-x-2">
                  <Mail className="h-3 w-3 text-gray-400" />
                  <span className="text-sm text-blue-600">{order.customerEmail}</span>
                </div>
                <p className="text-xs text-gray-600 ml-5">No phone number</p>
              </div>
            </div>

            {/* Shipping address */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <h3 className="font-medium text-gray-900">Shipping Address</h3>
                <Button variant="ghost" size="sm" className="text-xs text-blue-600">
                  Edit
                </Button>
              </div>
              <div className="space-y-1">
                <div className="flex items-start space-x-2">
                  <MapPin className="h-3 w-3 text-gray-400 mt-0.5" />
                  <div className="text-sm">
                    <p className="font-medium">Nordic Customer</p>
                    <p className="text-gray-600">Scandiscent AB</p>
                    <p className="text-gray-600">1234 Nordic Street</p>
                    <p className="text-gray-600">Apt 100</p>
                    <p className="text-gray-600">Stockholm SE 10001</p>
                    <p className="text-gray-600">Sweden</p>
                    <p className="text-gray-600">46701234567</p>
                  </div>
                </div>
                <div className="ml-5">
                  <Button variant="ghost" size="sm" className="text-xs text-blue-600 p-0 h-auto">
                    View map
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}

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
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [isOrderModalOpen, setIsOrderModalOpen] = useState(false);
  const [isCreateProductOpen, setIsCreateProductOpen] = useState(false);
  const [isCreateCustomerOpen, setIsCreateCustomerOpen] = useState(false);
  const [isCreateContentOpen, setIsCreateContentOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [showLiveView, setShowLiveView] = useState(false);
  const [liveStats, setLiveStats] = useState({
    activeVisitors: 12,
    sessionsToday: 247,
    totalPageViews: 1583,
    avgSessionDuration: '3:42',
    topProduct: 'Elegant Lace Set',
    topProductRevenue: 2450
  });

  const handleOrderClick = (order: any) => {
    setSelectedOrder(order);
    setIsOrderModalOpen(true);
  };

  const closeOrderModal = () => {
    setIsOrderModalOpen(false);
    setSelectedOrder(null);
  };

  // Simulate live updates for analytics
  useEffect(() => {
    if (showLiveView) {
      const interval = setInterval(() => {
        setLiveStats(prev => ({
          ...prev,
          activeVisitors: Math.max(5, prev.activeVisitors + Math.floor(Math.random() * 3) - 1),
          sessionsToday: prev.sessionsToday + Math.floor(Math.random() * 2),
          totalPageViews: prev.totalPageViews + Math.floor(Math.random() * 4),
        }));
      }, 3000);
      return () => clearInterval(interval);
    }
  }, [showLiveView]);

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

  // Product CRUD mutations
  const createProductMutation = useMutation({
    mutationFn: async (productData: any) => {
      const authHeaders = getAuthHeader();
      const response = await fetch('/api/products', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          ...authHeaders,
        },
        body: JSON.stringify(productData),
      });
      if (!response.ok) throw new Error('Failed to create product');
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/products'] });
      setIsCreateProductOpen(false);
      toast({ title: "Produkt skapad", description: "Den nya produkten har lagts till." });
    },
  });

  const deleteProductMutation = useMutation({
    mutationFn: async (id: string) => {
      const authHeaders = getAuthHeader();
      const response = await fetch(`/api/products/${id}`, {
        method: 'DELETE',
        headers: authHeaders,
      });
      if (!response.ok) throw new Error('Failed to delete product');
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/products'] });
      toast({ title: "Produkt raderad", description: "Produkten har tagits bort." });
    },
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
    { id: "buy-button", label: "Buy Button", icon: Package },
  ];

  const renderContent = () => {
    switch (selectedTab) {
      case "home":
        return (
          <div className="p-6 bg-white">
            {/* Header exactly like Shopify */}
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center space-x-3">
                <Select defaultValue="today">
                  <SelectTrigger className="w-[80px] h-7 text-xs border-gray-300 bg-white">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="today">Today</SelectItem>
                    <SelectItem value="week">This week</SelectItem>
                    <SelectItem value="month">This month</SelectItem>
                  </SelectContent>
                </Select>
                <Select defaultValue="all">
                  <SelectTrigger className="w-[120px] h-7 text-xs border-gray-300 bg-white">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All channels</SelectItem>
                    <SelectItem value="online">Online Store</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="text-right">
                <p className="text-xs text-gray-500 font-medium">Next payout</p>
                <p className="text-sm font-semibold text-gray-900">${stats.totalSales}.00</p>
              </div>
            </div>

            {/* Stats Grid - Responsive */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-4">
              <div className="bg-[#f8f8f8] p-3 md:p-4 rounded">
                <div className="text-xs text-gray-600 font-medium mb-1">Sessions</div>
                <div className="text-lg md:text-xl font-bold text-gray-900">{stats.sessions}</div>
                <div className="text-xs text-gray-400">—</div>
              </div>
              <div className="bg-[#f8f8f8] p-3 md:p-4 rounded">
                <div className="text-xs text-gray-600 font-medium mb-1">Total sales</div>
                <div className="text-lg md:text-xl font-bold text-gray-900">${stats.totalSales}</div>
                <div className="text-xs text-gray-400">—</div>
              </div>
              <div className="bg-[#f8f8f8] p-3 md:p-4 rounded">
                <div className="text-xs text-gray-600 font-medium mb-1">Total orders</div>
                <div className="text-lg md:text-xl font-bold text-gray-900">{stats.totalOrders}</div>
                <div className="text-xs text-gray-400">—</div>
              </div>
              <div className="bg-[#f8f8f8] p-3 md:p-4 rounded relative">
                <div className="text-xs text-gray-600 font-medium mb-1">Conversion rate</div>
                <div className="text-lg md:text-xl font-bold text-gray-900">{stats.conversionRate}</div>
                <div className="text-xs text-gray-400">—</div>
                <button className="absolute top-2 md:top-3 right-2 md:right-3 text-gray-400 hover:text-gray-600">
                  <svg className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
                  </svg>
                </button>
              </div>
            </div>

            {/* Chart section exactly like Shopify */}
            <div className="bg-white border border-[#e1e3e5] rounded">
              <div className="h-72 relative bg-[#fafbfb] m-4 rounded">
                {/* Chart background with exact Shopify styling */}
                <div className="absolute inset-0">
                  <svg className="w-full h-full">
                    {/* Grid pattern like Shopify */}
                    <defs>
                      <pattern id="shopifyGrid" width="50" height="40" patternUnits="userSpaceOnUse">
                        <path d="M 50 0 L 0 0 0 40" fill="none" stroke="#e8e8e8" strokeWidth="0.5"/>
                      </pattern>
                    </defs>
                    <rect width="100%" height="100%" fill="url(#shopifyGrid)" />
                    
                    {/* Shopify chart line - cyan blue */}
                    <path 
                      d="M 50 220 L 100 200 L 150 180 L 200 120 L 250 40 L 300 35 L 350 30 L 400 60 L 450 80 L 500 210 L 550 190 L 600 200"
                      fill="none" 
                      stroke="#5DBEA3" 
                      strokeWidth="2"
                    />
                    {/* Dotted comparison line */}
                    <path 
                      d="M 50 230 L 100 220 L 150 210 L 200 200 L 250 190 L 300 180 L 350 170 L 400 160 L 450 150 L 500 220 L 550 210 L 600 220"
                      fill="none" 
                      stroke="#d1d5db" 
                      strokeWidth="1"
                      strokeDasharray="2,3"
                    />
                  </svg>
                  
                  {/* Time labels exactly like Shopify */}
                  <div className="absolute bottom-1 left-0 w-full flex justify-between text-xs text-gray-500 px-8">
                    <span>12:00 AM</span>
                    <span>3:00 AM</span>
                    <span>6:00 AM</span>
                    <span>9:00 AM</span>
                    <span>12:00 PM</span>
                    <span>3:00 PM</span>
                    <span>6:00 PM</span>
                    <span>9:00 PM</span>
                  </div>

                  {/* Legend like Shopify */}
                  <div className="absolute bottom-3 right-6 flex items-center space-x-4 text-xs">
                    <div className="flex items-center space-x-1.5">
                      <div className="w-2.5 h-0.5 bg-[#5DBEA3]"></div>
                      <span className="text-gray-600">Sep 7, 2023</span>
                    </div>
                    <div className="flex items-center space-x-1.5">
                      <div className="w-2.5 h-px bg-gray-400" style={{borderTop: '1px dashed #d1d5db'}}></div>
                      <span className="text-gray-600">Sep 6, 2023</span>
                    </div>
                  </div>
                </div>

                {/* Y-axis labels */}
                <div className="absolute left-2 top-0 h-full flex flex-col justify-between text-xs text-gray-500 py-3">
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
          <div className="p-3 md:p-6 bg-white">
            <div className="flex items-center justify-between mb-4">
              <h1 className="text-lg md:text-xl font-semibold text-gray-900">Orders</h1>
            </div>
            <div className="bg-white border border-[#e1e3e5] rounded overflow-hidden overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow className="border-b border-[#e1e3e5] bg-[#fafbfb]">
                    <TableHead className="text-xs font-medium text-gray-600 px-2 md:px-4 py-3 text-left whitespace-nowrap">Order</TableHead>
                    <TableHead className="text-xs font-medium text-gray-600 px-2 md:px-4 py-3 text-left whitespace-nowrap">Date</TableHead>
                    <TableHead className="text-xs font-medium text-gray-600 px-2 md:px-4 py-3 text-left whitespace-nowrap hidden sm:table-cell">Customer</TableHead>
                    <TableHead className="text-xs font-medium text-gray-600 px-2 md:px-4 py-3 text-left whitespace-nowrap">Status</TableHead>
                    <TableHead className="text-xs font-medium text-gray-600 px-2 md:px-4 py-3 text-left whitespace-nowrap">Total</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {orders.map((order: any) => (
                    <TableRow 
                      key={order.id} 
                      className="border-b border-[#f1f1f1] hover:bg-[#fafbfb] cursor-pointer"
                      onClick={() => handleOrderClick(order)}
                    >
                      <TableCell className="px-2 md:px-4 py-3 font-medium text-[#008060] text-xs md:text-sm">#{order.id.slice(-8)}</TableCell>
                      <TableCell className="px-2 md:px-4 py-3 text-xs md:text-sm text-gray-700 whitespace-nowrap">
                        {new Date(order.createdAt).toLocaleDateString('en-US')}
                      </TableCell>
                      <TableCell className="px-2 md:px-4 py-3 text-xs md:text-sm text-gray-700 hidden sm:table-cell">{order.customerEmail}</TableCell>
                      <TableCell className="px-2 md:px-4 py-3">
                        <Badge className={
                          order.status === 'completed' ? "bg-green-100 text-green-700 border-green-200 text-xs" :
                          order.status === 'pending' ? "bg-yellow-100 text-yellow-700 border-yellow-200 text-xs" :
                          "bg-gray-100 text-gray-600 border-gray-200 text-xs"
                        }>
                          {order.status}
                        </Badge>
                      </TableCell>
                      <TableCell className="px-2 md:px-4 py-3 text-xs md:text-sm font-medium text-gray-900">${order.totalAmountKr}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </div>
        );

      case "products":
        return (
          <div className="p-3 md:p-6 bg-white">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-4 gap-3">
              <h1 className="text-lg md:text-xl font-semibold text-gray-900">Products</h1>
              <Button 
                onClick={() => setIsCreateProductOpen(true)}
                className="bg-[#008060] hover:bg-[#006b52] text-white h-8 px-3 text-sm rounded w-full sm:w-auto"
              >
                Add product
              </Button>
            </div>
            <div className="bg-white border border-[#e1e3e5] rounded overflow-hidden overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow className="border-b border-[#e1e3e5] bg-[#fafbfb]">
                    <TableHead className="text-xs font-medium text-gray-600 px-2 md:px-4 py-3 text-left">Product</TableHead>
                    <TableHead className="text-xs font-medium text-gray-600 px-2 md:px-4 py-3 text-left">Status</TableHead>
                    <TableHead className="text-xs font-medium text-gray-600 px-2 md:px-4 py-3 text-left hidden sm:table-cell">Inventory</TableHead>
                    <TableHead className="text-xs font-medium text-gray-600 px-2 md:px-4 py-3 text-left">Seller</TableHead>
                    <TableHead className="text-xs font-medium text-gray-600 px-2 md:px-4 py-3 text-left">Price</TableHead>
                    <TableHead className="text-xs font-medium text-gray-600 px-2 md:px-4 py-3 text-left">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {products.map((product: any) => (
                    <TableRow key={product.id} className="border-b border-[#f1f1f1] hover:bg-[#fafbfb]">
                      <TableCell className="px-2 md:px-4 py-3 font-medium text-gray-900 text-xs md:text-sm">{product.title}</TableCell>
                      <TableCell className="px-2 md:px-4 py-3">
                        <Badge className="bg-green-100 text-green-700 border-green-200 text-xs">Active</Badge>
                      </TableCell>
                      <TableCell className="px-2 md:px-4 py-3 text-xs md:text-sm text-gray-700 hidden sm:table-cell">1 in stock</TableCell>
                      <TableCell className="px-2 md:px-4 py-3 text-xs md:text-sm text-gray-700">{product.seller?.alias}</TableCell>
                      <TableCell className="px-2 md:px-4 py-3 text-xs md:text-sm font-medium text-gray-900">{product.priceKr} kr</TableCell>
                      <TableCell className="px-2 md:px-4 py-3">
                        <div className="flex items-center space-x-2">
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => {
                              setSelectedItem(product);
                              setIsEditModalOpen(true);
                            }}
                            className="text-blue-600 hover:text-blue-800 h-6 px-2 text-xs"
                          >
                            Edit
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => deleteProductMutation.mutate(product.id)}
                            className="text-red-600 hover:text-red-800 h-6 px-2 text-xs"
                          >
                            Delete
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </div>
        );

      case "customers":
        return (
          <div className="p-3 md:p-6 bg-white">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-4 gap-3">
              <h1 className="text-lg md:text-xl font-semibold text-gray-900">Customers</h1>
              <Button 
                onClick={() => setIsCreateCustomerOpen(true)}
                className="bg-[#008060] hover:bg-[#006b52] text-white h-8 px-3 text-sm rounded w-full sm:w-auto"
              >
                Add customer
              </Button>
            </div>
            <div className="bg-white border border-[#e1e3e5] rounded overflow-hidden overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow className="border-b border-[#e1e3e5] bg-[#fafbfb]">
                    <TableHead className="text-xs font-medium text-gray-600 px-2 md:px-4 py-3 text-left">Customer</TableHead>
                    <TableHead className="text-xs font-medium text-gray-600 px-2 md:px-4 py-3 text-left">Location</TableHead>
                    <TableHead className="text-xs font-medium text-gray-600 px-2 md:px-4 py-3 text-left hidden sm:table-cell">Age</TableHead>
                    <TableHead className="text-xs font-medium text-gray-600 px-2 md:px-4 py-3 text-left">Status</TableHead>
                    <TableHead className="text-xs font-medium text-gray-600 px-2 md:px-4 py-3 text-left">Commission</TableHead>
                    <TableHead className="text-xs font-medium text-gray-600 px-2 md:px-4 py-3 text-left">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {sellers.map((seller: any) => (
                    <TableRow key={seller.id} className="border-b border-[#f1f1f1] hover:bg-[#fafbfb]">
                      <TableCell className="px-2 md:px-4 py-3 font-medium text-gray-900 text-xs md:text-sm">{seller.alias}</TableCell>
                      <TableCell className="px-2 md:px-4 py-3 text-xs md:text-sm text-gray-700">{seller.location}</TableCell>
                      <TableCell className="px-2 md:px-4 py-3 text-xs md:text-sm text-gray-700 hidden sm:table-cell">{seller.age} years</TableCell>
                      <TableCell className="px-2 md:px-4 py-3">
                        <Badge className={seller.isActive ? "bg-green-100 text-green-700 border-green-200 text-xs" : "bg-red-100 text-red-700 border-red-200 text-xs"}>
                          {seller.isActive ? 'Active' : 'Inactive'}
                        </Badge>
                      </TableCell>
                      <TableCell className="px-2 md:px-4 py-3 text-xs md:text-sm font-medium text-gray-900">{(parseFloat(seller.commissionRate) * 100).toFixed(0)}%</TableCell>
                      <TableCell className="px-2 md:px-4 py-3">
                        <div className="flex items-center space-x-2">
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => {
                              setSelectedItem({...seller, type: 'seller'});
                              setIsEditModalOpen(true);
                            }}
                            className="text-blue-600 hover:text-blue-800 h-6 px-2 text-xs"
                          >
                            Edit
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => {
                              toast({ title: "Customer deleted", description: "Customer has been removed." });
                            }}
                            className="text-red-600 hover:text-red-800 h-6 px-2 text-xs"
                          >
                            Delete
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </div>
        );

      case "discounts":
        return (
          <div className="p-3 md:p-6 bg-white">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-4 gap-3">
              <h1 className="text-lg md:text-xl font-semibold text-gray-900">Discounts</h1>
              <Button
                onClick={() => setIsCreateDialogOpen(true)}
                className="bg-[#008060] hover:bg-[#006b52] text-white h-8 px-3 text-sm rounded w-full sm:w-auto"
              >
                Create discount
              </Button>
            </div>
            <div className="bg-white border border-[#e1e3e5] rounded overflow-hidden overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow className="border-b border-[#e1e3e5] bg-[#fafbfb]">
                    <TableHead className="text-xs font-medium text-gray-600 px-2 md:px-4 py-3 text-left whitespace-nowrap">Code</TableHead>
                    <TableHead className="text-xs font-medium text-gray-600 px-2 md:px-4 py-3 text-left whitespace-nowrap">Discount</TableHead>
                    <TableHead className="text-xs font-medium text-gray-600 px-2 md:px-4 py-3 text-left whitespace-nowrap hidden sm:table-cell">Uses</TableHead>
                    <TableHead className="text-xs font-medium text-gray-600 px-2 md:px-4 py-3 text-left whitespace-nowrap hidden md:table-cell">Valid until</TableHead>
                    <TableHead className="text-xs font-medium text-gray-600 px-2 md:px-4 py-3 text-left whitespace-nowrap">Status</TableHead>
                    <TableHead className="text-xs font-medium text-gray-600 px-2 md:px-4 py-3 text-left whitespace-nowrap">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {promoCodes.map((promo: any) => (
                    <TableRow key={promo.id} className="border-b border-[#f1f1f1] hover:bg-[#fafbfb]">
                      <TableCell className="px-2 md:px-4 py-3 font-medium text-gray-900 text-xs md:text-sm">{promo.code}</TableCell>
                      <TableCell className="px-2 md:px-4 py-3 text-xs md:text-sm text-gray-700">${promo.discountKr}</TableCell>
                      <TableCell className="px-2 md:px-4 py-3 text-xs md:text-sm text-gray-700 hidden sm:table-cell">
                        {promo.usageCount}{promo.maxUsage ? ` / ${promo.maxUsage}` : ''}
                      </TableCell>
                      <TableCell className="px-2 md:px-4 py-3 text-xs md:text-sm text-gray-700 hidden md:table-cell">
                        {promo.validUntil 
                          ? new Date(promo.validUntil).toLocaleDateString('en-US')
                          : '—'
                        }
                      </TableCell>
                      <TableCell className="px-2 md:px-4 py-3">
                        <Badge className={promo.isActive ? "bg-green-100 text-green-700 border-green-200 text-xs" : "bg-gray-100 text-gray-600 border-gray-200 text-xs"}>
                          {promo.isActive ? 'Active' : 'Inactive'}
                        </Badge>
                      </TableCell>
                      <TableCell className="px-2 md:px-4 py-3">
                        <div className="flex items-center space-x-1">
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => togglePromoMutation.mutate({ id: promo.id, isActive: !promo.isActive })}
                            className="text-xs text-gray-600 hover:text-gray-900 h-6 px-1 md:px-2"
                          >
                            {promo.isActive ? 'Disable' : 'Enable'}
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => deletePromoMutation.mutate(promo.id)}
                            className="text-xs text-red-600 hover:text-red-800 h-6 px-1 md:px-2"
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

      case "analytics":
        if (showLiveView) {
          return (
            <div className="p-3 md:p-6 bg-white">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-4 gap-3">
                <div className="flex items-center gap-3">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setShowLiveView(false)}
                    className="text-blue-600 hover:text-blue-800 h-8"
                  >
                    ← Back to Analytics
                  </Button>
                  <h1 className="text-lg md:text-xl font-semibold text-gray-900">Live View</h1>
                  <div className="flex items-center gap-1">
                    <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                    <span className="text-xs text-gray-600">Live</span>
                  </div>
                </div>
              </div>

              {/* Live Stats Grid */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-6">
                <div className="bg-[#f8f8f8] p-3 md:p-4 rounded">
                  <div className="text-xs text-gray-600 font-medium mb-1">Active Visitors</div>
                  <div className="text-2xl md:text-3xl font-bold text-gray-900">{liveStats.activeVisitors}</div>
                  <div className="text-xs text-green-600">Right now</div>
                </div>
                <div className="bg-[#f8f8f8] p-3 md:p-4 rounded">
                  <div className="text-xs text-gray-600 font-medium mb-1">Sessions Today</div>
                  <div className="text-2xl md:text-3xl font-bold text-gray-900">{liveStats.sessionsToday}</div>
                  <div className="text-xs text-gray-600">Since midnight</div>
                </div>
                <div className="bg-[#f8f8f8] p-3 md:p-4 rounded">
                  <div className="text-xs text-gray-600 font-medium mb-1">Page Views</div>
                  <div className="text-2xl md:text-3xl font-bold text-gray-900">{liveStats.totalPageViews}</div>
                  <div className="text-xs text-gray-600">Today</div>
                </div>
                <div className="bg-[#f8f8f8] p-3 md:p-4 rounded">
                  <div className="text-xs text-gray-600 font-medium mb-1">Avg. Session</div>
                  <div className="text-2xl md:text-3xl font-bold text-gray-900">{liveStats.avgSessionDuration}</div>
                  <div className="text-xs text-gray-600">Duration</div>
                </div>
              </div>

              {/* Top Product Performance */}
              <div className="bg-white border border-[#e1e3e5] rounded overflow-hidden overflow-x-auto mb-6">
                <div className="p-4 border-b border-[#e1e3e5] bg-[#fafbfb]">
                  <h3 className="text-sm font-medium text-gray-900">Top Performing Product (Live)</h3>
                </div>
                <div className="p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="text-lg font-semibold text-gray-900">{liveStats.topProduct}</h4>
                      <p className="text-sm text-gray-600">Revenue generated today</p>
                    </div>
                    <div className="text-right">
                      <div className="text-2xl font-bold text-green-600">${liveStats.topProductRevenue}</div>
                      <div className="text-xs text-gray-600">+{Math.floor(Math.random() * 15) + 5}% vs yesterday</div>
                    </div>
                  </div>
                  <div className="mt-4 bg-gray-200 rounded-full h-2">
                    <div className="bg-blue-600 h-2 rounded-full" style={{ width: '68%' }}></div>
                  </div>
                  <div className="text-xs text-gray-600 mt-1">68% of total product revenue</div>
                </div>
              </div>

              {/* Live Activity */}
              <div className="bg-white border border-[#e1e3e5] rounded overflow-hidden overflow-x-auto">
                <div className="p-4 border-b border-[#e1e3e5] bg-[#fafbfb]">
                  <h3 className="text-sm font-medium text-gray-900">Real-time Activity</h3>
                </div>
                <div className="p-4 space-y-3">
                  {[
                    "New visitor from Stockholm viewing Product Page",
                    "Customer from Göteborg added item to cart",
                    "Order completed: Elegant Lace Set - 299 kr",
                    "New visitor from Malmö viewing Home Page",
                    "Customer from Stockholm viewing Checkout"
                  ].map((activity, index) => (
                    <div key={index} className="flex items-center gap-3 text-sm">
                      <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                      <span className="text-gray-700">{activity}</span>
                      <span className="text-xs text-gray-500 ml-auto">{index + 1}s ago</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          );
        }

        return (
          <div className="p-3 md:p-6 bg-white">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-4 gap-3">
              <h1 className="text-lg md:text-xl font-semibold text-gray-900">Analytics</h1>
              <Button
                onClick={() => setShowLiveView(true)}
                className="bg-[#008060] hover:bg-[#006b52] text-white h-8 px-3 text-sm rounded w-full sm:w-auto"
              >
                Live View
              </Button>
            </div>
            
            {/* Analytics Stats Grid */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-6">
              <div className="bg-[#f8f8f8] p-3 md:p-4 rounded">
                <div className="text-xs text-gray-600 font-medium mb-1">Total Sales</div>
                <div className="text-lg md:text-xl font-bold text-gray-900">$250,000</div>
                <div className="text-xs text-green-600">+20% from last month</div>
              </div>
              <div className="bg-[#f8f8f8] p-3 md:p-4 rounded">
                <div className="text-xs text-gray-600 font-medium mb-1">Net Sales</div>
                <div className="text-lg md:text-xl font-bold text-gray-900">$15,000</div>
                <div className="text-xs text-green-600">+8% from last week</div>
              </div>
              <div className="bg-[#f8f8f8] p-3 md:p-4 rounded">
                <div className="text-xs text-gray-600 font-medium mb-1">Sessions</div>
                <div className="text-lg md:text-xl font-bold text-gray-900">40K</div>
                <div className="text-xs text-green-600">+5% from last week</div>
              </div>
              <div className="bg-[#f8f8f8] p-3 md:p-4 rounded">
                <div className="text-xs text-gray-600 font-medium mb-1">Conversion Rate</div>
                <div className="text-lg md:text-xl font-bold text-gray-900">3.2%</div>
                <div className="text-xs text-red-600">-0.5% from last week</div>
              </div>
            </div>

            {/* Gross Sales by Product */}
            <div className="bg-white border border-[#e1e3e5] rounded overflow-hidden overflow-x-auto mb-6">
              <div className="p-4 border-b border-[#e1e3e5] bg-[#fafbfb]">
                <h3 className="text-sm font-medium text-gray-900">Gross sales by product</h3>
              </div>
              <div className="p-4 space-y-3">
                {[
                  { name: "Wind cup", sales: "$10K", percent: "+8%", width: "85%" },
                  { name: "Crewneck", sales: "$9.75K", percent: "+2%", width: "80%" },
                  { name: "Blouse", sales: "$7.5K", percent: "+4%", width: "65%" },
                  { name: "T-shirt", sales: "$8.5K", percent: "+12%", width: "70%" },
                  { name: "Long sleeve", sales: "$6K", percent: "+6%", width: "50%" }
                ].map((product, index) => (
                  <div key={index} className="space-y-1">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-900 font-medium">{product.name}</span>
                      <div className="flex items-center gap-2">
                        <span className="text-gray-900 font-medium">{product.sales}</span>
                        <span className="text-green-600 text-xs">{product.percent}</span>
                      </div>
                    </div>
                    <div className="bg-gray-200 rounded-full h-2">
                      <div className="bg-blue-500 h-2 rounded-full" style={{ width: product.width }}></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Sessions by Device Type */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-white border border-[#e1e3e5] rounded overflow-hidden">
                <div className="p-4 border-b border-[#e1e3e5] bg-[#fafbfb]">
                  <h3 className="text-sm font-medium text-gray-900">Sessions by device type</h3>
                </div>
                <div className="p-4">
                  <div className="space-y-3">
                    {[
                      { device: "Mobile", count: "10K", percent: "+5%", color: "bg-blue-500" },
                      { device: "Desktop", count: "6K", percent: "+3%", color: "bg-green-500" },
                      { device: "Tablet", count: "6K", percent: "+1%", color: "bg-purple-500" },
                      { device: "Other", count: "4K", percent: "+4%", color: "bg-pink-500" }
                    ].map((item, index) => (
                      <div key={index} className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <div className={`w-3 h-3 rounded-full ${item.color}`}></div>
                          <span className="text-sm text-gray-700">{item.device}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="text-sm font-medium text-gray-900">{item.count}</span>
                          <span className="text-xs text-green-600">{item.percent}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="bg-white border border-[#e1e3e5] rounded overflow-hidden">
                <div className="p-4 border-b border-[#e1e3e5] bg-[#fafbfb]">
                  <h3 className="text-sm font-medium text-gray-900">Sessions by country</h3>
                </div>
                <div className="p-4">
                  <div className="space-y-3">
                    {[
                      { country: "Sweden", flag: "🇸🇪", percent: "45%" },
                      { country: "Norway", flag: "🇳🇴", percent: "25%" },
                      { country: "Denmark", flag: "🇩🇰", percent: "15%" },
                      { country: "Finland", flag: "🇫🇮", percent: "10%" },
                      { country: "Other", flag: "🌐", percent: "5%" }
                    ].map((item, index) => (
                      <div key={index} className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <span className="text-lg">{item.flag}</span>
                          <span className="text-sm text-gray-700">{item.country}</span>
                        </div>
                        <span className="text-sm font-medium text-gray-900">{item.percent}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        );

      case "marketing":
        return (
          <div className="p-3 md:p-6 bg-white">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-4 gap-3">
              <h1 className="text-lg md:text-xl font-semibold text-gray-900">Marketing</h1>
              <Button className="bg-[#008060] hover:bg-[#006b52] text-white h-8 px-3 text-sm rounded w-full sm:w-auto">
                Create campaign
              </Button>
            </div>

            {/* Marketing Stats */}
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3 mb-6">
              <div className="bg-[#f8f8f8] p-3 md:p-4 rounded">
                <div className="text-xs text-gray-600 font-medium mb-1">Email Subscribers</div>
                <div className="text-lg md:text-xl font-bold text-gray-900">2,347</div>
                <div className="text-xs text-green-600">+18 this week</div>
              </div>
              <div className="bg-[#f8f8f8] p-3 md:p-4 rounded">
                <div className="text-xs text-gray-600 font-medium mb-1">Campaign ROI</div>
                <div className="text-lg md:text-xl font-bold text-gray-900">320%</div>
                <div className="text-xs text-green-600">+45% from last month</div>
              </div>
              <div className="bg-[#f8f8f8] p-3 md:p-4 rounded">
                <div className="text-xs text-gray-600 font-medium mb-1">Click Rate</div>
                <div className="text-lg md:text-xl font-bold text-gray-900">4.8%</div>
                <div className="text-xs text-green-600">+0.3% from last week</div>
              </div>
            </div>

            {/* Recent Campaigns */}
            <div className="bg-white border border-[#e1e3e5] rounded overflow-hidden overflow-x-auto">
              <div className="p-4 border-b border-[#e1e3e5] bg-[#fafbfb]">
                <h3 className="text-sm font-medium text-gray-900">Recent Campaigns</h3>
              </div>
              <Table>
                <TableHeader>
                  <TableRow className="border-b border-[#e1e3e5] bg-[#fafbfb]">
                    <TableHead className="text-xs font-medium text-gray-600 px-2 md:px-4 py-3 text-left">Campaign</TableHead>
                    <TableHead className="text-xs font-medium text-gray-600 px-2 md:px-4 py-3 text-left">Type</TableHead>
                    <TableHead className="text-xs font-medium text-gray-600 px-2 md:px-4 py-3 text-left hidden sm:table-cell">Status</TableHead>
                    <TableHead className="text-xs font-medium text-gray-600 px-2 md:px-4 py-3 text-left">Results</TableHead>
                    <TableHead className="text-xs font-medium text-gray-600 px-2 md:px-4 py-3 text-left">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <TableRow className="border-b border-[#f1f1f1] hover:bg-[#fafbfb]">
                    <TableCell className="px-2 md:px-4 py-3 font-medium text-gray-900 text-xs md:text-sm">Summer Collection Launch</TableCell>
                    <TableCell className="px-2 md:px-4 py-3 text-xs md:text-sm text-gray-700">Email</TableCell>
                    <TableCell className="px-2 md:px-4 py-3 hidden sm:table-cell">
                      <Badge className="bg-green-100 text-green-700 border-green-200 text-xs">Active</Badge>
                    </TableCell>
                    <TableCell className="px-2 md:px-4 py-3 text-xs md:text-sm text-gray-700">1,247 opens</TableCell>
                    <TableCell className="px-2 md:px-4 py-3">
                      <div className="flex items-center space-x-2">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => {
                            setSelectedItem({id: 1, name: 'Summer Collection Launch', type: 'campaign'});
                            setIsEditModalOpen(true);
                          }}
                          className="text-blue-600 hover:text-blue-800 h-6 px-2 text-xs"
                        >
                          Edit
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => toast({ title: "Campaign deleted", description: "Campaign has been removed." })}
                          className="text-red-600 hover:text-red-800 h-6 px-2 text-xs"
                        >
                          Delete
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                  <TableRow className="border-b border-[#f1f1f1] hover:bg-[#fafbfb]">
                    <TableCell className="px-2 md:px-4 py-3 font-medium text-gray-900 text-xs md:text-sm">Weekend Sale</TableCell>
                    <TableCell className="px-2 md:px-4 py-3 text-xs md:text-sm text-gray-700">Social</TableCell>
                    <TableCell className="px-2 md:px-4 py-3 hidden sm:table-cell">
                      <Badge className="bg-gray-100 text-gray-600 border-gray-200 text-xs">Completed</Badge>
                    </TableCell>
                    <TableCell className="px-2 md:px-4 py-3 text-xs md:text-sm text-gray-700">892 clicks</TableCell>
                    <TableCell className="px-2 md:px-4 py-3">
                      <div className="flex items-center space-x-2">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => {
                            setSelectedItem({id: 2, name: 'Weekend Sale', type: 'campaign'});
                            setIsEditModalOpen(true);
                          }}
                          className="text-blue-600 hover:text-blue-800 h-6 px-2 text-xs"
                        >
                          Edit
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => toast({ title: "Campaign deleted", description: "Campaign has been removed." })}
                          className="text-red-600 hover:text-red-800 h-6 px-2 text-xs"
                        >
                          Delete
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </div>
          </div>
        );

      case "content":
        return (
          <div className="p-3 md:p-6 bg-white">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-4 gap-3">
              <h1 className="text-lg md:text-xl font-semibold text-gray-900">Content</h1>
              <Button 
                onClick={() => setIsCreateContentOpen(true)}
                className="bg-[#008060] hover:bg-[#006b52] text-white h-8 px-3 text-sm rounded w-full sm:w-auto"
              >
                Add content
              </Button>
            </div>

            {/* Content Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-6">
              <div className="bg-[#f8f8f8] p-3 md:p-4 rounded">
                <div className="text-xs text-gray-600 font-medium mb-1">Blog Posts</div>
                <div className="text-lg md:text-xl font-bold text-gray-900">24</div>
                <div className="text-xs text-gray-400">Total published</div>
              </div>
              <div className="bg-[#f8f8f8] p-3 md:p-4 rounded">
                <div className="text-xs text-gray-600 font-medium mb-1">Pages</div>
                <div className="text-lg md:text-xl font-bold text-gray-900">12</div>
                <div className="text-xs text-gray-400">Active pages</div>
              </div>
              <div className="bg-[#f8f8f8] p-3 md:p-4 rounded">
                <div className="text-xs text-gray-600 font-medium mb-1">Media Files</div>
                <div className="text-lg md:text-xl font-bold text-gray-900">156</div>
                <div className="text-xs text-gray-400">Images & videos</div>
              </div>
              <div className="bg-[#f8f8f8] p-3 md:p-4 rounded">
                <div className="text-xs text-gray-600 font-medium mb-1">SEO Score</div>
                <div className="text-lg md:text-xl font-bold text-gray-900">87%</div>
                <div className="text-xs text-green-600">Good optimization</div>
              </div>
            </div>

            {/* Recent Content */}
            <div className="bg-white border border-[#e1e3e5] rounded overflow-hidden overflow-x-auto">
              <div className="p-4 border-b border-[#e1e3e5] bg-[#fafbfb]">
                <h3 className="text-sm font-medium text-gray-900">Recent Content</h3>
              </div>
              <Table>
                <TableHeader>
                  <TableRow className="border-b border-[#e1e3e5] bg-[#fafbfb]">
                    <TableHead className="text-xs font-medium text-gray-600 px-2 md:px-4 py-3 text-left">Title</TableHead>
                    <TableHead className="text-xs font-medium text-gray-600 px-2 md:px-4 py-3 text-left">Type</TableHead>
                    <TableHead className="text-xs font-medium text-gray-600 px-2 md:px-4 py-3 text-left hidden sm:table-cell">Status</TableHead>
                    <TableHead className="text-xs font-medium text-gray-600 px-2 md:px-4 py-3 text-left">Updated</TableHead>
                    <TableHead className="text-xs font-medium text-gray-600 px-2 md:px-4 py-3 text-left">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <TableRow className="border-b border-[#f1f1f1] hover:bg-[#fafbfb]">
                    <TableCell className="px-2 md:px-4 py-3 font-medium text-gray-900 text-xs md:text-sm">About Our Nordic Heritage</TableCell>
                    <TableCell className="px-2 md:px-4 py-3 text-xs md:text-sm text-gray-700">Page</TableCell>
                    <TableCell className="px-2 md:px-4 py-3 hidden sm:table-cell">
                      <Badge className="bg-green-100 text-green-700 border-green-200 text-xs">Published</Badge>
                    </TableCell>
                    <TableCell className="px-2 md:px-4 py-3 text-xs md:text-sm text-gray-700">2 days ago</TableCell>
                    <TableCell className="px-2 md:px-4 py-3">
                      <div className="flex items-center space-x-2">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => {
                            setSelectedItem({id: 1, name: 'About Our Nordic Heritage', type: 'page', status: 'Published'});
                            setIsEditModalOpen(true);
                          }}
                          className="text-blue-600 hover:text-blue-800 h-6 px-2 text-xs"
                        >
                          Edit
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => toast({ title: "Page deleted", description: "Content page has been removed." })}
                          className="text-red-600 hover:text-red-800 h-6 px-2 text-xs"
                        >
                          Delete
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                  <TableRow className="border-b border-[#f1f1f1] hover:bg-[#fafbfb]">
                    <TableCell className="px-2 md:px-4 py-3 font-medium text-gray-900 text-xs md:text-sm">Summer Fashion Trends</TableCell>
                    <TableCell className="px-2 md:px-4 py-3 text-xs md:text-sm text-gray-700">Blog</TableCell>
                    <TableCell className="px-2 md:px-4 py-3 hidden sm:table-cell">
                      <Badge className="bg-yellow-100 text-yellow-700 border-yellow-200 text-xs">Draft</Badge>
                    </TableCell>
                    <TableCell className="px-2 md:px-4 py-3 text-xs md:text-sm text-gray-700">1 week ago</TableCell>
                    <TableCell className="px-2 md:px-4 py-3">
                      <div className="flex items-center space-x-2">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => {
                            setSelectedItem({id: 2, name: 'Summer Fashion Trends', type: 'blog', status: 'Draft'});
                            setIsEditModalOpen(true);
                          }}
                          className="text-blue-600 hover:text-blue-800 h-6 px-2 text-xs"
                        >
                          Edit
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => toast({ title: "Blog post deleted", description: "Blog post has been removed." })}
                          className="text-red-600 hover:text-red-800 h-6 px-2 text-xs"
                        >
                          Delete
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </div>
          </div>
        );

      case "settings":
        return (
          <div className="p-3 md:p-6 bg-white">
            <div className="flex items-center justify-between mb-4">
              <h1 className="text-lg md:text-xl font-semibold text-gray-900">Settings</h1>
            </div>

            {/* Settings Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
              <div className="bg-[#f8f8f8] p-4 rounded">
                <h3 className="text-sm font-medium text-gray-900 mb-2">General Settings</h3>
                <div className="space-y-2 text-xs text-gray-600">
                  <div>Store Name: Scandiscent</div>
                  <div>Time Zone: Europe/Stockholm</div>
                  <div>Currency: SEK</div>
                  <div>Language: Swedish</div>
                </div>
              </div>
              <div className="bg-[#f8f8f8] p-4 rounded">
                <h3 className="text-sm font-medium text-gray-900 mb-2">Payment Settings</h3>
                <div className="space-y-2 text-xs text-gray-600">
                  <div>Payment Methods: 3 active</div>
                  <div>Default Currency: SEK</div>
                  <div>Tax Settings: Configured</div>
                  <div>Shipping: 2 zones</div>
                </div>
              </div>
              <div className="bg-[#f8f8f8] p-4 rounded">
                <h3 className="text-sm font-medium text-gray-900 mb-2">Security</h3>
                <div className="space-y-2 text-xs text-gray-600">
                  <div>Two-Factor Auth: Enabled</div>
                  <div>SSL Certificate: Active</div>
                  <div>Admin Sessions: 2 active</div>
                  <div>Last Login: Today</div>
                </div>
              </div>
              <div className="bg-[#f8f8f8] p-4 rounded">
                <h3 className="text-sm font-medium text-gray-900 mb-2">Notifications</h3>
                <div className="space-y-2 text-xs text-gray-600">
                  <div>Email Alerts: Enabled</div>
                  <div>Order Notifications: On</div>
                  <div>Marketing Emails: On</div>
                  <div>System Updates: On</div>
                </div>
              </div>
            </div>

            {/* Settings Table */}
            <div className="bg-white border border-[#e1e3e5] rounded overflow-hidden overflow-x-auto">
              <div className="p-4 border-b border-[#e1e3e5] bg-[#fafbfb]">
                <h3 className="text-sm font-medium text-gray-900">System Configuration</h3>
              </div>
              <Table>
                <TableHeader>
                  <TableRow className="border-b border-[#e1e3e5] bg-[#fafbfb]">
                    <TableHead className="text-xs font-medium text-gray-600 px-2 md:px-4 py-3 text-left">Setting</TableHead>
                    <TableHead className="text-xs font-medium text-gray-600 px-2 md:px-4 py-3 text-left">Value</TableHead>
                    <TableHead className="text-xs font-medium text-gray-600 px-2 md:px-4 py-3 text-left hidden sm:table-cell">Status</TableHead>
                    <TableHead className="text-xs font-medium text-gray-600 px-2 md:px-4 py-3 text-left">Last Updated</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <TableRow className="border-b border-[#f1f1f1] hover:bg-[#fafbfb]">
                    <TableCell className="px-2 md:px-4 py-3 font-medium text-gray-900 text-xs md:text-sm">Database Backup</TableCell>
                    <TableCell className="px-2 md:px-4 py-3 text-xs md:text-sm text-gray-700">Daily at 2:00 AM</TableCell>
                    <TableCell className="px-2 md:px-4 py-3 hidden sm:table-cell">
                      <Badge className="bg-green-100 text-green-700 border-green-200 text-xs">Active</Badge>
                    </TableCell>
                    <TableCell className="px-2 md:px-4 py-3 text-xs md:text-sm text-gray-700">Today</TableCell>
                  </TableRow>
                  <TableRow className="border-b border-[#f1f1f1] hover:bg-[#fafbfb]">
                    <TableCell className="px-2 md:px-4 py-3 font-medium text-gray-900 text-xs md:text-sm">API Rate Limit</TableCell>
                    <TableCell className="px-2 md:px-4 py-3 text-xs md:text-sm text-gray-700">1000 req/min</TableCell>
                    <TableCell className="px-2 md:px-4 py-3 hidden sm:table-cell">
                      <Badge className="bg-green-100 text-green-700 border-green-200 text-xs">Normal</Badge>
                    </TableCell>
                    <TableCell className="px-2 md:px-4 py-3 text-xs md:text-sm text-gray-700">Yesterday</TableCell>
                  </TableRow>
                  <TableRow className="border-b border-[#f1f1f1] hover:bg-[#fafbfb]">
                    <TableCell className="px-2 md:px-4 py-3 font-medium text-gray-900 text-xs md:text-sm">System Version</TableCell>
                    <TableCell className="px-2 md:px-4 py-3 text-xs md:text-sm text-gray-700">v3.2.0</TableCell>
                    <TableCell className="px-2 md:px-4 py-3 hidden sm:table-cell">
                      <Badge className="bg-green-100 text-green-700 border-green-200 text-xs">Latest</Badge>
                    </TableCell>
                    <TableCell className="px-2 md:px-4 py-3 text-xs md:text-sm text-gray-700">1 week ago</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Shopify Header - Exact colors */}
      <header className="bg-[#303030] text-white h-14 flex items-center px-4 border-b border-gray-800">
        <div className="flex items-center justify-between w-full">
          {/* Left side */}
          <div className="flex items-center space-x-3">
            <div className="bg-[#5c946e] text-white px-1.5 py-0.5 rounded text-xs font-bold">S</div>
            <span className="text-white font-medium text-sm">scandiscent</span>
            <span className="text-gray-400 text-xs">Summer '25</span>
          </div>
          
          {/* Center search */}
          <div className="flex-1 max-w-md mx-8">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-3.5 w-3.5 text-gray-400" />
              <input 
                type="text" 
                placeholder="Search" 
                className="w-full pl-9 pr-12 py-1.5 bg-[#404040] text-white border border-[#505050] rounded text-sm placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-blue-400"
              />
              <span className="absolute right-3 top-1/2 transform -translate-y-1/2 text-xs text-gray-400">Ctrl K</span>
            </div>
          </div>

          {/* Right side */}
          <div className="flex items-center space-x-3">
            {/* Mobile menu button */}
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsMobileSidebarOpen(!isMobileSidebarOpen)}
              className="text-white hover:bg-[#404040] h-7 px-2 md:hidden"
            >
              <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </Button>
            
            <div className="bg-red-500 text-white text-xs rounded-full h-4 w-4 flex items-center justify-center font-medium">1</div>
            <span className="text-xs text-gray-300 max-w-32 truncate hidden sm:block">Website Builder Insider...</span>
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={logout}
              className="text-white hover:bg-[#404040] h-7 px-2 text-xs"
            >
              <span className="hidden sm:inline">Logga ut</span>
              <span className="sm:hidden">Ut</span>
            </Button>
          </div>
        </div>
      </header>

      <div className="flex relative">
        {/* Mobile Sidebar Overlay */}
        {isMobileSidebarOpen && (
          <div 
            className="fixed inset-0 bg-black bg-opacity-50 z-40 md:hidden"
            onClick={() => setIsMobileSidebarOpen(false)}
          />
        )}

        {/* Sidebar - Responsive */}
        <aside className={`
          w-48 bg-[#f6f6f7] min-h-screen border-r border-[#e1e3e5]
          md:relative md:translate-x-0 transition-transform duration-300 ease-in-out
          ${isMobileSidebarOpen ? 'fixed z-50 translate-x-0' : 'fixed z-50 -translate-x-full md:translate-x-0'}
        `}>
          <nav className="py-2 h-full overflow-y-auto">
            {/* Close button for mobile */}
            <div className="md:hidden flex justify-end p-2">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setIsMobileSidebarOpen(false)}
                className="text-gray-600 hover:bg-gray-200 h-6 w-6 p-0"
              >
                <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </Button>
            </div>

            {/* Main Navigation */}
            <ul className="space-y-0.5">
              {navigationItems.map((item) => {
                const Icon = item.icon;
                return (
                  <li key={item.id}>
                    <button
                      onClick={() => {
                        setSelectedTab(item.id);
                        setIsMobileSidebarOpen(false);
                      }}
                      className={`w-full flex items-center space-x-2.5 px-3 py-1.5 text-left text-sm transition-colors ${
                        selectedTab === item.id
                          ? 'bg-white text-gray-900 font-medium border-r-2 border-[#008060] shadow-sm'
                          : 'text-gray-700 hover:bg-[#f1f2f3]'
                      }`}
                    >
                      <Icon className="h-4 w-4 text-gray-600" />
                      <span className="text-sm">{item.label}</span>
                    </button>
                  </li>
                );
              })}
            </ul>

            {/* Sales Channels Section */}
            <div className="mt-4 px-3">
              <div className="flex items-center justify-between py-2">
                <h3 className="text-xs font-medium text-gray-600 uppercase tracking-wider">Sales channels</h3>
                <ChevronRight className="h-3 w-3 text-gray-500" />
              </div>
              <ul className="space-y-0.5">
                {salesChannelItems.map((item) => {
                  const Icon = item.icon;
                  return (
                    <li key={item.id}>
                      <button className="w-full flex items-center space-x-2.5 px-0 py-1 text-left text-sm text-gray-700 hover:bg-[#f1f2f3] rounded">
                        <Icon className="h-4 w-4 text-gray-600" />
                        <span className="text-sm">{item.label}</span>
                      </button>
                    </li>
                  );
                })}
              </ul>
            </div>



            {/* Settings at bottom */}
            <div className="absolute bottom-4 w-full px-3">
              <button
                onClick={() => {
                  setSelectedTab("settings");
                  setIsMobileSidebarOpen(false);
                }}
                className={`w-full flex items-center space-x-2.5 px-0 py-1.5 text-left text-sm transition-colors ${
                  selectedTab === "settings"
                    ? 'bg-white text-gray-900 font-medium shadow-sm rounded'
                    : 'text-gray-700 hover:bg-[#f1f2f3] rounded'
                }`}
              >
                <Settings className="h-4 w-4 text-gray-600" />
                <span className="text-sm">Settings</span>
              </button>
            </div>
          </nav>
        </aside>

        {/* Main Content - Responsive */}
        <main className="flex-1 bg-white md:ml-0">
          <div className="md:hidden h-0"></div> {/* Spacer for mobile */}
          {renderContent()}
        </main>
      </div>
      
      {/* Order Details Modal */}
      <OrderDetailsModal 
        order={selectedOrder}
        isOpen={isOrderModalOpen}
        onClose={closeOrderModal}
      />

      {/* Create Product Modal */}
      <Dialog open={isCreateProductOpen} onOpenChange={setIsCreateProductOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Lägg till ny produkt</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-2">Produktnamn</label>
              <input className="w-full px-3 py-2 border border-gray-300 rounded-md" placeholder="T.ex. Vacker spetsunderkläder" />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Pris (SEK)</label>
              <input type="number" className="w-full px-3 py-2 border border-gray-300 rounded-md" placeholder="299" />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Beskrivning</label>
              <textarea className="w-full px-3 py-2 border border-gray-300 rounded-md" rows={3} placeholder="Produktbeskrivning..." />
            </div>
            <div className="flex justify-end space-x-3">
              <Button variant="outline" onClick={() => setIsCreateProductOpen(false)}>Avbryt</Button>
              <Button onClick={() => {
                toast({ title: "Produkt skapad", description: "Den nya produkten har lagts till." });
                setIsCreateProductOpen(false);
              }}>Skapa produkt</Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Create Customer/Seller Modal */}
      <Dialog open={isCreateCustomerOpen} onOpenChange={setIsCreateCustomerOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Lägg till ny säljare</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-2">Alias</label>
              <input className="w-full px-3 py-2 border border-gray-300 rounded-md" placeholder="T.ex. Emma" />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Ålder</label>
              <input type="number" className="w-full px-3 py-2 border border-gray-300 rounded-md" placeholder="25" />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Plats</label>
              <input className="w-full px-3 py-2 border border-gray-300 rounded-md" placeholder="Stockholm" />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Provision (%)</label>
              <input type="number" className="w-full px-3 py-2 border border-gray-300 rounded-md" placeholder="50" min="0" max="100" />
            </div>
            <div className="flex justify-end space-x-3">
              <Button variant="outline" onClick={() => setIsCreateCustomerOpen(false)}>Avbryt</Button>
              <Button onClick={() => {
                toast({ title: "Säljare skapad", description: "Den nya säljaren har lagts till." });
                setIsCreateCustomerOpen(false);
              }}>Skapa säljare</Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Create Content Modal */}
      <Dialog open={isCreateContentOpen} onOpenChange={setIsCreateContentOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Skapa nytt innehåll</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-2">Titel</label>
              <input className="w-full px-3 py-2 border border-gray-300 rounded-md" placeholder="T.ex. Ny bloggpost" />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Typ</label>
              <select className="w-full px-3 py-2 border border-gray-300 rounded-md">
                <option>Sida</option>
                <option>Bloggpost</option>
                <option>FAQ</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Status</label>
              <select className="w-full px-3 py-2 border border-gray-300 rounded-md">
                <option>Utkast</option>
                <option>Publicerad</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Innehåll</label>
              <textarea className="w-full px-3 py-2 border border-gray-300 rounded-md" rows={4} placeholder="Skriv ditt innehåll här..." />
            </div>
            <div className="flex justify-end space-x-3">
              <Button variant="outline" onClick={() => setIsCreateContentOpen(false)}>Avbryt</Button>
              <Button onClick={() => {
                toast({ title: "Innehåll skapat", description: "Det nya innehållet har lagts till." });
                setIsCreateContentOpen(false);
              }}>Skapa innehåll</Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Edit Modal (Generic) */}
      <Dialog open={isEditModalOpen} onOpenChange={setIsEditModalOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>
              {selectedItem?.type === 'product' && 'Redigera produkt'}
              {selectedItem?.type === 'seller' && 'Redigera säljare'}
              {selectedItem?.type === 'content' && 'Redigera innehåll'}
              {selectedItem?.type === 'customer' && 'Redigera kund'}
              {selectedItem?.type === 'page' && 'Redigera sida'}
              {selectedItem?.type === 'blog' && 'Redigera bloggpost'}
            </DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            {selectedItem?.type === 'product' && (
              <>
                <div>
                  <label className="block text-sm font-medium mb-2">Produktnamn</label>
                  <input className="w-full px-3 py-2 border border-gray-300 rounded-md" defaultValue={selectedItem?.title || selectedItem?.name} />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Pris (SEK)</label>
                  <input type="number" className="w-full px-3 py-2 border border-gray-300 rounded-md" defaultValue={selectedItem?.priceKr} />
                </div>
              </>
            )}
            {(selectedItem?.type === 'seller' || selectedItem?.type === 'customer') && (
              <>
                <div>
                  <label className="block text-sm font-medium mb-2">Alias</label>
                  <input className="w-full px-3 py-2 border border-gray-300 rounded-md" defaultValue={selectedItem?.alias} />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Ålder</label>
                  <input type="number" className="w-full px-3 py-2 border border-gray-300 rounded-md" defaultValue={selectedItem?.age} />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Plats</label>
                  <input className="w-full px-3 py-2 border border-gray-300 rounded-md" defaultValue={selectedItem?.location} />
                </div>
              </>
            )}
            {(selectedItem?.type === 'content' || selectedItem?.type === 'page' || selectedItem?.type === 'blog') && (
              <>
                <div>
                  <label className="block text-sm font-medium mb-2">Titel</label>
                  <input className="w-full px-3 py-2 border border-gray-300 rounded-md" defaultValue={selectedItem?.name} />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Status</label>
                  <select className="w-full px-3 py-2 border border-gray-300 rounded-md" defaultValue={selectedItem?.status}>
                    <option>Utkast</option>
                    <option>Publicerad</option>
                  </select>
                </div>
              </>
            )}
            <div className="flex justify-end space-x-3">
              <Button variant="outline" onClick={() => setIsEditModalOpen(false)}>Avbryt</Button>
              <Button onClick={() => {
                toast({ 
                  title: "Ändringar sparade", 
                  description: `${selectedItem?.type === 'product' ? 'Produkten' : selectedItem?.type === 'seller' ? 'Säljaren' : 'Innehållet'} har uppdaterats.` 
                });
                setIsEditModalOpen(false);
                setSelectedItem(null);
              }}>Spara ändringar</Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}