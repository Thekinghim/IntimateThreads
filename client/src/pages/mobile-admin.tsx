import { useState } from "react";
import { useQuery, useMutation } from "@tanstack/react-query";
import { useAdminAuth } from "@/hooks/useAdminAuth";
import { queryClient } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  ShoppingBag, 
  Users, 
  DollarSign,
  Package,
  Settings,
  LogOut,
  Bell,
  Plus,
  Eye,
  Edit,
  Truck,
  Clock,
  CheckCircle,
  XCircle,
  RefreshCw,
  Menu,
  X
} from "lucide-react";
import ProductManager from "@/components/admin/product-manager";
import OrderStatusManager from "@/components/admin/order-status-manager";
import SellerManager from "@/components/admin/seller-manager";
import { format } from "date-fns";

export default function MobileAdmin() {
  const { isAuthenticated, isLoading: authLoading, adminUser, logout, getAuthHeader } = useAdminAuth();
  const { toast } = useToast();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [selectedTab, setSelectedTab] = useState("overview");

  // Queries with authentication
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

  // Update order mutation
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

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'pending': return <Clock className="h-4 w-4" />;
      case 'shipped': return <Truck className="h-4 w-4" />;
      case 'completed': return <CheckCircle className="h-4 w-4" />;
      case 'cancelled': return <XCircle className="h-4 w-4" />;
      default: return <Clock className="h-4 w-4" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'confirmed': return 'bg-blue-100 text-blue-800';
      case 'shipped': return 'bg-purple-100 text-purple-800';
      case 'completed': return 'bg-green-100 text-green-800';
      case 'cancelled': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Mobile Header */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
        <div className="px-4 py-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setSidebarOpen(!sidebarOpen)}
                className="p-2"
              >
                {sidebarOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
              </Button>
              <div className="flex items-center space-x-2">
                <Settings className="h-5 w-5 text-gray-700" />
                <h1 className="text-lg font-bold text-gray-900">Admin Panel</h1>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <Badge className="bg-green-100 text-green-700 text-xs">Live</Badge>
              <Badge className="bg-blue-100 text-blue-700 text-xs">Online</Badge>
              <Button variant="ghost" size="sm" className="relative p-2">
                <Bell className="h-5 w-5 text-gray-600" />
                <span className="absolute -top-1 -right-1 h-3 w-3 bg-red-500 rounded-full flex items-center justify-center text-white text-xs">3</span>
              </Button>
              <Button variant="ghost" size="sm" onClick={logout} className="p-2">
                <LogOut className="h-5 w-5 text-gray-600" />
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Sidebar */}
      {sidebarOpen && (
        <div className="fixed inset-0 z-40 bg-black bg-opacity-50" onClick={() => setSidebarOpen(false)}>
          <aside className="fixed left-0 top-0 h-full w-80 max-w-[85vw] bg-white shadow-lg z-50 overflow-y-auto" onClick={(e) => e.stopPropagation()}>
            <div className="p-4">
              <div className="mb-6 flex items-center justify-between">
                <div>
                  <h2 className="text-lg font-semibold text-gray-900 mb-1">Nordic Collection</h2>
                  <p className="text-xs text-gray-500">Admin Dashboard</p>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setSidebarOpen(false)}
                  className="p-1"
                >
                  <X className="h-5 w-5" />
                </Button>
              </div>

              {/* Stats Overview */}
              <div className="grid grid-cols-2 gap-3 mb-6">
                <div className="bg-blue-50 rounded-lg p-3">
                  <div className="flex flex-col items-center">
                    <ShoppingBag className="h-5 w-5 text-blue-600 mb-1" />
                    <p className="text-xl font-bold text-gray-900">{stats.totalOrders}</p>
                    <p className="text-xs text-gray-500">Orders</p>
                  </div>
                </div>
                <div className="bg-green-50 rounded-lg p-3">
                  <div className="flex flex-col items-center">
                    <DollarSign className="h-5 w-5 text-green-600 mb-1" />
                    <p className="text-xl font-bold text-gray-900">{Math.round(stats.totalRevenue)}</p>
                    <p className="text-xs text-gray-500">Revenue</p>
                  </div>
                </div>
              </div>

              {/* Navigation */}
              <nav className="space-y-2">
                <Button
                  variant={selectedTab === "overview" ? "default" : "ghost"}
                  className="w-full flex items-center justify-start"
                  onClick={() => {
                    setSelectedTab("overview");
                    setSidebarOpen(false);
                  }}
                >
                  <Package className="h-4 w-4 mr-3 flex-shrink-0" />
                  <span className="flex-1 text-left">Overview</span>
                </Button>
                <Button
                  variant={selectedTab === "orders" ? "default" : "ghost"}
                  className="w-full flex items-center justify-start"
                  onClick={() => {
                    setSelectedTab("orders");
                    setSidebarOpen(false);
                  }}
                >
                  <ShoppingBag className="h-4 w-4 mr-3 flex-shrink-0" />
                  <span className="flex-1 text-left">Orders</span>
                  <Badge className="bg-red-100 text-red-700 text-xs px-2 flex-shrink-0">{stats.pendingOrders}</Badge>
                </Button>
                <Button
                  variant={selectedTab === "products" ? "default" : "ghost"}
                  className="w-full flex items-center justify-start"
                  onClick={() => {
                    setSelectedTab("products");
                    setSidebarOpen(false);
                  }}
                >
                  <Package className="h-4 w-4 mr-3 flex-shrink-0" />
                  <span className="flex-1 text-left">Products</span>
                  <Badge className="text-xs px-2 flex-shrink-0">{stats.totalProducts}</Badge>
                </Button>
                <Button
                  variant={selectedTab === "sellers" ? "default" : "ghost"}
                  className="w-full flex items-center justify-start"
                  onClick={() => {
                    setSelectedTab("sellers");
                    setSidebarOpen(false);
                  }}
                >
                  <Users className="h-4 w-4 mr-3 flex-shrink-0" />
                  <span className="flex-1 text-left">Sellers</span>
                  <Badge className="text-xs px-2 flex-shrink-0">{stats.activeSellers}</Badge>
                </Button>
                <Button
                  variant={selectedTab === "settings" ? "default" : "ghost"}
                  className="w-full flex items-center justify-start"
                  onClick={() => {
                    setSelectedTab("settings");
                    setSidebarOpen(false);
                  }}
                >
                  <Settings className="h-4 w-4 mr-3 flex-shrink-0" />
                  <span className="flex-1 text-left">Settings</span>
                </Button>
              </nav>

              {/* Quick Actions */}
              <div className="mt-6 p-3 bg-gray-50 rounded-lg">
                <h3 className="text-sm font-semibold text-gray-700 mb-2">Quick Actions</h3>
                <div className="space-y-1">
                  <Button variant="ghost" size="sm" className="w-full justify-start text-xs">
                    <Clock className="h-3 w-3 mr-2" />
                    Recent Activity
                  </Button>
                  <Button variant="ghost" size="sm" className="w-full justify-start text-xs">
                    <RefreshCw className="h-3 w-3 mr-2" />
                    Refresh Data
                  </Button>
                </div>
              </div>
            </div>
          </aside>
        </div>
      )}

      {/* Main Content */}
      <main className="p-4">
        {selectedTab === "overview" && (
          <div className="space-y-4">
            <div>
              <h2 className="text-xl font-bold text-gray-900 mb-1">Dashboard Overview</h2>
              <p className="text-sm text-gray-500">Monitor your store performance</p>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-2 gap-3">
              <Card>
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-xs text-gray-500">Total Revenue</p>
                      <p className="text-lg font-bold">{stats.totalRevenue.toFixed(0)} kr</p>
                    </div>
                    <DollarSign className="h-5 w-5 text-green-600" />
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-xs text-gray-500">Total Orders</p>
                      <p className="text-lg font-bold">{stats.totalOrders}</p>
                    </div>
                    <ShoppingBag className="h-5 w-5 text-blue-600" />
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-xs text-gray-500">Products</p>
                      <p className="text-lg font-bold">{stats.totalProducts}</p>
                    </div>
                    <Package className="h-5 w-5 text-purple-600" />
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-xs text-gray-500">Active Sellers</p>
                      <p className="text-lg font-bold">{stats.activeSellers}</p>
                    </div>
                    <Users className="h-5 w-5 text-orange-600" />
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Recent Orders */}
            <Card>
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-base">Recent Orders</CardTitle>
                  <Badge className="text-xs">{orders?.length || 0} total</Badge>
                </div>
              </CardHeader>
              <CardContent className="p-0">
                <div className="divide-y divide-gray-100">
                  {orders?.slice(0, 5).map((order: any) => (
                    <div key={order.id} className="p-3">
                      <div className="flex items-center justify-between">
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium text-gray-900 truncate">#{order.id.slice(0, 8)}</p>
                          <p className="text-xs text-gray-500 truncate">{order.customerEmail}</p>
                        </div>
                        <div className="flex items-center space-x-1 ml-2 flex-shrink-0">
                          <Badge className={`text-xs ${getStatusColor(order.status)}`}>
                            {order.status}
                          </Badge>
                          <Button variant="ghost" size="sm" className="p-1">
                            <Eye className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                {orders?.length > 5 && (
                  <div className="p-3 border-t">
                    <Button 
                      variant="ghost" 
                      className="w-full text-sm"
                      onClick={() => setSelectedTab("orders")}
                    >
                      View all orders
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        )}

        {selectedTab === "orders" && (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-xl font-bold text-gray-900">Orders</h2>
                <p className="text-sm text-gray-500">Manage customer orders</p>
              </div>
              <Button size="sm" className="text-xs">
                <RefreshCw className="h-3 w-3 mr-1" />
                Refresh
              </Button>
            </div>

            {/* Orders List */}
            <div className="space-y-3">
              {orders?.map((order: any) => (
                <Card key={order.id}>
                  <CardContent className="p-4">
                    <div className="flex items-start justify-between mb-2">
                      <div>
                        <p className="text-sm font-medium">Order #{order.id.slice(0, 8)}</p>
                        <p className="text-xs text-gray-500">{format(new Date(order.createdAt), 'MMM dd, yyyy')}</p>
                      </div>
                      <Badge className={`text-xs ${getStatusColor(order.status)}`}>
                        {getStatusIcon(order.status)}
                        <span className="ml-1">{order.status}</span>
                      </Badge>
                    </div>
                    <div className="space-y-1 text-xs">
                      <p><span className="text-gray-500">Customer:</span> {order.customerEmail}</p>
                      <p><span className="text-gray-500">Amount:</span> {order.totalAmountKr} kr</p>
                      <p><span className="text-gray-500">Payment:</span> {order.paymentMethod}</p>
                    </div>
                    <div className="flex items-center space-x-2 mt-3">
                      <OrderStatusManager 
                        order={order} 
                        onUpdate={(updates) => updateOrderMutation.mutate({ orderId: order.id, updates })}
                      />
                      <Button variant="outline" size="sm" className="text-xs">
                        <Eye className="h-3 w-3 mr-1" />
                        View
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )}

        {selectedTab === "products" && (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-xl font-bold text-gray-900">Products</h2>
                <p className="text-sm text-gray-500">Manage your product catalog</p>
              </div>
              <ProductManager sellers={sellers || []} />
            </div>

            {/* Products List */}
            <div className="space-y-3">
              {products?.map((product: any) => (
                <Card key={product.id}>
                  <CardContent className="p-4">
                    <div className="flex items-start space-x-3">
                      {product.imageUrl && (
                        <img 
                          src={product.imageUrl} 
                          alt={product.title}
                          className="w-16 h-16 rounded-lg object-cover"
                        />
                      )}
                      <div className="flex-1">
                        <div className="flex items-start justify-between">
                          <div>
                            <p className="text-sm font-medium">{product.title}</p>
                            <p className="text-xs text-gray-500">
                              {product.size} • {product.color}
                            </p>
                            <p className="text-xs text-gray-500 mt-1">
                              Seller: {sellers?.find((s: any) => s.id === product.sellerId)?.name || 'Unknown'}
                            </p>
                          </div>
                          <div className="text-right">
                            <p className="text-sm font-bold">{product.priceKr} kr</p>
                            <Badge className={`text-xs ${product.isAvailable ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                              {product.isAvailable ? 'Available' : 'Sold'}
                            </Badge>
                          </div>
                        </div>
                        <div className="flex items-center space-x-2 mt-2">
                          <ProductManager 
                            sellers={sellers || []} 
                            product={product} 
                            isEdit={true} 
                          />
                          <Button variant="outline" size="sm" className="text-xs">
                            <Eye className="h-3 w-3 mr-1" />
                            View
                          </Button>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )}

        {selectedTab === "sellers" && (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-xl font-bold text-gray-900">Sellers</h2>
                <p className="text-sm text-gray-500">Manage seller accounts</p>
              </div>
              <SellerManager />
            </div>

            {/* Sellers List */}
            <div className="space-y-3">
              {sellers?.map((seller: any) => (
                <Card key={seller.id}>
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium">{seller.name}</p>
                        <p className="text-xs text-gray-500">{seller.city}</p>
                        <p className="text-xs text-gray-500 mt-1">
                          {products?.filter((p: any) => p.sellerId === seller.id).length || 0} products
                        </p>
                      </div>
                      <div className="text-right">
                        <Badge className={`text-xs ${seller.isActive ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-700'}`}>
                          {seller.isActive ? 'Active' : 'Inactive'}
                        </Badge>
                        <div className="mt-2">
                          <SellerManager seller={seller} isEdit={true} />
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )}

        {selectedTab === "settings" && (
          <div className="space-y-4">
            <div>
              <h2 className="text-xl font-bold text-gray-900">Settings</h2>
              <p className="text-sm text-gray-500">System configuration</p>
            </div>

            <Card>
              <CardHeader>
                <CardTitle className="text-base">Admin Account</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div>
                  <p className="text-sm text-gray-500">Username</p>
                  <p className="text-sm font-medium">{adminUser?.name || 'Admin'}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Role</p>
                  <p className="text-sm font-medium">Super Administrator</p>
                </div>
                <Button variant="outline" className="w-full" onClick={logout}>
                  <LogOut className="h-4 w-4 mr-2" />
                  Sign Out
                </Button>
              </CardContent>
            </Card>
          </div>
        )}
      </main>
    </div>
  );
}