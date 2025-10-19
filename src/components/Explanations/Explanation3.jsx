'use client';
import { useState } from 'react';
import BackAndForthButtons from '../ui/BackAndForthButtons';

export default function Explanation4() {
    const [activeSection, setActiveSection] = useState(null);

    return (
        <div className="max-w-4xl mx-auto p-4">
            <h1 className="text-2xl sm:text-3xl font-bold mb-6 text-center bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
                אזימוטים
            </h1>


            <div className="bg-black/40 backdrop-blur-sm border border-purple-500/30 p-4 sm:p-6 rounded-2xl shadow-lg mb-6">
                <p className="text-sm sm:text-base md:text-lg leading-relaxed text-gray-200 mb-4 text-right" dir="rtl">
                    אזימוט - הזווית הנוצרת ביני לבין המטרה שלי, ביחס לצפון.
                </p>
                <p className="text-sm sm:text-base md:text-lg leading-relaxed text-gray-200 text-right mb-4" dir="rtl">
                    אזימוט חוזר - הזווית מהמטרה אליי, ביחס לצפון.
                    נשתמש כאשר נרצה לאמת את מיקומנו בשטח בהתאם לנקודה אחרת ממנה הגנו/כאשר נרצה למצוא את מיקומנו העצמי בעזרת טכניקת חיתוכים.
                </p>
                <p className="text-sm sm:text-base md:text-lg leading-relaxed text-gray-200 text-right mb-4" dir="rtl">
                    חישוב של אזימוט חוזר - נבדוק את האזימוט למטרה, במידה והאזימוט גדול מ - 180 מעלות נחסיר ממנו 180 מעלות ובמידה והאזימוט קטן מ - 180 מעלות נוסיף לו 180 מעלות.
                </p>
                <p className="text-xs sm:text-sm text-gray-400 text-right mb-6" dir="rtl">
                    לדוגמה: 300 - 180 = 120 | 120 + 180 = 300
                </p>

                {/* First Diagram */}
                <div className="w-full bg-gray-200 rounded-xl overflow-hidden mb-6" style={{ aspectRatio: '1/1', maxHeight: '400px' }}>
                    <svg width="100%" height="100%" viewBox="0 0 550 550" preserveAspectRatio="xMidYMid meet">
                        {/* North line, starting from the stick figure */}
                        <line
                            x1="275"
                            y1="350"
                            x2="275"
                            y2="100"
                            stroke="#dc2626"
                            strokeWidth="4"
                            strokeDasharray="10, 8"
                        />
                        {/* Line from stick figure to house */}
                        <line
                            x1="275"
                            y1="350"
                            x2="480"
                            y2="260"
                            stroke="#dc2626"
                            strokeWidth="4"
                            strokeDasharray="10, 8"
                        />

                        {/* North Indicator */}
                        <text
                            x="262"
                            y="85"
                            fontFamily="Arial, sans-serif"
                            fontSize="32"
                            fontWeight="bold"
                            fill="black"
                        >
                            צ
                        </text>

                        {/* Angle Arc and 'AZ' Label */}
                        <path
                            id="azArcPath"
                            d="M 275 270 A 80 80 0 0 1 345 320"
                            stroke="black"
                            strokeWidth="3"
                            fill="none"
                        />
                        <text dy="-8" fontSize="26" fontWeight="bold" fill="black">
                            <textPath href="#azArcPath" startOffset="50%" textAnchor="middle">
                                AZ
                            </textPath>
                        </text>

                        {/* Stick Figure */}
                        <g transform="translate(230, 240)" stroke="black" strokeWidth="4">
                            <circle cx="45" cy="22" r="20" fill="none" />
                            <line x1="45" y1="42" x2="45" y2="85" />
                            <line x1="45" y1="55" x2="20" y2="75" />
                            <line x1="45" y1="55" x2="70" y2="75" />
                            <line x1="45" y1="85" x2="25" y2="120" />
                            <line x1="45" y1="85" x2="65" y2="120" />
                        </g>

                        {/* House */}
                        <rect x="430" y="260" width="100" height="90" fill="white" stroke="black" strokeWidth="3" />
                        <polygon points="480,180 430,260 530,260" fill="black" />
                    </svg>
                </div>

                {/* Second Diagram */}
                <div className="w-full bg-gray-100 rounded-xl overflow-hidden" style={{ aspectRatio: '1/1', maxHeight: '400px' }}>
                    <svg width="100%" height="100%" viewBox="0 0 550 550" preserveAspectRatio="xMidYMid meet">
                        {/* House */}
                        <g>
                            <rect x="350" y="280" width="100" height="90" fill="white" stroke="black" strokeWidth="3" />
                            <polygon points="400,200 350,280 450,280" fill="black" />
                        </g>

                        {/* Stick Figure */}
                        <g transform="translate(100, 310)" stroke="black" strokeWidth="4">
                            <circle cx="45" cy="22" r="20" fill="none" />
                            <line x1="45" y1="42" x2="45" y2="85" />
                            <line x1="45" y1="55" x2="20" y2="75" />
                            <line x1="45" y1="55" x2="70" y2="75" />
                            <line x1="45" y1="85" x2="25" y2="120" />
                            <line x1="45" y1="85" x2="65" y2="120" />
                        </g>

                        {/* Dashed Line 1: Figure to House Corner */}
                        <line
                            x1="145"
                            y1="395"
                            x2="350"
                            y2="280"
                            stroke="#dc2626"
                            strokeWidth="4"
                            strokeDasharray="10, 8"
                        />

                        {/* Dashed Line 2: North Line */}
                        <line
                            x1="400"
                            y1="200"
                            x2="400"
                            y2="50"
                            stroke="#dc2626"
                            strokeWidth="4"
                            strokeDasharray="10, 8"
                        />

                        {/* Angle Arc */}
                        <path
                            d="M 330 310 A 120 120 0 0 1 400 200"
                            stroke="black"
                            strokeWidth="3"
                            fill="none"
                        />

                        {/* Text Labels */}
                        <text
                            x="220"
                            y="220"
                            fontFamily="Arial, sans-serif"
                            fontSize="28"
                            fontWeight="bold"
                            fill="black"
                            direction="rtl"
                        >
                            אזימוט חוזר
                        </text>

                        <text
                            x="378"
                            y="40"
                            fontFamily="Arial, sans-serif"
                            fontSize="32"
                            fontWeight="bold"
                            fill="black"
                        >
                            צ
                        </text>
                    </svg>
                </div>
            </div>


            {/* Visual Step-by-Step Guide */}
            <div className=" text-white bg-black/30 backdrop-blur-sm border border-purple-500/30 p-4 sm:p-6 rounded-2xl shadow-lg mb-6">
                <h2 className="text-xl sm:text-2xl font-bold mb-4 text-center text-pink-400">סדר פעולות מציאת כיוון</h2>
                1- נצפין את המדקו ביחס למפה
                <br />
                2 - נניח את מרכז המדקו על הנקדוה ממנה אנו רוצים למדוד
                <br />
                3 - נמתח את החוט אל הנקודה אשר אליה אנו מודדים.
                <br />
                4- נקרא את המספר במעגל האמצעי עליו עובר החוט

            </div>
            <div className="bg-black/30 backdrop-blur-sm border border-purple-500/30 p-4 sm:p-6 rounded-2xl shadow-lg mb-6">
                <h2 className="text-xl sm:text-2xl font-bold mb-4 text-center text-pink-400">אומדן טווח</h2>
                <p className="text-white">
                    למדקו יש מספר סרגלים למדידת טווח המשתנים בהתאם לקנה מידה.
                    <br />
                    אנו נשתמש בסרגל 1:50,000 זהו קנה המידה של המפה שאנו משתמשים
                    <br />
                    בסרגל מדידה יש יחידות של מייל וק"מ המתאימים,
                    <br />נשתמש בסרגל הרלוונטי למדידה שלנו. במידה ונרצה לאמוד טווח מדויק של ציר מפותל נניח את החוט שבמרכז מד הקואורדינטות לאורך הציר, נמתח את החוט ונניח אותו על גבי הסרגל.
                </p>

            </div>


            <BackAndForthButtons explanationNumber={3} />
        </div>
    );
}