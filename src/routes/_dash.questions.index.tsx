import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { PageHeader, QuestionCard, SearchBar } from "@/components/cards";
import { PixelIcon } from "@/components/pixel";
import { QUESTIONS, SUBJECTS } from "@/lib/data";

export const Route = createFileRoute("/_dash/questions/")({
  head: () => ({ meta: [{ title: "Ask & Answer — Campus Connect" }, { name: "description", content: "Browse and answer academic questions from fellow students." }, { property: "og:title", content: "Ask & Answer — Campus Connect" }, { property: "og:description", content: "A searchable knowledge feed by students." }] }),
  component: Questions,
});

function Questions() {
  const [q, setQ] = useState("");
  const [sub, setSub] = useState("all");
  const [sort, setSort] = useState<"top" | "new">("top");
  let list = QUESTIONS.filter((x) => (sub === "all" || x.subject === sub) && (x.title + x.body + x.tags.join(" ")).toLowerCase().includes(q.toLowerCase()));
  if (sort === "top") list = [...list].sort((a, b) => b.votes - a.votes);
  return (
    <div>
      <PageHeader eyebrow="Knowledge feed" title="Ask & Answer" desc="Real questions, explained by peers who just figured it out." action={<Link to="/create" className="pixel-btn bg-primary"><PixelIcon name="plus" size={14} />Ask a question</Link>} />
      <SearchBar value={q} onChange={setQ} placeholder="Search questions…" />
      <div className="mt-5 flex flex-wrap items-center gap-2" role="group" aria-label="Filter by subject">
        {[{ id: "all", label: "All topics", icon: "star" }, ...SUBJECTS].map((s) => (
          <button key={s.id} onClick={() => setSub(s.id)} aria-pressed={sub === s.id}
            className={`flex items-center gap-2 border-2 border-navy px-3 py-1.5 text-sm font-medium ${sub === s.id ? "bg-navy text-cream" : "bg-card hover:bg-mint-soft"}`}>
            <PixelIcon name={s.icon} size={14} />{s.label}
          </button>
        ))}
        <div className="ml-auto flex border-2 border-navy">
          {(["top", "new"] as const).map((s) => <button key={s} onClick={() => setSort(s)} className={`label-pixel px-3 py-1.5 ${sort === s ? "bg-orange" : "bg-card"}`}>{s}</button>)}
        </div>
      </div>
      <div className="mt-6 grid gap-4">
        {list.map((x) => <QuestionCard key={x.id} q={x} />)}
        {list.length === 0 && <div className="pixel-card-sm p-10 text-center"><PixelIcon name="search" size={40} className="mx-auto" /><p className="mt-3">No questions found. Be the first to ask!</p></div>}
      </div>
    </div>
  );
}
