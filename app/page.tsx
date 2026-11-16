"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import PickBoard from "./components/game/pick-board";
import ResultBoard from "./components/game/result-board";
import Rules from "./components/modal/rules";
import Text from "./components/text";
import {
  computerChoice,
  determineWinner,
  type GameResult,
  type GameStep,
  type HandType,
} from "@/lib/game";

export default function Home() {
  const [score, setScore] = useState(0);
  const [step, setStep] = useState<GameStep>("pick");
  const [player, setPlayer] = useState<HandType | null>(null);
  const [house, setHouse] = useState<HandType | null>(null);
  const [result, setResult] = useState<GameResult | null>(null);
  const [rulesOpen, setRulesOpen] = useState(false);
  const [hydrated, setHydrated] = useState(false);
  const timers = useRef<number[]>([]);

  useEffect(() => {
    const saved = localStorage.getItem("score");
    if (saved !== null) setScore(Number(saved) || 0);
    setHydrated(true);

    return () => {
      timers.current.forEach((id) => window.clearTimeout(id));
    };
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    localStorage.setItem("score", score.toString());
  }, [score, hydrated]);

  function clearTimers() {
    timers.current.forEach((id) => window.clearTimeout(id));
    timers.current = [];
  }

  function handlePick(hand: HandType) {
    clearTimers();

    const housePick = computerChoice();
    const outcome = determineWinner(hand, housePick);

    setPlayer(hand);
    setHouse(null);
    setResult(null);
    setStep("waiting");

    timers.current.push(
      window.setTimeout(() => {
        setHouse(housePick);
        setStep("reveal");
      }, 1000),
    );

    timers.current.push(
      window.setTimeout(() => {
        setResult(outcome);
        setStep("result");
        setScore((prev) => {
          if (outcome === "win") return prev + 1;
          if (outcome === "lose") return Math.max(0, prev - 1);
          return prev;
        });
      }, 1600),
    );
  }

  function handlePlayAgain() {
    clearTimers();
    setStep("pick");
    setPlayer(null);
    setHouse(null);
    setResult(null);
  }

  return (
    <main className="relative flex min-h-screen w-full flex-col items-center gap-8 bg-radial-bg px-6! py-8! lg:gap-12 lg:py-12!">
      <header className="flex w-full max-w-176 items-center justify-between rounded-2xl border-[3px] border-gray-600 px-4! py-3! lg:rounded-3xl lg:px-6! lg:py-4!">
        <Image
          src="/assets/images/logo-bonus.svg"
          alt="Rock Paper Scissors Lizard Spock"
          width={110}
          height={110}
          className="h-16 w-auto lg:h-28"
          priority
        />
        <div className="flex min-w-22 flex-col items-center justify-center rounded-lg bg-white px-5! py-2.5! lg:min-w-36 lg:rounded-xl lg:px-8! lg:py-4!">
          <Text
            className="text-[0.65rem] tracking-[0.15em] text-blue-700"
            label="score"
          />
          <Text
            className="text-5xl leading-none text-navy-900 lg:text-6xl"
            label={score.toString()}
          />
        </div>
      </header>

      {step === "pick" || !player ? (
        <PickBoard onPick={handlePick} />
      ) : (
        <ResultBoard
          step={step}
          player={player}
          house={house}
          result={result}
          onPlayAgain={handlePlayAgain}
        />
      )}

      <button
        type="button"
        className="mt-auto self-center rounded-lg border-2 border-white/60 px-9! py-2.5! tracking-[0.2em] text-white uppercase transition-colors hover:bg-white hover:text-navy-900 lg:absolute lg:right-8 lg:bottom-8 lg:mt-0 cursor-pointer"
        onClick={() => setRulesOpen(true)}
      >
        Rules
      </button>

      {rulesOpen && (
        <Rules open={rulesOpen} onClose={() => setRulesOpen(false)} />
      )}
    </main>
  );
}
