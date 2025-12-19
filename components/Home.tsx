
import React from 'react';
import { DISCORD_LINK } from '../constants.tsx';

interface HomeProps {
  onBrowse: () => void;
  onSpecial: () => void;
}

const Home: React.FC<HomeProps> = ({ onBrowse, onSpecial }) => {
  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center minecraft-bg overflow-hidden px-4">
        <div className="absolute inset-0 bg-grid-white/[0.03] bg-[size:30px_30px]"></div>
        <div className="relative z-10 text-center max-w-5xl mx-auto">
          <div className="inline-block px-5 py-2 rounded-2xl bg-white/5 border border-white/10 text-purple-400 text-xs font-black uppercase tracking-widest mb-8 animate-float">
            ⚡ Powered by Ryzen High-Performance CPUs
          </div>
          <h1 className="text-6xl md:text-9xl font-black text-white leading-[0.9] mb-10 tracking-tighter">
            SPARK <br/>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-500 via-pink-500 to-blue-500 italic">LIMITLESS</span>
          </h1>
          <p className="text-xl md:text-2xl text-slate-400 mb-12 max-w-3xl mx-auto leading-relaxed font-medium">
            Stop lagging. Start winning. Spark Hosting gives you the raw power needed to scale your Minecraft community with zero compromises.
          </p>
          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <button 
              onClick={onBrowse}
              className="px-12 py-6 bg-white text-slate-950 rounded-2xl font-black text-xl shadow-2xl hover:bg-purple-500 hover:text-white transform transition-all hover:-translate-y-1 active:scale-95"
            >
              EXPLORE PLANS
            </button>
            <a 
              href={DISCORD_LINK} 
              target="_blank" 
              className="px-12 py-6 bg-slate-900/50 backdrop-blur-xl text-white rounded-2xl font-black text-xl border border-white/10 hover:border-pink-500/50 transform transition-all hover:-translate-y-1 flex items-center justify-center gap-3"
            >
              DISCORD COMMUNITY
            </a>
          </div>
          
          <div className="mt-24 grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto">
            <div className="glass-card p-6 rounded-3xl group hover:border-purple-500/30 transition-all">
              <div className="w-12 h-12 bg-purple-500/20 rounded-2xl flex items-center justify-center mb-4 mx-auto group-hover:scale-110 transition-transform">
                <svg className="w-6 h-6 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>
              </div>
              <h3 className="text-2xl font-black text-white">99.9%</h3>
              <p className="text-[10px] text-slate-500 font-black uppercase tracking-widest">Global Uptime</p>
            </div>
            <div className="glass-card p-6 rounded-3xl group hover:border-pink-500/30 transition-all">
              <div className="w-12 h-12 bg-pink-500/20 rounded-2xl flex items-center justify-center mb-4 mx-auto group-hover:scale-110 transition-transform">
                <svg className="w-6 h-6 text-pink-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" /></svg>
              </div>
              <h3 className="text-2xl font-black text-white">DDoS</h3>
              <p className="text-[10px] text-slate-500 font-black uppercase tracking-widest">Enterprise Guard</p>
            </div>
            <div className="glass-card p-6 rounded-3xl group hover:border-blue-500/30 transition-all">
              <div className="w-12 h-12 bg-blue-500/20 rounded-2xl flex items-center justify-center mb-4 mx-auto group-hover:scale-110 transition-transform">
                <svg className="w-6 h-6 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-7.714 2.143L11 21l-2.286-6.857L1 12l7.714-2.143L11 3z" /></svg>
              </div>
              <h3 className="text-2xl font-black text-white">RYZEN</h3>
              <p className="text-[10px] text-slate-500 font-black uppercase tracking-widest">Next-Gen Cores</p>
            </div>
            <div className="glass-card p-6 rounded-3xl group hover:border-green-500/30 transition-all">
              <div className="w-12 h-12 bg-green-500/20 rounded-2xl flex items-center justify-center mb-4 mx-auto group-hover:scale-110 transition-transform">
                <svg className="w-6 h-6 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z" /></svg>
              </div>
              <h3 className="text-2xl font-black text-white">24/7</h3>
              <p className="text-[10px] text-slate-500 font-black uppercase tracking-widest">Expert Help</p>
            </div>
          </div>
        </div>
      </section>

      {/* Holiday Promo Section */}
      <section className="py-32 bg-slate-950 px-4">
        <div className="max-w-7xl mx-auto bg-gradient-to-br from-purple-900/30 to-slate-900 border border-white/5 rounded-[40px] p-8 md:p-16 relative overflow-hidden shadow-2xl">
          <div className="absolute top-0 right-0 p-12 opacity-5 pointer-events-none">
            <svg className="w-96 h-96 text-white" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" /></svg>
          </div>
          <div className="relative z-10 grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <div className="inline-block px-4 py-1 rounded-full bg-pink-500 text-white text-[10px] font-black uppercase tracking-widest mb-6">XMAS EVENT</div>
              <h2 className="text-5xl md:text-7xl font-black mb-6 leading-tight">CHRiSTMAS <br/><span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-400 to-purple-400 italic">BLiTZ DEALS!</span></h2>
              <p className="text-slate-300 text-lg mb-10 leading-relaxed font-medium">Claim top-tier Ryzen nodes at liquidation prices. Starting as low as <span className="text-pink-400 font-bold">$0.41/mo</span>. This event is exclusive and won't return.</p>
              <button 
                onClick={onSpecial}
                className="bg-gradient-to-r from-purple-600 to-pink-600 text-white px-10 py-5 rounded-2xl font-black text-xl shadow-xl hover:shadow-pink-500/20 transition-all hover:-translate-y-1 active:scale-95"
              >
                UNWRAP OFFERS
              </button>
            </div>
            <div className="bg-slate-950/80 p-8 rounded-3xl border border-white/10 font-mono text-sm shadow-inner group transition-all hover:border-pink-500/20">
              <div className="flex items-center justify-between mb-8 pb-4 border-b border-white/5">
                <p className="text-pink-400 font-black">// EVENT_LIVE_NOW</p>
                <div className="flex gap-2">
                  <div className="w-2 h-2 rounded-full bg-red-500 animate-pulse"></div>
                  <div className="w-2 h-2 rounded-full bg-green-500"></div>
                </div>
              </div>
              <div className="space-y-4">
                <div className="flex justify-between items-center group/row">
                  <p className="text-slate-500">Plan 1: 2GB RAM / 20GB SSD</p>
                  <span className="text-white font-black group-hover/row:text-pink-400 transition-colors">$0.41/mo</span>
                </div>
                <div className="flex justify-between items-center group/row">
                  <p className="text-slate-500">Plan 2: 4GB RAM / 40GB SSD</p>
                  <span className="text-white font-black group-hover/row:text-pink-400 transition-colors">$0.82/mo</span>
                </div>
                <div className="flex justify-between items-center group/row">
                  <p className="text-slate-500">Plan 3: 6GB RAM / 60GB SSD</p>
                  <span className="text-white font-black group-hover/row:text-pink-400 transition-colors">$1.15/mo</span>
                </div>
                <div className="flex justify-between items-center group/row">
                  <p className="text-slate-500">Plan 4: 8GB RAM / 80GB SSD</p>
                  <span className="text-white font-black group-hover/row:text-pink-400 transition-colors">$1.47/mo</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
