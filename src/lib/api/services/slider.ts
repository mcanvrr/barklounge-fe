import { api } from '../config';

// Types for slider
export interface SliderItem {
  id: string;
  title: string;
  subtitle?: string;
  description?: string;
  image_url: string;
  order_index: number;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

export class SliderService {
  private static readonly endpoint = 'slider';

  /**
   * Tüm aktif slider öğelerini getir
   */
  static async getActiveSlides(): Promise<SliderItem[]> {
    try {
      const response = await api.get<SliderItem[]>(this.endpoint);
      return response.data.filter(slide => slide.is_active);
    } catch (error) {
      console.error('Aktif slider öğeleri getirilirken hata:', error);
      throw error;
    }
  }

  /**
   * Tüm slider öğelerini getir (admin için)
   */
  static async getAllSlides(): Promise<SliderItem[]> {
    try {
      const response = await api.get<SliderItem[]>(`${this.endpoint}/all`);
      return response.data;
    } catch (error) {
      console.error('Tüm slider öğeleri getirilirken hata:', error);
      throw error;
    }
  }
}
