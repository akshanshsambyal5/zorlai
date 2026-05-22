import { motion, useScroll, useTransform } from 'motion/react';
import { FloatingParticles } from './FloatingParticles';

export function AmbientBackground() {
  const { scrollY } = useScroll();
  const orbY1 = useTransform(scrollY, [0, 800], [0, 120]);
  const orbY2 = useTransform(scrollY, [0, 800], [0, -80]);
  const gridOpacity = useTransform(scrollY, [0, 400], [0.5, 0.2]);

  return (
    <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none mesh-bg noise-overlay">
      <motion.div style={{ opacity: gridOpacity }} className="absolute inset-0 grid-overlay" />

      <motion.div
        style={{ y: orbY1 }}
        className="absolute -top-[20%] left-[15%] w-[min(520px,70vw)] h-[min(520px,70vw)] rounded-full bg-sky-300/30 blur-[120px] animate-float-orb"
      />
      <motion.div
        style={{ y: orbY2 }}
        className="absolute top-[30%] right-[5%] w-[min(400px,55vw)] h-[min(400px,55vw)] rounded-full bg-blue-200/40 blur-[100px] animate-float-orb-delayed"
      />
      <div className="absolute bottom-[10%] left-[40%] w-[300px] h-[300px] rounded-full bg-cyan-200/25 blur-[90px] animate-pulse-glow" />
      <div className="absolute top-[55%] left-[8%] w-[min(280px,45vw)] h-[min(280px,45vw)] rounded-full bg-slate-900/[0.04] blur-[100px]" />
      <div className="absolute top-[12%] right-[25%] w-[200px] h-[200px] rounded-full bg-indigo-900/[0.05] blur-[80px]" />

      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 60, repeat: Infinity, ease: 'linear' }}
        className="absolute top-[18%] right-[18%] w-32 h-32 md:w-48 md:h-48 opacity-[0.15]"
        style={{
          background:
            'conic-gradient(from 0deg, transparent, rgba(14,165,233,0.6), transparent, rgba(56,189,248,0.5), transparent)',
          borderRadius: '50%',
          filter: 'blur(1px)',
        }}
      />

      <FloatingParticles />
    </div>
  );
}
