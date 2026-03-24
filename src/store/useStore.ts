import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface AppState {
  xp: number;
  streak: number;
  level: number;
  completedLessons: string[];
  lastActiveDate: string | null;
  dailyXp: number;
  dailyLessons: number;
  customModules: any[];
  activeLearnTab: string;
  generatorState: {
    textInput: string;
    attachments: any[];
    selectedTypes: string[];
    result: string | null;
    generatedModule: any | null;
  };
  addXp: (amount: number) => void;
  completeLesson: (lessonId: string) => void;
  checkStreak: () => void;
  addCustomModule: (module: any) => void;
  deleteCustomModule: (moduleId: string) => void;
  setActiveLearnTab: (tab: string) => void;
  setGeneratorState: (state: Partial<AppState['generatorState']>) => void;
}

export const useStore = create<AppState>()(
  persist(
    (set) => ({
      xp: 0,
      streak: 0,
      level: 1,
      completedLessons: [],
      lastActiveDate: null,
      dailyXp: 0,
      dailyLessons: 0,
      customModules: [],
      activeLearnTab: 'novel',
      generatorState: {
        textInput: '',
        attachments: [],
        selectedTypes: ['interactive'],
        result: null,
        generatedModule: null,
      },
      addXp: (amount) => set((state) => {
        const newXp = state.xp + amount;
        const newLevel = Math.floor(newXp / 100) + 1;
        return { xp: newXp, level: newLevel, dailyXp: state.dailyXp + amount };
      }),
      completeLesson: (lessonId) => set((state) => ({
        completedLessons: [...new Set([...state.completedLessons, lessonId])],
        dailyLessons: state.dailyLessons + 1
      })),
      addCustomModule: (module) => set((state) => ({
        customModules: [...state.customModules, module]
      })),
      deleteCustomModule: (moduleId) => set((state) => ({
        customModules: state.customModules.filter(m => m.id !== moduleId)
      })),
      setActiveLearnTab: (tab) => set({ activeLearnTab: tab }),
      setGeneratorState: (newState) => set((state) => ({
        generatorState: { ...(state.generatorState || { textInput: '', attachments: [], selectedTypes: ['interactive'], result: null, generatedModule: null }), ...newState }
      })),
      checkStreak: () => set((state) => {
        const today = new Date().toISOString().split('T')[0];
        if (!state.lastActiveDate) {
          return { lastActiveDate: today, streak: 1, dailyXp: 0, dailyLessons: 0 };
        }
        
        if (state.lastActiveDate === today) {
          return state; // Already active today
        }

        const lastDate = new Date(state.lastActiveDate);
        const currentDate = new Date(today);
        const diffTime = Math.abs(currentDate.getTime() - lastDate.getTime());
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

        if (diffDays === 1) {
          // Active yesterday, increment streak
          return { lastActiveDate: today, streak: state.streak + 1, dailyXp: 0, dailyLessons: 0 };
        } else {
          // Missed a day, reset streak
          return { lastActiveDate: today, streak: 1, dailyXp: 0, dailyLessons: 0 };
        }
      })
    }),
    {
      name: 'lit-app-storage',
    }
  )
);
