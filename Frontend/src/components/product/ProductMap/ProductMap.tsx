import React from 'react';
import { MapPin } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface ProductMapProps {
  location: string;
  coordinates?: { lat: number; lng: number };
}

const ProductMap = ({ location, coordinates }: ProductMapProps) => {
  return (
    <Card className="bg-white shadow-lg">
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <MapPin className="w-5 h-5 text-green-600" />
          <span>Location</span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <p className="text-gray-700">{location}</p>
          
          {/* Map placeholder - In a real implementation, you'd integrate with Google Maps */}
          <div className="w-full h-64 bg-gray-100 rounded-lg flex items-center justify-center border">
            <div className="text-center">
              <MapPin className="w-12 h-12 text-green-500 mx-auto mb-2" />
              <p className="text-gray-600">Interactive Map</p>
              <p className="text-sm text-gray-500">Product location: {location}</p>
            </div>
          </div>
          
          <p className="text-sm text-gray-500">
            * Map integration requires Google Maps API configuration
          </p>
        </div>
      </CardContent>
    </Card>
  );
};

export default ProductMap;