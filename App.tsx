
import React, { useState, useCallback, useEffect } from 'react';
import Taskbar from './components/Taskbar';
import DesktopIcon from './components/DesktopIcon';
import Window from './components/Window';
import { AppId, WindowState } from './types';
import AboutApp from './components/apps/About';
import ProjectsApp from './components/apps/Projects';
import TerminalApp from './components/apps/Terminal';
import GuestbookApp from './components/apps/Guestbook';
import SkillsApp from './components/apps/Skills';
import MinesweeperApp from './components/apps/Minesweeper';
import SnakeApp from './components/apps/Snake';
import ResumeApp from './components/apps/Resume';
import WritingApp from './components/apps/Writing';
import ModernLayout from './components/modern/ModernLayout';

const INITIAL_WINDOWS: Record<AppId, WindowState> = {
  about: {
    id: "about",
    title: "Tyler Palmer",
    icon: "👤",
    isOpen: false,
    isMinimized: false,
    zIndex: 10,
    x: 50,
    y: 50,
  },
  writing: {
    id: "writing",
    title: "Tyler's Blog",
    icon: "📝",
    isOpen: false,
    isMinimized: false,
    zIndex: 10,
    x: 80,
    y: 80,
  },
  projects: {
    id: "projects",
    title: "My Projects",
    icon: "📁",
    isOpen: false,
    isMinimized: false,
    zIndex: 10,
    x: 110,
    y: 110,
  },
  resume: {
    id: "resume",
    title: "Resume.docx",
    icon: "📄",
    isOpen: false,
    isMinimized: false,
    zIndex: 10,
    x: 140,
    y: 140,
  },
  skills: {
    id: "skills",
    title: "Skill Tree",
    icon: "⚡",
    isOpen: false,
    isMinimized: false,
    zIndex: 10,
    x: 170,
    y: 170,
  },
  terminal: {
    id: "terminal",
    title: "Terminal",
    icon: "🖥️",
    isOpen: false,
    isMinimized: false,
    zIndex: 10,
    x: 100,
    y: 100,
  },
  guestbook: {
    id: "guestbook",
    title: "Guestbook",
    icon: "📖",
    isOpen: false,
    isMinimized: false,
    zIndex: 10,
    x: 130,
    y: 130,
  },
  minesweeper: {
    id: "minesweeper",
    title: "Minesweeper",
    icon: "💣",
    isOpen: false,
    isMinimized: false,
    zIndex: 10,
    x: 200,
    y: 200,
  },
  snake: {
    id: "snake",
    title: "Snake",
    icon: "🐍",
    isOpen: false,
    isMinimized: false,
    zIndex: 10,
    x: 220,
    y: 180,
  },
};

type ViewMode = 'retro' | 'modern';

export default function App() {
  const [viewMode, setViewMode] = useState<ViewMode>('retro');
  const [windows, setWindows] = useState<Record<AppId, WindowState>>(INITIAL_WINDOWS);
  const [activeWindowId, setActiveWindowId] = useState<AppId | null>(null);
  const [maxZ, setMaxZ] = useState(10);
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const openApp = useCallback((id: AppId) => {
    setWindows(prev => {
      const nextZ = maxZ + 1;
      setMaxZ(nextZ);
      setActiveWindowId(id);
      return {
        ...prev,
        [id]: { ...prev[id], isOpen: true, isMinimized: false, zIndex: nextZ }
      };
    });
  }, [maxZ]);

  const closeApp = useCallback((id: AppId) => {
    setWindows(prev => ({
      ...prev,
      [id]: { ...prev[id], isOpen: false }
    }));
    if (activeWindowId === id) setActiveWindowId(null);
  }, [activeWindowId]);

  const toggleMinimize = useCallback((id: AppId) => {
    setWindows(prev => ({
      ...prev,
      [id]: { ...prev[id], isMinimized: !prev[id].isMinimized }
    }));
  }, []);

  const focusApp = useCallback((id: AppId) => {
    setWindows(prev => {
      const nextZ = maxZ + 1;
      setMaxZ(nextZ);
      setActiveWindowId(id);
      return {
        ...prev,
        [id]: { ...prev[id], zIndex: nextZ, isMinimized: false }
      };
    });
  }, [maxZ]);

  const renderAppContent = (id: AppId) => {
    switch (id) {
      case 'about': return <AboutApp />;
      case 'writing': return <WritingApp />;
      case 'resume': return <ResumeApp />;
      case 'projects': return <ProjectsApp />;
      case 'terminal': return <TerminalApp />;
      case 'guestbook': return <GuestbookApp />;
      case 'skills': return <SkillsApp />;
      case 'minesweeper': return <MinesweeperApp />;
      case 'snake': return <SnakeApp />;
      default: return <div className="p-4">Under Construction... 🏗️</div>;
    }
  };

  return (
    <div className={`h-screen w-screen overflow-hidden relative flex flex-col ${viewMode === 'retro' ? 'bg-[#008080]' : 'bg-[#09090b]'}`}>
      
      {/* View Toggle Button */}
      <button 
        onClick={() => setViewMode(viewMode === 'retro' ? 'modern' : 'retro')}
        className={`absolute top-4 right-4 z-[10000] px-3 py-1.5 rounded-md font-bold transition-all border-2 flex items-center gap-2 shadow-lg
          ${viewMode === 'retro' 
            ? 'retro-border-outset text-black bg-[#c0c0c0] active:retro-border-inset' 
            : 'bg-white/10 hover:bg-white/20 border-white/20 text-white'}`}
      >
        <span>{viewMode === 'retro' ? '🚀 Go Modern' : '📠 Go Retro'}</span>
      </button>

      {viewMode === 'retro' ? (
        <>
          {/* Desktop Icons Area */}
          <div className="flex-1 p-4 grid grid-flow-col grid-rows-6 gap-6 w-fit h-full">
            {(Object.values(INITIAL_WINDOWS) as WindowState[]).map(app => (
              <DesktopIcon 
                key={app.id} 
                title={app.title} 
                icon={app.icon} 
                onDoubleClick={() => openApp(app.id)} 
              />
            ))}
          </div>

          {/* Windows Layer */}
          {(Object.values(windows) as WindowState[]).map(win => (
            win.isOpen && !win.isMinimized && (
              <Window
                key={win.id}
                id={win.id}
                title={win.title}
                zIndex={win.zIndex}
                isActive={activeWindowId === win.id}
                onClose={() => closeApp(win.id)}
                onMinimize={() => toggleMinimize(win.id)}
                onFocus={() => focusApp(win.id)}
                initialX={win.x}
                initialY={win.y}
              >
                {renderAppContent(win.id)}
              </Window>
            )
          ))}

          {/* Taskbar */}
          <Taskbar 
            windows={windows} 
            activeWindowId={activeWindowId} 
            onAppClick={(id) => {
              if (windows[id].isOpen) {
                if (activeWindowId === id && !windows[id].isMinimized) {
                  toggleMinimize(id);
                } else {
                  focusApp(id);
                }
              } else {
                openApp(id);
              }
            }}
            time={time}
          />
        </>
      ) : (
        <ModernLayout />
      )}
    </div>
  );
}
