// app/api/chat/route.ts
import { NextRequest, NextResponse } from "next/server";
import { GoogleGenAI, Type } from "@google/genai"; // Import Type for schema
import { CONTEXT_STRING } from "@/data/chatbot-context";

const ai = new GoogleGenAI({});

type Message = { role: "user" | "assistant" | "system"; content: string };

// Optional: small curated link list; replace with site-relative URLs
const linkCatalog = [
  {
    title: "Contact",
    url: "/#contact",
    tags: ["contact", "hire", "availability"],
  },
  { title: "Resume", url: "/resume", tags: ["resume", "cv"] },
  {
    title: "GitHub",
    url: "https://github.com/Jatin-P-Jain?tab=repositories",
    tags: ["github", "projects", "repos"],
  },
  {
    title: "LinkedIn",
    url: "https://www.linkedin.com/in/jatin-prakash-jain/",
    tags: ["linkedin", "profile"],
  },
];

function pickLinks(query: string, k = 3) {
  const q = (query || "").toLowerCase();
  const scored = linkCatalog.map((item) => {
    const score =
      (item.title.toLowerCase().includes(q) ? 2 : 0) +
      item.tags.reduce((s, t) => s + (q.includes(t.toLowerCase()) ? 1 : 0), 0);
    return { item, score };
  });
  return scored
    .filter((s) => s.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, k)
    .map((s) => s.item);
}

function toGeminiContents(messages: Message[]) {
  return messages
    .filter((m) => m.role !== "system")
    .map((m) => ({
      role: m.role === "assistant" ? "model" : "user",
      parts: [{ text: m.content }],
    }));
}

export async function POST(req: NextRequest) {
  try {
    const { messages = [], system } = await req.json();

    // Optional: pass a small “control” turn with approved links and rules
    const lastUser = [...messages]
      .reverse()
      .find((m: Message) => m.role === "user");
    const candidates = pickLinks(lastUser?.content ?? "", 3);
    const linkList =
      candidates.map((l) => `- ${l.title}: ${l.url}`).join("\n") ||
      "- (none this turn)";

    const contents = [
      ...toGeminiContents(messages),
      {
        role: "user",
        parts: [
          {
            text: `REFERENCE_LINKS (approved):
${linkList}

POLICY:
- Only include links from REFERENCE_LINKS; do not invent URLs.
- Use Markdown [Title](URL); at most 2 links unless explicitly asked.
- If no relevant link exists, say so briefly and continue without links.`,
          },
        ],
      },
    ];

    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents,
      config: {
        systemInstruction: system ?? CONTEXT_STRING,
        temperature: 0.1,
        // Force JSON so the UI can detect contact/links deterministically
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            answer: { type: Type.STRING },
            links: {
              type: Type.ARRAY,
              items: {
                type: Type.OBJECT,
                properties: {
                  title: { type: Type.STRING },
                  url: { type: Type.STRING },
                },
                required: ["title", "url"],
              },
            },
            contact: {
              type: Type.OBJECT,
              properties: {
                email: { type: Type.STRING },
                phone: { type: Type.STRING },
                linkedin: { type: Type.STRING },
                github: { type: Type.STRING },
              },
              nullable: true,
            },
          },
          required: ["answer"],
          propertyOrdering: ["answer", "links", "contact"],
        },
        // Optional: reduce latency by disabling “thinking” on 2.5 if desired
        thinkingConfig: { thinkingBudget: 0 },
      },
    });

    // response.text is JSON per responseMimeType config
    const data = JSON.parse(response.text ?? "{}");
    return NextResponse.json(data);
  } catch (err: unknown) {
    console.log("Error in /api/chat:", err);

    return NextResponse.json(
      { error: (err as Error)?.message ?? "Unknown error" },
      { status: 500 }
    );
  }
}
