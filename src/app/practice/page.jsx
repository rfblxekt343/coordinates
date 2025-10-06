// app/practice/page.tsx
'use client';
import { useSelector } from 'react-redux';
import AzimuthExercise from '../../components/AzimuthExercise';
import CoordinateFindingExercise from '../../components/CoordinateFindingExercise';
export default function PracticePage() {
const currentExcersice = useSelector((state) => state.excersice.currentExcersice);
  return (
   <>
   {currentExcersice === 1 && <AzimuthExercise />}
   {currentExcersice === 2 && <CoordinateFindingExercise />}

   </>
  );
}
