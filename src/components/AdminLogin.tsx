import React, { useState } from 'react';

const ADMIN_PASSWORD = import.meta.env.VITE_ADMIN_PASSWORD || 'changeme';

export default function AdminLogin({ onLogin }: { onLogin: () => void }) {
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === ADMIN_PASSWORD) {
      localStorage.setItem('isAdmin', 'true');
      setError('');
      onLogin();
    } else {
      setError('Incorrect password');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-sm mx-auto mt-8 p-6 bg-white rounded shadow">
      <h2 className="text-xl font-bold mb-4">Admin Login</h2>
      <input
        type="password"
        value={password}
        onChange={e => setPassword(e.target.value)}
        placeholder="Admin password"
        className="w-full px-4 py-2 border rounded mb-2"
      />
      <button type="submit" className="w-full bg-green-600 text-white py-2 rounded">Login</button>
      {error && <div className="text-red-600 mt-2">{error}</div>}
    </form>
  );
} 