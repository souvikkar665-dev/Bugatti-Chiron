import { ScrollytellingEngine } from '@/components/ScrollytellingEngine';
import { TelemetryHUD } from '@/components/TelemetryHUD';
import { SectionContent } from '@/components/SectionContent';
import { Navbar } from '@/components/Navbar';
import { CustomCursor } from '@/components/CustomCursor';

export default function Home() {
  return (
    <main className="relative min-h-screen bg-obsidian selection:bg-bugatti-blue selection:text-white">
      <CustomCursor />
      <div className="film-grain" />
      <div className="scanlines" />
      
      {/* Navigation Layer (Z-100) */}
      <Navbar />

      {/* HUD & Content Layer (Z-20) */}
      <div className="fixed inset-0 z-20 pointer-events-none">
        <TelemetryHUD />
        <SectionContent />
      </div>

      {/* Animation Kernel (Z-0 & Z-10) */}
      <ScrollytellingEngine />
      
      {/* Footer / Legal */}
      <footer className="fixed bottom-8 left-1/2 -translate-x-1/2 z-50 pointer-events-none opacity-20 font-jetbrains text-[8px] uppercase tracking-widest text-center">
        © 2026 BUGATTI AUTOMOBILES S.A.S. | MOLSHEIM MONOLITH PRODUCTION
      </footer>
    </main>
  );
}
