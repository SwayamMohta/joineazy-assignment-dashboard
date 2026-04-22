import React from 'react';
import { motion } from 'framer-motion';
import { ALL_STUDENTS } from '../data/mockData';

const gradeColor = {
  'A': '#10B981', 'A-': '#10B981',
  'B+': '#3B82F6', 'B': '#3B82F6', 'B-': '#64748B',
  'C+': '#F59E0B', 'C': '#F59E0B',
  'Pending': '#94A3B8',
};

const weeklyData = [
  { day: 'Mon', primary: 40, secondary: 15 },
  { day: 'Tue', primary: 70, secondary: 25 },
  { day: 'Wed', primary: 55, secondary: 10 },
  { day: 'Thu', primary: 85, secondary: 20 },
  { day: 'Fri', primary: 45, secondary: 5 },
  { day: 'Sat', primary: 10, secondary: 0 },
  { day: 'Sun', primary: 20, secondary: 0 },
];

const AnalyticsPage = ({ assignments, role }) => {
  const totalCount = assignments.length;
  const submittedCount = assignments.filter(a => a.status === 'submitted').length;
  const avgProgress = totalCount > 0 ? Math.round(assignments.reduce((sum, a) => sum + a.progress, 0) / totalCount) : 0;
  const completionRate = totalCount > 0 ? Math.round(submittedCount / totalCount * 100) : 0;

  const studentStats = ALL_STUDENTS.map(student => {
    const subs = assignments.map(a => (a.submissions || []).find(s => s.studentId === student.id)).filter(Boolean);
    const subCount = subs.filter(s => s.submitted).length;
    const avgProg = subs.length > 0 ? Math.round(subs.reduce((sum, s) => sum + (s.progress || 0), 0) / subs.length) : 0;
    return { ...student, submittedCount: subCount, avgProg, total: subs.length };
  });

  return (
    <div className="space-y-10">
      {/* Header */}
      <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}>
        <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-brand-muted/70 dark:text-dark-muted font-label">
          {role === 'professor' ? 'Academic Ledger · Performance' : 'Growth Metrics · Student'}
        </span>
        <h1 className="font-headline text-4xl font-bold tracking-tight text-brand-primary dark:text-dark-text mt-2">Workspace Analytics</h1>
        <p className="text-brand-muted dark:text-dark-muted font-body mt-2">
          {role === 'professor' ? 'Monitoring class-wide submission velocity and performance distributions.' : 'Tracking your technical growth and module completion trends.'}
        </p>
      </motion.div>

      {/* KPI Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          { label: 'Total Modules', value: totalCount, icon: 'account_tree', accent: 'blue' },
          { label: 'Certifications', value: submittedCount, icon: 'verified', accent: 'amber' },
          { label: 'Submission Rate', value: `${completionRate}%`, icon: 'speed', accent: 'emerald' },
          { label: 'Growth Score', value: `${avgProgress}%`, icon: 'monitoring', accent: 'slate' },
        ].map((stat, idx) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.07 }}
            className="bg-brand-card dark:bg-dark-sidebar rounded-xl p-8 border border-brand-border dark:border-dark-border premium-depth"
          >
            <div className="flex justify-between items-start mb-6">
              <div className={`w-10 h-10 rounded-xl flex items-center justify-center shadow-sm ${stat.accent === 'amber' ? 'bg-brand-accent/10 text-brand-accent' :
                stat.accent === 'blue' ? 'bg-blue-500/10 text-blue-500' :
                  stat.accent === 'emerald' ? 'bg-emerald-500/10 text-emerald-500' :
                    'bg-brand-bg-low dark:bg-white/5 text-brand-muted'
                }`}>
                <span className="material-symbols-outlined text-[20px]" style={{ fontVariationSettings: "'FILL' 0" }}>
                  {stat.icon}
                </span>
              </div>
            </div>
            <p className="text-[10px] font-bold text-brand-muted/60 dark:text-dark-muted uppercase tracking-[0.2em] font-label mb-2">{stat.label}</p>
            <p className="font-headline text-3xl font-bold text-brand-primary dark:text-dark-text tracking-tighter">{stat.value}</p>
          </motion.div>
        ))}
      </div>

      {/* Charts section */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="lg:col-span-8 bg-brand-card dark:bg-dark-sidebar rounded-2xl p-10 border border-brand-border dark:border-dark-border premium-depth"
        >
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-10">
            <div>
              <h3 className="font-headline text-xl font-bold text-brand-primary dark:text-dark-text tracking-tight">
                {role === 'professor' ? 'Class Performance Trends' : 'Module Progress Momentum'}
              </h3>
              <p className="text-[10px] font-bold text-brand-muted/50 uppercase tracking-widest font-label mt-1">Weekly Velocity</p>
            </div>
            <div className="flex gap-6">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-brand-primary dark:bg-brand-accent" />
                <span className="text-[9px] font-bold uppercase tracking-widest text-brand-muted">{role === 'professor' ? 'Submissions' : 'Core Study'}</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-brand-accent/40" />
                <span className="text-[9px] font-bold uppercase tracking-widest text-brand-muted">Activity</span>
              </div>
            </div>
          </div>
          <div className="flex items-end justify-between h-56 gap-4 px-4">
            {weeklyData.map(d => (
              <div key={d.day} className="flex-1 flex flex-col items-center gap-4 group">
                <div className="w-full relative flex flex-col-reverse gap-1.5 h-full">
                  <motion.div
                    initial={{ height: 0 }}
                    animate={{ height: `${d.primary}%` }}
                    className="w-full bg-brand-primary dark:bg-brand-accent rounded-t-lg transition-all duration-500 group-hover:brightness-110 shadow-card-sm"
                  />
                  {d.secondary > 0 && (
                    <motion.div
                      initial={{ height: 0 }}
                      animate={{ height: `${d.secondary}%` }}
                      className="w-full bg-brand-accent/20 dark:bg-white/10 rounded-t-md"
                    />
                  )}
                </div>
                <span className="text-[10px] font-bold text-brand-muted/70 font-label uppercase tracking-widest">{d.day}</span>
              </div>
            ))}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.25 }}
          className="lg:col-span-4 bg-brand-card dark:bg-dark-sidebar rounded-2xl p-8 border border-brand-border dark:border-dark-border premium-depth"
        >
          <h3 className="text-[10px] font-bold text-brand-muted/50 uppercase tracking-[0.2em] font-label mb-8">
            {role === 'professor' ? 'Subject Dominance' : 'Learning Portfolio'}
          </h3>
          <div className="space-y-6">
            {assignments.slice(0, 5).map((asgn, idx) => {
              const pct = role === 'professor'
                ? Math.round((asgn.submissions || []).filter(s => s.submitted).length / ((asgn.submissions || []).length || 1) * 100)
                : asgn.progress;
              const colors = ['#3B82F6', '#10B981', '#F59E0B', '#8B5CF6', '#64748B'];
              return (
                <div key={asgn.id} className="group">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-3">
                      <div className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: colors[idx % colors.length] }} />
                      <p className="text-xs font-bold text-brand-primary dark:text-dark-text font-body leading-none">{asgn.subject || 'Coursework'}</p>
                    </div>
                    <span className="text-[10px] font-bold text-brand-muted">{pct}%</span>
                  </div>
                  <div className="w-full h-1 bg-brand-bg-low dark:bg-white/5 rounded-full overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${pct}%` }}
                      className="h-full rounded-full transition-all duration-700"
                      style={{ backgroundColor: colors[idx % colors.length] }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </motion.div>
      </div>

      {/* Assignment Metrics Table */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="bg-brand-card dark:bg-dark-sidebar rounded-2xl overflow-hidden border border-brand-border dark:border-dark-border premium-depth"
      >
        <div className="px-10 py-8 border-b border-brand-border dark:border-dark-border">
          <h3 className="font-headline text-xl font-bold text-brand-primary dark:text-dark-text tracking-tight">
            Detailed Workspace Metrics
          </h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-brand-bg-low/30 dark:bg-white/[0.02]">
                {['Assignment', 'Module', 'Target Date', 'Completion', 'State'].map(h => (
                  <th key={h} className="text-left px-10 py-4 text-[9px] font-bold text-brand-muted uppercase tracking-[0.2em] font-label whitespace-nowrap">
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-brand-border/50 dark:divide-dark-border/50">
              {assignments.map((asgn) => {
                const progress = role === 'professor'
                  ? Math.round((asgn.submissions || []).reduce((sum, s) => sum + (s.progress || 0), 0) / ((asgn.submissions || []).length || 1))
                  : asgn.progress;
                return (
                  <tr key={asgn.id} className="group hover:bg-brand-bg-low dark:hover:bg-white/[0.02] transition-colors">
                    <td className="px-10 py-5">
                      <p className="font-bold text-brand-primary dark:text-dark-text font-body text-[13px] leading-none mb-1">{asgn.title}</p>
                      <p className="text-[10px] text-brand-muted/70 font-label">ID: {asgn.id.slice(0, 8)}</p>
                    </td>
                    <td className="px-10 py-5">
                      <span className="text-[10px] font-bold text-brand-muted uppercase tracking-widest font-label">{asgn.subject || 'General'}</span>
                    </td>
                    <td className="px-10 py-5 text-brand-muted font-body text-xs">
                      {new Date(asgn.deadline).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                    </td>
                    <td className="px-10 py-5 max-w-[200px]">
                      <div className="flex items-center gap-4">
                        <div className="flex-grow h-1.5 bg-brand-bg-low dark:bg-white/5 rounded-full overflow-hidden">
                          <motion.div
                            initial={{ width: 0 }}
                            animate={{ width: `${progress}%` }}
                            className={`h-full rounded-full ${progress === 100 ? 'bg-brand-accent' : 'bg-brand-primary dark:bg-dark-primary'}`}
                          />
                        </div>
                        <span className={`text-[11px] font-bold font-body w-8 text-right ${progress === 100 ? 'text-brand-accent' : 'text-brand-primary dark:text-dark-text'}`}>{progress}%</span>
                      </div>
                    </td>
                    <td className="px-10 py-5">
                      <div className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-lg border text-[9px] font-bold uppercase tracking-widest font-label ${asgn.status === 'submitted' ? 'bg-brand-accent/5 border-brand-accent/20 text-brand-accent' : 'bg-brand-bg-low dark:bg-white/5 border-transparent text-brand-muted'
                        }`}>
                        <div className={`w-1.5 h-1.5 rounded-full ${asgn.status === 'submitted' ? 'bg-brand-accent animate-pulse' : 'bg-brand-muted'}`} />
                        {asgn.status}
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </motion.div>

      {/* Professor: Student Performance Grid */}
      {role === 'professor' && (
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.35 }} className="bg-brand-card dark:bg-dark-sidebar rounded-2xl p-10 border border-brand-border dark:border-dark-border premium-depth">
          <div className="mb-10">
            <h3 className="font-headline text-xl font-bold text-brand-primary dark:text-dark-text tracking-tight">Active Student Cohort</h3>
            <p className="text-[10px] font-bold text-brand-muted/50 uppercase tracking-widest font-label mt-1">Live Progression</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {studentStats.map(student => (
              <div key={student.id} className="bg-brand-bg-low/50 dark:bg-white/[0.02] border border-brand-border dark:border-dark-border rounded-xl p-6 transition-all duration-300 hover:scale-[1.02]">
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-12 h-12 rounded-xl bg-brand-bg-low dark:bg-white/10 flex items-center justify-center">
                     <span className="material-symbols-outlined text-[24px]">person</span>
                  </div>
                  <div>
                    <p className="text-sm font-bold text-brand-primary dark:text-dark-text font-body leading-none">{student.name}</p>
                    <p className="text-[10px] font-bold text-brand-accent uppercase tracking-widest font-label mt-2">CGPA: {student.gpa}</p>
                  </div>
                </div>
                <div className="space-y-4">
                  <div className="flex justify-between items-center text-[9px] font-bold font-label uppercase tracking-[0.2em] opacity-60">
                    <span>Task Velocity</span>
                    <span>{student.submittedCount}/{student.total}</span>
                  </div>
                  <div className="h-1 w-full bg-brand-bg-low dark:bg-white/5 rounded-full overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${student.avgProg}%` }}
                      className="h-full bg-brand-primary dark:bg-brand-accent shadow-[0_0_8px_rgba(245,158,11,0.2)]"
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      )}
    </div>
  );
};

export default AnalyticsPage;
