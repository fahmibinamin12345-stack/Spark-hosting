
import React, { useState } from 'react';
import { User } from '../types';

interface AdminPanelProps {
  allUsers: User[];
  onUpdateBalance: (email: string, amount: number) => void;
}

const AdminPanel: React.FC<AdminPanelProps> = ({ allUsers, onUpdateBalance }) => {
  const [amounts, setAmounts] = useState<{ [key: string]: string }>({});

  const handleAmountChange = (email: string, value: string) => {
    setAmounts(prev => ({ ...prev, [email]: value }));
  };

  const handleApply = (email: string) => {
    const amount = parseFloat(amounts[email] || '0');
    if (!isNaN(amount)) {
      onUpdateBalance(email, amount);
      setAmounts(prev => ({ ...prev, [email]: '' }));
      alert(`Successfully updated balance for ${email}`);
    }
  };

  return (
    <div className="pt-40 pb-24 px-4 bg-slate-950 min-h-screen">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center gap-4 mb-10">
          <div className="w-12 h-12 bg-purple-600 rounded-2xl flex items-center justify-center shadow-lg shadow-purple-500/20">
            <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
          </div>
          <div>
            <h1 className="text-4xl font-black text-white italic uppercase tracking-tighter">Staff Terminal</h1>
            <p className="text-slate-500 font-mono text-xs uppercase tracking-widest">Management System v1.0.4</p>
          </div>
        </div>

        <div className="glass-card rounded-[2.5rem] overflow-hidden border border-white/5 shadow-2xl">
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="bg-slate-900/50 border-b border-white/5 font-black uppercase text-[10px] tracking-[0.2em] text-slate-500">
                  <th className="px-8 py-6">User / Display Name</th>
                  <th className="px-8 py-6">Email</th>
                  <th className="px-8 py-6">Current Balance</th>
                  <th className="px-8 py-6">Adjust Balance</th>
                  <th className="px-8 py-6 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {allUsers.length === 0 ? (
                  <tr>
                    <td colSpan={5} className="px-8 py-12 text-center text-slate-500 italic">No registered users found in database.</td>
                  </tr>
                ) : (
                  allUsers.map((user) => (
                    <tr key={user.email} className="hover:bg-white/5 transition-colors group">
                      <td className="px-8 py-6">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-xl bg-slate-800 flex items-center justify-center font-black text-purple-400 border border-white/5">
                            {user.displayName[0].toUpperCase()}
                          </div>
                          <div>
                            <p className="font-bold text-white leading-none mb-1">{user.displayName}</p>
                            <p className="text-xs text-slate-500 font-mono">@{user.username}</p>
                          </div>
                          {user.isAdmin && <span className="bg-purple-600/20 text-purple-400 text-[8px] font-black px-1.5 py-0.5 rounded uppercase border border-purple-500/30">STAFF</span>}
                        </div>
                      </td>
                      <td className="px-8 py-6 text-sm text-slate-400 font-mono">{user.email}</td>
                      <td className="px-8 py-6 font-black text-white text-lg italic">${user.balance.toFixed(2)}</td>
                      <td className="px-8 py-6">
                        <input 
                          type="number" 
                          step="0.01"
                          placeholder="+/- Amount"
                          className="w-32 bg-slate-950 border border-white/10 rounded-xl px-4 py-2 text-sm font-mono focus:border-purple-500 outline-none transition-all"
                          value={amounts[user.email] || ''}
                          onChange={(e) => handleAmountChange(user.email, e.target.value)}
                        />
                      </td>
                      <td className="px-8 py-6 text-right">
                        <button 
                          onClick={() => handleApply(user.email)}
                          className="bg-white text-slate-950 hover:bg-purple-600 hover:text-white px-6 py-2 rounded-xl text-xs font-black uppercase transition-all active:scale-95"
                        >
                          APPLY
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>

        <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="glass-card p-6 rounded-3xl border border-white/5">
            <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-2">Total Users</p>
            <p className="text-4xl font-black italic text-white">{allUsers.length}</p>
          </div>
          <div className="glass-card p-6 rounded-3xl border border-white/5">
            <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-2">System Status</p>
            <p className="text-xl font-black italic text-green-400 uppercase tracking-tighter">OPERATIONAL</p>
          </div>
          <div className="glass-card p-6 rounded-3xl border border-purple-500/20 bg-purple-600/5">
            <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-2">Staff Note</p>
            <p className="text-sm text-slate-400">Balance adjustments are recorded in the global ledger. Use caution when adding funds.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminPanel;
