"use client";
import { useState, useRef, useEffect } from 'react';


import { useDispatch } from 'react-redux';
import { setCurrentExcersice } from '../store/excersiceSlice';
import Link from 'next/link';

const COLS = 3;
const ROWS = 2;
const BASE_X_MIN = 600;
const BASE_X_MAX = 699;
const BASE_Y_MIN = 390;
const BASE_Y_MAX = 420;

export default function CoordinateFindingExercise() {
  const dispatch = useDispatch();

  const generateCoordinate = () => {
    // pick a starting base so the visible window (COLS x ROWS) fits inside allowed range
    const minBaseX = Math.floor(Math.random() * (BASE_X_MAX - BASE_X_MIN - (COLS - 1) + 1)) + BASE_X_MIN;
    const minBaseY = Math.floor(Math.random() * (BASE_Y_MAX - BASE_Y_MIN - (ROWS - 1) + 1)) + BASE_Y_MIN;

    // pick a base cell inside the visible window
    const baseX = minBaseX + Math.floor(Math.random() * COLS); // one of the visible columns
    const baseY = minBaseY + Math.floor(Math.random() * ROWS); // one of the visible rows

    const decimalX = Math.floor(Math.random() * 1000); // 0-999
    const decimalY = Math.floor(Math.random() * 1000);

    const x = baseX * 1000 + decimalX;
    const y = baseY * 1000 + decimalY;

    return {
      x,
      y,
      display: `${String(baseX).padStart(3, "0")}${String(decimalX).padStart(3, "0")}/${String(baseY).padStart(3, "0")}${String(decimalY).padStart(3, "0")}`,
      minBaseX,
      minBaseY
    };
  };

  const initial = generateCoordinate();

  const [targetCoord, setTargetCoord] = useState(initial);
  const [minBaseX, setMinBaseX] = useState(initial.minBaseX);
  const [minBaseY, setMinBaseY] = useState(initial.minBaseY);
  const [userPoint, setUserPoint] = useState(null);
  const [gridPosition, setGridPosition] = useState({ x: 300, y: 300 });
  
  const [step, setStep] = useState(1);
  const [step1Result, setStep1Result] = useState(null);
  const [step2Result, setStep2Result] = useState(null);
  
  const [showGrid, setShowGrid] = useState(true);
  
  const svgRef = useRef(null);
  const [isDragging, setIsDragging] = useState(false);

  // Convert coordinate to pixel position
  const coordToPixel = (coord) => {
    const baseX = Math.floor(coord.x / 1000);
    const decimalX = coord.x % 1000;
    const baseY = Math.floor(coord.y / 1000);
    const decimalY = coord.y % 1000;

    // X position: offset from current minBaseX
    const pixelX = 100 + ((baseX - minBaseX) * 200) + (decimalX / 1000 * 200);

    // Y position: top base is minBaseY + ROWS - 1
    const topBaseY = minBaseY + ROWS - 1;
    const pixelY = 100 + ((topBaseY - baseY) * 200) + ((1000 - decimalY) / 1000 * 200);

    return { x: pixelX, y: pixelY };
  };

  // Check if grid is in correct square (uses minBase states)
  const isGridInCorrectSquare = () => {
    const baseX = Math.floor(targetCoord.x / 1000);
    const baseY = Math.floor(targetCoord.y / 1000);
    
    // Calculate the center of the correct square relative to minBaseX/minBaseY
    const squareLeft = 100 + ((baseX - minBaseX) * 200);
    const topBaseY = minBaseY + ROWS - 1;
    const squareTop = 100 + ((topBaseY - baseY) * 200);
    const squareCenterX = squareLeft + 100;
    const squareCenterY = squareTop + 100;
    
    // Grid bounds (gridPosition is center)
    const gridLeft = gridPosition.x - 100;
    const gridRight = gridPosition.x + 100;
    const gridTop = gridPosition.y - 100;
    const gridBottom = gridPosition.y + 100;
    
    return (
      squareCenterX >= gridLeft &&
      squareCenterX <= gridRight &&
      squareCenterY >= gridTop &&
      squareCenterY <= gridBottom
    );
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
    if (step !== 2 || isDragging) return;
    
    const clientX = e.clientX || (e.touches && e.touches[0].clientX);
    const clientY = e.clientY || (e.touches && e.touches[0].clientY);
    const coords = getSvgCoordinates(clientX, clientY);
    
    setUserPoint({ x: coords.x, y: coords.y });
  };

  const handleGridStart = (e) => {
    if (step !== 1) return;
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

  const handleStep1Submit = () => {
    const isCorrect = isGridInCorrectSquare();
    setStep1Result(isCorrect ? 'correct' : 'incorrect');
    
    if (isCorrect) {
      setTimeout(() => {
        setStep(2);
      }, 1500);
    }
  };

  const handleStep2Submit = () => {
    if (!userPoint) return;
    
    const targetPixel = coordToPixel(targetCoord);
    
    const distance = Math.sqrt(
      Math.pow(userPoint.x - targetPixel.x, 2) + 
      Math.pow(userPoint.y - targetPixel.y, 2)
    );
    
    const isCorrect = distance < 20;
    setStep2Result(isCorrect ? 'correct' : 'incorrect');
  };

  const handleReset = () => {
    const next = generateCoordinate();
    setTargetCoord(next);
    setMinBaseX(next.minBaseX);
    setMinBaseY(next.minBaseY);
    setUserPoint(null);
    setGridPosition({ x: 300, y: 300 });
    setStep(1);
    setStep1Result(null);
    setStep2Result(null);
    setShowGrid(true);
  };

  const targetPixel = coordToPixel(targetCoord);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 p-2 sm:p-4">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-xl sm:text-2xl md:text-3xl font-bold mb-4 sm:mb-6 text-center bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
          תרגיל מציאת נקודה לפי נ.צ
        </h1>
        
        <div className="mb-4 sm:mb-6 flex justify-center gap-2" dir="rtl">
          <div className={`px-4 py-2 rounded-lg font-bold ${
            step === 1 ? 'bg-cyan-500 text-white' : step === 2 ? 'bg-green-500 text-white' : 'bg-slate-700 text-gray-400'
          }`}>
            שלב 1: מיקום הרשת
          </div>
          <div className={`px-4 py-2 rounded-lg font-bold ${
            step === 2 ? 'bg-cyan-500 text-white' : 'bg-slate-700 text-gray-400'
          }`}>
            שלב 2: סימון הנקודה
          </div>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6">
          <div className="bg-black/40 backdrop-blur-sm border border-purple-500/30 p-3 sm:p-4 rounded-xl">
            <h2 className="text-lg sm:text-xl font-bold text-cyan-400 mb-2 sm:mb-3">הוראות</h2>
            
            {step === 1 && (
              <div dir="rtl" className="space-y-3">
                <div className="bg-cyan-900/30 border border-cyan-500/30 p-3 rounded-lg">
                  <h3 className="text-cyan-300 font-bold mb-2">שלב 1: גרור את הרשת לריבוע הנכון</h3>
                  <ol className="text-gray-200 space-y-1.5 text-xs sm:text-sm">
                    <li className="flex gap-2">
                      <span className="bg-cyan-500 rounded-full w-5 h-5 flex items-center justify-center flex-shrink-0 text-xs">1</span>
                      <span>קרא את 3 הספרות הראשונות של הנ.צ</span>
                    </li>
                    <li className="flex gap-2">
                      <span className="bg-cyan-500 rounded-full w-5 h-5 flex items-center justify-center flex-shrink-0 text-xs">2</span>
                      <span>מצא את הריבוע המתאים על המפה</span>
                    </li>
                    <li className="flex gap-2">
                      <span className="bg-cyan-500 rounded-full w-5 h-5 flex items-center justify-center flex-shrink-0 text-xs">3</span>
                      <span>גרור את הרשת הסגולה כך שתתאים בדיוק לריבוע</span>
                    </li>
                  </ol>
                </div>
              </div>
            )}
            
            {step === 2 && (
              <div dir="rtl" className="space-y-3">
                <div className="bg-purple-900/30 border border-purple-500/30 p-3 rounded-lg">
                  <h3 className="text-purple-300 font-bold mb-2">שלב 2: סמן את הנקודה המדויקת</h3>
                  <ol className="text-gray-200 space-y-1.5 text-xs sm:text-sm">
                    <li className="flex gap-2">
                      <span className="bg-purple-500 rounded-full w-5 h-5 flex items-center justify-center flex-shrink-0 text-xs">1</span>
                      <span>הסתכל על 3 הספרות האחרונות של הנ.צ</span>
                    </li>
                    <li className="flex gap-2">
                      <span className="bg-purple-500 rounded-full w-5 h-5 flex items-center justify-center flex-shrink-0 text-xs">2</span>
                      <span>השתמש ברשת כדי למצוא את המיקום המדויק</span>
                    </li>
                    <li className="flex gap-2">
                      <span className="bg-purple-500 rounded-full w-5 h-5 flex items-center justify-center flex-shrink-0 text-xs">3</span>
                      <span>לחץ על הנקודה הנכונה על המפה</span>
                    </li>
                  </ol>
                </div>
              </div>
            )}
            
            <div className="mt-4 sm:mt-6 p-3 sm:p-4 bg-purple-900/30 border border-purple-500/30 rounded-lg">
              <h3 className="text-base sm:text-lg font-bold text-purple-400 mb-1 sm:mb-2 text-center" dir="rtl">הנ.צ למציאה:</h3>
              <p className="text-2xl sm:text-3xl font-bold text-center text-cyan-300 font-mono" dir="ltr">
                {targetCoord.display}
              </p>
            </div>

            <div className="mt-3 sm:mt-4 flex gap-2">
              {step === 1 && (
                <button
                  onClick={handleStep1Submit}
                  className="flex-1 bg-gradient-to-r from-cyan-500 to-blue-500 text-white font-bold py-2 px-3 sm:px-4 rounded-lg hover:opacity-90 text-xs sm:text-base"
                >
                  בדוק מיקום רשת
                </button>
              )}
              
              {step === 2 && (
                <button
                  onClick={handleStep2Submit}
                  disabled={!userPoint || step2Result !== null}
                  className="flex-1 bg-gradient-to-r from-purple-500 to-pink-500 text-white font-bold py-2 px-3 sm:px-4 rounded-lg hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed text-xs sm:text-base"
                >
                  בדוק נקודה
                </button>
              )}
              
              <button
                onClick={handleReset}
                className="flex-1 bg-slate-700 text-white font-bold py-2 px-3 sm:px-4 rounded-lg hover:bg-slate-600 text-xs sm:text-base"
              >
                נ.צ חדש
              </button>
            </div>
            
            {step1Result && step === 1 && (
              <div className={`mt-3 sm:mt-4 p-3 sm:p-4 rounded-lg border ${
                step1Result === 'correct'
                  ? 'bg-green-900/30 border-green-500/30' 
                  : 'bg-red-900/30 border-red-500/30'
              }`}>
                <p className={`font-bold text-base sm:text-lg ${step1Result === 'correct' ? 'text-green-400' : 'text-red-400'}`} dir="rtl">
                  {step1Result === 'correct' ? '✓ מצוין! הרשת ממוקמת בריבוע הנכון!' : '✗ הרשת לא בריבוע הנכון'}
                </p>
                {step1Result === 'correct' && (
                  <p className="text-green-300 text-xs sm:text-sm mt-2" dir="rtl">
                    עובר לשלב 2...
                  </p>
                )}
                {step1Result === 'incorrect' && (
                  <p className="text-yellow-300 text-xs sm:text-sm mt-2" dir="rtl">
                    בדוק שוב את 3 הספרות הראשונות של הנ.צ
                  </p>
                )}
              </div>
            )}
            
            {step2Result && step === 2 && (
              <div className={`mt-3 sm:mt-4 p-3 sm:p-4 rounded-lg border ${
                step2Result === 'correct'
                  ? 'bg-green-900/30 border-green-500/30' 
                  : 'bg-red-900/30 border-red-500/30'
              }`}>
                <p className={`font-bold text-base sm:text-lg ${step2Result === 'correct' ? 'text-green-400' : 'text-red-400'}`} dir="rtl">
                  {step2Result === 'correct' ? '✓ מצוין! מצאת את הנקודה הנכונה!' : '✗ לא מדויק מספיק'}
                </p>
                {step2Result === 'incorrect' && (
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
          
          <div className="lg:col-span-2 bg-black/40 backdrop-blur-sm border border-purple-500/30 p-3 sm:p-4 rounded-xl">
            <h2 className="text-lg sm:text-xl font-bold text-purple-400 mb-2 sm:mb-3 text-center">מפה טופוגרפית 1:50,000</h2>
            
            <svg
              ref={svgRef}
              viewBox="0 0 700 600"
              className={`w-full h-auto border-2 border-purple-500/30 rounded-lg bg-gradient-to-br from-green-900/20 to-yellow-900/20 touch-none ${
                step === 2 ? 'cursor-crosshair' : 'cursor-default'
              }`}
              onClick={handleMapClick}
              onTouchStart={handleMapClick}
              style={{ touchAction: 'none', maxHeight: '70vh' }}
            >
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
              
              {/* X labels (columns) */}
              {Array.from({ length: COLS }, (_, i) => (
                <text key={`xLabel${i}`} x={100 + i * 200 + 100} y="90" fill="#67e8f9" fontSize="14" fontWeight="bold" textAnchor="middle">
                  {minBaseX + i}
                </text>
              ))}
              
              {/* Y labels (rows) - top to bottom: maxBaseY .. minBaseY */}
              {(() => {
                const maxBaseY = minBaseY + ROWS - 1;
                return Array.from({ length: ROWS }, (_, i) => (
                  <text key={`yLabel${i}`} x="80" y={100 + i * 200 + 100} fill="#c084fc" fontSize="14" fontWeight="bold" textAnchor="middle">
                    {maxBaseY - i}
                  </text>
                ));
              })()}
              
              {step === 2 && userPoint && (
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
              
              {step === 2 && step2Result === 'incorrect' && userPoint && (
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
              
              {showGrid && (
                <g
                  transform={`translate(${gridPosition.x - 100}, ${gridPosition.y - 100})`}
                  style={{ 
                    cursor: step === 1 ? (isDragging ? 'grabbing' : 'grab') : 'default',
                    touchAction: 'none',
                    opacity: step === 2 ? 0.5 : 1
                  }}
                  onMouseDown={handleGridStart}
                  onTouchStart={handleGridStart}
                >
                  <rect 
                    x="0" 
                    y="0" 
                    width="200" 
                    height="200" 
                    fill="rgba(168,85,247,0.12)" 
                    stroke="#a855f7" 
                    strokeWidth="3"
                  />
                  
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
                  
                  <circle cx="100" cy="100" r="4" fill="#a855f7" />
                  
                  {step === 1 && (
                    <text x="100" y="-15" fill="#a855f7" fontSize="11" fontWeight="bold" textAnchor="middle">גרור לריבוע הנכון</text>
                  )}
                  
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
        <button className="px-6 py-2 rounded-lg bg-gradient-to-r from-pink-400 to-purple-500 text-white font-bold shadow hover:from-pink-500 hover:to-purple-600 transition" onClick={() => dispatch(setCurrentExcersice(1))}>
          עבור למסך הבית
        </button>
      </Link>
    </div>
  );
}