"use client";
import { CopyIcon, MailIcon, PhoneIcon } from "lucide-react";
import Image from "next/image";
import React, { useState } from "react";
import LinkedIn from "@/icons/linkedin.svg";
import Whatsapp from "@/icons/icon-whatsapp.svg";

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
      <ul className="flex flex-col gap-6 items-center w-full mb-6">
        {contactDetails.map((detail) => (
          <li
            key={detail.label}
            className="flex flex-col md:flex-row md:items-center md:gap-4 text-lg font-bold text-black w-full justify-center"
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
