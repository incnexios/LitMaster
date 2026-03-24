import { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { X, Mail, Lock, User as UserIcon, AlertCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function AuthModal({ isOpen, onClose }: AuthModalProps) {
  const [view, setView] = useState<'sign_in' | 'sign_up' | 'magic_link'>('sign_in');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [message, setMessage] = useState<string | null>(null);
  
  const { signInWithEmail, signUpWithEmail } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setMessage(null);
    setLoading(true);

    try {
      if (view === 'sign_up') {
        const { error: signUpError } = await signUpWithEmail(email, password, fullName);
        if (signUpError) throw signUpError;
        setMessage('Check your email for the confirmation link!');
      } else if (view === 'sign_in') {
        const { error: signInError } = await signInWithEmail(email, password);
        if (signInError) throw signInError;
        onClose();
      } else if (view === 'magic_link') {
        const { error: magicLinkError } = await signInWithEmail(email);
        if (magicLinkError) throw magicLinkError;
        setMessage('Check your email for the magic link!');
      }
    } catch (err: any) {
      setError(err.message || 'An error occurred during authentication');
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-sm">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          className="bg-white rounded-2xl shadow-xl w-full max-w-md overflow-hidden relative"
        >
          <button 
            onClick={onClose}
            className="absolute top-4 right-4 text-slate-400 hover:text-slate-600 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="p-8">
            <h2 className="text-2xl font-bold text-slate-900 mb-2">
              {view === 'sign_in' ? 'Welcome back' : view === 'sign_up' ? 'Create an account' : 'Send Magic Link'}
            </h2>
            <p className="text-slate-600 mb-6">
              {view === 'sign_in' 
                ? 'Sign in to continue your learning journey.' 
                : view === 'sign_up' 
                ? 'Join LitMaster to track your progress.' 
                : 'Sign in without a password.'}
            </p>

            {error && (
              <div className="mb-4 p-3 bg-red-50 border border-red-100 rounded-xl flex items-start gap-2 text-red-600 text-sm">
                <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
                <p>{error}</p>
              </div>
            )}

            {message && (
              <div className="mb-4 p-3 bg-emerald-50 border border-emerald-100 rounded-xl flex items-start gap-2 text-emerald-600 text-sm">
                <Mail className="w-4 h-4 shrink-0 mt-0.5" />
                <p>{message}</p>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              {view === 'sign_up' && (
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Full Name</label>
                  <div className="relative">
                    <UserIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                    <input
                      type="text"
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      required
                      className="w-full pl-10 pr-4 py-2 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all"
                      placeholder="John Doe"
                    />
                  </div>
                </div>
              )}

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Email Address</label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="w-full pl-10 pr-4 py-2 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all"
                    placeholder="you@example.com"
                  />
                </div>
              </div>

              {view !== 'magic_link' && (
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Password</label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                    <input
                      type="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                      minLength={6}
                      className="w-full pl-10 pr-4 py-2 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all"
                      placeholder="••••••••"
                    />
                  </div>
                </div>
              )}

              <button
                type="submit"
                disabled={loading}
                className="w-full py-3 px-4 bg-indigo-600 text-white rounded-xl font-bold hover:bg-indigo-700 transition-colors disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center"
              >
                {loading ? (
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                ) : (
                  view === 'sign_in' ? 'Sign In' : view === 'sign_up' ? 'Create Account' : 'Send Magic Link'
                )}
              </button>
            </form>

            <div className="mt-6 text-center text-sm text-slate-600 space-y-2">
              {view === 'sign_in' ? (
                <>
                  <p>
                    Don't have an account?{' '}
                    <button onClick={() => { setView('sign_up'); setError(null); setMessage(null); }} className="text-indigo-600 font-bold hover:underline">
                      Sign up
                    </button>
                  </p>
                  <p>
                    Or sign in with a{' '}
                    <button onClick={() => { setView('magic_link'); setError(null); setMessage(null); }} className="text-indigo-600 font-bold hover:underline">
                      Magic Link
                    </button>
                  </p>
                </>
              ) : view === 'sign_up' ? (
                <p>
                  Already have an account?{' '}
                  <button onClick={() => { setView('sign_in'); setError(null); setMessage(null); }} className="text-indigo-600 font-bold hover:underline">
                    Sign in
                  </button>
                </p>
              ) : (
                <p>
                  Remember your password?{' '}
                  <button onClick={() => { setView('sign_in'); setError(null); setMessage(null); }} className="text-indigo-600 font-bold hover:underline">
                    Sign in
                  </button>
                </p>
              )}
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
