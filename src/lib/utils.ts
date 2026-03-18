import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const convertToId = (text: string) => {
  return text.toLowerCase().replace(/\s/g, "-").trim();
};
