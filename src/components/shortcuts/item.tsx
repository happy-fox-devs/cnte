import { ContextMenu, ContextMenuTrigger } from "@/components/ui/context-menu";
import { useApp } from "@/context/App";
import { useShortcuts } from "@/context/Shortcuts";
import { cn } from "@/lib/utils";
import { useSortable } from "@dnd-kit/react/sortable";
import { useRef, useState } from "react";
import { Dialog } from "../ui/dialog";
import ShortcutAdd from "./add";
import ShortcutContainer from "./container";
import ShortcutContextContent from "./context-content";
import ShortcutDialogContent from "./dialog-content";

export const Sortable = ({
  index,
  children,
}: {
  index: number;
  children: React.ReactElement<{
    class: string;
  }>;
}) => {
  const {
    layout: { isEditing },
  } = useApp();

  const [element, setElement] = useState<Element | null>(null);
  const handleRef = useRef<HTMLButtonElement | null>(null);
  const { isDragging } = useSortable({
    id: index,
    index,
    element,
    handle: handleRef,
  });

  return (
    <div
      ref={setElement}
      className={cn(
        "border-border relative cursor-pointer overflow-hidden rounded-md border transition-all duration-300",
        {
          "border-dashed": isEditing || isDragging,
          "hover:border-accent/50 border-sky-600/50": isEditing,
          "border-accent": isDragging,
        },
      )}
    >
      {isEditing && (
        <div className="absolute top-0 left-0 z-10 size-full bg-transparent transition-all duration-300"></div>
      )}
      <div
        className={cn({
          "opacity-50": isDragging,
        })}
      >
        {children}
      </div>
    </div>
  );
};

export const Shortcut = ({
  index,
  shortcut,
}: {
  index: number;
  shortcut?: Shortcut;
}) => {
  const { removeShortcut, updateShortcut } = useShortcuts();

  const [open, setOpen] = useState(false);

  const [name, setName] = useState(shortcut?.name || "");
  const [url, setUrl] = useState(shortcut?.url || "");

  const handleSubmit = (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();

    updateShortcut(index, { name, url });
    setOpen(false);
  };

  if (!shortcut) return <ShortcutAdd />;

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <ContextMenu>
        <ContextMenuTrigger asChild>
          <a href={shortcut.url}>
            <ShortcutContainer tooltip={shortcut.name}>
              <img
                src={`https://www.google.com/s2/favicons?domain=${shortcut.url}&sz=128`}
                alt={shortcut.name}
                className={cn("size-8")}
              />
            </ShortcutContainer>
          </a>
        </ContextMenuTrigger>
        <ShortcutContextContent
          index={index}
          setOpen={setOpen}
          removeShortcut={removeShortcut}
        />
      </ContextMenu>
      <ShortcutDialogContent
        type="edit"
        title="Edit shortcut"
        description="Edit the shortcut."
        name={name}
        url={url}
        setName={setName}
        setUrl={setUrl}
        handleSubmit={handleSubmit}
      />
    </Dialog>
  );
};
