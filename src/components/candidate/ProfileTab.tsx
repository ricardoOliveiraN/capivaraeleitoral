import type { Candidate } from "@/lib/types";
import { THEME_MAP } from "@/lib/themes";
import { Badge, Card, ProgressBar, SectionTitle } from "@/components/ui";
import ThemeProgressChart from "@/components/charts/ThemeProgressChart";
import ThemeScoreBars from "@/components/charts/ThemeScoreBars";

const STATUS_TONE = {
  nomeado: "success",
  indicado: "info",
  rejeitado: "danger",
} as const;

export default function ProfileTab({ candidate }: { candidate: Candidate }) {
  const avgPromise = Math.round(
    candidate.promises.reduce((acc, item) => acc + item.progress, 0) /
      (candidate.promises.length || 1),
  );
  const avgScore = Math.round(
    candidate.themeScores.reduce((acc, item) => acc + item.score, 0) /
      (candidate.themeScores.length || 1),
  );

  return (
    <div className="space-y-6">
      <div className="grid gap-4 sm:grid-cols-3">
        {[
          { label: "Votações registradas", value: candidate.votes.length },
          { label: "Índice médio de atuação", value: `${avgScore}/100` },
          { label: "Progresso médio das promessas", value: `${avgPromise}%` },
        ].map((stat) => (
          <Card key={stat.label} className="text-center">
            <p className="text-2xl font-bold text-foreground">{stat.value}</p>
            <p className="mt-1 text-xs text-muted">{stat.label}</p>
          </Card>
        ))}
      </div>

      <Card>
        <SectionTitle
          title="Progresso por tema"
          subtitle="Evolução do índice de atuação em cada área ao longo dos anos (dados ilustrativos)."
        />
        <ThemeProgressChart progress={candidate.themeProgress} />
      </Card>

      <div className="grid gap-6 lg:grid-cols-2">
        <Card>
          <SectionTitle title="Atuação por tema" />
          <ThemeScoreBars scores={candidate.themeScores} />
        </Card>

        <Card>
          <SectionTitle title="Resumo por tema" />
          <div className="space-y-3">
            {[...candidate.themeScores]
              .sort((a, b) => b.score - a.score)
              .map((item) => (
                <ProgressBar
                  key={item.theme}
                  value={item.score}
                  color={THEME_MAP[item.theme].color}
                  label={`${THEME_MAP[item.theme].icon} ${THEME_MAP[item.theme].label}`}
                />
              ))}
          </div>
        </Card>
      </div>

      <Card>
        <SectionTitle title="Histórico eleitoral" />
        <ol className="relative space-y-5 border-l border-border pl-6">
          {candidate.electionHistory.map((election) => (
            <li key={`${election.year}-${election.office}`} className="relative">
              <span
                className="absolute -left-[31px] top-1 grid h-4 w-4 place-items-center rounded-full border-2 border-surface"
                style={{
                  backgroundColor:
                    election.result === "eleito" ? "var(--success)" : "var(--muted)",
                }}
              />
              <div className="flex flex-wrap items-center gap-2">
                <span className="text-sm font-semibold text-foreground">
                  {election.year} · {election.office}
                </span>
                <Badge tone={election.result === "eleito" ? "success" : "neutral"}>
                  {election.result === "eleito" ? "Eleito" : "Derrotado"}
                </Badge>
                <Badge>{election.round}</Badge>
              </div>
              <p className="mt-1 text-sm text-muted">
                {election.percentage.toLocaleString("pt-BR", {
                  maximumFractionDigits: 1,
                })}
                % dos votos
                {election.note ? ` · ${election.note}` : ""}
              </p>
            </li>
          ))}
        </ol>
      </Card>

      <Card>
        <SectionTitle
          title="Indicações e nomeações"
          subtitle="Cargos-chave indicados ou nomeados pelo político."
        />
        <ul className="divide-y divide-border">
          {candidate.nominations.map((nomination) => (
            <li
              key={nomination.id}
              className="flex flex-wrap items-center justify-between gap-3 py-3"
            >
              <div>
                <p className="text-sm font-medium text-foreground">
                  {nomination.position}
                </p>
                <p className="text-xs text-muted">
                  {nomination.organization} · {nomination.year}
                </p>
              </div>
              <Badge tone={STATUS_TONE[nomination.status]}>
                {nomination.status}
              </Badge>
            </li>
          ))}
        </ul>
      </Card>
    </div>
  );
}
