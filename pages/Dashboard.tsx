
import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area } from 'recharts';
import { Activity, Book, Clock, Target } from 'lucide-react';

const data = [
  { name: 'Mon', pte: 65, ielts: 6.0 },
  { name: 'Tue', pte: 68, ielts: 6.5 },
  { name: 'Wed', pte: 72, ielts: 6.5 },
  { name: 'Thu', pte: 70, ielts: 7.0 },
  { name: 'Fri', pte: 75, ielts: 7.5 },
  { name: 'Sat', pte: 82, ielts: 7.5 },
  { name: 'Sun', pte: 84, ielts: 8.0 },
];

const Dashboard: React.FC = () => {
  return (
    <div className="p-8 max-w-7xl mx-auto space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Student Dashboard</h1>
          <p className="text-slate-500">Welcome back, Student! Your progress looks great.</p>
        </div>
        <div className="flex gap-2">
          <button className="px-4 py-2 bg-white border border-slate-200 rounded-lg text-sm font-semibold hover:bg-slate-50">Download Report</button>
          <button className="px-4 py-2 bg-sky-600 text-white rounded-lg text-sm font-semibold hover:bg-sky-700">Practice More</button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {[
          { label: 'Avg PTE Score', value: '78', icon: <Target className="text-sky-600" />, sub: '+12% from last week' },
          { label: 'Hours Practiced', value: '42.5', icon: <Clock className="text-orange-600" />, sub: 'Top 5% of users' },
          { label: 'Questions Solved', value: '1,284', icon: <Book className="text-indigo-600" />, sub: '24 today' },
          { label: 'Current Band', value: '8.0', icon: <Activity className="text-emerald-600" />, sub: 'IELTS Target: 8.5' },
        ].map((stat, i) => (
          <div key={i} className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
            <div className="flex items-center justify-between mb-4">
              <div className="p-2 bg-slate-50 rounded-lg">{stat.icon}</div>
              <span className="text-[10px] font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded">Active</span>
            </div>
            <h3 className="text-slate-500 text-xs font-bold uppercase tracking-wider">{stat.label}</h3>
            <div className="text-2xl font-bold text-slate-900 mt-1">{stat.value}</div>
            <p className="text-xs text-slate-400 mt-1">{stat.sub}</p>
          </div>
        ))}
      </div>

      <div className="grid md:grid-cols-3 gap-6">
        <div className="md:col-span-2 bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
          <h3 className="font-bold text-slate-800 mb-6">Score Analytics (Weekly Progress)</h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={data}>
                <defs>
                  <linearGradient id="colorPte" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#0ea5e9" stopOpacity={0.1}/>
                    <stop offset="95%" stopColor="#0ea5e9" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 12}} />
                <YAxis axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 12}} />
                <Tooltip 
                  contentStyle={{borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgba(0,0,0,0.1)'}}
                />
                <Area type="monotone" dataKey="pte" stroke="#0ea5e9" strokeWidth={3} fillOpacity={1} fill="url(#colorPte)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
          <h3 className="font-bold text-slate-800 mb-4">Recent Feedback</h3>
          <div className="space-y-4">
            {[
              { type: 'Writing', text: 'Excellent cohesion, but watch your complex sentence structure.', date: '2h ago' },
              { type: 'Speaking', text: 'Pronunciation is clear. Try to minimize hesitations.', date: '5h ago' },
              { type: 'Reading', text: 'Score improved by 5 points. Great job on MCQs.', date: '1d ago' },
            ].map((feed, i) => (
              <div key={i} className="p-3 bg-slate-50 rounded-xl border border-slate-100">
                <div className="flex justify-between items-start mb-1">
                  <span className="text-[10px] font-bold text-sky-600 uppercase tracking-widest">{feed.type}</span>
                  <span className="text-[10px] text-slate-400">{feed.date}</span>
                </div>
                <p className="text-xs text-slate-600 italic">"{feed.text}"</p>
              </div>
            ))}
          </div>
          <button className="w-full mt-6 py-3 border border-slate-200 rounded-xl text-sm font-bold text-slate-600 hover:bg-slate-50">View All History</button>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
