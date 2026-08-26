import React, { useState, useMemo } from 'react';
import { Business, Category, City } from '../types';
import { BusinessMiniCard } from './BusinessMiniCard';
import { 
  Search, 
  MapPin, 
  Building2, 
  Filter, 
  SlidersHorizontal, 
  RotateCcw, 
  Compass, 
  ShieldCheck, 
  ShoppingBag, 
  Award,
  ArrowUpDown,
  Layers,
  Sparkles
} from 'lucide-react';

interface SearchDiscoveryViewProps {
  businesses: Business[];
  cities: City[];
  categories: Category[];
  initialCityId?: string;
  initialCategoryId?: string;
  initialKeyword?: string;
  initialNearMe?: boolean;
  onSelectBusiness: (business: Business) => void;
  savedBusinessIds?: string[];
  onToggleSave?: (businessId: string) => void;
}

export const SearchDiscoveryView: React.FC<SearchDiscoveryViewProps> = ({
  businesses,
  cities,
  categories,
  initialCityId = '',
  initialCategoryId = '',
  initialKeyword = '',
  initialNearMe = false,
  onSelectBusiness,
  savedBusinessIds = [],
  onToggleSave,
}) => {
  const [selectedCity, setSelectedCity] = useState(initialCityId);
  const [selectedCategory, setSelectedCategory] = useState(initialCategoryId);
  const [keyword, setKeyword] = useState(initialKeyword);
  const [filterLicense, setFilterLicense] = useState(false);
  const [filterUnion, setFilterUnion] = useState(false);
  const [filterWarranty, setFilterWarranty] = useState(false);
  const [filterShowcase, setFilterShowcase] = useState(false);
  const [sortBy, setSortBy] = useState<'rating' | 'views' | 'distance'>('rating');
  const [maxDistance, setMaxDistance] = useState<number>(20);

  // Filter Logic
  const filteredBusinesses = useMemo(() => {
    return businesses
      .filter((b) => {
        // City Filter
        if (selectedCity && b.cityId !== selectedCity) return false;

        // Category Filter
        if (selectedCategory && b.categoryId !== selectedCategory) return false;

        // Keyword Filter (Title, Description, Manager, District)
        if (keyword.trim()) {
          const q = keyword.toLowerCase().trim();
          const matchTitle = b.title.toLowerCase().includes(q);
          const matchDesc = b.description.toLowerCase().includes(q);
          const matchManager = b.managerName.toLowerCase().includes(q);
          const matchDistrict = b.district.toLowerCase().includes(q);
          const matchProducts = b.products.some(p => p.title.toLowerCase().includes(q) || p.description.toLowerCase().includes(q));
          if (!matchTitle && !matchDesc && !matchManager && !matchDistrict && !matchProducts) return false;
        }

        // Declaration Filters
        if (filterLicense && !b.hasLicense) return false;
        if (filterUnion && !b.isUnionMember) return false;
        if (filterWarranty && !b.hasWarranty) return false;
        if (filterShowcase && !b.hasShowcase) return false;

        // Distance Filter
        if (b.distanceKm !== undefined && b.distanceKm > maxDistance) return false;

        return true;
      })
      .sort((a, b) => {
        if (sortBy === 'rating') return b.rating - a.rating;
        if (sortBy === 'views') return b.viewsCount - a.viewsCount;
        if (sortBy === 'distance') {
          return (a.distanceKm || 99) - (b.distanceKm || 99);
        }
        return 0;
      });
  }, [
    businesses,
    selectedCity,
    selectedCategory,
    keyword,
    filterLicense,
    filterUnion,
    filterWarranty,
    filterShowcase,
    sortBy,
    maxDistance,
  ]);

  const handleReset = () => {
    setSelectedCity('');
    setSelectedCategory('');
    setKeyword('');
    setFilterLicense(false);
    setFilterUnion(false);
    setFilterWarranty(false);
    setFilterShowcase(false);
    setSortBy('rating');
    setMaxDistance(20);
  };

  const activeFiltersCount = [
    selectedCity,
    selectedCategory,
    keyword,
    filterLicense,
    filterUnion,
    filterWarranty,
    filterShowcase,
  ].filter(Boolean).length;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      
      {/* Page Header */}
      <div className="bg-slate-900/90 rounded-2xl p-6 border border-slate-800 shadow-xl shadow-cyan-950/10 space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <div className="flex items-center gap-2 text-xs font-bold text-cyan-400 mb-1">
              <Layers className="w-4 h-4" />
              <span>موتور جستجو و ویترین‌های محلی</span>
            </div>
            <h1 className="text-2xl font-black text-slate-100">نتایج جستجو و کشف مراکز تخصصی</h1>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-xs font-bold text-slate-400">مرتب‌سازی بر اساس:</span>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as any)}
              className="bg-slate-800 border border-slate-700 text-xs font-bold text-slate-200 rounded-xl px-3 py-2 focus:outline-none cursor-pointer"
            >
              <option value="rating" className="bg-slate-900 text-slate-200">بالاترین امتیاز کاربران</option>
              <option value="views" className="bg-slate-900 text-slate-200">بیشترین بازدید ویترین</option>
              <option value="distance" className="bg-slate-900 text-slate-200">نزدیک‌ترین فاصله (شعاعی)</option>
            </select>
          </div>
        </div>

        {/* Primary Filter Bar */}
        <div className="grid grid-cols-1 sm:grid-cols-12 gap-3 pt-2">
          
          {/* City */}
          <div className="sm:col-span-3">
            <div className="flex items-center gap-2 bg-slate-800/90 border border-slate-700 rounded-xl px-3 py-2.5">
              <MapPin className="w-4 h-4 text-cyan-400 shrink-0" />
              <select
                value={selectedCity}
                onChange={(e) => setSelectedCity(e.target.value)}
                className="w-full bg-transparent text-xs font-bold text-slate-200 focus:outline-none cursor-pointer"
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

          {/* Category */}
          <div className="sm:col-span-4">
            <div className="flex items-center gap-2 bg-slate-800/90 border border-slate-700 rounded-xl px-3 py-2.5">
              <Building2 className="w-4 h-4 text-cyan-400 shrink-0" />
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="w-full bg-transparent text-xs font-bold text-slate-200 focus:outline-none cursor-pointer"
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
          <div className="sm:col-span-5">
            <div className="flex items-center gap-2 bg-slate-800/90 border border-slate-700 rounded-xl px-3 py-2.5">
              <Search className="w-4 h-4 text-slate-500 shrink-0" />
              <input
                type="text"
                value={keyword}
                onChange={(e) => setKeyword(e.target.value)}
                placeholder="جستجوی نام مرکز، خدمت، منطقه یا پزشک..."
                className="w-full bg-transparent text-xs text-slate-100 placeholder:text-slate-500 focus:outline-none"
              />
              {keyword && (
                <button
                  onClick={() => setKeyword('')}
                  className="text-xs text-slate-400 hover:text-slate-200 px-1 cursor-pointer"
                >
                  ✕
                </button>
              )}
            </div>
          </div>

        </div>

        {/* Declaration & Status Filters (برچسب‌های شفاف اظهارات) */}
        <div className="pt-3 border-t border-slate-800 flex flex-wrap items-center justify-between gap-3">
          
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-xs font-bold text-slate-400 flex items-center gap-1">
              <Filter className="w-3.5 h-3.5 text-cyan-400" />
              <span>فیلترهای شفافیت:</span>
            </span>

            {/* License Check */}
            <button
              onClick={() => setFilterLicense(!filterLicense)}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl border text-xs font-bold transition cursor-pointer ${
                filterLicense 
                  ? 'bg-emerald-950/90 text-emerald-400 border-emerald-800 shadow-md shadow-emerald-950/40' 
                  : 'bg-slate-800 border-slate-700 text-slate-300 hover:bg-slate-700'
              }`}
            >
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>دارای جواز (اظهار شده)</span>
            </button>

            {/* Union Check */}
            <button
              onClick={() => setFilterUnion(!filterUnion)}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl border text-xs font-bold transition cursor-pointer ${
                filterUnion 
                  ? 'bg-cyan-950/90 text-cyan-400 border-cyan-800 shadow-md shadow-cyan-950/40' 
                  : 'bg-slate-800 border-slate-700 text-slate-300 hover:bg-slate-700'
              }`}
            >
              <Award className="w-3.5 h-3.5" />
              <span>عضو اتحادیه</span>
            </button>

            {/* Warranty Check */}
            <button
              onClick={() => setFilterWarranty(!filterWarranty)}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl border text-xs font-bold transition cursor-pointer ${
                filterWarranty 
                  ? 'bg-amber-950/90 text-amber-400 border-amber-800 shadow-md shadow-amber-950/40' 
                  : 'bg-slate-800 border-slate-700 text-slate-300 hover:bg-slate-700'
              }`}
            >
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>دارای ضمانت خدمات</span>
            </button>

            {/* Showcase Check */}
            <button
              onClick={() => setFilterShowcase(!filterShowcase)}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl border text-xs font-bold transition cursor-pointer ${
                filterShowcase 
                  ? 'bg-purple-950/90 text-purple-400 border-purple-800 shadow-md shadow-purple-950/40' 
                  : 'bg-slate-800 border-slate-700 text-slate-300 hover:bg-slate-700'
              }`}
            >
              <ShoppingBag className="w-3.5 h-3.5" />
              <span>ویترین فعال محصولات</span>
            </button>
          </div>

          {/* Reset Filters */}
          {activeFiltersCount > 0 && (
            <button
              onClick={handleReset}
              className="flex items-center gap-1 text-xs text-red-400 hover:text-red-300 font-bold px-2 py-1 cursor-pointer"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>پاک‌کردن فیلترها ({activeFiltersCount})</span>
            </button>
          )}

        </div>

      </div>

      {/* Results Header */}
      <div className="flex items-center justify-between text-xs text-slate-400 px-1">
        <div>
          <span>نمایش </span>
          <span className="font-bold text-slate-100 text-sm">{filteredBusinesses.length}</span>
          <span> مرکز در ۲ ستون مجزا</span>
        </div>
        <div className="flex items-center gap-1 text-slate-400">
          <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
          <span>روی تصویر هر مینی‌کارت کلیک کنید تا طرح معرفی کامل باز شود</span>
        </div>
      </div>

      {/* 2-Column Responsive Mini-Card Grid (همانطور که در نیازمندی‌ها ذکر شد: نمایش در دو ستون) */}
      {filteredBusinesses.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filteredBusinesses.map((biz) => (
            <BusinessMiniCard
              key={biz.id}
              business={biz}
              onSelect={onSelectBusiness}
              isSaved={savedBusinessIds.includes(biz.id)}
              onToggleSave={onToggleSave}
            />
          ))}
        </div>
      ) : (
        <div className="bg-slate-900 rounded-2xl p-12 text-center border border-slate-800 space-y-4">
          <div className="w-14 h-14 rounded-2xl bg-slate-800 text-slate-500 flex items-center justify-center mx-auto">
            <Search className="w-6 h-6" />
          </div>
          <h3 className="text-base font-bold text-slate-200">کسب‌وکاری با این مشخصات یافت نشد</h3>
          <p className="text-xs text-slate-400 max-w-sm mx-auto">
            می‌توانید فیلترهای شهر، صنف یا برچسب‌های مجوز را تغییر دهید تا نتایج بیشتری نمایش داده شوند.
          </p>
          <button
            onClick={handleReset}
            className="px-4 py-2 rounded-xl bg-gradient-to-r from-cyan-600 to-indigo-600 hover:from-cyan-500 hover:to-indigo-500 text-white text-xs font-bold shadow-lg shadow-cyan-500/20 transition cursor-pointer"
          >
            نمایش تمامی مراکز
          </button>
        </div>
      )}

    </div>
  );
};
