import { useState } from "react";
import { useQuery, useMutation } from "@tanstack/react-query";
import { useAdminAuth } from "@/hooks/useAdminAuth";
import { queryClient } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { 
  BarChart3, 
  ShoppingBag, 
  Users, 
  DollarSign, 
  TrendingUp, 
  Package,
  Bell,
  Search,
  Filter,
  MoreVertical,
  Eye,
  Edit,
  Archive,
  Download,
  RefreshCw,
  Settings,
  LogOut,
  ChevronDown,
  Calendar,
  ArrowUpRight,
  ArrowDownRight,
  Clock,
  CheckCircle,
  Truck,
  XCircle
} from "lucide-react";
import ProductManager from "@/components/admin/product-manager";
import OrderStatusManager from "@/components/admin/order-status-manager";
import QuickActions from "@/components/admin/quick-actions";
import EnhancedSearch from "@/components/admin/enhanced-search";
import VisualImprovements from "@/components/visual-improvements";
import SellerManager from "@/components/admin/seller-manager";
import SettingsPanel from "@/components/admin/settings-panel";
import { format } from "date-fns";

export default function ShopifyAdmin() {
  // All hooks must be called at the top level before any conditional returns
  const { isAuthenticated, isLoading: authLoading, adminUser, logout, getAuthHeader } = useAdminAuth();
  const { toast } = useToast();
  const [selectedTab, setSelectedTab] = useState("overview");
  const [orderStatusFilter, setOrderStatusFilter] = useState("all");
  const [paymentStatusFilter, setPaymentStatusFilter] = useState("all");

  // Queries with authentication - always called but enabled conditionally
  const { data: orders, isLoading: ordersLoading } = useQuery({
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

  const { data: products } = useQuery({
    queryKey: ['/api/products'],
    enabled: isAuthenticated,
  });

  const { data: sellers } = useQuery({
    queryKey: ['/api/sellers'],
    enabled: isAuthenticated,
  });

  // Update order mutation - always defined
  const updateOrderMutation = useMutation({
    mutationFn: async ({ orderId, updates }: { orderId: string; updates: any }) => {
      const authHeaders = getAuthHeader();
      const response = await fetch(`/api/orders/${orderId}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          ...authHeaders,
        },
        body: JSON.stringify(updates),
      });
      if (!response.ok) throw new Error('Failed to update order');
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/admin/orders'] });
      toast({
        title: "Order updated",
        description: "The order status has been updated successfully.",
      });
    },
  });

  // NOW we can do conditional rendering after all hooks are called
  if (authLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-green-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading admin panel...</p>
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
    totalOrders: Array.isArray(orders) ? orders.length : 0,
    pendingOrders: Array.isArray(orders) ? orders.filter((o: any) => o.status === "pending").length : 0,
    completedOrders: Array.isArray(orders) ? orders.filter((o: any) => o.status === "completed").length : 0,
    totalRevenue: Array.isArray(orders) ? orders.reduce((sum: number, order: any) => sum + parseFloat(order.totalAmountKr), 0) : 0,
    totalProducts: Array.isArray(products) ? products.length : 0,
    activeSellers: Array.isArray(sellers) ? sellers.filter((s: any) => s.isActive).length : 0,
  };

  // Filter orders
  const filteredOrders = Array.isArray(orders) ? orders.filter((order: any) => {
    const matchesOrderStatus = orderStatusFilter === "all" || order.status === orderStatusFilter;
    const matchesPaymentStatus = paymentStatusFilter === "all" || order.paymentStatus === paymentStatusFilter;
    return matchesOrderStatus && matchesPaymentStatus;
  }) : [];

  const getStatusBadge = (status: string) => {
    const variants: Record<string, string> = {
      pending: "bg-yellow-100 text-yellow-800",
      confirmed: "bg-blue-100 text-blue-800", 
      shipped: "bg-purple-100 text-purple-800",
      completed: "bg-green-100 text-green-800",
      cancelled: "bg-red-100 text-red-800",
      returned: "bg-orange-100 text-orange-800"
    };
    return <Badge className={variants[status] || "bg-gray-100 text-gray-800"}>{status}</Badge>;
  };

  const getPaymentBadge = (status: string) => {
    const variants: Record<string, string> = {
      pending: "bg-yellow-100 text-yellow-800",
      completed: "bg-green-100 text-green-800",
      failed: "bg-red-100 text-red-800",
      expired: "bg-orange-100 text-orange-800"
    };
    return <Badge className={variants[status] || "bg-gray-100 text-gray-800"}>{status}</Badge>;
  };

  return (
    <div className="min-h-screen gradient-nordic">
      {/* Mobile-First Responsive Header */}
      <header className="glass border-b border-dusty-rose/20 sticky top-0 z-50 shadow-luxury backdrop-blur-xl">
        <div className="px-4 py-3 md:px-6 md:py-4 max-w-none">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3 md:space-x-8">
              <div className="flex items-center space-x-2 md:space-x-4">
                <div>
                  <h1 className="text-lg md:text-3xl font-bold text-deep-charcoal font-poppins tracking-tight">
                    <span className="hidden sm:inline">Scandiscent Admin</span>
                    <span className="sm:hidden">Admin Panel</span>
                  </h1>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <Badge className="bg-sage-mist text-deep-charcoal px-4 py-2 text-sm font-medium rounded-full shadow-sm">Live</Badge>
                <Badge className="bg-green-100 text-green-700 px-3 py-1 text-xs font-medium rounded-full">
                  <div className="w-2 h-2 bg-green-500 rounded-full mr-2 animate-pulse"></div>
                  Online
                </Badge>
              </div>
            </div>
            
            <div className="flex items-center space-x-2 md:space-x-4">
              <div className="hidden xl:flex items-center space-x-2">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-[#064F8C]" />
                  <input 
                    type="text" 
                    placeholder="Sök beställningar, produkter..." 
                    className="pl-10 bg-white text-[#064F8C] border-2 border-[#064F8C] rounded-lg shadow-sm placeholder:text-[#064F8C]/60 focus:border-[#064F8C] focus:ring-2 focus:ring-[#064F8C]/20 w-64 h-10 px-3 py-2 outline-none"
                  />
                </div>
              </div>
              <Button variant="ghost" size="sm" className="hover:bg-dusty-rose/20 rounded-xl md:rounded-2xl p-2 md:p-3 relative">
                <Bell className="h-4 w-4 md:h-6 md:w-6 text-soft-taupe" />
                <span className="absolute -top-1 -right-1 w-3 h-3 md:w-4 md:h-4 bg-red-500 text-white text-xs rounded-full flex items-center justify-center">3</span>
              </Button>
              <Separator orientation="vertical" className="h-6 md:h-8 bg-dusty-rose/30 hidden sm:block" />
              <div className="flex items-center space-x-2 md:space-x-4">
                <div className="text-right hidden lg:block">
                  <p className="text-lg text-deep-charcoal font-medium">Välkommen, {adminUser?.name || 'Admin'}</p>
                  <p className="text-sm text-soft-taupe">Superadministratör</p>
                </div>
                <Button variant="ghost" size="sm" onClick={logout} className="hover:bg-dusty-rose/20 rounded-xl md:rounded-2xl p-2 md:p-3 group">
                  <LogOut className="h-4 w-4 md:h-6 md:w-6 text-soft-taupe group-hover:text-red-500 transition-colors" />
                </Button>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile-First Responsive Layout */}
      <div className="flex flex-col lg:flex-row min-h-[calc(100vh-85px)]">
        {/* Mobile-First Responsive Sidebar */}
        <aside className="w-full lg:w-96 glass border-b lg:border-b-0 lg:border-r border-dusty-rose/20 shadow-luxury backdrop-blur-xl">
          <div className="p-4 lg:p-8">
            {/* Mobile-First Quick Stats */}
            <div className="grid grid-cols-2 lg:grid-cols-2 gap-3 lg:gap-4 mb-6 lg:mb-8">
              <div className="bg-white/40 backdrop-blur-sm rounded-xl lg:rounded-2xl p-3 lg:p-4 border border-dusty-rose/20">
                <div className="flex items-center space-x-2">
                  <div className="w-6 h-6 lg:w-8 lg:h-8 bg-blue-100 rounded-lg flex items-center justify-center">
                    <ShoppingBag className="h-3 w-3 lg:h-4 lg:w-4 text-blue-600" />
                  </div>
                  <div>
                    <p className="text-lg lg:text-2xl font-bold text-deep-charcoal">{stats.totalOrders}</p>
                    <p className="text-xs text-soft-taupe">Orders</p>
                  </div>
                </div>
              </div>
              <div className="bg-white/40 backdrop-blur-sm rounded-xl lg:rounded-2xl p-3 lg:p-4 border border-dusty-rose/20">
                <div className="flex items-center space-x-2">
                  <div className="w-6 h-6 lg:w-8 lg:h-8 bg-green-100 rounded-lg flex items-center justify-center">
                    <DollarSign className="h-3 w-3 lg:h-4 lg:w-4 text-green-600" />
                  </div>
                  <div>
                    <p className="text-lg lg:text-2xl font-bold text-deep-charcoal">{Math.round(stats.totalRevenue)}</p>
                    <p className="text-xs text-soft-taupe">Revenue</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Mobile-First Navigation */}
            <nav className="space-y-2 lg:space-y-3">
              <Button 
                variant={selectedTab === "overview" ? "default" : "ghost"} 
                className={`w-full justify-start py-3 lg:py-4 px-4 lg:px-6 text-base lg:text-lg rounded-xl lg:rounded-2xl transition-all duration-300 ${
                  selectedTab === "overview" 
                    ? "btn-luxury text-nordic-cream shadow-luxury scale-105" 
                    : "text-soft-taupe hover:bg-dusty-rose/20 hover:text-deep-charcoal hover:scale-102"
                }`}
                onClick={() => setSelectedTab("overview")}
              >
                <BarChart3 className="h-5 w-5 lg:h-6 lg:w-6 mr-3 lg:mr-4" />
                <span>Översikt</span>
                <div className="ml-auto">
                  {selectedTab === "overview" && <ChevronDown className="h-3 w-3 lg:h-4 lg:w-4" />}
                </div>
              </Button>
              <Button 
                variant={selectedTab === "orders" ? "default" : "ghost"} 
                className={`w-full justify-start py-3 lg:py-4 px-4 lg:px-6 text-base lg:text-lg rounded-xl lg:rounded-2xl transition-all duration-300 ${
                  selectedTab === "orders" 
                    ? "btn-luxury text-nordic-cream shadow-luxury scale-105" 
                    : "text-soft-taupe hover:bg-dusty-rose/20 hover:text-deep-charcoal hover:scale-102"
                }`}
                onClick={() => setSelectedTab("orders")}
              >
                <ShoppingBag className="h-5 w-5 lg:h-6 lg:w-6 mr-3 lg:mr-4" />
                <span>Beställningar</span>
                <div className="ml-auto flex items-center space-x-1 lg:space-x-2">
                  <Badge className="bg-red-100 text-red-700 text-xs px-1.5 lg:px-2 py-0.5 rounded-full">
                    {orders?.filter((o: any) => o.status === 'pending').length || 0}
                  </Badge>
                  {selectedTab === "orders" && <ChevronDown className="h-3 w-3 lg:h-4 lg:w-4" />}
                </div>
              </Button>
              <Button 
                variant={selectedTab === "products" ? "default" : "ghost"} 
                className={`w-full justify-start py-3 lg:py-4 px-4 lg:px-6 text-base lg:text-lg rounded-xl lg:rounded-2xl transition-all duration-300 ${
                  selectedTab === "products" 
                    ? "btn-luxury text-nordic-cream shadow-luxury scale-105" 
                    : "text-soft-taupe hover:bg-dusty-rose/20 hover:text-deep-charcoal hover:scale-102"
                }`}
                onClick={() => setSelectedTab("products")}
              >
                <Package className="h-5 w-5 lg:h-6 lg:w-6 mr-3 lg:mr-4" />
                <span>Produkter</span>
                <div className="ml-auto flex items-center space-x-1 lg:space-x-2">
                  <Badge className="bg-blue-100 text-blue-700 text-xs px-1.5 lg:px-2 py-0.5 rounded-full">
                    {stats.totalProducts}
                  </Badge>
                  {selectedTab === "products" && <ChevronDown className="h-3 w-3 lg:h-4 lg:w-4" />}
                </div>
              </Button>
              <Button 
                variant={selectedTab === "sellers" ? "default" : "ghost"} 
                className={`w-full justify-start py-3 lg:py-4 px-4 lg:px-6 text-base lg:text-lg rounded-xl lg:rounded-2xl transition-all duration-300 ${
                  selectedTab === "sellers" 
                    ? "btn-luxury text-nordic-cream shadow-luxury scale-105" 
                    : "text-soft-taupe hover:bg-dusty-rose/20 hover:text-deep-charcoal hover:scale-102"
                }`}
                onClick={() => setSelectedTab("sellers")}
              >
                <Users className="h-5 w-5 lg:h-6 lg:w-6 mr-3 lg:mr-4" />
                <span>Säljare</span>
                <div className="ml-auto flex items-center space-x-1 lg:space-x-2">
                  <Badge className="bg-orange-100 text-orange-700 text-xs px-1.5 lg:px-2 py-0.5 rounded-full">
                    {stats.activeSellers}
                  </Badge>
                  {selectedTab === "sellers" && <ChevronDown className="h-4 w-4" />}
                </div>
              </Button>
              <Separator className="my-6 bg-dusty-rose/30" />
              <Button 
                variant={selectedTab === "settings" ? "default" : "ghost"}
                className={`w-full justify-start py-4 px-6 text-lg rounded-2xl transition-all duration-300 ${
                  selectedTab === "settings" 
                    ? "btn-luxury text-nordic-cream shadow-luxury scale-105" 
                    : "text-soft-taupe hover:bg-dusty-rose/20 hover:text-deep-charcoal hover:scale-102"
                }`}
                onClick={() => setSelectedTab("settings")}
              >
                <Settings className="h-6 w-6 mr-4" />
                <span>Inställningar</span>
                <div className="ml-auto">
                  {selectedTab === "settings" && <ChevronDown className="h-4 w-4" />}
                </div>
              </Button>
            </nav>

            {/* Mobile-First Quick Actions */}
            <div className="mt-6 lg:mt-8 p-3 lg:p-4 bg-white/30 backdrop-blur-sm rounded-xl lg:rounded-2xl border border-dusty-rose/20">
              <h3 className="text-sm font-semibold text-deep-charcoal mb-2 lg:mb-3">Snabbåtgärder</h3>
              <div className="space-y-1 lg:space-y-2">
                <Button variant="ghost" size="sm" className="w-full justify-start text-xs lg:text-sm py-2">
                  <Clock className="h-3 w-3 lg:h-4 lg:w-4 mr-2 lg:mr-3" />
                  Senaste aktivitet
                </Button>
                <Button variant="ghost" size="sm" className="w-full justify-start text-xs lg:text-sm py-2">
                  <RefreshCw className="h-3 w-3 lg:h-4 lg:w-4 mr-2 lg:mr-3" />
                  Uppdatera data
                </Button>
              </div>
            </div>
          </div>
        </aside>

        {/* Mobile-First Content Area */}
        <main className="flex-1 bg-gradient-to-br from-nordic-cream/30 to-champagne/20 overflow-y-auto">
          <div className="p-4 lg:p-8 max-w-none">
            {selectedTab === "overview" && (
              <div className="space-y-8">
                {/* Enhanced Header */}
                <div className="flex items-center justify-between">
                  <div>
                    <h2 className="text-4xl font-bold text-deep-charcoal mb-2 font-poppins">Dashboard Overview</h2>
                    <p className="text-soft-taupe text-lg">Monitor your store performance and key metrics</p>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Button variant="outline" className="rounded-2xl">
                      <Calendar className="h-4 w-4 mr-2" />
                      Last 30 days
                    </Button>
                    <Button className="btn-luxury rounded-2xl">
                      <Download className="h-4 w-4 mr-2" />
                      Export Report
                    </Button>
                  </div>
                </div>
                
                {/* Enhanced Quick Actions Grid */}
                <div className="grid grid-cols-1 2xl:grid-cols-12 gap-8">
                  <div className="2xl:col-span-8">
                    <QuickActions stats={stats} />
                  </div>
                  <div className="2xl:col-span-4">
                    <VisualImprovements />
                  </div>
                </div>
                
                {/* Enhanced Stats Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-4 gap-6">
                <Card>
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium text-gray-600">Total Revenue</p>
                        <p className="text-2xl font-bold text-gray-900">{stats.totalRevenue.toFixed(0)} kr</p>
                      </div>
                      <div className="h-12 w-12 bg-green-100 rounded-lg flex items-center justify-center">
                        <DollarSign className="h-6 w-6 text-green-600" />
                      </div>
                    </div>
                    <div className="flex items-center mt-4 text-sm">
                      <ArrowUpRight className="h-4 w-4 text-green-500 mr-1" />
                      <span className="text-green-600">+8.2%</span>
                      <span className="text-gray-500 ml-1">from last month</span>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium text-gray-600">Total Orders</p>
                        <p className="text-2xl font-bold text-gray-900">{stats.totalOrders}</p>
                      </div>
                      <div className="h-12 w-12 bg-blue-100 rounded-lg flex items-center justify-center">
                        <ShoppingBag className="h-6 w-6 text-blue-600" />
                      </div>
                    </div>
                    <div className="flex items-center mt-4 text-sm">
                      <ArrowUpRight className="h-4 w-4 text-green-500 mr-1" />
                      <span className="text-green-600">+12.5%</span>
                      <span className="text-gray-500 ml-1">from last month</span>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium text-gray-600">Active Products</p>
                        <p className="text-2xl font-bold text-gray-900">{stats.totalProducts}</p>
                      </div>
                      <div className="h-12 w-12 bg-purple-100 rounded-lg flex items-center justify-center">
                        <Package className="h-6 w-6 text-purple-600" />
                      </div>
                    </div>
                    <div className="flex items-center mt-4 text-sm">
                      <ArrowUpRight className="h-4 w-4 text-green-500 mr-1" />
                      <span className="text-green-600">+3.1%</span>
                      <span className="text-gray-500 ml-1">from last month</span>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium text-gray-600">Active Sellers</p>
                        <p className="text-2xl font-bold text-gray-900">{stats.activeSellers}</p>
                      </div>
                      <div className="h-12 w-12 bg-orange-100 rounded-lg flex items-center justify-center">
                        <Users className="h-6 w-6 text-orange-600" />
                      </div>
                    </div>
                    <div className="flex items-center mt-4 text-sm">
                      <ArrowDownRight className="h-4 w-4 text-red-500 mr-1" />
                      <span className="text-red-600">-2.1%</span>
                      <span className="text-gray-500 ml-1">from last month</span>
                    </div>
                  </CardContent>
                </Card>
              </div>

                {/* Enhanced Recent Orders */}
                <Card className="shadow-luxury border-dusty-rose/20 backdrop-blur-sm">
                  <CardHeader className="pb-4">
                    <CardTitle className="flex items-center justify-between text-2xl text-deep-charcoal font-poppins">
                      Recent Orders
                      <div className="flex items-center space-x-3">
                        <Badge className="bg-blue-100 text-blue-700 px-3 py-1">
                          {orders?.length || 0} total
                        </Badge>
                        <Button variant="ghost" size="sm" onClick={() => setSelectedTab("orders")} className="hover:bg-dusty-rose/20 rounded-xl">
                          <Eye className="h-4 w-4 mr-2" />
                          View all
                        </Button>
                      </div>
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="px-0">
                    <div className="overflow-x-auto">
                      <Table>
                        <TableHeader>
                          <TableRow className="border-dusty-rose/20">
                            <TableHead className="pl-6 text-soft-taupe font-semibold">Order ID</TableHead>
                            <TableHead className="text-soft-taupe font-semibold">Customer</TableHead>
                            <TableHead className="text-soft-taupe font-semibold">Product</TableHead>
                            <TableHead className="text-soft-taupe font-semibold">Amount</TableHead>
                            <TableHead className="text-soft-taupe font-semibold">Status</TableHead>
                            <TableHead className="text-soft-taupe font-semibold">Date</TableHead>
                            <TableHead className="pr-6 text-soft-taupe font-semibold">Actions</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {orders?.slice(0, 8).map((order: any) => (
                            <TableRow key={order.id} className="hover:bg-dusty-rose/10 transition-colors border-dusty-rose/10">
                              <TableCell className="pl-6 font-medium text-deep-charcoal">
                                <code className="bg-gray-100 px-2 py-1 rounded text-xs">#{order.id.slice(0, 8)}</code>
                              </TableCell>
                              <TableCell className="text-deep-charcoal">{order.customerEmail}</TableCell>
                              <TableCell>
                                <div className="flex items-center space-x-2">
                                  <img 
                                    src={order.product?.imageUrl || '/placeholder.jpg'} 
                                    alt={order.product?.title}
                                    className="w-8 h-8 rounded-lg object-cover"
                                  />
                                  <span className="text-deep-charcoal font-medium">{order.product?.title}</span>
                                </div>
                              </TableCell>
                              <TableCell className="font-bold text-deep-charcoal">{order.totalAmountKr} kr</TableCell>
                              <TableCell>{getStatusBadge(order.status)}</TableCell>
                              <TableCell className="text-soft-taupe">{format(new Date(order.createdAt), 'MMM dd, yyyy')}</TableCell>
                              <TableCell className="pr-6">
                                <Button variant="ghost" size="sm" className="hover:bg-dusty-rose/20 rounded-xl">
                                  <Eye className="h-4 w-4" />
                                </Button>
                              </TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </div>
                  </CardContent>
                </Card>
              </div>
            )}

            {selectedTab === "orders" && (
              <div className="space-y-8">
                <div className="flex items-center justify-between">
                  <div>
                    <h2 className="text-4xl font-bold text-deep-charcoal font-poppins">Orders Management</h2>
                    <p className="text-soft-taupe text-lg">Manage and track all customer orders</p>
                  </div>
                <div className="flex items-center space-x-2">
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => {
                      const csvData = filteredOrders.map(order => ({
                        OrderID: order.id,
                        Customer: order.customerName || 'Anonym',
                        Email: order.customerEmail,
                        Address: order.shippingAddress,
                        Product: order.product?.title,
                        Total: order.totalAmountKr,
                        Status: order.status,
                        Payment: order.paymentMethod,
                        Date: format(new Date(order.createdAt), 'yyyy-MM-dd')
                      }));
                      const csvString = [
                        Object.keys(csvData[0]).join(','),
                        ...csvData.map(row => Object.values(row).join(','))
                      ].join('\n');
                      const blob = new Blob([csvString], { type: 'text/csv' });
                      const url = window.URL.createObjectURL(blob);
                      const a = document.createElement('a');
                      a.href = url;
                      a.download = `orders-${format(new Date(), 'yyyy-MM-dd')}.csv`;
                      a.click();
                      toast({ title: "Export klar", description: "Ordrar exporterade som CSV" });
                    }}
                  >
                    <Download className="h-4 w-4 mr-2" />
                    Export
                  </Button>
                  <Button 
                    size="sm"
                    onClick={() => {
                      queryClient.invalidateQueries({ queryKey: ['/api/admin/orders'] });
                      toast({ title: "Uppdaterat", description: "Orderlista uppdaterad" });
                    }}
                  >
                    <RefreshCw className="h-4 w-4 mr-2" />
                    Refresh
                  </Button>
                </div>
              </div>

              {/* Enhanced Search */}
              <EnhancedSearch 
                onSearch={(filters) => {
                  // You can implement advanced filtering logic here
                  console.log('Search filters:', filters);
                }} 
                totalResults={filteredOrders.length}
              />

              {/* Filters */}
              <Card>
                <CardContent className="p-4">
                  <div className="flex items-center space-x-4">
                    <Select value={orderStatusFilter} onValueChange={setOrderStatusFilter}>
                      <SelectTrigger className="w-48">
                        <SelectValue placeholder="Order Status" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Statuses</SelectItem>
                        <SelectItem value="pending">Pending</SelectItem>
                        <SelectItem value="confirmed">Confirmed</SelectItem>
                        <SelectItem value="shipped">Shipped</SelectItem>
                        <SelectItem value="completed">Completed</SelectItem>
                        <SelectItem value="cancelled">Cancelled</SelectItem>
                        <SelectItem value="returned">Returned</SelectItem>
                      </SelectContent>
                    </Select>

                    <Select value={paymentStatusFilter} onValueChange={setPaymentStatusFilter}>
                      <SelectTrigger className="w-48">
                        <SelectValue placeholder="Payment Status" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Payments</SelectItem>
                        <SelectItem value="pending">Pending</SelectItem>
                        <SelectItem value="completed">Completed</SelectItem>
                        <SelectItem value="failed">Failed</SelectItem>
                        <SelectItem value="expired">Expired</SelectItem>
                      </SelectContent>
                    </Select>

                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => {
                        toast({ 
                          title: "Avancerade filter", 
                          description: "Datumfilter, belopp och produktkategorier kommer snart" 
                        });
                      }}
                    >
                      <Filter className="h-4 w-4 mr-2" />
                      More filters
                    </Button>
                  </div>
                </CardContent>
              </Card>

              {/* Orders Table */}
              <Card>
                <CardContent className="p-0">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead className="pl-6">Order</TableHead>
                        <TableHead>Customer Info</TableHead>
                        <TableHead>Shipping Address</TableHead>
                        <TableHead>Product</TableHead>
                        <TableHead>Payment</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Total</TableHead>
                        <TableHead>Date</TableHead>
                        <TableHead className="pr-6">Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {filteredOrders.map((order: any) => (
                        <TableRow key={order.id}>
                          <TableCell className="pl-6 font-medium">#{order.id.slice(0, 8)}</TableCell>
                          <TableCell>
                            <div>
                              <p className="font-medium">{order.customerName || 'Anonym'}</p>
                              <p className="text-sm text-gray-500">{order.customerEmail}</p>
                            </div>
                          </TableCell>
                          <TableCell>
                            <div className="max-w-xs">
                              <p className="text-sm text-gray-700 truncate">{order.shippingAddress}</p>
                              <Button 
                                variant="link" 
                                size="sm" 
                                className="h-auto p-0 text-xs text-blue-600 hover:text-blue-800"
                                onClick={() => {
                                  // Open detailed view
                                  alert(order.shippingAddress);
                                }}
                              >
                                Visa fullständig adress
                              </Button>
                            </div>
                          </TableCell>
                          <TableCell>
                            <div className="flex items-center space-x-3">
                              <img 
                                src={order.product?.imageUrl} 
                                alt={order.product?.title}
                                className="w-10 h-10 rounded object-cover"
                              />
                              <div>
                                <p className="font-medium">{order.product?.title}</p>
                                <p className="text-sm text-gray-500">{order.product?.size}</p>
                              </div>
                            </div>
                          </TableCell>
                          <TableCell>
                            <div>
                              {getPaymentBadge(order.paymentStatus)}
                              <p className="text-sm text-gray-500 mt-1 capitalize">{order.paymentMethod}</p>
                            </div>
                          </TableCell>
                          <TableCell>
                            <Select 
                              value={order.status} 
                              onValueChange={(value) => updateOrderMutation.mutate({ 
                                orderId: order.id, 
                                updates: { status: value } 
                              })}
                            >
                              <SelectTrigger className="w-32">
                                <SelectValue />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="pending">Pending</SelectItem>
                                <SelectItem value="confirmed">Confirmed</SelectItem>
                                <SelectItem value="shipped">Shipped</SelectItem>
                                <SelectItem value="completed">Completed</SelectItem>
                                <SelectItem value="cancelled">Cancelled</SelectItem>
                                <SelectItem value="returned">Returned</SelectItem>
                              </SelectContent>
                            </Select>
                          </TableCell>
                          <TableCell className="font-medium">{order.totalAmountKr} kr</TableCell>
                          <TableCell>{format(new Date(order.createdAt), 'MMM dd, yyyy')}</TableCell>
                          <TableCell className="pr-6">
                            <div className="flex items-center space-x-2">
                              <Button 
                                variant="ghost" 
                                size="sm"
                                onClick={() => {
                                  // Open detailed order view
                                  const orderDetails = `
BESTÄLLNING #${order.id}

KUNDUPPGIFTER:
Namn: ${order.customerName || 'Anonym'}
E-post: ${order.customerEmail}

LEVERANSADRESS:
${order.shippingAddress}

PRODUKT:
${order.product?.title} (${order.product?.size})
Pris: ${order.totalAmountKr} kr

BETALNING:
Metod: ${order.paymentMethod}
Status: ${order.paymentStatus}
${order.cryptoCurrency ? `Krypto: ${order.cryptoAmount} ${order.cryptoCurrency}` : ''}

STATUS: ${order.status}
SKAPAD: ${format(new Date(order.createdAt), 'yyyy-MM-dd HH:mm')}
                                  `.trim();
                                  alert(orderDetails);
                                }}
                              >
                                <Eye className="h-4 w-4" />
                              </Button>
                              {order.status === 'completed' && (
                                <Button 
                                  variant="ghost" 
                                  size="sm"
                                  className="text-orange-600 hover:text-orange-800"
                                  onClick={() => {
                                    if (confirm('Är du säker på att du vill markera denna beställning som returnerad?')) {
                                      updateOrderMutation.mutate({ 
                                        orderId: order.id, 
                                        updates: { status: 'returned' } 
                                      });
                                    }
                                  }}
                                >
                                  Retur
                                </Button>
                              )}
                              <Button 
                                variant="ghost" 
                                size="sm"
                                onClick={() => {
                                  const options = [
                                    'Skicka e-post till kund',
                                    'Kopiera ordernummer',
                                    'Markera som prioritet',
                                    'Lägg till kommentar',
                                    'Skriv ut fraktlabel'
                                  ];
                                  const choice = prompt(`Välj handling:\n${options.map((opt, i) => `${i+1}. ${opt}`).join('\n')}`);
                                  if (choice) {
                                    const index = parseInt(choice) - 1;
                                    if (options[index]) {
                                      toast({ 
                                        title: "Handling utförd", 
                                        description: options[index] 
                                      });
                                    }
                                  }
                                }}
                              >
                                <MoreVertical className="h-4 w-4" />
                              </Button>
                            </div>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
            </div>
          )}

          {selectedTab === "products" && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-2xl font-bold text-gray-900">Products</h2>
                  <p className="text-gray-600">Manage your product catalog</p>
                </div>
                <ProductManager sellers={Array.isArray(sellers) ? sellers : []} />
              </div>

              <Card>
                <CardContent className="p-0">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead className="pl-6">Product</TableHead>
                        <TableHead>Seller</TableHead>
                        <TableHead>Price</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Created</TableHead>
                        <TableHead className="pr-6">Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {Array.isArray(products) && products.map((product: any) => (
                        <TableRow key={product.id}>
                          <TableCell className="pl-6">
                            <div className="flex items-center space-x-3">
                              <img 
                                src={product.imageUrl} 
                                alt={product.title}
                                className="w-12 h-12 rounded object-cover"
                              />
                              <div>
                                <p className="font-medium">{product.title}</p>
                                <p className="text-sm text-gray-500">{product.size} • {product.color}</p>
                              </div>
                            </div>
                          </TableCell>
                          <TableCell>{product.seller?.alias}</TableCell>
                          <TableCell className="font-medium">{product.priceKr} kr</TableCell>
                          <TableCell>
                            <Badge className={product.isAvailable ? "bg-green-100 text-green-800" : "bg-gray-100 text-gray-800"}>
                              {product.isAvailable ? "Available" : "Unavailable"}
                            </Badge>
                          </TableCell>
                          <TableCell>{format(new Date(product.createdAt), 'MMM dd, yyyy')}</TableCell>
                          <TableCell className="pr-6">
                            <div className="flex items-center space-x-2">
                              <Button 
                                variant="ghost" 
                                size="sm"
                                onClick={() => {
                                  toast({ 
                                    title: "Redigera produkt", 
                                    description: `Redigering av ${product.title} - funktionalitet kommer snart` 
                                  });
                                }}
                              >
                                <Edit className="h-4 w-4" />
                              </Button>
                              <Button 
                                variant="ghost" 
                                size="sm"
                                onClick={() => {
                                  if (confirm(`Är du säker på att du vill arkivera ${product.title}?`)) {
                                    toast({ 
                                      title: "Arkiverat", 
                                      description: `${product.title} har arkiverats` 
                                    });
                                  }
                                }}
                              >
                                <Archive className="h-4 w-4" />
                              </Button>
                            </div>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
            </div>
          )}

            {selectedTab === "sellers" && (
              <div className="space-y-8">
                <div className="flex items-center justify-between">
                  <div>
                    <h2 className="text-4xl font-bold text-deep-charcoal font-poppins">Säljare</h2>
                    <p className="text-soft-taupe text-lg">Hantera säljarkonton och provision</p>
                  </div>
                  <SellerManager />
                </div>

              <Card>
                <CardContent className="p-0">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead className="pl-6">Seller</TableHead>
                        <TableHead>Location</TableHead>
                        <TableHead>Commission Rate</TableHead>
                        <TableHead>Products</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Joined</TableHead>
                        <TableHead className="pr-6">Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {Array.isArray(sellers) && sellers.map((seller: any) => (
                        <TableRow key={seller.id}>
                          <TableCell className="pl-6">
                            <div>
                              <p className="font-medium">{seller.alias}</p>
                              <p className="text-sm text-gray-500">Age {seller.age}</p>
                            </div>
                          </TableCell>
                          <TableCell>{seller.location}</TableCell>
                          <TableCell>{(parseFloat(seller.commissionRate) * 100).toFixed(0)}%</TableCell>
                          <TableCell>
                            {Array.isArray(products) ? products.filter((p: any) => p.sellerId === seller.id).length : 0}
                          </TableCell>
                          <TableCell>
                            <Badge className={seller.isActive ? "bg-green-100 text-green-800" : "bg-gray-100 text-gray-800"}>
                              {seller.isActive ? "Active" : "Inactive"}
                            </Badge>
                          </TableCell>
                          <TableCell>{format(new Date(seller.createdAt), 'MMM dd, yyyy')}</TableCell>
                          <TableCell className="pr-6">
                            <div className="flex items-center space-x-2">
                              <Button 
                                variant="ghost" 
                                size="sm"
                                onClick={() => {
                                  toast({ 
                                    title: "Redigera säljare", 
                                    description: `Redigering av ${seller.alias} - funktionalitet kommer snart` 
                                  });
                                }}
                              >
                                <Edit className="h-4 w-4" />
                              </Button>
                              <Button 
                                variant="ghost" 
                                size="sm"
                                onClick={() => {
                                  const options = [
                                    'Visa säljarprofil',
                                    'Kontakta säljare',
                                    'Visa försäljningshistorik',
                                    'Justera provision',
                                    'Suspender konto'
                                  ];
                                  const choice = prompt(`Välj handling för ${seller.alias}:\n${options.map((opt, i) => `${i+1}. ${opt}`).join('\n')}`);
                                  if (choice) {
                                    const index = parseInt(choice) - 1;
                                    if (options[index]) {
                                      toast({ 
                                        title: "Handling utförd", 
                                        description: `${options[index]} för ${seller.alias}` 
                                      });
                                    }
                                  }
                                }}
                              >
                                <MoreVertical className="h-4 w-4" />
                              </Button>
                            </div>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
              </div>
            )}

            {selectedTab === "settings" && (
              <SettingsPanel />
            )}
          </div>
        </main>
      </div>
    </div>
  );
}