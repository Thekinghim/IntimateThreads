import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Search, Filter, SortAsc, SortDesc, Calendar, User, Package } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface EnhancedSearchProps {
  onSearch: (filters: SearchFilters) => void;
  totalResults?: number;
}

interface SearchFilters {
  query: string;
  sortBy: string;
  sortOrder: 'asc' | 'desc';
  dateRange: string;
  category: string;
}

export default function EnhancedSearch({ onSearch, totalResults = 0 }: EnhancedSearchProps) {
  const [filters, setFilters] = useState<SearchFilters>({
    query: "",
    sortBy: "date",
    sortOrder: "desc",
    dateRange: "all",
    category: "all",
  });

  const [showAdvanced, setShowAdvanced] = useState(false);

  const updateFilter = (key: keyof SearchFilters, value: string | 'asc' | 'desc') => {
    const newFilters = { ...filters, [key]: value };
    setFilters(newFilters);
    onSearch(newFilters);
  };

  const clearFilters = () => {
    const clearedFilters = {
      query: "",
      sortBy: "date", 
      sortOrder: "desc" as const,
      dateRange: "all",
      category: "all",
    };
    setFilters(clearedFilters);
    onSearch(clearedFilters);
  };

  const activeFiltersCount = Object.values(filters).filter(
    (value, index) => index === 0 ? value : value !== "all" && value !== "date" && value !== "desc"
  ).length;

  return (
    <Card className="w-full">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg font-medium flex items-center gap-2">
            <Search className="h-5 w-5" />
            Search & Filter
            {totalResults > 0 && (
              <Badge variant="secondary" className="ml-2">
                {totalResults} results
              </Badge>
            )}
          </CardTitle>
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={() => setShowAdvanced(!showAdvanced)}
            className="text-sm"
          >
            <Filter className="h-4 w-4 mr-1" />
            Advanced {activeFiltersCount > 0 && `(${activeFiltersCount})`}
          </Button>
        </div>
      </CardHeader>
      
      <CardContent className="space-y-4">
        {/* Main Search Bar */}
        <div className="flex gap-2">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search orders, products, customers..."
              value={filters.query}
              onChange={(e) => updateFilter('query', e.target.value)}
              className="pl-9"
            />
          </div>
          <Button variant="outline" onClick={clearFilters} disabled={activeFiltersCount === 0}>
            Clear
          </Button>
        </div>

        {/* Advanced Filters */}
        {showAdvanced && (
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 pt-4 border-t">
            {/* Sort By */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-muted-foreground">Sort By</label>
              <Select value={filters.sortBy} onValueChange={(value) => updateFilter('sortBy', value)}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="date">Date Created</SelectItem>
                  <SelectItem value="amount">Amount</SelectItem>
                  <SelectItem value="customer">Customer Name</SelectItem>
                  <SelectItem value="status">Status</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Sort Order */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-muted-foreground">Order</label>
              <Select value={filters.sortOrder} onValueChange={(value) => updateFilter('sortOrder', value as 'asc' | 'desc')}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="desc">
                    <div className="flex items-center gap-2">
                      <SortDesc className="h-4 w-4" />
                      Descending
                    </div>
                  </SelectItem>
                  <SelectItem value="asc">
                    <div className="flex items-center gap-2">
                      <SortAsc className="h-4 w-4" />
                      Ascending
                    </div>
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Date Range */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-muted-foreground">Date Range</label>
              <Select value={filters.dateRange} onValueChange={(value) => updateFilter('dateRange', value)}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Time</SelectItem>
                  <SelectItem value="today">Today</SelectItem>
                  <SelectItem value="week">This Week</SelectItem>
                  <SelectItem value="month">This Month</SelectItem>
                  <SelectItem value="quarter">This Quarter</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Category */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-muted-foreground">Category</label>
              <Select value={filters.category} onValueChange={(value) => updateFilter('category', value)}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Categories</SelectItem>
                  <SelectItem value="orders">
                    <div className="flex items-center gap-2">
                      <Package className="h-4 w-4" />
                      Orders
                    </div>
                  </SelectItem>
                  <SelectItem value="customers">
                    <div className="flex items-center gap-2">
                      <User className="h-4 w-4" />
                      Customers
                    </div>
                  </SelectItem>
                  <SelectItem value="products">
                    <div className="flex items-center gap-2">
                      <Package className="h-4 w-4" />
                      Products
                    </div>
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        )}

        {/* Active Filters Display */}
        {activeFiltersCount > 0 && (
          <div className="flex flex-wrap gap-2 pt-2">
            <span className="text-sm text-muted-foreground">Active filters:</span>
            {filters.query && (
              <Badge variant="secondary" className="gap-1">
                Search: "{filters.query}"
              </Badge>
            )}
            {filters.sortBy !== "date" && (
              <Badge variant="secondary">
                Sort: {filters.sortBy}
              </Badge>
            )}
            {filters.sortOrder !== "desc" && (
              <Badge variant="secondary">
                Order: {filters.sortOrder}
              </Badge>
            )}
            {filters.dateRange !== "all" && (
              <Badge variant="secondary">
                Date: {filters.dateRange}
              </Badge>
            )}
            {filters.category !== "all" && (
              <Badge variant="secondary">
                Category: {filters.category}
              </Badge>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  );
}