import { createFileRoute } from "@tanstack/react-router";
import { PageHeader, ProjectCard, QuestionCard } from "@/components/cards";
import { PROJECTS, QUESTIONS } from "@/lib/data";

export const Route = createFileRoute("/_dash/saved")({
  head: () => ({ meta: [{ title: "Saved Posts — Campus Connect" }, { name: "description", content: "Questions and projects you've bookmarked." }, { property: "og:title", content: "Saved Posts — Campus Connect" }, { property: "og:description", content: "Your bookmarks." }] }),
  component: Saved,
});

function Saved() {
  return (
    <div className="space-y-8">
      <PageHeader eyebrow="Inventory" title="Saved Posts" desc="Everything you bookmarked for later." />
      <section><h2 className="mb-4 text-2xl font-bold">Questions</h2><div className="grid gap-4">{QUESTIONS.filter((_, i) => i === 1 || i === 3).map((q) => <QuestionCard key={q.id} q={q} />)}</div></section>
      <section><h2 className="mb-4 text-2xl font-bold">Projects</h2><div className="grid gap-6 md:grid-cols-2">{PROJECTS.slice(2, 4).map((p) => <ProjectCard key={p.id} p={p} />)}</div></section>
    </div>
  );
}
