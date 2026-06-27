"use client";

import { useTheme } from "next-themes";
import { useEffect, useRef, useState } from "react";
import { useMouseShip } from "@/hooks/use-mouse-ship";

interface MouseState {
  x: number | null;
  y: number | null;
  radius: number;
  lastX: number | null;
  lastY: number | null;
  stationaryTime: number;
}

type BackgroundPalette = {
  background: string;
  starAccent: string;
  starDefault: string;
  starAccentRgb: [number, number, number];
  starDefaultRgb: [number, number, number];
  nebulaColors: [string, string];
  constellationStroke: string;
  constellationStar: string;
  meteorStroke: string;
  shipBody: string;
  shipFlame: string;
  starBrightnessMin: number;
  starBrightnessMax: number;
};

const palettes: Record<"dark" | "light", BackgroundPalette> = {
  dark: {
    background: "#0a0a23",
    starAccent: "#00d4ff",
    starDefault: "#ffffff",
    starAccentRgb: [0, 212, 255],
    starDefaultRgb: [255, 255, 255],
    nebulaColors: ["#4a90e2", "#9b59b6"],
    constellationStroke: "173, 216, 230",
    constellationStar: "255, 255, 255",
    meteorStroke: "255, 255, 255",
    shipBody: "silver",
    shipFlame: "orange",
    starBrightnessMin: 0.3,
    starBrightnessMax: 1,
  },
  light: {
    background: "#f8fafc",
    starAccent: "#06b6d4",
    starDefault: "#94a3b8",
    starAccentRgb: [6, 182, 212],
    starDefaultRgb: [148, 163, 184],
    nebulaColors: ["#7dd3fc", "#c4b5fd"],
    constellationStroke: "6, 182, 212",
    constellationStar: "100, 116, 139",
    meteorStroke: "6, 182, 212",
    shipBody: "#475569",
    shipFlame: "#f97316",
    starBrightnessMin: 0.2,
    starBrightnessMax: 0.75,
  },
};

function hexToRgb(hex: string): [number, number, number] {
  const normalized = hex.replace("#", "");
  const value = Number.parseInt(normalized, 16);
  return [(value >> 16) & 255, (value >> 8) & 255, value & 255];
}

export function StarryBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { initializeShip, updateShip, drawShip } = useMouseShip();
  const { resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  useEffect(() => {
    if (!mounted) return;

    const canvasEl = canvasRef.current;
    if (!canvasEl) return;

    const context2d = canvasEl.getContext("2d");
    if (!context2d) return;

    const canvas: HTMLCanvasElement = canvasEl;
    const ctx: CanvasRenderingContext2D = context2d;
    const palette =
      palettes[resolvedTheme === "light" ? "light" : "dark"];

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const mouse: MouseState = {
      x: null,
      y: null,
      radius: 200,
      lastX: null,
      lastY: null,
      stationaryTime: 0,
    };

    class Star {
      x: number;
      y: number;
      size: number;
      speedX: number;
      speedY: number;
      brightness: number;
      isAccent: boolean;

      constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.size = Math.random() * 2 + 1;
        this.speedX = (Math.random() - 0.5) * 0.1;
        this.speedY = (Math.random() - 0.5) * 0.1;
        this.brightness =
          Math.random() *
            (palette.starBrightnessMax - palette.starBrightnessMin) +
          palette.starBrightnessMin;
        this.isAccent = Math.random() > 0.8;
      }

      update() {
        this.x += this.speedX;
        this.y += this.speedY;
        if (this.x < 0) this.x += canvas.width;
        if (this.x > canvas.width) this.x -= canvas.width;
        if (this.y < 0) this.y += canvas.height;
        if (this.y > canvas.height) this.y -= canvas.height;

        if (mouse.x && mouse.y) {
          const dx = mouse.x - this.x;
          const dy = mouse.y - this.y;
          const distance = Math.sqrt(dx * dx + dy * dy);
          if (distance < mouse.radius) {
            this.brightness = Math.min(
              palette.starBrightnessMax,
              this.brightness + 0.02
            );
          } else {
            this.brightness = Math.max(
              palette.starBrightnessMin,
              this.brightness - 0.005
            );
          }
        }
      }

      draw() {
        const [r, g, b] = this.isAccent
          ? palette.starAccentRgb
          : palette.starDefaultRgb;
        ctx.fillStyle = `rgba(${r}, ${g}, ${b}, ${this.brightness})`;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
      }
    }

    class Meteor {
      x: number;
      y: number;
      length: number;
      speedX: number;
      speedY: number;
      opacity: number;

      constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.length = Math.random() * 30 + 20;
        this.speedX = (Math.random() - 0.5) * 4;
        this.speedY = (Math.random() - 0.5) * 6;
        this.opacity = 1;
      }

      update() {
        this.x += this.speedX;
        this.y += this.speedY;
        this.opacity -= 0.01;
      }

      draw() {
        ctx.strokeStyle = `rgba(${palette.meteorStroke}, ${this.opacity})`;
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.moveTo(this.x, this.y);
        ctx.lineTo(
          this.x - this.length * this.speedX,
          this.y - this.length * this.speedY
        );
        ctx.stroke();
      }
    }

    class Nebula {
      x: number;
      y: number;
      radius: number;
      opacity: number;
      color: string;
      pulseSpeed: number;
      pulseOffset: number;
      baseOpacity: number;

      constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.radius = Math.random() * 150 + 100;
        this.baseOpacity =
          resolvedTheme === "light"
            ? Math.random() * 0.04 + 0.03
            : Math.random() * 0.1 + 0.05;
        this.opacity = this.baseOpacity;
        this.color =
          Math.random() > 0.5
            ? palette.nebulaColors[0]
            : palette.nebulaColors[1];
        this.pulseSpeed = Math.random() * 0.02 + 0.01;
        this.pulseOffset = Math.random() * Math.PI * 2;
      }

      update() {
        this.pulseOffset += this.pulseSpeed;
        this.opacity =
          Math.sin(this.pulseOffset) * (this.baseOpacity * 0.5) +
          this.baseOpacity;
      }

      draw() {
        const gradient = ctx.createRadialGradient(
          this.x,
          this.y,
          0,
          this.x,
          this.y,
          this.radius
        );
        const [r, g, b] = hexToRgb(this.color);
        gradient.addColorStop(0, `rgba(${r}, ${g}, ${b}, ${this.opacity})`);
        gradient.addColorStop(
          0.5,
          `rgba(${r}, ${g}, ${b}, ${this.opacity * 0.5})`
        );
        gradient.addColorStop(1, `rgba(${r}, ${g}, ${b}, 0)`);

        ctx.fillStyle = gradient;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.fill();
      }
    }

    class Constellation {
      stars: { x: number; y: number; size: number; brightness: number }[];
      lines: {
        start: { x: number; y: number; size: number; brightness: number };
        end: { x: number; y: number; size: number; brightness: number };
      }[];
      opacity: number;
      twinkleSpeed: number;
      twinkleOffset: number;

      constructor() {
        this.stars = [];
        this.lines = [];
        this.opacity = Math.random() * 0.3 + 0.2;
        this.twinkleSpeed = Math.random() * 0.05 + 0.02;
        this.twinkleOffset = Math.random() * Math.PI * 2;
        this.createRandomConstellation();
      }

      createRandomConstellation() {
        const starCount = Math.floor(Math.random() * 5) + 3;
        for (let i = 0; i < starCount; i++) {
          this.stars.push({
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height,
            size: Math.random() * 2 + 1,
            brightness: Math.random() * 0.5 + 0.5,
          });
        }

        for (let i = 0; i < this.stars.length - 1; i++) {
          this.lines.push({
            start: this.stars[i],
            end: this.stars[i + 1],
          });
        }
      }

      update() {
        this.twinkleOffset += this.twinkleSpeed;
        this.opacity = Math.sin(this.twinkleOffset) * 0.1 + 0.3;
      }

      draw() {
        ctx.strokeStyle = `rgba(${palette.constellationStroke}, ${this.opacity * 0.5})`;
        ctx.lineWidth = 1;
        this.lines.forEach((line) => {
          ctx.beginPath();
          ctx.moveTo(line.start.x, line.start.y);
          ctx.lineTo(line.end.x, line.end.y);
          ctx.stroke();
        });

        this.stars.forEach((star) => {
          ctx.fillStyle = `rgba(${palette.constellationStar}, ${this.opacity})`;
          ctx.beginPath();
          ctx.arc(star.x, star.y, star.size, 0, Math.PI * 2);
          ctx.fill();
        });
      }
    }

    let stars: Star[] = [];
    let meteors: Meteor[] = [];
    let nebulae: Nebula[] = [];
    let constellations: Constellation[] = [];
    let animationId = 0;

    function populateScene() {
      stars = [];
      nebulae = [];
      constellations = [];

      const starCount = window.innerWidth < 768 ? 100 : 200;
      for (let i = 0; i < starCount; i++) {
        stars.push(new Star());
      }

      const nebulaCount = window.innerWidth < 768 ? 2 : 4;
      for (let i = 0; i < nebulaCount; i++) {
        nebulae.push(new Nebula());
      }

      constellations.push(new Constellation());

      const additionalConstellationCount = window.innerWidth < 768 ? 0 : 2;
      for (let i = 0; i < additionalConstellationCount; i++) {
        constellations.push(new Constellation());
      }

      initializeShip(canvas);
    }

    function animate() {
      ctx.fillStyle = palette.background;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      nebulae.forEach((nebula) => {
        nebula.update();
        nebula.draw();
      });

      stars.forEach((star) => {
        star.update();
        star.draw();
      });

      constellations.forEach((constellation) => {
        constellation.update();
        constellation.draw();
      });

      if (Math.random() < 0.005) {
        meteors.push(new Meteor());
      }

      meteors = meteors.filter((meteor) => meteor.opacity > 0);
      meteors.forEach((meteor) => {
        meteor.update();
        meteor.draw();
      });

      updateShip(mouse, canvas);
      drawShip(ctx, mouse, {
        body: palette.shipBody,
        flame: palette.shipFlame,
      });

      animationId = requestAnimationFrame(animate);
    }

    const handleMouseMove = (event: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouse.x = event.clientX - rect.left;
      mouse.y = event.clientY - rect.top;
    };

    const handleMouseOut = () => {
      mouse.x = null;
      mouse.y = null;
      mouse.lastX = null;
      mouse.lastY = null;
      mouse.stationaryTime = 0;
    };

    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      populateScene();
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseout", handleMouseOut);
    window.addEventListener("resize", handleResize);

    populateScene();
    animate();

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseout", handleMouseOut);
      window.removeEventListener("resize", handleResize);
    };
  }, [mounted, resolvedTheme, drawShip, initializeShip, updateShip]);

  if (!mounted) {
    return null;
  }

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-0 h-full w-full"
    />
  );
}