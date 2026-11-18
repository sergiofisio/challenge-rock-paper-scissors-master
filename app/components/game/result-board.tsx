"use client";

import { useEffect, useRef } from "react";
import Hand from "@/app/components/hand";
import type { GamePhase } from "@/lib/game";
import { resultLabel } from "@/lib/game";

type ActivePhase = Exclude<GamePhase, { step: "pick" }>;

interface ResultBoardProps {
  phase: ActivePhase;
  onPlayAgain: () => void;
}

function Slot({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-w-0 flex-col items-center gap-4 sm:gap-6 lg:gap-10">
      <p className="order-2 text-xs font-bold tracking-[0.2em] text-white uppercase sm:text-sm lg:order-1 lg:text-base">
        {label}
      </p>
      <div className="order-1 flex size-24 items-center justify-center sm:size-32 lg:order-2 lg:size-52">
        {children}
      </div>
    </div>
  );
}

export default function ResultBoard({ phase, onPlayAgain }: ResultBoardProps) {
  const playAgainRef = useRef<HTMLButtonElement>(null);
  const showResult = phase.step === "result";
  const playerWins = showResult && phase.result === "win";
  const houseWins = showResult && phase.result === "lose";

  useEffect(() => {
    if (showResult) playAgainRef.current?.focus();
  }, [showResult]);

  const announcement =
    phase.step === "waiting"
      ? `You picked ${phase.player}. Waiting for the house.`
      : phase.step === "reveal"
        ? `You picked ${phase.player}. The house picked ${phase.house}.`
        : `You picked ${phase.player}. The house picked ${phase.house}. ${resultLabel(phase.result)}.`;

  return (
    <div className="relative mt-10 flex w-full max-w-5xl flex-col items-center gap-8 sm:gap-10 lg:mt-16">
      <p className="sr-only" aria-live="polite">
        {announcement}
      </p>

      <div className="flex w-full max-w-full items-center justify-center gap-3 sm:gap-10 lg:gap-20">
        <Slot label="You picked">
          <Hand type={phase.player} size="lg" winner={playerWins} />
        </Slot>

        <Slot label="The house picked">
          {phase.step === "waiting" ? (
            <span
              aria-hidden
              className="size-20 rounded-full bg-black/25 sm:size-28 lg:size-40"
            />
          ) : (
            <Hand
              type={phase.house}
              size="lg"
              winner={houseWins}
              className="animate-[fade-in_0.35s_ease-out] motion-reduce:animate-none"
            />
          )}
        </Slot>
      </div>

      {phase.step === "result" && (
        <div className="flex flex-col items-center gap-4 lg:absolute lg:top-1/2 lg:left-1/2 lg:-translate-x-1/2 lg:-translate-y-1/2">
          <h2 className="text-4xl font-bold tracking-wide text-white uppercase sm:text-5xl">
            {resultLabel(phase.result)}
          </h2>
          <button
            type="button"
            ref={playAgainRef}
            onClick={onPlayAgain}
            className="cursor-pointer rounded-lg bg-white px-10 py-3 text-sm font-bold tracking-[0.2em] text-navy-900 uppercase transition-colors hover:text-red-600 sm:px-12"
          >
            Play again
          </button>
        </div>
      )}
    </div>
  );
}
