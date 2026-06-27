"use client";

import { useCallback, useRef } from "react";

interface MouseState {
  x: number | null;
  y: number | null;
  radius: number;
  lastX: number | null;
  lastY: number | null;
  stationaryTime: number;
}

interface ShipState {
  x: number;
  y: number;
  vx: number;
  vy: number;
  orbitAngle: number;
  isDocked: boolean;
}

const config = {
  speed: 0.5,
  damping: 0.95,
  minDistance: 50,
  orbitSpeed: 0.02,
  stationaryThreshold: 5,
};

export function useMouseShip() {
  const shipRef = useRef<ShipState>({
    x: 0,
    y: 0,
    vx: 0,
    vy: 0,
    orbitAngle: 0,
    isDocked: false,
  });

  const initializeShip = useCallback((canvas: HTMLCanvasElement) => {
    const ship = shipRef.current;
    ship.x = canvas.width / 2;
    ship.y = canvas.height / 2;
    ship.isDocked = false;
    ship.orbitAngle = 0;
  }, []);

  const updateShip = useCallback((mouse: MouseState, canvas: HTMLCanvasElement) => {
    const ship = shipRef.current;

    if (mouse.x !== null && mouse.y !== null) {
      let isStationary = false;

      if (mouse.lastX !== null && mouse.lastY !== null) {
        const dx = mouse.x - mouse.lastX;
        const dy = mouse.y - mouse.lastY;
        const mouseMoved = Math.sqrt(dx * dx + dy * dy) > 1;

        if (!mouseMoved) {
          mouse.stationaryTime += 1 / 60;
          if (mouse.stationaryTime >= config.stationaryThreshold) {
            isStationary = true;
          }
        } else {
          mouse.stationaryTime = 0;
          ship.isDocked = false;
        }
      } else {
        mouse.lastX = mouse.x;
        mouse.lastY = mouse.y;
        mouse.stationaryTime = 0;
        ship.isDocked = false;
      }

      mouse.lastX = mouse.x;
      mouse.lastY = mouse.y;

      const dx = mouse.x - ship.x;
      const dy = mouse.y - ship.y;
      const distance = Math.sqrt(dx * dx + dy * dy);

      if (isStationary && ship.isDocked) {
        ship.orbitAngle += config.orbitSpeed;
        ship.x = mouse.x + config.minDistance * Math.cos(ship.orbitAngle);
        ship.y = mouse.y + config.minDistance * Math.sin(ship.orbitAngle);
        ship.vx = 0;
        ship.vy = 0;
      } else if (!ship.isDocked || !isStationary) {
        if (distance > config.minDistance) {
          ship.vx += (dx / distance) * config.speed;
          ship.vy += (dy / distance) * config.speed;
          ship.vx *= config.damping;
          ship.vy *= config.damping;
          ship.x += ship.vx;
          ship.y += ship.vy;
        } else {
          ship.isDocked = true;
          ship.vx *= config.damping;
          ship.vy *= config.damping;
          ship.x += ship.vx;
          ship.y += ship.vy;
        }

        if (ship.x < 0) ship.x = canvas.width;
        if (ship.x > canvas.width) ship.x = 0;
        if (ship.y < 0) ship.y = canvas.height;
        if (ship.y > canvas.height) ship.y = 0;
      }
    } else {
      ship.vx *= config.damping;
      ship.vy *= config.damping;
      ship.x += ship.vx;
      ship.y += ship.vy;
      mouse.stationaryTime = 0;
      ship.isDocked = false;
    }
  }, []);

  const drawShip = useCallback(
    (
      ctx: CanvasRenderingContext2D,
      mouse: MouseState,
      colors: { body: string; flame: string } = {
        body: "silver",
        flame: "orange",
      }
    ) => {
    const ship = shipRef.current;

    if (mouse.x !== null && mouse.y !== null) {
      ctx.save();
      ctx.translate(ship.x, ship.y);

      const angle =
        Math.atan2(mouse.y - ship.y, mouse.x - ship.x) + Math.PI / 2;
      ctx.rotate(angle);

      ctx.fillStyle = colors.body;
      ctx.beginPath();
      ctx.moveTo(0, -15);
      ctx.lineTo(-10, 10);
      ctx.lineTo(10, 10);
      ctx.closePath();
      ctx.fill();

      ctx.fillStyle = colors.flame;
      ctx.beginPath();
      ctx.moveTo(-5, 10);
      ctx.lineTo(5, 10);
      ctx.lineTo(0, 25);
      ctx.closePath();
      ctx.fill();

      ctx.restore();
    }
  },
  []);

  return { initializeShip, updateShip, drawShip };
}