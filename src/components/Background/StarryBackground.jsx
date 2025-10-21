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
    let nebulae = [];
    let constellations = [];


    let shipX = canvas.width / 2;
    let shipY = canvas.height / 2;
    let shipVX = 0;
    let shipVY = 0;
    let orbitAngle = 0;
    let isDocked = false;
    const shipSpeed = 0.5;
    const shipDamping = 0.95;
    const minDistance = 50;
    const orbitSpeed = 0.02;
    const stationaryThreshold = 5;


    class Star {
      constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.size = Math.random() * 2 + 1;
        this.speedX = (Math.random() - 0.5) * 0.1;
        this.speedY = (Math.random() - 0.5) * 0.1;
        this.brightness = Math.random() * 0.3 + 0.3;
        this.color = Math.random() > 0.8 ? "#00d4ff" : "#ffffff";
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
        const [r, g, b] =
          this.color === "#00d4ff" ? [0, 212, 255] : [255, 255, 255];
        ctx.fillStyle = `rgba(${r}, ${g}, ${b}, ${this.brightness})`;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
      }
    }

    class Meteor {
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

    class Nebula {
      constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.radius = Math.random() * 150 + 100;
        this.opacity = Math.random() * 0.1 + 0.05;
        this.color = Math.random() > 0.5 ? "#4a90e2" : "#9b59b6";
        this.pulseSpeed = Math.random() * 0.02 + 0.01;
        this.pulseOffset = Math.random() * Math.PI * 2;
      }
      update() {
        this.pulseOffset += this.pulseSpeed;
        this.opacity = Math.sin(this.pulseOffset) * 0.05 + 0.1;
      }
      draw() {
        const gradient = ctx.createRadialGradient(
          this.x,
          this.y,
          0,
          this.x,
          this.y,
          this.radius,
        );
        const [r, g, b] =
          this.color === "#4a90e2" ? [74, 144, 226] : [155, 89, 182];
        gradient.addColorStop(0, `rgba(${r}, ${g}, ${b}, ${this.opacity})`);
        gradient.addColorStop(
          0.5,
          `rgba(${r}, ${g}, ${b}, ${this.opacity * 0.5})`,
        );
        gradient.addColorStop(1, `rgba(${r}, ${g}, ${b}, 0)`);

        ctx.fillStyle = gradient;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.fill();
      }
    }

    class Constellation {
      constructor(isLibra = false) {
        this.stars = [];
        this.lines = [];
        this.opacity = Math.random() * 0.3 + 0.2;
        this.twinkleSpeed = Math.random() * 0.05 + 0.02;
        this.twinkleOffset = Math.random() * Math.PI * 2;
        this.isLibra = isLibra;

        if (isLibra) {
          this.createLibraConstellation();
        } else {
          this.createRandomConstellation();
        }
      }

      createLibraConstellation() {


        const centerX = canvas.width * 0.75;
        const centerY = canvas.height * 0.4;
        const scale = Math.min(canvas.width, canvas.height) * 0.15;


        this.libraLabel = {
          x: centerX,
          y: centerY - scale * 0.8,
          text: "♎ Libra",
        };


        this.stars = [

          {
            x: centerX - 0.3 * scale,
            y: centerY - 0.3 * scale,
            size: 1.7,
            brightness: 0.9,
          },

          {
            x: centerX - 0.02 * scale,
            y: centerY - 0.6 * scale,
            size: 3.8,
            brightness: 1.0,
          },

          {
            x: centerX + 0.4 * scale,
            y: centerY - 0.2 * scale,
            size: 1.7,
            brightness: 0.5,
          },

          {
            x: centerX + 0.2 * scale,
            y: centerY + 0.3 * scale,
            size: 1.7,
            brightness: 0.7,
          },

          {
            x: centerX - 0.3 * scale,
            y: centerY + 0.6 * scale,
            size: 1.7,
            brightness: 0.5,
          },
        ];

        this.lines = [
          { start: this.stars[0], end: this.stars[1] },
          { start: this.stars[1], end: this.stars[2] },
          { start: this.stars[2], end: this.stars[0] },
          { start: this.stars[2], end: this.stars[3] },
          { start: this.stars[0], end: this.stars[4] },
        ];


        this.libraColor = "#FFD700";
        this.opacity = 0.4;
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
        if (this.isLibra) {


          ctx.strokeStyle = `rgba(255, 215, 0, ${this.opacity * 0.8})`;
          ctx.lineWidth = 2;
          ctx.shadowColor = "#FFD700";
          ctx.shadowBlur = 5;

          this.lines.forEach((line) => {
            ctx.beginPath();
            ctx.moveTo(line.start.x, line.start.y);
            ctx.lineTo(line.end.x, line.end.y);
            ctx.stroke();
          });


          ctx.shadowBlur = 0;


          this.stars.forEach((star) => {

            ctx.fillStyle = `rgba(255, 215, 0, ${this.opacity * 0.3})`;
            ctx.beginPath();
            ctx.arc(star.x, star.y, star.size * 2, 0, Math.PI * 2);
            ctx.fill();


            ctx.fillStyle = `rgba(255, 215, 0, ${this.opacity * star.brightness})`;
            ctx.beginPath();
            ctx.arc(star.x, star.y, star.size, 0, Math.PI * 2);
            ctx.fill();


            ctx.fillStyle = `rgba(255, 255, 255, ${this.opacity * 0.9})`;
            ctx.beginPath();
            ctx.arc(star.x, star.y, star.size * 0.3, 0, Math.PI * 2);
            ctx.fill();
          });


          if (this.libraLabel) {
            ctx.save();
            ctx.font = "16px Arial";
            ctx.fillStyle = `rgba(255, 215, 0, ${this.opacity * 0.8})`;
            ctx.textAlign = "center";
            ctx.fillText(
              this.libraLabel.text,
              this.libraLabel.x,
              this.libraLabel.y,
            );
            ctx.restore();
          }
        } else {


          ctx.strokeStyle = `rgba(173, 216, 230, ${this.opacity * 0.5})`;
          ctx.lineWidth = 1;
          this.lines.forEach((line) => {
            ctx.beginPath();
            ctx.moveTo(line.start.x, line.start.y);
            ctx.lineTo(line.end.x, line.end.y);
            ctx.stroke();
          });


          this.stars.forEach((star) => {
            ctx.fillStyle = `rgba(255, 255, 255, ${this.opacity})`;
            ctx.beginPath();
            ctx.arc(star.x, star.y, star.size, 0, Math.PI * 2);
            ctx.fill();
          });
        }
      }
    }

    function init() {
      const initialStarCount = window.innerWidth < 768 ? 100 : 200;
      for (let i = 0; i < initialStarCount; i++) {
        stars.push(new Star());
      }


      const nebulaCount = window.innerWidth < 768 ? 2 : 4;
      for (let i = 0; i < nebulaCount; i++) {
        nebulae.push(new Nebula());
      }


      constellations.push(new Constellation(true)); 

      
      const additionalConstellationCount = window.innerWidth < 768 ? 0 : 2;
      for (let i = 0; i < additionalConstellationCount; i++) {
        constellations.push(new Constellation(false));
      }

      shipX = canvas.width / 2;
      shipY = canvas.height / 2;
      isDocked = false;
      orbitAngle = 0;
    }

    function animate() {
      ctx.fillStyle = "#0a0a23";
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

      
      if (mouse.x !== null && mouse.y !== null) {
        
        let isStationary = false;
        if (mouse.lastX !== null && mouse.lastY !== null) {
          let dx = mouse.x - mouse.lastX;
          let dy = mouse.y - mouse.lastY;
          let mouseMoved = Math.sqrt(dx * dx + dy * dy) > 1;
          if (!mouseMoved) {
            mouse.stationaryTime += 1 / 60; 
            if (mouse.stationaryTime >= stationaryThreshold) {
              isStationary = true;
            }
          } else {
            mouse.stationaryTime = 0;
            isDocked = false; 
          }
        } else {
          
          mouse.lastX = mouse.x;
          mouse.lastY = mouse.y;
          mouse.stationaryTime = 0;
          isDocked = false;
        }

        mouse.lastX = mouse.x;
        mouse.lastY = mouse.y;

        
        let dx = mouse.x - shipX;
        let dy = mouse.y - shipY;
        let distance = Math.sqrt(dx * dx + dy * dy);

        if (isStationary && isDocked) {
          
          orbitAngle += orbitSpeed;
          shipX = mouse.x + minDistance * Math.cos(orbitAngle);
          shipY = mouse.y + minDistance * Math.sin(orbitAngle);
          
          shipVX = 0;
          shipVY = 0;
        } else {
          
          if (!isDocked || !isStationary) {
            if (distance > minDistance) {
              
              shipVX += (dx / distance) * shipSpeed;
              shipVY += (dy / distance) * shipSpeed;

              
              shipVX *= shipDamping;
              shipVY *= shipDamping;

              
              shipX += shipVX;
              shipY += shipVY;
            } else {
              
              isDocked = true;
              shipVX *= shipDamping;
              shipVY *= shipDamping;
              shipX += shipVX;
              shipY += shipVY;
            }
          }

          
          if (shipX < 0) shipX = canvas.width;
          if (shipX > canvas.width) shipX = 0;
          if (shipY < 0) shipY = canvas.height;
          if (shipY > canvas.height) shipY = 0;
        }
      } else {
        
        shipVX *= shipDamping;
        shipVY *= shipDamping;
        shipX += shipVX;
        shipY += shipVY;
        mouse.stationaryTime = 0;
        isDocked = false;
      }

      
      if (mouse.x !== null && mouse.y !== null) {
        ctx.save();
        ctx.translate(shipX, shipY);
        
        let angle = Math.atan2(mouse.y - shipY, mouse.x - shipX) + Math.PI / 2;
        ctx.rotate(angle);
        
        ctx.fillStyle = "silver";
        ctx.beginPath();
        ctx.moveTo(0, -15); 
        ctx.lineTo(-10, 10); 
        ctx.lineTo(10, 10); 
        ctx.closePath();
        ctx.fill();
        
        ctx.fillStyle = "orange";
        ctx.beginPath();
        ctx.moveTo(-5, 10);
        ctx.lineTo(5, 10);
        ctx.lineTo(0, 25); 
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
      nebulae = [];
      constellations = [];
      const newStarCount = window.innerWidth < 768 ? 100 : 200;
      for (let i = 0; i < newStarCount; i++) {
        stars.push(new Star());
      }

      
      const nebulaCount = window.innerWidth < 768 ? 2 : 4;
      for (let i = 0; i < nebulaCount; i++) {
        nebulae.push(new Nebula());
      }

      
      constellations.push(new Constellation(true)); 

      
      const additionalConstellationCount = window.innerWidth < 768 ? 0 : 2;
      for (let i = 0; i < additionalConstellationCount; i++) {
        constellations.push(new Constellation(false));
      }

      shipX = canvas.width / 2;
      shipY = canvas.height / 2;
      isDocked = false;
      orbitAngle = 0;
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
