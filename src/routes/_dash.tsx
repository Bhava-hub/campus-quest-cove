import { createFileRoute, Link, Outlet, useRouterState } from "@tanstack/react-router";
import { useState } from "react";
import { PixelAvatar, PixelIcon } from "@/components/pixel";

export const Route = createFileRoute("/_dash")({ component: DashLayout });

const NAV = [
  { to: "/dashboard", label: "Home", icon: "home" },
  { to: "/questions", label: "Ask & Answer", icon: "question" },
  { to: "/teammates", label: "Find Teammates", icon: "team" },
  { to: "/activity", label: "My Activity", icon: "activity" },
  { to: "/saved", label: "Saved Posts", icon: "bookmark" },
  { to: "/profile", label: "Profile", icon: "user" },
] as const;

export function Logo() {
  return (
    <Link to="/dashboard" className="flex items-center gap-2">
      <div className="grid h-9 w-9 place-items-center border-2 border-navy bg-orange shadow-[var(--shadow-pixel-sm)]"><PixelIcon name="star" size={20} /></div>
      <span className="font-pixel text-xl font-bold leading-none">Campus<br /><span className="text-orange">Connect</span></span>
    </Link>
  );
}

function DashLayout() {
  const path = useRouterState({ select: (s) => s.location.pathname });
  const [open, setOpen] = useState(false);
  const nav = (
    <nav className="flex flex-col gap-1" aria-label="Main">
      {NAV.map((n) => {
        const active = path.startsWith(n.to);
        return (
          <Link key={n.to} to={n.to} onClick={() => setOpen(false)}
            className={`flex items-center gap-3 border-2 px-3 py-2.5 font-medium transition-colors ${active ? "border-cream bg-cream text-navy" : "border-transparent text-cream hover:border-cream/40"}`}>
            <span className={`grid h-7 w-7 place-items-center ${active ? "bg-mint-soft" : "bg-cream"} border-2 border-navy`}><PixelIcon name={n.icon} size={16} /></span>
            {n.label}
          </Link>
        );
      })}
    </nav>
  );
  const sidebarInner = (
    <div className="flex h-full flex-col gap-6 p-5">
      <div className="[&_span]:text-cream [&_span_span]:text-orange"><Logo /></div>
      <Link to="/create" onClick={() => setOpen(false)} className="pixel-btn w-full bg-primary shadow-[3px_3px_0_0_var(--cream)]">
        <PixelIcon name="plus" size={14} />Create Post
      </Link>
      {nav}
      <div className="mt-auto border-2 border-cream/30 p-3 text-cream">
        <div className="label-pixel text-mint">Weekly streak</div>
        <div className="mt-2 flex gap-1">{Array.from({ length: 7 }).map((_, i) => <span key={i} className={`h-4 flex-1 border border-cream ${i < 5 ? "bg-mint" : ""}`} />)}</div>
        <p className="mt-2 text-xs text-cream/80">5 of 7 days helping peers</p>
      </div>
    </div>
  );
  return (
    <div className="flex min-h-screen w-full">
      <aside className="sticky top-0 hidden h-screen w-64 shrink-0 border-r-2 border-navy bg-navy lg:block">{sidebarInner}</aside>
      {open && (
        <div className="fixed inset-0 z-40 lg:hidden">
          <button aria-label="Close menu" className="absolute inset-0 bg-navy/60" onClick={() => setOpen(false)} />
          <aside className="relative h-full w-64 bg-navy">{sidebarInner}</aside>
        </div>
      )}
      <div className="flex min-w-0 flex-1 flex-col">
        <header className="sticky top-0 z-30 flex items-center gap-3 border-b-2 border-navy bg-cream/95 px-4 py-3 backdrop-blur md:px-8">
          <button className="pixel-btn bg-card px-2.5 py-2 lg:hidden" aria-label="Open menu" onClick={() => setOpen(true)}>
            <span className="flex flex-col gap-0.5">{[0, 1, 2].map((i) => <span key={i} className="block h-0.5 w-4 bg-navy" />)}</span>
          </button>
          <div className="lg:hidden"><Logo /></div>
          <div className="ml-auto flex items-center gap-3">
            <span className="hidden items-center gap-1.5 border-2 border-navy bg-mint-soft px-2 py-1 font-pixel text-sm sm:flex"><PixelIcon name="trophy" size={14} />1,240 XP</span>
            <Link to="/profile" aria-label="Your profile"><PixelAvatar seed="Aanya Rao" size={36} /></Link>
          </div>
        </header>
        <main className="mx-auto w-full max-w-6xl flex-1 px-4 py-8 md:px-8"><Outlet /></main>
      </div>
    </div>
  );
}
