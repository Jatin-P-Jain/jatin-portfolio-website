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

type Tech = {
  logo_url: string;
  label: string;
};

type Project = {
  name: string;
  projectLogo: string;
  description: string;
  highlights: string[];
  techStack?: Tech[];
  demoVideo: string;
  link: string;
};

type Meeting = {
  ok: boolean;
  htmlLink: string;
  meetLink: string;
  eventId: string;
};

export type { LinkItem, Contact, ChatMessage, Project, Meeting };
