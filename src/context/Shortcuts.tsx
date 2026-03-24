import { Shortcut, Sortable } from "@/components/shortcuts/item";
import { TooltipProvider } from "@/components/ui/tooltip";
import { DragDropProvider } from "@dnd-kit/react";
import { isSortable } from "@dnd-kit/react/sortable";
import { createContext, useContext } from "react";
import { useLocalStorage } from "usehooks-ts";

type Context = {
  addShortcut: (shortcut: Shortcut) => void;
  removeShortcut: (index: number) => void;
  updateShortcut: (index: number, shortcut: Shortcut) => void;
};

const Context = createContext<Context | undefined>(undefined);

export default function Shortcuts() {
  const [shortcuts, setShortcuts] = useLocalStorage<Shortcut[]>(
    "shortcuts",
    [],
  );

  const addShortcut = (shortcut: Shortcut) => {
    setShortcuts((prev) => [...prev, shortcut]);
  };

  const removeShortcut = (index: number) => {
    setShortcuts((prev) => prev.filter((_, i) => i !== index));
  };

  const updateShortcut = (index: number, shortcut: Shortcut) => {
    setShortcuts((prev) =>
      prev.map((s, i) => (i === index ? { ...s, ...shortcut } : s)),
    );
  };

  return (
    <Context value={{ addShortcut, removeShortcut, updateShortcut }}>
      <TooltipProvider>
        <DragDropProvider
          onDragEnd={(event) => {
            if (event.canceled) return;

            const { source } = event.operation;

            if (isSortable(source)) {
              const { initialIndex, index } = source;

              if (initialIndex !== index) {
                setShortcuts((items) => {
                  const newItems = [...items];
                  const [removed] = newItems.splice(initialIndex, 1);
                  newItems.splice(index, 0, removed);
                  return newItems;
                });
              }
            }
          }}
        >
          <div className="relative z-20 mx-auto flex flex-wrap justify-center gap-4 md:max-w-2xl lg:max-w-3xl xl:max-w-4xl">
            {shortcuts.map((shortcut, index) => (
              <Sortable key={index} index={index}>
                <Shortcut index={index} shortcut={shortcut} />
              </Sortable>
            ))}
            <Shortcut index={shortcuts.length} />
          </div>
        </DragDropProvider>
      </TooltipProvider>
    </Context>
  );
}

// eslint-disable-next-line react-refresh/only-export-components
export const useShortcuts = () => {
  const context = useContext(Context);
  if (!context) throw new Error("useShortcuts must be used within Shortcuts");
  return context;
};
