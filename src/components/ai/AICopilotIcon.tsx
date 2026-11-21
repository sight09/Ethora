"use client";

import React, { useId } from "react";

interface AICopilotIconProps {
  className?: string;
  size?: number | string;
}

export const AICopilotIcon: React.FC<AICopilotIconProps> = ({
  className = "w-full h-full",
  size,
}) => {
  const uniqueId = useId().replace(/:/g, "_");
  const bgId = `ai-bot-bg-${uniqueId}`;
  const bodyId = `ai-bot-body-${uniqueId}`;
  const glowId = `ai-bot-glow-${uniqueId}`;

  return (
    <svg
      viewBox="0 0 128 128"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      width={size}
      height={size}
    >
      <defs>
        <radialGradient id={bgId} cx="50%" cy="40%" r="60%">
          <stop offset="0%" stopColor="#1E1733" />
          <stop offset="100%" stopColor="#05030D" />
        </radialGradient>
        <linearGradient id={bodyId} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#C084FC" />
          <stop offset="100%" stopColor="#7C3AED" />
        </linearGradient>
        <filter id={glowId} x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation="3" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>

      {/* Background disc with neon ring */}
      <circle
        cx="64"
        cy="64"
        r="60"
        fill={`url(#${bgId})`}
        stroke="#A855F7"
        strokeWidth="3"
        filter={`url(#${glowId})`}
      />

      {/* Antenna */}
      <line
        x1="64"
        y1="34"
        x2="64"
        y2="22"
        stroke="#A855F7"
        strokeWidth="3"
        strokeLinecap="round"
      />

      {/* Antenna halo (pulses outward) */}
      <circle cx="64" cy="18" r="5" fill="#22D3EE" opacity="0.4">
        <animate attributeName="r" values="5;11;5" dur="1.5s" repeatCount="indefinite" />
        <animate attributeName="opacity" values="0.5;0;0.5" dur="1.5s" repeatCount="indefinite" />
      </circle>

      {/* Antenna light (blinks) */}
      <circle cx="64" cy="18" r="5" fill="#22D3EE" filter={`url(#${glowId})`}>
        <animate attributeName="opacity" values="1;0.2;1" dur="1.5s" repeatCount="indefinite" />
      </circle>

      {/* Ears */}
      <rect x="22" y="56" width="10" height="22" rx="5" fill="#A855F7" />
      <rect x="96" y="56" width="10" height="22" rx="5" fill="#A855F7" />

      {/* Head */}
      <rect x="32" y="34" width="64" height="56" rx="18" fill={`url(#${bodyId})`} />

      {/* Visor */}
      <rect x="40" y="50" width="48" height="26" rx="10" fill="#05030D" />

      {/* Blinking eyes */}
      <ellipse cx="54" cy="63" rx="5" ry="5" fill="#E9D5FF" filter={`url(#${glowId})`}>
        <animate
          attributeName="ry"
          values="5;5;0.6;5;5"
          keyTimes="0;0.92;0.95;0.98;1"
          dur="4s"
          repeatCount="indefinite"
        />
      </ellipse>
      <ellipse cx="74" cy="63" rx="5" ry="5" fill="#E9D5FF" filter={`url(#${glowId})`}>
        <animate
          attributeName="ry"
          values="5;5;0.6;5;5"
          keyTimes="0;0.92;0.95;0.98;1"
          dur="4s"
          repeatCount="indefinite"
        />
      </ellipse>

      {/* Mouth */}
      <path
        d="M56 80 Q64 84 72 80"
        fill="none"
        stroke="#E9D5FF"
        strokeWidth="3"
        strokeLinecap="round"
      />
    </svg>
  );
};

export default AICopilotIcon;
