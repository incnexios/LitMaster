import { motion } from 'framer-motion';
import { BookOpen, Target, Zap, Award, Flame, Star } from 'lucide-react';
import { useStore } from '../store/useStore';
import { Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

export function Dashboard() {
  const { xp, streak, level, completedLessons, dailyXp, dailyLessons } = useStore();
  const { user } = useAuth();
  const isAuthenticated = !!user;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-8"
    >
      <header className="mb-8">
        <h1 className="text-3xl font-bold text-slate-900">
          Welcome back{isAuthenticated && user?.user_metadata?.full_name ? `, ${user.user_metadata.full_name.split(' ')[0]}` : ''}!
        </h1>
        <p className="text-slate-600 mt-2">Ready to master O/L English Literature?</p>
      </header>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex flex-col items-center justify-center">
          <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center mb-3">
            <Flame className="w-6 h-6 text-orange-500 fill-current" />
          </div>
          <h3 className="text-2xl font-bold text-slate-900">{streak}</h3>
          <p className="text-sm font-medium text-slate-500 uppercase tracking-wider">Day Streak</p>
        </div>
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex flex-col items-center justify-center">
          <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mb-3">
            <Star className="w-6 h-6 text-blue-500 fill-current" />
          </div>
          <h3 className="text-2xl font-bold text-slate-900">{xp}</h3>
          <p className="text-sm font-medium text-slate-500 uppercase tracking-wider">Total XP</p>
        </div>
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex flex-col items-center justify-center">
          <div className="w-12 h-12 bg-emerald-100 rounded-full flex items-center justify-center mb-3">
            <Award className="w-6 h-6 text-emerald-500 fill-current" />
          </div>
          <h3 className="text-2xl font-bold text-slate-900">Lvl {level}</h3>
          <p className="text-sm font-medium text-slate-500 uppercase tracking-wider">Current Level</p>
        </div>
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex flex-col items-center justify-center">
          <div className="w-12 h-12 bg-indigo-100 rounded-full flex items-center justify-center mb-3">
            <BookOpen className="w-6 h-6 text-indigo-500 fill-current" />
          </div>
          <h3 className="text-2xl font-bold text-slate-900">{completedLessons.length}</h3>
          <p className="text-sm font-medium text-slate-500 uppercase tracking-wider">Lessons Done</p>
        </div>
      </div>

      {/* Daily Quests */}
      <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
        <h2 className="text-xl font-bold text-slate-900 mb-4 flex items-center gap-2">
          <Target className="w-6 h-6 text-indigo-500" />
          Daily Quests
        </h2>
        <div className="space-y-4">
          <div className="flex items-center gap-4 p-4 rounded-xl bg-slate-50 border border-slate-100">
            <div className="w-12 h-12 bg-indigo-100 rounded-full flex items-center justify-center shrink-0">
              <BookOpen className="w-6 h-6 text-indigo-600" />
            </div>
            <div className="flex-1">
              <h4 className="font-bold text-slate-900">Complete 1 Lesson</h4>
              <div className="w-full bg-slate-200 h-2 rounded-full mt-2">
                <div className="bg-indigo-500 h-2 rounded-full" style={{ width: `${Math.min((dailyLessons / 1) * 100, 100)}%` }}></div>
              </div>
            </div>
            <span className="font-bold text-indigo-600">{Math.min(dailyLessons, 1)}/1</span>
          </div>
          <div className="flex items-center gap-4 p-4 rounded-xl bg-slate-50 border border-slate-100">
            <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center shrink-0">
              <Zap className="w-6 h-6 text-orange-600" />
            </div>
            <div className="flex-1">
              <h4 className="font-bold text-slate-900">Score 50 XP</h4>
              <div className="w-full bg-slate-200 h-2 rounded-full mt-2">
                <div className="bg-orange-500 h-2 rounded-full" style={{ width: `${Math.min((dailyXp / 50) * 100, 100)}%` }}></div>
              </div>
            </div>
            <span className="font-bold text-orange-600">{Math.min(dailyXp, 50)}/50</span>
          </div>
        </div>
      </div>

      {/* Jump Back In */}
      <div>
        <h2 className="text-xl font-bold text-slate-900 mb-4">Jump Back In</h2>
        <Link to="/learn" className="block">
          <div className="bg-gradient-to-r from-indigo-500 to-purple-600 p-6 rounded-2xl text-white shadow-md hover:shadow-lg transition-shadow">
            <h3 className="text-2xl font-bold mb-2">Continue Your Journey</h3>
            <p className="text-indigo-100 mb-4">Head to the Knowledge Map to pick up where you left off.</p>
            <button className="bg-white text-indigo-600 px-6 py-2 rounded-full font-bold hover:bg-indigo-50 transition-colors">
              Go to Map
            </button>
          </div>
        </Link>
      </div>
    </motion.div>
  );
}
