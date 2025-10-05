'use client';

import { useState } from 'react';
import BackAndForthButtons from '../ui/BackAndForthButtons';

export default function Explanation1() {
  return (
    <div className="max-w-2xl mx-auto px-4">
      <h1 className="text-xl sm:text-2xl md:text-3xl font-bold mb-4 sm:mb-6 text-center bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
        עמוד הסבר - רשת UTM
      </h1>

      <div className="bg-black/40 backdrop-blur-sm border border-purple-500/30 p-3 sm:p-4 md:p-6 rounded-xl sm:rounded-2xl shadow-lg mb-4 sm:mb-6">
        <p className="text-sm sm:text-base md:text-lg leading-relaxed text-gray-200 mb-3 sm:mb-4">
          רשת קווים (UTM) אשר מאפשרת להעביר את נקודת המבט על כדור הארץ מתלת מימד לדו מימד
          ומחלקת את המפה העולמית לריבועים שווים. בעזרתה ניתן לאתר במדויק נקודות על המפה,
          לאמוד מרחק ולמדוד כיוונים.
        </p>
        <p className="text-sm sm:text-base md:text-lg leading-relaxed text-gray-200">
          הרשת מורכבת מקווי אורך ורוחב לכל קו מספר בעל 3 ספרות:
        </p>
        <ul className="mt-3 sm:mt-4 space-y-1.5 sm:space-y-2 text-sm sm:text-base md:text-lg text-cyan-300">
          <li><strong className="text-purple-400">קו רוחב</strong> - קווים אופקיים ממערב למזרח</li>
          <li><strong className="text-purple-400">קו אורך</strong> - קווים אנכיים (מדרום לצפון)</li>
        </ul>
      </div>

      {/* Interactive Grid Visualization */}
      <div className="bg-black/30 backdrop-blur-sm border border-purple-500/30 p-3 sm:p-4 md:p-6 rounded-xl sm:rounded-2xl shadow-lg mb-4 sm:mb-6">
        <h2 className="text-lg sm:text-xl md:text-2xl font-bold mb-3 sm:mb-4 text-center text-cyan-400">
          הדמיה של רשת UTM
        </h2>

        <div className="flex justify-center mb-3 sm:mb-4">
          <svg width="100%" height="250" viewBox="0 0 350 300" className="max-w-full h-auto border border-purple-500/30 rounded-lg">
            {/* Background */}
            <rect width="350" height="300" fill="rgba(30, 41, 59, 0.8)" />

            {/* Grid lines - Longitude (vertical) */}
            {Array.from({ length: 5 }, (_, i) => (
              <g key={`long-${i}`}>
                <line
                  x1={60 + i * 60}
                  y1={30}
                  x2={60 + i * 60}
                  y2={270}
                  stroke="#06b6d4"
                  strokeWidth="2"
                  strokeDasharray="4,4"
                />
                <text
                  x={60 + i * 60}
                  y={25}
                  textAnchor="middle"
                  fill="#67e8f9"
                  fontSize="12"
                  fontWeight="bold"
                >
                  {320 + i * 10}
                </text>
              </g>
            ))}

            {/* Grid lines - Latitude (horizontal) */}
            {Array.from({ length: 5 }, (_, i) => (
              <g key={`lat-${i}`}>
                <line
                  x1={60}
                  y1={60 + i * 50}
                  x2={280}
                  y2={60 + i * 50}
                  stroke="#a855f7"
                  strokeWidth="2"
                  strokeDasharray="4,4"
                />
                <text
                  x={40}
                  y={65 + i * 50}
                  textAnchor="middle"
                  fill="#c084fc"
                  fontSize="12"
                  fontWeight="bold"
                >
                  {650 - i * 10}
                </text>
              </g>
            ))}

            {/* Sample point */}
            <circle cx="180" cy="160" r="5" fill="#f472b6" stroke="#ec4899" strokeWidth="2" />
            <text x="230" y="135" fill="#f472b6" fontSize="11" fontWeight="bold">נקודה: 340, 630</text>

            {/* Labels */}
            <text x="160" y="290" textAnchor="middle" fill="#67e8f9" fontSize="14" fontWeight="bold">
              קווי אורך (צפון-דרום)
            </text>
            <text x="15" y="150" textAnchor="middle" fill="#c084fc" fontSize="14" fontWeight="bold"
              transform="rotate(-90 15 150)">
              קווי רוחב (מזרח-מערב)
            </text>
          </svg>
        </div>

        <div className="text-center text-gray-300 text-xs sm:text-sm">
          <p>דוגמה לרשת UTM עם קווי אורך (תכלת) וקווי רוחב (סגול)</p>
        </div>
      </div>

      {/* 3D to 2D Transformation Illustration */}
      <div className="bg-black/30 backdrop-blur-sm border border-purple-500/30 p-3 sm:p-4 md:p-6 rounded-xl sm:rounded-2xl shadow-lg mb-4 sm:mb-6">
        <h2 className="text-lg sm:text-xl md:text-2xl font-bold mb-3 sm:mb-4 text-center text-cyan-400">
          המרה מתלת מימד לדו מימד
        </h2>

        <div className="flex flex-col sm:flex-row justify-center items-center gap-4 sm:gap-6 md:gap-8">
          {/* 3D Globe */}
          <div className="text-center">
            <svg width="100" height="100" viewBox="0 0 120 120" className="w-20 h-20 sm:w-24 sm:h-24 md:w-30 md:h-30">
              <defs>
                <radialGradient id="globe" cx="0.3" cy="0.3">
                  <stop offset="0%" stopColor="#06b6d4" />
                  <stop offset="100%" stopColor="#7c3aed" />
                </radialGradient>
              </defs>
              <circle cx="60" cy="60" r="55" fill="url(#globe)" />

              {/* Longitude lines */}
              <ellipse cx="60" cy="60" rx="55" ry="55" fill="none" stroke="rgba(255,255,255,0.6)" strokeWidth="1" />
              <ellipse cx="60" cy="60" rx="40" ry="55" fill="none" stroke="rgba(255,255,255,0.6)" strokeWidth="1" />
              <ellipse cx="60" cy="60" rx="20" ry="55" fill="none" stroke="rgba(255,255,255,0.6)" strokeWidth="1" />

              {/* Latitude lines */}
              <ellipse cx="60" cy="60" rx="55" ry="40" fill="none" stroke="rgba(255,255,255,0.6)" strokeWidth="1" />
              <ellipse cx="60" cy="60" rx="55" ry="20" fill="none" stroke="rgba(255,255,255,0.6)" strokeWidth="1" />
              <line x1="5" y1="60" x2="115" y2="60" stroke="rgba(255,255,255,0.6)" strokeWidth="1" />
            </svg>
            <p className="mt-2 font-semibold text-gray-200 text-xs sm:text-sm">כדור הארץ (תלת מימד)</p>
          </div>

          {/* Arrow */}
          <div className="flex flex-col items-center rotate-90 sm:rotate-0">
            <svg width="40" height="20" viewBox="0 0 50 25" className="w-10 h-5 sm:w-12 sm:h-6">
              <path d="M5 12.5 L35 12.5 M30 8 L35 12.5 L30 17" stroke="#22d3ee" strokeWidth="2" fill="none" />
            </svg>
            <p className="text-emerald-400 font-semibold text-xs sm:text-sm">UTM</p>
          </div>

          {/* 2D Map */}
          <div className="text-center">
            <svg width="100" height="80" viewBox="0 0 120 100" className="w-20 h-16 sm:w-24 sm:h-20 md:w-30 md:h-25">
              <rect width="120" height="100" fill="rgba(30, 41, 59, 0.8)" stroke="#a855f7" strokeWidth="2" />

              {/* Grid */}
              {Array.from({ length: 3 }, (_, i) => (
                <line key={i} x1={25 + i * 25} y1="10" x2={25 + i * 25} y2="90"
                  stroke="#06b6d4" strokeWidth="1" strokeDasharray="2,2" />
              ))}
              {Array.from({ length: 2 }, (_, i) => (
                <line key={i} x1="10" y1={25 + i * 25} x2="110" y2={25 + i * 25}
                  stroke="#a855f7" strokeWidth="1" strokeDasharray="2,2" />
              ))}

              {/* Continents representation */}
              <path d="M15 25 Q30 20 45 30 Q60 35 75 25 Q90 30 105 35 L105 50 Q90 45 75 55 Q60 60 45 50 Q30 45 15 55 Z"
                fill="#10b981" opacity="0.7" />
              <path d="M25 60 Q40 55 55 65 Q70 70 85 60 L85 75 Q70 80 55 75 Q40 70 25 75 Z"
                fill="#10b981" opacity="0.7" />
            </svg>
            <p className="mt-2 font-semibold text-gray-200 text-xs sm:text-sm">מפה שטוחה (דו מימד)</p>
          </div>
        </div>
      </div>

      {/* Topographic Map 1:50,000 */}
      <div className="bg-black/30 backdrop-blur-sm border border-purple-500/30 p-3 sm:p-4 md:p-6 rounded-xl sm:rounded-2xl shadow-lg mb-4 sm:mb-6">
        <h2 className="text-lg sm:text-xl md:text-2xl font-bold mb-3 sm:mb-4 text-center text-emerald-400">
          מפה טופוגרפית 1:50,000
        </h2>
        <p className="text-center text-gray-300 text-xs sm:text-sm mb-3 sm:mb-4">כל ריבוע = 1 קילומטר</p>

        <div className="flex justify-center mb-3 sm:mb-4 overflow-x-auto">
          <svg width="100%" height="300" viewBox="0 0 400 400" className="max-w-full h-auto min-w-[300px] border border-emerald-500/30 rounded-lg bg-gradient-to-br from-green-900/20 to-yellow-900/20">
            {/* Grid - 1km squares */}
            <defs>
              <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
                <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#22d3ee" strokeWidth="1" opacity="0.6" />
              </pattern>
              <pattern id="majorGrid" width="200" height="200" patternUnits="userSpaceOnUse">
                <path d="M 200 0 L 0 0 0 200" fill="none" stroke="#06b6d4" strokeWidth="2" opacity="0.8" />
              </pattern>
            </defs>

            {/* Apply grid patterns */}
            <rect width="400" height="400" fill="url(#grid)" />
            <rect width="400" height="400" fill="url(#majorGrid)" />

            {/* Topographic features */}
            {/* Hills and elevation */}
            <ellipse cx="120" cy="100" rx="60" ry="40" fill="#8B4513" opacity="0.3" />
            <ellipse cx="115" cy="95" rx="40" ry="25" fill="#A0522D" opacity="0.4" />
            <ellipse cx="110" cy="90" rx="20" ry="15" fill="#D2691E" opacity="0.5" />

            <ellipse cx="280" cy="140" rx="70" ry="50" fill="#8B4513" opacity="0.3" />
            <ellipse cx="275" cy="135" rx="50" ry="35" fill="#A0522D" opacity="0.4" />

            {/* Forest areas */}
            <circle cx="80" cy="200" r="15" fill="#228B22" opacity="0.6" />
            <circle cx="95" cy="210" r="12" fill="#228B22" opacity="0.6" />
            <circle cx="75" cy="220" r="10" fill="#228B22" opacity="0.6" />
            <circle cx="320" cy="280" r="20" fill="#228B22" opacity="0.6" />
            <circle cx="340" cy="270" r="15" fill="#228B22" opacity="0.6" />
            <circle cx="330" cy="300" r="12" fill="#228B22" opacity="0.6" />

            {/* River */}
            <path d="M 50 350 Q 150 320 200 300 Q 250 280 350 250"
              fill="none" stroke="#00BFFF" strokeWidth="4" opacity="0.7" />

            {/* Road */}
            <path d="M 0 180 L 120 180 Q 160 180 180 200 L 220 240 Q 250 270 300 270 L 400 270"
              fill="none" stroke="#FFD700" strokeWidth="3" opacity="0.8" strokeDasharray="10,5" />

            {/* Contour lines */}
            <ellipse cx="120" cy="100" rx="80" ry="60" fill="none" stroke="#8B4513" strokeWidth="1" opacity="0.5" />
            <ellipse cx="120" cy="100" rx="100" ry="80" fill="none" stroke="#8B4513" strokeWidth="1" opacity="0.4" />
            <ellipse cx="280" cy="140" rx="90" ry="70" fill="none" stroke="#8B4513" strokeWidth="1" opacity="0.5" />
            <ellipse cx="280" cy="140" rx="110" ry="90" fill="none" stroke="#8B4513" strokeWidth="1" opacity="0.4" />

            {/* Grid coordinates - Major grid lines (every 5km) */}
            <text x="200" y="15" textAnchor="middle" fill="#67e8f9" fontSize="12" fontWeight="bold">340</text>
            <text x="400" y="15" textAnchor="end" fill="#67e8f9" fontSize="12" fontWeight="bold">345</text>
            <text x="15" y="200" textAnchor="middle" fill="#c084fc" fontSize="12" fontWeight="bold">625</text>
            <text x="15" y="400" textAnchor="middle" fill="#c084fc" fontSize="12" fontWeight="bold">620</text>

            {/* Sample coordinate points */}
            <circle cx="160" cy="160" r="4" fill="#ff6b6b" stroke="#ff5252" strokeWidth="2" />
            <text x="170" y="165" fill="#ff6b6b" fontSize="10" fontWeight="bold">342, 624</text>

            <circle cx="240" cy="280" r="4" fill="#ff6b6b" stroke="#ff5252" strokeWidth="2" />
            <text x="250" y="285" fill="#ff6b6b" fontSize="10" fontWeight="bold">344, 622</text>

            {/* Scale indicator */}
            <g transform="translate(20, 360)">
              <line x1="0" y1="0" x2="40" y2="0" stroke="#fff" strokeWidth="2" />
              <line x1="0" y1="-3" x2="0" y2="3" stroke="#fff" strokeWidth="2" />
              <line x1="40" y1="-3" x2="40" y2="3" stroke="#fff" strokeWidth="2" />
              <text x="20" y="-8" textAnchor="middle" fill="#fff" fontSize="10">1 ק"מ</text>
            </g>

            {/* Legend symbols */}
            <g transform="translate(280, 350)">
              <text x="0" y="0" fill="#67e8f9" fontSize="9" fontWeight="bold">מקרא:</text>
              <line x1="0" y1="10" x2="15" y2="10" stroke="#00BFFF" strokeWidth="3" />
              <text x="20" y="14" fill="#fff" fontSize="8">נחל</text>
              <line x1="0" y1="22" x2="15" y2="22" stroke="#FFD700" strokeWidth="2" strokeDasharray="5,2" />
              <text x="20" y="26" fill="#fff" fontSize="8">כביש</text>
              <circle cx="7" cy="33" r="4" fill="#228B22" opacity="0.6" />
              <text x="20" y="37" fill="#fff" fontSize="8">יער</text>
            </g>
          </svg>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 text-xs sm:text-sm">
          <div className="bg-slate-800/50 backdrop-blur-sm border border-emerald-500/30 p-2.5 sm:p-3 rounded-lg">
            <h4 className="font-bold text-emerald-400 mb-1.5 sm:mb-2">מידע על המפה:</h4>
            <ul className="text-gray-300 space-y-0.5 sm:space-y-1">
              <li>• <strong>קנה מידה:</strong> 1:50,000</li>
              <li>• <strong>רזולוציה:</strong> 1 ק"מ לריבוע</li>
              <li>• <strong>קווי גובה:</strong> כל 20 מטר</li>
              <li>• <strong>רשת UTM:</strong> כל 1000 מטר</li>
            </ul>
          </div>
          <div className="bg-slate-800/50 backdrop-blur-sm border border-purple-500/30 p-2.5 sm:p-3 rounded-lg">
            <h4 className="font-bold text-purple-400 mb-1.5 sm:mb-2">איך לקרוא:</h4>
            <ul className="text-gray-300 space-y-0.5 sm:space-y-1">
              <li>• כל ריבוע = 1 ק"מ × 1 ק"מ</li>
              <li>• קווים עבים כל 5 ק"מ</li>
              <li>• נקודות אדומות = דוגמאות</li>
              <li>• מספרי הרשת בפינות</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Coordinate System Example */}
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 p-2 sm:p-4 md:p-6">
      <div className="max-w-4xl mx-auto">
        {/* Coordinate Reading Example */}
        <div className="bg-black/30 backdrop-blur-sm border border-purple-500/30 p-3 sm:p-4 md:p-6 rounded-xl sm:rounded-2xl shadow-lg mb-3 sm:mb-4 md:mb-6">
          <h2 className="text-base sm:text-lg md:text-xl lg:text-2xl font-bold mb-2 sm:mb-3 md:mb-4 text-center text-pink-400">
            דוגמה למערכת קואורדינטות
          </h2>

          <div className="grid gap-2 sm:gap-3 md:gap-4">
            <div className="bg-slate-800/50 backdrop-blur-sm border border-cyan-500/30 p-2.5 sm:p-3 md:p-4 rounded-lg sm:rounded-xl">
              <h3 className="text-sm sm:text-base md:text-lg font-bold mb-2 text-cyan-400">קריאת קואורדינטות</h3>
              <div className="space-y-1 sm:space-y-1.5 md:space-y-2 text-xs sm:text-sm md:text-base text-gray-200">
                <p><strong className="text-purple-400">אורך:</strong> 354 (קו אנכי)</p>
                <p><strong className="text-purple-400">רוחב:</strong> 627 (קו אופקי)</p>
                <p><strong className="text-pink-400">נקודה:</strong> (354, 627)</p>
              </div>
              <div className="mt-2 sm:mt-3 md:mt-4 p-2 sm:p-2.5 md:p-3 bg-emerald-900/30 border border-emerald-500/30 rounded-md sm:rounded-lg">
                <p className="text-xs sm:text-sm text-emerald-300"><strong>זכרו:</strong> תמיד אורך ראשון, אחר כך רוחב!</p>
              </div>
            </div>
          </div>
        </div>

        {/* UTM Coordinate System Explanation */}
        <div className="bg-black/30 backdrop-blur-sm border border-purple-500/30 p-3 sm:p-4 md:p-6 rounded-xl sm:rounded-2xl shadow-lg">
          <h2 className="text-base sm:text-lg md:text-xl lg:text-2xl font-bold mb-2 sm:mb-3 md:mb-4 text-center text-pink-400">
            סדר פעולות מציאת נ.צ
          </h2>

          <p className="text-gray-200 text-xs sm:text-sm md:text-base text-center mb-3 sm:mb-4 md:mb-6 px-2">
            בעזרת רשת הקואורדינטות הפכתולה (UTM) ניתן לתת כתובת ייחודית לכל נקודה על כדור הארץ באמצעות מפה.
          </p>

          <div className="bg-slate-800/50 backdrop-blur-sm border border-cyan-500/30 p-2.5 sm:p-3 md:p-4 lg:p-6 rounded-lg sm:rounded-xl">
            {/* Visual representation of UTM coordinate */}
            <div className="flex justify-center items-start gap-1 sm:gap-2 mb-3 sm:mb-4 md:mb-6 overflow-x-auto pb-2">
              {/* X Coordinate (Width/Longitude) */}
              <div className="flex flex-col items-center flex-shrink-0">
                <div className="flex gap-0.5">
                  {[1, 2, 3, 4, 5].map((i) => (
                    <div 
                      key={`x${i}`} 
                      className={`w-5 h-8 sm:w-6 sm:h-9 md:w-7 md:h-10 ${
                        i > 2 ? 'border border-cyan-400' : 'border-b border-cyan-400'
                      } bg-cyan-400/10 rounded flex items-center justify-center`}
                    >
                      <span className="text-cyan-200 text-xs"></span>
                    </div>
                  ))}
                </div>
                <div className="flex justify-center gap-1.5 sm:gap-2 md:gap-3 mt-1">
                  <div className="flex flex-col items-center">
                    <span className="text-[10px] sm:text-xs">↑</span>
                    <div className="text-gray-400 text-[8px] sm:text-[9px] md:text-[10px] text-center leading-tight max-w-[50px] sm:max-w-none">
                      דיוק בעשרות מ'
                    </div>
                    <div className="text-gray-400 text-[8px] sm:text-[9px] md:text-[10px]">(פנים הריבוע)</div>
                  </div>
                  <div className="flex flex-col items-center">
                    <span className="text-[10px] sm:text-xs">↑</span>
                    <div className="text-gray-400 text-[8px] sm:text-[9px] md:text-[10px] text-center leading-tight max-w-[50px] sm:max-w-none">
                      ספרות קו הרוחב (X)
                    </div>
                  </div>
                </div>
              </div>

              {/* Separator */}
              <div className="text-red-500 text-2xl sm:text-3xl md:text-4xl font-bold self-start mt-0.5 sm:mt-1 flex-shrink-0">/</div>

              {/* Y Coordinate (Height/Latitude) */}
              <div className="flex flex-col items-center flex-shrink-0">
                <div className="flex gap-0.5">
                  {[1, 2, 3, 4, 5].map((i) => (
                    <div 
                      key={`y${i}`} 
                      className={`w-5 h-8 sm:w-6 sm:h-9 md:w-7 md:h-10 ${
                        i > 2 ? 'border border-cyan-400' : 'border-b border-cyan-400'
                      } bg-cyan-400/10 rounded flex items-center justify-center`}
                    >
                      <span className="text-purple-200 text-xs"></span>
                    </div>
                  ))}
                </div>
                <div className="flex justify-center gap-1.5 sm:gap-2 md:gap-3 mt-1">
                  <div className="flex flex-col items-center">
                    <span className="text-[10px] sm:text-xs">↑</span>
                    <div className="text-gray-400 text-[8px] sm:text-[9px] md:text-[10px] text-center leading-tight max-w-[50px] sm:max-w-none">
                      דיוק בעשרות מ'
                    </div>
                    <div className="text-gray-400 text-[8px] sm:text-[9px] md:text-[10px]">(פנים הריבוע)</div>
                  </div>
                  <div className="flex flex-col items-center">
                    <span className="text-[10px] sm:text-xs">↑</span>
                    <div className="text-gray-400 text-[8px] sm:text-[9px] md:text-[10px] text-center leading-tight max-w-[50px] sm:max-w-none">
                      ספרות קו האורך (Y)
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Explanation boxes */}
            <div className="grid grid-cols-1 gap-2 sm:gap-3 mt-3 sm:mt-4 md:mt-6">
              <div className="bg-cyan-900/20 border border-cyan-500/30 p-2.5 sm:p-3 md:p-4 rounded-lg">
                <div className="flex items-center gap-1.5 sm:gap-2 mb-1.5 sm:mb-2">
                  <div className="w-4 h-4 sm:w-5 sm:h-5 bg-cyan-400 rounded flex items-center justify-center text-black text-[10px] sm:text-xs font-bold flex-shrink-0">1</div>
                  <h4 className="font-bold text-cyan-400 text-xs sm:text-sm md:text-base">הגדרת המשבצת בה נמצאת הנקודה</h4>
                </div>
                <p className="text-gray-300 text-[11px] sm:text-xs md:text-sm leading-relaxed">
                  כל קו אורך ורוחב מצוין על ידי 3 ספרות. נצליב את קו האורך עם קו הרוחב, הנקודה ממוקמת במשבצת הימנית העליונה.
                </p>
              </div>

              <div className="bg-purple-900/20 border border-purple-500/30 p-2.5 sm:p-3 md:p-4 rounded-lg">
                <div className="flex items-center gap-1.5 sm:gap-2 mb-1.5 sm:mb-2">
                  <div className="w-4 h-4 sm:w-5 sm:h-5 bg-purple-400 rounded flex items-center justify-center text-black text-[10px] sm:text-xs font-bold flex-shrink-0">2</div>
                  <h4 className="font-bold text-purple-400 text-xs sm:text-sm md:text-base">מציאת הנ.צ בתוך המשבצת</h4>
                </div>
                <ul className="text-gray-300 text-[11px] sm:text-xs md:text-sm space-y-1 leading-relaxed">
                  <li>• נניח את הסרגל הפינתי של המדקו (1:50,000) על המשבצת שמצאנו.</li>
                  <li>• נבדוק בכמה עשרות מטרים רחוקה הנקודה בתוך המשבצת מקו האורך ומקו הרוחב.</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
      
      <BackAndForthButtons explanationNumber={1} />
    </div>
  );
}