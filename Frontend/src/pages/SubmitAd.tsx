import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import Location from '@/location/locationSettings';
import { 
  ArrowLeft, 
  Upload, 
  Plus,
  Settings, 
  MessageSquare, 
  LogOut, 
  LayoutDashboard, 
  FileText, 
  Heart, 
  Gavel, 
  Star,
  MapPin,
  X 
} from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Textarea } from "@/components/ui/textarea";
import { auth } from '@/firebase/firebase';
import { AdsService, AdData } from "@/services/AdsService";

import { ImageService } from '@/services/ImageService';

const SubmitAd: React.FC = () => {
  const [title, setTitle] = useState('');
  const [adType, setAdType] = useState('sell');
  const [price, setPrice] = useState('');
  const [isNegotiable, setIsNegotiable] = useState(false);
  const [salePrice, setSalePrice] = useState('');
  const [currency, setCurrency] = useState('');
  const [condition, setCondition] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('');
  const [useProfileAddress, setUseProfileAddress] = useState(true);
  const [useProfileContact, setUseProfileContact] = useState(true);
  const [selectedImages, setSelectedImages] = useState<File[]>([]);
  const [imagePreviews, setImagePreviews] = useState<string[]>([]);

  const [selectedAddress, setSelectedAddress] = useState('');
  const [selectedLatLng, setSelectedLatLng] = useState<{ lat: number; lng: number } | null>(null);
  const [contactPhone, setContactPhone] = useState('');
  const [location, setLocation] = useState('');
  const [preciseLocation, setPreciseLocation] = useState('');
  const [country, setCountry] = useState('Sri Lanka');
  const [state, setState] = useState('');
  const [city, setCity] = useState('');
  const [street, setStreet] = useState('');

  const locationHook = useLocation();
  const currentPath = locationHook.pathname;

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files) {
      const newFiles = Array.from(files).slice(0, 5 - selectedImages.length);
      const newPreviews = newFiles.map(file => URL.createObjectURL(file));
      setSelectedImages(prev => [...prev, ...newFiles]);
      setImagePreviews(prev => [...prev, ...newPreviews]);
    }
  };

  const removeImage = (index: number) => {
    URL.revokeObjectURL(imagePreviews[index]);
    setSelectedImages(prev => prev.filter((_, i) => i !== index));
    setImagePreviews(prev => prev.filter((_, i) => i !== index));
  };

  const handleLocationChange = (address: string, latLng: { lat: number; lng: number }) => {
    setSelectedAddress(address);
    setSelectedLatLng(latLng);
    setPreciseLocation(address);
    setLocation(`${latLng.lat},${latLng.lng}`);
  };

  const handleSubmit = async () => {
  if (!title.trim() || !category.trim()) {
    alert("Title and category are required.");
    return;
  }

  const user = auth.currentUser;
  if (!user) {
    alert("Please log in to submit an ad.");
    return;
  }

  try {
    const adsService = new AdsService();

    // Upload images
    const imageUrls = await ImageService.uploadImages(selectedImages);

    const adData: AdData = {
      title,
      adType,
      price: parseFloat(price),
      negotiable: isNegotiable,
      salePrice: salePrice ? parseFloat(salePrice) : null,
      currency,
      condition,
      description,
      category,
      location,
      preciseLocation,
      imageUrls,
      useProfileAddress,
      useProfileContact,
      phone: !useProfileContact ? contactPhone : null, // keep phone, remove ownerId
    };

    // Pass ownerId separately to the service
    const adId = await adsService.addAd(adData, user.uid);

    alert("Ad submitted successfully! ID: " + adId);
  } catch (error: any) {
    console.error("Error submitting ad:", error);
    alert("Error submitting ad. Check Firestore rules.");
  }
};
  const sidebarItems = [
    { category: 'MAIN', items: [{ title: 'Dashboard', url: '/dashboard', icon: LayoutDashboard }] },
    { category: 'ADS', items: [
        { title: 'Your Ads', url: '/dashboard/your-ads', icon: FileText },
        { title: 'Favorite Ads', url: '/dashboard/favorites', icon: Heart },
        { title: 'Auctions', url: '/dashboard/auctions', icon: Gavel }
      ]
    },
    { category: 'FEEDBACK', items: [{ title: 'Reviews', url: '/dashboard/reviews', icon: Star }] }
  ];

  const isActive = (url: string) => currentPath === url;

  return (
      <div className="flex min-h-screen bg-gray-50">
      {/* Sidebar */}
      <div className="w-64 bg-gray-800 text-white">
        <div className="p-6 border-b border-gray-700">
          <div className="flex flex-col items-center">
            <div className="w-16 h-16 bg-orange-500 rounded-full flex items-center justify-center text-white text-2xl font-bold mb-2">
              S
            </div>
            <h3 className="font-semibold text-lg">Sanjula Hewage</h3>
            <p className="text-gray-400 text-sm">View Profile</p>
          </div>
          <div className="flex justify-center space-x-4 mt-4">
            <Link to="/dashboard/settings" className="text-center">
              <Settings className="w-6 h-6 mx-auto text-teal-400" />
              <span className="text-xs text-teal-400">Settings</span>
            </Link>
            <Link to="/dashboard/messages" className="text-center">
              <MessageSquare className="w-6 h-6 mx-auto text-teal-400" />
              <span className="text-xs text-teal-400">Messages</span>
            </Link>
            <div className="text-center cursor-pointer">
              <LogOut className="w-6 h-6 mx-auto text-teal-400" />
              <span className="text-xs text-teal-400">Logout</span>
            </div>
          </div>
        </div>

        {/* Navigation Menu */}
              <nav className="p-4">
                {sidebarItems.map((category) => (
                  <div key={category.category} className="mb-6">
                    <h4 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3">
                      {category.category}
                    </h4>
                    <ul className="space-y-2">
                      {category.items.map((item) => (
                        <li key={item.title}>
                          <Link
                            to={item.url}
                            className={`flex items-center px-3 py-2 rounded-lg text-sm transition-colors ${
                              isActive(item.url)
                                ? 'bg-teal-600 text-white'
                                : 'text-gray-300 hover:bg-gray-700 hover:text-white'
                            }`}
                          >
                            <item.icon className="w-5 h-5 mr-3" />
                            {item.title}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </nav>
            </div>
      
              {/* Main Content */}
                  <div className="flex-1">
                    {/* Top Header */}
                    <header className="bg-white shadow-sm border-b px-6 py-4">
                      <div className="flex justify-between items-center">
                        <div className="flex space-x-6">
                          <Link to="/" className="text-gray-700 hover:text-lanka-green font-medium">Home</Link>
                          <Link to="/products" className="text-gray-700 hover:text-lanka-green font-medium">Products</Link>
                          <Link to="/about" className="text-gray-700 hover:text-lanka-green font-medium">About</Link>
                        </div>
                         <Link to="/submit-ad">
                  <Button>Submit Ad</Button>
                </Link>
                      </div>
                    </header>

        <div className="p-6 max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Left Column - Ad Details */}
            <div className="lg:col-span-2 space-y-6">
              {/* Ad Details Section */}
              <div className="bg-white rounded-lg p-6 shadow-sm">
                <h2 className="text-xl font-semibold text-gray-900 mb-6">Ad Details</h2>
                
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="title">Title *</Label>
                    <Input 
                      id="title"
                      placeholder="Precise title is always better"
                      className="mt-1"
                      value={title}
                      onChange={(e) => setTitle(e.target.value)}
                    />
                  </div>

                  <div>
                    <Label htmlFor="adType">Ad Type</Label>
                    <Select value={adType} onValueChange={setAdType}>
                      <SelectTrigger className="mt-1">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="sell">Sell (Expires in 365 days)</SelectItem>
                        <SelectItem value="buy">Buy (Expires in 365 days)</SelectItem>
                        <SelectItem value="rent">Rent (Expires in 365 days) </SelectItem>
                        <SelectItem value="rent">Auction  (Expires in 0.002 days) </SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <Label htmlFor="price">Price</Label>
                      <Input 
                        id="price"
                        placeholder="0.00"
                        type="number"
                        className="mt-1"
                        value={price}
                        onChange={(e) => setPrice(e.target.value)}
                      />
                    </div>
                    <div className="flex items-center space-x-2 pt-6">
                      <Checkbox 
                        id="negotiable"
                        checked={isNegotiable}
                        onCheckedChange={(checked) => setIsNegotiable(checked === true)}
                      />
                      <Label htmlFor="negotiable" className="text-sm">Is negotiable?</Label>
                    </div>
                    <div>
                      <Label htmlFor="salePrice">Sale Price</Label>
                      <Input 
                        id="salePrice"
                        placeholder="0.00"
                        type="number"
                        className="mt-1"
                        value={salePrice}
                        onChange={(e) => setSalePrice(e.target.value)}
                      />
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="currency">Currency</Label>
                     <Select value={currency} onValueChange={setCurrency}>
                      <SelectTrigger className="mt-1">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="LKR">LKR </SelectItem>
                        <SelectItem value="USD">USD</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label htmlFor="condition">Condition</Label>
                    <Select value={condition} onValueChange={setCondition}>
                      <SelectTrigger className="mt-1">
                        <SelectValue placeholder="- Select -" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="new">New</SelectItem>
                        <SelectItem value="like-new">Manufacturer Refurbished</SelectItem>
                        <SelectItem value="good">Used</SelectItem>
                        <SelectItem value="fair">For Parts Or Not Working</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </div>

              {/* Images Section */}
              <div className="bg-white rounded-lg p-6 shadow-sm">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Images</h3>
                
                <div className="space-y-4">
                  {/* Upload Area */}
                  <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
                    <Upload className="w-12 h-12 mx-auto text-gray-400 mb-4" />
                    <p className="text-lg text-gray-600 mb-2">Drag & Drop files here</p>
                    <p className="text-gray-500 mb-4">or</p>
                    <label htmlFor="image-upload">
                      <Button 
                        variant="outline" 
                        className="bg-teal-500 text-white border-teal-500 hover:bg-teal-600"
                        type="button"
                        onClick={() => document.getElementById('image-upload')?.click()}
                      >
                        BROWSE FILES
                      </Button>
                    </label>
                    <input
                      id="image-upload"
                      type="file"
                      multiple
                      accept="image/*"
                      onChange={handleImageUpload}
                      className="hidden"
                    />
                    <p className="text-sm text-gray-500 mt-4">
                      Max number of images is 5. Max image size is 1.5MB. ({selectedImages.length}/5)
                    </p>
                  </div>

                  {/* Image Previews */}
                  {imagePreviews.length > 0 && (
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
                      {imagePreviews.map((preview, index) => (
                        <div key={index} className="relative group">
                          <div className="aspect-square rounded-lg overflow-hidden border border-gray-200">
                            <img
                              src={preview}
                              alt={`Preview ${index + 1}`}
                              className="w-full h-full object-cover"
                            />
                          </div>
                          <button
                            onClick={() => removeImage(index)}
                            className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
                            type="button"
                          >
                            <X className="w-4 h-4" />
                          </button>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>

              {/* Videos Section */}
              <div className="bg-white rounded-lg p-6 shadow-sm">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Videos (2 max)</h3>
                
                <div className="space-y-4">
                  <Input 
                    placeholder="Link to YouTube or Vimeo video"
                    className="w-full"
                  />
                  <Button variant="outline" className="w-full">
                    <Plus className="w-4 h-4 mr-2" />
                    ADD VIDEO
                  </Button>
                </div>
              </div>
              {/* Description Section */}
              <div className="bg-white rounded-lg p-6 shadow-sm">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Description (min 10 chars) *</h3>
                
                <div className="border border-gray-200 rounded-lg overflow-hidden">
                  <div className="border-b border-gray-200 p-3 bg-gray-50/50">
                    <div className="flex items-center space-x-3">
                      <Select defaultValue="paragraph">
                        <SelectTrigger className="w-36 h-8 text-sm">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="paragraph">Paragraph</SelectItem>
                          <SelectItem value="heading1">Heading 1</SelectItem>
                          <SelectItem value="heading2">Heading 2</SelectItem>
                        </SelectContent>
                      </Select>
                      <div className="flex space-x-1">
                        <Button variant="ghost" size="sm" className="h-8 w-8 p-0 hover:bg-gray-200">
                          <strong className="text-sm">B</strong>
                        </Button>
                        <Button variant="ghost" size="sm" className="h-8 w-8 p-0 hover:bg-gray-200">
                          <em className="text-sm">I</em>
                        </Button>
                      </div>
                    </div>
                  </div>
                  <div className="p-0">
                    <Textarea 
                      className="border-0 rounded-none min-h-[200px] resize-none focus:ring-0 focus:outline-none p-4"
                      placeholder="Enter your ad description here..."
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column */}
            <div className="space-y-6">
              {/* Ad Category */}
              <div className="bg-white rounded-lg p-6 shadow-sm">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Ad Category</h3>
                
                <div>
                  <Label htmlFor="category">Category *</Label>
                  <Select value={category} onValueChange={setCategory}>
                    <SelectTrigger className="mt-1">
                      <SelectValue placeholder="- Select -" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="vegetables">Vegetables</SelectItem>
                      <SelectItem value="fruits">Fruits</SelectItem>
                      <SelectItem value="grains">Grains</SelectItem>
                      <SelectItem value="dairy">Dairy</SelectItem>
                      <SelectItem value="meat">Meat</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              {/* Ad Location & Contact */}
<div className="bg-white rounded-lg p-6 shadow-sm">
  <h3 className="text-lg font-semibold text-gray-900 mb-6">Ad Location & Contact</h3>

  {/* Use Profile Address Checkbox */}
  <div className="flex items-center space-x-3 mb-4">
    <Checkbox 
      id="useProfileAddress"
      checked={useProfileAddress}
      onCheckedChange={(checked) => setUseProfileAddress(checked === true)}
      className="data-[state=checked]:bg-teal-500 data-[state=checked]:border-teal-500"
    />
    <Label htmlFor="useProfileAddress" className="text-sm font-medium text-gray-700">
      Use address set in profile section
    </Label>
  </div>

  {/* Location Fields - Show when NOT using profile address */}
  {!useProfileAddress && (
    <div className="space-y-4 mb-6 p-4 border border-gray-200 rounded-lg bg-gray-50/30">

      <div>
        <Label className="text-sm font-medium text-gray-600 mb-2 block">
          Precise Location *
        </Label>
        <Location onLocationChange={handleLocationChange} />
        {selectedAddress && (
          <div className="mt-2 p-2 bg-gray-50 rounded border">
            <p className="text-sm text-gray-700">Selected: {selectedAddress}</p>
          </div>
        )}
      </div>

      {/* Address Details */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <Label htmlFor="country" className="text-sm font-medium text-gray-600">Country</Label>
          <Input
            id="country"
            value={country}
            onChange={(e) => setCountry(e.target.value)}
            placeholder="Also populated on place select"
            className="mt-1"
          />
        </div>
        <div>
          <Label htmlFor="state" className="text-sm font-medium text-gray-600">State</Label>
          <Input
            id="state"
            value={state}
            onChange={(e) => setState(e.target.value)}
            placeholder="Also populated on place select"
            className="mt-1"
          />
        </div>
        <div>
          <Label htmlFor="city" className="text-sm font-medium text-gray-600">City</Label>
          <Input
            id="city"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            placeholder="Also populated on place select"
            className="mt-1"
          />
        </div>
        <div>
          <Label htmlFor="street" className="text-sm font-medium text-gray-600">Street</Label>
          <Input
            id="street"
            value={street}
            onChange={(e) => setStreet(e.target.value)}
            placeholder="Also populated on place select"
            className="mt-1"
          />
        </div>
      </div>
    </div>
  )}

  {/* Use Profile Contact Checkbox */}
  <div className="flex items-center space-x-3 mb-4">
    <Checkbox 
      id="useProfileContact"
      checked={useProfileContact}
      onCheckedChange={(checked) => setUseProfileContact(checked === true)}
      className="data-[state=checked]:bg-teal-500 data-[state=checked]:border-teal-500"
    />
    <Label htmlFor="useProfileContact" className="text-sm font-medium text-gray-700">
      Use contact set in profile section
    </Label>
  </div>

  {/* Contact Fields - Show when NOT using profile contact */}
  {!useProfileContact && (
    <div className="p-4 border border-gray-200 rounded-lg bg-gray-50/30">
      <div>
        <Label htmlFor="contactPhone" className="text-sm font-medium text-gray-600">
          Phone
        </Label>
        <Input
          id="contactPhone"
          value={contactPhone}
          onChange={(e) => setContactPhone(e.target.value)}
          placeholder="Protected from spam"
          className="mt-1"
        />
      </div>
    </div>
  )}
</div>

              {/* Save Button */}
              <Button 
                className="w-full bg-teal-500 hover:bg-teal-600 text-white py-3"
                onClick={handleSubmit}
              >
                SAVE AD
              </Button>
            </div>
          </div>
        </div>
      </div>
      </div>
  );
};

export default SubmitAd;

