"use client";

import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";

export const InteractiveAuthMascot: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);
  const [clickPulse, setClickPulse] = useState(false);

  // Mouse parallax / 3D tilt interaction
  useEffect(() => {
    let animationFrameId: number;
    let targetX = 0;
    let targetY = 0;
    let currentX = 0;
    let currentY = 0;

    const handleMouseMove = (e: MouseEvent) => {
      // Calculate cursor position relative to screen center (-1 to 1)
      const { innerWidth, innerHeight } = window;
      targetX = ((e.clientX - innerWidth * 0.3) / (innerWidth * 0.5)) * 14;
      targetY = ((e.clientY - innerHeight * 0.5) / (innerHeight * 0.5)) * 14;
      // Clamp bounds
      targetX = Math.max(-16, Math.min(16, targetX));
      targetY = Math.max(-16, Math.min(16, targetY));
    };

    const handleMouseLeave = () => {
      targetX = 0;
      targetY = 0;
    };

    // Smooth lerp loop
    const updateMotion = () => {
      currentX += (targetX - currentX) * 0.08;
      currentY += (targetY - currentY) * 0.08;
      setTilt({ x: currentX, y: currentY });
      animationFrameId = requestAnimationFrame(updateMotion);
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    window.addEventListener("mouseleave", handleMouseLeave);
    animationFrameId = requestAnimationFrame(updateMotion);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseleave", handleMouseLeave);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  const handleClick = () => {
    setClickPulse(true);
    setTimeout(() => setClickPulse(false), 600);
  };

  return (
    <div
      ref={containerRef}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={handleClick}
      className="relative w-full flex-1 flex items-center justify-center select-none cursor-pointer py-4"
      style={{ perspective: "1000px" }}
      title="Interactive ETHORA Mascot — click to pulse!"
    >
      {/* 1. Ambient Pulsing Neon Energy Aura behind mascot */}
      <div className="absolute w-[340px] sm:w-[420px] h-[340px] sm:h-[420px] rounded-full bg-gradient-to-tr from-purple-700/35 via-violet-600/40 to-fuchsia-600/25 blur-[75px] pointer-events-none animate-pulse" />

      {/* 2. Secondary Core Radial Glow */}
      <div className="absolute w-[220px] h-[220px] rounded-full bg-violet-500/30 blur-[45px] pointer-events-none" />

      {/* 3. Shockwave ring effect on click */}
      {clickPulse && (
        <div className="absolute w-[200px] h-[200px] rounded-full border-2 border-purple-400/80 animate-ping pointer-events-none" />
      )}

      {/* 4. Floating & Tilting Mascot Wrapper */}
      <div
        className="relative z-10 w-full max-w-[430px] xl:max-w-[490px] transition-transform duration-200 ease-out"
        style={{
          transform: `rotateY(${tilt.x}deg) rotateX(${-tilt.y}deg) scale(${isHovered ? 1.04 : 1})`,
          transformStyle: "preserve-3d",
        }}
      >
        {/* Autonomous Floating Keyframe Container */}
        <div className="mascot-self-floating relative">
          <Image
            src="/images/ethora-mascot.png"
            alt="ETHORA Mascot"
            width={600}
            height={625}
            priority
            className="w-full h-auto object-contain filter drop-shadow-[0_15px_30px_rgba(168,85,247,0.5)] drop-shadow-[0_0_40px_rgba(147,51,234,0.4)] transition-all duration-300"
          />

          {/* Interactive Sparkle Particles */}
          <div className="absolute -top-3 left-10 w-2.5 h-2.5 rounded-full bg-purple-300 shadow-[0_0_12px_#c084fc] animate-ping pointer-events-none opacity-80" />
          <div className="absolute top-1/3 -right-2 w-2 h-2 rounded-full bg-fuchsia-300 shadow-[0_0_10px_#e879f9] animate-pulse pointer-events-none opacity-70" />
          <div className="absolute bottom-16 -left-3 w-2 h-2 rounded-full bg-violet-300 shadow-[0_0_10px_#a855f7] animate-pulse pointer-events-none opacity-75" />
        </div>
      </div>

      {/* Embedded CSS for autonomous self-floating motion */}
      <style jsx>{`
        @keyframes mascotSelfFloat {
          0% {
            transform: translateY(0px) rotate(0deg);
          }
          25% {
            transform: translateY(-9px) rotate(1.2deg);
          }
          50% {
            transform: translateY(-18px) rotate(0deg);
          }
          75% {
            transform: translateY(-9px) rotate(-1.2deg);
          }
          100% {
            transform: translateY(0px) rotate(0deg);
          }
        }

        .mascot-self-floating {
          animation: mascotSelfFloat 5.5s ease-in-out infinite;
          will-change: transform;
        }
      `}</style>
    </div>
  );
};

export default InteractiveAuthMascot;
