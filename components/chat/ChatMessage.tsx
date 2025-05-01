"use client";

import { Message } from "@/types/chat";
import { format } from "date-fns";
import { PrismLight as SyntaxHighlighter } from "react-syntax-highlighter";
import { oneDark } from "react-syntax-highlighter/dist/cjs/styles/prism";
import { atomDark } from "react-syntax-highlighter/dist/cjs/styles/prism";
import React from "react";
interface ChatMessageProps {
  message: Message;
}

export function ChatMessage({ message }: ChatMessageProps) {
  // Function to detect and parse code blocks
  const renderContent = (content: string) => {
    const codeBlockRegex = /```(\w+)?\n([\s\S]*?)```/g;
    const parts = [];
    let lastIndex = 0;
    let match;

    while ((match = codeBlockRegex.exec(content)) !== null) {
      // Add text before code block
      if (match.index > lastIndex) {
        parts.push(
          <span key={lastIndex} className="whitespace-pre-wrap">
            {content.slice(lastIndex, match.index)}
          </span>
        );
      }

      // Add code block
      const language = match[1] || "plaintext";
      const code = match[2].trim();
      parts.push(
        <div key={match.index} className="my-2 rounded-md overflow-hidden">
          <SyntaxHighlighter
            language={language}
            style={atomDark}
            customStyle={{ margin: 0, borderRadius: "0.375rem" }}
          >
            {code}
          </SyntaxHighlighter>
        </div>
      );

      lastIndex = match.index + match[0].length;
    }

    // Add remaining text
    if (lastIndex < content.length) {
      parts.push(
        <span key={lastIndex} className="whitespace-pre-wrap">
          {content.slice(lastIndex)}
        </span>
      );
    }

    return parts;
  };

  return (
    <div className={`flex gap-4 ${message.role === "assistant" ? "flex-row" : "flex-row-reverse"}`}>
      <div className="flex h-8 w-8 shrink-0 select-none items-center justify-center rounded-md border bg-background shadow">
        {message.role === "assistant" ? "AI" : "You"}
      </div>
      <div className="flex-1 space-y-2">
        <div className="flex items-center gap-2">
          <span className="font-semibold">
            {message.role === "assistant" ? "AI Assistant" : "You"}
          </span>
          <span className="text-xs text-muted-foreground">
            {format(message.timestamp, "HH:mm")}
          </span>
        </div>
        <div className="prose prose-sm dark:prose-invert">
          {renderContent(message.content)}
        </div>
      </div>
    </div>
  );
}