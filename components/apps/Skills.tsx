
import React from 'react';

const SkillsApp: React.FC = () => {
  const skills = [
    { name: 'JavaScript / TS', level: 95, color: 'bg-yellow-400' },
    { name: 'React', level: 90, color: 'bg-blue-400' },
    { name: 'Node.js', level: 85, color: 'bg-green-500' },
    { name: 'Tailwind CSS', level: 88, color: 'bg-sky-400' },
    { name: 'Python', level: 75, color: 'bg-blue-600' },
    { name: 'PostgreSQL', level: 80, color: 'bg-slate-500' },
  ];

  return (
    <div className="p-4 bg-white min-h-full">
      <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
        <span className="text-2xl">⚡</span> System Performance & Capabilities
      </h2>
      
      <div className="space-y-6">
        {skills.map(skill => (
          <div key={skill.name} className="space-y-1">
            <div className="flex justify-between text-xs font-bold">
              <span>{skill.name}</span>
              <span>{skill.level}% Optimized</span>
            </div>
            <div className="retro-border-inset h-5 p-0.5 bg-gray-100 flex items-center overflow-hidden">
              <div 
                className={`h-full ${skill.color} border-r-2 border-black/20`}
                style={{ width: `${skill.level}%` }}
              >
                 <div className="w-full h-full opacity-30 bg-gradient-to-b from-white to-transparent"></div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-8 retro-border-inset p-4 bg-[#c0c0c0]">
        <h3 className="text-xs font-bold mb-2 uppercase">Additional Software Installed:</h3>
        <ul className="text-xs list-disc list-inside space-y-1">
           <li>Docker Engine (Containerization)</li>
           <li>Git (Version Control)</li>
           <li>GraphQL Runtime</li>
           <li>Gemini 3.0 Pro Image Preview (AI Module)</li>
           <li>Vim (Advanced Editor)</li>
        </ul>
      </div>

      <div className="mt-4 text-[10px] text-gray-500 text-center">
         Scan completed: 10/24/2024 - 0 threats found.
      </div>
    </div>
  );
};

export default SkillsApp;
