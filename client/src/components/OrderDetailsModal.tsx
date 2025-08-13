import { useState } from "react";
import { X, Package, CreditCard, Clock, CheckCircle, AlertCircle } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import type { SelectOrder } from "@shared/schema";

interface OrderDetailsModalProps {
  order: SelectOrder | null;
  isOpen: boolean;
  onClose: () => void;
}

export function OrderDetailsModal({ order, isOpen, onClose }: OrderDetailsModalProps) {
  const [selectedStatus, setSelectedStatus] = useState(order?.status || "pending");
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const updateOrderMutation = useMutation({
    mutationFn: async (newStatus: string) => {
      if (!order) return;
      return await apiRequest("PATCH", `/api/orders/${order.id}`, {
        status: newStatus
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/admin/orders"] });
      toast({
        title: "Order updated",
        description: "Order status has been updated successfully."
      });
    },
    onError: () => {
      toast({
        title: "Update failed",
        description: "Failed to update order status.",
        variant: "destructive"
      });
    }
  });

  const handleStatusUpdate = () => {
    if (selectedStatus !== order?.status) {
      updateOrderMutation.mutate(selectedStatus);
    }
  };

  if (!order) return null;

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "completed":
        return <CheckCircle className="h-4 w-4 text-green-600" />;
      case "cancelled":
        return <AlertCircle className="h-4 w-4 text-red-600" />;
      case "pending":
        return <Clock className="h-4 w-4 text-yellow-600" />;
      default:
        return <Package className="h-4 w-4 text-blue-600" />;
    }
  };

  const getStatusBadge = (status: string | null) => {
    const statusColors = {
      pending: "bg-yellow-100 text-yellow-800",
      confirmed: "bg-blue-100 text-blue-800",
      shipped: "bg-purple-100 text-purple-800",
      completed: "bg-green-100 text-green-800",
      cancelled: "bg-red-100 text-red-800",
      returned: "bg-gray-100 text-gray-800"
    };
    
    return statusColors[(status || "pending") as keyof typeof statusColors] || statusColors.pending;
  };

  const getPaymentStatusBadge = (status: string) => {
    const paymentColors = {
      completed: "bg-green-100 text-green-800",
      pending: "bg-yellow-100 text-yellow-800",
      failed: "bg-red-100 text-red-800",
      expired: "bg-gray-100 text-gray-800"
    };
    
    return paymentColors[status as keyof typeof paymentColors] || paymentColors.pending;
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            {getStatusIcon(order.status || "pending")}
            Order #{order.id.slice(0, 8)}
          </DialogTitle>
          <DialogDescription>
            Order details and status management
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6">
          {/* Order Overview */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <h3 className="font-medium text-gray-900 mb-2">Order Information</h3>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-600">Order ID:</span>
                  <span className="font-mono">#{order.id.slice(0, 8)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Date:</span>
                  <span>{order.createdAt ? new Date(order.createdAt).toLocaleDateString('sv-SE') : 'N/A'}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Status:</span>
                  <Badge className={getStatusBadge(order.status || "pending")}>
                    {order.status || "pending"}
                  </Badge>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Payment:</span>
                  <Badge className={getPaymentStatusBadge(order.paymentStatus || "pending")}>
                    {order.paymentStatus || "pending"}
                  </Badge>
                </div>
              </div>
            </div>

            <div>
              <h3 className="font-medium text-gray-900 mb-2">Customer Information</h3>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-600">Email:</span>
                  <span className="truncate">{order.customerEmail}</span>
                </div>
                {order.customerName && (
                  <div className="flex justify-between">
                    <span className="text-gray-600">Name:</span>
                    <span>{order.customerName}</span>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Shipping Address */}
          <div>
            <h3 className="font-medium text-gray-900 mb-2">Shipping Address</h3>
            <div className="bg-gray-50 p-3 rounded-lg text-sm">
              {order.shippingAddress}
            </div>
          </div>

          {/* Payment Details */}
          <div>
            <h3 className="font-medium text-gray-900 mb-2">Payment Details</h3>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-600">Method:</span>
                <span className="capitalize">{order.paymentMethod}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Total:</span>
                <span className="font-medium">{order.totalAmountKr} SEK</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Commission:</span>
                <span>{order.commissionKr} SEK</span>
              </div>
              {order.cryptoCurrency && (
                <>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Crypto Currency:</span>
                    <span className="uppercase">{order.cryptoCurrency}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Crypto Amount:</span>
                    <span>{order.cryptoAmount}</span>
                  </div>
                </>
              )}
              {order.nowpaymentsId && (
                <div className="flex justify-between">
                  <span className="text-gray-600">Payment ID:</span>
                  <span className="font-mono text-xs">{order.nowpaymentsId}</span>
                </div>
              )}
            </div>
          </div>

          {/* Update Status */}
          <div>
            <h3 className="font-medium text-gray-900 mb-2">Update Order Status</h3>
            <div className="flex gap-2">
              <Select value={selectedStatus} onValueChange={setSelectedStatus}>
                <SelectTrigger className="flex-1">
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
              <Button
                onClick={handleStatusUpdate}
                disabled={selectedStatus === order.status || updateOrderMutation.isPending}
                className="bg-[#005bd3] hover:bg-[#004fc4] text-white"
              >
                {updateOrderMutation.isPending ? "Updating..." : "Update"}
              </Button>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}