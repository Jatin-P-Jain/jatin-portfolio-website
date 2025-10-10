import { Type } from "@google/genai";

// lib/gemini-tools.ts
export const scheduleMeetingFunction = {
  name: "schedule_meeting",
  description:
    "Schedule a meeting with Jatin after collecting attendee details",
  parameters: {
    type: Type.OBJECT,
    properties: {
      attendees: {
        type: Type.ARRAY,
        items: { type: Type.STRING },
        description: "Array of attendee email addresses",
      },
      attendee_name: {
        type: Type.STRING,
        description: "Name of the person requesting the meeting",
      },
      date: {
        type: Type.STRING,
        description:
          "Meeting date, e.g. 'today', 'tomorrow', 'next Monday', or any natural date or a specific date in any date format",
      },
      time: {
        type: Type.STRING,
        description:
          "Meeting time, e.g. '10 am', '8pm', or any natural time expression or a specific time in any time format",
      },
      topic: {
        type: Type.STRING,
        description: "Meeting topic or agenda",
      },
    },
    required: ["attendees", "attendee_name", "date", "time", "topic"],
  },
};
