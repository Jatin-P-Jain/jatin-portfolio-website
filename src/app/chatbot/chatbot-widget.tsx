"use client";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { useEffect, useRef, useState } from "react";
import ChatbotAvatar from "@/assets/images/chatbot-avatar.png";
import { ChevronsLeftIcon, RefreshCwIcon, Send, X } from "lucide-react";
import clsx from "clsx";
import TextType from "@/components/TextType";
import { useBreakpoint } from "@/hooks/useBreakPoints";
import { Button } from "@/components/ui/button";
import { sampleSize } from "@/lib/utils";
import MeetingForm from "./components/meeting-form";
import { SUGGESTED_PROMPTS } from "@/data/suggested-prompts";
import { ChatMessage, Contact, LinkItem } from "../types/types";
import {
  extractProjectsFromMessage,
  getLeadSentence,
  mentionsResume,
} from "@/lib/chatbot-utils";
import { ResumeCTA } from "./components/resume-cta";
import { ProjectsBlock } from "./components/projects-block";
import { LinksBlock } from "./components/links-block";
import { ContactBlock } from "./components/contacts-block";
import { MeetingBlock } from "./components/meetings-block";
import QuickSuggestions from "./components/quick-suggestions";

export default function ChatBotWidget({}: { isMobile: boolean }) {
  const { isMobile } = useBreakpoint();
  const [open, setOpen] = useState(false);
  const [explored, setExplored] = useState(false);
  const [quickPrompts, setQuickPrompts] = useState<string[]>([]);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [showMeetingForm, setShowMeetingForm] = useState(false);
  const [meetingScheduling, setMeetingScheduling] = useState(false);
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

  useEffect(() => {
    const lastAssistant = [...messages]
      .reverse()
      .find((m) => m.role === "assistant");
    if (lastAssistant) {
      setShowMeetingForm(
        lastAssistant.content.includes("[collect-meeting-info]")
      );
    } else {
      setShowMeetingForm(false);
    }
  }, [messages]);

  async function sendMessage(
    e?: React.FormEvent,
    message?: string,
    from?: string
  ) {
    e?.preventDefault();
    const inputToUse = message ?? input;
    if (!inputToUse.trim() || loading) return;

    const nextMsgs: ChatMessage[] = [
      ...messages,
      { role: "user", content: inputToUse.trim() },
    ];
    from === "meeting-form" ? setMeetingScheduling(true) : setLoading(true);
    setMessages(nextMsgs);
    setInput("");

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
      const meeting: ChatMessage["meeting"] = data.meeting ?? null;

      setMessages([
        ...nextMsgs,
        { role: "assistant", content: answer, links, contact, meeting },
      ]);
      setQuickPrompts(sampleSize(SUGGESTED_PROMPTS, 4));
    } catch {
      setMessages([
        ...nextMsgs,
        { role: "assistant", content: "Network error." },
      ]);
    } finally {
      setLoading(false);
      setMeetingScheduling(false);
    }
  }
  return (
    <>
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
          className="hover:!bg-none cursor-pointer flex flex-col items-center gap-2 w-fit"
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
          !open && "!h-0 !w-0 border-0 !p-0 opacity-0 pointer-events-none",
          // Mobile: to the right of the 64px button + 8px gap => 72px
          // Desktop: original placement
          "fixed bottom-20 left-8 md:bottom-14 md:left-8 lg:left-16 lg:bottom-18",
          // Sizing
          "w-[85%] h-[75%] md:max-w-130 max-h-160",
          // Styling
          "border-2 bg-gray-100 dark:bg-neutral-900 rounded-lg shadow-2xl flex flex-col overflow-hidden z-[99999] transition-all duration-500 ease-in-out"
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
                  {leadText.replace(/\[collect-meeting-info\]/g, "").trim()}
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
                    <MeetingBlock meeting={m.meeting} />
                  </>
                )}
              </div>
            );
          })}
          {showMeetingForm && (
            <MeetingForm
              onSubmit={async (data) => {
                // Handle the form submission
                await sendMessage(
                  undefined,
                  `Schedule meeting with ${data.name} (${data.email}) for "${data.topic}" on ${data.date} at ${data.time}.`,
                  "meeting-form"
                );
              }}
              isSubmitting={meetingScheduling}
            />
          )}
          {loading && <div className="loader ml-2"></div>}
          {/* Quick suggestions */}
          <QuickSuggestions
            sendMessageHandler={sendMessage}
            quickPrompts={quickPrompts}
          />
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
