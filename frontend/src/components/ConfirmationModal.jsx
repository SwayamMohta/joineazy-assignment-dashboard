import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// ── ConfirmationModal: Floating dialog from The Curator design system ──────────
// Backdrop: on-surface (#181c1e) at 40% opacity + backdrop-blur-sm
// Modal: surface-container-lowest (white) rounded-xl p-8 — ambient shadow
// Icon container: secondary-container bg with primary icon (NOT indigo-100)
// Primary confirm: full gradient CTA rounded-xl
// Cancel: surface-container-high bg, primary text — no border (no-line rule)
// Alert footnote: Inter bold 10px uppercase tracking-widest, on-secondary-container

const ConfirmationModal = ({ isOpen, onClose, onConfirm, assignment }) => {
  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        {/* Backdrop: on-surface tint at 40% — premium depth */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="absolute inset-0 bg-[#181c1e]/40 dark:bg-black/60 backdrop-blur-sm"
          onClick={onClose}
        />

        {/* Modal Card */}
        <motion.div
          initial={{ opacity: 0, scale: 0.96, y: 12 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.96, y: 12 }}
          transition={{ duration: 0.2, ease: 'easeOut' }}
          className="relative bg-brand-card dark:bg-dark-sidebar w-full max-w-md rounded-xl p-10 shadow-card-lg dark:shadow-[0_0_64px_rgba(0,0,0,0.5)] z-10 overflow-hidden border border-brand-border dark:border-dark-border premium-depth"
        >
          {/* Subtle background decoration — Amber tint */}
          <div className="absolute top-0 right-0 w-48 h-48 bg-brand-accent/5 rounded-bl-full -mr-24 -mt-24 pointer-events-none transition-colors" />

          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute top-6 right-6 p-2 text-brand-muted hover:text-brand-primary dark:hover:text-dark-text rounded-lg transition-colors duration-200 active:scale-95"
          >
            <span className="material-symbols-outlined text-[20px]">close</span>
          </button>

          <div className="relative">
            {/* Icon: Soft luxury indicator */}
            <div className="w-16 h-16 bg-brand-bg-low dark:bg-white/5 text-brand-accent rounded-2xl flex items-center justify-center mb-8 shadow-sm">
              <span
                className="material-symbols-outlined text-[32px]"
                style={{ fontVariationSettings: "'FILL' 1, 'wght' 500" }}
              >
                verified
              </span>
            </div>

            {/* Headline */}
            <h2 className="font-headline text-2xl font-bold text-brand-primary dark:text-dark-text mb-3 tracking-tight">
              Review & Submit
            </h2>
            
            {/* Body */}
            <p className="text-brand-muted dark:text-dark-muted font-body mb-8 leading-relaxed">
              Confirming your submission for{' '}
              <span className="font-bold text-brand-primary dark:text-brand-accent-dim">"{assignment?.title}"</span>.{' '}
              Please ensure all project files are correctly linked in the Drive folder before proceeding.
            </p>

            {/* Actions */}
            <div className="flex flex-col gap-3">
              <button
                onClick={onConfirm}
                className="w-full btn-primary justify-center py-4 uppercase tracking-widest text-xs"
              >
                Confirm Final Submission
              </button>
              
              <button
                onClick={onClose}
                className="w-full py-4 bg-brand-bg-low dark:bg-white/5 text-brand-primary dark:text-dark-text rounded-lg font-bold text-xs uppercase tracking-widest font-body hover:bg-brand-bg dark:hover:bg-white/10 transition-colors duration-200 active:scale-[0.98]"
              >
                Check Files Again
              </button>
            </div>

            {/* Footnote */}
            <div className="mt-8 pt-6 border-t border-brand-border dark:border-dark-border flex items-center gap-2 text-[9px] font-bold text-brand-muted uppercase tracking-[0.2em] justify-center font-label opacity-70">
              <span className="material-symbols-outlined text-[13px]">info</span>
              <span>This will update your dashboard progress</span>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

export default ConfirmationModal;
