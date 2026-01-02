
import React, { useState, useEffect } from 'react';
import { Post, User } from '../types';
import { storageService } from '../services/storageService';

const Community: React.FC = () => {
  const [user, setUser] = useState<User | null>(null);
  const [posts, setPosts] = useState<Post[]>([]);
  const [content, setContent] = useState('');
  const [tags, setTags] = useState('');

  useEffect(() => {
    setUser(storageService.getSession());
    setPosts(storageService.getPosts().sort((a, b) => b.createdAt - a.createdAt));
  }, []);

  const createPost = (e: React.FormEvent) => {
    e.preventDefault();
    if (!content.trim() || !user) return;

    const newPost: Post = {
      id: Date.now().toString(),
      userId: user.email,
      userName: user.name,
      userAvatar: user.avatar,
      content,
      tags: tags.split(',').map(t => t.trim()).filter(Boolean),
      likes: 0,
      comments: [],
      createdAt: Date.now()
    };

    const updated = [newPost, ...posts];
    setPosts(updated);
    storageService.savePosts(updated);
    setContent('');
    setTags('');
  };

  const likePost = (id: string) => {
    const updated = posts.map(p => p.id === id ? { ...p, likes: p.likes + 1 } : p);
    setPosts(updated);
    storageService.savePosts(updated);
  };

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <header>
        <h2 className="text-3xl font-bold">Community</h2>
        <p className="text-slate-400">Connect with fellow builders.</p>
      </header>

      <form onSubmit={createPost} className="glass-card p-6 rounded-2xl space-y-4">
        <textarea 
          value={content}
          onChange={e => setContent(e.target.value)}
          placeholder="Share an insight or ask for feedback..."
          className="w-full bg-white/5 border border-white/10 rounded-xl p-4 min-h-[100px] focus:outline-none focus:ring-1 focus:ring-blue-500/50 resize-none"
        />
        <div className="flex gap-2">
          <input 
            value={tags}
            onChange={e => setTags(e.target.value)}
            placeholder="Tags (comma separated)"
            className="flex-1 bg-white/5 border border-white/10 rounded-xl px-4 py-2 text-sm"
          />
          <button type="submit" className="bg-blue-600 hover:bg-blue-500 px-6 py-2 rounded-xl font-medium transition-colors">
            Post
          </button>
        </div>
      </form>

      <div className="space-y-6">
        {posts.map(post => (
          <article key={post.id} className="glass-card p-6 rounded-2xl space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center font-bold text-sm">
                {post.userName.charAt(0)}
              </div>
              <div>
                <h4 className="text-sm font-semibold">{post.userName}</h4>
                <p className="text-[10px] text-slate-500">{new Date(post.createdAt).toLocaleString()}</p>
              </div>
            </div>
            
            <p className="text-sm text-slate-300 leading-relaxed">{post.content}</p>
            
            <div className="flex gap-2">
              {post.tags.map(tag => (
                <span key={tag} className="text-[10px] text-blue-400 font-medium px-2 py-0.5 bg-blue-400/10 rounded">#{tag}</span>
              ))}
            </div>

            <div className="flex items-center gap-6 pt-2 border-t border-white/5">
              <button 
                onClick={() => likePost(post.id)}
                className="flex items-center gap-2 text-slate-400 hover:text-blue-400 transition-colors"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 10h4.757c.738 0 1.392.446 1.637 1.115l1.593 4.357c.221.603-.013 1.296-.534 1.634L17.25 20H14.4l-3.477-6h-1.423V8h3.585l2.815 2zM3 10h4a1 1 0 011 1v9a1 1 0 01-1 1H3a1 1 0 01-1-1v-9a1 1 0 011-1z" />
                </svg>
                <span className="text-xs">{post.likes}</span>
              </button>
              <button className="flex items-center gap-2 text-slate-400 hover:text-blue-400 transition-colors">
                <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                </svg>
                <span className="text-xs">{post.comments.length}</span>
              </button>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
};

export default Community;
