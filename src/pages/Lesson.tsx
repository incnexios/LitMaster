import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useParams, useNavigate } from 'react-router-dom';
import { Check, ChevronRight, X } from 'lucide-react';
import { useStore } from '../store/useStore';
import { syllabus } from '../data/syllabus';

export function Lesson() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addXp, completeLesson, customModules } = useStore();
  
  const allModules = [syllabus.novel, ...syllabus.poetry, ...syllabus.shortStories, ...syllabus.drama, ...customModules];
  let lesson: any = null;
  let currentModule: any = null;

  for (const mod of allModules) {
    const found = mod.lessons.find((l: any) => l.id === id);
    if (found) {
      lesson = found;
      currentModule = mod;
      break;
    }
  }

  const [step, setStep] = useState(0);
  const [isFinished, setIsFinished] = useState(false);

  if (!lesson) {
    return <div>Lesson not found</div>;
  }

  const steps = [
    { type: 'info', content: lesson.content },
    ...(lesson.quotes || []).map((q: any) => ({ type: 'quote', text: q.text, explanation: q.explanation }))
  ];

  const handleNext = () => {
    if (step < steps.length - 1) {
      setStep(step + 1);
    } else {
      setIsFinished(true);
      addXp(15);
      completeLesson(lesson.id);
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
          className="bg-emerald-500 h-full rounded-full"
          initial={{ width: 0 }}
          animate={{ width: `${((step + (isFinished ? 1 : 0)) / steps.length) * 100}%` }}
          transition={{ duration: 0.3 }}
        />
      </div>

      <AnimatePresence mode="wait">
        {!isFinished ? (
          <motion.div
            key={step}
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            className="flex-1 flex flex-col justify-center"
          >
            {steps[step].type === 'info' ? (
              <div className="bg-white p-8 rounded-3xl shadow-sm border border-slate-200">
                <h2 className="text-2xl font-bold text-slate-900 mb-6">{lesson.title}</h2>
                <p className="text-lg text-slate-700 leading-relaxed">
                  {(steps[step] as any).content}
                </p>
              </div>
            ) : (
              <div className="space-y-6">
                <div className="bg-indigo-50 p-8 rounded-3xl border-2 border-indigo-200 relative">
                  <div className="absolute -top-4 -left-4 w-12 h-12 bg-indigo-500 rounded-full flex items-center justify-center text-white font-serif text-3xl font-bold shadow-md">
                    "
                  </div>
                  <p className="text-2xl font-serif text-indigo-900 italic leading-relaxed">
                    {(steps[step] as any).text}
                  </p>
                </div>
                <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
                  <h3 className="text-sm font-bold text-slate-400 uppercase tracking-wider mb-2">Explanation</h3>
                  <p className="text-slate-700">
                    {(steps[step] as any).explanation}
                  </p>
                </div>
              </div>
            )}
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="flex-1 flex flex-col items-center justify-center text-center space-y-6"
          >
            <div className="w-32 h-32 bg-emerald-100 rounded-full flex items-center justify-center mb-4">
              <Check className="w-16 h-16 text-emerald-500" />
            </div>
            <h2 className="text-4xl font-bold text-slate-900">Lesson Complete!</h2>
            <p className="text-xl text-slate-600">+15 XP Earned</p>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Bottom Action Bar */}
      <div className="mt-8 pt-6 border-t border-slate-200">
        {!isFinished ? (
          <button
            onClick={handleNext}
            className="w-full bg-indigo-600 text-white py-4 rounded-2xl font-bold text-lg hover:bg-indigo-700 transition-colors flex items-center justify-center gap-2 shadow-sm hover:shadow-md active:scale-[0.98]"
          >
            Continue <ChevronRight className="w-6 h-6" />
          </button>
        ) : (
          <button
            onClick={handleFinish}
            className="w-full bg-emerald-500 text-white py-4 rounded-2xl font-bold text-lg hover:bg-emerald-600 transition-colors shadow-sm hover:shadow-md active:scale-[0.98]"
          >
            Back to Map
          </button>
        )}
      </div>
    </div>
  );
}
