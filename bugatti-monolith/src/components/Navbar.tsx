'use client';

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Search, User } from 'lucide-react';

export const Navbar: React.FC = () => {
  return (
    <motion.nav 
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
      className="fixed top-0 left-0 w-full z-[100] px-8 md:px-16 py-8 flex justify-between items-center pointer-events-auto backdrop-blur-md bg-black/10"
    >
      {/* Brand */}
      <div className="flex items-center gap-16">
        <Link href="/" className="flex items-center gap-4 group">
          <div className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center text-xs font-jetbrains group-hover:border-blue-600 transition-colors">B</div>
          <span className="font-playfair italic font-bold text-2xl tracking-tighter text-white">BUGATTI</span>
        </Link>
        
        <div className="hidden lg:flex gap-12 font-jetbrains text-[8px] uppercase tracking-[0.5em] text-white/30">
          <Link href="/heritage" prefetch={true} className="hover:text-white transition-colors">Heritage</Link>
          <Link href="/engineering" prefetch={true} className="hover:text-white transition-colors">Engineering</Link>
          <Link href="/sustainability" prefetch={true} className="hover:text-white transition-colors">Sustainability</Link>
          <Link href="/support" prefetch={true} className="hover:text-white transition-colors">Support</Link>
        </div>
      </div>

      {/* Actions */}
      <div className="flex items-center gap-12">
        <div className="hidden md:flex items-center gap-8 pr-12 border-r border-white/10">
          <Link href="/login">
            <User size={16} className="text-white/40 hover:text-white cursor-pointer transition-colors" />
          </Link>
        </div>
        
        <button className="flex items-center gap-4 font-jetbrains text-[9px] font-bold uppercase tracking-[0.4em] group">
          <span className="text-white">Menu</span>
          <div className="flex flex-col gap-1">
             <div className="w-6 h-[1px] bg-white group-hover:bg-blue-600 transition-colors" />
             <div className="w-4 h-[1px] bg-white group-hover:bg-blue-600 transition-colors self-end" />
          </div>
        </button>
      </div>
    </motion.nav>
  );
};
