/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Send, Bot, User, Loader2, RefreshCw } from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import { Message, UserProfile } from '../types';
import { askFinWise } from '../services/geminiService';

interface Props {
  profile: UserProfile;
  resetProfile: () => void;
}

export default function ChatInterface({ profile, resetProfile }: Props) {
  const [messages, setMessages] = useState<Message[]>([
    { role: 'model', content: `Hi! I'm FinWise AI. Based on your goal of "${profile.goal}", how can I help you today?` }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMsg = input.trim();
    setInput('');
    setMessages(prev => [...prev, { role: 'user', content: userMsg }]);
    setIsLoading(true);

    try {
      const response = await askFinWise(userMsg, profile);
      setMessages(prev => [...prev, { role: 'model', content: response }]);
    } catch (error) {
      setMessages(prev => [...prev, { role: 'model', content: "Sorry, I had a digital hiccup. Could you try asking that again?" }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col h-full bg-surface border border-border shadow-2xl relative">
      {/* Header */}
      <div className="px-6 py-4 border-b border-border flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-2 h-2 rounded-full bg-accent animate-pulse" />
          <h2 className="font-mono text-xs uppercase tracking-[2px] text-text-dim">
            Active Reasoning Session
          </h2>
        </div>
        <button
          onClick={resetProfile}
          className="font-mono text-[10px] uppercase tracking-widest text-text-dim hover:text-accent transition-colors flex items-center gap-2"
        >
          <RefreshCw className="w-3 h-3" />
          Reconfigure System
        </button>
      </div>

      {/* Messages */}
      <div 
        ref={scrollRef}
        className="flex-1 overflow-y-auto p-8 space-y-10 bg-[rgba(255,255,255,0.01)]"
      >
        <AnimatePresence initial={false}>
          {messages.map((msg, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: msg.role === 'user' ? 20 : -20 }}
              animate={{ opacity: 1, x: 0 }}
              className={`flex flex-col ${msg.role === 'user' ? 'items-end text-right' : 'items-start text-left'}`}
            >
              <div className="font-mono text-[9px] uppercase tracking-widest text-text-dim mb-2">
                // {msg.role === 'user' ? 'USER_INPUT' : 'FINWISE_OUTPUT'}
              </div>
              <div className={`max-w-[85%] rounded-sm ${
                msg.role === 'user' 
                  ? 'text-accent' 
                  : 'text-text'
              }`}>
                <div className="prose prose-invert prose-sm max-w-none">
                  <ReactMarkdown>{msg.content}</ReactMarkdown>
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
        {isLoading && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex items-center gap-3 font-mono text-[10px] text-accent tracking-widest uppercase"
          >
            <Loader2 className="w-3 h-3 animate-spin" />
            Analyzing Data...
          </motion.div>
        )}
      </div>

      {/* Input */}
      <div className="p-6 border-t border-border bg-bg">
        <div className="relative flex items-center">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSend()}
            placeholder="INPUT_QUERY_HERE..."
            className="w-full bg-surface border border-border px-6 py-5 text-accent font-mono text-sm tracking-wide focus:border-accent outline-none transition-all placeholder:text-[#333]"
          />
          <button
            onClick={handleSend}
            disabled={!input.trim() || isLoading}
            className="absolute right-4 p-2 text-text-dim hover:text-accent disabled:opacity-30 transition-all"
          >
            <Send className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
}
