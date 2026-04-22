import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { INITIAL_ASSIGNMENTS, MOCK_NOTIFICATIONS } from '../data/mockData';

const SectionCard = ({ title, children }) => (
  <div className="bg-brand-card dark:bg-dark-sidebar rounded-2xl overflow-hidden border border-brand-border dark:border-dark-border premium-depth transition-all duration-300">
    <div className="px-8 py-5 border-b border-brand-border dark:border-dark-border bg-brand-bg-low/30 dark:bg-white/[0.01]">
      <h3 className="font-headline text-sm font-bold text-brand-primary dark:text-dark-text tracking-tight uppercase tracking-widest text-[10px] opacity-70">{title}</h3>
    </div>
    <div className="p-8">{children}</div>
  </div>
);

const Toggle = ({ value, onChange, label, desc }) => (
  <div className="flex items-center justify-between py-5 border-b border-brand-border/50 dark:border-dark-border/50 last:border-0 group">
    <div className="pr-4">
      <p className="text-[13px] font-bold text-brand-primary dark:text-dark-text font-body transition-colors group-hover:text-brand-accent">{label}</p>
      {desc && <p className="text-[11px] text-brand-muted dark:text-dark-muted mt-1 leading-relaxed">{desc}</p>}
    </div>
    <button
      onClick={() => onChange(!value)}
      className={`relative w-11 h-6 rounded-full transition-all duration-500 ease-out flex-shrink-0 border ${
        value 
          ? 'bg-brand-accent border-brand-accent shadow-[0_0_12px_rgba(245,158,11,0.2)]' 
          : 'bg-brand-bg-low dark:bg-dark-bg-low border-brand-border dark:border-dark-border'
      }`}
    >
      <motion.span
        animate={{ x: value ? 22 : 4 }}
        className="absolute top-1 w-3.5 h-3.5 rounded-full bg-white shadow-sm"
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
    <div className="space-y-12 max-w-3xl pb-12">
      {/* Header */}
      <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}>
        <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-brand-muted/70 dark:text-dark-muted font-label">Configuration</span>
        <h1 className="font-headline text-4xl font-bold tracking-tight text-brand-primary dark:text-dark-text mt-2">Preferences</h1>
        <p className="text-brand-muted dark:text-dark-muted font-body mt-2">Personalize your workspace experience and security parameters.</p>
      </motion.div>

      {/* Profile */}
      <motion.div initial={{ opacity: 0, scale: 0.98 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.07 }}>
        <SectionCard title="User Identity">
          <div className="pb-8 flex items-center gap-6 border-b border-brand-border/50 dark:border-dark-border/50">
            <div className="w-20 h-20 rounded-2xl bg-brand-bg-low dark:bg-white/5 border border-brand-border dark:border-dark-border p-1 shadow-card-sm overflow-hidden flex-shrink-0 group">
              <div className="w-full h-full bg-brand-bg-low dark:bg-white/10 flex items-center justify-center rounded-xl">
                 <span className="material-symbols-outlined text-[32px] text-brand-muted">person</span>
              </div>
            </div>
            <div className="flex-grow">
              <p className="font-headline text-2xl font-bold text-brand-primary dark:text-dark-text tracking-tight">Active Session</p>
              <p className="text-xs text-brand-muted font-label opacity-70 mt-1">Identity managed via LocalStorage</p>
              <div className="mt-3 inline-flex items-center px-2 py-0.5 bg-brand-bg-low dark:bg-white/5 border border-brand-border dark:border-dark-border rounded text-[9px] font-bold text-brand-muted uppercase tracking-widest font-label">
                Instance: Round 2 Evolution
              </div>
            </div>
          </div>

          <div className="flex items-center justify-between py-8">
            <div>
              <p className="text-[13px] font-bold text-brand-primary dark:text-dark-text font-body">Workspace Access</p>
              <p className="text-[11px] text-brand-muted dark:text-dark-muted mt-1 leading-relaxed">Toggle between Student and Professor perspective modes</p>
            </div>
            <div className="flex items-center bg-brand-bg-low dark:bg-white/5 p-1 rounded-xl border border-brand-border dark:border-dark-border">
              {['student', 'professor'].map(r => (
                <button
                  key={r}
                  onClick={() => setRole(r)}
                  className={`px-5 py-2 rounded-lg text-[10px] font-bold uppercase tracking-widest transition-all duration-300 ${
                    role === r
                      ? 'bg-brand-card dark:bg-dark-card text-brand-primary dark:text-dark-text shadow-card-sm'
                      : 'text-brand-muted hover:text-brand-primary'
                  }`}
                >
                  {r === 'professor' ? 'Professor' : 'Student'}
                </button>
              ))}
            </div>
          </div>
        </SectionCard>
      </motion.div>

      {/* Appearance */}
      <motion.div initial={{ opacity: 0, scale: 0.98 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.12 }}>
        <SectionCard title="Visual Experience">
          <div className="py-2 flex items-center justify-between border-b border-brand-border/50 dark:border-dark-border/50 pb-8">
            <div>
              <p className="text-[13px] font-bold text-brand-primary dark:text-dark-text font-body">Global Theme</p>
              <p className="text-[11px] text-brand-muted dark:text-dark-muted mt-1">Select an interface style that fits your workflow</p>
            </div>
            <div className="flex items-center gap-3">
              {['light', 'dark'].map(t => (
                <button
                  key={t}
                  onClick={() => setTheme(t)}
                  className={`px-5 py-2.5 rounded-xl text-[10px] font-bold uppercase tracking-widest transition-all duration-300 flex items-center gap-2 border ${
                    theme === t
                      ? 'bg-brand-primary dark:bg-brand-accent text-white border-transparent shadow-card-lg'
                      : 'bg-brand-bg-low dark:bg-white/5 text-brand-muted border-brand-border dark:border-dark-border hover:brightness-110'
                  }`}
                >
                  <span className="material-symbols-outlined text-[16px]">
                    {t === 'light' ? 'light_mode' : 'dark_mode'}
                  </span>
                  {t}
                </button>
              ))}
            </div>
          </div>
          <div className="flex items-center justify-between pt-8 pb-2">
            <div>
              <p className="text-[13px] font-bold text-brand-primary dark:text-dark-text font-body">Studio Density</p>
              <p className="text-[11px] text-brand-muted dark:text-dark-muted mt-1">Compact layouts for information-dense monitoring</p>
            </div>
            <div className="px-3 py-1 bg-brand-bg-low dark:bg-white/5 border border-brand-border dark:border-dark-border rounded text-[9px] font-bold text-brand-muted/40 uppercase tracking-[0.2em]">
              Roadmap
            </div>
          </div>
        </SectionCard>
      </motion.div>

      {/* Notifications */}
      <motion.div initial={{ opacity: 0, scale: 0.98 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.17 }}>
        <SectionCard title="Notification Protocol">
          <Toggle value={notifPrefs.deadlines}     onChange={v => setNotifPrefs(p => ({ ...p, deadlines: v }))}     label="Module Deadlines"          desc="Receive high-priority alerts 48 hours prior to target dates" />
          <Toggle value={notifPrefs.submissions}   onChange={v => setNotifPrefs(p => ({ ...p, submissions: v }))}   label="Digital Receipts"          desc="Automatic confirmation logs upon successful portfolio uploads" />
          <Toggle value={notifPrefs.reviews}       onChange={v => setNotifPrefs(p => ({ ...p, reviews: v }))}       label="Feedback Ledger"           desc="Instant notification when evaluations are published" />
          <Toggle value={notifPrefs.announcements} onChange={v => setNotifPrefs(p => ({ ...p, announcements: v }))} label="Broadcast Messages"         desc="Global updates from the academic leadership office" />
        </SectionCard>
      </motion.div>

      {/* Data Management */}
      <motion.div initial={{ opacity: 0, scale: 0.98 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.22 }}>
        <SectionCard title="System & Data Registry">
          <div className="py-4 flex items-center justify-between border-b border-brand-border/50 dark:border-dark-border/50 pb-8">
            <div>
              <p className="text-[13px] font-bold text-brand-primary dark:text-dark-text font-body">Factory Reset</p>
              <p className="text-[11px] text-brand-muted dark:text-dark-muted mt-1 leading-relaxed">Restore all portfolio data to local baseline samples. Irreversible.</p>
            </div>
            <button
              onClick={handleReset}
              className="flex items-center gap-2.5 px-5 py-2.5 bg-red-500/5 text-red-500 rounded-xl text-[10px] font-bold border border-red-500/10 hover:bg-red-500 hover:text-white transition-all uppercase tracking-widest font-label shadow-sm"
            >
              <span className="material-symbols-outlined text-[16px]">restart_alt</span>
              Reset System
            </button>
          </div>
          <div className="pt-8 pb-2 flex items-center justify-between">
            <div>
              <p className="text-[13px] font-bold text-brand-primary dark:text-dark-text font-body">JSON Data Portability</p>
              <p className="text-[11px] text-brand-muted dark:text-dark-muted mt-1 leading-relaxed">Download a structured technical snapshot of your workspace data</p>
            </div>
            <button
              onClick={handleExport}
              className="flex items-center gap-2.5 px-5 py-2.5 bg-brand-bg-low dark:bg-white/5 text-brand-primary dark:text-dark-text rounded-xl text-[10px] font-bold hover:bg-brand-bg transition-all uppercase tracking-widest font-label border border-brand-border dark:border-dark-border shadow-card-sm"
            >
              <span className="material-symbols-outlined text-[16px]">database_export</span>
              Export Registry
            </button>
          </div>
        </SectionCard>
      </motion.div>

      {/* Footer / Save */}
      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.27 }}>
        <div className="bg-brand-primary dark:bg-dark-sidebar rounded-2xl p-8 flex items-center justify-between border border-white/5 shadow-card-lg overflow-hidden relative group">
          <div className="relative z-10">
            <p className="text-[10px] font-bold text-white/40 uppercase tracking-[0.4em] font-label">JoinEazy Laboratory</p>
            <p className="text-[11px] font-bold text-brand-accent-dim mt-2">Workspace Build v1.4.2 · Production Instance</p>
          </div>
          <button 
            onClick={handleSave} 
            className={`btn-primary bg-brand-accent hover:bg-brand-accent/90 border-transparent text-black px-10 py-4 text-xs uppercase tracking-widest shadow-xl transition-all duration-500 ${saved ? 'pointer-events-none brightness-90' : 'hover:scale-[1.02]'}`}
          >
            {saved ? '✓ Profile Synced' : 'Commit Changes'}
          </button>
          {/* Decorative background */}
          <div className="absolute -right-12 -top-12 w-48 h-48 bg-brand-accent/5 rounded-full blur-3xl group-hover:bg-brand-accent/10 transition-colors duration-700" />
        </div>
      </motion.div>
    </div>
  );
};

export default SettingsPage;
