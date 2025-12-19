
import React, { useState } from 'react';
import { User } from '../types';
import { DISCORD_LINK } from '../constants.tsx';

interface ProfileProps {
  user: User;
  onUpdate: (u: User) => void;
}

const Profile: React.FC<ProfileProps> = ({ user, onUpdate }) => {
  const [editing, setEditing] = useState(false);
  const [formData, setFormData] = useState({
    displayName: user.displayName,
    email: user.email,
    profilePic: user.profilePic || ''
  });

  const handleSave = () => {
    const updated = { ...user, ...formData };
    onUpdate(updated);
    localStorage.setItem('spark_current_user', JSON.stringify(updated));
    setEditing(false);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData({ ...formData, profilePic: reader.result as string });
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="pt-40 pb-24 px-4 bg-slate-950 min-h-screen">
      <div className="max-w-6xl mx-auto">
        <div className="bg-slate-900 rounded-[2.5rem] border border-white/5 overflow-hidden shadow-2xl">
          <div className="h-40 bg-gradient-to-r from-purple-600 via-pink-600 to-indigo-600"></div>
          <div className="px-10 pb-10 -mt-20">
            <div className="flex flex-col md:flex-row items-end gap-8 mb-12">
              <div className="relative group">
                <div className="w-40 h-40 rounded-3xl bg-slate-800 border-8 border-slate-900 overflow-hidden shadow-2xl relative">
                  {formData.profilePic ? (
                    <img src={formData.profilePic} className="w-full h-full object-cover" />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-5xl font-black text-slate-600">
                      {user.username[0].toUpperCase()}
                    </div>
                  )}
                  {editing && (
                    <label className="absolute inset-0 bg-black/70 flex items-center justify-center cursor-pointer opacity-0 group-hover:opacity-100 transition-opacity">
                      <input type="file" className="hidden" accept="image/*" onChange={handleFileChange} />
                      <span className="text-[10px] font-black text-white uppercase tracking-widest">Change Photo</span>
                    </label>
                  )}
                </div>
              </div>
              <div className="flex-grow pb-4">
                <div className="flex items-center gap-3">
                  <h1 className="text-4xl font-black text-white italic tracking-tighter uppercase">{user.displayName}</h1>
                  {user.isAdmin && <span className="bg-purple-600 text-white text-[8px] font-black px-2 py-0.5 rounded uppercase tracking-widest">STAFF</span>}
                </div>
                <p className="text-slate-500 font-mono text-sm mt-1">@{user.username}</p>
              </div>
              <div className="flex gap-4">
                 <button 
                  onClick={() => editing ? handleSave() : setEditing(true)}
                  className={`px-8 py-3 rounded-2xl font-black text-xs uppercase tracking-widest transition-all ${editing ? 'bg-green-500 text-slate-950 shadow-lg shadow-green-500/20' : 'bg-slate-800 text-white border border-white/10 hover:bg-slate-700'}`}
                >
                  {editing ? 'SAVE_CHANGES' : 'EDiT_PROFiLE'}
                </button>
              </div>
            </div>

            <div className="grid lg:grid-cols-12 gap-8">
              <div className="lg:col-span-8 space-y-8">
                <div className="glass-card p-8 rounded-[2rem] border border-white/5">
                  <div className="flex items-center justify-between mb-8">
                    <h3 className="text-sm font-black text-slate-500 uppercase tracking-widest">Recent Activity</h3>
                    <div className="flex items-center gap-2">
                       <span className="w-2 h-2 rounded-full bg-blue-500"></span>
                       <span className="text-[10px] font-black text-blue-400 uppercase tracking-widest">Secure Ledger</span>
                    </div>
                  </div>
                  
                  <div className="space-y-4">
                    {user.messages && user.messages.length > 0 ? (
                      <div className="p-6 rounded-2xl bg-slate-950/50 border border-white/5">
                        <p className="text-slate-400 text-sm italic font-medium mb-4">
                          "You have {user.messages.length} system messages waiting in your Spark Inbox."
                        </p>
                        <button className="text-[10px] font-black bg-blue-600 text-white px-5 py-2 rounded-xl uppercase tracking-widest hover:bg-blue-500 transition-all">
                          View All Messages
                        </button>
                      </div>
                    ) : (
                      <div className="py-12 text-center opacity-30">
                        <p className="text-sm font-black uppercase tracking-widest italic">No recent system logs</p>
                      </div>
                    )}
                  </div>
                </div>

                <div className="glass-card p-8 rounded-[2rem] border border-white/5">
                  <h3 className="text-xs font-black text-slate-500 uppercase tracking-widest mb-6">Active Discounts History</h3>
                  <div className="grid gap-4">
                    {user.vouchers && user.vouchers.length > 0 ? (
                      user.vouchers.map((v, i) => (
                        <div key={i} className="flex items-center justify-between p-5 rounded-2xl bg-slate-950/50 border border-purple-500/10 group hover:border-purple-500/30 transition-all">
                          <div className="flex items-center gap-4">
                            <div className="w-10 h-10 rounded-xl bg-purple-500/10 flex items-center justify-center">
                              <svg className="w-5 h-5 text-purple-400" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M17.707 9.293a1 1 0 010 1.414l-7 7a1 1 0 01-1.414 0l-7-7A.997.997 0 012 10V5a3 3 0 013-3h5c.256 0 .512.098.707.293l7 7zM5 6a1 1 0 100-2 1 1 0 000 2z" clipRule="evenodd" /></svg>
                            </div>
                            <div>
                              <p className="font-black text-white italic text-lg">{v}</p>
                              <p className="text-[10px] text-slate-500 uppercase font-black tracking-widest">CLAIMED REVEAL</p>
                            </div>
                          </div>
                          <span className="text-[10px] font-black text-green-400 bg-green-500/10 px-3 py-1 rounded-lg uppercase">REDEEMABLE</span>
                        </div>
                      ))
                    ) : (
                      <div className="text-center py-8 px-4 border border-dashed border-white/10 rounded-2xl opacity-50">
                        <p className="text-slate-500 text-xs font-bold uppercase">No discounts claimed yet</p>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              <div className="lg:col-span-4 space-y-6">
                <div className="glass-card p-8 rounded-[2rem] border border-purple-500/20 bg-gradient-to-br from-purple-900/10 to-transparent">
                  <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-2">Available Balance</p>
                  <p className="text-4xl font-black text-white italic">${user.balance.toFixed(2)}</p>
                  <a 
                    href={DISCORD_LINK} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="block text-center w-full mt-6 py-3 bg-white text-slate-950 rounded-xl font-black text-xs uppercase tracking-widest hover:bg-purple-500 hover:text-white transition-all shadow-lg"
                  >
                    Top Up via Discord
                  </a>
                  <p className="mt-4 text-[9px] text-slate-500 font-bold text-center uppercase tracking-tighter">Open a ticket to add funds</p>
                </div>

                <div className="glass-card p-8 rounded-[2rem] border border-white/5 space-y-6">
                   <h3 className="text-xs font-black text-slate-500 uppercase tracking-widest">Account Settings</h3>
                   <div className="space-y-4">
                      <div className="space-y-2">
                        <label className="text-[9px] font-black text-slate-500 uppercase tracking-widest px-1">Display Name</label>
                        <input 
                          type="text" 
                          readOnly={!editing}
                          value={formData.displayName}
                          onChange={(e) => setFormData({ ...formData, displayName: e.target.value })}
                          className={`w-full bg-slate-950/50 border border-white/5 rounded-xl px-4 py-3 outline-none transition-all text-sm font-bold ${editing ? 'focus:border-purple-500 ring-1 ring-purple-500/30' : 'opacity-60 cursor-default'}`}
                        />
                      </div>
                      <div className="space-y-2">
                        <label className="text-[9px] font-black text-slate-500 uppercase tracking-widest px-1">Email Access</label>
                        <input 
                          type="email" 
                          readOnly={!editing}
                          value={formData.email}
                          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                          className={`w-full bg-slate-950/50 border border-white/5 rounded-xl px-4 py-3 outline-none transition-all text-sm font-bold ${editing ? 'focus:border-purple-500 ring-1 ring-purple-500/30' : 'opacity-60 cursor-default'}`}
                        />
                      </div>
                   </div>
                </div>

                <div className="glass-card p-8 rounded-[2rem] border border-white/5">
                  <h3 className="text-xs font-black text-slate-500 uppercase tracking-widest mb-4">Support Hub</h3>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center py-2 border-b border-white/5">
                      <span className="text-xs text-slate-500">Active Servers</span>
                      <span className="text-sm font-black text-white">0</span>
                    </div>
                    <div className="flex justify-between items-center py-2 border-b border-white/5">
                      <span className="text-xs text-slate-500">Tickets Opened</span>
                      <span className="text-sm font-black text-white">0</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
