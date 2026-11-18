import { asset } from "@/lib/assets";

export type HandType = "rock" | "paper" | "scissors" | "lizard" | "spock";
export type GameResult = "win" | "lose" | "draw";

/** Discriminated match phases — invalid combinations are unrepresentable. */
export type GamePhase =
  | { step: "pick" }
  | { step: "waiting"; player: HandType }
  | { step: "reveal"; player: HandType; house: HandType }
  | { step: "result"; player: HandType; house: HandType; result: GameResult };

export const HANDS: HandType[] = [
  "rock",
  "paper",
  "scissors",
  "lizard",
  "spock",
];

export const HAND_ICONS: Record<HandType, string> = {
  rock: asset("/assets/images/icon-rock.svg"),
  paper: asset("/assets/images/icon-paper.svg"),
  scissors: asset("/assets/images/icon-scissors.svg"),
  lizard: asset("/assets/images/icon-lizard.svg"),
  spock: asset("/assets/images/icon-spock.svg"),
};

/** Each hand beats these two. */
export const BEATS: Record<HandType, HandType[]> = {
  rock: ["scissors", "lizard"],
  paper: ["rock", "spock"],
  scissors: ["paper", "lizard"],
  lizard: ["spock", "paper"],
  spock: ["scissors", "rock"],
};

/** Accessible plain-language rules for the modal. */
export const RULES_COPY: string[] = [
  "Scissors cuts Paper",
  "Paper covers Rock",
  "Rock crushes Lizard",
  "Lizard poisons Spock",
  "Spock smashes Scissors",
  "Scissors decapitates Lizard",
  "Lizard eats Paper",
  "Paper disproves Spock",
  "Spock vaporizes Rock",
  "Rock crushes Scissors",
];

export function computerChoice(): HandType {
  return HANDS[Math.floor(Math.random() * HANDS.length)];
}

export function determineWinner(
  player: HandType,
  house: HandType,
): GameResult {
  if (player === house) return "draw";
  return BEATS[player].includes(house) ? "win" : "lose";
}

export function nextScore(score: number, result: GameResult): number {
  if (result === "win") return score + 1;
  if (result === "lose") return Math.max(0, score - 1);
  return score;
}

export function resultLabel(result: GameResult): string {
  if (result === "win") return "You win";
  if (result === "lose") return "You lose";
  return "Draw";
}
