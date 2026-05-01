'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Navbar } from '@/components/Navbar';
import { CustomCursor } from '@/components/CustomCursor';
import { ArrowLeft, Leaf, Wind, Zap, Globe, Droplets } from 'lucide-react';
import Link from 'next/link';

export default function SustainabilityPage() {
  return (
    <main className="relative min-h-screen bg-[#020804] text-white selection:bg-emerald-500 overflow-x-hidden">
      <CustomCursor />
      <Navbar />

      {/* Sustainability Background */}
      <div 
        className="fixed inset-0 z-0 opacity-20 pointer-events-none grayscale"
        style={{ 
          backgroundImage: `url('/assets/images/bugatti_sustainability_bg.png')`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      />
      <div className="fixed inset-0 z-0 bg-gradient-to-b from-[#020804] via-transparent to-[#020804]" />
      <div className="fixed inset-0 z-0 bg-[radial-gradient(circle_at_50%_0%,rgba(16,185,129,0.05)_0%,transparent_70%)]" />

      <div className="relative z-10 pt-48 pb-32 px-8 md:px-24 max-w-7xl mx-auto">
        <div className="flex flex-col gap-40">
          
          <header className="flex flex-col gap-10 max-w-4xl">
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              className="flex items-center gap-4 text-emerald-500"
            >
              <Globe size={14} className="animate-spin-slow" />
              <span className="font-jetbrains text-[10px] tracking-[0.6em] uppercase font-bold">// PLANET_0_IMPACT</span>
            </motion.div>
            
            <h1 className="font-playfair italic text-7xl md:text-[10rem] leading-[0.8] tracking-tighter">
              Future <br/><span className="text-emerald-500">Horizon.</span>
            </h1>
            
            <p className="font-playfair text-2xl md:text-3xl text-white/40 italic leading-relaxed max-w-2xl">
              "We preserve the beauty of our world so that future generations can experience the thrill of the open road."
            </p>
          </header>

          {/* Eco-Telemetry Grid */}
          <div className="grid lg:grid-cols-2 gap-12">
             <motion.div 
               whileHover={{ y: -10 }}
               className="backdrop-blur-3xl bg-white/[0.02] border border-white/5 p-16 flex flex-col gap-10 relative group"
             >
                <div className="absolute top-0 right-0 p-8 text-emerald-500/20 group-hover:text-emerald-500 transition-colors">
                   <Leaf size={48} />
                </div>
                <h3 className="font-playfair italic text-5xl">Molsheim <br/>Carbon Neutral.</h3>
                <p className="font-jetbrains text-[11px] text-white/30 leading-loose tracking-widest uppercase max-w-md">
                   Our production atelier is a closed-loop ecosystem. Utilizing 100% certified renewable energy and carbon-offset programs that protect the Alsatian forests.
                </p>
                <div className="flex items-center gap-8 pt-8">
                   <div className="flex flex-col gap-2">
                      <span className="font-jetbrains text-[20px] text-emerald-500 font-bold">100%</span>
                      <span className="font-jetbrains text-[8px] text-white/20 uppercase">Green_Energy</span>
                   </div>
                   <div className="w-[1px] h-10 bg-white/10" />
                   <div className="flex flex-col gap-2">
                      <span className="font-jetbrains text-[20px] text-white font-bold">2026</span>
                      <span className="font-jetbrains text-[8px] text-white/20 uppercase">Net_Zero_Target</span>
                   </div>
                </div>
             </motion.div>

             <motion.div 
               whileHover={{ y: -10 }}
               className="backdrop-blur-3xl bg-white/[0.02] border border-white/5 p-16 flex flex-col gap-10 relative group"
             >
                <div className="absolute top-0 right-0 p-8 text-blue-500/20 group-hover:text-blue-500 transition-colors">
                   <Droplets size={48} />
                </div>
                <h3 className="font-playfair italic text-5xl">Bio-Synthetic <br/>Evolution.</h3>
                <p className="font-jetbrains text-[11px] text-white/30 leading-loose tracking-widest uppercase max-w-md">
                   Preserving the combustion engine via chemistry. We are developing proprietary bio-fuel mixtures derived from sustainable organic waste.
                </p>
                <div className="flex items-center gap-8 pt-8">
                   <div className="flex flex-col gap-2">
                      <span className="font-jetbrains text-[20px] text-blue-500 font-bold">-85%</span>
                      <span className="font-jetbrains text-[8px] text-white/20 uppercase">CO2_Reduction</span>
                   </div>
                   <div className="w-[1px] h-10 bg-white/10" />
                   <div className="flex flex-col gap-2">
                      <span className="font-jetbrains text-[20px] text-white font-bold">1500HP</span>
                      <span className="font-jetbrains text-[8px] text-white/20 uppercase">Performance_Parity</span>
                   </div>
                </div>
             </motion.div>
          </div>

          {/* Interactive Eco-Indicator */}
          <div className="flex flex-col items-center gap-16 py-20">
             <div className="relative w-64 h-64 flex items-center justify-center">
                <svg className="w-full h-full -rotate-90">
                   <circle cx="128" cy="128" r="120" stroke="currentColor" strokeWidth="1" fill="transparent" className="text-white/5" />
                   <motion.circle 
                     cx="128" cy="128" r="120" stroke="currentColor" strokeWidth="2" fill="transparent" strokeDasharray="754" 
                     initial={{ strokeDashoffset: 754 }}
                     whileInView={{ strokeDashoffset: 150 }}
                     transition={{ duration: 2, ease: "easeOut" }}
                     className="text-emerald-500" 
                   />
                </svg>
                <div className="absolute inset-0 flex flex-col items-center justify-center gap-2">
                   <span className="font-jetbrains text-4xl font-bold">80%</span>
                   <span className="font-jetbrains text-[8px] text-white/20 tracking-widest uppercase">Efficiency_Peak</span>
                </div>
             </div>
             <p className="font-playfair italic text-xl text-white/40 text-center max-w-sm">
                Real-time biological impact monitoring across 12 global production touchpoints.
             </p>
          </div>

          <footer className="flex justify-center">
             <Link href="/" className="group flex flex-col items-center gap-8">
                <div className="w-[1px] h-32 bg-gradient-to-b from-emerald-500 to-transparent" />
                <div className="flex items-center gap-4 font-jetbrains text-[9px] uppercase tracking-[0.5em] text-white/30 hover:text-white transition-colors">
                   <ArrowLeft size={12} className="group-hover:-translate-x-2 transition-transform" />
                   Return to Master Control
                </div>
             </Link>
          </footer>
        </div>
      </div>
    </main>
  );
}
