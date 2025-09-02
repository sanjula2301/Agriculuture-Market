import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import {
  Settings as SettingsIcon,
  MessageSquare,
  LogOut,
  LayoutDashboard,
  FileText,
  Heart,
  Gavel,
  Star
} from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { auth } from '@/firebase/firebase';
import { updateProfile, updatePassword } from "firebase/auth";
import Location from '@/location/locationSettings';
import { AuthService } from '@/services/AuthService';

const Settings: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const currentPath = location.pathname;
  const authService = new AuthService();

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

  useEffect(() => {
    const user = auth.currentUser;
    if (user) {
      setFormData(prev => ({
        ...prev,
        firstName: user.displayName?.split(" ")[0] || "",
        lastName: user.displayName?.split(" ")[1] || "",
        email: user.email || ""
      }));
    }
  }, []);

  const handleLogout = async () => {
    await authService.logout();
    navigate('/');
  };

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

  const handleUpdateAccount = async () => {
    try {
      const user = auth.currentUser;
      if (!user) throw new Error("No authenticated user found.");

      await updateProfile(user, {
        displayName: `${formData.firstName} ${formData.lastName}`,
        photoURL: formData.website || undefined 
      });

      setUpdateStatus("success");
    } catch (error) {
      console.error("Error updating profile:", error);
      setUpdateStatus("error");
    }

    setTimeout(() => setUpdateStatus(""), 3000);
  };

  const handleChangePassword = async () => {
    if (formData.newPassword !== formData.confirmPassword) {
      alert("Passwords do not match!");
      return;
    }

    try {
      const user = auth.currentUser;
      if (!user) throw new Error("No authenticated user found.");
      await updatePassword(user, formData.newPassword);
      alert("Password updated successfully.");
    } catch (error: any) {
      console.error("Password update error:", error);
      alert(error.message || "Failed to update password.");
    }
  };

  const sidebarItems = [
    { category: 'MAIN', items: [{ title: 'Dashboard', url: '/dashboard', icon: LayoutDashboard }] },
    {
      category: 'ADS',
      items: [
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
              {formData.firstName.charAt(0) || "U"}
            </div>
            <h3 className="font-semibold text-lg">
              {formData.firstName} {formData.lastName}
            </h3>
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

        {/* Navigation */}
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

        <main className="p-6">
          <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-8">
            
            {/* Account Details */}
            <div className="lg:col-span-2">
              <div className="bg-white rounded-lg shadow-sm border p-6">
                <h2 className="text-xl font-semibold text-gray-900 mb-6">Account Details</h2>

                {/* Name Fields */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                  <div>
                    <Label htmlFor="firstName">First Name *</Label>
                    <Input id="firstName" name="firstName" value={formData.firstName} onChange={handleInputChange} />
                  </div>
                  <div>
                    <Label htmlFor="lastName">Last Name *</Label>
                    <Input id="lastName" name="lastName" value={formData.lastName} onChange={handleInputChange} />
                  </div>
                </div>

                {/* Email */}
                <div className="mb-4">
                  <Label htmlFor="email">Email *</Label>
                  <Input id="email" name="email" type="email" value={formData.email} disabled />
                </div>

                {/* Phone */}
                <div className="mb-4">
                  <Label htmlFor="phone">Phone *</Label>
                  <Input id="phone" name="phone" value={formData.phone} onChange={handleInputChange} />
                  <div className="flex items-center space-x-2 mt-2">
                    <Checkbox id="hidePhone" checked={formData.hidePhone} onCheckedChange={handleCheckboxChange} />
                    <Label htmlFor="hidePhone">Hide phone?</Label>
                  </div>
                </div>

                {/* Description */}
                <div className="mb-6">
                  <Label htmlFor="description">Description</Label>
                  <Textarea id="description" name="description" value={formData.description} onChange={handleInputChange} />
                </div>

                <Button className="bg-teal-500 hover:bg-teal-600 text-white" onClick={handleUpdateAccount}>
                  UPDATE ACCOUNT
                </Button>
                {updateStatus === "success" && (
                  <div className="mt-4 p-3 text-green-800 bg-green-100 border border-green-300 rounded">
                    Profile updated successfully!
                  </div>
                )}
                {updateStatus === "error" && (
                  <div className="mt-4 p-3 text-red-800 bg-red-100 border border-red-300 rounded">
                    Failed to update profile.
                  </div>
                )}
              </div>
            </div>

            {/* Change Password */}
            <div>
              <div className="bg-white rounded-lg shadow-sm border p-6">
                <h2 className="text-xl font-semibold text-gray-900 mb-6">Change Password</h2>
                
                <div className="space-y-4">
                  <Input id="oldPassword" name="oldPassword" type="password" placeholder="Old Password" value={formData.oldPassword} onChange={handleInputChange} />
                  <Input id="newPassword" name="newPassword" type="password" placeholder="New Password" value={formData.newPassword} onChange={handleInputChange} />
                  <Input id="confirmPassword" name="confirmPassword" type="password" placeholder="Confirm New Password" value={formData.confirmPassword} onChange={handleInputChange} />
                </div>

                <Button className="w-full mt-6 bg-teal-500 hover:bg-teal-600 text-white" onClick={handleChangePassword}>
                  CHANGE PASSWORD
                </Button>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Settings;
