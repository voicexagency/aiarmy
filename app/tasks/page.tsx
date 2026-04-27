'use client';

import { useState, useEffect } from 'react';
import { DragDropContext, Droppable, Draggable, DropResult } from '@hello-pangea/dnd';

interface Task {
  id: string;
  title: string;
  description: string;
  agent: string;
  agentColor: string;
  priority: 'high' | 'medium' | 'low';
  status: 'backlog' | 'in-progress' | 'review' | 'completed';
  createdAt: string;
}

const columns = {
  'backlog': { title: 'Backlog', color: 'bg-gray-600' },
  'in-progress': { title: 'In Progress', color: 'bg-blue-600' },
  'review': { title: 'Review', color: 'bg-yellow-600' },
  'completed': { title: 'Completed', color: 'bg-green-600' },
};

const priorityColors = {
  high: 'bg-red-600',
  medium: 'bg-yellow-600',
  low: 'bg-gray-600',
};

const agents = [
  { name: 'MegaManager', color: '#8b5cf6' },
  { name: 'Designer', color: '#3b82f6' },
  { name: 'SMM', color: '#ec4899' },
  { name: 'MetaADS', color: '#10b981' },
  { name: 'GoogleADS', color: '#ef4444' },
  { name: 'Youtube', color: '#f59e0b' },
  { name: 'LeadGen', color: '#6366f1' },
  { name: 'CRM', color: '#f97316' },
  { name: 'PhoneCaller', color: '#f97316' },
  { name: 'Copywriter', color: '#06b6d4' },
  { name: 'Email Marketing Manager', color: '#14b8a6' },
  { name: 'AI Analyst', color: '#a21caf' },
  { name: 'Automation Engineer', color: '#64748b' },
  { name: 'SEO Specialist', color: '#34d399' },
  { name: 'Customer Support Rep', color: '#fb7185' },
];

export default function TasksPage() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    agent: 'MegaManager',
    priority: 'medium' as const,
  });

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    const res = await fetch('/api/tasks');
    const data = await res.json();
    setTasks(data);
  };

  const handleDragEnd = async (result: DropResult) => {
    if (!result.destination) return;

    const taskId = result.draggableId;
    const newStatus = result.destination.droppableId as Task['status'];

    const updatedTasks = tasks.map(task => 
      task.id === taskId ? { ...task, status: newStatus } : task
    );
    setTasks(updatedTasks);

    await fetch(`/api/tasks/${taskId}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ status: newStatus }),
    });
  };

  const handleCreateTask = async (e: React.FormEvent) => {
    e.preventDefault();
    const selectedAgent = agents.find(a => a.name === formData.agent);
    
    const res = await fetch('/api/tasks', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        ...formData,
        agentColor: selectedAgent?.color || '#8b5cf6',
        status: 'backlog',
      }),
    });
    
    const newTask = await res.json();
    setTasks([...tasks, newTask]);
    setShowModal(false);
    setFormData({ title: '', description: '', agent: 'MegaManager', priority: 'medium' });
  };

  const handleDeleteTask = async (taskId: string) => {
    await fetch(`/api/tasks/${taskId}`, { method: 'DELETE' });
    setTasks(tasks.filter(t => t.id !== taskId));
  };

  const getTasksByStatus = (status: Task['status']) => 
    tasks.filter(task => task.status === status);

  return (
    <div className="flex flex-col h-full">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Task Management</h1>
        <button
          onClick={() => setShowModal(true)}
          className="bg-[#8b5cf6] hover:bg-purple-600 px-6 py-3 rounded-lg font-semibold transition-colors"
        >
          + Add Task
        </button>
      </div>

      <DragDropContext onDragEnd={handleDragEnd}>
        <div className="flex gap-6 overflow-x-auto pb-4">
          {Object.entries(columns).map(([status, column]) => (
            <Droppable key={status} droppableId={status}>
              {(provided) => (
                <div
                  ref={provided.innerRef}
                  {...provided.droppableProps}
                  className="bg-[#111127] rounded-xl border border-[#1e1e3a] min-w-[300px] flex flex-col"
                >
                  <div className={`${column.color} text-white p-4 rounded-t-xl flex justify-between items-center`}>
                    <h2 className="font-semibold text-lg">{column.title}</h2>
                    <span className="bg-black/20 px-2 py-1 rounded-full text-sm">
                      {getTasksByStatus(status as Task['status']).length}
                    </span>
                  </div>
                  
                  <div className="p-4 space-y-3 flex-1">
                    {getTasksByStatus(status as Task['status']).map((task, index) => (
                      <Draggable key={task.id} draggableId={task.id} index={index}>
                        {(provided) => (
                          <div
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                            className="bg-[#1e1e3a] p-4 rounded-lg border border-[#2a2a4a] hover:border-[#3a3a5a] transition-colors cursor-move"
                          >
                            <div className="flex justify-between items-start mb-2">
                              <h3 className="font-semibold text-white">{task.title}</h3>
                              <button
                                onClick={() => handleDeleteTask(task.id)}
                                className="text-gray-400 hover:text-red-400 transition-colors"
                              >
                                ×
                              </button>
                            </div>
                            
                            <p className="text-gray-400 text-sm mb-3">{task.description}</p>
                            
                            <div className="flex items-center justify-between">
                              <div className="flex items-center gap-2">
                                <span 
                                  className="w-6 h-6 rounded-full flex items-center justify-center text-xs font-semibold text-white"
                                  style={{ backgroundColor: task.agentColor }}
                                >
                                  {task.agent.substring(0, 2).toUpperCase()}
                                </span>
                                <span className="text-sm text-gray-300">{task.agent}</span>
                              </div>
                              
                              <span className={`${priorityColors[task.priority]} text-white text-xs px-2 py-1 rounded-full`}>
                                {task.priority}
                              </span>
                            </div>
                          </div>
                        )}
                      </Draggable>
                    ))}
                    {provided.placeholder}
                  </div>
                </div>
              )}
            </Droppable>
          ))}
        </div>
      </DragDropContext>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <div className="bg-[#111127] rounded-xl border border-[#1e1e3a] p-6 w-full max-w-md">
            <h2 className="text-2xl font-semibold mb-4">Create New Task</h2>
            
            <form onSubmit={handleCreateTask} className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2">Title</label>
                <input
                  type="text"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  className="w-full bg-[#1e1e3a] rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-[#8b5cf6]"
                  required
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-2">Description</label>
                <textarea
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  className="w-full bg-[#1e1e3a] rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-[#8b5cf6] h-24"
                  required
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-2">Assign to</label>
                <select
                  value={formData.agent}
                  onChange={(e) => setFormData({ ...formData, agent: e.target.value })}
                  className="w-full bg-[#1e1e3a] rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-[#8b5cf6]"
                >
                  {agents.map(agent => (
                    <option key={agent.name} value={agent.name}>{agent.name}</option>
                  ))}
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-2">Priority</label>
                <select
                  value={formData.priority}
                  onChange={(e) => setFormData({ ...formData, priority: e.target.value as any })}
                  className="w-full bg-[#1e1e3a] rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-[#8b5cf6]"
                >
                  <option value="low">Low</option>
                  <option value="medium">Medium</option>
                  <option value="high">High</option>
                </select>
              </div>
              
              <div className="flex gap-3 pt-4">
                <button
                  type="submit"
                  className="flex-1 bg-[#8b5cf6] hover:bg-purple-600 py-2 rounded-lg font-semibold transition-colors"
                >
                  Create Task
                </button>
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="flex-1 bg-[#1e1e3a] hover:bg-[#2a2a4a] py-2 rounded-lg font-semibold transition-colors"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}