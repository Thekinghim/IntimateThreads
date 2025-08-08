import { useState, useEffect } from "react";
import { useQuery, useMutation } from "@tanstack/react-query";
import { useAdminAuth } from "@/hooks/useAdminAuth";
import { queryClient } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  ShoppingBag, 
  Users, 
  DollarSign,
  Package,
  Settings,
  LogOut,
  Bell,
  Eye,
  Truck,
  Clock,
  CheckCircle,
  XCircle,
  RefreshCw,
  Menu,
  X,
  ChevronRight,
  Home
} from "lucide-react";
import ProductManager from "@/components/admin/product-manager";
import OrderStatusManager from "@/components/admin/order-status-manager";
import SellerManager from "@/components/admin/seller-manager";
import { format } from "date-fns";

export default function MobileAdminV2() {
  const { isAuthenticated, isLoading: authLoading, adminUser, logout, getAuthHeader } = useAdminAuth();
  const { toast } = useToast();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [selectedTab, setSelectedTab] = useState("overview");

  // Close sidebar on window resize
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 768) {
        setSidebarOpen(false);
      }
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

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
      case 'pending': return <Clock className="h-3 w-3" />;
      case 'shipped': return <Truck className="h-3 w-3" />;
      case 'completed': return <CheckCircle className="h-3 w-3" />;
      case 'cancelled': return <XCircle className="h-3 w-3" />;
      default: return <Clock className="h-3 w-3" />;
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

  const navigationItems = [
    { id: 'overview', label: 'Overview', icon: Home, badge: null },
    { id: 'orders', label: 'Orders', icon: ShoppingBag, badge: stats.pendingOrders, badgeColor: 'bg-red-500 text-white' },
    { id: 'products', label: 'Products', icon: Package, badge: stats.totalProducts, badgeColor: 'bg-gray-500 text-white' },
    { id: 'sellers', label: 'Sellers', icon: Users, badge: stats.activeSellers, badgeColor: 'bg-gray-500 text-white' },
    { id: 'settings', label: 'Settings', icon: Settings, badge: null },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Fixed Mobile Header */}
      <header className="fixed top-0 left-0 right-0 bg-white border-b border-gray-200 z-30 h-14">
        <div className="flex items-center justify-between h-full px-4">
          <div className="flex items-center space-x-3">
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
            >
              {sidebarOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
            <h1 className="text-base font-semibold text-gray-900">Admin Panel</h1>
          </div>
          <div className="flex items-center space-x-2">
            <Badge variant="outline" className="text-xs bg-green-50 text-green-700 border-green-200">Live</Badge>
            <button className="relative p-2">
              <Bell className="h-5 w-5 text-gray-600" />
              <span className="absolute top-1 right-1 h-2 w-2 bg-red-500 rounded-full"></span>
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Sidebar Overlay */}
      {sidebarOpen && (
        <>
          {/* Backdrop */}
          <div 
            className="fixed inset-0 bg-black bg-opacity-50 z-40"
            onClick={() => setSidebarOpen(false)}
          />
          
          {/* Sidebar */}
          <aside className="fixed left-0 top-0 bottom-0 w-[280px] bg-white shadow-2xl z-50 flex flex-col">
            {/* Sidebar Header */}
            <div className="p-4 border-b border-gray-200">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h2 className="text-lg font-bold text-gray-900">Nordic Collection</h2>
                  <p className="text-xs text-gray-500">Admin Dashboard</p>
                </div>
                <button
                  onClick={() => setSidebarOpen(false)}
                  className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>

              {/* Stats Grid */}
              <div className="grid grid-cols-2 gap-2">
                <div className="bg-blue-50 rounded-lg p-2 text-center">
                  <ShoppingBag className="h-4 w-4 text-blue-600 mx-auto mb-1" />
                  <p className="text-lg font-bold text-gray-900">{stats.totalOrders}</p>
                  <p className="text-xs text-gray-500">Orders</p>
                </div>
                <div className="bg-green-50 rounded-lg p-2 text-center">
                  <DollarSign className="h-4 w-4 text-green-600 mx-auto mb-1" />
                  <p className="text-lg font-bold text-gray-900">{Math.round(stats.totalRevenue)}</p>
                  <p className="text-xs text-gray-500">Revenue</p>
                </div>
              </div>
            </div>

            {/* Navigation Items */}
            <nav className="flex-1 overflow-y-auto p-4">
              <div className="space-y-1">
                {navigationItems.map((item) => {
                  const Icon = item.icon;
                  const isActive = selectedTab === item.id;
                  return (
                    <button
                      key={item.id}
                      onClick={() => {
                        setSelectedTab(item.id);
                        setSidebarOpen(false);
                      }}
                      className={`
                        w-full flex items-center justify-between p-3 rounded-lg transition-all
                        ${isActive 
                          ? 'bg-gray-900 text-white' 
                          : 'hover:bg-gray-100 text-gray-700'
                        }
                      `}
                    >
                      <div className="flex items-center space-x-3">
                        <Icon className="h-4 w-4" />
                        <span className="text-sm font-medium">{item.label}</span>
                      </div>
                      {item.badge !== null && item.badge > 0 && (
                        <Badge className={`text-xs px-2 py-0.5 ${item.badgeColor || 'bg-gray-100 text-gray-700'}`}>
                          {item.badge}
                        </Badge>
                      )}
                    </button>
                  );
                })}
              </div>

              {/* Quick Actions */}
              <div className="mt-6 p-3 bg-gray-50 rounded-lg">
                <h3 className="text-xs font-semibold text-gray-600 uppercase tracking-wider mb-2">Quick Actions</h3>
                <div className="space-y-1">
                  <button className="w-full flex items-center space-x-2 p-2 text-xs text-gray-600 hover:bg-white rounded transition-colors">
                    <Clock className="h-3 w-3" />
                    <span>Recent Activity</span>
                  </button>
                  <button className="w-full flex items-center space-x-2 p-2 text-xs text-gray-600 hover:bg-white rounded transition-colors">
                    <RefreshCw className="h-3 w-3" />
                    <span>Refresh Data</span>
                  </button>
                </div>
              </div>
            </nav>

            {/* Sidebar Footer */}
            <div className="p-4 border-t border-gray-200">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center space-x-2">
                  <div className="h-8 w-8 bg-gray-200 rounded-full flex items-center justify-center">
                    <Users className="h-4 w-4 text-gray-600" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-900">{adminUser?.name || 'Admin'}</p>
                    <p className="text-xs text-gray-500">Administrator</p>
                  </div>
                </div>
              </div>
              <button
                onClick={logout}
                className="w-full flex items-center justify-center space-x-2 p-2 text-sm text-red-600 hover:bg-red-50 rounded-lg transition-colors"
              >
                <LogOut className="h-4 w-4" />
                <span>Sign Out</span>
              </button>
            </div>
          </aside>
        </>
      )}

      {/* Main Content Area with padding for fixed header */}
      <main className="pt-14 px-4 pb-4">
        <div className="py-4">
          {/* Overview Tab */}
          {selectedTab === "overview" && (
            <div className="space-y-4">
              <div>
                <h2 className="text-lg font-bold text-gray-900">Dashboard Overview</h2>
                <p className="text-sm text-gray-500">Monitor your store performance</p>
              </div>

              {/* Stats Grid - 2 columns on mobile */}
              <div className="grid grid-cols-2 gap-3">
                <Card className="p-3">
                  <div className="flex flex-col items-center text-center">
                    <DollarSign className="h-6 w-6 text-green-600 mb-1" />
                    <p className="text-xs text-gray-500">Revenue</p>
                    <p className="text-lg font-bold">{Math.round(stats.totalRevenue)} kr</p>
                  </div>
                </Card>
                <Card className="p-3">
                  <div className="flex flex-col items-center text-center">
                    <ShoppingBag className="h-6 w-6 text-blue-600 mb-1" />
                    <p className="text-xs text-gray-500">Orders</p>
                    <p className="text-lg font-bold">{stats.totalOrders}</p>
                  </div>
                </Card>
                <Card className="p-3">
                  <div className="flex flex-col items-center text-center">
                    <Package className="h-6 w-6 text-purple-600 mb-1" />
                    <p className="text-xs text-gray-500">Products</p>
                    <p className="text-lg font-bold">{stats.totalProducts}</p>
                  </div>
                </Card>
                <Card className="p-3">
                  <div className="flex flex-col items-center text-center">
                    <Users className="h-6 w-6 text-orange-600 mb-1" />
                    <p className="text-xs text-gray-500">Sellers</p>
                    <p className="text-lg font-bold">{stats.activeSellers}</p>
                  </div>
                </Card>
              </div>

              {/* Recent Orders */}
              <Card>
                <CardHeader className="pb-2">
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-base">Recent Orders</CardTitle>
                    <Badge variant="outline" className="text-xs">{orders.length} total</Badge>
                  </div>
                </CardHeader>
                <CardContent className="p-0">
                  {orders.slice(0, 5).map((order: any) => (
                    <div key={order.id} className="p-3 border-b last:border-0">
                      <div className="flex items-start justify-between gap-2">
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium truncate">#{order.id.slice(0, 8)}</p>
                          <p className="text-xs text-gray-500 truncate">{order.customerEmail}</p>
                        </div>
                        <div className="flex flex-col items-end gap-1">
                          <Badge className={`text-xs ${getStatusColor(order.status)}`}>
                            {getStatusIcon(order.status)}
                            <span className="ml-1">{order.status}</span>
                          </Badge>
                          <p className="text-xs font-medium">{order.totalAmountKr} kr</p>
                        </div>
                      </div>
                    </div>
                  ))}
                  {orders.length > 5 && (
                    <button 
                      onClick={() => setSelectedTab("orders")}
                      className="w-full p-3 text-sm text-blue-600 hover:bg-gray-50 transition-colors flex items-center justify-center space-x-1"
                    >
                      <span>View all orders</span>
                      <ChevronRight className="h-3 w-3" />
                    </button>
                  )}
                </CardContent>
              </Card>
            </div>
          )}

          {/* Orders Tab */}
          {selectedTab === "orders" && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-lg font-bold text-gray-900">Orders</h2>
                  <p className="text-sm text-gray-500">Manage customer orders</p>
                </div>
                <Button size="sm" variant="outline">
                  <RefreshCw className="h-3 w-3 mr-1" />
                  Refresh
                </Button>
              </div>

              <div className="space-y-3">
                {orders.map((order: any) => (
                  <Card key={order.id}>
                    <CardContent className="p-3">
                      <div className="space-y-2">
                        <div className="flex items-start justify-between">
                          <div>
                            <p className="text-sm font-medium">Order #{order.id.slice(0, 8)}</p>
                            <p className="text-xs text-gray-500">{format(new Date(order.createdAt), 'MMM dd, yyyy')}</p>
                          </div>
                          <Badge className={`text-xs ${getStatusColor(order.status)}`}>
                            {getStatusIcon(order.status)}
                            <span className="ml-1">{order.status}</span>
                          </Badge>
                        </div>
                        
                        <div className="text-xs space-y-1">
                          <p className="truncate"><span className="text-gray-500">Customer:</span> {order.customerEmail}</p>
                          <p><span className="text-gray-500">Amount:</span> {order.totalAmountKr} kr</p>
                          <p><span className="text-gray-500">Payment:</span> {order.paymentMethod}</p>
                        </div>

                        <div className="flex gap-2 pt-1">
                          <Button variant="outline" size="sm" className="text-xs">
                            <Eye className="h-3 w-3 mr-1" />
                            View
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          )}

          {/* Products Tab */}
          {selectedTab === "products" && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-lg font-bold text-gray-900">Products</h2>
                  <p className="text-sm text-gray-500">Manage your catalog</p>
                </div>
                <ProductManager sellers={sellers || []} />
              </div>

              <div className="space-y-3">
                {(products as any[]).map((product: any) => (
                  <Card key={product.id}>
                    <CardContent className="p-3">
                      <div className="flex gap-3">
                        {product.imageUrl && (
                          <img 
                            src={product.imageUrl} 
                            alt={product.title}
                            className="w-14 h-14 rounded-lg object-cover flex-shrink-0"
                          />
                        )}
                        <div className="flex-1 min-w-0">
                          <div className="flex items-start justify-between gap-2">
                            <div className="flex-1 min-w-0">
                              <p className="text-sm font-medium truncate">{product.title}</p>
                              <p className="text-xs text-gray-500">{product.size} • {product.color}</p>
                              <p className="text-xs text-gray-500 truncate">
                                Seller: {(sellers as any[]).find((s: any) => s.id === product.sellerId)?.name || 'Unknown'}
                              </p>
                            </div>
                            <div className="text-right flex-shrink-0">
                              <p className="text-sm font-bold">{product.priceKr} kr</p>
                              <Badge className={`text-xs ${product.isAvailable ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                                {product.isAvailable ? 'Available' : 'Sold'}
                              </Badge>
                            </div>
                          </div>
                          <div className="flex gap-2 mt-2">
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

          {/* Sellers Tab */}
          {selectedTab === "sellers" && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-lg font-bold text-gray-900">Sellers</h2>
                  <p className="text-sm text-gray-500">Manage seller accounts</p>
                </div>
                <SellerManager />
              </div>

              <div className="space-y-3">
                {(sellers as any[]).map((seller: any) => (
                  <Card key={seller.id}>
                    <CardContent className="p-3">
                      <div className="flex items-start justify-between">
                        <div>
                          <p className="text-sm font-medium">{seller.name}</p>
                          <p className="text-xs text-gray-500">{seller.city}</p>
                          <p className="text-xs text-gray-500 mt-1">
                            {(products as any[]).filter((p: any) => p.sellerId === seller.id).length} products
                          </p>
                        </div>
                        <div className="text-right">
                          <Badge className={`text-xs mb-2 ${seller.isActive ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-700'}`}>
                            {seller.isActive ? 'Active' : 'Inactive'}
                          </Badge>
                          <div>
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

          {/* Settings Tab */}
          {selectedTab === "settings" && (
            <div className="space-y-4">
              <div>
                <h2 className="text-lg font-bold text-gray-900">Settings</h2>
                <p className="text-sm text-gray-500">System configuration</p>
              </div>

              <Card>
                <CardHeader>
                  <CardTitle className="text-base">Admin Account</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div>
                    <p className="text-xs text-gray-500">Username</p>
                    <p className="text-sm font-medium">{adminUser?.name || 'Admin'}</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500">Role</p>
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
        </div>
      </main>
    </div>
  );
}