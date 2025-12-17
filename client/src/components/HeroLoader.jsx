import React from 'react'

const HeroLoader = () => {
  return (
    <div className="h-screen w-full flex flex-col items-center justify-center bg-gradient-to-br from-black via-[#0f172a] to-black text-white relative overflow-hidden">

      {/* Film reel animation */}
      <div className="relative mb-6">
        <div className="w-20 h-20 rounded-full border-4 border-gray-700 animate-spin border-t-blue-500"></div>
      </div>

      {/* MovieMate title shimmer */}
      <h1 className="text-4xl md:text-6xl font-bold tracking-widest relative">
        <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-white to-blue-400 animate-pulse">
          MovieMate
        </span>
      </h1>

      {/* Tagline */}
      <p className="mt-3 text-gray-400 text-sm tracking-wide">
        Booking your cinematic experience...
      </p>

      {/* Floating ticket dots */}
      <div className="absolute bottom-20 flex gap-2">
        <span className="w-3 h-3 bg-blue-500 rounded-full animate-bounce [animation-delay:0ms]"></span>
        <span className="w-3 h-3 bg-blue-500 rounded-full animate-bounce [animation-delay:150ms]"></span>
        <span className="w-3 h-3 bg-blue-500 rounded-full animate-bounce [animation-delay:300ms]"></span>
      </div>
    </div>
  )
}

export default HeroLoader
