
import React from 'react';
import { EXPERIENCES, BIO } from '../../constants/data';

const AboutApp: React.FC = () => {
  return (
    <div className="p-6 bg-[#c0c0c0] h-full overflow-y-auto font-sans">
      <div className="max-w-3xl mx-auto space-y-8">
        {/* Header Section */}
        <div className="retro-border-inset bg-white p-6 flex flex-col md:flex-row gap-6 items-center">
          <div className="retro-border-outset p-1 shrink-0 w-40 h-40 bg-gray-300 overflow-hidden shadow-inner">
            <img
              src="/profile-pic.png"
              alt="Tyler Palmer"
              className="w-full h-full object-cover"
              onError={(e) => {
                (e.target as HTMLImageElement).src =
                  "https://picsum.photos/seed/tyler-avatar/200";
              }}
            />
          </div>
          <div className="flex-1 space-y-3 text-center md:text-left">
            <h1 className="text-3xl font-bold tracking-tight text-blue-900 border-b-2 border-dotted border-gray-400 pb-2">
              Tyler Palmer
            </h1>
            <p className="text-sm font-bold uppercase text-gray-600">
              Product & Business Builder
            </p>
            <div className="flex flex-wrap justify-center md:justify-start gap-4 pt-2">
              <a
                href="https://x.com/Tyler_Palmer9"
                className="flex items-center gap-1 text-xs font-bold text-blue-700 hover:underline"
              >
                <img src="/x-icon-black.png" alt="X" className="w-4 h-4" />
              </a>
              <a
                href="https://github.com/tapsuns5"
                className="flex items-center gap-1 text-xs font-bold text-blue-700 hover:underline"
              >
                <img src="/github-icon.png" alt="Github" className="w-4 h-4" />
              </a>
              <a
                href="https://www.linkedin.com/in/tylerpalmer9/"
                className="flex items-center gap-1 text-xs font-bold text-blue-700 hover:underline"
              >
                <img
                  src="/linkedin-icon.png"
                  alt="LinkedIn"
                  className="w-4 h-4"
                />
              </a>
              <a
                href="mailto:yo@tylerpalmer5.com"
                className="flex items-center gap-1 text-xs font-bold text-blue-700 hover:underline"
              >
                <img src="/email-icon.png" alt="Email" className="w-4 h-4" />
              </a>
            </div>
          </div>
        </div>

        {/* About Me Section */}
        <div className="retro-border-outset bg-white p-4">
          <h2 className="bg-[#000080] text-white px-2 py-0.5 text-sm font-bold mb-3">
            ABOUT ME
          </h2>
          <p className="text-sm leading-relaxed text-gray-800 italic">
            {(() => {
              const parts = BIO.split(/(\[PROFILE_PIC]|\[SCHEEME_ICON]|\[X_ICON]|\[MIAMI_LOGO]|\[MIAMI_HEAT_LOGO]|\[MIAMI_DOLPHINS_LOGO]|\[FLORIDA_PANTHERS_LOGO]|\[FLORIDA_MARLINS_LOGO])/);
              
              return parts.map((part, index) => {
                switch(part) {
                  case '[PROFILE_PIC]':
                    return <img key={index} src="/profile-pic-um.png" alt="Profile" className="inline-block w-8 h-8 rounded-full mx-1 align-middle" />;
                  case '[SCHEEME_ICON]':
                    return (
                      <img 
                        key={index} 
                        src="/scheemeIcon.png" 
                        alt="Scheeme" 
                        className="inline-block w-5 h-5 mx-1 align-middle cursor-pointer" 
                        onClick={() => window.open('https://tryscheeme.com', '_blank')}
                      />
                    );
                  case '[X_ICON]':
                    return (
                      <img 
                        key={index} 
                        src="/x-icon-black.png" 
                        alt="X" 
                        className="inline-block w-5 h-5 mx-1 align-middle cursor-pointer" 
                        onClick={() => window.open('https://x.com/Tyler_Palmer9', '_blank')}
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
                        {lineIndex > 0 && <br />}
                        {line}
                      </React.Fragment>
                    ));
                }
              });
            })()}
          </p>
        </div>

        {/* Vertical Timeline Experience Section */}
        <div className="retro-border-outset bg-white p-6">
          <h2 className="bg-[#000080] text-white px-2 py-0.5 text-sm font-bold mb-8">
            EXPERIENCE
          </h2>

          <div className="relative border-l-2 border-gray-300 ml-3 space-y-12">
            {EXPERIENCES.map((exp, idx) => (
              <div key={idx} className="relative pl-8">
                <div className="absolute -left-[9px] top-1 w-4 h-4 rounded-full bg-white border-2 border-blue-800 z-10 shadow-sm" />

                <div className="space-y-2">
                  <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center border-b border-gray-100 pb-1">
                    <h3 className="font-bold text-blue-900">
                      {exp.role} @ {exp.company}
                    </h3>
                    <span className="text-[10px] font-mono bg-yellow-100 border border-yellow-300 px-2 py-0.5 rounded uppercase font-bold text-yellow-800">
                      {exp.period}
                    </span>
                  </div>
                  <p className="text-xs text-gray-600 leading-normal">
                    {exp.description}
                  </p>

                  <div className="bg-gray-50 p-3 retro-border-inset">
                    <h4 className="text-[10px] font-bold uppercase text-gray-500 mb-2">
                      Key Achievements:
                    </h4>
                    <ul className="list-disc list-outside ml-4 text-[11px] text-gray-700 space-y-1">
                      {exp.achievements.map((ach, i) => (
                        <li key={i}>{ach}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="text-[10px] text-center text-gray-500 pb-4">
          TP-OS • Optimized for 800x600 resolution
        </div>
      </div>
    </div>
  );
};

export default AboutApp;
