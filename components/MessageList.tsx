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
          {}
          <span className="flex-1 backdrop-blur-sm bg-white/10 rounded-md text-lg p-1 ">
            {message.content}
          </span>
        </div>
      ))}
    </div>
  );
}*/

/*import { Message } from "ai/react";
import { useEffect, useRef, useState } from "react";

interface MessageListProps {
  messages: Message[];
}

export default function MessageList({ messages }: MessageListProps) {
  const view = useRef<HTMLDivElement>(null);
  const [copiedId, setCopiedId] = useState<string | null>(null);

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

  return (
    <div ref={view} className="w-full border-none flex flex-col gap-1">
      {messages.map((message: Message) => (
        <div key={message.id} className="flex flex-col relative">
          <span className="flex-1 backdrop-blur-sm bg-white/10 rounded-md text-lg p-1 pb-8">
            {message.content}
          </span>
          <div 
            className="absolute bottom-2 right-2 flex justify-end pointer-events-none"
          >
            <button
              onClick={() => handleCopy(message.content, message.id)}
              className="p-1 rounded-md opacity-0 hover:opacity-100 focus:opacity-100 group-hover:opacity-100 transition-opacity bg-gray-100 hover:bg-gray-200 pointer-events-auto"
              aria-label="Copy message"
              title="Copy message"
              style={{ zIndex: 10 }}
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
}*/

// 0326 字體加粗、黑
/*import { Message } from "ai/react";
import { useEffect, useRef, useState } from "react";
interface MessageListProps {
  messages: Message[];
}
export default function MessageList({ messages }: MessageListProps) {
  const view = useRef<HTMLDivElement>(null);
  const [copiedId, setCopiedId] = useState<string | null>(null);
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
  return (
    <div ref={view} className="w-full border-none flex flex-col gap-1">
      {messages.map((message: Message) => (
        <div key={message.id} className="flex flex-col relative">
          <span className="flex-1 backdrop-blur-sm bg-white/10 rounded-md text-lg p-1 pb-8 text-black font-bold">
            {message.content}
          </span>
          <div 
            className="absolute bottom-2 right-2 flex justify-end pointer-events-none"
          >
            <button
              onClick={() => handleCopy(message.content, message.id)}
              className="p-1 rounded-md opacity-0 hover:opacity-100 focus:opacity-100 group-hover:opacity-100 transition-opacity bg-gray-100 hover:bg-gray-200 pointer-events-auto"
              aria-label="Copy message"
              title="Copy message"
              style={{ zIndex: 10 }}
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
}*/

// 0328 灰色字體
/*import { Message } from "ai/react";
import { useEffect, useRef, useState } from "react";
interface MessageListProps {
  messages: Message[];
}
export default function MessageList({ messages }: MessageListProps) {
  const view = useRef<HTMLDivElement>(null);
  const [copiedId, setCopiedId] = useState<string | null>(null);
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
  return (
    <div ref={view} className="w-full border-none flex flex-col gap-1">
      {messages.map((message: Message) => (
        <div key={message.id} className="flex flex-col relative">
          <span className="flex-1 backdrop-blur-sm bg-white/10 rounded-md text-lg p-1 pb-8 text-[#5C5C66] font-normal">
            {message.content}
          </span>
          <div 
            className="absolute bottom-2 right-2 flex justify-end pointer-events-none"
          >
            <button
              onClick={() => handleCopy(message.content, message.id)}
              className="p-1 rounded-md opacity-0 hover:opacity-100 focus:opacity-100 group-hover:opacity-100 transition-opacity bg-gray-100 hover:bg-gray-200 pointer-events-auto"
              aria-label="Copy message"
              title="Copy message"
              style={{ zIndex: 10 }}
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
}*/

//0402 調整字佔的畫面

import { Message } from "ai/react";
import { useEffect, useRef, useState } from "react";
interface MessageListProps {
  messages: Message[];
}
export default function MessageList({ messages }: MessageListProps) {
  const view = useRef<HTMLDivElement>(null);
  const [copiedId, setCopiedId] = useState<string | null>(null);
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
  return (
    <div ref={view} className="w-full border-none flex flex-col gap-0.5">
      {messages.map((message: Message) => (
        <div key={message.id} className="flex flex-col relative">
          <span className="flex-1 backdrop-blur-sm bg-white/10 rounded-md text-base p-0.5 pb-6 text-[#5C5C66] font-normal">
            {message.content}
          </span>
          <div 
            className="absolute bottom-1 right-1 flex justify-end pointer-events-none"
          >
            <button
              onClick={() => handleCopy(message.content, message.id)}
              className="p-0.5 rounded-md opacity-0 hover:opacity-100 focus:opacity-100 group-hover:opacity-100 transition-opacity bg-gray-100 hover:bg-gray-200 pointer-events-auto"
              aria-label="Copy message"
              title="Copy message"
              style={{ zIndex: 10 }}
            >
              {copiedId === message.id ? (
                // Check icon
                <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-green-500">
                  <polyline points="20 6 9 17 4 12"></polyline>
                </svg>
              ) : (
                // Copy icon
                <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-gray-500">
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



