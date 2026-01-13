
import React from 'react';
import { TacticalMetrics } from '../types';
import { ICONS } from '../constants';
import { PieChart, Pie, Cell, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip } from 'recharts';

interface Props {
  metrics: TacticalMetrics;
}

export const Dashboard: React.FC<Props> = ({ metrics }) => {
  const energyData = [
    { name: 'Sleep', value: metrics.energy.sleep },
    { name: 'Diet', value: metrics.energy.diet },
    { name: 'Exercise', value: metrics.energy.exercise },
  ];

  const COLORS = ['#00f5ff', '#ff00ff', '#f59e0b'];

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
      <div className="industrial-border p-4 rounded-sm flex flex-col justify-between">
        <div className="flex items-center gap-2 mb-2 text-cyan-400 font-bold uppercase tracking-wider text-sm">
          <ICONS.Target className="w-5 h-5" />
          <span>Energy Reserve</span>
        </div>
        <div className="h-40 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={energyData} layout="vertical">
              <XAxis type="number" hide domain={[0, 100]} />
              <YAxis dataKey="name" type="category" stroke="#6b7280" fontSize={10} width={60} />
              <Bar dataKey="value" radius={[0, 2, 2, 0]}>
                {energyData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index]} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
        <div className="text-xs text-gray-500 mt-2">
          AVG SYSTEM INTEGRITY: {Math.round((metrics.energy.sleep + metrics.energy.diet + metrics.energy.exercise) / 3)}%
        </div>
      </div>

      <div className="industrial-border p-4 rounded-sm">
        <div className="flex items-center gap-2 mb-2 text-fuchsia-400 font-bold uppercase tracking-wider text-sm">
          <ICONS.Activity className="w-5 h-5" />
          <span>Territory Expansion</span>
        </div>
        <div className="flex flex-col items-center justify-center h-40">
          <div className="text-4xl font-black text-fuchsia-500 glow-text">{metrics.territory.productiveHours}h</div>
          <div className="text-[10px] text-gray-400 uppercase">Effective Working Hours Today</div>
          <div className="w-full h-2 bg-gray-800 mt-4 overflow-hidden rounded-full">
            <div 
              className="h-full bg-fuchsia-500 transition-all duration-500" 
              style={{ width: `${Math.min((metrics.territory.productiveHours / 8) * 100, 100)}%` }}
            ></div>
          </div>
        </div>
      </div>

      <div className="industrial-border p-4 rounded-sm">
        <div className="flex items-center gap-2 mb-2 text-amber-500 font-bold uppercase tracking-wider text-sm">
          <ICONS.Shield className="w-5 h-5" />
          <span>Fortress Stability</span>
        </div>
        <div className="flex flex-col items-center justify-center h-40">
          <div className="text-4xl font-black text-amber-500 glow-text">{metrics.fortress.interceptions}</div>
          <div className="text-[10px] text-gray-400 uppercase">Harmful Pulses Intercepted</div>
          <div className="text-[10px] text-gray-500 italic mt-2">Last Breach Deflected: {metrics.fortress.lastInterceptTime}</div>
        </div>
      </div>
    </div>
  );
};
