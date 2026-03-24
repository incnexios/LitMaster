import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useParams, useNavigate } from 'react-router-dom';
import { Check, X, ChevronRight, AlertCircle, Award } from 'lucide-react';
import { useStore } from '../store/useStore';
import { syllabus } from '../data/syllabus';

export function Quiz() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addXp, customModules } = useStore();
  
  const allModules = [syllabus.novel, ...syllabus.poetry, ...syllabus.shortStories, ...syllabus.drama, ...customModules];
  const module = allModules.find((m: any) => m.id === id);
  const quizzes = module ? module.quizzes : [];
  
  const [currentQ, setCurrentQ] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
  const [score, setScore] = useState(0);
  const [isFinished, setIsFinished] = useState(false);

  if (!module || quizzes.length === 0) {
    return <div className="p-8 text-center text-slate-500">Quiz not found or has no questions.</div>;
  }

  const handleSelect = (index: number) => {
    if (isCorrect !== null) return;
    setSelected(index);
    const correct = index === quizzes[currentQ].correct;
    setIsCorrect(correct);
    if (correct) setScore(score + 1);
  };

  const handleNext = () => {
    if (currentQ < quizzes.length - 1) {
      setCurrentQ(currentQ + 1);
      setSelected(null);
      setIsCorrect(null);
    } else {
      setIsFinished(true);
      addXp(score * 10);
    }
  };

  const handleFinish = () => {
    navigate('/learn');
  };

  return (
    <div className="max-w-2xl mx-auto min-h-[80vh] flex flex-col">
      {/* Progress Bar */}
      <div className="w-full bg-slate-200 h-3 rounded-full mb-8 overflow-hidden">
        <motion.div 
          className="bg-orange-500 h-full rounded-full"
          initial={{ width: 0 }}
          animate={{ width: `${((currentQ + (isFinished ? 1 : 0)) / quizzes.length) * 100}%` }}
          transition={{ duration: 0.3 }}
        />
      </div>

      <AnimatePresence mode="wait">
        {!isFinished ? (
          <motion.div
            key={currentQ}
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            className="flex-1 flex flex-col"
          >
            <h2 className="text-2xl font-bold text-slate-900 mb-8 leading-relaxed">
              {quizzes[currentQ].question}
            </h2>

            <div className="space-y-4">
              {quizzes[currentQ].options.map((option, index) => {
                const isSelected = selected === index;
                const isCorrectOption = index === quizzes[currentQ].correct;
                
                let btnClass = "w-full text-left p-4 rounded-2xl border-2 transition-all font-medium text-lg ";
                
                if (isCorrect === null) {
                  btnClass += isSelected ? "border-indigo-500 bg-indigo-50 text-indigo-700" : "border-slate-200 bg-white hover:bg-slate-50 hover:border-slate-300 text-slate-700";
                } else {
                  if (isSelected && isCorrect) {
                    btnClass += "border-emerald-500 bg-emerald-50 text-emerald-700";
                  } else if (isSelected && !isCorrect) {
                    btnClass += "border-red-500 bg-red-50 text-red-700";
                  } else if (isCorrectOption) {
                    btnClass += "border-emerald-500 bg-emerald-50 text-emerald-700";
                  } else {
                    btnClass += "border-slate-200 bg-white opacity-50 text-slate-500";
                  }
                }

                return (
                  <button
                    key={index}
                    onClick={() => handleSelect(index)}
                    disabled={isCorrect !== null}
                    className={btnClass}
                  >
                    <div className="flex items-center justify-between">
                      <span>{option}</span>
                      {isCorrect !== null && isSelected && isCorrect && <Check className="w-6 h-6 text-emerald-500" />}
                      {isCorrect !== null && isSelected && !isCorrect && <X className="w-6 h-6 text-red-500" />}
                      {isCorrect !== null && !isSelected && isCorrectOption && <Check className="w-6 h-6 text-emerald-500" />}
                    </div>
                  </button>
                );
              })}
            </div>
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="flex-1 flex flex-col items-center justify-center text-center space-y-6"
          >
            <div className="w-32 h-32 bg-orange-100 rounded-full flex items-center justify-center mb-4">
              <Award className="w-16 h-16 text-orange-500" />
            </div>
            <h2 className="text-4xl font-bold text-slate-900">Quiz Complete!</h2>
            <p className="text-xl text-slate-600">You scored {score} out of {quizzes.length}</p>
            <p className="text-lg font-bold text-orange-500">+{score * 10} XP Earned</p>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Bottom Action Bar */}
      <div className="mt-8 pt-6 border-t border-slate-200">
        {!isFinished ? (
          <button
            onClick={handleNext}
            disabled={isCorrect === null}
            className={`w-full py-4 rounded-2xl font-bold text-lg transition-colors flex items-center justify-center gap-2 shadow-sm ${
              isCorrect === null 
                ? 'bg-slate-200 text-slate-400 cursor-not-allowed' 
                : isCorrect 
                  ? 'bg-emerald-500 text-white hover:bg-emerald-600 hover:shadow-md active:scale-[0.98]'
                  : 'bg-red-500 text-white hover:bg-red-600 hover:shadow-md active:scale-[0.98]'
            }`}
          >
            {isCorrect === null ? 'Select an answer' : 'Continue'} <ChevronRight className="w-6 h-6" />
          </button>
        ) : (
          <button
            onClick={handleFinish}
            className="w-full bg-orange-500 text-white py-4 rounded-2xl font-bold text-lg hover:bg-orange-600 transition-colors shadow-sm hover:shadow-md active:scale-[0.98]"
          >
            Back to Map
          </button>
        )}
      </div>
    </div>
  );
}
