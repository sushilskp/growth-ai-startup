
import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { Icons } from '../constants';
import { storageService } from '../services/storageService';

interface SidebarProps {
  onClose?: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ onClose }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    storageService.setSession(null);
    window.location.reload();
  };

  const menuItems = [
    { name: 'Dashboard', path: '/', icon: Icons.Dashboard },
    { name: 'Tasks', path: '/tasks', icon: Icons.Tasks },
    { name: 'Community', path: '/community', icon: Icons.Community },
    { name: 'Profile', path: '/profile', icon: Icons.Profile },
    { name: 'Settings', path: '/settings', icon: Icons.Settings },
  ];

  return (
    <div className="h-full flex flex-col bg-[#020617]/80 backdrop-blur-xl border-r border-white/10 p-6">
      <div className="mb-10 flex items-center gap-3">
        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center shadow-lg shadow-blue-500/20">
          <span className="text-xl font-bold">N</span>
        </div>
        <h1 className="text-xl font-bold tracking-tight text-white">NovaBiz</h1>
      </div>

      <nav className="flex-1 space-y-2">
        {menuItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            onClick={onClose}
            className={({ isActive }) => `
              flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200
              ${isActive 
                ? 'bg-blue-600/20 text-blue-400 border border-blue-500/30' 
                : 'text-slate-400 hover:bg-white/5 hover:text-white'}
            `}
          >
            <item.icon />
            <span className="font-medium">{item.name}</span>
          </NavLink>
        ))}
      </nav>

      <button
        onClick={handleLogout}
        className="mt-auto flex items-center gap-3 px-4 py-3 text-slate-400 hover:text-red-400 hover:bg-red-400/10 rounded-xl transition-all duration-200"
      >
        <Icons.Logout />
        <span className="font-medium">Logout</span>
      </button>
    </div>
  );
};

export default Sidebar;
