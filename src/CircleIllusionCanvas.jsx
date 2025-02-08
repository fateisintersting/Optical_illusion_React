import React, { useEffect, useRef } from "react";

export default function CircleIllusionCanvas({balls =10,speed = 1000,varient = 1}) {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return; // Ensure the canvas exists before accessing
    const ctx = canvas.getContext("2d");

    
    const width = window.innerWidth;
    const height = window.innerHeight;
    canvas.width = width;
    canvas.height = height;
    ctx.translate(width/2,height/2)


    // Draw Function
    const draw = (x, y, radius = 20) => {
      ctx.beginPath();
      ctx.arc(x, y, radius, 0, Math.PI * 2);
      ctx.fillStyle = "white";
      ctx.fill();
    };

    // Animation Function
    function animate() {
      ctx.clearRect(-width /2 ,-height /2 ,width,height); // Clear previous frame

      for(let i= 0; i < balls;i++){
      const offset = Date.now()/speed + varient * i * Math.PI / balls ; // Time-based animation
      const x = Math.sin(offset) * height /2; // Move sinusoidally
       // Stay in center vertically
      ctx.save();
      ctx.rotate(i * Math.PI / balls)
      draw(x, 0); // Draw moving dot
      ctx.restore()

      }
      
      requestAnimationFrame(animate);
    }

    animate(); // Start animation loop

  }, [balls,speed,varient]);

  return (
    <canvas
      ref={canvasRef}
      style={{ background: "black", }}
    />
  );
}
