import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { PageHeader, ProjectCard, SearchBar } from "@/components/cards";
import { PixelAvatar, PixelIcon } from "@/components/pixel";
import { PROJECTS } from "@/lib/data";

export const Route = createFileRoute("/_dash/teammates/")({
  head: () => ({ meta: [{ title: "Find Teammates — Campus Connect" }, { name: "description", content: "Discover student projects and hackathon teams recruiting now." }, { property: "og:title", content: "Find Teammates — Campus Connect" }, { property: "og:description", content: "Join teams that need your skills." }] }),
  component: Teammates,
});

const CATS = ["All", "Hackathon", "Research", "Competition", "Creative", "Course Project"];

function Teammates() {
  const [q, setQ] = useState("");
  const [cat, setCat] = useState("All");
  const [openOnly, setOpenOnly] = useState(false);
  const list = PROJECTS.filter((p) => (cat === "All" || p.category === cat) && (!openOnly || p.status !== "Full") && (p.title + p.pitch + p.skills.join(" ")).toLowerCase().includes(q.toLowerCase()));
  return (
    <div>
      <PageHeader eyebrow="Party finder" title="Find Teammates" desc="Discover projects that need your skills — or recruit the missing piece of yours." action={<Link to="/teammates/new" className="pixel-btn bg-primary"><PixelIcon name="plus" size={14} />Recruit for a project</Link>} />
      <div className="pixel-card-sm mb-6 flex flex-wrap items-center gap-4 bg-mint-soft p-4">
        <div className="flex -space-x-1">{["Rohan", "Elena", "Jae", "Maya"].map((n) => <PixelAvatar key={n} seed={n} size={36} />)}</div>
        <p className="flex-1 text-sm"><strong>3 students</strong> with Figma + React skills matched your profile this week.</p>
        <button className="pixel-btn bg-card text-sm">See matches</button>
      </div>
      <SearchBar value={q} onChange={setQ} placeholder="Search by project, skill or role…" />
      <div className="mt-5 flex flex-wrap items-center gap-2">
        {CATS.map((c) => <button key={c} onClick={() => setCat(c)} aria-pressed={cat === c} className={`border-2 border-navy px-3 py-1.5 text-sm font-medium ${cat === c ? "bg-navy text-cream" : "bg-card hover:bg-orange-soft"}`}>{c}</button>)}
        <label className="ml-auto flex items-center gap-2 text-sm font-medium"><input type="checkbox" checked={openOnly} onChange={(e) => setOpenOnly(e.target.checked)} className="h-4 w-4 accent-[var(--orange)]" />Open roles only</label>
      </div>
      <div className="mt-6 grid gap-6 md:grid-cols-2">{list.map((p) => <ProjectCard key={p.id} p={p} />)}</div>
      {list.length === 0 && <p className="mt-6 text-muted-foreground">No projects match — start your own!</p>}
    </div>
  );
}
