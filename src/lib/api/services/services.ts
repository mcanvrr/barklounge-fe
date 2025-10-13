import { api } from '../config';

// Types for services
export interface ServiceItem {
  id: string;
  title: string;
  description: string;
  features?: string[];
  service_type: 'hotel' | 'grooming' | 'daycare';
  order_index: number;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

export class ServicesService {
  private static readonly endpoint = 'services';

  /**
   * Tüm aktif servisleri getir
   */
  static async getActiveServices(): Promise<ServiceItem[]> {
    try {
      const response = await api.get<ServiceItem[]>(this.endpoint);
      return response.data.filter(service => service.is_active);
    } catch (error) {
      console.error('Aktif servisler getirilirken hata:', error);
      throw error;
    }
  }

  /**
   * Tüm servisleri getir (admin için)
   */
  static async getAllServices(): Promise<ServiceItem[]> {
    try {
      const response = await api.get<ServiceItem[]>(`${this.endpoint}/all`);
      return response.data;
    } catch (error) {
      console.error('Tüm servisler getirilirken hata:', error);
      throw error;
    }
  }

  /**
   * Servis tipine göre servisleri getir
   */
  static async getServicesByType(type: 'hotel' | 'grooming' | 'daycare'): Promise<ServiceItem[]> {
    try {
      const services = await this.getActiveServices();
      return services.filter(service => service.service_type === type);
    } catch (error) {
      console.error('Servis tipine göre servisler getirilirken hata:', error);
      throw error;
    }
  }
}
