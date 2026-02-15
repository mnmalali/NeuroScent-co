'use client'

import { SplineScene } from "./ui/spline-scene";
import { Card } from "./ui/card"
import { Spotlight } from "./ui/spotlight"
import { ArrowRight, Send, Loader2, RefreshCcw } from "lucide-react"
import { useEffect, useState, useRef } from "react"
import { GoogleGenAI, Chat } from "@google/genai";
 
export function SplineShowcase() {
  // Typewriter state
  const [text, setText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);
  const [loopNum, setLoopNum] = useState(0);
  
  // Chat state
  const [chatActive, setChatActive] = useState(false);
  const [inputValue, setInputValue] = useState('');
  const [messages, setMessages] = useState<Array<{role: 'user' | 'model', text: string}>>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [chatSession, setChatSession] = useState<Chat | null>(null);
  
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const words = ["feeling...", "dreaming...", "hiding...", "seeking...", "loving...", "thinking...", "craving..."];

  // Typewriter Effect
  useEffect(() => {
    let timer: ReturnType<typeof setTimeout>;
    const i = loopNum % words.length;
    const fullText = words[i];

    const type = () => {
      setText(current => isDeleting 
        ? fullText.substring(0, current.length - 1) 
        : fullText.substring(0, current.length + 1)
      );
    };

    if (!isDeleting && text === fullText) {
      timer = setTimeout(() => setIsDeleting(true), 2000);
    } else if (isDeleting && text === '') {
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
    setMessages([{ role: 'user', text: initialMsg }]);
    setInputValue('');
    setIsLoading(true);

    try {
        const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
        const chat = ai.chats.create({
            model: 'gemini-3-pro-preview',
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
            }
        });
        setChatSession(chat);
        
        const response = await chat.sendMessage({ message: initialMsg });
        setMessages(prev => [...prev, { role: 'model', text: response.text || "I am sensing your input..." }]);
    } catch (error) {
        console.error("Chat Error:", error);
        setMessages(prev => [...prev, { role: 'model', text: "Our connection to the olfactory engine was interrupted. Please try again." }]);
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
    setInputValue('');
    setMessages(prev => [...prev, { role: 'user', text: msg }]);
    setIsLoading(true);

    try {
        const response = await chatSession.sendMessage({ message: msg });
        setMessages(prev => [...prev, { role: 'model', text: response.text || "" }]);
    } catch (error) {
        console.error("Chat Error:", error);
        setMessages(prev => [...prev, { role: 'model', text: "We encountered a disturbance in the signal." }]);
    } finally {
        setIsLoading(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
        if (chatActive) {
            handleSendMessage();
        } else {
            initChat();
        }
    }
  };

  return (
    <Card className="w-full h-[600px] bg-black/[0.96] relative overflow-hidden border-neuro-gold/30 transition-all duration-500">
      <Spotlight
        className="-top-40 left-0 md:left-60 md:-top-20"
        fill="#D4AB5C"
      />
      
      <div className="flex h-full flex-col md:flex-row">
        {/* Left content (Switchable) */}
        <div className="flex-1 relative z-20 flex flex-col h-full transition-all duration-500 pointer-events-none">
          
          {!chatActive ? (
            // INTRO VIEW
            <div className="flex-1 p-8 md:p-16 flex flex-col justify-center animate-fade-in pointer-events-auto">
                <div className="space-y-1 mb-8">
                    <span className="text-neuro-gold text-xl md:text-2xl font-serif italic block opacity-80">
                    Tell me
                    </span>
                    <h1 className="text-5xl md:text-7xl font-serif font-medium text-neuro-ivory leading-tight">
                    What are you
                    </h1>
                    <div className="text-5xl md:text-7xl font-serif font-medium text-neuro-gold min-h-[1.2em] leading-tight flex items-center">
                    {text}<span className="animate-pulse font-light ml-1">|</span>
                    </div>
                </div>

                <div className="space-y-2 mb-10">
                    <p className="text-neutral-300 font-light text-lg tracking-wide">
                    EveryHuman has a story.
                    </p>
                    <p className="text-neutral-300 font-light text-lg tracking-wide">
                    Tell yours in scent with our digital perfumer.
                    </p>
                </div>

                <div className="group relative max-w-md w-full">
                    <div className="absolute -inset-0.5 bg-gradient-to-r from-neuro-gold to-neuro-ivory rounded-full blur opacity-20 group-hover:opacity-40 transition duration-500"></div>
                    <div className="relative bg-neuro-charcoal/80 backdrop-blur-md border border-white/10 rounded-full p-2 pl-6 flex items-center justify-between transition-all hover:bg-neuro-charcoal/90">
                    <input 
                        type="text"
                        value={inputValue}
                        onChange={(e) => setInputValue(e.target.value)}
                        onKeyDown={handleKeyDown}
                        placeholder="Start describing..."
                        className="bg-transparent border-none outline-none text-neutral-200 placeholder-neutral-500 font-light text-lg w-full mr-4"
                    />
                    <button 
                        onClick={initChat}
                        className="w-12 h-12 bg-neuro-ivory rounded-full flex items-center justify-center text-neuro-black hover:bg-neuro-gold hover:text-white transition-all transform group-hover:scale-105 shadow-lg shrink-0"
                    >
                        {isLoading ? <Loader2 size={20} className="animate-spin" /> : <ArrowRight size={20} />}
                    </button>
                    </div>
                </div>
            </div>
          ) : (
            // CHAT VIEW
            <div className="flex-1 flex flex-col h-full bg-black/40 backdrop-blur-sm animate-fade-in pointer-events-auto">
                {/* Chat Header */}
                <div className="p-6 border-b border-white/10 flex justify-between items-center bg-neuro-black/50">
                    <div>
                        <span className="text-neuro-gold text-xs uppercase tracking-[0.2em] block">NeuroScent AI</span>
                        <h2 className="font-serif text-xl text-neuro-ivory">Digital Perfumer</h2>
                    </div>
                    <button 
                        onClick={() => { setChatActive(false); setMessages([]); setChatSession(null); }}
                        className="text-gray-500 hover:text-neuro-ivory transition-colors text-xs uppercase tracking-widest flex items-center gap-2"
                    >
                        <RefreshCcw size={14} /> Reset
                    </button>
                </div>

                {/* Messages Area */}
                <div className="flex-1 overflow-y-auto p-6 space-y-6 scrollbar-thin scrollbar-thumb-neuro-gold/20 scrollbar-track-transparent">
                    {messages.map((msg, idx) => (
                        <div key={idx} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                            <div className={`max-w-[85%] p-4 rounded-2xl ${
                                msg.role === 'user' 
                                ? 'bg-neuro-gold/10 border border-neuro-gold/20 text-neuro-ivory rounded-tr-none' 
                                : 'bg-neuro-ivory/5 border border-white/10 text-gray-200 rounded-tl-none font-serif italic text-lg'
                            }`}>
                                {msg.text}
                            </div>
                        </div>
                    ))}
                    {isLoading && (
                        <div className="flex justify-start">
                             <div className="bg-neuro-ivory/5 border border-white/10 text-neuro-gold px-4 py-3 rounded-2xl rounded-tl-none flex items-center gap-2">
                                <span className="w-1.5 h-1.5 bg-neuro-gold rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></span>
                                <span className="w-1.5 h-1.5 bg-neuro-gold rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></span>
                                <span className="w-1.5 h-1.5 bg-neuro-gold rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></span>
                             </div>
                        </div>
                    )}
                    <div ref={messagesEndRef} />
                </div>

                {/* Input Area */}
                <div className="p-6 pt-2">
                    <div className="relative bg-neuro-charcoal/80 border border-white/10 rounded-full p-2 pl-6 flex items-center justify-between transition-all focus-within:border-neuro-gold/50">
                        <input 
                            type="text"
                            value={inputValue}
                            onChange={(e) => setInputValue(e.target.value)}
                            onKeyDown={handleKeyDown}
                            disabled={isLoading}
                            placeholder="Type your reply..."
                            className="bg-transparent border-none outline-none text-neutral-200 placeholder-neutral-500 font-light text-base w-full mr-4 disabled:opacity-50"
                            autoFocus
                        />
                        <button 
                            onClick={handleSendMessage}
                            disabled={isLoading || !inputValue.trim()}
                            className="w-10 h-10 bg-neuro-gold rounded-full flex items-center justify-center text-neuro-black hover:bg-white transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            <Send size={16} />
                        </button>
                    </div>
                </div>
            </div>
          )}
        </div>

        {/* Right content (Spline Scene) - Hidden on mobile when chat is active to give space */}
        <div className={`flex-1 relative min-h-[300px] md:min-h-auto opacity-80 mix-blend-screen transition-opacity duration-500 ${chatActive ? 'hidden md:block md:opacity-40' : 'block'}`}>
          <SplineScene 
            scene="https://prod.spline.design/kZDDjO5HuC9GJUM2/scene.splinecode"
            className="w-full h-full"
          />
        </div>
      </div>
    </Card>
  )
}