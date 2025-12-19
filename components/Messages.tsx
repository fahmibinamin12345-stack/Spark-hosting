
import React from 'react';
import { User } from '../types';

interface MessagesProps {
  user: User | null;
}

const Messages: React.FC<MessagesProps> = ({ user }) => {
  if (!user) {
    return (
      <div className="pt-40 pb-24 px-4 text-center">
        <h2 className="text-3xl font-black text-white mb-4 italic uppercase tracking-tighter">Access Denied</h2>
        <p className="text-slate-400 font-bold uppercase text-xs tracking-widest">Login to view your Spark Inbox</p>
      </div>
    );
  }

  const messages = user.messages || [];

  return (
    <div className="pt-40 pb-24 px-4 bg-slate-950 min-h-screen">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center justify-between mb-12">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 bg-gradient-to-tr from-blue-600 to-purple-600 rounded-2xl flex items-center justify-center shadow-lg shadow-blue-500/20">
              <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
              </svg>
            </div>
            <div>
              <h1 className="text-4xl font-black text-white italic uppercase tracking-tighter">Spark Inbox</h1>
              <p className="text-slate-500 font-mono text-xs uppercase tracking-widest">System alerts and revealed voucher codes</p>
            </div>
          </div>
          <div className="hidden md:block">
            <span className="px-4 py-2 bg-blue-500/10 border border-blue-500/20 rounded-xl text-[10px] font-black text-blue-400 uppercase tracking-widest">
              {messages.length} Message{messages.length !== 1 ? 's' : ''}
            </span>
          </div>
        </div>

        <div className="space-y-6">
          {messages.length > 0 ? (
            messages.map((msg) => (
              <div key={msg.id} className="glass-card p-8 rounded-[2.5rem] border border-white/5 hover:border-blue-500/30 transition-all duration-500 group relative overflow-hidden">
                <div className="absolute top-0 right-0 p-8 opacity-[0.03] group-hover:opacity-[0.07] transition-opacity">
                  <svg className="w-24 h-24 text-white" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" /></svg>
                </div>
                <div className="relative z-10">
                  <div className="flex justify-between items-start mb-4">
                    <div className="flex items-center gap-3">
                      <span className="w-2 h-2 rounded-full bg-blue-500 shadow-[0_0_8px_rgba(59,130,246,0.5)]"></span>
                      <span className="text-[10px] font-black bg-slate-900 text-slate-300 px-3 py-1 rounded-lg border border-white/5 uppercase tracking-widest">
                        FROM: {msg.from}
                      </span>
                    </div>
                    <span className="text-[10px] text-slate-500 font-mono">
                      {new Date(msg.timestamp).toLocaleString()}
                    </span>
                  </div>
                  <div className="bg-slate-950/40 p-6 rounded-2xl border border-white/5 group-hover:border-blue-500/10 transition-colors">
                    <p className="text-slate-200 text-base leading-relaxed font-medium">
                      {msg.content}
                    </p>
                  </div>
                  <div className="mt-4 flex items-center gap-2">
                    <button className="text-[10px] font-black text-blue-400 uppercase tracking-widest hover:text-white transition-colors">
                      Mark as Read
                    </button>
                    <span className="text-slate-800">•</span>
                    <button 
                      onClick={() => {
                        const codeMatch = msg.content.match(/\[ (.*?) \]/);
                        if (codeMatch && codeMatch[1]) {
                          navigator.clipboard.writeText(codeMatch[1]);
                          alert("Voucher code copied to clipboard!");
                        }
                      }}
                      className="text-[10px] font-black text-slate-500 uppercase tracking-widest hover:text-white transition-colors"
                    >
                      Copy Secret Code
                    </button>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="glass-card py-24 rounded-[3rem] border border-dashed border-white/10 text-center">
              <div className="w-20 h-20 bg-slate-900 rounded-3xl flex items-center justify-center mx-auto mb-6 opacity-20">
                 <svg className="w-10 h-10 text-slate-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                 </svg>
              </div>
              <p className="text-slate-500 font-black uppercase tracking-[0.3em] italic">Your inbox is empty</p>
              <p className="text-slate-600 text-xs mt-2 uppercase tracking-widest">Codes from purchased vouchers will appear here</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Messages;
