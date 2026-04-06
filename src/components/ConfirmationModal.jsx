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
          className="relative bg-[#ffffff] dark:bg-[#1a365d] w-full max-w-md rounded-xl p-8 shadow-[0px_12px_32px_rgba(24,28,30,0.10)] dark:shadow-none z-10 overflow-hidden border border-[#c4c6cf]/15 dark:border-white/5"
        >
          {/* Subtle background decoration — secondary-container tint */}
          <div className="absolute top-0 right-0 w-40 h-40 bg-[#d5e0f7] dark:bg-[#002045] rounded-bl-full -mr-20 -mt-20 opacity-30 pointer-events-none transition-colors" />

          {/* Close button: rounded-xl, hover surface-container */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 text-[#586377] dark:text-[#86a0cd] hover:bg-[#ebeef0] dark:hover:bg-white/10 rounded-xl transition-colors duration-200 active:scale-95"
          >
            <span className="material-symbols-outlined text-[18px]">close</span>
          </button>

          <div className="relative">
            {/* Icon: secondary-container bg + primary icon = a soft academic look */}
            <div className="w-14 h-14 bg-[#d5e0f7] dark:bg-[#002045] text-[#002045] dark:text-[#4edea3] rounded-xl flex items-center justify-center mb-6 shadow-sm">
              <span
                className="material-symbols-outlined text-[28px]"
                style={{ fontVariationSettings: "'FILL' 1, 'wght' 600" }}
              >
                check_circle
              </span>
            </div>

            {/* Headline: Manrope extrabold, tracking-tight, primary */}
            <h2 className="font-headline text-[1.5rem] font-extrabold text-[#002045] dark:text-white mb-2 tracking-tight">
              Confirm Submission
            </h2>
            {/* Body: Inter regular, on-secondary-container */}
            <p className="text-[#586377] dark:text-[#86a0cd] font-body mb-7 leading-relaxed font-medium">
              You are about to submit{' '}
              <span className="font-bold text-[#002045] dark:text-[#d5e0f7]">"{assignment?.title}"</span>.{' '}
              Please confirm you have uploaded your final documents to the Google Drive link.
            </p>

            {/* Actions: vertical stack, 8px gap (ribbon list style) */}
            <div className="flex flex-col gap-3">
              {/* Primary: gradient CTA — signature pattern from design system */}
              <button
                onClick={onConfirm}
                className="w-full py-4 btn-primary-gradient text-sm tracking-wide shadow-lg"
              >
                Yes, I have submitted
              </button>
              {/* Tertiary cancel: surface-container-high bg, no border */}
              <button
                onClick={onClose}
                className="w-full py-4 bg-[#ebeef0] dark:bg-[#002045] text-[#002045] dark:text-[#d5e0f7] rounded-xl font-bold text-sm font-body hover:bg-[#e5e9eb] dark:hover:bg-white/10 transition-colors duration-200 active:scale-[0.98]"
              >
                Go back and check
              </button>
            </div>

            {/* Footnote alert — Inter label style, ghost presence */}
            <div className="mt-6 flex items-center gap-2 text-[10px] font-bold text-[#586377] dark:text-[#86a0cd] uppercase tracking-widest justify-center font-label">
              <span className="material-symbols-outlined text-[13px]">info</span>
              <span>This action will update your progress to 100%</span>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

export default ConfirmationModal;
