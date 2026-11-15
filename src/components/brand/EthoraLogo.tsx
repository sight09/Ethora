import React from "react";
import Link from "next/link";

interface EthoraLogoProps {
  size?: "sm" | "md" | "lg" | "xl";
  showTagline?: boolean;
  showWordmark?: boolean;
  className?: string;
  asLink?: boolean;
  onClick?: () => void;
  title?: string;
}

export const EthoraEmblem: React.FC<{
  size?: "sm" | "md" | "lg" | "xl";
  className?: string;
  onClick?: () => void;
  title?: string;
}> = ({
  size = "md",
  className = "",
  onClick,
  title,
}) => {
  const dimensions = {
    sm: "w-8 h-8",
    md: "w-10 h-10",
    lg: "w-14 h-14",
    xl: "w-20 h-20",
  }[size];

  const content = (
    <div
      onClick={onClick}
      title={title}
      className={`relative inline-flex items-center justify-center shrink-0 ${dimensions} ${className} ${
        onClick ? "cursor-pointer group hover:scale-105 active:scale-95 transition-all" : ""
      }`}
    >
      {/* Outer ambient glow */}
      <div className="absolute inset-0 bg-violet-600/40 rounded-xl blur-md -z-10 group-hover:blur-xl transition-all" />

      {/* The User-Provided ETHORA Esports Hooded Assassin Mascot Logo */}
      <img
        src="/images/ethora-logo.jpg"
        alt="ETHORA Logo"
        className="w-full h-full object-cover rounded-xl border border-violet-500/50 shadow-glow-violet transition-transform"
      />
    </div>
  );

  return content;
};

export const EthoraLogo: React.FC<EthoraLogoProps> = ({
  size = "md",
  showTagline = true,
  showWordmark = true,
  className = "",
  asLink = true,
  onClick,
  title,
}) => {
  const content = (
    <div
      onClick={onClick}
      title={title}
      className={`group inline-flex items-center gap-3 select-none ${
        onClick ? "cursor-pointer" : ""
      } ${className}`}
    >
      <EthoraEmblem size={size} />

      {showWordmark && (
        <div className="flex flex-col">
          <div className="flex items-center gap-1.5 leading-none">
            {/* MInT Specification: Logo wordmark: Fraunces (serif), 18px, weight 500 */}
            <span className="font-serif font-medium text-[18px] tracking-wide text-white">
              ETH<span className="text-violet-400">O</span>RA
            </span>
            <div className="h-1.5 w-1.5 rounded-full bg-cyan-400 animate-pulse" />
          </div>

          {showTagline && (
            <div className="flex items-center gap-1.5 mt-0.5">
              {/* MInT Specification: Logo subtitle: Public Sans, 12px, weight 400 */}
              <span className="font-sans font-normal text-[12px] text-slate-400">
                Ethiopia Esports Network
              </span>
              <span className="inline-block w-3 h-[2px] rounded-full ethiopia-flag-stripe" />
            </div>
          )}
        </div>
      )}
    </div>
  );

  if (asLink && !onClick) {
    return (
      <Link href="/" className="focus:outline-none focus-visible:ring-2 focus-visible:ring-violet-500 rounded-lg">
        {content}
      </Link>
    );
  }

  return content;
};

export default EthoraLogo;
