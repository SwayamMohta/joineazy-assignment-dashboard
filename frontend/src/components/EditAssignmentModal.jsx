import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const SUBJECT_OPTIONS = [
  'Software Engineering', 'Deep Neural Networks', 'Usability Engineering',
  'Database Systems', 'Web Engineering', 'Distributed Systems',
  'Computer Networks', 'Operating Systems', 'Algorithms', 'Other',
];

const inputClass = 'w-full bg-brand-bg-low dark:bg-white/[0.03] focus:bg-brand-card dark:focus:bg-dark-card border border-brand-border dark:border-dark-border focus:border-brand-accent/30 dark:focus:border-brand-accent-dim/30 rounded-xl py-3 px-4 text-sm font-body text-brand-text dark:text-dark-text placeholder-brand-muted/40 outline-none transition-all duration-300';
const labelClass = 'text-[10px] font-bold uppercase tracking-[0.2em] text-brand-muted/70 dark:text-dark-muted font-label block mb-2';
const errorClass = 'text-[10px] text-error-red font-bold mt-1.5';

const EditAssignmentModal = ({ isOpen, onClose, onSave, assignment }) => {
  const [title, setTitle]           = useState('');
  const [subject, setSubject]       = useState(SUBJECT_OPTIONS[0]);
  const [description, setDescription] = useState('');
  const [deadline, setDeadline]     = useState('');
  const [driveLink, setDriveLink]   = useState('');
  const [type, setType]             = useState('individual');
  const [errors, setErrors]         = useState({});

  useEffect(() => {
    if (assignment) {
      setTitle(assignment.title || '');
      setSubject(assignment.subject || SUBJECT_OPTIONS[0]);
      setDescription(assignment.description || '');
      setDeadline(assignment.deadline || '');
      setDriveLink(assignment.driveLink || '');
      setType(assignment.type || 'individual');
    }
  }, [assignment, isOpen]);

  const validate = () => {
    const errs = {};
    if (!title.trim())       errs.title       = 'Title is required';
    if (!description.trim()) errs.description = 'Description is required';
    if (!deadline)           errs.deadline    = 'Deadline is required';
    if (!driveLink.trim())   errs.driveLink   = 'Drive link is required';
    return errs;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length > 0) {
      setErrors(errs);
      return;
    }

    onSave({
      ...assignment,
      title,
      subject,
      description,
      deadline,
      driveLink,
      type
    });
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
          className="relative bg-brand-card dark:bg-dark-sidebar w-full max-w-lg rounded-xl p-10 z-10 overflow-y-auto max-h-[90vh] border border-brand-border dark:border-dark-border shadow-card-lg premium-depth"
        >
          <button onClick={onClose} className="absolute top-6 right-6 p-2 text-brand-muted hover:text-brand-primary dark:hover:text-dark-text transition-colors">
            <span className="material-symbols-outlined text-[20px]">close</span>
          </button>

          <header className="mb-8">
            <h2 className="font-headline text-2xl font-bold text-brand-primary dark:text-dark-text tracking-tight">Edit Assignment</h2>
            <p className="text-sm text-brand-muted dark:text-dark-muted mt-2">Modify existing assignment details.</p>
          </header>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className={labelClass}>Assignment Title</label>
              <input
                type="text"
                value={title}
                onChange={e => setTitle(e.target.value)}
                className={inputClass}
              />
              {errors.title && <p className={errorClass}>{errors.title}</p>}
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className={labelClass}>Category</label>
                <select
                  value={subject}
                  onChange={e => setSubject(e.target.value)}
                  className={inputClass}
                >
                  {SUBJECT_OPTIONS.map(s => <option key={s}>{s}</option>)}
                </select>
              </div>

              <div>
                <label className={labelClass}>Deadline</label>
                <input
                  type="date"
                  value={deadline}
                  onChange={e => setDeadline(e.target.value)}
                  className={inputClass}
                />
                {errors.deadline && <p className={errorClass}>{errors.deadline}</p>}
              </div>
            </div>

            <div>
              <label className={labelClass}>Submission Type</label>
              <div className="flex gap-4">
                {['individual', 'group'].map(t => (
                  <button
                    key={t}
                    type="button"
                    onClick={() => setType(t)}
                    className={`flex-1 py-2.5 rounded-lg text-xs font-bold uppercase tracking-widest border transition-all ${
                      type === t 
                        ? 'bg-brand-primary text-white border-brand-primary' 
                        : 'bg-transparent border-brand-border text-brand-muted hover:border-brand-primary/50'
                    }`}
                  >
                    {t}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className={labelClass}>Description</label>
              <textarea
                value={description}
                onChange={e => setDescription(e.target.value)}
                rows={3}
                className={`${inputClass} resize-none`}
              />
              {errors.description && <p className={errorClass}>{errors.description}</p>}
            </div>

            <div>
              <label className={labelClass}>OneDrive / Resource Link</label>
              <input
                type="text"
                value={driveLink}
                onChange={e => setDriveLink(e.target.value)}
                className={inputClass}
              />
              {errors.driveLink && <p className={errorClass}>{errors.driveLink}</p>}
            </div>

            <div className="flex gap-4 pt-6">
              <button type="submit" className="btn-primary flex-1 justify-center py-4 uppercase tracking-widest text-xs">
                Save Changes
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

export default EditAssignmentModal;
