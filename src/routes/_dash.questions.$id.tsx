import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { Tag, Upvote } from "@/components/cards";
import { PixelAvatar, PixelIcon } from "@/components/pixel";
import { ANSWERS, QUESTIONS, subjectOf } from "@/lib/data";

export const Route = createFileRoute("/_dash/questions/$id")({
  loader: ({ params }) => {
    const q = QUESTIONS.find((x) => x.id === params.id);
    if (!q) throw notFound();
    return q;
  },
  head: ({ loaderData }) => ({ meta: [{ title: `${loaderData?.title ?? "Question"} — Campus Connect` }, { name: "description", content: loaderData?.body ?? "Question" }, { property: "og:title", content: loaderData?.title ?? "Question" }, { property: "og:description", content: loaderData?.body ?? "" }] }),
  component: Detail,
});

function Detail() {
  const q = Route.useLoaderData();
  const s = subjectOf(q.subject);
  return (
    <div className="grid gap-8 lg:grid-cols-[1fr_280px]">
      <div className="min-w-0">
        <Link to="/questions" className="text-sm font-medium underline underline-offset-4">← Back to feed</Link>
        <article className="pixel-card mt-4 flex gap-4 p-6">
          <Upvote votes={q.votes} />
          <div className="min-w-0 flex-1">
            <div className="flex flex-wrap gap-2"><Tag tone="mint"><PixelIcon name={s.icon} size={12} />{s.label}</Tag>{q.tags.map((t) => <Tag key={t}>#{t}</Tag>)}</div>
            <h1 className="mt-3 text-3xl font-bold">{q.title}</h1>
            <p className="mt-3 leading-relaxed">{q.body}</p>
            <div className="mt-4 flex items-center gap-3 text-sm"><PixelAvatar seed={q.author} size={28} /><span className="font-medium">{q.author}</span><span className="text-muted-foreground">{q.year} · {q.time}</span></div>
          </div>
        </article>
        <h2 className="mt-8 text-2xl font-bold">{ANSWERS.length} answers</h2>
        <div className="mt-4 space-y-4">
          {ANSWERS.map((a) => (
            <div key={a.author} className={`pixel-card-sm flex gap-4 p-5 ${a.helpful ? "bg-mint-soft" : ""}`}>
              <Upvote votes={a.votes} />
              <div className="min-w-0 flex-1">
                {a.helpful && <div className="mb-2"><Tag tone="mint"><PixelIcon name="check" size={12} />Most helpful</Tag></div>}
                <p className="leading-relaxed">{a.body}</p>
                <div className="mt-3 flex items-center gap-3 text-sm"><PixelAvatar seed={a.author} size={24} /><span className="font-medium">{a.author}</span><span className="text-muted-foreground">{a.year} · {a.time}</span></div>
              </div>
            </div>
          ))}
        </div>
        <form className="pixel-card mt-8 p-5" onSubmit={(e) => e.preventDefault()}>
          <label htmlFor="ans" className="font-pixel text-lg font-semibold">Your answer</label>
          <textarea id="ans" rows={5} className="pixel-input mt-2" placeholder="Explain it like you would to a friend before an exam…" />
          <div className="mt-3 flex justify-end"><button className="pixel-btn bg-primary">Post answer</button></div>
        </form>
      </div>
      <aside className="space-y-4">
        <div className="pixel-card-sm p-4">
          <div className="label-pixel text-muted-foreground">Asked by</div>
          <div className="mt-2 flex items-center gap-3"><PixelAvatar seed={q.author} size={44} /><div><div className="font-semibold">{q.author}</div><div className="text-sm text-muted-foreground">{q.year}</div></div></div>
        </div>
        <div className="pixel-card-sm bg-orange-soft p-4">
          <PixelIcon name="trophy" size={28} />
          <p className="mt-2 font-pixel font-semibold">+25 XP for a helpful answer</p>
          <p className="text-sm text-muted-foreground">Answers marked helpful earn bonus reputation.</p>
        </div>
      </aside>
    </div>
  );
}
