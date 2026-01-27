
import React, { useState, useRef, useEffect } from 'react';
import { GuestbookEntry } from '../../types';
import { getGuestbookAIFeedback } from '../../services/geminiService';

const INITIAL_ENTRIES: GuestbookEntry[] = [
  { 
    name: 'Webmaster99', 
    message: 'Cool page! Love the blink tags. Keep it up!', 
    date: '1999-10-24', 
    aiResponse: 'Radical dude! The blink tags were expensive to host back then.' 
  },
  { 
    name: 'CoolCat_xXx', 
    message: 'Found this via AltaVista. Very nostalgic!', 
    date: '2024-05-12',
    aiResponse: 'AltaVista? Now that is a name I haven\'t heard in a long time. Welcome to the future!' 
  },
];

const GuestbookApp: React.FC = () => {
  const [entries, setEntries] = useState<GuestbookEntry[]>(INITIAL_ENTRIES);
  const [name, setName] = useState('');
  const [message, setMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [entries]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !message.trim() || isSubmitting) return;

    setIsSubmitting(true);
    const newEntry: GuestbookEntry = {
      name,
      message,
      date: new Date().toISOString().split('T')[0],
    };

    try {
      const aiFeedback = await getGuestbookAIFeedback({ name, message });
      newEntry.aiResponse = aiFeedback;
    } catch (err) {
      newEntry.aiResponse = "Thanks for signing! (AI was busy drinking Surge)";
    }

    setEntries(prev => [...prev, newEntry]);
    setName('');
    setMessage('');
    setIsSubmitting(false);
  };

  return (
    <div className="flex flex-col h-full bg-white font-sans overflow-hidden">
      {/* Header */}
      <div className="bg-[#000080] text-white p-2 text-center font-bold italic tracking-wider shrink-0">
        THE OFFICIAL GUESTBOOK - PLEASE SIGN BELOW!
      </div>

      {/* Entries List */}
      <div 
        ref={scrollRef}
        className="flex-1 overflow-y-auto p-4 space-y-4 bg-[url('https://www.transparenttextures.com/patterns/notebook.png')] bg-repeat"
      >
        {entries.map((entry, i) => (
          <div key={i} className="retro-border-outset p-3 bg-white/90 shadow-sm animate-in slide-in-from-bottom-2 duration-300">
            <div className="flex justify-between items-start mb-2 border-b border-dotted border-gray-400 pb-1">
              <span className="font-bold text-blue-800 text-sm">From: {entry.name}</span>
              <span className="text-[10px] text-gray-500 uppercase">{entry.date}</span>
            </div>
            <p className="text-sm italic mb-3">"{entry.message}"</p>
            
            {entry.aiResponse && (
              <div className="mt-2 p-2 bg-yellow-50 border border-yellow-200 text-xs flex gap-2">
                <span className="shrink-0">🤖</span>
                <div>
                  <span className="font-bold text-yellow-800">RetroBuddy:</span>
                  <p className="text-gray-700 mt-1">{entry.aiResponse}</p>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Form */}
      <div className="retro-border-inset m-2 p-4 bg-[#c0c0c0] shrink-0">
        <h3 className="text-xs font-bold mb-3 uppercase flex items-center gap-2">
          <span className="text-xl">✍️</span> Add your entry
        </h3>
        <form onSubmit={handleSubmit} className="space-y-3">
          <div className="flex flex-col gap-1">
            <label className="text-[10px] font-bold uppercase">Name / Alias:</label>
            <input 
              className="retro-border-inset px-2 py-1 text-sm outline-none focus:bg-yellow-50"
              value={name}
              onChange={e => setName(e.target.value)}
              placeholder="e.g. HackerMan92"
              required
            />
          </div>
          <div className="flex flex-col gap-1">
            <label className="text-[10px] font-bold uppercase">Message:</label>
            <textarea 
              className="retro-border-inset px-2 py-1 text-sm outline-none min-h-[60px] focus:bg-yellow-50"
              value={message}
              onChange={e => setMessage(e.target.value)}
              placeholder="Your message to the world..."
              required
            />
          </div>
          <button 
            type="submit"
            disabled={isSubmitting}
            className={`w-full retro-border-outset py-2 text-sm font-bold active:retro-border-inset bg-[#c0c0c0] hover:bg-[#d0d0d0] ${isSubmitting ? 'opacity-50 cursor-wait' : ''}`}
          >
            {isSubmitting ? 'Sending via 56k Modem...' : 'SIGN GUESTBOOK'}
          </button>
        </form>
      </div>

      <div className="text-[10px] text-center pb-2 text-gray-500">
        Member of the <span className="underline cursor-pointer text-blue-600">Retro WebRing</span>
      </div>
    </div>
  );
};

export default GuestbookApp;
