'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Navbar } from '@/components/Navbar';
import { CustomCursor } from '@/components/CustomCursor';
import { ChevronDown, Cpu, Zap, Wind, ShieldCheck, ArrowLeft, Activity } from 'lucide-react';
import Link from 'next/link';

const ENGINEERING_MODULES = [
  {
    icon: <Cpu size={24} />,
    title: "W16 QUAD-TURBO",
    subtitle: "8.0L // 1500 PS // 1600 NM",
    description: "A mechanical monolith. Four high-performance turbochargers operate in two-stage controlled turbocharging, ensuring a linear power curve that feels like a jet takeoff.",
    specs: ["TITANIUM_RODS", "CARBON_INLETS", "60K_LITERS_AIR", "1-12-5-8_FIRE"]
  },
  {
    icon: <Wind size={24} />,
    title: "AERO_DYNAMICS",
    subtitle: "ADAPTIVE_STABILIZATION",
    description: "The rear wing is a hydraulic masterpiece, adjusting its profile in 0.8 seconds. In Top Speed mode, the car lowers its stance to minimize drag coefficients to 0.35.",
    specs: ["HYDRAULIC_WING", "AIR_BRAKE", "VENTURI_TUNNEL", "0.35_CD"]
  },
  {
    icon: <ShieldCheck size={24} />,
    title: "MONOCOQUE_S",
    subtitle: "CARBON_FIBRE_CHASSIS",
    description: "Crafted over 4 weeks, the carbon monocoque is the stiffest road-car chassis in existence. Torsional rigidity matches LMP1 endurance racing standards.",
    specs: ["50K_NM_DEGREE", "LMP1_SPEC", "H_MODULUS", "SAFETY_CELL"]
  },
  {
    icon: <Zap size={24} />,
    title: "THERMAL_CORE",
    subtitle: "HIGH_CAPACITY_COOLING",
    description: "800 liters of coolant per minute. 10 radiators. Three dedicated airflows for the front brakes. The thermal load of 1,500 HP requires aerospace-grade heat management.",
    specs: ["10_RADIATORS", "800L_FLOW", "DUAL_CIRCUIT", "BRAKE_DUCTS"]
  }
];

export default function EngineeringPage() {
  const [active, setActive] = useState<number | null>(0);

  return (
    <main className="relative min-h-screen bg-[#020202] text-white selection:bg-bugatti-blue overflow-x-hidden">
      <CustomCursor />
      <Navbar />

      {/* Engineering Background */}
      <div 
        className="fixed inset-0 z-0 opacity-20 pointer-events-none"
        style={{ 
          backgroundImage: `url('/assets/images/bugatti_engineering_bg.png')`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          filter: 'blue-shift(20%)'
        }}
      />
      <div className="fixed inset-0 z-0 bg-[radial-gradient(circle_at_50%_50%,rgba(0,38,73,0.1)_0%,transparent_100%)]" />
      <div className="fixed inset-0 z-0 bg-gradient-to-b from-[#020202] via-transparent to-[#020202]" />

      <div className="relative z-10 pt-48 pb-32 px-8 md:px-24 max-w-[1600px] mx-auto">
        <div className="grid lg:grid-cols-[1fr_400px] gap-24">
          
          <div className="flex flex-col gap-24">
            <header className="flex flex-col gap-8">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                className="flex items-center gap-4"
              >
                <div className="w-8 h-8 rounded-full border border-blue-600 flex items-center justify-center animate-pulse">
                   <Activity size={12} className="text-blue-600" />
                </div>
                <span className="font-jetbrains text-[10px] tracking-[0.8em] text-blue-600 uppercase font-bold">Live_Telemetry_System</span>
              </motion.div>
              <h1 className="font-playfair italic text-7xl md:text-[9rem] leading-none tracking-tighter">Engineering <br/>Excellence.</h1>
            </header>

            <div className="flex flex-col border-t border-white/5">
              {ENGINEERING_MODULES.map((module, i) => (
                <div key={i} className="group relative border-b border-white/5 overflow-hidden">
                  <div className={`absolute left-0 top-0 bottom-0 w-1 bg-blue-600 transition-transform duration-500 origin-bottom ${active === i ? 'scale-y-100' : 'scale-y-0'}`} />
                  
                  <button 
                    onClick={() => setActive(active === i ? null : i)}
                    className="w-full flex items-center justify-between py-12 px-8 text-left transition-all duration-500 hover:bg-white/[0.02]"
                  >
                    <div className="flex items-center gap-16">
                      <span className="font-jetbrains text-xs text-white/10">SYSTEM_0{i+1}</span>
                      <span className={`font-playfair italic text-3xl md:text-5xl transition-all duration-500 ${active === i ? 'text-white pl-8' : 'text-white/30'}`}>
                        {module.title}
                      </span>
                    </div>
                    <motion.div animate={{ rotate: active === i ? 180 : 0 }}>
                      <ChevronDown size={20} className="text-white/20" />
                    </motion.div>
                  </button>

                  <AnimatePresence>
                    {active === i && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        className="overflow-hidden"
                      >
                        <div className="pb-16 px-8 lg:pl-32 grid md:grid-cols-2 gap-16">
                          <div className="flex flex-col gap-8">
                            <h4 className="font-jetbrains text-[9px] text-blue-500 tracking-[0.4em] uppercase">{module.subtitle}</h4>
                            <p className="font-playfair text-xl text-white/50 leading-relaxed italic">
                              {module.description}
                            </p>
                          </div>
                          <div className="grid grid-cols-2 gap-6">
                             {module.specs.map((spec, j) => (
                               <motion.div 
                                 key={j}
                                 initial={{ opacity: 0, scale: 0.9 }}
                                 animate={{ opacity: 1, scale: 1 }}
                                 transition={{ delay: j * 0.1 }}
                                 className="backdrop-blur-3xl bg-white/[0.03] border border-white/5 p-6 flex flex-col gap-3 group/spec"
                               >
                                  <div className="w-6 h-[1px] bg-blue-600 group-hover/spec:w-full transition-all duration-500" />
                                  <span className="font-jetbrains text-[8px] text-white/60 tracking-widest uppercase">{spec}</span>
                               </motion.div>
                             ))}
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ))}
            </div>
          </div>

          {/* Side Info / Data Panel */}
          <div className="hidden lg:flex flex-col gap-12 pt-12">
             <div className="backdrop-blur-3xl bg-white/[0.02] border border-white/5 p-10 flex flex-col gap-8">
                <h3 className="font-jetbrains text-[10px] tracking-widest text-white/20 uppercase">Structural_Rigidity</h3>
                <div className="relative h-2 w-full bg-white/5 rounded-full overflow-hidden">
                   <motion.div 
                     initial={{ width: 0 }}
                     animate={{ width: '92%' }}
                     transition={{ duration: 2, delay: 1 }}
                     className="absolute inset-0 bg-blue-600" 
                   />
                </div>
                <div className="flex justify-between font-jetbrains text-[8px] text-white/40 uppercase">
                   <span>Safety_Threshold</span>
                   <span>92.4% Optimal</span>
                </div>
             </div>

             <div className="backdrop-blur-3xl bg-white/[0.02] border border-white/5 p-10 flex flex-col gap-8">
                <h3 className="font-jetbrains text-[10px] tracking-widest text-white/20 uppercase">Thermal_Efficiency</h3>
                <div className="flex items-end gap-1 h-32">
                   {[40, 70, 45, 90, 65, 80, 50, 60].map((h, i) => (
                     <motion.div 
                       key={i}
                       initial={{ height: 0 }}
                       animate={{ height: `${h}%` }}
                       transition={{ delay: 1 + (i * 0.1), duration: 1 }}
                       className="flex-1 bg-white/10 hover:bg-blue-600 transition-colors cursor-pointer"
                     />
                   ))}
                </div>
                <p className="font-jetbrains text-[8px] text-white/30 uppercase tracking-widest leading-loose">
                   Real-time airflow simulation data processed at 40,000 pts/sec via Molsheim Uplink.
                </p>
             </div>
          </div>

        </div>

        <footer className="flex justify-center pt-32">
           <Link href="/" className="group flex items-center gap-4 font-jetbrains text-[9px] uppercase tracking-[0.4em] text-white/30 hover:text-white transition-colors">
              <ArrowLeft size={12} className="group-hover:-translate-x-2 transition-transform" />
              Return to Telemetry
           </Link>
        </footer>
      </div>
    </main>
  );
}
