import { useState, useRef, useEffect } from 'react';

export default function CoordinateFindingExercise() {
  // Generate random target coordinate
  const generateCoordinate = () => {
    const x = Math.floor(Math.random() * 3) + 651; // 651-653
    const xDecimal = Math.floor(Math.random() * 10) * 100; // 0-900
    const y = Math.floor(Math.random() * 3) + 407; // 407-409
    const yDecimal = Math.floor(Math.random() * 10) * 100; // 0-900
    return {
      x: x * 1000 + xDecimal,
      y: y * 1000 + yDecimal,
      display: `${x}${String(xDecimal).padStart(3, '0')}/${y}${String(yDecimal).padStart(3, '0')}`
    };
  };

  const [targetCoord, setTargetCoord] = useState(generateCoordinate());
  const [userPoint, setUserPoint] = useState(null);
  const [madkoPosition, setMadkoPosition] = useState({ x: 300, y: 300 });
  const [showResult, setShowResult] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const [showMadko, setShowMadko] = useState(false);
  
  const svgRef = useRef(null);
  const [isDragging, setIsDragging] = useState(false);

  // Convert coordinate to pixel position
  const coordToPixel = (coord) => {
    const baseX = Math.floor(coord.x / 1000);
    const decimalX = coord.x % 1000;
    const baseY = Math.floor(coord.y / 1000);
    const decimalY = coord.y % 1000;
    
    const pixelX = 100 + ((baseX - 651) * 200) + (decimalX / 1000 * 200);
    const pixelY = 500 - ((baseY - 407) * 200) - (decimalY / 1000 * 200);
    
    return { x: pixelX, y: pixelY };
  };

  // Convert pixel to coordinate
  const pixelToCoord = (pixel) => {
    const gridX = Math.floor((pixel.x - 100) / 200);
    const decimalX = Math.floor(((pixel.x - 100) % 200) / 200 * 10) * 100;
    const x = (651 + gridX) * 1000 + decimalX;
    
    const gridY = Math.floor((500 - pixel.y) / 200);
    const decimalY = Math.floor(((500 - pixel.y) % 200) / 200 * 10) * 100;
    const y = (407 + gridY) * 1000 + decimalY;
    
    return { x, y };
  };

  const getSvgCoordinates = (clientX, clientY) => {
    const svg = svgRef.current;
    const pt = svg.createSVGPoint();
    pt.x = clientX;
    pt.y = clientY;
    return pt.matrixTransform(svg.getScreenCTM().inverse());
  };

  const handleMapClick = (e) => {
    if (showResult) return;
    
    const clientX = e.clientX || (e.touches && e.touches[0].clientX);
    const clientY = e.clientY || (e.touches && e.touches[0].clientY);
    const coords = getSvgCoordinates(clientX, clientY);
    
    setUserPoint({ x: coords.x, y: coords.y });
    setMadkoPosition({ x: coords.x, y: coords.y });
    setShowMadko(true);
  };

  const handleMadkoStart = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  };

  useEffect(() => {
    const handleMove = (e) => {
      if (isDragging) {
        e.preventDefault();
        e.stopPropagation();
      }
      
      const clientX = e.clientX || (e.touches && e.touches[0].clientX);
      const clientY = e.clientY || (e.touches && e.touches[0].clientY);
      
      if (!clientX || !clientY) return;
      
      if (isDragging) {
        const coords = getSvgCoordinates(clientX, clientY);
        setMadkoPosition({ x: coords.x, y: coords.y });
        setUserPoint({ x: coords.x, y: coords.y });
      }
    };
    
    const handleEnd = (e) => {
      if (isDragging) {
        e.preventDefault();
      }
      setIsDragging(false);
    };
    
    if (isDragging) {
      const scrollY = window.scrollY;
      document.body.style.overflow = 'hidden';
      document.body.style.height = '100vh';
      
      window.addEventListener('mousemove', handleMove);
      window.addEventListener('mouseup', handleEnd);
      window.addEventListener('touchmove', handleMove, { passive: false });
      window.addEventListener('touchend', handleEnd, { passive: false });
      
      return () => {
        document.body.style.overflow = '';
        document.body.style.height = '';
        window.scrollTo(0, scrollY);
        
        window.removeEventListener('mousemove', handleMove);
        window.removeEventListener('mouseup', handleEnd);
        window.removeEventListener('touchmove', handleMove);
        window.removeEventListener('touchend', handleEnd);
      };
    }
  }, [isDragging]);

  const handleSubmit = () => {
    if (!userPoint) return;
    
    const userCoord = pixelToCoord(userPoint);
    const targetPixel = coordToPixel(targetCoord);
    
    const distance = Math.sqrt(
      Math.pow(userPoint.x - targetPixel.x, 2) + 
      Math.pow(userPoint.y - targetPixel.y, 2)
    );
    
    setIsCorrect(distance < 20);
    setShowResult(true);
  };

  const handleReset = () => {
    setTargetCoord(generateCoordinate());
    setUserPoint(null);
    setMadkoPosition({ x: 300, y: 300 });
    setShowResult(false);
    setIsCorrect(false);
    setShowMadko(false);
  };

  const targetPixel = coordToPixel(targetCoord);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 p-4">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold mb-6 text-center bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
          תרגיל מציאת נקודה לפי נ.צ
        </h1>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Instructions */}
          <div className="bg-black/40 backdrop-blur-sm border border-purple-500/30 p-4 rounded-xl">
            <h2 className="text-xl font-bold text-cyan-400 mb-3">הוראות</h2>
            <ol className="text-gray-200 space-y-2 text-sm" dir="rtl">
              <li className="flex gap-2">
                <span className="bg-cyan-500 rounded-full w-6 h-6 flex items-center justify-center flex-shrink-0">1</span>
                <span>קרא את הנ.צ המוצג למעלה</span>
              </li>
              <li className="flex gap-2">
                <span className="bg-purple-500 rounded-full w-6 h-6 flex items-center justify-center flex-shrink-0">2</span>
                <span>מצא את הריבוע הנכון על המפה לפי 3 הספרות הראשונות</span>
              </li>
              <li className="flex gap-2">
                <span className="bg-pink-500 rounded-full w-6 h-6 flex items-center justify-center flex-shrink-0">3</span>
                <span>השתמש במדקו למצוא את המיקום המדויק בתוך הריבוע</span>
              </li>
              <li className="flex gap-2">
                <span className="bg-emerald-500 rounded-full w-6 h-6 flex items-center justify-center flex-shrink-0">4</span>
                <span>לחץ על המפה או גרור את המדקו למיקום הנכון</span>
              </li>
            </ol>
            
            <div className="mt-6 p-4 bg-purple-900/30 border border-purple-500/30 rounded-lg">
              <h3 className="text-lg font-bold text-purple-400 mb-2 text-center">הנ.צ למציאה:</h3>
              <p className="text-3xl font-bold text-center text-cyan-300 font-mono" dir="ltr">
                {targetCoord.display}
              </p>
            </div>

            <div className="mt-4 flex gap-2">
              <button
                onClick={handleSubmit}
                disabled={!userPoint || showResult}
                className="flex-1 bg-gradient-to-r from-cyan-500 to-purple-500 text-white font-bold py-2 px-4 rounded-lg hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                בדוק תשובה
              </button>
              <button
                onClick={handleReset}
                className="flex-1 bg-slate-700 text-white font-bold py-2 px-4 rounded-lg hover:bg-slate-600"
              >
                נ.צ חדש
              </button>
            </div>
            
            {showResult && (
              <div className={`mt-4 p-4 rounded-lg border ${
                isCorrect 
                  ? 'bg-green-900/30 border-green-500/30' 
                  : 'bg-red-900/30 border-red-500/30'
              }`}>
                <p className={`font-bold text-lg ${isCorrect ? 'text-green-400' : 'text-red-400'}`} dir="rtl">
                  {isCorrect ? '✓ מצוין! מצאת את הנקודה הנכונה!' : '✗ לא מדויק מספיק'}
                </p>
                {!isCorrect && (
                  <div className="mt-3" dir="rtl">
                    <p className="text-yellow-300 text-sm mb-2">הנקודה הנכונה מסומנת בירוק</p>
                    <p className="text-gray-300 text-sm">
                      טיפ: שים לב ל-3 הספרות האחרונות - הן מציינות את המיקום בתוך הריבוע
                    </p>
                  </div>
                )}
              </div>
            )}
          </div>
          
          {/* Map with Grid */}
          <div className="lg:col-span-2 bg-black/40 backdrop-blur-sm border border-purple-500/30 p-4 rounded-xl">
            <h2 className="text-xl font-bold text-purple-400 mb-3 text-center">מפה טופוגרפית 1:50,000</h2>
            
            <svg
              ref={svgRef}
              viewBox="0 0 700 600"
              className="w-full border-2 border-purple-500/30 rounded-lg bg-gradient-to-br from-green-900/20 to-yellow-900/20 cursor-crosshair"
              onClick={handleMapClick}
              onTouchStart={handleMapClick}
              style={{ touchAction: 'none' }}
            >
              {/* Grid - 1km squares */}
              <defs>
                <pattern id="smallGrid" width="20" height="20" patternUnits="userSpaceOnUse">
                  <path d="M 20 0 L 0 0 0 20" fill="none" stroke="#22d3ee" strokeWidth="0.5" opacity="0.3" />
                </pattern>
                <pattern id="grid" width="200" height="200" patternUnits="userSpaceOnUse">
                  <rect width="200" height="200" fill="url(#smallGrid)" />
                  <path d="M 200 0 L 0 0 0 200" fill="none" stroke="#06b6d4" strokeWidth="2" opacity="0.6" />
                </pattern>
              </defs>
              
              <rect x="100" y="100" width="600" height="400" fill="url(#grid)" />
              
              {/* Grid labels */}
              <text x="200" y="90" fill="#67e8f9" fontSize="16" fontWeight="bold" textAnchor="middle">651</text>
              <text x="400" y="90" fill="#67e8f9" fontSize="16" fontWeight="bold" textAnchor="middle">652</text>
              <text x="600" y="90" fill="#67e8f9" fontSize="16" fontWeight="bold" textAnchor="middle">653</text>
              
              <text x="80" y="305" fill="#c084fc" fontSize="16" fontWeight="bold" textAnchor="middle">408</text>
              <text x="80" y="505" fill="#c084fc" fontSize="16" fontWeight="bold" textAnchor="middle">407</text>
              
              {/* User's marked point */}
              {userPoint && (
                <circle 
                  cx={userPoint.x} 
                  cy={userPoint.y} 
                  r="8" 
                  fill="#3b82f6" 
                  stroke="#1e40af" 
                  strokeWidth="2"
                  opacity="0.8"
                />
              )}
              
              {/* Show correct answer after submission */}
              {showResult && !isCorrect && (
                <>
                  <circle 
                    cx={targetPixel.x} 
                    cy={targetPixel.y} 
                    r="8" 
                    fill="#10b981" 
                    stroke="#065f46" 
                    strokeWidth="2"
                  />
                  <line 
                    x1={userPoint.x} 
                    y1={userPoint.y} 
                    x2={targetPixel.x} 
                    y2={targetPixel.y} 
                    stroke="#ef4444" 
                    strokeWidth="2" 
                    strokeDasharray="5,5"
                  />
                </>
              )}
              
              {/* Madko overlay */}
              {showMadko && !showResult && (
                <g
                  transform={`translate(${madkoPosition.x}, ${madkoPosition.y})`}
                  style={{ cursor: isDragging ? 'grabbing' : 'grab', touchAction: 'none' }}
                  onMouseDown={handleMadkoStart}
                  onTouchStart={handleMadkoStart}
                >
                  <circle r="60" fill="rgba(255,255,255,0.95)" stroke="#333" strokeWidth="2" />
                  
                  {/* Corner ruler marks */}
                  <g transform="translate(-60, -60)">
                    {/* Vertical ruler */}
                    {Array.from({ length: 11 }, (_, i) => (
                      <g key={`v${i}`}>
                        <line x1="0" y1={i * 12} x2="8" y2={i * 12} stroke="#dc2626" strokeWidth="1" />
                        {i > 0 && i < 10 && (
                          <text x="12" y={i * 12 + 3} fontSize="6" fill="#dc2626">{10 - i}</text>
                        )}
                      </g>
                    ))}
                    
                    {/* Horizontal ruler */}
                    {Array.from({ length: 11 }, (_, i) => (
                      <g key={`h${i}`}>
                        <line x1={i * 12} y1="0" x2={i * 12} y2="8" stroke="#dc2626" strokeWidth="1" />
                        {i > 0 && i < 10 && (
                          <text x={i * 12 - 2} y="18" fontSize="6" fill="#dc2626">{i}</text>
                        )}
                      </g>
                    ))}
                  </g>
                  
                  <circle r="3" fill="#333" />
                  <text y="-70" fill="#666" fontSize="10" fontWeight="bold" textAnchor="middle">גרור למיקום</text>
                </g>
              )}
            </svg>
            
            <div className="mt-3 grid grid-cols-2 gap-3 text-xs text-gray-300">
              <div className="bg-slate-800/50 p-2 rounded" dir="rtl">
                <strong className="text-cyan-400">קווי אורך (X):</strong> תכלת - אופקי
              </div>
              <div className="bg-slate-800/50 p-2 rounded" dir="rtl">
                <strong className="text-purple-400">קווי רוחב (Y):</strong> סגול - אנכי
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}