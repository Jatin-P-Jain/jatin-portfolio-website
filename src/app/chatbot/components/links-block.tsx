import { LinkItem } from "@/app/types/types";
import Link from "next/link";

export function LinksBlock({ links }: { links?: LinkItem[] }) {
  if (!links || links.length === 0) return null;
  return (
    <ul className="mt-2 list-disc pl-5 text-sm">
      {links.map((l, i) => {
        const isInternal = l.url.startsWith("/");
        return (
          <li key={i}>
            {isInternal ? (
              <Link href={l.url} className="text-blue-600 hover:underline">
                {l.title}
              </Link>
            ) : (
              <a
                href={l.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sky-700 hover:underline"
              >
                {l.title}
              </a>
            )}
          </li>
        );
      })}
    </ul>
  );
}
