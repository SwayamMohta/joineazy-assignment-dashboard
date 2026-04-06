import React, { useState } from 'react';
import { motion } from 'framer-motion';

// Reviews page — student sees their grades/feedback, admin can add/edit reviews

const GRADE_OPTIONS = ['A', 'A-', 'B+', 'B', 'B-', 'C+', 'C', 'Pending'];

// color for each grade badge
const gradeColor = {
  'A': '#00b47d', 'A-': '#00b47d',
  'B+': '#002045', 'B': '#002045', 'B-': '#586377',
  'C+': '#f59e0b', 'C': '#f59e0b',
  'Pending': '#586377',
};

// modal for adding/editing instructor feedback
const FeedbackModal = ({ assignment, onClose, onSave }) => {
  const [feedback, setFeedback] = useState(assignment.feedback || '');
  const [grade, setGrade] = useState(assignment.grade || 'Pending');

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="absolute inset-0 bg-[#181c1e]/40 dark:bg-black/60 backdrop-blur-sm" 
        onClick={onClose}
      />
      <motion.div
        initial={{ opacity: 0, scale: 0.96 }}
        animate={{ opacity: 1, scale: 1 }}
        className="relative bg-[#ffffff] dark:bg-[#1a365d] rounded-xl p-8 max-w-md w-full z-10 border border-[#c4c6cf]/15 dark:border-white/5"
        style={{ boxShadow: '0px 12px 32px rgba(24,28,30,0.12)' }}
      >
        <button onClick={onClose} className="absolute top-4 right-4 p-2 text-[#586377] dark:text-[#86a0cd] hover:bg-[#ebeef0] dark:hover:bg-white/10 rounded-xl transition-colors">
          <span className="material-symbols-outlined text-[18px]">close</span>
        </button>

        <div className="w-12 h-12 bg-[#d5e0f7] dark:bg-[#002045] rounded-xl flex items-center justify-center mb-4">
          <span className="material-symbols-outlined text-[22px] text-[#002045] dark:text-[#d5e0f7]" style={{ fontVariationSettings: "'FILL' 1" }}>rate_review</span>
        </div>
        <h3 className="font-headline text-lg font-bold text-[#002045] dark:text-white mb-1">Add Feedback</h3>
        <p className="text-sm text-[#586377] dark:text-[#86a0cd] mb-5">
          For: <span className="font-bold text-[#002045] dark:text-[#d5e0f7]">{assignment.title}</span>
        </p>

        <div className="space-y-4">
          {/* grade selector */}
          <div>
            <label className="text-[10px] font-bold uppercase tracking-widest text-[#586377] dark:text-[#86a0cd] font-label block mb-1.5">Grade</label>
            <div className="flex gap-2 flex-wrap">
              {GRADE_OPTIONS.map(g => (
                <button
                  key={g}
                  onClick={() => setGrade(g)}
                  className={`px-3 py-1.5 rounded-md text-xs font-bold transition-all ${
                    grade === g ? 'bg-[#002045] dark:bg-[#00b47d] text-white shadow-md' : 'bg-[#ebeef0] dark:bg-[#002045] text-[#586377] dark:text-[#86a0cd] hover:bg-[#d5e0f7] dark:hover:bg-white/5 hover:text-[#002045] dark:hover:text-white'
                  }`}
                >
                  {g}
                </button>
              ))}
            </div>
          </div>

          {/* feedback textarea */}
          <div>
            <label className="text-[10px] font-bold uppercase tracking-widest text-[#586377] dark:text-[#86a0cd] font-label block mb-1.5">Instructor Feedback</label>
            <textarea
              value={feedback}
              onChange={e => setFeedback(e.target.value)}
              rows={4}
              placeholder="Write constructive feedback for the student..."
              className="w-full bg-[#ebeef0] dark:bg-[#002045] focus:bg-white dark:focus:bg-[#001730] rounded-xl py-3 px-4 text-sm font-body text-[#181c1e] dark:text-white placeholder-[#586377]/50 border border-transparent focus:border-[#002045]/20 dark:focus:border-white/10 outline-none transition-all duration-300 resize-none"
            />
          </div>
        </div>

        <div className="flex gap-3 mt-5">
          <button onClick={() => onSave(feedback, grade)} className="btn-primary-gradient flex-1 py-3 text-sm">
            Save Feedback
          </button>
          <button onClick={onClose} className="flex-1 py-3 bg-[#ebeef0] dark:bg-[#002045] text-[#002045] dark:text-[#d5e0f7] rounded-xl font-bold text-sm hover:bg-[#e0e3e5] dark:hover:bg-white/10 transition-colors">
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

  // only show submitted assignments here
  const submittedAssignments = assignments.filter(a => a.status === 'submitted');
  const reviewedAssignments = submittedAssignments.filter(a => a.feedback);
  const awaitingReview = submittedAssignments.filter(a => !a.feedback);

  const displayedAssignments =
    activeFilter === 'pending'  ? awaitingReview :
    activeFilter === 'reviewed' ? reviewedAssignments :
    submittedAssignments;

  const handleSaveFeedback = (feedback, grade) => {
    // update the assignment with the new feedback and grade
    setAssignments(prev =>
      prev.map(a => a.id === feedbackTarget.id ? { ...a, feedback, grade } : a)
    );
    setFeedbackTarget(null);
  };

  return (
    <div className="space-y-8">
      {/* page header */}
      <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
        <div>
          <span className="text-[10px] font-bold uppercase tracking-widest text-[#586377] dark:text-[#86a0cd] font-label">
            {role === 'admin' ? 'Admin · Review Management' : 'Student · My Reviews'}
          </span>
          <h1 className="font-headline text-4xl font-extrabold tracking-tight text-[#002045] dark:text-white mt-1">Reviews & Feedback</h1>
          <p className="text-[#586377] dark:text-[#86a0cd] font-body font-medium mt-1.5">
            {role === 'admin'
              ? `${awaitingReview.length} submissions awaiting review, ${reviewedAssignments.length} reviewed.`
              : `${reviewedAssignments.length} reviewed · ${awaitingReview.length} awaiting feedback.`}
          </p>
        </div>
      </motion.div>

      {/* filter tabs */}
      <div className="flex gap-2">
        {[
          { key: 'all',      label: `All (${submittedAssignments.length})` },
          { key: 'pending',  label: `Awaiting Review (${awaitingReview.length})` },
          { key: 'reviewed', label: `Reviewed (${reviewedAssignments.length})` },
        ].map(({ key, label }) => (
          <button
            key={key}
            onClick={() => setActiveFilter(key)}
            className={`px-4 py-1.5 rounded-md text-[11px] font-bold uppercase tracking-wide font-label transition-all duration-200 ${
              activeFilter === key ? 'bg-[#d5e0f7] text-[#002045] shadow-sm' : 'bg-[#ffffff] dark:bg-[#1a365d] text-[#586377] dark:text-[#86a0cd] hover:bg-[#ebeef0] dark:hover:bg-white/5 border border-[#c4c6cf]/15 dark:border-white/5'
            }`}
          >
            {label}
          </button>
        ))}
      </div>

      {/* empty state */}
      {displayedAssignments.length === 0 ? (
        <div className="bg-[#ffffff] dark:bg-[#1a365d] rounded-xl p-16 flex flex-col items-center justify-center text-center border border-[#c4c6cf]/15 dark:border-white/5 transition-colors">
          <div className="w-16 h-16 rounded-full bg-[#ebeef0] dark:bg-[#002045] flex items-center justify-center mb-4">
            <span className="material-symbols-outlined text-[#586377] dark:text-[#86a0cd] text-[32px]">rate_review</span>
          </div>
          <h3 className="font-headline text-lg font-bold text-[#002045] dark:text-white mb-2">
            {activeFilter === 'pending' ? 'No Pending Reviews' : 'No Submissions Yet'}
          </h3>
          <p className="text-[#586377] dark:text-[#86a0cd] text-sm opacity-80">
            {role === 'student' ? 'Submit assignments to see feedback here.' : 'All submissions have been reviewed.'}
          </p>
        </div>
      ) : (
        <div className="space-y-4">
          {displayedAssignments.map((asgn, idx) => (
            <motion.div
              key={asgn.id}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.06 }}
              className="bg-[#ffffff] dark:bg-[#1a365d] rounded-xl p-6 border border-[#c4c6cf]/15 dark:border-white/5 hover:shadow-[0px_12px_32px_rgba(24,28,30,0.06)] dark:hover:shadow-none transition-all duration-300"
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                {/* assignment info + feedback */}
                <div className="flex-grow min-w-0">
                  <div className="flex items-center gap-3 mb-2">
                    <span className="bg-[#d5e0f7] dark:bg-[#002045] text-[#586377] dark:text-[#d1dbed] px-3 py-1 rounded-md text-[10px] font-bold uppercase tracking-wider font-label border border-[#c4c6cf]/15 dark:border-white/5">
                      {asgn.subject}
                    </span>
                    {asgn.grade && (
                      <span
                        className="px-3 py-1 rounded-md text-[10px] font-bold uppercase tracking-wider font-label"
                        style={{ backgroundColor: (gradeColor[asgn.grade] || '#586377') + '20', color: gradeColor[asgn.grade] || '#586377' }}
                      >
                        Grade: {asgn.grade}
                      </span>
                    )}
                    {!asgn.feedback && (
                      <span className="bg-[#fef3c7] dark:bg-[#f59e0b]/20 text-[#f59e0b] px-3 py-1 rounded-md text-[10px] font-bold uppercase tracking-wider font-label">
                        Awaiting Review
                      </span>
                    )}
                  </div>
                  <h3 className="font-headline text-base font-bold text-[#002045] dark:text-white">{asgn.title}</h3>
                  {asgn.feedback ? (
                    <div className="mt-4 p-4 bg-[#f1f4f6] dark:bg-[#002045] rounded-xl border border-[#c4c6cf]/15 dark:border-white/5">
                      <p className="text-[10px] font-bold text-[#586377] dark:text-[#86a0cd] uppercase tracking-widest font-label mb-1.5">Instructor Feedback</p>
                      <p className="text-sm text-[#181c1e] dark:text-[#d1dbed] leading-relaxed">{asgn.feedback}</p>
                    </div>
                  ) : (
                    <p className="text-sm text-[#586377] dark:text-[#86a0cd] mt-2 opacity-70 italic">No feedback yet.</p>
                  )}
                </div>

                {/* action button */}
                <div className="flex-shrink-0 flex items-center gap-2">
                  {role === 'admin' && (
                    <button
                      onClick={() => setFeedbackTarget(asgn)}
                      className={`flex items-center gap-1.5 px-4 py-2.5 rounded-xl font-bold text-sm transition-all duration-200 ${
                        asgn.feedback
                          ? 'bg-[#ebeef0] dark:bg-[#002045] text-[#002045] dark:text-[#d5e0f7] hover:bg-[#e0e3e5] dark:hover:bg-white/10'
                          : 'btn-primary-gradient shadow-lg'
                      }`}
                    >
                      <span className="material-symbols-outlined text-[16px]">{asgn.feedback ? 'edit' : 'rate_review'}</span>
                      {asgn.feedback ? 'Edit Review' : 'Add Review'}
                    </button>
                  )}
                  {role === 'student' && asgn.feedback && (
                    <div className="flex items-center gap-1.5 bg-[#4edea3]/20 px-3 py-1.5 rounded-lg border border-[#00b47d]/20">
                      <span className="material-symbols-outlined text-[#00b47d] text-[14px]" style={{ fontVariationSettings: "'FILL' 1" }}>check_circle</span>
                      <span className="text-[11px] font-bold text-[#00b47d]">Reviewed</span>
                    </div>
                  )}
                </div>
              </div>

              {/* admin: show who submitted and who hasn't */}
              {role === 'admin' && (
                <div className="mt-4 pt-4 border-t border-[#c4c6cf]/15 dark:border-white/10">
                  <p className="text-[10px] font-bold text-[#586377] dark:text-[#86a0cd] uppercase tracking-widest font-label mb-3">
                    Student Submissions ({asgn.submissions.filter(s => s.submitted).length}/{asgn.submissions.length})
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {asgn.submissions.map(sub => (
                      <div
                        key={sub.studentId}
                        className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-bold transition-colors ${
                          sub.submitted ? 'bg-[#4edea3]/20 text-[#00b47d] dark:text-[#4edea3]' : 'bg-[#ebeef0] dark:bg-[#002045] text-[#586377] dark:text-[#86a0cd]'
                        }`}
                      >
                        <span className="material-symbols-outlined text-[12px]" style={{ fontVariationSettings: `'FILL' ${sub.submitted ? 1 : 0}` }}>
                          {sub.submitted ? 'check_circle' : 'radio_button_unchecked'}
                        </span>
                        {sub.studentName}
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </motion.div>
          ))}
        </div>
      )}

      {/* feedback modal (admin only) */}
      {feedbackTarget && (
        <FeedbackModal
          assignment={feedbackTarget}
          onClose={() => setFeedbackTarget(null)}
          onSave={handleSaveFeedback}
        />
      )}
    </div>
  );
};

export default ReviewsPage;
