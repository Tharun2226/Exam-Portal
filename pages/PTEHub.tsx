
import React from 'react';
import { PTE_QUESTION_TYPES } from '../constants';
import { AppRoute } from '../types';

interface PTEHubProps {
  onSelect: (type: string) => void;
}

const PTEHub: React.FC<PTEHubProps> = ({ onSelect }) => {
  return (
    <div className="p-8 max-w-7xl mx-auto space-y-12">
      <div className="text-center space-y-4">
        <h1 className="text-4xl font-extrabold text-slate-900">PTE Practice Portal</h1>
        <p className="text-slate-500 max-w-2xl mx-auto">
          Choose from various question types to begin your preparation. Our AI scoring engine provides 
          instant Band scores for Speaking, Writing, Reading, and Listening.
        </p>
      </div>

      <div className="grid md:grid-cols-3 gap-8">
        {['Speaking', 'Writing', 'Reading'].map((cat) => (
          <div key={cat} className="space-y-6">
            <h3 className="text-lg font-bold text-slate-800 flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-sky-500"></div>
              {cat}
            </h3>
            <div className="space-y-4">
              {PTE_QUESTION_TYPES.filter(t => t.category === cat).map((type) => (
                <button
                  key={type.id}
                  onClick={() => onSelect(type.id)}
                  className="w-full text-left bg-white p-5 rounded-2xl shadow-sm border border-slate-100 hover:border-sky-300 hover:shadow-md transition-all group"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-sky-50 text-sky-600 rounded-xl flex items-center justify-center group-hover:bg-sky-600 group-hover:text-white transition-colors">
                        {type.icon}
                      </div>
                      <div>
                        <h4 className="font-bold text-slate-800">{type.title}</h4>
                        <p className="text-xs text-slate-500">AI Scoring Enabled</p>
                      </div>
                    </div>
                    <div className="text-sky-400 group-hover:translate-x-1 transition-transform">
                      <svg width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PTEHub;
