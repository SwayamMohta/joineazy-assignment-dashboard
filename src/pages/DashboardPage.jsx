import React from 'react';
import { motion } from 'framer-motion';
import SummaryCard from '../components/SummaryCard';
import AssignmentCard from '../components/AssignmentCard';

const DashboardPage = ({
  role,
  assignments,
  statsCards,
  filteredAssignments,
  recentActivity,
  filterStatus,
  setFilterStatus,
  searchQuery,
  setSearchQuery,
  setActiveTab,
  setShowCreateModal,
  handleOpenSubmitModal,
  toggleSubtask,
  pendingCount,
  submittedCount,
  totalCount,
  avgProgress
}) => {
  return (
    <div className="space-y-10">
      {/* Header */}
      <section className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
        <div>
          <span className="text-[10px] font-bold uppercase tracking-widest text-brand-muted dark:text-dark-muted font-label">
            {role === 'admin' ? 'Admin · Course Overview' : 'Student · My Dashboard'}
          </span>
          <h1 className="font-headline text-4xl font-extrabold tracking-tight text-brand-primary dark:text-dark-text mt-1">
            {role === 'admin' ? 'Class Overview' : 'Good Morning, Arjun'}
          </h1>
          <p className="text-brand-muted dark:text-dark-muted font-body font-medium mt-1.5">
            {role === 'admin'
              ? `Managing ${totalCount} assignments · ${pendingCount} active · ${submittedCount} closed.`
              : `You have ${pendingCount} pending assignments this week. Keep the momentum going.`}
          </p>
        </div>
        {role === 'admin' && (
          <button
            onClick={() => setShowCreateModal(true)}
            className="btn-primary flex items-center gap-2 flex-shrink-0"
          >
            <span className="material-symbols-outlined text-[18px]">add</span>
            Create Assignment
          </button>
        )}
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

      {/* Assignments */}
      <section>
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
          <div>
            <h2 className="font-headline text-2xl font-bold text-brand-primary dark:text-dark-text">
              {role === 'admin' ? 'All Assignments' : 'Active Assignments'}
            </h2>
            <p className="text-xs text-brand-muted dark:text-dark-muted font-label mt-0.5">{filteredAssignments.length} assignments</p>
          </div>
          <div className="flex items-center gap-2 flex-wrap">
            {['all', 'pending', 'submitted'].map(status => (
              <button
                key={status}
                onClick={() => setFilterStatus(status)}
                className={`px-4 py-1.5 rounded-lg text-[11px] font-bold uppercase tracking-wide font-label transition-all duration-200 ${
                  filterStatus === status
                    ? 'bg-brand-primary dark:bg-brand-accent text-white shadow-sm'
                    : 'bg-brand-bg-low dark:bg-dark-bg-low text-brand-muted dark:text-dark-muted hover:bg-brand-chip dark:hover:bg-white/10 hover:text-brand-primary dark:hover:text-dark-text border border-black/5 dark:border-white/5'
                }`}
              >
                {status === 'all' ? 'All' : status.charAt(0).toUpperCase() + status.slice(1)}
              </button>
            ))}
            <button
              onClick={() => setActiveTab('assignments')}
              className="px-4 py-1.5 rounded-lg text-[11px] font-bold uppercase tracking-wide font-label text-brand-accent dark:text-brand-accent-dim hover:underline"
            >
              View All →
            </button>
          </div>
        </div>

        {filteredAssignments.length === 0 ? (
          <div className="bg-brand-card dark:bg-dark-card rounded-xl p-16 flex flex-col items-center justify-center text-center border border-black/5 dark:border-white/5">
            <div className="w-16 h-16 rounded-full bg-brand-bg-low dark:bg-dark-bg-low text-brand-muted dark:text-dark-muted flex items-center justify-center mb-4">
              <span className="material-symbols-outlined text-[32px]">inbox</span>
            </div>
            <h3 className="font-headline text-lg font-bold text-brand-text dark:text-dark-text mb-2">No Assignments Found</h3>
            <p className="text-brand-muted dark:text-dark-muted text-sm">
              {searchQuery ? `No results for "${searchQuery}"` : 'No assignments match your filter.'}
            </p>
            <button
              onClick={() => { setFilterStatus('all'); setSearchQuery(''); }}
              className="mt-5 px-5 py-2 bg-brand-chip dark:bg-brand-secondary text-brand-primary dark:text-dark-primary rounded-lg font-bold text-xs uppercase tracking-widest font-label hover:opacity-80 transition-opacity"
            >
              Show All
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredAssignments.slice(0, 6).map((asgn, idx) => (
              <motion.div
                key={asgn.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.35, delay: idx * 0.08 }}
              >
                <AssignmentCard
                  assignment={asgn}
                  role={role}
                  onOpenSubmitModal={handleOpenSubmitModal}
                  onOpenEditModal={() => setActiveTab('analytics')}
                  onToggleSubtask={toggleSubtask}
                />
              </motion.div>
            ))}
            {role === 'admin' && (
              <motion.button
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.35, delay: Math.min(filteredAssignments.length, 6) * 0.08 }}
                onClick={() => setShowCreateModal(true)}
                className="group bg-brand-card dark:bg-dark-card rounded-xl p-6 border-2 border-dashed border-black/10 dark:border-white/10 hover:border-brand-primary dark:hover:border-brand-accent flex flex-col items-center justify-center min-h-[280px] text-center cursor-pointer transition-all duration-300"
              >
                <div className="w-14 h-14 rounded-full bg-brand-bg-low dark:bg-dark-bg-low text-brand-primary dark:text-dark-primary flex items-center justify-center mb-4 group-hover:scale-110 group-hover:bg-brand-accent group-hover:text-white dark:group-hover:bg-brand-accent transition-all duration-300">
                  <span className="material-symbols-outlined text-[28px]">add</span>
                </div>
                <h3 className="font-headline text-base font-bold text-brand-text dark:text-dark-text mb-1">New Assignment</h3>
                <p className="text-brand-muted dark:text-dark-muted text-xs">Click to create</p>
              </motion.button>
            )}
          </div>
        )}
      </section>

      {/* Bottom: Activity + Quick Stats */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 pb-8">
        {/* Activity Feed */}
        <div className="lg:col-span-8 bg-brand-card dark:bg-dark-card rounded-xl p-6 space-y-4 border border-black/5 dark:border-white/5">
          <div className="flex justify-between items-center">
            <h3 className="font-headline text-lg font-bold text-brand-text dark:text-dark-text">Recent Activity</h3>
            <button
              onClick={() => setActiveTab('assignments')}
              className="text-[11px] font-bold text-brand-accent dark:text-brand-accent-dim font-label uppercase tracking-widest hover:underline"
            >
              View All
            </button>
          </div>
          {recentActivity.length === 0 ? (
            <div className="py-8 text-center">
              <span className="material-symbols-outlined text-[32px] text-brand-muted dark:text-dark-muted mb-2 block">history</span>
              <p className="text-sm text-brand-muted dark:text-dark-muted">No recent activity yet.</p>
            </div>
          ) : (
            <div className="space-y-2">
              {recentActivity.slice(0, 4).map((item, idx) => (
                <div key={idx} className="flex items-center gap-4 bg-brand-bg-low dark:bg-dark-bg-low p-4 rounded-xl hover:bg-brand-chip dark:hover:bg-white/5 transition-colors duration-200 group/item">
                  <div className="w-9 h-9 rounded-lg bg-brand-bg dark:bg-dark-bg flex items-center justify-center flex-shrink-0 transition-all group-hover/item:scale-110">
                    <span className="material-symbols-outlined text-[18px]" style={{ color: item.color, fontVariationSettings: "'FILL' 1" }}>
                      {item.icon}
                    </span>
                  </div>
                  <div className="flex-grow min-w-0">
                    <p className="text-sm font-semibold text-brand-text dark:text-dark-text font-body truncate">{item.label}</p>
                    <p className="text-[10px] text-brand-muted dark:text-dark-muted font-label font-bold uppercase tracking-widest mt-0.5">{item.time}</p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Right Column: Progress + Quick Links */}
        <div className="lg:col-span-4 space-y-6">
          {/* Progress Card */}
          <div
            className="rounded-xl p-6 flex flex-col justify-between text-white relative overflow-hidden shadow-primary"
            style={{ background: 'linear-gradient(135deg, #002045 0%, #1a365d 100%)' }}
          >
            <div className="relative z-10">
              <span className="text-[10px] font-bold text-white/70 uppercase tracking-widest font-label">
                {role === 'admin' ? 'Class Progress' : 'Overall Progress'}
              </span>
              <div className="mt-3 flex items-baseline gap-1">
                <span className="font-headline text-5xl font-extrabold">{avgProgress}</span>
                <span className="text-2xl font-bold opacity-60">%</span>
              </div>
            </div>
            <div className="pt-5 border-t border-white/10 mt-5 relative z-10">
              <div className="flex justify-between items-center text-sm">
                <span className="text-white/70">Completion Rate</span>
                <span className="font-bold">{submittedCount}/{totalCount} done</span>
              </div>
            </div>
            <div className="absolute -right-8 -bottom-8 w-32 h-32 bg-white/10 rounded-full blur-2xl pointer-events-none" />
          </div>

          {/* Quick Nav */}
          <div className="bg-brand-card dark:bg-dark-card rounded-xl p-5 space-y-3 border border-black/5 dark:border-white/5">
            <h4 className="text-[10px] font-bold text-brand-muted dark:text-dark-muted uppercase tracking-widest font-label">Quick Actions</h4>
            {[
              { tab: 'analytics', icon: 'bar_chart', label: 'View Analytics' },
              { tab: 'reviews',   icon: 'rate_review', label: 'Check Reviews' },
            ].map(({ tab, icon, label }) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className="w-full flex items-center gap-3 p-3 bg-brand-bg-low dark:bg-dark-bg-low rounded-xl hover:bg-brand-chip dark:hover:bg-white/5 transition-colors text-left group"
              >
                <div className="w-8 h-8 rounded-lg bg-brand-bg dark:bg-dark-bg group-hover:bg-brand-accent group-hover:text-white flex items-center justify-center flex-shrink-0 transition-colors">
                  <span className="material-symbols-outlined text-brand-primary dark:text-dark-primary group-hover:text-white text-[16px]">{icon}</span>
                </div>
                <span className="text-sm font-bold text-brand-text dark:text-dark-text group-hover:text-brand-accent dark:group-hover:text-brand-accent-dim transition-colors font-body">{label}</span>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;
