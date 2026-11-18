import { asset } from "@/lib/assets";

export type HandType = "rock" | "paper" | "scissors" | "lizard" | "spock";
export type GameResult = "win" | "lose" | "draw";
export type GameStep = "pick" | "waiting" | "reveal" | "result";

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
const BEATS: Record<HandType, HandType[]> = {
  rock: ["scissors", "lizard"],
  paper: ["rock", "spock"],
  scissors: ["paper", "lizard"],
  lizard: ["spock", "paper"],
  spock: ["scissors", "rock"],
};

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

export function resultLabel(result: GameResult): string {
  if (result === "win") return "You win";
  if (result === "lose") return "You lose";
  return "Draw";
}
