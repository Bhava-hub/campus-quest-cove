import { createFileRoute } from "@tanstack/react-router";
import { QuestionCard, Tag } from "@/components/cards";
import { PixelAvatar, PixelIcon, PixelStars } from "@/components/pixel";
import { QUESTIONS } from "@/lib/data";
import { SelectedAvatar } from "@/components/avatar-picker";

export const Route = createFileRoute("/_dash/profile")({
  head: () => ({ meta: [{ title: "Profile — Campus Connect" }, { name: "description", content: "Your Campus Connect profile, skills and badges." }, { property: "og:title", content: "Profile — Campus Connect" }, { property: "og:description", content: "Skills, badges and contributions." }] }),
  component: Profile,
});

const BADGES: [string, string][] = [["trophy", "Top Helper"], ["star", "7-day Streak"], ["rocket", "Hackathon Hero"], ["book", "Bookworm"]];

function Profile() {
  return (
    <div className="grid gap-8 lg:grid-cols-[320px_1fr]">
      <aside className="space-y-6">
        <div className="pixel-card overflow-hidden">
          <div className="relative h-24 bg-navy"><PixelStars className="absolute right-4 top-4" /></div>
          <div className="-mt-12 px-6 pb-6">
            <SelectedAvatar size={96} />
            <h1 className="mt-3 text-3xl font-bold">Aanya Rao</h1>
            <p className="text-muted-foreground">2nd year · Computer Science</p>
            <p className="mt-3 text-sm">Algorithms nerd, hackathon regular, always down to explain graph theory over chai.</p>
            <div className="mt-4">
              <div className="flex justify-between text-sm"><span className="font-pixel font-semibold">Level 7 Scholar</span><span>1,240 / 1,500 XP</span></div>
              <div className="mt-1 flex h-4 gap-0.5 border-2 border-navy p-0.5">{Array.from({ length: 15 }).map((_, i) => <span key={i} className={`flex-1 ${i < 12 ? "bg-mint" : ""}`} />)}</div>
            </div>
            <button className="pixel-btn mt-5 w-full bg-card">Edit profile</button>
          </div>
        </div>
        <div className="pixel-card-sm p-5">
          <h2 className="text-lg font-semibold">Skills</h2>
          <div className="mt-3 flex flex-wrap gap-1.5">{["Python", "React", "Algorithms", "Figma", "LLMs"].map((s) => <Tag key={s} tone="mint">{s}</Tag>)}</div>
          <h2 className="mt-5 text-lg font-semibold">Looking for</h2>
          <div className="mt-3 flex flex-wrap gap-1.5">{["Hackathons", "Research"].map((s) => <Tag key={s} tone="orange">{s}</Tag>)}</div>
        </div>
      </aside>
      <div className="space-y-8">
        <section>
          <h2 className="mb-4 text-2xl font-bold">Badges</h2>
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">{BADGES.map(([i, l]) => (
            <div key={l} className="pixel-card-sm flex flex-col items-center p-4 text-center"><div className="grid h-14 w-14 place-items-center border-2 border-navy bg-orange-soft"><PixelIcon name={i} size={32} /></div><span className="mt-2 text-sm font-semibold">{l}</span></div>
          ))}</div>
        </section>
        <section><h2 className="mb-4 text-2xl font-bold">Recent questions</h2><div className="grid gap-4">{QUESTIONS.filter((q) => q.author === "Aanya Rao").map((q) => <QuestionCard key={q.id} q={q} />)}</div></section>
      </div>
    </div>
  );
}
