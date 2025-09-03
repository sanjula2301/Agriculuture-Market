import React, { useState } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import ProductDescription from '@/components/product/ProductDescription/ProductDescription';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, Filter } from 'lucide-react';
import { useQuery } from '@tanstack/react-query';
import { AdsService, Ad } from '@/services/AdsService';
import { auth } from '@/firebase/firebase';

const Products = () => {
   const [selectedProductId, setSelectedProductId] = useState<string | null>(null);
  const userId = auth.currentUser?.uid || 'default_user';
  const adsService = new AdsService();

  const { data: products = [], isLoading, isError, error } = useQuery<Ad[]>({
  queryKey: ['userAds', userId],
  queryFn: () => adsService.getAllAds(),
  staleTime: 1000 * 60 * 5,
});

  const handleProductClick = (id: string) => setSelectedProductId(id);
  const handleBackToProducts = () => setSelectedProductId(null);

  if (selectedProductId)
    return <ProductDescription productId={selectedProductId} onBack={handleBackToProducts} />;

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-grow">
        <div className="bg-lanka-green text-white py-16">
          <div className="container mx-auto px-4 text-center max-w-3xl">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Fresh Products from Sri Lankan Farms
            </h1>
            <p className="text-lg md:text-xl opacity-90">
              Discover authentic, locally-grown produce directly from our trusted farmers
            </p>
          </div>
        </div>

        <div className="bg-white py-8 border-b">
          <div className="container mx-auto px-4">
            <div className="flex flex-col md:flex-row gap-4 items-center">
              <div className="relative flex-grow max-w-md">
                <Input 
                  type="text" 
                  placeholder="Search products..." 
                  className="pl-10 pr-4 py-2 w-full border rounded-full"
                />
                <Search className="absolute left-3 top-[9px] text-gray-400" size={20} />
              </div>
              <Button variant="outline" className="flex items-center gap-2">
                <Filter size={18} />
                Filter
              </Button>
            </div>
          </div>
        </div>

        <div className="py-16">
          <div className="container mx-auto px-4">
            {isLoading ? (
              <div className="text-center text-gray-600">Loading products...</div>
            ) : isError ? (
              <div className="text-center text-red-500">Error: {(error as Error).message}</div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {products.map((product: any) => (
                  <div 
                    key={product.id} 
                    className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow cursor-pointer"
                    onClick={() => handleProductClick(product.id)}
                  >
                    <img 
                      src={product.imageUrls?.[0] || "/placeholder.svg"} 
                      alt={product.title || "No Title"}
                      className="w-full h-48 object-cover"
                    />
                    <div className="p-6">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm text-lanka-spice font-medium">{product.category}</span>
                        <span className="text-lg font-bold text-lanka-green">Rs. {product.price}</span>
                      </div>
                      <h3 className="text-xl font-semibold mb-2">{product.title}</h3>
                      <p className="text-gray-600 mb-1">By {product.ownerName || 'Unknown'}</p>
                      <p className="text-gray-500 text-sm mb-4">{product.location}</p>
                      <Button 
                        className="w-full bg-lanka-green hover:bg-lanka-green/90"
                        onClick={(e) => e.stopPropagation()}
                      >
                        Add to Cart
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Products;


