import { Link, useLocation } from 'react-router-dom';
import { Home, BookOpen, PenTool, MessageSquare, Flame, Star, Award, BookText, FileText, Sparkles, LogIn, LogOut, User, AlertCircle } from 'lucide-react';
import { useStore } from '../store/useStore';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { useAuth } from '../contexts/AuthContext';
import { useState } from 'react';
import { AuthModal } from './AuthModal';

export function cn(...inputs: (string | undefined | null | false)[]) {
  return twMerge(clsx(inputs));
}

export function Layout({ children }: { children: React.ReactNode }) {
  const location = useLocation();
  const { xp, streak, level } = useStore();
  const { signOut, user, isLoading } = useAuth();
  const [authError, setAuthError] = useState<string | null>(null);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  
  const isAuthenticated = !!user;

  const handleLoginClick = () => {
    setAuthError(null);
    
    // Check if env vars are missing
    if (!import.meta.env.VITE_SUPABASE_URL || !import.meta.env.VITE_SUPABASE_ANON_KEY) {
      setAuthError("Supabase environment variables are missing. Please add them in the Settings/Secrets menu.");
      return;
    }

    setIsAuthModalOpen(true);
  };

  const navItems = [
    { name: 'Dashboard', path: '/', icon: Home },
    { name: 'Learn', path: '/learn', icon: BookOpen },
    { name: 'Essay Trainer', path: '/essay', icon: PenTool },
    { name: 'AI Tutor', path: '/tutor', icon: MessageSquare },
    { name: 'Analysis', path: '/analysis', icon: FileText },
    { name: 'Textbook', path: '/textbook', icon: BookText },
    { name: 'Studio', path: '/generator', icon: Sparkles },
    { name: 'Profile', path: '/profile', icon: User },
  ];

  return (
    <div className="flex h-screen bg-slate-50 text-slate-900 font-sans">
      {/* Sidebar */}
      <aside className="w-64 bg-white border-r border-slate-200 flex flex-col hidden md:flex">
        <div className="p-6">
          <h1 className="text-2xl font-bold text-indigo-600 flex items-center gap-2">
            <BookOpen className="w-8 h-8" />
            LitMaster
          </h1>
        </div>
        <nav className="flex-1 px-4 space-y-2 overflow-y-auto">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = location.pathname === item.path;
            return (
              <Link
                key={item.name}
                to={item.path}
                className={cn(
                  "flex items-center gap-3 px-4 py-3 rounded-xl font-medium transition-all duration-200",
                  isActive 
                    ? "bg-indigo-100 text-indigo-700" 
                    : "text-slate-600 hover:bg-slate-100 hover:text-slate-900"
                )}
              >
                <Icon className="w-5 h-5" />
                {item.name}
              </Link>
            );
          })}
        </nav>
        
        {/* Auth Section */}
        <div className="p-4 border-t border-slate-200">
          {authError && (
            <div className="mb-3 p-3 bg-red-50 border border-red-100 rounded-xl flex items-start gap-2 text-red-600 text-xs">
              <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
              <p>{authError}</p>
            </div>
          )}
          {!isLoading && (
            isAuthenticated ? (
              <div className="flex flex-col gap-3">
                <Link to="/profile" className="flex items-center gap-3 px-2 hover:bg-slate-50 p-2 rounded-xl transition-colors">
                  {user?.user_metadata?.avatar_url ? (
                    <img src={user.user_metadata.avatar_url} alt={user.user_metadata.full_name || 'User'} className="w-10 h-10 rounded-full border border-slate-200" referrerPolicy="no-referrer" />
                  ) : (
                    <div className="w-10 h-10 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-600">
                      <User className="w-5 h-5" />
                    </div>
                  )}
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-bold text-slate-900 truncate">{user?.user_metadata?.full_name || 'User'}</p>
                    <p className="text-xs text-slate-500 truncate">{user?.email}</p>
                  </div>
                </Link>
                <button
                  onClick={() => signOut()}
                  className="flex items-center justify-center gap-2 w-full py-2.5 px-4 rounded-xl text-sm font-medium text-slate-600 hover:bg-red-50 hover:text-red-600 transition-colors"
                >
                  <LogOut className="w-4 h-4" />
                  Sign Out
                </button>
              </div>
            ) : (
              <button
                onClick={handleLoginClick}
                className="flex items-center justify-center gap-2 w-full py-3 px-4 rounded-xl text-sm font-bold bg-indigo-600 text-white hover:bg-indigo-700 transition-colors shadow-sm"
              >
                <LogIn className="w-4 h-4" />
                Sign In / Sign Up
              </button>
            )
          )}
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Topbar */}
        <header className="h-16 bg-white border-b border-slate-200 flex items-center justify-between px-6 shrink-0">
          <div className="md:hidden flex items-center gap-3">
            <h1 className="text-xl font-bold text-indigo-600">LitMaster</h1>
          </div>
          <div className="flex items-center gap-4 md:gap-6 ml-auto">
            <div className="flex items-center gap-1.5 md:gap-2 text-orange-500 font-bold text-sm md:text-base">
              <Flame className="w-4 h-4 md:w-5 md:h-5 fill-current" />
              <span>{streak}</span>
            </div>
            <div className="flex items-center gap-1.5 md:gap-2 text-blue-500 font-bold text-sm md:text-base">
              <Star className="w-4 h-4 md:w-5 md:h-5 fill-current" />
              <span>{xp} XP</span>
            </div>
            <div className="flex items-center gap-1.5 md:gap-2 text-emerald-500 font-bold text-sm md:text-base">
              <Award className="w-4 h-4 md:w-5 md:h-5 fill-current" />
              <span className="hidden md:inline">Lvl {level}</span>
              <span className="md:hidden">{level}</span>
            </div>
            
            {/* Mobile Auth Avatar */}
            <div className="md:hidden ml-2 border-l border-slate-200 pl-4">
              {!isLoading && (
                isAuthenticated ? (
                  <Link to="/profile" className="block">
                    {user?.user_metadata?.avatar_url ? (
                      <img src={user.user_metadata.avatar_url} alt={user.user_metadata.full_name || 'User'} className="w-8 h-8 rounded-full border border-slate-200" referrerPolicy="no-referrer" />
                    ) : (
                      <div className="w-8 h-8 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-600">
                        <User className="w-4 h-4" />
                      </div>
                    )}
                  </Link>
                ) : (
                  <button onClick={handleLoginClick} className="text-indigo-600 p-1">
                    <LogIn className="w-5 h-5" />
                  </button>
                )
              )}
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 overflow-y-auto p-6">
          <div className="max-w-4xl mx-auto">
            {children}
          </div>
        </main>

        {/* Mobile Nav */}
        <nav className="md:hidden bg-white border-t border-slate-200 flex justify-around p-3 shrink-0 overflow-x-auto">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = location.pathname === item.path;
            return (
              <Link
                key={item.name}
                to={item.path}
                className={cn(
                  "flex flex-col items-center p-2 rounded-xl min-w-[64px]",
                  isActive ? "text-indigo-600" : "text-slate-400"
                )}
              >
                <Icon className="w-6 h-6" />
                <span className="text-[10px] font-medium mt-1 truncate w-full text-center">{item.name}</span>
              </Link>
            );
          })}
        </nav>
      </div>

      <AuthModal 
        isOpen={isAuthModalOpen} 
        onClose={() => setIsAuthModalOpen(false)} 
      />
    </div>
  );
}
