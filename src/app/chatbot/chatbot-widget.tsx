// app/components/ChatWidget.tsx
"use client";

import { Avatar, AvatarImage } from "@/components/ui/avatar";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import ChatbotAvatar from "@/assets/images/chatbot-avatar.png";
import {
  ChevronDownIcon,
  ChevronsLeftIcon,
  ChevronUpIcon,
  DownloadIcon,
  RefreshCwIcon,
  Send,
  X,
} from "lucide-react";
import clsx from "clsx";
import TextType from "@/components/TextType";
import { useBreakpoint } from "@/hooks/useBreakPoints";
import Image from "next/image";
import Whatsapp from "@/icons/icon-whatsapp.svg";
import LinkedIn from "@/icons/linkedin.svg";

// NEW: add near the top imports
import { ExternalLink } from "lucide-react"; // for Explore link icon
import { Button } from "@/components/ui/button";
import { sampleSize } from "@/lib/utils";
// If not used elsewhere, you can remove this import
// import { useBreakpoint } from "@/hooks/useBreakPoints";

// Suggested prompts (top-level inside component)
const SUGGESTED_PROMPTS = [
  "Show live projects",
  "What’s your tech stack?",
  "Are you available for new projects?",
  "Share contact details",
  "Show live projects with links.",
  "List core skills with ratings.",
  "What’s your experience level?",
  "What technologies do you specialize in?",
  "What kind of projects have you worked on?",
  "How can I contact you for work?",
  "What are your preferred working hours?",
  "What is your expected salary range?",
  "Do you have a resume I can view?",
  "Tell me about your recent work experience.",
  "What are your strongest technical skills?",
  "Can you provide links to your portfolio or GitHub?",
];

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

const PROJECTS: Record<Project["key"], Project> = {
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

const GITHUB_URL = "https://github.com/Jatin-P-Jain?tab=repositories";
const RESUME_URL =
  "https://drive.google.com/file/d/15d_m4uBGsdNrOfXA0oRDXsTVbHrKjyux/view?usp=sharing";

// 1) Detect if the assistant is discussing resume/CV;
function mentionsResume(msg: ChatMessage): boolean {
  const t = (msg.content || "").toLowerCase();
  if (/(resume|curriculum vitae|cv)\b/.test(t)) return true;
  const links = msg.links || [];
  return links.some((l) => /resume|cv|\.pdf/i.test(`${l.title} ${l.url}`));
}

// 2) CTA button
function ResumeCTA() {
  return (
    <a
      href={RESUME_URL}
      download
      className="mt-3 inline-flex items-center justify-center gap-2 rounded-md bg-sky-700 px-3 py-2 text-xs font-semibold text-white hover:bg-sky-800 focus-visible:outline-2 focus-visible:outline-sky-400"
      aria-label="Download Resume"
      target="_blank"
    >
      Download Resume
      <DownloadIcon className="w-4 h-4 ml-1" />
    </a>
  );
}

// 2) Simple project extraction (by URL match from content or links)
function extractProjectsFromMessage(msg: ChatMessage): Project[] {
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
function getLeadSentence(text: string): string {
  if (!text) return "";
  // Stop at first period or newline; trim to keep it tight
  const stop = text.search(/[.\n]/);
  return stop > -1
    ? text.slice(0, stop + (text[stop] === "." ? 1 : 0)).trim()
    : text.trim();
}

// 4) Card UI (plain Tailwind; replace with shadcn Card if preferred)
function ProjectCard({ p }: { p: Project }) {
  return (
    <div className="rounded-lg border-1 border-gray-200 dark:border-gray-800 bg-gray-100 dark:bg-gray-700 shadow-sm hover:shadow-md transition-shadow duration-300 ease-in-out">
      <div className="p-4 space-y-2">
        <div className="text-sm font-semibold text-gray-900 dark:text-gray-100">
          {p.title}
        </div>
        <p className="text-xs text-gray-700 dark:text-gray-300">{p.about}</p>
        <p className="text-xs text-gray-700 dark:text-gray-300">{p.summary}</p>

        <div className="flex flex-wrap gap-1.5 pt-1">
          {p.tech.map((t, i) => (
            <span
              key={i}
              className="inline-flex items-center gap-1 rounded-lg border border-gray-300 px-2 py-0.5 text-[12px] text-gray-800 dark:text-gray-300"
            >
              <span aria-hidden>{t.icon ?? "•"}</span>
              <span>{t.label}</span>
            </span>
          ))}
        </div>
      </div>
      <div className="px-4 pb-3">
        <a
          href={p.link}
          target="_blank"
          rel="noopener noreferrer"
          className="flex justify-center items-center gap-1 text-xs font-semibold text-sky-700 hover:underline border-1 w-full px-4 py-1 rounded-md focus-visible:outline-2 focus-visible:outline-sky-400 border-sky-700"
          aria-label={`Explore ${p.title}`}
        >
          Explore Now <ExternalLink className="h-3 w-3" />
        </a>
      </div>
    </div>
  );
}

// 5) Projects block with GitHub CTA
function ProjectsBlock({ msg }: { msg: ChatMessage }) {
  const projects = extractProjectsFromMessage(msg);
  if (projects.length === 0) return null;

  return (
    <div className="mt-3 space-y-3">
      <div className="grid grid-cols-1 gap-3">
        {projects.map((p) => (
          <ProjectCard key={p.key} p={p} />
        ))}
      </div>

      {/* Single, consistent GitHub CTA under the cards */}
      <div className="text-xs text-gray-700">
        See more work on{" "}
        <a
          href={GITHUB_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="text-sky-700 dark:text-sky-400 hover:underline font-semibold"
        >
          GitHub
        </a>
        .
      </div>
    </div>
  );
}

function LinksBlock({ links }: { links?: LinkItem[] }) {
  if (!links || links.length === 0) return null;
  return (
    <ul className="mt-2 list-disc pl-5 text-sm">
      {links.map((l, i) => {
        const isInternal = l.url.startsWith("/");
        return (
          <li key={i}>
            {isInternal ? (
              <Link href={l.url} className="text-blue-600 hover:underline">
                {l.title}
              </Link>
            ) : (
              <a
                href={l.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sky-700 hover:underline"
              >
                {l.title}
              </a>
            )}
          </li>
        );
      })}
    </ul>
  );
}

function ContactBlock({ contact }: { contact?: Contact }) {
  if (!contact) return null;
  const emailHref = `mailto:${contact.email}`;
  const telHref = `tel:${(contact.phone || "").replace(/\s/g, "")}`;
  const waHref = `https://wa.me/${(contact.phone || "").replace(/\D/g, "")}`;
  return (
    <div className="mt-2 rounded-xl border-1 bg-gray-100 dark:bg-gray-700 p-4 shadow-md hover:shadow-lg transition-shadow space-y-2 text-xs text-gray-700 dark:text-gray-300">
      <div className="font-semibold flex w-full justify-center items-center text-gray-900 dark:text-gray-100 text-base tracking-tight">
        📬 Contact
      </div>

      {contact?.email && (
        <div className="flex items-center gap-2">
          <span className="shrink-0">✉️ Email</span>
          <a
            className="text-sky-700 hover:underline font-semibold text-sm  focus-visible:outline-2 focus-visible:outline-sky-400 rounded"
            href={emailHref}
          >
            {contact.email}
          </a>
        </div>
      )}

      {contact?.phone && (
        <div className="flex items-center gap-2">
          <span className="shrink-0">📞 Phone :</span>
          <a
            className="text-sky-700 hover:underline font-semibold text-sm  focus-visible:outline-2 focus-visible:outline-sky-400 rounded"
            href={telHref}
          >
            {contact.phone}
          </a>
        </div>
      )}

      {contact?.linkedin && (
        <div className="flex items-center gap-2">
          <span className="shrink-0 flex items-center gap-1">
            <Image src={LinkedIn} alt="LinkedIn" width={20} height={20} />{" "}
            LinkedIn :
          </span>
          <a
            className="text-sky-700 hover:underline font-semibold inline-flex items-center gap-1 text-sm focus-visible:outline-2 focus-visible:outline-sky-400 rounded"
            href={contact.linkedin}
            target="_blank"
            rel="noopener noreferrer"
          >
            Jatin Prakash Jain <span aria-hidden>↗</span>
          </a>
        </div>
      )}
      <a
        className="text-green-700 hover:underline font-semibold flex items-center gap-1 text-sm  focus-visible:outline-2 focus-visible:outline-emerald-400 rounded"
        href={waHref}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Open WhatsApp chat"
      >
        <span className="text-xs text-muted-foreground">
          Let&apos;s Chat on{" "}
        </span>
        <Image src={Whatsapp} alt="WhatsApp" width={20} height={20} />
        <span className="inline-flex items-center gap-1">
          WhatsApp <span aria-hidden>↗</span>
        </span>
      </a>
    </div>
  );
}

export default function ChatBotWidget({}: { isMobile: boolean }) {
  const { isMobile } = useBreakpoint();
  const [open, setOpen] = useState(false);
  const [explored, setExplored] = useState(false);
  const [showQuickPrompts, setShowQuickPrompts] = useState(true);
  const [quickPrompts, setQuickPrompts] = useState<string[]>([]);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const listRef = useRef<HTMLDivElement>(null);
  const prevOpenRef = useRef(false);
  useEffect(() => {
    if (open && !prevOpenRef.current && listRef.current) {
      // start at the top
      listRef.current.scrollTop = 10;
    }
    prevOpenRef.current = open;
  }, [open]);

  useEffect(() => {
    if (open) setQuickPrompts(sampleSize(SUGGESTED_PROMPTS, 4));
  }, [open]);

  // useEffect(() => {
  //   if (open && listRef.current) {
  //     listRef.current.scrollTop = listRef.current.scrollHeight;
  //   }
  // }, [messages, open]);

  async function sendMessage(e?: React.FormEvent, message?: string) {
    e?.preventDefault();
    const inputToUse = message ?? input;
    if (!inputToUse.trim() || loading) return;

    const nextMsgs: ChatMessage[] = [
      ...messages,
      { role: "user", content: inputToUse.trim() },
    ];
    setMessages(nextMsgs);
    setInput("");
    setLoading(true);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: nextMsgs }),
      });
      const data = await res.json();

      const answer = data.answer ?? data.text ?? "Sorry, something went wrong.";
      const links: LinkItem[] | undefined = Array.isArray(data.links)
        ? data.links
        : undefined;
      const contact: Contact = data.contact ?? null;

      setMessages([
        ...nextMsgs,
        { role: "assistant", content: answer, links, contact },
      ]);
      setQuickPrompts(sampleSize(SUGGESTED_PROMPTS, 4));
    } catch {
      setMessages([
        ...nextMsgs,
        { role: "assistant", content: "Network error." },
      ]);
    } finally {
      setLoading(false);
    }
  }
  return (
    <>
      {/* Button container: mobile bottom-0 left-0; desktop keeps prior offsets */}
      <div className="fixed bottom-8 left-8 md:bottom-4 md:left-8 lg:left-16 lg:bottom-8 z-[10] flex md:flex-row items-center gap-1 md:gap-2 ">
        <button
          type="button"
          aria-label={open ? "Close chat" : "Open chat"}
          aria-expanded={open}
          aria-controls="chat-panel"
          onClick={() => {
            setOpen((prev) => !prev);
            setExplored(true);
          }}
          className="hover:bg-none cursor-pointer flex flex-col items-center gap-2"
        >
          {open ? (
            <div className="flex items-center gap-1 py-2 bg-gray-default dark:bg-gray-700 rounded-full text-orange-700 border-orange-600 border-1 text-xs px-2">
              <X className=" h-4 w-4 " />
              Close
            </div>
          ) : (
            <Avatar className="h-14 w-14 md:h-16 md:w-16 ring-1 ring-sky-700 dark:ring-sky-100 shadow-2xl bg-white">
              <AvatarImage
                src={ChatbotAvatar.src}
                alt="Owner avatar"
                className="flex"
              />
            </Avatar>
          )}
        </button>

        {/* Chat-like label (only when closed) */}
        {!open && (
          <>
            <ChevronsLeftIcon className="size-3 text-muted-foreground" />
            <TextType
              loop={true}
              text={
                !explored
                  ? isMobile
                    ? [
                        "Meet my assistant!",
                        "See what it can do.",
                        "Explore projects with help.",
                        "Get quick answers.",
                        "Here to assist you.",
                      ]
                    : [
                        "Meet my assistant! See what it can do.",
                        "Explore projects with help.",
                        "Get quick answers.",
                        "Here to assist you.",
                      ]
                  : [
                      "Anything more?",
                      "Still here to help.",
                      "Ask me!",
                      "Continue Chatting.",
                    ]
              }
              typingSpeed={150}
              pauseDuration={1500}
              showCursor={true}
              cursorCharacter="|"
              textColors={["text-sky-700"]}
              className={clsx(
                open ? "hidden" : "block",
                "!text-xs transition-opacity duration-300 ease-in-out select-none whitespace-nowrap rounded-2xl bg-gray-100 dark:bg-gray-900 px-4 py-2 text-[14px] text-shadow-xl font-semibold !text-sky-700 shadow-lg border-1"
              )}
            />
          </>
        )}
      </div>

      {/* Chat panel: mobile sits to the right of the button; desktop stays as before */}
      <div
        id="chat-panel"
        className={clsx(
          !open && "!h-0 border-0 !p-0 opacity-0 pointer-events-none",
          // Mobile: to the right of the 64px button + 8px gap => 72px
          // Desktop: original placement
          "fixed bottom-20 left-8 md:bottom-14 md:left-8 lg:left-16 lg:bottom-18",
          // Sizing
          "w-[80%] md:max-w-120 min-h-130 md:min-h-150 max-h-160",
          // Styling
          "border-2 bg-gray-100 dark:bg-neutral-900 rounded-lg shadow-2xl flex flex-col overflow-hidden z-[99999] transition-all duration-300 ease-in-out"
        )}
      >
        <div className="px-4 py-1 border-b border-neutral-200 dark:border-neutral-800 font-medium flex justify-between items-center">
          <div className="flex gap-2 flex-row items-center">
            <Avatar className="size-12">
              <AvatarImage src={ChatbotAvatar.src} className="flex" />
            </Avatar>
            <span className="text-sky-700 dark:text-sky-500 font-semibold">
              Jatin’s Assistant
            </span>
          </div>
          <Button
            className="text-xs text-gray-700"
            variant={"outline"}
            size={"sm"}
            onClick={() => {
              setMessages([]);
              setInput("");
            }}
          >
            <RefreshCwIcon className="size-4 md:mr-1" />
            {isMobile ? "" : "Refresh Chat"}
          </Button>
        </div>

        <div
          ref={listRef}
          className="flex-1 overflow-y-auto overflow-anchor-none px-4 py-3 space-y-3"
        >
          <TextType
            text={[
              "Hello! 😎 This is Jatin’s Assistant. Quick answers on skills, projects, and availability.",
              "Try prompts below or ask anything about my work experience, skills, or projects.",
            ]}
            loop={true}
            typingSpeed={200}
            pauseDuration={1500}
            showCursor={true}
            cursorCharacter="_"
            // textColors={["!text-sky-700/80,text-sky-300"]}
            className="!text-sky-700/80 dark:!text-sky-400/80 font-medium text-xs"
          />

          {messages.map((m, i) => {
            const isUser = m.role === "user";
            const projectsForMsg =
              m.role === "assistant" ? extractProjectsFromMessage(m) : [];
            const showProjects = projectsForMsg.length > 0;

            // Compute lead-only text for assistant when projects are present
            const leadText =
              m.role === "assistant" && showProjects
                ? getLeadSentence(m.content)
                : m.content;

            return (
              <div
                key={i}
                className={`text-sm whitespace-pre-wrap ${
                  isUser ? "text-right" : ""
                }`}
              >
                {/* Bubble: user as-is; assistant shows lead only if projects are present */}
                <div
                  className={`inline-block px-3 py-2 rounded-lg md:max-w-[80%] ${
                    isUser
                      ? "bg-sky-700 text-white"
                      : "bg-gray-200/60 text-gray-700"
                  }`}
                >
                  {leadText}
                </div>

                {/* Assistant extras */}
                {m.role === "assistant" && (
                  <>
                    {mentionsResume(m) && <ResumeCTA />}
                    {/* Render project cards + one GitHub CTA if projects detected */}
                    {showProjects && <ProjectsBlock msg={m} />}

                    {/* If there are non-project links, you can still show them below */}
                    {!showProjects && !mentionsResume(m) && (
                      <LinksBlock links={m.links} />
                    )}

                    <ContactBlock contact={m.contact} />
                  </>
                )}
              </div>
            );
          })}
          {loading && <div className="loader ml-2"></div>}
          {/* Quick suggestions */}
          <div className="flex flex-col gap-4 px-4">
            <div className="flex flex-row items-center justify-center w-full gap-4">
              {/* <div className="flex h-0.5 w-full bg-gray-200 " /> */}
              <div className="text-[10px] text-gray-400 flex justify-center items-center whitespace-nowrap">
                Quick Suggestions
              </div>
              <div className="flex h-0.5 w-full bg-gray-200" />
              <div
                className="flex"
                onClick={() => setShowQuickPrompts((v) => !v)}
              >
                {!showQuickPrompts ? (
                  <ChevronDownIcon className="h-4 w-4 text-gray-400" />
                ) : (
                  <ChevronUpIcon className="h-4 w-4 text-gray-400" />
                )}
              </div>
            </div>
            {showQuickPrompts && (
              <div className="flex flex-wrap gap-2 justify-end">
                {quickPrompts.map((p) => (
                  <Button
                    variant={"outline"}
                    key={p}
                    onClick={() => sendMessage(undefined, p)}
                    className="rounded-full border-1 px-2 md:px-3 text-[10px] md:text-xs transition border-sky-700 text-sky-700 dark:text-sky-400 hover:bg-sky-700 hover:text-white focus-visible:outline-2 focus-visible:outline-sky-400"
                    aria-label={`Ask: ${p}`}
                  >
                    {p}
                  </Button>
                ))}
              </div>
            )}
          </div>
        </div>

        <form
          onSubmit={sendMessage}
          className="p-3 pb-0 border-t border-neutral-200 dark:border-neutral-800 flex gap-2"
        >
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Write your query here..."
            className="flex-1 px-3 py-2 rounded-md border border-neutral-300 dark:border-neutral-700 bg-white dark:bg-neutral-900 text-sm"
          />
          <button
            type="submit"
            disabled={loading}
            className="p-3 rounded-full bg-sky-700 text-white text-sm disabled:opacity-50 flex justify-center items-center"
          >
            <Send className="h-4 w-4" />
          </button>
        </form>
        <div className="px-3 py-2 text-[10px] text-left text-muted-foreground">
          Powered⚡️ by Gemini2.5 Flash
        </div>
      </div>
    </>
  );
}
