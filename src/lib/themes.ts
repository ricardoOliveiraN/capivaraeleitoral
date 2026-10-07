import type { ThemeId, ThemeMeta } from "./types";

export const THEMES: ThemeMeta[] = [
  {
    id: "saude",
    label: "Saúde",
    short: "Saúde",
    icon: "🩺",
    color: "#0d9488",
    description:
      "Gestão do SUS, financiamento da saúde, prevenção e acesso a medicamentos.",
  },
  {
    id: "seguranca",
    label: "Segurança Pública",
    short: "Segurança",
    icon: "🛡️",
    color: "#1d4ed8",
    description:
      "Combate ao crime, políticas para as forças de segurança e controle de armas.",
  },
  {
    id: "educacao",
    label: "Educação",
    short: "Educação",
    icon: "📚",
    color: "#7c3aed",
    description:
      "Educação básica e superior, valorização docente e financiamento estudantil.",
  },
  {
    id: "economia",
    label: "Economia",
    short: "Economia",
    icon: "💹",
    color: "#b45309",
    description:
      "Política fiscal, impostos, inflação, responsabilidade e crescimento.",
  },
  {
    id: "meioAmbiente",
    label: "Meio Ambiente",
    short: "Ambiente",
    icon: "🌳",
    color: "#15803d",
    description:
      "Preservação, clima, fiscalização ambiental e transição energética.",
  },
  {
    id: "trabalho",
    label: "Trabalho e Renda",
    short: "Trabalho",
    icon: "💼",
    color: "#0891b2",
    description:
      "Emprego, formalização, salário mínimo, previdência e proteção social.",
  },
  {
    id: "infraestrutura",
    label: "Infraestrutura",
    short: "Infraestrutura",
    icon: "🏗️",
    color: "#64748b",
    description:
      "Obras, mobilidade, saneamento, energia e logística.",
  },
  {
    id: "direitos",
    label: "Direitos e Cidadania",
    short: "Direitos",
    icon: "⚖️",
    color: "#be185d",
    description:
      "Direitos humanos, igualdade, minorias e garantias fundamentais.",
  },
];

export const THEME_MAP: Record<ThemeId, ThemeMeta> = THEMES.reduce(
  (acc, theme) => {
    acc[theme.id] = theme;
    return acc;
  },
  {} as Record<ThemeId, ThemeMeta>,
);

export const THEME_IDS: ThemeId[] = THEMES.map((theme) => theme.id);
