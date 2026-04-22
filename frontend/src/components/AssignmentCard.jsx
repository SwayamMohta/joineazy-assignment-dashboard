import React from 'react';
import { motion } from 'framer-motion';

const AssignmentCard = ({
  assignment,
  role,
  user,
  onOpenSubmitModal,
  onOpenEditModal,
  onToggleSubtask,
}) => {
  const userSubmission = (assignment.submissions || []).find(s => 
    (assignment.type === 'group' && user?.groupId === s.groupId) || 
    (assignment.type === 'individual' && user?.id === s.studentId)
  );

  const isSubmitted = userSubmission ? userSubmission.submitted : false;
  const userProgress = userSubmission ? userSubmission.progress : (role === 'student' ? 0 : assignment.progress || 0);

  const subtasks = assignment.subtasks || [];
  const completedTasks = subtasks.filter(st => st.completed).length;
  const totalTasks = subtasks.length;
  const isAllTasksDone = totalTasks === 0 || completedTasks === totalTasks;

  const avgProgress = assignment.submissions
    ? Math.round(assignment.submissions.reduce((acc, s) => acc + s.progress, 0) / assignment.submissions.length)
    : 0;

  const formattedDate = new Date(assignment.deadline).toLocaleDateString('en-US', {
    month: 'short', day: 'numeric',
  });

  const daysLeft = Math.ceil((new Date(assignment.deadline) - new Date()) / (1000 * 60 * 60 * 24));
  const isUrgent = daysLeft <= 3 && !isSubmitted;
  const isOverdue = daysLeft < 0 && !isSubmitted;

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, ease: 'easeOut' }}
      className="group relative bg-brand-card dark:bg-dark-card p-6 rounded-xl border border-brand-border dark:border-dark-border transition-all duration-300 hover:shadow-card-lg dark:hover:shadow-glow/5 premium-depth flex flex-col h-full"
    >
      {/* Header */}
      <div className="flex justify-between items-start mb-6">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <span className="px-2 py-0.5 bg-brand-bg-low dark:bg-white/5 text-brand-primary dark:text-dark-primary text-[9px] font-bold uppercase tracking-[0.1em] rounded font-label shadow-sm">
              {assignment.subject}
            </span>
            {isOverdue && !isSubmitted && (
              <span className="px-2 py-0.5 bg-red-50 dark:bg-red-500/10 text-error-red dark:text-red-400 text-[9px] font-bold uppercase tracking-[0.1em] rounded font-label flex items-center gap-1 shadow-sm">
                <span className="material-symbols-outlined text-[12px]">error</span> Overdue
              </span>
            )}
          </div>
          <h3 className="font-headline text-lg font-bold text-brand-primary dark:text-dark-text leading-tight group-hover:text-brand-accent dark:group-hover:text-brand-accent-dim transition-colors">
            {assignment.title}
          </h3>
        </div>

        {role === 'professor' && (
          <button onClick={onOpenEditModal} className="p-1.5 text-brand-muted dark:text-dark-muted hover:bg-brand-bg-low dark:hover:bg-white/5 rounded-lg transition-colors">
            <span className="material-symbols-outlined text-[20px]">more_vert</span>
          </button>
        )}
      </div>

      {/* Meta - Refined */}
      <div className="flex flex-wrap items-center gap-y-3 gap-x-6 mb-6 opacity-80">
        <div className="flex items-center gap-2 text-brand-muted dark:text-dark-muted">
          <span className="material-symbols-outlined text-[16px]">calendar_today</span>
          <span className="text-[10px] font-bold font-label uppercase tracking-widest">Due {formattedDate}</span>
        </div>
        <a
          href={assignment.driveLink}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2 text-brand-accent hover:text-brand-accent-dim transition-colors"
        >
          <span className="material-symbols-outlined text-[16px]">cloud_upload</span>
          <span className="text-[10px] font-bold font-label uppercase tracking-widest">OneDrive Assets</span>
        </a>
      </div>

      {/* Description - Editorial style */}
      <p className="text-sm text-brand-muted dark:text-dark-muted font-body mb-6 line-clamp-2 italic leading-relaxed border-l-2 border-brand-accent/30 dark:border-brand-accent-dim/30 pl-4">
        {assignment.description}
      </p>

      {/* Work Progress Checklist — Students only */}
      {role === 'student' && !isSubmitted && subtasks.length > 0 && (
        <div className="mb-6 space-y-3 bg-brand-bg-low/50 dark:bg-white/[0.02] p-4 rounded-lg border border-brand-border dark:border-dark-border">
          <div className="flex justify-between items-center mb-1">
            <span className="text-[9px] font-bold text-brand-muted dark:text-dark-muted uppercase tracking-widest font-label">
              Milestones
            </span>
            <span className="text-[9px] font-bold text-brand-accent dark:text-brand-accent-dim font-label bg-brand-bg dark:bg-dark-card px-2 py-0.5 rounded-full border border-brand-border dark:border-dark-border shadow-sm">
              {userProgress}%
            </span>
          </div>
          <div className="space-y-0.5">
            {subtasks.map(st => (
              <div
                key={st.id}
                onClick={() => onToggleSubtask(assignment.id, st.id)}
                className="flex items-center gap-3 p-2 rounded-md cursor-pointer transition-all duration-200 hover:bg-brand-card dark:hover:bg-dark-card group/task"
              >
                <div className={`w-3.5 h-3.5 rounded border flex items-center justify-center flex-shrink-0 transition-all duration-200 ${
                  st.completed
                    ? 'bg-brand-accent border-brand-accent'
                    : 'bg-transparent border-brand-muted/40 group-hover/task:border-brand-accent'
                }`}>
                  {st.completed && <span className="material-symbols-outlined text-white text-[10px] font-bold">check</span>}
                </div>
                <span className={`text-xs font-medium transition-all duration-200 select-none ${
                  st.completed ? 'text-brand-muted dark:text-dark-muted line-through opacity-50' : 'text-brand-text dark:text-dark-text'
                }`}>
                  {st.title}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}

      <div className="flex-grow" />

      {/* Role-specific content */}
      <div className="space-y-4 pt-4 border-t border-brand-border dark:border-dark-border">
        {role === 'student' ? (
          <>
            {/* Progress bar - Enhanced */}
            <div className="flex flex-col gap-2">
              <div className="flex justify-between text-[9px] font-bold font-label uppercase tracking-[0.2em]">
                <span className="text-brand-muted dark:text-dark-muted">
                  {isSubmitted ? 'Completed' : 'Status'}
                </span>
                <span className={isSubmitted ? 'text-brand-accent dark:text-brand-accent-dim' : 'text-brand-primary dark:text-dark-text'}>
                  {userProgress}%
                </span>
              </div>
              <div className="h-1.5 w-full bg-brand-bg-low dark:bg-white/5 rounded-full overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${userProgress}%` }}
                  transition={{ duration: 0.6, ease: 'easeOut' }}
                  className={`h-full rounded-full ${
                    isSubmitted
                      ? 'bg-brand-accent'
                      : 'bg-brand-primary dark:bg-dark-primary/60'
                  }`}
                  style={{
                    boxShadow: isSubmitted ? '0 0 8px rgba(217, 119, 6, 0.4)' : 'none'
                  }}
                />
              </div>
            </div>

            {/* Submit button - Refined */}
            <button
              disabled={isSubmitted || (!isAllTasksDone && !isSubmitted)}
              onClick={() => !isSubmitted && isAllTasksDone && onOpenSubmitModal(assignment)}
              className={`w-full py-3 rounded-lg text-xs font-bold uppercase tracking-widest font-body flex items-center justify-center gap-2 transition-all duration-300 shadow-sm ${
                isSubmitted
                  ? 'bg-amber-50 dark:bg-brand-accent/10 text-brand-accent dark:text-brand-accent-dim cursor-default border border-brand-accent/20'
                  : isAllTasksDone
                  ? 'btn-primary'
                  : 'bg-brand-bg-low dark:bg-white/5 text-brand-muted/70 cursor-not-allowed opacity-60'
              }`}
            >
              <span className="material-symbols-outlined text-[16px]" style={{ fontVariationSettings: isSubmitted ? "'FILL' 1" : "'FILL' 0" }}>
                {isSubmitted ? 'verified' : isAllTasksDone ? 'send' : 'lock'}
              </span>
              {isSubmitted
                ? 'Submitted'
                : isAllTasksDone
                ? 'Submit Task'
                : `Progress Required (${completedTasks}/${totalTasks})`}
            </button>
          </>
        ) : (
          <>
            {/* Professor: Class performance */}
            <div className="space-y-3">
              <div className="flex justify-between items-center text-[9px] font-bold text-brand-muted dark:text-dark-muted uppercase tracking-[0.2em] font-label">
                <span>Class Performance</span>
                <span className="text-brand-accent dark:text-brand-accent-dim">{avgProgress}% Avg</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="flex-1 bg-brand-bg-low dark:bg-white/5 px-3 py-2.5 rounded-lg text-center border border-brand-border dark:border-dark-border">
                  <p className="text-[10px] font-bold text-brand-muted dark:text-dark-muted uppercase tracking-widest font-label opacity-60">Tasks</p>
                  <p className="text-sm font-bold text-brand-primary dark:text-dark-text">{totalTasks}</p>
                </div>
                <div className="flex-1 bg-brand-bg-low dark:bg-white/5 px-3 py-2.5 rounded-lg text-center border border-brand-border dark:border-dark-border">
                  <p className="text-[10px] font-bold text-brand-muted dark:text-dark-muted uppercase tracking-widest font-label opacity-60">Success</p>
                  <p className="text-sm font-bold text-brand-accent dark:text-brand-accent-dim">
                    {(assignment.submissions || []).filter(s => s.submitted).length}
                  </p>
                </div>
              </div>
            </div>

            <button
              onClick={() => onOpenEditModal(assignment)}
              className="w-full py-3 rounded-lg text-xs font-bold uppercase tracking-widest text-brand-primary dark:text-dark-text bg-brand-bg-low dark:bg-white/5 hover:bg-brand-bg dark:hover:bg-white/10 transition-all duration-200 shadow-sm font-body border border-brand-border dark:border-dark-border"
            >
              Analyze Submissions
            </button>
          </>
        )}
      </div>
    </motion.div>
  );
};

export default AssignmentCard;
