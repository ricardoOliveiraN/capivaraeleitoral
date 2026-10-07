import type {
  Candidate,
  ThemeId,
  ThemeProgress,
} from "./types";

export const DATA_DISCLAIMER =
  "Dados ilustrativos de demonstração. Os registros abaixo são fictícios e servem apenas para validar a interface. Nenhuma informação aqui deve ser usada como fonte real.";

const YEARS = [2019, 2020, 2021, 2022, 2023, 2024, 2025];

function progress(theme: ThemeId, start: number, end: number): ThemeProgress {
  const points = YEARS.map((year, i) => ({
    year,
    value: Math.round(start + ((end - start) * i) / (YEARS.length - 1)),
  }));
  return { theme, points };
}

export const CANDIDATES: Candidate[] = [
  {
    id: "lula",
    name: "Luiz Inácio Lula da Silva",
    party: "PT",
    partyColor: "#c4170c",
    office: "Presidente da República",
    state: "São Paulo",
    age: 80,
    initials: "LL",
    accent: "#0d9488",
    vice: "Geraldo Alckmin",
    bio: "Sindicalista e fundador do PT, já governou o país em dois mandatos e cumpre o terceiro. Sua agenda recente prioriza programas sociais, valorização do salário mínimo e investimento público em infraestrutura e transição energética.",
    electionHistory: [
      {
        year: 1989,
        office: "Presidente",
        round: "2º turno",
        result: "derrotado",
        votes: 31000000,
        percentage: 46.9,
        note: "Primeira eleição direta após a redemocratização.",
      },
      {
        year: 2002,
        office: "Presidente",
        round: "2º turno",
        result: "eleito",
        votes: 52700000,
        percentage: 61.3,
      },
      {
        year: 2006,
        office: "Presidente",
        round: "2º turno",
        result: "eleito",
        votes: 58200000,
        percentage: 60.8,
        note: "Reeleição.",
      },
      {
        year: 2022,
        office: "Presidente",
        round: "2º turno",
        result: "eleito",
        votes: 60300000,
        percentage: 50.9,
        note: "Disputa mais acirrada da história recente.",
      },
    ],
    nominations: [
      {
        id: "lula-nom-1",
        theme: "saude",
        position: "Ministro da Saúde",
        organization: "Ministério da Saúde",
        year: 2023,
        status: "nomeado",
      },
      {
        id: "lula-nom-2",
        theme: "direitos",
        position: "Ministra dos Direitos Humanos",
        organization: "Ministério dos Direitos Humanos",
        year: 2023,
        status: "nomeado",
      },
      {
        id: "lula-nom-3",
        theme: "meioAmbiente",
        position: "Ministra do Meio Ambiente",
        organization: "Ministério do Meio Ambiente",
        year: 2023,
        status: "nomeado",
      },
      {
        id: "lula-nom-4",
        theme: "economia",
        position: "Diretor de Política Monetária",
        organization: "Banco Central",
        year: 2024,
        status: "indicado",
      },
    ],
    votes: [
      {
        id: "lula-v1",
        theme: "trabalho",
        title: "Valorização real do salário mínimo",
        description:
          "Política de reajuste do salário mínimo acima da inflação com ganho real.",
        date: "2023-05-01",
        position: "sim",
        outcome: "aprovado",
      },
      {
        id: "lula-v2",
        theme: "economia",
        title: "Novo arcabouço fiscal",
        description:
          "Regra fiscal que substitui o teto de gastos e vincula despesas à arrecadação.",
        date: "2023-08-22",
        position: "sim",
        outcome: "aprovado",
      },
      {
        id: "lula-v3",
        theme: "economia",
        title: "Reforma tributária sobre o consumo",
        description:
          "Unificação de impostos sobre consumo em IVA dual, com transição gradual.",
        date: "2023-12-15",
        position: "sim",
        outcome: "aprovado",
      },
      {
        id: "lula-v4",
        theme: "seguranca",
        title: "Decreto de restrição de armas",
        description:
          "Endurecimento das regras de registro, posse e porte de armas de fogo.",
        date: "2023-01-20",
        position: "sim",
        outcome: "aprovado",
      },
      {
        id: "lula-v5",
        theme: "meioAmbiente",
        title: "Plano de combate ao desmatamento",
        description:
          "Retomada de metas e fiscalização para redução do desmatamento na Amazônia.",
        date: "2023-06-05",
        position: "sim",
        outcome: "aprovado",
      },
      {
        id: "lula-v6",
        theme: "seguranca",
        title: "Marco temporal de terras indígenas",
        description:
          "Projeto que limitava a demarcação às terras ocupadas até 1988.",
        date: "2023-09-27",
        position: "nao",
        outcome: "aprovado",
        note: "Veto parcial posteriormente derrubado pelo Congresso.",
      },
      {
        id: "lula-v7",
        theme: "infraestrutura",
        title: "Programa de aceleração do crescimento",
        description:
          "Pacote de investimentos em obras de infraestrutura em todo o país.",
        date: "2023-08-11",
        position: "sim",
        outcome: "aprovado",
      },
      {
        id: "lula-v8",
        theme: "trabalho",
        title: "Regulamentação do trabalho por aplicativos",
        description:
          "Proposta de garantias e contribuição previdenciária para motoristas e entregadores.",
        date: "2024-03-04",
        position: "sim",
        outcome: "reprovado",
      },
      {
        id: "lula-v9",
        theme: "educacao",
        title: "Pé-de-Meia do ensino médio",
        description:
          "Incentivo financeiro para permanência de estudantes de baixa renda no ensino médio.",
        date: "2024-01-16",
        position: "sim",
        outcome: "aprovado",
      },
    ],
    promises: [
      {
        id: "lula-p1",
        theme: "trabalho",
        title: "Ganho real para o salário mínimo",
        description:
          "Reajustar o salário mínimo acima da inflação todos os anos.",
        status: "em andamento",
        progress: 70,
        since: "2023",
        evidence: "Dois reajustes com ganho real desde o início do mandato.",
      },
      {
        id: "lula-p2",
        theme: "economia",
        title: "Reforma tributária justa",
        description:
          "Simplificar impostos e taxar consumo de forma mais justa.",
        status: "parcial",
        progress: 55,
        since: "2023",
        evidence: "Emenda constitucional aprovada, fase de regulamentação.",
      },
      {
        id: "lula-p3",
        theme: "saude",
        title: "Mais médicos e redução de filas",
        description:
          "Ampliar o atendimento no SUS e reduzir filas por consultas e exames.",
        status: "em andamento",
        progress: 48,
        since: "2023",
      },
      {
        id: "lula-p4",
        theme: "meioAmbiente",
        title: "Desmatamento zero até 2030",
        description:
          "Meta de eliminar o desmatamento ilegal na Amazônia até 2030.",
        status: "parcial",
        progress: 60,
        since: "2023",
        evidence: "Queda no desmatamento, mas meta ainda distante.",
      },
      {
        id: "lula-p5",
        theme: "educacao",
        title: "Escola em tempo integral",
        description:
          "Ampliar a oferta de educação em tempo integral na rede pública.",
        status: "em andamento",
        progress: 40,
        since: "2023",
      },
      {
        id: "lula-p6",
        theme: "direitos",
        title: "Igualdade salarial entre gêneros",
        description:
          "Fiscalização e punição para diferenças salariais entre homens e mulheres.",
        status: "cumprida",
        progress: 100,
        since: "2023",
        evidence: "Lei sancionada garantindo transparência salarial.",
      },
      {
        id: "lula-p7",
        theme: "infraestrutura",
        title: "Retomada de grandes obras",
        description:
          "Destravar obras paradas e ampliar o investimento público.",
        status: "em andamento",
        progress: 52,
        since: "2023",
      },
      {
        id: "lula-p8",
        theme: "seguranca",
        title: "Segurança com foco em inteligência",
        description:
          "Integrar forças e priorizar investigação em vez de confronto armado.",
        status: "nao cumprida",
        progress: 20,
        since: "2023",
      },
    ],
    themeScores: [
      { theme: "trabalho", score: 80 },
      { theme: "educacao", score: 78 },
      { theme: "direitos", score: 74 },
      { theme: "saude", score: 72 },
      { theme: "meioAmbiente", score: 68 },
      { theme: "infraestrutura", score: 66 },
      { theme: "economia", score: 61 },
      { theme: "seguranca", score: 55 },
    ],
    themeProgress: [
      progress("saude", 58, 72),
      progress("seguranca", 48, 56),
      progress("educacao", 60, 79),
      progress("economia", 66, 62),
      progress("meioAmbiente", 40, 69),
      progress("trabalho", 63, 81),
      progress("infraestrutura", 49, 67),
      progress("direitos", 57, 75),
    ],
  },
  {
    id: "bolsonaro",
    name: "Jair Messias Bolsonaro",
    party: "PL",
    partyColor: "#1f4e9c",
    office: "Ex-Presidente da República",
    state: "Rio de Janeiro",
    age: 71,
    initials: "JB",
    accent: "#1d4ed8",
    vice: "Braga Netto",
    bio: "Militar da reserva e ex-deputado federal por quase três décadas, presidiu o país entre 2019 e 2022. Defende pauta de segurança pública, liberalismo econômico e redução do tamanho do Estado.",
    electionHistory: [
      {
        year: 1994,
        office: "Deputado Federal",
        round: "Turno único",
        result: "eleito",
        votes: 112000,
        percentage: 1.3,
        note: "Início de longo mandato na Câmara.",
      },
      {
        year: 2018,
        office: "Presidente",
        round: "2º turno",
        result: "eleito",
        votes: 57700000,
        percentage: 55.1,
      },
      {
        year: 2022,
        office: "Presidente",
        round: "2º turno",
        result: "derrotado",
        votes: 58200000,
        percentage: 49.1,
        note: "Disputa decidida por margem estreita.",
      },
    ],
    nominations: [
      {
        id: "bol-nom-1",
        theme: "seguranca",
        position: "Ministro da Justiça e Segurança Pública",
        organization: "Ministério da Justiça",
        year: 2019,
        status: "nomeado",
      },
      {
        id: "bol-nom-2",
        theme: "economia",
        position: "Ministro da Economia",
        organization: "Ministério da Economia",
        year: 2019,
        status: "nomeado",
      },
      {
        id: "bol-nom-3",
        theme: "meioAmbiente",
        position: "Ministro do Meio Ambiente",
        organization: "Ministério do Meio Ambiente",
        year: 2019,
        status: "nomeado",
      },
      {
        id: "bol-nom-4",
        theme: "saude",
        position: "Ministro da Saúde",
        organization: "Ministério da Saúde",
        year: 2020,
        status: "rejeitado",
        },
    ],
    votes: [
      {
        id: "bol-v1",
        theme: "economia",
        title: "Reforma da Previdência",
        description:
          "Nova regra de aposentadorias com idade mínima e transições.",
        date: "2019-10-22",
        position: "sim",
        outcome: "aprovado",
      },
      {
        id: "bol-v2",
        theme: "trabalho",
        title: "Liberdade econômica e desburocratização",
        description:
          "Redução de exigências para abertura e funcionamento de empresas.",
        date: "2019-08-20",
        position: "sim",
        outcome: "aprovado",
      },
      {
        id: "bol-v3",
        theme: "seguranca",
        title: "Ampliação do porte de armas",
        description:
          "Decretos que facilitaram acesso a armas e munições para cidadãos.",
        date: "2019-05-07",
        position: "sim",
        outcome: "aprovado",
      },
      {
        id: "bol-v4",
        theme: "meioAmbiente",
        title: "Flexibilização de licenciamento ambiental",
        description:
          "Projeto que simplificava regras de licenciamento para obras.",
        date: "2021-05-13",
        position: "sim",
        outcome: "aprovado",
        note: "Aprovado na Câmara, com tramitação conturbada no Senado.",
      },
      {
        id: "bol-v5",
        theme: "saude",
        title: "Auxílio emergencial na pandemia",
        description:
          "Transferência de renda durante a crise sanitária da covid-19.",
        date: "2020-04-03",
        position: "sim",
        outcome: "aprovado",
      },
      {
        id: "bol-v6",
        theme: "saude",
        title: "Calendário vacinal obrigatório",
        description:
          "Proposta de exigência de comprovante de vacinação em determinados contextos.",
        date: "2021-11-10",
        position: "nao",
        outcome: "reprovado",
      },
      {
        id: "bol-v7",
        theme: "economia",
        title: "Teto de gastos constitucional",
        description:
          "Manutenção do limite de despesas vinculado à inflação.",
        date: "2022-12-19",
        position: "sim",
        outcome: "reprovado",
        note: "Regra substituída no ano seguinte.",
      },
      {
        id: "bol-v8",
        theme: "economia",
        title: "Reforma tributária sobre consumo",
        description:
          "Unificação de impostos sobre consumo em IVA dual.",
        date: "2023-12-15",
        position: "nao",
        outcome: "aprovado",
      },
      {
        id: "bol-v9",
        theme: "infraestrutura",
        title: "Privatização da Eletrobras",
        description:
          "Desestatização da empresa de energia elétrica.",
        date: "2021-06-24",
        position: "sim",
        outcome: "aprovado",
      },
    ],
    promises: [
      {
        id: "bol-p1",
        theme: "economia",
        title: "Reforma da Previdência",
        description:
          "Aprovar uma nova regra de aposentadorias para equilibrar as contas.",
        status: "cumprida",
        progress: 100,
        since: "2019",
        evidence: "Emenda constitucional aprovada em 2019.",
      },
      {
        id: "bol-p2",
        theme: "seguranca",
        title: "Facilitar acesso a armas",
        description:
          "Ampliar o direito de posse e porte para cidadãos de bem.",
        status: "cumprida",
        progress: 90,
        since: "2019",
        evidence: "Série de decretos publicados entre 2019 e 2021.",
      },
      {
        id: "bol-p3",
        theme: "economia",
        title: "Imposto de renda menor",
        description:
          "Elevar a faixa de isenção e simplificar o imposto de renda.",
        status: "parcial",
        progress: 45,
        since: "2019",
      },
      {
        id: "bol-p4",
        theme: "infraestrutura",
        title: "Privatizações e concessões",
        description:
          "Transferir estatais e ativos para a iniciativa privada.",
        status: "parcial",
        progress: 50,
        since: "2019",
        evidence: "Eletrobras privatizada; outras agendas travadas.",
      },
      {
        id: "bol-p5",
        theme: "meioAmbiente",
        title: "Crescimento sem travar a economia",
        description:
          "Flexibilizar regras ambientais para destravar a produção.",
        status: "parcial",
        progress: 55,
        since: "2019",
      },
      {
        id: "bol-p6",
        theme: "educacao",
        title: "Escola sem doutrinação",
        description:
          "Priorizar conteúdo tradicional e ensino cívico nas escolas.",
        status: "parcial",
        progress: 40,
        since: "2019",
      },
      {
        id: "bol-p7",
        theme: "saude",
        title: "Saúde com atendimento mais rápido",
        description:
          "Reduzir filas e ampliar o atendimento básico no SUS.",
        status: "nao cumprida",
        progress: 25,
        since: "2019",
      },
      {
        id: "bol-p8",
        theme: "direitos",
        title: "Combate ao crime organizado",
        description:
          "Endurecer penas e integrar forças contra facções.",
        status: "em andamento",
        progress: 42,
        since: "2019",
      },
    ],
    themeScores: [
      { theme: "seguranca", score: 74 },
      { theme: "economia", score: 70 },
      { theme: "infraestrutura", score: 60 },
      { theme: "trabalho", score: 58 },
      { theme: "saude", score: 52 },
      { theme: "educacao", score: 48 },
      { theme: "direitos", score: 42 },
      { theme: "meioAmbiente", score: 38 },
    ],
    themeProgress: [
      progress("saude", 60, 51),
      progress("seguranca", 62, 75),
      progress("educacao", 55, 47),
      progress("economia", 58, 71),
      progress("meioAmbiente", 52, 37),
      progress("trabalho", 54, 59),
      progress("infraestrutura", 51, 61),
      progress("direitos", 50, 41),
    ],
  },
];

export function getCandidate(id: string): Candidate | undefined {
  return CANDIDATES.find((candidate) => candidate.id === id);
}

export function getCandidates(): Candidate[] {
  return CANDIDATES;
}
