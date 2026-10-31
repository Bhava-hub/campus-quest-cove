import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { PageHeader, QuestionCard, SearchBar } from "@/components/cards";
import { PixelIcon } from "@/components/pixel";
import { QUESTIONS, SUBJECTS } from "@/lib/data";
import { Button } from "@/components/ui/button";

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
      <div className="flex flex-wrap items-center gap-3 border-y-2 border-navy/20 bg-card/70 py-4">
        <div className="min-w-0 flex-1 basis-64"><SearchBar value={q} onChange={setQ} placeholder="Search questions, tags…" /></div>
        <select aria-label="Filter by subject" value={sub} onChange={(e) => setSub(e.target.value)} className="pixel-input w-auto min-w-40 py-3">
          <option value="all">All subjects</option>
          {SUBJECTS.map((s) => <option key={s.id} value={s.id}>{s.label}</option>)}
        </select>
        <div className="flex border-2 border-navy" role="group" aria-label="Sort questions">
          {(["top", "new"] as const).map((s) => <Button variant="ghost" key={s} onClick={() => setSort(s)} aria-pressed={sort === s} className={`h-11 rounded-none px-4 font-pixel capitalize ${sort === s ? "bg-orange hover:bg-orange" : "bg-card"}`}>{s}</Button>)}
        </div>
      </div>
      <div className="mt-6 grid gap-4">
        {list.map((x) => <QuestionCard key={x.id} q={x} />)}
        {list.length === 0 && <div className="pixel-card-sm p-10 text-center"><PixelIcon name="search" size={40} className="mx-auto" /><p className="mt-3">No questions found. Be the first to ask!</p></div>}
      </div>
    </div>
  );
}
