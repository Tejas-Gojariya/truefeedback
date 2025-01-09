// ChangePassword.tsx
'use client'
import { useState } from 'react';
import { useSession } from 'next-auth/react';
import { User } from 'next-auth'

export default function ChangePassword() {
  const { data: session } = useSession();
  const userEmail = session?.user?.email;

  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [message, setMessage] = useState('');

  const handleChangePassword = async () => {
    if (!userEmail) {
      setMessage('You must be logged in to change your password');
      return;
    }

    const response = await fetch('/api/change-password', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: userEmail,
        currentPassword,
        newPassword,
      }),
    });

    const data = await response.json();
    console.log(data)

    if (data.success) {
      setMessage('Password changed successfully');
    } else {
      setMessage(data.message || 'Something went wrong');
    }
  };

  return (
    <div>
      <h1>Change Password</h1>
      <input
        type="password"
        placeholder="Current Password"
        value={currentPassword}
        onChange={(e) => setCurrentPassword(e.target.value)}
      />
      <input
        type="password"
        placeholder="New Password"
        value={newPassword}
        onChange={(e) => setNewPassword(e.target.value)}
      />
      <button onClick={handleChangePassword}>Change Password</button>
      {message && <p>{message}</p>}
    </div>
  );
}
