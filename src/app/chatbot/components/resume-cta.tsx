import { RESUME_URL } from "@/data/CONSTS";
import { DownloadIcon } from "lucide-react";

// 2) CTA button
export function ResumeCTA() {
  return (
    <a
      href={RESUME_URL}
      download
      className="mt-3 inline-flex items-center justify-center gap-2 rounded-md bg-sky-700 px-3 py-2 text-xs font-semibold text-white hover:bg-sky-800 focus-visible:outline-2 focus-visible:outline-sky-400"
      aria-label="Download Resume"
      target="_blank"
    >
      Download Resume
      <DownloadIcon className="w-4 h-4 ml-1" />
    </a>
  );
}
