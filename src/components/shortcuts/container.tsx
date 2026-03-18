import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";

export default function ShortcutContainer({
  tooltip,
  children,
  remove,
}: {
  tooltip: string;
  children: React.ReactNode;
  remove?: string;
}) {
  return (
    <Tooltip>
      <TooltipTrigger>
        <div
          className={cn(
            "bg-surface border-border group relative flex size-14 cursor-pointer items-center justify-center gap-2 rounded-md border",
            remove ? "p-2" : "p-4",
          )}
        >
          {children}
        </div>
      </TooltipTrigger>
      <TooltipContent>{tooltip}</TooltipContent>
    </Tooltip>
  );
}
