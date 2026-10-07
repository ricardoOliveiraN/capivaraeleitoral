"use client";

import { useMemo, useState } from "react";
import type { Candidate, ThemeId, VotePosition } from "@/lib/types";
import { THEME_MAP, THEME_IDS } from "@/lib/themes";
import { Badge, Card, SectionTitle } from "@/components/ui";

const POSITION_TONE = {
  sim: "success",
  nao: "danger",
  abstencao: "warning",
  ausente: "neutral",
} as const;

const POSITION_LABEL: Record<VotePosition, string> = {
  sim: "Votou SIM",
  nao: "Votou NÃO",
  abstencao: "Abstenção",
  ausente: "Ausente",
};

export default function VotesTab({ candidate }: { candidate: Candidate }) {
  const [theme, setTheme] = useState<ThemeId | "todos">("todos");
  const [outcome, setOutcome] = useState<"todos" | "aprovado" | "reprovado">(
    "todos",
  );

  const filtered = useMemo(() => {
    return candidate.votes
      .filter((vote) => theme === "todos" || vote.theme === theme)
      .filter((vote) => outcome === "todos" || vote.outcome === outcome)
      .sort((a, b) => (a.date < b.date ? 1 : -1));
  }, [candidate.votes, theme, outcome]);

  return (
    <Card>
      <SectionTitle
        title="Votações no Congresso"
        subtitle="Projetos aprovados e reprovados com a posição registrada."
      />

      <div className="mb-5 flex flex-col gap-3 sm:flex-row sm:items-center">
        <select
          value={theme}
          onChange={(event) => setTheme(event.target.value as ThemeId | "todos")}
          className="rounded-lg border border-border bg-surface px-3 py-2 text-sm text-foreground"
          aria-label="Filtrar por tema"
        >
          <option value="todos">Todos os temas</option>
          {THEME_IDS.map((id) => (
            <option key={id} value={id}>
              {THEME_MAP[id].label}
            </option>
          ))}
        </select>

        <div className="flex gap-2">
          {(["todos", "aprovado", "reprovado"] as const).map((value) => (
            <button
              key={value}
              type="button"
              onClick={() => setOutcome(value)}
              className={`rounded-lg border px-3 py-2 text-xs font-medium capitalize transition ${
                outcome === value
                  ? "border-brand bg-brand-soft text-brand-strong"
                  : "border-border text-muted hover:border-brand"
              }`}
            >
              {value === "todos" ? "Todos" : value}
            </button>
          ))}
        </div>
      </div>

      <ul className="space-y-3">
        {filtered.map((vote) => (
          <li
            key={vote.id}
            className="rounded-xl border border-border bg-surface-muted/40 p-4"
          >
            <div className="flex flex-wrap items-center gap-2">
              <Badge tone="brand">{THEME_MAP[vote.theme].label}</Badge>
              <Badge tone={POSITION_TONE[vote.position]}>
                {POSITION_LABEL[vote.position]}
              </Badge>
              <Badge tone={vote.outcome === "aprovado" ? "info" : "neutral"}>
                {vote.outcome === "aprovado" ? "Aprovado" : "Reprovado"}
              </Badge>
              <span className="ml-auto text-xs text-muted">{vote.date}</span>
            </div>
            <p className="mt-3 text-sm font-semibold text-foreground">
              {vote.title}
            </p>
            <p className="mt-1 text-sm text-muted">{vote.description}</p>
            {vote.note ? (
              <p className="mt-2 text-xs text-muted">ℹ️ {vote.note}</p>
            ) : null}
          </li>
        ))}
      </ul>

      {filtered.length === 0 ? (
        <p className="rounded-xl border border-dashed border-border p-6 text-center text-sm text-muted">
          Nenhuma votação encontrada para este filtro.
        </p>
      ) : null}
    </Card>
  );
}
