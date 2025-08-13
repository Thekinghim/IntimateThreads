import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Minus, Plus, Trash2, ShoppingBag } from "lucide-react";
import { useCartStore } from "@/lib/cart";
import { getProductImageUrl } from "@/assets/images";

export default function Cart() {
  const { items, removeItem, updateQuantity, getTotalPrice, clearCart, debugClearStorage } = useCartStore();

  const totalPrice = getTotalPrice();
  const itemCount = items.reduce((total, item) => total + item.quantity, 0);

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-[#F5F1E8] py-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center py-16">
            <ShoppingBag className="h-20 w-20 text-[#064F8C] mx-auto mb-6" />
            <h1 className="font-cormorant font-bold text-4xl text-[#064F8C] mb-6">Din varukorg är tom</h1>
            <p className="text-[#4A5568] text-lg mb-10 font-dm-sans">Utforska vår kollektion för att hitta något speciellt</p>
            <Link href="/womens">
              <Button className="gold-button font-medium px-8 py-4 text-lg rounded-3xl shadow-lg">
                Utforska kollektion
              </Button>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 py-4 sm:py-8">
      <div className="max-w-7xl mx-auto px-2 sm:px-4">
        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-0">
            {/* Main Cart Content */}
            <div className="lg:col-span-2 p-4 sm:p-8">
              {/* Header */}
              <div className="flex items-center justify-between mb-8">
                <h1 className="text-2xl font-bold text-gray-800">Shopping Cart</h1>
                <span className="text-lg font-medium text-gray-600">{itemCount} Items</span>
              </div>

              {/* Column Headers - Hidden on mobile */}
              <div className="hidden sm:grid grid-cols-6 gap-4 pb-4 border-b border-gray-200 mb-4">
                <div className="col-span-3 text-sm font-medium text-gray-500 uppercase tracking-wide">PRODUCT DETAILS</div>
                <div className="text-sm font-medium text-gray-500 uppercase tracking-wide text-center">QUANTITY</div>
                <div className="text-sm font-medium text-gray-500 uppercase tracking-wide text-center">PRICE</div>
                <div className="text-sm font-medium text-gray-500 uppercase tracking-wide text-center">TOTAL</div>
              </div>

              {/* Cart Items */}
              <div className="space-y-6">
                {items.map((item) => (
                  <div key={item.id} className="grid grid-cols-1 sm:grid-cols-6 gap-4 items-start sm:items-center py-4 border-b border-gray-100">
                    {/* Mobile Layout */}
                    <div className="sm:hidden">
                      <div className="flex items-start space-x-4 mb-4">
                        <img
                          src={getProductImageUrl(item.imageUrl) || "https://images.unsplash.com/photo-1566479179817-c0df35d84ff3?w=300&h=300&fit=crop&crop=center"}
                          alt={item.title}
                          className="w-16 h-16 object-cover rounded flex-shrink-0"
                        />
                        <div className="min-w-0 flex-1">
                          <h3 className="font-medium text-gray-800 mb-1 text-sm leading-tight">
                            {item.sellerAlias}
                          </h3>
                          <h4 className="font-medium text-gray-800 mb-1 text-sm leading-tight">
                            {item.title}
                          </h4>
                          <p className="text-xs text-gray-500 mb-1">Storlek: {item.size}</p>
                          <button
                            onClick={() => removeItem(item.id)}
                            className="text-xs text-red-500 hover:text-red-700"
                          >
                            Remove
                          </button>
                        </div>
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center border border-gray-300 rounded">
                          <button
                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                            disabled={item.quantity <= 1}
                            className="p-2 hover:bg-gray-100 disabled:opacity-50"
                          >
                            <Minus className="w-3 h-3" />
                          </button>
                          <span className="px-3 py-2 min-w-[2.5rem] text-center text-sm">{item.quantity}</span>
                          <button
                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                            className="p-2 hover:bg-gray-100"
                          >
                            <Plus className="w-3 h-3" />
                          </button>
                        </div>
                        <div className="text-right">
                          <div className="text-sm text-gray-600">
                            {item.priceKr.toLocaleString('sv-SE')} kr each
                          </div>
                          <div className="font-bold text-gray-800">
                            {(item.priceKr * item.quantity).toLocaleString('sv-SE')} kr
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Desktop Layout */}
                    <div className="hidden sm:contents">
                      {/* Product Details */}
                      <div className="col-span-3 flex items-start space-x-4">
                        <img
                          src={getProductImageUrl(item.imageUrl) || "https://images.unsplash.com/photo-1566479179817-c0df35d84ff3?w=300&h=300&fit=crop&crop=center"}
                          alt={item.title}
                          className="w-20 h-20 object-cover rounded flex-shrink-0"
                        />
                        <div className="min-w-0 flex-1">
                          <h3 className="font-medium text-gray-800 mb-1 text-base leading-tight">
                            {item.sellerAlias} - {item.title}
                          </h3>
                          <p className="text-sm text-gray-500 mb-1">Storlek: {item.size}</p>
                          <button
                            onClick={() => removeItem(item.id)}
                            className="text-sm text-red-500 hover:text-red-700"
                          >
                            Remove
                          </button>
                        </div>
                      </div>

                      {/* Quantity */}
                      <div className="flex items-center justify-center">
                        <div className="flex items-center border border-gray-300 rounded">
                          <button
                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                            disabled={item.quantity <= 1}
                            className="p-2 hover:bg-gray-100 disabled:opacity-50"
                          >
                            <Minus className="w-4 h-4" />
                          </button>
                          <span className="px-4 py-2 min-w-[3rem] text-center">{item.quantity}</span>
                          <button
                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                            className="p-2 hover:bg-gray-100"
                          >
                            <Plus className="w-4 h-4" />
                          </button>
                        </div>
                      </div>

                      {/* Price */}
                      <div className="text-center">
                        <span className="font-medium text-gray-800">
                          {item.priceKr.toLocaleString('sv-SE')} kr
                        </span>
                      </div>

                      {/* Total */}
                      <div className="text-center">
                        <span className="font-bold text-gray-800">
                          {(item.priceKr * item.quantity).toLocaleString('sv-SE')} kr
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Continue Shopping */}
              <div className="mt-8 pt-6 border-t border-gray-200">
                <Link href="/womens">
                  <Button variant="ghost" className="text-blue-600 hover:text-blue-800">
                    ← Continue Shopping
                  </Button>
                </Link>
              </div>
            </div>

            {/* Order Summary */}
            <div className="bg-gray-50 p-8">
              <h2 className="text-xl font-bold text-gray-800 mb-6">Order Summary</h2>
              
              <div className="space-y-4">
                <div className="flex justify-between">
                  <span className="text-gray-600">ITEMS {itemCount}</span>
                  <span className="font-medium">{totalPrice.toLocaleString('sv-SE')} kr</span>
                </div>

                <div className="border-t border-gray-200 pt-4">
                  <div className="mb-2">
                    <span className="text-gray-600 text-sm">SHIPPING</span>
                  </div>
                  <div className="flex items-center justify-between bg-white border border-gray-300 rounded p-3">
                    <span className="text-sm">Standard Delivery - 65 kr</span>
                    <button className="text-gray-400">
                      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                      </svg>
                    </button>
                  </div>
                </div>

                <div className="border-t border-gray-200 pt-4">
                  <div className="mb-2">
                    <span className="text-gray-600 text-sm">PROMO CODE</span>
                  </div>
                  <div className="flex space-x-2">
                    <input
                      type="text"
                      placeholder="Enter your code"
                      className="flex-1 px-3 py-2 border border-gray-300 rounded text-sm focus:outline-none focus:border-blue-500"
                    />
                    <Button className="bg-red-400 hover:bg-red-500 text-white px-4 py-2 text-sm">
                      APPLY
                    </Button>
                  </div>
                </div>

                <div className="border-t border-gray-200 pt-4">
                  <div className="flex justify-between text-lg font-bold">
                    <span>TOTAL COST</span>
                    <span>{(totalPrice + 65).toLocaleString('sv-SE')} kr</span>
                  </div>
                </div>

                <Link href="/checkout">
                  <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded text-lg font-medium mt-6">
                    CHECKOUT
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
