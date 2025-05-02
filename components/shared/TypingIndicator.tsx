"use client";

export function TypingIndicator() {
  return (
    <div className="flex items-center gap-4">
      <div className="h-9 w-9 rounded-full bg-primary/10 text-primary flex items-center justify-center">
        AD
      </div>
      <div className="flex items-center gap-2 rounded-lg bg-primary/5 px-4 py-2">
        <div className="flex space-x-1">
          {[1, 2, 3].map((i) => (
            <div
              key={i}
              className="h-2 w-2 rounded-full bg-primary/50 animate-bounce"
              style={{ animationDelay: `${i * 0.2}s` }}
            />
          ))}
        </div>
        <span className="text-xs text-muted-foreground">Typing...</span>
      </div>
    </div>
  );
}