"use client";

import { ThemeToggle } from "./ThemeToggle";
import { motion } from "framer-motion";

export function Header() {
  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 p-4 shadow-md"
    >
      <div className="container flex h-14 max-w-screen-2xl items-center">
        <div className="mr-4 flex items-center">
          <motion.a
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="mr-6 flex items-center space-x-2 transition-colors hover:text-primary"
            href="/"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="h-6 w-6"
            >
              <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
            </svg>
            <span className="hidden font-bold sm:inline-block">Chat AI</span>
          </motion.a>
        </div>

        <nav className="flex-1">
          <ul className="hidden md:flex md:space-x-4">
            <li>
              <a
                href="/chat"
                className="text-sm font-medium transition-colors hover:text-primary"
              >
                Chat
              </a>
            </li>
            <li>
              <a
                href="/history"
                className="text-sm font-medium transition-colors hover:text-primary"
              >
                History
              </a>
            </li>
          </ul>
        </nav>

        <div className="flex items-center justify-end space-x-4">
          <ThemeToggle />
        </div>
      </div>
    </motion.header>
  );
}