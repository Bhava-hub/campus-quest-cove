import { createFileRoute, Link, Outlet, useRouterState } from "@tanstack/react-router";
import { SelectedAvatar } from "@/components/avatar-picker";
import { Button } from "@/components/ui/button";
import { PixelIcon } from "@/components/pixel";

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
  return (
    <div className="min-h-screen w-full">
      <header className="sticky top-0 z-30 border-b-2 border-navy bg-cream/95 backdrop-blur">
        <div className="mx-auto flex max-w-[1440px] flex-wrap items-center gap-4 px-4 py-4 md:px-8">
          <Logo />
          <nav aria-label="Main" className="order-3 flex w-full items-center gap-1 overflow-x-auto pb-1 xl:order-none xl:ml-auto xl:w-auto xl:pb-0">
            {NAV.map((n) => {
              const active = path.startsWith(n.to);
              return <Button asChild variant="ghost" key={n.to} className={`h-10 shrink-0 rounded-sm border-2 px-3 font-pixel text-base ${active ? "border-navy bg-navy text-cream hover:bg-navy-soft hover:text-cream" : "border-transparent hover:border-navy/30"}`}>
                <Link to={n.to}><PixelIcon name={n.icon} size={16} />{n.label}</Link>
              </Button>;
            })}
          </nav>
          <div className="ml-auto flex shrink-0 items-center gap-3 xl:ml-2">
            <Link to="/profile" aria-label="Your profile"><SelectedAvatar size={40} /></Link>
            <span className="hidden font-pixel text-sm sm:block">Aanya Rao</span>
          </div>
        </div>
      </header>
      <main className="mx-auto w-full max-w-[1440px] px-4 py-8 md:px-8 md:py-10"><Outlet /></main>
    </div>
  );
}
