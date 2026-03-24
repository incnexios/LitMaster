import { User, Mail, Calendar, LogOut } from 'lucide-react';
import { useStore } from '../store/useStore';
import { useAuth } from '../contexts/AuthContext';

export function Profile() {
  const { user, isLoading, signOut } = useAuth();
  const { xp, level, streak, completedLessons } = useStore();
  const isAuthenticated = !!user;

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-600"></div>
      </div>
    );
  }

  if (!isAuthenticated || !user) {
    return (
      <div className="text-center py-12">
        <h2 className="text-2xl font-bold text-slate-800 mb-4">Account Profile</h2>
        <p className="text-slate-600 mb-6">Please sign in to view your profile.</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-2xl p-8 border border-slate-200 shadow-sm">
        <div className="flex flex-col md:flex-row items-center gap-8">
          {user.user_metadata?.avatar_url ? (
            <img 
              src={user.user_metadata.avatar_url} 
              alt={user.user_metadata.full_name || 'User'} 
              className="w-32 h-32 rounded-full border-4 border-indigo-50 shadow-md"
              referrerPolicy="no-referrer"
            />
          ) : (
            <div className="w-32 h-32 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-600 border-4 border-indigo-50 shadow-md">
              <User className="w-12 h-12" />
            </div>
          )}
          
          <div className="flex-1 text-center md:text-left">
            <h1 className="text-3xl font-bold text-slate-900 mb-2">{user.user_metadata?.full_name || 'User'}</h1>
            <div className="flex flex-col md:flex-row gap-4 text-slate-600">
              <div className="flex items-center justify-center md:justify-start gap-2">
                <Mail className="w-4 h-4" />
                <span>{user.email}</span>
              </div>
              {user.last_sign_in_at && (
                <div className="flex items-center justify-center md:justify-start gap-2">
                  <Calendar className="w-4 h-4" />
                  <span>Last sign in: {new Date(user.last_sign_in_at).toLocaleDateString()}</span>
                </div>
              )}
            </div>
          </div>

          <button
            onClick={() => signOut()}
            className="flex items-center gap-2 px-6 py-3 bg-red-50 text-red-600 rounded-xl font-medium hover:bg-red-100 transition-colors"
          >
            <LogOut className="w-5 h-5" />
            Sign Out
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm text-center">
          <h3 className="text-slate-500 font-medium mb-2">Level</h3>
          <p className="text-4xl font-bold text-emerald-500">{level}</p>
        </div>
        <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm text-center">
          <h3 className="text-slate-500 font-medium mb-2">Total XP</h3>
          <p className="text-4xl font-bold text-blue-500">{xp}</p>
        </div>
        <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm text-center">
          <h3 className="text-slate-500 font-medium mb-2">Day Streak</h3>
          <p className="text-4xl font-bold text-orange-500">{streak}</p>
        </div>
        <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm text-center">
          <h3 className="text-slate-500 font-medium mb-2">Lessons Done</h3>
          <p className="text-4xl font-bold text-indigo-500">{completedLessons.length}</p>
        </div>
      </div>
    </div>
  );
}
