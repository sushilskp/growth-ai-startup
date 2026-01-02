
import React, { useState, useEffect } from 'react';
import { User } from '../types';
import { storageService } from '../services/storageService';
import { INTEREST_CATEGORIES } from '../constants';

const Profile: React.FC = () => {
  const [user, setUser] = useState<User | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({ name: '', bio: '', interests: [] as string[] });

  useEffect(() => {
    const session = storageService.getSession();
    if (session) {
      setUser(session);
      setFormData({ 
        name: session.name, 
        bio: session.bio || '', 
        interests: session.interests || [] 
      });
    }
  }, []);

  const handleToggleInterest = (interest: string) => {
    setFormData(prev => ({
      ...prev,
      interests: prev.interests.includes(interest)
        ? prev.interests.filter(i => i !== interest)
        : [...prev.interests, interest]
    }));
  };

  const handleSave = () => {
    if (!user) return;
    const updatedUser = { ...user, ...formData };
    storageService.saveUser(updatedUser);
    storageService.setSession(updatedUser);
    setUser(updatedUser);
    setIsEditing(false);
  };

  if (!user) return null;

  return (
    <div className="max-w-2xl mx-auto space-y-8">
      <div className="relative">
        <div className="h-32 bg-gradient-to-r from-blue-600 to-purple-600 rounded-3xl opacity-20 animate-gradient"></div>
        <div className="absolute -bottom-10 left-8">
          <div className="w-24 h-24 rounded-3xl bg-slate-800 border-4 border-[#020617] flex items-center justify-center text-4xl font-bold text-blue-400 overflow-hidden">
            {user.avatar ? <img src={user.avatar} className="w-full h-full object-cover" /> : user.name.charAt(0)}
          </div>
        </div>
      </div>

      <div className="pt-10 flex justify-between items-start">
        <div>
          <h2 className="text-2xl font-bold">{user.name}</h2>
          <p className="text-slate-400">{user.email}</p>
        </div>
        <button 
          onClick={() => isEditing ? handleSave() : setIsEditing(true)}
          className={`px-6 py-2 rounded-xl text-sm font-medium transition-all ${isEditing ? 'bg-emerald-600 hover:bg-emerald-500' : 'bg-white/5 border border-white/10 hover:border-white/20'}`}
        >
          {isEditing ? 'Save Profile' : 'Edit Profile'}
        </button>
      </div>

      <div className="space-y-6">
        <div className="glass-card p-6 rounded-2xl space-y-4">
          <h3 className="text-sm font-semibold text-slate-400 uppercase tracking-wider">About Me</h3>
          {isEditing ? (
            <textarea 
              value={formData.bio}
              onChange={e => setFormData({...formData, bio: e.target.value})}
              className="w-full bg-white/5 border border-white/10 rounded-xl p-4 min-h-[100px] focus:outline-none focus:ring-1 focus:ring-blue-500/50"
              placeholder="Tell us about your startup journey..."
            />
          ) : (
            <p className="text-sm text-slate-300 italic">{user.bio || 'No bio yet. Start by telling the world your vision!'}</p>
          )}
        </div>

        <div className="glass-card p-6 rounded-2xl space-y-4">
          <h3 className="text-sm font-semibold text-slate-400 uppercase tracking-wider">Startup Interests</h3>
          <div className="flex flex-wrap gap-2">
            {INTEREST_CATEGORIES.map(cat => (
              <button 
                key={cat}
                disabled={!isEditing}
                onClick={() => handleToggleInterest(cat)}
                className={`px-4 py-1.5 rounded-full text-xs transition-all border ${
                  formData.interests.includes(cat)
                    ? 'bg-blue-600/20 border-blue-500 text-blue-400' 
                    : 'border-white/10 text-slate-500'
                } ${isEditing ? 'hover:border-white/20' : 'cursor-default'}`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
