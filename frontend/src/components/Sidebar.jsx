import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const navItems = [
  { id: 'dashboard',   label: 'Dashboard',   icon: 'dashboard' },
  { id: 'courses',     label: 'Courses',     icon: 'school' },
  { id: 'assignments', label: 'Assignments',  icon: 'assignment' },
  { id: 'groups',      label: 'Groups',      icon: 'groups' },
  { id: 'reviews',     label: 'Reviews',      icon: 'rate_review' },
  { id: 'analytics',   label: 'Analytics',    icon: 'bar_chart' },
  { id: 'settings',    label: 'Settings',     icon: 'settings' },
];

const Sidebar = ({ activeTab, setActiveTab, isOpen, onClose }) => {
  return (
    <>
      {/* Mobile Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-dark-bg/60 backdrop-blur-sm z-[60] md:hidden"
          />
        )}
      </AnimatePresence>

      <aside className={`fixed left-0 top-0 h-screen w-64 bg-brand-card dark:bg-dark-sidebar flex flex-col z-[70] border-r border-brand-border dark:border-dark-border transition-all duration-500 ease-in-out md:translate-x-0 ${
        isOpen ? 'translate-x-0' : '-translate-x-full'
      }`}>

      {/* Brand Header */}
      <div
        onClick={() => setActiveTab('dashboard')}
        className="px-6 py-8 flex items-center gap-3 cursor-pointer group/logo"
      >
        <div className="w-10 h-10 rounded-xl bg-brand-primary dark:bg-dark-primary flex items-center justify-center flex-shrink-0 transition-all duration-300 group-hover/logo:scale-105 shadow-sm">
          <span
            className="material-symbols-outlined text-white dark:text-dark-bg transition-colors"
            style={{ fontVariationSettings: "'FILL' 1, 'wght' 600, 'GRAD' 0, 'opsz' 24" }}
          >
            school
          </span>
        </div>
        <div className="flex flex-col">
          <span className="font-headline font-bold text-xl text-brand-primary dark:text-dark-text tracking-tight leading-none">
            JoinEazy
          </span>
          <span className="text-[10px] font-bold text-brand-accent dark:text-brand-accent-dim uppercase tracking-widest mt-1">
            Academy
          </span>
        </div>
      </div>

      {/* Section Label */}
      <div className="px-6 mb-4">
        <span className="text-[10px] font-bold uppercase tracking-widest text-brand-muted dark:text-dark-muted font-label opacity-60">
          Navigation
        </span>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-4 space-y-1">
        {navItems.map((item) => {
          const isActive = activeTab === item.id;
          return (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 group relative ${
                isActive
                  ? 'bg-brand-bg-low dark:bg-white/5 text-brand-primary dark:text-dark-primary shadow-sm'
                  : 'text-brand-muted dark:text-dark-muted hover:text-brand-primary dark:hover:text-dark-text'
              }`}
            >
              {isActive && (
                <div className="absolute left-0 top-2 bottom-2 w-1 bg-brand-accent dark:bg-brand-accent-dim rounded-r-full" />
              )}
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
              <span className={`font-body text-sm ${isActive ? 'font-semibold' : 'font-medium'}`}>
                {item.label}
              </span>
            </button>
          );
        })}
      </nav>

      {/* Bottom Actions */}
      <div className="px-4 pt-4 pb-8">
        <button
          onClick={() => setActiveTab('help')}
          className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 ${
            activeTab === 'help'
              ? 'bg-brand-bg-low dark:bg-white/5 text-brand-primary dark:text-dark-primary shadow-sm'
              : 'text-brand-muted dark:text-dark-muted hover:text-brand-primary dark:hover:text-dark-text'
          }`}
        >
          <span
            className="material-symbols-outlined text-[20px]"
            style={{ fontVariationSettings: activeTab === 'help' ? "'FILL' 1" : "'FILL' 0" }}
          >
            help
          </span>
          <span className={`font-body text-sm ${activeTab === 'help' ? 'font-semibold' : 'font-medium'}`}>Help Center</span>
        </button>
      </div>
    </aside>
    </>
  );
};

export default Sidebar;
