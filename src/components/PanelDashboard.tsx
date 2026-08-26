import React, { useState } from 'react';
import { UserRole, Business, SubscriptionPayment, ProductServiceItem, CardTemplate } from '../types';
import { CARD_TEMPLATES_DATA } from '../mockData';
import { QRCodeDisplay } from './QRCodeDisplay';
import { 
  Building2, 
  User, 
  Palette, 
  ShieldCheck, 
  Crown, 
  Layers, 
  Plus, 
  Check, 
  X, 
  Star, 
  Eye, 
  QrCode, 
  FileText, 
  Settings, 
  Edit3, 
  Trash2, 
  ShoppingBag, 
  MapPin, 
  Phone, 
  CheckCircle2, 
  AlertCircle,
  ExternalLink,
  DollarSign,
  TrendingUp,
  Bookmark,
  Share2
} from 'lucide-react';

interface PanelDashboardProps {
  currentRole: UserRole;
  onRoleChange: (role: UserRole) => void;
  businesses: Business[];
  onUpdateBusiness: (updated: Business) => void;
  payments: SubscriptionPayment[];
  onUpdatePaymentStatus: (paymentId: string, status: 'approved' | 'rejected') => void;
  onSelectBusiness: (business: Business) => void;
  savedBusinessIds: string[];
  onToggleSave: (businessId: string) => void;
  onNavigate: (view: string) => void;
}

export const PanelDashboard: React.FC<PanelDashboardProps> = ({
  currentRole,
  onRoleChange,
  businesses,
  onUpdateBusiness,
  payments,
  onUpdatePaymentStatus,
  onSelectBusiness,
  savedBusinessIds,
  onToggleSave,
  onNavigate,
}) => {
  // Navigation inside panel
  const [activeMenu, setActiveMenu] = useState<string>('dashboard');

  // Business Owner Edit States (defaults to biz-1 or first)
  const myBusiness = businesses[0];
  const [editTitle, setEditTitle] = useState(myBusiness.title);
  const [editManager, setEditManager] = useState(myBusiness.managerName);
  const [editPhone, setEditPhone] = useState(myBusiness.phone);
  const [editAddress, setEditAddress] = useState(myBusiness.address);
  const [editHasLicense, setEditHasLicense] = useState(myBusiness.hasLicense);
  const [editLicenseNum, setEditLicenseNum] = useState(myBusiness.licenseNumber || '');
  const [editUnion, setEditUnion] = useState(myBusiness.isUnionMember);
  const [editWarranty, setEditWarranty] = useState(myBusiness.hasWarranty);
  const [editWarrantyTerms, setEditWarrantyTerms] = useState(myBusiness.warrantyTerms || '');
  const [profileSaved, setProfileSaved] = useState(false);

  // New Product Modal State
  const [newProdTitle, setNewProdTitle] = useState('');
  const [newProdPrice, setNewProdPrice] = useState('');
  const [newProdDesc, setNewProdDesc] = useState('');
  const [showAddProductModal, setShowAddProductModal] = useState(false);

  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    const updated: Business = {
      ...myBusiness,
      title: editTitle,
      managerName: editManager,
      phone: editPhone,
      address: editAddress,
      hasLicense: editHasLicense,
      licenseNumber: editLicenseNum,
      isUnionMember: editUnion,
      hasWarranty: editWarranty,
      warrantyTerms: editWarrantyTerms,
    };
    onUpdateBusiness(updated);
    setProfileSaved(true);
    setTimeout(() => setProfileSaved(false), 3500);
  };

  const handleAddProduct = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newProdTitle.trim()) return;

    const newProd: ProductServiceItem = {
      id: `p-${Date.now()}`,
      title: newProdTitle,
      description: newProdDesc,
      priceFormatted: newProdPrice ? `${Number(newProdPrice).toLocaleString('fa-IR')} تومان` : 'استعلام قیمت',
      image: 'https://images.unsplash.com/photo-1581291518857-4e27b48ff24e?w=600&auto=format&fit=crop&q=80',
      categoryName: 'خدمات جدید',
    };

    const updated: Business = {
      ...myBusiness,
      products: [newProd, ...myBusiness.products],
    };
    onUpdateBusiness(updated);
    setNewProdTitle('');
    setNewProdPrice('');
    setNewProdDesc('');
    setShowAddProductModal(false);
  };

  const savedBusinesses = businesses.filter(b => savedBusinessIds.includes(b.id));

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      
      {/* Top Header & Role Switcher Bar */}
      <div className="bg-slate-900/90 rounded-3xl p-6 border border-slate-800 shadow-xl shadow-cyan-950/20 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold px-2.5 py-1 rounded-lg bg-cyan-950/80 text-cyan-300 border border-cyan-800/60">
              سامانه مدیریت یکپارچه اینکارت
            </span>
            <span className="text-xs text-slate-500">نسخه ۱.۴.۰</span>
          </div>
          <h1 className="text-2xl font-black text-slate-100 mt-1">
            پنل اختصاصی {currentRole === 'citizen' ? 'شهروند / مشتری' : currentRole === 'business_owner' ? 'مدیریت کسب‌وکار' : currentRole === 'card_designer' ? 'همکار طراح کارت' : 'مدیریت کل سیستم'}
          </h1>
        </div>

        {/* Role Switcher Pill */}
        <div className="flex items-center gap-3 bg-slate-800/90 p-2 rounded-2xl border border-slate-700">
          <span className="text-xs font-bold text-slate-400">انتخاب نقش:</span>
          <select
            value={currentRole}
            onChange={(e) => onRoleChange(e.target.value as UserRole)}
            className="bg-slate-900 border border-slate-700 rounded-xl px-3 py-1.5 text-xs font-bold text-slate-100 focus:outline-none focus:border-cyan-500 cursor-pointer"
          >
            <option value="citizen" className="bg-slate-900 text-slate-100">👤 شهروند / مشتری</option>
            <option value="business_owner" className="bg-slate-900 text-slate-100">🏢 صاحب کسب‌وکار</option>
            <option value="card_designer" className="bg-slate-900 text-slate-100">🎨 طراح کارت</option>
            <option value="admin" className="bg-slate-900 text-slate-100">👑 مدیر سیستم (ادمین)</option>
          </select>
        </div>
      </div>

      {/* Main Grid: Sidebar & Body */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Sidebar Nav (3 Cols) */}
        <div className="lg:col-span-3 space-y-4">
          <div className="bg-slate-900/90 rounded-3xl p-4 border border-slate-800 shadow-xl shadow-cyan-950/20 space-y-1.5 text-xs font-bold">
            
            <button
              onClick={() => setActiveMenu('dashboard')}
              className={`w-full flex items-center gap-2.5 px-3.5 py-3 rounded-2xl transition cursor-pointer ${
                activeMenu === 'dashboard' ? 'bg-gradient-to-r from-cyan-600 to-indigo-600 text-white shadow-md shadow-cyan-500/20' : 'text-slate-400 hover:bg-slate-800/80 hover:text-slate-200'
              }`}
            >
              <Layers className="w-4 h-4" />
              <span>داشبورد و نمای کلی</span>
            </button>

            {currentRole === 'business_owner' && (
              <>
                <button
                  onClick={() => setActiveMenu('edit_profile')}
                  className={`w-full flex items-center gap-2.5 px-3.5 py-3 rounded-2xl transition cursor-pointer ${
                    activeMenu === 'edit_profile' ? 'bg-gradient-to-r from-cyan-600 to-indigo-600 text-white shadow-md shadow-cyan-500/20' : 'text-slate-400 hover:bg-slate-800/80 hover:text-slate-200'
                  }`}
                >
                  <Edit3 className="w-4 h-4" />
                  <span>ویرایش مشخصات و مجوزها</span>
                </button>
                <button
                  onClick={() => setActiveMenu('manage_showcase')}
                  className={`w-full flex items-center gap-2.5 px-3.5 py-3 rounded-2xl transition cursor-pointer ${
                    activeMenu === 'manage_showcase' ? 'bg-gradient-to-r from-cyan-600 to-indigo-600 text-white shadow-md shadow-cyan-500/20' : 'text-slate-400 hover:bg-slate-800/80 hover:text-slate-200'
                  }`}
                >
                  <ShoppingBag className="w-4 h-4" />
                  <span>مدیریت ویترین و قیمت‌ها</span>
                </button>
                <button
                  onClick={() => setActiveMenu('my_card')}
                  className={`w-full flex items-center gap-2.5 px-3.5 py-3 rounded-2xl transition cursor-pointer ${
                    activeMenu === 'my_card' ? 'bg-gradient-to-r from-cyan-600 to-indigo-600 text-white shadow-md shadow-cyan-500/20' : 'text-slate-400 hover:bg-slate-800/80 hover:text-slate-200'
                  }`}
                >
                  <QrCode className="w-4 h-4" />
                  <span>کارت دیجیتال و کد QR</span>
                </button>
              </>
            )}

            {currentRole === 'citizen' && (
              <>
                <button
                  onClick={() => setActiveMenu('saved_businesses')}
                  className={`w-full flex items-center gap-2.5 px-3.5 py-3 rounded-2xl transition cursor-pointer ${
                    activeMenu === 'saved_businesses' ? 'bg-gradient-to-r from-cyan-600 to-indigo-600 text-white shadow-md shadow-cyan-500/20' : 'text-slate-400 hover:bg-slate-800/80 hover:text-slate-200'
                  }`}
                >
                  <Bookmark className="w-4 h-4" />
                  <span>مراکز نشان شده ({savedBusinessIds.length})</span>
                </button>
              </>
            )}

            {currentRole === 'card_designer' && (
              <>
                <button
                  onClick={() => setActiveMenu('designer_templates')}
                  className={`w-full flex items-center gap-2.5 px-3.5 py-3 rounded-2xl transition cursor-pointer ${
                    activeMenu === 'designer_templates' ? 'bg-gradient-to-r from-cyan-600 to-indigo-600 text-white shadow-md shadow-cyan-500/20' : 'text-slate-400 hover:bg-slate-800/80 hover:text-slate-200'
                  }`}
                >
                  <Palette className="w-4 h-4" />
                  <span>قالب‌های من و آمار استفاده</span>
                </button>
              </>
            )}

            {currentRole === 'admin' && (
              <>
                <button
                  onClick={() => setActiveMenu('admin_receipts')}
                  className={`w-full flex items-center gap-2.5 px-3.5 py-3 rounded-2xl transition cursor-pointer ${
                    activeMenu === 'admin_receipts' ? 'bg-gradient-to-r from-cyan-600 to-indigo-600 text-white shadow-md shadow-cyan-500/20' : 'text-slate-400 hover:bg-slate-800/80 hover:text-slate-200'
                  }`}
                >
                  <FileText className="w-4 h-4" />
                  <span>بررسی و تایید فیش‌های واریزی</span>
                </button>
                <button
                  onClick={() => setActiveMenu('admin_businesses')}
                  className={`w-full flex items-center gap-2.5 px-3.5 py-3 rounded-2xl transition cursor-pointer ${
                    activeMenu === 'admin_businesses' ? 'bg-gradient-to-r from-cyan-600 to-indigo-600 text-white shadow-md shadow-cyan-500/20' : 'text-slate-400 hover:bg-slate-800/80 hover:text-slate-200'
                  }`}
                >
                  <ShieldCheck className="w-4 h-4" />
                  <span>راستی‌آزمایی مدارک و کسب‌وکارها</span>
                </button>
              </>
            )}

          </div>

          {/* Quick Helper Box */}
          <div className="bg-slate-900/90 p-4 rounded-3xl border border-slate-800 text-xs space-y-2">
            <span className="font-bold text-slate-300 block">پشتیبانی اینکارت:</span>
            <p className="text-slate-400 text-[11px] leading-relaxed">
              هرگونه سوال یا نیاز به راهنمایی در خصوص اشتراک و ویترین را با شماره ۰۲۱-۸۸۹۹۰۰۱۱ در میان بگذارید.
            </p>
          </div>
        </div>

        {/* Panel Content Body (9 Cols) */}
        <div className="lg:col-span-9 space-y-6">
          
          {/* ================= ROLE 1: BUSINESS OWNER DASHBOARD ================= */}
          {currentRole === 'business_owner' && activeMenu === 'dashboard' && (
            <div className="space-y-6">
              
              {/* Stat Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="bg-slate-900/90 p-6 rounded-3xl border border-slate-800 shadow-xl shadow-cyan-950/20 space-y-2">
                  <div className="flex items-center justify-between text-slate-400">
                    <span className="text-xs font-bold text-slate-400">بازدید ماهانه ویترین</span>
                    <Eye className="w-4 h-4 text-cyan-400" />
                  </div>
                  <div className="text-2xl font-black text-slate-100">{myBusiness.viewsCount.toLocaleString('fa-IR')}</div>
                  <span className="text-[11px] text-emerald-400 font-bold">↑ ۱۲٪ رشد نسبت به ماه قبل</span>
                </div>

                <div className="bg-slate-900/90 p-6 rounded-3xl border border-slate-800 shadow-xl shadow-cyan-950/20 space-y-2">
                  <div className="flex items-center justify-between text-slate-400">
                    <span className="text-xs font-bold text-slate-400">اسکن کارت QR هوشمند</span>
                    <QrCode className="w-4 h-4 text-amber-400" />
                  </div>
                  <div className="text-2xl font-black text-slate-100">۴۲۸</div>
                  <span className="text-[11px] text-slate-400 font-medium">مشتریان متصل شده</span>
                </div>

                <div className="bg-slate-900/90 p-6 rounded-3xl border border-slate-800 shadow-xl shadow-cyan-950/20 space-y-2">
                  <div className="flex items-center justify-between text-slate-400">
                    <span className="text-xs font-bold text-slate-400">وضعیت اشتراک</span>
                    <Crown className="w-4 h-4 text-emerald-400" />
                  </div>
                  <div className="text-base font-black text-emerald-400">پلن طلایی VIP (فعال)</div>
                  <span className="text-[11px] text-slate-400">تمدید خودکار در پایان سال</span>
                </div>
              </div>

              {/* Quick Actions & Showcase Teaser */}
              <div className="bg-slate-900/90 rounded-3xl p-6 border border-slate-800 shadow-xl shadow-cyan-950/20 space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="font-black text-sm text-slate-100">اقدامات سریع مدیریت</h3>
                  <button
                    onClick={() => onSelectBusiness(myBusiness)}
                    className="text-xs font-bold text-cyan-400 hover:text-cyan-300 flex items-center gap-1 cursor-pointer"
                  >
                    <span>مشاهده صفحه عمومی کسب‌وکار</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </button>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                  <button
                    onClick={() => setActiveMenu('manage_showcase')}
                    className="p-4 rounded-2xl bg-slate-800/80 hover:bg-slate-800 border border-slate-700 text-right space-y-1 transition cursor-pointer"
                  >
                    <span className="font-bold text-xs text-slate-200 block">افزودن خدمت یا محصول به ویترین</span>
                    <p className="text-[11px] text-slate-400">ثبت تصاویر، قیمت‌گذاری مصوب و جزئیات</p>
                  </button>

                  <button
                    onClick={() => setActiveMenu('edit_profile')}
                    className="p-4 rounded-2xl bg-slate-800/80 hover:bg-slate-800 border border-slate-700 text-right space-y-1 transition cursor-pointer"
                  >
                    <span className="font-bold text-xs text-slate-200 block">به‌روزرسانی پروانه و گارانتی</span>
                    <p className="text-[11px] text-slate-400">ویرایش شماره پروانه صنف و شرایط ضمانت کتبی</p>
                  </button>
                </div>
              </div>

            </div>
          )}

          {/* Business Owner: Edit Profile */}
          {currentRole === 'business_owner' && activeMenu === 'edit_profile' && (
            <div className="bg-slate-900/90 rounded-3xl p-6 sm:p-8 border border-slate-800 shadow-xl shadow-cyan-950/20 space-y-6">
              <h2 className="text-base font-black text-slate-100">ویرایش اطلاعات و برچسب‌های شفاف اظهارات</h2>

              {profileSaved && (
                <div className="p-3.5 rounded-2xl bg-emerald-950/80 text-emerald-300 border border-emerald-800/60 text-xs font-bold flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                  <span>تغییرات با موفقیت ذخیره شد و در صفحه عمومی اعمال گردید.</span>
                </div>
              )}

              <form onSubmit={handleSaveProfile} className="space-y-4 text-xs">
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block font-bold text-slate-300 mb-1">نام واحد صنفی / مرکز</label>
                    <input
                      type="text"
                      value={editTitle}
                      onChange={(e) => setEditTitle(e.target.value)}
                      className="w-full bg-slate-800/90 border border-slate-700 rounded-xl p-2.5 text-xs text-slate-100 placeholder:text-slate-500 focus:outline-none focus:border-cyan-500"
                    />
                  </div>

                  <div>
                    <label className="block font-bold text-slate-300 mb-1">نام مدیر مسئول</label>
                    <input
                      type="text"
                      value={editManager}
                      onChange={(e) => setEditManager(e.target.value)}
                      className="w-full bg-slate-800/90 border border-slate-700 rounded-xl p-2.5 text-xs text-slate-100 placeholder:text-slate-500 focus:outline-none focus:border-cyan-500"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block font-bold text-slate-300 mb-1">تلفن تماس ثابت</label>
                    <input
                      type="text"
                      value={editPhone}
                      onChange={(e) => setEditPhone(e.target.value)}
                      className="w-full bg-slate-800/90 border border-slate-700 rounded-xl p-2.5 text-xs text-slate-100 placeholder:text-slate-500 focus:outline-none focus:border-cyan-500 font-mono"
                    />
                  </div>

                  <div>
                    <label className="block font-bold text-slate-300 mb-1">آدرس پستی</label>
                    <input
                      type="text"
                      value={editAddress}
                      onChange={(e) => setEditAddress(e.target.value)}
                      className="w-full bg-slate-800/90 border border-slate-700 rounded-xl p-2.5 text-xs text-slate-100 placeholder:text-slate-500 focus:outline-none focus:border-cyan-500"
                    />
                  </div>
                </div>

                {/* Declarations (برچسب‌های شفاف اظهارات) */}
                <div className="pt-4 border-t border-slate-800 space-y-3">
                  <h3 className="font-bold text-sm text-slate-100">اظهارات رسمی و مجوزهای صنفی</h3>
                  
                  <div className="space-y-3 bg-slate-800/60 p-4 rounded-2xl border border-slate-700">
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={editHasLicense}
                        onChange={(e) => setEditHasLicense(e.target.checked)}
                        className="rounded text-cyan-500 focus:ring-cyan-500"
                      />
                      <span className="font-bold text-slate-200">دارای پروانه کسب معتبر از صنف متبوع</span>
                    </label>

                    {editHasLicense && (
                      <div className="pr-6">
                        <label className="block text-[11px] text-slate-400 mb-1">شماره پروانه کسب</label>
                        <input
                          type="text"
                          value={editLicenseNum}
                          onChange={(e) => setEditLicenseNum(e.target.value)}
                          placeholder="مثال: ص/۹۸/۲۲۳۵۱"
                          className="w-full max-w-sm bg-slate-900 border border-slate-700 rounded-xl p-2 text-xs text-slate-100 focus:outline-none focus:border-cyan-500"
                        />
                      </div>
                    )}

                    <label className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={editUnion}
                        onChange={(e) => setEditUnion(e.target.checked)}
                        className="rounded text-cyan-500 focus:ring-cyan-500"
                      />
                      <span className="font-bold text-slate-200">عضویت رسمی در اتحادیه صنفی شهرستان</span>
                    </label>

                    <label className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={editWarranty}
                        onChange={(e) => setEditWarranty(e.target.checked)}
                        className="rounded text-cyan-500 focus:ring-cyan-500"
                      />
                      <span className="font-bold text-slate-200">ارائه گارانتی و ضمانت کتبی خدمات</span>
                    </label>

                    {editWarranty && (
                      <div className="pr-6">
                        <label className="block text-[11px] text-slate-400 mb-1">شرح شرایط ضمانت و تعهدات</label>
                        <input
                          type="text"
                          value={editWarrantyTerms}
                          onChange={(e) => setEditWarrantyTerms(e.target.value)}
                          placeholder="مثال: ضمانت ۱۰ ساله کتبی و تعویض قطعه بدون هزینه"
                          className="w-full bg-slate-900 border border-slate-700 rounded-xl p-2 text-xs text-slate-100 focus:outline-none focus:border-cyan-500"
                        />
                      </div>
                    )}
                  </div>
                </div>

                <div className="pt-2">
                  <button
                    type="submit"
                    className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-cyan-600 to-indigo-600 hover:from-cyan-500 hover:to-indigo-500 text-white font-bold text-xs shadow-lg shadow-cyan-500/20 transition cursor-pointer"
                  >
                    ذخیره و انتشار تغییرات
                  </button>
                </div>

              </form>
            </div>
          )}

          {/* Business Owner: Manage Showcase */}
          {currentRole === 'business_owner' && activeMenu === 'manage_showcase' && (
            <div className="bg-slate-900/90 rounded-3xl p-6 sm:p-8 border border-slate-800 shadow-xl shadow-cyan-950/20 space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-base font-black text-slate-100">مدیریت محصولات و خدمات ویترین</h2>
                  <p className="text-xs text-slate-400 mt-0.5">تعداد موارد فعال: {myBusiness.products.length} کالا/خدمت</p>
                </div>
                <button
                  onClick={() => setShowAddProductModal(true)}
                  className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-gradient-to-r from-cyan-600 to-indigo-600 hover:from-cyan-500 hover:to-indigo-500 text-white font-bold text-xs shadow-lg shadow-cyan-500/20 transition cursor-pointer"
                >
                  <Plus className="w-4 h-4" />
                  <span>افزودن خدمت جدید</span>
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {myBusiness.products.map((p) => (
                  <div key={p.id} className="p-4 rounded-2xl border border-slate-800 bg-slate-800/60 flex gap-3">
                    <img src={p.image} alt={p.title} className="w-20 h-20 rounded-xl object-cover shrink-0" />
                    <div className="flex-1 space-y-1">
                      <h4 className="font-bold text-xs text-slate-100">{p.title}</h4>
                      <p className="text-[11px] text-slate-400 line-clamp-2">{p.description}</p>
                      <span className="font-black text-xs text-cyan-400 block pt-1">{p.priceFormatted}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Business Owner: My Card */}
          {currentRole === 'business_owner' && activeMenu === 'my_card' && (
            <div className="bg-slate-900/90 rounded-3xl p-6 sm:p-8 border border-slate-800 shadow-xl shadow-cyan-950/20 space-y-6 text-center">
              <h2 className="text-base font-black text-slate-100">کارت ویزیت دیجیتال و بارکد اختصاصی شما</h2>
              <p className="text-xs text-slate-400 max-w-md mx-auto">
                این بارکد را روی تابلو، بنر یا کارت‌های چاپی قرار دهید تا مراجعین فوراً به ویترین شما متصل شوند.
              </p>

              <div className="flex justify-center py-4">
                <div className="p-4 rounded-2xl bg-white shadow-2xl inline-block">
                  <QRCodeDisplay
                    value={`https://inkart.ir/biz/${myBusiness.slug}`}
                    size={160}
                    fgColor="#0f172a"
                    bgColor="#ffffff"
                    logoUrl={myBusiness.logoImage}
                    title={myBusiness.title}
                  />
                </div>
              </div>

              <div className="flex justify-center gap-3">
                <button
                  onClick={() => onNavigate('card-maker')}
                  className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-cyan-600 to-indigo-600 hover:from-cyan-500 hover:to-indigo-500 text-white font-bold text-xs shadow-lg shadow-cyan-500/20 transition cursor-pointer"
                >
                  ورود به استودیو کارت‌ساز و تغییر قالب
                </button>
              </div>
            </div>
          )}

          {/* ================= ROLE 2: CITIZEN / CUSTOMER ================= */}
          {currentRole === 'citizen' && (
            <div className="space-y-6">
              
              <div className="bg-slate-900/90 rounded-3xl p-6 border border-slate-800 shadow-xl shadow-cyan-950/20 space-y-4">
                <h3 className="text-base font-black text-slate-100 flex items-center gap-2">
                  <Bookmark className="w-5 h-5 text-cyan-400" />
                  <span>کسب‌وکارهای نشان‌شده من ({savedBusinesses.length})</span>
                </h3>

                {savedBusinesses.length > 0 ? (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {savedBusinesses.map((biz) => (
                      <div
                        key={biz.id}
                        onClick={() => onSelectBusiness(biz)}
                        className="p-4 rounded-2xl border border-slate-800 bg-slate-800/60 hover:bg-slate-800 transition cursor-pointer flex items-center justify-between"
                      >
                        <div className="flex items-center gap-3">
                          <img src={biz.logoImage} alt={biz.title} className="w-12 h-12 rounded-xl object-cover" />
                          <div>
                            <h4 className="font-bold text-xs text-slate-100">{biz.title}</h4>
                            <span className="text-[11px] text-slate-400">{biz.city} — {biz.category}</span>
                          </div>
                        </div>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            onToggleSave(biz.id);
                          }}
                          className="text-xs text-red-400 hover:text-red-300 font-bold px-2 py-1 cursor-pointer"
                        >
                          حذف
                        </button>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-8 text-slate-500 text-xs">
                    هنوز کسب‌وکاری را نشان نکرده‌اید. با کلیک بر روی آیکون بوکمارک مینی‌کارت‌ها، مراکز دلخواه را ذخیره کنید.
                  </div>
                )}
              </div>

            </div>
          )}

          {/* ================= ROLE 3: CARD DESIGNER ================= */}
          {currentRole === 'card_designer' && (
            <div className="space-y-6">
              
              {/* Designer Stats */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="bg-slate-900/90 p-6 rounded-3xl border border-slate-800 shadow-xl shadow-cyan-950/20 space-y-2">
                  <span className="text-xs font-bold text-slate-400">کد معرف اختصاصی من</span>
                  <div className="text-2xl font-black font-mono text-cyan-400">DES-208</div>
                  <span className="text-[11px] text-slate-400">سارا تهرانی (طراح ارشد)</span>
                </div>

                <div className="bg-slate-900/90 p-6 rounded-3xl border border-slate-800 shadow-xl shadow-cyan-950/20 space-y-2">
                  <span className="text-xs font-bold text-slate-400">تعداد استفاده فعال از قالب‌ها</span>
                  <div className="text-2xl font-black text-slate-100">۵۱۲ مرکز</div>
                  <span className="text-[11px] text-emerald-400 font-bold">قالب رویال بلک اند گلد</span>
                </div>

                <div className="bg-slate-900/90 p-6 rounded-3xl border border-slate-800 shadow-xl shadow-cyan-950/20 space-y-2">
                  <span className="text-xs font-bold text-slate-400">پورسانت معرف تسویه‌نشده</span>
                  <div className="text-2xl font-black text-slate-100">۴,۸۰۰,۰۰۰ تومان</div>
                  <span className="text-[11px] text-cyan-400 font-bold">تسویه خودکار اول هر ماه</span>
                </div>
              </div>

              {/* Templates Showcase */}
              <div className="bg-slate-900/90 rounded-3xl p-6 border border-slate-800 shadow-xl shadow-cyan-950/20 space-y-4">
                <h3 className="font-black text-base text-slate-100">قالب‌های منتشر شده در استودیو</h3>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  {CARD_TEMPLATES_DATA.map((tmpl) => (
                    <div key={tmpl.id} className="p-4 rounded-2xl border border-slate-800 bg-slate-800/60 space-y-2">
                      <div className={`h-20 rounded-xl bg-gradient-to-br ${tmpl.bgGradient} flex items-center justify-center text-white font-bold text-xs`}>
                        {tmpl.name}
                      </div>
                      <h4 className="font-bold text-xs text-slate-200">{tmpl.name}</h4>
                      <span className="text-[11px] text-slate-400 block">{tmpl.usesCount} بار دانلود شده</span>
                    </div>
                  ))}
                </div>
              </div>

            </div>
          )}

          {/* ================= ROLE 4: ADMIN DASHBOARD ================= */}
          {currentRole === 'admin' && (
            <div className="space-y-6">
              
              {/* Admin Stat Overview */}
              <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
                <div className="bg-slate-900/90 p-5 rounded-3xl border border-slate-800 shadow-xl shadow-cyan-950/20">
                  <span className="text-xs text-slate-400 font-bold">کل کسب‌وکارها</span>
                  <div className="text-2xl font-black text-slate-100 mt-1">{businesses.length} مرکز</div>
                </div>

                <div className="bg-slate-900/90 p-5 rounded-3xl border border-slate-800 shadow-xl shadow-cyan-950/20">
                  <span className="text-xs text-slate-400 font-bold">فیش‌های در انتظار تایید</span>
                  <div className="text-2xl font-black text-amber-400 mt-1">
                    {payments.filter(p => p.status === 'pending').length} مورد
                  </div>
                </div>

                <div className="bg-slate-900/90 p-5 rounded-3xl border border-slate-800 shadow-xl shadow-cyan-950/20">
                  <span className="text-xs text-slate-400 font-bold">مجموع واریزی‌ها</span>
                  <div className="text-2xl font-black text-emerald-400 mt-1">۱۱.۸ م.ت</div>
                </div>

                <div className="bg-slate-900/90 p-5 rounded-3xl border border-slate-800 shadow-xl shadow-cyan-950/20">
                  <span className="text-xs text-slate-400 font-bold">شهرهای تحت پوشش</span>
                  <div className="text-2xl font-black text-cyan-400 mt-1">۱۲ کلان‌شهر</div>
                </div>
              </div>

              {/* Admin: Pending Receipts Review Table */}
              <div className="bg-slate-900/90 rounded-3xl p-6 border border-slate-800 shadow-xl shadow-cyan-950/20 space-y-4">
                <h3 className="font-black text-base text-slate-100 flex items-center gap-2">
                  <FileText className="w-5 h-5 text-amber-400" />
                  <span>مدیریت و تایید فیش‌های واریزی اشتراک</span>
                </h3>

                <div className="overflow-x-auto">
                  <table className="w-full text-right text-xs">
                    <thead className="bg-slate-800/90 text-slate-400 border-b border-slate-700">
                      <tr>
                        <th className="p-3 font-bold">کسب‌وکار</th>
                        <th className="p-3 font-bold">پلن انتخابی</th>
                        <th className="p-3 font-bold">مبلغ (تومان)</th>
                        <th className="p-3 font-bold">کد پیگیری</th>
                        <th className="p-3 font-bold">وضعیت فعلی</th>
                        <th className="p-3 font-bold text-center">عملیات مدیر</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-800">
                      {payments.map((p) => (
                        <tr key={p.id} className="hover:bg-slate-800/40 transition">
                          <td className="p-3 font-bold text-slate-200">{p.businessTitle}</td>
                          <td className="p-3 text-slate-400">{p.planTitle}</td>
                          <td className="p-3 font-bold text-slate-100">{p.amount.toLocaleString('fa-IR')}</td>
                          <td className="p-3 font-mono text-slate-400">{p.trackingCode}</td>
                          <td className="p-3">
                            <span className={`px-2.5 py-1 rounded-lg text-[10px] font-bold border ${
                              p.status === 'approved' 
                                ? 'bg-emerald-950/80 text-emerald-400 border-emerald-800/60' 
                                : p.status === 'pending' 
                                ? 'bg-amber-950/80 text-amber-400 border-amber-800/60' 
                                : 'bg-red-950/80 text-red-400 border-red-800/60'
                            }`}>
                              {p.status === 'approved' ? 'تایید شده' : p.status === 'pending' ? 'در انتظار' : 'رد شده'}
                            </span>
                          </td>
                          <td className="p-3">
                            <div className="flex items-center justify-center gap-2">
                              {p.status === 'pending' && (
                                <>
                                  <button
                                    onClick={() => onUpdatePaymentStatus(p.id, 'approved')}
                                    className="p-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white font-bold transition text-[11px] flex items-center gap-1 cursor-pointer"
                                    title="تایید و فعال‌سازی"
                                  >
                                    <Check className="w-3.5 h-3.5" />
                                    <span>تایید</span>
                                  </button>
                                  <button
                                    onClick={() => onUpdatePaymentStatus(p.id, 'rejected')}
                                    className="p-1.5 rounded-lg bg-red-600 hover:bg-red-700 text-white font-bold transition text-[11px] flex items-center gap-1 cursor-pointer"
                                    title="رد فیش"
                                  >
                                    <X className="w-3.5 h-3.5" />
                                    <span>رد</span>
                                  </button>
                                </>
                              )}
                              {p.status === 'approved' && (
                                <span className="text-[11px] text-emerald-400 font-bold">فعال است</span>
                              )}
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

            </div>
          )}

        </div>

      </div>

      {/* Add Product Modal */}
      {showAddProductModal && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-slate-900 rounded-3xl p-6 max-w-md w-full border border-slate-800 shadow-2xl space-y-4 animate-in zoom-in-95 duration-150">
            <h3 className="text-base font-black text-slate-100">افزودن خدمت یا محصول به ویترین</h3>
            
            <form onSubmit={handleAddProduct} className="space-y-3 text-xs">
              <div>
                <label className="block font-bold text-slate-300 mb-1">عنوان کالا یا خدمت</label>
                <input
                  type="text"
                  value={newProdTitle}
                  onChange={(e) => setNewProdTitle(e.target.value)}
                  placeholder="مثال: سرامیک ۵ لایه بدنه"
                  required
                  className="w-full bg-slate-800/90 border border-slate-700 rounded-xl p-2.5 text-xs text-slate-100 placeholder:text-slate-500 focus:outline-none focus:border-cyan-500"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-300 mb-1">قیمت مصوب (تومان)</label>
                <input
                  type="number"
                  value={newProdPrice}
                  onChange={(e) => setNewProdPrice(e.target.value)}
                  placeholder="مثال: 4500000"
                  className="w-full bg-slate-800/90 border border-slate-700 rounded-xl p-2.5 text-xs text-slate-100 placeholder:text-slate-500 focus:outline-none focus:border-cyan-500"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-300 mb-1">توضیحات تکمیلی و مشخصات</label>
                <textarea
                  rows={3}
                  value={newProdDesc}
                  onChange={(e) => setNewProdDesc(e.target.value)}
                  placeholder="ویژگی‌ها، متریال مصرفی و شرایط گارانتی..."
                  className="w-full bg-slate-800/90 border border-slate-700 rounded-xl p-2.5 text-xs text-slate-100 placeholder:text-slate-500 focus:outline-none focus:border-cyan-500"
                />
              </div>

              <div className="flex items-center gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setShowAddProductModal(false)}
                  className="flex-1 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 font-bold text-xs transition cursor-pointer"
                >
                  انصراف
                </button>
                <button
                  type="submit"
                  className="flex-1 py-2.5 rounded-xl bg-gradient-to-r from-cyan-600 to-indigo-600 hover:from-cyan-500 hover:to-indigo-500 text-white font-bold text-xs shadow-lg shadow-cyan-500/20 transition cursor-pointer"
                >
                  افزودن به ویترین
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};
