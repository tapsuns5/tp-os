
import React, { useState } from 'react';
import { AppId, WindowState } from '../types';

interface TaskbarProps {
  windows: Record<AppId, WindowState>;
  activeWindowId: AppId | null;
  onAppClick: (id: AppId) => void;
  time: Date;
  onToggleView?: () => void;
}

const Taskbar: React.FC<TaskbarProps> = ({ windows, activeWindowId, onAppClick, time, onToggleView }) => {
  const [startMenuOpen, setStartMenuOpen] = useState(false);

  return (
    <div className="h-10 retro-border-outset border-x-0 border-b-0 flex items-center p-0.5 gap-1 z-[9999] relative">
      <button 
        onClick={() => setStartMenuOpen(!startMenuOpen)}
        className={`retro-border-outset flex items-center gap-1 px-2 py-0.5 h-full font-bold active:retro-border-inset ${startMenuOpen ? 'retro-border-inset' : ''}`}
      >
        <span className="text-xl">🪟</span>
        <span className="text-sm tracking-tight">Start</span>
      </button>

      <div className="h-6 w-px bg-gray-400 mx-1"></div>

      <div className="flex-1 flex gap-1 h-full overflow-hidden">
        {/* Fix: Explicitly cast Object.values(windows) to WindowState[] to avoid 'unknown' type errors */}
        {(Object.values(windows) as WindowState[]).filter(w => w.isOpen).map(win => (
          <button
            key={win.id}
            onClick={() => onAppClick(win.id)}
            className={`retro-border-outset flex items-center gap-1 px-2 min-w-[120px] max-w-[200px] h-full text-sm font-bold truncate text-left active:retro-border-inset ${activeWindowId === win.id && !win.isMinimized ? 'retro-border-inset bg-gray-200 shadow-inner' : 'bg-[#c0c0c0]'}`}
          >
            <span className="text-base">{win.icon}</span>
            <span className="truncate">{win.title}</span>
          </button>
        ))}
      </div>

      <div className="retro-border-inset h-full px-3 flex items-center gap-2 bg-[#c0c0c0] min-w-[80px]">
        <span className="text-xs">🔊</span>
        <span className="text-sm font-medium">
          {time.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
        </span>
      </div>

      {/* Start Menu Popup */}
      {startMenuOpen && (
        <div className="absolute bottom-full left-0 w-64 retro-border-outset flex mb-1" onMouseLeave={() => setStartMenuOpen(false)}>
          <div className="bg-gray-600 w-8 flex items-end justify-center py-4">
             <div className="rotate-270 text-white font-bold whitespace-nowrap origin-bottom-left -translate-y-2 translate-x-1" style={{ writingMode: 'vertical-rl' }}>
                TP-OS <span className="text-gray-400">98</span>
             </div>
          </div>
          <div className="flex-1 bg-[#c0c0c0] py-1">
             {[
               { id: 'about', label: 'Programs', icon: '📁' },
               { id: 'projects', label: 'Documents', icon: '📄' },
               { id: 'settings', label: 'Settings', icon: '⚙️' },
               { id: 'terminal', label: 'Run...', icon: '⌨️' },
             ].map(item => (
               <div key={item.label} className="flex items-center gap-3 px-4 py-2 hover:bg-[#000080] hover:text-white cursor-pointer group">
                  <span className="text-xl">{item.icon}</span>
                  <span className="text-sm">{item.label}</span>
               </div>
             ))}
             <div className="h-px bg-gray-400 my-1 mx-2"></div>
             {onToggleView && (
               <div 
                 className="flex items-center gap-3 px-4 py-2 hover:bg-[#000080] hover:text-white cursor-pointer"
                 onClick={() => {
                   onToggleView();
                   setStartMenuOpen(false);
                 }}
               >
                  <span className="text-xl">🚀</span>
                  <span className="text-sm">Switch to Modern</span>
               </div>
             )}
             <div className="flex items-center gap-3 px-4 py-2 hover:bg-[#000080] hover:text-white cursor-pointer">
                <span className="text-xl">🚪</span>
                <span className="text-sm">Log Off...</span>
             </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Taskbar;
