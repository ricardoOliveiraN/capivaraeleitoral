import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { CANDIDATES, getCandidate } from "@/lib/data";
import CandidateView from "@/components/candidate/CandidateView";

export function generateStaticParams() {
  return CANDIDATES.map((candidate) => ({ id: candidate.id }));
}

export async function generateMetadata(
  props: PageProps<"/candidato/[id]">,
): Promise<Metadata> {
  const { id } = await props.params;
  const candidate = getCandidate(id);
  if (!candidate) return { title: "Candidato não encontrado" };
  return {
    title: `${candidate.name} — Capivara Eleitoral`,
    description: candidate.bio,
  };
}

export default async function CandidatePage(
  props: PageProps<"/candidato/[id]">,
) {
  const { id } = await props.params;
  const candidate = getCandidate(id);
  if (!candidate) notFound();

  return (
    <div className="mx-auto w-full max-w-6xl px-4 py-8 sm:px-6 sm:py-10">
      <CandidateView candidate={candidate} allCandidates={CANDIDATES} />
    </div>
  );
}
