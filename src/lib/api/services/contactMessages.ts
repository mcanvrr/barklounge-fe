import { api } from '../config';

// Types for contact messages
export interface ContactMessage {
  name: string;
  email: string;
  phone?: string;
  pet_type?: 'dog' | 'cat';
  subject: string;
  message: string;
}

export interface ContactMessageResponse {
  id: string;
  name: string;
  email: string;
  phone?: string;
  pet_type?: 'dog' | 'cat';
  subject: string;
  message: string;
  created_at: string;
  updated_at: string;
}

export class ContactMessagesService {
  private static readonly endpoint = 'contact';

  /**
   * İletişim mesajı gönder
   */
  static async sendContactMessage(
    contactData: ContactMessage
  ): Promise<ContactMessageResponse> {
    try {
      const response = await api.post<ContactMessageResponse>(
        this.endpoint,
        contactData
      );
      return response.data;
    } catch (error) {
      console.error('İletişim mesajı gönderilirken hata:', error);
      throw error;
    }
  }

  /**
   * Tüm iletişim mesajlarını getir (admin için)
   */
  static async getAllContactMessages(): Promise<ContactMessageResponse[]> {
    try {
      const response = await api.get<ContactMessageResponse[]>(
        `${this.endpoint}/all`
      );
      return response.data;
    } catch (error) {
      console.error('İletişim mesajları getirilirken hata:', error);
      throw error;
    }
  }
}
