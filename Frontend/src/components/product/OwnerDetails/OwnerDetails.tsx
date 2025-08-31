import React from 'react';
import { Star, Phone, MessageCircle, MapPin } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';

interface OwnerDetailsProps {
  owner: {
    name: string;
    phone: string;
    rating: number;
    totalReviews: number;
    location: string;
    memberSince: string;
    avatar?: string;
  };
}

const OwnerDetails = ({ owner }: OwnerDetailsProps) => {
  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, index) => (
      <Star
        key={index}
        className={`w-4 h-4 ${
          index < rating ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'
        }`}
      />
    ));
  };

  return (
    <Card className="bg-white shadow-lg">
      <CardContent className="p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Seller Information</h3>
        
        <div className="flex items-start space-x-4">
          {/* Avatar */}
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center">
            {owner.avatar ? (
              <img
                src={owner.avatar}
                alt={owner.name}
                className="w-full h-full rounded-full object-cover"
              />
            ) : (
              <span className="text-green-600 font-semibold text-xl">
                {owner.name.charAt(0).toUpperCase()}
              </span>
            )}
          </div>

          <div className="flex-1">
            <h4 className="font-semibold text-gray-900">{owner.name}</h4>
            
            {/* Rating */}
            <div className="flex items-center space-x-2 mt-1">
              <div className="flex items-center space-x-1">
                {renderStars(owner.rating)}
              </div>
              <span className="text-sm text-gray-600">
                {owner.rating}.0 ({owner.totalReviews} reviews)
              </span>
            </div>

            {/* Location */}
            <div className="flex items-center space-x-1 mt-2 text-sm text-gray-600">
              <MapPin className="w-4 h-4" />
              <span>{owner.location}</span>
            </div>

            {/* Member since */}
            <p className="text-sm text-gray-500 mt-1">
              Member since {owner.memberSince}
            </p>
          </div>
        </div>

        {/* Contact Buttons */}
        <div className="flex space-x-3 mt-6">
          <Button 
            className="flex-1 bg-green-600 hover:bg-green-700 text-white"
            onClick={() => window.open(`tel:${owner.phone}`)}
          >
            <Phone className="w-4 h-4 mr-2" />
            Call Now
          </Button>
          <Button 
            variant="outline" 
            className="flex-1 border-green-600 text-green-600 hover:bg-green-50"
          >
            <MessageCircle className="w-4 h-4 mr-2" />
            Message
          </Button>
        </div>

        <p className="text-xs text-gray-500 mt-3 text-center">
          Phone: {owner.phone}
        </p>
      </CardContent>
    </Card>
  );
};

export default OwnerDetails;