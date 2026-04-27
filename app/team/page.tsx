'use client';

import { useState, useEffect } from 'react';

interface Task {
  id: string;
  title: string;
  agent: string;
  status: 'backlog' | 'in-progress' | 'review' | 'completed';
  agentColor: string;
}

interface Agent {
  name: string;
  role: string;
  emoji: string;
  color: string;
  status: 'working' | 'idle' | 'break';
}

const agents: Agent[] = [
  { name: 'Designer', role: 'Animated Website Designer', emoji: '🎨', color: '#3b82f6', status: 'working' },
  { name: 'SMM', role: 'Social Media Manager', emoji: '🎬', color: '#ec4899', status: 'working' },
  { name: 'MetaADS', role: 'Meta Ads Buyer', emoji: '🎯', color: '#10b981', status: 'working' },
  { name: 'GoogleADS', role: 'Google Ads Strategist', emoji: '🔍', color: '#ef4444', status: 'idle' },
  { name: 'Youtube', role: 'YouTube Content Manager', emoji: '📺', color: '#f59e0b', status: 'working' },
  { name: 'LeadGen', role: 'Lead Generation Specialist', emoji: '🧲', color: '#6366f1', status: 'working' },
  { name: 'CRM', role: 'Sales Rep & CRM Manager', emoji: '📞', color: '#f97316', status: 'working' },
  { name: 'PhoneCaller', role: 'Phone Sales Rep', emoji: '☎️', color: '#f97316', status: 'idle' },
  { name: 'Copywriter', role: 'Copywriter', emoji: '✍️', color: '#06b6d4', status: 'break' },
  { name: 'Email Marketing Manager', role: 'Email Marketing Manager', emoji: '📧', color: '#14b8a6', status: 'working' },
  { name: 'AI Analyst', role: 'AI Analyst / Data Scientist', emoji: '📊', color: '#a21caf', status: 'working' },
  { name: 'Automation Engineer', role: 'Automation Engineer', emoji: '🤖', color: '#64748b', status: 'idle' },
  { name: 'SEO Specialist', role: 'SEO Specialist', emoji: '🔎', color: '#34d399', status: 'working' },
  { name: 'Customer Support Rep', role: 'Customer Support Rep', emoji: '🗣️', color: '#fb7185', status: 'idle' },
];

export default function TeamPage() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [completedCounts, setCompletedCounts] = useState<Record<string, number>>({});

  useEffect(() => {
    const fetchTasks = async () => {
      const res = await fetch('/api/tasks');
      const data = await res.json();
      setTasks(data);

      // Count completed tasks per agent
      const counts: Record<string, number> = {};
      agents.forEach(agent => {
        counts[agent.name] = data.filter(
          (t: Task) => t.agent === agent.name && t.status === 'completed'
        ).length;
      });
      setCompletedCounts(counts);
    };

    fetchTasks();
  }, []);

  const getAgentCurrentTask = (agentName: string) => {
    return tasks.find(t => t.agent === agentName && t.status === 'in-progress');
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'working':
        return '🟢';
      case 'idle':
        return '🟡';
      case 'break':
        return '🔵';
      default:
        return '⚪';
    }
  };

  const activeTaskCount = tasks.filter(t => t.status === 'in-progress').length;
  const inProgressAgents = agents.filter(a => getAgentCurrentTask(a.name)).length;

  return (
    <div className="flex flex-col gap-8 relative">
      {/* SVG Connection Lines */}
      <svg className="absolute top-32 left-0 w-full h-96 pointer-events-none z-0" style={{ height: '600px' }}>
        <defs>
          <linearGradient id="purpleGrad" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#8b5cf6" stopOpacity="1" />
            <stop offset="100%" stopColor="#8b5cf6" stopOpacity="0.2" />
          </linearGradient>
        </defs>
        {/* Center line from MegaManager downward */}
        <line x1="50%" y1="80" x2="50%" y2="280" stroke="url(#purpleGrad)" strokeWidth="2" strokeDasharray="5,5" />
        
        {/* Lines to agents */}
        {agents.map((_, idx) => {
          const agentsPerRow = 3;
          const row = Math.floor(idx / agentsPerRow);
          const col = idx % agentsPerRow;
          const x = ((col + 1) / (agentsPerRow + 1)) * 100;
          const y = 320 + row * 180;
          return (
            <line
              key={`line-${idx}`}
              x1="50%"
              y1="280"
              x2={`${x}%`}
              y2={y}
              stroke="url(#purpleGrad)"
              strokeWidth="1.5"
              strokeDasharray="4,4"
            />
          );
        })}
      </svg>

      {/* MegaManager Card - Team Lead */}
      <div className="relative z-10 mb-4">
        <div className="mx-auto max-w-2xl bg-gradient-to-br from-[#1a1a2e] via-[#16213e] to-[#0f3460] rounded-2xl border-2 border-[#8b5cf6] p-8 backdrop-blur-xl shadow-2xl hover:shadow-purple-500/50 transition-all duration-300">
          <div className="absolute inset-0 bg-[#8b5cf6]/5 rounded-2xl" />
          
          <div className="relative z-10">
            <div className="flex items-center justify-between mb-6">
              <div>
                <div className="text-5xl mb-3">🤖</div>
                <h2 className="text-4xl font-bold text-white">MegaManager</h2>
                <p className="text-purple-300 font-semibold mt-1">Team Lead</p>
              </div>
              <div className="text-right">
                <div className="bg-[#8b5cf6]/20 border border-[#8b5cf6] rounded-lg px-6 py-3 mb-3">
                  <p className="text-4xl font-bold text-[#8b5cf6]">{activeTaskCount}</p>
                  <p className="text-xs text-purple-300">Active Tasks</p>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-4 mt-6">
              <div className="bg-[#8b5cf6]/10 rounded-lg p-4">
                <p className="text-gray-400 text-sm">Team Members</p>
                <p className="text-2xl font-bold text-white">15</p>
              </div>
              <div className="bg-[#8b5cf6]/10 rounded-lg p-4">
                <p className="text-gray-400 text-sm">Working Now</p>
                <p className="text-2xl font-bold text-[#8b5cf6]">{inProgressAgents}</p>
              </div>
              <div className="bg-[#8b5cf6]/10 rounded-lg p-4">
                <p className="text-gray-400 text-sm">Total Completed</p>
                <p className="text-2xl font-bold text-green-400">{Object.values(completedCounts).reduce((a, b) => a + b, 0)}</p>
              </div>
            </div>

            <p className="text-purple-200 text-sm mt-6 italic">Managing {inProgressAgents} agents with active tasks</p>
          </div>
        </div>
      </div>

      {/* Team Grid */}
      <div className="relative z-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {agents.map((agent) => {
            const currentTask = getAgentCurrentTask(agent.name);
            const completedCount = completedCounts[agent.name] || 0;

            return (
              <div
                key={agent.name}
                className="group relative"
              >
                {/* Glassmorphism Card */}
                <div
                  className="bg-gradient-to-br from-[#1a1a2e]/80 to-[#16213e]/80 rounded-xl border backdrop-blur-xl p-6 transition-all duration-300 hover:shadow-lg"
                  style={{
                    borderColor: agent.color,
                    borderWidth: '2px',
                    boxShadow: `inset 0 0 20px ${agent.color}15, 0 0 30px ${agent.color}10`,
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.boxShadow = `inset 0 0 20px ${agent.color}25, 0 0 40px ${agent.color}30`;
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.boxShadow = `inset 0 0 20px ${agent.color}15, 0 0 30px ${agent.color}10`;
                  }}
                >
                  {/* Left Border Accent */}
                  <div
                    className="absolute left-0 top-0 bottom-0 w-1 rounded-l-xl"
                    style={{ backgroundColor: agent.color }}
                  />

                  {/* Header */}
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <span className="text-4xl">{agent.emoji}</span>
                      <div>
                        <h3 className="text-lg font-bold text-white">{agent.name}</h3>
                        <p className="text-xs text-gray-400">{agent.role}</p>
                      </div>
                    </div>
                    <span className="text-xl">{getStatusColor(agent.status)}</span>
                  </div>

                  {/* Current Task */}
                  {currentTask ? (
                    <div className="bg-[#8b5cf6]/10 rounded-lg p-3 mb-4 border border-[#8b5cf6]/30">
                      <p className="text-xs text-gray-400 mb-1">Current Task</p>
                      <p className="text-sm font-semibold text-white truncate">{currentTask.title}</p>
                    </div>
                  ) : (
                    <div className="bg-gray-900/50 rounded-lg p-3 mb-4 border border-gray-700/30">
                      <p className="text-xs text-gray-500">No active task</p>
                    </div>
                  )}

                  {/* Stats */}
                  <div className="flex gap-3">
                    <div
                      className="flex-1 rounded-lg p-3 text-center"
                      style={{ backgroundColor: `${agent.color}15` }}
                    >
                      <p className="text-xs text-gray-400">Completed</p>
                      <p className="text-xl font-bold" style={{ color: agent.color }}>
                        {completedCount}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
