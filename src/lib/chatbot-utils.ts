import { ChatMessage, Project } from "@/app/types/types";
import { PROJECTS } from "@/data/projects";

// 1) Detect if the assistant is discussing resume/CV;
export function mentionsResume(msg: ChatMessage): boolean {
  const t = (msg.content || "").toLowerCase();
  if (/(resume|curriculum vitae|cv)\b/.test(t)) return true;
  const links = msg.links || [];
  return links.some((l) => /resume|cv|\.pdf/i.test(`${l.title} ${l.url}`));
}

// 2) Simple project extraction (by URL match from content or links)
export function extractProjectsFromMessage(msg: ChatMessage): Project[] {
  const set = new Map<string, Project>();
  const content = (msg.content || "").toLowerCase();
  const links = (msg.links || []).map((l) => l.url.toLowerCase());

  if (
    content.includes("meghasalescorporation.in") ||
    links.some((u) => u.includes("meghasalescorporation.in"))
  ) {
    set.set("megha", PROJECTS.megha);
  }
  if (
    content.includes("hot-homes.jatinprakash.online") ||
    links.some((u) => u.includes("hot-homes.jatinprakash.online"))
  ) {
    set.set("hotHomes", PROJECTS.hotHomes);
  }
  return [...set.values()];
}

// 3) Lead sentence extractor: first sentence/line only
export function getLeadSentence(text: string): string {
  if (!text) return "";
  // Stop at first period or newline; trim to keep it tight
  const stop = text.search(/[.\n]/);
  return stop > -1
    ? text.slice(0, stop + (text[stop] === "." ? 1 : 0)).trim()
    : text.trim();
}

export const formatDuration = (minutes: number): string => {
  if (minutes === 60) return "1 hour";
  if (minutes < 60) return `${minutes} mins`;
  return `${minutes} mins`;
};
