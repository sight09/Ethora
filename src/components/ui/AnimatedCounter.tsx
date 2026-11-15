"use client";

import React, { useState, useEffect, useRef } from "react";

interface AnimatedCounterProps {
  target: number;
  duration?: number;
  decimals?: number;
  prefix?: string;
  suffix?: string;
  formatComma?: boolean;
  className?: string;
  reanimateOnHover?: boolean;
}

export const AnimatedCounter: React.FC<AnimatedCounterProps> = ({
  target,
  duration = 2200,
  decimals = 0,
  prefix = "",
  suffix = "",
  formatComma = true,
  className = "",
  reanimateOnHover = true,
}) => {
  const [count, setCount] = useState(0);
  const [hasAnimated, setHasAnimated] = useState(false);
  const elementRef = useRef<HTMLSpanElement>(null);
  const rafRef = useRef<number | null>(null);

  const startAnimation = () => {
    if (rafRef.current) {
      cancelAnimationFrame(rafRef.current);
    }

    const startTime = performance.now();
    const startValue = 0;

    const easeOutExpo = (t: number): number => {
      return t === 1 ? 1 : 1 - Math.pow(2, -10 * t);
    };

    const animate = (currentTime: number) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const easedProgress = easeOutExpo(progress);

      const currentValue = startValue + (target - startValue) * easedProgress;
      setCount(currentValue);

      if (progress < 1) {
        rafRef.current = requestAnimationFrame(animate);
      } else {
        setCount(target);
        setHasAnimated(true);
      }
    };

    rafRef.current = requestAnimationFrame(animate);
  };

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !hasAnimated) {
            startAnimation();
          }
        });
      },
      { threshold: 0.2 }
    );

    const currentElem = elementRef.current;
    if (currentElem) {
      observer.observe(currentElem);
    }

    // Trigger on mount as well in case already in viewport
    startAnimation();

    return () => {
      if (currentElem) {
        observer.unobserve(currentElem);
      }
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current);
      }
    };
  }, [target, duration]);

  const handleMouseEnter = () => {
    if (reanimateOnHover) {
      startAnimation();
    }
  };

  const formattedCount = () => {
    let valueStr = decimals > 0 ? count.toFixed(decimals) : Math.round(count).toString();
    if (formatComma) {
      const parts = valueStr.split(".");
      parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
      valueStr = parts.join(".");
    }
    return `${prefix}${valueStr}${suffix}`;
  };

  return (
    <span
      ref={elementRef}
      onMouseEnter={handleMouseEnter}
      className={`inline-block tabular-nums transition-transform ${className}`}
      title={`Current metric: ${prefix}${decimals > 0 ? target.toFixed(decimals) : target}${suffix} (Hover to replay)`}
    >
      {formattedCount()}
    </span>
  );
};

export default AnimatedCounter;

