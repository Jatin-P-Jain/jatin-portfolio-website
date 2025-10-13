import { ChatMessage, Project } from "@/app/types/types";
import { LIVE_PROJECTS } from "@/data/live-projects";

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
    set.set("megha", LIVE_PROJECTS[0]);
  }
  if (
    content.includes("hot-homes.jatinprakash.online") ||
    links.some((u) => u.includes("hot-homes.jatinprakash.online"))
  ) {
    set.set("hotHomes", LIVE_PROJECTS[1]);
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

export function sampleSize<T>(arr: readonly T[], n: number): T[] {
  const a = arr.slice();
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a.slice(0, Math.min(n, a.length));
}

// Add this utility function at the top of your file or in your utils
export function getIntelligentPrompts(
  allPrompts: string[],
  recentUserMessages: string[],
  count: number = 4
): string[] {
  // Get last 2 user messages for comparison
  const lastTwoMessages = recentUserMessages
    .slice(-2)
    .map((msg) => msg.toLowerCase());

  // Create a similarity check function
  const isSimilar = (prompt: string, message: string): boolean => {
    const promptLower = prompt.toLowerCase();
    const messageLower = message.toLowerCase();

    // Check for exact matches or very similar phrases
    if (
      promptLower.includes(messageLower) ||
      messageLower.includes(promptLower)
    ) {
      return true;
    }

    // Check for keyword overlap (intent-based filtering)
    const promptKeywords = promptLower
      .split(/\s+/)
      .filter((word) => word.length > 3);
    const messageKeywords = messageLower
      .split(/\s+/)
      .filter((word) => word.length > 3);

    const overlap = promptKeywords.filter((word) =>
      messageKeywords.includes(word)
    );
    return overlap.length > 1; // Similar if 2+ keywords overlap
  };

  // Filter out prompts that are similar to recent messages
  const filteredPrompts = allPrompts.filter((prompt) => {
    return !lastTwoMessages.some((message) => isSimilar(prompt, message));
  });

  // If we don't have enough unique prompts, fall back to random selection
  const promptsToUse =
    filteredPrompts.length >= count ? filteredPrompts : allPrompts;

  // Randomly select the required count
  return sampleSize(promptsToUse, count);
}
