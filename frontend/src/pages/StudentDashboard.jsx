import React from 'react';
import { motion } from 'framer-motion';
import SummaryCard from '../components/SummaryCard';
import AssignmentCard from '../components/AssignmentCard';

const StudentDashboard = ({ 
  user, 
  courses, 
  assignments, 
  statsCards, 
  recentActivity,
  onOpenAssignment,
  onOpenSubmitModal,
  toggleSubtask,
  setActiveTab,
  onSelectCourse
}) => {
  const pendingAssignments = assignments.filter(a => {
    const sub = (a.submissions || []).find(s => 
      (a.type === 'group' && user?.groupId === s.groupId) || 
      (a.type === 'individual' && user?.id === s.studentId)
    );
    return sub ? !sub.submitted : true;
  });

  return (
    <div className="space-y-10">
      {/* ... header and stats ... */}
      <section className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
        <div>
          <span className="text-[10px] font-bold uppercase tracking-widest text-brand-muted dark:text-dark-muted font-label">
            Student Portal · Academic Dashboard
          </span>
          <h1 className="font-headline text-4xl font-extrabold tracking-tight text-brand-primary dark:text-dark-text mt-1">
            Good Morning, {user?.name?.split(' ')[0] || 'Student'}
          </h1>
          <p className="text-brand-muted dark:text-dark-muted font-body font-medium mt-1.5">
            You have {pendingAssignments.length} pending tasks this week. Your current momentum is strong.
          </p>
        </div>
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

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 pb-12">
        {/* Main Feed */}
        <div className="lg:col-span-8 space-y-10">
          {/* Active Pipeline */}
          <section>
            <div className="flex justify-between items-center mb-6">
              <h3 className="font-headline text-2xl font-bold text-brand-primary dark:text-dark-text">Academic Pipeline</h3>
              <button onClick={() => setActiveTab('assignments')} className="text-[10px] font-bold text-brand-accent uppercase tracking-widest">View All</button>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {pendingAssignments.slice(0, 4).map((asgn, idx) => (
                <motion.div
                  key={asgn.id}
                  initial={{ opacity: 0, scale: 0.98 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: idx * 0.1 }}
                >
                  <AssignmentCard
                    assignment={asgn}
                    role="student"
                    user={user}
                    onOpenSubmitModal={onOpenAssignment}
                    onToggleSubtask={toggleSubtask}
                  />
                </motion.div>
              ))}
            </div>
          </section>

          {/* Recent Feedback / Activity */}
          <section className="bg-white dark:bg-dark-sidebar rounded-3xl p-8 border border-brand-border dark:border-dark-border premium-depth">
            <h3 className="font-headline text-xl font-bold text-brand-primary dark:text-dark-text mb-8">Course Updates</h3>
            <div className="space-y-4">
              {recentActivity.map((item, idx) => (
                <div key={idx} className="flex items-center gap-5 p-5 rounded-2xl border border-brand-border dark:border-dark-border hover:bg-brand-bg-low dark:hover:bg-white/[0.02] transition-all">
                  <div className="w-10 h-10 rounded-xl bg-brand-bg-low dark:bg-white/5 flex items-center justify-center flex-shrink-0 shadow-sm">
                    <span className="material-symbols-outlined text-[20px]" style={{ color: item.color }}>
                      {item.icon}
                    </span>
                  </div>
                  <div className="flex-grow min-w-0">
                    <p className="text-sm font-bold text-brand-primary dark:text-dark-text leading-none">{item.label}</p>
                    <p className="text-[9px] text-brand-muted dark:text-dark-muted font-bold uppercase tracking-widest mt-2 opacity-50">{item.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>
        </div>

        {/* Sidebar */}
        <div className="lg:col-span-4 space-y-8">
          {/* Enrolled Courses Quick List */}
          <div className="bg-white dark:bg-dark-sidebar rounded-3xl p-8 border border-brand-border dark:border-dark-border premium-depth">
            <h4 className="text-[10px] font-bold text-brand-muted/50 dark:text-dark-muted uppercase tracking-widest mb-6 px-1">Active Courses</h4>
            <div className="space-y-4">
              {courses.map(course => (
                <div key={course.id} onClick={() => onSelectCourse(course)} className="flex items-center gap-4 p-3 rounded-2xl hover:bg-brand-bg-low dark:hover:bg-white/5 transition-all cursor-pointer group">
                  <div className="w-10 h-10 rounded-xl overflow-hidden flex-shrink-0 border border-brand-border dark:border-dark-border">
                    <img src={course.image} alt="" className="w-full h-full object-cover group-hover:scale-110 transition-transform" />
                  </div>
                  <div>
                    <p className="text-[11px] font-bold text-brand-primary dark:text-dark-text leading-tight group-hover:text-brand-accent transition-colors">{course.title}</p>
                    <p className="text-[9px] text-brand-muted dark:text-dark-muted font-bold uppercase tracking-widest mt-1 opacity-60">{course.code}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Group Status Card */}
          <div 
            className="rounded-3xl p-8 text-white premium-depth relative overflow-hidden border border-white/5"
            style={{ background: 'linear-gradient(135deg, #0B0F14 0%, #121821 100%)' }}
          >
            <div className="relative z-10">
              <h4 className="text-[10px] font-bold text-white/40 uppercase tracking-[0.3em] mb-8 font-label">Team Status</h4>
              {user.groupId ? (
                <div className="space-y-6">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-xl bg-brand-accent/20 flex items-center justify-center text-brand-accent border border-brand-accent/20">
                      <span className="material-symbols-outlined">groups</span>
                    </div>
                    <div>
                      <p className="font-bold text-white text-lg">My Group</p>
                      <p className="text-[9px] font-bold text-brand-accent uppercase tracking-widest">Active Collaboration</p>
                    </div>
                  </div>
                  <button onClick={() => setActiveTab('groups')} className="w-full py-3 bg-white/5 hover:bg-white/10 rounded-xl text-[10px] font-bold uppercase tracking-widest transition-all border border-white/5">Manage Team</button>
                </div>
              ) : (
                <div className="text-center py-4 space-y-4">
                  <p className="text-xs text-white/60 leading-relaxed">You are not part of any group. Formation is required for collaborative tasks.</p>
                  <button onClick={() => setActiveTab('groups')} className="btn-primary w-full py-3 rounded-xl text-[10px] tracking-widest">Join a Team</button>
                </div>
              )}
            </div>
            <div className="absolute -left-8 -bottom-8 w-32 h-32 bg-blue-500/10 rounded-full blur-3xl" />
          </div>

          {/* Quick Help */}
          <div className="bg-brand-bg-low dark:bg-white/[0.03] p-8 rounded-3xl border border-brand-border dark:border-dark-border">
            <h4 className="text-[10px] font-bold text-brand-muted/50 dark:text-dark-muted uppercase tracking-widest mb-4 font-label">Upcoming Events</h4>
            <div className="space-y-4">
              <div className="flex gap-4">
                <div className="flex-shrink-0 w-10 h-12 bg-white dark:bg-dark-card rounded-xl flex flex-col items-center justify-center border border-brand-border dark:border-dark-border shadow-sm">
                  <span className="text-[8px] font-bold text-red-500 uppercase">Apr</span>
                  <span className="text-sm font-bold text-brand-primary dark:text-dark-text leading-none mt-1">25</span>
                </div>
                <div>
                  <p className="text-xs font-bold text-brand-primary dark:text-dark-text">Quiz: Neural Nets</p>
                  <p className="text-[9px] text-brand-muted dark:text-dark-muted font-bold uppercase tracking-widest mt-1">10:30 AM · Lab 4</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentDashboard;
