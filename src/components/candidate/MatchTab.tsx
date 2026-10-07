"use client";

import { useMemo, useState } from "react";
import type { Candidate, ThemeId, ThemeWeights } from "@/lib/types";
import { THEME_MAP, THEME_IDS } from "@/lib/themes";
import { DEFAULT_WEIGHTS, matchLabel, rankCandidates } from "@/lib/match";
import { Card, ProgressBar, ScoreRing, SectionTitle } from "@/components/ui";

const PRESETS: { id: string; label: string; weights: Partial<ThemeWeights> }[] = [
  { id: "equilibrado", label: "Equilibrado", weights: { ...DEFAULT_WEIGHTS } },
  {
    id: "social",
    label: "Pauta social",
    weights: { saude: 9, educacao: 9, direitos: 8, trabalho: 8 },
  },
  {
    id: "economico",
    label: "Economia e obras",
    weights: { economia: 9, infraestrutura: 8, trabalho: 7 },
  },
  {
    id: "seguranca",
    label: "Segurança e ordem",
    weights: { seguranca: 10, economia: 6, direitos: 2 },
  },
];

function applyPreset(preset: (typeof PRESETS)[number]): ThemeWeights {
  const base = { ...DEFAULT_WEIGHTS };
  for (const id of THEME_IDS) {
    const value = preset.weights[id];
    base[id] = value ?? 3;
  }
  return base;
}

export default function MatchTab({
  candidate,
  allCandidates,
}: {
  candidate: Candidate;
  allCandidates: Candidate[];
}) {
  const [weights, setWeights] = useState<ThemeWeights>({ ...DEFAULT_WEIGHTS });
  const [preset, setPreset] = useState("equilibrado");

  const ranking = useMemo(
    () => rankCandidates(allCandidates, weights),
    [allCandidates, weights],
  );
  const own = ranking.find((item) => item.candidate.id === candidate.id);
  const leader = ranking[0];

  function update(id: ThemeId, value: number) {
    setWeights((current) => ({ ...current, [id]: value }));
    setPreset("custom");
  }

  return (
    <div className="space-y-6">
      <Card>
        <SectionTitle
          title="Suas prioridades"
          subtitle="Ajuste o peso que cada tema tem para você. O match é calculado com base nas ações e promessas de cada candidato."
        />

        <div className="mb-5 flex flex-wrap gap-2">
          {PRESETS.map((item) => (
            <button
              key={item.id}
              type="button"
              onClick={() => {
                setWeights(applyPreset(item));
                setPreset(item.id);
              }}
              className={`rounded-full border px-4 py-2 text-sm font-medium transition ${
                preset === item.id
                  ? "border-brand bg-brand-soft text-brand-strong"
                  : "border-border text-muted hover:border-brand"
              }`}
            >
              {item.label}
            </button>
          ))}
        </div>

        <div className="space-y-4">
          {THEME_IDS.map((id) => (
            <div key={id} className="flex items-center gap-4">
              <span className="w-40 shrink-0 text-sm text-foreground">
                {THEME_MAP[id].icon} {THEME_MAP[id].label}
              </span>
              <input
                type="range"
                min={0}
                max={10}
                value={weights[id]}
                onChange={(event) => update(id, Number(event.target.value))}
                className="h-2 flex-1 cursor-pointer appearance-none rounded-full bg-surface-muted"
                aria-label={`Peso para ${THEME_MAP[id].label}`}
              />
              <span className="w-8 shrink-0 text-right text-sm font-semibold text-foreground">
                {weights[id]}
              </span>
            </div>
          ))}
        </div>
      </Card>

      <div className="grid gap-6 lg:grid-cols-[280px_1fr]">
        <Card className="flex flex-col items-center justify-center">
          <SectionTitle title="Seu match" />
          <ScoreRing
            value={own?.score ?? 0}
            size={140}
            color={candidate.accent}
            caption={`${candidate.name.split(" ")[0]} · ${matchLabel(own?.score ?? 0)}`}
          />
          {leader ? (
            <p className="mt-4 text-center text-sm text-muted">
              Maior afinidade no momento:{" "}
              <span className="font-semibold text-foreground">
                {leader.candidate.name}
              </span>{" "}
              ({leader.score}%)
            </p>
          ) : null}
        </Card>

        <Card>
          <SectionTitle title="Ranking de afinidade" />
          <div className="space-y-5">
            {ranking.map((item) => (
              <div key={item.candidate.id}>
                <div className="mb-1 flex items-center justify-between text-sm">
                  <span className="font-medium text-foreground">
                    {item.candidate.name}{" "}
                    <span className="text-muted">({item.candidate.party})</span>
                  </span>
                  <span className="font-semibold text-foreground">
                    {item.score}% · {matchLabel(item.score)}
                  </span>
                </div>
                <ProgressBar value={item.score} color={item.candidate.accent} />
              </div>
            ))}
          </div>
        </Card>
      </div>

      {own ? (
        <Card>
          <SectionTitle
            title="Onde o match acontece"
            subtitle="Peso que você deu × índice de atuação do candidato, por tema."
          />
          <div className="space-y-3">
            {own.perTheme
              .filter((item) => item.weight > 0)
              .sort((a, b) => b.weight * b.score - a.weight * a.score)
              .map((item) => (
                <div
                  key={item.theme}
                  className="flex items-center justify-between gap-3 text-sm"
                >
                  <span className="text-foreground">
                    {THEME_MAP[item.theme].icon} {THEME_MAP[item.theme].label}
                  </span>
                  <span className="text-muted">
                    peso {item.weight} × {item.score}
                  </span>
                </div>
              ))}
          </div>
        </Card>
      ) : null}
    </div>
  );
}
