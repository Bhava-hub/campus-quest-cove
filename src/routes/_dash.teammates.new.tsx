import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { toast } from "sonner";
import { PageHeader, Tag } from "@/components/cards";
import { PixelIcon } from "@/components/pixel";

export const Route = createFileRoute("/_dash/teammates/new")({
  head: () => ({ meta: [{ title: "Recruit Teammates — Campus Connect" }, { name: "description", content: "Publish a project recruitment post." }, { property: "og:title", content: "Recruit Teammates — Campus Connect" }, { property: "og:description", content: "Find the right people for your project." }] }),
  component: NewProject,
});

function NewProject() {
  const nav = useNavigate();
  const [skills, setSkills] = useState<string[]>(["React"]);
  const [skill, setSkill] = useState("");
  const [roles, setRoles] = useState([{ name: "Frontend Dev", open: 1 }]);
  return (
    <div className="max-w-3xl">
      <PageHeader eyebrow="New recruitment" title="Assemble your party" desc="Tell students what you're building and who you need." />
      <form className="pixel-card space-y-5 p-6" onSubmit={(e) => { e.preventDefault(); toast.success("Recruitment post published!"); nav({ to: "/teammates" }); }}>
        <div><label htmlFor="t" className="mb-1.5 block text-sm font-semibold">Project title</label><input id="t" required className="pixel-input" placeholder="e.g. StudyBuddy AI" /></div>
        <div className="grid gap-5 sm:grid-cols-2">
          <div><label htmlFor="c" className="mb-1.5 block text-sm font-semibold">Category</label><select id="c" className="pixel-input"><option>Hackathon</option><option>Research</option><option>Competition</option><option>Creative</option><option>Course Project</option></select></div>
          <div><label htmlFor="d" className="mb-1.5 block text-sm font-semibold">Recruiting until</label><input id="d" type="date" className="pixel-input" /></div>
        </div>
        <div><label htmlFor="p" className="mb-1.5 block text-sm font-semibold">Pitch</label><textarea id="p" rows={4} className="pixel-input" placeholder="What's the idea and why is it exciting?" /></div>
        <div>
          <label htmlFor="s" className="mb-1.5 block text-sm font-semibold">Required skills</label>
          <div className="flex gap-2"><input id="s" value={skill} onChange={(e) => setSkill(e.target.value)} className="pixel-input" placeholder="Add a skill and press Add" />
            <button type="button" className="pixel-btn bg-secondary" onClick={() => { if (skill.trim()) { setSkills([...skills, skill.trim()]); setSkill(""); } }}>Add</button></div>
          <div className="mt-2 flex flex-wrap gap-1.5">{skills.map((s) => <button type="button" key={s} onClick={() => setSkills(skills.filter((x) => x !== s))} aria-label={`Remove ${s}`}><Tag tone="mint">{s} ×</Tag></button>)}</div>
        </div>
        <div>
          <div className="mb-1.5 text-sm font-semibold">Open roles</div>
          <div className="space-y-2">
            {roles.map((r, i) => (
              <div key={i} className="flex gap-2">
                <input aria-label="Role name" value={r.name} onChange={(e) => setRoles(roles.map((x, j) => j === i ? { ...x, name: e.target.value } : x))} className="pixel-input" />
                <input aria-label="Positions" type="number" min={1} value={r.open} onChange={(e) => setRoles(roles.map((x, j) => j === i ? { ...x, open: +e.target.value } : x))} className="pixel-input w-24" />
              </div>
            ))}
          </div>
          <button type="button" onClick={() => setRoles([...roles, { name: "", open: 1 }])} className="mt-2 flex items-center gap-2 text-sm font-semibold underline underline-offset-4"><PixelIcon name="plus" size={12} />Add role</button>
        </div>
        <div className="flex justify-end gap-3 border-t-2 border-dashed border-navy/30 pt-5">
          <button type="button" onClick={() => nav({ to: "/teammates" })} className="pixel-btn bg-card">Cancel</button>
          <button className="pixel-btn bg-primary"><PixelIcon name="rocket" size={14} />Publish post</button>
        </div>
      </form>
    </div>
  );
}
