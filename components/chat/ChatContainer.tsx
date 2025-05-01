"use client";

import { useState } from "react";
import { Message } from "@/types/chat";
import { ChatMessages } from "./ChatMessages";
import { ChatInput } from "./ChatInput";
import { ChatControls } from "./ChatControls";

export function ChatContainer() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const handleSendMessage = async (content: string) => {
    if (!content.trim()) return;

    const newMessage: Message = {
      id: Date.now().toString(),
      role: "user",
      content,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, newMessage]);
    setIsLoading(true);

    // TODO: Implement AI response logic here
    
    setIsLoading(false);
  };

  const handleClearChat = () => {
    setMessages([]);
  };

  const handleCopyAll = () => {
    const chatText = messages
      .map((msg) => `${msg.role}: ${msg.content}`)
      .join("\n\n");
    navigator.clipboard.writeText(chatText);
  };

  return (
    <div className="flex h-[calc(100vh-3.5rem)] flex-col space-y-4 p-4">
      <div className="flex-1 space-y-4 overflow-y-auto rounded-lg border bg-background p-4">
        <ChatMessages messages={messages} isLoading={isLoading} />
      </div>
      <div className="space-y-4  ">
        <ChatControls onClearChat={handleClearChat} onCopyAll={handleCopyAll} />
        <ChatInput onSendMessage={handleSendMessage} isLoading={isLoading} />
      </div>
    </div>
  );
}