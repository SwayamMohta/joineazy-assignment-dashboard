import React from 'react';

const Navbar = ({ role, setRole, theme, setTheme, toggleSidebar, searchQuery, setSearchQuery, unreadCount, onToggleNotif, activeTab, setActiveTab }) => {
  const placeholder =
    activeTab === 'assignments' ? 'Search assignments...' :
    activeTab === 'reviews'    ? 'Search reviews...'     :
    activeTab === 'analytics'  ? 'Search metrics...'     :
    activeTab === 'settings'   ? 'Search settings...'    :
    activeTab === 'help'       ? 'Search help articles...' :
    'Search assignments...';

  const isDark = theme === 'dark';

  return (
    <header className="fixed top-0 right-0 left-0 md:left-64 h-[72px] bg-brand-bg/90 dark:bg-dark-bg/90 backdrop-blur-md border-b border-black/5 dark:border-white/5 z-40 px-6 sm:px-8 transition-colors duration-300">
      <div className="h-full flex items-center justify-between gap-4 max-w-7xl mx-auto">

        {/* Mobile menu */}
        <button
          onClick={toggleSidebar}
          className="md:hidden p-2 text-brand-muted dark:text-dark-muted hover:bg-black/5 dark:hover:bg-white/5 rounded-xl transition-all duration-200"
        >
          <span className="material-symbols-outlined text-[20px]">menu</span>
        </button>

        {/* Search Bar */}
        <div className="hidden sm:flex items-center flex-1 max-w-sm relative group">
          <span className="absolute left-3 material-symbols-outlined text-[18px] text-brand-muted dark:text-dark-muted group-focus-within:text-brand-primary dark:group-focus-within:text-dark-primary transition-colors duration-200">
            search
          </span>
          <input
            type="text"
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            placeholder={placeholder}
            className="w-full bg-black/5 dark:bg-white/5 focus:bg-brand-card dark:focus:bg-dark-card rounded-xl py-2.5 pl-10 pr-4 text-sm font-body text-brand-text dark:text-dark-text placeholder-brand-muted dark:placeholder-dark-muted outline-none border border-transparent focus:border-brand-primary/20 dark:focus:border-white/10 transition-all duration-200"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute right-3 p-0.5 text-brand-muted dark:text-dark-muted hover:text-brand-primary dark:hover:text-dark-primary transition-colors"
            >
              <span className="material-symbols-outlined text-[16px]">close</span>
            </button>
          )}
        </div>

        {/* Right Actions */}
        <div className="flex items-center gap-2 sm:gap-3 ml-auto">

          {/* Role Switcher */}
          <div className="flex items-center bg-black/5 dark:bg-white/5 p-1 rounded-xl">
            {['student', 'admin'].map(r => (
              <button
                key={r}
                onClick={() => setRole(r)}
                className={`px-4 py-1.5 rounded-lg text-[11px] font-bold uppercase tracking-wide transition-all duration-200 ${
                  role === r
                    ? 'bg-brand-card dark:bg-dark-card text-brand-primary dark:text-dark-primary shadow-sm'
                    : 'text-brand-muted dark:text-dark-muted hover:text-brand-primary dark:hover:text-dark-text'
                }`}
              >
                {r}
              </button>
            ))}
          </div>

          {/* Theme Toggle */}
          <button
            onClick={() => setTheme(isDark ? 'light' : 'dark')}
            className="p-2 text-brand-muted dark:text-dark-muted hover:bg-black/5 dark:hover:bg-white/5 rounded-xl transition-all duration-200 active:scale-95"
            aria-label="Toggle Theme"
            title={isDark ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
          >
            <span className="material-symbols-outlined text-[20px]">
              {isDark ? 'light_mode' : 'dark_mode'}
            </span>
          </button>

          {/* Notification Bell */}
          <button
            onClick={onToggleNotif}
            className="relative p-2 text-brand-muted dark:text-dark-muted hover:bg-black/5 dark:hover:bg-white/5 rounded-xl transition-all duration-200 active:scale-95"
            aria-label="Notifications"
          >
            <span className="material-symbols-outlined text-[20px]">notifications</span>
            {unreadCount > 0 && (
              <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 border-2 border-brand-bg dark:border-dark-bg rounded-full" />
            )}
          </button>

          {/* User Profile */}
          <div
            onClick={() => setActiveTab('settings')}
            className="flex items-center gap-3 pl-3 border-l border-black/10 dark:border-white/10 cursor-pointer group/profile"
          >
            <div className="hidden sm:block text-right">
              <p className="text-sm font-bold text-brand-primary dark:text-dark-primary font-body leading-tight group-hover/profile:text-brand-accent dark:group-hover/profile:text-brand-accent-dim transition-colors duration-200">Arjun Singh</p>
              <p className="text-[10px] font-bold text-brand-muted dark:text-dark-muted uppercase tracking-widest font-label mt-0.5">{role}</p>
            </div>
            <div className="w-10 h-10 rounded-xl bg-brand-chip dark:bg-brand-secondary overflow-hidden flex-shrink-0 border-2 border-brand-bg dark:border-dark-card shadow-sm group-hover/profile:scale-105 transition-all duration-300">
              <img
                src={`https://api.dicebear.com/7.x/avataaars/svg?seed=Arjun`}
                alt="Arjun Singh"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
