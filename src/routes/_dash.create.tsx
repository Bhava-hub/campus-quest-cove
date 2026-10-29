import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { toast } from "sonner";
import { PageHeader } from "@/components/cards";
import { PixelIcon } from "@/components/pixel";
import { SUBJECTS } from "@/lib/data";

export const Route = createFileRoute("/_dash/create")({
  head: () => ({ meta: [{ title: "Create Post — Campus Connect" }, { name: "description", content: "Ask a question or recruit teammates." }, { property: "og:title", content: "Create Post — Campus Connect" }, { property: "og:description", content: "Share with your campus." }] }),
  component: Create,
});

function Create() {
  const nav = useNavigate();
  return (
    <div className="max-w-3xl">
      <PageHeader eyebrow="Create post" title="Ask a question" desc="Clear questions get faster, better answers." action={<Link to="/teammates/new" className="pixel-btn bg-orange-soft"><PixelIcon name="team" size={14} />Recruit instead</Link>} />
      <form className="pixel-card space-y-5 p-6" onSubmit={(e) => { e.preventDefault(); toast.success("Question posted!"); nav({ to: "/questions" }); }}>
        <div><label htmlFor="t" className="mb-1.5 block text-sm font-semibold">Title</label><input id="t" required className="pixel-input" placeholder="Be specific — what exactly are you stuck on?" /></div>
        <fieldset>
          <legend className="mb-1.5 text-sm font-semibold">Subject</legend>
          <div className="flex flex-wrap gap-2">{SUBJECTS.map((s, i) => (
            <label key={s.id} className="flex cursor-pointer items-center gap-2 border-2 border-navy bg-card px-3 py-1.5 text-sm has-[:checked]:bg-mint">
              <input type="radio" name="sub" defaultChecked={i === 0} className="sr-only" /><PixelIcon name={s.icon} size={14} />{s.label}
            </label>))}</div>
        </fieldset>
        <div><label htmlFor="b" className="mb-1.5 block text-sm font-semibold">Details</label><textarea id="b" rows={7} className="pixel-input" placeholder="What have you tried? Include formulas, code or lecture context." /></div>
        <div><label htmlFor="g" className="mb-1.5 block text-sm font-semibold">Tags</label><input id="g" className="pixel-input" placeholder="algorithms, graphs" /></div>
        <div className="flex justify-end gap-3"><button type="button" onClick={() => nav({ to: "/dashboard" })} className="pixel-btn bg-card">Cancel</button><button className="pixel-btn bg-primary">Post question</button></div>
      </form>
    </div>
  );
}
