
import React from 'react';
import { Plan } from '../types.ts';
import { DISCORD_LINK } from '../constants.tsx';

interface PlansListProps {
  plans: Plan[];
  title: string;
  isSpecial?: boolean;
  activeDiscountPercent?: number;
  activeAddon?: string | null;
}

const PlansList: React.FC<PlansListProps> = ({ plans, title, isSpecial, activeDiscountPercent = 0, activeAddon = null }) => {
  
  const calculatePrice = (original: string) => {
    if (original === 'Custom' || isNaN(parseFloat(original))) return original;
    const priceNum = parseFloat(original);
    if (activeDiscountPercent === 0) return priceNum.toFixed(2);
    const discounted = priceNum * (1 - activeDiscountPercent / 100);
    return discounted.toFixed(2);
  };

  return (
    <div className={`px-4 relative ${isSpecial ? 'bg-slate-950 py-12' : 'bg-transparent'}`}>
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-20">
          <h2 className="text-5xl md:text-7xl font-black mb-6 tracking-tighter uppercase italic text-white">{title}</h2>
          <div className="w-24 h-2 bg-gradient-to-r from-purple-600 to-pink-500 mx-auto rounded-full mb-8"></div>
          <p className="text-slate-400 max-w-2xl mx-auto font-medium text-lg leading-relaxed">
            {activeDiscountPercent > 0 ? (
              <span className="text-green-400 font-black animate-pulse">🔥 {activeDiscountPercent}% OFF VOUCHER ACTIVATED! 🔥</span>
            ) : (
              "Experience peak performance with zero compromises. All servers are managed by industry experts."
            )}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {plans.map((plan) => (
            <div 
              key={plan.id} 
              className={`group relative glass-card rounded-[2.5rem] p-10 transition-all duration-500 hover:-translate-y-4 flex flex-col ${isSpecial ? 'hover:border-pink-500/50' : 'hover:border-purple-500/50'}`}
            >
              {isSpecial && (
                <div className="absolute -top-4 right-10 bg-gradient-to-r from-pink-500 to-purple-600 text-white px-5 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest shadow-xl">
                  LIMITED TIME
                </div>
              )}
              
              <div className="mb-10">
                <div className="flex items-center gap-3 mb-4">
                  <div className={`w-3 h-3 rounded-full ${isSpecial ? 'bg-pink-500 shadow-[0_0_10px_rgba(236,72,153,0.5)]' : 'bg-purple-500 shadow-[0_0_10px_rgba(168,85,247,0.5)]'}`}></div>
                  <h3 className="text-sm font-black text-slate-500 uppercase tracking-[0.2em]">{plan.name}</h3>
                </div>
                <div className="flex flex-col">
                  {activeDiscountPercent > 0 && plan.price.usd !== 'Custom' && (
                    <span className="text-sm font-black text-red-500/50 line-through tracking-tighter decoration-2 decoration-red-500/30 mb-[-4px]">
                      ${parseFloat(plan.price.usd).toFixed(2)}
                    </span>
                  )}
                  <div className="flex items-baseline gap-2">
                    <span className={`text-6xl font-black tracking-tighter ${activeDiscountPercent > 0 ? 'text-green-400' : 'text-white'}`}>
                      {plan.price.usd === 'Custom' ? '???' : `$${calculatePrice(plan.price.usd)}`}
                    </span>
                    <span className="text-slate-500 font-black text-sm uppercase">/Mo</span>
                  </div>
                </div>
                <div className="mt-6 flex flex-wrap gap-4 text-[10px] font-mono font-black uppercase text-slate-500">
                  <span className={`px-2 py-1 bg-slate-950 rounded-lg ${activeDiscountPercent > 0 ? 'text-green-400' : ''}`}>
                    {calculatePrice(plan.price.tk)} BDT
                  </span>
                  <span className={`px-2 py-1 bg-slate-950 rounded-lg ${activeDiscountPercent > 0 ? 'text-green-400' : ''}`}>
                    {calculatePrice(plan.price.inr)} INR
                  </span>
                  {plan.price.pkr && (
                    <span className={`px-2 py-1 bg-slate-950 rounded-lg ${activeDiscountPercent > 0 ? 'text-green-400' : ''}`}>
                      {calculatePrice(plan.price.pkr)} PKR
                    </span>
                  )}
                </div>
              </div>

              <div className="space-y-4 mb-12 flex-grow">
                <div className="p-4 rounded-3xl bg-slate-950/50 border border-white/5 group-hover:border-white/10 transition-colors">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Memory</span>
                    <div className="text-right">
                       <span className="text-lg font-black text-white">{plan.ram}</span>
                       {activeAddon && <p className="text-[10px] text-green-400 font-black">+ 4GB ADDON ACTIVE</p>}
                    </div>
                  </div>
                </div>
                <div className="p-4 rounded-3xl bg-slate-950/50 border border-white/5 group-hover:border-white/10 transition-colors">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Processor</span>
                    <span className="text-lg font-black text-white italic">{plan.cpu}</span>
                  </div>
                </div>
                <div className="p-4 rounded-3xl bg-slate-950/50 border border-white/5 group-hover:border-white/10 transition-colors">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Storage</span>
                    <span className="text-lg font-black text-white">{plan.disk}</span>
                  </div>
                </div>
              </div>

              <a 
                href={DISCORD_LINK}
                target="_blank"
                className={`w-full py-5 rounded-2xl font-black text-lg text-center transition-all shadow-2xl active:scale-95 ${isSpecial ? 'bg-gradient-to-r from-pink-600 to-purple-600 text-white shadow-pink-500/20 hover:shadow-pink-500/40' : 'bg-white text-slate-950 hover:bg-purple-600 hover:text-white shadow-white/5 hover:shadow-purple-500/30'}`}
              >
                DEPLOY NOW
              </a>
              <p className="mt-5 text-[10px] text-center text-slate-500 font-black uppercase tracking-[0.3em]">
                OPEN TiCKET ON DiSCORD
              </p>
            </div>
          ))}
        </div>

        <div className="mt-24 text-center">
          <div className="inline-flex items-center gap-4 px-8 py-4 bg-slate-950/80 rounded-[2rem] border border-white/10 text-xs font-black uppercase tracking-widest">
            <span className="w-2 h-2 bg-purple-500 rounded-full animate-pulse shadow-[0_0_10px_purple]"></span>
            Enterprise-Grade DDOS Shield Active
          </div>
        </div>
      </div>
    </div>
  );
};

export default PlansList;
