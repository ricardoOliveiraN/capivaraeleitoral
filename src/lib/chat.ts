import type { Candidate, PromiseStatus } from "./types";
import { THEME_MAP } from "./themes";

const STATUS_LABEL: Record<PromiseStatus, string> = {
  cumprida: "Cumprida",
  "em andamento": "Em andamento",
  parcial: "Parcial",
  "nao cumprida": "Não cumprida",
};

const NUMBER = new Intl.NumberFormat("pt-BR", {
  maximumFractionDigits: 1,
});

function themeKeywords(): { id: keyof typeof THEME_MAP; words: string[] }[] {
  return [
    { id: "saude", words: ["saúde", "saude", "sus", "hospital", "médic", "medic"] },
    { id: "seguranca", words: ["segurança", "seguranca", "crime", "arma", "polícia", "policia"] },
    { id: "educacao", words: ["educação", "educacao", "escola", "ensino", "universidade"] },
    { id: "economia", words: ["economia", "imposto", "fiscal", "inflação", "inflacao", "tribut"] },
    { id: "meioAmbiente", words: ["ambiente", "clima", "amazônia", "amazonia", "desmatamento", "verde"] },
    { id: "trabalho", words: ["trabalho", "emprego", "renda", "salário", "salario", "previdência", "previdencia"] },
    { id: "infraestrutura", words: ["infraestrutura", "obra", "saneamento", "energia", "mobilidade"] },
    { id: "direitos", words: ["direitos", "cidadania", "igualdade", "humano", "minorias"] },
  ];
}

function summarizeTheme(candidate: Candidate, themeId: keyof typeof THEME_MAP): string {
  const meta = THEME_MAP[themeId];
  const score = candidate.themeScores.find((item) => item.theme === themeId)?.score ?? 0;
  const promises = candidate.promises.filter((promise) => promise.theme === themeId);
  const votes = candidate.votes.filter((vote) => vote.theme === themeId);

  const lines: string[] = [
    `${meta.icon} ${meta.label} — índice de atuação de ${score}/100 para ${candidate.name}.`,
  ];

  if (promises.length > 0) {
    lines.push("", "Promessas relacionadas:");
    for (const promise of promises) {
      lines.push(
        `• ${promise.title} — ${STATUS_LABEL[promise.status]} (${promise.progress}%)`,
      );
    }
  }

  if (votes.length > 0) {
    lines.push("", "Votações recentes:");
    for (const vote of votes) {
      lines.push(
        `• ${vote.title} — voto "${vote.position}" (${vote.outcome}, ${vote.date})`,
      );
    }
  }

  if (promises.length === 0 && votes.length === 0) {
    lines.push("", "Ainda não há promessas ou votações registradas nesta base para este tema.");
  }

  return lines.join("\n");
}

function summarizePromises(candidate: Candidate): string {
  const total = candidate.promises.length;
  const done = candidate.promises.filter((p) => p.status === "cumprida").length;
  const progress = candidate.promises.filter(
    (p) => p.status === "em andamento" || p.status === "parcial",
  ).length;
  const notDone = candidate.promises.filter((p) => p.status === "nao cumprida").length;

  const avg = Math.round(
    candidate.promises.reduce((acc, p) => acc + p.progress, 0) / (total || 1),
  );

  const lines = [
    `📋 ${candidate.name} registra ${total} promessas nesta base.`,
    `• ${done} cumprida(s)`,
    `• ${progress} em andamento ou parcial(is)`,
    `• ${notDone} não cumprida(s)`,
    `Progresso médio de ${avg}%.`,
    "",
    "Quer que eu detalhe por tema? Digite, por exemplo, \"saúde\" ou \"educação\".",
  ];
  return lines.join("\n");
}

function summarizeVotes(candidate: Candidate): string {
  const lines = [`🗳️ Votações de ${candidate.name} nesta base:`];
  for (const vote of candidate.votes) {
    lines.push(
      `• [${THEME_MAP[vote.theme].label}] ${vote.title} — voto "${vote.position}", ${vote.outcome} em ${vote.date}`,
    );
  }
  return lines.join("\n");
}

function summarizeElections(candidate: Candidate): string {
  const lines = [`🗓️ Histórico eleitoral de ${candidate.name}:`];
  for (const election of candidate.electionHistory) {
    lines.push(
      `• ${election.year} — ${election.office} (${election.round}): ${election.result}, ${NUMBER.format(
        election.percentage,
      )}% dos votos.`,
    );
  }
  return lines.join("\n");
}

function compareCandidates(candidate: Candidate, all: Candidate[]): string {
  const others = all.filter((item) => item.id !== candidate.id);
  if (others.length === 0) return "Não há outros candidatos cadastrados para comparar.";

  const lines = [`⚖️ Comparação com os concorrentes:`];
  for (const other of others) {
    const advantages: string[] = [];
    for (const score of candidate.themeScores) {
      const otherScore = other.themeScores.find((item) => item.theme === score.theme)?.score ?? 0;
      if (score.score > otherScore) {
        advantages.push(THEME_MAP[score.theme].short);
      }
    }
    lines.push(
      `• Contra ${other.name} (${other.party}): ${candidate.name} tem índice de atuação mais alto em ${advantages.join(", ") || "nenhum tema"}.`,
    );
  }
  return lines.join("\n");
}

export function answerQuestion(
  question: string,
  candidate: Candidate,
  all: Candidate[],
): string {
  const text = question.toLowerCase();

  if (/(promessa|cumpriu|entregou|cumprid)/.test(text)) {
    return summarizePromises(candidate);
  }
  if (/(vota|votaç|projeto|votou|aprovad|reprovad)/.test(text)) {
    return summarizeVotes(candidate);
  }
  if (/(histórico|historico|eleiç|eleicao|eleito|mandato|pleito)/.test(text)) {
    return summarizeElections(candidate);
  }
  if (/(vice|companheiro de chapa)/.test(text)) {
    return `🤝 O vice na chapa de ${candidate.name} é ${candidate.vice}.`;
  }
  if (/(compar|concorrente|adversári|adversari|diferença|diferenca|versus|vs)/.test(text)) {
    return compareCandidates(candidate, all);
  }
  if (/(partido|sigla|idade|quem é|quem e)/.test(text)) {
    return `${candidate.name} (${candidate.party}), ${candidate.age} anos, ${candidate.office}. ${candidate.bio}`;
  }

  for (const theme of themeKeywords()) {
    if (theme.words.some((word) => text.includes(word))) {
      return summarizeTheme(candidate, theme.id);
    }
  }

  return [
    `Ainda não tenho uma resposta pronta para "${question}".`,
    "",
    "Nesta demonstração eu consigo falar sobre: temas (saúde, segurança, educação, economia, meio ambiente, trabalho, infraestrutura, direitos), votações, promessas, histórico eleitoral, vice e comparação com concorrentes.",
  ].join("\n");
}

export function suggestedQuestions(candidate: Candidate): string[] {
  return [
    `Quais são as promessas de ${candidate.party}?`,
    "Como foi a atuação em saúde?",
    "Quais foram as votações mais recentes?",
    "Qual o histórico eleitoral?",
    "Como se compara com o concorrente?",
  ];
}
