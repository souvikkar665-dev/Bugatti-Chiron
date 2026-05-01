'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Navbar } from '@/components/Navbar';
import { CustomCursor } from '@/components/CustomCursor';
import { ArrowLeft, Landmark, History, Award, Quote, Calendar, Trophy, Zap } from 'lucide-react';
import Link from 'next/link';

const TIMELINE = [
  { year: "1909", event: "Foundation", desc: "Ettore Bugatti establishes the company in Molsheim, Alsace, beginning the 'Pur Sang' era." },
  { year: "1924", event: "Type 35 Dominance", desc: "The legendary Type 35 is born, winning over 2,000 races and becoming the most successful racing car ever." },
  { year: "1927", event: "Type 41 Royale", desc: "The ultimate luxury. Designed for royalty, the Royale was the largest and most expensive car of its time." },
  { year: "1936", event: "Type 57 SC Atlantic", desc: "Designed by Jean Bugatti, this is the first supercar, with only 4 units ever produced. An icon of automotive art." },
  { year: "2005", event: "Veyron Era", desc: "Bugatti redefines physics by breaking the 400 km/h barrier, reclaiming the title of the world's fastest car." },
  { year: "2016", event: "Chiron Monolith", desc: "The birth of the 1,500 HP masterpiece, pushing the boundaries of engineering and scrollytelling." }
];

export default function HeritagePage() {
  return (
    <main className="relative min-h-screen bg-[#080808] text-white selection:bg-bugatti-blue overflow-x-hidden">
      <CustomCursor />
      <Navbar />

      {/* Cinematic Background Layer */}
      <div 
        className="fixed inset-0 z-0 opacity-25 pointer-events-none sepia-[0.3]"
        style={{ 
          backgroundImage: `url('/assets/images/bugatti_heritage_bg.png')`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          filter: 'contrast(1.3) brightness(0.7) grayscale(0.2)'
        }}
      />
      <div className="fixed inset-0 z-0 bg-gradient-to-b from-[#080808] via-transparent to-[#080808]" />
      <div className="film-grain" />

      {/* Progress Line */}
      <div className="fixed left-12 top-0 bottom-0 w-[1px] bg-white/5 z-10 hidden md:block" />

      <div className="relative z-10 pt-48 pb-64 px-8 md:px-32 max-w-7xl mx-auto">
        <div className="flex flex-col gap-48">
          
          {/* Hero Section */}
          <header className="flex flex-col gap-12 max-w-4xl">
            <motion.div
              initial={{ x: -50, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ duration: 1 }}
              className="flex items-center gap-4"
            >
              <History size={14} className="text-blue-500" />
              <h2 className="font-jetbrains text-[9px] text-blue-500 tracking-[1em] uppercase font-bold">
                // ARCHIVE_UPLINK_HISTORICAL
              </h2>
            </motion.div>
            
            <motion.h1 
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 1.2, delay: 0.2 }}
              className="font-playfair italic text-8xl md:text-[14rem] leading-[0.8] tracking-tighter"
            >
              The <br/><span className="text-white/20">Legacy.</span>
            </motion.h1>
            
            <motion.p 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8, duration: 1 }}
              className="font-playfair text-2xl md:text-3xl text-white/50 italic leading-snug max-w-2xl"
            >
              For over 115 years, Bugatti has occupied the intersection of artistic expression and mechanical obsession.
            </motion.p>
          </header>

          {/* Historical Stats Grid */}
          <div className="grid md:grid-cols-4 gap-8">
             {[
               { icon: <Trophy />, value: "2,000+", label: "RACING VICTORIES" },
               { icon: <Zap />, value: "490.48", label: "KM/H RECORD" },
               { icon: <Landmark />, value: "1909", label: "YEAR ESTABLISHED" },
               { icon: <Calendar />, value: "115+", label: "YEARS OF HERITAGE" }
             ].map((stat, i) => (
               <motion.div 
                 key={i}
                 initial={{ opacity: 0, y: 20 }}
                 whileInView={{ opacity: 1, y: 0 }}
                 transition={{ delay: i * 0.1 }}
                 className="backdrop-blur-3xl bg-white/[0.02] border border-white/5 p-10 flex flex-col gap-4 text-center items-center group hover:bg-blue-600/10 transition-all duration-700"
               >
                  <div className="text-blue-500 group-hover:scale-110 transition-transform">{stat.icon}</div>
                  <span className="font-jetbrains text-2xl font-bold">{stat.value}</span>
                  <span className="font-jetbrains text-[8px] text-white/20 tracking-[0.3em] uppercase">{stat.label}</span>
               </motion.div>
             ))}
          </div>

          {/* Timeline Section */}
          <section className="flex flex-col gap-16">
             <div className="flex items-center gap-6">
                <h3 className="font-playfair italic text-5xl">Molsheim <br/>Timeline.</h3>
                <div className="h-[1px] flex-1 bg-white/5" />
             </div>
             
             <div className="grid gap-1px bg-white/5 border border-white/5">
                {TIMELINE.map((item, i) => (
                  <motion.div 
                    key={i}
                    whileHover={{ backgroundColor: 'rgba(255,255,255,0.01)' }}
                    className="p-12 md:p-16 flex flex-col md:flex-row gap-12 bg-[#080808] transition-all duration-500 relative group"
                  >
                     <div className="md:w-32">
                        <span className="font-jetbrains text-2xl text-blue-600 font-bold tracking-tighter opacity-40 group-hover:opacity-100 transition-opacity">{item.year}</span>
                     </div>
                     <div className="flex-1 flex flex-col gap-4">
                        <h4 className="font-playfair italic text-3xl group-hover:translate-x-2 transition-transform duration-500">{item.event}</h4>
                        <p className="font-jetbrains text-[10px] text-white/30 tracking-widest uppercase leading-loose max-w-2xl">{item.desc}</p>
                     </div>
                     <div className="absolute right-12 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-10 transition-opacity hidden md:block">
                        <History size={64} />
                     </div>
                  </motion.div>
                ))}
             </div>
          </section>

          {/* Masterpiece Focus */}
          <div className="grid lg:grid-cols-2 gap-24 items-center">
             <div className="relative aspect-square border border-white/5 overflow-hidden group">
                <div className="absolute inset-0 bg-blue-600/5 group-hover:bg-transparent transition-colors duration-1000" />
                <div className="absolute inset-0 flex items-center justify-center">
                   <h5 className="font-playfair italic text-white/5 text-9xl -rotate-12 select-none">ATLANTIC</h5>
                </div>
             </div>
             <div className="flex flex-col gap-12 lg:pl-16">
                <h3 className="font-playfair italic text-6xl leading-tight">The Art <br/>of Jean Bugatti.</h3>
                <p className="font-jetbrains text-[11px] text-white/30 leading-loose tracking-widest uppercase">
                   Jean Bugatti, Ettore's son, brought a new level of aesthetic elegance to the brand. His creation, the Type 57 SC Atlantic, remains the most expensive and mysterious car in automotive history. Only four were built; only three remain.
                </p>
                <div className="w-fit border border-blue-600/30 px-10 py-4 font-jetbrains text-[8px] tracking-[0.4em] uppercase text-blue-500">
                   Masterpiece Identification // T57SC
                </div>
             </div>
          </div>

          <footer className="flex justify-center pt-32">
             <Link href="/" className="group flex flex-col items-center gap-6">
                <div className="w-1px h-24 bg-gradient-to-b from-blue-600 to-transparent" />
                <div className="flex items-center gap-4 font-jetbrains text-[10px] uppercase tracking-[0.5em] text-white/30 group-hover:text-white transition-colors">
                   <ArrowLeft size={12} className="group-hover:-translate-x-2 transition-transform" />
                   Return to Present Day
                </div>
             </Link>
          </footer>
        </div>
      </div>
    </main>
  );
}
