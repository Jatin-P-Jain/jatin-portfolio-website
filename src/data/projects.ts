import { Project } from "@/app/types/types";

export const PROJECTS: Record<Project["key"], Project> = {
  megha: {
    key: "megha",
    title: "Megha Sales Corporation",
    about:
      "Enterprise PWA for an autoparts wholesaler managing 9–10 brands; digitizes cataloging and ordering with real-time flows.",
    summary:
      "Installable PWA • Role-based Admin/User • Google One Tap • WhatsApp order updates • Instant search/filter • Persistent login",
    tech: [
      { label: "Next.js 15", icon: "⨁" },
      { label: "React", icon: "⚛︎" },
      { label: "shadcn/ui", icon: "🧩" },
      { label: "Tailwind CSS", icon: "🎨" },
      { label: "Firebase", icon: "🔥" },
      { label: "One Tap", icon: "🎯" },
      { label: "WhatsApp API", icon: "💬" },
      { label: "Vercel", icon: "▲" },
    ],
    link: "https://meghasalescorporation.in",
  },
  hotHomes: {
    key: "hotHomes",
    title: "Hot Homes",
    about:
      "Learning project exploring Next.js + Firebase; catalogs homes with price, address, amenities, and role-based admin.",
    summary:
      "Favourites • Google Sign-In • Maps for property locations • Admin listings",
    tech: [
      { label: "Next.js", icon: "⨁" },
      { label: "React", icon: "⚛︎" },
      { label: "shadcn/ui", icon: "🧩" },
      { label: "Tailwind CSS", icon: "🎨" },
      { label: "Firebase", icon: "🔥" },
      { label: "Google Maps", icon: "🗺️" },
    ],
    link: "https://hot-homes.jatinprakash.online",
  },
};
