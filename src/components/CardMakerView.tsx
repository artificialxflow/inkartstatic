import React, { useState } from 'react';
import { Business, CardTemplate } from '../types';
import { CARD_TEMPLATES_DATA } from '../mockData';
import { QRCodeDisplay } from './QRCodeDisplay';
import { 
  CreditCard, 
  Sparkles, 
  Palette, 
  Download, 
  Share2, 
  Printer, 
  QrCode, 
  Phone, 
  MapPin, 
  CheckCircle2, 
  Layers, 
  User, 
  Building2,
  ExternalLink,
  Copy
} from 'lucide-react';

interface CardMakerViewProps {
  business?: Business | null;
  onNavigateToBusiness?: (businessId: string) => void;
}

export const CardMakerView: React.FC<CardMakerViewProps> = ({
  business,
  onNavigateToBusiness,
}) => {
  const [selectedTemplateId, setSelectedTemplateId] = useState<string>(
    business?.selectedTemplateId || CARD_TEMPLATES_DATA[0].id
  );

  // Editable Card States
  const [title, setTitle] = useState(business?.title || 'کلینیک دندان‌پزشکی دکتر نیلوفر کیانی');
  const [manager, setManager] = useState(business?.managerName || 'دکتر نیلوفر کیانی');
  const [category, setCategory] = useState(business?.category || 'کلینیک و دندان‌پزشکی');
  const [tagline, setTagline] = useState(business?.shortBio || 'طراحی تخصصی خط لبخند، ایمپلنت فوری دیجیتال و لمینت سرامیکی');
  const [phone, setPhone] = useState(business?.phone || '03136284900');
  const [mobile, setMobile] = useState(business?.mobile || '09132223344');
  const [address, setAddress] = useState(business?.address || 'اصفهان، خیابان چهارباغ بالا، مجتمع پارسیان');
  const [instagram, setInstagram] = useState(business?.instagram || 'dr.kiani_dentistry');
  const [designerCode, setDesignerCode] = useState(business?.designerReferralCode || 'DES-208');
  const [isCopied, setIsCopied] = useState(false);
  const [isDownloaded, setIsDownloaded] = useState(false);

  const selectedTemplate = CARD_TEMPLATES_DATA.find(t => t.id === selectedTemplateId) || CARD_TEMPLATES_DATA[0];

  const cardQrUrl = `https://inkart.ir/biz/${business?.slug || 'my-business-card'}`;

  const handleCopyLink = () => {
    navigator.clipboard.writeText(cardQrUrl);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 3000);
  };

  const handleDownload = () => {
    setIsDownloaded(true);
    setTimeout(() => setIsDownloaded(false), 3000);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      
      {/* Header Banner */}
      <div className="bg-slate-900/90 rounded-2xl p-6 border border-slate-800 shadow-xl shadow-cyan-950/20 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-bold text-cyan-400 mb-1">
            <Sparkles className="w-4 h-4" />
            <span>استودیو کارت‌ساز دیجیتال پویا با بارکد QR</span>
          </div>
          <h1 className="text-2xl font-black text-slate-100">طراحی و ساخت کارت ویزیت هوشمند</h1>
          <p className="text-xs text-slate-400 mt-1">
            قالب دلخواه خود را انتخاب کنید، مشخصات را شخصی‌سازی نمایید و بارکد اختصاصی متصل به ویترین دریافت کنید.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={handleCopyLink}
            className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 font-bold text-xs transition cursor-pointer"
          >
            <Share2 className="w-3.5 h-3.5 text-cyan-400" />
            <span>{isCopied ? 'لینک کپی شد!' : 'کپی لینک کارت'}</span>
          </button>

          <button
            onClick={handleDownload}
            className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-gradient-to-r from-cyan-600 to-indigo-600 hover:from-cyan-500 hover:to-indigo-500 text-white font-bold text-xs shadow-lg shadow-cyan-500/20 transition cursor-pointer"
          >
            <Download className="w-3.5 h-3.5" />
            <span>{isDownloaded ? 'در حال دریافت...' : 'دانلود فایل باکیفیت چاپ'}</span>
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Left Column: Interactive Live Preview (6 Cols) */}
        <div className="lg:col-span-6 space-y-6">
          <div className="sticky top-24 space-y-4">
            
            <div className="flex items-center justify-between text-xs font-bold text-slate-400">
              <span className="flex items-center gap-1.5">
                <CreditCard className="w-4 h-4 text-cyan-400" />
                <span>پیش‌نمایش زنده کارت (روی و پشت):</span>
              </span>
              <span className="text-cyan-400 bg-cyan-950/80 border border-cyan-800/60 px-2 py-0.5 rounded-md">
                قالب فعال: {selectedTemplate.name}
              </span>
            </div>

            {/* Live Card Render Front/Back */}
            <div className="space-y-4">
              
              {/* Card Face 1: Front (نمای روی کارت) */}
              <div className={`w-full aspect-[16/9.5] rounded-3xl p-6 sm:p-8 bg-gradient-to-br ${selectedTemplate.bgGradient} text-white shadow-2xl border border-white/10 relative overflow-hidden flex flex-col justify-between`}>
                
                {/* Background Pattern */}
                <div className="absolute inset-0 bg-[radial-gradient(#ffffff_1px,transparent_1px)] [background-size:24px_24px] opacity-10 pointer-events-none" />

                {/* Top Row: Logo & Category */}
                <div className="flex items-start justify-between relative z-10">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-2xl bg-white/10 backdrop-blur border border-white/20 flex items-center justify-center font-black text-xl text-white shadow-inner">
                      <span>I</span>
                    </div>
                    <div>
                      <span className="text-[11px] font-bold text-slate-300 block">{category}</span>
                      <span className="text-[10px] text-amber-400 font-medium">عضو اینکارت</span>
                    </div>
                  </div>

                  <div className="text-left">
                    <span className="text-[10px] font-mono tracking-widest text-slate-400 block uppercase">SMART BUSINESS CARD</span>
                  </div>
                </div>

                {/* Center: Title & Tagline */}
                <div className="space-y-1 relative z-10 my-auto">
                  <h3 className="text-lg sm:text-xl font-black tracking-tight" style={{ color: selectedTemplate.textColor }}>
                    {title}
                  </h3>
                  <p className="text-xs text-slate-300 line-clamp-2 leading-relaxed font-normal">
                    {tagline}
                  </p>
                  <p className="text-xs text-slate-400 font-medium pt-1">
                    مدیریت: <span className="text-white font-bold">{manager}</span>
                  </p>
                </div>

                {/* Bottom Row: Contact & Address */}
                <div className="pt-3 border-t border-white/10 flex items-center justify-between text-[11px] text-slate-300 relative z-10">
                  <div className="flex items-center gap-3">
                    <span className="flex items-center gap-1 font-bold">
                      <Phone className="w-3.5 h-3.5 text-blue-400" />
                      <span dir="ltr">{phone}</span>
                    </span>
                    {instagram && (
                      <span className="hidden sm:inline text-slate-300">
                        @{instagram}
                      </span>
                    )}
                  </div>
                  <span className="text-[10px] text-slate-400 font-medium">inkart.ir</span>
                </div>

              </div>

              {/* Card Face 2: Back with QR (نمای پشت کارت و بارکد) */}
              <div className={`w-full aspect-[16/9.5] rounded-3xl p-6 sm:p-8 bg-gradient-to-bl ${selectedTemplate.bgGradient} text-white shadow-xl border border-white/10 relative overflow-hidden flex items-center justify-between`}>
                
                {/* Back info */}
                <div className="space-y-3 max-w-[60%] relative z-10 text-right">
                  <div className="space-y-1">
                    <span className="text-[10px] font-bold text-amber-400 block">اسکن کنید و متصل شوید</span>
                    <h4 className="text-base font-black text-white">{title}</h4>
                    <p className="text-[11px] text-slate-300 line-clamp-2">
                      {address}
                    </p>
                  </div>

                  <div className="space-y-1 text-[11px] text-slate-300">
                    <div className="flex items-center gap-1">
                      <Phone className="w-3 h-3 text-emerald-400" />
                      <span dir="ltr">{mobile}</span>
                    </div>
                    <div className="text-[10px] text-slate-400">
                      دسترسی به گالری عکس، لیست قیمت و مسیریابی
                    </div>
                  </div>
                </div>

                {/* Interactive QR Display */}
                <div className="relative z-10 shrink-0 bg-white p-2 rounded-2xl shadow-2xl">
                  <QRCodeDisplay
                    value={cardQrUrl}
                    size={110}
                    fgColor="#0f172a"
                    bgColor="#ffffff"
                  />
                </div>

              </div>

            </div>

            {/* Template Designer Attribution */}
            <div className="bg-slate-900/90 rounded-2xl p-4 border border-slate-800 flex items-center justify-between text-xs">
              <div className="flex items-center gap-3">
                <img
                  src={selectedTemplate.designerAvatar}
                  alt={selectedTemplate.designerName}
                  className="w-10 h-10 rounded-xl object-cover border border-slate-700"
                />
                <div>
                  <span className="font-bold text-slate-200 block">طراح قالب: {selectedTemplate.designerName}</span>
                  <span className="text-[11px] text-slate-400 font-mono">کد معرف: {selectedTemplate.designerCode}</span>
                </div>
              </div>
              <span className="text-emerald-400 bg-emerald-950/80 px-2.5 py-1 rounded-lg font-bold text-[11px] border border-emerald-800/60">
                قالب رسمی تایید شده
              </span>
            </div>

          </div>
        </div>

        {/* Right Column: Customization Forms & Templates Picker (6 Cols) */}
        <div className="lg:col-span-6 space-y-6">
          
          {/* 1. Template Picker */}
          <div className="bg-slate-900/90 rounded-2xl p-6 border border-slate-800 space-y-4">
            <h3 className="font-bold text-sm text-slate-100 flex items-center gap-2">
              <Palette className="w-4 h-4 text-cyan-400" />
              <span>انتخاب قالب کارت (۳ استایل مدرن و لوکس)</span>
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {CARD_TEMPLATES_DATA.map((tmpl) => {
                const isSelected = tmpl.id === selectedTemplateId;
                return (
                  <button
                    key={tmpl.id}
                    onClick={() => setSelectedTemplateId(tmpl.id)}
                    className={`p-3 rounded-2xl border text-right space-y-2 transition cursor-pointer ${
                      isSelected
                        ? 'border-cyan-500 bg-cyan-950/40 shadow-sm ring-2 ring-cyan-500/20'
                        : 'border-slate-800 hover:border-slate-700 bg-slate-800/80'
                    }`}
                  >
                    <div className={`h-16 rounded-xl bg-gradient-to-br ${tmpl.bgGradient} flex items-center justify-center p-2 shadow-xs`}>
                      <span className="text-xs font-bold" style={{ color: tmpl.textColor }}>
                        {tmpl.name}
                      </span>
                    </div>
                    <div>
                      <span className="font-bold text-xs text-slate-200 block line-clamp-1">{tmpl.name}</span>
                      <span className="text-[10px] text-slate-400 block">{tmpl.usesCount} استفاده فعال</span>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* 2. Custom Content Fields */}
          <div className="bg-slate-900/90 rounded-2xl p-6 border border-slate-800 space-y-4">
            <h3 className="font-bold text-sm text-slate-100 flex items-center gap-2">
              <Building2 className="w-4 h-4 text-emerald-400" />
              <span>اطلاعات مندرج بر روی کارت دیجیتال</span>
            </h3>

            <div className="space-y-3 text-xs">
              
              <div>
                <label className="block font-bold text-slate-300 mb-1">عنوان کامل کسب‌وکار / مرکز</label>
                <input
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="w-full bg-slate-800/90 border border-slate-700 rounded-xl p-2.5 text-xs text-slate-100 placeholder:text-slate-500 focus:outline-none focus:border-cyan-500"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-slate-300 mb-1">نام مدیر / پزشک / صاحب حرفه</label>
                  <input
                    type="text"
                    value={manager}
                    onChange={(e) => setManager(e.target.value)}
                    className="w-full bg-slate-800/90 border border-slate-700 rounded-xl p-2.5 text-xs text-slate-100 placeholder:text-slate-500 focus:outline-none focus:border-cyan-500"
                  />
                </div>

                <div>
                  <label className="block font-bold text-slate-300 mb-1">دسته‌بندی و حوزه خدمت</label>
                  <input
                    type="text"
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    className="w-full bg-slate-800/90 border border-slate-700 rounded-xl p-2.5 text-xs text-slate-100 placeholder:text-slate-500 focus:outline-none focus:border-cyan-500"
                  />
                </div>
              </div>

              <div>
                <label className="block font-bold text-slate-300 mb-1">شعار یا خدمات اصلی (متن کوتاه)</label>
                <textarea
                  rows={2}
                  value={tagline}
                  onChange={(e) => setTagline(e.target.value)}
                  className="w-full bg-slate-800/90 border border-slate-700 rounded-xl p-2.5 text-xs text-slate-100 placeholder:text-slate-500 focus:outline-none focus:border-cyan-500"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-slate-300 mb-1">تلفن ثابت</label>
                  <input
                    type="text"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full bg-slate-800/90 border border-slate-700 rounded-xl p-2.5 text-xs text-slate-100 placeholder:text-slate-500 focus:outline-none focus:border-cyan-500 font-mono text-left"
                    dir="ltr"
                  />
                </div>

                <div>
                  <label className="block font-bold text-slate-300 mb-1">تلفن همراه / واتساپ</label>
                  <input
                    type="text"
                    value={mobile}
                    onChange={(e) => setMobile(e.target.value)}
                    className="w-full bg-slate-800/90 border border-slate-700 rounded-xl p-2.5 text-xs text-slate-100 placeholder:text-slate-500 focus:outline-none focus:border-cyan-500 font-mono text-left"
                    dir="ltr"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-slate-300 mb-1">آی‌دی اینستاگرام (بدون @)</label>
                  <input
                    type="text"
                    value={instagram}
                    onChange={(e) => setInstagram(e.target.value)}
                    className="w-full bg-slate-800/90 border border-slate-700 rounded-xl p-2.5 text-xs text-slate-100 placeholder:text-slate-500 focus:outline-none focus:border-cyan-500 font-mono text-left"
                    dir="ltr"
                  />
                </div>

                <div>
                  <label className="block font-bold text-slate-300 mb-1">کد معرف طراح کارت</label>
                  <input
                    type="text"
                    value={designerCode}
                    onChange={(e) => setDesignerCode(e.target.value)}
                    className="w-full bg-slate-800/90 border border-slate-700 rounded-xl p-2.5 text-xs text-slate-100 placeholder:text-slate-500 focus:outline-none focus:border-cyan-500 font-mono text-left"
                    dir="ltr"
                  />
                </div>
              </div>

              <div>
                <label className="block font-bold text-slate-300 mb-1">آدرس پستی جهت نمایش روی کارت</label>
                <input
                  type="text"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  className="w-full bg-slate-800/90 border border-slate-700 rounded-xl p-2.5 text-xs text-slate-100 placeholder:text-slate-500 focus:outline-none focus:border-cyan-500"
                />
              </div>

            </div>

            {/* Action Bar */}
            <div className="pt-3 border-t border-slate-800 flex items-center justify-between gap-3">
              <button
                type="button"
                onClick={handleDownload}
                className="flex-1 py-3 rounded-xl bg-gradient-to-r from-cyan-600 to-indigo-600 hover:from-cyan-500 hover:to-indigo-500 text-white font-bold text-xs shadow-lg shadow-cyan-500/20 transition flex items-center justify-center gap-2 cursor-pointer"
              >
                <Printer className="w-4 h-4" />
                <span>خروجی آماده چاپ و کارت دیجیتال</span>
              </button>
            </div>

          </div>

        </div>

      </div>

    </div>
  );
};
