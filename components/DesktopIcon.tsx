
import React from 'react';

interface DesktopIconProps {
  title: string;
  icon: string;
  onDoubleClick: () => void;
}

const DesktopIcon: React.FC<DesktopIconProps> = ({ title, icon, onDoubleClick }) => {
  return (
    <div 
      className="w-20 h-20 flex flex-col items-center justify-center gap-1 cursor-default group"
      onDoubleClick={onDoubleClick}
      onTouchEnd={(e) => {
          // Double tap for mobile simulation
          onDoubleClick();
      }}
    >
      <div className="text-4xl filter group-active:brightness-75 select-none drop-shadow-md">
        {icon}
      </div>
      <span className="text-white text-xs text-center leading-tight px-1 group-active:bg-blue-800 group-active:border group-active:border-dotted group-active:border-white break-words drop-shadow-md">
        {title}
      </span>
    </div>
  );
};

export default DesktopIcon;
