
import React, { useState, useEffect } from 'react';
import { Task, User } from '../types';
import { storageService } from '../services/storageService';

const Tasks: React.FC = () => {
  const [user, setUser] = useState<User | null>(null);
  const [tasks, setTasks] = useState<Task[]>([]);
  const [newTask, setNewTask] = useState({ title: '', priority: 'Medium' as const, dueDate: '' });
  const [filter, setFilter] = useState<'All' | 'Active' | 'Done'>('All');

  useEffect(() => {
    const sessionUser = storageService.getSession();
    if (sessionUser) {
      setUser(sessionUser);
      setTasks(storageService.getTasks(sessionUser.email));
    }
  }, []);

  const addTask = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTask.title || !user) return;
    
    const task: Task = {
      id: Date.now().toString(),
      userId: user.email,
      title: newTask.title,
      priority: newTask.priority,
      dueDate: newTask.dueDate || new Date().toISOString().split('T')[0],
      completed: false
    };

    const updated = [...tasks, task];
    setTasks(updated);
    storageService.saveTasks(user.email, updated);
    setNewTask({ title: '', priority: 'Medium', dueDate: '' });
  };

  const toggleComplete = (id: string) => {
    if (!user) return;
    const updated = tasks.map(t => t.id === id ? { ...t, completed: !t.completed } : t);
    setTasks(updated);
    storageService.saveTasks(user.email, updated);
  };

  const deleteTask = (id: string) => {
    if (!user) return;
    const updated = tasks.filter(t => t.id !== id);
    setTasks(updated);
    storageService.saveTasks(user.email, updated);
  };

  const filteredTasks = tasks.filter(t => {
    if (filter === 'Active') return !t.completed;
    if (filter === 'Done') return t.completed;
    return true;
  });

  return (
    <div className="space-y-6">
      <header>
        <h2 className="text-3xl font-bold">Tasks</h2>
        <p className="text-slate-400">Manage your business milestones.</p>
      </header>

      <form onSubmit={addTask} className="glass-card p-6 rounded-2xl flex flex-wrap gap-4 items-end">
        <div className="flex-1 min-w-[200px]">
          <label className="block text-xs font-semibold text-slate-400 mb-1">TASK NAME</label>
          <input 
            value={newTask.title}
            onChange={e => setNewTask({...newTask, title: e.target.value})}
            className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 focus:outline-none focus:ring-1 focus:ring-blue-500/50"
            placeholder="e.g. Register company"
          />
        </div>
        <div>
          <label className="block text-xs font-semibold text-slate-400 mb-1">PRIORITY</label>
          <select 
            value={newTask.priority}
            onChange={e => setNewTask({...newTask, priority: e.target.value as any})}
            className="bg-[#0f172a] border border-white/10 rounded-xl px-4 py-2.5 text-sm"
          >
            <option>Low</option>
            <option>Medium</option>
            <option>High</option>
          </select>
        </div>
        <div>
          <label className="block text-xs font-semibold text-slate-400 mb-1">DUE DATE</label>
          <input 
            type="date"
            value={newTask.dueDate}
            onChange={e => setNewTask({...newTask, dueDate: e.target.value})}
            className="bg-[#0f172a] border border-white/10 rounded-xl px-4 py-2.5 text-sm"
          />
        </div>
        <button type="submit" className="bg-blue-600 hover:bg-blue-500 px-6 py-2.5 rounded-xl font-medium transition-colors">
          Add
        </button>
      </form>

      <div className="flex gap-2">
        {['All', 'Active', 'Done'].map(f => (
          <button 
            key={f}
            onClick={() => setFilter(f as any)}
            className={`px-4 py-2 rounded-xl text-sm border transition-all ${filter === f ? 'bg-blue-600/20 border-blue-500 text-blue-400' : 'border-white/10 text-slate-400 hover:border-white/20'}`}
          >
            {f}
          </button>
        ))}
      </div>

      <div className="space-y-3">
        {filteredTasks.length === 0 ? (
          <div className="text-center py-10 text-slate-500 italic">No tasks found</div>
        ) : (
          filteredTasks.map(task => (
            <div key={task.id} className="glass-card p-4 rounded-xl flex items-center gap-4 group">
              <input 
                type="checkbox" 
                checked={task.completed}
                onChange={() => toggleComplete(task.id)}
                className="w-5 h-5 rounded border-white/10 bg-white/5 text-blue-600 focus:ring-blue-500"
              />
              <div className="flex-1">
                <h4 className={`text-sm font-medium ${task.completed ? 'line-through text-slate-600' : 'text-slate-200'}`}>{task.title}</h4>
                <div className="flex items-center gap-3 mt-1">
                  <span className={`text-[10px] uppercase font-bold px-2 py-0.5 rounded ${
                    task.priority === 'High' ? 'bg-red-500/10 text-red-500' : 
                    task.priority === 'Medium' ? 'bg-amber-500/10 text-amber-500' : 
                    'bg-emerald-500/10 text-emerald-500'
                  }`}>
                    {task.priority}
                  </span>
                  <span className="text-[10px] text-slate-500">Due: {task.dueDate}</span>
                </div>
              </div>
              <button 
                onClick={() => deleteTask(task.id)}
                className="opacity-0 group-hover:opacity-100 p-2 text-slate-500 hover:text-red-500 transition-all"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                </svg>
              </button>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Tasks;
