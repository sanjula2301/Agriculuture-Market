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
import { AdsService, Ad } from '@/services/AdsService';
import { auth } from '@/firebase/firebase';


  interface Props {
  productId: string;
  onBack: () => void;
}

const ProductDescription: React.FC<Props> = ({ productId, onBack }) => {
  const userId = auth.currentUser?.uid || 'default_user';

  const adsService = new AdsService();
  const { data: product, isLoading, isError, error } = useQuery({
  queryKey: ['product', productId],
  queryFn: () => adsService.getAdById(productId), // ✅ correct method
});
const { data: owner, isLoading: ownerLoading } = useQuery({
    queryKey: ["owner", product?.ownerId],
    queryFn: () => product ? adsService.getUserById(product.ownerId) : Promise.resolve(null),
    enabled: !!product, // only run if product is loaded
  });

  if (isLoading) return <div className="min-h-screen flex items-center justify-center text-gray-600">Loading product...</div>;
  if (isError || !product) return <div className="min-h-screen flex items-center justify-center text-red-500">Error: {(error as Error)?.message || 'Product not found'}</div>;

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
    images={product.imageUrls}
    productName={product.title}
  />


          {/* Product Info */}
          <div>
            <h1 className="text-3xl font-bold mb-2">{product.title}</h1>
            <p className="text-xl text-lanka-green font-semibold mb-4">{product.price}</p>
            <p className="mb-4 text-gray-700">{product.description}</p>

            {/* Details */}
            <div className="grid grid-cols-2 gap-4 mb-6">
              {/* <Card>
                <CardContent className="flex items-center gap-3 py-4">
                  <Weight size={20} /> {product.weight}
                </CardContent>
              </Card>
              <Card>
                <CardContent className="flex items-center gap-3 py-4">
                  <Package size={20} /> {product.availableAmount}
                </CardContent>
              </Card> */}
              <Card>
                <CardContent className="flex items-center gap-3 py-4">
                  <MapPin size={20} /> {product.location}
                </CardContent>
              </Card>
            </div>

            {/* Tags */}
            <div className="flex gap-2 mb-6">
              <Badge variant="outline">{product.category}</Badge>
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
         <OwnerDetails owner={owner?.displayName || "Unknown Seller"} />
          <ProductMap location={product.location} />
          <CommentSection productId={product.id} />
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default ProductDescription;
