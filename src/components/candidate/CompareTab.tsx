"use client";

import { useMemo, useState } from "react";
import type { Candidate } from "@/lib/types";
import { THEME_IDS, THEME_MAP } from "@/lib/themes";
import { Badge, Card, SectionTitle } from "@/components/ui";
import AffinityRadar from "@/components/charts/AffinityRadar";

export default function CompareTab({
  candidate,
  allCandidates,
}: {
  candidate: Candidate;
  allCandidates: Candidate[];
}) {
  const opponents = allCandidates.filter((item) => item.id !== candidate.id);
  const [selected, setSelected] = useState<string[]>(
    opponents.map((item) => item.id),
  );

  const compared = useMemo(
    () => [candidate, ...opponents.filter((item) => selected.includes(item.id))],
    [candidate, opponents, selected],
  );

  const series = compared.map((item) => ({
    id: item.id,
    name: `${item.name.split(" ")[0]} (${item.party})`,
    color: item.accent,
    scores: item.themeScores,
  }));

  function toggle(id: string) {
    setSelected((current) =>
      current.includes(id)
        ? current.filter((item) => item !== id)
        : [...current, id],
    );
  }

  const stat = (item: Candidate) => {
    const avgScore = Math.round(
      item.themeScores.reduce((acc, score) => acc + score.score, 0) /
        item.themeScores.length,
    );
    const avgPromise = Math.round(
      item.promises.reduce((acc, promise) => acc + promise.progress, 0) /
        item.promises.length,
    );
    return { avgScore, avgPromise };
  };

  return (
    <div className="space-y-6">
      <Card>
        <SectionTitle
          title="Comparar concorrentes"
          subtitle="Selecione quem colocar lado a lado."
        />
        <div className="flex flex-wrap gap-2">
          {opponents.map((item) => {
            const active = selected.includes(item.id);
            return (
              <button
                key={item.id}
                type="button"
                onClick={() => toggle(item.id)}
                className={`rounded-full border px-4 py-2 text-sm font-medium transition ${
                  active
                    ? "border-brand bg-brand-soft text-brand-strong"
                    : "border-border text-muted hover:border-brand"
                }`}
              >
                {active ? "✓ " : ""}
                {item.name} ({item.party})
              </button>
            );
          })}
        </div>
      </Card>

      <Card>
        <SectionTitle title="Raio-X por tema" />
        <AffinityRadar series={series} />
        <div className="mt-4 flex flex-wrap justify-center gap-4">
          {series.map((item) => (
            <span key={item.id} className="flex items-center gap-2 text-xs text-muted">
              <span
                className="h-3 w-3 rounded-full"
                style={{ backgroundColor: item.color }}
              />
              {item.name}
            </span>
          ))}
        </div>
      </Card>

      <Card>
        <SectionTitle title="Índice de atuação por tema" />
        <div className="overflow-x-auto">
          <table className="w-full min-w-[520px] border-collapse text-sm">
            <thead>
              <tr className="border-b border-border text-left">
                <th className="py-2 pr-4 font-medium text-muted">Tema</th>
                {compared.map((item) => (
                  <th key={item.id} className="px-3 py-2 font-semibold text-foreground">
                    {item.name.split(" ")[0]}
                    <span className="ml-1 text-xs font-normal text-muted">
                      {item.party}
                    </span>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {THEME_IDS.map((theme) => {
                const values = compared.map(
                  (item) =>
                    item.themeScores.find((score) => score.theme === theme)?.score ??
                    0,
                );
                const max = Math.max(...values);
                return (
                  <tr key={theme} className="border-b border-border/60">
                    <td className="py-2 pr-4 text-muted">
                      {THEME_MAP[theme].icon} {THEME_MAP[theme].label}
                    </td>
                    {compared.map((item, index) => (
                      <td key={item.id} className="px-3 py-2">
                        <span
                          className={
                            values[index] === max
                              ? "font-bold text-brand-strong"
                              : "text-foreground"
                          }
                        >
                          {values[index]}
                        </span>
                      </td>
                    ))}
                  </tr>
                );
              })}
              <tr className="border-b border-border/60">
                <td className="py-2 pr-4 text-muted">Média geral</td>
                {compared.map((item) => (
                  <td key={item.id} className="px-3 py-2 font-medium text-foreground">
                    {stat(item).avgScore}
                  </td>
                ))}
              </tr>
              <tr>
                <td className="py-2 pr-4 text-muted">Promessas cumpridas</td>
                {compared.map((item) => (
                  <td key={item.id} className="px-3 py-2 text-foreground">
                    {stat(item).avgPromise}%
                  </td>
                ))}
              </tr>
            </tbody>
          </table>
        </div>
      </Card>

      <Card>
        <SectionTitle title="Ficha rápida" />
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {compared.map((item) => (
            <div key={item.id} className="rounded-xl border border-border p-4">
              <p className="font-semibold text-foreground">{item.name}</p>
              <div className="mt-2 flex flex-wrap gap-2">
                <Badge tone="brand">{item.party}</Badge>
                <Badge>{item.age} anos</Badge>
                <Badge>{item.state}</Badge>
              </div>
              <p className="mt-3 text-xs text-muted">Vice: {item.vice}</p>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}
