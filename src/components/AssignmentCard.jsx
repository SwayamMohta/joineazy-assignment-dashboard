import React from 'react';
import { motion } from 'framer-motion';

const AssignmentCard = ({
  assignment,
  role,
  onOpenSubmitModal,
  onOpenEditModal,
  onToggleSubtask,
}) => {
  const isSubmitted = assignment.status === 'submitted';
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
      className="group relative bg-brand-card dark:bg-dark-card p-6 rounded-xl border border-black/5 dark:border-white/5 transition-all duration-300 hover:shadow-card dark:hover:shadow-none cursor-default flex flex-col h-full"
    >
      {/* Header */}
      <div className="flex justify-between items-start mb-6">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <span className="px-2 py-0.5 bg-brand-chip dark:bg-brand-secondary text-brand-primary dark:text-dark-primary text-[10px] font-bold uppercase tracking-widest rounded-md font-label">
              {assignment.subject}
            </span>
            {isOverdue && !isSubmitted && (
              <span className="px-2 py-0.5 bg-red-100 dark:bg-red-900/20 text-error-red dark:text-red-300 text-[10px] font-bold uppercase tracking-widest rounded-md font-label flex items-center gap-1">
                <span className="material-symbols-outlined text-[12px]">error</span> Overdue
              </span>
            )}
          </div>
          <h3 className="font-headline text-lg font-bold text-brand-text dark:text-dark-text leading-tight group-hover:text-brand-accent dark:group-hover:text-brand-accent-dim transition-colors">
            {assignment.title}
          </h3>
        </div>

        {role === 'admin' && (
          <button onClick={onOpenEditModal} className="p-1.5 text-brand-muted dark:text-dark-muted hover:bg-brand-bg-low dark:hover:bg-white/5 rounded-lg transition-colors">
            <span className="material-symbols-outlined text-[20px]">more_vert</span>
          </button>
        )}
      </div>

      {/* Meta */}
      <div className="flex flex-wrap items-center gap-y-3 gap-x-6 mb-6">
        <div className="flex items-center gap-2 text-brand-muted dark:text-dark-muted">
          <span className="material-symbols-outlined text-[18px]">calendar_today</span>
          <span className="text-xs font-bold font-label uppercase tracking-wide">Due {formattedDate}</span>
        </div>
        <a
          href={assignment.driveLink}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2 text-brand-accent dark:text-brand-accent-dim hover:opacity-80 transition-opacity"
        >
          <span className="material-symbols-outlined text-[18px]">cloud_upload</span>
          <span className="text-xs font-bold font-label uppercase tracking-wide">Drive Folder</span>
        </a>
      </div>

      {/* Description */}
      <p className="text-sm text-brand-muted dark:text-dark-muted font-body mb-6 line-clamp-2 italic leading-relaxed border-l-2 border-black/10 dark:border-white/10 pl-4">
        {assignment.description}
      </p>

      {/* Work Progress Checklist — Students only */}
      {role === 'student' && !isSubmitted && subtasks.length > 0 && (
        <div className="mb-6 space-y-3 bg-brand-bg-low dark:bg-dark-bg-low p-5 rounded-xl border border-black/5 dark:border-white/5">
          <div className="flex justify-between items-center mb-1">
            <span className="text-[10px] font-bold text-brand-muted dark:text-dark-muted uppercase tracking-widest font-label">
              Completed Parts / Work Progress
            </span>
            <span className="text-[10px] font-bold text-brand-primary dark:text-dark-primary font-label bg-brand-chip dark:bg-brand-secondary px-2 py-0.5 rounded-full">
              {assignment.progress}%
            </span>
          </div>
          <div className="space-y-1">
            {subtasks.map(st => (
              <div
                key={st.id}
                onClick={() => onToggleSubtask(assignment.id, st.id)}
                className="flex items-center gap-3 p-2.5 -mx-2 rounded-lg cursor-pointer transition-all duration-200 hover:bg-brand-card dark:hover:bg-dark-card group/task"
              >
                <div className={`w-4 h-4 rounded border-2 flex items-center justify-center flex-shrink-0 transition-all duration-200 ${
                  st.completed
                    ? 'bg-brand-accent border-brand-accent'
                    : 'bg-transparent border-brand-muted dark:border-dark-muted group-hover/task:border-brand-accent dark:group-hover/task:border-brand-accent-dim'
                }`}>
                  {st.completed && <span className="material-symbols-outlined text-white text-[12px] font-bold">check</span>}
                </div>
                <span className={`text-xs font-semibold transition-all duration-200 select-none ${
                  st.completed ? 'text-brand-muted dark:text-dark-muted line-through opacity-60' : 'text-brand-text dark:text-dark-text'
                }`}>
                  {st.title}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}

      <div className="flex-grow" />

      {/* Deadline + Drive small row */}
      <div className="flex items-center gap-4 mb-5 pt-2">
        <div className={`flex items-center gap-1.5 px-2.5 py-1 rounded-md text-[11px] font-bold font-label ${
          isOverdue
            ? 'bg-red-100 dark:bg-red-900/20 text-error-red dark:text-red-300'
            : isUrgent
            ? 'bg-orange-100 dark:bg-orange-900/20 text-orange-700 dark:text-orange-300'
            : 'bg-brand-bg-low dark:bg-dark-bg-low text-brand-muted dark:text-dark-muted'
        }`}>
          <span className="material-symbols-outlined text-[13px]">
            {isOverdue ? 'event_busy' : 'calendar_today'}
          </span>
          <span>Due {formattedDate}</span>
        </div>
        <a
          href={assignment.driveLink}
          target="_blank"
          rel="noreferrer"
          className="flex items-center gap-1.5 text-[11px] font-bold text-brand-muted dark:text-dark-muted hover:text-brand-accent dark:hover:text-brand-accent-dim transition-colors duration-200 font-label"
        >
          <span className="material-symbols-outlined text-[13px]">open_in_new</span>
          Drive
        </a>
      </div>

      {/* Role-specific content */}
      <div className="space-y-4">
        {role === 'student' ? (
          <>
            {/* Progress bar */}
            <div className="flex flex-col gap-2">
              <div className="flex justify-between text-[10px] font-bold font-label uppercase tracking-widest">
                <span className="text-brand-muted dark:text-dark-muted">
                  {isSubmitted ? 'Submitted' : 'Progress'}
                </span>
                <span className={isSubmitted ? 'text-brand-accent dark:text-brand-accent-dim' : 'text-brand-primary dark:text-dark-primary'}>
                  {assignment.progress}%
                </span>
              </div>
              <div className="h-2 w-full bg-brand-bg-low dark:bg-dark-bg-low rounded-full overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${assignment.progress}%` }}
                  transition={{ duration: 0.6, ease: 'easeOut' }}
                  className={`h-full rounded-full ${
                    isSubmitted
                      ? 'bg-gradient-to-r from-brand-accent to-brand-accent-dim'
                      : 'bg-gradient-to-r from-brand-primary to-brand-secondary'
                  }`}
                />
              </div>
            </div>

            {/* Submit button */}
            <button
              disabled={isSubmitted || (!isAllTasksDone && !isSubmitted)}
              onClick={() => !isSubmitted && isAllTasksDone && onOpenSubmitModal(assignment)}
              className={`w-full py-3.5 rounded-xl text-sm font-bold font-body flex items-center justify-center gap-2 transition-all duration-300 ${
                isSubmitted
                  ? 'bg-brand-accent/15 text-brand-accent dark:text-brand-accent-dim cursor-default'
                  : isAllTasksDone
                  ? 'bg-brand-primary dark:bg-brand-secondary text-white hover:opacity-90 shadow-primary active:scale-[0.98]'
                  : 'bg-brand-bg-low dark:bg-dark-bg-low text-brand-muted dark:text-dark-muted cursor-not-allowed opacity-70'
              }`}
            >
              <span className="material-symbols-outlined text-[16px]" style={{ fontVariationSettings: isSubmitted ? "'FILL' 1" : "'FILL' 0" }}>
                {isSubmitted ? 'check_circle' : isAllTasksDone ? 'send' : 'lock'}
              </span>
              {isSubmitted
                ? 'Submission Confirmed'
                : isAllTasksDone
                ? 'Submit Assignment'
                : `Complete Work Progress (${completedTasks}/${totalTasks})`}
            </button>
          </>
        ) : (
          <>
            {/* Admin: Class performance */}
            <div className="space-y-3 pt-3 border-t border-black/5 dark:border-white/5">
              <div className="flex justify-between items-center text-[10px] font-bold text-brand-muted dark:text-dark-muted uppercase tracking-widest font-label">
                <span>Class Performance</span>
                <span className="text-brand-accent dark:text-brand-accent-dim">{avgProgress}% Avg</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="flex-1 bg-brand-bg-low dark:bg-dark-bg-low px-3 py-2 rounded-lg text-center border border-black/5 dark:border-white/5">
                  <p className="text-[10px] font-bold text-brand-muted dark:text-dark-muted uppercase tracking-widest font-label">Tasks</p>
                  <p className="text-xs font-bold text-brand-primary dark:text-dark-primary">{totalTasks}</p>
                </div>
                <div className="flex-1 bg-brand-bg-low dark:bg-dark-bg-low px-3 py-2 rounded-lg text-center border border-black/5 dark:border-white/5">
                  <p className="text-[10px] font-bold text-brand-muted dark:text-dark-muted uppercase tracking-widest font-label">Students</p>
                  <p className="text-xs font-bold text-brand-primary dark:text-dark-primary">{assignment.submissions.length}</p>
                </div>
              </div>
              {assignment.submissions.length > 2 && (
                <p className="text-[10px] text-center text-brand-muted dark:text-dark-muted font-label font-bold pt-1 uppercase tracking-widest">
                  {assignment.submissions.filter(s => s.submitted).length} students submitted
                </p>
              )}
            </div>

            <button
              onClick={() => onOpenEditModal(assignment)}
              className="w-full py-3.5 rounded-xl text-sm font-bold text-brand-primary dark:text-dark-primary bg-brand-bg-low dark:bg-dark-bg-low hover:bg-brand-chip dark:hover:bg-white/10 transition-all duration-200 active:scale-[0.98] font-body border border-black/5 dark:border-white/5"
            >
              View Detailed Analytics
            </button>
          </>
        )}
      </div>
    </motion.div>
  );
};

export default AssignmentCard;
