'use client';
export default function Explanation1() {
    return (
         <div className="max-w-2xl mx-auto">
        <h1 className="text-2xl sm:text-3xl font-bold mb-6 text-center bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">עמוד הסבר - רשת UTM</h1>
        
        <div className="bg-black/40 backdrop-blur-sm border border-purple-500/30 p-4 sm:p-6 rounded-2xl shadow-lg mb-6">
          <p className="text-base sm:text-lg leading-relaxed text-gray-200 mb-4">
            רשת קווים (UTM) אשר מאפשרת להעביר את נקודת המבט על כדור הארץ מתלת מימד לדו מימד 
            ומחלקת את המפה העולמית לריבועים שווים. בעזרתה ניתן לאתר במדויק נקודות על המפה, 
            לאמוד מרחק ולמדוד כיוונים.
          </p>
          <p className="text-base sm:text-lg leading-relaxed text-gray-200">
            הרשת מורכבת מקווי אורך ורוחב לכל קו מספר בעל 3 ספרות:
          </p>
          <ul className="mt-4 space-y-2 text-base sm:text-lg text-cyan-300">
            <li><strong className="text-purple-400">קו רוחב</strong> - קווים אופקיים ממערב למזרח</li>
            <li><strong className="text-purple-400">קו אורך</strong> - קווים אנכיים (מדרום לצפון)</li>
          </ul>
        </div>

        {/* Interactive Grid Visualization */}
        <div className="bg-black/30 backdrop-blur-sm border border-purple-500/30 p-4 sm:p-6 rounded-2xl shadow-lg mb-6">
          <h2 className="text-xl sm:text-2xl font-bold mb-4 text-center text-cyan-400">הדמיה של רשת UTM</h2>
          
          <div className="flex justify-center mb-4">
            <svg width="100%" height="300" viewBox="0 0 350 300" className="max-w-full border border-purple-500/30 rounded-lg">
              {/* Background */}
              <rect width="350" height="300" fill="rgba(30, 41, 59, 0.8)" />
              
              {/* Grid lines - Longitude (vertical) */}
              {Array.from({ length: 5 }, (_, i) => (
                <g key={`long-${i}`}>
                  <line
                    x1={40 + i * 60}
                    y1={30}
                    x2={40 + i * 60}
                    y2={270}
                    stroke="#06b6d4"
                    strokeWidth="2"
                    strokeDasharray="4,4"
                  />
                  <text
                    x={40 + i * 60}
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
                    x1={40}
                    y1={50 + i * 50}
                    x2={280}
                    y2={50 + i * 50}
                    stroke="#a855f7"
                    strokeWidth="2"
                    strokeDasharray="4,4"
                  />
                  <text
                    x={25}
                    y={55 + i * 50}
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
              <circle cx="160" cy="150" r="5" fill="#f472b6" stroke="#ec4899" strokeWidth="2" />
              <text x="170" y="155" fill="#f472b6" fontSize="11" fontWeight="bold">נקודה: 340, 620</text>
              
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
          
          <div className="text-center text-gray-300 text-sm">
            <p>דוגמה לרשת UTM עם קווי אורך (תכלת) וקווי רוחב (סגול)</p>
          </div>
        </div>

        {/* 3D to 2D Transformation Illustration */}
        <div className="bg-black/30 backdrop-blur-sm border border-purple-500/30 p-4 sm:p-6 rounded-2xl shadow-lg mb-6">
          <h2 className="text-xl sm:text-2xl font-bold mb-4 text-center text-cyan-400">המרה מתלת מימד לדו מימד</h2>
          
          <div className="flex flex-col sm:flex-row justify-center items-center space-y-6 sm:space-y-0 sm:space-x-8">
            {/* 3D Globe */}
            <div className="text-center">
              <svg width="120" height="120" viewBox="0 0 120 120">
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
              <p className="mt-2 font-semibold text-gray-200 text-sm">כדור הארץ (תלת מימד)</p>
            </div>
            
            {/* Arrow */}
            <div className="flex flex-col items-center">
              <svg width="50" height="25" viewBox="0 0 50 25">
                <path d="M5 12.5 L35 12.5 M30 8 L35 12.5 L30 17" stroke="#22d3ee" strokeWidth="2" fill="none" />
              </svg>
              <p className="text-emerald-400 font-semibold text-sm">UTM</p>
            </div>
            
            {/* 2D Map */}
            <div className="text-center">
              <svg width="120" height="100" viewBox="0 0 120 100">
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
              <p className="mt-2 font-semibold text-gray-200 text-sm">מפה שטוחה (דו מימד)</p>
            </div>
          </div>
        </div>

        {/* Topographic Map 1:50,000 */}
        <div className="bg-black/30 backdrop-blur-sm border border-purple-500/30 p-4 sm:p-6 rounded-2xl shadow-lg mb-6">
          <h2 className="text-xl sm:text-2xl font-bold mb-4 text-center text-emerald-400">מפה טופוגרפית 1:50,000</h2>
          <p className="text-center text-gray-300 text-sm mb-4">כל ריבוע = 1 קילומטר</p>
          
          <div className="flex justify-center mb-4">
            <svg width="100%" height="400" viewBox="0 0 400 400" className="max-w-full border border-emerald-500/30 rounded-lg bg-gradient-to-br from-green-900/20 to-yellow-900/20">
              {/* Grid - 1km squares */}
              <defs>
                <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
                  <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#22d3ee" strokeWidth="1" opacity="0.6"/>
                </pattern>
                <pattern id="majorGrid" width="200" height="200" patternUnits="userSpaceOnUse">
                  <path d="M 200 0 L 0 0 0 200" fill="none" stroke="#06b6d4" strokeWidth="2" opacity="0.8"/>
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
              <text x="400" y="15" textAnchor="middle" fill="#67e8f9" fontSize="12" fontWeight="bold">345</text>
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
              <g transform="translate(300, 350)">
                <text x="0" y="0" fill="#67e8f9" fontSize="10" fontWeight="bold">מקרא:</text>
                <line x1="0" y1="12" x2="15" y2="12" stroke="#00BFFF" strokeWidth="3" />
                <text x="20" y="16" fill="#fff" fontSize="9">נחל</text>
                <line x1="0" y1="25" x2="15" y2="25" stroke="#FFD700" strokeWidth="2" strokeDasharray="5,2" />
                <text x="20" y="29" fill="#fff" fontSize="9">כביש</text>
                <circle cx="7" cy="37" r="4" fill="#228B22" opacity="0.6" />
                <text x="20" y="41" fill="#fff" fontSize="9">יער</text>
              </g>
            </svg>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
            <div className="bg-slate-800/50 backdrop-blur-sm border border-emerald-500/30 p-3 rounded-lg">
              <h4 className="font-bold text-emerald-400 mb-2">מידע על המפה:</h4>
              <ul className="text-gray-300 space-y-1">
                <li>• <strong>קנה מידה:</strong> 1:50,000</li>
                <li>• <strong>רזולוציה:</strong> 1 ק"מ לריבוע</li>
                <li>• <strong>קווי גובה:</strong> כל 20 מטר</li>
                <li>• <strong>רשת UTM:</strong> כל 1000 מטר</li>
              </ul>
            </div>
            <div className="bg-slate-800/50 backdrop-blur-sm border border-purple-500/30 p-3 rounded-lg">
              <h4 className="font-bold text-purple-400 mb-2">איך לקרוא:</h4>
              <ul className="text-gray-300 space-y-1">
                <li>• כל ריבוע = 1 ק"מ × 1 ק"מ</li>
                <li>• קווים עבים כל 5 ק"מ</li>
                <li>• נקודות אדומות = דוגמאות</li>
                <li>• מספרי הרשת בפינות</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Coordinate System Example */}
        <div className="bg-black/30 backdrop-blur-sm border border-purple-500/30 p-4 sm:p-6 rounded-2xl shadow-lg">
          <h2 className="text-xl sm:text-2xl font-bold mb-4 text-center text-pink-400">דוגמה למערכת קואורדינטות</h2>
          
          <div className="grid gap-4">
            <div className="bg-slate-800/50 backdrop-blur-sm border border-cyan-500/30 p-4 rounded-xl">
              <h3 className="text-lg font-bold mb-3 text-cyan-400">קריאת קואורדינטות</h3>
              <div className="space-y-2 text-gray-200">
                <p><strong className="text-purple-400">אורך:</strong> 354 (קו אנכי)</p>
                <p><strong className="text-purple-400">רוחב:</strong> 627 (קו אופקי)</p>
                <p><strong className="text-pink-400">נקודה:</strong> (354, 627)</p>
              </div>
              <div className="mt-4 p-3 bg-emerald-900/30 border border-emerald-500/30 rounded-lg">
                <p className="text-sm text-emerald-300"><strong>זכרו:</strong> תמיד אורך ראשון, אחר כך רוחב!</p>
              </div>
            </div>
            
            <div className="bg-slate-800/50 backdrop-blur-sm border border-purple-500/30 p-4 rounded-xl">
              <h3 className="text-lg font-bold mb-3 text-purple-400">יתרונות הרשת</h3>
              <ul className="space-y-1 text-sm text-gray-300">
                <li className="flex items-center gap-2">
                  <span className="w-2 h-2 bg-cyan-400 rounded-full"></span>
                  איתור מדויק של מיקומים
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-2 h-2 bg-purple-400 rounded-full"></span>
                  מדידת מרחקים בקלות
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-2 h-2 bg-pink-400 rounded-full"></span>
                  קביעת כיוונים
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-2 h-2 bg-emerald-400 rounded-full"></span>
                  תכנון מסלולים
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-2 h-2 bg-yellow-400 rounded-full"></span>
                  שיתוף מיקומים
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    );
}