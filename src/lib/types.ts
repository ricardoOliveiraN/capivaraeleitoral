export type ThemeId =
  | "saude"
  | "seguranca"
  | "educacao"
  | "economia"
  | "meioAmbiente"
  | "trabalho"
  | "infraestrutura"
  | "direitos";

export interface ThemeMeta {
  id: ThemeId;
  label: string;
  short: string;
  icon: string;
  color: string;
  description: string;
}

export type VotePosition = "sim" | "nao" | "abstencao" | "ausente";
export type VoteOutcome = "aprovado" | "reprovado";

export interface Vote {
  id: string;
  theme: ThemeId;
  title: string;
  description: string;
  date: string;
  position: VotePosition;
  outcome: VoteOutcome;
  note?: string;
}

export interface Nomination {
  id: string;
  theme: ThemeId;
  position: string;
  organization: string;
  year: number;
  status: "nomeado" | "indicado" | "rejeitado";
}

export interface ElectionRecord {
  year: number;
  office: string;
  round: string;
  result: "eleito" | "derrotado";
  votes: number;
  percentage: number;
  note?: string;
}

export type PromiseStatus =
  | "cumprida"
  | "em andamento"
  | "parcial"
  | "nao cumprida";

export interface PromiseItem {
  id: string;
  theme: ThemeId;
  title: string;
  description: string;
  status: PromiseStatus;
  progress: number;
  since: string;
  evidence?: string;
}

export interface ThemeScore {
  theme: ThemeId;
  score: number;
}

export interface ThemeProgressPoint {
  year: number;
  value: number;
}

export interface ThemeProgress {
  theme: ThemeId;
  points: ThemeProgressPoint[];
}

export interface Candidate {
  id: string;
  name: string;
  party: string;
  partyColor: string;
  office: string;
  state: string;
  age: number;
  bio: string;
  initials: string;
  accent: string;
  vice: string;
  electionHistory: ElectionRecord[];
  nominations: Nomination[];
  votes: Vote[];
  promises: PromiseItem[];
  themeScores: ThemeScore[];
  themeProgress: ThemeProgress[];
}

export type ThemeWeights = Record<ThemeId, number>;
