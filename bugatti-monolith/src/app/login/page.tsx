'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Navbar } from '@/components/Navbar';
import { CustomCursor } from '@/components/CustomCursor';
import { ShieldCheck, Lock, ArrowRight } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [status, setStatus] = React.useState<'idle' | 'loading' | 'success' | 'error'>('idle');

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');
    
    setTimeout(() => {
      if (email === 'owner@bugatti.com' && password === 'MOLSHEIM_MONOLITH_2026') {
        setStatus('success');
        setTimeout(() => router.push('/'), 2000);
      } else {
        setStatus('error');
      }
    }, 1500);
  };

  return (
    <main className="relative min-h-screen bg-obsidian text-white selection:bg-bugatti-blue overflow-hidden">
      <CustomCursor />
      <Navbar />
      
      {/* Background Ambience */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-1/4 -left-1/4 w-[80vw] h-[80vw] bg-bugatti-blue/10 rounded-full blur-[120px]" />
        <div className="absolute bottom-1/4 -right-1/4 w-[60vw] h-[60vw] bg-bugatti-blue/5 rounded-full blur-[150px]" />
      </div>

      <div className="relative z-10 flex items-center justify-center min-h-screen p-8">
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="w-full max-w-md backdrop-blur-3xl bg-black/40 border border-white/10 p-12 relative overflow-hidden"
        >
          {/* Top Accent */}
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-blue-600 to-transparent" />
          
          <div className="text-center mb-12">
            <motion.div 
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.2 }}
            >
              <h1 className="font-playfair italic text-4xl mb-4">Owner Access</h1>
              <p className="font-jetbrains text-[9px] tracking-[0.4em] text-white/30 uppercase">Secure Telemetry Uplink</p>
            </motion.div>
          </div>

          <form className="flex flex-col gap-6" onSubmit={handleLogin}>
            <div className="flex flex-col gap-2">
              <label className="font-jetbrains text-[8px] tracking-widest text-white/40 uppercase ml-1">Uplink Identity</label>
              <div className="relative">
                <input 
                  type="email" 
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="OWNER@BUGATTI.COM"
                  className="w-full bg-white/5 border border-white/10 p-4 font-jetbrains text-[10px] tracking-[0.2em] focus:border-blue-600 outline-none transition-all"
                />
              </div>
            </div>

            <div className="flex flex-col gap-2">
              <label className="font-jetbrains text-[8px] tracking-widest text-white/40 uppercase ml-1">Encryption Key</label>
              <div className="relative">
                <input 
                  type="password" 
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••••••"
                  className="w-full bg-white/5 border border-white/10 p-4 font-jetbrains text-[10px] tracking-[0.2em] focus:border-blue-600 outline-none transition-all"
                />
              </div>
            </div>

            {status === 'error' && (
              <p className="text-red-500 font-jetbrains text-[8px] tracking-widest uppercase text-center animate-shake">Invalid Encryption Key // Access Denied</p>
            )}

            {status === 'success' && (
              <p className="text-green-500 font-jetbrains text-[8px] tracking-widest uppercase text-center">Uplink Established // Welcome, Commander</p>
            )}

            <div className="flex justify-between items-center mt-4">
               <div className="flex items-center gap-2 text-white/30 hover:text-white transition-colors cursor-pointer">
                  <ShieldCheck size={12} />
                  <span className="font-jetbrains text-[8px] uppercase tracking-widest">Biometric Sync</span>
               </div>
               <span className="font-jetbrains text-[8px] uppercase tracking-widest text-blue-500 hover:underline cursor-pointer">Recover Key</span>
            </div>

            <motion.button 
              type="submit"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              disabled={status === 'loading' || status === 'success'}
              className="w-full bg-white text-black py-4 font-jetbrains text-[10px] font-bold uppercase tracking-[0.4em] mt-8 flex items-center justify-center gap-4 group disabled:opacity-50"
            >
              {status === 'loading' ? 'Establishing Uplink...' : status === 'success' ? 'Synchronized' : 'Initialize Sync'}
              <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
            </motion.button>
          </form>

          <div className="mt-12 text-center">
            <Link href="/" className="font-jetbrains text-[8px] text-white/20 hover:text-white transition-colors uppercase tracking-[0.3em]">
              Return to Monolith Home
            </Link>
          </div>
        </motion.div>
      </div>

      <div className="fixed bottom-12 left-1/2 -translate-x-1/2 z-20 pointer-events-none opacity-20 font-jetbrains text-[8px] uppercase tracking-widest">
        ENCRYPTED_SESSION // {new Date().getFullYear()}
      </div>
    </main>
  );
}
