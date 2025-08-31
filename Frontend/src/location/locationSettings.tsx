import React, { useState, useRef, useCallback } from 'react';
import { GoogleMap, Marker, useJsApiLoader, Autocomplete } from '@react-google-maps/api';

const libraries: ("places")[] = ["places"];
const mapContainerStyle = { width: '100%', height: '200px' };
const defaultCenter = { lat: 6.9271, lng: 79.8612 }; 
interface LocationProps {
  onLocationChange: (address: string, latLng: { lat: number; lng: number }) => void;
}

const Location: React.FC<LocationProps> = ({ onLocationChange }) => {
  const [selectedPosition, setSelectedPosition] = useState<{ lat: number; lng: number } | null>(null);
  const autocompleteRef = useRef<google.maps.places.Autocomplete | null>(null);

  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: 'AIzaSyAa7VefTDPpjpIR5yuQN858P5iRhgpN2ik', 
    libraries,
  });

  const onLoad = (autocomplete: google.maps.places.Autocomplete) => {
    autocompleteRef.current = autocomplete;
  };

  const onPlaceChanged = () => {
    if (autocompleteRef.current) {
      const place = autocompleteRef.current.getPlace();
      if (place.geometry && place.geometry.location) {
        const lat = place.geometry.location.lat();
        const lng = place.geometry.location.lng();
        const address = place.formatted_address || '';
        setSelectedPosition({ lat, lng });
        onLocationChange(address, { lat, lng });
      }
    }
  };

  if (!isLoaded) return <div>Loading map...</div>;

  return (
    <div className="space-y-2">
      <Autocomplete onLoad={onLoad} onPlaceChanged={onPlaceChanged}>
        <input
          type="text"
          placeholder="Search your location..."
          className="border p-2 w-full rounded"
        />
      </Autocomplete>

      <GoogleMap
        mapContainerStyle={mapContainerStyle}
        center={selectedPosition || defaultCenter}
        zoom={selectedPosition ? 15 : 8}
      >
        {selectedPosition && <Marker position={selectedPosition} />}
      </GoogleMap>
    </div>
  );
};

export default Location;
