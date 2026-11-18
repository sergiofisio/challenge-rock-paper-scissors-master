import { afterEach, describe, expect, it, vi } from "vitest";
import { readStoredScore, writeStoredScore } from "./score-storage";

describe("score storage", () => {
  afterEach(() => {
    vi.unstubAllGlobals();
  });

  it("reads a valid non-negative score", () => {
    vi.stubGlobal("localStorage", {
      getItem: () => "12",
      setItem: vi.fn(),
    });
    expect(readStoredScore()).toBe(12);
  });

  it("rejects NaN and negative values", () => {
    vi.stubGlobal("localStorage", {
      getItem: () => "-3",
      setItem: vi.fn(),
    });
    expect(readStoredScore()).toBeNull();

    vi.stubGlobal("localStorage", {
      getItem: () => "abc",
      setItem: vi.fn(),
    });
    expect(readStoredScore()).toBeNull();
  });

  it("returns null when storage throws", () => {
    vi.stubGlobal("localStorage", {
      getItem: () => {
        throw new Error("SecurityError");
      },
      setItem: vi.fn(),
    });
    expect(readStoredScore()).toBeNull();
  });

  it("writes without throwing when storage is blocked", () => {
    vi.stubGlobal("localStorage", {
      getItem: () => null,
      setItem: () => {
        throw new Error("QuotaExceededError");
      },
    });
    expect(() => writeStoredScore(4)).not.toThrow();
  });
});
