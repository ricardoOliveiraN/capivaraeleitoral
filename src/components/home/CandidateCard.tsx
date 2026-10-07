import Link from "next/link";
import type { Candidate } from "@/lib/types";
import { THEME_MAP } from "@/lib/themes";
import { Badge, ProgressBar } from "@/components/ui";

export default function CandidateCard({ candidate }: { candidate: Candidate }) {
  const topThemes = [...candidate.themeScores]
    .sort((a, b) => b.score - a.score)
    .slice(0, 3);
  const avgPromise = Math.round(
    candidate.promises.reduce((acc, item) => acc + item.progress, 0) /
      (candidate.promises.length || 1),
  );

  return (
    <article className="flex flex-col gap-4 rounded-2xl border border-border bg-surface p-5 shadow-sm transition hover:shadow-md">
      <div className="flex items-center gap-3">
        <span
          className="grid h-14 w-14 shrink-0 place-items-center rounded-2xl text-lg font-bold text-white"
          style={{ backgroundColor: candidate.accent }}
        >
          {candidate.initials}
        </span>
        <div className="min-w-0">
          <h3 className="truncate text-base font-semibold text-foreground">
            {candidate.name}
          </h3>
          <p className="truncate text-sm text-muted">{candidate.office}</p>
        </div>
      </div>

      <div className="flex flex-wrap gap-2">
        <Badge tone="brand">{candidate.party}</Badge>
        <Badge>{candidate.state}</Badge>
        <Badge>{candidate.age} anos</Badge>
      </div>

      <div className="space-y-2">
        {topThemes.map((item) => (
          <ProgressBar
            key={item.theme}
            value={item.score}
            color={THEME_MAP[item.theme].color}
            label={`${THEME_MAP[item.theme].icon} ${THEME_MAP[item.theme].label}`}
          />
        ))}
      </div>

      <div className="flex items-center justify-between border-t border-border pt-4 text-sm">
        <span className="text-muted">
          Promessas: <span className="font-semibold text-foreground">{avgPromise}%</span>
        </span>
        <Link
          href={`/candidato/${candidate.id}`}
          className="rounded-lg bg-brand px-4 py-2 text-sm font-semibold text-white transition hover:bg-brand-strong"
        >
          Ver perfil
        </Link>
      </div>
    </article>
  );
}
