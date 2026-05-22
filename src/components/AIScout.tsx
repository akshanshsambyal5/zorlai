import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ChatMessage, AITool } from '../types';
import { LucideIcon } from './LucideIcon';
import { askAIScout, rankToolsForQuery } from '../lib/aiScout';
import { ensureArray } from '../lib/safeArray';

interface AIScoutProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectTool: (toolId: string) => void;
  tools: AITool[];
}

export function AIScout({ isOpen, onClose, onSelectTool, tools }: AIScoutProps) {
  const catalog = ensureArray(tools);

  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'welcome',
      sender: 'ai',
      text: 'I am ZorlAI Scout. Describe what you want to build or automate, and I will recommend tools from our live directory.',
      timestamp: 'now',
    },
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [lastMatches, setLastMatches] = useState<ReturnType<typeof rankToolsForQuery>>([]);
  const scrollRef = useRef<HTMLDivElement | null>(null);

  const starterPrompts = [
    'Autonomous agents to help write TS/JS apps',
    '3D image synthesizers and texture editors',
    'Podcasting tools to clone vocals',
    'Research assistants for academic papers',
  ];

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isLoading, lastMatches]);

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
    setLastMatches([]);

    try {
      const { text, source } = await askAIScout(textToSend, catalog);
      const matches = rankToolsForQuery(textToSend, catalog);
      setLastMatches(matches);

      const suffix =
        source === 'local'
          ? '\n\n*(Using on-device matching — add GEMINI_API_KEY and run `npm run dev` for full AI answers.)*'
          : '';

      const aiMsg: ChatMessage = {
        id: (Date.now() + 1).toString(),
        sender: 'ai',
        text: text + suffix,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };

      setMessages((prev) => [...prev, aiMsg]);
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : 'Something went wrong';
      setMessages((prev) => [
        ...prev,
        {
          id: (Date.now() + 1).toString(),
          sender: 'ai',
          text: `Scout error: ${message}. Try again or browse Explore.`,
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
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.5 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/60 backdrop-blur-md z-40"
          />

          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 220 }}
            className="relative h-full flex flex-col glass-panel-strong border-l border-white/10 z-50 w-full"
          >
            <div className="absolute top-[20%] left-0 w-[150px] h-[350px] bg-cyan-500/10 blur-[90px] rounded-full pointer-events-none" />

            <div className="relative p-6 border-b border-white/5 flex items-center justify-between z-10">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-cyan-500 to-indigo-500/20 border border-cyan-400/30 flex items-center justify-center">
                  <LucideIcon name="Sparkles" className="w-4 h-4 text-cyan-400 animate-spin-slow" />
                </div>
                <div>
                  <h3 className="font-display text-sm font-bold text-white">AI Scout</h3>
                  <div className="flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                    <span className="text-[10px] text-slate-500">
                      {catalog.length > 0 ? `${catalog.length} tools indexed` : 'Loading catalog…'}
                    </span>
                  </div>
                </div>
              </div>

              <button
                type="button"
                onClick={onClose}
                className="p-2 bg-white/5 border border-white/5 hover:border-white/10 text-slate-400 hover:text-white rounded-xl transition touch-manipulation"
              >
                <LucideIcon name="Close" className="w-3.5 h-3.5" />
              </button>
            </div>

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
                      {msg.sender === 'user' ? 'You' : 'Scout'}
                    </span>
                    <span className="text-[9px] font-mono text-slate-600">•</span>
                    <span className="text-[9px] font-mono text-slate-600">{msg.timestamp}</span>
                  </div>

                  <div
                    className={`text-xs p-3.5 rounded-2xl max-w-[88%] border leading-relaxed whitespace-pre-wrap ${
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
                  <div className="flex gap-1.5 items-center bg-slate-900 border border-white/5 p-3.5 rounded-2xl text-slate-400 text-xs">
                    <LucideIcon name="Sparkles" className="w-3.5 h-3.5 text-cyan-400 animate-pulse" />
                    <span className="font-mono text-[10px] uppercase">Searching directory…</span>
                  </div>
                </div>
              )}

              {!isLoading && lastMatches.length > 0 && (
                <div className="space-y-2 pt-2">
                  <span className="text-[10px] font-mono text-slate-500 uppercase tracking-widest">Open a match</span>
                  {lastMatches.map(({ tool }) => (
                    <button
                      key={tool.id}
                      type="button"
                      onClick={() => {
                        onSelectTool(tool.id);
                        onClose();
                      }}
                      className="w-full text-left px-3 py-2.5 rounded-xl border border-cyan-500/20 bg-slate-900/80 hover:bg-slate-800 transition touch-manipulation min-h-[44px]"
                    >
                      <span className="text-sm font-medium text-cyan-200 block">{tool.name}</span>
                      <span className="text-[11px] text-slate-500 line-clamp-1">{tool.tagline}</span>
                    </button>
                  ))}
                </div>
              )}
            </div>

            {messages.length === 1 && (
              <div className="px-6 py-3 border-t border-white/5 bg-slate-950/40 relative z-10">
                <span className="text-[10px] font-mono text-slate-500 uppercase tracking-widest block mb-2">
                  Suggested queries:
                </span>
                <div className="space-y-1.5">
                  {starterPrompts.map((p, idx) => (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => handleSend(p)}
                      disabled={isLoading || catalog.length === 0}
                      className="w-full text-left font-sans text-xs text-slate-400 hover:text-cyan-300 border border-white/5 bg-slate-900 px-3 py-2.5 rounded-xl transition hover:border-cyan-500/20 min-h-[44px] touch-manipulation disabled:opacity-40"
                    >
                      {p}
                    </button>
                  ))}
                </div>
              </div>
            )}

            <div className="p-6 border-t border-white/5 relative z-10 bg-slate-950 safe-bottom">
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
                  placeholder={catalog.length ? 'Ask Scout to map a requirement…' : 'Waiting for tools catalog…'}
                  disabled={catalog.length === 0}
                  className="flex-1 bg-slate-900 border border-white/5 rounded-xl px-4 py-3 text-xs text-slate-200 outline-none placeholder-slate-500 focus:border-cyan-500/30 transition-colors min-h-[44px]"
                />
                <button
                  type="submit"
                  disabled={isLoading || !input.trim() || catalog.length === 0}
                  className="p-3 min-h-[44px] min-w-[44px] bg-gradient-to-r from-cyan-600 to-indigo-600 hover:from-cyan-500 hover:to-indigo-500 text-white rounded-xl border border-cyan-400/20 disabled:opacity-40 touch-manipulation flex items-center justify-center"
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
