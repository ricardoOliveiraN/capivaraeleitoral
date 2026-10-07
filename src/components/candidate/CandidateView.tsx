"use client";

import { useState } from "react";
import Link from "next/link";
import type { Candidate } from "@/lib/types";
import { Badge } from "@/components/ui";
import ProfileTab from "./ProfileTab";
import VotesTab from "./VotesTab";
import PromisesTab from "./PromisesTab";
import CompareTab from "./CompareTab";
import MatchTab from "./MatchTab";
import ChatTab from "./ChatTab";

const TABS = [
  { id: "perfil", label: "Perfil", icon: "👤" },
  { id: "votacoes", label: "Votações", icon: "🗳️" },
  { id: "promessas", label: "Promessas", icon: "📋" },
  { id: "comparar", label: "Comparar", icon: "⚖️" },
  { id: "match", label: "Match", icon: "🎯" },
  { id: "chat", label: "Chat", icon: "💬" },
] as const;

type TabId = (typeof TABS)[number]["id"];

export default function CandidateView({
  candidate,
  allCandidates,
}: {
  candidate: Candidate;
  allCandidates: Candidate[];
}) {
  const [active, setActive] = useState<TabId>("perfil");

  return (
    <div className="space-y-6">
      <Link href="/" className="inline-flex items-center gap-1 text-sm text-muted hover:text-foreground">
        ← Voltar para candidatos
      </Link>

      <header className="rounded-2xl border border-border bg-surface p-5 shadow-sm sm:p-6">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
          <span
            className="grid h-16 w-16 shrink-0 place-items-center rounded-2xl text-xl font-bold text-white"
            style={{ backgroundColor: candidate.accent }}
          >
            {candidate.initials}
          </span>
          <div className="flex-1">
            <h1 className="text-xl font-bold text-foreground sm:text-2xl">
              {candidate.name}
            </h1>
            <p className="mt-1 text-sm text-muted">{candidate.office}</p>
            <div className="mt-3 flex flex-wrap gap-2">
              <Badge tone="brand">{candidate.party}</Badge>
              <Badge>{candidate.state}</Badge>
              <Badge>{candidate.age} anos</Badge>
              <Badge>Vice: {candidate.vice}</Badge>
            </div>
          </div>
        </div>
        <p className="mt-4 text-sm leading-relaxed text-muted">{candidate.bio}</p>
      </header>

      <div className="sticky top-16 z-20 -mx-4 overflow-x-auto border-b border-border bg-background/95 px-4 backdrop-blur sm:mx-0 sm:rounded-xl sm:border sm:px-2">
        <div className="flex min-w-max gap-1 py-2">
          {TABS.map((tab) => {
            const isActive = tab.id === active;
            return (
              <button
                key={tab.id}
                type="button"
                onClick={() => setActive(tab.id)}
                className={`flex items-center gap-2 rounded-lg px-4 py-2 text-sm font-medium transition ${
                  isActive
                    ? "bg-brand text-white"
                    : "text-muted hover:bg-surface-muted hover:text-foreground"
                }`}
              >
                <span aria-hidden>{tab.icon}</span>
                {tab.label}
              </button>
            );
          })}
        </div>
      </div>

      <div>
        {active === "perfil" ? <ProfileTab candidate={candidate} /> : null}
        {active === "votacoes" ? <VotesTab candidate={candidate} /> : null}
        {active === "promessas" ? <PromisesTab candidate={candidate} /> : null}
        {active === "comparar" ? (
          <CompareTab candidate={candidate} allCandidates={allCandidates} />
        ) : null}
        {active === "match" ? (
          <MatchTab candidate={candidate} allCandidates={allCandidates} />
        ) : null}
        {active === "chat" ? (
          <ChatTab candidate={candidate} allCandidates={allCandidates} />
        ) : null}
      </div>
    </div>
  );
}
