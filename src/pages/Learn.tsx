import { useState } from 'react';
import { motion } from 'framer-motion';
import { Book, CheckCircle, Lock, Play, X } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useStore } from '../store/useStore';
import { syllabus } from '../data/syllabus';
import { cn } from '../components/Layout';

export function Learn() {
  const { completedLessons, customModules, deleteCustomModule, activeLearnTab = 'novel', setActiveLearnTab } = useStore();

  const sections = [
    { id: 'novel', title: 'Novel', data: [syllabus.novel] },
    { id: 'poetry', title: 'Poetry', data: syllabus.poetry },
    { id: 'shortStories', title: 'Short Stories', data: syllabus.shortStories },
    { id: 'drama', title: 'Drama', data: syllabus.drama },
    { id: 'custom', title: 'Custom', data: customModules }
  ];

  const activeSection = sections.find(s => s.id === activeLearnTab) || sections[0];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-8 pb-20"
    >
      <header className="mb-8 text-center">
        <h1 className="text-3xl font-bold text-slate-900">Knowledge Map</h1>
        <p className="text-slate-600 mt-2">Follow the path to master the syllabus</p>
      </header>

      {/* Tabs */}
      <div className="flex justify-center mb-12">
        <div className="bg-white p-1.5 rounded-2xl border border-slate-200 shadow-sm flex gap-1 overflow-x-auto max-w-full">
          {sections.map((section) => (
            <button
              key={section.id}
              onClick={() => setActiveLearnTab(section.id)}
              className={cn(
                "px-6 py-2.5 rounded-xl font-bold text-sm transition-all whitespace-nowrap",
                activeLearnTab === section.id
                  ? "bg-indigo-600 text-white shadow-md"
                  : "text-slate-500 hover:bg-slate-50 hover:text-slate-900"
              )}
            >
              {section.title}
            </button>
          ))}
        </div>
      </div>

      <div className="relative">
        {/* Path Line */}
        <div className="absolute left-1/2 top-0 bottom-0 w-2 bg-slate-200 -translate-x-1/2 rounded-full z-0"></div>

        <div className="space-y-24 relative z-10">
          {activeSection?.data.length === 0 && activeLearnTab === 'custom' && (
            <div className="text-center bg-white p-12 rounded-3xl border border-slate-200 shadow-sm max-w-md mx-auto">
              <div className="w-20 h-20 bg-indigo-50 rounded-full flex items-center justify-center mx-auto mb-4">
                <Book className="w-10 h-10 text-indigo-500" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-2">No Custom Courses Yet</h3>
              <p className="text-slate-600 mb-6">Head over to the Studio to generate your own interactive courses from any study material!</p>
              <Link 
                to="/generator"
                className="inline-flex items-center justify-center bg-indigo-600 text-white px-6 py-3 rounded-xl font-bold hover:bg-indigo-700 transition-colors"
              >
                Go to Studio
              </Link>
            </div>
          )}

          {activeSection?.data.map((module, moduleIdx) => (
            <div key={module.id} className="space-y-16">
              {/* Module Header */}
              <div className="bg-indigo-600 text-white p-4 rounded-2xl shadow-md text-center max-w-sm mx-auto relative group">
                {activeLearnTab === 'custom' && (
                  <button 
                    onClick={() => deleteCustomModule(module.id)}
                    className="absolute -top-2 -right-2 bg-red-500 text-white p-1.5 rounded-full shadow-md opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    <X className="w-4 h-4" />
                  </button>
                )}
                <h2 className="text-xl font-bold">{module.title}</h2>
                <p className="text-indigo-100 text-sm">{activeSection.title}</p>
              </div>

              {/* Lessons */}
              {module.lessons?.map((lesson: any, index: number) => {
                const isCompleted = completedLessons.includes(lesson.id);
                // A lesson is locked if it's not the first one and the previous one isn't completed
                const isLocked = index > 0 && !completedLessons.includes(module.lessons[index - 1].id);
                
                // Alternate left/right alignment
                const isLeft = index % 2 === 0;

                return (
                  <div key={lesson.id} className={`flex items-center justify-center ${isLeft ? 'flex-row-reverse' : ''}`}>
                    <div className={`w-1/2 flex ${isLeft ? 'justify-start pl-8' : 'justify-end pr-8'}`}>
                      <Link
                        to={isLocked ? '#' : `/lesson/${lesson.id}`}
                        className={`relative group ${isLocked ? 'cursor-not-allowed opacity-60' : ''}`}
                      >
                        <div className={`w-24 h-24 rounded-full flex items-center justify-center border-4 shadow-lg transition-transform ${
                          !isLocked ? 'hover:scale-110 active:scale-95' : ''
                        } ${
                          isCompleted 
                            ? 'bg-emerald-500 border-emerald-600 text-white' 
                            : isLocked 
                              ? 'bg-slate-200 border-slate-300 text-slate-400'
                              : 'bg-white border-indigo-500 text-indigo-500'
                        }`}>
                          {isCompleted ? (
                            <CheckCircle className="w-10 h-10" />
                          ) : isLocked ? (
                            <Lock className="w-10 h-10" />
                          ) : (
                            <Play className="w-10 h-10 ml-1" />
                          )}
                        </div>
                        
                        {/* Tooltip */}
                        <div className={`absolute top-full mt-2 w-48 bg-white p-3 rounded-xl shadow-xl border border-slate-200 text-center opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none ${
                          isLeft ? 'left-0' : 'right-0'
                        }`}>
                          <h3 className="font-bold text-slate-900">{lesson.title}</h3>
                          <p className="text-xs text-slate-500 mt-1">Lesson {index + 1}</p>
                        </div>
                      </Link>
                    </div>
                  </div>
                );
              })}

              {/* Quiz Node */}
              {module.quizzes && module.quizzes.length > 0 && (
                <div className="flex items-center justify-center">
                  <Link
                    to={`/quiz/${module.id}`}
                    className="relative group"
                  >
                    <div className="w-28 h-28 bg-gradient-to-br from-orange-400 to-red-500 rounded-2xl rotate-45 flex items-center justify-center border-4 border-orange-600 shadow-lg hover:scale-110 active:scale-95 transition-transform">
                      <div className="-rotate-45 text-white flex flex-col items-center">
                        <Book className="w-8 h-8 mb-1" />
                        <span className="font-bold text-sm">QUIZ</span>
                      </div>
                    </div>
                  </Link>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </motion.div>
  );
}
