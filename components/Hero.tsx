
import React from 'react';
import { AppRoute } from '../types';
// Add missing 'Users' icon to the lucide-react import
import { Sparkles, Trophy, Globe, Zap, ArrowRight, Play, Star, Users } from 'lucide-react';

interface HeroProps {
  onStart: (route: AppRoute) => void;
}

const Hero: React.FC<HeroProps> = ({ onStart }) => {
  return (
    <section className="relative pt-24 pb-32 px-4 md:px-12 overflow-hidden bg-[#F8FAFF]">
      {/* Decorative Circles */}
      <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-indigo-100/30 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/2 -z-10"></div>
      <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-orange-100/20 rounded-full blur-[100px] translate-y-1/2 -translate-x-1/2 -z-10"></div>

      <div className="max-w-7xl mx-auto grid lg:grid-cols-12 gap-16 items-center">
        <div className="lg:col-span-7 space-y-12 relative z-10 text-center lg:text-left">
          <div className="inline-flex items-center gap-3 bg-white border border-slate-100 shadow-xl shadow-indigo-100/50 px-5 py-2.5 rounded-2xl animate-fade-in-up">
            <div className="flex h-6 w-6 rounded-lg bg-indigo-600 items-center justify-center">
              <Sparkles className="w-3.5 h-3.5 text-white" />
            </div>
            <span className="text-[11px] font-black text-slate-800 uppercase tracking-[0.2em]">Alovuddin Abdukarimov Elite Mastery</span>
          </div>

          <h1 className="text-6xl md:text-8xl font-black text-slate-900 leading-[1] tracking-tight animate-fade-in-up stagger-1">
            Achieve Your <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-indigo-400">Dream Score.</span>
          </h1>

          <p className="text-xl text-slate-500 max-w-2xl mx-auto lg:mx-0 leading-relaxed font-medium animate-fade-in-up stagger-2">
            The world's most precise AI ecosystem for English proficiency. 
            Used by top-tier students to master PTE, IELTS, and CELPIP with unparalleled accuracy.
          </p>

          <div className="flex flex-col sm:flex-row gap-6 justify-center lg:justify-start animate-fade-in-up stagger-3">
            <button 
              onClick={() => onStart(AppRoute.PTE_PRACTICE)}
              className="px-12 py-6 bg-indigo-600 text-white rounded-2xl font-black shadow-2xl shadow-indigo-200 hover:bg-indigo-700 hover:scale-105 transition-all flex items-center justify-center gap-3 group"
            >
              Start Practice Now <Zap className="w-5 h-5 fill-current group-hover:scale-125 transition-transform" />
            </button>
            <button className="px-12 py-6 bg-white text-slate-800 border-2 border-slate-100 rounded-2xl font-black hover:bg-slate-50 hover:border-slate-200 transition-all flex items-center justify-center gap-3">
              <Play className="w-5 h-5 fill-indigo-600 text-indigo-600" /> Watch Demo
            </button>
          </div>

          <div className="flex flex-wrap items-center gap-10 text-[11px] text-slate-400 justify-center lg:justify-start pt-6 font-black uppercase tracking-[0.2em] animate-fade-in-up stagger-4">
            <div className="flex items-center gap-2"><Trophy className="w-4 h-4 text-orange-500" /> 99.1% Success Rate</div>
            <div className="flex items-center gap-2"><Globe className="w-4 h-4 text-indigo-500" /> 165+ Countries</div>
            <div className="flex items-center gap-2"><Star className="w-4 h-4 text-yellow-500 fill-yellow-500" /> 1.2M+ Students</div>
          </div>
        </div>

        <div className="lg:col-span-5 relative animate-slide-in-right stagger-2">
          <div className="relative z-10 animate-float">
            <div className="glass rounded-[3.5rem] p-10 shadow-[0_50px_100px_-20px_rgba(0,0,0,0.12)] border border-white/80 relative overflow-hidden">
              <div className="absolute top-0 left-0 w-full h-2.5 bg-gradient-to-r from-indigo-500 via-purple-500 to-orange-500"></div>
              
              <div className="flex items-center justify-between mb-12">
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 bg-gradient-to-br from-indigo-600 to-indigo-800 text-white rounded-2xl flex items-center justify-center font-black text-2xl shadow-xl shadow-indigo-200">A</div>
                  <div>
                    <h3 className="font-black text-slate-900 text-xl tracking-tight">AI Diagnostic</h3>
                    <p className="text-[10px] text-indigo-500 font-bold uppercase tracking-widest mt-1">Status: Analyzing Voice...</p>
                  </div>
                </div>
                <div className="flex gap-1.5">
                   <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></div>
                   <div className="w-2 h-2 rounded-full bg-slate-200"></div>
                </div>
              </div>

              <div className="space-y-8">
                {[
                  { label: 'Oral Fluency', score: 89, color: 'bg-indigo-600' },
                  { label: 'Pronunciation', score: 92, color: 'bg-orange-500' },
                  { label: 'Content Match', score: 84, color: 'bg-slate-900' },
                ].map((item) => (
                  <div key={item.label} className="space-y-3">
                    <div className="flex justify-between text-[11px] font-black text-slate-600 uppercase tracking-widest">
                      <span>{item.label}</span>
                      <span className="text-slate-900">{item.score}/90</span>
                    </div>
                    <div className="h-4 bg-slate-50 rounded-full overflow-hidden p-1 border border-slate-100 shadow-inner">
                      <div 
                        className={`h-full ${item.color} rounded-full transition-all duration-1500 shadow-lg`} 
                        style={{ width: `${(item.score/90)*100}%` }}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-12 p-8 bg-indigo-50/50 rounded-[2.5rem] border border-indigo-100/50">
                <div className="flex items-center gap-2 mb-3">
                   <Sparkles className="w-4 h-4 text-indigo-600" />
                   <span className="text-[11px] font-black text-indigo-600 uppercase tracking-widest">Expert Tip</span>
                </div>
                <p className="text-[15px] font-medium text-slate-700 leading-relaxed italic">"Focus on word stress in 'communication'. Your rhythm is currently in the top 5% of global aspirants."</p>
              </div>
            </div>
          </div>
          
          {/* Decorative floating widgets */}
          <div className="absolute -top-8 -right-8 bg-white shadow-2xl rounded-3xl p-6 border border-slate-50 z-20 animate-bounce-slow">
             <div className="text-center">
                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Target</p>
                <div className="flex items-baseline justify-center gap-1">
                   <span className="text-4xl font-black text-indigo-600">90</span>
                   <span className="text-sm font-bold text-slate-300">/90</span>
                </div>
             </div>
          </div>
          
          <div className="absolute -bottom-10 -left-10 bg-[#0A0D14] shadow-2xl rounded-[2rem] p-6 text-white z-20">
             <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-white/10 rounded-xl flex items-center justify-center border border-white/10">
                   <Users className="w-6 h-6 text-indigo-400" />
                </div>
                <div>
                   <p className="text-[10px] font-black opacity-40 uppercase tracking-widest">Global Community</p>
                   <p className="text-sm font-black">+142 Online Now</p>
                </div>
             </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
