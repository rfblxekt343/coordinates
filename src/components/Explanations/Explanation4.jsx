'use client';
import { useState } from 'react';
import BackAndForthButtons from '../ui/BackAndForthButtons';

export default function Explanation4() {
    const [activeSection, setActiveSection] = useState(null);

    return (
        <div className="max-w-4xl mx-auto p-4">
            <h1 className="text-2xl sm:text-3xl font-bold mb-6 text-center bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
                מציאת נ.צ
            </h1>

            {/* Introduction Section */}
            <div className="bg-black/40 backdrop-blur-sm border border-purple-500/30 p-4 sm:p-6 rounded-2xl shadow-lg mb-6">
                <p className="text-base sm:text-lg leading-relaxed text-gray-200 mb-4 text-right" dir="rtl">
                    כשנקבל נ.צ הוא יראה כשני מספרים עם קו נטוי בינהם. דוגמה <span className="font-bold text-cyan-400">651924/407375</span>
                </p>
                <p className="text-base sm:text-lg leading-relaxed text-gray-200 text-right" dir="rtl">
                    תחילה המספר יכול להיראות לנו כמו ג'יבריש, אבל אם נבין איך עובדים ציר האורך והרוחב ומה הדקו, המספרים יראו לנו מאוד הגיוניים.
                </p>
            </div>

            {/* Three Digits Explanation */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                <div className="bg-black/30 backdrop-blur-sm border border-cyan-500/30 p-4 rounded-xl">
                    <div className="flex items-center gap-2 mb-3">
                        <div className="w-4 h-4 bg-cyan-400 rounded"></div>
                        <h3 className="text-lg font-bold text-cyan-400">שלוש הספרות הראשונות</h3>
                    </div>
                    <p className="text-gray-300 text-sm mb-3 text-right" dir="rtl">
                        שלוש הספרות הראשונות מתייחסות לקווי האורך והרוחב.
                    </p>
                    <div className="text-right" dir="rtl">
                        <p className="text-sm text-gray-400">
                            בדוגמה שלנו - <span className="font-bold text-cyan-400">651</span>924/<span className="font-bold text-cyan-400">407</span>375
                        </p>
                    </div>
                </div>

                <div className="bg-black/30 backdrop-blur-sm border border-emerald-500/30 p-4 rounded-xl">
                    <div className="flex items-center gap-2 mb-3">
                        <div className="w-4 h-4 bg-emerald-400 rounded"></div>
                        <h3 className="text-lg font-bold text-emerald-400">שלוש הספרות האחרונות</h3>
                    </div>
                    <p className="text-gray-300 text-sm mb-3 text-right" dir="rtl">
                        שלושה הספרות האחרונות מתייחסות לעשרות המטרים שבקוביה.
                    </p>
                    <div className="text-right" dir="rtl">
                        <p className="text-sm text-gray-400">
                            בדוגמה שלנו 651<span className="font-bold text-emerald-400">924</span>/407<span className="font-bold text-emerald-400">375</span>
                        </p>
                    </div>
                </div>
            </div>

            {/* Visual Step-by-Step Guide */}
            <div className="bg-black/30 backdrop-blur-sm border border-purple-500/30 p-4 sm:p-6 rounded-2xl shadow-lg mb-6">
                <h2 className="text-xl sm:text-2xl font-bold mb-4 text-center text-pink-400">הדגמה חזותית - שלב אחר שלב</h2>


                <div className="bg-slate-800/50 backdrop-blur-sm border border-cyan-500/30 p-4 rounded-xl mb-4">
                    <div className="flex items-center gap-2 mb-3">

                        <h3 className="text-lg font-bold text-cyan-400 text-right" dir="rtl">איך נמצא את הנקודה הנכונה לפי הספרות האחרונות?</h3>
                    </div>
                    <p className="text-gray-300 text-sm mb-3 text-right" dir="rtl">
                        נתייחס אל הנקודה שלנו כמו אל ציר במתמטיקה. נסתכל על הציר שלנו
                    </p>
                    <div className="bg-white p-4 rounded-lg">
                        <svg viewBox="0 0 800 450" xmlns="http://www.w3.org/2000/svg">

                            <defs>
                                <linearGradient id="bg" x1="0%" y1="0%" x2="100%" y2="100%">
                                    <stop offset="0%" stopColor="#c7f0dd" stopOpacity="1" />
                                    <stop offset="25%" stopColor="#ffd4e5" stopOpacity="1" />
                                    <stop offset="50%" stopColor="#c7f0dd" stopOpacity="1" />
                                    <stop offset="75%" stopColor="#e5d4ff" stopOpacity="1" />
                                    <stop offset="100%" stopColor="#c7f0dd" stopOpacity="1" />

                                </linearGradient>
                            </defs>

                            <rect width="800" height="450" fill="url(#bg)" />


                            <line x1="130" y1="60" x2="730" y2="60" stroke="#000" strokeWidth="2" />


                            <line x1="680" y1="40" x2="680" y2="300" stroke="#000" strokeWidth="2" />

                            <line x1="320" y1="40" x2="320" y2="300" stroke="#dc2626" strokeWidth="3" />


                            <line x1="130" y1="240" x2="730" y2="240" stroke="#dc2626" strokeWidth="3" />


                            <line x1="300" y1="150" x2="340" y2="150" stroke="#000" strokeWidth="2" />


                            <line x1="500" y1="220" x2="500" y2="260" stroke="#000" strokeWidth="2" />


                            <circle cx="320" cy="240" r="10" fill="#3b82f6" />


                            <text x="100" y="65" fontSize="22" fontWeight="bold" fill="#2d5016">408</text>
                            <text x="320" y="350" fontSize="22" fontWeight="bold" fill="#000000ff" textAnchor="middle">651</text>
                            <text x="680" y="350" fontSize="22" fontWeight="bold" fill="#000000ff" textAnchor="middle">652</text>
                            <text x="100" y="245" fontSize="22" fontWeight="bold" fill="#dc2626" textAnchor="middle">407</text>
                        </svg>
                        <p className="text-xs text-gray-600 mt-2 text-right" dir="rtl">
                            הקו הקטן באמצע בין 651 ל 652 יכול להיראות לנו כמו 651.1. במקרה הזה נתייחס לשלוש הספרות האחרונות כמו נבין
                            {' '}<span className="font-bold text-cyan-400">נקודה עשרונית על הציר</span>{' '}
                            לדוגמה 651.500 הנקודה שלנו היא 651924. כשנחשוב על הנקודה כמו ציר נחשוב: 651.<span className="font-bold text-emerald-400">9</span>24 נמקם את הנקודה הזו על הציר שלנו:
                        </p>
                    </div>
                </div>


                <div className="bg-slate-800/50 backdrop-blur-sm border border-purple-500/30 p-4 rounded-xl mb-4">


                    <div className="bg-white p-4 rounded-lg">
                        <svg viewBox="0 0 800 500" className="w-full">
                            {/* Top diagram */}
                            <svg viewBox="0 0 800 450" xmlns="http://www.w3.org/2000/svg">

                                <defs>
                                    <linearGradient id="bg" x1="0%" y1="0%" x2="100%" y2="100%">
                                        <stop offset="0%" stopColor="#c7f0dd" stopOpacity="1" />
                                        <stop offset="25%" stopColor="#ffd4e5" stopOpacity="1" />
                                        <stop offset="50%" stopColor="#c7f0dd" stopOpacity="1" />
                                        <stop offset="75%" stopColor="#e5d4ff" stopOpacity="1" />
                                        <stop offset="100%" stopColor="#c7f0dd" stopOpacity="1" />

                                    </linearGradient>
                                </defs>

                                <rect width="800" height="450" fill="url(#bg)" />


                                <line x1="130" y1="60" x2="730" y2="60" stroke="#000" strokeWidth="2" />


                                <line x1="680" y1="40" x2="680" y2="300" stroke="#000" strokeWidth="2" />

                                <line x1="320" y1="40" x2="320" y2="300" stroke="#dc2626" strokeWidth="3" />


                                <line x1="130" y1="240" x2="730" y2="240" stroke="#dc2626" strokeWidth="3" />


                                <line x1="300" y1="150" x2="340" y2="150" stroke="#000" strokeWidth="2" />


                                <line x1="500" y1="220" x2="500" y2="260" stroke="#000" strokeWidth="2" />


                                <circle cx="320" cy="240" r="10" fill="#3b82f6" />

                                <line x1="660" y1="220" x2="660" y2="260" stroke="#000" strokeWidth="2" />
                                <circle cx="660" cy="240" r="10" fill="#fffc51ff" />



                                <text x="100" y="65" fontSize="22" fontWeight="bold" fill="#2d5016">408</text>
                                <text x="320" y="350" fontSize="22" fontWeight="bold" fill="#000000ff" textAnchor="middle">651</text>
                                <text x="680" y="350" fontSize="22" fontWeight="bold" fill="#000000ff" textAnchor="middle">652</text>
                                <text x="100" y="245" fontSize="22" fontWeight="bold" fill="#dc2626" textAnchor="middle">407</text>
                            </svg>

                            {/* Bottom diagram with ruler */}


                        </svg>
                        <p className="text-black text-sm mb-3 text-right" dir="rtl">
                            עכשיו נסתכל על הצד השני ונעשה את אותה פעולה
                        </p>
                        <svg viewBox="0 0 800 450" xmlns="http://www.w3.org/2000/svg">

                            <defs>
                                <linearGradient id="bg" x1="0%" y1="0%" x2="100%" y2="100%">
                                    <stop offset="0%" stopColor="#c7f0dd" stopOpacity="1" />
                                    <stop offset="25%" stopColor="#ffd4e5" stopOpacity="1" />
                                    <stop offset="50%" stopColor="#c7f0dd" stopOpacity="1" />
                                    <stop offset="75%" stopColor="#e5d4ff" stopOpacity="1" />
                                    <stop offset="100%" stopColor="#c7f0dd" stopOpacity="1" />

                                </linearGradient>
                            </defs>

                            <rect width="800" height="450" fill="url(#bg)" />


                            <line x1="130" y1="60" x2="730" y2="60" stroke="#000" strokeWidth="2" />


                            <line x1="680" y1="40" x2="680" y2="300" stroke="#000" strokeWidth="2" />

                            <line x1="320" y1="40" x2="320" y2="300" stroke="#dc2626" strokeWidth="3" />


                            <line x1="130" y1="240" x2="730" y2="240" stroke="#dc2626" strokeWidth="3" />


                            <line x1="300" y1="150" x2="340" y2="150" stroke="#000" strokeWidth="2" />
                            <line x1="305" y1="180" x2="335" y2="180" stroke="#000" strokeWidth="2" />
                            <circle cx="320" cy="180" r="10" fill="#fffc51ff" />


                            <line x1="500" y1="220" x2="500" y2="260" stroke="#000" strokeWidth="2" />

                            <circle cx="320" cy="240" r="10" fill="#3b82f6" />

                            <line x1="660" y1="220" x2="660" y2="260" stroke="#000" strokeWidth="2" />
                            <circle cx="660" cy="240" r="10" fill="#fffc51ff" />



                            <text x="100" y="65" fontSize="22" fontWeight="bold" fill="#2d5016">408</text>
                            <text x="320" y="350" fontSize="22" fontWeight="bold" fill="#000000ff" textAnchor="middle">651</text>
                            <text x="680" y="350" fontSize="22" fontWeight="bold" fill="#000000ff" textAnchor="middle">652</text>
                            <text x="100" y="245" fontSize="22" fontWeight="bold" fill="#dc2626" textAnchor="middle">407</text>
                        </svg>

                    </div>
                </div>


                <div className="bg-slate-800/50 backdrop-blur-sm border border-pink-500/30 p-4 rounded-xl mb-4">

                    <p className="text-gray-300 text-sm mb-3 text-right" dir="rtl">
                        407.375 ← 407375 | ניצור קו דמיוני בין הנקודות
                    </p>
                    <div className="bg-white p-4 rounded-lg">
                        <svg viewBox="0 0 600 500" className="w-full">
                            {/* Top diagram */}
                            <svg viewBox="0 0 800 450" xmlns="http://www.w3.org/2000/svg">
                                <defs>
                                    <linearGradient id="bg" x1="0%" y1="0%" x2="100%" y2="100%">
                                        <stop offset="0%" stopColor="#c7f0dd" stopOpacity="1" />
                                        <stop offset="25%" stopColor="#ffd4e5" stopOpacity="1" />
                                        <stop offset="50%" stopColor="#c7f0dd" stopOpacity="1" />
                                        <stop offset="75%" stopColor="#e5d4ff" stopOpacity="1" />
                                        <stop offset="100%" stopColor="#c7f0dd" stopOpacity="1" />
                                    </linearGradient>
                                </defs>
                                <rect width="800" height="450" fill="url(#bg)" />
                                <line x1="130" y1="60" x2="730" y2="60" stroke="#000" strokeWidth="2" />
                                <line x1="320" y1="40" x2="320" y2="300" stroke="#dc2626" strokeWidth="3" />

                                <line x1="130" y1="240" x2="730" y2="240" stroke="#dc2626" strokeWidth="3" />

                                <line x1="320" y1="180" x2="680" y2="180" stroke="#000" strokeWidth="2" strokeDasharray="10,5" />

                                <line x1="300" y1="150" x2="340" y2="150" stroke="#000" strokeWidth="2" />
                                <circle cx="320" cy="180" r="8" fill="#fffc51ff" />
                                <circle cx="320" cy="240" r="8" fill="#3b82f6" />
                                <line x1="500" y1="220" x2="500" y2="260" stroke="#000" strokeWidth="2" />


                                <line x1="660" y1="220" x2="660" y2="260" stroke="#000" strokeWidth="2" />
                                <line x1="660" y1="180" x2="660" y2="240" stroke="#000" strokeWidth="2" strokeDasharray="5,5" />
                                <circle cx="660" cy="180" r="8" fill="#dc2626" />
                                <circle cx="660" cy="240" r="10" fill="#fffc51ff" />
                                <line x1="680" y1="40" x2="680" y2="300" stroke="#000" strokeWidth="2" />


                                <text x="100" y="65" fontSize="22" fontWeight="bold" fill="#2d5016">408</text>
                                <text x="100" y="245" fontSize="22" fontWeight="bold" fill="#dc2626">407</text>
                                <text x="320" y="330" fontSize="22" fontWeight="bold" fill="#000000" textAnchor="middle">651</text>
                                <text x="680" y="330" fontSize="22" fontWeight="bold" fill="#000000" textAnchor="middle">652</text>
                            </svg>
                            {/* Bottom diagram with final point */}



                        </svg>
                        <p className="text-xs text-gray-600 mt-2 text-right" dir="rtl">
                          הנקודה שנוצרה לנו (הנקודה האדומה) היא הנ.צ
                        </p>
                    </div>
                </div>


            </div>

            {/* Steps Section */}
            <div className="bg-black/30 backdrop-blur-sm border border-purple-500/30 p-4 sm:p-6 rounded-2xl shadow-lg mb-6">
                <h2 className="text-xl sm:text-2xl font-bold mb-4 text-center text-pink-400">סיכום השלבים</h2>

                <div className="space-y-4">
                    <div className="bg-slate-800/50 backdrop-blur-sm border border-cyan-500/30 p-4 rounded-xl">
                        <ol className="text-gray-300 text-sm space-y-2 text-right" dir="rtl">
                            <li className="flex gap-2">
                                <span className="bg-cyan-500 text-white rounded-full w-5 h-5 text-xs flex items-center justify-center font-bold flex-shrink-0">1</span>
                                <span>באמצעות שלושת הספרות הראשונות של הנקודות הראשונה הקוביה היא נמצאת למעלה ימינה לנקודה שמצאנו.</span>
                            </li>
                            <li className="flex gap-2">
                                <span className="bg-purple-500 text-white rounded-full w-5 h-5 text-xs flex items-center justify-center font-bold flex-shrink-0">2</span>
                                <span>נניח את המדקו על הקוביה - נייח את קובייות המדקודת השירותית על הקוביה.</span>
                            </li>
                            <li className="flex gap-2">
                                <span className="bg-pink-500 text-white rounded-full w-5 h-5 text-xs flex items-center justify-center font-bold flex-shrink-0">3</span>
                                <span>נמצא את הנקודה על המפה באמצעות שלושת הספרות האחרונות.</span>
                            </li>
                        </ol>
                    </div>
                </div>
            </div>

            <BackAndForthButtons explanationNumber={4} />
        </div>
    );
}