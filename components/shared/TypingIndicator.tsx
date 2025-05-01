"use client";

export function TypingIndicator() {
  return (
    <div className="flex items-center gap-4">
      <div className="flex h-8 w-8 shrink-0 select-none items-center justify-center rounded-md border bg-background shadow">
        AI
      </div>
      <div className="flex h-8 items-center gap-1 rounded-2xl bg-secondary/50 px-3">
        <div className="flex space-x-1">
          {[1, 2, 3].map((i) => (
            <div
              key={i}
              className="h-2 w-2 rounded-full bg-foreground/50 animate-bounce"
              style={{ animationDelay: `${i * 0.2}s` }}
            />
          ))}
        </div>
        <span className="text-xs text-foreground/50">Typing</span>
      </div>
    </div>
  );
}