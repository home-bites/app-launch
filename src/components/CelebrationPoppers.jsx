import React, { useEffect, useRef } from 'react';

const BRAND_COLORS = [
  '#B7D52D', // HomBites Lime
  '#FF7A00', // HomBites Orange
  '#0B4D3B', // HomBites Green
  '#FFD700', // Metallic Gold
  '#F8F5EE', // HomBites Off-White
  '#FFE600', // Bright Yellow
];

export function CelebrationPoppers({ onComplete }) {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    let animationFrameId;
    let startTime = performance.now();
    const duration = 2000; // 2.0 seconds strict lifetime

    // Handle high DPI displays
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const width = window.innerWidth;
    const height = window.innerHeight;

    canvas.width = width * dpr;
    canvas.height = height * dpr;
    canvas.style.width = `${width}px`;
    canvas.style.height = `${height}px`;
    ctx.scale(dpr, dpr);

    // Particle class
    class Particle {
      constructor(originX, originY, direction) {
        this.x = originX;
        this.y = originY;
        this.color = BRAND_COLORS[Math.floor(Math.random() * BRAND_COLORS.length)];
        
        // Shoot inward and upward toward the upper center
        const angleSpread = (Math.random() - 0.5) * 0.45;
        const baseAngle = direction === 'left' ? -Math.PI / 3.2 : -Math.PI + Math.PI / 3.2;
        const angle = baseAngle + angleSpread;
        
        const speed = Math.random() * 22 + 16;
        this.vx = Math.cos(angle) * speed;
        this.vy = Math.sin(angle) * speed;

        this.gravity = 0.45 + Math.random() * 0.15;
        this.drag = 0.965; // Air resistance
        
        this.size = Math.random() * 8 + 5;
        this.length = this.size * (Math.random() > 0.4 ? (Math.random() * 2.5 + 1.2) : 1);
        this.type = Math.random() > 0.6 ? 'ribbon' : 'flake';

        // 3D rotation parameters
        this.rotationX = Math.random() * Math.PI * 2;
        this.rotationY = Math.random() * Math.PI * 2;
        this.vRotX = (Math.random() - 0.5) * 0.2;
        this.vRotY = (Math.random() - 0.5) * 0.2;
        this.opacity = 1;
      }

      update(progress) {
        this.vx *= this.drag;
        this.vy = this.vy * this.drag + this.gravity;
        this.x += this.vx;
        this.y += this.vy;

        this.rotationX += this.vRotX;
        this.rotationY += this.vRotY;

        // Fade timing: 0-800ms full, 800-1500ms fade, 1500-2000ms dissolve
        if (progress > 0.4) {
          this.opacity = Math.max(0, 1 - (progress - 0.4) / 0.6);
        }
      }

      draw(ctx) {
        if (this.opacity <= 0) return;
        ctx.save();
        ctx.translate(this.x, this.y);
        ctx.rotate(this.rotationX);
        ctx.scale(Math.cos(this.rotationY), 1);
        ctx.globalAlpha = this.opacity;
        ctx.fillStyle = this.color;

        if (this.type === 'ribbon') {
          // Curved or elongated streamer ribbon
          ctx.beginPath();
          ctx.rect(-this.size / 2, -this.length / 2, this.size, this.length);
          ctx.fill();
        } else {
          // Crisp confetti flake
          ctx.fillRect(-this.size / 2, -this.size / 2, this.size, this.size);
        }

        ctx.restore();
      }
    }

    // Spawn dual cannons
    const particles = [];
    const countPerSide = 85;

    // Left cannon: bursts inward from left edge
    for (let i = 0; i < countPerSide; i++) {
      particles.push(new Particle(-10, height * 0.72, 'left'));
    }

    // Right cannon: bursts inward from right edge
    for (let i = 0; i < countPerSide; i++) {
      particles.push(new Particle(width + 10, height * 0.72, 'right'));
    }

    // Animation Loop
    function render(currentTime) {
      const elapsed = currentTime - startTime;
      const progress = Math.min(1, elapsed / duration);

      ctx.clearRect(0, 0, width, height);

      for (let i = 0; i < particles.length; i++) {
        particles[i].update(progress);
        particles[i].draw(ctx);
      }

      if (progress < 1) {
        animationFrameId = requestAnimationFrame(render);
      } else {
        // Complete! Completely unmounts from DOM
        ctx.clearRect(0, 0, width, height);
        if (onComplete) onComplete();
      }
    }

    animationFrameId = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(animationFrameId);
    };
  }, [onComplete]);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className="fixed inset-0 z-50 pointer-events-none"
    />
  );
}
