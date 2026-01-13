
import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Dashboard } from './components/Dashboard';
import { MissionSystem } from './components/MissionSystem';
import { AppState, Message, TacticalMetrics, Mission } from './types';
import { AbyssLighthouseService } from './services/geminiService';
import ReactMarkdown from 'react-markdown';

const App: React.FC = () => {
  const [state, setState] = useState<AppState>(() => {
    const saved = localStorage.getItem('abyss_lighthouse_state');
    if (saved) return JSON.parse(saved);
    return {
      metrics: {
        energy: { sleep: 80, diet: 70, exercise: 50 },
        territory: { productiveHours: 2, projectCount: 3 },
        fortress: { interceptions: 0, lastInterceptTime: 'N/A' }
      },
      missions: [
        {
          id: '1',
          title: 'PERSONAL UNIVERSE ENGINE RECONSTRUCTION',
          type: 'MAIN',
          progress: 35,
          status: 'ACTIVE',
          timestamp: new Date().toISOString()
        },
        {
          id: '2',
          title: 'DEBT OF ATTENTION REPAYMENT',
          type: 'SIDE',
          progress: 80,
          status: 'ACTIVE',
          timestamp: new Date().toISOString()
        },
        {
          id: '3',
          title: 'INDUSTRIAL DESIGN PROTOCOL ALPHA',
          type: 'MAIN',
          progress: 100,
          status: 'COMPLETED',
          timestamp: new Date().toISOString()
        }
      ],
      history: [
        { 
          role: 'model', 
          content: "# SYSTEM ONLINE\n\nCommand Center 'Abyss Lighthouse' initialized. I do not offer comfort. I offer reconstruction.\n\n**STATUS REPORT REQUIRED:**\n- [Energy Reserve]: Sleep/Diet/Exercise (0-100)\n- [Territory Expansion]: Productive Hours\n- [Fortress Stability]: Interceptions\n\nPresent your attrition (emotions) or project status.",
          timestamp: new Date().toISOString()
        }
      ]
    };
  });

  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  const service = useRef(new AbyssLighthouseService());

  useEffect(() => {
    localStorage.setItem('abyss_lighthouse_state', JSON.stringify(state));
    scrollRef.current?.scrollTo(0, scrollRef.current.scrollHeight);
  }, [state]);

  const handleCommand = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || loading) return;

    const userMsg: Message = {
      role: 'user',
      content: input,
      timestamp: new Date().toISOString()
    };

    setLoading(true);
    setInput('');
    setState(prev => ({ ...prev, history: [...prev.history, userMsg] }));

    try {
      const historyForAPI = state.history.map(m => ({
        role: m.role,
        parts: [{ text: m.content }]
      }));

      const result = await service.current.processInput(input, historyForAPI);
      
      const modelMsg: Message = {
        role: 'model',
        content: result || "SYSTEM ERROR: SIGNAL LOST",
        timestamp: new Date().toISOString()
      };

      setState(prev => ({ ...prev, history: [...prev.history, modelMsg] }));

      // Heuristic for dashboard updates
      if (input.toLowerCase().includes('sleep') || input.toLowerCase().includes('diet')) {
        const matches = input.match(/\d+/g);
        if (matches && matches.length >= 3) {
          setState(prev => ({
            ...prev,
            metrics: {
              ...prev.metrics,
              energy: {
                sleep: parseInt(matches[0]) || prev.metrics.energy.sleep,
                diet: parseInt(matches[1]) || prev.metrics.energy.diet,
                exercise: parseInt(matches[2]) || prev.metrics.energy.exercise,
              }
            }
          }));
        }
      }
      
      if (input.toLowerCase().includes('intercepted')) {
         setState(prev => ({
            ...prev,
            metrics: {
              ...prev.metrics,
              fortress: {
                interceptions: prev.metrics.fortress.interceptions + 1,
                lastInterceptTime: new Date().toLocaleTimeString()
              }
            }
         }));
      }

    } catch (error) {
      console.error(error);
      const errorMsg: Message = {
        role: 'model',
        content: "CRITICAL FAILURE: EXTERNAL INTERFERENCE DETECTED.",
        timestamp: new Date().toISOString()
      };
      setState(prev => ({ ...prev, history: [...prev.history, errorMsg] }));
    } finally {
      setLoading(false);
    }
  };

  const resetState = () => {
    if (confirm("INITIATE TOTAL SYSTEM PURGE? (Wipe all data)")) {
      localStorage.removeItem('abyss_lighthouse_state');
      window.location.reload();
    }
  };

  return (
    <div className="min-h-screen flex flex-col max-w-5xl mx-auto px-4 py-8 relative">
      <header className="flex justify-between items-center mb-8 border-b border-white/10 pb-4">
        <div>
          <h1 className="text-2xl font-black uppercase tracking-tighter text-white flex items-center gap-3">
            <span className="bg-white text-black px-2 py-0.5">ABYSS</span>
            <span className="text-cyan-400 glow-text">LIGHTHOUSE</span>
          </h1>
          <p className="text-[10px] text-gray-500 uppercase tracking-widest mt-1">Personal Order Reconstruction System v3.1</p>
        </div>
        <button 
          onClick={resetState}
          className="text-[10px] border border-red-900/50 text-red-900/50 hover:bg-red-900 hover:text-white px-2 py-1 transition-all uppercase"
        >
          Purge Data
        </button>
      </header>

      <Dashboard metrics={state.metrics} />
      
      <MissionSystem missions={state.missions} />

      <main className="flex-1 flex flex-col industrial-border rounded-sm overflow-hidden mb-20">
        <div className="bg-white/5 border-b border-white/10 px-4 py-2 text-[10px] flex justify-between uppercase text-gray-500">
          <span>Command Terminal</span>
          <span>Status: {loading ? 'Processing...' : 'Ready'}</span>
        </div>
        
        <div 
          ref={scrollRef}
          className="flex-1 overflow-y-auto p-4 space-y-6 scroll-smooth custom-scrollbar bg-black/40"
          style={{ maxHeight: 'calc(100vh - 550px)', minHeight: '300px' }}
        >
          {state.history.map((msg, idx) => (
            <div key={idx} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
              <div className={`max-w-[85%] p-4 rounded-sm ${
                msg.role === 'user' 
                  ? 'bg-cyan-900/20 border border-cyan-800/50 text-cyan-50 font-medium' 
                  : 'bg-white/5 border border-white/10 text-gray-300'
              }`}>
                <div className="text-[9px] uppercase tracking-widest opacity-40 mb-2 flex justify-between">
                  <span>{msg.role === 'user' ? 'Operator' : 'Abyss Lighthouse'}</span>
                  <span>{new Date(msg.timestamp).toLocaleTimeString()}</span>
                </div>
                <div className="prose prose-invert prose-sm max-w-none prose-headings:text-white prose-strong:text-cyan-400 prose-table:border prose-table:border-white/20">
                  <ReactMarkdown>{msg.content}</ReactMarkdown>
                </div>
              </div>
            </div>
          ))}
          {loading && (
            <div className="flex justify-start">
              <div className="bg-white/5 border border-white/10 p-4 rounded-sm animate-pulse flex items-center gap-2">
                <div className="w-2 h-2 bg-cyan-500 rounded-full animate-bounce"></div>
                <div className="w-2 h-2 bg-cyan-500 rounded-full animate-bounce [animation-delay:-.15s]"></div>
                <div className="w-2 h-2 bg-cyan-500 rounded-full animate-bounce [animation-delay:-.3s]"></div>
              </div>
            </div>
          )}
        </div>

        <form onSubmit={handleCommand} className="p-4 border-t border-white/10 bg-black/60">
          <div className="relative group">
            <div className="absolute -left-2 top-0 bottom-0 w-1 bg-cyan-500 opacity-0 group-focus-within:opacity-100 transition-opacity"></div>
            <input 
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Enter attrition report or mission update..."
              className="w-full bg-transparent border-none focus:ring-0 text-cyan-50 placeholder-gray-700 font-mono text-sm py-2"
              autoFocus
            />
          </div>
          <div className="flex justify-between mt-2 text-[9px] text-gray-600 uppercase tracking-tighter">
            <span>Press Enter to Transmute</span>
            <span>Minimal Action Protocol: Binding emotion to output</span>
          </div>
        </form>
      </main>

      <footer className="fixed bottom-0 left-0 right-0 bg-black/90 backdrop-blur-md border-t border-white/10 py-2 px-6 flex justify-between items-center z-50">
        <div className="flex gap-6 overflow-x-auto no-scrollbar py-1">
          <div className="flex flex-col">
             <span className="text-[8px] text-gray-600 uppercase">Sector: Sigma-9</span>
             <span className="text-[10px] text-cyan-600 font-bold uppercase">Main Line: Active</span>
          </div>
          <div className="flex flex-col border-l border-white/10 pl-4">
             <span className="text-[8px] text-gray-600 uppercase">Integrity</span>
             <span className="text-[10px] text-green-700 font-bold uppercase">Stable</span>
          </div>
          <div className="flex flex-col border-l border-white/10 pl-4">
             <span className="text-[8px] text-gray-600 uppercase">Latency</span>
             <span className="text-[10px] text-gray-400 font-bold uppercase">12ms</span>
          </div>
        </div>
        <div className="text-[10px] text-gray-600 font-bold animate-pulse">
           &copy; 2024 ABYSS INDUSTRIES - NO COMFORT ONLY OUTPUT
        </div>
      </footer>
    </div>
  );
};

export default App;
