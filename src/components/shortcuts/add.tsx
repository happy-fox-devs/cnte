import { Dialog, DialogTrigger } from "@/components/ui/dialog";
import { useShortcuts } from "@/context/Shortcuts";
import { PlusIcon } from "lucide-react";
import { useState } from "react";
import ShortcutContainer from "./container";
import ShortcutDialogContent from "./dialog-content";

export default function ShortcutAdd() {
  const { addShortcut } = useShortcuts();

  const [open, setOpen] = useState(false);
  const [name, setName] = useState("");
  const [url, setUrl] = useState("");

  const handleSubmit = (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();
    addShortcut({ name, url });
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger>
        <ShortcutContainer tooltip="Add shortcut">
          <PlusIcon size={18} className="text-white" />
        </ShortcutContainer>
      </DialogTrigger>
      <ShortcutDialogContent
        type="add"
        title="Add shortcut"
        description="Add a new shortcut to your shortcuts list."
        name={name}
        url={url}
        setName={setName}
        setUrl={setUrl}
        handleSubmit={handleSubmit}
      />
    </Dialog>
  );
}
