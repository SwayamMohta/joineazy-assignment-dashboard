import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// Reviews page — student sees their grades/feedback, professor can add/edit reviews

const GRADE_OPTIONS = ['A', 'A-', 'B+', 'B', 'B-', 'C+', 'C', 'Pending'];

const gradeColor = {
  'A': '#10B981', 'A-': '#10B981',
  'B+': '#3B82F6', 'B': '#3B82F6', 'B-': '#64748B',
  'C+': '#F59E0B', 'C': '#F59E0B',
  'Pending': '#94A3B8',
};

const FeedbackModal = ({ assignment, onClose, onSave }) => {
  const [feedback, setFeedback] = useState(assignment.feedback || '');
  const [grade, setGrade] = useState(assignment.grade || 'Pending');

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="absolute inset-0 bg-dark-bg/40 backdrop-blur-sm" 
        onClick={onClose}
      />
      <motion.div
        initial={{ opacity: 0, scale: 0.96, y: 12 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        className="relative bg-brand-card dark:bg-dark-sidebar rounded-xl p-10 max-w-lg w-full z-10 border border-brand-border dark:border-dark-border shadow-card-lg premium-depth"
      >
        <button onClick={onClose} className="absolute top-6 right-6 p-2 text-brand-muted hover:text-brand-primary dark:hover:text-dark-text transition-colors">
          <span className="material-symbols-outlined text-[20px]">close</span>
        </button>

        <header className="mb-8">
           <div className="w-14 h-14 bg-brand-bg-low dark:bg-white/5 rounded-xl flex items-center justify-center mb-5 text-brand-accent shadow-sm">
             <span className="material-symbols-outlined text-[24px]" style={{ fontVariationSettings: "'FILL' 0" }}>rate_review</span>
           </div>
           <h3 className="font-headline text-2xl font-bold text-brand-primary dark:text-dark-text tracking-tight">Post Feedback</h3>
           <p className="text-sm text-brand-muted dark:text-dark-muted mt-2 truncate">
             Finalizing review for: <span className="font-bold text-brand-accent/80">{assignment.title}</span>
           </p>
        </header>

        <div className="space-y-6">
          <div>
            <label className="text-[10px] font-bold uppercase tracking-[0.2em] text-brand-muted/70 font-label block mb-3">Academic Performance Grade</label>
            <div className="flex gap-2 flex-wrap bg-brand-bg-low dark:bg-dark-bg-low p-2 rounded-xl border border-brand-border dark:border-dark-border">
              {GRADE_OPTIONS.map(g => (
                <button
                  key={g}
                  onClick={() => setGrade(g)}
                  className={`px-3 py-2 rounded-lg text-[10px] font-bold tracking-widest transition-all duration-300 ${
                    grade === g 
                      ? 'bg-brand-primary dark:bg-brand-accent text-white shadow-card-sm' 
                      : 'text-brand-muted hover:text-brand-primary dark:hover:text-dark-text'
                  }`}
                >
                  {g}
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="text-[10px] font-bold uppercase tracking-[0.2em] text-brand-muted/70 font-label block mb-3">Professional Commentary</label>
            <textarea
              value={feedback}
              onChange={e => setFeedback(e.target.value)}
              rows={5}
              placeholder="Provide structured, actionable feedback..."
              className="w-full bg-brand-bg-low dark:bg-white/[0.03] focus:bg-brand-card dark:focus:bg-dark-card rounded-xl py-3 px-4 text-sm font-body text-brand-text dark:text-dark-text border border-brand-border dark:border-dark-border outline-none transition-all duration-300 resize-none"
            />
          </div>
        </div>

        <div className="flex gap-4 mt-8">
          <button onClick={() => onSave(feedback, grade)} className="btn-primary flex-1 justify-center py-4 uppercase tracking-widest text-xs">
            Save Assessment
          </button>
          <button onClick={onClose} className="flex-1 py-4 bg-brand-bg-low dark:bg-white/5 text-brand-primary dark:text-dark-text rounded-xl font-bold text-xs uppercase tracking-widest hover:bg-brand-bg transition-colors">
            Cancel
          </button>
        </div>
      </motion.div>
    </div>
  );
};

const ReviewsPage = ({ assignments, setAssignments, role }) => {
  const [feedbackTarget, setFeedbackTarget] = useState(null);
  const [activeFilter, setActiveFilter] = useState('all');

  const submittedAssignments = assignments.filter(a => a.status === 'submitted');
  const reviewedAssignments = submittedAssignments.filter(a => a.feedback);
  const awaitingReview = submittedAssignments.filter(a => !a.feedback);

  const displayedAssignments =
    activeFilter === 'pending'  ? awaitingReview :
    activeFilter === 'reviewed' ? reviewedAssignments :
    submittedAssignments;

  const handleSaveFeedback = (feedback, grade) => {
    setAssignments(prev =>
      prev.map(a => a.id === feedbackTarget.id ? { ...a, feedback, grade } : a)
    );
    setFeedbackTarget(null);
  };

  return (
    <div className="space-y-10">
      {/* Header */}
      <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
        <div>
          <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-brand-muted/70 dark:text-dark-muted font-label">
            {role === 'professor' ? 'Evaluation Queue · Instructor' : 'Academic Feedback · Student'}
          </span>
          <h1 className="font-headline text-4xl font-bold tracking-tight text-brand-primary dark:text-dark-text mt-2">Professional Reviews</h1>
          <p className="text-brand-muted dark:text-dark-muted font-body mt-2">
            {role === 'professor'
              ? `Currently managing ${awaitingReview.length} pending submissions and ${reviewedAssignments.length} finalized assessments.`
              : `Reviewing technical performance across ${reviewedAssignments.length} completed modules.`}
          </p>
        </div>
      </motion.div>

      {/* Filter Tabs */}
      <div className="flex gap-2 p-1.5 bg-brand-bg-low dark:bg-white/[0.03] rounded-xl border border-brand-border dark:border-dark-border w-fit">
        {[
          { key: 'all',      label: 'Portfolio' },
          { key: 'pending',  label: 'Awaiting Review' },
          { key: 'reviewed', label: 'Finalized' },
        ].map(({ key, label }) => (
          <button
            key={key}
            onClick={() => setActiveFilter(key)}
            className={`px-5 py-2.5 rounded-lg text-[10px] font-bold uppercase tracking-widest font-label transition-all duration-300 ${
              activeFilter === key 
                ? 'bg-brand-primary dark:bg-brand-accent text-white shadow-card-sm' 
                : 'text-brand-muted hover:text-brand-primary dark:hover:text-dark-text'
            }`}
          >
            {label}
          </button>
        ))}
      </div>

      {/* List */}
      {displayedAssignments.length === 0 ? (
        <div className="bg-brand-card dark:bg-dark-sidebar rounded-xl p-20 flex flex-col items-center justify-center text-center border border-brand-border dark:border-dark-border premium-depth">
          <div className="w-16 h-16 rounded-2xl bg-brand-bg-low dark:bg-white/5 text-brand-muted dark:text-dark-muted flex items-center justify-center mb-6">
            <span className="material-symbols-outlined text-[32px]">rate_review</span>
          </div>
          <h3 className="font-headline text-lg font-bold text-brand-primary dark:text-dark-text mb-2">
            {activeFilter === 'pending' ? 'All Reviews Logged' : 'No Submissions Ready'}
          </h3>
          <p className="text-brand-muted dark:text-dark-muted text-sm max-w-xs opacity-70">
            {role === 'student' ? 'Complete your modules to start receiving professional feedback.' : 'Your queue is currently clear. Excellent work.'}
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-6">
          {displayedAssignments.map((asgn, idx) => (
            <motion.div
              key={asgn.id}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: idx * 0.05 }}
              className="bg-brand-card dark:bg-dark-sidebar rounded-2xl p-8 border border-brand-border dark:border-dark-border premium-depth overflow-hidden group"
            >
              <div className="relative flex flex-col lg:flex-row gap-8">
                {/* Content */}
                <div className="flex-grow min-w-0">
                  <header className="flex flex-wrap items-center gap-3 mb-4">
                    <span className="bg-brand-bg-low dark:bg-white/5 text-brand-muted px-3 py-1.5 rounded-lg text-[9px] font-bold uppercase tracking-widest font-label">
                      {asgn.subject}
                    </span>
                    {asgn.grade && (
                      <span
                        className="px-3 py-1.5 rounded-lg text-[9px] font-bold uppercase tracking-widest font-label bg-white dark:bg-dark-bg shadow-card-sm"
                        style={{ color: gradeColor[asgn.grade] }}
                      >
                        Performance: {asgn.grade}
                      </span>
                    )}
                    {!asgn.feedback && (
                      <div className="flex items-center gap-2 bg-brand-accent/5 px-3 py-1.5 rounded-lg border border-brand-accent/10">
                        <div className="w-1.5 h-1.5 rounded-full bg-brand-accent animate-pulse" />
                        <span className="text-[9px] font-bold uppercase tracking-widest font-label text-brand-accent">Pending Evaluation</span>
                      </div>
                    )}
                  </header>
                  
                  <h3 className="font-headline text-2xl font-bold text-brand-primary dark:text-dark-text tracking-tight mb-6">{asgn.title}</h3>
                  
                  {asgn.feedback ? (
                    <div className="relative p-6 bg-brand-bg-low/50 dark:bg-white/[0.02] rounded-2xl border border-brand-border dark:border-dark-border">
                      <div className="absolute top-4 right-4 opacity-5 pointer-events-none">
                         <span className="material-symbols-outlined text-[64px]">format_quote</span>
                      </div>
                      <p className="text-[10px] font-bold text-brand-muted/40 uppercase tracking-[0.2em] font-label mb-4">Instructor Ledger</p>
                      <p className="text-sm text-brand-primary dark:text-dark-text leading-relaxed font-body italic">"{asgn.feedback}"</p>
                    </div>
                  ) : (
                    <p className="text-sm text-brand-muted/50 font-body italic">Awaiting critical review from the course coordinator.</p>
                  )}
                </div>

                {/* Actions */}
                <div className="flex-shrink-0 flex flex-col justify-between items-end gap-6 pt-2">
                  <div className="text-right">
                    <p className="text-[9px] font-bold text-brand-muted/40 uppercase tracking-widest mb-1">Module ID</p>
                    <p className="text-[11px] font-bold text-brand-primary dark:text-dark-text">{asgn.id.slice(0, 8)}</p>
                  </div>
                  
                  {role === 'professor' ? (
                    <button
                      onClick={() => setFeedbackTarget(asgn)}
                      className={`btn-primary justify-center w-full lg:w-auto px-8 py-3.5 uppercase tracking-widest text-[10px] shadow-card-lg transition-all duration-300 ${
                        asgn.feedback ? 'brightness-90 hover:brightness-100' : ''
                      }`}
                    >
                      {asgn.feedback ? 'Update Ledger' : 'Review Submission'}
                    </button>
                  ) : (
                     asgn.feedback && (
                        <div className="flex items-center gap-3 bg-emerald-500/5 px-4 py-2 rounded-xl border border-emerald-500/20 text-emerald-500">
                          <span className="material-symbols-outlined text-[18px]">verified</span>
                          <span className="text-[10px] font-bold uppercase tracking-widest">Verified Review</span>
                        </div>
                     )
                  )}
                </div>
              </div>

              {/* Student breakdown - Professor only */}
              {role === 'professor' && (
                <div className="mt-8 pt-6 border-t border-brand-border dark:border-dark-border flex items-center justify-between">
                  <p className="text-[10px] font-bold text-brand-muted/50 uppercase tracking-widest font-label">Submission Activity</p>
                  <div className="flex -space-x-3 overflow-hidden">
                    {asgn.submissions.filter(s => s.submitted).map((sub, i) => (
                      <div 
                        key={sub.studentId}
                        title={sub.studentName}
                        className="w-8 h-8 rounded-full border-2 border-brand-card dark:border-dark-sidebar bg-brand-bg-low dark:bg-white/5 flex items-center justify-center text-[10px] font-bold text-brand-accent shadow-sm"
                      >
                        {sub.studentName.charAt(0)}
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </motion.div>
          ))}
        </div>
      )}

      <AnimatePresence>
        {feedbackTarget && (
          <FeedbackModal
            assignment={feedbackTarget}
            onClose={() => setFeedbackTarget(null)}
            onSave={handleSaveFeedback}
          />
        )}
      </AnimatePresence>
    </div>
  );
};

export default ReviewsPage;
