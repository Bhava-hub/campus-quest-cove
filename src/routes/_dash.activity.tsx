import { createFileRoute } from "@tanstack/react-router";
import { PageHeader } from "@/components/cards";
import { PixelIcon } from "@/components/pixel";

export const Route = createFileRoute("/_dash/activity")({
  head: () => ({ meta: [{ title: "My Activity — Campus Connect" }, { name: "description", content: "Your questions, answers and team activity." }, { property: "og:title", content: "My Activity — Campus Connect" }, { property: "og:description", content: "Track your campus contributions." }] }),
  component: Activity,
});

const ITEMS = [
  { icon: "check", text: "Your answer on “SN1 vs SN2” was marked most helpful", time: "1h ago", xp: 25 },
  { icon: "heart", text: "Kenji Ito accepted your interest in Pixel Quest Robotics", time: "3h ago", xp: 10 },
  { icon: "question", text: "You asked “Why does Dijkstra fail with negative edge weights?”", time: "Yesterday", xp: 5 },
  { icon: "up", text: "Your answers received 14 upvotes", time: "2 days ago", xp: 14 },
  { icon: "rocket", text: "You published StudyBuddy AI recruitment post", time: "3 days ago", xp: 10 },
];

function Activity() {
  return (
    <div>
      <PageHeader eyebrow="Quest log" title="My Activity" />
      <div className="mb-8 grid gap-4 sm:grid-cols-4">
        {[["Questions", 12, "question"], ["Answers", 38, "chat"], ["Upvotes", 214, "up"], ["Teams", 3, "team"]].map(([l, v, i]) => (
          <div key={l as string} className="pixel-card-sm p-4"><PixelIcon name={i as string} size={24} /><div className="mt-2 font-pixel text-3xl font-bold">{v}</div><div className="label-pixel text-muted-foreground">{l}</div></div>
        ))}
      </div>
      <ol className="pixel-card divide-y-2 divide-navy/15">
        {ITEMS.map((it) => (
          <li key={it.text} className="flex items-center gap-4 p-4">
            <span className="grid h-10 w-10 shrink-0 place-items-center border-2 border-navy bg-mint-soft"><PixelIcon name={it.icon} size={20} /></span>
            <div className="flex-1"><p className="font-medium">{it.text}</p><p className="text-sm text-muted-foreground">{it.time}</p></div>
            <span className="font-pixel font-semibold text-orange">+{it.xp} XP</span>
          </li>
        ))}
      </ol>
    </div>
  );
}
