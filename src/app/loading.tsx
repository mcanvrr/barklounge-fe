// Ana sayfa için full-screen loading
export default function Loading() {
  return (
    <div className='fixed inset-0 z-50 flex items-center justify-center bg-gradient-to-br from-navy-900 via-navy-800 to-navy-900'>
      {/* Animated Background */}
      <div className='absolute inset-0 overflow-hidden'>
        <div className='absolute top-1/4 left-1/4 w-96 h-96 bg-orange-500/20 rounded-full blur-3xl animate-pulse' />
        <div
          className='absolute bottom-1/4 right-1/4 w-96 h-96 bg-pink-500/20 rounded-full blur-3xl animate-pulse'
          style={{ animationDelay: '1s' }}
        />
        <div
          className='absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-purple-500/10 rounded-full blur-3xl animate-pulse'
          style={{ animationDelay: '2s' }}
        />
      </div>

      {/* Loading Content */}
      <div className='relative z-10 text-center space-y-8 px-4'>
        {/* Logo/Brand */}
        <div className='mb-8'>
          <div className='inline-flex items-center justify-center w-20 h-20 bg-white/10 backdrop-blur-lg rounded-2xl border border-white/20 mb-4'>
            <span className='text-4xl'>🐾</span>
          </div>
          <h1 className='text-3xl sm:text-4xl lg:text-5xl font-bold text-white'>
            Bark<span className='text-orange-400'>&</span>Lounge
          </h1>
        </div>

        {/* Animated Spinner */}
        <div className='relative w-24 h-24 mx-auto'>
          {/* Outer Ring */}
          <div className='absolute inset-0 border-4 border-white/20 rounded-full' />
          {/* Spinning Ring */}
          <div className='absolute inset-0 border-4 border-transparent border-t-orange-400 border-r-orange-400 rounded-full animate-spin' />
          {/* Inner Dot */}
          <div className='absolute inset-0 flex items-center justify-center'>
            <div className='w-3 h-3 bg-orange-400 rounded-full animate-pulse' />
          </div>
        </div>

        {/* Loading Text */}
        <div className='space-y-3'>
          <p className='text-xl font-semibold text-white animate-pulse'>
            Yükleniyor...
          </p>
          <p className='text-sm text-white/60 max-w-md mx-auto'>
            En iyi hizmeti sunmak için hazırlanıyoruz
          </p>
        </div>

        {/* Loading Progress Dots */}
        <div className='flex items-center justify-center gap-2'>
          {[0, 1, 2].map(i => (
            <div
              key={i}
              className='w-2 h-2 bg-orange-400 rounded-full animate-bounce'
              style={{ animationDelay: `${i * 0.15}s` }}
            />
          ))}
        </div>
      </div>

      {/* Bottom Decoration */}
      <div className='absolute bottom-8 left-1/2 -translate-x-1/2 text-white/40 text-xs'>
        Bark&Lounge • Pet Kuaför & Otel
      </div>
    </div>
  );
}
