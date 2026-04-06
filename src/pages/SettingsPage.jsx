import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { INITIAL_ASSIGNMENTS, MOCK_NOTIFICATIONS } from '../data/mockData';

const SectionCard = ({ title, children }) => (
  <div className="bg-brand-card dark:bg-dark-card rounded-xl overflow-hidden border border-black/5 dark:border-white/5 transition-colors duration-300">
    <div className="px-6 py-4 border-b border-black/5 dark:border-white/5">
      <h3 className="font-headline text-base font-bold text-brand-primary dark:text-dark-text">{title}</h3>
    </div>
    <div className="px-6 py-2">{children}</div>
  </div>
);

const Toggle = ({ value, onChange, label, desc }) => (
  <div className="flex items-center justify-between py-4 border-b border-black/5 dark:border-white/5 last:border-0">
    <div>
      <p className="text-sm font-bold text-brand-text dark:text-dark-text font-body">{label}</p>
      {desc && <p className="text-xs text-brand-muted dark:text-dark-muted mt-0.5">{desc}</p>}
    </div>
    <button
      onClick={() => onChange(!value)}
      className={`relative w-12 h-6 rounded-full transition-all duration-300 flex-shrink-0 ${value ? 'bg-brand-accent' : 'bg-black/15 dark:bg-white/15'}`}
    >
      <span
        className={`absolute top-1 w-4 h-4 rounded-full bg-white transition-all duration-300 ${value ? 'left-7' : 'left-1'}`}
        style={{ boxShadow: '0 1px 4px rgba(0,0,0,0.2)' }}
      />
    </button>
  </div>
);

const SettingsPage = ({ role, setRole, theme, setTheme, assignments, setAssignments, setNotifications }) => {
  const [notifPrefs, setNotifPrefs] = useState({
    deadlines: true,
    submissions: true,
    reviews: true,
    announcements: false,
  });
  const [saved, setSaved] = useState(false);

  const handleSave = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 2500);
  };

  const handleReset = () => {
    if (window.confirm('Reset all assignments to default data? This cannot be undone.')) {
      setAssignments(INITIAL_ASSIGNMENTS);
      setNotifications(MOCK_NOTIFICATIONS);
      localStorage.removeItem('joineazy_assignments');
    }
  };

  const handleExport = () => {
    const blob = new Blob([JSON.stringify({ assignments }, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'joineazy-export.json';
    link.click();
  };

  return (
    <div className="space-y-8 max-w-2xl">
      {/* Header */}
      <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}>
        <span className="text-[10px] font-bold uppercase tracking-widest text-brand-muted dark:text-dark-muted font-label">Account</span>
        <h1 className="font-headline text-4xl font-extrabold tracking-tight text-brand-primary dark:text-dark-text mt-1">Settings</h1>
        <p className="text-brand-muted dark:text-dark-muted font-body font-medium mt-1.5">Manage your preferences and account configuration.</p>
      </motion.div>

      {/* Profile */}
      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.07 }}>
        <SectionCard title="Profile Information">
          <div className="py-4 flex items-center gap-4 border-b border-black/5 dark:border-white/5">
            <div className="w-16 h-16 rounded-xl bg-brand-chip dark:bg-brand-secondary overflow-hidden flex-shrink-0">
              <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=Arjun" alt="Arjun" className="w-full h-full object-cover" />
            </div>
            <div className="flex-grow">
              <p className="font-headline text-lg font-bold text-brand-text dark:text-dark-text">Arjun Singh</p>
              <p className="text-xs text-brand-muted dark:text-dark-muted font-label">arjun.singh@university.edu</p>
              <p className="text-[10px] font-bold text-brand-muted dark:text-dark-muted uppercase tracking-widest font-label mt-1">Student ID: #882910</p>
            </div>
            <button className="px-4 py-2 bg-brand-bg-low dark:bg-dark-bg-low text-brand-text dark:text-dark-text rounded-lg text-xs font-bold hover:bg-brand-chip dark:hover:bg-white/10 transition-colors font-label uppercase tracking-wide border border-black/5 dark:border-white/5">
              Edit Profile
            </button>
          </div>

          <div className="flex items-center justify-between py-4">
            <div>
              <p className="text-sm font-bold text-brand-text dark:text-dark-text font-body">Current Role</p>
              <p className="text-xs text-brand-muted dark:text-dark-muted mt-0.5">Switch between Student and Admin perspectives</p>
            </div>
            <div className="flex items-center bg-brand-bg-low dark:bg-dark-bg-low p-1 rounded-xl border border-black/5 dark:border-white/5">
              {['student', 'admin'].map(r => (
                <button
                  key={r}
                  onClick={() => setRole(r)}
                  className={`px-4 py-1.5 rounded-lg text-[11px] font-bold uppercase tracking-wide transition-all duration-200 ${
                    role === r
                      ? 'bg-brand-card dark:bg-dark-card text-brand-primary dark:text-dark-primary shadow-sm'
                      : 'text-brand-muted dark:text-dark-muted hover:text-brand-text dark:hover:text-dark-text'
                  }`}
                >
                  {r}
                </button>
              ))}
            </div>
          </div>
        </SectionCard>
      </motion.div>

      {/* Appearance */}
      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.12 }}>
        <SectionCard title="Appearance">
          <div className="py-4 flex items-center justify-between border-b border-black/5 dark:border-white/5">
            <div>
              <p className="text-sm font-bold text-brand-text dark:text-dark-text font-body">Theme</p>
              <p className="text-xs text-brand-muted dark:text-dark-muted mt-0.5">Choose your preferred color scheme</p>
            </div>
            <div className="flex items-center gap-2">
              {['light', 'dark'].map(t => (
                <button
                  key={t}
                  onClick={() => setTheme(t)}
                  className={`px-4 py-2 rounded-lg text-[11px] font-bold uppercase tracking-wide transition-all duration-200 flex items-center gap-1.5 ${
                    theme === t
                      ? 'bg-brand-primary dark:bg-brand-accent text-white shadow-primary'
                      : 'bg-brand-bg-low dark:bg-dark-bg-low text-brand-muted dark:text-dark-muted hover:bg-brand-chip dark:hover:bg-white/10 hover:text-brand-primary dark:hover:text-dark-text border border-black/5 dark:border-white/5'
                  }`}
                >
                  <span className="material-symbols-outlined text-[14px]">
                    {t === 'light' ? 'light_mode' : 'dark_mode'}
                  </span>
                  {t}
                </button>
              ))}
            </div>
          </div>
          <div className="flex items-center justify-between py-4">
            <div>
              <p className="text-sm font-bold text-brand-text dark:text-dark-text font-body">Compact Mode</p>
              <p className="text-xs text-brand-muted dark:text-dark-muted mt-0.5">Reduce padding and card heights</p>
            </div>
            <span className="text-[10px] font-bold text-brand-muted dark:text-dark-muted uppercase tracking-widest bg-brand-bg-low dark:bg-dark-bg-low px-2.5 py-1 rounded-md font-label border border-black/5 dark:border-white/5">Coming Soon</span>
          </div>
        </SectionCard>
      </motion.div>

      {/* Notifications */}
      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.17 }}>
        <SectionCard title="Notification Preferences">
          <Toggle value={notifPrefs.deadlines}     onChange={v => setNotifPrefs(p => ({ ...p, deadlines: v }))}     label="Deadline Alerts"          desc="Get notified 48 hours before assignment deadlines" />
          <Toggle value={notifPrefs.submissions}   onChange={v => setNotifPrefs(p => ({ ...p, submissions: v }))}   label="Submission Confirmations" desc="Receive a confirmation when a submission is recorded" />
          <Toggle value={notifPrefs.reviews}       onChange={v => setNotifPrefs(p => ({ ...p, reviews: v }))}       label="Review & Feedback"        desc="Notify when instructor leaves feedback on your work" />
          <Toggle value={notifPrefs.announcements} onChange={v => setNotifPrefs(p => ({ ...p, announcements: v }))} label="Course Announcements"     desc="General announcements from course instructors" />
        </SectionCard>
      </motion.div>

      {/* Data Management */}
      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.22 }}>
        <SectionCard title="Data Management">
          <div className="py-4 flex items-center justify-between border-b border-black/5 dark:border-white/5">
            <div>
              <p className="text-sm font-bold text-brand-text dark:text-dark-text font-body">Reset to Default Data</p>
              <p className="text-xs text-brand-muted dark:text-dark-muted mt-0.5">Restore all assignments and notifications to sample data</p>
            </div>
            <button
              onClick={handleReset}
              className="flex items-center gap-1.5 px-4 py-2 bg-red-50 dark:bg-red-900/20 text-error-red dark:text-red-300 rounded-lg text-xs font-bold hover:bg-red-100 dark:hover:bg-red-900/40 transition-colors font-label uppercase tracking-wide"
            >
              <span className="material-symbols-outlined text-[14px]">restart_alt</span>
              Reset
            </button>
          </div>
          <div className="py-4 flex items-center justify-between">
            <div>
              <p className="text-sm font-bold text-brand-text dark:text-dark-text font-body">Export Data</p>
              <p className="text-xs text-brand-muted dark:text-dark-muted mt-0.5">Download a JSON snapshot of your dashboard data</p>
            </div>
            <button
              onClick={handleExport}
              className="flex items-center gap-1.5 px-4 py-2 bg-brand-bg-low dark:bg-dark-bg-low text-brand-text dark:text-dark-text rounded-lg text-xs font-bold hover:bg-brand-chip dark:hover:bg-white/10 transition-colors font-label uppercase tracking-wide border border-black/5 dark:border-white/5"
            >
              <span className="material-symbols-outlined text-[14px]">download</span>
              Export
            </button>
          </div>
        </SectionCard>
      </motion.div>

      {/* Footer / Save */}
      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.27 }}>
        <div className="bg-brand-card dark:bg-dark-card rounded-xl p-6 flex items-center justify-between border border-black/5 dark:border-white/5">
          <div>
            <p className="text-xs font-bold text-brand-muted dark:text-dark-muted uppercase tracking-widest font-label">JoinEazy</p>
            <p className="text-[10px] text-brand-muted dark:text-dark-muted mt-0.5">v1.0.0 · © 2026</p>
          </div>
          <button onClick={handleSave} className="btn-primary-gradient px-6 py-2.5 text-sm">
            {saved ? '✓ Saved' : 'Save Changes'}
          </button>
        </div>
      </motion.div>
    </div>
  );
};

export default SettingsPage;
