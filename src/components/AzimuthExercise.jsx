"use client";
import { useState, useRef, useEffect } from 'react';

export default function AzimuthExercise() {
  // Exercise configuration
  const [pointA] = useState({ x: 250, y: 350, label: 'A' });
  const [pointB] = useState({ x: 450, y: 200, label: 'B' });
  
  // Calculate correct azimuth
  const calculateAzimuth = (from, to) => {
    const dx = to.x - from.x;
    const dy = from.y - to.y; // Inverted because SVG y increases downward
    let angle = Math.atan2(dx, dy) * (180 / Math.PI);
    if (angle < 0) angle += 360;
    return Math.round(angle);
  };
  
  const correctAzimuth = calculateAzimuth(pointA, pointB);
  
  // Madko state
  const [madkoCenter, setMadkoCenter] = useState({ x: 250, y: 350 });
  const [threadAngle, setThreadAngle] = useState(0);
  const [isDraggingMadko, setIsDraggingMadko] = useState(false);
  const [isDraggingThread, setIsDraggingThread] = useState(false);
  const [userAnswer, setUserAnswer] = useState('');
  const [showResult, setShowResult] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  
  const svgRef = useRef(null);
  
  // Get position relative to SVG (works for both mouse and touch)
  const getSvgCoordinates = (clientX, clientY) => {
    const svg = svgRef.current;
    const pt = svg.createSVGPoint();
    pt.x = clientX;
    pt.y = clientY;
    return pt.matrixTransform(svg.getScreenCTM().inverse());
  };
  
  // Handle madko drag start
  const handleMadkoStart = (e) => {
    e.preventDefault();
    setIsDraggingMadko(true);
  };
  
  // Handle thread drag start
  const handleThreadStart = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDraggingThread(true);
  };
  
  useEffect(() => {
    const handleMove = (e) => {
      const clientX = e.clientX || (e.touches && e.touches[0].clientX);
      const clientY = e.clientY || (e.touches && e.touches[0].clientY);
      
      if (!clientX || !clientY) return;
      
      if (isDraggingMadko) {
        const coords = getSvgCoordinates(clientX, clientY);
        setMadkoCenter({ x: coords.x, y: coords.y });
      } else if (isDraggingThread) {
        const coords = getSvgCoordinates(clientX, clientY);
        const dx = coords.x - madkoCenter.x;
        const dy = madkoCenter.y - coords.y;
        let angle = Math.atan2(dx, dy) * (180 / Math.PI);
        if (angle < 0) angle += 360;
        setThreadAngle(angle);
      }
    };
    
    const handleEnd = () => {
      setIsDraggingMadko(false);
      setIsDraggingThread(false);
    };
    
    if (isDraggingMadko || isDraggingThread) {
      window.addEventListener('mousemove', handleMove);
      window.addEventListener('mouseup', handleEnd);
      window.addEventListener('touchmove', handleMove);
      window.addEventListener('touchend', handleEnd);
      return () => {
        window.removeEventListener('mousemove', handleMove);
        window.removeEventListener('mouseup', handleEnd);
        window.removeEventListener('touchmove', handleMove);
        window.removeEventListener('touchend', handleEnd);
      };
    }
  }, [isDraggingMadko, isDraggingThread, madkoCenter]);
  
  const handleSubmit = () => {
    const answer = parseInt(userAnswer);
    const difference = Math.abs(answer - correctAzimuth);
    const adjustedDiff = Math.min(difference, 360 - difference);
    setIsCorrect(adjustedDiff <= 5);
    setShowResult(true);
  };
  
  const handleReset = () => {
    setMadkoCenter({ x: 250, y: 350 });
    setThreadAngle(0);
    setUserAnswer('');
    setShowResult(false);
    setIsCorrect(false);
  };
  
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 p-4">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold mb-6 text-center bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
          תרגיל מדידת אזימוט
        </h1>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Instructions */}
          <div className="bg-black/40 backdrop-blur-sm border border-purple-500/30 p-4 rounded-xl">
            <h2 className="text-xl font-bold text-cyan-400 mb-3">הוראות</h2>
            <ol className="text-gray-200 space-y-2 text-sm" dir="rtl">
              <li className="flex gap-2">
                <span className="bg-cyan-500 rounded-full w-6 h-6 flex items-center justify-center flex-shrink-0">1</span>
                <span>גרור את המדקו למרכזו על נקודה A (הנקודה הכחולה)</span>
              </li>
              <li className="flex gap-2">
                <span className="bg-purple-500 rounded-full w-6 h-6 flex items-center justify-center flex-shrink-0">2</span>
                <span>גרור את החוט (הקו האדום) כך שיעבור דרך נקודה B (הנקודה הירוקה)</span>
              </li>
              <li className="flex gap-2">
                <span className="bg-pink-500 rounded-full w-6 h-6 flex items-center justify-center flex-shrink-0">3</span>
                <span>קרא את האזימוט ממעגל המדקו והזן את התשובה</span>
              </li>
            </ol>
            
            <div className="mt-4 p-3 bg-yellow-900/30 border border-yellow-500/30 rounded-lg">
              <p className="text-yellow-300 text-sm" dir="rtl">
                <strong>טיפ:</strong> האזימוט נמדד מצפון (0°) בכיוון השעון
              </p>
            </div>
            
            <div className="mt-4">
              <label className="block text-gray-200 mb-2" dir="rtl">מה האזימוט מנקודה A לנקודה B?</label>
              <input
                type="number"
                min="0"
                max="360"
                value={userAnswer}
                onChange={(e) => setUserAnswer(e.target.value)}
                className="w-full bg-slate-800 text-white border border-purple-500/30 rounded-lg px-3 py-2 mb-3"
                placeholder="הזן מספר בין 0-360"
                dir="rtl"
              />
              <div className="flex gap-2">
                <button
                  onClick={handleSubmit}
                  disabled={!userAnswer}
                  className="flex-1 bg-gradient-to-r from-cyan-500 to-purple-500 text-white font-bold py-2 px-4 rounded-lg hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  בדוק תשובה
                </button>
                <button
                  onClick={handleReset}
                  className="flex-1 bg-slate-700 text-white font-bold py-2 px-4 rounded-lg hover:bg-slate-600"
                >
                  אפס
                </button>
              </div>
            </div>
            
            {showResult && (
              <div className={`mt-4 p-4 rounded-lg border ${
                isCorrect 
                  ? 'bg-green-900/30 border-green-500/30' 
                  : 'bg-red-900/30 border-red-500/30'
              }`}>
                <p className={`font-bold text-lg ${isCorrect ? 'text-green-400' : 'text-red-400'}`} dir="rtl">
                  {isCorrect ? '✓ תשובה נכונה!' : '✗ תשובה לא נכונה'}
                </p>
                <p className="text-gray-300 mt-2" dir="rtl">
                  התשובה שלך: {userAnswer}°
                </p>
                <p className="text-gray-300" dir="rtl">
                  התשובה הנכונה: {correctAzimuth}°
                </p>
                {!isCorrect && (
                  <p className="text-yellow-300 text-sm mt-2" dir="rtl">
                    נסה שוב! ודא שהמדקו ממוקם על נקודה A והחוט עובר דרך נקודה B
                  </p>
                )}
              </div>
            )}
          </div>
          
          {/* Map with Madko */}
          <div className="lg:col-span-2 bg-black/40 backdrop-blur-sm border border-purple-500/30 p-4 rounded-xl">
            <h2 className="text-xl font-bold text-purple-400 mb-3 text-center">מפה עם מדקו</h2>
            
            <svg
              ref={svgRef}
              viewBox="0 0 600 500"
              className="w-full border-2 border-purple-500/30 rounded-lg bg-gradient-to-br from-green-900/20 to-yellow-900/20"
            >
              {/* Grid background */}
              <defs>
                <pattern id="grid" width="50" height="50" patternUnits="userSpaceOnUse">
                  <path d="M 50 0 L 0 0 0 50" fill="none" stroke="#22d3ee" strokeWidth="0.5" opacity="0.3" />
                </pattern>
              </defs>
              <rect width="600" height="500" fill="url(#grid)" />
              
              {/* North indicator */}
              <g transform="translate(550, 50)">
                <polygon points="0,-20 -8,0 8,0" fill="#dc2626" />
                <text x="0" y="20" fill="#dc2626" fontSize="16" fontWeight="bold" textAnchor="middle">צפון</text>
              </g>
              
              {/* Point A */}
              <circle cx={pointA.x} cy={pointA.y} r="12" fill="#3b82f6" stroke="#1e40af" strokeWidth="2" />
              <text x={pointA.x} y={pointA.y - 20} fill="#3b82f6" fontSize="20" fontWeight="bold" textAnchor="middle">
                נקודה {pointA.label}
              </text>
              
              {/* Point B */}
              <circle cx={pointB.x} cy={pointB.y} r="12" fill="#10b981" stroke="#065f46" strokeWidth="2" />
              <text x={pointB.x} y={pointB.y - 20} fill="#10b981" fontSize="20" fontWeight="bold" textAnchor="middle">
                נקודה {pointB.label}
              </text>
              
              {/* Madko */}
              <g
                transform={`translate(${madkoCenter.x}, ${madkoCenter.y})`}
                style={{ cursor: isDraggingMadko ? 'grabbing' : 'grab', touchAction: 'none' }}
                onMouseDown={handleMadkoStart}
                onTouchStart={handleMadkoStart}
              >
                {/* Outer circle */}
                <circle r="80" fill="rgba(255,255,255,0.9)" stroke="#333" strokeWidth="2" />
                
                {/* Degree markings */}
                {Array.from({ length: 36 }, (_, i) => {
                  const angle = i * 10;
                  const rad = (angle - 90) * Math.PI / 180;
                  const x1 = Math.cos(rad) * 70;
                  const y1 = Math.sin(rad) * 70;
                  const x2 = Math.cos(rad) * 75;
                  const y2 = Math.sin(rad) * 75;
                  return (
                    <line key={i} x1={x1} y1={y1} x2={x2} y2={y2} stroke="#000" strokeWidth="1" />
                  );
                })}
                
                {/* Degree labels */}
                {[0, 30, 60, 90, 120, 150, 180, 210, 240, 270, 300, 330].map((angle) => {
                  const rad = (angle - 90) * Math.PI / 180;
                  const x = Math.cos(rad) * 60;
                  const y = Math.sin(rad) * 60;
                  return (
                    <text key={angle} x={x} y={y} fill="#000" fontSize="10" textAnchor="middle" dominantBaseline="middle">
                      {angle}°
                    </text>
                  );
                })}
                
                {/* Center point */}
                <circle r="4" fill="#333" />
                
                {/* Thread */}
                <g
                  transform={`rotate(${threadAngle})`}
                  style={{ cursor: isDraggingThread ? 'grabbing' : 'grab', touchAction: 'none' }}
                  onMouseDown={handleThreadStart}
                  onTouchStart={handleThreadStart}
                >
                  <line x1="0" y1="0" x2="0" y2="-150" stroke="#dc2626" strokeWidth="2" />
                  <circle cy="-150" r="5" fill="#dc2626" />
                </g>
                
                {/* Cardinal directions */}
                <text y="-85" fill="#0000FF" fontSize="14" fontWeight="bold" textAnchor="middle">צ</text>
                <text x="85" fill="#0000FF" fontSize="14" fontWeight="bold" textAnchor="middle">מז</text>
                <text y="92" fill="#0000FF" fontSize="14" fontWeight="bold" textAnchor="middle">ד</text>
                <text x="-85" fill="#0000FF" fontSize="14" fontWeight="bold" textAnchor="middle">מע</text>
              </g>
              
              {/* Current thread angle display */}
              <g transform="translate(20, 460)">
                <rect width="200" height="30" fill="rgba(0,0,0,0.7)" rx="5" />
                <text x="100" y="20" fill="#fff" fontSize="14" textAnchor="middle">
                  זווית נוכחית: {Math.round(threadAngle)}°
                </text>
              </g>
            </svg>
            
            <div className="mt-3 text-sm text-gray-300 text-center" dir="rtl">
              גרור את המדקו והחוט למיקום הנכון
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}