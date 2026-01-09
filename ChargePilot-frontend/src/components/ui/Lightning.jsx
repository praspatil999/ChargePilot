import { useEffect, useRef } from "react";

const Lightning = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    canvas.width = window.innerWidth;
    canvas.height = 300; // ❗ NOT full screen

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.strokeStyle = "rgba(120, 120, 255, 0.3)";
    ctx.lineWidth = 2;

    ctx.beginPath();
    ctx.moveTo(0, canvas.height / 2);
    ctx.lineTo(canvas.width, canvas.height / 2);
    ctx.stroke();
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: "absolute",
        top: 0,
        left: 0,
        width: "100%",
        height: "300px",
        zIndex: 0,              // ✅ CRITICAL
        pointerEvents: "none",  // ✅ CRITICAL
      }}
    />
  );
};

export default Lightning;
