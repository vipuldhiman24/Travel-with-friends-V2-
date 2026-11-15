import React, { useState } from 'react';
import { adminLogin } from '../../utils/firebase';

export default function AdminLogin({ onLoginSuccess }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!email.trim() || !password) {
      setError('Please enter both email and password.');
      return;
    }

    setLoading(true);
    try {
      const res = await adminLogin(email, password);
      if (res.success) {
        onLoginSuccess(res.user);
      }
    } catch (err) {
      console.error("Login failed:", err);
      if (err.code === 'auth/wrong-password' || err.code === 'auth/invalid-credential') {
        setError('Incorrect password. Please verify your credentials.');
      } else if (err.code === 'auth/user-not-found') {
        setError('No administrator account found with this email.');
      } else {
        setError('Invalid credentials or authentication error: ' + (err.message || 'Please check credentials.'));
      }
    } finally {
      setLoading(false);
    }
  };

  const handleQuickDemoFill = () => {
    setEmail('admin@flywithfriends.com');
    setPassword('flywithfriends@2026');
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center p-4 bg-[#140e0a] relative overflow-hidden font-display">
      {/* Background glow effects */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/10 rounded-full blur-[120px] pointer-events-none" />

      <div className="relative z-10 w-full max-w-md bg-[#1f1712] border border-[#3a2d24] rounded-3xl p-6 sm:p-10 shadow-2xl backdrop-blur-xl text-white">
        {/* Logo and header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center size-16 rounded-2xl bg-primary/10 border border-primary/30 text-primary mb-4 shadow-lg shadow-primary/20">
            <span
              className="material-symbols-outlined text-3xl"
              style={{ fontVariationSettings: "'FILL' 1, 'wght' 600" }}
            >
              admin_panel_settings
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black tracking-tight text-white">
            Admin Portal
          </h1>
          <p className="text-xs sm:text-sm text-gray-400 mt-1.5">
            Fly With Friends · Lead &amp; Package Management
          </p>
        </div>

        {/* Error Alert */}
        {error && (
          <div className="mb-6 p-3.5 rounded-xl bg-red-950/60 border border-red-700/50 text-red-200 text-xs sm:text-sm flex items-start gap-2.5 animate-shake">
            <span className="material-symbols-outlined text-base text-red-400 shrink-0 mt-0.5">error</span>
            <span>{error}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-gray-300 mb-1.5">
              Admin Email
            </label>
            <div className="relative">
              <span className="absolute left-3.5 top-1/2 -translate-y-1/2 material-symbols-outlined text-gray-400 text-lg">
                mail
              </span>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="admin@flywithfriends.com"
                className="w-full bg-[#2a1f18] border border-[#44352b] rounded-xl py-3 pl-11 pr-4 text-sm font-semibold text-white placeholder:text-gray-500 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-colors"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-gray-300 mb-1.5">
              Password
            </label>
            <div className="relative">
              <span className="absolute left-3.5 top-1/2 -translate-y-1/2 material-symbols-outlined text-gray-400 text-lg">
                lock
              </span>
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••••••"
                className="w-full bg-[#2a1f18] border border-[#44352b] rounded-xl py-3 pl-11 pr-4 text-sm font-semibold text-white placeholder:text-gray-500 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-colors"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full mt-2 py-3.5 px-6 rounded-xl bg-primary hover:bg-orange-600 disabled:opacity-50 text-white font-extrabold text-sm sm:text-base shadow-xl shadow-orange-500/20 transition-all flex items-center justify-center gap-2 cursor-pointer active:scale-[0.98]"
          >
            {loading ? (
              <>
                <span className="animate-spin material-symbols-outlined text-lg">sync</span>
                <span>Authenticating...</span>
              </>
            ) : (
              <>
                <span>Sign In to Dashboard</span>
                <span className="material-symbols-outlined text-lg">arrow_forward</span>
              </>
            )}
          </button>
        </form>

        {/* Quick helper button */}
        <div className="mt-6 pt-5 border-t border-[#3a2d24] text-center">
          <p className="text-[11px] text-gray-400 mb-2">Default administrator credentials:</p>
          <button
            type="button"
            onClick={handleQuickDemoFill}
            className="text-xs font-bold text-primary hover:underline inline-flex items-center gap-1 cursor-pointer"
          >
            <span className="material-symbols-outlined text-sm">key</span>
            Auto-fill Admin Credentials
          </button>
        </div>

        {/* Return to website */}
        <div className="mt-4 text-center">
          <a
            href="/"
            className="text-xs text-gray-400 hover:text-white transition-colors inline-flex items-center gap-1"
          >
            <span className="material-symbols-outlined text-sm">arrow_back</span>
            Back to Public Website
          </a>
        </div>
      </div>
    </div>
  );
}
