import { Message } from "@/types/chat";
import { ChatMessage } from "./ChatMessage";
import { TypingIndicator } from "../shared/TypingIndicator";

interface ChatMessagesProps {
  messages: Message[];
  isLoading: boolean;
}

export function ChatMessages({ messages, isLoading }: ChatMessagesProps) {
  return (
    <div className="space-y-6">
      {messages.map((message) => (
        <ChatMessage key={message.id} message={message} />
      ))}
      {isLoading && <TypingIndicator />}
    </div>
  );
}