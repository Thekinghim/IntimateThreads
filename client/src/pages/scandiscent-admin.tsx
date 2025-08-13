// Professional admin panel for Scandiscent with clean Nordic design
import { useState, useEffect, useRef } from "react";
import { 
  Users, Package, ShoppingCart, BarChart3, Settings, Menu, X, ChevronDown, ChevronRight,
  Search, Plus, Filter, Edit2, Trash2, Eye, Copy, MoreHorizontal, CreditCard,
  FileText, Image, Calendar, Bell, Mail, DollarSign, ArrowUpRight, ArrowDownRight,
  TrendingUp, TrendingDown, ExternalLink, ArrowLeft, CheckCircle, AlertCircle,
  Clock, RefreshCw, Truck, Star, Activity, LogOut
} from "lucide-react";
import { 
  Dialog, DialogContent, DialogTitle, DialogTrigger, DialogHeader, DialogFooter
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import { useAdminAuth } from "@/hooks/useAdminAuth";
import type { Order, Product, Seller, SelectOrder, SelectProduct, SelectSeller } from "@shared/schema";
import { OrderDetailsModal } from "../components/OrderDetailsModal";

// Mock data for initial testing
const orderStatuses = ["all", "pending", "processing", "shipped", "delivered", "cancelled"];

// Statistics data
const statsData = [
  { label: "Total Orders", value: "1,347", change: "+12%", trending: "up" },
  { label: "Revenue", value: "47,832 SEK", change: "+8%", trending: "up" },
  { label: "Active Sellers", value: "23", change: "+3", trending: "up" },
  { label: "Conversion Rate", value: "3.2%", change: "-0.1%", trending: "down" }
];

// Navigation items
const navigationItems = [
  { id: "orders", label: "Orders", icon: ShoppingCart },
  { id: "products", label: "Products", icon: Package },
  { id: "customers", label: "Sellers", icon: Users },
  { id: "analytics", label: "Analytics", icon: BarChart3 },
  { id: "discounts", label: "Discounts", icon: CreditCard },
  { id: "content", label: "Content", icon: FileText }
];

export default function ScanDiscentAdmin() {
  const { isAuthenticated, isLoading, adminUser, logout, getAuthHeader } = useAdminAuth();
  const [selectedTab, setSelectedTab] = useState("orders");
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isCreateProductOpen, setIsCreateProductOpen] = useState(false);
  const [isCreateCustomerOpen, setIsCreateCustomerOpen] = useState(false);
  const [isCreateContentOpen, setIsCreateContentOpen] = useState(false);
  const [showLiveView, setShowLiveView] = useState(false);
  const [selectedItem, setSelectedItem] = useState<any>(null);
  const [isOrderModalOpen, setIsOrderModalOpen] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState<SelectOrder | null>(null);
  const { toast } = useToast();
  const queryClient = useQueryClient();

  // Redirect to login if not authenticated
  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      window.location.href = '/admin/login';
    }
  }, [isAuthenticated, isLoading]);

  // Custom query function with auth headers
  const authenticatedQuery = async ({ queryKey }: { queryKey: readonly unknown[] }) => {
    const authHeaders = getAuthHeader();
    const response = await fetch(queryKey.join("/"), {
      headers: {
        ...authHeaders,
        'Content-Type': 'application/json',
      },
    });
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    return response.json();
  };

  // Fetch data with authentication
  const { data: orders = [] } = useQuery<SelectOrder[]>({
    queryKey: ["/api/admin/orders"],
    queryFn: authenticatedQuery,
    enabled: selectedTab === "orders" && isAuthenticated
  });

  const { data: products = [] } = useQuery<SelectProduct[]>({
    queryKey: ["/api/products"],
    enabled: selectedTab === "products" && isAuthenticated
  });

  const { data: sellers = [] } = useQuery<SelectSeller[]>({
    queryKey: ["/api/sellers"],
    enabled: selectedTab === "customers" && isAuthenticated
  });

  const { data: promoCodes = [] } = useQuery<any[]>({
    queryKey: ["/api/admin/promo-codes"],
    queryFn: authenticatedQuery,
    enabled: selectedTab === "discounts" && isAuthenticated
  });

  const openOrderModal = (order: SelectOrder) => {
    setSelectedOrder(order);
    setIsOrderModalOpen(true);
  };

  const closeOrderModal = () => {
    setSelectedOrder(null);
    setIsOrderModalOpen(false);
  };

  // Handle edit item
  const handleEdit = (item: any, type: string) => {
    setSelectedItem({ ...item, type });
    setIsEditModalOpen(true);
  };

  const handleLogout = async () => {
    try {
      await logout();
    } catch (error) {
      toast({
        title: "Logout failed",
        description: "Please try again",
        variant: "destructive"
      });
    }
  };

  // Add the mutations for creating/updating content
  const createProductMutation = useMutation({
    mutationFn: async (productData: any) => {
      const authHeaders = getAuthHeader();
      const response = await fetch('/api/admin/products', {
        method: 'POST',
        headers: {
          ...authHeaders,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(productData),
      });
      if (!response.ok) throw new Error('Failed to create product');
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/products'] });
      setIsCreateProductOpen(false);
      toast({ title: "Produkt skapad", description: "Ny produkt har lagts till." });
    },
  });

  const createSellerMutation = useMutation({
    mutationFn: async (sellerData: any) => {
      const authHeaders = getAuthHeader();
      const response = await fetch('/api/admin/sellers', {
        method: 'POST',
        headers: {
          ...authHeaders,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(sellerData),
      });
      if (!response.ok) throw new Error('Failed to create seller');
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/sellers'] });
      setIsCreateCustomerOpen(false);
      toast({ title: "Säljare skapad", description: "Ny säljare har lagts till." });
    },
  });

  const createPromoCodeMutation = useMutation({
    mutationFn: async (promoData: any) => {
      const authHeaders = getAuthHeader();
      const response = await fetch('/api/admin/promo-codes', {
        method: 'POST',
        headers: {
          ...authHeaders,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(promoData),
      });
      if (!response.ok) throw new Error('Failed to create promo code');
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/admin/promo-codes'] });
      toast({ title: "Rabattkod skapad", description: "Ny rabattkod har skapats." });
    },
  });

  // If still loading, show loading state
  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Laddar admin panel...</p>
        </div>
      </div>
    );
  }

  // If not authenticated, don't render anything (redirect will happen)
  if (!isAuthenticated) {
    return null;
  }

  // Content renderer
  const renderContent = () => {
    if (selectedTab === "orders") {
      return (
        <div className="p-3 md:p-6 bg-white">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-4 gap-3">
            <h1 className="text-lg md:text-xl font-semibold text-gray-900">Orders</h1>
            <div className="flex items-center gap-2">
              <Button
                onClick={() => setIsFilterOpen(true)}
                className="bg-[#005bd3] hover:bg-[#004fc4] text-white h-8 px-3 text-sm rounded"
              >
                <Filter className="h-4 w-4 mr-1.5" />
                Filter
              </Button>
              <Button className="bg-[#005bd3] hover:bg-[#004fc4] text-white h-8 px-3 text-sm rounded">
                Export
              </Button>
            </div>
          </div>

          {/* Orders Table */}
          <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead className="bg-gray-50 border-b border-gray-200">
                  <tr>
                    <th className="text-left py-3 px-4 font-medium text-gray-700">Order</th>
                    <th className="text-left py-3 px-4 font-medium text-gray-700">Date</th>
                    <th className="text-left py-3 px-4 font-medium text-gray-700">Customer</th>
                    <th className="text-left py-3 px-4 font-medium text-gray-700">Payment status</th>
                    <th className="text-left py-3 px-4 font-medium text-gray-700">Total</th>
                    <th className="text-left py-3 px-4 font-medium text-gray-700">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {orders.map((order) => (
                    <tr key={order.id} className="hover:bg-gray-50">
                      <td className="py-3 px-4">
                        <button 
                          onClick={() => openOrderModal(order)}
                          className="text-blue-600 hover:text-blue-800 font-medium"
                        >
                          #{order.id.slice(0, 8)}
                        </button>
                      </td>
                      <td className="py-3 px-4 text-gray-600">
                        {order.createdAt ? new Date(order.createdAt).toLocaleDateString('sv-SE') : 'N/A'}
                      </td>
                      <td className="py-3 px-4 text-gray-900">{order.customerEmail}</td>
                      <td className="py-3 px-4">
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                          order.paymentStatus === 'completed' ? 'bg-green-100 text-green-800' :
                          order.paymentStatus === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                          order.paymentStatus === 'failed' ? 'bg-red-100 text-red-800' :
                          'bg-gray-100 text-gray-800'
                        }`}>
                          {order.paymentStatus === 'completed' ? 'Paid' :
                           order.paymentStatus === 'pending' ? 'Pending' :
                           order.paymentStatus === 'failed' ? 'Failed' : order.paymentStatus}
                        </span>
                      </td>
                      <td className="py-3 px-4 font-medium text-gray-900">{order.totalAmountKr} SEK</td>
                      <td className="py-3 px-4">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleEdit(order, 'order')}
                          className="bg-[#005bd3] text-[#ffffff] hover:bg-[#004fc4] h-7 w-7 p-0"
                        >
                          <Edit2 className="h-3 w-3" />
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      );
    }

    if (selectedTab === "products") {
      return (
        <div className="p-3 md:p-6 bg-white">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-4 gap-3">
            <h1 className="text-lg md:text-xl font-semibold text-gray-900">Products</h1>
            <Button
              onClick={() => setIsCreateProductOpen(true)}
              className="bg-[#005bd3] hover:bg-[#004fc4] text-white h-8 px-3 text-sm rounded w-full sm:w-auto"
            >
              <Plus className="h-4 w-4 mr-1.5" />
              Add product
            </Button>
          </div>

          {/* Products Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {products.map((product) => (
              <div key={product.id} className="bg-white border border-gray-200 rounded-lg overflow-hidden hover:shadow-md transition-shadow">
                <div className="aspect-square bg-gray-100 flex items-center justify-center">
                  <Package className="h-12 w-12 text-gray-400" />
                </div>
                <div className="p-3">
                  <h3 className="font-medium text-gray-900 truncate">{product.title}</h3>
                  <p className="text-sm text-gray-600 mt-1">{product.priceKr} SEK</p>
                  <div className="flex justify-between items-center mt-3">
                    <span className="text-xs text-gray-500">Active</span>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleEdit(product, 'product')}
                      className="bg-[#005bd3] text-[#ffffff] hover:bg-[#004fc4] h-7 w-7 p-0"
                    >
                      <Edit2 className="h-3 w-3" />
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      );
    }

    if (selectedTab === "customers") {
      return (
        <div className="p-3 md:p-6 bg-white">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-4 gap-3">
            <h1 className="text-lg md:text-xl font-semibold text-gray-900">Sellers</h1>
            <Button
              onClick={() => setIsCreateCustomerOpen(true)}
              className="bg-[#005bd3] hover:bg-[#004fc4] text-white h-8 px-3 text-sm rounded w-full sm:w-auto"
            >
              <Plus className="h-4 w-4 mr-1.5" />
              Add seller
            </Button>
          </div>

          {/* Sellers Table */}
          <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead className="bg-gray-50 border-b border-gray-200">
                  <tr>
                    <th className="text-left py-3 px-4 font-medium text-gray-700">Seller</th>
                    <th className="text-left py-3 px-4 font-medium text-gray-700">Age</th>
                    <th className="text-left py-3 px-4 font-medium text-gray-700">Location</th>
                    <th className="text-left py-3 px-4 font-medium text-gray-700">Commission</th>
                    <th className="text-left py-3 px-4 font-medium text-gray-700">Status</th>
                    <th className="text-left py-3 px-4 font-medium text-gray-700">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {sellers.map((seller) => (
                    <tr key={seller.id} className="hover:bg-gray-50">
                      <td className="py-3 px-4">
                        <div className="flex items-center">
                          <div className="h-8 w-8 bg-gray-200 rounded-full flex items-center justify-center mr-3">
                            <Users className="h-4 w-4 text-gray-600" />
                          </div>
                          <div>
                            <div className="font-medium text-gray-900">{seller.alias}</div>
                            <div className="text-xs text-gray-500">#{seller.id.slice(0, 8)}</div>
                          </div>
                        </div>
                      </td>
                      <td className="py-3 px-4 text-gray-600">{seller.age}</td>
                      <td className="py-3 px-4 text-gray-600">{seller.location}</td>
                      <td className="py-3 px-4 text-gray-600">{seller.commissionRate}%</td>
                      <td className="py-3 px-4">
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                          Active
                        </span>
                      </td>
                      <td className="py-3 px-4">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleEdit(seller, 'seller')}
                          className="bg-[#005bd3] text-[#ffffff] hover:bg-[#004fc4] h-7 w-7 p-0"
                        >
                          <Edit2 className="h-3 w-3" />
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      );
    }

    if (selectedTab === "discounts") {
      return (
        <div className="p-3 md:p-6 bg-white">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-4 gap-3">
            <h1 className="text-lg md:text-xl font-semibold text-gray-900">Discount codes</h1>
            <Button 
              onClick={() => setIsCreateContentOpen(true)}
              className="bg-[#005bd3] hover:bg-[#004fc4] text-white h-8 px-3 text-sm rounded w-full sm:w-auto"
            >
              <Plus className="h-4 w-4 mr-1.5" />
              Create discount code
            </Button>
          </div>

          {/* Discount Codes Table */}
          <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead className="bg-gray-50 border-b border-gray-200">
                  <tr>
                    <th className="text-left py-3 px-4 font-medium text-gray-700">Code</th>
                    <th className="text-left py-3 px-4 font-medium text-gray-700">Discount</th>
                    <th className="text-left py-3 px-4 font-medium text-gray-700">Used</th>
                    <th className="text-left py-3 px-4 font-medium text-gray-700">Status</th>
                    <th className="text-left py-3 px-4 font-medium text-gray-700">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {promoCodes.map((code: any) => (
                    <tr key={code.id} className="hover:bg-gray-50">
                      <td className="py-3 px-4">
                        <div className="font-medium text-gray-900">{code.code}</div>
                        <div className="text-xs text-gray-500">
                          {code.type === 'percentage' ? `${code.value}% off` : `${code.value} SEK off`}
                        </div>
                      </td>
                      <td className="py-3 px-4 text-gray-600">
                        {code.type === 'percentage' ? `${code.value}%` : `${code.value} SEK`}
                      </td>
                      <td className="py-3 px-4 text-gray-600">{code.usageCount || 0}</td>
                      <td className="py-3 px-4">
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                          Active
                        </span>
                      </td>
                      <td className="py-3 px-4">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleEdit(code, 'discount')}
                          className="bg-[#005bd3] text-[#ffffff] hover:bg-[#004fc4] h-7 w-7 p-0"
                        >
                          <Edit2 className="h-3 w-3" />
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      );
    }

    if (selectedTab === "content") {
      return (
        <div className="p-3 md:p-6 bg-white">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-4 gap-3">
            <h1 className="text-lg md:text-xl font-semibold text-gray-900">Content</h1>
            <Button
              onClick={() => setIsCreateContentOpen(true)}
              className="bg-[#005bd3] hover:bg-[#004fc4] text-white h-8 px-3 text-sm rounded w-full sm:w-auto"
            >
              <Plus className="h-4 w-4 mr-1.5" />
              Create content
            </Button>
          </div>

          {/* Content Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            {/* Sample content items */}
            {[
              { id: 1, title: "How to Choose the Right Size", type: "Blog Post", status: "Published", views: "1,234" },
              { id: 2, title: "Privacy & Discretion", type: "Page", status: "Published", views: "2,156" },
              { id: 3, title: "Return Policy", type: "Page", status: "Draft", views: "0" }
            ].map((item) => (
              <div key={item.id} className="bg-white border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <h3 className="font-medium text-gray-900">{item.title}</h3>
                    <p className="text-sm text-gray-600">{item.type}</p>
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleEdit(item, 'content')}
                    className="bg-[#005bd3] text-[#ffffff] hover:bg-[#004fc4] h-7 w-7 p-0"
                  >
                    <Edit2 className="h-3 w-3" />
                  </Button>
                </div>
                <div className="flex justify-between items-center text-xs text-gray-500">
                  <span className={`px-2 py-1 rounded ${
                    item.status === 'Published' ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'
                  }`}>
                    {item.status}
                  </span>
                  <span>{item.views} views</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      );
    }

    if (selectedTab === "analytics") {
      return (
        <div className="p-3 md:p-6 bg-white">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-4 gap-3">
            <h1 className="text-lg md:text-xl font-semibold text-gray-900">Analytics</h1>
            <Button
              onClick={() => setShowLiveView(true)}
              className="bg-[#005bd3] hover:bg-[#004fc4] text-white h-8 px-3 text-sm rounded w-full sm:w-auto"
            >
              Live View
            </Button>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
            {statsData.map((stat, index) => (
              <div key={index} className="bg-white border border-gray-200 rounded-lg p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600">{stat.label}</p>
                    <p className="text-2xl font-semibold text-gray-900 mt-1">{stat.value}</p>
                  </div>
                  <div className={`flex items-center text-sm ${
                    stat.trending === 'up' ? 'text-green-600' : 'text-red-600'
                  }`}>
                    {stat.trending === 'up' ? <TrendingUp className="h-4 w-4 mr-1" /> : <TrendingDown className="h-4 w-4 mr-1" />}
                    {stat.change}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Charts would go here */}
          <div className="bg-white border border-gray-200 rounded-lg p-6">
            <h3 className="text-lg font-medium text-gray-900 mb-4">Revenue Overview</h3>
            <div className="h-64 bg-gray-50 rounded flex items-center justify-center">
              <p className="text-gray-500">Chart placeholder</p>
            </div>
          </div>
        </div>
      );
    }

    if (selectedTab === "settings") {
      return (
        <div className="p-3 md:p-6 bg-white">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-4 gap-3">
            <h1 className="text-lg md:text-xl font-semibold text-gray-900">Settings</h1>
          </div>

          <div className="max-w-2xl space-y-6">
            {/* Account Settings */}
            <div className="bg-white border border-gray-200 rounded-lg">
              <div className="p-4 border-b border-gray-200">
                <h3 className="text-sm font-medium text-gray-900">Account Settings</h3>
              </div>
              <div className="p-4 space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Admin Email</label>
                  <input 
                    type="email" 
                    className="w-full px-3 py-2 border border-gray-300 rounded text-sm focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                    defaultValue="admin@scandiscent.se"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Store Name</label>
                  <input 
                    type="text" 
                    className="w-full px-3 py-2 border border-gray-300 rounded text-sm focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                    defaultValue="Scandiscent"
                  />
                </div>
              </div>
            </div>

            {/* Security */}
            <div className="bg-white border border-gray-200 rounded-lg">
              <div className="p-4 border-b border-gray-200">
                <h3 className="text-sm font-medium text-gray-900">Security</h3>
              </div>
              <div className="p-4 space-y-4">
                <Button 
                  variant="outline"
                  className="bg-[#005bd3] text-[#ffffff] hover:bg-[#004fc4]"
                >
                  Change Password
                </Button>
                <Button 
                  variant="outline" 
                  onClick={handleLogout}
                  className="bg-[#005bd3] text-[#ffffff] hover:bg-[#004fc4] ml-3"
                >
                  Logout
                </Button>
              </div>
            </div>
          </div>
        </div>
      );
    }

    return null;
  };

  return (
    <div className="min-h-screen bg-[#f6f6f7]">
      {/* Mobile Header */}
      <header className="md:hidden bg-white border-b border-gray-200 px-4 py-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsMobileSidebarOpen(true)}
              className="mr-3 p-1"
            >
              <Menu className="h-5 w-5" />
            </Button>
            <h1 className="text-lg font-semibold text-gray-900">Scandiscent Admin</h1>
          </div>
        </div>
      </header>

      <div className="flex h-screen md:h-auto">
        {/* Mobile Sidebar Overlay */}
        {isMobileSidebarOpen && (
          <div 
            className="fixed inset-0 bg-black bg-opacity-50 z-50 md:hidden"
            onClick={() => setIsMobileSidebarOpen(false)}
          />
        )}

        {/* Sidebar */}
        <aside className={`
          fixed md:static inset-y-0 left-0 z-50 w-64 bg-[#f8f9fa] border-r border-gray-200 transition-transform duration-300 ease-in-out
          ${isMobileSidebarOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}
        `}>
          {/* Sidebar Header */}
          <div className="flex items-center justify-between h-16 px-4 border-b border-gray-200">
            <div className="flex items-center">
              <div className="h-8 w-8 bg-[#005bd3] rounded flex items-center justify-center mr-3">
                <span className="text-white font-bold text-sm">S</span>
              </div>
              <span className="font-semibold text-gray-900">Scandiscent</span>
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsMobileSidebarOpen(false)}
              className="md:hidden p-1"
            >
              <X className="h-4 w-4" />
            </Button>
          </div>

          {/* Navigation */}
          <nav className="flex flex-col h-full px-2 py-4 relative">
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

      {/* Filter Modal */}
      <Dialog open={isFilterOpen} onOpenChange={setIsFilterOpen}>
        <DialogContent className="max-w-2xl max-h-[95vh] overflow-y-auto p-0 w-[95vw] md:w-full">
          {/* Header */}
          <div className="bg-white border-b border-gray-200 px-3 md:px-6 py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 md:gap-4">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setIsFilterOpen(false)}
                  className="bg-[#005bd3] text-[#ffffff] hover:bg-[#004fc4] h-7 w-7 md:h-8 md:w-8 p-0"
                >
                  <ArrowLeft className="h-4 w-4 md:h-5 md:w-5" />
                </Button>
                <div>
                  <DialogTitle className="text-lg md:text-xl font-medium text-gray-900">Filtrera beställningar</DialogTitle>
                </div>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="p-3 md:p-6 bg-[#f6f6f7]">
            <div className="bg-white border border-gray-200 rounded-lg">
              <div className="p-3 md:p-4 border-b border-gray-200">
                <h3 className="text-sm font-medium text-gray-900">Filteralternativ</h3>
              </div>
              <div className="p-3 md:p-4 space-y-4">
                <div>
                  <label className="block text-xs font-medium text-gray-700 mb-1">Status</label>
                  <select className="w-full px-3 py-2 border border-gray-300 rounded text-sm focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500">
                    <option value="">Alla statusar</option>
                    <option value="pending">Väntande</option>
                    <option value="completed">Slutförd</option>
                    <option value="cancelled">Avbruten</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-medium text-gray-700 mb-1">Betalningsstatus</label>
                  <select className="w-full px-3 py-2 border border-gray-300 rounded text-sm focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500">
                    <option value="">Alla betalningsstatusar</option>
                    <option value="pending">Väntande</option>
                    <option value="completed">Betald</option>
                    <option value="failed">Misslyckad</option>
                  </select>
                </div>
              </div>
            </div>
          </div>

          {/* Footer with buttons */}
          <div className="bg-white border-t border-gray-200 px-3 md:px-6 py-4">
            <div className="flex justify-between">
              <Button 
                variant="outline"
                onClick={() => {
                  toast({ title: "Filter rensade", description: "Alla filter har återställts." });
                }}
                className="bg-[#005bd3] text-[#ffffff] hover:bg-[#004fc4]"
              >
                Rensa filter
              </Button>
              <Button 
                className="bg-[#005bd3] hover:bg-[#004fc4] text-white px-6"
                onClick={() => {
                  toast({ title: "Filter tillämpade", description: "Beställningarna har filtrerats." });
                  setIsFilterOpen(false);
                }}
              >
                Använd filter
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Edit Modal */}
      <Dialog open={isEditModalOpen} onOpenChange={setIsEditModalOpen}>
        <DialogContent className="max-w-6xl max-h-[95vh] overflow-y-auto p-0 w-[95vw] md:w-full">
          <div className="bg-white border-b border-gray-200 px-3 md:px-6 py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 md:gap-4">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setIsEditModalOpen(false)}
                  className="bg-[#005bd3] text-[#ffffff] hover:bg-[#004fc4] h-7 w-7 md:h-8 md:w-8 p-0"
                >
                  <ArrowLeft className="h-4 w-4 md:h-5 md:w-5" />
                </Button>
                <div>
                  <DialogTitle className="text-lg md:text-xl font-medium text-gray-900">
                    Edit {selectedItem?.type || 'Item'}
                  </DialogTitle>
                </div>
              </div>
              <div className="flex items-center gap-2 md:gap-3">
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="h-7 md:h-8 px-2 md:px-3 text-xs md:text-sm bg-[#005bd3] text-[#ffffff] hover:bg-[#004fc4] rounded"
                >
                  Duplicate
                </Button>
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="h-7 md:h-8 px-2 md:px-3 text-xs md:text-sm bg-[#005bd3] text-[#ffffff] hover:bg-[#004fc4] rounded"
                >
                  View
                </Button>
              </div>
            </div>
          </div>
          <div className="p-6">
            <p className="text-gray-600">Edit functionality would be implemented here for {selectedItem?.type}</p>
          </div>
        </DialogContent>
      </Dialog>

      {/* Create Product Modal */}
      <Dialog open={isCreateProductOpen} onOpenChange={setIsCreateProductOpen}>
        <DialogContent className="max-w-7xl max-h-[95vh] overflow-y-auto p-0 w-[95vw] md:w-full">
          <div className="bg-white border-b border-gray-200 px-3 md:px-6 py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 md:gap-4">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setIsCreateProductOpen(false)}
                  className="bg-[#005bd3] text-[#ffffff] hover:bg-[#004fc4] h-7 w-7 md:h-8 md:w-8 p-0"
                >
                  <ArrowLeft className="h-4 w-4 md:h-5 md:w-5" />
                </Button>
                <div>
                  <DialogTitle className="text-lg md:text-xl font-medium text-gray-900">Create Product</DialogTitle>
                </div>
              </div>
            </div>
          </div>
          <div className="p-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Produkttitel</label>
                  <Input 
                    placeholder="Ange produkttitel"
                    className="w-full"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Beskrivning</label>
                  <Textarea 
                    placeholder="Beskriv produkten..."
                    className="w-full h-24"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Pris (SEK)</label>
                  <Input 
                    type="number"
                    placeholder="2999"
                    className="w-full"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Säljare</label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Välj säljare" />
                    </SelectTrigger>
                    <SelectContent>
                      {sellers.map((seller) => (
                        <SelectItem key={seller.id} value={seller.id}>
                          {seller.alias}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Kategori</label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Välj kategori" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="used_panties">Använda trosor</SelectItem>
                      <SelectItem value="bras">BH</SelectItem>
                      <SelectItem value="lingerie">Underkläder</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
                  <Select defaultValue="active">
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="active">Aktiv</SelectItem>
                      <SelectItem value="draft">Utkast</SelectItem>
                      <SelectItem value="archived">Arkiverad</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Storlek</label>
                  <Input 
                    placeholder="S, M, L, etc."
                    className="w-full"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Färg</label>
                  <Input 
                    placeholder="Svart, vit, röd, etc."
                    className="w-full"
                  />
                </div>
              </div>
            </div>
            <div className="flex justify-end gap-3 mt-6 pt-6 border-t">
              <Button 
                variant="outline"
                onClick={() => setIsCreateProductOpen(false)}
              >
                Avbryt
              </Button>
              <Button 
                className="bg-[#005bd3] hover:bg-[#004fc4] text-white px-6"
                onClick={() => {
                  toast({ title: "Produkt skapad", description: "Den nya produkten har lagts till." });
                  setIsCreateProductOpen(false);
                }}
              >
                Spara produkt
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Create Customer Modal */}
      <Dialog open={isCreateCustomerOpen} onOpenChange={setIsCreateCustomerOpen}>
        <DialogContent className="max-w-6xl max-h-[95vh] overflow-y-auto p-0 w-[95vw] md:w-full">
          <div className="bg-white border-b border-gray-200 px-3 md:px-6 py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 md:gap-4">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setIsCreateCustomerOpen(false)}
                  className="bg-[#005bd3] text-[#ffffff] hover:bg-[#004fc4] h-7 w-7 md:h-8 md:w-8 p-0"
                >
                  <ArrowLeft className="h-4 w-4 md:h-5 md:w-5" />
                </Button>
                <div>
                  <DialogTitle className="text-lg md:text-xl font-medium text-gray-900">Lägg till ny säljare</DialogTitle>
                </div>
              </div>
            </div>
          </div>
          <div className="p-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Alias</label>
                  <Input 
                    placeholder="Emma"
                    className="w-full"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Ålder</label>
                  <Input 
                    type="number"
                    placeholder="25"
                    className="w-full"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Plats</label>
                  <Input 
                    placeholder="Stockholm"
                    className="w-full"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Provision (%)</label>
                  <Input 
                    type="number"
                    placeholder="45"
                    className="w-full"
                  />
                </div>
              </div>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Bio</label>
                  <Textarea 
                    placeholder="Kort beskrivning om säljaren..."
                    className="w-full h-32"
                  />
                </div>
                <div className="flex items-center space-x-2">
                  <Switch defaultChecked />
                  <span className="text-sm text-gray-700">Aktiv säljare</span>
                </div>
              </div>
            </div>
            <div className="flex justify-end gap-3 mt-6 pt-6 border-t">
              <Button 
                variant="outline"
                onClick={() => setIsCreateCustomerOpen(false)}
              >
                Avbryt
              </Button>
              <Button 
                className="bg-[#005bd3] hover:bg-[#004fc4] text-white px-6"
                onClick={() => {
                  toast({ title: "Säljare skapad", description: "Ny säljare har lagts till." });
                  setIsCreateCustomerOpen(false);
                }}
              >
                Spara säljare
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Create Content Modal */}
      <Dialog open={isCreateContentOpen} onOpenChange={setIsCreateContentOpen}>
        <DialogContent className="max-w-6xl max-h-[95vh] overflow-y-auto p-0 w-[95vw] md:w-full">
          <div className="bg-white border-b border-gray-200 px-3 md:px-6 py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 md:gap-4">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setIsCreateContentOpen(false)}
                  className="bg-[#005bd3] text-[#ffffff] hover:bg-[#004fc4] h-7 w-7 md:h-8 md:w-8 p-0"
                >
                  <ArrowLeft className="h-4 w-4 md:h-5 md:w-5" />
                </Button>
                <div>
                  <DialogTitle className="text-lg md:text-xl font-medium text-gray-900">Skapa nytt innehåll</DialogTitle>
                </div>
              </div>
            </div>
          </div>
          <div className="p-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Rabattkod</label>
                  <Input 
                    placeholder="SUMMER20"
                    className="w-full"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Typ</label>
                  <Select defaultValue="fixed">
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="fixed">Fast belopp (SEK)</SelectItem>
                      <SelectItem value="percentage">Procent (%)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Värde</label>
                  <Input 
                    type="number"
                    placeholder="100"
                    className="w-full"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Max användningar</label>
                  <Input 
                    type="number"
                    placeholder="100"
                    className="w-full"
                  />
                </div>
              </div>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Beskrivning</label>
                  <Textarea 
                    placeholder="Beskrivning av rabattkoden..."
                    className="w-full h-24"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Giltig från</label>
                  <Input 
                    type="date"
                    className="w-full"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Giltig till</label>
                  <Input 
                    type="date"
                    className="w-full"
                  />
                </div>
                <div className="flex items-center space-x-2">
                  <Switch defaultChecked />
                  <span className="text-sm text-gray-700">Aktiv rabattkod</span>
                </div>
              </div>
            </div>
            <div className="flex justify-end gap-3 mt-6 pt-6 border-t">
              <Button 
                variant="outline"
                onClick={() => setIsCreateContentOpen(false)}
              >
                Avbryt
              </Button>
              <Button 
                className="bg-[#005bd3] hover:bg-[#004fc4] text-white px-6"
                onClick={() => {
                  toast({ title: "Rabattkod skapad", description: "Ny rabattkod har skapats." });
                  setIsCreateContentOpen(false);
                }}
              >
                Spara rabattkod
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}