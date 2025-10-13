import * as SEOComponents from './SEO';

const SEONamespace = {
  BlogStructuredData: SEOComponents.BlogStructuredData,
  HomeStructuredData: SEOComponents.HomeStructuredData,
  StructuredData: SEOComponents.StructuredData,
};

export { BlogStructuredData, HomeStructuredData, StructuredData } from './SEO';
export { SEONamespace as SEO };
