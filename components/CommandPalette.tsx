'use client';

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Terminal, X } from 'lucide-react';
import { PERSONAL_INFO, PROJECTS, SKILLS } from '@/lib/constants';

interface CommandOutput {
  id: string;
  type: 'input' | 'output' | 'error';
  content: React.ReactNode;
}

export default function CommandPalette() {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState('');
  const [history, setHistory] = useState<CommandOutput[]>([
    { id: 'welcome', type: 'output', content: 'Welcome to Developer Mode v1.0. Type "help" to see available commands.' }
  ]);
  
  const inputRef = useRef<HTMLInputElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  // Toggle with Ctrl+K
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault();
        setIsOpen((prev) => !prev);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Auto scroll to bottom
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [history, isOpen]);

  // Focus input when opened
  useEffect(() => {
    if (isOpen && inputRef.current) {
      setTimeout(() => inputRef.current?.focus(), 100);
    }
  }, [isOpen]);

  const processCommand = (cmd: string) => {
    const args = cmd.trim().split(' ').filter(Boolean);
    const command = args[0]?.toLowerCase();

    const addOutput = (content: React.ReactNode, type: 'output' | 'error' = 'output') => {
      setHistory(prev => [...prev, { id: Math.random().toString(), type, content }]);
    };

    switch (command) {
      case 'help':
        addOutput(
          <div className="space-y-1">
            <p>Available commands:</p>
            <ul className="list-disc list-inside pl-2 text-slate-400">
              <li><span className="text-sky-400">whoami</span> - Display personal info</li>
              <li><span className="text-sky-400">ls projects</span> - List all projects</li>
              <li><span className="text-sky-400">cat skills</span> - Show technical skills</li>
              <li><span className="text-sky-400">contact</span> - Get contact information</li>
              <li><span className="text-sky-400">clear</span> - Clear the terminal</li>
              <li><span className="text-sky-400">exit</span> - Close the terminal</li>
            </ul>
          </div>
        );
        break;
      case 'whoami':
        addOutput(`${PERSONAL_INFO.name} - ${PERSONAL_INFO.title}\n${PERSONAL_INFO.objective}`);
        break;
      case 'ls':
        if (args[1] === 'projects') {
          addOutput(
            <div className="grid grid-cols-1 gap-2">
              {PROJECTS.map((p, i) => (
                <div key={i}>
                  <span className="text-emerald-400">drwxr-xr-x</span> <span className="text-sky-300">{p.title.replace(/\s+/g, '-').toLowerCase()}</span>
                </div>
              ))}
            </div>
          );
        } else {
          addOutput('Try "ls projects"', 'error');
        }
        break;
      case 'cat':
        if (args[1] === 'skills') {
          addOutput(
            <div>
              {SKILLS.map((s, i) => (
                <div key={i} className="mb-2">
                  <span className="text-sky-400 font-bold">[{s.title}]</span>
                  <p className="text-slate-300">{s.skills.join(', ')}</p>
                </div>
              ))}
            </div>
          );
        } else {
          addOutput('Try "cat skills"', 'error');
        }
        break;
      case 'contact':
        addOutput(
          <div>
            <p>Email: <a href={`mailto:${PERSONAL_INFO.email}`} className="text-sky-400 hover:underline">{PERSONAL_INFO.email}</a></p>
            <p>LinkedIn: <a href={PERSONAL_INFO.socials.find(s => s.name === 'LinkedIn')?.url} target="_blank" className="text-sky-400 hover:underline">Profile</a></p>
            <p>GitHub: <a href={PERSONAL_INFO.socials.find(s => s.name === 'GitHub')?.url} target="_blank" className="text-sky-400 hover:underline">Profile</a></p>
          </div>
        );
        break;
      case 'clear':
        setHistory([]);
        break;
      case 'exit':
        setIsOpen(false);
        break;
      case '':
        break;
      default:
        addOutput(`command not found: ${command}. Type "help" for available commands.`, 'error');
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    setHistory(prev => [...prev, { id: Math.random().toString(), type: 'input', content: input }]);
    processCommand(input);
    setInput('');
  };

  return (
    <>
      {/* Floating Button */}
      <motion.button
        className="fixed bottom-6 left-6 z-50 flex items-center space-x-2 px-4 py-2 rounded-full bg-white/80 dark:bg-slate-950/85 text-slate-800 dark:text-slate-100 border border-slate-200/80 dark:border-slate-800/80 backdrop-blur-xl shadow-xl hover:border-sky-500/50 transition-all font-mono text-xs group"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 1 }}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setIsOpen(true)}
      >
        <Terminal size={14} className="text-sky-500 dark:text-sky-400 group-hover:rotate-12 transition-transform" />
        <span>Dev Mode</span>
      </motion.button>

      {/* Modal */}
      <AnimatePresence>
        {isOpen && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm"
              onClick={() => setIsOpen(false)}
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ type: 'spring', damping: 25, stiffness: 300 }}
              className="relative w-full max-w-2xl bg-slate-950/90 border border-slate-800 rounded-xl shadow-2xl overflow-hidden font-mono text-sm"
              style={{ backdropFilter: 'blur(16px)' }}
            >
              {/* Terminal Header */}
              <div className="flex items-center justify-between px-4 py-2 bg-slate-900 border-b border-slate-800">
                <div className="flex space-x-2">
                  <div className="w-3 h-3 rounded-full bg-red-500/80" />
                  <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
                  <div className="w-3 h-3 rounded-full bg-green-500/80" />
                </div>
                <div className="text-slate-400 text-xs flex-1 text-center">developer-mode ~ zsh</div>
                <button onClick={() => setIsOpen(false)} className="text-slate-400 hover:text-white transition-colors">
                  <X size={16} />
                </button>
              </div>

              {/* Terminal Body */}
              <div 
                ref={scrollRef}
                className="p-4 h-[400px] overflow-y-auto text-slate-300 custom-scrollbar"
              >
                {history.map((item) => (
                  <div key={item.id} className="mb-2">
                    {item.type === 'input' && (
                      <div className="flex items-center text-sky-400">
                        <span className="text-emerald-400 mr-2">➜</span>
                        <span className="text-sky-300 mr-2">~</span>
                        <span className="text-white">{item.content}</span>
                      </div>
                    )}
                    {item.type === 'output' && (
                      <div className="text-slate-300 whitespace-pre-wrap mt-1">{item.content}</div>
                    )}
                    {item.type === 'error' && (
                      <div className="text-red-400 mt-1">{item.content}</div>
                    )}
                  </div>
                ))}
                
                {/* Input line */}
                <form onSubmit={handleSubmit} className="flex items-center mt-2">
                  <span className="text-emerald-400 mr-2">➜</span>
                  <span className="text-sky-300 mr-2">~</span>
                  <input
                    ref={inputRef}
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    className="flex-1 bg-transparent outline-none text-white font-mono"
                    spellCheck="false"
                    autoComplete="off"
                    autoFocus
                  />
                </form>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}
