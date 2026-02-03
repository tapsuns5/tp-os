import React, { useState, useEffect } from 'react';
import { Terminal } from './components/VibecheckTerminal';
import { GITHUB_REPO } from './VibecheckConstants';

const App: React.FC = () => {
  const [stars, setStars] = useState<string>('1');

  useEffect(() => {
    const fetchStars = async () => {
      try {
        const response = await fetch('https://api.github.com/repos/tapsuns5/VibeCheck-Scanner');
        if (response.ok) {
          const data = await response.json();
          const starCount = data.stargazers_count;
          if (starCount >= 1000) {
            setStars(`${(starCount / 1000).toFixed(1)}k`);
          } else {
            setStars(starCount.toString());
          }
        }
      } catch (error) {
        console.error('Failed to fetch star count:', error);
      }
    };

    fetchStars();
  }, []);
  return (
    <div className="min-h-screen relative selection:bg-pink-500/30 selection:text-white bg-[#030303]">
      {/* Background Decor */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-full -z-10 overflow-hidden pointer-events-none">
        <div className="absolute top-[-10%] left-[20%] w-[800px] h-[800px] bg-blue-600/10 rounded-full blur-[160px] animate-pulse"></div>
        <div className="absolute top-[20%] right-[10%] w-[600px] h-[600px] bg-pink-600/10 rounded-full blur-[160px] animate-pulse delay-1000"></div>
      </div>

      {/* Top Nav */}
      <nav className="container mx-auto px-8 py-4 flex justify-between items-center">
        <div className="flex items-center gap-4 group cursor-default">
          <img
            src="/assets/vibecheck/vibe-check.png"
            alt="VibeCheck"
            className="w-24 h-10"
          />
        </div>

        <a
          href={GITHUB_REPO}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-4 px-6 py-3 rounded-2xl border border-white/5 bg-white/[0.02] hover:bg-white/[0.06] hover:border-white/20 transition-all group backdrop-blur-md"
        >
          <svg
            className="w-6 h-6 fill-white group-hover:scale-110 transition-transform"
            viewBox="0 0 24 24"
          >
            <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
          </svg>
          <div className="flex flex-col items-start leading-none">
            <span className="text-[10px] uppercase font-black text-white/30 tracking-[0.2em] mb-1">
              Star Repository
            </span>
            <span className="text-sm font-bold">{stars} GitHub Stars</span>
          </div>
        </a>
      </nav>

      <main className="container mx-auto px-8 pt-12 pb-10">
        {/* BIG LOGO HERO */}
        <div className="relative mb-2 max-w-[850px] mx-auto animate-in zoom-in-95 duration-1000">
          <div className="absolute inset-0 bg-blue-500/10 blur-[140px] rounded-full -z-10 animate-pulse"></div>
          <img
            src="/assets/vibecheck/vibe-check.gif"
            alt="VibeCheck"
            className="w-[60%] h-auto mx-auto drop-shadow-[0_0_60px_rgba(236,72,153,0.25)] hover:scale-[1.02] transition-transform duration-700"
            onError={(e) => {
              e.currentTarget.src = "/assets/vibecheck/vibe-check.gif";
            }}
          />
        </div>

        <div className="text-center mb-2">
          <p className="max-w-2xl mx-auto text-xl md:text-2xl text-white/40 font-medium leading-tight mb-16 tracking-tight">
            Open source repo scanner that catches{" "}
            <span className="text-white">security leaks</span> and{" "}
            <span className="text-white">informs on React best practices</span>{" "}
            before production.
          </p>
        </div>

        {/* Terminal Section */}
        <div className="relative pt-0">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 text-white/[0.02] font-black text-9xl pointer-events-none select-none tracking-tighter whitespace-nowrap">
            VIBE SCAN REALTIME
          </div>
          <Terminal />
        </div>

        {/* Stats / Proof */}
        <div className="max-w-6xl mx-auto grid grid-cols-2 md:grid-cols-3 gap-6 py-24 border-y border-white/5 mt-20 opacity-40 hover:opacity-100 transition-opacity duration-500">
          {[
            {
              label: "Prisma Security",
              val: "15+ checks",
              logo: "https://raw.githubusercontent.com/prisma/presskit/main/Assets/Prisma-LightLogo.svg",
            },
            {
              label: "Next.js Patterns",
              val: "20+ rules",
              logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nextjs/nextjs-original.svg",
            },
            {
              label: "React Best Practices",
              val: "50+ rules",
              logo: "https://cdn.brandfetch.io/idREYlLkpD/theme/dark/id-H4pLvmU.svg?c=1bxid64Mup7aczewSAYMX&t=1746616569173",
            },
          ].map((stat, i) => (
            <div key={i} className="flex flex-col items-center gap-3">
              {stat.logo ? (
                <img src={stat.logo} alt={stat.label} className="w-40 h-40" />
              ) : (
                <span className="text-5xl font-black tracking-tighter text-white">
                  {stat.val}
                </span>
              )}
              <span className="text-[10px] uppercase tracking-[0.3em] font-black text-white/40">
                {stat.label}
              </span>
            </div>
          ))}
        </div>
      </main>

      <footer className="py-24 border-t border-white/5 bg-black/40 backdrop-blur-xl flex flex-col items-center gap-12">
      </footer>
    </div>
  );
};

export default App;
