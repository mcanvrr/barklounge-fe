import { api } from '../config';

// Types for app settings
export interface AppSettings {
  id: string;
  email_address: string;
  phone_number: string;
  location: string;
  footer_about_text?: string;
  working_hours?: string;
  facebook_url?: string;
  instagram_url?: string;
  tiktok_url?: string;
  whatsapp_url?: string;
  footer_copyright_text?: string;
  created_at: string;
  updated_at: string;
}

// Types for about
export interface About {
  id: string;
  about_description: string;
  pet_hotel_customers: number;
  pet_grooming_customers: number;
  created_at: string;
  updated_at: string;
}

// Types for about content
export interface AboutContent {
  id: string;
  description: string;
  image_url: string;
  alt_text?: string;
  created_at: string;
  updated_at: string;
}

// Types for SEO settings
export interface SeoSettings {
  id: string;
  title: string;
  description: string;
  keywords?: string;
  og_image_url?: string;
  og_title?: string;
  og_description?: string;
  twitter_card?: string;
  canonical_url?: string;
  created_at: string;
  updated_at: string;
}

// Types for services section
export interface ServicesSection {
  id: string;
  heading: string;
  description?: string;
  created_at: string;
  updated_at: string;
}

// Types for blog tags
export interface BlogTag {
  id: string;
  name: string;
  description?: string;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

export class AppSettingsService {
  private static readonly endpoint = 'app-settings';

  /**
   * Uygulama ayarlarını getir
   */
  static async getAppSettings(): Promise<AppSettings> {
    try {
      const response = await api.get<AppSettings>(this.endpoint);
      return response.data;
    } catch (error) {
      console.error('Uygulama ayarları getirilirken hata:', error);
      throw error;
    }
  }

  /**
   * Hakkımızda bilgilerini getir
   */
  static async getAbout(): Promise<About> {
    try {
      const response = await api.get<About>('about');
      return response.data;
    } catch (error) {
      console.error('Hakkımızda bilgileri getirilirken hata:', error);
      throw error;
    }
  }

  /**
   * Hakkımızda içerik bilgilerini getir
   */
  static async getAboutContent(): Promise<AboutContent> {
    try {
      const response = await api.get<AboutContent>('about-content');
      return response.data;
    } catch (error) {
      console.error('Hakkımızda içerik bilgileri getirilirken hata:', error);
      throw error;
    }
  }

  /**
   * SEO ayarlarını getir
   */
  static async getSeoSettings(): Promise<SeoSettings> {
    try {
      const response = await api.get<SeoSettings>('seo');
      return response.data;
    } catch (error) {
      console.error('SEO ayarları getirilirken hata:', error);
      throw error;
    }
  }

  /**
   * Hizmetler bölümü bilgilerini getir
   */
  static async getServicesSection(): Promise<ServicesSection> {
    try {
      const response = await api.get<ServicesSection>('services-section');
      return response.data;
    } catch (error) {
      console.error('Hizmetler bölümü bilgileri getirilirken hata:', error);
      throw error;
    }
  }

  /**
   * Aktif blog etiketlerini getir
   */
  static async getActiveBlogTags(): Promise<BlogTag[]> {
    try {
      const response = await api.get<BlogTag[]>('blog-tags');
      return response.data;
    } catch (error) {
      console.error('Aktif blog etiketleri getirilirken hata:', error);
      throw error;
    }
  }
}
