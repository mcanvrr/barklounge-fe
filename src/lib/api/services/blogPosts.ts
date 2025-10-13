import { api } from '../config';

// Types for blog posts
export interface BlogPost {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  cover_image_url: string;
  author: string;
  tags?: string[];
  read_time?: number;
  is_published: boolean;
  is_featured: boolean;
  view_count: number;
  order_index: number;
  created_at: string;
  updated_at: string;
}

export class BlogPostsService {
  private static readonly endpoint = 'blog';

  /**
   * Yayınlanmış blog yazılarını getir
   */
  static async getPublishedPosts(): Promise<BlogPost[]> {
    try {
      const response = await api.get<BlogPost[]>(this.endpoint);
      return response.data;
    } catch (error) {
      console.error('Yayınlanmış blog yazıları getirilirken hata:', error);
      throw error;
    }
  }

  /**
   * Öne çıkan blog yazılarını getir
   */
  static async getFeaturedPosts(): Promise<BlogPost[]> {
    try {
      const response = await api.get<BlogPost[]>(`${this.endpoint}/featured`);
      return response.data;
    } catch (error) {
      console.error('Öne çıkan blog yazıları getirilirken hata:', error);
      throw error;
    }
  }

  /**
   * Slug ile blog yazısı getir
   */
  static async getPostBySlug(slug: string): Promise<BlogPost> {
    try {
      const response = await api.get<BlogPost>(`${this.endpoint}/slug/${slug}`);
      return response.data;
    } catch (error) {
      console.error('Blog yazısı getirilirken hata:', error);
      throw error;
    }
  }

  /**
   * ID ile blog yazısı getir
   */
  static async getPostById(id: string): Promise<BlogPost> {
    try {
      const response = await api.get<BlogPost>(`${this.endpoint}/${id}`);
      return response.data;
    } catch (error) {
      console.error('Blog yazısı getirilirken hata:', error);
      throw error;
    }
  }
}
