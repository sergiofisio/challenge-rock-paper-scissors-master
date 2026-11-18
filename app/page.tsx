"use client";

import Image from "next/image";
import { useRef, useState } from "react";
import PickBoard from "./components/game/pick-board";
import ResultBoard from "./components/game/result-board";
import RulesModal from "./components/rules-modal";
import ScoreLabel from "./components/score-label";
import { useGame } from "@/hooks/use-game";
import { asset } from "@/lib/assets";

export default function Home() {
  const { score, phase, pick, playAgain } = useGame();
  const [rulesOpen, setRulesOpen] = useState(false);
  const rulesButtonRef = useRef<HTMLButtonElement>(null);

  function handleRulesClose() {
    setRulesOpen(false);
    rulesButtonRef.current?.focus();
  }

  return (
    <main className="relative flex min-h-screen w-full flex-col items-center gap-8 overflow-x-clip bg-radial-bg px-4 py-8 sm:px-6 lg:gap-12 lg:py-12">
      <header className="flex w-full max-w-176 items-center justify-between rounded-2xl border-[3px] border-gray-600 px-3 py-3 sm:px-4 lg:rounded-3xl lg:px-6 lg:py-4">
        <h1>
          <Image
            src={asset("/assets/images/logo-bonus.svg")}
            alt="Rock Paper Scissors Lizard Spock"
            width={110}
            height={110}
            className="h-14 w-auto sm:h-16 lg:h-28"
            priority
          />
        </h1>
        <div
          className="flex min-w-18 flex-col items-center justify-center rounded-lg bg-white px-4 py-2 sm:min-w-22 sm:px-5 sm:py-2.5 lg:min-w-36 lg:rounded-xl lg:px-8 lg:py-4"
          aria-live="polite"
        >
          <ScoreLabel
            className="text-[0.65rem] tracking-[0.15em] text-blue-700"
            label="score"
          />
          <ScoreLabel
            className="text-4xl leading-none text-navy-900 sm:text-5xl lg:text-6xl"
            label={score.toString()}
          />
        </div>
      </header>

      {phase.step === "pick" ? (
        <PickBoard onPick={pick} />
      ) : (
        <ResultBoard phase={phase} onPlayAgain={playAgain} />
      )}

      <button
        ref={rulesButtonRef}
        type="button"
        className="mt-auto cursor-pointer self-center rounded-lg border-2 border-white/60 px-9 py-2.5 tracking-[0.2em] text-white uppercase transition-colors hover:bg-white hover:text-navy-900 lg:absolute lg:right-8 lg:bottom-8 lg:mt-0"
        onClick={() => setRulesOpen(true)}
      >
        Rules
      </button>

      <RulesModal open={rulesOpen} onClose={handleRulesClose} />
    </main>
  );
}
