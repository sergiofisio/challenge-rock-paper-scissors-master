const SCORE_KEY = "score";

function parseScore(raw: string | null): number | null {
  if (raw === null) return null;
  const value = Number(raw);
  if (!Number.isFinite(value) || value < 0) return null;
  return Math.floor(value);
}

/** Read score from localStorage without throwing (private mode / SSR). */
export function readStoredScore(): number | null {
  try {
    return parseScore(localStorage.getItem(SCORE_KEY));
  } catch {
    return null;
  }
}

/** Persist score; no-ops if storage is unavailable. */
export function writeStoredScore(score: number): void {
  try {
    localStorage.setItem(SCORE_KEY, String(Math.max(0, Math.floor(score))));
  } catch {
    // Ignore quota / privacy errors
  }
}
