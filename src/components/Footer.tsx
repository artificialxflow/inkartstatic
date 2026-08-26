import React from 'react';
import { 
  Building2, 
  ShieldCheck, 
  MapPin, 
  Phone, 
  Mail, 
  HeartHandshake, 
  Layers, 
  QrCode,
  Award
} from 'lucide-react';

interface FooterProps {
  onNavigate: (view: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  return (
    <footer className="bg-slate-950 text-slate-400 border-t border-slate-800/80 mt-20">
      {/* Top Banner: Transparency & Trust */}
      <div className="border-b border-slate-800/80 bg-slate-900/60 py-6 px-4">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4 text-center md:text-right">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-cyan-950/80 text-cyan-400 border border-cyan-800/50">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-slate-100">اصل شفافیت و راستی‌آزمایی برچسب‌ها</h4>
              <p className="text-xs text-slate-400">
                وضعیت جواز، عضویت در اتحادیه و ضمانت خدمات صرفاً بر اساس اظهارات خود کسب‌وکار و مدارک ارائه شده نمایش داده می‌شود.
              </p>
            </div>
          </div>
          <button
            onClick={() => onNavigate('card-maker')}
            className="flex items-center gap-2 px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-bold border border-slate-700 transition cursor-pointer"
          >
            <QrCode className="w-4 h-4 text-cyan-400" />
            <span>ساخت کارت ویزیت دیجیتال رایگان</span>
          </button>
        </div>
      </div>

      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        
        {/* Col 1: About InKart */}
        <div className="space-y-4">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-cyan-500 to-indigo-600 flex items-center justify-center text-white font-black text-lg shadow-lg shadow-cyan-500/20">
              <span>I</span>
            </div>
            <div>
              <span className="font-extrabold text-lg text-slate-100">اینکارت</span>
              <span className="text-xs text-cyan-400 font-bold block">InKart Directory</span>
            </div>
          </div>
          <p className="text-xs text-slate-400 leading-relaxed">
            اینکارت پلتفرم هوشمند کشف، معرفی و ویترین اختصاصی کسب‌وکارهای معتبر است. با کارت‌ساز دیجیتال پویا و ابزار جستجوی جغرافیایی، مشتریان نزدیک‌ترین و متناسب‌ترین خدمات را پیدا می‌کنند.
          </p>
          <div className="flex items-center gap-2 text-xs text-slate-400">
            <MapPin className="w-4 h-4 text-cyan-400 shrink-0" />
            <span>پوشش سراسری در تمامی استان‌ها و کلان‌شهرهای ایران</span>
          </div>
        </div>

        {/* Col 2: Quick Links */}
        <div className="space-y-3">
          <h4 className="text-sm font-bold text-slate-100 flex items-center gap-2">
            <Layers className="w-4 h-4 text-cyan-400" />
            <span>بخش‌های سامانه</span>
          </h4>
          <ul className="space-y-2 text-xs text-slate-400">
            <li>
              <button onClick={() => onNavigate('landing')} className="hover:text-cyan-400 transition cursor-pointer">صفحه اصلی و جستجو</button>
            </li>
            <li>
              <button onClick={() => onNavigate('search')} className="hover:text-cyan-400 transition cursor-pointer">جستجوی صنف و شهر</button>
            </li>
            <li>
              <button onClick={() => onNavigate('card-maker')} className="hover:text-cyan-400 transition cursor-pointer">استودیو کارت‌ساز پویا با QR</button>
            </li>
            <li>
              <button onClick={() => onNavigate('pricing')} className="hover:text-cyan-400 transition cursor-pointer">پلن‌ها و تعرفه‌های اشتراک</button>
            </li>
            <li>
              <button onClick={() => onNavigate('panel')} className="hover:text-cyan-400 transition cursor-pointer">پنل مدیریت یکپارچه</button>
            </li>
          </ul>
        </div>

        {/* Col 3: Popular Categories */}
        <div className="space-y-3">
          <h4 className="text-sm font-bold text-slate-100 flex items-center gap-2">
            <Building2 className="w-4 h-4 text-indigo-400" />
            <span>اصناف پربازدید</span>
          </h4>
          <ul className="space-y-2 text-xs text-slate-400">
            <li>
              <button onClick={() => onNavigate('search')} className="hover:text-cyan-400 transition cursor-pointer">خدمات تخصصی خودرو و دیتیلینگ</button>
            </li>
            <li>
              <button onClick={() => onNavigate('search')} className="hover:text-cyan-400 transition cursor-pointer">کلینیک‌های زیبایی و دندانپزشکی</button>
            </li>
            <li>
              <button onClick={() => onNavigate('search')} className="hover:text-cyan-400 transition cursor-pointer">کافه و رستوران‌های برتر</button>
            </li>
            <li>
              <button onClick={() => onNavigate('search')} className="hover:text-cyan-400 transition cursor-pointer">دکوراسیون داخلی و بازسازی</button>
            </li>
            <li>
              <button onClick={() => onNavigate('search')} className="hover:text-cyan-400 transition cursor-pointer">دفاتر وکالت و مشاوره حقوقی</button>
            </li>
          </ul>
        </div>

        {/* Col 4: Trust & Support */}
        <div className="space-y-3">
          <h4 className="text-sm font-bold text-slate-100 flex items-center gap-2">
            <Award className="w-4 h-4 text-amber-400" />
            <span>پشتیبانی و ارتباط</span>
          </h4>
          <p className="text-xs text-slate-400 leading-relaxed">
            تیم پشتیبانی اینکارت در ۷ روز هفته آماده پاسخگویی به صاحبان مشاغل و کاربران است.
          </p>
          <div className="space-y-1.5 text-xs text-slate-300">
            <div className="flex items-center gap-2">
              <Phone className="w-3.5 h-3.5 text-cyan-400" />
              <span>پشتیبانی: ۰۲۱-۸۸۹۹۰۰۱۱</span>
            </div>
            <div className="flex items-center gap-2">
              <Mail className="w-3.5 h-3.5 text-cyan-400" />
              <span>ایمیل: support@inkart.ir</span>
            </div>
          </div>
          <div className="pt-2 flex items-center gap-2">
            <span className="px-2 py-1 rounded bg-slate-900 text-[10px] text-slate-400 border border-slate-800">SSL 256-bit</span>
            <span className="px-2 py-1 rounded bg-slate-900 text-[10px] text-slate-400 border border-slate-800">PostGIS Ready</span>
            <span className="px-2 py-1 rounded bg-slate-900 text-[10px] text-slate-400 border border-slate-800">QR Generator</span>
          </div>
        </div>

      </div>

      {/* Copyright Bar */}
      <div className="border-t border-slate-800/80 py-4 px-4 text-center text-xs text-slate-500">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-2">
          <p>تمامی حقوق مادی و معنوی برای سامانه اینکارت (InKart) محفوظ است © ۱۴۰۵</p>
          <p className="text-[11px] text-slate-500">نسخه اختصاصی با تضمین مالکیت کامل کد و ساختار ماژولار</p>
        </div>
      </div>
    </footer>
  );
};
