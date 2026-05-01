'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Navbar } from '@/components/Navbar';
import { CustomCursor } from '@/components/CustomCursor';
import { ArrowLeft, Phone, Mail, MapPin, ShieldCheck, Headphones, Navigation2 } from 'lucide-react';
import Link from 'next/link';

export default function SupportPage() {
  return (
    <main className="relative min-h-screen bg-[#050508] text-white selection:bg-blue-600 overflow-x-hidden">
      <CustomCursor />
      <Navbar />

      {/* Support Background */}
      <div 
        className="fixed inset-0 z-0 opacity-20 pointer-events-none"
        style={{ 
          backgroundImage: `url('/assets/images/bugatti_support_bg.png')`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      />
      <div className="fixed inset-0 z-0 bg-gradient-to-b from-[#050508] via-transparent to-[#050508]" />

      <div className="relative z-10 pt-48 pb-32 px-8 md:px-24 max-w-7xl mx-auto">
        <div className="flex flex-col gap-40">
          
          <header className="flex flex-col gap-10 max-w-4xl">
            <motion.div
              initial={{ x: -20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              className="flex items-center gap-4 text-blue-500"
            >
              <Navigation2 size={14} className="rotate-45" />
              <span className="font-jetbrains text-[10px] tracking-[0.8em] uppercase font-bold">// CONCIERGE_UPLINK</span>
            </motion.div>
            
            <h1 className="font-playfair italic text-7xl md:text-[10rem] leading-[0.8] tracking-tighter">
              Absolute <br/><span className="text-blue-600">Support.</span>
            </h1>
            
            <p className="font-playfair text-2xl md:text-3xl text-white/40 italic leading-relaxed max-w-2xl">
              "Bugatti ownership is an invitation to a world where limits do not exist. We ensure your journey remains uninterrupted."
            </p>
          </header>

          {/* Service Modules */}
          <div className="grid lg:grid-cols-3 gap-1px bg-white/10 border border-white/10">
             {[
               { 
                 icon: <ShieldCheck size={32} />, 
                 title: "Elite Technicians", 
                 desc: "Our master technicians are on standby 24/7, ready to be dispatched globally via private aviation to service your Chiron at your location."
               },
               { 
                 icon: <Headphones size={32} />, 
                 title: "Personal Concierge", 
                 desc: "A dedicated point of contact for every owner. Bespoke service scheduling, event invitations, and historical archive access."
               },
               { 
                 icon: <MapPin size={32} />, 
                 title: "Molsheim Retreat", 
                 desc: "Owners are always welcome at the Château St Jean. Experience the Atelier and dine where Ettore Bugatti once hosted his guests."
               }
             ].map((item, i) => (
               <motion.div 
                 key={i}
                 initial={{ opacity: 0, y: 20 }}
                 animate={{ opacity: 1, y: 0 }}
                 transition={{ delay: i * 0.2 }}
                 className="p-16 bg-[#050508] flex flex-col gap-10 hover:bg-white/[0.02] transition-colors duration-500"
               >
                  <div className="text-blue-500">{item.icon}</div>
                  <h3 className="font-playfair italic text-4xl leading-tight">{item.title}</h3>
                  <p className="font-jetbrains text-[10px] text-white/30 leading-loose tracking-widest uppercase">
                    {item.desc}
                  </p>
               </motion.div>
             ))}
          </div>

          {/* Contact Board */}
          <div className="backdrop-blur-3xl bg-white/[0.02] border border-white/5 p-16 md:p-24 flex flex-col md:flex-row justify-between items-center gap-16">
             <div className="flex flex-col gap-6 text-center md:text-left">
                <h3 className="font-playfair italic text-5xl">Direct Uplink.</h3>
                <p className="font-jetbrains text-[9px] text-white/20 tracking-widest uppercase">Global Headquarters // Molsheim, France</p>
             </div>
             
             <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                <div className="flex flex-col gap-4 group cursor-pointer">
                   <div className="flex items-center gap-4 text-blue-500">
                      <Phone size={14} />
                      <span className="font-jetbrains text-[8px] tracking-[0.4em] uppercase">Emergency_Line</span>
                   </div>
                   <span className="font-playfair italic text-2xl group-hover:text-blue-500 transition-colors">+33 (0) 3 88 04 84 00</span>
                </div>
                <div className="flex flex-col gap-4 group cursor-pointer">
                   <div className="flex items-center gap-4 text-blue-500">
                      <Mail size={14} />
                      <span className="font-jetbrains text-[8px] tracking-[0.4em] uppercase">Email_Uplink</span>
                   </div>
                   <span className="font-playfair italic text-2xl group-hover:text-blue-500 transition-colors">CONCIERGE@BUGATTI.COM</span>
                </div>
             </div>
          </div>

          <footer className="flex justify-center pt-24">
             <Link href="/" className="group flex flex-col items-center gap-8">
                <div className="w-[1px] h-32 bg-gradient-to-b from-blue-600 to-transparent" />
                <div className="flex items-center gap-4 font-jetbrains text-[10px] uppercase tracking-[0.5em] text-white/30 hover:text-white transition-colors">
                   <ArrowLeft size={12} className="group-hover:-translate-x-2 transition-transform" />
                   Terminate Connection
                </div>
             </Link>
          </footer>
        </div>
      </div>
    </main>
  );
}
