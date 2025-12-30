
import React, { useEffect, useState } from 'react';
import Layout from './components/Layout.tsx';
import Hero from './components/Hero.tsx';
import Dashboard from './pages/Dashboard.tsx';
import PTEHub from './pages/PTEHub.tsx';
import PracticeEngine from './pages/PracticeEngine.tsx';
import Auth from './pages/Auth.tsx';
import { AppRoute, User } from './types.ts';
import { FEATURES } from './constants.tsx';
import { Check, ArrowRight, Zap, Star, ShieldCheck, Download, Award, ChevronRight } from 'lucide-react';

const App: React.FC = () => {
  const [currentRoute, setCurrentRoute] = useState<AppRoute>(AppRoute.HOME);
  const [user, setUser] = useState<User | null>(null);
  const [selectedPracticeType, setSelectedPracticeType] = useState<string | null>(null);

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
        }
      });
    }, { threshold: 0.1 });

    document.querySelectorAll('.scroll-reveal').forEach(el => observer.observe(el));
    return () => observer.disconnect();
  }, [currentRoute]);

  const handleLogin = (userData: User) => {
    setUser(userData);
    setCurrentRoute(AppRoute.DASHBOARD);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleLogout = () => {
    setUser(null);
    setCurrentRoute(AppRoute.HOME);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleStartPractice = (type: string) => {
    if (!user) {
      setCurrentRoute(AppRoute.AUTH);
      return;
    }
    setSelectedPracticeType(type);
    setCurrentRoute(AppRoute.QUESTION_PRACTICE);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const renderContent = () => {
    switch (currentRoute) {
      case AppRoute.HOME:
        return (
          <div className="space-y-0">
            <Hero onStart={(route) => {
              if (route === AppRoute.PTE_PRACTICE && !user) {
                setCurrentRoute(AppRoute.AUTH);
              } else {
                setCurrentRoute(route);
              }
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }} />
            
            <section className="bg-white py-14 border-y border-slate-100 shadow-sm relative z-20">
              <div className="max-w-7xl mx-auto px-8 overflow-x-auto">
                <div className="flex items-center justify-between gap-12 min-w-max pb-2">
                  {[
                    { label: 'PTE Practice', icon: <Zap className="w-4 h-4" /> },
                    { label: 'IELTS Academic', icon: <Award className="w-4 h-4" /> },
                    { label: 'CELPIP Mastery', icon: <Star className="w-4 h-4" /> },
                    { label: 'DET Simulator', icon: <ShieldCheck className="w-4 h-4" /> },
                    { label: 'AI Scoring Lab', icon: <Zap className="w-4 h-4" /> },
                    { label: 'Free Mock Tests', icon: <Download className="w-4 h-4" /> }
                  ].map((link) => (
                    <button 
                      key={link.label} 
                      className="flex items-center gap-2.5 text-xs font-black uppercase tracking-widest text-slate-400 hover:text-indigo-600 transition-all group"
                    >
                      <span className="p-1.5 bg-slate-50 rounded-lg group-hover:bg-indigo-50 transition-colors">{link.icon}</span>
                      {link.label}
                    </button>
                  ))}
                </div>
              </div>
            </section>

            <section className="py-28 max-w-7xl mx-auto px-8">
              <div className="text-center mb-20 space-y-4 scroll-reveal">
                <h2 className="text-4xl md:text-5xl font-black text-slate-900 tracking-tight leading-tight">Master English with <br /><span className="text-indigo-600 underline decoration-indigo-200 underline-offset-8">Precision AI</span></h2>
                <p className="text-slate-500 font-medium max-w-2xl mx-auto text-lg leading-relaxed">Everything you need to jumpstart your international career, all in one place.</p>
              </div>
              <div className="grid md:grid-cols-3 gap-10">
                {[
                  { name: 'PTE Academic', color: 'indigo', desc: 'Industry-leading scoring match for all 20 question types.', stats: '99% Accuracy' },
                  { name: 'IELTS Master', color: 'orange', desc: 'Granular band-level feedback for Speaking and Writing.', stats: 'New 2025 Pattern' },
                  { name: 'DET Adaptive', color: 'emerald', desc: 'Simulate the exact adaptive nature of the DET exam.', stats: 'Fast Results' },
                ].map((test, i) => (
                  <div key={i} className={`group p-10 bg-white rounded-[3rem] border border-slate-100 shadow-sm hover:shadow-2xl transition-all duration-500 hover:-translate-y-3 scroll-reveal`}>
                    <div className={`mb-8 w-16 h-16 bg-slate-50 text-indigo-600 rounded-[1.5rem] flex items-center justify-center font-black text-2xl group-hover:bg-indigo-600 group-hover:text-white transition-all`}>
                      {test.name[0]}
                    </div>
                    <div className="flex justify-between items-start mb-5">
                      <h3 className="text-2xl font-black text-slate-900">{test.name}</h3>
                      <span className="text-[10px] font-black uppercase tracking-widest text-indigo-600 bg-indigo-50 px-3 py-1.5 rounded-full">{test.stats}</span>
                    </div>
                    <p className="text-slate-500 mb-10 font-medium leading-relaxed text-base">{test.desc}</p>
                    <button 
                      onClick={() => handleStartPractice(test.name)}
                      className="flex items-center gap-3 text-sm font-black text-indigo-600 hover:gap-5 transition-all group"
                    >
                      Practice Now <ChevronRight className="w-4 h-4 group-hover:translate-x-1" />
                    </button>
                  </div>
                ))}
              </div>
            </section>

            <section className="py-32 bg-slate-950 relative overflow-hidden">
               <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-indigo-600/10 rounded-full blur-[120px]"></div>
               <div className="max-w-7xl mx-auto px-8 grid lg:grid-cols-2 gap-20 items-center">
                  <div className="space-y-10 scroll-reveal">
                    <h2 className="text-4xl md:text-6xl font-black text-white leading-[1.1]">The AI Engine <br /><span className="text-indigo-400">Built for Excellence.</span></h2>
                    <p className="text-slate-400 text-lg leading-relaxed font-medium">Alovuddin's proprietary scoring engine is trained on 10M+ data points from Pearson and IDP examiners to guarantee the most reliable feedback in the market.</p>
                    <div className="grid sm:grid-cols-2 gap-6">
                      {[
                        'Pronunciation Tracking',
                        'Grammar Perfection',
                        'Cohesion Analysis',
                        'Lexical Resource',
                        'Real-time Timing',
                        'Adaptive Difficulty'
                      ].map((item, i) => (
                        <div key={i} className="flex items-center gap-4 text-slate-200">
                          <div className="w-6 h-6 rounded-lg bg-white/10 flex items-center justify-center">
                            <Check className="w-3 h-3 text-indigo-400" />
                          </div>
                          <span className="font-bold text-sm tracking-wide">{item}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div className="relative scroll-reveal">
                    <div className="glass rounded-[3.5rem] p-12 relative z-10 border-white/5 shadow-2xl bg-white/5 backdrop-blur-3xl">
                      <div className="space-y-10">
                        <div className="flex justify-between items-center">
                          <div>
                            <p className="text-[10px] font-black text-indigo-400 uppercase tracking-widest mb-1">Diagnostic Report</p>
                            <h4 className="text-3xl font-black text-white tracking-tight">Speaking Performance</h4>
                          </div>
                          <div className="bg-indigo-600 p-4 rounded-3xl text-center min-w-[80px]">
                             <span className="text-2xl font-black text-white">88</span>
                             <p className="text-[8px] text-white/60 font-black uppercase mt-0.5">Overall</p>
                          </div>
                        </div>
                        <div className="space-y-6">
                           {[
                             { label: 'Intonation', p: 94 },
                             { label: 'Fluency', p: 82 },
                             { label: 'Grammar', p: 90 }
                           ].map(item => (
                             <div key={item.label} className="space-y-2">
                               <div className="flex justify-between text-[11px] font-black uppercase text-slate-500 tracking-widest">
                                 <span>{item.label}</span>
                                 <span>{item.p}%</span>
                               </div>
                               <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                                 <div className="h-full bg-indigo-500 rounded-full" style={{ width: `${item.p}%` }}></div>
                               </div>
                             </div>
                           ))}
                        </div>
                        <button className="w-full py-5 bg-white text-slate-900 rounded-[1.5rem] font-black text-sm hover:scale-[1.02] transition-transform flex items-center justify-center gap-2">
                          Analyze My Voice <Zap className="w-4 h-4 fill-current" />
                        </button>
                      </div>
                    </div>
                  </div>
               </div>
            </section>

            <section id="pricing" className="py-32 max-w-7xl mx-auto px-8">
               <div className="text-center mb-20 scroll-reveal">
                  <h2 className="text-5xl font-black text-slate-900 mb-6">Transparent Pricing</h2>
                  <p className="text-slate-500 font-medium text-lg">No hidden fees. Just premium tools to help you succeed.</p>
               </div>
               <div className="grid lg:grid-cols-3 gap-10 items-stretch">
                  {[
                    { name: 'Standard', price: '49', features: ['30 Practice Sets', '5 Full Mock Tests', 'Basic AI Scoring', '7 Days Access'], active: false },
                    { name: 'Elite', price: '99', features: ['Unlimited Practice', '25 Scored Mock Tests', 'Deep AI Analysis', '30 Days Access', 'Priority Mentor'], active: true },
                    { name: 'Master', price: '199', features: ['Personal Mentor Session', '50 Full Mock Tests', 'VIP Prediction Files', '90 Days Access', 'Target Score Guarantee'], active: false },
                  ].map((plan, i) => (
                    <div key={i} className={`p-12 rounded-[3.5rem] border-2 transition-all duration-500 scroll-reveal ${plan.active ? 'bg-indigo-600 border-indigo-600 text-white shadow-2xl scale-105 z-10' : 'bg-white border-slate-100 text-slate-900 shadow-sm'}`}>
                      <h3 className={`text-xl font-black mb-6 ${plan.active ? 'text-indigo-100' : 'text-indigo-600'}`}>{plan.name}</h3>
                      <div className="flex items-baseline gap-1 mb-10">
                        <span className="text-5xl font-black tracking-tight">${plan.price}</span>
                        <span className="text-sm opacity-60 font-black uppercase tracking-widest">/mo</span>
                      </div>
                      <ul className="space-y-6 mb-12">
                        {plan.features.map(f => (
                          <li key={f} className="flex items-center gap-4 text-sm font-bold">
                            <div className={`p-1 rounded-md ${plan.active ? 'bg-indigo-500' : 'bg-indigo-50'}`}>
                              <Check className={`w-3 h-3 ${plan.active ? 'text-white' : 'text-indigo-600'}`} />
                            </div>
                            {f}
                          </li>
                        ))}
                      </ul>
                      <button className={`w-full py-5 rounded-2xl font-black text-sm transition-all ${plan.active ? 'bg-white text-indigo-600 hover:bg-indigo-50' : 'bg-slate-950 text-white hover:bg-slate-800'}`}>Choose Plan</button>
                    </div>
                  ))}
               </div>
            </section>
          </div>
        );
      case AppRoute.AUTH:
        return <Auth onLogin={handleLogin} />;
      case AppRoute.DASHBOARD:
        return user ? <Dashboard /> : <Auth onLogin={handleLogin} />;
      case AppRoute.PTE_PRACTICE:
        return user ? <PTEHub onSelect={handleStartPractice} /> : <Auth onLogin={handleLogin} />;
      case AppRoute.QUESTION_PRACTICE:
        return user ? <PracticeEngine type={selectedPracticeType || 'ra'} /> : <Auth onLogin={handleLogin} />;
      default:
        return <Hero onStart={setCurrentRoute} />;
    }
  };

  return (
    <Layout 
      currentRoute={currentRoute} 
      setRoute={(r) => { setCurrentRoute(r); window.scrollTo({ top: 0, behavior: 'smooth' }); }} 
      user={user} 
      onLogout={handleLogout}
    >
      {renderContent()}
    </Layout>
  );
};

export default App;
