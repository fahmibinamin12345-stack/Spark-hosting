
import React from 'react';
import { VOUCHER_PRICES, DISCORD_LINK } from '../constants.tsx';
import { User } from '../types.ts';

interface VoucherShopProps {
  user: User | null;
  onPurchase: (voucher: { name: string, price: number, discount: string }) => void;
}

const VoucherShop: React.FC<VoucherShopProps> = ({ user, onPurchase }) => {
  if (!user) {
    return (
      <div className="pt-40 pb-24 px-4 text-center">
        <h2 className="text-3xl font-black text-white mb-4 italic uppercase tracking-tighter">Identity Required</h2>
        <p className="text-slate-400 font-bold uppercase text-xs tracking-widest">Login to access Spark secret marketplace</p>
      </div>
    );
  }

  return (
    <div className="pt-40 pb-24 px-4 bg-slate-950 min-h-screen">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-center gap-6 mb-12">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 bg-gradient-to-tr from-purple-600 to-pink-500 rounded-2xl flex items-center justify-center shadow-lg shadow-purple-500/20">
              <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 5v2m0 4v2m0 4v2M5 5a2 2 0 00-2 2v3a2 2 0 110 4v3a2 2 0 002 2h14a2 2 0 002-2v-3a2 2 0 110-4V7a2 2 0 00-2-2H5z" />
              </svg>
            </div>
            <div>
              <h1 className="text-4xl font-black text-white italic uppercase tracking-tighter">Voucher Shop</h1>
              <p className="text-slate-500 font-mono text-xs uppercase tracking-widest">Exclusive mystery discounts for your hosting</p>
            </div>
          </div>
          <div className="md:ml-auto flex items-center gap-4">
            <div className="glass-card px-6 py-3 rounded-2xl border border-purple-500/20 text-right">
              <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-1">Your Balance</p>
              <p className="text-2xl font-black text-white italic">${user.balance.toFixed(2)}</p>
            </div>
            <a 
              href={DISCORD_LINK}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-purple-600/10 hover:bg-purple-600/20 text-purple-400 border border-purple-500/30 px-5 py-3 rounded-2xl text-[10px] font-black uppercase tracking-widest transition-all"
            >
              Recharge Balance
            </a>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {VOUCHER_PRICES.map((voucher, idx) => (
            <div key={idx} className="glass-card group p-8 rounded-[2rem] border border-white/5 hover:border-purple-500/30 transition-all duration-500 flex flex-col">
              <div className="mb-6">
                <div className="flex justify-between items-start mb-4">
                   <h3 className="text-xl font-black text-white italic uppercase tracking-tighter">Spark Discount</h3>
                   <span className="bg-slate-900 text-purple-400 text-[8px] font-black px-2 py-1 rounded border border-white/5 uppercase tracking-widest">Voucher #{idx+1}</span>
                </div>
                
                <div className="flex items-center gap-2 text-purple-400 font-black text-2xl tracking-tighter uppercase mb-2 italic">
                  {voucher.discount.split(' ')[0]} 
                </div>
                <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-6">Activation code revealed after purchase</p>
                <div className="h-1 w-12 bg-purple-500/20 rounded-full group-hover:w-20 transition-all duration-500"></div>
              </div>

              <div className="mt-auto pt-6 flex flex-col gap-4">
                <div className="flex justify-between items-center text-xs font-black text-slate-500 uppercase tracking-[0.2em]">
                  <span>Voucher Price</span>
                  <span className="text-white text-lg">${voucher.price.toFixed(2)}</span>
                </div>
                <button 
                  onClick={() => onPurchase(voucher)}
                  disabled={user.balance < voucher.price}
                  className={`w-full py-4 rounded-xl font-black text-sm transition-all shadow-xl active:scale-95 ${
                    user.balance >= voucher.price 
                    ? 'bg-purple-600 hover:bg-purple-500 text-white shadow-purple-500/20' 
                    : 'bg-slate-800 text-slate-500 cursor-not-allowed border border-white/5'
                  }`}
                >
                  {user.balance >= voucher.price ? 'UNVEIL CODE' : 'iNSUFFICiENT BALANCE'}
                </button>
                {user.balance < voucher.price && (
                  <p className="text-[9px] text-center text-slate-500 font-bold uppercase tracking-widest mt-2">
                    Open Discord ticket to top up
                  </p>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default VoucherShop;
