import { PencilIcon, TrashIcon } from "lucide-react";
import {
  ContextMenuContent,
  ContextMenuGroup,
  ContextMenuItem,
  ContextMenuSeparator,
} from "../ui/context-menu";

export default function ShortcutContextContent({
  index,
  setOpen,
  removeShortcut,
}: {
  index: number;
  setOpen: SetState<boolean>;
  removeShortcut: (index: number) => void;
}) {
  return (
    <ContextMenuContent>
      <ContextMenuGroup>
        <ContextMenuItem onClick={() => setOpen(true)}>
          <PencilIcon />
          Edit
        </ContextMenuItem>
      </ContextMenuGroup>
      <ContextMenuSeparator className="bg-black/10" />
      <ContextMenuGroup>
        <ContextMenuItem
          variant="destructive"
          onClick={() => removeShortcut(index)}
        >
          <TrashIcon />
          Delete
        </ContextMenuItem>
      </ContextMenuGroup>
    </ContextMenuContent>
  );
}
