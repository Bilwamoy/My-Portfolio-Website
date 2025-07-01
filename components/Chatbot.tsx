'use client';

import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Bot, X, Send, User } from 'lucide-react';

type Message = {
  role: 'user' | 'model';
  text: string;
};

const Chatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const chatContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    const userMessage: Message = { role: 'user', text: input };
    setMessages((prev) => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    try {
        const response = await fetch('/api/chat', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ message: input, history: messages }),
        });
        
        if (!response.body) {
            throw new Error("No response body");
        }

        const reader = response.body.getReader();
        const decoder = new TextDecoder();
        let modelResponse = '';
        
        setMessages((prev) => [...prev, { role: 'model', text: '' }]);

        while (true) {
            const { done, value } = await reader.read();
            if (done) break;
            
            const chunk = decoder.decode(value, { stream: true });
            modelResponse += chunk;

            setMessages((prev) => {
                const newMessages = [...prev];
                newMessages[newMessages.length - 1].text = modelResponse;
                return newMessages;
            });
        }

    } catch (error) {
      console.error('Error fetching AI response:', error);
      setMessages((prev) => [...prev, { role: 'model', text: 'Sorry, I encountered an error. Please try again.' }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 50, scale: 0.9 }}
            transition={{ duration: 0.3, ease: 'easeOut' }}
            className="fixed bottom-24 right-5 w-full max-w-sm h-[70vh] max-h-[600px] bg-[#111111] border border-white/[0.2] rounded-2xl shadow-2xl flex flex-col z-50"
          >
            <header className="flex items-center justify-between p-4 border-b border-white/[0.2]">
              <div className="flex items-center gap-2">
                <Bot className="text-violet-400" />
                <h3 className="font-semibold">AI Assistant</h3>
              </div>
              <button onClick={() => setIsOpen(false)} className="p-1 rounded-full hover:bg-white/10">
                <X size={20} />
              </button>
            </header>
            <div ref={chatContainerRef} className="flex-1 p-4 overflow-y-auto space-y-4">
              {messages.map((msg, index) => (
                <div key={index} className={`flex gap-3 ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                  {msg.role === 'model' && <div className="w-8 h-8 rounded-full bg-violet-500 flex items-center justify-center flex-shrink-0"><Bot size={20} /></div>}
                  <div className={`max-w-xs md:max-w-sm rounded-2xl px-4 py-2 ${msg.role === 'user' ? 'bg-violet-600 rounded-br-none' : 'bg-neutral-700 rounded-bl-none'}`}>
                    <p className="text-sm whitespace-pre-wrap">{msg.text}</p>
                  </div>
                   {msg.role === 'user' && <div className="w-8 h-8 rounded-full bg-neutral-600 flex items-center justify-center flex-shrink-0"><User size={20} /></div>}
                </div>
              ))}
               {isLoading && (
                    <div className="flex gap-3 justify-start">
                         <div className="w-8 h-8 rounded-full bg-violet-500 flex items-center justify-center flex-shrink-0"><Bot size={20} /></div>
                         <div className="max-w-xs md:max-w-sm rounded-2xl px-4 py-2 bg-neutral-700 rounded-bl-none flex items-center">
                            <div className="w-2 h-2 bg-white rounded-full animate-bounce [animation-delay:-0.3s]"></div>
                            <div className="w-2 h-2 bg-white rounded-full animate-bounce [animation-delay:-0.15s] mx-1"></div>
                            <div className="w-2 h-2 bg-white rounded-full animate-bounce"></div>
                        </div>
                    </div>
                )}
            </div>
            <form onSubmit={handleSubmit} className="p-4 border-t border-white/[0.2] flex items-center gap-2">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ask me anything..."
                className="flex-1 w-full px-4 py-2 rounded-lg bg-white/5 border border-white/10 focus:ring-2 focus:ring-violet-500 focus:outline-none"
                disabled={isLoading}
              />
              <button type="submit" className="p-2 text-white bg-violet-600 rounded-full disabled:opacity-50 disabled:cursor-not-allowed" disabled={isLoading || !input.trim()}>
                <Send size={20} />
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-5 right-5 w-16 h-16 bg-gradient-to-r from-violet-600 to-indigo-600 rounded-full flex items-center justify-center text-white shadow-lg z-50"
        aria-label="Toggle Chatbot"
      >
        <AnimatePresence mode="wait">
            <motion.div
                key={isOpen ? 'close' : 'bot'}
                initial={{ opacity: 0, rotate: -30, y: 10 }}
                animate={{ opacity: 1, rotate: 0, y: 0 }}
                exit={{ opacity: 0, rotate: 30, y: 10 }}
                transition={{ duration: 0.2 }}
            >
                {isOpen ? <X size={28} /> : <Bot size={28} />}
            </motion.div>
        </AnimatePresence>
      </motion.button>
    </>
  );
};

export default Chatbot;