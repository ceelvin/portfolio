import { useEffect, useRef } from "react";

const StarryBackground = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    let mouse = {
      x: null,
      y: null,
      radius: 200,
      lastX: null,
      lastY: null,
      stationaryTime: 0,
    };
    let stars = [];
    let meteors = [];
    const starCount = 250;

    // Spaceship
    let shipX = canvas.width / 2;
    let shipY = canvas.height / 2;
    let shipVX = 0;
    let shipVY = 0;
    let orbitAngle = 0;
    let isDocked = false;
    const shipSpeed = 0.5;
    const shipDamping = 0.95;
    const minDistance = 50; // distance from mouse
    const orbitSpeed = 0.02; // speed for circling
    const stationaryThreshold = 5;

    // Star class for background stars
    class Star {
      constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.size = Math.random() * 2 + 1;
        this.speedX = (Math.random() - 0.5) * 0.1;
        this.speedY = (Math.random() - 0.5) * 0.1;
        this.brightness = Math.random() * 0.3 + 0.3;
      }
      update() {
        this.x += this.speedX;
        this.y += this.speedY;
        if (this.x < 0) this.x += canvas.width;
        if (this.x > canvas.width) this.x -= canvas.width;
        if (this.y < 0) this.y += canvas.height;
        if (this.y > canvas.height) this.y -= canvas.height;
        if (mouse.x && mouse.y) {
          let dx = mouse.x - this.x;
          let dy = mouse.y - this.y;
          let distance = Math.sqrt(dx * dx + dy * dy);
          if (distance < mouse.radius) {
            this.brightness = Math.min(1, this.brightness + 0.02);
          } else {
            this.brightness = Math.max(0.3, this.brightness - 0.5);
          }
        }
      }
      draw() {
        ctx.fillStyle = `rgba(255, 255, 255, ${this.brightness})`;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
      }
    }

    class Meteor {
      constructor() {
        this.x = Math.random() * canvas.width; // Random x across canvas
        this.y = Math.random() * canvas.height; // Random y across canvas
        this.length = Math.random() * 30 + 20; // Length of meteor trail
        this.speedX = (Math.random() - 0.5) * 4; // -2 to 2
        this.speedY = (Math.random() - 0.5) * 6; // -3 to 3
        this.opacity = 1; // Start fully opaque
      }
      update() {
        this.x += this.speedX;
        this.y += this.speedY;
        this.opacity -= 0.01; // Fade out
      }
      draw() {
        ctx.strokeStyle = `rgba(255, 255, 255, ${this.opacity})`;
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.moveTo(this.x, this.y);
        ctx.lineTo(
          this.x - this.length * this.speedX,
          this.y - this.length * this.speedY,
        );
        ctx.stroke();
      }
    }

    function init() {
      for (let i = 0; i < starCount; i++) {
        stars.push(new Star());
      }

      shipX = canvas.width / 2;
      shipY = canvas.height / 2;
      isDocked = false;
      orbitAngle = 0;
    }

    function animate() {
      ctx.fillStyle = "#0a0a23"; // Dark blue background
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Draw and update stars
      stars.forEach((star) => {
        star.update();
        star.draw();
      });

      // Spawn meteors randomly (0.5% chance per frame)
      if (Math.random() < 0.005) {
        meteors.push(new Meteor());
      }

      // Draw and update meteors
      meteors = meteors.filter((meteor) => meteor.opacity > 0); // Remove faded meteors
      meteors.forEach((meteor) => {
        meteor.update();
        meteor.draw();
      });

      // Update spaceship: fly towards mouse for 3 seconds, then dock and circle
      if (mouse.x !== null && mouse.y !== null) {
        // Check if mouse is stationary
        let isStationary = false;
        if (mouse.lastX !== null && mouse.lastY !== null) {
          let dx = mouse.x - mouse.lastX;
          let dy = mouse.y - mouse.lastY;
          let mouseMoved = Math.sqrt(dx * dx + dy * dy) > 1;
          if (!mouseMoved) {
            mouse.stationaryTime += 1 / 60; // Assuming 60 FPS
            if (mouse.stationaryTime >= stationaryThreshold) {
              isStationary = true;
            }
          } else {
            mouse.stationaryTime = 0;
            isDocked = false; // Reset docking on movement
          }
        } else {
          // First time mouse is detected
          mouse.lastX = mouse.x;
          mouse.lastY = mouse.y;
          mouse.stationaryTime = 0;
          isDocked = false;
        }

        mouse.lastX = mouse.x;
        mouse.lastY = mouse.y;

        // Calculate direction to mouse
        let dx = mouse.x - shipX;
        let dy = mouse.y - shipY;
        let distance = Math.sqrt(dx * dx + dy * dy);

        if (isStationary && isDocked) {
          // Circle around mouse at minDistance after 3 seconds stationary
          orbitAngle += orbitSpeed;
          shipX = mouse.x + minDistance * Math.cos(orbitAngle);
          shipY = mouse.y + minDistance * Math.sin(orbitAngle);
          // Reset velocity to prevent drift
          shipVX = 0;
          shipVY = 0;
        } else {
          // Chase mouse for first 3 seconds, then dock
          if (!isDocked || !isStationary) {
            if (distance > minDistance) {
              // Normalize and apply speed
              shipVX += (dx / distance) * shipSpeed;
              shipVY += (dy / distance) * shipSpeed;

              // Apply damping
              shipVX *= shipDamping;
              shipVY *= shipDamping;

              // Update position
              shipX += shipVX;
              shipY += shipVY;
            } else {
              // Inside minDistance, slow down and mark as docked
              isDocked = true;
              shipVX *= shipDamping;
              shipVY *= shipDamping;
              shipX += shipVX;
              shipY += shipVY;
            }
          }

          // Boundary check
          if (shipX < 0) shipX = canvas.width;
          if (shipX > canvas.width) shipX = 0;
          if (shipY < 0) shipY = canvas.height;
          if (shipY > canvas.height) shipY = 0;
        }
      } else {
        // If no mouse, slowly stop
        shipVX *= shipDamping;
        shipVY *= shipDamping;
        shipX += shipVX;
        shipY += shipVY;
        mouse.stationaryTime = 0;
        isDocked = false;
      }

      // Draw spaceship with rotation towards mouse
      if (mouse.x !== null && mouse.y !== null) {
        ctx.save();
        ctx.translate(shipX, shipY);
        // Rotate based on direction to mouse, adjust by 90 degrees
        let angle = Math.atan2(mouse.y - shipY, mouse.x - shipX) + Math.PI / 2;
        ctx.rotate(angle);
        // Draw spaceship body (silver triangle, pointing up)
        ctx.fillStyle = "silver";
        ctx.beginPath();
        ctx.moveTo(0, -15); // Top point
        ctx.lineTo(-10, 10); // Bottom left
        ctx.lineTo(10, 10); // Bottom right
        ctx.closePath();
        ctx.fill();
        // Draw thruster (orange triangle, at bottom)
        ctx.fillStyle = "orange";
        ctx.beginPath();
        ctx.moveTo(-5, 10);
        ctx.lineTo(5, 10);
        ctx.lineTo(0, 25); // Extend thruster for effect
        ctx.closePath();
        ctx.fill();
        ctx.restore();
      }

      requestAnimationFrame(animate);
    }

    const handleMouseMove = (event) => {
      const rect = canvas.getBoundingClientRect();
      mouse.x = event.clientX - rect.left;
      mouse.y = event.clientY - rect.top;
      isDocked = false;
    };

    const handleMouseOut = () => {
      mouse.x = null;
      mouse.y = null;
      mouse.lastX = null;
      mouse.lastY = null;
      mouse.stationaryTime = 0;
      isDocked = false;
    };

    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      stars = [];
      init();
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseout", handleMouseOut);
    window.addEventListener("resize", handleResize);

    init();
    animate();

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseout", handleMouseOut);
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <canvas ref={canvasRef} className="fixed top-0 left-0 w-full h-full z-0" />
  );
};

export default StarryBackground;
