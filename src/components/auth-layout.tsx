import campus from "@/assets/campus.jpg";
import { PixelIcon } from "./pixel";

export function AuthLayout({ title, subtitle, children }: { title: string; subtitle: string; children: React.ReactNode }) {
  return (
    <div className="grid min-h-screen lg:grid-cols-2">
      <div className="relative hidden overflow-hidden border-r-2 border-navy bg-navy lg:block">
        <img src={campus} alt="Pixel art campus with students collaborating on the lawn at dusk" width={1024} height={1280} className="pixelated h-full w-full object-cover" />
        <div className="absolute inset-x-8 bottom-8 pixel-card bg-cream p-5">
          <div className="label-pixel text-orange">Campus Connect</div>
          <p className="mt-1 font-pixel text-2xl font-bold">Ask. Answer. Build together.</p>
          <p className="mt-1 text-sm text-muted-foreground">12,400 students across 38 departments are already leveling up.</p>
        </div>
      </div>
      <div className="flex items-center justify-center px-6 py-12">
        <div className="w-full max-w-md">
          <div className="mb-8 flex items-center gap-2">
            <div className="grid h-10 w-10 place-items-center border-2 border-navy bg-orange shadow-[var(--shadow-pixel-sm)]"><PixelIcon name="star" size={22} /></div>
            <span className="font-pixel text-2xl font-bold">Campus <span className="text-orange">Connect</span></span>
          </div>
          <h1 className="text-4xl font-bold">{title}</h1>
          <p className="mt-2 text-muted-foreground">{subtitle}</p>
          <div className="pixel-card mt-8 p-6">{children}</div>
        </div>
      </div>
    </div>
  );
}

export function Field({ label, id, ...props }: { label: string; id: string } & React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <div>
      <label htmlFor={id} className="mb-1.5 block text-sm font-semibold">{label}</label>
      <input id={id} className="pixel-input" {...props} />
    </div>
  );
}

export function GoogleBtn() {
  return (
    <button type="button" className="pixel-btn w-full bg-card">
      <svg width="16" height="16" viewBox="0 0 4 4" shapeRendering="crispEdges" aria-hidden="true"><rect width="2" height="2" fill="var(--orange)" /><rect x="2" width="2" height="2" fill="var(--mint)" /><rect y="2" width="2" height="2" fill="var(--navy)" /><rect x="2" y="2" width="2" height="2" fill="var(--navy-soft)" /></svg>
      Continue with campus SSO
    </button>
  );
}
