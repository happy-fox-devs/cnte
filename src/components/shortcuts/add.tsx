import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useShortcuts } from "@/context/Shortcuts";
import { PlusIcon } from "lucide-react";
import { useState } from "react";
import BasicField from "../ui/basic-field";
import ShortcutContainer from "./container";

export default function ShortcutAdd() {
  const { addShortcut } = useShortcuts();

  const [open, setOpen] = useState(false);
  const [name, setName] = useState("");
  const [url, setUrl] = useState("");

  const handleSubmit = (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();
    addShortcut({ id: crypto.randomUUID(), name, url });
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger>
        <ShortcutContainer tooltip="Add shortcut">
          <PlusIcon size={18} className="text-white" />
        </ShortcutContainer>
      </DialogTrigger>
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
}
