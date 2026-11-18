import Image from "next/image";
import type { HandType } from "@/lib/game";
import { HAND_ICONS } from "@/lib/game";

interface HandProps {
  type: HandType;
  onClick?: () => void;
  position?: string;
  size?: "sm" | "md" | "lg";
  winner?: boolean;
  className?: string;
}

const RING: Record<HandType, { ring: string; shadow: string }> = {
  scissors: {
    ring: "bg-linear-to-b from-gold-500 to-gold-600",
    shadow:
      "shadow-[0_6px_0_var(--color-gold-600),0_10px_20px_rgba(0,0,0,0.35)]",
  },
  paper: {
    ring: "bg-linear-to-b from-blue-500 to-blue-700",
    shadow:
      "shadow-[0_6px_0_var(--color-blue-700),0_10px_20px_rgba(0,0,0,0.35)]",
  },
  rock: {
    ring: "bg-linear-to-b from-red-600 to-red-800",
    shadow:
      "shadow-[0_6px_0_var(--color-red-800),0_10px_20px_rgba(0,0,0,0.35)]",
  },
  lizard: {
    ring: "bg-linear-to-b from-purple-600 to-purple-700",
    shadow:
      "shadow-[0_6px_0_var(--color-purple-700),0_10px_20px_rgba(0,0,0,0.35)]",
  },
  spock: {
    ring: "bg-linear-to-b from-light-blue-400 to-light-blue-500",
    shadow:
      "shadow-[0_6px_0_var(--color-light-blue-500),0_10px_20px_rgba(0,0,0,0.35)]",
  },
};

const SIZE: Record<NonNullable<HandProps["size"]>, string> = {
  sm: "size-28 p-3.5 lg:size-32 lg:p-4",
  md: "size-32 p-4 lg:size-40 lg:p-5",
  lg: "size-36 p-[1.1rem] lg:size-52 lg:p-6",
};

export default function Hand({
  type,
  onClick,
  position = "",
  size = "md",
  winner = false,
  className = "",
}: HandProps) {
  const { ring, shadow } = RING[type];
  const tokenClass = `${SIZE[size]} relative z-10 rounded-full ${ring} ${shadow}`;

  const tokenInner = (
    <span className="flex size-full items-center justify-center rounded-full bg-token-face shadow-[inset_0_5px_0_rgba(0,0,0,0.15)]">
      <Image
        src={HAND_ICONS[type]}
        alt=""
        width={64}
        height={64}
        className="pointer-events-none h-auto w-[45%]"
      />
    </span>
  );

  return (
    <div
      className={`isolate flex items-center justify-center ${position || "relative"} ${className}`}
    >
      {winner && (
        <span
          aria-hidden
          className="pointer-events-none absolute inset-0 -z-10 flex items-center justify-center"
        >
          <span className="absolute size-[140%] rounded-full bg-white/5" />
          <span className="absolute size-[180%] rounded-full bg-white/4" />
          <span className="absolute size-[220%] rounded-full bg-white/3" />
        </span>
      )}

      {onClick ? (
        <button
          type="button"
          onClick={onClick}
          aria-label={type}
          className={`${tokenClass} cursor-pointer transition-transform hover:scale-105 active:translate-y-1 active:shadow-none`}
        >
          {tokenInner}
        </button>
      ) : (
        <div className={tokenClass}>{tokenInner}</div>
      )}
    </div>
  );
}
