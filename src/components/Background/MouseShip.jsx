import { useRef, useCallback } from "react";

const useMouseShip = () => {
  const shipRef = useRef({
    x: 0,
    y: 0,
    vx: 0,
    vy: 0,
    orbitAngle: 0,
    isDocked: false,
  });

  const config = {
    speed: 0.5,
    damping: 0.95,
    minDistance: 50,
    orbitSpeed: 0.02,
    stationaryThreshold: 5,
  };

  const initializeShip = useCallback((canvas) => {
    const ship = shipRef.current;
    ship.x = canvas.width / 2;
    ship.y = canvas.height / 2;
    ship.isDocked = false;
    ship.orbitAngle = 0;
  }, []);

  const updateShip = useCallback((mouse, canvas) => {
    const ship = shipRef.current;

    if (mouse.x !== null && mouse.y !== null) {
      let isStationary = false;
      if (mouse.lastX !== null && mouse.lastY !== null) {
        let dx = mouse.x - mouse.lastX;
        let dy = mouse.y - mouse.lastY;
        let mouseMoved = Math.sqrt(dx * dx + dy * dy) > 1;
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

      let dx = mouse.x - ship.x;
      let dy = mouse.y - ship.y;
      let distance = Math.sqrt(dx * dx + dy * dy);

      if (isStationary && ship.isDocked) {
        // Orbit around mouse
        ship.orbitAngle += config.orbitSpeed;
        ship.x = mouse.x + config.minDistance * Math.cos(ship.orbitAngle);
        ship.y = mouse.y + config.minDistance * Math.sin(ship.orbitAngle);
        ship.vx = 0;
        ship.vy = 0;
      } else {
        if (!ship.isDocked || !isStationary) {
          if (distance > config.minDistance) {
            // Move towards mouse
            ship.vx += (dx / distance) * config.speed;
            ship.vy += (dy / distance) * config.speed;

            ship.vx *= config.damping;
            ship.vy *= config.damping;

            ship.x += ship.vx;
            ship.y += ship.vy;
          } else {
            // Dock at mouse
            ship.isDocked = true;
            ship.vx *= config.damping;
            ship.vy *= config.damping;
            ship.x += ship.vx;
            ship.y += ship.vy;
          }
        }

        // Wrap around screen edges
        if (ship.x < 0) ship.x = canvas.width;
        if (ship.x > canvas.width) ship.x = 0;
        if (ship.y < 0) ship.y = canvas.height;
        if (ship.y > canvas.height) ship.y = 0;
      }
    } else {
      // No mouse, apply damping
      ship.vx *= config.damping;
      ship.vy *= config.damping;
      ship.x += ship.vx;
      ship.y += ship.vy;
      mouse.stationaryTime = 0;
      ship.isDocked = false;
    }
  }, [config.damping, config.minDistance, config.orbitSpeed, config.speed, config.stationaryThreshold]);

  const drawShip = useCallback((ctx, mouse) => {
    const ship = shipRef.current;

    if (mouse.x !== null && mouse.y !== null) {
      ctx.save();
      ctx.translate(ship.x, ship.y);

      let angle = Math.atan2(mouse.y - ship.y, mouse.x - ship.x) + Math.PI / 2;
      ctx.rotate(angle);

      // Draw ship body (triangle)
      ctx.fillStyle = "silver";
      ctx.beginPath();
      ctx.moveTo(0, -15);
      ctx.lineTo(-10, 10);
      ctx.lineTo(10, 10);
      ctx.closePath();
      ctx.fill();

      // Draw ship flame
      ctx.fillStyle = "orange";
      ctx.beginPath();
      ctx.moveTo(-5, 10);
      ctx.lineTo(5, 10);
      ctx.lineTo(0, 25);
      ctx.closePath();
      ctx.fill();

      ctx.restore();
    }
  }, []);

  return {
    initializeShip,
    updateShip,
    drawShip,
  };
};

export default useMouseShip;