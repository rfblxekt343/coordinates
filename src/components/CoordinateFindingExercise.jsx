import { useState, useRef, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { setCurrentExcersice } from '../store/excersiceSlice';
import Link from 'next/link';
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
  const [gridPosition, setGridPosition] = useState({ x: 300, y: 300 });
  const [showResult, setShowResult] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const [showGrid, setShowGrid] = useState(true);
  
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

  const getSvgCoordinates = (clientX, clientY) => {
    const svg = svgRef.current;
    if (!svg) return { x: 0, y: 0 };
    const pt = svg.createSVGPoint();
    pt.x = clientX;
    pt.y = clientY;
    return pt.matrixTransform(svg.getScreenCTM().inverse());
  };

  const handleMapClick = (e) => {
    if (showResult || isDragging) return;
    
    const clientX = e.clientX || (e.touches && e.touches[0].clientX);
    const clientY = e.clientY || (e.touches && e.touches[0].clientY);
    const coords = getSvgCoordinates(clientX, clientY);
    
    setUserPoint({ x: coords.x, y: coords.y });
  };

  const handleGridStart = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  };

  useEffect(() => {
    const handleMove = (e) => {
      if (!isDragging) return;

      e.preventDefault();
      
      const clientX = e.clientX || (e.touches && e.touches[0].clientX);
      const clientY = e.clientY || (e.touches && e.touches[0].clientY);
      
      if (!clientX || !clientY) return;
      
      const coords = getSvgCoordinates(clientX, clientY);
      setGridPosition({ x: coords.x, y: coords.y });
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
    setGridPosition({ x: 300, y: 300 });
    setShowResult(false);
    setIsCorrect(false);
    setShowGrid(true);
  };

  const targetPixel = coordToPixel(targetCoord);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 p-2 sm:p-4">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-xl sm:text-2xl md:text-3xl font-bold mb-4 sm:mb-6 text-center bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
          תרגיל מציאת נקודה לפי נ.צ
        </h1>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6">
          {/* Instructions */}
          <div className="bg-black/40 backdrop-blur-sm border border-purple-500/30 p-3 sm:p-4 rounded-xl">
            <h2 className="text-lg sm:text-xl font-bold text-cyan-400 mb-2 sm:mb-3">הוראות</h2>
            <ol className="text-gray-200 space-y-1.5 sm:space-y-2 text-xs sm:text-sm" dir="rtl">
              <li className="flex gap-2">
                <span className="bg-cyan-500 rounded-full w-5 h-5 sm:w-6 sm:h-6 flex items-center justify-center flex-shrink-0 text-xs sm:text-sm">1</span>
                <span>קרא את הנ.צ המוצג למטה</span>
              </li>
              <li className="flex gap-2">
                <span className="bg-purple-500 rounded-full w-5 h-5 sm:w-6 sm:h-6 flex items-center justify-center flex-shrink-0 text-xs sm:text-sm">2</span>
                <span>מצא את הריבוע הנכון על המפה לפי 3 הספרות הראשונות</span>
              </li>
              <li className="flex gap-2">
                <span className="bg-pink-500 rounded-full w-5 h-5 sm:w-6 sm:h-6 flex items-center justify-center flex-shrink-0 text-xs sm:text-sm">3</span>
                <span>גרור את רשת 3,000 לריבוע הנכון (הרשת מתאימה בדיוק לגודל הריבוע)</span>
              </li>
              <li className="flex gap-2">
                <span className="bg-emerald-500 rounded-full w-5 h-5 sm:w-6 sm:h-6 flex items-center justify-center flex-shrink-0 text-xs sm:text-sm">4</span>
                <span>לחץ על המיקום המדויק על המפה</span>
              </li>
            </ol>
            
            <div className="mt-4 sm:mt-6 p-3 sm:p-4 bg-purple-900/30 border border-purple-500/30 rounded-lg">
              <h3 className="text-base sm:text-lg font-bold text-purple-400 mb-1 sm:mb-2 text-center">הנ.צ למציאה:</h3>
              <p className="text-2xl sm:text-3xl font-bold text-center text-cyan-300 font-mono" dir="ltr">
                {targetCoord.display}
              </p>
            </div>

            <div className="mt-3 sm:mt-4 flex gap-2">
              <button
                onClick={handleSubmit}
                disabled={!userPoint || showResult}
                className="flex-1 bg-gradient-to-r from-cyan-500 to-purple-500 text-white font-bold py-2 px-3 sm:px-4 rounded-lg hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed text-xs sm:text-base"
              >
                בדוק תשובה
              </button>
              <button
                onClick={handleReset}
                className="flex-1 bg-slate-700 text-white font-bold py-2 px-3 sm:px-4 rounded-lg hover:bg-slate-600 text-xs sm:text-base"
              >
                נ.צ חדש
              </button>
            </div>
            
            {showResult && (
              <div className={`mt-3 sm:mt-4 p-3 sm:p-4 rounded-lg border ${
                isCorrect 
                  ? 'bg-green-900/30 border-green-500/30' 
                  : 'bg-red-900/30 border-red-500/30'
              }`}>
                <p className={`font-bold text-base sm:text-lg ${isCorrect ? 'text-green-400' : 'text-red-400'}`} dir="rtl">
                  {isCorrect ? '✓ מצוין! מצאת את הנקודה הנכונה!' : '✗ לא מדויק מספיק'}
                </p>
                {!isCorrect && (
                  <div className="mt-2 sm:mt-3" dir="rtl">
                    <p className="text-yellow-300 text-xs sm:text-sm mb-1 sm:mb-2">הנקודה הנכונה מסומנת בירוק</p>
                    <p className="text-gray-300 text-xs sm:text-sm">
                      טיפ: שים לב ל-3 הספרות האחרונות - הן מציינות את המיקום בתוך הריבוע
                    </p>
                  </div>
                )}
              </div>
            )}
          </div>
          
          {/* Map with Grid */}
          <div className="lg:col-span-2 bg-black/40 backdrop-blur-sm border border-purple-500/30 p-3 sm:p-4 rounded-xl">
            <h2 className="text-lg sm:text-xl font-bold text-purple-400 mb-2 sm:mb-3 text-center">מפה טופוגרפית 1:50,000</h2>
            
            <svg
              ref={svgRef}
              viewBox="0 0 700 600"
              className="w-full h-auto border-2 border-purple-500/30 rounded-lg bg-gradient-to-br from-green-900/20 to-yellow-900/20 cursor-crosshair touch-none"
              onClick={handleMapClick}
              onTouchStart={handleMapClick}
              style={{ touchAction: 'none', maxHeight: '70vh' }}
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
              <text x="200" y="90" fill="#67e8f9" fontSize="14" fontWeight="bold" textAnchor="middle">651</text>
              <text x="400" y="90" fill="#67e8f9" fontSize="14" fontWeight="bold" textAnchor="middle">652</text>
              <text x="600" y="90" fill="#67e8f9" fontSize="14" fontWeight="bold" textAnchor="middle">653</text>
              
              <text x="80" y="205" fill="#c084fc" fontSize="14" fontWeight="bold" textAnchor="middle">408</text>
              <text x="80" y="405" fill="#c084fc" fontSize="14" fontWeight="bold" textAnchor="middle">407</text>
              
              {/* User's marked point */}
              {userPoint && (
                <circle 
                  cx={userPoint.x} 
                  cy={userPoint.y} 
                  r="6" 
                  fill="#3b82f6" 
                  stroke="#1e40af" 
                  strokeWidth="2"
                  opacity="0.8"
                />
              )}
              
              {/* Show correct answer after submission */}
              {showResult && !isCorrect && userPoint && (
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
              
              {/* 3000 Grid overlay - FREE DRAGGING */}
              {showGrid && !showResult && (
                <g
                  transform={`translate(${gridPosition.x - 100}, ${gridPosition.y - 100})`}
                  style={{ cursor: isDragging ? 'grabbing' : 'grab', touchAction: 'none' }}
                  onMouseDown={handleGridStart}
                  onTouchStart={handleGridStart}
                >
                  {/* Background rectangle - 200x200 to match 1km square */}
                  <rect 
                    x="0" 
                    y="0" 
                    width="200" 
                    height="200" 
                    fill="rgba(168,85,247,0.12)" 
                    stroke="#a855f7" 
                    strokeWidth="3"
                  />
                  
                  {/* Vertical grid lines - 10 divisions (each 20px = 100m) */}
                  {Array.from({ length: 11 }, (_, i) => (
                    <line 
                      key={`v${i}`} 
                      x1={i * 20} 
                      y1="0" 
                      x2={i * 20} 
                      y2="200" 
                      stroke="#a855f7" 
                      strokeWidth="1" 
                      opacity="0.7" 
                    />
                  ))}
                  
                  {/* Horizontal grid lines - 10 divisions (each 20px = 100m) */}
                  {Array.from({ length: 11 }, (_, i) => (
                    <line 
                      key={`h${i}`} 
                      x1="0" 
                      y1={i * 20} 
                      x2="200" 
                      y2={i * 20} 
                      stroke="#a855f7" 
                      strokeWidth="1" 
                      opacity="0.7" 
                    />
                  ))}
                  
                  {/* Bottom numbers: 0-9 (X axis) */}
                  {Array.from({ length: 10 }, (_, i) => (
                    <text 
                      key={`bottom${i}`} 
                      x={i * 20 + 10} 
                      y="215" 
                      textAnchor="middle" 
                      fill="#a855f7" 
                      fontSize="10"
                      fontWeight="bold"
                    >
                      {i}
                    </text>
                  ))}
                  <text x="210" y="215" textAnchor="start" fill="#a855f7" fontSize="8" fontWeight="bold">X</text>
                  
                  {/* Left side numbers: 0-9 (Y axis, bottom to top) */}
                  {Array.from({ length: 10 }, (_, i) => (
                    <text 
                      key={`left${i}`} 
                      x="-12" 
                      y={190 - i * 20} 
                      textAnchor="middle" 
                      fill="#a855f7" 
                      fontSize="10"
                      fontWeight="bold"
                    >
                      {i}
                    </text>
                  ))}
                  <text x="-12" y="-8" textAnchor="middle" fill="#a855f7" fontSize="8" fontWeight="bold">Y</text>
                  
                  {/* Center point marker */}
                  <circle cx="100" cy="100" r="4" fill="#a855f7" />
                  
                  {/* Drag instruction */}
                  <text x="100" y="-15" fill="#a855f7" fontSize="11" fontWeight="bold" textAnchor="middle">גרור לכל מקום</text>
                  
                  {/* Corner markers for alignment help */}
                  <circle cx="0" cy="0" r="3" fill="#a855f7" opacity="0.8" />
                  <circle cx="200" cy="0" r="3" fill="#a855f7" opacity="0.8" />
                  <circle cx="0" cy="200" r="3" fill="#a855f7" opacity="0.8" />
                  <circle cx="200" cy="200" r="3" fill="#a855f7" opacity="0.8" />
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
        <Link className="flex justify-center mt-8" href="/">
            <button className="px-6 py-2 rounded-lg bg-gradient-to-r from-pink-400 to-purple-500 text-white font-bold shadow hover:from-pink-500 hover:to-purple-600 transition" onClick={()=>dispatch(setCurrentExcersice(1))}>עבור  למסך הבית </button>
            </Link>
    </div>
  );
}