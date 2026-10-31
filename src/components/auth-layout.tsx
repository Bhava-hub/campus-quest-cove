import campus from "@/assets/shiv-nadar-campus.png.asset.json";
import { PixelIcon } from "./pixel";
import { AvatarPicker } from "./avatar-picker";

export function AuthLayout({ title, subtitle, children }: { title: string; subtitle: string; children: React.ReactNode }) {
  return (
    <div className="grid min-h-screen md:grid-cols-[minmax(0,1fr)_minmax(420px,1fr)]">
      <div className="relative hidden overflow-hidden border-r-2 border-navy bg-navy md:block">
        <img src={campus.url} alt="Pixel art of Shiv Nadar University Chennai campus" width={768} height={1367} className="pixelated absolute inset-0 h-full w-full object-cover object-top" />
      </div>
      <div className="flex items-center justify-center px-5 py-8 lg:px-10">
        <div className="w-full max-w-md">
          <div className="mb-8 flex items-center gap-2">
            <div className="grid h-10 w-10 place-items-center border-2 border-navy bg-orange shadow-[var(--shadow-pixel-sm)]"><PixelIcon name="star" size={22} /></div>
            <span className="font-pixel text-2xl font-bold">Campus <span className="text-orange">Connect</span></span>
          </div>
          <h1 className="text-3xl font-bold">{title}</h1>
          <p className="mt-2 text-muted-foreground">{subtitle}</p>
          <div className="mt-6 border-t-2 border-navy/20 pt-5"><AvatarPicker />{children}</div>
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
