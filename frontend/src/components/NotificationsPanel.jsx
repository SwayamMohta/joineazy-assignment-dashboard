import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const notifIconMap = {
  success: { icon: 'check_circle', color: '#10B981', bg: '#10B981' },
  warning: { icon: 'schedule',     color: '#F59E0B', bg: '#F59E0B' },
  error:   { icon: 'event_busy',   color: '#EF4444', bg: '#EF4444' },
  info:    { icon: 'info',         color: '#3B82F6', bg: '#3B82F6' },
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
            className="fixed inset-0 z-[60] bg-dark-bg/40 backdrop-blur-sm"
          />
          <motion.aside
            initial={{ x: '100%', opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: '100%', opacity: 0 }}
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
            className="fixed top-0 right-0 h-full w-full max-w-sm z-[70] bg-brand-card dark:bg-dark-sidebar flex flex-col border-l border-brand-border dark:border-dark-border premium-depth"
            style={{ boxShadow: '-12px 0 64px rgba(0,0,0,0.15)' }}
          >
            {/* Header */}
            <div className="px-6 py-8 flex items-center justify-between border-b border-brand-border dark:border-dark-border">
              <div>
                <h2 className="font-headline text-xl font-bold text-brand-primary dark:text-dark-text tracking-tight leading-none">Notifications</h2>
                {unread > 0 && (
                  <p className="text-[10px] font-bold text-brand-accent dark:text-brand-accent-dim uppercase tracking-[0.2em] font-label mt-2">
                    {unread} New Alerts
                  </p>
                )}
              </div>
              <div className="flex items-center gap-2">
                <button onClick={onClose} className="p-2 text-brand-muted dark:text-dark-muted hover:text-brand-primary dark:hover:text-dark-text transition-colors">
                  <span className="material-symbols-outlined text-[20px]">close</span>
                </button>
              </div>
            </div>

            {/* List */}
            <div className="flex-1 overflow-y-auto px-4 py-6 space-y-3">
              {notifications.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-full text-center py-16 opacity-50">
                  <span className="material-symbols-outlined text-brand-muted text-[48px] mb-4">notifications_off</span>
                  <h3 className="font-headline font-bold text-brand-text dark:text-dark-text uppercase tracking-widest text-xs">All Clear</h3>
                </div>
              ) : (
                <>
                  {unread > 0 && (
                    <div className="px-2 mb-4 flex justify-between items-center">
                      <span className="text-[9px] font-bold text-brand-muted uppercase tracking-widest">Recent</span>
                      <button onClick={onMarkAllRead} className="text-[9px] font-bold text-brand-accent hover:underline uppercase tracking-widest">
                        Clear All
                      </button>
                    </div>
                  )}
                  {notifications.map((notif, idx) => {
                    const iconConfig = notifIconMap[notif.type] || notifIconMap.info;
                    return (
                      <motion.div
                        key={notif.id}
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: idx * 0.05 }}
                        className={`relative flex items-start gap-4 p-4 rounded-xl transition-all duration-300 group border ${
                          notif.read
                            ? 'bg-transparent border-transparent'
                            : 'bg-brand-bg-low dark:bg-white/[0.03] border-brand-border dark:border-dark-border shadow-sm'
                        }`}
                      >
                        {/* Unread highlight bar */}
                        {!notif.read && (
                          <div className="absolute left-0 top-4 bottom-4 w-1 bg-brand-accent rounded-r-full" />
                        )}

                        {/* Icon - Studio style */}
                        <div
                          className="w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0"
                          style={{ backgroundColor: iconConfig.bg + '15' }}
                        >
                          <span className="material-symbols-outlined text-[18px]" style={{ color: iconConfig.color, fontVariationSettings: "'FILL' 0" }}>
                            {iconConfig.icon}
                          </span>
                        </div>

                        {/* Content */}
                        <div className="flex-grow min-w-0">
                          <div className="flex justify-between items-start">
                            <p className={`text-sm font-bold font-body leading-tight ${notif.read ? 'text-brand-muted/70' : 'text-brand-primary dark:text-dark-text'}`}>
                              {notif.title}
                            </p>
                            <button
                              onClick={() => onDismiss(notif.id)}
                              className="opacity-0 group-hover:opacity-100 p-1 text-brand-muted hover:text-red-500 transition-all flex-shrink-0"
                            >
                              <span className="material-symbols-outlined text-[14px]">close</span>
                            </button>
                          </div>
                          <p className="text-xs text-brand-muted dark:text-dark-muted mt-1 leading-relaxed line-clamp-2">{notif.body}</p>
                          <p className="text-[9px] font-bold text-brand-muted/50 uppercase tracking-widest font-label mt-2">
                            {notif.time}
                          </p>
                        </div>
                      </motion.div>
                    );
                  })}
                </>
              )}
            </div>

            {/* Footer */}
            <div className="p-8 border-t border-brand-border dark:border-dark-border bg-brand-bg-low/10">
               <button onClick={onClose} className="w-full btn-primary justify-center uppercase tracking-widest text-[10px]">
                 Close Panel
               </button>
            </div>
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
};

export default NotificationsPanel;
