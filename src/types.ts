export type UserRole = 'citizen' | 'business_owner' | 'card_designer' | 'admin';

export interface Category {
  id: string;
  title: string;
  icon: string;
  count: number;
  slug: string;
}

export interface City {
  id: string;
  name: string;
  province: string;
  popular?: boolean;
}

export interface ProductServiceItem {
  id: string;
  title: string;
  description: string;
  price?: number;
  priceFormatted?: string;
  image: string;
  categoryName?: string;
  isSpecial?: boolean;
}

export interface BusinessReview {
  id: string;
  userName: string;
  userAvatar?: string;
  rating: number;
  comment: string;
  date: string;
  reply?: string;
}

export interface Business {
  id: string;
  title: string;
  slug: string;
  managerName: string;
  category: string;
  categoryId: string;
  city: string;
  cityId: string;
  district: string;
  address: string;
  phone: string;
  mobile: string;
  whatsapp?: string;
  instagram?: string;
  telegram?: string;
  eitaa?: string;
  bale?: string;
  website?: string;
  rating: number;
  reviewsCount: number;
  viewsCount: number;
  isOpen: boolean;
  workingHours: string;
  bannerImage: string;
  logoImage: string;
  description: string;
  shortBio: string;
  establishedYear: number;
  
  // Declarations & Statuses (بر اساس اظهارات خود کسب‌وکار با برچسب شفاف)
  hasLicense: boolean;
  licenseNumber?: string;
  licenseUnionName?: string;
  isUnionMember: boolean;
  hasWarranty: boolean;
  warrantyTerms?: string;
  hasShowcase: boolean;
  isFeatured?: boolean;
  isVerifiedByAdmin: boolean;
  
  // Showcase Data
  products: ProductServiceItem[];
  galleryImages: string[];
  reviews: BusinessReview[];
  videoTeaserUrl?: string;
  
  // Card & Template Info
  selectedTemplateId: string;
  designerReferralCode?: string;
  
  // Location Mock
  coordinates: {
    lat: number;
    lng: number;
  };
  distanceKm?: number;
}

export interface SubscriptionPlan {
  id: string;
  title: string;
  durationMonths: number;
  price: number;
  features: string[];
  isPopular?: boolean;
  badge?: string;
}

export interface SubscriptionPayment {
  id: string;
  businessId: string;
  businessTitle: string;
  planId: string;
  planTitle: string;
  amount: number;
  trackingCode: string;
  bankName: string;
  receiptImage: string;
  date: string;
  status: 'pending' | 'approved' | 'rejected';
  startDate?: string;
  endDate?: string;
  adminNote?: string;
}

export interface CardTemplate {
  id: string;
  name: string;
  designerName: string;
  designerCode: string;
  designerAvatar: string;
  themeStyle: 'minimal' | 'luxury' | 'modern' | 'corporate';
  bgGradient: string;
  accentColor: string;
  textColor: string;
  previewImage: string;
  usesCount: number;
  rating: number;
}
