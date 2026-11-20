"use client";

import React, { useState, useEffect } from "react";

export const HeroTypingTitle: React.FC = () => {
  const line1Full = "WHERE GAMERS";
  const line2Full = "BECOME LEGENDS";

  const [line1, setLine1] = useState("");
  const [line2, setLine2] = useState("");
  const [showDot, setShowDot] = useState(false);
  const [activeCursorLine, setActiveCursorLine] = useState<1 | 2 | null>(1);

  useEffect(() => {
    let isCancelled = false;

    const startTyping = async () => {
      // Pause before typing starts
      await new Promise((r) => setTimeout(r, 350));
      if (isCancelled) return;

      // Type line 1 slower (115ms per character)
      for (let i = 1; i <= line1Full.length; i++) {
        if (isCancelled) return;
        setLine1(line1Full.slice(0, i));
        await new Promise((r) => setTimeout(r, 115));
      }

      // Pause between lines
      setActiveCursorLine(2);
      await new Promise((r) => setTimeout(r, 350));
      if (isCancelled) return;

      // Type line 2 slower (115ms per character)
      for (let i = 1; i <= line2Full.length; i++) {
        if (isCancelled) return;
        setLine2(line2Full.slice(0, i));
        await new Promise((r) => setTimeout(r, 115));
      }

      // Typing finished, show blinking dot and retire line caret
      setActiveCursorLine(null);
      setShowDot(true);
    };

    startTyping();

    return () => {
      isCancelled = true;
    };
  }, []);

  return (
    <h1
      className="hero-title relative select-none"
      aria-label="WHERE GAMERS BECOME LEGENDS."
    >
      {/* Invisible ghost placeholder to guarantee ZERO layout shift while typing */}
      <span className="invisible pointer-events-none select-none block" aria-hidden="true">
        {line1Full}
        <br />
        <span>{line2Full}.</span>
      </span>

      {/* Visible interactive typed content matching the 1st color combination */}
      <span className="absolute inset-0 block text-left">
        {/* Line 1: Pure crisp white (#F4F1FF / #FFFFFF) */}
        <span className="block hero-line-white tracking-tight">
          {line1}
          {activeCursorLine === 1 && (
            <span className="inline-block w-[3px] h-[0.85em] ml-1.5 bg-[#A855F7] animate-pulse align-middle shadow-[0_0_10px_#A855F7]" />
          )}
        </span>

        {/* Line 2: Signature ETHORA Purple (#A855F7) */}
        <span className="block hero-line-purple">
          {line2}
          {activeCursorLine === 2 && (
            <span className="inline-block w-[3px] h-[0.85em] ml-1.5 bg-[#A855F7] animate-pulse align-middle shadow-[0_0_12px_#A855F7]" />
          )}
          {showDot && (
            <span
              className="inline-block hero-line-purple ethora-blinking-dot ml-0.5"
              title="Where Gamers Become Legends"
            >
              .
            </span>
          )}
        </span>
      </span>
    </h1>
  );
};

export default HeroTypingTitle;

