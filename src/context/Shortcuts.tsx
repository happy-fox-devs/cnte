import { Shortcut } from "@/components/shortcuts/item";
import { TooltipProvider } from "@/components/ui/tooltip";
import { createContext, useContext } from "react";
import { useLocalStorage } from "usehooks-ts";

type Context = {
  addShortcut: (shortcut: Shortcut) => void;
  removeShortcut: (id: string) => void;
  updateShortcut: (id: string, shortcut: Shortcut) => void;
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

  const removeShortcut = (id: string) => {
    setShortcuts((prev) => prev.filter((shortcut) => shortcut.id !== id));
  };

  const updateShortcut = (id: string, shortcut: Shortcut) => {
    setShortcuts((prev) =>
      prev.map((s) => (s.id === id ? { ...s, ...shortcut } : s)),
    );
  };

  return (
    <Context value={{ addShortcut, removeShortcut, updateShortcut }}>
      <TooltipProvider>
        <div className="relative z-20 mx-auto flex justify-center gap-4 md:max-w-2xl lg:max-w-3xl xl:max-w-4xl">
          {shortcuts.map((shortcut) => (
            <Shortcut key={shortcut.id} shortcut={shortcut} />
          ))}
          <Shortcut />
        </div>
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
