import { useRouter } from 'next/navigation';
import { useSelector, useDispatch } from 'react-redux';
import { setCurrentExplanation } from '../../store/explanationsSlice';

// Destructure the prop from the object
export default function BackAndForthButtons({ explanationNumber }) {
    const dispatch = useDispatch();
    const router = useRouter();

    const handleGoForward = () => {
       
        if (explanationNumber === 1) {
            
            dispatch(setCurrentExplanation(2));
        }else if (explanationNumber === 2) {
            dispatch(setCurrentExplanation(3));
        
        }else if (explanationNumber === 3) {
            dispatch(setCurrentExplanation(4));
        }
    };

    const handleGoBack = () => {
        if (explanationNumber === 1) {
            dispatch(setCurrentExplanation(1));
            router.push('/');
        }else if (explanationNumber === 2) {
           dispatch(setCurrentExplanation(1));
        
        }else if (explanationNumber === 3) {
           dispatch(setCurrentExplanation(2));
        }else if (explanationNumber === 4) {
           dispatch(setCurrentExplanation(3));
        }
    };

    return (
        <div className="flex justify-between mt-8">
            <button
                className="px-6 py-2 rounded-lg bg-gradient-to-r from-pink-400 to-purple-500 text-white font-bold shadow hover:from-pink-500 hover:to-purple-600 transition"
                onClick={handleGoForward}
            >
                הבא
            </button>
            <button
                className="px-6 py-2 rounded-lg bg-gradient-to-r from-purple-500 to-cyan-500 text-white font-bold shadow hover:from-purple-600 hover:to-cyan-600 transition"
                onClick={handleGoBack}
            >
                חזור
            </button>
        </div>
    );
}