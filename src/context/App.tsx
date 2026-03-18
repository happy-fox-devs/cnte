import { createContext, useContext, useState } from "react";

import defaultBackground from "@/assets/default-background.png";
import Options from "@/components/options";
import SearchEngine from "@/components/search/engine";
import Shortcuts from "./Shortcuts";

type Context = {
  setBackground: SetState<string>;
};

const Context = createContext<Context | undefined>(undefined);

export default function App() {
  const [background, setBackground] = useState<string>(defaultBackground);

  return (
    <Context value={{ setBackground }}>
      <div
        className="size-d-screen relative bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${background})` }}
      >
        <SearchEngine />
        <Shortcuts />
        <Options />
      </div>
    </Context>
  );
}

// eslint-disable-next-line react-refresh/only-export-components
export const useApp = () => {
  const context = useContext(Context);
  if (!context) throw new Error("useApp must be used within App");
  return context;
};
