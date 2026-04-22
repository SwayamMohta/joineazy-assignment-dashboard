import React from 'react';
import { motion } from 'framer-motion';
import SummaryCard from '../components/SummaryCard';
import AssignmentCard from '../components/AssignmentCard';

const DashboardPage = ({
  user,
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
            {role === 'professor' ? 'Faculty · Course Overview' : 'Student · My Dashboard'}
          </span>
          <h1 className="font-headline text-4xl font-extrabold tracking-tight text-brand-primary dark:text-dark-text mt-1">
            {role === 'professor' ? 'Class Overview' : `Good Morning, ${user?.name?.split(' ')[0] || 'Student'}`}
          </h1>
          <p className="text-brand-muted dark:text-dark-muted font-body font-medium mt-1.5">
            {role === 'professor'
              ? `Managing ${totalCount} assignments · ${pendingCount} active · ${submittedCount} closed.`
              : `You have ${pendingCount} pending assignments this week. Keep the momentum going.`}
          </p>
        </div>
        {role === 'professor' && (
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
              {role === 'professor' ? 'Academic Pipeline' : 'Project Queue'}
            </h2>
            <p className="text-[10px] font-bold text-brand-muted/60 dark:text-dark-muted font-label uppercase tracking-widest mt-1.5">{filteredAssignments.length} Active Tasks</p>
          </div>
          <div className="flex items-center gap-2 flex-wrap bg-brand-bg-low dark:bg-white/[0.03] p-1.5 rounded-xl border border-brand-border dark:border-dark-border">
            {['all', 'pending', 'submitted'].map(status => (
              <button
                key={status}
                onClick={() => setFilterStatus(status)}
                className={`px-5 py-2 rounded-lg text-[10px] font-bold uppercase tracking-widest font-label transition-all duration-300 ${
                  filterStatus === status
                    ? 'bg-brand-primary dark:bg-brand-accent text-white shadow-card-sm scale-[1.02]'
                    : 'text-brand-muted dark:text-dark-muted hover:text-brand-primary dark:hover:text-dark-text'
                }`}
              >
                {status === 'all' ? 'All' : status.charAt(0).toUpperCase() + status.slice(1)}
              </button>
            ))}
          </div>
        </div>

        {filteredAssignments.length === 0 ? (
          <div className="bg-brand-card dark:bg-dark-sidebar rounded-xl p-20 flex flex-col items-center justify-center text-center border border-brand-border dark:border-dark-border premium-depth">
            <div className="w-16 h-16 rounded-2xl bg-brand-bg-low dark:bg-white/5 text-brand-muted dark:text-dark-muted flex items-center justify-center mb-6">
              <span className="material-symbols-outlined text-[32px]">folder_off</span>
            </div>
            <h3 className="font-headline text-lg font-bold text-brand-primary dark:text-dark-text mb-2">Workspace Empty</h3>
            <p className="text-brand-muted dark:text-dark-muted text-sm max-w-xs">
              {searchQuery ? `No matches for "${searchQuery}" in our records.` : 'Your current assignment filter returned no results.'}
            </p>
            <button
              onClick={() => { setFilterStatus('all'); setSearchQuery(''); }}
              className="mt-8 px-8 py-3 btn-primary uppercase tracking-widest text-[10px]"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredAssignments.slice(0, 6).map((asgn, idx) => (
              <motion.div
                key={asgn.id}
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.4, delay: idx * 0.08 }}
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
            {role === 'professor' && (
              <motion.button
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.4, delay: Math.min(filteredAssignments.length, 6) * 0.08 }}
                onClick={() => setShowCreateModal(true)}
                className="group bg-brand-bg-low dark:bg-white/5 rounded-2xl p-6 border border-dashed border-brand-border dark:border-dark-border hover:border-brand-accent dark:hover:border-brand-accent flex flex-col items-center justify-center min-h-[280px] text-center cursor-pointer transition-all duration-300"
              >
                <div className="w-16 h-16 rounded-2xl bg-brand-card dark:bg-dark-card text-brand-accent flex items-center justify-center mb-5 group-hover:scale-110 group-hover:bg-brand-accent group-hover:text-white transition-all duration-300 shadow-sm">
                  <span className="material-symbols-outlined text-[32px]">add</span>
                </div>
                <h3 className="font-headline text-lg font-bold text-brand-primary dark:text-dark-text mb-1">New Project</h3>
                <p className="text-brand-muted dark:text-dark-muted text-[10px] font-bold uppercase tracking-widest font-label opacity-60">Add to curriculum</p>
              </motion.button>
            )}
          </div>
        )}
      </section>

      {/* Bottom: Activity + Quick Stats */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 pb-12">
        {/* Activity Feed */}
        <div className="lg:col-span-8 bg-brand-card dark:bg-dark-sidebar rounded-2xl p-8 space-y-6 border border-brand-border dark:border-dark-border premium-depth">
          <div className="flex justify-between items-center">
            <div>
              <h3 className="font-headline text-xl font-bold text-brand-primary dark:text-dark-text tracking-tight">Recent Activity</h3>
              <p className="text-[10px] font-bold text-brand-muted/50 uppercase tracking-widest font-label mt-1">Status Updates</p>
            </div>
            <button
              onClick={() => setActiveTab('assignments')}
              className="text-[10px] font-bold text-brand-accent/80 hover:text-brand-accent uppercase tracking-widest font-label transition-colors"
            >
              View Feed
            </button>
          </div>
          {recentActivity.length === 0 ? (
            <div className="py-12 text-center opacity-40">
              <span className="material-symbols-outlined text-[48px] text-brand-muted mb-4 block">history</span>
              <p className="text-sm font-body uppercase tracking-widest font-bold">No Records</p>
            </div>
          ) : (
            <div className="space-y-4">
              {recentActivity.slice(0, 4).map((item, idx) => (
                <div key={idx} className="flex items-center gap-5 p-5 rounded-xl border border-brand-border dark:border-dark-border hover:bg-brand-bg-low dark:hover:bg-white/[0.02] transition-all duration-300 group/item">
                  <div className="w-10 h-10 rounded-xl bg-brand-bg-low dark:bg-white/5 flex items-center justify-center flex-shrink-0 transition-all group-hover/item:scale-110 shadow-card-sm">
                    <span className="material-symbols-outlined text-[20px]" style={{ color: item.color, fontVariationSettings: "'FILL' 0" }}>
                      {item.icon}
                    </span>
                  </div>
                  <div className="flex-grow min-w-0">
                    <p className="text-sm font-bold text-brand-primary dark:text-dark-text font-body truncate leading-none">{item.label}</p>
                    <p className="text-[9px] text-brand-muted dark:text-dark-muted font-label font-bold uppercase tracking-[0.2em] mt-2 opacity-50">{item.time}</p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Right Column: Progress + Quick Links */}
        <div className="lg:col-span-4 space-y-8">
          {/* Progress Card - Studio Premium Dark */}
          <div
            className="rounded-2xl p-10 flex flex-col justify-between text-white relative overflow-hidden shadow-card-lg border border-white/5"
            style={{ background: 'linear-gradient(135deg, #0B0F14 0%, #121821 100%)' }}
          >
            <div className="relative z-10">
              <span className="text-[10px] font-bold text-white/40 uppercase tracking-[0.3em] font-label">
                {role === 'professor' ? 'Academic Velocity' : 'Learning Momentum'}
              </span>
              <div className="mt-8 flex items-baseline gap-2">
                <span className="font-headline text-6xl font-bold tracking-tighter text-brand-accent-dim">{avgProgress}</span>
                <span className="text-2xl font-bold opacity-30">%</span>
              </div>
            </div>
            <div className="pt-8 border-t border-white/5 mt-10 relative z-10">
              <div className="flex justify-between items-center text-xs">
                <span className="text-white/40 uppercase tracking-widest font-bold text-[9px]">Submission Ratio</span>
                <span className="font-bold text-brand-accent-dim">{submittedCount}/{totalCount}</span>
              </div>
              <div className="mt-4 w-full h-1.5 bg-white/5 rounded-full overflow-hidden">
                 <motion.div 
                   initial={{ width: 0 }}
                   animate={{ width: `${avgProgress}%` }}
                   className="h-full bg-brand-accent-dim" 
                 />
              </div>
            </div>
            {/* Decoration */}
            <div className="absolute -right-12 -top-12 w-48 h-48 bg-brand-accent/5 rounded-full blur-3xl pointer-events-none" />
            <div className="absolute -left-12 -bottom-12 w-48 h-48 bg-blue-500/5 rounded-full blur-3xl pointer-events-none" />
          </div>

          {/* Quick Nav */}
          <div className="bg-brand-card dark:bg-dark-sidebar rounded-2xl p-6 space-y-4 border border-brand-border dark:border-dark-border premium-depth">
            <h4 className="text-[10px] font-bold text-brand-muted/50 uppercase tracking-[0.2em] font-label mb-2 px-1">Control Panel</h4>
            {[
              { tab: 'analytics', icon: 'monitoring', label: 'Performance Metrics' },
              { tab: 'reviews',   icon: 'quick_reference_all', label: 'Feedback Ledger' },
            ].map(({ tab, icon, label }) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className="w-full flex items-center gap-4 p-4 rounded-xl border border-transparent hover:border-brand-border dark:hover:border-dark-border hover:bg-brand-bg-low dark:hover:bg-white/[0.02] transition-all duration-300 text-left group"
              >
                <div className="w-10 h-10 rounded-xl bg-brand-bg-low dark:bg-white/5 flex items-center justify-center flex-shrink-0 transition-all group-hover:scale-110 shadow-card-sm">
                  <span className="material-symbols-outlined text-brand-muted group-hover:text-brand-accent text-[20px]">{icon}</span>
                </div>
                <span className="text-[13px] font-bold text-brand-primary dark:text-dark-text group-hover:text-brand-accent transition-colors font-body leading-none">{label}</span>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;
