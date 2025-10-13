import { api } from '../config';

// Types for gallery
export interface GalleryItem {
  id: string;
  image_url: string;
  alt_text?: string;
  title?: string;
  order_index: number;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

export class GalleryService {
  private static readonly endpoint = 'gallery';

  /**
   * Tüm aktif galeri resimlerini getir
   */
  static async getActiveGalleryImages(): Promise<GalleryItem[]> {
    try {
      const response = await api.get<GalleryItem[]>(this.endpoint);
      return response.data.filter(item => item.is_active);
    } catch (error) {
      console.error('Aktif galeri resimleri getirilirken hata:', error);
      throw error;
    }
  }

  /**
   * Tüm galeri resimlerini getir (admin için)
   */
  static async getAllGalleryImages(): Promise<GalleryItem[]> {
    try {
      const response = await api.get<GalleryItem[]>(`${this.endpoint}/all`);
      return response.data;
    } catch (error) {
      console.error('Tüm galeri resimleri getirilirken hata:', error);
      throw error;
    }
  }
}
