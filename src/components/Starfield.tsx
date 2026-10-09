import { useEffect, useRef } from "react";

/** Champ d'étoiles dérivant lentement + parallaxe souris. */
export default function Starfield() {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current!;
    const ctx = canvas.getContext("2d")!;
    let w = (canvas.width = innerWidth);
    let h = (canvas.height = innerHeight);
    let mx = 0, my = 0, raf = 0;

    const stars = Array.from({ length: 140 }, () => ({
      x: Math.random() * w,
      y: Math.random() * h,
      z: Math.random() * 0.8 + 0.2, // profondeur → vitesse & taille
      r: Math.random() * 1.3 + 0.3,
    }));

    const onMove = (e: MouseEvent) => {
      mx = (e.clientX / w - 0.5) * 18;
      my = (e.clientY / h - 0.5) * 18;
    };
    const onResize = () => {
      w = canvas.width = innerWidth;
      h = canvas.height = innerHeight;
    };

    const tick = () => {
      ctx.clearRect(0, 0, w, h);
      for (const s of stars) {
        s.y += s.z * 0.12;
        if (s.y > h + 2) { s.y = -2; s.x = Math.random() * w; }
        ctx.globalAlpha = 0.25 + s.z * 0.6;
        ctx.fillStyle = s.z > 0.85 ? "#9f8fff" : "#cfd6e4";
        ctx.beginPath();
        ctx.arc(s.x + mx * s.z, s.y + my * s.z, s.r, 0, Math.PI * 2);
        ctx.fill();
      }
      raf = requestAnimationFrame(tick);
    };

    addEventListener("mousemove", onMove);
    addEventListener("resize", onResize);
    tick();
    return () => {
      cancelAnimationFrame(raf);
      removeEventListener("mousemove", onMove);
      removeEventListener("resize", onResize);
    };
  }, []);

  return <canvas ref={ref} className="starfield" aria-hidden="true" />;
}