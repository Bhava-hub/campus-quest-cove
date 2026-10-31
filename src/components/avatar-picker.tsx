import { createContext, useContext, useState, type ReactNode } from "react";
import { Button } from "@/components/ui/button";
import doge from "@/assets/avatar-doge.jpg";
import llama from "@/assets/avatar-llama.jpg";
import alpaca from "@/assets/avatar-alpaca.jpg";
import cat from "@/assets/avatar-cat.jpg";
import monkey from "@/assets/avatar-monkey.jpg";
import frog from "@/assets/avatar-frog.jpg";
import fox from "@/assets/avatar-fox.jpg";
import penguin from "@/assets/avatar-penguin.jpg";

const AVATARS = [
  { name: "Doge", src: doge }, { name: "Llama", src: llama },
  { name: "Alpaca", src: alpaca }, { name: "Coughing cat", src: cat },
  { name: "Thinking monkey", src: monkey }, { name: "Headphone frog", src: frog },
  { name: "Scholar fox", src: fox }, { name: "Penguin", src: penguin },
];
const AvatarContext = createContext({ selected: 0, select: (_index: number) => {} });

export function AvatarProvider({ children }: { children: ReactNode }) {
  const [selected, select] = useState(0);
  return <AvatarContext.Provider value={{ selected, select }}>{children}</AvatarContext.Provider>;
}

export function SelectedAvatar({ size = 40 }: { size?: number }) {
  const { selected } = useContext(AvatarContext);
  const avatar = AVATARS[selected] ?? AVATARS[0];
  return <img src={avatar?.src} alt={`Your avatar: ${avatar?.name}`} width={size} height={size} className="pixelated shrink-0 border-2 border-navy bg-card object-contain" />;
}

export function AvatarPicker() {
  const { selected, select } = useContext(AvatarContext);
  return (
    <fieldset className="mb-6">
      <legend className="mb-3 font-pixel text-lg font-semibold">Choose your avatar</legend>
      <div className="grid grid-cols-4 gap-2">
        {AVATARS.map((avatar, index) => (
          <Button key={avatar.name} type="button" variant="outline" aria-label={`Choose ${avatar.name} avatar`} aria-pressed={selected === index} title={avatar.name}
            onClick={() => select(index)} className={`relative h-auto aspect-square rounded-sm border-2 p-1 ${selected === index ? "border-orange bg-orange-soft ring-2 ring-orange ring-offset-2 ring-offset-card" : "border-navy/30 bg-card hover:border-navy"}`}>
            <img src={avatar.src} alt="" width={80} height={80} className="pixelated h-full w-full object-contain" />
            {selected === index && <span className="absolute bottom-0 right-0 grid h-5 w-5 place-items-center border-l-2 border-t-2 border-navy bg-mint text-navy" aria-hidden="true">✓</span>}
          </Button>
        ))}
      </div>
    </fieldset>
  );
}