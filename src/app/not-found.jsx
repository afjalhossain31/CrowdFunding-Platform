import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4 relative overflow-hidden font-sans">
      
      {/* Background Decorative Blobs */}
      <div className="absolute top-[-10%] left-[-10%] w-96 h-96 bg-blue-300 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-pulse"></div>
      <div className="absolute top-[20%] right-[-10%] w-96 h-96 bg-purple-300 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-pulse" style={{ animationDelay: '2s' }}></div>
      <div className="absolute bottom-[-20%] left-[20%] w-96 h-96 bg-pink-300 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-pulse" style={{ animationDelay: '4s' }}></div>

      {/* Main Glassmorphism Card */}
      <div className="relative z-10 bg-white/70 backdrop-blur-xl border border-white p-8 md:p-14 rounded-3xl shadow-[0_20px_50px_rgba(8,_112,_184,_0.07)] max-w-2xl text-center w-full">
        
        {/* 404 Glowing Gradient Text */}
        <h1 className="text-[120px] md:text-[180px] leading-none font-black text-transparent bg-clip-text bg-gradient-to-br from-green-600 via-green-500 to-purple-600 drop-shadow-sm select-none">
          404
        </h1>

        <h2 className="text-3xl md:text-4xl font-extrabold text-gray-800 mt-2 mb-4 tracking-tight">
          Oops! You are lost.
        </h2>
        
        <p className="text-gray-500 mb-10 text-sm md:text-base max-w-md mx-auto leading-relaxed">
          The page you are looking for might have been removed, had its name changed, or is temporarily unavailable. Let's get you back on track!
        </p>
        
        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          
          {/* Back to Home Button */}
          <Link 
            href="/" 
            className="w-full sm:w-auto px-8 py-3.5 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-xl transition-all duration-300 shadow-[0_8px_20px_-6px_rgba(37,99,235,0.5)] hover:shadow-[0_12px_25px_-6px_rgba(37,99,235,0.6)] hover:-translate-y-1 flex items-center justify-center gap-2"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"></path>
            </svg>
            Back to Home
          </Link>

          {/* Explore Campaigns Button */}
          <Link 
            href="/explore-campaigns" 
            className="w-full sm:w-auto px-8 py-3.5 bg-white hover:bg-gray-50 text-gray-700 border border-gray-200 font-semibold rounded-xl transition-all duration-300 shadow-sm hover:shadow-md hover:-translate-y-1 flex items-center justify-center gap-2"
          >
            Explore Campaigns
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3"></path>
            </svg>
          </Link>
          
        </div>
      </div>
    </div>
  );
}