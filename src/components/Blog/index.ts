import * as BlogComponents from './Blog';

const BlogNamespace = {
  BlogCard: BlogComponents.BlogCard,
  BlogHeader: BlogComponents.BlogHeader,
  BlogSidebar: BlogComponents.BlogSidebar,
  FeaturedPost: BlogComponents.FeaturedPost,
  PostsGrid: BlogComponents.PostsGrid,
};

export {
  BlogCard,
  BlogHeader,
  BlogSidebar,
  FeaturedPost,
  PostsGrid,
} from './Blog';
export { BlogNamespace as Blog };
