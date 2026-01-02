
import React, { useState, useRef, useEffect } from 'react';
import { Icons, QUICK_PROMPTS } from '../constants';
import { ChatMessage } from '../types';
import { generateChatResponse } from '../services/geminiService';

const Dashboard: React.FC = () => {
  const [messages, setMessages] = useState<ChatMessage[]>([
    { role: 'assistant', content: 'Hello! I am Nova, your startup consultant. How can I help you build something amazing today?', timestamp: Date.now() }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSend = async (text: string = input) => {
    if (!text.trim() || isLoading) return;

    const userMessage: ChatMessage = { role: 'user', content: text, timestamp: Date.now() };
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    const responseText = await generateChatResponse(text);
    
    const assistantMessage: ChatMessage = { role: 'assistant', content: responseText, timestamp: Date.now() };
    setMessages(prev => [...prev, assistantMessage]);
    setIsLoading(false);
  };

  return (
    <div className="flex flex-col h-full max-h-[calc(100vh-2rem)]">
      <header className="mb-6">
        <h2 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-slate-400">Make Things Simple!</h2>
        <p className="text-slate-400 mt-1">Plan your next billion-dollar startup with AI assistance.</p>
      </header>

      <div className="flex-1 flex flex-col glass-card rounded-3xl overflow-hidden border-white/5 relative">
        <div ref={scrollRef} className="flex-1 p-6 overflow-y-auto space-y-4">
          {messages.map((msg, i) => (
            <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
              <div className={`max-w-[80%] p-4 rounded-2xl ${
                msg.role === 'user' 
                  ? 'bg-blue-600 text-white shadow-lg shadow-blue-500/20' 
                  : 'bg-white/5 border border-white/10 text-slate-200'
              }`}>
                <p className="text-sm whitespace-pre-wrap">{msg.content}</p>
              </div>
            </div>
          ))}
          {isLoading && (
            <div className="flex justify-start">
              <div className="bg-white/5 border border-white/10 p-4 rounded-2xl">
                <div className="flex gap-1">
                  <div className="w-1.5 h-1.5 bg-blue-500 rounded-full animate-bounce"></div>
                  <div className="w-1.5 h-1.5 bg-blue-500 rounded-full animate-bounce [animation-delay:-0.15s]"></div>
                  <div className="w-1.5 h-1.5 bg-blue-500 rounded-full animate-bounce [animation-delay:-0.3s]"></div>
                </div>
              </div>
            </div>
          )}
        </div>

        <div className="p-4 border-t border-white/10 bg-[#020617]/40 backdrop-blur-sm">
          <div className="flex gap-2 mb-3 overflow-x-auto no-scrollbar pb-1">
            {QUICK_PROMPTS.map(p => (
              <button 
                key={p} 
                onClick={() => handleSend(p)}
                className="text-xs px-3 py-1.5 rounded-full border border-white/10 hover:border-blue-500/50 hover:bg-blue-500/10 text-slate-400 transition-all whitespace-nowrap"
              >
                {p}
              </button>
            ))}
          </div>
          
          <div className="flex gap-2">
            <button className="p-2.5 rounded-xl border border-white/10 hover:bg-white/5 transition-colors text-slate-400">
              <Icons.Upload />
            </button>
            <input 
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSend()}
              placeholder="Ask anything about your startup..."
              className="flex-1 bg-white/5 border border-white/10 rounded-xl px-4 text-sm focus:outline-none focus:ring-1 focus:ring-blue-500/50"
            />
            <button 
              onClick={() => handleSend()}
              disabled={isLoading}
              className="p-2.5 bg-blue-600 hover:bg-blue-500 text-white rounded-xl shadow-lg shadow-blue-500/30 transition-all"
            >
              <Icons.Send />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
