
import React, { useState } from 'react';
import { View, User } from '../types';

interface NavbarProps {
  currentView: View;
  setView: (v: View) => void;
  user: User | null;
  onLogout: () => void;
}

const Navbar: React.FC<NavbarProps> = ({ currentView, setView, user, onLogout }) => {
  const [mobileMenu, setMobileMenu] = useState(false);
  const unreadCount = user?.messages?.length || 0;

  return (
    <nav className="fixed top-0 left-0 right-0 z-[100] bg-slate-950/60 backdrop-blur-xl border-b border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          <div className="flex items-center gap-3 cursor-pointer group" onClick={() => setView(View.HOME)}>
            <div className="relative w-10 h-10 flex items-center justify-center">
              <div className="absolute inset-0 bg-gradient-to-tr from-purple-600 to-pink-500 rounded-xl rotate-12 group-hover:rotate-45 transition-transform duration-500 blur-sm opacity-50"></div>
              <div className="relative w-full h-full bg-gradient-to-tr from-purple-500 to-pink-400 rounded-xl flex items-center justify-center transform rotate-12 group-hover:rotate-0 transition-all duration-300">
                <span className="text-white font-black text-2xl drop-shadow-md">S</span>
              </div>
            </div>
            <span className="text-2xl font-black tracking-tighter text-white uppercase italic">
              Spark<span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400">Hosting</span>
            </span>
          </div>

          <div className="hidden md:flex items-center gap-8">
            <button onClick={() => setView(View.HOME)} className={`text-sm font-bold tracking-wide transition-all ${currentView === View.HOME ? 'text-purple-400 underline decoration-2 underline-offset-8' : 'text-slate-400 hover:text-white'}`}>HOME</button>
            <button onClick={() => setView(View.PLANS)} className={`text-sm font-bold tracking-wide transition-all ${currentView === View.PLANS ? 'text-purple-400 underline decoration-2 underline-offset-8' : 'text-slate-400 hover:text-white'}`}>PLANS</button>
            <button onClick={() => setView(View.SPECIALS)} className={`text-sm font-bold tracking-wide transition-all ${currentView === View.SPECIALS ? 'text-pink-400 underline decoration-2 underline-offset-8' : 'text-slate-400 hover:text-white'}`}>HOLIDAY DEALS</button>
            <button onClick={() => setView(View.VOUCHER_SHOP)} className={`text-sm font-bold tracking-wide transition-all ${currentView === View.VOUCHER_SHOP ? 'text-purple-400 underline decoration-2 underline-offset-8' : 'text-slate-400 hover:text-white'}`}>SHOP</button>
            
            {user && (
              <button 
                onClick={() => setView(View.MESSAGES)} 
                className={`text-sm font-bold tracking-wide transition-all flex items-center gap-2 relative ${currentView === View.MESSAGES ? 'text-blue-400 underline decoration-2 underline-offset-8' : 'text-slate-400 hover:text-white'}`}
              >
                MESSAGES
                {unreadCount > 0 && (
                  <span className="flex h-2 w-2 relative">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500 shadow-[0_0_5px_rgba(59,130,246,0.8)]"></span>
                  </span>
                )}
              </button>
            )}

            {user?.isAdmin && (
              <button onClick={() => setView(View.ADMIN)} className={`text-sm font-black tracking-widest text-purple-400 hover:text-purple-300 transition-all px-3 py-1 bg-purple-500/10 rounded-lg border border-purple-500/20 ${currentView === View.ADMIN ? 'bg-purple-500/20 border-purple-500/50' : ''}`}>STAFF PANEL</button>
            )}

            {user ? (
              <div className="flex items-center gap-5 border-l border-white/10 pl-8">
                <button onClick={() => setView(View.PROFILE)} className="flex items-center gap-3 group">
                  <div className="w-10 h-10 rounded-xl bg-slate-800 p-0.5 border border-white/10 group-hover:border-purple-500 transition-all overflow-hidden">
                    {user.profilePic ? (
                      <img src={user.profilePic} className="w-full h-full object-cover rounded-[10px]" />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-sm font-black bg-slate-700 rounded-[10px]">
                        {user.username[0].toUpperCase()}
                      </div>
                    )}
                  </div>
                  <div className="flex flex-col items-start text-left">
                    <span className="text-sm font-black text-white">{user.displayName}</span>
                    <span className="text-[10px] text-slate-500 font-mono">PROFILE</span>
                  </div>
                </button>
                <button onClick={onLogout} className="p-2 text-slate-500 hover:text-red-500 transition-colors">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" /></svg>
                </button>
              </div>
            ) : (
              <button 
                onClick={() => setView(View.LOGIN)} 
                className="bg-white text-slate-950 px-8 py-2.5 rounded-xl text-sm font-black shadow-lg hover:bg-purple-500 hover:text-white transition-all active:scale-95"
              >
                JOIN THE SPARK
              </button>
            )}
          </div>

          <div className="md:hidden flex items-center gap-4">
            {user?.isAdmin && <button onClick={() => setView(View.ADMIN)} className="text-[10px] font-black bg-purple-500 text-white px-2 py-1 rounded">STAFF</button>}
            <button onClick={() => setMobileMenu(!mobileMenu)} className="p-2 text-slate-300 relative">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" /></svg>
              {unreadCount > 0 && <span className="absolute top-1 right-1 w-2 h-2 bg-blue-500 rounded-full"></span>}
            </button>
          </div>
        </div>
      </div>

      {mobileMenu && (
        <div className="md:hidden bg-slate-950 border-b border-white/10 pb-6 px-4 space-y-2">
          <button onClick={() => { setView(View.HOME); setMobileMenu(false); }} className="block w-full text-left p-4 rounded-xl hover:bg-white/5 font-bold text-slate-300">HOME</button>
          <button onClick={() => { setView(View.PLANS); setMobileMenu(false); }} className="block w-full text-left p-4 rounded-xl hover:bg-white/5 font-bold text-slate-300">PLANS</button>
          <button onClick={() => { setView(View.SPECIALS); setMobileMenu(false); }} className="block w-full text-left p-4 rounded-xl hover:bg-white/5 font-bold text-slate-300">HOLIDAY DEALS</button>
          <button onClick={() => { setView(View.VOUCHER_SHOP); setMobileMenu(false); }} className="block w-full text-left p-4 rounded-xl hover:bg-white/5 font-bold text-slate-300">SHOP</button>
          {user && (
             <button onClick={() => { setView(View.MESSAGES); setMobileMenu(false); }} className="block w-full text-left p-4 rounded-xl hover:bg-white/5 font-bold text-blue-400 flex items-center justify-between">
              MESSAGES
              {unreadCount > 0 && <span className="bg-blue-500 text-white text-[10px] px-2 py-0.5 rounded-full">{unreadCount}</span>}
             </button>
          )}
          {user ? (
            <>
              <button onClick={() => { setView(View.PROFILE); setMobileMenu(false); }} className="block w-full text-left p-4 rounded-xl hover:bg-white/5 font-black text-purple-400">{user.displayName}</button>
              <button onClick={() => { onLogout(); setMobileMenu(false); }} className="block w-full text-left p-4 rounded-xl text-red-400 hover:bg-white/5 font-bold">LOGOUT</button>
            </>
          ) : (
            <button onClick={() => { setView(View.LOGIN); setMobileMenu(false); }} className="block w-full bg-purple-600 text-center p-4 rounded-xl font-black mt-4">GET STARTED</button>
          )}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
