import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { 
  Sparkles, 
  Palette, 
  Eye, 
  Zap, 
  Target, 
  TrendingUp,
  Heart,
  Star,
  Gift,
  Award
} from "lucide-react";

interface VisualImprovementsProps {
  className?: string;
}

export default function VisualImprovements({ className = "" }: VisualImprovementsProps) {
  const [activeFeature, setActiveFeature] = useState<string | null>(null);

  const improvements = [
    {
      id: "smart-filters",
      title: "Smart Filters",
      description: "AI-powered search with intelligent suggestions",
      icon: Target,
      color: "text-blue-600",
      bgColor: "bg-blue-50",
      borderColor: "border-blue-200"
    },
    {
      id: "visual-analytics",
      title: "Visual Analytics",
      description: "Beautiful charts and real-time insights",
      icon: TrendingUp,
      color: "text-green-600",
      bgColor: "bg-green-50",
      borderColor: "border-green-200"
    },
    {
      id: "quick-actions",
      title: "Quick Actions",
      description: "One-click operations for common tasks",
      icon: Zap,
      color: "text-yellow-600",
      bgColor: "bg-yellow-50",
      borderColor: "border-yellow-200"
    },
    {
      id: "image-management",
      title: "Easy Images",
      description: "Drag & drop with instant preview",
      icon: Palette,
      color: "text-purple-600",
      bgColor: "bg-purple-50",
      borderColor: "border-purple-200"
    }
  ];

  const qualityIndicators = [
    { label: "User Experience", value: 95, color: "bg-green-500" },
    { label: "Performance", value: 87, color: "bg-blue-500" },
    { label: "Visual Design", value: 92, color: "bg-purple-500" },
    { label: "Functionality", value: 98, color: "bg-emerald-500" }
  ];

  return (
    <TooltipProvider>
      <div className={`space-y-6 ${className}`}>
        {/* Feature Showcase */}
        <Card className="border-stone-200 shadow-sm">
          <CardHeader>
            <CardTitle className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-stone-100 to-stone-200 flex items-center justify-center">
                <Sparkles className="h-5 w-5 text-stone-600" />
              </div>
              <div>
                <h3 className="text-lg font-medium text-stone-800">Enhanced Features</h3>
                <p className="text-sm text-stone-600 font-normal">Powerful tools for efficient management</p>
              </div>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-4">
              {improvements.map((feature) => (
                <Tooltip key={feature.id}>
                  <TooltipTrigger asChild>
                    <button
                      onClick={() => setActiveFeature(feature.id === activeFeature ? null : feature.id)}
                      className={`
                        p-4 rounded-lg border-2 transition-all duration-200 text-left w-full
                        ${feature.borderColor} ${feature.bgColor}
                        hover:shadow-md hover:scale-105
                        ${activeFeature === feature.id ? 'ring-2 ring-stone-400 shadow-lg' : ''}
                      `}
                    >
                      <div className="flex items-start gap-3">
                        <div className={`w-8 h-8 rounded-full ${feature.bgColor} flex items-center justify-center`}>
                          <feature.icon className={`h-4 w-4 ${feature.color}`} />
                        </div>
                        <div className="flex-1 min-w-0">
                          <h4 className="font-medium text-stone-800 text-sm">{feature.title}</h4>
                          <p className="text-xs text-stone-600 mt-1">{feature.description}</p>
                        </div>
                      </div>
                      {activeFeature === feature.id && (
                        <div className="mt-3 pt-3 border-t border-stone-200">
                          <Badge variant="secondary" className="text-xs">
                            <Eye className="h-3 w-3 mr-1" />
                            Active
                          </Badge>
                        </div>
                      )}
                    </button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Click to highlight this feature</p>
                  </TooltipContent>
                </Tooltip>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Quality Metrics */}
        <Card className="border-stone-200 shadow-sm">
          <CardHeader>
            <CardTitle className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-emerald-100 to-emerald-200 flex items-center justify-center">
                <Award className="h-5 w-5 text-emerald-600" />
              </div>
              <div>
                <h3 className="text-lg font-medium text-stone-800">System Quality</h3>
                <p className="text-sm text-stone-600 font-normal">Performance and usability metrics</p>
              </div>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {qualityIndicators.map((metric, index) => (
                <div key={index} className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-stone-700">{metric.label}</span>
                    <div className="flex items-center gap-2">
                      <span className="text-sm text-stone-600">{metric.value}%</span>
                      {metric.value >= 90 && <Star className="h-4 w-4 text-yellow-500 fill-current" />}
                    </div>
                  </div>
                  <div className="w-full bg-stone-200 rounded-full h-2">
                    <div
                      className={`h-2 rounded-full transition-all duration-1000 ${metric.color}`}
                      style={{ width: `${metric.value}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </TooltipProvider>
  );
}