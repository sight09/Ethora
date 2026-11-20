"use client";

import React from "react";
import Image from "next/image";

export const InteractiveAuthMascot: React.FC = () => {
  return (
    <div className="relative w-full flex-1 flex items-center justify-center select-none py-4">
      {/* 1. Synchronized Pulsing Neon Energy Aura behind mascot */}
      <div className="aura-pulse-pure absolute w-[340px] sm:w-[420px] h-[340px] sm:h-[420px] rounded-full bg-gradient-to-tr from-purple-700/35 via-violet-600/40 to-fuchsia-600/25 blur-[75px] pointer-events-none" />

      {/* 2. Secondary Core Radial Glow */}
      <div className="absolute w-[220px] h-[220px] rounded-full bg-violet-500/25 blur-[50px] pointer-events-none" />

      {/* 3. Pure Autonomous Up-and-Down Moving Mascot Container */}
      <div className="mascot-float-pure relative z-10 w-full max-w-[430px] xl:max-w-[490px]">
        <Image
          src="/images/ethora-mascot.png"
          alt="ETHORA Mascot"
          width={600}
          height={625}
          priority
          className="w-full h-auto object-contain filter drop-shadow-[0_20px_35px_rgba(168,85,247,0.55)] drop-shadow-[0_0_45px_rgba(147,51,234,0.45)]"
        />
      </div>

      {/* Pure Vertical Up-and-Down Motion CSS (No 3D tilt, no mouse tracking, no rotation) */}
      <style jsx>{`
        @keyframes mascotFloatUpDown {
          0% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-26px);
          }
          100% {
            transform: translateY(0px);
          }
        }

        @keyframes auraPulseUpDown {
          0% {
            transform: scale(0.92);
            opacity: 0.35;
          }
          50% {
            transform: scale(1.08);
            opacity: 0.55;
          }
          100% {
            transform: scale(0.92);
            opacity: 0.35;
          }
        }

        .mascot-float-pure {
          animation: mascotFloatUpDown 3.8s ease-in-out infinite;
          will-change: transform;
        }

        .aura-pulse-pure {
          animation: auraPulseUpDown 3.8s ease-in-out infinite;
          will-change: transform, opacity;
        }
      `}</style>
    </div>
  );
};

export default InteractiveAuthMascot;
