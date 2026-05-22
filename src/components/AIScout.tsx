import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ChatMessage } from '../types';
import { LucideIcon } from './LucideIcon';

interface AIScoutProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectTool: (toolId: string) => void;
}

export function AIScout({ isOpen, onClose, onSelectTool }: AIScoutProps) {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'welcome',
      sender: 'ai',
      text: "Affirmative, terminal active. I am ZORL Scan Assistant. Supply a natural query detailing your engineering goals, and I will filter the galaxy's elite AI directory to map optimal tools to your current orbit.",
      timestamp: '10:24',
    },
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement | null>(null);

  const starterPrompts = [
    'Autonomous agents to help write TS/JS apps',
    '3D image synthesizers & texture editors',
    'Podcasting models to clone vocals',
    'Sovereign math proofs logic calculators',
  ];

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isLoading]);

  const handleSend = async (textToSend: string) => {
    if (!textToSend.trim() || isLoading) return;

    const userMsg: ChatMessage = {
      id: Date.now().toString(),
      sender: 'user',
      text: textToSend,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages((prev) => [...prev, userMsg]);
    setInput('');
    setIsLoading(true);

    try {
      const response = await fetch('/api/gemini/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt: textToSend }),
      });

      if (!response.ok) {
        throw new Error('API downlink failure.');
      }

      const data = await response.json();
      const aiResponseText = data.text || "Diagnostic trace failed. Uplink unreachable.";

      const aiMsg: ChatMessage = {
        id: (Date.now() + 1).toString(),
        sender: 'ai',
        text: aiResponseText,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };

      setMessages((prev) => [...prev, aiMsg]);
    } catch (err: any) {
      setMessages((prev) => [
        ...prev,
        {
          id: (Date.now() + 1).toString(),
          sender: 'ai',
          text: `Neural downlink exception: ${err?.message || 'Standard error parsing response'}. Please make sure you have loaded your GEMINI_API_KEY in the Settings > Secrets tab.`,
          timestamp: 'ERROR',
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-y-0 right-0 z-50 w-full sm:max-w-md flex">
          {/* Sizable dim backdrop clickable */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.5 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/60 backdrop-blur-md z-40"
          />

          {/* Sizable Sidebar wrapper */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 220 }}
            className="relative h-full flex flex-col glass-panel-strong border-l border-white/10 z-50 w-full"
          >
            {/* Side neon glow accents */}
            <div className="absolute top-[20%] left-0 w-[150px] h-[350px] bg-cyan-500/10 blur-[90px] rounded-full pointer-events-none" />

            {/* Sidebar header */}
            <div className="relative p-6 border-b border-white/5 flex items-center justify-between z-10">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-cyan-500 to-indigo-500/20 border border-cyan-400/30 flex items-center justify-center">
                  <LucideIcon name="Sparkles" className="w-4 h-4 text-cyan-400 animate-spin-slow" />
                </div>
                <div>
                  <h3 className="font-display text-sm font-bold text-white">AI Scout</h3>
                  <div className="flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                    <span className="text-[10px] text-slate-500">Powered by Gemini</span>
                  </div>
                </div>
              </div>

              <button
                onClick={onClose}
                className="p-2 bg-white/5 border border-white/5 hover:border-white/10 text-slate-400 hover:text-white rounded-xl transition"
              >
                <LucideIcon name="X" className="w-3.5 h-3.5" />
              </button>
            </div>

            {/* Messages box area */}
            <div
              ref={scrollRef}
              className="flex-1 overflow-y-auto p-6 space-y-4 relative z-10 custom-scrollbar"
            >
              {messages.map((msg) => (
                <div
                  key={msg.id}
                  className={`flex flex-col ${msg.sender === 'user' ? 'items-end' : 'items-start'}`}
                >
                  <div className="flex items-center gap-1.5 mb-1">
                    <span className="text-[9px] font-mono uppercase tracking-wider text-slate-500">
                      {msg.sender === 'user' ? 'Local Tenant' : 'Scout Core'}
                    </span>
                    <span className="text-[9px] font-mono text-slate-600">•</span>
                    <span className="text-[9px] font-mono text-slate-600">{msg.timestamp}</span>
                  </div>

                  <div
                    className={`text-xs p-3.5 rounded-2xl max-w-[88%] border leading-relaxed ${
                      msg.sender === 'user'
                        ? 'bg-gradient-to-tr from-violet-600/25 to-indigo-600/15 border-violet-500/20 text-white shadow-[0_4px_15px_rgba(139,92,246,0.1)]'
                        : 'bg-slate-900/85 border-white/5 text-slate-300 shadow-[0_4px_15px_rgba(0,0,0,0.4)]'
                    }`}
                  >
                    {msg.text}
                  </div>
                </div>
              ))}

              {isLoading && (
                <div className="flex flex-col items-start">
                  <div className="flex items-center gap-1.5 mb-1">
                    <span className="text-[9px] font-mono uppercase tracking-wider text-slate-500">Scout Core</span>
                    <span className="text-[9px] font-mono text-slate-600">•</span>
                    <span className="text-[9px] font-mono text-slate-600 animate-pulse">scanning...</span>
                  </div>
                  <div className="flex gap-1.5 items-center bg-slate-900 border border-white/5 p-3.5 rounded-2xl text-slate-400 text-xs text-center">
                    <LucideIcon name="Sparkles" className="w-3.5 h-3.5 text-cyan-400 animate-pulse" />
                    <span className="font-mono text-[10px] uppercase">Retrieving celestial repositories...</span>
                  </div>
                </div>
              )}
            </div>

            {/* Selector helper boxes */}
            {messages.length === 1 && (
              <div className="px-6 py-3 border-t border-white/5 bg-slate-950/40 relative z-10">
                <span className="text-[10px] font-mono text-slate-500 uppercase tracking-widest block mb-2">Suggested queries:</span>
                <div className="space-y-1.5">
                  {starterPrompts.map((p, idx) => (
                    <button
                      key={idx}
                      onClick={() => handleSend(p)}
                      className="w-full text-left font-sans text-xs text-slate-400 hover:text-cyan-300 border border-white/5 bg-slate-900 px-3 py-2 rounded-xl transition hover:border-cyan-500/20 text-ellipsis overflow-hidden whitespace-nowrap cursor-pointer"
                    >
                      {p}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Input keyboard region */}
            <div className="p-6 border-t border-white/5 relative z-10 bg-slate-950">
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  handleSend(input);
                }}
                className="flex gap-2"
              >
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Ask scout to map a requirement..."
                  className="flex-1 bg-slate-900 border border-white/5 rounded-xl px-4 py-3 text-xs text-slate-200 outline-none ring-0 placeholder-slate-500 focus:border-cyan-500/30 transition-colors"
                />
                <button
                  type="submit"
                  disabled={isLoading || !input.trim()}
                  className="p-3 bg-gradient-to-r from-cyan-600 to-indigo-600 hover:from-cyan-500 hover:to-indigo-500 text-white rounded-xl border border-cyan-400/20 hover:shadow-[0_0_15px_rgba(6,182,212,0.3)] duration-300 disabled:opacity-40 cursor-pointer"
                >
                  <LucideIcon name="Send" className="w-3.5 h-3.5" />
                </button>
              </form>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
