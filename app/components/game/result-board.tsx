"use client";

import { useEffect, useRef } from "react";
import Hand from "@/app/components/hand";
import type { GameResult, GameStep, HandType } from "@/lib/game";
import { resultLabel } from "@/lib/game";

interface ResultBoardProps {
  step: Exclude<GameStep, "pick">;
  player: HandType;
  house: HandType | null;
  result: GameResult | null;
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
    <div className="flex flex-col items-center gap-6 lg:gap-10">
      <p className="order-2 text-sm font-bold tracking-[0.2em] text-white uppercase lg:order-1 lg:text-base">
        {label}
      </p>
      <div className="order-1 flex size-36 items-center justify-center lg:order-2 lg:size-52">
        {children}
      </div>
    </div>
  );
}

export default function ResultBoard({
  step,
  player,
  house,
  result,
  onPlayAgain,
}: ResultBoardProps) {
  const playAgainRef = useRef<HTMLButtonElement>(null);
  const showResult = step === "result" && result !== null;
  const playerWins = result === "win";
  const houseWins = result === "lose";

  useEffect(() => {
    if (showResult) playAgainRef.current?.focus();
  }, [showResult]);

  return (
    <div className="relative mt-10 flex w-full max-w-5xl flex-col items-center gap-10 lg:mt-16">
      <p className="sr-only" aria-live="polite">
        {showResult && house && result
          ? `You picked ${player}. The house picked ${house}. ${resultLabel(result)}.`
          : step === "waiting"
            ? `You picked ${player}. Waiting for the house.`
            : house
              ? `You picked ${player}. The house picked ${house}.`
              : ""}
      </p>

      <div className="flex w-full items-center justify-center gap-6 sm:gap-12 lg:gap-20">
        <Slot label="You picked">
          <Hand
            type={player}
            size="lg"
            winner={showResult ? playerWins : false}
          />
        </Slot>

        <Slot label="The house picked">
          {step === "waiting" || !house ? (
            <span
              aria-hidden
              className="size-28 rounded-full bg-black/25 lg:size-40"
            />
          ) : (
            <Hand
              type={house}
              size="lg"
              winner={showResult ? houseWins : false}
              className="animate-[fade-in_0.35s_ease-out] motion-reduce:animate-none"
            />
          )}
        </Slot>
      </div>

      {showResult && (
        <div className="flex flex-col items-center gap-4 lg:absolute lg:top-1/2 lg:left-1/2 lg:-translate-x-1/2 lg:-translate-y-1/2">
          <h2 className="text-5xl font-bold tracking-wide text-white uppercase">
            {resultLabel(result)}
          </h2>
          <button
            type="button"
            ref={playAgainRef}
            onClick={onPlayAgain}
            className="cursor-pointer rounded-lg bg-white px-12 py-3 text-sm font-bold tracking-[0.2em] text-navy-900 uppercase transition-colors hover:text-red-600"
          >
            Play again
          </button>
        </div>
      )}
    </div>
  );
}
