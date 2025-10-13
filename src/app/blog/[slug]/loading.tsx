// Blog detay sayfası için skeleton loading
export default function BlogPostLoading() {
  return (
    <div className='min-h-screen bg-gradient-to-br from-orange-50 via-amber-50 to-pink-50'>
      {/* Header Skeleton */}
      <div className='h-20 sm:h-36 bg-white border-b border-gray-200' />

      {/* Content Skeleton */}
      <article className='container mx-auto px-4 sm:px-6 lg:px-8 py-12 max-w-4xl'>
        {/* Cover Image Skeleton */}
        <div className='relative w-full h-64 sm:h-96 lg:h-[500px] bg-gray-300 rounded-2xl mb-8 animate-pulse overflow-hidden'>
          <div className='absolute inset-0 bg-gradient-to-r from-gray-300 via-gray-200 to-gray-300 animate-shimmer' />
        </div>

        {/* Title Skeleton */}
        <div className='space-y-4 mb-6'>
          <div className='h-10 bg-gray-300 rounded-lg w-3/4 animate-pulse' />
          <div className='h-10 bg-gray-300 rounded-lg w-1/2 animate-pulse' />
        </div>

        {/* Meta Info Skeleton */}
        <div className='flex items-center gap-6 mb-8 pb-8 border-b border-gray-200'>
          <div className='flex items-center gap-2'>
            <div className='w-10 h-10 bg-gray-300 rounded-full animate-pulse' />
            <div className='h-4 bg-gray-300 rounded w-24 animate-pulse' />
          </div>
          <div className='h-4 bg-gray-300 rounded w-32 animate-pulse' />
          <div className='h-4 bg-gray-300 rounded w-28 animate-pulse' />
        </div>

        {/* Content Skeleton */}
        <div className='prose prose-lg max-w-none space-y-4'>
          {[...Array(12)].map((_, i) => (
            <div
              key={i}
              className='h-4 bg-gray-200 rounded animate-pulse'
              style={{
                width: i % 4 === 0 ? '100%' : i % 3 === 0 ? '95%' : '90%',
                animationDelay: `${i * 0.05}s`,
              }}
            />
          ))}
        </div>

        {/* Tags Skeleton */}
        <div className='mt-12 pt-8 border-t border-gray-200'>
          <div className='flex flex-wrap gap-2'>
            {[1, 2, 3, 4].map(i => (
              <div
                key={i}
                className='h-8 w-20 bg-gray-200 rounded-full animate-pulse'
                style={{ animationDelay: `${i * 0.1}s` }}
              />
            ))}
          </div>
        </div>

        {/* Loading Indicator */}
        <div className='fixed bottom-8 right-8 z-50'>
          <div className='bg-white rounded-full shadow-xl p-4 flex items-center gap-3 border border-gray-200'>
            <div className='animate-spin rounded-full h-6 w-6 border-2 border-gray-300 border-t-navy-600' />
            <span className='text-sm font-medium text-gray-700'>
              Makale yükleniyor...
            </span>
          </div>
        </div>
      </article>

      {/* Footer Skeleton */}
      <div className='h-64 bg-navy-900 mt-12' />
    </div>
  );
}
