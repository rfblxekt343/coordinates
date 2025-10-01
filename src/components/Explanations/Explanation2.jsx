'use client';
import { useState } from 'react';
import BackAndForthButtons from '../ui/BackAndForthButtons';

export default function Explanation2() {
    const [activeSection, setActiveSection] = useState(null);

    return (
        <div className="max-w-4xl mx-auto p-4">
            <h1 className="text-2xl sm:text-3xl font-bold mb-6 text-center bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
                מד קואורדינטות(מדקו)
            </h1>

            <div className="bg-black/40 backdrop-blur-sm border border-purple-500/30 p-4 sm:p-6 rounded-2xl shadow-lg mb-6">
                <p className="text-base sm:text-lg leading-relaxed text-gray-200 mb-4">
                    <strong className="text-cyan-400">המדקו</strong> - כרטיס פלסטיק שבשילוב עם רשת הקואורדינטות מאפשר לנו להוציא נ.צ
                    (עד לדיוק של עשרות מטרים), למדוד כיוונים ולאמוד מרחקים.
                </p>
            </div>

            {/* Interactive Madko Visualization */}
            <div className="bg-black/30 backdrop-blur-sm border border-purple-500/30 p-4 sm:p-6 rounded-2xl shadow-lg mb-6">
                {/* <h2 className="text-xl sm:text-2xl font-bold mb-4 text-center text-cyan-400">המדקו האינטראקטיבי</h2> */}
                <div className="text-center text-gray-400 text-sm">
                    <p>לחץ על כל חלק במדקו כדי לקבל הסבר מפורט</p>
                </div>
                <div className="flex justify-center mb-6">
                    <svg width="450" viewBox="0 0 450 650" className="max-w-full border border-purple-500/30 rounded-lg bg-gradient-to-br from-gray-50 to-gray-100 shadow-2xl">
                        {/* Background - Light military style */}
                        <defs>
                            <linearGradient id="bgGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                                <stop offset="0%" style={{ stopColor: "#f8fafc", stopOpacity: 1 }} />
                                <stop offset="100%" style={{ stopColor: "#e2e8f0", stopOpacity: 1 }} />
                            </linearGradient>
                            <linearGradient id="compassGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                                <stop offset="0%" style={{ stopColor: "#ffffff", stopOpacity: 1 }} />
                                <stop offset="100%" style={{ stopColor: "#f1f5f9", stopOpacity: 1 }} />
                            </linearGradient>
                        </defs>
                        <rect width="450" height="650" fill="url(#bgGrad)" stroke="#1e293b" strokeWidth="2" rx="5" />



                        {/* Instructions header */}
                        <g>
                            <text x="430" y="25" textAnchor="start" fill="#0f172a" fontSize="9" fontWeight="bold">סדר קריאה מפות ועזרי שליטה:</text>
                            <text x="430" y="38" textAnchor="start" fill="#0f172a" fontSize="8">1. שם האריח</text>
                            <text x="430" y="50" textAnchor="start" fill="#0f172a" fontSize="8">2. ציר ה-X (ספרת קו רוחב)</text>
                            <text x="430" y="62" textAnchor="start" fill="#0f172a" fontSize="8">3. ציר ה-Y (ספרת קו אורך)</text>
                        </g>


                        {/* Direction arrows and grid example */}
                        <g>
                            <rect x="400" y="90" width="20" height="20" fill="none" stroke="#0f172a" strokeWidth="1" />
                            <rect x="420" y="90" width="20" height="20" fill="none" stroke="#0f172a" strokeWidth="1" />
                            <rect x="400" y="110" width="20" height="20" fill="none" stroke="#0f172a" strokeWidth="1" />
                            <rect x="420" y="110" width="20" height="20" fill="none" stroke="#0f172a" strokeWidth="1" />

                            <text x="380" y="95" textAnchor="middle" fill="#0f172a" fontSize="12" fontWeight="bold">Y</text>
                            <polygon points="355,125 350,115 360,115" fill="#0f172a" transform="translate(25, -15)" />
                            <text x="370" y="120" textAnchor="middle" fill="#0f172a" fontSize="9" fontWeight="bold">מדרום לצפון</text>

                            <text x="420" y="150" textAnchor="middle" fill="#0f172a" fontSize="12" fontWeight="bold">X</text>
                            <polygon points="380,175 390,180 380,185" fill="#0f172a" transform="translate(50, -35)" />
                            <text x="410" y="165" textAnchor="middle" fill="#0f172a" fontSize="9" fontWeight="bold">ממזרח למערב</text>
                        </g>

                        {/* Top Grid Sections - 50,000 Y (Left) */}
                        <g className="cursor-pointer" onClick={() => setActiveSection('grid1')}>
                            <rect x="20" y="40" width="70" height="70" fill="rgba(59,130,246,0.1)" stroke="#3b82f6" strokeWidth="2" opacity={activeSection === 'grid1' ? 1 : 0.8} />

                            {/* Vertical grid lines - 10 divisions */}
                            {Array.from({ length: 11 }, (_, i) => (
                                <line key={`v${i}`} x1={20 + i * 7} y1="40" x2={20 + i * 7} y2="110" stroke="#3b82f6" strokeWidth="0.5" opacity="0.7" />
                            ))}

                            {/* Horizontal grid lines - 10 divisions */}
                            {Array.from({ length: 11 }, (_, i) => (
                                <line key={`h${i}`} x1="20" y1={40 + i * 7} x2="90" y2={40 + i * 7} stroke="#3b82f6" strokeWidth="0.5" opacity="0.7" />
                            ))}

                            {/* Bottom numbers: 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 50,000 */}
                            {Array.from({ length: 10 }, (_, i) => (
                                <text key={`bottom${i}`} x={20 + i * 7} y="125" textAnchor="middle" fill="#1e40af" fontSize="6">{i}</text>
                            ))}
                            <text x="100" y="125" textAnchor="middle" fill="#1e40af" fontSize="6" fontWeight="bold" direction="ltr">50,000 X</text>

                            {/* Left side numbers: 0, 1, 2, 3, 4, 5, 6, 7, 8, 9 (bottom to top) */}
                            {Array.from({ length: 10 }, (_, i) => (
                                <text key={`left${i}`} x="15" y={115 - i * 7} textAnchor="middle" fill="#1e40af" fontSize="6">{i}</text>
                            ))}
                            <text x="20" y="35" textAnchor="middle" fill="#1e40af" fontSize="6" fontWeight="bold" direction="ltr">50,000 Y</text>



                        </g>

                        {/* 3,000 Y Grid (Right) */}
                        <g className="cursor-pointer" onClick={() => setActiveSection('grid2')}>
                            <rect x="150" y="20" width="100" height="100" fill="rgba(168,85,247,0.1)" stroke="#a855f7" strokeWidth="2" opacity={activeSection === 'grid2' ? 1 : 0.8} />

                            {/* Vertical grid lines - 10 divisions */}
                            {Array.from({ length: 11 }, (_, i) => (
                                <line key={`v${i}`} x1={150 + i * 10} y1="20" x2={150 + i * 10} y2="120" stroke="#a855f7" strokeWidth="0.5" opacity="0.7" />
                            ))}

                            {/* Horizontal grid lines - 10 divisions */}
                            {Array.from({ length: 11 }, (_, i) => (
                                <line key={`h${i}`} x1="150" y1={20 + i * 10} x2="250" y2={20 + i * 10} stroke="#a855f7" strokeWidth="0.5" opacity="0.7" />
                            ))}

                            {/* Bottom numbers: 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 3,000 */}
                            {Array.from({ length: 10 }, (_, i) => (
                                <text key={`bottom${i}`} x={150 + i * 10} y="135" textAnchor="middle" fill="#7c3aed" fontSize="6">{i}</text>
                            ))}
                            <text x="260" y="135" textAnchor="middle" fill="#7c3aed" fontSize="6" fontWeight="bold" direction="ltr">3,000 X</text>

                            {/* Left side numbers: 0, 1, 2, 3, 4, 5, 6, 7, 8, 9 (bottom to top) */}
                            {Array.from({ length: 10 }, (_, i) => (
                                <text key={`left${i}`} x="145" y={125 - i * 10} textAnchor="middle" fill="#7c3aed" fontSize="6">{i}</text>
                            ))}

                            <text x="150" y="15" textAnchor="middle" fill="#7c3aed" fontSize="6" fontWeight="bold" direction="ltr">3,000 Y</text>
                        </g>





                        {/* 20,000 y scale */}
                        <g transform="translate(25, 120) scale(0.9)" >
                            {/* Vertical part of L */}
                            <rect x="25" y="200" width="10" height="200" fill="rgba(239,68,68,0.1)" stroke="#ef4444" strokeWidth="1.5" />

                            {/* Horizontal part of L */}
                            <rect x="25" y="390" width="180" height="10" fill="rgba(239,68,68,0.1)" stroke="#ef4444" strokeWidth="1.5" />

                            {/* Vertical tick marks and numbers (0–9) */}
                            {Array.from({ length: 11 }, (_, i) => (
                                <g key={`left-major-${i}`}>
                                    <line x1="25" y1={200 + i * 20} x2="35" y2={200 + i * 20} stroke="#ef4444" strokeWidth="1.5" />
                                    {i !== 0 && (
                                        <text x="20" y={204 + i * 20} textAnchor="end" fill="#dc2626" fontSize="8" fontWeight="bold">
                                            {10 - i}
                                        </text>
                                    )}
                                </g>
                            ))}

                            {/* Horizontal tick marks and numbers (0–9) */}
                            {Array.from({ length: 10 }, (_, i) => (
                                <g key={`bottom-major-${i}`}>
                                    <line x1={25 + i * 20} y1="390" x2={25 + i * 20} y2="400" stroke="#ef4444" strokeWidth="1.5" />
                                    {i !== 0 && (
                                        <text x={25 + i * 20} y="415" textAnchor="middle" fill="#dc2626" fontSize="8" fontWeight="bold">
                                            {i}
                                        </text>
                                    )}
                                </g>
                            ))}

                            {/* Axis label */}
                            <text x="40" y="190" textAnchor="middle" fill="#dc2626" fontSize="8" fontWeight="bold" direction="ltr">
                                20000 Y
                            </text>
                            <text x="230" y="415" textAnchor="middle" fill="#dc2626" fontSize="8" fontWeight="bold" direction="ltr">
                                20000 X
                            </text>
                        </g>













                        {/* 1 km Scale (Bottom Left) */}
                        <g className="cursor-pointer" onClick={() => setActiveSection('kmScale')}>
                            <rect x="25" y="200" width="15" height="300" fill="rgba(239,68,68,0.1)" stroke="#ef4444" strokeWidth="2" />
                            {/* Major tick marks and numbers (0-9, hiding 10) */}
                            {Array.from({ length: 11 }, (_, i) => (
                                <g key={`left-major-${i}`}>
                                    <line x1="25" y1={200 + i * 30} x2="40" y2={200 + i * 30} stroke="#ef4444" strokeWidth="2" />
                                    {i !== 0 && ( // Only show text if i is not 0 (which corresponds to number 10)
                                        <text x="15" y={205 + i * 30} textAnchor="end" fill="#dc2626" fontSize="10" fontWeight="bold">{10 - i}</text>
                                    )}
                                </g>
                            ))}
                            <text x="35" y="190" textAnchor="middle" fill="#dc2626" fontSize="10" fontWeight="bold" direction="ltr">1000 Y</text>
                            {/* Minor tick marks (10 divisions between each major number) */}
                            {Array.from({ length: 10 }, (_, i) => (
                                <g key={`left-minor-${i}`}>
                                    {Array.from({ length: 9 }, (_, j) => (
                                        <line
                                            key={j}
                                            x1="30"
                                            y1={200 + i * 30 + (j + 1) * 3}
                                            x2="40"
                                            y2={200 + i * 30 + (j + 1) * 3}
                                            stroke="#ef4444"
                                            strokeWidth="0.5"
                                        />
                                    ))}
                                </g>
                            ))}
                        </g>

                        <g>
                            <rect x="40" y="500" width="300" height="15" fill="rgba(239,68,68,0.1)" stroke="#ef4444" strokeWidth="2" />

                            {/* Major tick marks and numbers (0-10) */}
                            {Array.from({ length: 10 }, (_, i) => (
                                <g key={`bottom-major-${i}`}>
                                    <line x1={40 + i * 30} y1="500" x2={40 + i * 30} y2="515" stroke="#ef4444" strokeWidth="2" />
                                    <text x={40 + i * 30} y="530" textAnchor="middle" fill="#dc2626" fontSize="10" fontWeight="bold">{i}</text>
                                </g>
                            ))}
                            <text x="350" y="530" textAnchor="middle" fill="#dc2626" fontSize="10" fontWeight="bold" direction="ltr">1000 X</text>

                            {/* Minor tick marks (10 divisions between each major number) */}
                            {Array.from({ length: 10 }, (_, i) => (
                                <g key={`bottom-minor-${i}`}>
                                    {Array.from({ length: 9 }, (_, j) => (
                                        <line
                                            key={j}
                                            x1={40 + i * 30 + (j + 1) * 3}
                                            y1="505"
                                            x2={40 + i * 30 + (j + 1) * 3}
                                            y2="515"
                                            stroke="#ef4444"
                                            strokeWidth="0.5"
                                        />
                                    ))}
                                </g>
                            ))}
                        </g>

                        {/* 8 cm ruler right */}
                        <g className="cursor-pointer" onClick={() => setActiveSection('decimalScale')}>
                            <rect x="420" y="200" width="15" height="270" fill="rgba(239,68,68,0.1)" stroke="#FF8C00" strokeWidth="2" />

                            {/* Major tick marks and numbers (0-8) */}
                            {Array.from({ length: 9 }, (_, i) => (
                                <g key={`major-${i}`}>
                                    <line x1="420" y1={200 + i * 33.75} x2="435" y2={200 + i * 33.75} stroke="#FF8C00" strokeWidth="2" />
                                    <text x="410" y={205 + i * 33.75} textAnchor="start" fill="#FF8C00" fontSize="10" fontWeight="bold">{8 - i}</text>
                                </g>
                            ))}
                            <text x="430" y="490" textAnchor="middle" fill="#FF8C00" fontSize="10" fontWeight="bold">ס"מ</text>
                            {/* Minor tick marks (between major numbers) */}
                            {Array.from({ length: 8 }, (_, i) => (
                                <g key={`minor-${i}`}>
                                    {/* Half marks (middle between numbers) */}
                                    <line x1="420" y1={200 + (i + 0.5) * 33.75} x2="430" y2={200 + (i + 0.5) * 33.75} stroke="#FF8C00" strokeWidth="1" />

                                    {/* Quarter marks */}
                                    <line x1="420" y1={200 + (i + 0.25) * 33.75} x2="427" y2={200 + (i + 0.25) * 33.75} stroke="#FF8C00" strokeWidth="0.5" />
                                    <line x1="420" y1={200 + (i + 0.75) * 33.75} x2="427" y2={200 + (i + 0.75) * 33.75} stroke="#FF8C00" strokeWidth="0.5" />

                                    {/* Eighth marks */}
                                    {[0.125, 0.375, 0.625, 0.875].map(fraction => (
                                        <line key={fraction} x1="420" y1={200 + (i + fraction) * 33.75} x2="425" y2={200 + (i + fraction) * 33.75} stroke="#FF8C00" strokeWidth="0.5" />
                                    ))}
                                </g>
                            ))}
                        </g>



                        {/* Main Compass Circle */}
                        <svg width="90%" height="90%" viewBox="-40 -30 500 500" xmlns="http://www.w3.org/2000/svg"className="cursor-pointer" onClick={() => setActiveSection('compass')} >
                            {/* Define reusable elements and styles */}
                            <defs>
                                {/* Curved paths for text */}
                                <path id="milsCurve" d="M 100, 250 A 150,150 0 0,1 400,250" fill="none" />
                                <path id="degreesCurve" d="M 140, 250 A 110,110 0 0,1 360,250" fill="none" />

                                {/* Gradients for 3D effect */}
                                <radialGradient id="compassFace" cx="0.3" cy="0.3">
                                    <stop offset="0%" stopColor="#ffffff" />
                                    <stop offset="100%" stopColor="#f0f0f0" />
                                </radialGradient>

                                <linearGradient id="starGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                                    <stop offset="0%" stopColor="#333333" />
                                    <stop offset="50%" stopColor="#666666" />
                                    <stop offset="100%" stopColor="#ffffff" />
                                </linearGradient>

                                {/* Styles */}
                                <style>{`
          .compass-face { fill: url(#compassFace); stroke: #333; stroke-width: 2; }
          .ring-border { fill: none; stroke: #333; stroke-width: 1; }
          .major-tick { stroke: #000; stroke-width: 1.5; }
          .minor-tick { stroke: #000; stroke-width: 0.75; }
          .degree-major { stroke: #000; stroke-width: 1; }
          .degree-minor { stroke: #000; stroke-width: 0.5; }
          .mil-label { fill: #000; font-size: 12px; font-weight: 500; font-family: Arial, sans-serif; text-anchor: middle; dominant-baseline: middle; }
          .degree-label { fill: #000; font-size: 9px; font-weight: 500; font-family: Arial, sans-serif; text-anchor: middle; dominant-baseline: middle; }
          .cardinal-letter { fill: #000; font-size: 24px; font-family: serif; font-weight: bold; text-anchor: middle; dominant-baseline: middle; }
          .curved-label { font-size: 14px; font-weight: bold; letter-spacing: 2px; fill: #333; }
          .curved-label-small { font-size: 12px; font-weight: bold; letter-spacing: 2px; fill: #333; }
          .star-black { fill: #000; }
          .star-white { fill: #fff; stroke: #000; stroke-width: 0.5; }
        `}</style>
                            </defs>

                            {/* Main compass container */}
                            <g id="compass" transform="translate(250, 250)">

                                {/* Outer compass face */}
                                <circle r="180" className="compass-face" />

                                {/* Mils scale (0-6400) */}
                                <g id="mils-scale">
                                    {/* Generate mil tick marks */}
                                    <g id="mil-ticks">
                                        {/* Major marks every 200 mils */}
                                        <g className="major-ticks">
                                            {[0, 11.25, 22.5, 33.75, 45, 56.25, 67.5, 78.75, 90, 101.25, 112.5, 123.75, 135, 146.25, 157.5, 168.75, 180, 191.25, 202.5, 213.75, 225, 236.25, 247.5, 258.75, 270, 281.25, 292.5, 303.75, 315, 326.25, 337.5, 348.75].map((angle, i) => (
                                                <line key={i} x1="0" y1="-180" x2="0" y2="-165" className="major-tick" transform={`rotate(${angle})`} />
                                            ))}
                                        </g>
                                    </g>

                                    {/* Mil labels */}
                                    <g id="mil-labels">
                                        {[
                                            { angle: 0, label: "0" },
                                            { angle: 11.25, label: "200" },
                                            { angle: 22.5, label: "400" },
                                            { angle: 33.75, label: "600" },
                                            { angle: 45, label: "800" },
                                            { angle: 56.25, label: "1000" },
                                            { angle: 67.5, label: "1200" },
                                            { angle: 78.75, label: "1400" },
                                            { angle: 90, label: "1600" },
                                            { angle: 101.25, label: "1800" },
                                            { angle: 112.5, label: "2000" },
                                            { angle: 123.75, label: "2200" },
                                            { angle: 135, label: "2400" },
                                            { angle: 146.25, label: "2600" },
                                            { angle: 157.5, label: "2800" },
                                            { angle: 168.75, label: "3000" },
                                            { angle: 180, label: "3200" },
                                            { angle: 191.25, label: "3400" },
                                            { angle: 202.5, label: "3600" },
                                            { angle: 213.75, label: "3800" },
                                            { angle: 225, label: "4000" },
                                            { angle: 236.25, label: "4200" },
                                            { angle: 247.5, label: "4400" },
                                            { angle: 258.75, label: "4600" },
                                            { angle: 270, label: "4800" },
                                            { angle: 281.25, label: "5000" },
                                            { angle: 292.5, label: "5200" },
                                            { angle: 303.75, label: "5400" },
                                            { angle: 315, label: "5600" },
                                            { angle: 326.25, label: "5800" },
                                            { angle: 337.5, label: "6000" },
                                            { angle: 348.75, label: "6200" }
                                        ].map((item, i) => (
                                            <text key={i} x="0" y="-152" className="mil-label" transform={`rotate(${item.angle})`}>
                                                {item.label}
                                            </text>
                                        ))}
                                    </g>
                                </g>

                                {/* Degrees scale (0-360) */}
                                <g id="degrees-scale">
                                    {/* Degree ring border */}
                                    <circle r="135" className="ring-border" />

                                    {/* Degree labels (every 30 degrees) */}
                                    <g id="degree-labels">
                                        {[0, 30, 60, 90, 120, 150, 180, 210, 240, 270, 300, 330].map((angle, i) => (
                                            <text key={i} x="0" y="-115" className="degree-label" transform={`rotate(${angle})`}>
                                                {angle}°
                                            </text>
                                        ))}
                                    </g>

                                    {/* Degree tick marks */}
                                    <g id="degree-ticks">
                                        {/* Major ticks every 10 degrees */}
                                        <g className="degree-major-ticks">
                                            {Array.from({ length: 36 }, (_, i) => i * 10).map((angle, i) => (
                                                <line key={i} x1="0" y1="-135" x2="0" y2="-125" className="degree-major" transform={`rotate(${angle})`} />
                                            ))}
                                        </g>
                                    </g>
                                </g>

                                {/* 8-point compass rose */}
                                <g id="compass-rose">
                                    {[
                                        { angle: 0, size: 100 }, // North
                                        { angle: 45, size: 70 }, // Northeast
                                        { angle: 90, size: 100 }, // East
                                        { angle: 135, size: 70 }, // Southeast
                                        { angle: 180, size: 100 }, // South
                                        { angle: 225, size: 70 }, // Southwest
                                        { angle: 270, size: 100 }, // West
                                        { angle: 315, size: 70 } // Northwest
                                    ].map((point, i) => {
                                        const width = point.size === 100 ? 15 : 10;
                                        const innerHeight = point.size === 100 ? 20 : 14;
                                        return (
                                            <g key={i} transform={`rotate(${point.angle})`}>
                                                <polygon points={`0,0 -${width},-${innerHeight} 0,-${point.size} ${width},-${innerHeight}`} className="star-black" />
                                                <polygon points={`0,0 ${width},-${innerHeight} 0,-${point.size}`} className="star-white" />
                                            </g>
                                        );
                                    })}
                                </g>

                                {/* Cardinal direction letters in Hebrew */}
                                <g id="cardinal-letters" fill="#0000FF">
                                    <text  x="0" y="-90" className="cardinal-letter" >צפון</text> {/* North */}
                                    <text x="105" y="20" className="cardinal-letter" transform={`rotate(90, 105, 0)`}>מזרח</text> {/* East */}
                                    <text x="0" y="90" className="cardinal-letter" >דרום</text> {/* South */}
                                    <text x="-105" y="20" className="cardinal-letter" transform={`rotate(270, -105, 0)`}>מערב</text> {/* West */}
                                </g>
                            </g>

                            {/* Curved text labels (positioned relative to original coordinates) */}
                            <text className="curved-label" dy="-40">
                                <textPath href="#milsCurve" startOffset="50%" textAnchor="middle" >
                                    א ל פ י ו ת
                                </textPath>
                            </text>

                            <text className="curved-label-small" dy="20">
                                <textPath href="#degreesCurve" startOffset="75%" textAnchor="middle">
                                    מ ע ל ו ת
                                </textPath>
                            </text>
                        </svg>



                    </svg>
                </div>

                {/* Interactive Information Panel */}
                {activeSection && (
                    <div className="bg-slate-800/70 backdrop-blur-sm border border-cyan-500/40 p-4 rounded-xl mb-4 transition-all duration-300">
                        {activeSection === 'grid1' && (
                            <div>
                                <h3 className="text-lg font-bold text-cyan-400 mb-2">רשת 50,000</h3>
                                <p className="text-gray-200">רשת גדולה למדידות כלליות ואיתור מיקומים על המפה בקנה מידה רחב.</p>
                            </div>
                        )}
                        {activeSection === 'grid2' && (
                            <div>
                                <h3 className="text-lg font-bold text-purple-400 mb-2">רשת 3,000</h3>
                                <p className="text-gray-200">רשת עדינה יותר למדידות מדויקות ואיתור נקודות ברזולוציה גבוהה.</p>
                            </div>
                        )}
                        {activeSection === 'kmScale' && (
                            <div>
                                <h3 className="text-lg font-bold text-emerald-400 mb-2">סרגל ק"מ</h3>
                                <p className="text-gray-200">מאפשר למדוד מרחק בין שתי נקודות על המפה. במקרה שלנו ישמש למדידת ציר.</p>
                                <div className="mt-2 text-sm text-emerald-300">
                                    <strong>שימוש:</strong> הנח את הסרגל בין שתי נקודות וקרא את המרחק בקילומטרים.
                                </div>
                            </div>
                        )}
                        {activeSection === 'decimalScale' && (
                            <div>
                                <h3 className="text-lg font-bold text-yellow-400 mb-2">סרגל נקודה עשרונית</h3>
                                <p className="text-gray-200">מאפשר לנו למדוד את המרחק לרמת עשרות מטרים - יעזור לנו למצוא את הנ.צ.</p>
                                <div className="mt-2 text-sm text-yellow-300">
                                    <strong>דיוק:</strong> עד עשרות מטרים - חיוני לקביעת נקודות ציון מדויקות.
                                </div>
                            </div>
                        )}
                        {activeSection === 'compass' && (
                            <div>
                                <h3 className="text-lg font-bold text-red-400 mb-2">עיגול האזימוטים</h3>
                                <p className="text-gray-200">מאפשר למצוא זוויות ואזימוטים בין נקודות על המפה. יעזור לנו בבניית הציר וכתיבת סיפור דרך.</p>
                                <div className="mt-2 text-sm text-red-300">
                                    <strong>מדידת כיוונים:</strong> 0°-360° מצפון בכיוון השעון. כולל עיגולי מרחק למדידה מדויקת.
                                </div>
                            </div>
                        )}
                    </div>
                )}


            </div>

            {/* Detailed Components Explanation */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                <div className="bg-black/30 backdrop-blur-sm border border-emerald-500/30 p-4 rounded-xl">
                    <div className="flex items-center gap-2 mb-3">
                        <div className="w-4 h-4 bg-emerald-400 rounded"></div>
                        <h3 className="text-lg font-bold text-emerald-400">סרגל ק"מ</h3>
                    </div>
                    <p className="text-gray-300 text-sm mb-3">למדידת מרחקים בין נקודות על המפה</p>
                    <ul className="text-xs text-gray-400 space-y-1">
                        <li>• מדידת מרחקי ציר</li>
                        <li>• תכנון מסלולים</li>
                        <li>• הערכת זמני נסיעה</li>
                    </ul>
                </div>

                <div className="bg-black/30 backdrop-blur-sm border border-yellow-500/30 p-4 rounded-xl">
                    <div className="flex items-center gap-2 mb-3">
                        <div className="w-4 h-4 bg-yellow-400 rounded"></div>
                        <h3 className="text-lg font-bold text-yellow-400">נקודה עשרונית</h3>
                    </div>
                    <p className="text-gray-300 text-sm mb-3">למדידה מדויקת עד עשרות מטרים</p>
                    <ul className="text-xs text-gray-400 space-y-1">
                        <li>• קביעת נ.צ מדויקות</li>
                        <li>• איתור נקודות קטנות</li>
                        <li>• מדידות עדינות</li>
                    </ul>
                </div>

                <div className="bg-black/30 backdrop-blur-sm border border-red-500/30 p-4 rounded-xl">
                    <div className="flex items-center gap-2 mb-3">
                        <div className="w-4 h-4 bg-red-400 rounded-full"></div>
                        <h3 className="text-lg font-bold text-red-400">עיגול אזימוטים</h3>
                    </div>
                    <p className="text-gray-300 text-sm mb-3">למדידת כיוונים וזוויות</p>
                    <ul className="text-xs text-gray-400 space-y-1">
                        <li>• קביעת כיווני התקדמות</li>
                        <li>• מדידת אזימוטים</li>
                        <li>• בניית צירי תנועה</li>
                    </ul>
                </div>
            </div>

            {/* Usage Instructions */}
            <div className="bg-black/30 backdrop-blur-sm border border-purple-500/30 p-4 sm:p-6 rounded-2xl shadow-lg">
                <h2 className="text-xl sm:text-2xl font-bold mb-4 text-center text-pink-400">איך משתמשים במדקו?</h2>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="bg-slate-800/50 backdrop-blur-sm border border-cyan-500/30 p-4 rounded-xl">
                        <h3 className="text-lg font-bold mb-3 text-cyan-400">מדידת מרחקים</h3>
                        <ol className="text-gray-300 text-sm space-y-2">
                            <li className="flex gap-2">
                                <span className="bg-cyan-500 text-white rounded-full w-5 h-5 text-xs flex items-center justify-center font-bold">1</span>
                                הנח את תחילת הסרגל על נקודת המוצא
                            </li>
                            <li className="flex gap-2">
                                <span className="bg-cyan-500 text-white rounded-full w-5 h-5 text-xs flex items-center justify-center font-bold">2</span>
                                מתח את הסרגל לכיוון נקודת היעד
                            </li>
                            <li className="flex gap-2">
                                <span className="bg-cyan-500 text-white rounded-full w-5 h-5 text-xs flex items-center justify-center font-bold">3</span>
                                קרא את המרחק בק"מ
                            </li>
                        </ol>
                    </div>

                    <div className="bg-slate-800/50 backdrop-blur-sm border border-red-500/30 p-4 rounded-xl">
                        <h3 className="text-lg font-bold mb-3 text-red-400">מדידת כיוונים</h3>
                        <ol className="text-gray-300 text-sm space-y-2">
                            <li className="flex gap-2">
                                <span className="bg-red-500 text-white rounded-full w-5 h-5 text-xs flex items-center justify-center font-bold">1</span>
                                מרכז את העיגול על נקודת המוצא
                            </li>
                            <li className="flex gap-2">
                                <span className="bg-red-500 text-white rounded-full w-5 h-5 text-xs flex items-center justify-center font-bold">2</span>
                                יישר את הצפון עם צפון המפה
                            </li>
                            <li className="flex gap-2">
                                <span className="bg-red-500 text-white rounded-full w-5 h-5 text-xs flex items-center justify-center font-bold">3</span>
                                קרא את האזימוט לכיוון היעד
                            </li>
                        </ol>
                    </div>
                </div>

                <div className="mt-6 p-4 bg-gradient-to-r from-purple-900/30 to-pink-900/30 border border-purple-500/30 rounded-lg">
                    <h4 className="font-bold text-purple-400 mb-2 text-center">💡 טיפ חשוב</h4>
                    <p className="text-center text-gray-300 text-sm">
                        השילוב של כל שלושת הרכיבים מאפשר תכנון מדויק של מסלולים ואיתור נקודות ציון בדיוק של עשרות מטרים!
                    </p>
                </div>
            </div>
            <BackAndForthButtons explanationNumber={2} />
        </div>
    );
}