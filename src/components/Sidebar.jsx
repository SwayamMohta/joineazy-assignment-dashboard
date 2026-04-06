import React from 'react';
import { motion } from 'framer-motion';

const navItems = [
  { id: 'dashboard',   label: 'Dashboard',   icon: 'dashboard' },
  { id: 'assignments', label: 'Assignments',  icon: 'assignment' },
  { id: 'reviews',     label: 'Reviews',      icon: 'rate_review' },
  { id: 'analytics',   label: 'Analytics',    icon: 'bar_chart' },
  { id: 'settings',    label: 'Settings',     icon: 'settings' },
];

const Sidebar = ({ activeTab, setActiveTab }) => {
  return (
    <aside className="fixed left-0 top-0 h-screen w-64 bg-brand-bg dark:bg-dark-bg hidden md:flex flex-col z-50 border-r border-black/5 dark:border-white/5 transition-colors duration-300">

      {/* Brand Header */}
      <div
        onClick={() => setActiveTab('dashboard')}
        className="px-6 py-5 flex items-center gap-3 cursor-pointer hover:bg-black/5 dark:hover:bg-white/5 transition-colors group/logo"
      >
        <div className="w-10 h-10 rounded-full bg-brand-chip dark:bg-brand-secondary flex items-center justify-center flex-shrink-0 transition-all duration-300 group-hover/logo:scale-105">
          <span
            className="material-symbols-outlined text-brand-primary dark:text-dark-primary transition-colors"
            style={{ fontVariationSettings: "'FILL' 1, 'wght' 600, 'GRAD' 0, 'opsz' 24" }}
          >
            school
          </span>
        </div>
        <span className="font-headline font-bold text-xl text-brand-primary dark:text-dark-primary tracking-tight leading-none">
          JoinEazy
        </span>
      </div>

      {/* Section Label */}
      <div className="px-6 mb-2">
        <span className="text-[10px] font-bold uppercase tracking-widest text-brand-muted dark:text-dark-muted font-label">
          Main Menu
        </span>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-3 space-y-0.5">
        {navItems.map((item) => {
          const isActive = activeTab === item.id;
          return (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 group ${
                isActive
                  ? 'bg-brand-chip dark:bg-brand-secondary text-brand-primary dark:text-dark-primary shadow-sm'
                  : 'text-brand-muted dark:text-dark-muted hover:bg-black/5 dark:hover:bg-white/5 hover:text-brand-primary dark:hover:text-dark-text'
              }`}
            >
              <span
                className="material-symbols-outlined text-[20px] flex-shrink-0"
                style={{
                  fontVariationSettings: isActive
                    ? "'FILL' 1, 'wght' 600, 'GRAD' 0, 'opsz' 24"
                    : "'FILL' 0, 'wght' 400, 'GRAD' 0, 'opsz' 24",
                }}
              >
                {item.icon}
              </span>
              <span className={`font-body text-sm ${isActive ? 'font-bold' : 'font-medium'}`}>
                {item.label}
              </span>
              {isActive && (
                <motion.div
                  layoutId="sidebar-active-pill"
                  className="ml-auto w-1.5 h-1.5 rounded-full bg-brand-accent dark:bg-brand-accent-dim"
                  transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                />
              )}
            </button>
          );
        })}
      </nav>

      {/* Bottom Actions */}
      <div className="px-3 pt-4 pb-6 border-t border-black/5 dark:border-white/5">
        <button
          onClick={() => setActiveTab('help')}
          className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 ${
            activeTab === 'help'
              ? 'bg-brand-chip dark:bg-brand-secondary text-brand-primary dark:text-dark-primary shadow-sm'
              : 'text-brand-muted dark:text-dark-muted hover:bg-black/5 dark:hover:bg-white/5 hover:text-brand-primary dark:hover:text-dark-text'
          }`}
        >
          <span
            className="material-symbols-outlined text-[20px]"
            style={{ fontVariationSettings: activeTab === 'help' ? "'FILL' 1" : "'FILL' 0" }}
          >
            help
          </span>
          <span className={`font-body text-sm ${activeTab === 'help' ? 'font-bold' : 'font-medium'}`}>Help & Support</span>
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;
