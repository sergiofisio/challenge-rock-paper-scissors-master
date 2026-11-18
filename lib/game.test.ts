import { describe, expect, it } from "vitest";
import {
  BEATS,
  HANDS,
  determineWinner,
  nextScore,
  resultLabel,
} from "./game";

describe("determineWinner", () => {
  it("returns draw when both hands match", () => {
    for (const hand of HANDS) {
      expect(determineWinner(hand, hand)).toBe("draw");
    }
  });

  it("returns win when the player hand beats the house", () => {
    expect(determineWinner("rock", "scissors")).toBe("win");
    expect(determineWinner("scissors", "paper")).toBe("win");
    expect(determineWinner("paper", "rock")).toBe("win");
    expect(determineWinner("lizard", "spock")).toBe("win");
    expect(determineWinner("spock", "rock")).toBe("win");
  });

  it("returns lose when the house beats the player", () => {
    expect(determineWinner("scissors", "rock")).toBe("lose");
    expect(determineWinner("spock", "lizard")).toBe("lose");
    expect(determineWinner("rock", "paper")).toBe("lose");
  });

  it("covers every BEATS pairing both ways", () => {
    for (const player of HANDS) {
      for (const beaten of BEATS[player]) {
        expect(determineWinner(player, beaten)).toBe("win");
        expect(determineWinner(beaten, player)).toBe("lose");
      }
    }
  });
});

describe("nextScore", () => {
  it("increments on win", () => {
    expect(nextScore(3, "win")).toBe(4);
  });

  it("decrements on lose but never below zero", () => {
    expect(nextScore(2, "lose")).toBe(1);
    expect(nextScore(0, "lose")).toBe(0);
  });

  it("keeps the score on draw", () => {
    expect(nextScore(5, "draw")).toBe(5);
  });
});

describe("resultLabel", () => {
  it("maps results to player-facing copy", () => {
    expect(resultLabel("win")).toBe("You win");
    expect(resultLabel("lose")).toBe("You lose");
    expect(resultLabel("draw")).toBe("Draw");
  });
});
