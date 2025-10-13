// Import components for dot notation
import * as BlogComponents from './Blog';
import * as HomeSliderComponents from './HomeSlider/HomeSlider';
import * as SEOComponents from './SEO';

// Create dot notation objects
const Blog = {
  BlogCard: BlogComponents.BlogCard,
  BlogHeader: BlogComponents.BlogHeader,
  BlogSidebar: BlogComponents.BlogSidebar,
  FeaturedPost: BlogComponents.FeaturedPost,
  PostsGrid: BlogComponents.PostsGrid,
};

const HomeSlider = {
  default: HomeSliderComponents.default,
  SlideContent: HomeSliderComponents.SlideContent,
};

const SEO = {
  BlogStructuredData: SEOComponents.BlogStructuredData,
  HomeStructuredData: SEOComponents.HomeStructuredData,
  StructuredData: SEOComponents.StructuredData,
};

// Export dot notation objects
export { Blog, HomeSlider, SEO };

// Export individual components
export * from './AboutSection';
export * from './Blog';
export * from './Footer';
export * from './Header';
export * from './HomeSlider';
export * from './SEO';
export * from './ServicesSection';
