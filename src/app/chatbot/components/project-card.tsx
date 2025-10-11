import { Project } from "@/app/types/types";
import { ExternalLink } from "lucide-react";

export function ProjectCard({ p }: { p: Project }) {
  return (
    <div className="rounded-lg border-1 border-gray-200 dark:border-gray-800 bg-gray-100 dark:bg-gray-700 shadow-sm hover:shadow-md transition-shadow duration-300 ease-in-out">
      <div className="p-4 space-y-2">
        <div className="text-sm font-semibold text-gray-900 dark:text-gray-100">
          {p.title}
        </div>
        <p className="text-xs text-gray-700 dark:text-gray-300">{p.about}</p>
        <p className="text-xs text-gray-700 dark:text-gray-300">{p.summary}</p>

        <div className="flex flex-wrap gap-1.5 pt-1">
          {p.tech.map((t, i) => (
            <span
              key={i}
              className="inline-flex items-center gap-1 rounded-lg border border-gray-300 px-2 py-0.5 text-[12px] text-gray-800 dark:text-gray-300"
            >
              <span aria-hidden>{t.icon ?? "•"}</span>
              <span>{t.label}</span>
            </span>
          ))}
        </div>
      </div>
      <div className="px-4 pb-3">
        <a
          href={p.link}
          target="_blank"
          rel="noopener noreferrer"
          className="flex justify-center items-center gap-1 text-xs font-semibold text-sky-700 hover:underline border-1 w-full px-4 py-1 rounded-md focus-visible:outline-2 focus-visible:outline-sky-400 border-sky-700"
          aria-label={`Explore ${p.title}`}
        >
          Explore Now <ExternalLink className="h-3 w-3" />
        </a>
      </div>
    </div>
  );
}
