'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Navbar } from '@/components/Navbar';
import { CustomCursor } from '@/components/CustomCursor';
import { ChevronDown, HelpCircle, ArrowLeft } from 'lucide-react';
import Link from 'next/link';

const FAQS = [
  {
    question: "What is the true top speed of the Chiron?",
    answer: "The Bugatti Chiron is electronically limited to 420 km/h (261 mph) for road use. However, its engineering potential extends significantly further, as demonstrated by the Chiron Super Sport 300+ which breached the 300 mph barrier."
  },
  {
    question: "How many radiators are required to cool the W16 engine?",
    answer: "To manage the immense thermal energy of the 8.0-liter W16 engine, the Chiron utilizes a complex cooling system consisting of 10 high-performance radiators, circulating over 800 liters of coolant per minute."
  },
  {
    question: "What is the production limit of the Chiron Monolith series?",
    answer: "The Chiron series is strictly limited to 500 units worldwide. Each unit is handcrafted in the Molsheim Atelier, ensuring that no two 'Monoliths' are identical in their bespoke finishing."
  },
  {
    question: "How does the active aerodynamics system function?",
    answer: "The Chiron features a sophisticated hydraulic rear wing that changes position depending on speed and driving mode. It acts as a stabilizer, a downforce generator, and an air brake for rapid deceleration."
  }
];

export default function FAQPage() {
  const [active, setActive] = useState<number | null>(null);

  return (
    <main className="relative min-h-screen bg-obsidian text-white selection:bg-bugatti-blue overflow-x-hidden">
      <CustomCursor />
      <Navbar />

      <div className="pt-48 pb-32 px-12 md:px-32 max-w-7xl mx-auto">
        <div className="flex flex-col gap-24">
          
          <header className="flex flex-col gap-8 max-w-2xl">
            <h2 className="font-jetbrains text-[10px] text-blue-500 tracking-[0.8em] uppercase">// KNOWLEDGE_BASE</h2>
            <h1 className="font-playfair italic text-7xl md:text-8xl leading-none">Frequently Asked <br/>Questions</h1>
            <p className="font-playfair text-xl text-white/50 italic leading-relaxed">
              Deep dive into the technical specifications and heritage of the world's most advanced hypercar.
            </p>
          </header>

          <div className="flex flex-col border-t border-white/10">
            {FAQS.map((faq, i) => (
              <div key={i} className="border-b border-white/10">
                <button 
                  onClick={() => setActive(active === i ? null : i)}
                  className="w-full flex items-center justify-between py-12 text-left group hover:px-8 transition-all duration-500"
                >
                  <span className="font-playfair italic text-3xl md:text-4xl group-hover:text-blue-500 transition-colors">
                    {faq.question}
                  </span>
                  <motion.div
                    animate={{ rotate: active === i ? 180 : 0 }}
                  >
                    <ChevronDown size={24} className="text-white/20" />
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
                      <p className="pb-12 pr-24 font-jetbrains text-xs leading-relaxed text-white/40 tracking-widest uppercase">
                        {faq.answer}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </div>

          <footer className="flex justify-center pt-12">
             <Link href="/" className="group flex items-center gap-4 font-jetbrains text-[9px] uppercase tracking-[0.4em] text-white/30 hover:text-white transition-colors">
                <ArrowLeft size={12} className="group-hover:-translate-x-2 transition-transform" />
                Return to Exploration
             </Link>
          </footer>

        </div>
      </div>
    </main>
  );
}
