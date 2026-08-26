import React from 'react';
import { Business } from '../types';
import { 
  MapPin, 
  Star, 
  ShieldCheck, 
  Clock, 
  Eye, 
  Phone, 
  Sparkles, 
  Bookmark, 
  ShoppingBag,
  ExternalLink,
  Award
} from 'lucide-react';

interface BusinessMiniCardProps {
  business: Business;
  onSelect: (business: Business) => void;
  isSaved?: boolean;
  onToggleSave?: (businessId: string) => void;
}

export const BusinessMiniCard: React.FC<BusinessMiniCardProps> = ({
  business,
  onSelect,
  isSaved = false,
  onToggleSave,
}) => {
  return (
    <div
      onClick={() => onSelect(business)}
      className="group relative bg-slate-900/90 rounded-2xl border border-slate-800 hover:border-cyan-500/50 hover:shadow-lg hover:shadow-cyan-500/10 transition-all duration-200 overflow-hidden cursor-pointer flex flex-col"
    >
      {/* Top Banner / Image Area */}
      <div className="relative h-44 sm:h-48 w-full bg-slate-950 overflow-hidden">
        <img
          src={business.bannerImage}
          alt={business.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300 opacity-90"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent" />

        {/* Featured Badge */}
        {business.isFeatured && (
          <div className="absolute top-3 right-3 flex items-center gap-1 bg-cyan-400 text-slate-950 px-2.5 py-1 rounded-lg text-xs font-black shadow-md">
            <Sparkles className="w-3.5 h-3.5 fill-current" />
            <span>ویژه اینکارت</span>
          </div>
        )}

        {/* Category Tag & City */}
        <div className="absolute top-3 left-3 flex items-center gap-1.5">
          <span className="bg-slate-900/90 backdrop-blur text-slate-200 px-2 py-0.5 rounded-lg text-[11px] font-bold border border-slate-700">
            {business.city}
          </span>
          {onToggleSave && (
            <button
              onClick={(e) => {
                e.stopPropagation();
                onToggleSave(business.id);
              }}
              className={`p-1.5 rounded-lg backdrop-blur transition cursor-pointer ${
                isSaved 
                  ? 'bg-red-500 text-white shadow-md' 
                  : 'bg-slate-900/80 text-slate-200 hover:bg-slate-800 border border-slate-700'
              }`}
              title={isSaved ? 'حذف از نشان‌شده‌ها' : 'نشان کردن'}
            >
              <Bookmark className={`w-3.5 h-3.5 ${isSaved ? 'fill-current' : ''}`} />
            </button>
          )}
        </div>

        {/* Bottom Banner Info: Logo + Rating */}
        <div className="absolute bottom-3 right-3 left-3 flex items-end justify-between text-white">
          <div className="flex items-center gap-2.5">
            <div className="w-11 h-11 rounded-xl bg-slate-900 p-0.5 shadow-md overflow-hidden border border-slate-700 shrink-0">
              <img
                src={business.logoImage}
                alt={business.managerName}
                className="w-full h-full object-cover rounded-lg"
              />
            </div>
            <div className="leading-tight">
              <span className="text-[11px] text-cyan-300 font-semibold block">{business.category}</span>
              <span className="text-xs font-bold text-slate-200 block line-clamp-1">{business.district}</span>
            </div>
          </div>

          <div className="flex items-center gap-1 bg-slate-900/90 backdrop-blur px-2 py-1 rounded-lg border border-slate-700 text-xs font-bold">
            <Star className="w-3.5 h-3.5 text-amber-400 fill-current" />
            <span className="text-slate-100">{business.rating}</span>
            <span className="text-[10px] text-slate-400 font-normal">({business.reviewsCount})</span>
          </div>
        </div>
      </div>

      {/* Card Body */}
      <div className="p-4 flex-1 flex flex-col justify-between space-y-3">
        
        {/* Title and Short Description */}
        <div>
          <h3 className="font-bold text-base text-slate-100 group-hover:text-cyan-400 transition-colors line-clamp-1">
            {business.title}
          </h3>
          <p className="text-xs text-slate-400 line-clamp-2 mt-1 leading-relaxed">
            {business.shortBio}
          </p>
        </div>

        {/* Transparent Declarations Badges (برچسب‌های شفاف اظهارات کسب‌وکار) */}
        <div className="flex flex-wrap items-center gap-1.5 pt-1">
          {business.hasLicense && (
            <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-emerald-950/60 text-emerald-400 border border-emerald-800/60 text-[10px] font-bold">
              <ShieldCheck className="w-3 h-3 text-emerald-400" />
              <span>دارای جواز (اظهار شده)</span>
            </span>
          )}
          {business.isUnionMember && (
            <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-cyan-950/60 text-cyan-400 border border-cyan-800/60 text-[10px] font-bold">
              <Award className="w-3 h-3 text-cyan-400" />
              <span>عضو اتحادیه</span>
            </span>
          )}
          {business.hasWarranty && (
            <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-amber-950/60 text-amber-400 border border-amber-800/60 text-[10px] font-bold">
              <ShieldCheck className="w-3 h-3 text-amber-400" />
              <span>ضمانت خدمات</span>
            </span>
          )}
          {business.hasShowcase && (
            <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-purple-950/60 text-purple-400 border border-purple-800/60 text-[10px] font-bold">
              <ShoppingBag className="w-3 h-3 text-purple-400" />
              <span>ویترین فعال ({business.products.length} کالا/خدمت)</span>
            </span>
          )}
        </div>

        {/* Address and Distance / Status */}
        <div className="pt-2 border-t border-slate-800 flex items-center justify-between text-xs text-slate-400">
          <div className="flex items-center gap-1 truncate max-w-[200px]">
            <MapPin className="w-3.5 h-3.5 text-slate-500 shrink-0" />
            <span className="truncate">{business.city}، {business.address}</span>
          </div>

          {business.distanceKm !== undefined && (
            <span className="text-[11px] font-bold text-cyan-400 bg-cyan-950/70 border border-cyan-800/50 px-2 py-0.5 rounded-md shrink-0">
              فاصله: {business.distanceKm} ک.م
            </span>
          )}
        </div>

        {/* Action Bar */}
        <div className="pt-1 flex items-center justify-between">
          <div className="flex items-center gap-1 text-[11px] font-medium text-slate-400">
            <Eye className="w-3.5 h-3.5" />
            <span>{business.viewsCount.toLocaleString('fa-IR')} بازدید</span>
          </div>

          <div className="flex items-center gap-1 text-cyan-400 text-xs font-bold group-hover:translate-x-[-2px] transition-transform">
            <span>مشاهده طرح معرفی و ویترین</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </div>
        </div>

      </div>
    </div>
  );
};
