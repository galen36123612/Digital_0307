/*import { Message } from "ai/react";
import { useEffect, useRef } from "react";
interface MessageListProps {
  messages: Message[];
}

export default function MessageList({ messages }: MessageListProps) {
  const view = useRef<HTMLDivElement>(null);

  useEffect(() => {
    view.current!.scrollIntoView(false);
  }, [messages]);

  return (
    <div ref={view} className="w-full border-none flex flex-col gap-1">
      {messages.map((message: Message) => (
        <div key={message.id} className="flex flex-row ">
          {// <span className="w-16 after:content-[':']">{message.role}</span> }
          <span className="flex-1 backdrop-blur-sm bg-white/10 rounded-md text-lg p-1 ">
            {message.content}
          </span>
        </div>
      ))}
    </div>
  );
}*/

import { Message } from "ai/react";
import { useEffect, useRef, useState } from "react";

interface MessageListProps {
  messages: Message[];
}

export default function MessageList({ messages }: MessageListProps) {
  const view = useRef<HTMLDivElement>(null);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [pausedId, setPausedId] = useState<string | null>(null); // 新增暫停狀態

  useEffect(() => {
    view.current?.scrollIntoView(false);
  }, [messages]);

  const handleCopy = (content: string, id: string) => {
    navigator.clipboard.writeText(content)
      .then(() => {
        setCopiedId(id);
        // Reset the copied state after 2 seconds
        setTimeout(() => setCopiedId(null), 2000);
      })
      .catch(err => {
        console.error('Failed to copy text: ', err);
      });
  };

  const handlePause = (id: string) => {
    // 切換暫停狀態
    setPausedId(pausedId === id ? null : id);
  };

  return (
    <div ref={view} className="w-full border-none flex flex-col gap-1">
      {messages.map((message: Message) => (
        <div key={message.id} className="flex flex-col relative group">
          <span className="flex-1 backdrop-blur-sm bg-white/10 rounded-md text-lg p-1 pb-8">
            {message.content}
          </span>
          <div className="absolute bottom-2 right-2 flex justify-end space-x-2">
            {// 暫停按鈕}
            <button
              onClick={() => handlePause(message.id)}
              className="p-1 rounded-md opacity-0 group-hover:opacity-100 transition-opacity bg-gray-100 hover:bg-gray-200 z-10"
              aria-label="Pause message"
              title="Pause message"
            >
              {pausedId === message.id ? (
                // Play icon (顯示當暫停時)
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-blue-500">
                  <polygon points="5 3 19 12 5 21 5 3"></polygon>
                </svg>
              ) : (
                // Pause icon
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-gray-500">
                  <rect x="6" y="4" width="4" height="16"></rect>
                  <rect x="14" y="4" width="4" height="16"></rect>
                </svg>
              )}
            </button>
            
            {// 複製按鈕}
            <button
              onClick={() => handleCopy(message.content, message.id)}
              className="p-1 rounded-md opacity-0 group-hover:opacity-100 transition-opacity bg-gray-100 hover:bg-gray-200 z-10"
              aria-label="Copy message"
              title="Copy message"
            >
              {copiedId === message.id ? (
                // Check icon
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-green-500">
                  <polyline points="20 6 9 17 4 12"></polyline>
                </svg>
              ) : (
                // Copy icon
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-gray-500">
                  <rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect>
                  <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path>
                </svg>
              )}
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}



