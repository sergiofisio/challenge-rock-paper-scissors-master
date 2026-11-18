"use client";

import { useEffect, useRef, useState } from "react";
import {
  computerChoice,
  determineWinner,
  nextScore,
  type GamePhase,
  type HandType,
} from "@/lib/game";
import { readStoredScore, writeStoredScore } from "@/lib/score-storage";

const REVEAL_MS = 1000;
const RESULT_MS = 1600;

export function useGame() {
  const [score, setScore] = useState(0);
  const [phase, setPhase] = useState<GamePhase>({ step: "pick" });
  const [hydrated, setHydrated] = useState(false);
  const timers = useRef<number[]>([]);

  useEffect(() => {
    const saved = readStoredScore();
    if (saved !== null) setScore(saved);
    setHydrated(true);

    return () => {
      timers.current.forEach((id) => window.clearTimeout(id));
    };
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    writeStoredScore(score);
  }, [score, hydrated]);

  function clearTimers() {
    timers.current.forEach((id) => window.clearTimeout(id));
    timers.current = [];
  }

  function pick(hand: HandType) {
    clearTimers();

    const housePick = computerChoice();
    const outcome = determineWinner(hand, housePick);

    setPhase({ step: "waiting", player: hand });

    timers.current.push(
      window.setTimeout(() => {
        setPhase({ step: "reveal", player: hand, house: housePick });
      }, REVEAL_MS),
    );

    timers.current.push(
      window.setTimeout(() => {
        setPhase({
          step: "result",
          player: hand,
          house: housePick,
          result: outcome,
        });
        setScore((prev) => nextScore(prev, outcome));
      }, RESULT_MS),
    );
  }

  function playAgain() {
    clearTimers();
    setPhase({ step: "pick" });
  }

  return { score, phase, pick, playAgain };
}
