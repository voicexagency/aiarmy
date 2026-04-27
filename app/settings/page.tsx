'use client';

import { useState } from 'react';

interface TeamSettings {
  teamName: string;
  teamLead: string;
  timezone: string;
  workHoursStart: string;
  workHoursEnd: string;
  notificationsEnabled: boolean;
  darkMode: boolean;
}

interface AgentSettings {
  agentName: string;
  active: boolean;
  maxConcurrentTasks: number;
  priority: 'low' | 'medium' | 'high';
}

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState<'team' | 'agents' | 'integrations' | 'notifications'>('team');
  const [teamSettings, setTeamSettings] = useState<TeamSettings>({
    teamName: 'Reco Digital Services AI Team',
    teamLead: 'MegaManager',
    timezone: 'UTC',
    workHoursStart: '09:00',
    workHoursEnd: '18:00',
    notificationsEnabled: true,
    darkMode: true,
  });

  const [agentSettings, setAgentSettings] = useState<AgentSettings[]>([
    { agentName: 'Designer', active: true, maxConcurrentTasks: 3, priority: 'high' },
    { agentName: 'SMM', active: true, maxConcurrentTasks: 5, priority: 'high' },
    { agentName: 'MetaADS', active: true, maxConcurrentTasks: 2, priority: 'high' },
    { agentName: 'GoogleADS', active: true, maxConcurrentTasks: 2, priority: 'medium' },
    { agentName: 'Youtube', active: true, maxConcurrentTasks: 3, priority: 'medium' },
    { agentName: 'LeadGen', active: true, maxConcurrentTasks: 4, priority: 'high' },
  ]);

  const [integrations, setIntegrations] = useState({
    zapier: { enabled: false, status: 'Not Connected' },
    slack: { enabled: false, status: 'Not Connected' },
    gmail: { enabled: true, status: 'Connected' },
    ghl: { enabled: true, status: 'Connected' },
    stripe: { enabled: false, status: 'Not Connected' },
    airtable: { enabled: false, status: 'Not Connected' },
  });

  const [notifications, setNotifications] = useState({
    taskAssigned: true,
    taskCompleted: true,
    dealCreated: true,
    dealPaymentReceived: true,
    agentError: true,
    lowStorage: true,
  });

  const handleTeamSettingsChange = (field: keyof TeamSettings, value: any) => {
    setTeamSettings({ ...teamSettings, [field]: value });
  };

  const handleAgentSettingsChange = (index: number, field: keyof AgentSettings, value: any) => {
    const updated = [...agentSettings];
    updated[index] = { ...updated[index], [field]: value };
    setAgentSettings(updated);
  };

  const handleIntegrationToggle = (service: string) => {
    setIntegrations({
      ...integrations,
      [service]: {
        ...integrations[service as keyof typeof integrations],
        enabled: !integrations[service as keyof typeof integrations].enabled,
      },
    });
  };

  const handleNotificationToggle = (type: string) => {
    setNotifications({
      ...notifications,
      [type as keyof typeof notifications]: !notifications[type as keyof typeof notifications],
    });
  };

  const handleSaveTeamSettings = () => {
    alert('Team settings saved successfully!');
  };

  return (
    <div className="flex flex-col gap-8">
      {/* Tabs */}
      <div className="flex gap-4 border-b border-[#1e1e3a]">
        {[
          { id: 'team', label: '⚙️ Team Settings' },
          { id: 'agents', label: '🤖 Agent Configuration' },
          { id: 'integrations', label: '🔗 Integrations' },
          { id: 'notifications', label: '🔔 Notifications' },
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id as any)}
            className={`px-6 py-3 font-semibold transition-colors border-b-2 ${
              activeTab === tab.id
                ? 'text-[#8b5cf6] border-[#8b5cf6]'
                : 'text-gray-400 border-transparent hover:text-white'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Team Settings Tab */}
      {activeTab === 'team' && (
        <div className="space-y-6">
          <div className="bg-[#111127] rounded-xl border border-[#1e1e3a] p-6">
            <h3 className="text-xl font-bold mb-6">Team Configuration</h3>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2">Team Name</label>
                <input
                  type="text"
                  value={teamSettings.teamName}
                  onChange={(e) => handleTeamSettingsChange('teamName', e.target.value)}
                  className="w-full bg-[#1e1e3a] rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-[#8b5cf6]"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Team Lead</label>
                <input
                  type="text"
                  value={teamSettings.teamLead}
                  onChange={(e) => handleTeamSettingsChange('teamLead', e.target.value)}
                  className="w-full bg-[#1e1e3a] rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-[#8b5cf6]"
                  disabled
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Timezone</label>
                <select
                  value={teamSettings.timezone}
                  onChange={(e) => handleTeamSettingsChange('timezone', e.target.value)}
                  className="w-full bg-[#1e1e3a] rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-[#8b5cf6]"
                >
                  <option>UTC</option>
                  <option>EST</option>
                  <option>CST</option>
                  <option>MST</option>
                  <option>PST</option>
                  <option>IST</option>
                </select>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Work Hours Start</label>
                  <input
                    type="time"
                    value={teamSettings.workHoursStart}
                    onChange={(e) => handleTeamSettingsChange('workHoursStart', e.target.value)}
                    className="w-full bg-[#1e1e3a] rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-[#8b5cf6]"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Work Hours End</label>
                  <input
                    type="time"
                    value={teamSettings.workHoursEnd}
                    onChange={(e) => handleTeamSettingsChange('workHoursEnd', e.target.value)}
                    className="w-full bg-[#1e1e3a] rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-[#8b5cf6]"
                  />
                </div>
              </div>

              <div className="flex items-center gap-4 pt-4">
                <label className="flex items-center gap-3 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={teamSettings.notificationsEnabled}
                    onChange={(e) => handleTeamSettingsChange('notificationsEnabled', e.target.checked)}
                    className="w-5 h-5"
                  />
                  <span className="text-sm font-medium">Enable Notifications</span>
                </label>
              </div>

              <button
                onClick={handleSaveTeamSettings}
                className="mt-6 bg-[#8b5cf6] hover:bg-purple-600 px-6 py-2 rounded-lg font-semibold transition-colors w-full"
              >
                Save Settings
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Agent Settings Tab */}
      {activeTab === 'agents' && (
        <div className="space-y-4">
          {agentSettings.map((agent, idx) => (
            <div key={idx} className="bg-[#111127] rounded-xl border border-[#1e1e3a] p-6">
              <div className="flex justify-between items-start mb-4">
                <h3 className="text-lg font-bold">{agent.agentName}</h3>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={agent.active}
                    onChange={(e) => handleAgentSettingsChange(idx, 'active', e.target.checked)}
                    className="w-5 h-5"
                  />
                  <span className="text-sm font-medium">{agent.active ? 'Active' : 'Inactive'}</span>
                </label>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Max Concurrent Tasks</label>
                  <input
                    type="number"
                    min="1"
                    max="10"
                    value={agent.maxConcurrentTasks}
                    onChange={(e) => handleAgentSettingsChange(idx, 'maxConcurrentTasks', parseInt(e.target.value))}
                    className="w-full bg-[#1e1e3a] rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-[#8b5cf6]"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Priority</label>
                  <select
                    value={agent.priority}
                    onChange={(e) => handleAgentSettingsChange(idx, 'priority', e.target.value)}
                    className="w-full bg-[#1e1e3a] rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-[#8b5cf6]"
                  >
                    <option value="low">Low</option>
                    <option value="medium">Medium</option>
                    <option value="high">High</option>
                  </select>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Integrations Tab */}
      {activeTab === 'integrations' && (
        <div className="space-y-4">
          {Object.entries(integrations).map(([service, config]) => (
            <div key={service} className="bg-[#111127] rounded-xl border border-[#1e1e3a] p-6 flex justify-between items-center">
              <div>
                <h3 className="text-lg font-bold capitalize">{service}</h3>
                <p className={`text-sm mt-1 ${config.enabled ? 'text-green-400' : 'text-gray-400'}`}>
                  {config.status}
                </p>
              </div>
              <label className="flex items-center gap-3 cursor-pointer">
                <span className={`px-4 py-2 rounded-lg font-semibold text-sm ${
                  config.enabled ? 'bg-green-600/20 text-green-400' : 'bg-gray-600/20 text-gray-400'
                }`}>
                  {config.enabled ? 'Connected' : 'Disconnected'}
                </span>
                <input
                  type="checkbox"
                  checked={config.enabled}
                  onChange={() => handleIntegrationToggle(service)}
                  className="w-5 h-5"
                />
              </label>
            </div>
          ))}
        </div>
      )}

      {/* Notifications Tab */}
      {activeTab === 'notifications' && (
        <div className="space-y-4">
          {Object.entries(notifications).map(([type, enabled]) => (
            <div key={type} className="bg-[#111127] rounded-xl border border-[#1e1e3a] p-6 flex justify-between items-center">
              <div>
                <h3 className="text-lg font-bold capitalize">
                  {type.replace(/([A-Z])/g, ' $1').trim()}
                </h3>
              </div>
              <label className="flex items-center gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={enabled}
                  onChange={() => handleNotificationToggle(type)}
                  className="w-5 h-5"
                />
                <span className="text-sm font-medium">{enabled ? 'On' : 'Off'}</span>
              </label>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
