import type { Dispatch, SetStateAction } from "react";

declare global {
  type SetState<T> = Dispatch<SetStateAction<T>>;

  type Shortcut = {
    name: string;
    url: string;
  };
}
