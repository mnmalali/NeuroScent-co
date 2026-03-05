"use client";

import { ScrollReveal } from "./ScrollReveal";
import { ArrowRight, Send, Loader2, RefreshCcw } from "lucide-react";
import React, { useEffect, useState, useRef } from "react";
import { GoogleGenAI, Chat } from "@google/genai";

export function SplineShowcase() {
  // Typewriter state
  const [text, setText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);
  const [loopNum, setLoopNum] = useState(0);

  // Chat state
  const [chatActive, setChatActive] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const [messages, setMessages] = useState<
    Array<{ role: "user" | "model"; text: string }>
  >([]);
  const [isLoading, setIsLoading] = useState(false);
  const [chatSession, setChatSession] = useState<Chat | null>(null);

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const words = [
    "longing for...",
    "dreaming of...",
    "hiding...",
    "seeking...",
    "loving...",
    "craving...",
    "remembering...",
    "feeling...",
    "yazan <3...",
  ];

  // Typewriter Effect
  useEffect(() => {
    let timer: ReturnType<typeof setTimeout>;
    const i = loopNum % words.length;
    const fullText = words[i];

    const type = () => {
      setText((current) =>
        isDeleting
          ? fullText.substring(0, current.length - 1)
          : fullText.substring(0, current.length + 1),
      );
    };

    if (!isDeleting && text === fullText) {
      timer = setTimeout(() => setIsDeleting(true), 2000);
    } else if (isDeleting && text === "") {
      setIsDeleting(false);
      setLoopNum(loopNum + 1);
    } else {
      timer = setTimeout(type, isDeleting ? 50 : 150);
    }

    return () => clearTimeout(timer);
  }, [text, isDeleting, loopNum]);

  // Auto-scroll to bottom of chat
  useEffect(() => {
    if (chatActive) {
      messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages, chatActive, isLoading]);

  const initChat = async () => {
    if (!inputValue.trim()) return;

    const initialMsg = inputValue;
    setChatActive(true);
    setMessages([{ role: "user", text: initialMsg }]);
    setInputValue("");
    setIsLoading(true);

    try {
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      const chat = ai.chats.create({
        model: "gemini-3-pro-preview",
        config: {
          systemInstruction: `You are the Digital Perfumer for NeuroScent, a luxury AI fragrance brand. 
                Your goal is to analyze the user's personality, memories, and emotions to design a personalized perfume. 
                
                Tone: Intelligent, minimal, calm, emotional, and sensual. 
                Rules:
                - Do not use emojis.
                - Do not use slang.
                - Keep responses concise (under 40 words).
                - Ask one evocative, sensory question at a time to deepen the profile.
                - Speak as "we".`,
        },
      });
      setChatSession(chat);

      const response = await chat.sendMessage({ message: initialMsg });
      setMessages((prev) => [
        ...prev,
        { role: "model", text: response.text || "I am sensing your input..." },
      ]);
    } catch (error) {
      console.error("Chat Error:", error);
      setMessages((prev) => [
        ...prev,
        {
          role: "model",
          text: "Our connection to the olfactory engine was interrupted. Please try again.",
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSendMessage = async () => {
    if (!inputValue.trim()) return;
    if (!chatSession) {
      initChat();
      return;
    }

    const msg = inputValue;
    setInputValue("");
    setMessages((prev) => [...prev, { role: "user", text: msg }]);
    setIsLoading(true);

    try {
      const response = await chatSession.sendMessage({ message: msg });
      setMessages((prev) => [
        ...prev,
        { role: "model", text: response.text || "" },
      ]);
    } catch (error) {
      console.error("Chat Error:", error);
      setMessages((prev) => [
        ...prev,
        { role: "model", text: "We encountered a disturbance in the signal." },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      if (chatActive) {
        handleSendMessage();
      } else {
        initChat();
      }
    }
  };

  return (
    <section className="relative w-full min-h-[800px] flex items-center bg-black overflow-hidden border-t border-white/10">
      {/* Background Image */}
      <div
        className="absolute inset-0 w-full h-full bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: "url('/images/1-e6a5804d.jpg')" }}
      />

      {/* Dark overlays */}
      <div className="absolute inset-0 bg-black/40 z-0" />
      <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/40 to-transparent z-0" />

      {/* Main Content Container */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 flex">
        {/* Left Side Content */}
        <div className="w-full max-w-xl flex flex-col justify-center min-h-[500px]">
          {/* Top badging */}
          <div className="flex items-center gap-3 mb-8"></div>

          {!chatActive ? (
            // INTRO VIEW
            <ScrollReveal className="flex flex-col">
              <div className="mb-10">
                <span className="text-white text-base md:text-lg font-serif italic block mb-3">
                  Tell me
                </span>
                <h1 className="text-6xl md:text-[5.5rem] font-serif text-white leading-[1.1] md:leading-[1.1]">
                  What are you
                </h1>
                <div className="text-6xl md:text-[5.5rem] font-serif italic text-white min-h-[1.2em] leading-[1.1] md:leading-[1.1] flex items-center">
                  <span>{text}</span>
                  <span className="animate-pulse font-light text-white ml-0.5">
                    |
                  </span>
                </div>
              </div>

              <div className="space-y-1 mb-8">
                <p className="text-white/80 font-sans text-sm md:text-base">
                  All humans have a story.
                </p>
                <p className="text-white/80 font-sans text-sm md:text-base">
                  Tell yours in scent with our digital perfumer NAFHA.
                </p>
              </div>

              <div className="group relative w-full xl:w-11/12 pt-2">
                <div className="relative bg-white/10 backdrop-blur-md border border-white/20 rounded-full p-2 pl-6 flex items-center justify-between transition-all hover:bg-white/15 focus-within:bg-white/15 focus-within:border-white/40">
                  <input
                    type="text"
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    onKeyDown={handleKeyDown}
                    placeholder="Start describing..."
                    className="bg-transparent border-none outline-none text-white placeholder-white/60 font-sans text-base w-full mr-4"
                  />
                  <button
                    onClick={initChat}
                    className="w-10 h-10 md:w-12 md:h-12 bg-white/70 hover:bg-white rounded-full flex items-center justify-center text-black transition-all transform shrink-0"
                  >
                    {isLoading ? (
                      <Loader2 size={18} className="animate-spin" />
                    ) : (
                      <ArrowRight size={18} className="text-black/80" />
                    )}
                  </button>
                </div>
              </div>
            </ScrollReveal>
          ) : (
            // CHAT VIEW
            <ScrollReveal className="flex flex-col h-[500px] bg-white/5 backdrop-blur-xl border border-white/20 rounded-3xl overflow-hidden shadow-2xl">
              {/* Chat Header */}
              <div className="p-6 border-b border-white/10 flex justify-between items-center bg-white/5">
                <div>
                  <span className="text-[#D4AB5C] text-xs uppercase tracking-[0.2em] block">
                    NeuroScent AI
                  </span>
                  <h2 className="font-serif text-xl text-white">
                    Digital Perfumer
                  </h2>
                </div>
                <button
                  onClick={() => {
                    setChatActive(false);
                    setMessages([]);
                    setChatSession(null);
                  }}
                  className="text-white/50 hover:text-white transition-colors text-xs uppercase tracking-widest flex items-center gap-2"
                >
                  <RefreshCcw size={14} /> Reset
                </button>
              </div>

              {/* Messages Area */}
              <div className="flex-1 overflow-y-auto p-6 space-y-6 scrollbar-thin scrollbar-thumb-white/20 scrollbar-track-transparent">
                {messages.map((msg, idx) => (
                  <div
                    key={idx}
                    className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
                  >
                    <div
                      className={`max-w-[85%] p-4 rounded-2xl ${
                        msg.role === "user"
                          ? "bg-white/10 border border-white/20 text-white rounded-tr-sm"
                          : "bg-black/40 border border-white/10 text-white/90 rounded-tl-sm font-serif italic text-lg"
                      }`}
                    >
                      {msg.text}
                    </div>
                  </div>
                ))}
                {isLoading && (
                  <div className="flex justify-start">
                    <div className="bg-black/40 border border-white/10 text-[#D4AB5C] px-4 py-3 rounded-2xl rounded-tl-sm flex items-center gap-2">
                      <span
                        className="w-1.5 h-1.5 bg-[#D4AB5C] rounded-full animate-bounce"
                        style={{ animationDelay: "0ms" }}
                      ></span>
                      <span
                        className="w-1.5 h-1.5 bg-[#D4AB5C] rounded-full animate-bounce"
                        style={{ animationDelay: "150ms" }}
                      ></span>
                      <span
                        className="w-1.5 h-1.5 bg-[#D4AB5C] rounded-full animate-bounce"
                        style={{ animationDelay: "300ms" }}
                      ></span>
                    </div>
                  </div>
                )}
                <div ref={messagesEndRef} />
              </div>

              {/* Input Area */}
              <div className="p-6 pt-2 border-t border-white/10 bg-white/5">
                <div className="relative bg-black/40 backdrop-blur-md border border-white/10 rounded-full p-2 pl-6 flex items-center justify-between transition-all focus-within:border-white/30">
                  <input
                    type="text"
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    onKeyDown={handleKeyDown}
                    disabled={isLoading}
                    placeholder="Type your reply..."
                    className="bg-transparent border-none outline-none text-white placeholder-white/50 font-light text-base w-full mr-4 disabled:opacity-50"
                    autoFocus
                  />
                  <button
                    onClick={handleSendMessage}
                    disabled={isLoading || !inputValue.trim()}
                    className="w-10 h-10 bg-white/10 hover:bg-white/20 disabled:bg-white/5 rounded-full flex items-center justify-center text-white backdrop-blur-md border border-white/20 transition-all disabled:opacity-50 disabled:cursor-not-allowed shrink-0"
                  >
                    <Send size={16} />
                  </button>
                </div>
              </div>
            </ScrollReveal>
          )}
        </div>
      </div>
    </section>
  );
}
