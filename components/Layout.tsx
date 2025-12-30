
import React from 'react';
import { Menu, X, Bell, User as UserIcon, LogIn, LogOut, ChevronDown, Sparkles, Globe, Shield, Users, Star } from 'lucide-react';
import { AppRoute, User } from '../types.ts';

interface LayoutProps {
  children: React.ReactNode;
  currentRoute: AppRoute;
  setRoute: (route: AppRoute) => void;
  user: User | null;
  onLogout: () => void;
}

const Layout: React.FC<LayoutProps> = ({ children, currentRoute, setRoute, user, onLogout }) => {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  const [isProfileOpen, setIsProfileOpen] = React.useState(false);

  return (
    <div className="min-h-screen flex flex-col">
      <nav className="sticky top-0 z-50 glass shadow-sm px-4 md:px-12 py-4 flex items-center justify-between">
        <div className="flex items-center gap-4 cursor-pointer group" onClick={() => setRoute(AppRoute.HOME)}>
          <div className="bg-gradient-to-br from-indigo-600 to-indigo-800 p-2 rounded-2xl shadow-xl shadow-indigo-200 group-hover:scale-105 transition-transform duration-300">
            <div className="w-8 h-8 bg-white rounded-xl flex items-center justify-center font-black text-indigo-700 text-xl">A</div>
          </div>
          <div className="flex flex-col leading-none">
            <span className="text-xl font-extrabold tracking-tight text-slate-900">Alovuddin</span>
            <span className="text-[10px] font-black text-indigo-500 uppercase tracking-widest mt-0.5">Abdukarimov</span>
          </div>
        </div>

        {/* Desktop Menu */}
        <div className="hidden lg:flex items-center gap-10">
          {[
            { label: 'PTE Portal', route: AppRoute.PTE_PRACTICE },
            { label: 'IELTS Prep', route: AppRoute.IELTS_PRACTICE },
            { label: 'Pricing', route: AppRoute.HOME },
            { label: 'Resources', route: AppRoute.HOME }
          ].map((item) => (
            <button
              key={item.label}
              onClick={() => setRoute(item.route)}
              className={`text-[13px] font-bold uppercase tracking-widest transition-all ${
                currentRoute === item.route ? 'text-indigo-600' : 'text-slate-500 hover:text-indigo-600'
              }`}
            >
              {item.label}
            </button>
          ))}
          <div className="h-4 w-[1px] bg-slate-200"></div>
          <button 
            onClick={() => setRoute(AppRoute.DASHBOARD)}
            className={`text-[13px] font-bold uppercase tracking-widest transition-all ${currentRoute === AppRoute.DASHBOARD ? 'text-indigo-600' : 'text-slate-500 hover:text-indigo-600'}`}
          >
            My Dashboard
          </button>
        </div>

        <div className="flex items-center gap-4">
          {user ? (
            <div className="flex items-center gap-4">
              <button className="hidden sm:flex p-2.5 text-slate-400 hover:bg-slate-50 rounded-2xl transition-all relative group">
                <Bell className="w-5 h-5 group-hover:text-indigo-500" />
                <span className="absolute top-2.5 right-2.5 w-2 h-2 bg-orange-500 rounded-full border-2 border-white shadow-sm"></span>
              </button>
              
              <div className="relative">
                <button 
                  onClick={() => setIsProfileOpen(!isProfileOpen)}
                  className="flex items-center gap-3 p-1.5 pl-4 bg-white border border-slate-100 rounded-2xl hover:shadow-lg transition-all"
                >
                  <span className="hidden sm:inline text-xs font-bold text-slate-700">{user.name.split(' ')[0]}</span>
                  <img src={user.avatar} className="w-9 h-9 rounded-xl border-2 border-slate-50 shadow-sm" alt="avatar" />
                  <ChevronDown className={`w-4 h-4 text-slate-400 transition-transform duration-300 ${isProfileOpen ? 'rotate-180' : ''}`} />
                </button>

                {isProfileOpen && (
                  <div className="absolute right-0 mt-3 w-64 bg-white rounded-[1.5rem] shadow-2xl border border-slate-50 py-3 animate-in fade-in zoom-in-95 origin-top-right">
                    <div className="px-5 py-4 border-b border-slate-50 mb-2">
                      <p className="text-sm font-black text-slate-900">{user.name}</p>
                      <p className="text-xs text-slate-400 truncate mt-1">{user.email}</p>
                    </div>
                    <button className="w-full flex items-center gap-3 px-5 py-3 text-sm font-bold text-slate-600 hover:bg-slate-50 transition-colors">
                      <UserIcon className="w-4 h-4 text-indigo-500" /> Account Settings
                    </button>
                    <button className="w-full flex items-center gap-3 px-5 py-3 text-sm font-bold text-slate-600 hover:bg-slate-50 transition-colors">
                      <Shield className="w-4 h-4 text-emerald-500" /> Subscription
                    </button>
                    <div className="h-[1px] bg-slate-50 my-2 mx-5"></div>
                    <button 
                      onClick={() => { onLogout(); setIsProfileOpen(false); }}
                      className="w-full flex items-center gap-3 px-5 py-3 text-sm font-bold text-red-600 hover:bg-red-50 transition-colors"
                    >
                      <LogOut className="w-4 h-4" /> Sign Out
                    </button>
                  </div>
                )}
              </div>
            </div>
          ) : (
            <div className="flex items-center gap-3">
              <button 
                onClick={() => setRoute(AppRoute.AUTH)}
                className="hidden md:flex items-center gap-2 text-[13px] font-bold uppercase tracking-widest text-slate-800 hover:text-indigo-600 px-4 py-2"
              >
                Log In
              </button>
              <button 
                onClick={() => setRoute(AppRoute.AUTH)}
                className="bg-indigo-600 text-white px-8 py-3 rounded-2xl text-[13px] font-bold uppercase tracking-widest hover:bg-indigo-700 hover:shadow-2xl hover:shadow-indigo-200 transition-all"
              >
                Join Now
              </button>
            </div>
          )}
          <button className="lg:hidden p-2 text-slate-600" onClick={() => setIsMenuOpen(!isMenuOpen)}>
            {isMenuOpen ? <X /> : <Menu />}
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="lg:hidden fixed inset-0 z-[60] bg-white pt-24 px-8 animate-in slide-in-from-top-6 duration-300">
          <div className="flex flex-col gap-8">
            {['PTE Practice', 'IELTS Academy', 'Success Stories', 'Pricing', 'Resources'].map((item) => (
              <button key={item} className="text-2xl font-black text-slate-900 text-left border-b border-slate-50 pb-6">{item}</button>
            ))}
            {!user && (
              <button onClick={() => setRoute(AppRoute.AUTH)} className="w-full py-5 bg-indigo-600 text-white rounded-2xl font-black text-lg shadow-xl shadow-indigo-100">Sign In Free</button>
            )}
          </div>
        </div>
      )}

      <main className="flex-1">
        {children}
      </main>

      <footer className="bg-[#0A0D14] text-slate-400 py-24 px-8 border-t border-white/5">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-16">
          <div className="space-y-8">
            <div className="flex items-center gap-4 text-white">
              <div className="bg-indigo-600 p-2 rounded-xl shadow-xl shadow-indigo-600/20">A</div>
              <div className="flex flex-col leading-none">
                <span className="text-xl font-black tracking-tight">Alovuddin</span>
                <span className="text-[10px] font-black text-indigo-500 uppercase tracking-widest mt-0.5">Abdukarimov</span>
              </div>
            </div>
            <p className="text-[15px] leading-relaxed font-medium">
              Revolutionizing English test preparation with 99% accurate AI scoring and global mentor networks.
            </p>
            <div className="flex gap-4">
              {[1,2,3,4].map(i => (
                <div key={i} className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 hover:border-indigo-500/50 flex items-center justify-center transition-all group cursor-pointer">
                  <Globe className="w-4 h-4 group-hover:text-indigo-400" />
                </div>
              ))}
            </div>
          </div>
          <div>
            <h4 className="text-white font-bold mb-8 uppercase text-[11px] tracking-[0.2em] opacity-50">Quick Links</h4>
            <ul className="space-y-4 text-sm font-semibold">
              <li className="hover:text-white transition-colors cursor-pointer flex items-center gap-2">PTE Prediction File <Sparkles className="w-3 h-3 text-orange-400" /></li>
              <li className="hover:text-white transition-colors cursor-pointer">IELTS Recent Questions</li>
              <li className="hover:text-white transition-colors cursor-pointer">Score Comparison Chart</li>
              <li className="hover:text-white transition-colors cursor-pointer">AI Training Lab</li>
            </ul>
          </div>
          <div>
            <h4 className="text-white font-bold mb-8 uppercase text-[11px] tracking-[0.2em] opacity-50">Legal & Support</h4>
            <ul className="space-y-4 text-sm font-semibold">
              <li className="hover:text-white transition-colors cursor-pointer">Refund Policy</li>
              <li className="hover:text-white transition-colors cursor-pointer">Terms of Academic Use</li>
              <li className="hover:text-white transition-colors cursor-pointer">24/7 Expert Support</li>
              <li className="hover:text-white transition-colors cursor-pointer">Privacy Statement</li>
            </ul>
          </div>
          <div>
            <h4 className="text-white font-bold mb-8 uppercase text-[11px] tracking-[0.2em] opacity-50">Newsletter</h4>
            <p className="text-[13px] mb-6 leading-relaxed">Get the latest exam patterns delivered directly to your inbox.</p>
            <div className="flex gap-2">
              <input type="email" placeholder="Your Email" className="bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm w-full focus:ring-2 ring-indigo-600 outline-none transition-all" />
              <button className="bg-indigo-600 text-white px-6 py-3 rounded-xl text-sm font-bold hover:bg-indigo-700 transition-all shadow-lg shadow-indigo-600/20">Join</button>
            </div>
          </div>
        </div>
        <div className="max-w-7xl mx-auto mt-24 pt-10 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-8 text-[11px] font-bold uppercase tracking-widest opacity-40">
          <p>© 2025 Alovuddin Abdukarimov PTE Platform. Made with Precision.</p>
          <div className="flex gap-10">
            <span className="flex items-center gap-2"><Globe className="w-3 h-3" /> Global</span>
            <span className="flex items-center gap-2"><Users className="w-3 h-3" /> 1.2M Users</span>
            <span className="flex items-center gap-2"><Star className="w-3 h-3 text-orange-500" /> Rated 4.9/5</span>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Layout;
