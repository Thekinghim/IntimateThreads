import { useState } from "react";
import { useQuery, useMutation } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Skeleton } from "@/components/ui/skeleton";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { insertProductSchema, insertSellerSchema } from "@shared/schema";
import { type OrderWithDetails, type ProductWithSeller, type Seller, type Product } from "@shared/schema";
import { apiRequest, queryClient } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import { 
  Package, 
  Users, 
  CreditCard, 
  TrendingUp, 
  Eye, 
  Edit, 
  Plus,
  Bitcoin,
  CheckCircle,
  XCircle,
  Clock,
  Truck
} from "lucide-react";
import { z } from "zod";

const newProductSchema = insertProductSchema.extend({
  priceKr: z.string().min(1, "Pris krävs"),
});

const newSellerSchema = insertSellerSchema.extend({
  commissionRate: z.string().optional(),
});

type NewProductForm = z.infer<typeof newProductSchema>;
type NewSellerForm = z.infer<typeof newSellerSchema>;

export default function Admin() {
  const [selectedOrder, setSelectedOrder] = useState<OrderWithDetails | null>(null);
  const [orderStatusFilter, setOrderStatusFilter] = useState<string>("all");
  const [paymentStatusFilter, setPaymentStatusFilter] = useState<string>("all");
  const [showAddProduct, setShowAddProduct] = useState(false);
  const [showAddSeller, setShowAddSeller] = useState(false);
  const { toast } = useToast();

  // Queries
  const { data: orders, isLoading: ordersLoading } = useQuery<OrderWithDetails[]>({
    queryKey: ['/api/admin/orders'],
  });

  const { data: products, isLoading: productsLoading } = useQuery<ProductWithSeller[]>({
    queryKey: ['/api/products'],
  });

  const { data: sellers, isLoading: sellersLoading } = useQuery<Seller[]>({
    queryKey: ['/api/sellers'],
  });

  // Mutations
  const updateOrderMutation = useMutation({
    mutationFn: async ({ orderId, updates }: { orderId: string; updates: any }) => {
      const response = await apiRequest('PATCH', `/api/orders/${orderId}`, updates);
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/admin/orders'] });
      toast({
        title: "Order uppdaterad",
        description: "Orderstatusen har uppdaterats framgångsrikt.",
      });
    },
  });

  const createProductMutation = useMutation({
    mutationFn: async (productData: any) => {
      const response = await apiRequest('POST', '/api/admin/products', productData);
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/products'] });
      setShowAddProduct(false);
      toast({
        title: "Produkt skapad",
        description: "Ny produkt har lagts till i kollektionen.",
      });
    },
  });

  // Forms
  const productForm = useForm<NewProductForm>({
    resolver: zodResolver(newProductSchema),
    defaultValues: {
      sellerId: "",
      title: "",
      description: "",
      size: "",
      color: "",
      material: "",
      priceKr: "",
      imageUrl: "",
      isAvailable: true,
      wearDays: 0,
    },
  });

  const sellerForm = useForm<NewSellerForm>({
    resolver: zodResolver(newSellerSchema),
    defaultValues: {
      alias: "",
      location: "",
      age: 18,
      bio: "",
      commissionRate: "0.45",
      isActive: true,
    },
  });

  // Filter orders
  const filteredOrders = orders?.filter(order => {
    const matchesOrderStatus = orderStatusFilter === "all" || order.status === orderStatusFilter;
    const matchesPaymentStatus = paymentStatusFilter === "all" || order.paymentStatus === paymentStatusFilter;
    return matchesOrderStatus && matchesPaymentStatus;
  }) || [];

  // Calculate statistics
  const stats = {
    totalOrders: orders?.length || 0,
    pendingOrders: orders?.filter(o => o.status === "pending").length || 0,
    completedOrders: orders?.filter(o => o.status === "completed").length || 0,
    totalRevenue: orders?.reduce((sum, order) => sum + parseFloat(order.totalAmountKr), 0) || 0,
    totalCommission: orders?.reduce((sum, order) => sum + parseFloat(order.commissionKr), 0) || 0,
    cryptoPayments: orders?.filter(o => o.paymentMethod === "crypto").length || 0,
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "pending":
        return <Badge variant="secondary"><Clock className="h-3 w-3 mr-1" />Väntande</Badge>;
      case "confirmed":
        return <Badge className="bg-blue-100 text-blue-800"><CheckCircle className="h-3 w-3 mr-1" />Bekräftad</Badge>;
      case "shipped":
        return <Badge className="bg-purple-100 text-purple-800"><Truck className="h-3 w-3 mr-1" />Skickad</Badge>;
      case "completed":
        return <Badge className="bg-green-100 text-green-800"><CheckCircle className="h-3 w-3 mr-1" />Slutförd</Badge>;
      case "cancelled":
        return <Badge variant="destructive"><XCircle className="h-3 w-3 mr-1" />Avbruten</Badge>;
      default:
        return <Badge variant="secondary">{status}</Badge>;
    }
  };

  const getPaymentStatusBadge = (status: string) => {
    switch (status) {
      case "pending":
        return <Badge variant="secondary">Väntande</Badge>;
      case "completed":
        return <Badge className="bg-green-100 text-green-800">Slutförd</Badge>;
      case "failed":
        return <Badge variant="destructive">Misslyckad</Badge>;
      case "expired":
        return <Badge className="bg-orange-100 text-orange-800">Förfallen</Badge>;
      default:
        return <Badge variant="secondary">{status}</Badge>;
    }
  };

  const onProductSubmit = (data: NewProductForm) => {
    createProductMutation.mutate({
      ...data,
      priceKr: data.priceKr,
      wearDays: data.wearDays || undefined,
    });
  };

  return (
    <div className="min-h-screen bg-soft-white py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="font-poppins font-medium text-3xl text-charcoal mb-4">Admin Panel</h1>
          <p className="text-gray-600">Hantera beställningar, produkter och säljare</p>
        </div>

        {/* Statistics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Totala Beställningar</p>
                  <p className="text-2xl font-bold text-charcoal">{stats.totalOrders}</p>
                </div>
                <Package className="h-8 w-8 text-powder-pink" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Väntande</p>
                  <p className="text-2xl font-bold text-charcoal">{stats.pendingOrders}</p>
                </div>
                <Clock className="h-8 w-8 text-orange-500" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Total Omsättning</p>
                  <p className="text-2xl font-bold text-charcoal">{stats.totalRevenue.toLocaleString('sv-SE')} kr</p>
                </div>
                <TrendingUp className="h-8 w-8 text-green-500" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Krypto Betalningar</p>
                  <p className="text-2xl font-bold text-charcoal">{stats.cryptoPayments}</p>
                </div>
                <Bitcoin className="h-8 w-8 text-orange-500" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Content */}
        <Tabs defaultValue="orders" className="space-y-6">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="orders">Beställningar</TabsTrigger>
            <TabsTrigger value="products">Produkter</TabsTrigger>
            <TabsTrigger value="sellers">Säljare</TabsTrigger>
          </TabsList>

          {/* Orders Tab */}
          <TabsContent value="orders">
            <Card>
              <CardHeader>
                <div className="flex justify-between items-center">
                  <CardTitle>Beställningar</CardTitle>
                  <div className="flex space-x-2">
                    <Select value={orderStatusFilter} onValueChange={setOrderStatusFilter}>
                      <SelectTrigger className="w-[180px]">
                        <SelectValue placeholder="Filtrera status" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">Alla statusar</SelectItem>
                        <SelectItem value="pending">Väntande</SelectItem>
                        <SelectItem value="confirmed">Bekräftad</SelectItem>
                        <SelectItem value="shipped">Skickad</SelectItem>
                        <SelectItem value="completed">Slutförd</SelectItem>
                        <SelectItem value="cancelled">Avbruten</SelectItem>
                      </SelectContent>
                    </Select>
                    <Select value={paymentStatusFilter} onValueChange={setPaymentStatusFilter}>
                      <SelectTrigger className="w-[180px]">
                        <SelectValue placeholder="Betalningsstatus" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">Alla betalningar</SelectItem>
                        <SelectItem value="pending">Väntande</SelectItem>
                        <SelectItem value="completed">Slutförd</SelectItem>
                        <SelectItem value="failed">Misslyckad</SelectItem>
                        <SelectItem value="expired">Förfallen</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                {ordersLoading ? (
                  <div className="space-y-4">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Skeleton key={i} className="h-16 w-full" />
                    ))}
                  </div>
                ) : (
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Order ID</TableHead>
                        <TableHead>Produkt</TableHead>
                        <TableHead>Kund</TableHead>
                        <TableHead>Belopp</TableHead>
                        <TableHead>Betalningsmetod</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Betalning</TableHead>
                        <TableHead>Åtgärder</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {filteredOrders.map((order) => (
                        <TableRow key={order.id}>
                          <TableCell className="font-mono text-sm">{order.id.slice(0, 8)}...</TableCell>
                          <TableCell>
                            <div>
                              <p className="font-medium">{order.product.title}</p>
                              <p className="text-sm text-gray-500">{order.seller.alias}</p>
                            </div>
                          </TableCell>
                          <TableCell>
                            <div>
                              <p className="font-medium">{order.customerName || 'Anonym'}</p>
                              <p className="text-sm text-gray-500">{order.customerEmail}</p>
                            </div>
                          </TableCell>
                          <TableCell className="font-semibold">
                            {parseFloat(order.totalAmountKr).toLocaleString('sv-SE')} kr
                          </TableCell>
                          <TableCell>
                            <div className="flex items-center space-x-1">
                              {order.paymentMethod === 'crypto' && <Bitcoin className="h-4 w-4 text-orange-500" />}
                              {order.paymentMethod === 'revolut' && <CreditCard className="h-4 w-4 text-blue-500" />}
                              <span className="capitalize">{order.paymentMethod}</span>
                            </div>
                          </TableCell>
                          <TableCell>{getStatusBadge(order.status || "pending")}</TableCell>
                          <TableCell>{getPaymentStatusBadge(order.paymentStatus || "pending")}</TableCell>
                          <TableCell>
                            <div className="flex space-x-2">
                              <Dialog>
                                <DialogTrigger asChild>
                                  <Button 
                                    variant="outline" 
                                    size="sm"
                                    onClick={() => setSelectedOrder(order)}
                                  >
                                    <Eye className="h-4 w-4" />
                                  </Button>
                                </DialogTrigger>
                                <DialogContent className="max-w-2xl">
                                  <DialogHeader>
                                    <DialogTitle>Orderdetaljer</DialogTitle>
                                  </DialogHeader>
                                  {selectedOrder && (
                                    <div className="space-y-6">
                                      <div className="grid grid-cols-2 gap-4">
                                        <div>
                                          <Label className="text-sm font-medium">Order ID</Label>
                                          <p className="font-mono text-sm">{selectedOrder.id}</p>
                                        </div>
                                        <div>
                                          <Label className="text-sm font-medium">Skapad</Label>
                                          <p className="text-sm">{selectedOrder.createdAt ? new Date(selectedOrder.createdAt).toLocaleString('sv-SE') : 'N/A'}</p>
                                        </div>
                                      </div>

                                      <div className="grid grid-cols-2 gap-4">
                                        <div>
                                          <Label className="text-sm font-medium">Nuvarande Status</Label>
                                          <div className="mt-1">{getStatusBadge(selectedOrder.status || "pending")}</div>
                                        </div>
                                        <div>
                                          <Label className="text-sm font-medium">Uppdatera Status</Label>
                                          <Select 
                                            value={selectedOrder.status || "pending"}
                                            onValueChange={(newStatus) => {
                                              updateOrderMutation.mutate({
                                                orderId: selectedOrder.id,
                                                updates: { status: newStatus }
                                              });
                                              setSelectedOrder({ ...selectedOrder, status: newStatus });
                                            }}
                                          >
                                            <SelectTrigger className="mt-1">
                                              <SelectValue />
                                            </SelectTrigger>
                                            <SelectContent>
                                              <SelectItem value="pending">Väntande</SelectItem>
                                              <SelectItem value="confirmed">Bekräftad</SelectItem>
                                              <SelectItem value="shipped">Skickad</SelectItem>
                                              <SelectItem value="completed">Slutförd</SelectItem>
                                              <SelectItem value="cancelled">Avbruten</SelectItem>
                                            </SelectContent>
                                          </Select>
                                        </div>
                                      </div>

                                      <div>
                                        <Label className="text-sm font-medium">Leveransadress</Label>
                                        <p className="text-sm mt-1 bg-gray-50 p-3 rounded">{selectedOrder.shippingAddress}</p>
                                      </div>

                                      {selectedOrder.cryptoCurrency && (
                                        <div className="bg-orange-50 p-4 rounded-lg">
                                          <h4 className="font-medium mb-2">Krypto Betalningsdetaljer</h4>
                                          <div className="grid grid-cols-2 gap-2 text-sm">
                                            <div>
                                              <span className="text-gray-600">Valuta:</span>
                                              <span className="ml-2 font-mono">{selectedOrder.cryptoCurrency?.toUpperCase()}</span>
                                            </div>
                                            <div>
                                              <span className="text-gray-600">Belopp:</span>
                                              <span className="ml-2 font-mono">{selectedOrder.cryptoAmount}</span>
                                            </div>
                                            <div className="col-span-2">
                                              <span className="text-gray-600">Adress:</span>
                                              <p className="font-mono text-xs bg-white p-2 rounded mt-1 break-all">
                                                {selectedOrder.paymentAddress}
                                              </p>
                                            </div>
                                          </div>
                                        </div>
                                      )}

                                      <div className="grid grid-cols-2 gap-4 text-sm">
                                        <div>
                                          <span className="text-gray-600">Total belopp:</span>
                                          <span className="ml-2 font-semibold">{parseFloat(selectedOrder.totalAmountKr).toLocaleString('sv-SE')} kr</span>
                                        </div>
                                        <div>
                                          <span className="text-gray-600">Kommission:</span>
                                          <span className="ml-2 font-semibold">{parseFloat(selectedOrder.commissionKr).toLocaleString('sv-SE')} kr</span>
                                        </div>
                                      </div>
                                    </div>
                                  )}
                                </DialogContent>
                              </Dialog>
                            </div>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          {/* Products Tab */}
          <TabsContent value="products">
            <Card>
              <CardHeader>
                <div className="flex justify-between items-center">
                  <CardTitle>Produkter</CardTitle>
                  <Dialog open={showAddProduct} onOpenChange={setShowAddProduct}>
                    <DialogTrigger asChild>
                      <Button className="bg-charcoal text-white hover:bg-gray-800">
                        <Plus className="h-4 w-4 mr-2" />
                        Lägg till produkt
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="max-w-2xl">
                      <DialogHeader>
                        <DialogTitle>Skapa ny produkt</DialogTitle>
                      </DialogHeader>
                      <Form {...productForm}>
                        <form onSubmit={productForm.handleSubmit(onProductSubmit)} className="space-y-4">
                          <FormField
                            control={productForm.control}
                            name="sellerId"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Säljare</FormLabel>
                                <Select onValueChange={field.onChange} defaultValue={field.value}>
                                  <FormControl>
                                    <SelectTrigger>
                                      <SelectValue placeholder="Välj säljare" />
                                    </SelectTrigger>
                                  </FormControl>
                                  <SelectContent>
                                    {sellers?.map((seller) => (
                                      <SelectItem key={seller.id} value={seller.id}>
                                        {seller.alias} - {seller.location}
                                      </SelectItem>
                                    ))}
                                  </SelectContent>
                                </Select>
                                <FormMessage />
                              </FormItem>
                            )}
                          />

                          <div className="grid grid-cols-2 gap-4">
                            <FormField
                              control={productForm.control}
                              name="title"
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel>Titel</FormLabel>
                                  <FormControl>
                                    <Input placeholder="T.ex. Svart spets" {...field} />
                                  </FormControl>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />

                            <FormField
                              control={productForm.control}
                              name="priceKr"
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel>Pris (kr)</FormLabel>
                                  <FormControl>
                                    <Input type="number" placeholder="499" {...field} />
                                  </FormControl>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />
                          </div>

                          <FormField
                            control={productForm.control}
                            name="description"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Beskrivning</FormLabel>
                                <FormControl>
                                  <Textarea placeholder="Detaljerad beskrivning av produkten" {...field} />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />

                          <div className="grid grid-cols-3 gap-4">
                            <FormField
                              control={productForm.control}
                              name="size"
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel>Storlek</FormLabel>
                                  <FormControl>
                                    <Input placeholder="S" {...field} />
                                  </FormControl>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />

                            <FormField
                              control={productForm.control}
                              name="color"
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel>Färg</FormLabel>
                                  <FormControl>
                                    <Input placeholder="Svart" {...field} />
                                  </FormControl>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />

                            <FormField
                              control={productForm.control}
                              name="material"
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel>Material</FormLabel>
                                  <FormControl>
                                    <Input placeholder="Spets" {...field} />
                                  </FormControl>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />
                          </div>

                          <div className="grid grid-cols-2 gap-4">
                            <FormField
                              control={productForm.control}
                              name="imageUrl"
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel>Bild URL</FormLabel>
                                  <FormControl>
                                    <Input placeholder="https://..." {...field} value={field.value || ""} />
                                  </FormControl>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />

                            <FormField
                              control={productForm.control}
                              name="wearDays"
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel>Antal bärdagar</FormLabel>
                                  <FormControl>
                                    <Input type="number" placeholder="3" {...field} value={field.value || ""} onChange={(e) => field.onChange(parseInt(e.target.value) || 0)} />
                                  </FormControl>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />
                          </div>

                          <div className="flex justify-end space-x-2">
                            <Button type="button" variant="outline" onClick={() => setShowAddProduct(false)}>
                              Avbryt
                            </Button>
                            <Button type="submit" disabled={createProductMutation.isPending}>
                              {createProductMutation.isPending ? "Skapar..." : "Skapa produkt"}
                            </Button>
                          </div>
                        </form>
                      </Form>
                    </DialogContent>
                  </Dialog>
                </div>
              </CardHeader>
              <CardContent>
                {productsLoading ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {Array.from({ length: 6 }).map((_, i) => (
                      <Skeleton key={i} className="h-48 w-full" />
                    ))}
                  </div>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {products?.map((product) => (
                      <Card key={product.id} className="overflow-hidden">
                        <img
                          src={product.imageUrl || "https://images.unsplash.com/photo-1566479179817-c0df35d84ff3?w=300"}
                          alt={product.title}
                          className="w-full h-32 object-cover"
                        />
                        <CardContent className="p-4">
                          <div className="flex justify-between items-start mb-2">
                            <h3 className="font-medium text-charcoal">{product.title}</h3>
                            <Badge variant={product.isAvailable ? "default" : "secondary"}>
                              {product.isAvailable ? "Tillgänglig" : "Slutsåld"}
                            </Badge>
                          </div>
                          <p className="text-sm text-gray-600 mb-2">{product.seller.alias}</p>
                          <p className="font-semibold text-charcoal">
                            {parseFloat(product.priceKr).toLocaleString('sv-SE')} kr
                          </p>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          {/* Sellers Tab */}
          <TabsContent value="sellers">
            <Card>
              <CardHeader>
                <div className="flex justify-between items-center">
                  <CardTitle>Säljare</CardTitle>
                  <Dialog open={showAddSeller} onOpenChange={setShowAddSeller}>
                    <DialogTrigger asChild>
                      <Button className="bg-charcoal text-white hover:bg-gray-800">
                        <Plus className="h-4 w-4 mr-2" />
                        Lägg till säljare
                      </Button>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>Lägg till ny säljare</DialogTitle>
                      </DialogHeader>
                      <Form {...sellerForm}>
                        <form onSubmit={sellerForm.handleSubmit((data) => {
                          // Note: This would need to be implemented in the backend
                          toast({
                            title: "Funktion inte implementerad",
                            description: "Lägg till säljare funktionen behöver implementeras i backend.",
                          });
                        })} className="space-y-4">
                          <div className="grid grid-cols-2 gap-4">
                            <FormField
                              control={sellerForm.control}
                              name="alias"
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel>Alias</FormLabel>
                                  <FormControl>
                                    <Input placeholder="Emma" {...field} />
                                  </FormControl>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />

                            <FormField
                              control={sellerForm.control}
                              name="location"
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel>Plats</FormLabel>
                                  <FormControl>
                                    <Input placeholder="Stockholm" {...field} />
                                  </FormControl>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />
                          </div>

                          <FormField
                            control={sellerForm.control}
                            name="age"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Ålder</FormLabel>
                                <FormControl>
                                  <Input type="number" placeholder="25" {...field} onChange={(e) => field.onChange(parseInt(e.target.value) || 18)} />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />

                          <FormField
                            control={sellerForm.control}
                            name="bio"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Biografi</FormLabel>
                                <FormControl>
                                  <Textarea placeholder="Kort beskrivning..." {...field} value={field.value || ""} />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />

                          <div className="flex justify-end space-x-2">
                            <Button type="button" variant="outline" onClick={() => setShowAddSeller(false)}>
                              Avbryt
                            </Button>
                            <Button type="submit">
                              Lägg till säljare
                            </Button>
                          </div>
                        </form>
                      </Form>
                    </DialogContent>
                  </Dialog>
                </div>
              </CardHeader>
              <CardContent>
                {sellersLoading ? (
                  <div className="space-y-4">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Skeleton key={i} className="h-20 w-full" />
                    ))}
                  </div>
                ) : (
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Alias</TableHead>
                        <TableHead>Plats</TableHead>
                        <TableHead>Ålder</TableHead>
                        <TableHead>Kommission</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Produkter</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {sellers?.map((seller) => {
                        const sellerProducts = products?.filter(p => p.sellerId === seller.id).length || 0;
                        return (
                          <TableRow key={seller.id}>
                            <TableCell className="font-medium">{seller.alias}</TableCell>
                            <TableCell>{seller.location}</TableCell>
                            <TableCell>{seller.age} år</TableCell>
                            <TableCell>{(parseFloat(seller.commissionRate || "0.45") * 100).toFixed(0)}%</TableCell>
                            <TableCell>
                              <Badge variant={seller.isActive ? "default" : "secondary"}>
                                {seller.isActive ? "Aktiv" : "Inaktiv"}
                              </Badge>
                            </TableCell>
                            <TableCell>{sellerProducts} produkter</TableCell>
                          </TableRow>
                        );
                      })}
                    </TableBody>
                  </Table>
                )}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
