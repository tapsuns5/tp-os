import React, { useState, useCallback, useEffect } from "react";
import Taskbar from "./components/Taskbar";
import DesktopIcon from "./components/DesktopIcon";
import Window from "./components/Window";
import { AppId, WindowState } from "./types";
import AboutApp from "./components/apps/About";
import ProjectsApp from "./components/apps/Projects";
import TerminalApp from "./components/apps/Terminal";
import GuestbookApp from "./components/apps/Guestbook";
import SkillsApp from "./components/apps/Skills";
import MinesweeperApp from "./components/apps/Minesweeper";
import SnakeApp from "./components/apps/Snake";
import WritingApp from "./components/apps/Writing";
import ModernLayout from "./components/modern/ModernLayout";
import VibecheckApp from "./VibecheckApp";
import { BIO } from "./constants/data";

const RetroHomeView: React.FC<{ onOpenApp: (id: AppId) => void }> = ({ onOpenApp }) => {
  return (
    <div className="h-full p-8 pb-16 max-[640px]:pb-48 bg-[#008080] overflow-auto">
      <div className="max-w-8xl mx-auto">
        <div className="flex flex-row max-[640px]:flex-col gap-12 items-start">
          {/* Bio Content on Left */}
          <div className="retro-border-outset p-8 flex-none w-[600px] max-w-full max-[640px]:w-full">
            <div className="flex-1 min-w-0">
              <h1 className="text-4xl font-bold text-blue-900 mb-6">Tyler Palmer</h1>
              <p className="text-lg leading-relaxed text-gray-800 mb-6">
                {(() => {
                  const parts = BIO.split(/(\[[^\]]+\])/);
                  
                  return parts.map((part, index) => {
                    switch(part) {
                      case '[PROFILE_PIC]':
                        return (
                          <img
                            key={index}
                            src="/profile-pic-um.png"
                            alt="Profile"
                            className="inline-block w-8 h-8 rounded-full ml-2 align-middle"
                          />
                        );
                      case '[SCHEEME_ICON]':
                        return (
                          <img
                            key={index}
                            src="/scheemeIcon.png"
                            alt="Scheeme"
                            className="inline-block w-6 h-6 mr-2 align-middle cursor-pointer"
                            onClick={() => window.open("https://tryscheeme.com", "_blank")}
                          />
                        );
                      case '[X_ICON]':
                        return (
                          <img
                            key={index}
                            src="/x-icon.png"
                            alt="X"
                            className="inline-block w-5 h-5 mx-1 align-middle cursor-pointer"
                            onClick={() => window.open("https://x.com/Tyler_Palmer9", "_blank")}
                          />
                        );
                      case '[MIAMI_LOGO]':
                        return <img key={index} src="/Miami_Hurricanes_logo.svg" alt="Miami Hurricanes" className="inline-block w-5 h-5 mx-1 align-middle" />;
                      case '[MIAMI_HEAT_LOGO]':
                        return <img key={index} src="/miami-heat-logo-vice-symbol.png" alt="Miami Heat" className="inline-block w-5 h-5 mx-1 align-middle" />;
                      case '[MIAMI_DOLPHINS_LOGO]':
                        return <img key={index} src="/miami_dolphins_1997-2002.png" alt="Miami Dolphins" className="inline-block w-5 h-5 mx-1 align-middle" />;
                      case '[FLORIDA_PANTHERS_LOGO]':
                        return <img key={index} src="/Florida_Panthers_2016_logo.svg" alt="Florida Panthers" className="inline-block w-5 h-5 mx-1 align-middle" />;
                      case '[FLORIDA_MARLINS_LOGO]':
                        return <img key={index} src="/florida-marlins.png" alt="Florida Marlins" className="inline-block w-5 h-5 mx-1 align-middle" />;
                      default:
                        return part.split('\n').map((line, lineIndex) => (
                          <React.Fragment key={`${index}-${lineIndex}`}>
                            {lineIndex > 0 && <span className="block"></span>}
                            {line}
                          </React.Fragment>
                        ));
                    }
                  });
                })()}
              </p>
            </div>
          </div>

          {/* Desktop Icons on Right */}
          <div className="flex-1 min-w-[220px]">
            <div className="grid grid-cols-2 gap-6">
              {(Object.values(INITIAL_WINDOWS) as WindowState[]).map(
                (app) => (
                  <DesktopIcon
                    key={app.id}
                    title={app.title}
                    icon={app.icon}
                    onDoubleClick={() => onOpenApp(app.id)}
                  />
                ),
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

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
  vibecheck: {
    id: "vibecheck",
    title: "VibeCheck Scanner",
    icon: "🔍",
    isOpen: false,
    isMinimized: false,
    zIndex: 10,
    x: 250,
    y: 150,
  },
};

type ViewMode = "retro" | "modern";


export default function App() {
  const [viewMode, setViewMode] = useState<ViewMode>("retro");
  const [windows, setWindows] =
    useState<Record<AppId, WindowState>>(INITIAL_WINDOWS);
  const [activeWindowId, setActiveWindowId] = useState<AppId | null>(null);
  const [maxZ, setMaxZ] = useState(10);
  const [time, setTime] = useState(new Date());
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const view = urlParams.get("view");
    if (view === "modern" || view === "retro") {
      setViewMode(view);
    }

    // Handle /vibecheck route
    if (window.location.pathname === "/vibecheck") {
      setWindows((prev) => {
        const nextZ = maxZ + 1;
        setMaxZ(nextZ);
        setActiveWindowId("vibecheck");
        return {
          ...prev,
          vibecheck: {
            ...prev.vibecheck,
            isOpen: true,
            isMinimized: false,
            zIndex: nextZ,
          },
        };
      });
    }
  }, []);

  const updateViewMode = useCallback((newViewMode: ViewMode) => {
    setViewMode(newViewMode);
    const url = new URL(window.location.href);
    url.searchParams.set("view", newViewMode);
    window.history.replaceState({}, "", url);
  }, []);

  const toggleViewMode = useCallback(() => {
    const newView = viewMode === "retro" ? "modern" : "retro";
    updateViewMode(newView);
  }, [viewMode, updateViewMode]);

  const openApp = useCallback(
    (id: AppId) => {
      if (id === "vibecheck") {
        window.open("https://vibecheck.tylerpalmer5.com", "_blank");
        return;
      }
      setWindows((prev) => {
        const nextZ = maxZ + 1;
        setMaxZ(nextZ);
        setActiveWindowId(id);
        return {
          ...prev,
          [id]: {
            ...prev[id],
            isOpen: true,
            isMinimized: false,
            zIndex: nextZ,
          },
        };
      });
    },
    [maxZ],
  );

  const closeApp = useCallback(
    (id: AppId) => {
      setWindows((prev) => ({
        ...prev,
        [id]: { ...prev[id], isOpen: false },
      }));
      if (activeWindowId === id) setActiveWindowId(null);
    },
    [activeWindowId],
  );

  const toggleMinimize = useCallback((id: AppId) => {
    setWindows((prev) => ({
      ...prev,
      [id]: { ...prev[id], isMinimized: !prev[id].isMinimized },
    }));
  }, []);

  const focusApp = useCallback(
    (id: AppId) => {
      setWindows((prev) => {
        const nextZ = maxZ + 1;
        setMaxZ(nextZ);
        setActiveWindowId(id);
        return {
          ...prev,
          [id]: { ...prev[id], zIndex: nextZ, isMinimized: false },
        };
      });
    },
    [maxZ],
  );

  const renderAppContent = (id: AppId) => {
    switch (id) {
      case "about":
        return <AboutApp />;
      case "writing":
        return <WritingApp />;
      case "projects":
        return <ProjectsApp />;
      case "terminal":
        return <TerminalApp />;
      case "guestbook":
        return <GuestbookApp />;
      case "skills":
        return <SkillsApp />;
      case "minesweeper":
        return <MinesweeperApp />;
      case "snake":
        return <SnakeApp />;
      case "vibecheck":
        return <VibecheckApp />;
      default:
        return <div className="p-4">Under Construction... 🏗️</div>;
    }
  };

  return (
    <div
      className={`h-screen w-screen overflow-hidden flex flex-col relative ${viewMode === "retro" ? "bg-[#008080]" : "bg-[#09090b]"}`}
    >
      {/* Header */}
      <div
        className="fixed top-0 left-0 right-0 h-16 flex items-center justify-end px-4 z-[10001] pointer-events-none"
      >
        <button
          onClick={toggleViewMode}
          className={`pointer-events-auto px-3 py-1.5 rounded-md font-bold transition-all border-2 flex items-center gap-2 shadow-lg
            ${
              viewMode === "retro"
                ? "retro-border-outset text-black bg-[#c0c0c0] active:retro-border-inset"
                : "bg-white/10 hover:bg-white/20 border-white/20 text-white"
            }`}
        >
          <span>{viewMode === "retro" ? "🚀 Go Modern" : "📠 Go Retro"}</span>
        </button>
      </div>

      {/* Content */}
      <div className="flex-1 min-h-0 relative overflow-hidden">
        {viewMode === "retro" ? (
          <div className="flex flex-col h-full min-h-0 relative">
            <div className="flex-1 min-h-0 relative">
              {/* Retro Home View */}
              <RetroHomeView onOpenApp={openApp} />

              {/* Windows Layer (absolute overlay so footer stays sticky) */}
              <div className="absolute inset-0 pointer-events-none">
                {(Object.values(windows) as WindowState[]).map(
                  (win) =>
                    win.isOpen &&
                    !win.isMinimized && (
                      <div key={win.id} className="pointer-events-auto">
                        <Window
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
                      </div>
                    ),
                )}
              </div>
            </div>
          </div>
        ) : (
          <div className="h-full overflow-hidden">
            <ModernLayout />
          </div>
        )}
      </div>

      {/* Footer */}
      {viewMode === "retro" && (
        <div className="flex-shrink-0 fixed bottom-0 left-0 right-0 z-[10000]">
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
            onToggleView={toggleViewMode}
          />
        </div>
      )}
    </div>
  );
}
