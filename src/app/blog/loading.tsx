// Blog sayfası için full-screen loading
export default function BlogLoading() {
  return (
    <div className='fixed inset-0 z-50 flex items-center justify-center bg-gradient-to-br from-orange-50 via-amber-50 to-pink-50'>
      {/* Animated Background */}
      <div className='absolute inset-0 overflow-hidden'>
        <div className='absolute top-1/4 left-1/4 w-80 h-80 bg-navy-500/10 rounded-full blur-3xl animate-pulse' />
        <div
          className='absolute bottom-1/4 right-1/4 w-80 h-80 bg-orange-500/10 rounded-full blur-3xl animate-pulse'
          style={{ animationDelay: '1s' }}
        />
        <div
          className='absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-pink-500/5 rounded-full blur-3xl animate-pulse'
          style={{ animationDelay: '2s' }}
        />
      </div>

      {/* Loading Content */}
      <div className='relative z-10 text-center space-y-8 px-4'>
        {/* Blog Icon */}
        <div className='mb-8'>
          <div className='inline-flex items-center justify-center w-20 h-20 bg-white backdrop-blur-lg rounded-2xl border border-gray-200 shadow-xl mb-4'>
            <span className='text-4xl'>📝</span>
          </div>
          <h1 className='text-3xl sm:text-4xl lg:text-5xl font-bold text-navy-900 mb-2'>
            Blog
          </h1>
          <p className='text-navy-600 text-sm'>Bark&Lounge</p>
        </div>

        {/* Animated Spinner */}
        <div className='relative w-24 h-24 mx-auto'>
          {/* Outer Ring */}
          <div className='absolute inset-0 border-4 border-gray-200 rounded-full' />
          {/* Spinning Ring */}
          <div className='absolute inset-0 border-4 border-transparent border-t-navy-600 border-r-navy-600 rounded-full animate-spin' />
          {/* Inner Dot */}
          <div className='absolute inset-0 flex items-center justify-center'>
            <div className='w-3 h-3 bg-navy-600 rounded-full animate-pulse' />
          </div>
        </div>

        {/* Loading Text */}
        <div className='space-y-3'>
          <p className='text-xl font-semibold text-navy-900 animate-pulse'>
            Blog Yazıları Yükleniyor...
          </p>
          <p className='text-sm text-gray-600 max-w-md mx-auto'>
            Pet bakımı hakkında en güncel içerikler hazırlanıyor
          </p>
        </div>

        {/* Loading Progress Dots */}
        <div className='flex items-center justify-center gap-2'>
          {[0, 1, 2].map(i => (
            <div
              key={i}
              className='w-2 h-2 bg-navy-600 rounded-full animate-bounce'
              style={{ animationDelay: `${i * 0.15}s` }}
            />
          ))}
        </div>

        {/* Feature List */}
        <div className='grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-2xl mx-auto mt-12'>
          {[
            { icon: '🐕', text: 'Pet Bakımı' },
            { icon: '✂️', text: 'Grooming İpuçları' },
            { icon: '🏠', text: 'Pet Otel' },
          ].map((item, i) => (
            <div
              key={i}
              className='flex items-center gap-3 p-4 bg-white/80 backdrop-blur-sm rounded-xl border border-gray-200 shadow-sm animate-pulse'
              style={{ animationDelay: `${i * 0.2}s` }}
            >
              <span className='text-2xl'>{item.icon}</span>
              <span className='text-sm font-medium text-gray-700'>
                {item.text}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom Decoration */}
      <div className='absolute bottom-8 left-1/2 -translate-x-1/2 text-gray-400 text-xs'>
        Bark&Lounge Blog • Pet Bakımı Rehberi
      </div>
    </div>
  );
}
