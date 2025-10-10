import { NextRequest, NextResponse } from "next/server";
import { google } from "googleapis";
import * as chrono from "chrono-node";

export async function POST(req: NextRequest) {
  const { attendees, date, time, topic } = await req.json();
  if (!attendees || !date || !time || !topic) {
    return NextResponse.json(
      { ok: false, error: "Missing fields" },
      { status: 400 }
    );
  }

  // Parse date and time using chrono
  const datetimeString = `${date} ${time}`;
  const parsedDate = chrono.parseDate(datetimeString, new Date(), { forwardDate: true });

  if (!parsedDate) {
    return NextResponse.json(
      { ok: false, error: "Could not parse date/time" },
      { status: 400 }
    );
  }

  // Calculate end time - 1 hour after start
  const endDate = new Date(parsedDate.getTime() + 60 * 60 * 1000);

  // Format in ISO with timezone offset
  const timezoneOffset = "+05:30";
  const toISOLocalString = (d: Date) => {
    const pad = (n: number) => n.toString().padStart(2, "0");
    // Local ISO datetime without 'Z'
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

  // Build OAuth2Client and Google Calendar client as before
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
    start: { dateTime: startISO, timeZone: "Asia/Kolkata" },
    end: { dateTime: endISO, timeZone: "Asia/Kolkata" },
    attendees: attendees.map((email: string) => ({ email })),
  };

  const resp = await calendar.events.insert({
    calendarId: "primary",
    requestBody: event,
    sendUpdates: "all",
    conferenceDataVersion: 1,
  });

  return NextResponse.json({
    ok: true,
    htmlLink: resp.data.htmlLink,
  });
}
