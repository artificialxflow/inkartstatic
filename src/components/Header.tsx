import React, { useState } from 'react';
import { UserRole } from '../types';
import { 
  Building2, 
  Search, 
  CreditCard, 
  Crown, 
  User, 
  Palette, 
  ShieldCheck, 
  Menu, 
  X, 
  Layers,
  Sparkles,
  ChevronDown
} from 'lucide-react';

interface HeaderProps {
  currentRole: UserRole;
  onRoleChange: (role: UserRole) => void;
  activeView: string;
  onNavigate: (view: string, businessId?: string) => void;
  savedBusinessesCount?: number;
}

export const Header: React.FC<HeaderProps> = ({
  currentRole,
  onRoleChange,
  activeView,
  onNavigate,
  savedBusinessesCount = 0,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const roleLabels: Record<UserRole, { label: string; icon: React.ReactNode; color: string; badge: string }> = {
    citizen: {
      label: 'شهروند / مشتری',
      icon: <User className="w-3.5 h-3.5" />,
      color: 'text-emerald-400 bg-emerald-950/60 border-emerald-800/60',
      badge: 'کاربر عادی'
    },
    business_owner: {
      label: 'صاحب کسب‌وکار',
      icon: <Building2 className="w-3.5 h-3.5" />,
      color: 'text-cyan-400 bg-cyan-950/60 border-cyan-800/60',
      badge: 'مدیر واحد صنفی'
    },
    card_designer: {
      label: 'طراح کارت',
      icon: <Palette className="w-3.5 h-3.5" />,
      color: 'text-purple-400 bg-purple-950/60 border-purple-800/60',
      badge: 'همکار طراح'
    },
    admin: {
      label: 'مدیر کل سیستم',
      icon: <ShieldCheck className="w-3.5 h-3.5" />,
      color: 'text-amber-400 bg-amber-950/60 border-amber-800/60',
      badge: 'دسترسی ارشد'
    },
  };

  const navItems = [
    { id: 'landing', label: 'صفحه اصلی', icon: <Sparkles className="w-4 h-4" /> },
    { id: 'search', label: 'جستجو و ویترین‌ها', icon: <Search className="w-4 h-4" /> },
    { id: 'card-maker', label: 'کارت‌ساز هوشمند', icon: <CreditCard className="w-4 h-4" /> },
    { id: 'pricing', label: 'تعرفه‌های اشتراک', icon: <Crown className="w-4 h-4" /> },
  ];

  return (
    <header className="sticky top-0 z-40 bg-[#0F172A]/90 backdrop-blur-md border-b border-slate-800 shadow-lg shadow-black/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-18">
          
          {/* Logo & Brand */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => onNavigate('landing')}
              className="flex items-center gap-2.5 text-right group focus:outline-none cursor-pointer"
            >
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-cyan-500 to-indigo-600 flex items-center justify-center text-white font-black text-xl shadow-lg shadow-cyan-500/20 group-hover:scale-105 transition-transform">
                <span>I</span>
              </div>
              <div className="flex flex-col">
                <div className="flex items-center gap-1.5">
                  <span className="font-extrabold text-lg text-slate-100 tracking-tight">اینکارت</span>
                  <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-cyan-950/80 text-cyan-400 border border-cyan-800/50">InKart</span>
                </div>
                <span className="text-[11px] text-slate-400 hidden sm:inline-block">سامانه جامع معرفی و ویترین کسب‌وکارها</span>
              </div>
            </button>
          </div>

          {/* Desktop Nav Links */}
          <nav className="hidden lg:flex items-center gap-1">
            {navItems.map((item) => {
              const isActive = activeView === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => onNavigate(item.id)}
                  className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-sm font-semibold transition-all cursor-pointer ${
                    isActive 
                      ? 'text-cyan-400 bg-slate-800/90 border border-slate-700/80 shadow-xs' 
                      : 'text-slate-300 hover:text-slate-100 hover:bg-slate-800/50'
                  }`}
                >
                  {item.icon}
                  <span>{item.label}</span>
                </button>
              );
            })}
          </nav>

          {/* Right Section: Role Switcher & Panel Action */}
          <div className="flex items-center gap-2.5 sm:gap-3.5">
            
            {/* Live Role Switcher Dropdown */}
            <div className="relative flex items-center">
              <div className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl border text-xs font-bold transition-all ${roleLabels[currentRole].color}`}>
                {roleLabels[currentRole].icon}
                <select
                  value={currentRole}
                  onChange={(e) => onRoleChange(e.target.value as UserRole)}
                  className="bg-transparent border-0 font-bold focus:ring-0 focus:outline-none cursor-pointer pr-1 pl-4 appearance-none text-current"
                  aria-label="تغییر نقش کاربری"
                >
                  <option value="citizen" className="bg-slate-900 text-slate-100">شهروند / مشتری</option>
                  <option value="business_owner" className="bg-slate-900 text-slate-100">صاحب کسب‌وکار</option>
                  <option value="card_designer" className="bg-slate-900 text-slate-100">طراح کارت</option>
                  <option value="admin" className="bg-slate-900 text-slate-100">مدیر سیستم (ادمین)</option>
                </select>
                <ChevronDown className="w-3.5 h-3.5 pointer-events-none -mr-3 text-current opacity-70" />
              </div>
            </div>

            {/* Panel CTA Button */}
            <button
              onClick={() => onNavigate('panel')}
              className={`flex items-center gap-2 px-3 sm:px-4 py-2 rounded-xl text-xs sm:text-sm font-bold shadow-xs transition-all cursor-pointer ${
                activeView === 'panel'
                  ? 'bg-slate-800 text-cyan-400 ring-2 ring-cyan-500/50 border border-slate-700'
                  : 'bg-gradient-to-r from-cyan-600 to-indigo-600 hover:from-cyan-500 hover:to-indigo-500 text-white shadow-lg shadow-cyan-500/20'
              }`}
            >
              <Layers className="w-4 h-4" />
              <span className="hidden sm:inline">ورود به پنل</span>
              <span className="sm:hidden">پنل</span>
              {currentRole === 'citizen' && savedBusinessesCount > 0 && (
                <span className="w-4 h-4 rounded-full bg-cyan-400 text-slate-950 text-[10px] flex items-center justify-center font-bold">
                  {savedBusinessesCount}
                </span>
              )}
            </button>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 rounded-xl text-slate-300 hover:bg-slate-800 cursor-pointer"
              aria-label="منو"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>

          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-slate-800 bg-slate-900/95 backdrop-blur-md px-4 pt-3 pb-5 space-y-2 animate-in slide-in-from-top-2 duration-150">
          <div className="text-xs font-bold text-slate-400 px-3 py-1">منوی دسترسی سریع</div>
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => {
                onNavigate(item.id);
                setMobileMenuOpen(false);
              }}
              className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-sm font-semibold cursor-pointer ${
                activeView === item.id ? 'bg-slate-800 text-cyan-400 font-bold border border-slate-700' : 'text-slate-300 hover:bg-slate-800/60'
              }`}
            >
              {item.icon}
              <span>{item.label}</span>
            </button>
          ))}

          <div className="pt-2 border-t border-slate-800 flex flex-col gap-2">
            <button
              onClick={() => {
                onNavigate('panel');
                setMobileMenuOpen(false);
              }}
              className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-cyan-600 to-indigo-600 text-white font-bold py-2.5 rounded-xl text-sm shadow-md cursor-pointer"
            >
              <Layers className="w-4 h-4" />
              <span>ورود به پنل {roleLabels[currentRole].label}</span>
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
