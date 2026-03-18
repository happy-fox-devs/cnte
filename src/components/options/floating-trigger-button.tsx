import { BoltIcon } from "lucide-react";

export default function FloatingTriggerButton() {
  return (
    <span className="group inline-block rounded-full border border-white/10 bg-white/5 p-4 shadow backdrop-blur-sm transition-all hover:scale-105 hover:border-white/20 hover:bg-white/10">
      <BoltIcon className="text-neutral-200 antialiased transition-transform group-hover:rotate-90" />
    </span>
  );
}
