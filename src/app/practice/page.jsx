// app/practice/page.tsx
'use client';
import { useSelector } from 'react-redux';
import { useEffect } from 'react';
import AzimuthExercise from '../../components/AzimuthExercise';
import CoordinateFindingExercise from '../../components/CoordinateFindingExercise';
export default function PracticePage() {
const currentExcersice = useSelector((state) => state.excersice.currentExcersice);
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [currentExcersice]);
  return (
   <>
   {currentExcersice === 1 && <AzimuthExercise />}
   {currentExcersice === 2 && <CoordinateFindingExercise />}

   </>
  );
}
