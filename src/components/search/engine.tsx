import { cn } from "@/lib/utils";
import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";
import { useLocalStorage } from "usehooks-ts";

type Engine = {
  id: string;
  name: string;
  icon: string;
  action: string;
};

const engines: Engine[] = [
  {
    id: "google",
    name: "Google",
    icon: "https://www.google.com/favicon.ico",
    action: "https://www.google.com/search?q=",
  },
  {
    id: "bing",
    name: "Bing",
    icon: "https://www.bing.com/favicon.ico",
    action: "https://www.bing.com/search?q=",
  },
  {
    id: "duckduckgo",
    name: "DuckDuckGo",
    icon: "https://duckduckgo.com/favicon.ico",
    action: "https://duckduckgo.com/?q=",
  },
  {
    id: "youtube",
    name: "YouTube",
    icon: "https://www.youtube.com/favicon.ico",
    action: "https://www.youtube.com/results?search_query=",
  },
];

export default function SearchEngine() {
  const [open, setOpen] = useState(false);
  const [engine, setEngine] = useLocalStorage<Engine>(
    "search-engine",
    engines[0],
  );
  const [query, setQuery] = useState("");

  const handleSubmit = (event: React.SubmitEvent<HTMLFormElement>) => {
    event.preventDefault();

    window.location.href = `${engine.action}${query}`;
  };

  return (
    <div className="relative z-10 flex justify-center p-6 pt-12">
      <div className="bg-surface border-border focus-within:border-accent relative flex w-full max-w-[620px] items-center gap-0 rounded-full border p-2 shadow-md transition-all focus-within:shadow">
        <button
          className="relative flex shrink-0 cursor-pointer items-center gap-2 rounded-md bg-none px-2.5 py-2 text-neutral-600 transition-all hover:bg-white/10"
          type="button"
          title="Change search engine"
          onClick={() => setOpen(!open)}
        >
          <img
            className="h-5 w-5 rounded"
            src={engine.icon}
            alt={engine.name}
          />
          <svg
            className={cn("-rotate-90 transition-all", open && "rotate-0")}
            viewBox="0 0 10 6"
            width="10"
            height="6"
          >
            <polyline
              points="1,1 5,5 9,1"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            ></polyline>
          </svg>
        </button>
        <AnimatePresence>
          {open && (
            <motion.ul
              className="absolute top-[calc(100%+8px)] left-2 z-200 min-w-44 rounded-md border-white/10 bg-[rgba(30,30,38,0.95)] p-2 shadow-lg backdrop-blur-sm [&>li]:hover:bg-white/5 [&>li.active]:bg-[rgba(110,231,183,0.15)] [&>li.active_span]:text-[#6ee7b7]"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.1, ease: "easeInOut" }}
            >
              {engines.map((_engine) => (
                <li
                  key={_engine.id}
                  data-id={_engine.id}
                  className={cn(
                    "flex cursor-pointer items-center gap-2 rounded-sm px-3 py-2 text-sm text-neutral-600 transition-colors",
                    engine.id === _engine.id && "active",
                  )}
                  onClick={() => {
                    setEngine(_engine);
                    setOpen(false);
                  }}
                >
                  <img
                    src={_engine.icon}
                    alt={_engine.name}
                    className="h-4 w-4 rounded"
                  />
                  <span className="text-white">{_engine.name}</span>
                </li>
              ))}
            </motion.ul>
          )}
        </AnimatePresence>
        <form onSubmit={handleSubmit} className="w-0 grow">
          <input
            id="search-input"
            type="text"
            placeholder={`Search with ${engine.name}...`}
            autoComplete="off"
            spellCheck="false"
            className="w-full overflow-hidden border-none bg-none px-3 py-2 text-[15px] text-ellipsis text-neutral-200 outline-none"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
        </form>
      </div>
    </div>
  );
}
