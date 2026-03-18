import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuGroup,
  ContextMenuItem,
  ContextMenuSeparator,
  ContextMenuTrigger,
} from "@/components/ui/context-menu";
import { useShortcuts } from "@/context/Shortcuts";
import { PencilIcon, TrashIcon } from "lucide-react";
import { useState } from "react";
import BasicField from "../ui/basic-field";
import { Button } from "../ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "../ui/dialog";
import ShortcutAdd from "./add";
import ShortcutContainer from "./container";

export const Shortcut = ({ shortcut }: { shortcut?: Shortcut }) => {
  const { removeShortcut, updateShortcut } = useShortcuts();

  const [open, setOpen] = useState(false);

  const [name, setName] = useState(shortcut?.name || "");
  const [url, setUrl] = useState(shortcut?.url || "");

  const handleSubmit = (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!shortcut) return;

    updateShortcut(shortcut.id, { id: shortcut.id, name, url });
    setOpen(false);
  };

  if (!shortcut) return <ShortcutAdd />;

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <ContextMenu>
        <ContextMenuTrigger>
          <a href={shortcut.url}>
            <ShortcutContainer tooltip={shortcut.name} remove={shortcut.id}>
              <img
                src={`https://www.google.com/s2/favicons?domain=${shortcut.url}&sz=128`}
                alt={shortcut.name}
                className="size-8"
              />
            </ShortcutContainer>
          </a>
        </ContextMenuTrigger>
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
              onClick={() => removeShortcut(shortcut.id)}
            >
              <TrashIcon />
              Delete
            </ContextMenuItem>
          </ContextMenuGroup>
        </ContextMenuContent>
      </ContextMenu>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add shortcut</DialogTitle>
          <DialogDescription>
            Add a new shortcut to your shortcuts list.
          </DialogDescription>
          <form className="space-y-4" onSubmit={handleSubmit}>
            <BasicField name="Name" value={name} onChange={setName} />
            <BasicField name="URL" value={url} onChange={setUrl} />
            <DialogFooter>
              <DialogClose asChild>
                <Button variant="outline">Cancel</Button>
              </DialogClose>
              <Button type="submit">Add</Button>
            </DialogFooter>
          </form>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};
