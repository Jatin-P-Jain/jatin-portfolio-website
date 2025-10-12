// app/api/chat/route.ts
import { NextRequest, NextResponse } from "next/server";
import { GoogleGenAI, Type } from "@google/genai"; // Import Type for schema
import { CONTEXT_STRING } from "@/data/chatbot-context";
import { scheduleMeetingFunction } from "@/lib/gemini-tools";

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

    // Your existing link handling code...
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

    const tools = [
      {
        functionDeclarations: [scheduleMeetingFunction],
      },
    ];

    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents,
      config: {
        systemInstruction: system ?? CONTEXT_STRING,
        temperature: 0.1,
        tools: tools, // Add function calling capability
      },
    });

    // app/api/chat/route.ts - update the function call handling section

    if (response.functionCalls && response.functionCalls.length > 0) {
      const functionCall = response.functionCalls[0];

      if (functionCall.name === "schedule_meeting") {
        try {
          // Extract attendee details with a safe type cast and normalization
          type ScheduleArgs = {
            attendees?: string[] | string;
            attendee_name?: string;
            date?: string;
            time?: string;
            topic?: string;
            duration?: number;
          };
          const args = functionCall?.args as unknown as ScheduleArgs;
          const attendees = Array.isArray(args.attendees)
            ? args.attendees
            : typeof args.attendees === "string" && args.attendees.length
            ? [args.attendees]
            : [];
          const attendee_name = args.attendee_name ?? "there";
          const date = args.date ?? "";
          const time = args.time ?? "";
          const topic = args.topic ?? "Meeting";
          const duration = args.duration;
          console.log("Scheduling meeting with args:", {
            attendees,
            attendee_name,
            date,
            time,
            topic,
            duration,
          });

          // Call your calendar API
          const scheduleResponse = await fetch(
            `${req.nextUrl.origin}/api/schedule`,
            {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({
                attendees,
                date,
                time,
                topic: `${topic} - Meeting with ${attendee_name}`,
                duration,
              }),
            }
          );
          console.log("Schedule response status:", scheduleResponse);

          const scheduleResult = await scheduleResponse.json();
          console.log("Schedule result:", scheduleResult);

          if (scheduleResult.ok) {
            const successPrompt = `Successfully scheduled a meeting titled "${topic}" for ${date} at ${time} with attendee(s) ${attendees.join(
              ", "
            )}. Duration: ${duration} minutes.
Write a friendly confirmation message that varies each time, including a polite reminder for the attendee(s) to check their email and calendar invite. 
Mention the main attendee emails explicitly.`;
            const success = await ai.models.generateContent({
              model: "gemini-2.5-flash",
              contents: [{ role: "user", parts: [{ text: successPrompt }] }],
              config: {
                systemInstruction: system ?? CONTEXT_STRING,
                temperature: 0.7,
              },
            });
            const dynamicAnswer =
              success.text?.trim() ??
              `✅ Meeting scheduled successfully. Please check your email for the invite.`;

            return NextResponse.json({
              answer: dynamicAnswer,
              links: [],
              contact: null,
              meeting: {
                scheduled: true,
                htmlLink: scheduleResult.htmlLink,
                meetLink: scheduleResult.meetLink,
                eventId: scheduleResult.eventId,
              },
            });
          } else {
            console.log("Scheduling error:", scheduleResult.error);
            const failurePrompt = `Attempting to schedule a meeting for ${date} at ${time} failed with error: "${
              scheduleResult.error || "Unknown error"
            }". Please write a brief, friendly apology that varies each time, mention the error succinctly, and invite the user to reach out if needed.`;
            const apology = await ai.models.generateContent({
              model: "gemini-2.5-flash",
              contents: [{ role: "user", parts: [{ text: failurePrompt }] }],
              config: {
                systemInstruction: system ?? CONTEXT_STRING,
                temperature: 0.7,
              },
            });
            const dynamicAnswer =
              apology.text?.trim() ??
              `❌ Sorry, scheduling failed: ${scheduleResult.error}.`;
            return NextResponse.json({
              answer: dynamicAnswer,
              links: [],
              contact: {
                email: "jatinbittu13@gmail.com",
                phone: "+91 9636245681",
                linkedin: "https://www.linkedin.com/in/jatin-prakash-jain/",
              },
            });
          }
        } catch (error) {
          const failurePrompt = `Attempting to schedule a meeting failed with error: "${"Unknown error"}". Please write a brief, friendly apology that varies each time, mention the error succinctly, and invite the user to reach out if needed and do not include contact information in the message.`;
          const apology = await ai.models.generateContent({
            model: "gemini-2.5-flash",
            contents: [{ role: "user", parts: [{ text: failurePrompt }] }],
            config: {
              systemInstruction: system ?? CONTEXT_STRING,
              temperature: 0.7,
            },
          });
          const dynamicAnswer =
            apology.text?.trim() ?? `❌ Sorry, scheduling failed: ${error}.`;
          console.error("Error scheduling meeting:", error);
          return NextResponse.json({
            answer: dynamicAnswer,
            links: [],
            contact: {
              email: "jatinbittu13@gmail.com",
              phone: "+91 9636245681",
              linkedin: "https://www.linkedin.com/in/jatin-prakash-jain/",
            },
          });
        }
      }
    }

    // If no function call, handle as normal structured response
    // But first, we need to get regular structured output
    const structuredResponse = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents,
      config: {
        systemInstruction: system ?? CONTEXT_STRING,
        temperature: 0.1,
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
        thinkingConfig: { thinkingBudget: 0 },
      },
    });

    const data = JSON.parse(structuredResponse.text ?? "{}");
    return NextResponse.json(data);
  } catch (err: unknown) {
    console.log("Error in /api/chat:", err);
    return NextResponse.json(
      { error: (err as Error)?.message ?? "Unknown error" },
      { status: 500 }
    );
  }
}
