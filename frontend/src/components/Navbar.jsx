import React from 'react';

const Navbar = ({ user, role, setRole, theme, setTheme, toggleSidebar, searchQuery, setSearchQuery, unreadCount, onToggleNotif, activeTab, setActiveTab, onLogout }) => {
  const placeholder =
    activeTab === 'assignments' ? 'Search assignments...' :
    activeTab === 'reviews'    ? 'Search reviews...'     :
    activeTab === 'analytics'  ? 'Search metrics...'     :
    activeTab === 'settings'   ? 'Search settings...'    :
    activeTab === 'help'       ? 'Search help articles...' :
    'Search assignments...';

  const isDark = theme === 'dark';

  return (
    <header className="fixed top-0 right-0 left-0 md:left-64 h-[72px] bg-brand-bg/80 dark:bg-dark-bg/80 backdrop-blur-xl border-b border-brand-border dark:border-dark-border z-40 px-6 sm:px-8 transition-colors duration-300">
      <div className="h-full flex items-center justify-between gap-4 max-w-7xl mx-auto">

        {/* Mobile menu */}
        <button
          onClick={toggleSidebar}
          className="md:hidden p-2 text-brand-muted dark:text-dark-muted hover:bg-black/5 dark:hover:bg-white/5 rounded-lg transition-all duration-200"
        >
          <span className="material-symbols-outlined text-[20px]">menu</span>
        </button>

        {/* Search Bar - Sophisticated input */}
        <div className="hidden sm:flex items-center flex-1 max-w-sm relative group">
          <span className="absolute left-3 material-symbols-outlined text-[18px] text-brand-muted/70 group-focus-within:text-brand-accent transition-colors duration-200">
            search
          </span>
          <input
            type="text"
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            placeholder={placeholder}
            className="w-full bg-brand-bg-low dark:bg-white/5 focus:bg-brand-card dark:focus:bg-dark-card rounded-lg py-2.5 pl-10 pr-4 text-sm font-body text-brand-text dark:text-dark-text placeholder-brand-muted/50 dark:placeholder-dark-muted/50 outline-none border border-transparent focus:border-brand-accent/20 dark:focus:border-brand-accent/20 transition-all duration-200"
          />
        </div>

        {/* Right Actions */}
        <div className="flex items-center gap-2 sm:gap-4 ml-auto">

          {/* Role Switcher - Refined for Round 2 */}
          <div className="flex items-center bg-brand-bg-low dark:bg-white/5 p-1 rounded-lg">
            {['student', 'professor'].map(r => (
              <button
                key={r}
                onClick={() => setRole(r)}
                className={`px-4 py-1.5 rounded-md text-[10px] font-bold uppercase tracking-widest transition-all duration-200 ${
                  role === r
                    ? 'bg-brand-card dark:bg-dark-card text-brand-primary dark:text-dark-primary shadow-sm'
                    : 'text-brand-muted dark:text-dark-muted hover:text-brand-primary dark:hover:text-dark-text'
                }`}
              >
                {r === 'professor' ? 'Prof' : 'Student'}
              </button>
            ))}
          </div>

          <div className="h-4 w-px bg-brand-border dark:bg-dark-border mx-1 hidden sm:block" />

          {/* Theme Toggle */}
          <button
            onClick={() => setTheme(isDark ? 'light' : 'dark')}
            className="p-2 text-brand-muted dark:text-dark-muted hover:text-brand-primary dark:hover:text-dark-text transition-all duration-200 active:scale-95"
          >
            <span className="material-symbols-outlined text-[20px]">
              {isDark ? 'light_mode' : 'dark_mode'}
            </span>
          </button>

          {/* Notification Bell */}
          <button
            onClick={onToggleNotif}
            className="relative p-2 text-brand-muted dark:text-dark-muted hover:text-brand-primary dark:hover:text-dark-text transition-all duration-200 active:scale-95"
          >
            <span className="material-symbols-outlined text-[20px]">notifications</span>
            {unreadCount > 0 && (
              <span className="absolute top-1.5 right-1.5 w-1.5 h-1.5 bg-brand-accent dark:bg-brand-accent-dim rounded-full" />
            )}
          </button>

          {/* User Profile + Logout */}
          <div className="flex items-center gap-4 pl-3">
            <div className="hidden lg:block text-right">
              <p className="text-sm font-bold text-brand-primary dark:text-dark-text font-body leading-tight">{user.name}</p>
              <p className="text-[9px] font-bold text-brand-accent uppercase tracking-widest font-label mt-0.5">{role}</p>
            </div>
            <div className="relative group">
              <div className="w-10 h-10 rounded-lg bg-brand-bg-low dark:bg-white/5 overflow-hidden flex-shrink-0 border border-brand-border dark:border-dark-border shadow-sm group-hover:scale-105 transition-all duration-300 cursor-pointer">
                <img
                  src={user.avatar}
                  alt={user.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="absolute top-full right-0 mt-2 w-48 bg-white dark:bg-dark-sidebar border border-brand-border dark:border-dark-border rounded-xl shadow-card-lg opacity-0 pointer-events-none group-hover:opacity-100 group-hover:pointer-events-auto transition-all duration-200 transform origin-top-right scale-95 group-hover:scale-100 py-2">
                <button 
                  onClick={() => setActiveTab('settings')}
                  className="w-full text-left px-4 py-2 text-[11px] font-bold uppercase tracking-widest text-brand-muted hover:text-brand-primary dark:text-dark-muted dark:hover:text-dark-text hover:bg-brand-bg-low dark:hover:bg-white/5 flex items-center gap-3 transition-colors"
                >
                  <span className="material-symbols-outlined text-[18px]">person</span>
                  Profile Settings
                </button>
                <button 
                  onClick={onLogout}
                  className="w-full text-left px-4 py-2 text-[11px] font-bold uppercase tracking-widest text-red-500 hover:bg-red-500/5 flex items-center gap-3 transition-colors"
                >
                  <span className="material-symbols-outlined text-[18px]">logout</span>
                  Sign Out
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
