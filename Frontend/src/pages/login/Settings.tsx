import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import {
  Settings as SettingsIcon,
  MessageSquare,
  LogOut,
  LayoutDashboard,
  FileText,
  Heart,
  Gavel,
  Star,
  Upload
} from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { signOut } from 'firebase/auth';
import { auth } from '@/firebase/firebase';
import Location from '@/location/locationSettings';


const Settings: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const currentPath = location.pathname;

  const [updateStatus, setUpdateStatus] = useState<'success' | 'error' | ''>('');
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    hidePhone: false,
    facebook: '',
    twitter: '',
    youtube: '',
    linkedin: '',
    instagram: '',
    website: '',
    description: '',
    location: '',
    preciseLocation: '',
    country: '',
    state: '',
    city: '',
    street: '',
    oldPassword: '',
    newPassword: '',
    confirmPassword: ''
  });

  const handleLogout = async () => {
    await signOut(auth);
    sessionStorage.removeItem('token');
    navigate('/');
  };

  const handleInputMesaage = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleCheckboxChangeMesaage = (checked: boolean) => {
    setFormData({
      ...formData,
      hidePhone: checked
    });
  };

  const handleUpdateAccount = async () => {
  // Only validate string fields
  const requiredFields: (keyof typeof formData)[] = [
    "firstName",
    "lastName",
    "email",
    "phone",
    "location",
    "preciseLocation"
  ];

  for (const field of requiredFields) {
    const value = formData[field];
    if (typeof value !== "string" || value.trim() === "") {
      setUpdateStatus("error");
      alert(`Please fill in the required field: ${field}`);
      return;
    }
  }

  const token = sessionStorage.getItem("token");
  if (!token) {
    setUpdateStatus("error");
    return;
  }

  try {
    const response = await fetch("http://localhost:8080/api/profile/info", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(formData),
    });

    const result = await response.text();
    if (response.ok) {
      setUpdateStatus("success");
    } else {
      setUpdateStatus("error");
    }
  } catch (error) {
    console.error("Error updating profile:", error);
    setUpdateStatus("error");
  }

  setTimeout(() => setUpdateStatus(""), 3000);
};

  const sidebarItems = [
    { 
      category: 'MAIN',
      items: [
        { title: 'Dashboard', url: '/dashboard', icon: LayoutDashboard }
      ]
    },
    {
      category: 'ADS',
      items: [
        { title: 'Your Ads', url: '/dashboard/your-ads', icon: FileText },
        { title: 'Favorite Ads', url: '/dashboard/favorites', icon: Heart },
        { title: 'Auctions', url: '/dashboard/auctions', icon: Gavel }
      ]
    },
    {
      category: 'FEEDBACK',
      items: [
        { title: 'Reviews', url: '/dashboard/reviews', icon: Star }
      ]
    }
  ];

  const isActive = (url: string) => currentPath === url;

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleCheckboxChange = (checked: boolean) => {
    setFormData({
      ...formData,
      hidePhone: checked
    });
  };

  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Sidebar */}
      <div className="w-64 bg-gray-800 text-white">
        {/* User Profile Section */}
        <div className="p-6 border-b border-gray-700">
          <div className="flex flex-col items-center">
            <div className="w-16 h-16 bg-orange-500 rounded-full flex items-center justify-center text-white text-2xl font-bold mb-2">
              S
            </div>
            <h3 className="font-semibold text-lg">Sanjula Hewage</h3>
            <p className="text-gray-400 text-sm">View Profile</p>
          </div>
          <div className="flex justify-center space-x-4 mt-4">
            <div className="text-center">
              <SettingsIcon className="w-6 h-6 mx-auto text-teal-400" />
              <span className="text-xs text-teal-400">Settings</span>
            </div>
            <div className="text-center">
              <MessageSquare className="w-6 h-6 mx-auto text-teal-400" />
              <span className="text-xs text-teal-400">Messages</span>
            </div>
            <div className="text-center cursor-pointer" onClick={handleLogout}>
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

        {/* Settings Content */}
        <main className="p-6">
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              
              {/* Account Details */}
              <div className="lg:col-span-2">
                <div className="bg-white rounded-lg shadow-sm border p-6">
                  <h2 className="text-xl font-semibold text-gray-900 mb-6">Account Details</h2>

                  {/* Name Fields */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                    <div>
                      <Label htmlFor="firstName" className="text-sm font-medium text-gray-600">
                        First Name *
                      </Label>
                      <Input
                        id="firstName"
                        name="firstName"
                        value={formData.firstName}
                        onChange={handleInputChange}
                        className="mt-1"
                      />
                    </div>
                    <div>
                      <Label htmlFor="lastName" className="text-sm font-medium text-gray-600">
                        Last Name *
                      </Label>
                      <Input
                        id="lastName"
                        name="lastName"
                        value={formData.lastName}
                        onChange={handleInputChange}
                        className="mt-1"
                      />
                    </div>
                  </div>

                  {/* Email */}
                  <div className="mb-4">
                    <Label htmlFor="email" className="text-sm font-medium text-gray-600">
                      Email *
                    </Label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      className="mt-1"
                    />
                  </div>

                  {/* Phone */}
                  <div className="mb-4">
                    <Label htmlFor="phone" className="text-sm font-medium text-gray-600">
                      Phone *
                    </Label>
                    <Input
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      className="mt-1"
                    />
                    <div className="flex items-center space-x-2 mt-2">
                      <Checkbox 
                        id="hidePhone"
                        checked={formData.hidePhone}
                        onCheckedChange={handleCheckboxChange}
                      />
                      <Label htmlFor="hidePhone" className="text-sm text-gray-600">
                        Hide phone?
                      </Label>
                    </div>
                  </div>

                  {/* Social Media Links */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                    <div>
                      <Label htmlFor="facebook" className="text-sm font-medium text-gray-600">Facebook</Label>
                      <Input
                        id="facebook"
                        name="facebook"
                        value={formData.facebook}
                        onChange={handleInputChange}
                        className="mt-1"
                      />
                    </div>
                    <div>
                      <Label htmlFor="twitter" className="text-sm font-medium text-gray-600">Twitter</Label>
                      <Input
                        id="twitter"
                        name="twitter"
                        value={formData.twitter}
                        onChange={handleInputChange}
                        className="mt-1"
                      />
                    </div>
                    <div>
                      <Label htmlFor="youtube" className="text-sm font-medium text-gray-600">YouTube</Label>
                      <Input
                        id="youtube"
                        name="youtube"
                        value={formData.youtube}
                        onChange={handleInputChange}
                        className="mt-1"
                      />
                    </div>
                    <div>
                      <Label htmlFor="linkedin" className="text-sm font-medium text-gray-600">LinkedIn</Label>
                      <Input
                        id="linkedin"
                        name="linkedin"
                        value={formData.linkedin}
                        onChange={handleInputChange}
                        className="mt-1"
                      />
                    </div>
                    <div>
                      <Label htmlFor="instagram" className="text-sm font-medium text-gray-600">Instagram</Label>
                      <Input
                        id="instagram"
                        name="instagram"
                        value={formData.instagram}
                        onChange={handleInputChange}
                        className="mt-1"
                      />
                    </div>
                    <div>
                      <Label htmlFor="website" className="text-sm font-medium text-gray-600">Website</Label>
                      <Input
                        id="website"
                        name="website"
                        value={formData.website}
                        onChange={handleInputChange}
                        className="mt-1"
                      />
                    </div>
                  </div>

                  {/* Description */}
                  <div className="mb-6">
                    <Label htmlFor="description" className="text-sm font-medium text-gray-600">Description</Label>
                    <Textarea
                      id="description"
                      name="description"
                      value={formData.description}
                      onChange={handleInputChange}
                      className="mt-1 h-32"
                    />
                  </div>
                  
                  <div className="mb-6">
                    <Label className="text-sm font-medium text-gray-600 mb-2 block">Pick your location from the map *</Label>
                    <Location
                    onLocationChange={(address, latLng) => {
                      setFormData({
                        ...formData,
                        preciseLocation: address,
                        location: `${latLng.lat}, ${latLng.lng}`,
                      });
                    }}
                    />
                    </div>

                  {/* Address Details */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                    <div>
                      <Label htmlFor="country" className="text-sm font-medium text-gray-600">Country</Label>
                      <Input
                        id="country"
                        name="country"
                        value={formData.country}
                        onChange={handleInputChange}
                        className="mt-1"
                      />
                    </div>
                    <div>
                      <Label htmlFor="state" className="text-sm font-medium text-gray-600">State</Label>
                      <Input
                        id="state"
                        name="state"
                        value={formData.state}
                        onChange={handleInputChange}
                        className="mt-1"
                      />
                    </div>
                    <div>
                      <Label htmlFor="city" className="text-sm font-medium text-gray-600">City</Label>
                      <Input
                        id="city"
                        name="city"
                        value={formData.city}
                        onChange={handleInputChange}
                        className="mt-1"
                      />
                    </div>
                    <div>
                      <Label htmlFor="street" className="text-sm font-medium text-gray-600">Street</Label>
                      <Input
                        id="street"
                        name="street"
                        value={formData.street}
                        onChange={handleInputChange}
                        className="mt-1"
                      />
                    </div>
                  </div>

                  <Button className="bg-teal-500 hover:bg-teal-600 text-white"
                  onClick={handleUpdateAccount}>
                    UPDATE ACCOUNT
                  </Button>
                  {updateStatus === "success" && (
                    <div className="mt-4 p-3 text-green-800 bg-green-100 border border-green-300 rounded">
                      Profile updated successfully!
                      </div>)}
                      
                    {updateStatus === "error" && (
                      <div className="mt-4 p-3 text-red-800 bg-red-100 border border-red-300 rounded">
                        Failed to update profile. Please try again.
                        </div>)}
                </div>
              </div>

              {/* Change Password */}
              <div>
                <div className="bg-white rounded-lg shadow-sm border p-6">
                  <h2 className="text-xl font-semibold text-gray-900 mb-6">Change Password</h2>
                  
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="oldPassword" className="text-sm font-medium text-gray-600">
                        Old Password *
                      </Label>
                      <Input
                        id="oldPassword"
                        name="oldPassword"
                        type="password"
                        value={formData.oldPassword}
                        onChange={handleInputChange}
                        placeholder="Your current password"
                        className="mt-1"
                      />
                    </div>
                    
                    <div>
                      <Label htmlFor="newPassword" className="text-sm font-medium text-gray-600">
                        New Password *
                      </Label>
                      <Input
                        id="newPassword"
                        name="newPassword"
                        type="password"
                        value={formData.newPassword}
                        onChange={handleInputChange}
                        placeholder="Your desired new password"
                        className="mt-1"
                      />
                    </div>
                    
                    <div>
                      <Label htmlFor="confirmPassword" className="text-sm font-medium text-gray-600">
                        Confirm New Password *
                      </Label>
                      <Input
                        id="confirmPassword"
                        name="confirmPassword"
                        type="password"
                        value={formData.confirmPassword}
                        onChange={handleInputChange}
                        placeholder="Your desired new password"
                        className="mt-1"
                      />
                    </div>
                  </div>

                  <Button className="w-full mt-6 bg-teal-500 hover:bg-teal-600 text-white">
                    CHANGE PASSWORD
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};
export default Settings;