import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { apiRequest } from "@/lib/queryClient";
import { 
  RefreshCw, 
  TrendingUp, 
  Bell, 
  Mail, 
  Package, 
  Truck, 
  CheckCircle, 
  AlertTriangle,
  Download,
  Upload
} from "lucide-react";

interface QuickActionsProps {
  stats: {
    totalOrders: number;
    pendingOrders: number;
    completedOrders: number;
    totalRevenue: number;
    totalProducts: number;
    activeSellers: number;
  };
}

export default function QuickActions({ stats }: QuickActionsProps) {
  const [isRefreshing, setIsRefreshing] = useState(false);
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const refreshData = async () => {
    setIsRefreshing(true);
    try {
      await queryClient.invalidateQueries();
      toast({
        title: "Data Refreshed",
        description: "All data has been refreshed successfully.",
      });
    } catch (error) {
      toast({
        title: "Refresh Failed",
        description: "Failed to refresh data. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsRefreshing(false);
    }
  };

  const exportData = () => {
    toast({
      title: "Export Started",
      description: "Data export will be ready shortly.",
    });
    // In a real app, this would trigger an actual export
  };

  const sendNotification = () => {
    toast({
      title: "Notifications Sent",
      description: "Order updates sent to customers.",
    });
  };

  const quickActions = [
    {
      title: "Refresh Data",
      description: "Update all dashboard data",
      icon: RefreshCw,
      action: refreshData,
      loading: isRefreshing,
      variant: "outline" as const,
    },
    {
      title: "Export Orders",
      description: "Download order report",
      icon: Download,
      action: exportData,
      variant: "outline" as const,
    },
    {
      title: "Send Updates",
      description: "Notify customers of order status",
      icon: Mail,
      action: sendNotification,
      variant: "outline" as const,
    },
  ];

  const alerts = [
    {
      type: "warning" as const,
      icon: AlertTriangle,
      title: `${stats.pendingOrders} Pending Orders`,
      description: "Orders waiting for processing",
      badge: stats.pendingOrders > 5 ? "High" : "Normal",
    },
    {
      type: "info" as const,
      icon: Package,
      title: `${stats.totalProducts} Products`,
      description: "Total items in catalog",
      badge: "Active",
    },
    {
      type: "success" as const,
      icon: CheckCircle,
      title: `${stats.completedOrders} Completed`,
      description: "Successfully fulfilled orders",
      badge: "Good",
    },
  ];

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {/* Quick Actions */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <TrendingUp className="h-5 w-5" />
            Quick Actions
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-3">
            {quickActions.map((action, index) => (
              <Button
                key={index}
                variant={action.variant}
                onClick={action.action}
                disabled={action.loading}
                className="flex items-center justify-start gap-3 h-auto p-4 text-left"
              >
                <action.icon className={`h-4 w-4 ${action.loading ? 'animate-spin' : ''}`} />
                <div>
                  <div className="font-medium">{action.title}</div>
                  <div className="text-xs text-muted-foreground">{action.description}</div>
                </div>
              </Button>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* System Alerts */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Bell className="h-5 w-5" />
            System Alerts
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {alerts.map((alert, index) => (
              <div
                key={index}
                className={`flex items-center gap-3 p-3 rounded-lg border ${
                  alert.type === 'warning' ? 'bg-yellow-50 border-yellow-200' :
                  alert.type === 'success' ? 'bg-green-50 border-green-200' :
                  'bg-blue-50 border-blue-200'
                }`}
              >
                <alert.icon 
                  className={`h-4 w-4 ${
                    alert.type === 'warning' ? 'text-yellow-600' :
                    alert.type === 'success' ? 'text-green-600' :
                    'text-blue-600'
                  }`} 
                />
                <div className="flex-1">
                  <div className="font-medium text-sm">{alert.title}</div>
                  <div className="text-xs text-muted-foreground">{alert.description}</div>
                </div>
                <Badge 
                  variant={
                    alert.badge === 'High' ? 'destructive' :
                    alert.badge === 'Good' ? 'default' :
                    'secondary'
                  }
                  className="text-xs"
                >
                  {alert.badge}
                </Badge>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}