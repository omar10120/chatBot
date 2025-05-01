"use client";

import { useState, useRef, useEffect } from "react";
import { Message } from "@/types/chat";
import { ChatMessages } from "./ChatMessages";
import { ChatInput } from "./ChatInput";
import { ChatControls } from "./ChatControls";
import { generateChatCompletion } from "@/lib/aiml";

export function ChatContainer() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

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

    try {
      const chatMessages = [...messages, newMessage].map(msg => ({
        role: msg.role,
        content: msg.content
      }));

      const completion = await generateChatCompletion(chatMessages);
      
      const aiResponse: Message = {
        id: Date.now().toString(),
        role: "assistant",
        content: completion.choices[0].message.content,
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, aiResponse]);
    } catch (error) {
      console.error("Error generating response:", error);
      const errorMessage: Message = {
        id: Date.now().toString(),
        role: "assistant",
        content: "I apologize, but I encountered an error. Please try again.",
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
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
      <div className="flex-1 overflow-hidden rounded-lg border bg-background shadow-sm">
        <div className="h-full overflow-y-auto p-4">
          <div className="space-y-6">
            <ChatMessages messages={messages} isLoading={isLoading} />
            <div ref={messagesEndRef} />
          </div>
        </div>
      </div>
      <div className="space-y-4">
        <ChatControls onClearChat={handleClearChat} onCopyAll={handleCopyAll} />
        <ChatInput onSendMessage={handleSendMessage} isLoading={isLoading} />
      </div>
    </div>
  );
}