
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

  const startDrag = (clientX: number, clientY: number) => {
    onFocus();
    setIsDragging(true);
    offset.current = {
      x: clientX - pos.x,
      y: clientY - pos.y
    };
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    startDrag(e.clientX, e.clientY);
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    const touch = e.touches[0];
    startDrag(touch.clientX, touch.clientY);
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

    const handleTouchMove = (e: TouchEvent) => {
      if (isDragging && e.touches[0]) {
        const t = e.touches[0];
        setPos({
          x: t.clientX - offset.current.x,
          y: t.clientY - offset.current.y
        });
      }
    };
    const handleTouchEnd = () => setIsDragging(false);

    if (isDragging) {
      window.addEventListener('mousemove', handleMouseMove);
      window.addEventListener('mouseup', handleMouseUp);
      window.addEventListener('touchmove', handleTouchMove, { passive: false });
      window.addEventListener('touchend', handleTouchEnd);
    }
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
      window.removeEventListener('touchmove', handleTouchMove);
      window.removeEventListener('touchend', handleTouchEnd);
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
      onTouchStart={(e) => { onFocus(); e.stopPropagation(); }}
    >
      {/* Title Bar */}
      <div 
        className={`flex items-center justify-between p-1 px-2 h-7 cursor-default select-none ${isActive ? 'retro-title-bar' : 'retro-title-bar-inactive'}`}
        onMouseDown={handleMouseDown}
        onTouchStart={handleTouchStart}
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
