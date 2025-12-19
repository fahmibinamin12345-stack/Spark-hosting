
import React, { useState } from 'react';
import { View, User } from '../types';

interface AuthProps {
  onLogin: (u: User) => void;
  setView: (v: View) => void;
  allUsers: User[];
  isRegister?: boolean;
}

const Auth: React.FC<AuthProps> = ({ onLogin, setView, allUsers, isRegister }) => {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    displayName: ''
  });
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    // Hardcoded Admin Account Check
    if (!isRegister && formData.email === 'sparkstaff@gmail.com' && formData.password === 'spark') {
      const staffAccount = allUsers.find(u => u.email === 'sparkstaff@gmail.com');
      if (staffAccount) {
        onLogin(staffAccount);
        return;
      }
    }

    if (!isRegister) {
      // Login attempt
      const existingUser = allUsers.find(u => u.email === formData.email || u.username === formData.username);
      if (existingUser) {
        // In a real app we'd check password here
        onLogin(existingUser);
      } else {
        setError("Invalid credentials or account does not exist.");
      }
    } else {
      // Registration attempt
      const exists = allUsers.find(u => u.email === formData.email || u.username === formData.username);
      if (exists) {
        setError("Account with this email or username already exists.");
        return;
      }

      const mockUser: User = {
        username: formData.username,
        displayName: formData.displayName || formData.username,
        email: formData.email,
        balance: 0,
        isAdmin: false
      };
      onLogin(mockUser);
    }
  };

  return (
    <div className="min-h-screen pt-32 pb-24 px-4 flex items-center justify-center bg-slate-950 relative overflow-hidden">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-purple-500/10 blur-[120px] rounded-full"></div>
      
      <div className="relative z-10 w-full max-w-md">
        <div className="bg-slate-900/50 backdrop-blur-xl border border-white/5 rounded-3xl p-8 shadow-2xl">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-black text-white mb-2 italic uppercase tracking-tighter">{isRegister ? 'New Account' : 'Welcome Back'}</h2>
            <p className="text-slate-400 text-xs font-bold uppercase tracking-widest">{isRegister ? 'Join the Spark network' : 'Identify yourself to proceed'}</p>
          </div>

          {error && (
            <div className="mb-6 p-4 bg-red-500/10 border border-red-500/20 rounded-2xl text-red-400 text-xs font-mono">
              ERROR: {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            {isRegister && (
              <div className="space-y-1.5">
                <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest px-1">Identity Display</label>
                <input 
                  type="text" 
                  required
                  placeholder="John Doe"
                  className="w-full bg-slate-950 border border-white/5 rounded-xl px-4 py-4 outline-none focus:border-purple-500 transition-all text-white text-sm font-bold"
                  value={formData.displayName}
                  onChange={(e) => setFormData({ ...formData, displayName: e.target.value })}
                />
              </div>
            )}
            <div className="space-y-1.5">
              <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest px-1">Network Username</label>
              <input 
                type="text" 
                required
                placeholder="spark_user"
                className="w-full bg-slate-950 border border-white/5 rounded-xl px-4 py-4 outline-none focus:border-purple-500 transition-all text-white text-sm font-bold"
                value={formData.username}
                onChange={(e) => setFormData({ ...formData, username: e.target.value })}
              />
            </div>
            <div className="space-y-1.5">
              <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest px-1">Global Email</label>
              <input 
                type="email" 
                required
                placeholder="user@example.com"
                className="w-full bg-slate-950 border border-white/5 rounded-xl px-4 py-4 outline-none focus:border-purple-500 transition-all text-white text-sm font-bold"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              />
            </div>
            <div className="space-y-1.5">
              <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest px-1">Access Pass</label>
              <input 
                type="password" 
                required
                placeholder="••••••••"
                className="w-full bg-slate-950 border border-white/5 rounded-xl px-4 py-4 outline-none focus:border-purple-500 transition-all text-white text-sm font-bold"
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
              />
            </div>

            <button 
              type="submit"
              className="w-full py-5 bg-white text-slate-950 hover:bg-purple-600 hover:text-white rounded-2xl font-black text-lg transition-all shadow-xl active:scale-95"
            >
              {isRegister ? 'CREATE ACCOUNT' : 'SYSTEM LOGIN'}
            </button>
          </form>

          <div className="mt-8 text-center text-xs font-bold uppercase tracking-widest">
            <span className="text-slate-500">
              {isRegister ? 'Already verified?' : "Identity unknown?"}
            </span>
            <button 
              onClick={() => setView(isRegister ? View.LOGIN : View.REGISTER)}
              className="ml-2 text-purple-400 hover:underline"
            >
              {isRegister ? 'SIGN IN' : 'REGISTER'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Auth;
