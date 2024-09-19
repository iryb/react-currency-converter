import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function roundNumber(num: number) {
  return +num.toFixed(2);
}

export function getExchangePrice(num: number) {
  return roundNumber(1 / num);
}
