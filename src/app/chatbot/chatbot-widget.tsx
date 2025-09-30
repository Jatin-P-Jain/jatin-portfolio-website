// app/components/ChatWidget.tsx
"use client";

import { Avatar, AvatarImage } from "@/components/ui/avatar";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import ChatbotAvatar from "@/assets/images/chatbot-avatar.png";
import { ChevronsLeftIcon, Send, X } from "lucide-react";
import clsx from "clsx";
import TextType from "@/components/TextType";
import { useBreakpoint } from "@/hooks/useBreakPoints";
// If not used elsewhere, you can remove this import
// import { useBreakpoint } from "@/hooks/useBreakPoints";

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

export default function ChatBotWidget({
  collapsed = false,
}: {
  collapsed?: boolean;
  isMobile: boolean;
}) {
  const { isMobile } = useBreakpoint();
  const [open, setOpen] = useState(false);
  const [explored, setExplored] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const listRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (open && listRef.current) {
      listRef.current.scrollTop = listRef.current.scrollHeight;
    }
  }, [messages, open]);

  async function sendMessage(e: React.FormEvent) {
    e.preventDefault();
    if (!input.trim() || loading) return;

    const nextMsgs: ChatMessage[] = [
      ...messages,
      { role: "user", content: input.trim() },
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
    } catch {
      setMessages([
        ...nextMsgs,
        { role: "assistant", content: "Network error." },
      ]);
    } finally {
      setLoading(false);
    }
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
                  className="text-blue-600 hover:underline"
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
      <div className="mt-2 rounded-md border border-neutral-200 dark:border-neutral-800 p-3 text-sm space-y-1">
        <div className="font-medium">Contact</div>
        {contact.email && (
          <div>
            Email:{" "}
            <a className="text-blue-600 hover:underline" href={emailHref}>
              {contact.email}
            </a>
          </div>
        )}
        {contact.phone && (
          <div className="flex gap-2">
            <span>
              Phone:{" "}
              <a className="text-blue-600 hover:underline" href={telHref}>
                {contact.phone}
              </a>
            </span>
            <span>|</span>
            <a
              className="text-blue-600 hover:underline"
              href={waHref}
              target="_blank"
              rel="noopener noreferrer"
            >
              WhatsApp
            </a>
          </div>
        )}
        {contact.linkedin && <div>LinkedIn: {contact.linkedin}</div>}
        {contact.github && <div>GitHub: {contact.github}</div>}
      </div>
    );
  }

  return (
    <>
      {/* Button container: mobile bottom-0 left-0; desktop keeps prior offsets */}
      <div className="fixed bottom-6 left-8 md:bottom-4 md:left-8 lg:left-16 lg:bottom-8 z-[99999] flex md:flex-row items-center gap-1 md:gap-2 ">
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
            <X className="p-0.5 bg-gray-default h-6 w-6 rounded-full text-red-700 border-red-600 border-1" />
          ) : (
            <Avatar className="h-14 w-14 md:h-16 md:w-16 ring-1 ring-sky-700 dark:ring-sky-100 shadow-2xl">
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
          "fixed bottom-14 left-8 md:bottom-12 md:left-8 lg:left-16 lg:bottom-16",
          // Sizing
          "w-[80%] max-w-100 sm:w-96 h-120 max-h-150",
          // Styling
          "bg-white dark:bg-neutral-900 border rounded-lg shadow-2xl flex flex-col overflow-hidden z-[99999] transition-all duration-300 ease-in-out"
        )}
      >
        <div className="px-4 py-1 border-b border-neutral-200 dark:border-neutral-800 font-medium">
          <div className="flex gap-2 flex-row items-center">
            <Avatar className="size-12">
              <AvatarImage src={ChatbotAvatar.src} className="flex" />
            </Avatar>
            <span className="text-sky-700 dark:text-sky-200 font-semibold">
              Jatin’s Assistant
            </span>
          </div>
        </div>

        <div
          ref={listRef}
          className="flex-1 overflow-y-auto px-4 py-3 space-y-3"
        >
          {messages.length === 0 && (
            <div className="text-sm text-neutral-500">
              Ask about skills, projects, or availability.
            </div>
          )}

          {messages.map((m, i) => (
            <div
              key={i}
              className={`text-sm whitespace-pre-wrap ${
                m.role === "user" ? "text-right" : ""
              }`}
            >
              <div
                className={`inline-block px-3 py-2 rounded-lg ${
                  m.role === "user"
                    ? "bg-blue-600 text-white"
                    : "bg-neutral-100 dark:bg-neutral-800"
                }`}
              >
                {m.content}
              </div>

              {m.role === "assistant" && (
                <>
                  <LinksBlock links={m.links} />
                  <ContactBlock contact={m.contact} />
                </>
              )}
            </div>
          ))}

          {loading && <div className="text-sm text-neutral-500">Thinking…</div>}
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
            className="px-3 py-2 rounded-md bg-sky-700 text-white text-sm disabled:opacity-50"
          >
            Send <Send className="inline-block ml-1 h-3 w-3" />
          </button>
        </form>
        <div className="px-3 py-2 text-[10px] text-left text-muted-foreground">
          Powered by Gemini2.5 Flash
        </div>
      </div>
    </>
  );
}
