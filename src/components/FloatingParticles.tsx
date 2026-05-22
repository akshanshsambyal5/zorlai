import { useEffect, useRef } from 'react';

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  color: string;
  alpha: number;
  decay: number;
}

export function FloatingParticles() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const mouseRef = useRef({ x: -1000, y: -1000, radius: 150 });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let particles: Particle[] = [];

    const colors = [
      'rgba(14, 165, 233, ',
      'rgba(56, 189, 248, ',
      'rgba(2, 132, 199, ',
      'rgba(125, 211, 252, ',
    ];

    const resizeCanvas = () => {
      const parent = canvas.parentElement;
      if (parent) {
        canvas.width = parent.clientWidth;
        canvas.height = parent.clientHeight;
      } else {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
      }
      initParticles();
    };

    const initParticles = () => {
      particles = [];
      const density = Math.min(60, Math.floor((canvas.width * canvas.height) / 25000));
      for (let i = 0; i < density; i++) {
        particles.push(createParticle());
      }
    };

    const createParticle = (isNew = false): Particle => {
      const size = Math.random() * 2 + 0.5;
      const x = Math.random() * canvas.width;
      const y = isNew ? (Math.random() > 0.5 ? 0 : canvas.height) : Math.random() * canvas.height;
      return {
        x,
        y,
        vx: (Math.random() - 0.5) * 0.4,
        vy: (Math.random() - 0.5) * 0.4,
        size,
        color: colors[Math.floor(Math.random() * colors.length)],
        alpha: Math.random() * 0.4 + 0.1,
        decay: Math.random() * 0.005 + 0.001,
      };
    };

    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouseRef.current.x = e.clientX - rect.left;
      mouseRef.current.y = e.clientY - rect.top;
    };

    const handleMouseLeave = () => {
      mouseRef.current.x = -1000;
      mouseRef.current.y = -1000;
    };

    window.addEventListener('resize', resizeCanvas);
    canvas.addEventListener('mousemove', handleMouseMove);
    canvas.addEventListener('mouseleave', handleMouseLeave);

    resizeCanvas();

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      particles.forEach((p, idx) => {
        // Apply physics
        p.x += p.vx;
        p.y += p.vy;

        // Interactive gravity with mouse
        const dx = mouseRef.current.x - p.x;
        const dy = mouseRef.current.y - p.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        
        if (dist < mouseRef.current.radius) {
          const force = (mouseRef.current.radius - dist) / mouseRef.current.radius;
          p.x -= (dx / dist) * force * 1.5;
          p.y -= (dy / dist) * force * 1.5;
        }

        // Draw particle
        ctx.beginPath();
        const grad = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.size * 2);
        grad.addColorStop(0, p.color + p.alpha + ')');
        grad.addColorStop(1, p.color + '0)');
        ctx.fillStyle = grad;
        ctx.arc(p.x, p.y, p.size * 3, 0, Math.PI * 2);
        ctx.fill();

        // Edge wrapping / death regeneration
        if (p.x < 0 || p.x > canvas.width || p.y < 0 || p.y > canvas.height) {
          particles[idx] = createParticle(true);
        }
      });

      // Draw subtle connecting webs if close
      ctx.strokeStyle = 'rgba(99, 102, 241, 0.03)';
      ctx.lineWidth = 0.5;
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const pi = particles[i];
          const pj = particles[j];
          const dist = Math.sqrt((pi.x - pj.x) ** 2 + (pi.y - pj.y) ** 2);
          if (dist < 100) {
            ctx.beginPath();
            ctx.moveTo(pi.x, pi.y);
            ctx.lineTo(pj.x, pj.y);
            ctx.stroke();
          }
        }
      }

      animationFrameId = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      if (canvas) {
        canvas.removeEventListener('mousemove', handleMouseMove);
        canvas.removeEventListener('mouseleave', handleMouseLeave);
      }
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 pointer-events-none z-[1] opacity-70 mix-blend-screen"
      id="particles-canvas"
    />
  );
}
