type LinkItem = { title: string; url: string };
type Contact = {
  email: string;
  phone: string;
  linkedin?: string;
  github?: string;
} | null;

type ChatMessage = {
  role: "user" | "assistant";
  content: string;
  links?: LinkItem[];
  contact?: Contact;
  meeting?: {
    scheduled: boolean;
    htmlLink?: string;
    meetLink?: string;
    eventId?: string;
  };
};

// NEW: types and registry
type Project = {
  key: "megha" | "hotHomes";
  title: string;
  about: string;
  summary: string; // 1–2 line key features summary
  tech: { label: string; icon?: string }[];
  link: string;
}; 

export type { LinkItem, Contact, ChatMessage, Project };