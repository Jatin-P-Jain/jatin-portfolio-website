import { Contact } from "@/app/types/types";
import Image from "next/image";
import LinkedIn from "@/icons/linkedin.svg";
import Whatsapp from "@/icons/icon-whatsapp.svg";

export function ContactBlock({ contact }: { contact?: Contact }) {
  if (!contact) return null;
  const emailHref = `mailto:${contact.email}`;
  const telHref = `tel:${(contact.phone || "").replace(/\s/g, "")}`;
  const waHref = `https://wa.me/${(contact.phone || "").replace(/\D/g, "")}`;
  return (
    <div className="mt-2 rounded-xl border-1 bg-gray-100 dark:bg-gray-700 p-4 shadow-md hover:shadow-lg transition-shadow space-y-2 text-xs text-gray-700 dark:text-gray-300">
      <div className="font-semibold flex w-full justify-center items-center text-gray-900 dark:text-gray-100 text-base tracking-tight">
        📬 Contact
      </div>

      {contact?.email && (
        <div className="flex items-center gap-2">
          <span className="shrink-0">✉️ Email</span>
          <a
            className="text-sky-700 hover:underline font-semibold text-sm  focus-visible:outline-2 focus-visible:outline-sky-400 rounded"
            href={emailHref}
          >
            {contact.email}
          </a>
        </div>
      )}

      {contact?.phone && (
        <div className="flex items-center gap-2">
          <span className="shrink-0">📞 Phone :</span>
          <a
            className="text-sky-700 hover:underline font-semibold text-sm  focus-visible:outline-2 focus-visible:outline-sky-400 rounded"
            href={telHref}
          >
            {contact.phone}
          </a>
        </div>
      )}

      {contact?.linkedin && (
        <div className="flex items-center gap-2">
          <span className="shrink-0 flex items-center gap-1">
            <Image src={LinkedIn} alt="LinkedIn" width={20} height={20} />{" "}
            LinkedIn :
          </span>
          <a
            className="text-sky-700 hover:underline font-semibold inline-flex items-center gap-1 text-sm focus-visible:outline-2 focus-visible:outline-sky-400 rounded"
            href={contact.linkedin}
            target="_blank"
            rel="noopener noreferrer"
          >
            Jatin Prakash Jain <span aria-hidden>↗</span>
          </a>
        </div>
      )}
      <a
        className="text-green-700 hover:underline font-semibold flex items-center gap-1 text-sm  focus-visible:outline-2 focus-visible:outline-emerald-400 rounded"
        href={waHref}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Open WhatsApp chat"
      >
        <span className="text-xs text-muted-foreground">
          Let&apos;s Chat on{" "}
        </span>
        <Image src={Whatsapp} alt="WhatsApp" width={20} height={20} />
        <span className="inline-flex items-center gap-1">
          WhatsApp <span aria-hidden>↗</span>
        </span>
      </a>
    </div>
  );
}
