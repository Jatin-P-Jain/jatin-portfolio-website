import { Button } from "@/components/ui/button";
import { ChevronDownIcon, ChevronUpIcon } from "lucide-react";
import React, { useState } from "react";

export default function QuickSuggestions({
  quickPrompts,
  sendMessageHandler,
}: {
  quickPrompts?: string[];
  sendMessageHandler: (e?: React.FormEvent, message?: string) => void;
}) {
  const [showQuickPrompts, setShowQuickPrompts] = useState(true);
  return (
    <>
      {/* Quick suggestions */}
      <div className="flex flex-col gap-4 px-4">
        <div className="flex flex-row items-center justify-center w-full gap-4">
          {/* <div className="flex h-0.5 w-full bg-gray-200 " /> */}
          <div className="text-[10px] text-gray-400 flex justify-center items-center whitespace-nowrap">
            Quick Suggestions
          </div>
          <div className="flex h-0.5 w-full bg-gray-200" />
          <div className="flex" onClick={() => setShowQuickPrompts((v) => !v)}>
            {!showQuickPrompts ? (
              <ChevronDownIcon className="h-4 w-4 text-gray-400" />
            ) : (
              <ChevronUpIcon className="h-4 w-4 text-gray-400" />
            )}
          </div>
        </div>
        {showQuickPrompts && (
          <div className="flex flex-wrap gap-2 justify-end">
            {quickPrompts?.map((p) => (
              <Button
                variant={"outline"}
                key={p}
                onClick={() => sendMessageHandler(undefined, p)}
                className="rounded-full border-1 px-2 md:px-3 text-[10px] md:text-xs transition border-sky-700 text-sky-700 dark:text-sky-400 hover:bg-sky-700 hover:text-white focus-visible:outline-2 focus-visible:outline-sky-400"
                aria-label={`Ask: ${p}`}
              >
                {p}
              </Button>
            ))}
          </div>
        )}
      </div>
    </>
  );
}
