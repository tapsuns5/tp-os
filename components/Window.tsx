
import React, { useState, useRef, useEffect } from 'react';
import { AppId } from '../types';

interface WindowProps {
  id: AppId;
  title: string;
  zIndex: number;
  isActive: boolean;
  onClose: () => void;
  onMinimize: () => void;
  onFocus: () => void;
  children: React.ReactNode;
  initialX: number;
  initialY: number;
}

const Window: React.FC<WindowProps> = ({ 
  title, zIndex, isActive, onClose, onMinimize, onFocus, children, initialX, initialY 
}) => {
  const [pos, setPos] = useState({ x: initialX, y: initialY });
  const [isDragging, setIsDragging] = useState(false);
  const offset = useRef({ x: 0, y: 0 });

  const handleMouseDown = (e: React.MouseEvent) => {
    onFocus();
    setIsDragging(true);
    offset.current = {
      x: e.clientX - pos.x,
      y: e.clientY - pos.y
    };
  };

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (isDragging) {
        setPos({
          x: e.clientX - offset.current.x,
          y: e.clientY - offset.current.y
        });
      }
    };
    const handleMouseUp = () => setIsDragging(false);

    if (isDragging) {
      window.addEventListener('mousemove', handleMouseMove);
      window.addEventListener('mouseup', handleMouseUp);
    }
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isDragging]);

  return (
    <div 
      className={`absolute retro-border-outset shadow-xl flex flex-col pointer-events-auto transition-shadow ${isActive ? 'shadow-black/40' : 'shadow-none'}`}
      style={{ 
        zIndex, 
        left: `${pos.x}px`, 
        top: `${pos.y}px`,
        minWidth: '320px',
        minHeight: '200px',
        maxWidth: '90vw',
        maxHeight: '80vh'
      }}
      onMouseDown={onFocus}
    >
      {/* Title Bar */}
      <div 
        className={`flex items-center justify-between p-1 px-2 h-7 cursor-default select-none ${isActive ? 'retro-title-bar' : 'retro-title-bar-inactive'}`}
        onMouseDown={handleMouseDown}
      >
        <div className="flex items-center gap-2 overflow-hidden">
          <span className="text-white text-sm font-bold truncate drop-shadow-sm">{title}</span>
        </div>
        <div className="flex gap-1 shrink-0">
          <button 
            onClick={(e) => { e.stopPropagation(); onMinimize(); }}
            className="retro-border-outset w-5 h-5 flex items-center justify-center bg-[#c0c0c0] hover:bg-[#d0d0d0] active:retro-border-inset"
          >
            <span className="text-xs font-bold leading-none -mt-2">_</span>
          </button>
          <button 
            className="retro-border-outset w-5 h-5 flex items-center justify-center bg-[#c0c0c0] hover:bg-[#d0d0d0] active:retro-border-inset cursor-not-allowed"
          >
            <span className="text-xs font-bold border border-black w-3 h-2 leading-none"></span>
          </button>
          <button 
            onClick={(e) => { e.stopPropagation(); onClose(); }}
            className="retro-border-outset w-5 h-5 flex items-center justify-center bg-[#c0c0c0] hover:bg-[#d0d0d0] active:retro-border-inset ml-1 font-bold"
          >
            <span className="text-sm leading-none">×</span>
          </button>
        </div>
      </div>

      {/* Content Area */}
      <div className="flex-1 overflow-auto p-0.5 bg-[#c0c0c0]">
        <div className="bg-[#c0c0c0] h-full">
            {children}
        </div>
      </div>
    </div>
  );
};

export default Window;
