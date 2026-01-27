
import React, { useState, useEffect, useRef } from 'react';
import { askRetroAI } from '../../services/geminiService';

const TerminalApp: React.FC = () => {
  const [history, setHistory] = useState<{ type: 'input' | 'output', text: string }[]>([
    { type: 'output', text: 'Microsoft(R) Windows 98' },
    { type: 'output', text: '(C)Copyright Microsoft Corp 1981-1999.' },
    { type: 'output', text: ' ' },
    { type: 'output', text: 'C:\\WINDOWS\\DESKTOP> Type "help" for a list of commands.' },
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [history]);

  const handleCommand = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    const cmd = input.trim().toLowerCase();
    setHistory(prev => [...prev, { type: 'input', text: input }]);
    setInput('');

    if (cmd === 'help') {
        setHistory(prev => [...prev, { type: 'output', text: 'Available commands: ABOUT, PROJECTS, SKILLS, CLEAR, HELP, EXIT, and anything you want to ask RetroBuddy AI.' }]);
        return;
    }
    if (cmd === 'clear') {
        setHistory([]);
        return;
    }
    if (cmd === 'exit') {
        setHistory(prev => [...prev, { type: 'output', text: 'You cannot leave... yet.' }]);
        return;
    }

    setIsLoading(true);
    const aiResponse = await askRetroAI(input, "The user is interacting with your CLI. You are Neo's AI assistant.");
    setHistory(prev => [...prev, { type: 'output', text: aiResponse }]);
    setIsLoading(false);
  };

  return (
    <div className="bg-black h-full flex flex-col p-4 terminal-font text-green-500 overflow-hidden">
      <div className="flex-1 overflow-y-auto space-y-1 mb-2 scrollbar-thin scrollbar-thumb-green-900">
        {history.map((line, i) => (
          <div key={i} className="whitespace-pre-wrap leading-tight text-lg">
            {line.type === 'input' ? `C:\\WINDOWS\\DESKTOP> ${line.text}` : line.text}
          </div>
        ))}
        {isLoading && (
          <div className="animate-pulse">RetroBuddy is thinking... (Modem screeching noises)</div>
        )}
        <div ref={bottomRef} />
      </div>
      
      <form onSubmit={handleCommand} className="flex gap-2 text-lg">
        <span className="shrink-0">C:\WINDOWS\DESKTOP&gt;</span>
        <input 
          autoFocus
          className="bg-transparent outline-none flex-1 caret-green-500"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          disabled={isLoading}
        />
      </form>
    </div>
  );
};

export default TerminalApp;
