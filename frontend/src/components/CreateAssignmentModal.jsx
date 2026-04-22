import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// Modal for admin to create a new assignment

const SUBJECT_OPTIONS = [
  'Software Engineering', 'Deep Neural Networks', 'Usability Engineering',
  'Database Systems', 'Web Engineering', 'Distributed Systems',
  'Computer Networks', 'Operating Systems', 'Algorithms', 'Other',
];

const inputClass = 'w-full bg-brand-bg-low dark:bg-white/[0.03] focus:bg-brand-card dark:focus:bg-dark-card border border-brand-border dark:border-dark-border focus:border-brand-accent/30 dark:focus:border-brand-accent-dim/30 rounded-xl py-3 px-4 text-sm font-body text-brand-text dark:text-dark-text placeholder-brand-muted/40 outline-none transition-all duration-300';
const labelClass = 'text-[10px] font-bold uppercase tracking-[0.2em] text-brand-muted/70 dark:text-dark-muted font-label block mb-2';
const errorClass = 'text-[10px] text-error-red font-bold mt-1.5';

const CreateAssignmentModal = ({ isOpen, onClose, onCreate }) => {
  const [title, setTitle]           = useState('');
  const [subject, setSubject]       = useState(SUBJECT_OPTIONS[0]);
  const [description, setDescription] = useState('');
  const [deadline, setDeadline]     = useState('');
  const [driveLink, setDriveLink]   = useState('');
  const [subtasks, setSubtasks]     = useState(['']);
  const [errors, setErrors]         = useState({});

  const validate = () => {
    const errs = {};
    if (!title.trim())       errs.title       = 'Title is required';
    if (!description.trim()) errs.description = 'Description is required';
    if (!deadline)           errs.deadline    = 'Deadline is required';
    if (!driveLink.trim())   errs.driveLink   = 'Drive link is required';
    return errs;
  };

  const handleAddSubtask = () => setSubtasks([...subtasks, '']);
  const handleRemoveSubtask = (idx) => setSubtasks(subtasks.filter((_, i) => i !== idx));
  const handleSubtaskChange = (idx, val) => {
    const newSt = [...subtasks];
    newSt[idx] = val;
    setSubtasks(newSt);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length > 0) {
      setErrors(errs);
      return;
    }

    const finalSubtasks = subtasks
      .filter(st => st.trim() !== '')
      .map((st, i) => ({ id: `${Date.now()}-${i}`, title: st, completed: false }));

    onCreate({
      id: String(Date.now()),
      title,
      subject,
      description,
      deadline,
      driveLink,
      subtasks: finalSubtasks,
      status: 'pending',
      progress: 0,
      submissions: [
        { studentId: 's1', studentName: 'Arjun Singh',  submitted: false, progress: 0 },
        { studentId: 's3', studentName: 'Rohan Gupta',   submitted: false, progress: 0 },
      ],
      feedback: null,
      grade: null,
    });
    // reset form
    setTitle(''); setSubject(SUBJECT_OPTIONS[0]);
    setDescription(''); setDeadline(''); setDriveLink('');
    setSubtasks(['']);
    setErrors({});
    onClose();
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
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
          animate={{ opacity: 1, scale: 1,    y: 0  }}
          exit={{   opacity: 0, scale: 0.96, y: 12 }}
          transition={{ duration: 0.2, ease: 'easeOut' }}
          className="relative bg-brand-card dark:bg-dark-sidebar w-full max-w-lg rounded-xl p-10 z-10 overflow-y-auto max-h-[90vh] border border-brand-border dark:border-dark-border shadow-card-lg premium-depth"
        >
          {/* Subtle decoration */}
          <div className="absolute top-0 right-0 w-48 h-48 bg-brand-accent/5 rounded-bl-full -mr-24 -mt-24 pointer-events-none transition-colors" />

          <button onClick={onClose} className="absolute top-6 right-6 p-2 text-brand-muted hover:text-brand-primary dark:hover:text-dark-text transition-colors">
            <span className="material-symbols-outlined text-[20px]">close</span>
          </button>

          <header className="mb-8">
            <div className="w-14 h-14 bg-brand-bg-low dark:bg-white/5 rounded-xl flex items-center justify-center mb-5 text-brand-accent shadow-sm">
              <span className="material-symbols-outlined text-[24px]" style={{ fontVariationSettings: "'FILL' 0" }}>edit_calendar</span>
            </div>
            <h2 className="font-headline text-2xl font-bold text-brand-primary dark:text-dark-text tracking-tight">Create Assignment</h2>
            <p className="text-sm text-brand-muted dark:text-dark-muted mt-2">Publish a new task to your academic workspace.</p>
          </header>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* title */}
            <div>
              <label className={labelClass}>Assignment Title <span className="text-error-red">*</span></label>
              <input
                type="text"
                value={title}
                onChange={e => { setTitle(e.target.value); setErrors(prev => ({ ...prev, title: '' })); }}
                placeholder="e.g. Distributed Systems Final Project"
                className={`${inputClass} ${errors.title ? 'border-error-red/40' : ''}`}
              />
              {errors.title && <p className={errorClass}>{errors.title}</p>}
            </div>

            <div className="grid grid-cols-2 gap-4">
              {/* subject dropdown */}
              <div>
                <label className={labelClass}>Category <span className="text-error-red">*</span></label>
                <select
                  value={subject}
                  onChange={e => setSubject(e.target.value)}
                  className={`${inputClass} appearance-none cursor-pointer`}
                >
                  {SUBJECT_OPTIONS.map(s => <option key={s} className="dark:bg-dark-sidebar">{s}</option>)}
                </select>
              </div>

              {/* deadline */}
              <div>
                <label className={labelClass}>Deadline <span className="text-error-red">*</span></label>
                <input
                  type="date"
                  value={deadline}
                  onChange={e => { setDeadline(e.target.value); setErrors(prev => ({ ...prev, deadline: '' })); }}
                  className={`${inputClass} ${errors.deadline ? 'border-error-red/40' : ''}`}
                />
                {errors.deadline && <p className={errorClass}>{errors.deadline}</p>}
              </div>
            </div>

            {/* description */}
            <div>
              <label className={labelClass}>Brief Overview <span className="text-error-red">*</span></label>
              <textarea
                value={description}
                onChange={e => { setDescription(e.target.value); setErrors(prev => ({ ...prev, description: '' })); }}
                placeholder="Core objectives and requirements..."
                rows={3}
                className={`${inputClass} resize-none ${errors.description ? 'border-error-red/40' : ''}`}
              />
              {errors.description && <p className={errorClass}>{errors.description}</p>}
            </div>

            {/* milestones / subtasks */}
            <div>
              <div className="flex justify-between items-center mb-3">
                <label className={labelClass}>Project Milestones</label>
                <button 
                  type="button" 
                  onClick={handleAddSubtask}
                  className="text-[10px] font-bold text-brand-accent uppercase tracking-widest font-label flex items-center gap-1 hover:opacity-70 transition-opacity"
                >
                  <span className="material-symbols-outlined text-[14px]">add</span>
                  Add Milestone
                </button>
              </div>
              <div className="space-y-3">
                {subtasks.map((st, i) => (
                  <div key={i} className="flex gap-2">
                    <input
                      type="text"
                      value={st}
                      onChange={e => handleSubtaskChange(i, e.target.value)}
                      placeholder={`Step ${i+1}`}
                      className={inputClass}
                    />
                    {subtasks.length > 1 && (
                      <button 
                        type="button" 
                        onClick={() => handleRemoveSubtask(i)}
                        className="w-11 h-11 bg-red-50 dark:bg-red-500/10 text-error-red rounded-xl flex items-center justify-center flex-shrink-0 hover:bg-red-100 transition-colors"
                      >
                        <span className="material-symbols-outlined text-[18px]">delete</span>
                      </button>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* drive link */}
            <div className="pt-2">
              <label className={labelClass}>Resource Assets (Drive) <span className="text-error-red">*</span></label>
              <input
                type="text"
                value={driveLink}
                onChange={e => { setDriveLink(e.target.value); setErrors(prev => ({ ...prev, driveLink: '' })); }}
                placeholder="Google Drive link..."
                className={`${inputClass} ${errors.driveLink ? 'border-error-red/40' : ''}`}
              />
              {errors.driveLink && <p className={errorClass}>{errors.driveLink}</p>}
            </div>

            <div className="flex gap-4 pt-6">
              <button type="submit" className="btn-primary flex-1 justify-center py-4 uppercase tracking-widest text-xs">
                Create & Publish
              </button>
              <button type="button" onClick={onClose} className="flex-1 py-4 bg-brand-bg-low dark:bg-white/5 text-brand-primary dark:text-dark-text rounded-xl font-bold text-xs uppercase tracking-widest hover:bg-brand-bg transition-colors">
                Cancel
              </button>
            </div>
          </form>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

export default CreateAssignmentModal;
