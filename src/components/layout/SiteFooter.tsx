import Link from "next/link";

export default function SiteFooter() {
  return (
    <footer className="mt-16 border-t border-border bg-surface">
      <div className="mx-auto grid w-full max-w-6xl gap-6 px-4 py-10 sm:px-6 md:grid-cols-3">
        <div>
          <p className="flex items-center gap-2 text-sm font-bold text-foreground">
            <span className="grid h-8 w-8 place-items-center rounded-lg bg-brand text-white">
              🐾
            </span>
            Capivara Eleitoral
          </p>
          <p className="mt-3 max-w-xs text-sm text-muted">
            Informação pública sobre políticos brasileiros, reunida para o
            cidadão e para o jornalismo.
          </p>
        </div>
        <div className="text-sm">
          <p className="font-semibold text-foreground">Navegar</p>
          <ul className="mt-3 space-y-2 text-muted">
            <li>
              <Link href="/" className="hover:text-foreground">
                Início
              </Link>
            </li>
            <li>
              <Link href="/#candidatos" className="hover:text-foreground">
                Candidatos
              </Link>
            </li>
            <li>
              <Link href="/#como-funciona" className="hover:text-foreground">
                Como funciona
              </Link>
            </li>
          </ul>
        </div>
        <div className="text-sm">
          <p className="font-semibold text-foreground">Fontes previstas</p>
          <ul className="mt-3 space-y-2 text-muted">
            <li>Câmara, Senado e TSE</li>
            <li>Portais de transparência</li>
            <li>Diários oficiais e dados abertos</li>
          </ul>
        </div>
      </div>
      <div className="border-t border-border px-4 py-4 text-center text-xs text-muted sm:px-6">
        Projeto em desenvolvimento. Dados exibidos são ilustrativos.
      </div>
    </footer>
  );
}
