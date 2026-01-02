
import React, { useState, useEffect } from 'react';
import { NewsItem } from '../types';

const RightPanel: React.FC = () => {
  const [news, setNews] = useState<NewsItem[]>([
    { id: '1', title: 'Z-Tech raises $50M Series A', category: 'Funding', summary: 'The next-gen AI startup announced its latest round led by prominent VCs.', url: '#' },
    { id: '2', title: 'India leads in SaaS growth', category: 'India', summary: 'New report shows Indian SaaS ecosystem is outperforming global averages.', url: '#' },
    { id: '3', title: 'The future of remote work', category: 'Tech', summary: 'Trends suggesting a hybrid model is becoming the permanent standard.', url: '#' },
  ]);
  const [filter, setFilter] = useState('All');

  const filteredNews = filter === 'All' ? news : news.filter(n => n.category === filter);

  return (
    <div className="h-full flex flex-col gap-6 p-6 overflow-y-auto">
      <div className="glass-card p-5 rounded-2xl">
        <h3 className="text-sm font-semibold text-slate-400 uppercase tracking-wider mb-4">Today's Note</h3>
        <textarea 
          placeholder="Jot down quick thoughts..."
          className="w-full bg-white/5 border border-white/10 rounded-xl p-3 text-sm focus:outline-none focus:ring-1 focus:ring-blue-500/50 resize-none h-24"
        />
      </div>

      <div className="glass-card p-5 rounded-2xl">
        <h3 className="text-sm font-semibold text-slate-400 uppercase tracking-wider mb-4">Market News</h3>
        <div className="flex gap-2 mb-4 overflow-x-auto pb-2">
          {['All', 'Funding', 'Tech', 'India'].map(cat => (
            <button 
              key={cat}
              onClick={() => setFilter(cat)}
              className={`text-xs px-3 py-1 rounded-full border transition-colors whitespace-nowrap ${filter === cat ? 'bg-blue-600/20 border-blue-500 text-blue-400' : 'border-white/10 text-slate-400 hover:border-white/20'}`}
            >
              {cat}
            </button>
          ))}
        </div>
        <div className="space-y-4">
          {filteredNews.map(item => (
            <div key={item.id} className="group cursor-pointer">
              <span className="text-[10px] text-blue-400 font-bold uppercase">{item.category}</span>
              <h4 className="text-sm font-medium group-hover:text-blue-400 transition-colors leading-tight">{item.title}</h4>
              <p className="text-xs text-slate-500 mt-1 line-clamp-2">{item.summary}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="glass-card p-5 rounded-2xl">
        <h3 className="text-sm font-semibold text-slate-400 uppercase tracking-wider mb-4">Progress</h3>
        <div className="space-y-4">
          <div>
            <div className="flex justify-between text-xs mb-1">
              <span>Business Plan</span>
              <span>75%</span>
            </div>
            <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden">
              <div className="h-full bg-blue-500 w-[75%] shadow-[0_0_8px_rgba(59,130,246,0.5)]"></div>
            </div>
          </div>
          <div>
            <div className="flex justify-between text-xs mb-1">
              <span>Market Research</span>
              <span>40%</span>
            </div>
            <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden">
              <div className="h-full bg-purple-500 w-[40%] shadow-[0_0_8px_rgba(168,85,247,0.5)]"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RightPanel;
