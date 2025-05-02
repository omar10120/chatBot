"use client";

import { Message } from "@/types/chat";
import { format } from "date-fns";

interface ChatMessageProps {
  message: Message;
}

export function ChatMessage({ message }: ChatMessageProps) {
  const isAI = message.role === "assistant";

  return (
    <div className={`flex ${isAI ? "flex-row" : "flex-row-reverse"} gap-4 group`}>
      <div className={`flex-shrink-0 h-9 w-9 rounded-full flex items-center justify-center ${isAI ? "bg-primary/10 text-primary" : "bg-muted"}`}>
        {isAI ? "AI" : "You"}
      </div>
      <div className={`flex-1 space-y-2 overflow-hidden`}>
        <div className="flex items-center gap-2">
          <span className="text-sm font-medium">
            {isAI ? "AI Assistant" : "You"}
          </span>
          <span className="text-xs text-muted-foreground">
            {format(message.timestamp, "HH:mm")}
          </span>
        </div>
        <div className={`rounded-lg p-4 ${isAI ? "bg-primary/5" : "bg-muted"} text-sm leading-relaxed`}>
          {message.content}
        </div>
      </div>
    </div>
  );
}