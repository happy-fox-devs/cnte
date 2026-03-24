import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { useApp } from "@/context/App";
import { cn } from "@/lib/utils";
import { EditIcon } from "lucide-react";
import OptionsContent from "./content";
import FloatingTriggerButton from "./floating-trigger-button";

export default function Options() {
  const { layout, updateLayout } = useApp();

  return (
    <div className="fixed right-0 bottom-0 z-20 mr-4 mb-4 flex flex-col gap-4">
      <button
        className={cn(
          "group inline-block rounded-full border border-white/10 bg-white/5 p-4 shadow backdrop-blur-sm transition-all duration-300 hover:border-white/20 hover:bg-white/10",
          layout.isEditing && "border-accent! bg-accent/10!",
        )}
        onClick={() => updateLayout("isEditing", !layout.isEditing)}
      >
        <EditIcon
          className={cn(
            "text-neutral-200 antialiased transition-colors duration-300",
            layout.isEditing && "text-accent!",
          )}
        />
      </button>
      <Dialog>
        <DialogTrigger>
          <FloatingTriggerButton />
        </DialogTrigger>
        <DialogContent className="z-20 h-[calc(100%-2rem)] md:max-w-2xl lg:max-w-3xl xl:max-w-4xl">
          <OptionsContent />
        </DialogContent>
      </Dialog>
    </div>
  );
}
