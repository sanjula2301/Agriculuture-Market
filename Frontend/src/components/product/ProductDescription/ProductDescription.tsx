import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { ArrowLeft, Heart, Share2, Weight, Package, Calendar, MapPin } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import ProductImageGallery from '../ProductImageGallery/ProductImageGallery';
import OwnerDetails from '../OwnerDetails/OwnerDetails';
import ProductMap from '../ProductMap/ProductMap';
import CommentSection from '../CommentSection/CommentSection';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

interface ProductDescriptionProps {
  productId: string;
  onBack: () => void;
}


const fetchProductById = async (productId: string) => {
  const response = await fetch(`http://localhost:8080/api/ads/public`);
  if (!response.ok) throw new Error('Failed to fetch ads');
  const ads = await response.json();
  const matched = ads.find((ad: any) => ad.id === productId);
  if (!matched) throw new Error('Product not found');
  return matched;
};

const ProductDescription: React.FC<ProductDescriptionProps> = ({ productId, onBack }) => {
  const { data: product, isLoading, isError, error } = useQuery({
    queryKey: ['product', productId],
    queryFn: () => fetchProductById(productId),
  });

  if (isLoading) {
    return <div className="min-h-screen flex items-center justify-center text-gray-600">Loading product...</div>;
  }

  if (isError || !product) {
    return (
      <div className="min-h-screen flex items-center justify-center text-red-500">
        Error: {(error as Error)?.message || 'Product not found'}
      </div>
    );
  }

  const formattedProduct = {
    id: product.id,
    name: product.title || 'Untitled',
    price: product.price ? `Rs. ${product.price}` : 'Price not set',
    pricePerKg: 'per unit',
    location: product.location || 'Not specified',
    images: product.imageUrls?.length ? product.imageUrls : ['/placeholder.svg'],
    description: product.description || 'No description provided.',
    details: {
      availableAmount: product.availableAmount || 'Not specified',
      weight: product.weight || 'Not specified',
      harvestDate: product.harvestDate || 'Not specified',
      category: product.category || 'Uncategorized',
      organic: true,
      variety: product.variety || 'General'
    },
    owner: {
      name: product.ownerName || 'Unknown',
      phone: product.phone || 'Not shared',
      rating: 4,
      totalReviews: 0,
      location: product.location || 'Not specified',
      memberSince: '2022',
      avatar: ''
    }
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-grow container mx-auto px-4 py-8">
        <Button variant="ghost" onClick={onBack} className="mb-4 flex items-center gap-2 text-lanka-green">
          <ArrowLeft size={18} /> Back to Products
        </Button>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Images */}
          <ProductImageGallery
    images={formattedProduct.images}
    productName={formattedProduct.name}
  />


          {/* Product Info */}
          <div>
            <h1 className="text-3xl font-bold mb-2">{formattedProduct.name}</h1>
            <p className="text-xl text-lanka-green font-semibold mb-4">{formattedProduct.price}</p>
            <p className="mb-4 text-gray-700">{formattedProduct.description}</p>

            {/* Details */}
            <div className="grid grid-cols-2 gap-4 mb-6">
              <Card>
                <CardContent className="flex items-center gap-3 py-4">
                  <Weight size={20} /> {formattedProduct.details.weight}
                </CardContent>
              </Card>
              <Card>
                <CardContent className="flex items-center gap-3 py-4">
                  <Package size={20} /> {formattedProduct.details.availableAmount}
                </CardContent>
              </Card>
              <Card>
                <CardContent className="flex items-center gap-3 py-4">
                  <Calendar size={20} /> {formattedProduct.details.harvestDate}
                </CardContent>
              </Card>
              <Card>
                <CardContent className="flex items-center gap-3 py-4">
                  <MapPin size={20} /> {formattedProduct.location}
                </CardContent>
              </Card>
            </div>

            {/* Tags */}
            <div className="flex gap-2 mb-6">
              <Badge variant="outline">{formattedProduct.details.category}</Badge>
              <Badge variant="outline">{formattedProduct.details.variety}</Badge>
            </div>

            {/* Buttons */}
            <div className="flex gap-4">
              <Button className="bg-lanka-green text-white">Add to Cart</Button>
              <Button variant="outline" className="flex gap-2">
                <Heart size={18} /> Favorite
              </Button>
              <Button variant="outline" className="flex gap-2">
                <Share2 size={18} /> Share
              </Button>
            </div>
          </div>
        </div>

        {/* Owner, Map, Comments */}
        <div className="mt-12">
          <OwnerDetails owner={formattedProduct.owner} />
          <ProductMap location={formattedProduct.location} />
          <CommentSection productId={formattedProduct.id} />
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default ProductDescription;
