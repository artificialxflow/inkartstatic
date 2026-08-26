/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { UserRole, Business, SubscriptionPayment } from './types';
import { 
  CITIES_DATA, 
  CATEGORIES_DATA, 
  INITIAL_BUSINESSES, 
  INITIAL_PAYMENTS 
} from './mockData';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { LandingView } from './components/LandingView';
import { SearchDiscoveryView } from './components/SearchDiscoveryView';
import { BusinessDetailView } from './components/BusinessDetailView';
import { CardMakerView } from './components/CardMakerView';
import { SubscriptionView } from './components/SubscriptionView';
import { PanelDashboard } from './components/PanelDashboard';

export default function App() {
  const [activeView, setActiveView] = useState<string>('landing');
  const [currentRole, setCurrentRole] = useState<UserRole>('citizen');
  const [businesses, setBusinesses] = useState<Business[]>(INITIAL_BUSINESSES);
  const [selectedBusiness, setSelectedBusiness] = useState<Business | null>(INITIAL_BUSINESSES[0]);
  const [cardMakerBusiness, setCardMakerBusiness] = useState<Business | null>(INITIAL_BUSINESSES[0]);
  const [savedBusinessIds, setSavedBusinessIds] = useState<string[]>(['biz-1']);
  const [payments, setPayments] = useState<SubscriptionPayment[]>(INITIAL_PAYMENTS);

  // Search Filter Query
  const [searchParams, setSearchParams] = useState({
    cityId: '',
    categoryId: '',
    keyword: '',
    nearMe: false,
  });

  // Scroll to top on view changes
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [activeView]);

  // Handlers
  const handleRoleChange = (role: UserRole) => {
    setCurrentRole(role);
  };

  const handleNavigate = (view: string, businessId?: string) => {
    if (businessId) {
      const found = businesses.find(b => b.id === businessId);
      if (found) {
        setSelectedBusiness(found);
        setActiveView('detail');
        return;
      }
    }
    setActiveView(view);
  };

  const handleSelectBusiness = (business: Business) => {
    setSelectedBusiness(business);
    setActiveView('detail');
  };

  const handleSearchSubmit = (params: { cityId: string; categoryId: string; keyword: string; nearMe: boolean }) => {
    setSearchParams(params);
    setActiveView('search');
  };

  const handleNavigateToCardMaker = (business: Business) => {
    setCardMakerBusiness(business);
    setActiveView('card-maker');
  };

  const handleToggleSave = (businessId: string) => {
    setSavedBusinessIds(prev => 
      prev.includes(businessId) ? prev.filter(id => id !== businessId) : [...prev, businessId]
    );
  };

  const handleUpdateBusiness = (updated: Business) => {
    setBusinesses(prev => prev.map(b => b.id === updated.id ? updated : b));
    if (selectedBusiness?.id === updated.id) {
      setSelectedBusiness(updated);
    }
  };

  const handleUpdatePaymentStatus = (paymentId: string, status: 'approved' | 'rejected') => {
    setPayments(prev => prev.map(p => p.id === paymentId ? { ...p, status } : p));
  };

  const handlePaymentSubmitted = (payment: SubscriptionPayment) => {
    setPayments(prev => [payment, ...prev]);
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#0F172A] text-slate-100 antialiased font-sans">
      
      {/* Header with Navigation and Live Role Switcher */}
      <Header
        currentRole={currentRole}
        onRoleChange={handleRoleChange}
        activeView={activeView}
        onNavigate={handleNavigate}
        savedBusinessesCount={savedBusinessIds.length}
      />

      {/* Main Dynamic View Content */}
      <main className="flex-1">
        
        {/* 1. Landing View */}
        {activeView === 'landing' && (
          <LandingView
            businesses={businesses}
            cities={CITIES_DATA}
            categories={CATEGORIES_DATA}
            onSelectBusiness={handleSelectBusiness}
            onSearchSubmit={handleSearchSubmit}
            onNavigate={handleNavigate}
          />
        )}

        {/* 2. Search & Discovery View (نتایج جستجو در ۲ ستون) */}
        {activeView === 'search' && (
          <SearchDiscoveryView
            businesses={businesses}
            cities={CITIES_DATA}
            categories={CATEGORIES_DATA}
            initialCityId={searchParams.cityId}
            initialCategoryId={searchParams.categoryId}
            initialKeyword={searchParams.keyword}
            initialNearMe={searchParams.nearMe}
            onSelectBusiness={handleSelectBusiness}
            savedBusinessIds={savedBusinessIds}
            onToggleSave={handleToggleSave}
          />
        )}

        {/* 3. Business Detail & Showcase View (طرح معرفی و ویترین اختصاصی) */}
        {activeView === 'detail' && selectedBusiness && (
          <BusinessDetailView
            business={selectedBusiness}
            onBack={() => setActiveView('search')}
            onNavigateToCardMaker={handleNavigateToCardMaker}
            isSaved={savedBusinessIds.includes(selectedBusiness.id)}
            onToggleSave={handleToggleSave}
          />
        )}

        {/* 4. Card Maker Studio (کارت‌ساز هوشمند ۳ قالبه با QR) */}
        {activeView === 'card-maker' && (
          <CardMakerView
            business={cardMakerBusiness || selectedBusiness}
            onNavigateToBusiness={(id) => handleNavigate('detail', id)}
          />
        )}

        {/* 5. Subscriptions & Pricing View (پلن‌ها و تایید فیش) */}
        {activeView === 'pricing' && (
          <SubscriptionView
            onPaymentSubmitted={handlePaymentSubmitted}
          />
        )}

        {/* 6. Multi-Role Management Panel (پنل مدیریت یکپارچه) */}
        {activeView === 'panel' && (
          <PanelDashboard
            currentRole={currentRole}
            onRoleChange={handleRoleChange}
            businesses={businesses}
            onUpdateBusiness={handleUpdateBusiness}
            payments={payments}
            onUpdatePaymentStatus={handleUpdatePaymentStatus}
            onSelectBusiness={handleSelectBusiness}
            savedBusinessIds={savedBusinessIds}
            onToggleSave={handleToggleSave}
            onNavigate={handleNavigate}
          />
        )}

      </main>

      {/* Global Persian Footer */}
      <Footer onNavigate={handleNavigate} />

    </div>
  );
}
