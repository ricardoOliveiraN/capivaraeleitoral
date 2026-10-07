import type { Candidate, ThemeId, ThemeWeights } from "./types";
import { THEME_IDS } from "./themes";

export const DEFAULT_WEIGHTS: ThemeWeights = THEME_IDS.reduce(
  (acc, id) => {
    acc[id] = 5;
    return acc;
  },
  {} as ThemeWeights,
);

export interface AffinityResult {
  candidate: Candidate;
  score: number;
  perTheme: { theme: ThemeId; weight: number; score: number }[];
}

export function computeAffinity(
  candidate: Candidate,
  weights: ThemeWeights,
): AffinityResult {
  let weighted = 0;
  let totalWeight = 0;
  const perTheme: AffinityResult["perTheme"] = [];

  for (const id of THEME_IDS) {
    const weight = weights[id] ?? 0;
    const score =
      candidate.themeScores.find((item) => item.theme === id)?.score ?? 0;
    weighted += weight * score;
    totalWeight += weight;
    perTheme.push({ theme: id, weight, score });
  }

  const score = totalWeight === 0 ? 0 : Math.round(weighted / totalWeight);
  return { candidate, score, perTheme };
}

export function rankCandidates(
  candidates: Candidate[],
  weights: ThemeWeights,
): AffinityResult[] {
  return candidates
    .map((candidate) => computeAffinity(candidate, weights))
    .sort((a, b) => b.score - a.score);
}

export function matchLabel(score: number): string {
  if (score >= 75) return "Alta afinidade";
  if (score >= 55) return "Afinidade moderada";
  if (score >= 35) return "Baixa afinidade";
  return "Pouca afinidade";
}
