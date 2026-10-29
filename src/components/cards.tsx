import { Link } from "@tanstack/react-router";
import { useState } from "react";
import { toast } from "sonner";
import { PixelAvatar, PixelIcon } from "./pixel";
import { subjectOf, type Project, type Question } from "@/lib/data";

export function Tag({ children, tone = "muted" }: { children: React.ReactNode; tone?: "muted" | "mint" | "orange" | "navy" }) {
  const tones = { muted: "bg-muted", mint: "bg-mint-soft", orange: "bg-orange-soft", navy: "bg-navy text-cream" };
  return <span className={`label-pixel inline-flex items-center gap-1 border-2 border-navy px-2 py-0.5 ${tones[tone]}`}>{children}</span>;
}

export function Upvote({ votes }: { votes: number }) {
  const [on, setOn] = useState(false);
  return (
    <button
      onClick={(e) => { e.preventDefault(); setOn(!on); }}
      aria-pressed={on}
      aria-label={on ? "Remove upvote" : "Upvote"}
      className={`flex w-14 shrink-0 flex-col items-center gap-1 border-2 border-navy py-2 transition-colors ${on ? "bg-mint" : "bg-card hover:bg-mint-soft"}`}
    >
      <PixelIcon name="up" size={18} />
      <span className="font-pixel text-sm font-bold">{votes + (on ? 1 : 0)}</span>
    </button>
  );
}

export function QuestionCard({ q }: { q: Question }) {
  const s = subjectOf(q.subject);
  return (
    <Link to="/questions/$id" params={{ id: q.id }} className="pixel-card-sm flex gap-4 p-4 transition-transform hover:-translate-y-0.5">
      <Upvote votes={q.votes} />
      <div className="min-w-0 flex-1">
        <div className="mb-2 flex flex-wrap items-center gap-2">
          <Tag tone="mint"><PixelIcon name={s.icon} size={12} />{s.label}</Tag>
          {q.solved && <Tag tone="orange"><PixelIcon name="check" size={12} />Solved</Tag>}
        </div>
        <h3 className="text-lg font-semibold leading-snug">{q.title}</h3>
        <p className="mt-1 line-clamp-2 text-sm text-muted-foreground">{q.body}</p>
        <div className="mt-3 flex flex-wrap items-center gap-3 text-sm">
          <PixelAvatar seed={q.author} size={24} />
          <span className="font-medium">{q.author}</span>
          <span className="text-muted-foreground">· {q.time}</span>
          <span className="ml-auto flex items-center gap-1.5 font-medium"><PixelIcon name="chat" size={16} />{q.answers} answers</span>
        </div>
      </div>
    </Link>
  );
}

export function ProjectCard({ p }: { p: Project }) {
  const [interested, setInterested] = useState(false);
  const statusTone = p.status === "Open" ? "mint" : p.status === "Full" ? "muted" : "orange";
  return (
    <article className="pixel-card flex flex-col p-5">
      <div className="flex items-start gap-3">
        <div className="grid h-12 w-12 place-items-center border-2 border-navy bg-orange-soft"><PixelIcon name={p.icon} size={28} /></div>
        <div className="min-w-0 flex-1">
          <div className="label-pixel text-muted-foreground">{p.category}</div>
          <h3 className="text-xl font-semibold leading-tight">{p.title}</h3>
        </div>
        <Tag tone={statusTone}>{p.status}</Tag>
      </div>
      <p className="mt-3 text-sm text-muted-foreground">{p.pitch}</p>
      <div className="mt-4 flex flex-wrap gap-1.5">{p.skills.map((s) => <Tag key={s}>{s}</Tag>)}</div>
      <div className="mt-4 space-y-1.5 border-t-2 border-dashed border-navy/30 pt-3 text-sm">
        {p.roles.map((r) => (
          <div key={r.name} className="flex items-center justify-between">
            <span className="flex items-center gap-2"><PixelIcon name="user" size={14} />{r.name}</span>
            <span className="font-pixel font-semibold">{r.open > 0 ? `${r.open} open` : "filled"}</span>
          </div>
        ))}
      </div>
      <div className="mt-auto flex items-center gap-3 pt-4">
        <div className="flex -space-x-1">{p.members.map((m) => <PixelAvatar key={m} seed={m} size={28} />)}</div>
        <span className="text-xs text-muted-foreground">{p.members.length} member{p.members.length > 1 && "s"} · due {p.deadline}</span>
        <button
          disabled={p.status === "Full"}
          onClick={() => { setInterested(!interested); if (!interested) toast.success(`Interest sent to ${p.lead}!`); }}
          className={`pixel-btn ml-auto text-sm disabled:cursor-not-allowed disabled:opacity-50 ${interested ? "bg-mint" : "bg-primary"}`}
        >
          {interested ? <><PixelIcon name="check" size={14} />Sent</> : <><PixelIcon name="heart" size={14} />Express Interest</>}
        </button>
      </div>
    </article>
  );
}

export function PageHeader({ eyebrow, title, desc, action }: { eyebrow: string; title: string; desc?: string; action?: React.ReactNode }) {
  return (
    <div className="mb-6 flex flex-wrap items-end justify-between gap-4">
      <div>
        <div className="label-pixel text-orange">{eyebrow}</div>
        <h1 className="text-3xl font-bold md:text-4xl">{title}</h1>
        {desc && <p className="mt-1 max-w-xl text-muted-foreground">{desc}</p>}
      </div>
      {action}
    </div>
  );
}

export function SearchBar({ value, onChange, placeholder }: { value: string; onChange: (v: string) => void; placeholder: string }) {
  return (
    <label className="relative block">
      <span className="sr-only">{placeholder}</span>
      <span className="absolute left-3 top-1/2 -translate-y-1/2"><PixelIcon name="search" size={18} /></span>
      <input value={value} onChange={(e) => onChange(e.target.value)} placeholder={placeholder} className="pixel-input py-3 pl-10 shadow-[var(--shadow-pixel-sm)]" />
    </label>
  );
}
