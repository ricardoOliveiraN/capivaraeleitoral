import Link from "next/link";
import { DATA_DISCLAIMER, getCandidates } from "@/lib/data";
import HomeExplorer from "@/components/home/HomeExplorer";

const FEATURES = [
  {
    icon: "📊",
    title: "Temas da política pública",
    text: "Saúde, segurança, educação, economia e mais, com o histórico de cada área.",
  },
  {
    icon: "🗳️",
    title: "Votações e indicações",
    text: "Como o político votou no Congresso e quem indicou para cargos-chave.",
  },
  {
    icon: "⚖️",
    title: "Comparação direta",
    text: "Coloque candidatos lado a lado e veja onde cada um avança mais.",
  },
  {
    icon: "🎯",
    title: "Match com suas prioridades",
    text: "Dê pesos aos temas que importam para você e veja quem mais se alinha.",
  },
  {
    icon: "📋",
    title: "Promessas acompanhadas",
    text: "Lista do que foi prometido em campanha e o avanço de cada compromisso.",
  },
  {
    icon: "💬",
    title: "Chat com os dados",
    text: "Pergunte em linguagem natural e receba respostas baseadas na base.",
  },
];

export default function Home() {
  const candidates = getCandidates();

  return (
    <div className="mx-auto w-full max-w-6xl px-4 sm:px-6">
      <section className="py-12 sm:py-16">
        <div className="max-w-3xl">
          <span className="inline-flex items-center gap-2 rounded-full border border-border bg-surface px-3 py-1 text-xs font-medium text-muted">
            MVP • Presidenciáveis • Dados ilustrativos
          </span>
          <h1 className="mt-5 text-3xl font-bold leading-tight tracking-tight text-foreground sm:text-5xl">
            Informação pública sobre políticos, em um só lugar.
          </h1>
          <p className="mt-5 max-w-2xl text-base text-muted sm:text-lg">
            O Capivara Eleitoral reúne dados que hoje estão dispersos e de difícil
            acesso. Compare candidatos, acompanhe promessas e vote com mais
            informação.
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Link
              href="#candidatos"
              className="inline-flex items-center justify-center rounded-xl bg-brand px-6 py-3 text-sm font-semibold text-white transition hover:bg-brand-strong"
            >
              Explorar candidatos
            </Link>
            <Link
              href="#como-funciona"
              className="inline-flex items-center justify-center rounded-xl border border-border bg-surface px-6 py-3 text-sm font-semibold text-foreground transition hover:bg-surface-muted"
            >
              Como funciona
            </Link>
          </div>
        </div>
      </section>

      <section id="candidatos" className="scroll-mt-20 py-8">
        <div className="mb-6">
          <h2 className="text-2xl font-bold text-foreground sm:text-3xl">
            Candidatos
          </h2>
          <p className="mt-2 text-sm text-muted">
            Selecione um perfil para ver votações, promessas, comparações e o chat.
          </p>
        </div>
        <HomeExplorer candidates={candidates} />
      </section>

      <section id="como-funciona" className="scroll-mt-20 py-12">
        <div className="mb-6">
          <h2 className="text-2xl font-bold text-foreground sm:text-3xl">
            Como funciona
          </h2>
          <p className="mt-2 text-sm text-muted">
            Tudo o que você encontra em cada perfil de candidato.
          </p>
        </div>
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {FEATURES.map((feature) => (
            <div
              key={feature.title}
              className="rounded-2xl border border-border bg-surface p-5 shadow-sm"
            >
              <span className="text-2xl" aria-hidden>
                {feature.icon}
              </span>
              <h3 className="mt-3 font-semibold text-foreground">{feature.title}</h3>
              <p className="mt-1 text-sm text-muted">{feature.text}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="pb-12">
        <p className="rounded-2xl border border-dashed border-border bg-surface p-5 text-sm text-muted">
          ⚠️ {DATA_DISCLAIMER}
        </p>
      </section>
    </div>
  );
}
