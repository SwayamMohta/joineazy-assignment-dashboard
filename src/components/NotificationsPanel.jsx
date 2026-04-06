import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const notifIconMap = {
  success: { icon: 'check_circle', color: '#00b47d', bg: '#00b47d' },
  warning: { icon: 'schedule',     color: '#f59e0b', bg: '#f59e0b' },
  error:   { icon: 'event_busy',   color: '#ba1a1a', bg: '#ba1a1a' },
  info:    { icon: 'info',         color: '#002045', bg: '#002045' },
};

const NotificationsPanel = ({ isOpen, onClose, notifications, onMarkAllRead, onDismiss }) => {
  const unread = notifications.filter(n => !n.read).length;

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 z-[60] bg-black/25 dark:bg-black/40"
          />
          <motion.aside
            initial={{ x: '100%', opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: '100%', opacity: 0 }}
            transition={{ type: 'spring', stiffness: 340, damping: 32 }}
            className="fixed top-0 right-0 h-full w-full max-w-sm z-[70] bg-brand-bg dark:bg-dark-bg flex flex-col border-l border-black/5 dark:border-white/5 transition-colors duration-300"
            style={{ boxShadow: '-4px 0 40px rgba(0,0,0,0.12)' }}
          >
            {/* Header */}
            <div className="px-6 py-5 flex items-center justify-between border-b border-black/5 dark:border-white/5">
              <div>
                <h2 className="font-headline text-lg font-bold text-brand-text dark:text-dark-text tracking-tight">Notifications</h2>
                {unread > 0 && (
                  <p className="text-[10px] font-bold text-brand-muted dark:text-dark-muted uppercase tracking-widest font-label mt-0.5">
                    {unread} unread
                  </p>
                )}
              </div>
              <div className="flex items-center gap-2">
                {unread > 0 && (
                  <button onClick={onMarkAllRead} className="text-[11px] font-bold text-brand-accent dark:text-brand-accent-dim hover:underline font-label uppercase tracking-wide">
                    Mark all read
                  </button>
                )}
                <button onClick={onClose} className="p-2 text-brand-muted dark:text-dark-muted hover:bg-brand-bg-low dark:hover:bg-white/10 rounded-xl transition-colors">
                  <span className="material-symbols-outlined text-[18px]">close</span>
                </button>
              </div>
            </div>

            {/* List */}
            <div className="flex-1 overflow-y-auto px-4 py-4 space-y-2">
              {notifications.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-full text-center py-16">
                  <div className="w-14 h-14 rounded-full bg-brand-bg-low dark:bg-dark-bg-low flex items-center justify-center mb-4">
                    <span className="material-symbols-outlined text-brand-muted dark:text-dark-muted text-[28px]">notifications_off</span>
                  </div>
                  <h3 className="font-headline font-bold text-brand-text dark:text-dark-text mb-1">All caught up</h3>
                  <p className="text-sm text-brand-muted dark:text-dark-muted">No new notifications</p>
                </div>
              ) : (
                notifications.map((notif, idx) => {
                  const iconConfig = notifIconMap[notif.type] || notifIconMap.info;
                  return (
                    <motion.div
                      key={notif.id}
                      initial={{ opacity: 0, x: 10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: idx * 0.04 }}
                      className={`relative flex items-start gap-4 p-4 rounded-xl transition-all duration-200 group border ${
                        notif.read
                          ? 'bg-black/[0.02] dark:bg-white/[0.02] border-transparent'
                          : 'bg-brand-card dark:bg-dark-card border-black/5 dark:border-white/5'
                      }`}
                    >
                      {/* Unread dot */}
                      {!notif.read && (
                        <span className="absolute top-[22px] left-2 w-2 h-2 rounded-full bg-brand-primary dark:bg-brand-accent-dim" />
                      )}

                      {/* Icon */}
                      <div
                        className="w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5"
                        style={{ backgroundColor: iconConfig.bg + '20' }}
                      >
                        <span className="material-symbols-outlined text-[18px]" style={{ color: iconConfig.color, fontVariationSettings: "'FILL' 1" }}>
                          {iconConfig.icon}
                        </span>
                      </div>

                      {/* Content */}
                      <div className="flex-grow min-w-0">
                        <p className={`text-sm font-bold font-body leading-tight ${notif.read ? 'text-brand-muted dark:text-dark-muted' : 'text-brand-text dark:text-dark-text'}`}>
                          {notif.title}
                        </p>
                        <p className="text-xs text-brand-muted dark:text-dark-muted mt-1 leading-relaxed">{notif.body}</p>
                        <p className="text-[10px] font-bold text-brand-muted dark:text-dark-muted uppercase tracking-widest font-label mt-2 opacity-60">
                          {notif.time}
                        </p>
                      </div>

                      {/* Dismiss */}
                      <button
                        onClick={() => onDismiss(notif.id)}
                        className="opacity-0 group-hover:opacity-100 p-1.5 text-brand-muted dark:text-dark-muted hover:bg-brand-bg-low dark:hover:bg-white/10 rounded-lg transition-all flex-shrink-0"
                      >
                        <span className="material-symbols-outlined text-[14px]">close</span>
                      </button>
                    </motion.div>
                  );
                })
              )}
            </div>

            {/* Footer */}
            <div className="px-6 py-4 border-t border-black/5 dark:border-white/5 bg-brand-bg-low/30 dark:bg-dark-bg-low/30">
              <p className="text-[10px] text-brand-muted dark:text-dark-muted text-center font-label font-bold uppercase tracking-widest">
                Showing last 30 days
              </p>
            </div>
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
};

export default NotificationsPanel;
