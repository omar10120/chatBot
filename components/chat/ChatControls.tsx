"use client";

import { Trash2, Copy } from "lucide-react";

interface ChatControlsProps {
  onClearChat: () => void;
  onCopyAll: () => void;
}

export function ChatControls({ onClearChat, onCopyAll }: ChatControlsProps) {
  return (
    <div className="flex justify-end gap-2">
      <button
        onClick={onClearChat}
        className="inline-flex items-center gap-2 rounded-md px-3 py-2 text-sm font-semibold text-destructive hover:bg-destructive/10"
        title="Clear chat"
      >
        <Trash2 className="h-4 w-4" />
        Clear
      </button>
      <button
        onClick={onCopyAll}
        className="inline-flex items-center gap-2 rounded-md px-3 py-2 text-sm font-semibold text-primary hover:bg-primary/10"
        title="Copy all messages"
      >
        <Copy className="h-4 w-4" />
        Copy All
      </button>
    </div>
  );
}