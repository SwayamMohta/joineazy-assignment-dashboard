import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// Modal for admin to create a new assignment

const SUBJECT_OPTIONS = [
  'Software Engineering', 'Deep Neural Networks', 'Usability Engineering',
  'Database Systems', 'Web Engineering', 'Distributed Systems',
  'Computer Networks', 'Operating Systems', 'Algorithms', 'Other',
];

const inputClass = 'w-full bg-[#ebeef0] dark:bg-[#002045] focus:bg-white dark:focus:bg-[#001c3d] border border-transparent focus:border-[#002045]/20 dark:focus:border-white/10 rounded-xl py-3 px-4 text-sm font-body text-[#181c1e] dark:text-white placeholder-[#586377]/50 outline-none transition-all duration-300';
const labelClass = 'text-[10px] font-bold uppercase tracking-widest text-[#586377] dark:text-[#86a0cd] font-label block mb-1.5';
const errorClass = 'text-[10px] text-[#ba1a1a] dark:text-[#ffb4ab] font-bold mt-1';

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
        { studentId: 's2', studentName: 'Ananya Sharma',    submitted: false, progress: 0 },
        { studentId: 's3', studentName: 'Rohan Gupta',   submitted: false, progress: 0 },
        { studentId: 's4', studentName: 'Priya Sharma',  submitted: false, progress: 0 },
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
          className="absolute inset-0 bg-[#181c1e]/40 dark:bg-black/60 backdrop-blur-sm" 
          onClick={onClose}
        />
        <motion.div
          initial={{ opacity: 0, scale: 0.96, y: 12 }}
          animate={{ opacity: 1, scale: 1,    y: 0  }}
          exit={{   opacity: 0, scale: 0.96, y: 12 }}
          transition={{ duration: 0.2, ease: 'easeOut' }}
          className="relative bg-[#ffffff] dark:bg-[#1a365d] w-full max-w-lg rounded-xl p-8 z-10 overflow-y-auto max-h-[90vh] border border-[#c4c6cf]/15 dark:border-white/5 shadow-2xl"
        >
          <button onClick={onClose} className="absolute top-4 right-4 p-2 text-[#586377] dark:text-[#86a0cd] hover:bg-[#ebeef0] dark:hover:bg-white/10 rounded-xl transition-colors">
            <span className="material-symbols-outlined text-[18px]">close</span>
          </button>

          <div className="w-12 h-12 bg-[#d5e0f7] dark:bg-[#002045] rounded-xl flex items-center justify-center mb-5">
            <span className="material-symbols-outlined text-[22px] text-[#002045] dark:text-[#d5e0f7]" style={{ fontVariationSettings: "'FILL' 1" }}>add_task</span>
          </div>
          <h2 className="font-headline text-xl font-extrabold text-[#002045] dark:text-white mb-1 tracking-tight">Create New Assignment</h2>
          <p className="text-sm text-[#586377] dark:text-[#86a0cd] mb-6">Fill in the details below. All students will be enrolled automatically.</p>

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* title */}
            <div>
              <label className={labelClass}>Assignment Title <span className="text-[#ba1a1a] dark:text-[#ffb4ab]">*</span></label>
              <input
                type="text"
                value={title}
                onChange={e => { setTitle(e.target.value); setErrors(prev => ({ ...prev, title: '' })); }}
                placeholder="e.g. System Design: Uber Clone"
                className={`${inputClass} ${errors.title ? 'ring-2 ring-[#ba1a1a]/50 dark:ring-[#ffb4ab]/40' : ''}`}
              />
              {errors.title && <p className={errorClass}>{errors.title}</p>}
            </div>

            <div className="grid grid-cols-2 gap-4">
              {/* subject dropdown */}
              <div>
                <label className={labelClass}>Subject <span className="text-[#ba1a1a] dark:text-[#ffb4ab]">*</span></label>
                <select
                  value={subject}
                  onChange={e => setSubject(e.target.value)}
                  className={`${inputClass} appearance-none cursor-pointer`}
                >
                  {SUBJECT_OPTIONS.map(s => <option key={s} className="dark:bg-[#001c3d]">{s}</option>)}
                </select>
              </div>

              {/* deadline */}
              <div>
                <label className={labelClass}>Deadline <span className="text-[#ba1a1a] dark:text-[#ffb4ab]">*</span></label>
                <input
                  type="date"
                  value={deadline}
                  onChange={e => { setDeadline(e.target.value); setErrors(prev => ({ ...prev, deadline: '' })); }}
                  className={`${inputClass} ${errors.deadline ? 'ring-2 ring-[#ba1a1a]/50 dark:ring-[#ffb4ab]/40' : ''}`}
                />
                {errors.deadline && <p className={errorClass}>{errors.deadline}</p>}
              </div>
            </div>

            {/* description */}
            <div>
              <label className={labelClass}>Description <span className="text-[#ba1a1a] dark:text-[#ffb4ab]">*</span></label>
              <textarea
                value={description}
                onChange={e => { setDescription(e.target.value); setErrors(prev => ({ ...prev, description: '' })); }}
                placeholder="Describe the assignment objectives..."
                rows={2}
                className={`${inputClass} resize-none ${errors.description ? 'ring-2 ring-[#ba1a1a]/50 dark:ring-[#ffb4ab]/40' : ''}`}
              />
              {errors.description && <p className={errorClass}>{errors.description}</p>}
            </div>

            {/* milestones / subtasks */}
            <div>
              <div className="flex justify-between items-center mb-1.5">
                <label className={labelClass}>Milestones / Sub-tasks</label>
                <button 
                  type="button" 
                  onClick={handleAddSubtask}
                  className="text-[10px] font-bold text-[#002045] dark:text-[#4edea3] uppercase tracking-widest font-label flex items-center gap-1 hover:opacity-70 transition-opacity"
                >
                  <span className="material-symbols-outlined text-[12px]">add</span>
                  Add Milestone
                </button>
              </div>
              <div className="space-y-2">
                {subtasks.map((st, i) => (
                  <div key={i} className="flex gap-2">
                    <input
                      type="text"
                      value={st}
                      onChange={e => handleSubtaskChange(i, e.target.value)}
                      placeholder={`Task ${i+1}`}
                      className={inputClass}
                    />
                    {subtasks.length > 1 && (
                      <button 
                        type="button" 
                        onClick={() => handleRemoveSubtask(i)}
                        className="w-11 h-11 bg-[#ffdad6] dark:bg-[#ba1a1a]/20 text-[#93000a] dark:text-[#ffdad6] rounded-xl flex items-center justify-center flex-shrink-0 hover:bg-[#f9b4af] dark:hover:bg-[#ba1a1a]/40 transition-colors"
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
              <label className={labelClass}>Google Drive Link <span className="text-[#ba1a1a] dark:text-[#ffb4ab]">*</span></label>
              <input
                type="text"
                value={driveLink}
                onChange={e => { setDriveLink(e.target.value); setErrors(prev => ({ ...prev, driveLink: '' })); }}
                placeholder="https://drive.google.com/..."
                className={`${inputClass} ${errors.driveLink ? 'ring-2 ring-[#ba1a1a]/50 dark:ring-[#ffb4ab]/40' : ''}`}
              />
              {errors.driveLink && <p className={errorClass}>{errors.driveLink}</p>}
            </div>

            <div className="flex gap-3 pt-4">
              <button type="submit" className="btn-primary-gradient flex-1 py-3.5 text-sm shadow-lg">
                Create Assignment
              </button>
              <button type="button" onClick={onClose} className="flex-1 py-3.5 bg-[#ebeef0] dark:bg-[#002045] text-[#002045] dark:text-[#d5e0f7] rounded-xl font-bold text-sm hover:bg-[#e0e3e5] dark:hover:bg-white/10 transition-colors">
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
