import React, { useState, useRef, useEffect } from 'react';
import {
  X,
  Send,
  Sparkles,
  Bot,
  User,
  RotateCcw,
  Minimize2,
  Maximize2,
} from 'lucide-react';

export interface ChatMessage {
  id: string;
  role: 'user' | 'model';
  text: string;
  timestamp: string;
}

export const GeminiChatbot: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const [inputMessage, setInputMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [errorNotice, setErrorNotice] = useState<string | null>(null);

  const [messages, setMessages] = useState<ChatMessage[]>(() => [
    {
      id: 'welcome-1',
      role: 'model',
      text: "👋 Hello! I am **Muxie**, your official Code Mux AI guide.\nAsk me about our courses, concrete skill outcomes, or navigating the platform.\nWhat domain, age track, or learning goal would you like to explore today?",
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    },
  ]);

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    const handleOpen = () => setIsOpen(true);
    window.addEventListener('open-ask-muxie', handleOpen);
    return () => window.removeEventListener('open-ask-muxie', handleOpen);
  }, []);

  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
      setTimeout(() => inputRef.current?.focus(), 150);
    }
  }, [isOpen, messages]);

  const handleSendMessage = async (textToSend?: string) => {
    const text = (textToSend || inputMessage).trim();
    if (!text || isLoading) return;

    const userMessage: ChatMessage = {
      id: 'msg-' + Date.now(),
      role: 'user',
      text,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputMessage('');
    setIsLoading(true);
    setErrorNotice(null);

    try {
      // Build history including current message
      const historyPayload = [...messages, userMessage].map((m) => ({
        role: m.role,
        text: m.text,
      }));

      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          messages: historyPayload,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || 'Failed to receive response from Muxie.');
      }

      const botMessage: ChatMessage = {
        id: 'msg-' + (Date.now() + 1),
        role: 'model',
        text: data.text,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };

      setMessages((prev) => [...prev, botMessage]);
    } catch (err: any) {
      console.error('Chat error:', err);
      setErrorNotice(err.message || 'Unable to connect to Muxie. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleClearChat = () => {
    setMessages([
      {
        id: 'welcome-reset',
        role: 'model',
        text: "✨ Conversation reset! I'm **Muxie**, your Code Mux AI guide.\nAsk me about our courses, concrete skill outcomes, or website features.\nHow can I help you find the right path today?",
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      },
    ]);
    setErrorNotice(null);
  };

  const promptSuggestions = [
    { label: '📚 Courses & Outcomes', text: 'What courses does Code Mux deliver and what are the specific learning outcomes after completing them?' },
    { label: '👶 School Tracks (5-17)', text: 'What courses do you teach for school students (5-17) and what skills and outcomes will they achieve?' },
    { label: '💼 Career Tracks (18+)', text: 'What career specializations do you offer for university/graduates and what are the tangible job/skill outcomes?' },
    { label: '🌐 About Code Mux Website', text: 'Tell me about the Code Mux website and what visitors and learners can do here.' },
    { label: '💻 Test Demo Portals', text: 'How can I test-drive the Student and Mentor demo portals on this website?' },
    { label: '🌍 Global Timezones', text: 'How does Code Mux accommodate international students across US, UK, UAE, and India?' },
  ];

  return (
    <>
      {/* Floating Launcher Button */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="fixed bottom-6 right-6 z-40 bg-gradient-to-r from-[#FF6B16] to-orange-600 text-white p-3.5 sm:px-4 sm:py-3.5 rounded-full shadow-2xl hover:scale-105 active:scale-95 transition-all flex items-center gap-2 cursor-pointer group border-2 border-white/90"
          aria-label="Open Ask Muxie Chat"
        >
          <div className="relative">
            <Sparkles className="w-5 h-5 text-amber-200 group-hover:rotate-12 transition-transform" />
            <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-emerald-400 rounded-full border border-white animate-pulse" />
          </div>
          <span className="text-xs sm:text-sm font-bold font-display pr-1">
            Ask Muxie
          </span>
        </button>
      )}

      {/* Chat Window */}
      {isOpen && (
        <div
          className={`fixed z-50 bg-white rounded-3xl shadow-2xl border border-stone-200 overflow-hidden flex flex-col transition-all duration-300 animate-in fade-in slide-in-from-bottom-6 ${
            isExpanded
              ? 'inset-4 sm:inset-10 max-w-4xl max-h-[90vh] mx-auto'
              : 'bottom-4 right-4 sm:bottom-6 sm:right-6 w-[95vw] sm:w-[420px] h-[600px] max-h-[85vh]'
          }`}
        >
          {/* Header */}
          <div className="bg-gradient-to-r from-stone-900 via-stone-800 to-stone-900 text-white p-3.5 sm:p-4 flex items-center justify-between border-b border-stone-800">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-orange-500/20 border border-orange-500/40 flex items-center justify-center text-[#FF6B16]">
                <Bot className="w-5 h-5" />
              </div>
              <div>
                <div className="flex items-center gap-1.5">
                  <h3 className="text-sm font-bold font-display">Ask Muxie</h3>
                  <span className="px-1.5 py-0.2 rounded text-[10px] bg-orange-500/30 text-orange-300 border border-orange-500/30 font-medium">
                    Official Guide
                  </span>
                </div>
                <p className="text-[11px] text-stone-400">
                  Website, Delivery &amp; Curriculum Assistant
                </p>
              </div>
            </div>

            <div className="flex items-center gap-1 text-stone-400">
              <button
                onClick={handleClearChat}
                className="p-1.5 hover:text-white hover:bg-stone-800 rounded-lg transition-colors cursor-pointer"
                title="Reset Conversation"
              >
                <RotateCcw className="w-4 h-4" />
              </button>
              <button
                onClick={() => setIsExpanded(!isExpanded)}
                className="p-1.5 hover:text-white hover:bg-stone-800 rounded-lg transition-colors cursor-pointer hidden sm:block"
                title={isExpanded ? 'Collapse' : 'Expand'}
              >
                {isExpanded ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
              </button>
              <button
                onClick={() => setIsOpen(false)}
                className="p-1.5 hover:text-white hover:bg-stone-800 rounded-lg transition-colors cursor-pointer"
                title="Close Chat"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Messages Scrollable Thread */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-white">
            {messages.map((m) => {
              const isBot = m.role === 'model';
              return (
                <div
                  key={m.id}
                  className={`flex items-start gap-2.5 ${isBot ? 'justify-start' : 'justify-end'}`}
                >
                  {isBot && (
                    <div className="w-7 h-7 rounded-lg bg-orange-100 text-[#FF6B16] flex items-center justify-center shrink-0 mt-0.5 border border-orange-200">
                      <Sparkles className="w-3.5 h-3.5" />
                    </div>
                  )}

                  <div className={`max-w-[85%] space-y-1 ${isBot ? 'text-left' : 'text-right'}`}>
                    <div
                      className={`p-3 sm:p-3.5 rounded-2xl text-xs sm:text-sm leading-relaxed whitespace-pre-wrap break-words ${
                        isBot
                          ? 'bg-[#FAF8F5] text-stone-800 border border-stone-200 shadow-2xs'
                          : 'bg-[#FF6B16] text-white shadow-xs rounded-tr-none'
                      }`}
                    >
                      {m.text}
                    </div>

                    <div className="flex items-center gap-1.5 px-1 text-[10px] text-stone-400">
                      <span>{m.timestamp}</span>
                    </div>
                  </div>

                  {!isBot && (
                    <div className="w-7 h-7 rounded-lg bg-stone-900 text-white flex items-center justify-center shrink-0 mt-0.5">
                      <User className="w-3.5 h-3.5" />
                    </div>
                  )}
                </div>
              );
            })}

            {/* Loading Indicator */}
            {isLoading && (
              <div className="flex items-start gap-2.5">
                <div className="w-7 h-7 rounded-lg bg-orange-100 text-[#FF6B16] flex items-center justify-center shrink-0 mt-0.5 border border-orange-200">
                  <Sparkles className="w-3.5 h-3.5 animate-spin" />
                </div>
                <div className="p-3 rounded-2xl bg-[#FAF8F5] border border-stone-200 text-xs text-stone-600 flex items-center gap-2">
                  <div className="flex items-center gap-1">
                    <span className="w-1.5 h-1.5 bg-[#FF6B16] rounded-full animate-bounce [animation-delay:-0.3s]" />
                    <span className="w-1.5 h-1.5 bg-[#FF6B16] rounded-full animate-bounce [animation-delay:-0.15s]" />
                    <span className="w-1.5 h-1.5 bg-[#FF6B16] rounded-full animate-bounce" />
                  </div>
                  <span>Muxie is answering...</span>
                </div>
              </div>
            )}

            {/* Error Banner */}
            {errorNotice && (
              <div className="p-3 rounded-xl bg-rose-50 border border-rose-200 text-xs text-rose-700 flex flex-col gap-1">
                <span className="font-semibold">Notice:</span>
                <span>{errorNotice}</span>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Quick-Prompt Suggestions */}
          <div className="px-3 pt-2 pb-1 bg-stone-50/80 border-t border-stone-200 flex items-center gap-1.5 overflow-x-auto no-scrollbar text-xs">
            <span className="text-[10px] text-stone-400 font-semibold uppercase shrink-0">Try:</span>
            {promptSuggestions.map((s, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => handleSendMessage(s.text)}
                disabled={isLoading}
                className="whitespace-nowrap px-2.5 py-1 rounded-full bg-white border border-stone-200 hover:border-orange-300 hover:bg-orange-50 text-[11px] text-stone-700 transition-colors cursor-pointer disabled:opacity-50"
              >
                {s.label}
              </button>
            ))}
          </div>

          {/* Input Form */}
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSendMessage();
            }}
            className="p-3 bg-white border-t border-stone-200 flex items-center gap-2"
          >
            <input
              ref={inputRef}
              type="text"
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              placeholder="Ask Muxie about what we deliver, courses, or website features..."
              disabled={isLoading}
              className="flex-1 bg-[#FAF8F5] border border-stone-300 rounded-xl px-3.5 py-2.5 text-xs sm:text-sm text-stone-900 placeholder-stone-400 focus:outline-none focus:border-[#FF6B16] transition-colors"
            />
            <button
              type="submit"
              disabled={isLoading || !inputMessage.trim()}
              className="p-2.5 rounded-xl bg-[#FF6B16] hover:bg-orange-600 text-white disabled:opacity-40 disabled:cursor-not-allowed transition-all shadow-xs cursor-pointer"
              title="Send Message"
            >
              <Send className="w-4 h-4" />
            </button>
          </form>
        </div>
      )}
    </>
  );
};
