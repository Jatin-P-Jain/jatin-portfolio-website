import { NextRequest, NextResponse } from "next/server";
import { google } from "googleapis";
import * as chrono from "chrono-node";

export async function POST(req: NextRequest) {
  const { attendees, date, time, topic, duration } = await req.json();
  console.log("Received scheduling request:", {
    attendees,
    date,
    time,
    topic,
    duration,
  });

  if (!attendees || !date || !time || !topic) {
    return NextResponse.json(
      { ok: false, error: "Missing fields" },
      { status: 400 }
    );
  }

  // Parse date and time using chrono
  const datetimeString = `${date} ${time}`;
  const parsedDate = chrono.parseDate(datetimeString, new Date(), {
    forwardDate: true,
  });

  if (!parsedDate) {
    return NextResponse.json(
      { ok: false, error: "Could not parse date/time" },
      { status: 400 }
    );
  }

  // Calculate end time - using duration
  const endDate = new Date(parsedDate.getTime() + duration * 60 * 1000);

  // Format in ISO with timezone offset
  const timezoneOffset = "+05:30";
  const toISOLocalString = (d: Date) => {
    const pad = (n: number) => n.toString().padStart(2, "0");
    return (
      d.getFullYear() +
      "-" +
      pad(d.getMonth() + 1) +
      "-" +
      pad(d.getDate()) +
      "T" +
      pad(d.getHours()) +
      ":" +
      pad(d.getMinutes()) +
      ":" +
      pad(d.getSeconds()) +
      timezoneOffset
    );
  };

  const startISO = toISOLocalString(parsedDate);
  const endISO = toISOLocalString(endDate);

  // Build OAuth2Client and Google Calendar client
  const oAuth2Client = new google.auth.OAuth2(
    process.env.OAUTH_CLIENT_ID,
    process.env.OAUTH_CLIENT_SECRET
  );
  oAuth2Client.setCredentials({
    refresh_token: process.env.OAUTH_REFRESH_TOKEN,
  });
  await oAuth2Client.getAccessToken();

  const calendar = google.calendar({ version: "v3", auth: oAuth2Client });

  const event = {
    summary: topic,
    description: `Meeting scheduled via Jatin's assistant.`,
    start: { dateTime: startISO, timeZone: "Asia/Kolkata" },
    end: { dateTime: endISO, timeZone: "Asia/Kolkata" },
    attendees: attendees.map((email: string) => ({ email })),
    conferenceData: {
      createRequest: {
        requestId: `meet-${Date.now()}`, // any unique string
        conferenceSolutionKey: { type: "hangoutsMeet" },
      },
    },
    reminders: {
      useDefault: false,
      overrides: [
        { method: "email", minutes: 30 },
        { method: "popup", minutes: 10 },
      ],
    },
  };

  try {
    const resp = await calendar.events.insert({
      calendarId: "primary",
      requestBody: event,
      sendUpdates: "all",
      conferenceDataVersion: 1,
    });
    const eventHTMLLink = resp.data?.htmlLink;
    const meetLink = resp.data?.conferenceData?.entryPoints?.[0].uri;
    const eventId = resp?.data?.conferenceData?.conferenceId;

    // Send email notification to yourself using Gmail API
    const gmail = google.gmail({ version: "v1", auth: oAuth2Client });

    const formatDate = (date: Date) => {
      return date.toLocaleDateString("en-IN", {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit",
        timeZone: "Asia/Kolkata",
      });
    };

    const htmlBody = `
    <p>Hi Jatin,</p>
    <p>A new meeting has been scheduled via your assistant:</p>
    <h3>📅 Meeting Details</h3>
    <ul>
      <li><strong>Topic:</strong> ${topic}</li>
      <li><strong>Date &amp; Time:</strong> ${formatDate(parsedDate)}</li>
      <li><strong>Duration:</strong> ${duration} minutes</li>
      <li><strong>Attendees:</strong> ${attendees.join(", ")}</li>
    </ul>
    <p>🔗 <a href="${eventHTMLLink}">View Calendar Event</a></p>
    ${meetLink ? `<p>🎥 <a href="${meetLink}">Join Google Meet</a></p>` : ""}
    <p>Best regards,<br/>Your Assistant</p>
  `.trim();

    const rawMessage = [
      `To: jatinbittu13@gmail.com`,
      `Subject: Meeting Scheduled: ${topic}`,
      `Content-Type: text/html; charset=UTF-8`,
      ``,
      htmlBody,
    ].join("\r\n");

    const encodedMessage = Buffer.from(rawMessage)
      .toString("base64")
      .replace(/\+/g, "-")
      .replace(/\//g, "_")
      .replace(/=+$/, "");

    await gmail.users.messages.send({
      userId: "me",
      requestBody: {
        raw: encodedMessage,
      },
    });
    return NextResponse.json({
      ok: true,
      htmlLink: eventHTMLLink,
      meetLink: meetLink,
      eventId: eventId,
    });
  } catch (error) {
    console.error("Error creating event or sending email:", error);
    return NextResponse.json(
      { ok: false, error: "Failed to create event or send notification" },
      { status: 500 }
    );
  }
}
