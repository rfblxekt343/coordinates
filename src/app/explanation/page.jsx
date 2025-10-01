'use client';

import React, { use } from 'react';
import { useSelector } from 'react-redux';
import Explanation1 from '@/src/components/Explanations/Explanation1';
import Explanation2 from '@/src/components/Explanations/Explanation2';
import Explanation3 from '@/src/components/Explanations/Explanation3';
export default function ExplanationPage() {
  const currentExplanation = useSelector((state) => state.explanations.currentExplanation);
  console.log('Current Explanation from Redux:', currentExplanation);
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-indigo-900 p-4 sm:p-6" dir="rtl">
      {/* Render the current explanation based on state */}
      {currentExplanation === 1 && <Explanation1 />}
      {currentExplanation === 2 && <Explanation2 />}
      {currentExplanation === 3 && <Explanation3 />}
    </div>
  );
}