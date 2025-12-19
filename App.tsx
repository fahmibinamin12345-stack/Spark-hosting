
import React, { useState, useEffect } from 'react';
import { View, User, UserMessage } from './types.ts';
import { DISCORD_LINK, STANDARD_PLANS, SPECIAL_PLANS, PROMO_CODES, DISCOUNT_TO_CODE } from './constants.tsx';
import Navbar from './components/Navbar.tsx';
import Home from './components/Home.tsx';
import PlansList from './components/PlansList.tsx';
import Profile from './components/Profile.tsx';
import Auth from './components/Auth.tsx';
import Footer from './components/Footer.tsx';
import AdminPanel from './components/AdminPanel.tsx';
import VoucherShop from './components/VoucherShop.tsx';
import Messages from './components/Messages.tsx';

const App: React.FC = () => {
  const [currentView, setCurrentView] = useState<View>(View.HOME);
  const [user, setUser] = useState<User | null>(null);
  const [allUsers, setAllUsers] = useState<User[]>([]);
  const [promoCode, setPromoCode] = useState<string>('');
  const [promoMessage, setPromoMessage] = useState<string | null>(null);
  const [promoError, setPromoError] = useState(false);
  const [showBanner, setShowBanner] = useState(true);
  
  // Active discount state for UI updates
  const [activeDiscountPercent, setActiveDiscountPercent] = useState<number>(0);
  const [activeAddon, setActiveAddon] = useState<string | null>(null);

  // Load state on mount
  useEffect(() => {
    const savedUser = localStorage.getItem('spark_current_user');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
    
    const savedUsers = localStorage.getItem('spark_all_users');
    if (savedUsers) {
      setAllUsers(JSON.parse(savedUsers));
    } else {
      const initialAdmin: User = {
        username: 'spark',
        displayName: 'Spark Staff',
        email: 'sparkstaff@gmail.com',
        balance: 999999,
        isAdmin: true,
        vouchers: [],
        messages: []
      };
      setAllUsers([initialAdmin]);
      localStorage.setItem('spark_all_users', JSON.stringify([initialAdmin]));
    }
    
    const bannerStatus = localStorage.getItem('spark_banner_hidden');
    if (bannerStatus === 'true') {
      setShowBanner(false);
    }
  }, []);

  const handleUpdateBalance = (email: string, amount: number) => {
    const updatedUsers = allUsers.map(u => {
      if (u.email === email) {
        return { ...u, balance: Math.max(0, u.balance + amount) };
      }
      return u;
    });
    setAllUsers(updatedUsers);
    localStorage.setItem('spark_all_users', JSON.stringify(updatedUsers));

    if (user && user.email === email) {
      const updatedUser = { ...user, balance: Math.max(0, user.balance + amount) };
      setUser(updatedUser);
      localStorage.setItem('spark_current_user', JSON.stringify(updatedUser));
    }
  };

  const handlePurchaseVoucher = (voucher: { name: string, price: number, discount: string }) => {
    if (!user) return;
    if (user.balance < voucher.price) {
      alert("Insufficient Balance!");
      return;
    }

    const revealedCode = DISCOUNT_TO_CODE[voucher.discount] || "UNKNOWN_CODE";
    
    const newMessage: UserMessage = {
      id: Math.random().toString(36).substr(2, 9),
      from: 'Spark',
      content: `CONFIRMED: You purchased a Spark Discount Voucher. Your exclusive activation code is: [ ${revealedCode} ]. Apply this in the Voucher Terminal to activate your ${voucher.discount}.`,
      timestamp: Date.now()
    };

    const updatedVouchers = [...(user.vouchers || []), voucher.discount];
    const updatedMessages = [newMessage, ...(user.messages || [])];
    
    const updatedUser = { 
      ...user, 
      balance: user.balance - voucher.price,
      vouchers: updatedVouchers,
      messages: updatedMessages
    };

    setUser(updatedUser);
    localStorage.setItem('spark_current_user', JSON.stringify(updatedUser));

    const updatedAllUsers = allUsers.map(u => u.email === user.email ? updatedUser : u);
    setAllUsers(updatedAllUsers);
    localStorage.setItem('spark_all_users', JSON.stringify(updatedAllUsers));

    alert(`Purchase Complete! Your secret activation code has been sent to your Spark Messages.`);
  };

  const handleLogin = (newUser: User) => {
    setUser(newUser);
    localStorage.setItem('spark_current_user', JSON.stringify(newUser));
    const exists = allUsers.find(u => u.email === newUser.email);
    if (!exists) {
      const updated = [...allUsers, { ...newUser, vouchers: [], messages: [] }];
      setAllUsers(updated);
      localStorage.setItem('spark_all_users', JSON.stringify(updated));
    }
    setCurrentView(View.HOME);
  };

  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem('spark_current_user');
    setActiveDiscountPercent(0);
    setActiveAddon(null);
    setCurrentView(View.HOME);
  };

  const hideBanner = () => {
    setShowBanner(false);
    localStorage.setItem('spark_banner_hidden', 'true');
  };

  const handleApplyPromo = () => {
    const code = promoCode.toUpperCase().trim();
    if (!code) return;
    
    const discountText = PROMO_CODES[code];
    if (discountText) {
      setPromoMessage(`ACTIVATED: ${discountText}`);
      setPromoError(false);

      // Apply logic
      if (discountText.includes('%')) {
        const percent = parseInt(discountText.match(/\d+/)?.[0] || "0");
        setActiveDiscountPercent(percent);
        setActiveAddon(null);
      } else if (discountText.includes('4GB')) {
        setActiveAddon("4GB FREE ADDON");
        setActiveDiscountPercent(0);
      }
    } else {
      setPromoMessage("INVALID_CODE: TRY AGAIN");
      setPromoError(true);
      setActiveDiscountPercent(0);
      setActiveAddon(null);
    }
    
    setTimeout(() => {
      setPromoMessage(null);
      setPromoError(false);
    }, 4000);
  };

  const renderView = () => {
    const topPaddingClass = showBanner ? "pt-48" : "pt-32";
    
    switch (currentView) {
      case View.HOME:
        return <Home onBrowse={() => setCurrentView(View.PLANS)} onSpecial={() => setCurrentView(View.SPECIALS)} />;
      case View.PLANS:
        return (
          <div className={topPaddingClass}>
            <PlansList 
              plans={STANDARD_PLANS} 
              title="PREMIUM PLANS" 
              activeDiscountPercent={activeDiscountPercent}
              activeAddon={activeAddon}
            />
          </div>
        );
      case View.SPECIALS:
        return (
          <div className={topPaddingClass + " pb-12"}>
            <div className="bg-gradient-to-r from-purple-900 to-pink-900 py-6 text-center mb-12 shadow-2xl">
              <h2 className="text-4xl font-black tracking-tighter italic">🎄 CHRiSTMAS BLiTZ DEALS 🎄</h2>
              <p className="text-sm font-bold opacity-75 uppercase tracking-[0.3em] mt-2">Ends January 1st</p>
            </div>
            <PlansList 
              plans={SPECIAL_PLANS} 
              title="HOLIDAY SPECIALS" 
              isSpecial 
              activeDiscountPercent={activeDiscountPercent}
              activeAddon={activeAddon}
            />
          </div>
        );
      case View.PROFILE:
        return user ? <Profile user={user} onUpdate={(updated) => {
          setUser(updated);
          localStorage.setItem('spark_current_user', JSON.stringify(updated));
          const updatedList = allUsers.map(u => u.email === updated.email ? updated : u);
          setAllUsers(updatedList);
          localStorage.setItem('spark_all_users', JSON.stringify(updatedList));
        }} /> : <Auth onLogin={handleLogin} setView={setCurrentView} allUsers={allUsers} />;
      case View.LOGIN:
      case View.REGISTER:
        return <Auth onLogin={handleLogin} setView={setCurrentView} allUsers={allUsers} isRegister={currentView === View.REGISTER} />;
      case View.ADMIN:
        return user?.isAdmin ? <AdminPanel allUsers={allUsers} onUpdateBalance={handleUpdateBalance} /> : <Home onBrowse={() => setCurrentView(View.PLANS)} onSpecial={() => setCurrentView(View.SPECIALS)} />;
      case View.VOUCHER_SHOP:
        return <VoucherShop user={user} onPurchase={handlePurchaseVoucher} />;
      case View.MESSAGES:
        return <Messages user={user} />;
      default:
        return <Home onBrowse={() => setCurrentView(View.PLANS)} onSpecial={() => setCurrentView(View.SPECIALS)} />;
    }
  };

  return (
    <div className="min-h-screen flex flex-col selection:bg-purple-500 selection:text-white">
      {showBanner && (
        <div className="fixed top-0 left-0 right-0 z-[120] bg-yellow-400 py-3 px-4 shadow-xl border-b border-black/5">
          <div className="max-w-7xl mx-auto flex items-center justify-between gap-4 text-slate-900">
            <div className="flex-grow flex items-center justify-center gap-4 overflow-hidden">
              <div className="flex items-center gap-2 font-black uppercase italic tracking-tighter whitespace-nowrap animate-pulse text-sm">
                <span className="bg-slate-900 text-yellow-400 px-2 py-0.5 rounded text-[10px] font-bold">ALERT</span>
                WANT TO JOIN DISCORD SERVER AND MAKE TICKET TO BUY SERVER?
              </div>
              <a 
                href={DISCORD_LINK} 
                target="_blank" 
                className="bg-slate-900 text-white px-4 py-1.5 rounded-lg text-[10px] font-black uppercase hover:bg-slate-800 transition-colors whitespace-nowrap shadow-md"
              >
                JOIN DISCORD NOW
              </a>
            </div>
            <button 
              onClick={hideBanner}
              className="p-1 hover:bg-slate-900/10 rounded-full transition-colors"
              aria-label="Close banner"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>
      )}

      <div style={{ paddingTop: showBanner ? '52px' : '0' }} className="transition-[padding] duration-300">
        <Navbar 
          currentView={currentView} 
          setView={setCurrentView} 
          user={user} 
          onLogout={handleLogout} 
        />
      </div>
      
      <main className="flex-grow">
        {renderView()}
      </main>

      <div className="fixed bottom-8 right-8 z-[60] w-80">
        <div className={`glass-card p-6 rounded-[2rem] shadow-[0_35px_60px_-15px_rgba(0,0,0,0.6)] border border-white/10 transition-all duration-500 ${promoMessage ? 'scale-105 border-purple-500/50' : ''}`}>
          <div className="flex items-center justify-between mb-4">
            <h4 className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-500">Voucher Terminal</h4>
            <div className={`w-1.5 h-1.5 rounded-full ${promoMessage ? (promoError ? 'bg-red-500 shadow-[0_0_10px_red]' : 'bg-green-500 shadow-[0_0_10px_green]') : 'bg-purple-500 animate-pulse'}`}></div>
          </div>
          
          <div className="relative group">
            <input 
              type="text" 
              placeholder="ENTER_VOUCHER_CODE" 
              className={`w-full bg-slate-950/80 border border-white/5 text-sm font-mono px-4 py-4 rounded-2xl outline-none focus:border-purple-500 transition-all placeholder:opacity-30 ${promoError ? 'border-red-500/50' : ''}`}
              value={promoCode}
              onChange={(e) => setPromoCode(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleApplyPromo()}
            />
            <button 
              onClick={handleApplyPromo}
              className="absolute right-2 top-2 bottom-2 bg-purple-600 hover:bg-purple-500 text-white px-5 rounded-xl font-black text-xs transition-all active:scale-90"
            >
              APPLY
            </button>
          </div>

          {promoMessage && (
            <div className={`mt-4 overflow-hidden animate-in slide-in-from-top duration-300`}>
              <div className={`px-4 py-3 rounded-xl font-mono text-[10px] font-black border ${promoError ? 'bg-red-500/10 border-red-500/30 text-red-400' : 'bg-green-500/10 border-green-500/30 text-green-400'}`}>
                {promoMessage}
              </div>
            </div>
          )}
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default App;
