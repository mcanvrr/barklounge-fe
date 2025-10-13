// API Layer Exports
export * from './config';
export * from './services';

// Re-export all types and services for easy import
export {
  AppSettingsService,
  BlogPostsService,
  ContactMessagesService,
  CustomerReviewsService,
  GalleryService,
  ServicesService,
  SliderService,
} from './services';

// Export all types
export type {
  About,
  AboutContent,
  AppSettings,
  BlogTag,
  SeoSettings,
  ServicesSection,
} from './services/appSettings';

export type { BlogPost } from './services/blogPosts';

export type {
  ContactMessage,
  ContactMessageResponse,
} from './services/contactMessages';

export type { CustomerReview, ReviewStats } from './services/customerReviews';

export type { GalleryItem } from './services/gallery';

export type { ServiceItem } from './services/services';

export type { SliderItem } from './services/slider';
