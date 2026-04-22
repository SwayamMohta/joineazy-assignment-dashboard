import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const LoginPage = ({ onLogin }) => {
  const [isRegistering, setIsRegistering] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [role, setRole] = useState('student');
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email || !password || (isRegistering && !name)) {
      setError('Please fill in all fields');
      return;
    }
    
    if (isRegistering) {
      // Mock registration
      onLogin({ 
        id: `u-${Date.now()}`, 
        name, 
        role, 
        email, 
        groupId: null,
        avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${name}`
      });
    } else {
      // Simple mock login
      if (email.includes('professor')) {
        onLogin({ id: 'p1', name: 'Dr. Sarah Jenkins', role: 'professor', email });
      } else {
        onLogin({ id: 's1', name: 'Arjun Singh', role: 'student', email, groupId: 'g1' });
      }
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-brand-bg dark:bg-dark-bg p-6">
      <motion.div 
        layout
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-md w-full bg-white dark:bg-dark-sidebar p-10 rounded-3xl border border-brand-border dark:border-dark-border premium-depth"
      >
        <div className="text-center mb-10">
          <div className="w-16 h-16 bg-brand-primary dark:bg-brand-accent rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-card-lg">
            <span className="material-symbols-outlined text-white text-3xl">school</span>
          </div>
          <h1 className="font-headline text-3xl font-bold text-brand-primary dark:text-dark-text tracking-tight">
            {isRegistering ? 'Create Account' : 'Welcome Back'}
          </h1>
          <p className="text-brand-muted dark:text-dark-muted font-body mt-2">
            {isRegistering ? 'Join the academic network' : 'Sign in to your JoinEazy account'}
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          <AnimatePresence mode="wait">
            {isRegistering && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="space-y-5"
              >
                <div>
                  <label className="block text-[10px] font-bold text-brand-muted dark:text-dark-muted uppercase tracking-[0.2em] mb-2 px-1 font-label">
                    Full Name
                  </label>
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Enter your name"
                    className="w-full bg-brand-bg-low dark:bg-white/5 border border-brand-border dark:border-dark-border rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-brand-accent outline-none transition-all dark:text-dark-text"
                  />
                </div>
                <div>
                  <label className="block text-[10px] font-bold text-brand-muted dark:text-dark-muted uppercase tracking-[0.2em] mb-2 px-1 font-label">
                    Role
                  </label>
                  <div className="flex gap-3">
                    {['student', 'professor'].map(r => (
                      <button
                        key={r}
                        type="button"
                        onClick={() => setRole(r)}
                        className={`flex-1 py-2.5 rounded-xl text-[10px] font-bold uppercase tracking-widest border transition-all ${
                          role === r 
                            ? 'bg-brand-accent text-white border-brand-accent' 
                            : 'bg-transparent border-brand-border text-brand-muted hover:border-brand-accent/50'
                        }`}
                      >
                        {r}
                      </button>
                    ))}
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          <div>
            <label className="block text-[10px] font-bold text-brand-muted dark:text-dark-muted uppercase tracking-[0.2em] mb-2 px-1 font-label">
              Email Address
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="name@university.edu"
              className="w-full bg-brand-bg-low dark:bg-white/5 border border-brand-border dark:border-dark-border rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-brand-accent outline-none transition-all dark:text-dark-text"
            />
          </div>

          <div>
            <label className="block text-[10px] font-bold text-brand-muted dark:text-dark-muted uppercase tracking-[0.2em] mb-2 px-1 font-label">
              Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              className="w-full bg-brand-bg-low dark:bg-white/5 border border-brand-border dark:border-dark-border rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-brand-accent outline-none transition-all dark:text-dark-text"
            />
          </div>

          {error && <p className="text-red-500 text-xs font-medium px-1">{error}</p>}

          <button
            type="submit"
            className="w-full btn-primary py-4 rounded-xl text-sm font-bold tracking-widest uppercase shadow-card-lg mt-2"
          >
            {isRegistering ? 'Register Now' : 'Sign In'}
          </button>
        </form>

        <div className="mt-10 text-center space-y-4">
          <p className="text-xs text-brand-muted dark:text-dark-muted font-body">
            {isRegistering ? 'Already have an account?' : "Don't have an account?"} {' '}
            <span 
              onClick={() => { setIsRegistering(!isRegistering); setError(''); }}
              className="text-brand-accent cursor-pointer font-bold hover:underline transition-all"
            >
              {isRegistering ? 'Sign In' : 'Register'}
            </span>
          </p>
          {!isRegistering && (
            <div className="pt-6 border-t border-brand-border dark:border-dark-border">
              <p className="text-[9px] text-brand-muted/40 uppercase tracking-[0.2em] font-bold mb-4">Demo Credentials</p>
              <div className="flex justify-center gap-3">
                <button 
                  onClick={() => { setEmail('student@university.edu'); setPassword('password'); }}
                  className="px-4 py-2 bg-brand-bg-low dark:bg-white/5 rounded-lg text-[10px] font-bold uppercase tracking-widest text-brand-muted hover:text-brand-accent transition-colors border border-transparent hover:border-brand-accent/20"
                >
                  Student
                </button>
                <button 
                  onClick={() => { setEmail('professor@university.edu'); setPassword('password'); }}
                  className="px-4 py-2 bg-brand-bg-low dark:bg-white/5 rounded-lg text-[10px] font-bold uppercase tracking-widest text-brand-muted hover:text-brand-accent transition-colors border border-transparent hover:border-brand-accent/20"
                >
                  Professor
                </button>
              </div>
            </div>
          )}
        </div>
      </motion.div>
    </div>
  );
};

export default LoginPage;
