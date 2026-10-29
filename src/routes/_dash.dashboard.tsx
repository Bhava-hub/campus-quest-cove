import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { ProjectCard, QuestionCard, SearchBar } from "@/components/cards";
import { PixelIcon, PixelStars } from "@/components/pixel";
import { PROJECTS, QUESTIONS } from "@/lib/data";

export const Route = createFileRoute("/_dash/dashboard")({
  head: () => ({ meta: [{ title: "Home — Campus Connect" }, { name: "description", content: "Your Campus Connect dashboard." }, { property: "og:title", content: "Home — Campus Connect" }, { property: "og:description", content: "Questions and teams on your campus." }] }),
  component: Dashboard,
});

function Dashboard() {
  const [q, setQ] = useState("");
  const qs = QUESTIONS.filter((x) => x.title.toLowerCase().includes(q.toLowerCase())).slice(0, 4);
  return (
    <div className="space-y-10">
      <section className="pixel-card relative overflow-hidden bg-navy p-6 text-cream md:p-10">
        <PixelStars className="absolute right-8 top-6" />
        <div className="label-pixel text-mint">Hi Aanya · Level 7 Scholar</div>
        <h1 className="mt-2 max-w-2xl text-4xl font-bold md:text-5xl">Level up your campus connections.</h1>
        <div className="mt-6 max-w-2xl text-navy"><SearchBar value={q} onChange={setQ} placeholder="Search questions, subjects, projects, skills…" /></div>
        <div className="mt-4 flex flex-wrap gap-2 text-sm">
          {["algorithms", "hackathon", "calculus", "figma"].map((t) => <button key={t} onClick={() => setQ(t)} className="border-2 border-cream/50 px-2 py-0.5 hover:bg-cream hover:text-navy">#{t}</button>)}
        </div>
      </section>

      <section className="grid gap-6 md:grid-cols-2">
        {[
          { to: "/questions", title: "Ask the Community", desc: "Stuck on a concept? Get peer explanations within hours.", icon: "question", bg: "bg-mint-soft", cta: "Ask a question" },
          { to: "/teammates", title: "Build Your Team", desc: "Find designers, coders and researchers for your next project.", icon: "team", bg: "bg-orange-soft", cta: "Find teammates" },
        ].map((p) => (
          <Link key={p.to} to={p.to} className={`pixel-card group flex items-center gap-5 p-6 ${p.bg} transition-transform hover:-translate-y-1`}>
            <div className="grid h-20 w-20 shrink-0 place-items-center border-2 border-navy bg-card"><PixelIcon name={p.icon} size={48} /></div>
            <div>
              <h2 className="text-2xl font-bold">{p.title}</h2>
              <p className="mt-1 text-sm text-muted-foreground">{p.desc}</p>
              <span className="mt-3 inline-block font-pixel font-semibold underline underline-offset-4">{p.cta} →</span>
            </div>
          </Link>
        ))}
      </section>

      <section>
        <div className="mb-4 flex items-center justify-between"><h2 className="text-2xl font-bold">Recent questions</h2><Link to="/questions" className="font-medium underline underline-offset-4">View all</Link></div>
        <div className="grid gap-4">{qs.map((x) => <QuestionCard key={x.id} q={x} />)}{qs.length === 0 && <p className="text-muted-foreground">No matches yet — try another search.</p>}</div>
      </section>

      <section>
        <div className="mb-4 flex items-center justify-between"><h2 className="text-2xl font-bold">Teams recruiting</h2><Link to="/teammates" className="font-medium underline underline-offset-4">View all</Link></div>
        <div className="grid gap-6 md:grid-cols-2">{PROJECTS.slice(0, 2).map((p) => <ProjectCard key={p.id} p={p} />)}</div>
      </section>
    </div>
  );
}
