
import React, { useState } from 'react';
import { Project } from '../../types';
import { PROJECTS } from '../../constants/data';

const ProjectsApp: React.FC = () => {
  const [selected, setSelected] = useState<Project | null>(PROJECTS[0]);

  return (
    <div className="flex h-full bg-white">
      {/* File Explorer Sidebar */}
      <div className="w-48 retro-border-inset m-1 bg-[#c0c0c0] overflow-y-auto">
        <div className="p-1 space-y-1">
          {PROJECTS.map((p, i) => (
            <div 
              key={i} 
              onClick={() => setSelected(p)}
              className={`flex items-center gap-2 p-1 text-xs cursor-default hover:bg-[#000080] hover:text-white ${selected?.title === p.title ? 'bg-[#000080] text-white' : ''}`}
            >
              <span>📁</span>
              <span className="truncate">{p.title}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Detail View */}
      <div className="flex-1 p-4 overflow-y-auto">
        {selected ? (
          <div className="space-y-4 animate-in fade-in duration-300">
            <h2 className="text-xl font-bold border-b-2 border-black pb-1 uppercase tracking-tight">{selected.title}</h2>
            <div className="flex justify-between items-center text-xs text-gray-600 bg-gray-100 p-2 retro-border-inset">
               <span>Year: {selected.year}</span>
               <span>Status: LIVE</span>
            </div>
            <div className="retro-border-inset p-1 bg-gray-200">
               <img src={selected.icon} alt={selected.title} className="w-[20%] h-auto" />
            </div>
            <p className="text-sm font-serif text-gray-800 leading-relaxed bg-yellow-50 p-3 italic border border-yellow-200">
              {selected.content || selected.description}
            </p>
            <div>
              <h3 className="text-xs font-bold uppercase mb-2">Capabilities:</h3>
              <div className="flex flex-wrap gap-2">
                {selected.tech.map(t => (
                  <span key={t} className="px-2 py-0.5 retro-border-outset bg-[#c0c0c0] text-[10px] font-bold">
                    {t}
                  </span>
                ))}
              </div>
            </div>
            <button className="w-full retro-border-outset bg-[#c0c0c0] py-2 font-bold hover:bg-[#d0d0d0] active:retro-border-inset">
              LAUNCH_APP.EXE
            </button>
          </div>
        ) : (
          <div className="h-full flex flex-col items-center justify-center text-gray-500 space-y-4">
             <div className="text-6xl opacity-20">📂</div>
             <p className="text-sm font-bold">Select a project to view details</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProjectsApp;
