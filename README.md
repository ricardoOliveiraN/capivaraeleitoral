# Capivara Eleitoral

## Contexto

O **Capivara Eleitoral** tem como propósito ser uma **fonte da verdade** sobre
políticos brasileiros para a população. A informação pública existe, mas hoje
está dispersa entre dezenas de portais, formatos e terminologias distintas, o
que torna seu acesso e interpretação difíceis para o cidadão. O projeto atua
justamente nessa lacuna: **consolidar, normalizar e tornar acessível** dados
públicos de difícil acesso.

Mais do que reunir dados, a plataforma quer **permitir comparações e gerar
insights**. Ao agregar mandatos, votações, patrimônio, gastos e demais
informações em um perfil unificado, o usuário consegue enxergar o histórico de
um representante de forma clara e compará-lo a outros — transformando dados
brutos em entendimento.

Transparência e cidadania caminham juntas no projeto: a meta é dar ao eleitor
ferramentas concretas para acompanhar quem o representa.

## Objetivos

- Centralizar informações públicas dispersas em uma base única e confiável.
- Normalizar dados de fontes heterogêneas para permitir comparações.
- Oferecer consultas simples, com linguagem acessível ao cidadão comum.
- Gerar insights que apoiem jornalistas e o público em geral.

## Público-alvo

- **Cidadão comum** — eleitor que quer entender seus representantes.
- **Jornalistas** — profissionais que precisam cruzar e verificar dados.

## Escopo do MVP

O MVP é de **esfera federal** e cobre apenas **presidenciáveis atuais**
(Lula e Bolsonaro).

## Produtos

- **Site web**
- **Aplicativo**

Em um primeiro momento, o usuário poderá apenas **realizar consultas** (uso
somente leitura).

## Fontes de dados

- APIs governamentais (Câmara, Senado, TSE)
- Portais de transparência
- Diários oficiais
- Dados abertos / CSV

## Roadmap técnico

- **Base de dados vetorial** com IA interna para responder dúvidas do usuário
  em linguagem natural, conectando a pergunta diretamente à base de dados.
- Evolução do escopo para outras esferas (estadual e municipal) após o MVP.

## Aplicação web (protótipo)

Protótipo de interface construído com **Next.js 16 + TypeScript + Tailwind CSS**
e **Recharts**, com dados ilustrativos em memória (`src/lib/data.ts`). Ainda não
há integração com as fontes reais nem IA real — o chat é simulado.

### O que já existe

- **Home** com busca de candidatos e explicação do produto.
- **Perfil** do candidato: progresso por tema (linhas), atuação por tema (barras),
  histórico eleitoral e indicações/nomeações.
- **Votações** filtráveis por tema e resultado (aprovado/reprovado).
- **Promessas** de campanha com filtro por status e barra de avanço.
- **Comparar** concorrentes: radar de temas, tabela de índices e ficha rápida.
- **Match** por prioridades: sliders de peso por tema, presets e ranking de afinidade.
- **Chat** simulado respondendo a partir dos dados do candidato.
- Layout responsivo (header com menu mobile, navegação por abas).

### Como rodar

```bash
npm install
npm run dev     # http://localhost:3000
npm run build   # build de produção
npm run lint    # análise estática
```

> Os dados exibidos são fictícios e servem apenas para demonstração.

