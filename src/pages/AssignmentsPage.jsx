import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import AssignmentCard from '../components/AssignmentCard';
import CreateAssignmentModal from '../components/CreateAssignmentModal';

const AssignmentsPage = ({ assignments, setAssignments, role, onOpenSubmitModal, searchQuery, onToggleSubtask }) => {
  const [filterStatus, setFilterStatus] = useState('all');
  const [sortBy, setSortBy] = useState('deadline');
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [deleteConfirmId, setDeleteConfirmId] = useState(null);
  const [expandedId, setExpandedId] = useState(null);

  const filteredAssignments = assignments
    .filter(a => {
      const matchesStatus = filterStatus === 'all' || a.status === filterStatus;
      const q = (searchQuery || '').toLowerCase();
      const matchesSearch = !q || a.title.toLowerCase().includes(q) || a.subject.toLowerCase().includes(q) || a.description.toLowerCase().includes(q);
      return matchesStatus && matchesSearch;
    })
    .sort((a, b) => {
      if (sortBy === 'deadline') return new Date(a.deadline) - new Date(b.deadline);
      if (sortBy === 'title') return a.title.localeCompare(b.title);
      if (sortBy === 'progress') return b.progress - a.progress;
      return 0;
    });

  const handleCreate = (newAssignment) => setAssignments(prev => [newAssignment, ...prev]);
  const handleDelete = (id) => { setAssignments(prev => prev.filter(a => a.id !== id)); setDeleteConfirmId(null); };

  const totalCount = assignments.length;
  const pendingCount = assignments.filter(a => a.status === 'pending').length;
  const submittedCount = assignments.filter(a => a.status === 'submitted').length;

  return (
    <div className="space-y-8">
      {/* Header */}
      <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
        <div>
          <span className="text-[10px] font-bold uppercase tracking-widest text-brand-muted dark:text-dark-muted font-label">
            {role === 'admin' ? 'Admin · Assignment Management' : 'Student · My Assignments'}
          </span>
          <h1 className="font-headline text-4xl font-extrabold tracking-tight text-brand-primary dark:text-dark-text mt-1">
            {role === 'admin' ? 'Manage Assignments' : 'My Assignments'}
          </h1>
          <p className="text-brand-muted dark:text-dark-muted font-body font-medium mt-1.5">
            {role === 'admin'
              ? `${totalCount} assignments across ${pendingCount} active, ${submittedCount} closed.`
              : `${pendingCount} pending · ${submittedCount} submitted.`}
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
      </motion.div>

      {/* Filters + Sort */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="flex items-center gap-2 flex-wrap">
          {[
            { key: 'all',       label: `All (${totalCount})` },
            { key: 'pending',   label: `Pending (${pendingCount})` },
            { key: 'submitted', label: `Submitted (${submittedCount})` },
          ].map(({ key, label }) => (
            <button
              key={key}
              onClick={() => setFilterStatus(key)}
              className={`px-4 py-1.5 rounded-lg text-[11px] font-bold uppercase tracking-wide font-label transition-all duration-200 ${
                filterStatus === key
                  ? 'bg-brand-primary dark:bg-brand-accent text-white shadow-sm'
                  : 'bg-brand-card dark:bg-dark-card text-brand-muted dark:text-dark-muted hover:bg-brand-chip dark:hover:bg-white/10 border border-black/5 dark:border-white/5'
              }`}
            >
              {label}
            </button>
          ))}
        </div>
        <div className="flex items-center gap-2">
          <span className="text-[10px] font-bold text-brand-muted dark:text-dark-muted uppercase tracking-widest font-label">Sort:</span>
          <select
            value={sortBy}
            onChange={e => setSortBy(e.target.value)}
            className="bg-brand-card dark:bg-dark-card text-brand-text dark:text-dark-text rounded-lg py-1.5 px-3 text-[11px] font-bold outline-none border border-black/5 dark:border-white/5 cursor-pointer"
          >
            <option value="deadline">Deadline</option>
            <option value="title">Title</option>
            <option value="progress">Progress</option>
          </select>
        </div>
      </div>

      {/* Empty State */}
      {filteredAssignments.length === 0 ? (
        <div className="bg-brand-card dark:bg-dark-card rounded-xl p-16 flex flex-col items-center justify-center text-center border border-black/5 dark:border-white/5">
          <div className="w-16 h-16 rounded-full bg-brand-bg-low dark:bg-dark-bg-low text-brand-muted dark:text-dark-muted flex items-center justify-center mb-4">
            <span className="material-symbols-outlined text-[32px]">search_off</span>
          </div>
          <h3 className="font-headline text-lg font-bold text-brand-text dark:text-dark-text mb-2">No Results Found</h3>
          <p className="text-brand-muted dark:text-dark-muted text-sm opacity-80">
            {searchQuery ? `No assignments match "${searchQuery}"` : 'No assignments match your filter.'}
          </p>
          <button
            onClick={() => setFilterStatus('all')}
            className="mt-5 px-5 py-2 bg-brand-chip dark:bg-brand-secondary text-brand-primary dark:text-dark-primary rounded-lg font-bold text-xs uppercase tracking-widest font-label hover:opacity-80 transition-opacity"
          >
            Show All
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredAssignments.map((asgn, idx) => (
            <motion.div
              key={asgn.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: idx * 0.07, ease: 'easeOut' }}
              className="relative"
            >
              <AssignmentCard
                assignment={asgn}
                role={role}
                onOpenSubmitModal={onOpenSubmitModal}
                onOpenEditModal={() => setExpandedId(asgn.id)}
                onToggleSubtask={onToggleSubtask}
              />

              {/* Admin drill-down panel */}
              {role === 'admin' && (
                <AnimatePresence>
                  {expandedId === asgn.id && (
                    <motion.div
                      initial={{ opacity: 0, y: -4 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -4 }}
                      className="absolute inset-x-0 top-0 bg-brand-card dark:bg-dark-card rounded-xl z-20 p-6 border border-black/5 dark:border-white/5 shadow-card-lg"
                    >
                      <div className="flex justify-between items-start mb-4">
                        <div>
                          <span className="text-[10px] font-bold uppercase tracking-widest text-brand-muted dark:text-dark-muted font-label">Student Breakdown</span>
                          <h3 className="font-headline text-base font-bold text-brand-text dark:text-dark-text mt-0.5">{asgn.title}</h3>
                        </div>
                        <button
                          onClick={() => setExpandedId(null)}
                          className="p-1.5 text-brand-muted dark:text-dark-muted hover:bg-brand-bg-low dark:hover:bg-white/10 rounded-lg transition-colors"
                        >
                          <span className="material-symbols-outlined text-[16px]">close</span>
                        </button>
                      </div>

                      <div className="space-y-3">
                        {asgn.submissions.map(sub => (
                          <div key={sub.studentId} className="flex items-center gap-3">
                            <img
                              src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${sub.studentName}`}
                              alt={sub.studentName}
                              className="w-8 h-8 rounded-full bg-brand-chip dark:bg-brand-secondary flex-shrink-0"
                            />
                            <div className="flex-grow min-w-0">
                              <div className="flex justify-between text-xs font-bold text-brand-text dark:text-dark-text">
                                <span>{sub.studentName}</span>
                                <span className={sub.progress === 100 ? 'text-brand-accent dark:text-brand-accent-dim' : 'text-brand-muted dark:text-dark-muted'}>
                                  {sub.submitted ? '✓ Submitted' : `${sub.progress}%`}
                                </span>
                              </div>
                              <div className="h-1.5 w-full bg-brand-bg-low dark:bg-dark-bg-low rounded-full mt-1.5 overflow-hidden">
                                <div
                                  className={`h-full rounded-full ${sub.progress === 100 ? 'bg-gradient-to-r from-brand-accent to-brand-accent-dim' : 'bg-gradient-to-r from-brand-primary to-brand-secondary'}`}
                                  style={{ width: `${sub.progress}%` }}
                                />
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>

                      <div className="flex gap-2 mt-5 pt-4 border-t border-black/5 dark:border-white/5">
                        <button
                          onClick={() => { alert(`Edit: ${asgn.title}`); setExpandedId(null); }}
                          className="flex-1 flex items-center justify-center gap-1.5 py-2.5 bg-brand-chip dark:bg-brand-secondary text-brand-primary dark:text-dark-primary rounded-lg font-bold text-xs hover:opacity-80 transition-opacity"
                        >
                          <span className="material-symbols-outlined text-[14px]">edit</span>
                          Edit
                        </button>
                        <button
                          onClick={() => { setDeleteConfirmId(asgn.id); setExpandedId(null); }}
                          className="flex-1 flex items-center justify-center gap-1.5 py-2.5 bg-red-100 dark:bg-red-900/20 text-error-red dark:text-red-300 rounded-lg font-bold text-xs hover:opacity-80 transition-opacity"
                        >
                          <span className="material-symbols-outlined text-[14px]">delete</span>
                          Delete
                        </button>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              )}
            </motion.div>
          ))}

          {role === 'admin' && (
            <motion.button
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: filteredAssignments.length * 0.07 }}
              onClick={() => setShowCreateModal(true)}
              className="group bg-brand-card dark:bg-dark-card rounded-xl p-6 border-2 border-dashed border-black/10 dark:border-white/10 hover:border-brand-accent dark:hover:border-brand-accent flex flex-col items-center justify-center min-h-[280px] text-center cursor-pointer transition-all duration-300"
            >
              <div className="w-14 h-14 rounded-full bg-brand-bg-low dark:bg-dark-bg-low text-brand-primary dark:text-dark-primary flex items-center justify-center mb-4 group-hover:scale-110 group-hover:bg-brand-accent group-hover:text-white dark:group-hover:bg-brand-accent transition-all duration-300">
                <span className="material-symbols-outlined text-[28px]">add</span>
              </div>
              <h3 className="font-headline text-base font-bold text-brand-text dark:text-dark-text mb-1">New Assignment</h3>
              <p className="text-brand-muted dark:text-dark-muted text-xs opacity-70">Click to create a new task</p>
            </motion.button>
          )}
        </div>
      )}

      {/* Delete Confirmation Modal */}
      <AnimatePresence>
        {deleteConfirmId && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-black/40 dark:bg-black/60 backdrop-blur-sm"
              onClick={() => setDeleteConfirmId(null)}
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.96 }}
              className="relative bg-brand-card dark:bg-dark-card rounded-xl p-8 max-w-sm w-full z-10 border border-black/5 dark:border-white/5 shadow-card-lg"
            >
              <div className="w-12 h-12 bg-red-100 dark:bg-red-900/20 rounded-xl flex items-center justify-center mb-4">
                <span className="material-symbols-outlined text-error-red dark:text-red-300 text-[22px]" style={{ fontVariationSettings: "'FILL' 1" }}>delete</span>
              </div>
              <h3 className="font-headline text-lg font-bold text-brand-text dark:text-dark-text mb-2">Delete Assignment?</h3>
              <p className="text-sm text-brand-muted dark:text-dark-muted mb-6 leading-relaxed">
                This will permanently remove the assignment and all student submissions. This cannot be undone.
              </p>
              <div className="flex gap-3">
                <button
                  onClick={() => handleDelete(deleteConfirmId)}
                  className="flex-1 py-3 bg-error-red text-white rounded-xl font-bold text-sm hover:opacity-90 transition-opacity"
                >
                  Yes, Delete
                </button>
                <button
                  onClick={() => setDeleteConfirmId(null)}
                  className="flex-1 py-3 bg-brand-bg-low dark:bg-dark-bg-low text-brand-text dark:text-dark-text rounded-xl font-bold text-sm hover:opacity-80 transition-opacity border border-black/5 dark:border-white/5"
                >
                  Cancel
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      <CreateAssignmentModal
        isOpen={showCreateModal}
        onClose={() => setShowCreateModal(false)}
        onCreate={handleCreate}
      />
    </div>
  );
};

export default AssignmentsPage;
