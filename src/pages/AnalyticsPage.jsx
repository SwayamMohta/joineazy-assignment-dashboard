import React from 'react';
import { motion } from 'framer-motion';
import { ALL_STUDENTS } from '../data/mockData';

const gradeColor = {
  'A': '#00b47d', 'A-': '#00b47d',
  'B+': '#00b47d', 'B': '#00b47d', 'B-': '#8caccc',
  'C+': '#f59e0b', 'C': '#f59e0b',
  'Pending': '#8caccc',
};

const weeklyData = [
  { day: 'Mon', primary: 40, secondary: 15 },
  { day: 'Tue', primary: 70, secondary: 25 },
  { day: 'Wed', primary: 55, secondary: 10 },
  { day: 'Thu', primary: 85, secondary: 20 },
  { day: 'Fri', primary: 45, secondary: 5  },
  { day: 'Sat', primary: 10, secondary: 0  },
  { day: 'Sun', primary: 20, secondary: 0  },
];

const AnalyticsPage = ({ assignments, role }) => {
  const totalCount = assignments.length;
  const submittedCount = assignments.filter(a => a.status === 'submitted').length;
  const avgProgress = Math.round(assignments.reduce((sum, a) => sum + a.progress, 0) / totalCount);
  const completionRate = Math.round(submittedCount / totalCount * 100);

  const studentStats = ALL_STUDENTS.map(student => {
    const subs = assignments.map(a => a.submissions.find(s => s.studentId === student.id)).filter(Boolean);
    const subCount = subs.filter(s => s.submitted).length;
    const avgProg = Math.round(subs.reduce((sum, s) => sum + s.progress, 0) / subs.length);
    return { ...student, submittedCount: subCount, avgProg, total: subs.length };
  });

  return (
    <div className="space-y-8">
      {/* Header */}
      <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}>
        <span className="text-[10px] font-bold uppercase tracking-widest text-brand-muted dark:text-dark-muted font-label">
          {role === 'admin' ? 'Admin · Class Analytics' : 'Student · My Analytics'}
        </span>
        <h1 className="font-headline text-4xl font-extrabold tracking-tight text-brand-primary dark:text-dark-text mt-1">Analytics</h1>
        <p className="text-brand-muted dark:text-dark-muted font-body font-medium mt-1.5">
          {role === 'admin' ? 'Class-wide performance and submission trends.' : 'Your personal progress and performance overview.'}
        </p>
      </motion.div>

      {/* KPI Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          { label: 'Total Assignments', value: totalCount,           icon: 'library_books', accent: false },
          { label: 'Submitted',         value: submittedCount,       icon: 'task_alt',      accent: true  },
          { label: 'Completion Rate',   value: `${completionRate}%`, icon: 'percent',       accent: false },
          { label: 'Avg. Progress',     value: `${avgProgress}%`,    icon: 'bar_chart',     accent: false },
        ].map((stat, idx) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.07 }}
            className="bg-brand-card dark:bg-dark-card rounded-xl p-6 border border-black/5 dark:border-white/5 hover:shadow-card dark:hover:shadow-none transition-all duration-300"
          >
            <div className={`w-10 h-10 ${stat.accent ? 'bg-brand-accent/15' : 'bg-brand-bg-low dark:bg-dark-bg-low'} rounded-lg flex items-center justify-center mb-4`}>
              <span className={`material-symbols-outlined text-[20px] ${stat.accent ? 'text-brand-accent dark:text-brand-accent-dim' : 'text-brand-primary dark:text-dark-primary'}`} style={{ fontVariationSettings: "'FILL' 1" }}>
                {stat.icon}
              </span>
            </div>
            <p className="text-[10px] font-bold text-brand-muted dark:text-dark-muted uppercase tracking-widest font-label mb-1">{stat.label}</p>
            <p className="font-headline text-2xl font-extrabold text-brand-primary dark:text-dark-text">{stat.value}</p>
          </motion.div>
        ))}
      </div>

      {/* Chart + Subject mix */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Weekly bar chart */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="lg:col-span-8 bg-brand-card dark:bg-dark-card rounded-xl p-8 border border-black/5 dark:border-white/5"
        >
          <div className="flex justify-between items-center mb-8">
            <div>
              <h3 className="font-headline text-lg font-bold text-brand-text dark:text-dark-text">
                {role === 'admin' ? 'Weekly Submission Activity' : 'Weekly Study Momentum'}
              </h3>
              <p className="text-xs text-brand-muted dark:text-dark-muted mt-0.5">
                {role === 'admin' ? 'Submissions received per day this week' : 'Hours logged across the week'}
              </p>
            </div>
            <div className="flex gap-4">
              <div className="flex items-center gap-1.5">
                <div className="w-3 h-3 rounded-full bg-brand-primary dark:bg-dark-primary" />
                <span className="text-xs font-bold font-label text-brand-muted dark:text-dark-muted">{role === 'admin' ? 'Submissions' : 'Core Study'}</span>
              </div>
              <div className="flex items-center gap-1.5">
                <div className="w-3 h-3 rounded-full bg-brand-accent-dim" />
                <span className="text-xs font-bold font-label text-brand-muted dark:text-dark-muted">{role === 'admin' ? 'Reviews' : 'Research'}</span>
              </div>
            </div>
          </div>
          <div className="flex items-end justify-between h-48 gap-3 px-2">
            {weeklyData.map(d => (
              <div key={d.day} className="flex-1 flex flex-col items-center gap-2">
                <div className="w-full flex flex-col-reverse gap-1 h-full">
                  <div className="w-full bg-brand-primary dark:bg-dark-primary rounded-t-md transition-colors" style={{ height: `${d.primary}%` }} />
                  {d.secondary > 0 && (
                    <div className="w-full bg-brand-accent-dim rounded-t-sm" style={{ height: `${d.secondary}%` }} />
                  )}
                </div>
                <span className="text-xs font-bold text-brand-muted dark:text-dark-muted font-label">{d.day}</span>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Subject mix */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.25 }}
          className="lg:col-span-4 bg-brand-card dark:bg-dark-card rounded-xl p-6 border border-black/5 dark:border-white/5"
        >
          <h3 className="text-xs font-bold text-brand-muted dark:text-dark-muted uppercase tracking-widest font-label mb-5">
            {role === 'admin' ? 'Subject Distribution' : 'My Subject Mix'}
          </h3>
          <div className="space-y-5">
            {assignments.slice(0, 4).map((asgn, idx) => {
              const pct = role === 'admin'
                ? Math.round(asgn.submissions.filter(s => s.submitted).length / asgn.submissions.length * 100)
                : asgn.progress;
              const colors = ['#002045', '#4edea3', '#adc7f7', '#8caccc'];
              return (
                <div key={asgn.id} className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-8 rounded-full" style={{ backgroundColor: colors[idx] || '#002045' }} />
                    <div>
                      <p className="text-sm font-bold text-brand-text dark:text-dark-text font-body">{asgn.subject}</p>
                      <p className="text-[10px] text-brand-muted dark:text-dark-muted font-label">{pct}% {role === 'admin' ? 'submitted' : 'complete'}</p>
                    </div>
                  </div>
                  <span className="text-xs font-bold text-brand-text dark:text-dark-text">{pct}%</span>
                </div>
              );
            })}
          </div>
        </motion.div>
      </div>

      {/* Assignment Metrics Table */}
      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="bg-brand-card dark:bg-dark-card rounded-xl overflow-hidden border border-black/5 dark:border-white/5">
        <div className="px-6 py-5 border-b border-black/5 dark:border-white/5">
          <h3 className="font-headline text-lg font-bold text-brand-text dark:text-dark-text">
            {role === 'admin' ? 'All Assignment Metrics' : 'My Assignment Progress'}
          </h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-black/5 dark:border-white/5">
                {['Assignment', 'Subject', 'Deadline', role === 'admin' ? 'Class Progress' : 'My Progress', 'Status'].map(h => (
                  <th key={h} className="text-left px-6 py-3 text-[10px] font-bold text-brand-muted dark:text-dark-muted uppercase tracking-widest font-label whitespace-nowrap">
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {assignments.map((asgn, idx) => {
                const progress = role === 'admin'
                  ? Math.round(asgn.submissions.reduce((sum, s) => sum + s.progress, 0) / asgn.submissions.length)
                  : asgn.progress;
                return (
                  <tr key={asgn.id} className={`border-b border-black/5 dark:border-white/5 hover:bg-brand-bg-low dark:hover:bg-white/5 transition-colors ${idx % 2 !== 0 ? 'bg-brand-bg/50 dark:bg-white/[0.02]' : ''}`}>
                    <td className="px-6 py-4 font-bold text-brand-text dark:text-dark-text font-body max-w-[200px] truncate">{asgn.title}</td>
                    <td className="px-6 py-4">
                      <span className="bg-brand-chip dark:bg-brand-secondary text-brand-primary dark:text-dark-primary px-2.5 py-1 rounded-md text-[10px] font-bold uppercase tracking-wide font-label whitespace-nowrap">
                        {asgn.subject}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-brand-muted dark:text-dark-muted font-body whitespace-nowrap">
                      {new Date(asgn.deadline).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-24 h-2 bg-brand-bg-low dark:bg-dark-bg-low rounded-full overflow-hidden flex-shrink-0">
                          <div
                            className={`h-full rounded-full ${progress === 100 ? 'bg-gradient-to-r from-brand-accent to-brand-accent-dim' : 'bg-gradient-to-r from-brand-primary to-brand-secondary'}`}
                            style={{ width: `${progress}%` }}
                          />
                        </div>
                        <span className={`text-xs font-bold font-body ${progress === 100 ? 'text-brand-accent dark:text-brand-accent-dim' : 'text-brand-text dark:text-dark-text'}`}>{progress}%</span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`px-2.5 py-1 rounded-md text-[10px] font-bold uppercase tracking-wide font-label ${
                        asgn.status === 'submitted' ? 'bg-brand-accent/15 text-brand-accent dark:text-brand-accent-dim' : 'bg-brand-bg-low dark:bg-dark-bg-low text-brand-muted dark:text-dark-muted'
                      }`}>
                        {asgn.status}
                      </span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </motion.div>

      {/* Admin: Student Leaderboard */}
      {role === 'admin' && (
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.35 }} className="bg-brand-card dark:bg-dark-card rounded-xl p-6 border border-black/5 dark:border-white/5">
          <h3 className="font-headline text-lg font-bold text-brand-text dark:text-dark-text mb-5">Student Performance Overview</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {studentStats.map(student => (
              <div key={student.id} className="bg-brand-bg-low dark:bg-dark-bg-low border border-black/5 dark:border-white/5 rounded-xl p-5 hover:bg-brand-chip dark:hover:bg-white/5 transition-colors duration-200">
                <div className="flex items-center gap-3 mb-4">
                  <img src={student.avatar} alt={student.name} className="w-10 h-10 rounded-full bg-brand-chip dark:bg-brand-secondary" />
                  <div>
                    <p className="text-sm font-bold text-brand-text dark:text-dark-text font-body leading-tight">{student.name}</p>
                    <p className="text-[10px] text-brand-muted dark:text-dark-muted font-label">GPA: {student.gpa} · Year {student.year}</p>
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between text-[10px] font-bold font-label uppercase tracking-wide">
                    <span className="text-brand-muted dark:text-dark-muted">Submissions</span>
                    <span className="text-brand-accent dark:text-brand-accent-dim">{student.submittedCount}/{student.total}</span>
                  </div>
                  <div className="flex justify-between text-[10px] font-bold font-label uppercase tracking-wide">
                    <span className="text-brand-muted dark:text-dark-muted">Avg Progress</span>
                    <span className="text-brand-text dark:text-dark-text">{student.avgProg}%</span>
                  </div>
                  <div className="h-2 w-full bg-brand-bg dark:bg-dark-bg rounded-full overflow-hidden mt-2">
                    <div
                      className="h-full rounded-full bg-gradient-to-r from-brand-primary to-brand-secondary dark:from-dark-primary dark:to-brand-secondary"
                      style={{ width: `${student.avgProg}%` }}
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
