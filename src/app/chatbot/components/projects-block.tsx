import { ChatMessage } from "@/app/types/types";
import { extractProjectsFromMessage } from "@/lib/chatbot-utils";
import { ProjectCard } from "./project-card";
import { GITHUB_URL } from "@/data/CONSTS";

export function ProjectsBlock({ msg }: { msg: ChatMessage }) {
  const projects = extractProjectsFromMessage(msg);
  if (projects.length === 0) return null;

  return (
    <div className="mt-3 space-y-3">
      <div className="grid grid-cols-1 gap-3">
        {projects.map((p) => (
          <ProjectCard key={p.key} p={p} />
        ))}
      </div>

      {/* Single, consistent GitHub CTA under the cards */}
      <div className="text-xs text-gray-700">
        See more work on{" "}
        <a
          href={GITHUB_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="text-sky-700 dark:text-sky-400 hover:underline font-semibold"
        >
          GitHub
        </a>
        .
      </div>
    </div>
  );
}
