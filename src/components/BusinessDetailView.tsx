import React, { useState } from 'react';
import { Business, ProductServiceItem } from '../types';
import { QRCodeDisplay } from './QRCodeDisplay';
import { 
  MapPin, 
  Phone, 
  Star, 
  ShieldCheck, 
  Award, 
  Clock, 
  Globe, 
  Share2, 
  Bookmark, 
  ArrowRight, 
  ShoppingBag, 
  Image as ImageIcon, 
  MessageSquare, 
  Sparkles, 
  QrCode, 
  Send, 
  CheckCircle2, 
  ExternalLink,
  Navigation,
  Video,
  Info,
  Calendar
} from 'lucide-react';

interface BusinessDetailViewProps {
  business: Business;
  onBack: () => void;
  onNavigateToCardMaker: (business: Business) => void;
  isSaved?: boolean;
  onToggleSave?: (businessId: string) => void;
}

export const BusinessDetailView: React.FC<BusinessDetailViewProps> = ({
  business,
  onBack,
  onNavigateToCardMaker,
  isSaved = false,
  onToggleSave,
}) => {
  const [activeTab, setActiveTab] = useState<'profile' | 'showcase' | 'gallery' | 'contact' | 'reviews'>('showcase');
  const [showQrModal, setShowQrModal] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<ProductServiceItem | null>(null);
  
  // Review submission state
  const [newReviewAuthor, setNewReviewAuthor] = useState('');
  const [newReviewRating, setNewReviewRating] = useState(5);
  const [newReviewComment, setNewReviewComment] = useState('');
  const [reviewsList, setReviewsList] = useState(business.reviews);
  const [reviewSubmitted, setReviewSubmitted] = useState(false);

  const handleAddReview = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newReviewAuthor.trim() || !newReviewComment.trim()) return;

    const newRev = {
      id: `r-user-${Date.now()}`,
      userName: newReviewAuthor,
      rating: newReviewRating,
      comment: newReviewComment,
      date: 'هم‌اکنون (امروز)',
    };

    setReviewsList([newRev, ...reviewsList]);
    setNewReviewAuthor('');
    setNewReviewComment('');
    setReviewSubmitted(true);
    setTimeout(() => setReviewSubmitted(false), 4000);
  };

  const businessUrl = `https://inkart.ir/biz/${business.slug}`;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6">
      
      {/* Top Breadcrumb & Actions */}
      <div className="flex items-center justify-between">
        <button
          onClick={onBack}
          className="flex items-center gap-2 text-xs sm:text-sm font-bold text-slate-300 hover:text-cyan-400 px-3 py-1.5 rounded-xl bg-slate-900 border border-slate-800 transition shadow-2xs cursor-pointer"
        >
          <ArrowRight className="w-4 h-4" />
          <span>بازگشت به لیست نتایج</span>
        </button>

        <div className="flex items-center gap-2">
          {onToggleSave && (
            <button
              onClick={() => onToggleSave(business.id)}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold border transition cursor-pointer ${
                isSaved 
                  ? 'bg-red-950/80 text-red-400 border-red-800 shadow-2xs' 
                  : 'bg-slate-900 text-slate-300 border-slate-800 hover:bg-slate-800'
              }`}
            >
              <Bookmark className={`w-3.5 h-3.5 ${isSaved ? 'fill-current' : ''}`} />
              <span>{isSaved ? 'نشان شده' : 'نشان کردن'}</span>
            </button>
          )}

          <button
            onClick={() => setShowQrModal(true)}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-cyan-950/80 text-cyan-400 border border-cyan-800/60 text-xs font-bold hover:bg-cyan-900/60 transition cursor-pointer"
          >
            <QrCode className="w-3.5 h-3.5" />
            <span>کارت QR دیجیتال</span>
          </button>
        </div>
      </div>

      {/* Hero Presentation Header */}
      <div className="bg-slate-900/90 rounded-3xl border border-slate-800 overflow-hidden shadow-xl">
        
        {/* Cover Photo */}
        <div className="relative h-64 sm:h-80 w-full bg-slate-950">
          <img
            src={business.bannerImage}
            alt={business.title}
            className="w-full h-full object-cover opacity-85"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent" />

          {/* Featured Tag */}
          {business.isFeatured && (
            <div className="absolute top-4 right-4 flex items-center gap-1 bg-cyan-400 text-slate-950 px-3 py-1 rounded-xl text-xs font-black shadow-lg">
              <Sparkles className="w-4 h-4 fill-current" />
              <span>کسب‌وکار برگزیده اینکارت</span>
            </div>
          )}

          <div className="absolute top-4 left-4 bg-slate-900/90 backdrop-blur text-slate-200 px-3 py-1 rounded-xl text-xs font-bold border border-slate-700">
            {business.city} — منطقه {business.district}
          </div>
        </div>

        {/* Profile Info Bar */}
        <div className="p-6 sm:p-8 relative">
          
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 -mt-20 sm:-mt-24 mb-6">
            
            {/* Logo & Main Title */}
            <div className="flex flex-col sm:flex-row items-start sm:items-end gap-4">
              <div className="w-24 h-24 sm:w-32 sm:h-32 rounded-2xl bg-slate-900 p-1 shadow-xl border-2 border-slate-700 overflow-hidden relative z-10 shrink-0">
                <img
                  src={business.logoImage}
                  alt={business.managerName}
                  className="w-full h-full object-cover rounded-xl"
                />
              </div>

              <div className="space-y-1">
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="text-xs font-bold text-cyan-400 bg-cyan-950/80 px-2.5 py-0.5 rounded-lg border border-cyan-800/60">
                    {business.category}
                  </span>
                  <span className="text-xs text-slate-400 font-medium">
                    تاسیس: {business.establishedYear}
                  </span>
                </div>
                <h1 className="text-xl sm:text-2xl lg:text-3xl font-black text-slate-100">
                  {business.title}
                </h1>
                <p className="text-xs sm:text-sm text-slate-400 font-medium flex items-center gap-1.5">
                  <span>مدیریت:</span>
                  <span className="font-bold text-slate-200">{business.managerName}</span>
                </p>
              </div>
            </div>

            {/* Rating & Contact CTAs */}
            <div className="flex flex-wrap items-center gap-3">
              <div className="bg-slate-800/90 border border-slate-700 rounded-2xl px-4 py-2 text-center">
                <div className="flex items-center justify-center gap-1 text-sm font-black text-slate-100">
                  <Star className="w-4 h-4 text-amber-400 fill-current" />
                  <span>{business.rating}</span>
                </div>
                <span className="text-[10px] text-slate-400">{reviewsList.length} دیدگاه ثبت شده</span>
              </div>

              <a
                href={`tel:${business.phone}`}
                className="flex items-center gap-2 px-5 py-3 rounded-2xl bg-gradient-to-r from-cyan-600 to-indigo-600 hover:from-cyan-500 hover:to-indigo-500 text-white font-bold text-xs sm:text-sm shadow-lg shadow-cyan-500/20 transition cursor-pointer"
              >
                <Phone className="w-4 h-4" />
                <span>تماس مستقیم: {business.phone}</span>
              </a>

              <button
                onClick={() => onNavigateToCardMaker(business)}
                className="flex items-center gap-2 px-4 py-3 rounded-2xl bg-slate-800 hover:bg-slate-700 text-cyan-400 border border-slate-700 font-bold text-xs transition cursor-pointer"
              >
                <QrCode className="w-4 h-4 text-cyan-400" />
                <span>کارت‌ساز دیجیتال این مرکز</span>
              </button>
            </div>

          </div>

          {/* Transparent Declarations Banner (برچسب‌های شفاف اظهارات کسب‌وکار) */}
          <div className="bg-slate-950/60 border border-slate-800 rounded-2xl p-4 space-y-3">
            <div className="flex items-center gap-1.5 text-xs font-bold text-slate-300">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              <span>وضعیت شفافیت و مدارک (بر اساس اظهارات واحد صنفی):</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
              
              {/* License */}
              <div className="bg-slate-900/90 p-3 rounded-xl border border-slate-800 flex items-start gap-2.5">
                <div className={`p-1.5 rounded-lg shrink-0 ${business.hasLicense ? 'bg-emerald-950/80 text-emerald-400 border border-emerald-800/60' : 'bg-slate-800 text-slate-500'}`}>
                  <ShieldCheck className="w-4 h-4" />
                </div>
                <div>
                  <span className="font-bold text-slate-200 block">پروانه کسب و مجوز</span>
                  <span className="text-[11px] text-slate-400 block">
                    {business.hasLicense ? `شماره: ${business.licenseNumber} (${business.licenseUnionName})` : 'اظهار نشده'}
                  </span>
                </div>
              </div>

              {/* Union */}
              <div className="bg-slate-900/90 p-3 rounded-xl border border-slate-800 flex items-start gap-2.5">
                <div className={`p-1.5 rounded-lg shrink-0 ${business.isUnionMember ? 'bg-cyan-950/80 text-cyan-400 border border-cyan-800/60' : 'bg-slate-800 text-slate-500'}`}>
                  <Award className="w-4 h-4" />
                </div>
                <div>
                  <span className="font-bold text-slate-200 block">عضویت رسمی در اتحادیه</span>
                  <span className="text-[11px] text-slate-400 block">
                    {business.isUnionMember ? 'عضو فعال صنف استانی' : 'عضویت ثبت نشده'}
                  </span>
                </div>
              </div>

              {/* Warranty */}
              <div className="bg-slate-900/90 p-3 rounded-xl border border-slate-800 flex items-start gap-2.5">
                <div className={`p-1.5 rounded-lg shrink-0 ${business.hasWarranty ? 'bg-amber-950/80 text-amber-400 border border-amber-800/60' : 'bg-slate-800 text-slate-500'}`}>
                  <ShieldCheck className="w-4 h-4" />
                </div>
                <div>
                  <span className="font-bold text-slate-200 block">ضمانت و گارانتی خدمات</span>
                  <span className="text-[11px] text-slate-400 block line-clamp-1">
                    {business.hasWarranty ? business.warrantyTerms : 'بدون ضمانت کتبی اظهار شده'}
                  </span>
                </div>
              </div>

            </div>
          </div>

        </div>

        {/* Interactive Tabs */}
        <div className="border-t border-slate-800 bg-slate-900/95 px-6 flex items-center gap-2 overflow-x-auto">
          
          <button
            onClick={() => setActiveTab('showcase')}
            className={`flex items-center gap-2 py-4 px-4 border-b-2 text-xs sm:text-sm font-bold transition shrink-0 cursor-pointer ${
              activeTab === 'showcase'
                ? 'border-cyan-400 text-cyan-400'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            <ShoppingBag className="w-4 h-4" />
            <span>ویترین محصولات و خدمات ({business.products.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('profile')}
            className={`flex items-center gap-2 py-4 px-4 border-b-2 text-xs sm:text-sm font-bold transition shrink-0 cursor-pointer ${
              activeTab === 'profile'
                ? 'border-cyan-400 text-cyan-400'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            <Info className="w-4 h-4" />
            <span>طرح معرفی و بیوگرافی</span>
          </button>

          <button
            onClick={() => setActiveTab('gallery')}
            className={`flex items-center gap-2 py-4 px-4 border-b-2 text-xs sm:text-sm font-bold transition shrink-0 cursor-pointer ${
              activeTab === 'gallery'
                ? 'border-cyan-400 text-cyan-400'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            <ImageIcon className="w-4 h-4" />
            <span>گالری عکس و محیط کار ({business.galleryImages.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('contact')}
            className={`flex items-center gap-2 py-4 px-4 border-b-2 text-xs sm:text-sm font-bold transition shrink-0 cursor-pointer ${
              activeTab === 'contact'
                ? 'border-cyan-400 text-cyan-400'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            <Phone className="w-4 h-4" />
            <span>راه‌های ارتباط و مسیریابی</span>
          </button>

          <button
            onClick={() => setActiveTab('reviews')}
            className={`flex items-center gap-2 py-4 px-4 border-b-2 text-xs sm:text-sm font-bold transition shrink-0 cursor-pointer ${
              activeTab === 'reviews'
                ? 'border-cyan-400 text-cyan-400'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            <MessageSquare className="w-4 h-4" />
            <span>دیدگاه‌ها و تجربیات ({reviewsList.length})</span>
          </button>

        </div>

      </div>

      {/* Tab 1: Showcase (ویترین حرفه‌ای محصولات و خدمات) */}
      {activeTab === 'showcase' && (
        <div className="space-y-6">
          <div className="flex items-center justify-between bg-slate-900/90 p-4 rounded-2xl border border-slate-800">
            <div>
              <h2 className="text-base font-bold text-slate-100">کاتالوگ و لیست خدمات قیمت‌گذاری شده</h2>
              <p className="text-xs text-slate-400">تمامی قیمت‌ها و مشخصات به تایید مدیریت مرکز رسیده است.</p>
            </div>
            <span className="px-3 py-1 rounded-xl bg-purple-950/80 text-purple-400 text-xs font-bold border border-purple-800/60">
              ویترین فعال
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {business.products.map((item) => (
              <div
                key={item.id}
                className="bg-slate-900/90 rounded-2xl border border-slate-800 overflow-hidden shadow-xs hover:border-cyan-500/50 transition flex flex-col justify-between"
              >
                <div className="relative h-44 bg-slate-950">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-full object-cover opacity-90"
                  />
                  {item.isSpecial && (
                    <span className="absolute top-3 right-3 bg-cyan-400 text-slate-950 font-black text-[10px] px-2 py-0.5 rounded-md shadow-sm">
                      پیشنهاد ویژه
                    </span>
                  )}
                  {item.categoryName && (
                    <span className="absolute bottom-3 left-3 bg-slate-950/80 backdrop-blur text-slate-200 text-[10px] font-bold px-2 py-0.5 rounded-md border border-slate-700">
                      {item.categoryName}
                    </span>
                  )}
                </div>

                <div className="p-4 space-y-3 flex-1 flex flex-col justify-between">
                  <div>
                    <h3 className="font-bold text-sm text-slate-100">{item.title}</h3>
                    <p className="text-xs text-slate-400 mt-1 leading-relaxed line-clamp-3">
                      {item.description}
                    </p>
                  </div>

                  <div className="pt-3 border-t border-slate-800 flex items-center justify-between">
                    <div>
                      <span className="text-[10px] text-slate-500 block font-medium">تعرفه مصوب:</span>
                      <span className="text-sm font-black text-cyan-400">
                        {item.priceFormatted || (item.price ? `${item.price.toLocaleString('fa-IR')} تومان` : 'استعلام قیمت')}
                      </span>
                    </div>

                    <a
                      href={`tel:${business.phone}`}
                      className="px-3 py-1.5 rounded-xl bg-cyan-950/80 hover:bg-cyan-900/80 text-cyan-400 border border-cyan-800/60 text-xs font-bold transition flex items-center gap-1 cursor-pointer"
                    >
                      <span>رزرو / مشاوره</span>
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Tab 2: Profile & Full Bio (طرح معرفی کامل) */}
      {activeTab === 'profile' && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 bg-slate-900/90 rounded-2xl p-6 border border-slate-800 space-y-6">
            <div>
              <h2 className="text-base font-bold text-slate-100 mb-3">درباره و پیشینه فعالیت</h2>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed whitespace-pre-line">
                {business.description}
              </p>
            </div>

            <div className="pt-4 border-t border-slate-800 space-y-3">
              <h3 className="text-sm font-bold text-slate-200">ساعت کاری و پذیرش</h3>
              <div className="flex items-center gap-2 text-xs text-slate-300 bg-slate-800/60 p-3 rounded-xl border border-slate-700">
                <Clock className="w-4 h-4 text-cyan-400" />
                <span>{business.workingHours}</span>
              </div>
            </div>

            {/* Video Teaser Mock Section */}
            <div className="pt-4 border-t border-slate-800 space-y-3">
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-bold text-slate-200 flex items-center gap-1.5">
                  <Video className="w-4 h-4 text-purple-400" />
                  <span>تیزر تصویری و معرفی محیط کار (به زودی)</span>
                </h3>
                <span className="text-[10px] bg-purple-950/80 text-purple-400 border border-purple-800/60 px-2 py-0.5 rounded-md font-bold">
                  قابلیت نسخه جدید
                </span>
              </div>
              <div className="relative h-48 bg-slate-950 rounded-2xl overflow-hidden flex items-center justify-center border border-slate-800">
                <img
                  src={business.bannerImage}
                  alt="Teaser"
                  className="w-full h-full object-cover opacity-25"
                />
                <div className="absolute flex flex-col items-center gap-2 text-white text-center p-4">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-r from-cyan-600 to-indigo-600 flex items-center justify-center shadow-lg">
                    <Video className="w-6 h-6" />
                  </div>
                  <span className="text-xs font-bold text-slate-200">امکان بارگذاری ویدیوی اختصاصی محیط کار و معرفی خدمات</span>
                </div>
              </div>
            </div>

          </div>

          {/* Sidebar Summary */}
          <div className="space-y-4">
            <div className="bg-slate-900/90 rounded-2xl p-5 border border-slate-800 space-y-4 text-xs">
              <h3 className="font-bold text-sm text-slate-100">مشخصات هویتی کسب‌وکار</h3>
              
              <div className="space-y-2.5 text-slate-300">
                <div className="flex justify-between py-1.5 border-b border-slate-800">
                  <span className="text-slate-500">شهر / منطقه:</span>
                  <span className="font-bold text-slate-200">{business.city} ({business.district})</span>
                </div>
                <div className="flex justify-between py-1.5 border-b border-slate-800">
                  <span className="text-slate-500">شماره مجوز:</span>
                  <span className="font-bold text-slate-200">{business.licenseNumber || '—'}</span>
                </div>
                <div className="flex justify-between py-1.5 border-b border-slate-800">
                  <span className="text-slate-500">سال تاسیس:</span>
                  <span className="font-bold text-slate-200">{business.establishedYear}</span>
                </div>
                <div className="flex justify-between py-1.5">
                  <span className="text-slate-500">وضعیت پذیرش:</span>
                  <span className="font-bold text-emerald-400">پذیرش حضوری و تلفنی</span>
                </div>
              </div>
            </div>

            {/* QR Card Box */}
            <div className="bg-gradient-to-br from-slate-900 to-indigo-950 text-white rounded-2xl p-5 text-center space-y-3 border border-slate-800 shadow-xl shadow-cyan-950/20">
              <h4 className="font-bold text-xs text-cyan-400">کارت ویزیت دیجیتال اختصاصی</h4>
              <div className="flex justify-center py-2">
                <QRCodeDisplay
                  value={businessUrl}
                  size={120}
                  fgColor="#0f172a"
                  bgColor="#ffffff"
                  logoUrl={business.logoImage}
                />
              </div>
              <button
                onClick={() => onNavigateToCardMaker(business)}
                className="w-full py-2 rounded-xl bg-gradient-to-r from-cyan-600 to-indigo-600 hover:from-cyan-500 hover:to-indigo-500 text-white font-bold text-xs transition cursor-pointer"
              >
                شخصی‌سازی و دریافت کارت دیجیتال
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Tab 3: Gallery (گالری تصاویر محیط کار) */}
      {activeTab === 'gallery' && (
        <div className="space-y-4">
          <div className="bg-slate-900/90 p-4 rounded-2xl border border-slate-800 flex items-center justify-between">
            <h2 className="text-base font-bold text-slate-100">گالری عکس‌های محیط کار و نمونه پروژه‌ها</h2>
            <span className="text-xs text-slate-400">{business.galleryImages.length} تصویر با کیفیت</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {business.galleryImages.map((imgUrl, i) => (
              <div
                key={i}
                className="h-64 rounded-2xl overflow-hidden border border-slate-800 bg-slate-950 group relative"
              >
                <img
                  src={imgUrl}
                  alt={`Gallery ${i}`}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300 opacity-90"
                />
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Tab 4: Contact & Socials (اطلاعات تماس و مسیریابی) */}
      {activeTab === 'contact' && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          
          <div className="bg-slate-900/90 rounded-2xl p-6 border border-slate-800 space-y-6">
            <h2 className="text-base font-bold text-slate-100">پل‌های ارتباطی مستقیم</h2>
            
            <div className="space-y-3">
              <div className="flex items-center justify-between p-3 rounded-xl bg-slate-800/60 border border-slate-700 text-xs">
                <div className="flex items-center gap-2">
                  <Phone className="w-4 h-4 text-cyan-400" />
                  <span className="font-medium text-slate-300">تلفن ثابت واحد:</span>
                </div>
                <a href={`tel:${business.phone}`} className="font-bold text-cyan-400 hover:underline">{business.phone}</a>
              </div>

              <div className="flex items-center justify-between p-3 rounded-xl bg-slate-800/60 border border-slate-700 text-xs">
                <div className="flex items-center gap-2">
                  <Phone className="w-4 h-4 text-emerald-400" />
                  <span className="font-medium text-slate-300">شماره همراه مدیریت:</span>
                </div>
                <a href={`tel:${business.mobile}`} className="font-bold text-slate-200">{business.mobile}</a>
              </div>

              {business.website && (
                <div className="flex items-center justify-between p-3 rounded-xl bg-slate-800/60 border border-slate-700 text-xs">
                  <div className="flex items-center gap-2">
                    <Globe className="w-4 h-4 text-indigo-400" />
                    <span className="font-medium text-slate-300">وب‌سایت رسمی:</span>
                  </div>
                  <a href={business.website} target="_blank" rel="noreferrer" className="font-bold text-cyan-400 hover:underline">{business.website}</a>
                </div>
              )}
            </div>

            {/* Social Messengers */}
            <div className="space-y-3 pt-2">
              <h3 className="text-xs font-bold text-slate-300">پیام‌رسان‌ها و شبکه‌های اجتماعی:</h3>
              <div className="grid grid-cols-2 gap-2 text-xs">
                {business.instagram && (
                  <div className="p-3 rounded-xl bg-pink-950/60 text-pink-400 border border-pink-800/60 font-bold flex items-center justify-between">
                    <span>اینستاگرام:</span>
                    <span className="text-[11px] font-mono">@{business.instagram}</span>
                  </div>
                )}
                {business.whatsapp && (
                  <div className="p-3 rounded-xl bg-emerald-950/60 text-emerald-400 border border-emerald-800/60 font-bold flex items-center justify-between">
                    <span>واتساپ:</span>
                    <span className="text-[11px] font-mono">{business.whatsapp}</span>
                  </div>
                )}
                {business.eitaa && (
                  <div className="p-3 rounded-xl bg-amber-950/60 text-amber-400 border border-amber-800/60 font-bold flex items-center justify-between">
                    <span>ایتا:</span>
                    <span className="text-[11px] font-mono">@{business.eitaa}</span>
                  </div>
                )}
                {business.bale && (
                  <div className="p-3 rounded-xl bg-blue-950/60 text-blue-400 border border-blue-800/60 font-bold flex items-center justify-between">
                    <span>بله:</span>
                    <span className="text-[11px] font-mono">@{business.bale}</span>
                  </div>
                )}
              </div>
            </div>

            {/* Address */}
            <div className="p-4 rounded-xl bg-slate-800/60 border border-slate-700 space-y-2">
              <span className="text-xs font-bold text-slate-300 flex items-center gap-1.5">
                <MapPin className="w-4 h-4 text-red-400" />
                <span>آدرس دقیق:</span>
              </span>
              <p className="text-xs text-slate-300 leading-relaxed">
                {business.address}
              </p>
            </div>

          </div>

          {/* Map & Navigation Mock */}
          <div className="bg-slate-900/90 rounded-2xl p-6 border border-slate-800 space-y-4 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-3">
                <h2 className="text-base font-bold text-slate-100 flex items-center gap-2">
                  <Navigation className="w-4 h-4 text-cyan-400" />
                  <span>موقعیت مکانی و مسیریابی روی نقشه</span>
                </h2>
                <span className="text-xs text-cyan-400 font-bold bg-cyan-950/80 border border-cyan-800/60 px-2.5 py-1 rounded-lg">
                  فاصله تقریبی: {business.distanceKm || 2.4} ک.م
                </span>
              </div>

              {/* Map Canvas Mock */}
              <div className="h-64 rounded-2xl bg-slate-950 border border-slate-800 relative overflow-hidden flex items-center justify-center">
                {/* Visual Map Grid Pattern */}
                <div className="absolute inset-0 bg-[radial-gradient(#334155_1px,transparent_1px)] [background-size:16px_16px] opacity-40" />
                
                {/* Location Marker */}
                <div className="relative z-10 flex flex-col items-center animate-bounce">
                  <div className="p-2.5 rounded-full bg-cyan-500 text-slate-950 shadow-xl shadow-cyan-500/20">
                    <MapPin className="w-6 h-6" />
                  </div>
                  <div className="mt-1 px-3 py-1 rounded-lg bg-slate-900 text-slate-100 text-[11px] font-bold border border-slate-700 shadow-md">
                    {business.title}
                  </div>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3 pt-2">
              <button
                onClick={() => alert(`هدایت به نقشه نشان و بلد برای مقصد: ${business.address}`)}
                className="py-2.5 px-4 rounded-xl bg-gradient-to-r from-cyan-600 to-indigo-600 hover:from-cyan-500 hover:to-indigo-500 text-white font-bold text-xs transition flex items-center justify-center gap-1.5 cursor-pointer shadow-lg shadow-cyan-500/20"
              >
                <Navigation className="w-3.5 h-3.5" />
                <span>مسیریابی با نشان / بلد</span>
              </button>
              <button
                onClick={() => alert(`باز کردن موقعیت در گوگل مپ: مختصات ${business.coordinates.lat}, ${business.coordinates.lng}`)}
                className="py-2.5 px-4 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 font-bold text-xs transition flex items-center justify-center gap-1.5 cursor-pointer"
              >
                <Globe className="w-3.5 h-3.5" />
                <span>گوگل مپ (Google Map)</span>
              </button>
            </div>

          </div>

        </div>
      )}

      {/* Tab 5: Reviews (نظرات و امتیازها) */}
      {activeTab === 'reviews' && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          
          {/* Reviews List */}
          <div className="lg:col-span-2 space-y-4">
            <div className="bg-slate-900/90 p-4 rounded-2xl border border-slate-800 flex items-center justify-between">
              <h2 className="text-base font-bold text-slate-100">دیدگاه‌های مراجعین و مشتریان</h2>
              <span className="text-xs font-bold text-slate-400">{reviewsList.length} نظر تایید شده</span>
            </div>

            <div className="space-y-3">
              {reviewsList.map((rev) => (
                <div key={rev.id} className="bg-slate-900/90 p-5 rounded-2xl border border-slate-800 space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 rounded-full bg-cyan-950 text-cyan-400 border border-cyan-800/60 font-bold text-xs flex items-center justify-center">
                        {rev.userName[0]}
                      </div>
                      <div>
                        <span className="font-bold text-xs text-slate-100 block">{rev.userName}</span>
                        <span className="text-[10px] text-slate-500">{rev.date}</span>
                      </div>
                    </div>

                    <div className="flex items-center gap-0.5 text-amber-400">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <Star
                          key={i}
                          className={`w-3.5 h-3.5 ${i < rev.rating ? 'fill-current' : 'text-slate-700'}`}
                        />
                      ))}
                    </div>
                  </div>

                  <p className="text-xs text-slate-300 leading-relaxed">
                    {rev.comment}
                  </p>

                  {rev.reply && (
                    <div className="bg-slate-800/70 p-3 rounded-xl border border-slate-700 text-xs space-y-1">
                      <span className="font-bold text-cyan-400 text-[11px] block">پاسخ مدیریت مرکز:</span>
                      <p className="text-slate-300 text-[11px]">{rev.reply}</p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Add Review Form */}
          <div>
            <div className="bg-slate-900/90 p-6 rounded-2xl border border-slate-800 space-y-4">
              <h3 className="font-bold text-sm text-slate-100">ثبت دیدگاه یا امتیاز</h3>
              
              {reviewSubmitted && (
                <div className="p-3 rounded-xl bg-emerald-950/80 text-emerald-400 border border-emerald-800 text-xs font-bold flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4" />
                  <span>دیدگاه شما با موفقیت ثبت گردید.</span>
                </div>
              )}

              <form onSubmit={handleAddReview} className="space-y-3">
                <div>
                  <label className="block text-xs font-bold text-slate-300 mb-1">نام و نام‌خانوادگی</label>
                  <input
                    type="text"
                    value={newReviewAuthor}
                    onChange={(e) => setNewReviewAuthor(e.target.value)}
                    placeholder="مثال: رضا محمدی"
                    required
                    className="w-full bg-slate-800/90 border border-slate-700 rounded-xl p-2.5 text-xs text-slate-100 placeholder:text-slate-500 focus:outline-none focus:border-cyan-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-300 mb-1">امتیاز شما</label>
                  <div className="flex items-center gap-1 text-amber-400">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <button
                        type="button"
                        key={star}
                        onClick={() => setNewReviewRating(star)}
                        className="p-1 focus:outline-none cursor-pointer"
                      >
                        <Star className={`w-5 h-5 ${star <= newReviewRating ? 'fill-current' : 'text-slate-700'}`} />
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-300 mb-1">متن تجربه و نظر</label>
                  <textarea
                    rows={4}
                    value={newReviewComment}
                    onChange={(e) => setNewReviewComment(e.target.value)}
                    placeholder="کیفیت خدمات، برخورد پرسنل، رعایت نوبت و قیمت‌ها را شرح دهید..."
                    required
                    className="w-full bg-slate-800/90 border border-slate-700 rounded-xl p-2.5 text-xs text-slate-100 placeholder:text-slate-500 focus:outline-none focus:border-cyan-500"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-2.5 rounded-xl bg-gradient-to-r from-cyan-600 to-indigo-600 hover:from-cyan-500 hover:to-indigo-500 text-white font-bold text-xs transition flex items-center justify-center gap-1.5 cursor-pointer shadow-lg shadow-cyan-500/20"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>ارسال دیدگاه</span>
                </button>
              </form>
            </div>
          </div>

        </div>
      )}

      {/* QR Code Quick Modal */}
      {showQrModal && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-slate-900 rounded-3xl p-6 max-w-sm w-full border border-slate-800 shadow-2xl space-y-4 text-center animate-in zoom-in-95 duration-150">
            <h3 className="text-base font-black text-slate-100">کارت ویزیت دیجیتال QR</h3>
            <p className="text-xs text-slate-400">
              با اسکن این بارکد توسط دوربین موبایل، ویترین و اطلاعات تماس باز می‌شود.
            </p>

            <div className="flex justify-center py-3">
              <QRCodeDisplay
                value={businessUrl}
                size={180}
                fgColor="#0f172a"
                bgColor="#ffffff"
                logoUrl={business.logoImage}
                title={business.title}
              />
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => {
                  navigator.clipboard.writeText(businessUrl);
                  alert('لینک صفحه ویترین کپی شد.');
                }}
                className="flex-1 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 font-bold text-xs transition border border-slate-700 cursor-pointer"
              >
                کپی لینک مستقیم
              </button>
              <button
                onClick={() => setShowQrModal(false)}
                className="flex-1 py-2.5 rounded-xl bg-cyan-600 hover:bg-cyan-500 text-slate-950 font-bold text-xs transition cursor-pointer"
              >
                بستن
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
