import { ChatMessage } from "@/app/types/types";
import { CalendarIcon } from "lucide-react";
import Image from "next/image";
import GoogleMeetIcon from "@/assets/images/google-meet-icon.svg";

export function MeetingBlock({
  meeting,
}: {
  meeting?: ChatMessage["meeting"];
}) {
  if (!meeting || !meeting.scheduled) return <></>;
  return (
    <div className="flex flex-col mt-3 rounded-xl border-2 border-green-200 bg-green-50 dark:bg-green-900/20 dark:border-green-800 p-4 space-y-3">
      <div className="flex items-center gap-2 text-green-800 dark:text-green-200">
        <span className="text-lg">🤝</span>
        <span className="font-semibold">Meeting Scheduled Successfully!</span>
      </div>

      <p className="text-sm text-green-700 dark:text-green-300">
        Check your email and calendar for the invite. The meeting details have
        been sent to you.
      </p>
      <div className="flex gap-2 items-center flex-wrap">
        {meeting.htmlLink && (
          <a
            href={meeting.htmlLink}
            target="_blank"
            rel="noopener noreferrer"
            className="flex flex-row w-fit items-center gap-2 bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-md text-sm font-semibold transition-colors"
          >
            <CalendarIcon className="h-4 w-4" />
            View Meeting
            <span aria-hidden>↗</span>
          </a>
        )}

        {meeting.meetLink && (
          <a
            href={meeting.meetLink}
            target="_blank"
            rel="noopener noreferrer"
            className="flex flex-row w-fit items-center gap-2 bg-sky-700 hover:bg-sky-800 text-white px-4 py-2 rounded-md text-sm font-semibold transition-colors"
          >
            <Image
              src={GoogleMeetIcon}
              alt="Google Meet"
              width={16}
              height={16}
            />
            Join on Google Meet
            <span aria-hidden>↗</span>
          </a>
        )}
      </div>
    </div>
  );
}
