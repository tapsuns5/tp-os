
import React, { useState, useEffect, useRef } from 'react';
import { SCAN_DATA } from '../VibecheckConstants';
import { Severity } from '../VibecheckTypes';

export const Terminal: React.FC = () => {
  const [typedCommand, setTypedCommand] = useState("");
  const [phase, setPhase] = useState<'typing' | 'running' | 'results' | 'finished'>('typing');
  const [runningStep, setRunningStep] = useState(0);
  const [visibleResults, setVisibleResults] = useState<number>(0);
  const scrollRef = useRef<HTMLDivElement>(null);

  const command = "vibecheck scan";
  const runningMessages = ["Running...", "Scanning...", "Vibing..."];

  useEffect(() => {
    if (phase === 'typing') {
      if (typedCommand.length < command.length) {
        const timeout = setTimeout(() => {
          setTypedCommand(command.slice(0, typedCommand.length + 1));
        }, 70);
        return () => clearTimeout(timeout);
      } else {
        setTimeout(() => setPhase('running'), 600);
      }
    }
  }, [typedCommand, phase]);

  useEffect(() => {
    if (phase === 'running') {
      if (runningStep < runningMessages.length) {
        const timeout = setTimeout(() => {
          setRunningStep(prev => prev + 1);
        }, 500);
        return () => clearTimeout(timeout);
      } else {
        setTimeout(() => setPhase('results'), 400);
      }
    }
  }, [phase, runningStep]);

  useEffect(() => {
    if (phase === 'results' && visibleResults < SCAN_DATA.length) {
      const timeout = setTimeout(() => {
        setVisibleResults(prev => prev + 1);
        if (scrollRef.current) {
          scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
        }
      }, 150);
      return () => clearTimeout(timeout);
    } else if (phase === 'results' && visibleResults === SCAN_DATA.length) {
      setTimeout(() => setPhase('finished'), 600);
    }
  }, [phase, visibleResults]);

  return (
    <div className="w-full max-w-5xl mx-auto mt-12 mb-20 px-4">
      <div className="bg-[#050505] border border-white/5 rounded-xl overflow-hidden shadow-2xl shadow-blue-500/5">
        <div className="bg-white/5 px-4 py-2 border-b border-white/5 flex items-center justify-between">
          <div className="flex gap-1.5">
            <div className="w-2.5 h-2.5 rounded-full bg-red-500/50"></div>
            <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/50"></div>
            <div className="w-2.5 h-2.5 rounded-full bg-green-500/50"></div>
          </div>
          <div className="text-white/20 text-[10px] mono tracking-widest uppercase">VibeCheck Terminal</div>
          <div className="w-8"></div>
        </div>

        <div 
          ref={scrollRef}
          className="p-8 mono text-[13px] leading-relaxed min-h-[500px] max-h-[750px] overflow-y-auto terminal-scroll bg-black/40 text-white/90"
        >
          {/* Command Prompt */}
          <div className="flex items-center gap-2 mb-4">
            <span className="text-emerald-400">user@MacBook-Pro-5</span>
            <span className="text-blue-400">vibecheck</span>
            <span className="text-white">%</span>
            <span className="text-white font-medium">{typedCommand}</span>
            {phase === 'typing' && <span className="w-1.5 h-4 bg-white/40 animate-pulse"></span>}
          </div>

          {/* Running Animation Phase */}
          {(phase === 'running' || phase === 'results' || phase === 'finished') && (
            <div className="mb-6 space-y-1">
              {runningMessages.slice(0, runningStep + 1).map((msg, i) => (
                <div key={i} className="text-white/40 italic">{msg}</div>
              ))}
              
              {phase !== 'running' && (
                <div className="mt-4 space-y-0.5 animate-in fade-in duration-300">
                  <div className="text-white/60">Running rules[vibecheck] discovered auth guards: [</div>
                  <div className="text-blue-400/80 pl-4">'withFeatureFlag',</div>
                  <div className="text-blue-400/80 pl-4">'withWorkspace',</div>
                  <div className="text-blue-400/80 pl-4">'getServerSession',</div>
                  <div className="text-blue-400/80 pl-4">'requireAuthedWorkspace'</div>
                  <div className="text-white/60">]</div>
                  <div className="text-white/40 mt-2 font-bold">✅ Scan complete</div>
                </div>
              )}
            </div>
          )}

          {/* Results Phase */}
          {(phase === 'results' || phase === 'finished') && (
            <div className="space-y-8 animate-in fade-in duration-500 mt-8">
              {SCAN_DATA.slice(0, visibleResults).map((result, idx) => (
                <div key={idx} className="space-y-1">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className={`font-black ${
                      result.severity === Severity.BLOCKER ? 'text-red-500' : 
                      result.severity === Severity.HIGH ? 'text-orange-500' :
                      result.severity === Severity.MEDIUM ? 'text-yellow-500' : 'text-blue-400'
                    }`}>
                      {result.severity === Severity.MEDIUM ? 'MED' : result.severity}
                    </span>
                    <span className="text-white/30">[{result.rule}]</span>
                    <span className="text-white/80">/Users/app/{result.file}{result.line ? `:${result.line}:${result.column}` : ''}</span>
                  </div>
                  
                  {result.snippet && (
                    <div className="pl-4 py-1 text-white/50 bg-white/5 rounded border-l border-white/10 my-2">
                      <pre className="whitespace-pre-wrap">{result.snippet}</pre>
                    </div>
                  )}

                  <div className="text-white/20 flex items-center gap-2 pl-4">
                    <span>↳</span>
                    <span className="hover:text-blue-400 transition-colors">
                      vscode://file//Users/app/{result.file}{result.line ? `:${result.line}:${result.column}` : ''}
                    </span>
                  </div>

                  <div className="pl-4 text-emerald-400/90 py-0.5 italic">
                    <span className="font-bold text-emerald-500/50 uppercase text-[10px] mr-2 not-italic">Fix:</span> 
                    {result.fix}
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Finished State */}
          {phase === 'finished' && (
            <div className="mt-12 pt-4 border-t border-white/5 space-y-4">
              <div className="font-black text-white/80">
                Summary: blocker=0 high=17 med=22 low=21 info=0
              </div>
              <div className="flex items-center gap-2">
                <span className="text-emerald-400">user@MacBook-Pro-5</span>
                <span className="text-blue-400">vibecheck</span>
                <span className="text-white">%</span>
                <span className="w-1.5 h-4 bg-white/40 animate-pulse ml-1"></span>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
