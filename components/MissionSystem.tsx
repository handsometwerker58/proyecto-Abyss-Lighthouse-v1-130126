
import React, { useState } from 'react';
import { Mission } from '../types';

interface Props {
  missions: Mission[];
}

type SortKey = 'status' | 'type' | 'progress';

export const MissionSystem: React.FC<Props> = ({ missions }) => {
  const [sortKey, setSortKey] = useState<SortKey>('status');

  const sortedMissions = [...missions].sort((a, b) => {
    if (sortKey === 'progress') {
      return b.progress - a.progress;
    }
    if (sortKey === 'type') {
      return a.type === 'MAIN' ? -1 : 1;
    }
    if (sortKey === 'status') {
      const priority: Record<string, number> = { 'ACTIVE': 0, 'COMPLETED': 1, 'ABANDONED': 2 };
      return (priority[a.status] ?? 99) - (priority[b.status] ?? 99);
    }
    return 0;
  });

  return (
    <div className="industrial-border p-4 rounded-sm mb-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-4 gap-4">
        <div>
          <h2 className="text-sm font-black text-fuchsia-400 uppercase tracking-[0.2em] flex items-center gap-2">
            <span className="w-2 h-2 bg-fuchsia-500 rounded-full animate-pulse"></span>
            Faith Mission System
          </h2>
          <p className="text-[10px] text-gray-500 uppercase mt-1">Order Reconstruction Protocols</p>
        </div>
        
        <div className="flex gap-2">
          {(['status', 'type', 'progress'] as SortKey[]).map((key) => (
            <button
              key={key}
              onClick={() => setSortKey(key)}
              className={`text-[9px] px-3 py-1 border transition-all uppercase tracking-wider font-bold ${
                sortKey === key 
                  ? 'bg-fuchsia-900/40 border-fuchsia-500 text-fuchsia-400' 
                  : 'border-white/10 text-gray-500 hover:border-white/30 hover:text-gray-300'
              }`}
            >
              Sort by {key}
            </button>
          ))}
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-[11px] border-collapse">
          <thead>
            <tr className="text-left text-gray-600 border-b border-white/5 uppercase">
              <th className="pb-2 font-medium">Mission Objective</th>
              <th className="pb-2 font-medium">Priority</th>
              <th className="pb-2 font-medium">Status</th>
              <th className="pb-2 font-medium w-32">Reconstruction Progress</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/5">
            {sortedMissions.length === 0 ? (
              <tr>
                <td colSpan={4} className="py-8 text-center text-gray-700 italic uppercase">
                  No active missions. Initiate output via terminal.
                </td>
              </tr>
            ) : (
              sortedMissions.map((m) => (
                <tr key={m.id} className="group hover:bg-white/[0.02] transition-colors">
                  <td className="py-3 font-bold text-gray-300 group-hover:text-white">
                    {m.title}
                  </td>
                  <td className="py-3">
                    <span className={`px-1.5 py-0.5 rounded-sm text-[9px] font-black ${
                      m.type === 'MAIN' ? 'bg-cyan-900/30 text-cyan-400' : 'bg-gray-800 text-gray-500'
                    }`}>
                      {m.type}
                    </span>
                  </td>
                  <td className="py-3">
                    <span className={`uppercase font-bold ${
                      m.status === 'ACTIVE' ? 'text-amber-500' : 
                      m.status === 'COMPLETED' ? 'text-green-500' : 'text-red-900'
                    }`}>
                      {m.status}
                    </span>
                  </td>
                  <td className="py-3">
                    <div className="flex items-center gap-2">
                      <div className="flex-1 h-1.5 bg-gray-900 rounded-full overflow-hidden">
                        <div 
                          className="h-full bg-cyan-500 shadow-[0_0_8px_rgba(6,182,212,0.5)] transition-all duration-1000" 
                          style={{ width: `${m.progress}%` }}
                        ></div>
                      </div>
                      <span className="text-[10px] text-cyan-500 w-8 text-right font-bold">{m.progress}%</span>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};
