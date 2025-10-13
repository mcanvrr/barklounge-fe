import { api } from '../config';

// Types for customer reviews
export interface CustomerReview {
  id: string;
  name: string;
  rating: number; // 1-5 arası
  text: string;
  avatar?: string; // Emoji avatar
  review_date: string;
  order_index: number;
  created_at: string;
  updated_at: string;
}

export interface ReviewStats {
  id: string;
  average_rating: number;
  total_reviews: number;
  created_at: string;
  updated_at: string;
}

export class CustomerReviewsService {
  private static readonly endpoint = 'reviews';

  /**
   * Tüm aktif müşteri yorumlarını getir
   */
  static async getActiveReviews(): Promise<CustomerReview[]> {
    try {
      const response = await api.get<CustomerReview[]>(this.endpoint);
      return response.data;
    } catch (error) {
      console.error('Aktif müşteri yorumları getirilirken hata:', error);
      throw error;
    }
  }

  /**
   * Tüm müşteri yorumlarını getir (admin için)
   */
  static async getAllReviews(): Promise<CustomerReview[]> {
    try {
      const response = await api.get<CustomerReview[]>(`${this.endpoint}/all`);
      return response.data;
    } catch (error) {
      console.error('Tüm müşteri yorumları getirilirken hata:', error);
      throw error;
    }
  }

  /**
   * Yorum istatistiklerini getir
   */
  static async getReviewStats(): Promise<ReviewStats> {
    try {
      const response = await api.get<ReviewStats>('review-stats');
      return response.data;
    } catch (error) {
      console.error('Yorum istatistikleri getirilirken hata:', error);
      throw error;
    }
  }
}
