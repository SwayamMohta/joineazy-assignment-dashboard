import React, { useState } from 'react';
import { motion } from 'framer-motion';

const AssignmentDetailsPage = ({ assignment, user, activeGroup, onBack, onConfirmSubmission, toggleSubtask }) => {
  if (!assignment) return null;
  const isGroupAssignment = assignment.type === 'group';
  const isLeader = isGroupAssignment && activeGroup && user.id === activeGroup.leaderId;
  const canSubmit = !isGroupAssignment || (isGroupAssignment && user.groupId);
  const userSubmission = (assignment.submissions || []).find(s => 
    (assignment.type === 'group' && user?.groupId === s.groupId) || 
    (assignment.type === 'individual' && user?.id === s.studentId)
  );
  const isSubmitted = userSubmission ? userSubmission.submitted : false;

  return (
    <div className="max-w-5xl mx-auto space-y-8">
      {/* Header */}
      <div className="flex items-center gap-4 mb-2">
        <button 
          onClick={onBack}
          className="w-10 h-10 rounded-full bg-white dark:bg-dark-sidebar border border-brand-border dark:border-dark-border flex items-center justify-center text-brand-muted hover:text-brand-primary dark:hover:text-dark-text transition-all hover:scale-110 shadow-sm"
        >
          <span className="material-symbols-outlined text-[20px]">arrow_back</span>
        </button>
        <span className="text-[10px] font-bold uppercase tracking-widest text-brand-muted dark:text-dark-muted font-label">
          Assignment Detail
        </span>
      </div>

      <section className="bg-white dark:bg-dark-sidebar rounded-[32px] p-10 border border-brand-border dark:border-dark-border premium-depth relative overflow-hidden">
        <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-12">
          <div className="lg:col-span-8 space-y-8">
            <div>
              <div className="flex items-center gap-3 mb-4">
                <span className={`px-3 py-1 rounded-full text-[9px] font-bold uppercase tracking-widest border ${
                  isGroupAssignment 
                    ? 'bg-purple-500/10 text-purple-500 border-purple-500/20' 
                    : 'bg-blue-500/10 text-blue-500 border-blue-500/20'
                }`}>
                  {assignment.type} Assignment
                </span>
                <span className="px-3 py-1 bg-brand-bg-low dark:bg-white/5 text-brand-muted dark:text-dark-muted text-[9px] font-bold uppercase tracking-widest rounded-full border border-brand-border dark:border-dark-border">
                  {assignment.subject}
                </span>
              </div>
              <h1 className="font-headline text-4xl font-extrabold tracking-tight text-brand-primary dark:text-dark-text">
                {assignment.title}
              </h1>
              <p className="text-brand-muted dark:text-dark-muted font-body mt-4 leading-relaxed text-lg">
                {assignment.description}
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-4">
              <div className="bg-brand-bg-low dark:bg-white/[0.02] p-6 rounded-2xl border border-brand-border dark:border-dark-border">
                <p className="text-[10px] font-bold text-brand-muted dark:text-dark-muted uppercase tracking-widest mb-3 font-label">Submission Target</p>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-white dark:bg-dark-card flex items-center justify-center text-brand-accent shadow-sm">
                    <span className="material-symbols-outlined text-[20px]">calendar_today</span>
                  </div>
                  <div>
                    <p className="font-bold text-brand-primary dark:text-dark-text">{assignment.deadline}</p>
                    <p className="text-[10px] text-brand-muted dark:text-dark-muted font-bold uppercase tracking-widest mt-0.5 opacity-60">11:59 PM EST</p>
                  </div>
                </div>
              </div>
              <div className="bg-brand-bg-low dark:bg-white/[0.02] p-6 rounded-2xl border border-brand-border dark:border-dark-border">
                <p className="text-[10px] font-bold text-brand-muted dark:text-dark-muted uppercase tracking-widest mb-3 font-label">Resource Portal</p>
                <a 
                  href={assignment.driveLink} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 group"
                >
                  <div className="w-10 h-10 rounded-xl bg-white dark:bg-dark-card flex items-center justify-center text-brand-primary dark:text-brand-accent shadow-sm group-hover:scale-110 transition-all">
                    <span className="material-symbols-outlined text-[20px]">cloud</span>
                  </div>
                  <div>
                    <p className="font-bold text-brand-primary dark:text-dark-text group-hover:text-brand-accent transition-colors">OneDrive Folder</p>
                    <p className="text-[10px] text-brand-muted dark:text-dark-muted font-bold uppercase tracking-widest mt-0.5 opacity-60">Upload Assets Here</p>
                  </div>
                </a>
              </div>
            </div>

            <div className="pt-8 border-t border-brand-border dark:border-dark-border">
              <h3 className="font-headline text-xl font-bold text-brand-primary dark:text-dark-text mb-6">Milestones & Subtasks</h3>
              <div className="space-y-3">
                {assignment.subtasks.map(task => (
                  <button
                    key={task.id}
                    disabled={isSubmitted}
                    onClick={() => toggleSubtask(assignment.id, task.id)}
                    className={`w-full flex items-center gap-4 p-5 rounded-2xl border transition-all text-left ${
                      task.completed 
                        ? 'bg-green-500/5 border-green-500/20 opacity-80' 
                        : 'bg-brand-bg-low dark:bg-white/[0.02] border-brand-border dark:border-dark-border hover:border-brand-accent'
                    }`}
                  >
                    <div className={`w-6 h-6 rounded-lg flex items-center justify-center transition-colors ${
                      task.completed ? 'bg-green-500 text-white' : 'bg-brand-border dark:bg-white/10 text-transparent'
                    }`}>
                      <span className="material-symbols-outlined text-[16px] font-bold">check</span>
                    </div>
                    <span className={`text-sm font-bold ${task.completed ? 'text-green-600 dark:text-green-400 line-through decoration-2' : 'text-brand-primary dark:text-dark-text'}`}>
                      {task.title}
                    </span>
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div className="lg:col-span-4 space-y-8">
            <div className="bg-brand-bg-low dark:bg-white/[0.03] p-8 rounded-3xl border border-brand-border dark:border-dark-border">
              <h4 className="text-[10px] font-bold text-brand-muted/50 dark:text-dark-muted uppercase tracking-widest mb-6 font-label">Submission Protocol</h4>
              
              {isSubmitted ? (
                <div className="text-center py-8 space-y-4">
                  <div className="w-20 h-20 bg-green-500/10 rounded-full flex items-center justify-center mx-auto text-green-500 shadow-card-sm border border-green-500/20">
                    <span className="material-symbols-outlined text-[40px]">check_circle</span>
                  </div>
                  <div>
                    <h5 className="font-headline text-xl font-bold text-brand-primary dark:text-dark-text">Acknowledged</h5>
                    <p className="text-xs text-brand-muted dark:text-dark-muted mt-2">Your submission has been logged and confirmed by the system.</p>
                  </div>
                </div>
              ) : (
                <div className="space-y-6">
                  {isGroupAssignment && !user.groupId ? (
                    <div className="p-6 bg-red-500/5 border border-red-500/20 rounded-2xl text-center space-y-4">
                      <span className="material-symbols-outlined text-red-500 text-[32px]">warning</span>
                      <p className="text-xs font-bold text-red-600 dark:text-red-400 leading-relaxed uppercase tracking-widest">You are not part of any group. Form or join one to submit this assignment.</p>
                      <button className="btn-primary w-full py-3 rounded-xl text-[10px] tracking-widest">Go to Groups</button>
                    </div>
                  ) : (
                    <>
                      <div className="space-y-4">
                        <p className="text-xs text-brand-muted dark:text-dark-muted leading-relaxed font-medium">
                          {isGroupAssignment 
                            ? "As a team member, you can mark the draft. However, only the Group Leader can finalize the submission for the entire team."
                            : "Confirm that you have completed all requirements and uploaded the final assets to the linked OneDrive folder."}
                        </p>
                      </div>

                      <div className="p-4 bg-brand-accent/5 border border-brand-accent/20 rounded-2xl flex items-center gap-4">
                        <div className="w-10 h-10 rounded-xl bg-brand-accent flex items-center justify-center text-white flex-shrink-0">
                          <span className="material-symbols-outlined text-[20px]">verified_user</span>
                        </div>
                        <div>
                          <p className="text-[10px] font-bold text-brand-primary dark:text-dark-text uppercase tracking-widest">Verification Status</p>
                          <p className="text-[9px] text-brand-accent font-bold uppercase tracking-widest mt-1">Ready for submission</p>
                        </div>
                      </div>

                      <button 
                        onClick={() => onConfirmSubmission(assignment)}
                        disabled={isGroupAssignment && !isLeader}
                        className={`w-full py-5 rounded-2xl text-xs font-bold uppercase tracking-[0.2em] shadow-card-lg transition-all ${
                          isGroupAssignment && !isLeader
                            ? 'bg-brand-muted/20 text-brand-muted cursor-not-allowed opacity-50'
                            : 'btn-primary scale-100 hover:scale-[1.02] active:scale-95'
                        }`}
                      >
                        {isGroupAssignment 
                          ? isLeader ? 'Acknowledge for Group' : 'Awaiting Leader'
                          : 'Mark as Submitted'}
                      </button>

                      {isGroupAssignment && !isLeader && activeGroup && (
                        <p className="text-[9px] text-center text-brand-muted dark:text-dark-muted font-bold uppercase tracking-widest opacity-60">
                          Leader: {activeGroup.leaderName || 'Team Lead'} ({activeGroup.name})
                        </p>
                      )}
                    </>
                  )}
                </div>
              )}
            </div>

            <div className="bg-brand-bg-low dark:bg-white/[0.03] p-8 rounded-3xl border border-brand-border dark:border-dark-border">
              <h4 className="text-[10px] font-bold text-brand-muted/50 dark:text-dark-muted uppercase tracking-widest mb-6 font-label">Submission Analytics</h4>
              <div className="space-y-6">
                <div className="flex justify-between items-center text-[10px] font-bold uppercase tracking-widest">
                  <span className="text-brand-muted">Completion Rate</span>
                  <span className="text-brand-accent">{assignment.progress}%</span>
                </div>
                <div className="w-full h-1.5 bg-brand-border dark:bg-white/10 rounded-full overflow-hidden">
                  <motion.div 
                    initial={{ width: 0 }}
                    animate={{ width: `${assignment.progress}%` }}
                    className="h-full bg-brand-accent" 
                  />
                </div>
                <div className="flex justify-between items-center pt-4 border-t border-brand-border dark:border-dark-border">
                  <div>
                    <p className="text-[9px] font-bold text-brand-muted uppercase tracking-widest mb-1 opacity-60">Submissions</p>
                    <p className="text-lg font-bold text-brand-primary dark:text-dark-text">12/30</p>
                  </div>
                  <div className="text-right">
                    <p className="text-[9px] font-bold text-brand-muted uppercase tracking-widest mb-1 opacity-60">Avg Grade</p>
                    <p className="text-lg font-bold text-brand-primary dark:text-dark-text">A-</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Decoration */}
        <div className="absolute -right-20 -top-20 w-64 h-64 bg-brand-accent/5 rounded-full blur-3xl pointer-events-none" />
      </section>
    </div>
  );
};

export default AssignmentDetailsPage;
