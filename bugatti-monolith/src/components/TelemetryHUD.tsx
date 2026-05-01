'use client';

import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useStore } from '@/store/useStore';
import { Cpu, ShieldCheck, Zap, Crosshair, ChevronRight } from 'lucide-react';

export const TelemetryHUD: React.FC = () => {
  const { currentFrame, activeSection, telemetry, setTelemetry } = useStore();

  useEffect(() => {
    const fetchTelemetry = async () => {
      try {
        const res = await fetch('http://localhost:8001/telemetry');
        const data = await res.json();
        setTelemetry(data);
      } catch (err) {
        console.error('Failed to fetch telemetry:', err);
      }
    };

    const interval = setInterval(fetchTelemetry, 1000);
    return () => clearInterval(interval);
  }, [setTelemetry]);

  const [time, setTime] = React.useState<string>('');
  const [mounted, setMounted] = React.useState(false);

  useEffect(() => {
    setMounted(true);
    const updateTime = () => setTime(new Date().toLocaleTimeString());
    updateTime();
    const tInterval = setInterval(updateTime, 1000);
    return () => clearInterval(tInterval);
  }, []);

  if (!mounted) return null;

  return (
    <div className="fixed inset-0 pointer-events-none z-[30] flex flex-col justify-between p-8 md:p-16 font-jetbrains uppercase text-[8px] tracking-[0.3em]">
      
      {/* Top Left: Navigation / Breadcrumbs */}
      <div className="flex flex-col gap-8">
        <div className="flex items-center gap-4">
          <div className="w-8 h-8 rounded-full border border-white/20 flex items-center justify-center text-[10px] font-bold">B</div>
          <div className="flex flex-col">
            <span className="text-white font-playfair italic normal-case text-lg leading-none">Bugatti Monolith</span>
            <span className="text-white/30 text-[7px] tracking-[0.5em]">Digital Couture • Engine OS v4.0</span>
          </div>
        </div>

        <div className="flex items-center gap-4 text-white/40">
           <span className={activeSection === 'HOME' ? 'text-white underline underline-offset-8' : ''}>01_MAIN</span>
           <ChevronRight size={10} />
           <span className={activeSection === 'VISION' ? 'text-white underline underline-offset-8' : ''}>02_VISION</span>
           <ChevronRight size={10} />
           <span className={activeSection === 'FRICTION' ? 'text-white underline underline-offset-8' : ''}>03_FRICTION</span>
           <ChevronRight size={10} />
           <span className={activeSection === 'POWER' ? 'text-white underline underline-offset-8' : ''}>04_POWER</span>
        </div>
      </div>

      {/* Top Right: Frame & Data stream */}
      <div className="absolute top-16 right-16 flex flex-col items-end gap-6">
        <div className="flex flex-col items-end">
          <span className="text-white/20 mb-1">FRAME_UUID</span>
          <span className="text-3xl font-light text-white tracking-tighter tabular-nums">
            {currentFrame.toString().padStart(6, '0')}
          </span>
        </div>
        <div className="flex items-center gap-3 glass px-4 py-2 border-white/5">
          <div className="w-1.5 h-1.5 rounded-full bg-blue-500 animate-pulse" />
          <span className="text-white">UPLINK_STABLE // 1.2 GBPS</span>
        </div>
      </div>

      {/* Center: Interactive Scanning Ring */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="relative w-[50vh] h-[50vh]">
          <div className="absolute inset-0 border border-white/5 rounded-full" />
          <motion.div 
             animate={{ rotate: 360 }}
             transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
             className="absolute inset-0 border-t border-blue-500/30 rounded-full" 
          />
          <div className="absolute top-1/2 left-0 w-full h-[1px] bg-white/5" />
          <div className="absolute left-1/2 top-0 w-[1px] h-full bg-white/5" />
          <div className="absolute inset-0 flex items-center justify-center">
             <Crosshair size={24} className="text-white/10" />
          </div>
        </div>
      </div>

      {/* Bottom Interface: Core Telemetry Grid */}
      <div className="flex justify-between items-end">
        
        {/* Engineering Terminal */}
        <div className="flex flex-col gap-6">
          <div className="glass p-8 border-white/10 min-w-[320px] backdrop-blur-3xl relative overflow-hidden">
             <div className="absolute top-0 left-0 w-full h-[2px] bg-blue-600" />
             <div className="flex items-center gap-3 mb-6">
                <Cpu size={14} className="text-blue-500" />
                <span className="text-white font-bold">CORE_ANALYTICS</span>
             </div>
             <div className="grid grid-cols-2 gap-y-4 gap-x-12 opacity-80">
                <div className="flex flex-col gap-1">
                   <span className="text-[6px] text-white/30">TORQUE_NM</span>
                   <span className="text-white text-sm tabular-nums">{telemetry?.engine?.torque_nm || '----'}</span>
                </div>
                <div className="flex flex-col gap-1 text-right">
                   <span className="text-[6px] text-white/30">BOOST_PRESSURE</span>
                   <span className="text-white text-sm tabular-nums">{telemetry?.engine?.boost_pressure_bar || '0.0'} BAR</span>
                </div>
                <div className="flex flex-col gap-1">
                   <span className="text-[6px] text-white/30">AERO_DRAG</span>
                   <span className="text-white text-sm tabular-nums">{telemetry?.aerodynamics?.drag_coefficient || '0.00'} CD</span>
                </div>
                <div className="flex flex-col gap-1 text-right">
                   <span className="text-[6px] text-white/30">DOWNFORCE</span>
                   <span className="text-white text-sm tabular-nums">{telemetry?.aerodynamics?.downforce_n || '0'} N</span>
                </div>
             </div>
          </div>
          <div className="flex items-center gap-4 text-[7px] text-white/20">
             <span className="animate-pulse">● LIVE_FEED</span>
             <span>BUFFER: 1440_FRAMES</span>
             <span>OS_TIME: {time}</span>
          </div>
        </div>

        {/* Action / Branding */}
        <div className="flex flex-col items-end gap-8">
           <div className="flex gap-4">
              <div className="w-10 h-[1px] bg-white/20 mt-2" />
              <div className="flex flex-col items-end">
                 <span className="text-white text-[10px] font-bold tracking-[0.8em]">MOLSHEIM</span>
                 <span className="text-white/30">AUTOMOBILES S.A.S.</span>
              </div>
           </div>
           
           <button className="pointer-events-auto border border-white/20 px-8 py-3 hover:bg-white hover:text-black transition-all duration-500 text-[9px] font-bold group flex items-center gap-3">
              CONFIGURATOR 
              <Zap size={10} className="group-hover:text-blue-600 transition-colors" />
           </button>
        </div>
      </div>

    </div>
  );
};
