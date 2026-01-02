
import React, { useState } from 'react';
import { User } from '../types';
import { storageService } from '../services/storageService';

const Auth: React.FC = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({ name: '', email: '', password: '' });
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (isLogin) {
      const users = storageService.getUsers();
      const user = users.find(u => u.email === formData.email && u.password === formData.password);
      if (user) {
        storageService.setSession(user);
        window.location.reload();
      } else {
        setError('Invalid email or password');
      }
    } else {
      if (!formData.name || !formData.email || !formData.password) {
        setError('All fields are required');
        return;
      }
      const users = storageService.getUsers();
      if (users.some(u => u.email === formData.email)) {
        setError('Email already exists');
        return;
      }
      const newUser: User = {
        id: Date.now().toString(),
        name: formData.name,
        email: formData.email,
        password: formData.password,
        interests: []
      };
      storageService.saveUser(newUser);
      storageService.setSession(newUser);
      window.location.reload();
    }
  };

  return (
    <div className="min-h-screen bg-[#020617] flex items-center justify-center p-6 relative overflow-hidden">
      {/* Decorative Gradients */}
      <div className="absolute top-[-10%] left-[-10%] w-1/2 h-1/2 bg-blue-600/10 blur-[120px] rounded-full"></div>
      <div className="absolute bottom-[-10%] right-[-10%] w-1/2 h-1/2 bg-purple-600/10 blur-[120px] rounded-full"></div>

      <div className="w-full max-w-md relative">
        <div className="text-center mb-10">
          <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-blue-500 to-purple-600 mx-auto mb-4 flex items-center justify-center shadow-xl shadow-blue-500/20">
            <span className="text-3xl font-bold">N</span>
          </div>
          <h1 className="text-3xl font-bold">NovaBiz</h1>
          <p className="text-slate-400 mt-2">Accelerate your startup vision</p>
        </div>

        <div className="glass-card p-8 rounded-3xl">
          <h2 className="text-xl font-bold mb-6 text-center">{isLogin ? 'Welcome Back' : 'Join the Community'}</h2>
          
          <form onSubmit={handleSubmit} className="space-y-4">
            {!isLogin && (
              <div>
                <label className="block text-xs font-semibold text-slate-400 mb-1 uppercase tracking-wider">Name</label>
                <input 
                  type="text"
                  value={formData.name}
                  onChange={e => setFormData({...formData, name: e.target.value})}
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:ring-1 focus:ring-blue-500/50"
                  placeholder="John Doe"
                />
              </div>
            )}
            <div>
              <label className="block text-xs font-semibold text-slate-400 mb-1 uppercase tracking-wider">Email</label>
              <input 
                type="email"
                value={formData.email}
                onChange={e => setFormData({...formData, email: e.target.value})}
                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:ring-1 focus:ring-blue-500/50"
                placeholder="john@example.com"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-400 mb-1 uppercase tracking-wider">Password</label>
              <input 
                type="password"
                value={formData.password}
                onChange={e => setFormData({...formData, password: e.target.value})}
                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:ring-1 focus:ring-blue-500/50"
                placeholder="••••••••"
              />
            </div>
            {error && <p className="text-xs text-red-500 text-center">{error}</p>}
            <button type="submit" className="w-full bg-blue-600 hover:bg-blue-500 py-3 rounded-xl font-bold transition-all shadow-lg shadow-blue-500/20 mt-2">
              {isLogin ? 'Login' : 'Sign Up'}
            </button>
          </form>

          <p className="text-center text-sm text-slate-400 mt-6">
            {isLogin ? "Don't have an account? " : "Already have an account? "}
            <button onClick={() => setIsLogin(!isLogin)} className="text-blue-400 font-bold hover:underline decoration-blue-400/30">
              {isLogin ? 'Sign Up' : 'Login'}
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Auth;
