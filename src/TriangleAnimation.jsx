import React, { useRef, useEffect } from "react";

export default function TriangleAnimation({squares=20,speed=500,size=10,objectcolor="red",backgroundcolor="black"}) {
  const canvasRef = useRef(null);
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");

    const width = (canvas.width = window.innerWidth);
    const height = (canvas.height = window.innerHeight);
    ctx.translate(width / 2, height / 2);

 

    function drawSquare(x, y) {
      ctx.fillStyle = objectcolor;
      ctx.fillRect(x - size / 2, y - size / 2, size, size);
    }

    function animate() {
      ctx.clearRect(-width / 2, -height / 2, width, height);

      for (let i = 0; i < squares; i++) {
        const timeOffset = Date.now() / speed + varient + (i * Math.PI) / squares;

        // Triangle wave motion
        const x = Math.sin(timeOffset) * (height / 3);
        const y = Math.sin(timeOffset * 2) * (height / 4);

        ctx.save();
        ctx.rotate(i * (Math.PI / 3)); // Rotating for triangle effect
        drawSquare(x, y);
        ctx.restore();
      }

      requestAnimationFrame(animate);
    }

    animate();
  }, []);

  return <canvas ref={canvasRef} style={{ background: backgroundcolor }} />;
}
