import { SocialAuth } from "@/services/types";
import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
export function getSocialConnectLink(con: SocialAuth) {
  if (con.platform.toLowerCase() === "github")
    return `https://github.com/${con.handle}`;
  if (con.platform.toLowerCase() === "figma")
    return `https://figma.com/@${con.handle}`;
  return "";
}