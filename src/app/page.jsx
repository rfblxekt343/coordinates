'use client';
import Link from "next/link";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { setCurrentExplanation } from '../store/explanationsSlice'; // adjust path as needed
export default function Home() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [time, setTime] = useState(0);

  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({
        x: (e.clientX / window.innerWidth) * 100,
        y: (e.clientY / window.innerHeight) * 100,
      });
    };

    const timer = setInterval(() => {
      setTime(prev => prev + 1);
    }, 100);

    window.addEventListener('mousemove', handleMouseMove);
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      clearInterval(timer);
    };
  }, []);

 

  return (
    <div className="relative min-h-screen overflow-hidden bg-gradient-to-br from-slate-900 via-purple-900 to-indigo-900">
      {/* Animated background grid */}
      <div
        className="absolute inset-0 opacity-20"
        style={{
          backgroundImage: `linear-gradient(rgba(147, 51, 234, 0.4) 1px, transparent 1px),
                           linear-gradient(90deg, rgba(147, 51, 234, 0.4) 1px, transparent 1px)`,
          backgroundSize: '60px 60px',
          transform: `translate(${mousePosition.x * 0.05}px, ${mousePosition.y * 0.05}px)`,
          transition: 'transform 0.2s ease-out'
        }}
      />

      {/* Floating mathematical symbols */}
      <div className="absolute inset-0 pointer-events-none">
        {['×', '+', '=', '°', '∞', '∆', '∑', '√'].map((symbol, i) => (
          <div
            key={i}
            className="absolute text-purple-400 text-2xl font-bold opacity-30 animate-float"
            style={{
              left: `${10 + (i * 11) % 80}%`,
              top: `${20 + (i * 8) % 60}%`,
              animationDelay: `${i * 0.8}s`,
              animationDuration: `${4 + (i % 3)}s`
            }}
          >
            {symbol}
          </div>
        ))}
      </div>

      {/* Coordinate dots */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(12)].map((_, i) => (
          <div
            key={i}
            className="absolute"
            style={{
              left: `${15 + (i * 7) % 70}%`,
              top: `${25 + (i * 6) % 50}%`,
            }}
          >
            <div
              className="w-3 h-3 bg-gradient-to-r from-cyan-400 to-purple-500 rounded-full shadow-lg"
              style={{
                animation: `pulse ${2 + (i % 3)}s infinite`,
                animationDelay: `${i * 0.3}s`,
                transform: `scale(${0.8 + Math.sin(time * 0.1 + i) * 0.3})`
              }}
            />
            <div className="absolute -top-6 -left-4 text-xs text-cyan-300 font-mono opacity-70">
              ({i * 2}, {i * 3})
            </div>
          </div>
        ))}
      </div>

      {/* Main content */}
      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen px-6">

        {/* Mouse coordinates display */}
        <div className="absolute top-8 right-8 bg-black/30 backdrop-blur-sm rounded-lg px-4 py-2 border border-purple-500/30">
          <div className="text-cyan-400 text-sm font-mono">
            Position: ({Math.floor(mousePosition.x)}, {Math.floor(mousePosition.y)})
          </div>
        </div>

        {/* Title section */}
        <div className="text-center mb-16">
          <div className="relative inline-block mb-8">
            {/* Glowing border effect */}
            <div className="absolute inset-0 bg-gradient-to-r from-purple-600 via-pink-600 to-cyan-500 rounded-3xl blur-xl opacity-30 animate-pulse" />

            <div className="relative bg-black/40 backdrop-blur-sm rounded-3xl px-8 py-6 border border-purple-500/30">
              <h1 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 bg-clip-text text-transparent leading-tight">
                לומדת מד קואורדינטות
              </h1>
            </div>
          </div>

          {/* Subtitle */}
          <div className="flex items-center justify-center gap-4 text-gray-300">
            <div className="h-px w-16 bg-gradient-to-r from-transparent via-cyan-500 to-transparent" />
            <span className="text-lg font-light tracking-wider"></span>
            <div className="h-px w-16 bg-gradient-to-r from-transparent via-purple-500 to-transparent" />
          </div>
        </div>

        {/* Navigation buttons */}
        <div className="flex flex-col sm:flex-row gap-8">
          <Link href="/explanation" onClick={() => dispatch(setCurrentExplanation(1))}>
            <button className="w-64 text-center group relative overflow-hidden px-10 py-4 bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 text-white rounded-2xl font-bold text-lg transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-blue-500/25">
              {/* Button glow effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-blue-400 to-purple-400 opacity-0 group-hover:opacity-20 transition-opacity duration-300" />

              {/* Icon */}

              <div className="absolute left-4 top-1/2 transform -translate-y-1/2 opacity-70 group-hover:opacity-100 transition-opacity">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 18v-5.25m0 0a6.01 6.01 0 0 0 1.5-.189m-1.5.189a6.01 6.01 0 0 1-1.5-.189m3.75 7.478a12.06 12.06 0 0 1-4.5 0m3.75 2.383a14.406 14.406 0 0 1-3 0M14.25 18v-.192c0-.983.658-1.823 1.508-2.316a7.5 7.5 0 1 0-7.517 0c.85.493 1.509 1.333 1.509 2.316V18" />
                </svg>

              </div>

              <span className="relative pr-8 pl-6 text-center whitespace-nowrap">מעבר להסבר</span>

              {/* Hover arrow */}
              <div className="absolute right-4 top-1/2 transform -translate-y-1/2 translate-x-2 opacity-0 group-hover:translate-x-0 group-hover:opacity-100 transition-all duration-300"
             
              >
                ←
              </div>
            </button>
          </Link>

          <Link href="/practice">
            <button className=" w-64  group relative overflow-hidden px-10 py-4 bg-gradient-to-r from-emerald-600 via-teal-600 to-cyan-600 text-white rounded-2xl font-bold text-lg transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-emerald-500/25">
              {/* Button glow effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-emerald-400 to-cyan-400 opacity-0 group-hover:opacity-20 transition-opacity duration-300" />

              {/* Icon */}
              <div className="absolute left-4 top-1/2 transform -translate-y-1/2 opacity-70 group-hover:opacity-100 transition-opacity">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.042A8.967 8.967 0 0 0 6 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 0 1 6 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 0 1 6-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0 0 18 18a8.967 8.967 0 0 0-6 2.292m0-14.25v14.25" />
                </svg>

              </div>

              <span className="relative pr-8 pl-6 text-center" >מעבר לתרגול</span>

              {/* Hover arrow */}
              <div className="absolute right-4 top-1/2 transform -translate-y-1/2 translate-x-2 opacity-0 group-hover:translate-x-0 group-hover:opacity-100 transition-all duration-300">
                ←
              </div>
            </button>
          </Link>
        </div>


      </div>

      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-20px) rotate(180deg); }
        }
        
        .animate-float {
          animation: float 6s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
}