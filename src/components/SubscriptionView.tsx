import React, { useState } from 'react';
import { SubscriptionPlan, SubscriptionPayment } from '../types';
import { SUBSCRIPTION_PLANS_DATA, INITIAL_PAYMENTS } from '../mockData';
import { 
  Crown, 
  CheckCircle2, 
  ShieldCheck, 
  UploadCloud, 
  Calendar, 
  Clock, 
  AlertCircle, 
  FileText, 
  CreditCard,
  Building2,
  Sparkles
} from 'lucide-react';

interface SubscriptionViewProps {
  onPaymentSubmitted?: (payment: SubscriptionPayment) => void;
}

export const SubscriptionView: React.FC<SubscriptionViewProps> = ({
  onPaymentSubmitted,
}) => {
  const [selectedPlanId, setSelectedPlanId] = useState<string>('plan-silver');
  const [payments, setPayments] = useState<SubscriptionPayment[]>(INITIAL_PAYMENTS);
  
  // Payment Form States
  const [businessName, setBusinessName] = useState('کلینیک دندان‌پزشکی دکتر نیلوفر کیانی');
  const [trackingCode, setTrackingCode] = useState('');
  const [bankName, setBankName] = useState('بانک ملت');
  const [isSuccess, setIsSuccess] = useState(false);

  const activePlan = SUBSCRIPTION_PLANS_DATA.find(p => p.id === selectedPlanId) || SUBSCRIPTION_PLANS_DATA[2];

  const handleReceiptSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!trackingCode.trim()) return;

    const newPayment: SubscriptionPayment = {
      id: `pay-${Date.now()}`,
      businessId: 'biz-current',
      businessTitle: businessName,
      planId: activePlan.id,
      planTitle: activePlan.title,
      amount: activePlan.price,
      trackingCode: trackingCode.trim(),
      bankName: bankName,
      receiptImage: 'https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?w=600&auto=format&fit=crop&q=80',
      date: '۱۴۰۴/۰۲/۲۶',
      status: 'pending',
      adminNote: 'رسید در انتظار تایید واحد مالی'
    };

    setPayments([newPayment, ...payments]);
    if (onPaymentSubmitted) {
      onPaymentSubmitted(newPayment);
    }

    setTrackingCode('');
    setIsSuccess(true);
    setTimeout(() => setIsSuccess(false), 5000);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-12">
      
      {/* Header Banner */}
      <div className="text-center max-w-3xl mx-auto space-y-3">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-cyan-950/80 text-cyan-300 text-xs font-bold border border-cyan-800/60">
          <Crown className="w-3.5 h-3.5 text-amber-400 fill-current" />
          <span>پلن‌ها و تعرفه‌های اشتراک سامانه اینکارت</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-black text-slate-100">
          اشتراک هوشمند برای رشد و دیده‌شدن کسب‌وکار شما
        </h1>
        <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
          پلن مورد نظر خود را انتخاب کرده، فیش واریزی را ثبت کنید تا پس از بررسی مدیر، دسترسی‌های اختصاصی فعال گردد.
        </p>
      </div>

      {/* Subscription Active Reminder Widget */}
      <div className="bg-gradient-to-r from-slate-900 via-indigo-950/80 to-slate-900 text-white rounded-3xl p-6 sm:p-8 border border-slate-800 shadow-xl flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="flex items-center gap-4">
          <div className="w-14 h-14 rounded-2xl bg-amber-500/20 border border-amber-500/30 text-amber-400 flex items-center justify-center font-bold shrink-0">
            <Crown className="w-7 h-7 fill-current" />
          </div>
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="text-sm font-bold text-slate-200">وضعیت اشتراک فعلی شما:</span>
              <span className="px-2.5 py-0.5 rounded-full bg-emerald-500 text-slate-950 text-xs font-black">
                فعال — پلن نقره‌ای
              </span>
            </div>
            <p className="text-xs text-slate-400">
              تاریخ شروع: ۱۴۰۴/۰۲/۱۰ — تاریخ پایان خودکار: ۱۴۰۴/۰۸/۱۰
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3 w-full md:w-auto justify-end">
          <div className="bg-white/10 backdrop-blur px-4 py-2 rounded-xl text-center border border-white/10">
            <span className="text-[10px] text-slate-300 block">مهلت باقیمانده تا تمدید:</span>
            <span className="text-sm font-black text-amber-400">۱۶۴ روز دیگر</span>
          </div>
        </div>
      </div>

      {/* Pricing Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {SUBSCRIPTION_PLANS_DATA.map((plan) => {
          const isSelected = plan.id === selectedPlanId;
          return (
            <div
              key={plan.id}
              onClick={() => setSelectedPlanId(plan.id)}
              className={`bg-slate-900/90 rounded-3xl p-6 border flex flex-col justify-between space-y-6 transition-all cursor-pointer relative ${
                isSelected
                  ? 'border-cyan-500 shadow-xl shadow-cyan-500/10 ring-2 ring-cyan-500/20'
                  : 'border-slate-800 hover:border-slate-700 shadow-xs'
              }`}
            >
              {plan.badge && (
                <div className="absolute -top-3 right-6 bg-gradient-to-r from-cyan-600 to-indigo-600 text-white text-[10px] font-black px-3 py-1 rounded-full shadow-md">
                  {plan.badge}
                </div>
              )}

              <div className="space-y-4">
                <div>
                  <h3 className="text-lg font-black text-slate-100">{plan.title}</h3>
                  <span className="text-xs text-slate-400 font-medium mt-0.5 block">
                    مدت اعتبار: {plan.durationMonths} ماه
                  </span>
                </div>

                <div className="py-2 border-y border-slate-800">
                  <div className="flex items-baseline gap-1">
                    <span className="text-2xl font-black text-slate-100">
                      {plan.price === 0 ? 'رایگان' : (plan.price / 1000000).toLocaleString('fa-IR')}
                    </span>
                    {plan.price > 0 && <span className="text-xs font-bold text-slate-400">میلیون تومان</span>}
                  </div>
                </div>

                <ul className="space-y-2.5 text-xs text-slate-300">
                  {plan.features.map((feat, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                      <span>{feat}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <button
                type="button"
                className={`w-full py-2.5 rounded-xl font-bold text-xs transition cursor-pointer ${
                  isSelected
                    ? 'bg-gradient-to-r from-cyan-600 to-indigo-600 text-white shadow-md shadow-cyan-500/20'
                    : 'bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700'
                }`}
              >
                {isSelected ? 'پلن انتخاب شده' : 'انتخاب این پلن'}
              </button>
            </div>
          );
        })}
      </div>

      {/* Payment Receipt Upload Simulator (فرم ثبت رسید پرداخت) */}
      <div className="bg-slate-900/90 rounded-3xl p-6 sm:p-8 border border-slate-800 shadow-xl shadow-cyan-950/20 space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800 pb-4">
          <div>
            <h2 className="text-lg font-black text-slate-100 flex items-center gap-2">
              <UploadCloud className="w-5 h-5 text-cyan-400" />
              <span>فرم ثبت فیش واریزی و استعلام پرداخت</span>
            </h2>
            <p className="text-xs text-slate-400 mt-1">
              پلن فعال انتخابی: <span className="font-bold text-cyan-400">{activePlan.title}</span> (مبلغ: {activePlan.price.toLocaleString('fa-IR')} تومان)
            </p>
          </div>

          <div className="bg-slate-800/90 px-3.5 py-2 rounded-xl border border-slate-700 text-xs text-slate-300">
            <span>شماره کارت واریز: </span>
            <span className="font-mono font-bold text-cyan-400" dir="ltr">6037-9975-1234-5678</span>
          </div>
        </div>

        {isSuccess && (
          <div className="p-4 rounded-2xl bg-emerald-950/80 text-emerald-300 border border-emerald-800/60 text-xs font-bold flex items-center gap-3">
            <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
            <span>رسید پرداخت با موفقیت ثبت شد و به زودی توسط مدیریت تایید خواهد گردید.</span>
          </div>
        )}

        <form onSubmit={handleReceiptSubmit} className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
          
          <div>
            <label className="block font-bold text-slate-300 mb-1">نام کسب‌وکار</label>
            <input
              type="text"
              value={businessName}
              onChange={(e) => setBusinessName(e.target.value)}
              required
              className="w-full bg-slate-800/90 border border-slate-700 rounded-xl p-2.5 text-xs text-slate-100 placeholder:text-slate-500 focus:outline-none focus:border-cyan-500"
            />
          </div>

          <div>
            <label className="block font-bold text-slate-300 mb-1">کد پیگیری / شماره ارجاع بانکی</label>
            <input
              type="text"
              value={trackingCode}
              onChange={(e) => setTrackingCode(e.target.value)}
              placeholder="مثال: TRK-99882211"
              required
              className="w-full bg-slate-800/90 border border-slate-700 rounded-xl p-2.5 text-xs text-slate-100 placeholder:text-slate-500 focus:outline-none focus:border-cyan-500 font-mono"
            />
          </div>

          <div>
            <label className="block font-bold text-slate-300 mb-1">بانک مبدأ / نحوه واریز</label>
            <select
              value={bankName}
              onChange={(e) => setBankName(e.target.value)}
              className="w-full bg-slate-800/90 border border-slate-700 rounded-xl p-2.5 text-xs text-slate-100 focus:outline-none focus:border-cyan-500 cursor-pointer"
            >
              <option value="بانک ملت" className="bg-slate-800 text-slate-100">بانک ملت (شبا / پایا)</option>
              <option value="بانک سامان" className="bg-slate-800 text-slate-100">بانک سامان</option>
              <option value="بانک پاسارگاد" className="bg-slate-800 text-slate-100">بانک پاسارگاد</option>
              <option value="بانک ملی" className="bg-slate-800 text-slate-100">بانک ملی ایران</option>
              <option value="کارت به کارت" className="bg-slate-800 text-slate-100">کارت به کارت</option>
            </select>
          </div>

          <div className="sm:col-span-3 pt-2">
            <button
              type="submit"
              className="w-full py-3 rounded-xl bg-gradient-to-r from-cyan-600 to-indigo-600 hover:from-cyan-500 hover:to-indigo-500 text-white font-bold text-xs sm:text-sm shadow-lg shadow-cyan-500/20 transition flex items-center justify-center gap-2 cursor-pointer"
            >
              <UploadCloud className="w-4 h-4" />
              <span>ارسال فیش و فعال‌سازی اشتراک</span>
            </button>
          </div>

        </form>
      </div>

      {/* Payment History Table */}
      <div className="bg-slate-900/90 rounded-3xl p-6 border border-slate-800 shadow-xl shadow-cyan-950/20 space-y-4">
        <h3 className="text-base font-black text-slate-100 flex items-center gap-2">
          <FileText className="w-4 h-4 text-cyan-400" />
          <span>تاریخچه تراکنش‌ها و رسیدهای ثبت شده</span>
        </h3>

        <div className="overflow-x-auto">
          <table className="w-full text-right text-xs">
            <thead className="bg-slate-800/90 text-slate-400 border-b border-slate-700">
              <tr>
                <th className="p-3 font-bold">کسب‌وکار</th>
                <th className="p-3 font-bold">پلن</th>
                <th className="p-3 font-bold">مبلغ (تومان)</th>
                <th className="p-3 font-bold">کد پیگیری</th>
                <th className="p-3 font-bold">تاریخ ثبت</th>
                <th className="p-3 font-bold">وضعیت</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800">
              {payments.map((p) => (
                <tr key={p.id} className="hover:bg-slate-800/40 transition">
                  <td className="p-3 font-bold text-slate-200">{p.businessTitle}</td>
                  <td className="p-3 text-slate-400">{p.planTitle}</td>
                  <td className="p-3 font-bold text-slate-100">{p.amount.toLocaleString('fa-IR')}</td>
                  <td className="p-3 font-mono text-slate-400">{p.trackingCode}</td>
                  <td className="p-3 text-slate-400">{p.date}</td>
                  <td className="p-3">
                    {p.status === 'approved' ? (
                      <span className="px-2.5 py-1 rounded-lg bg-emerald-950/80 text-emerald-400 font-bold text-[11px] border border-emerald-800/60">
                        تایید شده (فعال)
                      </span>
                    ) : p.status === 'pending' ? (
                      <span className="px-2.5 py-1 rounded-lg bg-amber-950/80 text-amber-400 font-bold text-[11px] border border-amber-800/60">
                        در انتظار بررسی
                      </span>
                    ) : (
                      <span className="px-2.5 py-1 rounded-lg bg-red-950/80 text-red-400 font-bold text-[11px] border border-red-800/60">
                        رد شده
                      </span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
};
