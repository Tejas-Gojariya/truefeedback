'use client';
import { useState } from 'react';
import { useSession } from 'next-auth/react';
import { toast } from '@/components/ui/use-toast';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Eye, EyeOff } from 'lucide-react';
// import { FaXTwitter, FaLinkedinIn, FaDiscord, FaDribbble } from "react-icons/fa6";

export default function ChangePassword() {
  const { data: session } = useSession();
  const user = session?.user;

  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  // const [socialLinks, setSocialLinks] = useState({
  //   linkedin: '',
  //   x: '',
  //   discord: '',
  //   dribbble: '',
  // });

  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  const handleChangePassword = async (e) => {
    e.preventDefault();

    if (!user?.email) {
      toast({
        title: 'Error',
        description: 'You must be logged in to change your password',
        variant: 'default',
        className: 'bg-white text-black',
      });
      return;
    }

    if (currentPassword === newPassword) {
      toast({
        title: 'Error',
        description: 'New password cannot be the same as the current password',
        variant: 'default',
        className: 'bg-white text-black',
      });
      return;
    }

    try {
      const response = await fetch('/api/change-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: user.email, currentPassword, newPassword }),
      });

      const data = await response.json();

      if (data.success) {
        setCurrentPassword('');
        setNewPassword('');
        toast({
          title: 'Success',
          description: 'Password changed successfully',
          variant: 'default',
          className: 'bg-white text-black',
        });
      } else {
        toast({
          title: 'Error',
          description: data.message || 'Something went wrong',
          variant: 'default',
          className: 'bg-white text-black',
        });
      }
    } catch (error) {
      toast({
        title: 'Error',
        description: 'An unexpected error occurred. Please try again.',
        variant: 'default',
        className: 'bg-white text-black',
      });
      console.error('Error changing password:', error);
    }
  };

  // const handleSocialLinksSave = () => {
  //   console.log('Social Links:', socialLinks);
  //   setSocialLinks({ linkedin: '', x: '', discord: '', dribbble: '' });
  //   toast({
  //     title: 'Success',
  //     description: 'Social links saved successfully',
  //     variant: 'default',
  //     className: 'bg-white text-black',
  //   });
  // };

  return (
    <div className="container mx-auto p-4 grid gap-6 lg:grid-cols-2">
      <Card className="shadow-md bg-gray-700 border-none text-white">
        <CardHeader>
          <CardTitle className="text-lg font-bold">Change Password</CardTitle>
        </CardHeader>

        <CardContent>
          <form onSubmit={handleChangePassword} className="space-y-4">
            <Input
              className='w-full p-2 sm:p-3 text-gray-200 bg-transparent border border-gray-500 rounded-lg focus:ring-2 focus:ring-blue-500'
              value={user?.username || 'Name not available'}
              disabled
            />
            <Input
              className='w-full p-2 sm:p-3 text-gray-200 bg-transparent border border-gray-500 rounded-lg focus:ring-2 focus:ring-blue-500'
              value={user?.email || 'Email not available'}
              disabled
              autoComplete="email"
            />

            <Input
              type="password"
              placeholder="Current Password"
              value={currentPassword}
              onChange={(e) => setCurrentPassword(e.target.value)}
              className='w-full p-2 sm:p-3 text-gray-200 bg-transparent border border-gray-500 rounded-lg focus:ring-2 focus:ring-blue-500'
              autoComplete="current-password"
            />

            <div className="relative">
              <Input
                type={showPassword ? 'text' : 'password'}
                placeholder="New Password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                className='w-full p-2 sm:p-3 text-gray-200 bg-transparent border border-gray-500 rounded-lg'
                autoComplete="new-password"
              />
              <button
                type="button"
                onClick={togglePasswordVisibility}
                className="absolute top-1/2 right-3 transform -translate-y-1/2 text-gray-500"
              >
                {showPassword ? <Eye size={18} /> : <EyeOff size={18} />}
              </button>
            </div>

            <Button type="submit" className="w-full">
              Change Password
            </Button>
          </form>
        </CardContent>
      </Card>

      {/* <Card className="shadow-md bg-gray-700 border-none text-white">
        <CardHeader>
          <CardTitle className="text-lg font-bold">Social Media Profiles</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {Object.entries(socialLinks).map(([key, value]) => (
              <div key={key} className="relative flex items-center">
                {key === 'linkedin' && <FaLinkedinIn size={20} className="absolute left-3 text-blue-600" />}
                {key === 'x' && <FaXTwitter size={20} className="absolute left-3 text-black" />}
                {key === 'discord' && <FaDiscord size={20} className="absolute left-3 text-blue-600" />}
                {key === 'dribbble' && <FaDribbble size={20} className="absolute left-3 text-pink-600" />}
                <Input
                  type="url"
                  placeholder={`${key.charAt(0).toUpperCase() + key.slice(1)} Profile`}
                  value={value}
                  onChange={(e) => setSocialLinks({ ...socialLinks, [key]: e.target.value })}
                  className="pl-10 text-white bg-transparent"
                />
              </div>
            ))}
            <Button onClick={handleSocialLinksSave} className="w-full">
              Save
            </Button>
          </div>
        </CardContent>
      </Card> */}
    </div>
  );
}
