import React, { useState } from 'react';
import { Business, Category, City } from '../types';
import { BusinessMiniCard } from './BusinessMiniCard';
import { 
  Search, 
  MapPin, 
  Sparkles, 
  ShieldCheck, 
  CreditCard, 
  ShoppingBag, 
  ArrowLeft, 
  CheckCircle2, 
  ChevronDown, 
  HelpCircle,
  Building2,
  PhoneCall,
  QrCode,
  SlidersHorizontal,
  Compass,
  Star,
  Users,
  Award
} from 'lucide-react';

interface LandingViewProps {
  businesses: Business[];
  cities: City[];
  categories: Category[];
  onSelectBusiness: (business: Business) => void;
  onSearchSubmit: (params: { cityId: string; categoryId: string; keyword: string; nearMe: boolean }) => void;
  onNavigate: (view: string) => void;
}

export const LandingView: React.FC<LandingViewProps> = ({
  businesses,
  cities,
  categories,
  onSelectBusiness,
  onSearchSubmit,
  onNavigate,
}) => {
  // Search Bar Local State
  const [selectedCity, setSelectedCity] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [keyword, setKeyword] = useState('');
  const [nearMeActive, setNearMeActive] = useState(false);

  // FAQ Accordion State
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    onSearchSubmit({
      cityId: selectedCity,
      categoryId: selectedCategory,
      keyword,
      nearMe: nearMeActive,
    });
  };

  const handleQuickCategory = (catId: string) => {
    setSelectedCategory(catId);
    onSearchSubmit({
      cityId: selectedCity,
      categoryId: catId,
      keyword: '',
      nearMe: false,
    });
  };

  const faqs = [
    {
      q: 'اینکارت چطور به پیدا کردن خدمات باکیفیت و نزدیک کمک می‌کند؟',
      a: 'در اینکارت می‌توانید با انتخاب شهر یا فعال‌سازی موقعیت مکانی (جستجوی شعاعی)، نزدیک‌ترین مراکز خدماتی را پیدا کنید. در صفحه نتایج، مینی‌کارت هر کسب‌وکار به همراه برچسب‌های شفاف و امتیازهای واقعی کاربران نمایش داده می‌شود.'
    },
    {
      q: 'برچسب‌های شفاف (جواز کسب، عضو اتحادیه، ضمانت) به چه معنا هستند؟',
      a: 'برای حفظ شفافیت کامل، تمامی نشان‌های جواز و عضویت بر اساس مدارک و اظهارات مستقیم خود واحد صنفی ثبت شده و با لیبل شفاف به اطلاع کاربران می‌رسد تا انتخابی آگاهانه و مطمئن داشته باشند.'
    },
    {
      q: 'کارت ویزیت دیجیتال هوشمند با QR Code چیست؟',
      a: 'هر کسب‌وکار در اینکارت صاحب یک کارت دیجیتال پویا با بارکد اختصاصی می‌شود که مشتری با اسکن آن توسط دوربین موبایل، مستقیماً به صفحه ویترین، کاتالوگ قیمت‌ها، تماس و لوکیشن متصل می‌گردد.'
    },
    {
      q: 'چگونه می‌توانم کسب‌وکار خود را در اینکارت ثبت کنم؟',
      a: 'کافیست از منوی بالا نقش «صاحب کسب‌وکار» را انتخاب کرده یا دکمه ورود به پنل را بزنید. سپس اطلاعات اولیه، پروانه و محصولات ویترین خود را در فرم اختصاصی وارد نمایید تا پس از بررسی فعال شود.'
    }
  ];

  return (
    <div className="space-y-16 sm:space-y-24 pb-12">
      
      {/* 1. HERO SECTION */}
      <section className="relative overflow-hidden bg-gradient-to-b from-slate-900 via-slate-900/80 to-[#0F172A] border-b border-slate-800 pt-10 pb-16 sm:pt-16 sm:pb-24 px-4 sm:px-6 lg:px-8">
        
        {/* Background decorative ambient circles */}
        <div className="absolute top-0 right-1/4 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute top-1/3 left-1/4 w-96 h-96 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-5xl mx-auto text-center relative z-10 space-y-6">
          
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-cyan-950/80 text-cyan-400 text-xs font-bold border border-cyan-800/60 shadow-lg shadow-cyan-950/40">
            <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
            <span>پلتفرم کشف کسب‌وکارها، ویترین آنلاین و کارت دیجیتال</span>
          </div>

          {/* Main Title */}
          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black text-slate-100 tracking-tight leading-tight sm:leading-tight">
            کشف سریع بهترین خدمات، <br className="hidden sm:block" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-sky-300 to-indigo-400">
              با شفافیت کامل و ویترین حرفه‌ای
            </span>
          </h1>

          {/* Subtitle */}
          <p className="text-sm sm:text-base lg:text-lg text-slate-400 max-w-3xl mx-auto leading-relaxed">
            شهر و صنف موردنظر خود را جستجو کنید؛ ابتدا مینی‌کارت و طرح جامع معرفی را ببینید و در صورت تمایل وارد ویترین قیمت‌ها، گالری و تماس مستقیم شوید.
          </p>

          {/* Interactive Multi-Param Search Box */}
          <div className="max-w-4xl mx-auto mt-8 bg-slate-900/90 backdrop-blur-md p-3 sm:p-4 rounded-2xl shadow-2xl shadow-black/40 border border-slate-800">
            <form onSubmit={handleSearch} className="grid grid-cols-1 sm:grid-cols-12 gap-2.5">
              
              {/* City Dropdown */}
              <div className="sm:col-span-3 relative">
                <div className="flex items-center gap-2 bg-slate-800/90 border border-slate-700 rounded-xl px-3 py-2.5">
                  <MapPin className="w-4 h-4 text-cyan-400 shrink-0" />
                  <select
                    value={selectedCity}
                    onChange={(e) => setSelectedCity(e.target.value)}
                    className="w-full bg-transparent text-xs font-bold text-slate-200 focus:outline-none cursor-pointer"
                    aria-label="انتخاب شهر"
                  >
                    <option value="" className="bg-slate-900 text-slate-200">همه شهرها</option>
                    {cities.map((city) => (
                      <option key={city.id} value={city.id} className="bg-slate-900 text-slate-200">
                        {city.name} ({city.province})
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Category Dropdown */}
              <div className="sm:col-span-3 relative">
                <div className="flex items-center gap-2 bg-slate-800/90 border border-slate-700 rounded-xl px-3 py-2.5">
                  <Building2 className="w-4 h-4 text-cyan-400 shrink-0" />
                  <select
                    value={selectedCategory}
                    onChange={(e) => setSelectedCategory(e.target.value)}
                    className="w-full bg-transparent text-xs font-bold text-slate-200 focus:outline-none cursor-pointer"
                    aria-label="انتخاب صنف"
                  >
                    <option value="" className="bg-slate-900 text-slate-200">همه اصناف و خدمات</option>
                    {categories.map((cat) => (
                      <option key={cat.id} value={cat.id} className="bg-slate-900 text-slate-200">
                        {cat.title}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Keyword Input */}
              <div className="sm:col-span-4 relative">
                <div className="flex items-center gap-2 bg-slate-800/90 border border-slate-700 rounded-xl px-3 py-2.5">
                  <Search className="w-4 h-4 text-slate-500 shrink-0" />
                  <input
                    type="text"
                    value={keyword}
                    onChange={(e) => setKeyword(e.target.value)}
                    placeholder="نام خدمت، کسب‌وکار، یا منطقه..."
                    className="w-full bg-transparent text-xs text-slate-100 placeholder:text-slate-500 focus:outline-none"
                  />
                </div>
              </div>

              {/* Search Submit Button */}
              <div className="sm:col-span-2 flex gap-1.5">
                <button
                  type="submit"
                  className="w-full bg-gradient-to-r from-cyan-600 to-indigo-600 hover:from-cyan-500 hover:to-indigo-500 text-white font-bold text-xs py-3 px-4 rounded-xl flex items-center justify-center gap-1.5 shadow-lg shadow-cyan-500/20 transition-all cursor-pointer"
                >
                  <Search className="w-4 h-4" />
                  <span>جستجو</span>
                </button>
              </div>

            </form>

            {/* Quick Filter Helpers */}
            <div className="mt-3 pt-3 border-t border-slate-800 flex flex-wrap items-center justify-between gap-2 text-xs text-slate-400">
              <div className="flex items-center gap-1.5 flex-wrap">
                <span className="font-semibold text-slate-500">جستجوی پرتکرار:</span>
                {categories.slice(0, 4).map((cat) => (
                  <button
                    key={cat.id}
                    onClick={() => handleQuickCategory(cat.id)}
                    className="px-2.5 py-1 rounded-lg bg-slate-800/80 hover:bg-slate-700 text-slate-300 hover:text-cyan-400 border border-slate-700/60 font-medium transition text-[11px] cursor-pointer"
                  >
                    {cat.title}
                  </button>
                ))}
              </div>

              <button
                type="button"
                onClick={() => {
                  setNearMeActive(!nearMeActive);
                  onSearchSubmit({
                    cityId: selectedCity,
                    categoryId: selectedCategory,
                    keyword,
                    nearMe: !nearMeActive,
                  });
                }}
                className={`flex items-center gap-1 px-2.5 py-1 rounded-lg border font-bold text-[11px] transition cursor-pointer ${
                  nearMeActive 
                    ? 'bg-cyan-500 text-slate-950 border-cyan-400 shadow-md shadow-cyan-500/20' 
                    : 'bg-slate-800 border-slate-700 text-slate-300 hover:bg-slate-700'
                }`}
              >
                <Compass className="w-3.5 h-3.5" />
                <span>موقعیت مکانی من (نزدیک‌ترین)</span>
              </button>
            </div>

          </div>

          {/* Action CTAs */}
          <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
            <button
              onClick={() => onNavigate('search')}
              className="px-5 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-cyan-400 text-xs font-bold transition border border-slate-700 shadow-xs flex items-center gap-2 cursor-pointer"
            >
              <SlidersHorizontal className="w-4 h-4 text-cyan-400" />
              <span>مشاهده تمامی مراکز و ویترین‌ها</span>
            </button>
            <button
              onClick={() => onNavigate('card-maker')}
              className="px-5 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-200 text-xs font-bold border border-slate-700 transition flex items-center gap-2 cursor-pointer"
            >
              <CreditCard className="w-4 h-4 text-cyan-400" />
              <span>کارت‌ساز هوشمند ۳ قالبه</span>
            </button>
          </div>

        </div>
      </section>

      {/* 2. CATEGORIES BROWSER */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-xl sm:text-2xl font-bold text-slate-100">دسته‌بندی اصناف و خدمات</h2>
            <p className="text-xs sm:text-sm text-slate-400 mt-1">انتخاب سریع بر اساس حوزه فعالیت مورد نیاز شما</p>
          </div>
          <button
            onClick={() => onNavigate('search')}
            className="flex items-center gap-1 text-xs font-bold text-cyan-400 hover:text-cyan-300 cursor-pointer"
          >
            <span>نمایش همه اصناف</span>
            <ArrowLeft className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-4 gap-3 sm:gap-4">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => handleQuickCategory(cat.id)}
              className="group bg-slate-900/90 p-4 rounded-2xl border border-slate-800 hover:border-cyan-500/50 hover:shadow-lg hover:shadow-cyan-500/10 transition text-right flex flex-col justify-between space-y-3 cursor-pointer"
            >
              <div className="w-10 h-10 rounded-xl bg-slate-800 group-hover:bg-cyan-500 text-cyan-400 group-hover:text-slate-950 transition flex items-center justify-center font-bold">
                <Building2 className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-bold text-sm text-slate-100 group-hover:text-cyan-400 transition-colors">
                  {cat.title}
                </h3>
                <span className="text-[11px] text-slate-400 font-medium mt-0.5 block">
                  {cat.count} واحد صنفی ثبت شده
                </span>
              </div>
            </button>
          ))}
        </div>
      </section>

      {/* 3. FEATURED BUSINESSES */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 gap-3">
          <div>
            <div className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-md bg-cyan-950/70 text-cyan-400 text-xs font-bold border border-cyan-800/50 mb-2">
              <Sparkles className="w-3.5 h-3.5 fill-current" />
              <span>مراکز تایید شده با ویترین فعال</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-bold text-slate-100">محبوب‌ترین طرح‌های معرفی کسب‌وکار</h2>
            <p className="text-xs sm:text-sm text-slate-400 mt-1">
              روی هر مینی‌کارت کلیک کنید تا طرح معرفی کامل، مشخصات پروانه و ویترین محصولات را مشاهده نمایید.
            </p>
          </div>
          <button
            onClick={() => onNavigate('search')}
            className="self-start sm:self-auto px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-cyan-400 border border-slate-700 text-xs font-bold transition flex items-center gap-1.5 cursor-pointer"
          >
            <span>مشاهده همه در ۲ ستون</span>
            <ArrowLeft className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* 2-Column Responsive Grid for Mini Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {businesses.slice(0, 6).map((biz) => (
            <BusinessMiniCard
              key={biz.id}
              business={biz}
              onSelect={onSelectBusiness}
            />
          ))}
        </div>
      </section>

      {/* 4. CORE FEATURES & TRANSPARENCY PILLARS */}
      <section className="bg-slate-950 text-white py-16 px-4 sm:px-6 lg:px-8 relative overflow-hidden border-y border-slate-800/80">
        <div className="max-w-7xl mx-auto relative z-10 space-y-12">
          
          <div className="text-center max-w-3xl mx-auto space-y-3">
            <h2 className="text-2xl sm:text-3xl font-black tracking-tight text-slate-100">ویژگی‌های متمایز پلتفرم اینکارت</h2>
            <p className="text-xs sm:text-sm text-slate-400">
              طراحی شده بر اساس سرعت، تجربه کاربری روان، تفکیک کامل مسیر مشتری و شفافیت در ارائه اطلاعات
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            
            <div className="bg-slate-900/90 p-6 rounded-2xl border border-slate-800 space-y-3">
              <div className="w-12 h-12 rounded-xl bg-cyan-950/80 text-cyan-400 border border-cyan-800/50 flex items-center justify-center font-bold">
                <Compass className="w-6 h-6" />
              </div>
              <h3 className="font-bold text-base text-slate-100">جستجوی شعاعی و محلی</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                تفکیک دقیق بر اساس شهر، منطقه و فاصله مکانی با قابلیت اتصال مستقیم به نقشه‌های مسیریاب
              </p>
            </div>

            <div className="bg-slate-900/90 p-6 rounded-2xl border border-slate-800 space-y-3">
              <div className="w-12 h-12 rounded-xl bg-emerald-950/80 text-emerald-400 border border-emerald-800/50 flex items-center justify-center font-bold">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <h3 className="font-bold text-base text-slate-100">صداقت در نمایش مجوزها</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                برچسب‌های شفاف برای پروانه کسب، عضویت در اتحادیه و شرایط ضمانت خدمات با تفکیک دقیق وضعیت
              </p>
            </div>

            <div className="bg-slate-900/90 p-6 rounded-2xl border border-slate-800 space-y-3">
              <div className="w-12 h-12 rounded-xl bg-purple-950/80 text-purple-400 border border-purple-800/50 flex items-center justify-center font-bold">
                <ShoppingBag className="w-6 h-6" />
              </div>
              <h3 className="font-bold text-base text-slate-100">ویترین پیشرفته و کاتالوگ</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                گالری عکس باکیفیت، لیست قیمت محصولات، توضیحات خدمات و در آینده امکان پخش ویدیوهای محیط کار
              </p>
            </div>

            <div className="bg-slate-900/90 p-6 rounded-2xl border border-slate-800 space-y-3">
              <div className="w-12 h-12 rounded-xl bg-indigo-950/80 text-indigo-400 border border-indigo-800/50 flex items-center justify-center font-bold">
                <QrCode className="w-6 h-6" />
              </div>
              <h3 className="font-bold text-base text-slate-100">کارت‌ساز هوشمند با QR</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                ۳ قالب داینامیک لوکس، کد QR قابل اسکن، قابلیت چاپ فیزیکی و اتصال به طراحان برگزیده کارت
              </p>
            </div>

          </div>

        </div>
      </section>

      {/* 5. HOW IT WORKS (۴ گام ساده) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-12 space-y-2">
          <h2 className="text-2xl sm:text-3xl font-bold text-slate-100">مسیر مشتری در اینکارت چگونه است؟</h2>
          <p className="text-xs sm:text-sm text-slate-400">از جستجو تا دریافت خدمت در ۴ گام کوتاه و شفاف</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 relative">
          
          <div className="bg-slate-900/90 p-6 rounded-2xl border border-slate-800 text-center space-y-3 relative">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-cyan-500 to-indigo-600 text-slate-950 font-black text-sm flex items-center justify-center mx-auto shadow-md">
              ۱
            </div>
            <h3 className="font-bold text-sm text-slate-100">جستجوی صنف و شهر</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              خدمت مورد نیاز خود را در شهر یا منطقه دلخواه فیلتر کنید.
            </p>
          </div>

          <div className="bg-slate-900/90 p-6 rounded-2xl border border-slate-800 text-center space-y-3 relative">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-cyan-500 to-indigo-600 text-slate-950 font-black text-sm flex items-center justify-center mx-auto shadow-md">
              ۲
            </div>
            <h3 className="font-bold text-sm text-slate-100">کلیک روی مینی‌کارت</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              با مشاهده تصویر و برچسب‌های مینی‌کارت، وارد طرح معرفی شوید.
            </p>
          </div>

          <div className="bg-slate-900/90 p-6 rounded-2xl border border-slate-800 text-center space-y-3 relative">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-cyan-500 to-indigo-600 text-slate-950 font-black text-sm flex items-center justify-center mx-auto shadow-md">
              ۳
            </div>
            <h3 className="font-bold text-sm text-slate-100">بررسی ویترین و قیمت‌ها</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              گالری عکس، نمونه‌کارها، قیمت‌ها و نظرات سایر مراجعین را بسنجید.
            </p>
          </div>

          <div className="bg-slate-900/90 p-6 rounded-2xl border border-slate-800 text-center space-y-3 relative">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-cyan-500 to-indigo-600 text-slate-950 font-black text-sm flex items-center justify-center mx-auto shadow-md">
              ۴
            </div>
            <h3 className="font-bold text-sm text-slate-100">ارتباط یا اسکن QR</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              تماس مستقیم، ارسال پیام در شبکه‌های اجتماعی یا دریافت کارت دیجیتال.
            </p>
          </div>

        </div>
      </section>

      {/* 6. STATS METRICS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-gradient-to-r from-slate-900 via-indigo-950/60 to-slate-900 border border-slate-800 rounded-3xl p-8 sm:p-12 text-slate-100 shadow-xl shadow-cyan-950/20">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 text-center">
            
            <div className="space-y-1">
              <span className="text-2xl sm:text-4xl font-black text-cyan-400">۱,۲۵۰+</span>
              <p className="text-xs sm:text-sm text-slate-300 font-medium">کسب‌وکار فعال دارای ویترین</p>
            </div>

            <div className="space-y-1">
              <span className="text-2xl sm:text-4xl font-black text-slate-100">۱۲</span>
              <p className="text-xs sm:text-sm text-slate-300 font-medium">کلان‌شهر تحت پوشش</p>
            </div>

            <div className="space-y-1">
              <span className="text-2xl sm:text-4xl font-black text-cyan-400">۱۵,۰۰۰+</span>
              <p className="text-xs sm:text-sm text-slate-300 font-medium">اسکن روزانه کارت دیجیتال</p>
            </div>

            <div className="space-y-1">
              <span className="text-2xl sm:text-4xl font-black text-emerald-400">۹۸.۴٪</span>
              <p className="text-xs sm:text-sm text-slate-300 font-medium">رضایت صاحبان مشاغل</p>
            </div>

          </div>
        </div>
      </section>

      {/* 7. FAQ ACCORDION */}
      <section id="faq" className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8 space-y-2">
          <div className="inline-flex items-center gap-1.5 text-cyan-400 text-xs font-bold">
            <HelpCircle className="w-4 h-4" />
            <span>پاسخ به ابهامات متداول</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold text-slate-100">سوالات متداول کاربران و صاحبان مشاغل</h2>
        </div>

        <div className="space-y-3">
          {faqs.map((faq, idx) => {
            const isOpen = openFaq === idx;
            return (
              <div
                key={idx}
                className="bg-slate-900/90 rounded-2xl border border-slate-800 overflow-hidden transition-all"
              >
                <button
                  onClick={() => setOpenFaq(isOpen ? null : idx)}
                  className="w-full p-4 sm:p-5 text-right flex items-center justify-between gap-4 font-bold text-sm text-slate-200 hover:text-cyan-400 focus:outline-none cursor-pointer"
                >
                  <span>{faq.q}</span>
                  <ChevronDown className={`w-4 h-4 text-slate-400 transition-transform ${isOpen ? 'rotate-180 text-cyan-400' : ''}`} />
                </button>
                {isOpen && (
                  <div className="px-4 sm:px-5 pb-5 text-xs sm:text-sm text-slate-400 leading-relaxed border-t border-slate-800 pt-3">
                    {faq.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </section>

      {/* 8. FINAL CTA BANNER */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-gradient-to-br from-slate-900 via-slate-900 to-indigo-950 rounded-3xl p-8 sm:p-12 text-center text-white border border-slate-800 space-y-6 relative overflow-hidden shadow-2xl shadow-cyan-950/20">
          <div className="max-w-2xl mx-auto space-y-3 relative z-10">
            <h2 className="text-2xl sm:text-4xl font-black text-slate-100">صاحب یک کسب‌وکار یا حرفه تخصصی هستید؟</h2>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              همین امروز ویترین اختصاصی و کارت ویزیت هوشمند QR خود را بسازید و در میان برترین‌های شهر خود دیده شوید.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-3 pt-4">
              <button
                onClick={() => onNavigate('pricing')}
                className="px-6 py-3 rounded-xl bg-gradient-to-r from-cyan-600 to-indigo-600 hover:from-cyan-500 hover:to-indigo-500 text-white font-bold text-xs sm:text-sm shadow-lg shadow-cyan-500/20 transition cursor-pointer"
              >
                مشاهده تعرفه‌ها و شروع ثبت نام
              </button>
              <button
                onClick={() => onNavigate('card-maker')}
                className="px-6 py-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 font-bold text-xs sm:text-sm border border-slate-700 transition cursor-pointer"
              >
                طراحی پیش‌نمایش کارت دیجیتال
              </button>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
};
