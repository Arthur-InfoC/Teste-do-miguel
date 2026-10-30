import './index.scss'

import React, { useState, useEffect } from 'react';

export default function Teste() {
  const [count, setCount] = useState(0);
  const [step, setStep] = useState(1);
  const [history, setHistory] = useState([]);
  const [theme, setTheme] = useState('purple');
  const [animateKey, setAnimateKey] = useState(0);

  const themes = {
    purple: {
      bg: 'from-indigo-900 via-purple-900 to-slate-900',
      card: 'bg-white/10 border-white/20 text-white',
      primary: 'bg-gradient-to-r from-purple-500 to-indigo-600 hover:from-purple-600 hover:to-indigo-700 shadow-purple-500/30',
      accent: 'text-purple-400',
      badge: 'bg-purple-500/20 text-purple-300 border-purple-500/30'
    },
    emerald: {
      bg: 'from-slate-900 via-emerald-950 to-teal-900',
      card: 'bg-white/10 border-white/20 text-white',
      primary: 'bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 shadow-emerald-500/30',
      accent: 'text-emerald-400',
      badge: 'bg-emerald-500/20 text-emerald-300 border-emerald-500/30'
    },
    sunset: {
      bg: 'from-rose-950 via-orange-950 to-slate-900',
      card: 'bg-white/10 border-white/20 text-white',
      primary: 'bg-gradient-to-r from-rose-500 to-orange-600 hover:from-rose-600 hover:to-orange-700 shadow-rose-500/30',
      accent: 'text-orange-400',
      badge: 'bg-orange-500/20 text-orange-300 border-orange-500/30'
    }
  };

  const currentTheme = themes[theme];

  const handleUpdate = (amount, type) => {
    const newCount = count + amount;
    setCount(newCount);
    setAnimateKey(prev => prev + 1);

    const timeString = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' });
    const actionDesc = type === 'reset' ? 'Reset to 0' : `${amount > 0 ? '+' : ''}${amount}`;
    
    setHistory(prev => [
      { id: Date.now(), text: actionDesc, value: newCount, time: timeString, type },
      ...prev.slice(0, 9) // keep last 10 entries
    ]);
  };

  return (
    <div className={`min-h-screen bg-gradient-to-br ${currentTheme.bg} flex items-center justify-center p-4 sm:p-6 transition-all duration-700 font-sans`}>
      <div className="w-full max-w-md mx-auto space-y-6">
        
        {/* Header and Theme Selector */}
        <div className="flex items-center justify-between bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-4 shadow-xl">
          <div>
            <h1 className="text-xl font-black text-white tracking-wider flex items-center gap-2">
              <span className="inline-block w-3 h-3 rounded-full animate-pulse bg-emerald-400"></span>
              PULSE COUNT
            </h1>
            <p className="text-xs text-white/60">Sleek interactive counter</p>
          </div>
          <div className="flex gap-2">
            {Object.keys(themes).map((t) => (
              <button
                key={t}
                onClick={() => setTheme(t)}
                className={`w-7 h-7 rounded-full border-2 transition-all ${
                  theme === t ? 'scale-110 border-white shadow-lg' : 'border-transparent opacity-60 hover:opacity-100'
                } ${t === 'purple' ? 'bg-purple-600' : t === 'emerald' ? 'bg-emerald-600' : 'bg-orange-600'}`}
                title={`Switch to ${t} theme`}
              />
            ))}
          </div>
        </div>

        {/* Main Counter Card */}
        <div className="bg-white/10 backdrop-blur-2xl border border-white/20 rounded-3xl p-6 sm:p-8 shadow-2xl text-center relative overflow-hidden">
          {/* Decorative background glow */}
          <div className="absolute -top-24 -right-24 w-48 h-48 bg-white/5 rounded-full blur-3xl pointer-events-none"></div>

          <div className="text-sm uppercase tracking-widest text-white/50 font-semibold mb-2">Current Count</div>
          
          {/* Animated Counter Display */}
          <div 
            key={animateKey}
            className="text-7xl sm:text-8xl font-black text-white tracking-tight my-4 drop-shadow-[0_10px_10px_rgba(0,0,0,0.3)] animate-bounce-short"
          >
            {count}
          </div>

          {/* Step Controls */}
          <div className="mb-8">
            <span className="text-xs text-white/60 block mb-2 uppercase tracking-wider font-medium">Step Increment</span>
            <div className="flex justify-center gap-2">
              {[1, 5, 10, 25, 50].map((val) => (
                <button
                  key={val}
                  onClick={() => setStep(val)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                    step === val
                      ? 'bg-white text-slate-900 shadow-md scale-105'
                      : 'bg-white/5 text-white/80 hover:bg-white/10 border border-white/10'
                  }`}
                >
                  {val}
                </button>
              ))}
            </div>
          </div>

          {/* Increment / Decrement Buttons */}
          <div className="grid grid-cols-2 gap-4 mb-4">
            <button
              onClick={() => handleUpdate(-step, 'decrement')}
              className="group relative overflow-hidden rounded-2xl bg-white/10 border border-white/20 p-4 text-white font-bold text-2xl hover:bg-red-500/20 hover:border-red-500/40 transition-all duration-300 active:scale-95 shadow-lg flex items-center justify-center gap-2"
            >
              <span className="transform group-hover:scale-125 transition-transform">−</span>
              <span className="text-xs font-normal text-white/70">({step})</span>
            </button>

            <button
              onClick={() => handleUpdate(step, 'increment')}
              className={`group relative overflow-hidden rounded-2xl ${currentTheme.primary} p-4 text-white font-bold text-2xl transition-all duration-300 active:scale-95 shadow-xl flex items-center justify-center gap-2`}
            >
              <span className="transform group-hover:scale-125 transition-transform">+</span>
              <span className="text-xs font-normal text-white/80">({step})</span>
            </button>
          </div>

          {/* Reset Button */}
          <button
            onClick={() => handleUpdate(0 - count, 'reset')}
            className="w-full py-3 rounded-2xl bg-white/5 border border-white/10 text-white/70 hover:text-white hover:bg-white/10 text-sm font-semibold tracking-wide transition-all duration-200 active:scale-98"
          >
            Reset Counter
          </button>
        </div>

        {/* History / Log Card */}
        <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-5 shadow-xl">
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-xs font-bold uppercase tracking-wider text-white/70">Action History</h2>
            {history.length > 0 && (
              <button 
                onClick={() => setHistory([])}
                className="text-[10px] text-white/40 hover:text-white/80 transition-colors uppercase tracking-widest"
              >
                Clear Log
              </button>
            )}
          </div>

          {history.length === 0 ? (
            <div className="text-center py-6 text-xs text-white/40 italic">
              No actions recorded yet. Start counting!
            </div>
          ) : (
            <div className="space-y-2 max-h-40 overflow-y-auto pr-1 custom-scrollbar">
              {history.map((item) => (
                <div 
                  key={item.id}
                  className="flex items-center justify-between bg-white/5 border border-white/5 rounded-xl px-3 py-2 text-xs transition-all hover:bg-white/10"
                >
                  <div className="flex items-center gap-2">
                    <span className={`px-2 py-0.5 rounded-md font-bold text-[10px] ${
                      item.type === 'increment' ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30' :
                      item.type === 'decrement' ? 'bg-rose-500/20 text-rose-300 border border-rose-500/30' :
                      'bg-amber-500/20 text-amber-300 border border-amber-500/30'
                    }`}>
                      {item.text}
                    </span>
                    <span className="text-white/80">Total: <strong className="text-white">{item.value}</strong></span>
                  </div>
                  <span className="text-[10px] text-white/40 font-mono">{item.time}</span>
                </div>
              ))}
            </div>
          )}
        </div>

      </div>

      {/* Tailwind keyframes injection for custom small bounce animation */}
      <style>{`
        @keyframes bounceShort {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-4px); }
        }
        .animate-bounce-short {
          animation: bounceShort 0.2s ease-in-out;
        }
      `}</style>
    </div>
  );
}
