"use client";

import { useMemo, useState } from "react";
import type { Candidate, PromiseStatus } from "@/lib/types";
import { THEME_MAP } from "@/lib/themes";
import { Badge, Card, ProgressBar, SectionTitle } from "@/components/ui";

const STATUS_TONE: Record<
  PromiseStatus,
  "success" | "warning" | "info" | "danger" | "neutral"
> = {
  cumprida: "success",
  "em andamento": "info",
  parcial: "warning",
  "nao cumprida": "danger",
};

const STATUS_LABEL: Record<PromiseStatus, string> = {
  cumprida: "Cumprida",
  "em andamento": "Em andamento",
  parcial: "Parcial",
  "nao cumprida": "Não cumprida",
};

const FILTERS: { id: PromiseStatus | "todas"; label: string }[] = [
  { id: "todas", label: "Todas" },
  { id: "cumprida", label: "Cumpridas" },
  { id: "em andamento", label: "Em andamento" },
  { id: "parcial", label: "Parciais" },
  { id: "nao cumprida", label: "Não cumpridas" },
];

export default function PromisesTab({ candidate }: { candidate: Candidate }) {
  const [filter, setFilter] = useState<PromiseStatus | "todas">("todas");

  const filtered = useMemo(
    () =>
      candidate.promises.filter(
        (promise) => filter === "todas" || promise.status === filter,
      ),
    [candidate.promises, filter],
  );

  return (
    <Card>
      <SectionTitle
        title="Promessas de campanha"
        subtitle="Compromissos assumidos e o avanço de cada um após a eleição."
      />

      <div className="mb-5 flex flex-wrap gap-2">
        {FILTERS.map((item) => (
          <button
            key={item.id}
            type="button"
            onClick={() => setFilter(item.id)}
            className={`rounded-full border px-3 py-1.5 text-xs font-medium transition ${
              filter === item.id
                ? "border-brand bg-brand-soft text-brand-strong"
                : "border-border text-muted hover:border-brand"
            }`}
          >
            {item.label}
          </button>
        ))}
      </div>

      <ul className="space-y-4">
        {filtered.map((promise) => (
          <li
            key={promise.id}
            className="rounded-xl border border-border bg-surface-muted/40 p-4"
          >
            <div className="flex flex-wrap items-center gap-2">
              <Badge tone="brand">{THEME_MAP[promise.theme].label}</Badge>
              <Badge tone={STATUS_TONE[promise.status]}>
                {STATUS_LABEL[promise.status]}
              </Badge>
              <span className="ml-auto text-xs text-muted">
                Desde {promise.since}
              </span>
            </div>
            <p className="mt-3 text-sm font-semibold text-foreground">
              {promise.title}
            </p>
            <p className="mt-1 text-sm text-muted">{promise.description}</p>
            <div className="mt-3">
              <ProgressBar
                value={promise.progress}
                color={THEME_MAP[promise.theme].color}
                label="Avanço"
              />
            </div>
            {promise.evidence ? (
              <p className="mt-2 text-xs text-muted">📌 {promise.evidence}</p>
            ) : null}
          </li>
        ))}
      </ul>

      {filtered.length === 0 ? (
        <p className="rounded-xl border border-dashed border-border p-6 text-center text-sm text-muted">
          Nenhuma promessa neste status.
        </p>
      ) : null}
    </Card>
  );
}
