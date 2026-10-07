"use client";

import { useMemo, useState } from "react";
import type { Candidate } from "@/lib/types";
import CandidateCard from "./CandidateCard";

export default function HomeExplorer({ candidates }: { candidates: Candidate[] }) {
  const [query, setQuery] = useState("");

  const filtered = useMemo(() => {
    const term = query.trim().toLowerCase();
    if (!term) return candidates;
    return candidates.filter((candidate) =>
      [candidate.name, candidate.party, candidate.office, candidate.state]
        .join(" ")
        .toLowerCase()
        .includes(term),
    );
  }, [candidates, query]);

  return (
    <div>
      <div className="mb-6">
        <label htmlFor="busca" className="sr-only">
          Buscar candidato
        </label>
        <div className="flex items-center gap-2 rounded-xl border border-border bg-surface px-4 py-3 shadow-sm">
          <span aria-hidden className="text-muted">
            🔎
          </span>
          <input
            id="busca"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Busque por nome, partido ou cargo"
            className="w-full bg-transparent text-sm text-foreground outline-none placeholder:text-muted"
          />
        </div>
      </div>

      {filtered.length === 0 ? (
        <p className="rounded-2xl border border-dashed border-border bg-surface p-8 text-center text-sm text-muted">
          Nenhum candidato encontrado para “{query}”.
        </p>
      ) : (
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((candidate) => (
            <CandidateCard key={candidate.id} candidate={candidate} />
          ))}
        </div>
      )}
    </div>
  );
}
