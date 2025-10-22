"use client";
import { CalendarIcon, CopyIcon, MailIcon, PhoneIcon } from "lucide-react";
import Image from "next/image";
import React, { useState } from "react";
import LinkedIn from "@/icons/linkedin.svg";
import Whatsapp from "@/icons/icon-whatsapp.svg";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import MeetingForm from "../chatbot/components/meeting-form";
import { Meeting } from "../types/types";
import GoogleMeetIcon from "@/assets/images/google-meet-icon.svg";

const contactDetails = [
  {
    label: "Email",
    value: "jatinbittu13@gmail.com",
    link: "mailto:jatinbittu13@gmail.com",
  },
  {
    label: "Mobile",
    value: "+91 9636245681",
    link: "tel:+919636245681",
  },
];

const ContactSection: React.FC = () => {
  const [copied, setCopied] = useState<string | null>(null);
  const [meetingScheduling, setMeetingScheduling] = useState(false);
  const [isMeetingScheduled, setIsMeetingScheduled] = useState(false);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [meeting, setMeeting] = useState<Meeting | null>(null);

  const handleCopy = async (value: string) => {
    try {
      await navigator.clipboard.writeText(value);
      setCopied(value);
      setTimeout(() => setCopied(null), 1500);
    } catch (err) {
      console.error("Failed to copy text: ", err);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center px-8 mx-auto lg:px-16 xl:px-0 py-20 z-1 max-w-3xl">
      <h2 className="rounded-lg bg-gray-200 font-medium text-gray-700 px-4 py-2 mb-4">
        Get in touch
      </h2>
      <p className="mb-8 text-gray-600 text-center max-w-lg">
        What&apos;s next? Feel free to reach out to me if you&apos;re looking
        for a developer, have a query, or simply want to connect.
      </p>
      <ul className="flex flex-col gap-6 items-center justify-center w-full mb-6">
        {contactDetails.map((detail) => (
          <li
            key={detail.label}
            className="flex flex-col md:flex-row items-center md:gap-4 text-lg font-bold text-black w-full justify-center"
          >
            <div className="flex items-center gap-2">
              <span>
                {detail.label === "Email" ? (
                  <span className="inline-block align-middle mr-2">
                    {/* Email icon SVG or @ symbol */}
                    <MailIcon className="h-6 w-6 text-gray-700" />
                  </span>
                ) : (
                  <span className="inline-block align-middle mr-2">
                    {/* Phone icon SVG */}
                    <PhoneIcon className="h-6 w-6 text-gray-700" />
                  </span>
                )}
              </span>
              <a
                href={detail.link}
                className="hover:underline transition-colors text-gray-800 text-lg md:text-3xl"
                target="_blank"
                rel="noopener noreferrer"
              >
                {detail.value}
              </a>
              <button
                onClick={() => handleCopy(detail.value)}
                className="ml-2 text-gray-700 hover:text-green-700 transition-colors"
                title="Copy"
              >
                {/* Copy icon */}
                <CopyIcon className="h-5 w-5" />
              </button>
              {copied === detail.value && (
                <span className="ml-2 text-green-600 text-base font-medium">
                  Copied!
                </span>
              )}
            </div>
          </li>
        ))}
      </ul>
      <div className="flex flex-col w-full items-center justify-center gap-2 mb-4">
        <span className="text-gray-600">
          Want to connect? You can easily schedule a meeting with me right here.
        </span>
        <Dialog
          open={isDialogOpen}
          onOpenChange={(open) => {
            setIsDialogOpen(open);
            if (!open) {
              // reset on close
              setIsMeetingScheduled(false);
              setMeetingScheduling(false);
              setMeeting(null);
            }
          }}
        >
          <DialogTrigger asChild>
            <Button
              className=" bg-sky-800 hover:bg-sky-900 w-full cursor-pointer dark:text-white"
              onClick={() => setIsDialogOpen(true)}
            >
              Schedule a meeting
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-3xl max-h-screen overflow-auto">
            <DialogTitle>
              {isMeetingScheduled ? (
                <div className="flex items-center gap-2 text-green-800 dark:text-green-200">
                  <span className="text-lg">🤝</span>
                  <span className="font-semibold">
                    Meeting Scheduled Successfully!
                  </span>
                </div>
              ) : (
                "Pick a Slot for Your Meeting"
              )}
            </DialogTitle>
            {!isMeetingScheduled ? (
              <MeetingForm
                onSubmit={async (data) => {
                  try {
                    setMeetingScheduling(true);
                    const scheduleResponse = await fetch(`/api/schedule`, {
                      method: "POST",
                      headers: { "Content-Type": "application/json" },
                      body: JSON.stringify({
                        attendees: [data?.email],
                        date: data?.date,
                        time: data?.time,
                        topic: `${data?.topic} - Meeting with ${data?.name}`,
                        duration: data?.duration,
                      }),
                    });
                    if (scheduleResponse.ok) {
                      const scheduleData = await scheduleResponse.json();
                      setIsMeetingScheduled(true);
                      console.log(scheduleData);
                      setMeeting(scheduleData);
                    } else {
                      setIsMeetingScheduled(false);
                    }
                  } catch (error: unknown) {
                    console.log("Error Scheduling the meeting", error);
                  } finally {
                    setMeetingScheduling(false);
                  }
                }}
                isSubmitting={meetingScheduling}
              />
            ) : (
              <div className="flex flex-col mt-3 rounded-xl  bg-green-50 p-4 space-y-3">
                <p className="text-sm text-green-700 dark:text-green-300">
                  Check your email and calendar for the invite. The meeting
                  details have been sent to you.
                </p>
                <div className="flex gap-2 items-center flex-wrap">
                  {meeting?.htmlLink && (
                    <a
                      href={meeting?.htmlLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex flex-row w-fit items-center gap-2 bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-md text-sm font-semibold transition-colors"
                    >
                      <CalendarIcon className="h-4 w-4" />
                      View Meeting
                      <span aria-hidden>↗</span>
                    </a>
                  )}

                  {meeting?.meetLink && (
                    <a
                      href={meeting?.meetLink}
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
            )}
          </DialogContent>
        </Dialog>
      </div>
      <div className="mt-4 text-gray-600 mb-2 text-center text-sm">
        You may also find me on these platforms!
      </div>
      <div className="flex gap-6">
        <a
          href="https://www.linkedin.com/in/jatin-prakash-jain/"
          aria-label="LinkedIn"
          className="flex items-center gap-2 hover:text-blue-900"
          target="_blank"
        >
          <Image src={LinkedIn} alt="LinkedIn" width={40} height={40} />
          <span>LinkedIn</span>
        </a>
        <a
          href="https://wa.me/+919636245681"
          aria-label="Whatsapp"
          className="flex items-center gap-2"
          target="_blank"
        >
          <Image
            src={Whatsapp}
            alt="Whatsapp"
            width={35}
            height={35}
            className=""
          />
          <span>Whatsapp</span>
        </a>
      </div>
    </div>
  );
};

export default ContactSection;
