import React from 'react';
import { motion } from 'framer-motion';
import SummaryCard from '../components/SummaryCard';

const ProfessorDashboard = ({ 
  user, 
  courses, 
  assignments, 
  statsCards, 
  onSelectCourse, 
  setShowCreateModal 
}) => {
  return (
    <div className="space-y-10">
      {/* Header */}
      <section className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
        <div>
          <span className="text-[10px] font-bold uppercase tracking-widest text-brand-muted dark:text-dark-muted font-label">
            Faculty Portal · Session 2026
          </span>
          <h1 className="font-headline text-4xl font-extrabold tracking-tight text-brand-primary dark:text-dark-text mt-1">
            Welcome, {user.name}
          </h1>
          <p className="text-brand-muted dark:text-dark-muted font-body font-medium mt-1.5">
            You have 3 active courses and 12 pending reviews today.
          </p>
        </div>
        <button
          onClick={() => setShowCreateModal(true)}
          className="btn-primary flex items-center gap-2 flex-shrink-0"
        >
          <span className="material-symbols-outlined text-[18px]">add_task</span>
          Create Assignment
        </button>
      </section>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {statsCards.map((card, idx) => (
          <motion.div
            key={card.title}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35, delay: idx * 0.07, ease: 'easeOut' }}
          >
            <SummaryCard {...card} />
          </motion.div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Course Overviews */}
        <div className="lg:col-span-8 space-y-8">
          <div className="bg-white dark:bg-dark-sidebar rounded-3xl p-8 border border-brand-border dark:border-dark-border premium-depth">
            <div className="flex justify-between items-center mb-8">
              <h3 className="font-headline text-xl font-bold text-brand-primary dark:text-dark-text">Academic Cohorts</h3>
              <button className="text-[10px] font-bold text-brand-accent uppercase tracking-widest font-label">View All</button>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {courses.map(course => (
                <div 
                  key={course.id}
                  onClick={() => { onSelectCourse(course); setShowCreateModal(false); /* assuming onSelectCourse handles the tab change if needed, but App.jsx has a better way */ }}
                  className="group p-6 rounded-2xl border border-brand-border dark:border-dark-border hover:border-brand-accent transition-all cursor-pointer bg-brand-bg-low dark:bg-white/[0.02]"
                >
                  <div className="flex justify-between items-start mb-4">
                    <div className="w-12 h-12 rounded-xl bg-white dark:bg-dark-card flex items-center justify-center text-brand-primary dark:text-brand-accent shadow-card-sm group-hover:scale-110 transition-all">
                      <span className="material-symbols-outlined">{course.id === 'c1' ? 'code' : course.id === 'c2' ? 'memory' : 'brush'}</span>
                    </div>
                    <span className="text-[9px] font-bold text-brand-muted uppercase tracking-widest px-2 py-0.5 bg-brand-border dark:bg-white/5 rounded-full">{course.code}</span>
                  </div>
                  <h4 className="font-bold text-brand-primary dark:text-dark-text mb-1">{course.title}</h4>
                  <p className="text-[10px] text-brand-muted dark:text-dark-muted font-bold uppercase tracking-widest opacity-60 mb-4">{course.students} Active Students</p>
                  
                  <div className="space-y-2">
                    <div className="flex justify-between items-center text-[8px] font-bold uppercase tracking-widest">
                      <span className="text-brand-muted">Submission Rate</span>
                      <span className="text-brand-accent">78%</span>
                    </div>
                    <div className="w-full h-1 bg-brand-border dark:bg-white/10 rounded-full overflow-hidden">
                      <div className="h-full bg-brand-accent w-[78%]" />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white dark:bg-dark-sidebar rounded-3xl p-8 border border-brand-border dark:border-dark-border premium-depth">
            <h3 className="font-headline text-xl font-bold text-brand-primary dark:text-dark-text mb-8">Pending Reviews</h3>
            <div className="space-y-4">
              {assignments.filter(a => a.status === 'submitted').slice(0, 3).map(a => (
                <div key={a.id} className="flex items-center justify-between p-5 rounded-2xl border border-brand-border dark:border-dark-border hover:bg-brand-bg-low dark:hover:bg-white/[0.02] transition-all">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-full bg-brand-accent/10 flex items-center justify-center text-brand-accent">
                      <span className="material-symbols-outlined text-[20px]">grading</span>
                    </div>
                    <div>
                      <p className="font-bold text-brand-primary dark:text-dark-text text-sm">{a.title}</p>
                      <p className="text-[9px] text-brand-muted dark:text-dark-muted font-bold uppercase tracking-widest mt-1">Submission received · Review required</p>
                    </div>
                  </div>
                  <button className="px-4 py-2 bg-brand-accent text-white rounded-lg text-[9px] font-bold uppercase tracking-widest shadow-card-sm hover:scale-105 active:scale-95 transition-all">Review Now</button>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Sidebar: Tracking + Actions */}
        <div className="lg:col-span-4 space-y-8">
          <div className="bg-dark-sidebar rounded-3xl p-8 text-white premium-depth relative overflow-hidden border border-white/5">
            <div className="relative z-10">
              <h4 className="text-[10px] font-bold text-white/40 uppercase tracking-[0.3em] mb-8 font-label">Submission Analytics</h4>
              <div className="space-y-8">
                <div className="flex items-center gap-6">
                  <div className="w-16 h-16 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center">
                    <span className="text-3xl font-bold text-brand-accent-dim">84</span>
                  </div>
                  <div>
                    <p className="text-sm font-bold opacity-90">Total Submissions</p>
                    <p className="text-[10px] font-bold text-white/40 uppercase tracking-widest mt-1">Across all courses</p>
                  </div>
                </div>
                <div className="flex items-center gap-6">
                  <div className="w-16 h-16 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center">
                    <span className="text-3xl font-bold text-blue-400">12</span>
                  </div>
                  <div>
                    <p className="text-sm font-bold opacity-90">Pending Grades</p>
                    <p className="text-[10px] font-bold text-white/40 uppercase tracking-widest mt-1">Needs attention</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="absolute -right-8 -top-8 w-32 h-32 bg-brand-accent/10 rounded-full blur-3xl" />
          </div>

          <div className="bg-white dark:bg-dark-sidebar rounded-3xl p-8 border border-brand-border dark:border-dark-border premium-depth">
            <h4 className="text-[10px] font-bold text-brand-muted/50 dark:text-dark-muted uppercase tracking-widest mb-6 px-1">Quick Actions</h4>
            <div className="space-y-3">
              {[
                { icon: 'mail', label: 'Broadcast Message' },
                { icon: 'event_available', label: 'Schedule Office Hours' },
                { icon: 'file_download', label: 'Export Gradebook' },
                { icon: 'analytics', label: 'Performance Report' },
              ].map(action => (
                <button key={action.label} className="w-full text-left p-4 rounded-xl border border-transparent hover:border-brand-border dark:hover:border-dark-border hover:bg-brand-bg-low dark:hover:bg-white/[0.02] transition-all flex items-center gap-4 group">
                  <span className="material-symbols-outlined text-[20px] text-brand-muted group-hover:text-brand-accent transition-colors">{action.icon}</span>
                  <span className="text-sm font-bold text-brand-primary dark:text-dark-text group-hover:text-brand-accent transition-colors">{action.label}</span>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfessorDashboard;
