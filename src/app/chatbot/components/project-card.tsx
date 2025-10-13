import { Project } from "@/app/types/types";
import { ExternalLink } from "lucide-react";
import Image from "next/image";

export function ProjectCard({ p }: { p: Project }) {
  return (
    <div className="rounded-lg border-1 border-gray-200 dark:border-gray-800 bg-gray-100 dark:bg-gray-700 shadow-sm hover:shadow-md transition-shadow duration-300 ease-in-out">
      <div className="p-4 space-y-2">
        <div className="text-sm font-semibold text-gray-900 dark:text-gray-100">
          {p.name}
        </div>
        <p className="text-xs text-gray-700 dark:text-gray-300">{p.description}</p>
        <p className="text-xs text-gray-700 dark:text-gray-300">{p.highlights.join(", ")}</p>

        <div className="flex flex-wrap gap-1.5 pt-1">
          {p.techStack?.map((t, i) => (
            <span
              key={i}
              className="inline-flex items-center gap-1 rounded-lg border border-gray-300 px-2 py-0.5 text-[12px] text-gray-800 dark:text-gray-300"
            >
              <div className="w-3 h-3 relative">
                <Image src={t.logo_url} alt={t.label} width={14} height={14} />
              </div>
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
          aria-label={`Explore ${p.name}`}
        >
          Explore Now <ExternalLink className="h-3 w-3" />
        </a>
      </div>
    </div>
  );
}
