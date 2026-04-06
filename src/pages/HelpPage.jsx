import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FAQ_ITEMS } from '../data/mockData';

// ── HelpPage: FAQ accordion, guides, contact support ─────────────────────────

const STEPS = [
  { icon: 'login',         title: 'Sign In',         desc: 'Access JoinEazy using your university credentials.' },
  { icon: 'assignment',    title: 'Find Assignment',  desc: 'Browse the Assignments tab to see all active tasks.' },
  { icon: 'upload_file',   title: 'Upload Work',      desc: 'Upload files to the provided Google Drive link.' },
  { icon: 'task_alt',      title: 'Mark Submitted',   desc: 'Click "Mark as Submitted" and confirm in the dialog.' },
  { icon: 'rate_review',   title: 'Await Feedback',   desc: 'Check the Reviews tab for instructor feedback and grades.' },
];

const HelpPage = () => {
  const [openFaq, setOpenFaq]     = useState(null);
  const [searchHelp, setSearchHelp] = useState('');
  const [messageSent, setMessageSent] = useState(false);
  const [contactMsg, setContactMsg]   = useState('');

  const filteredFaq = FAQ_ITEMS.filter(
    f => !searchHelp ||
      f.q.toLowerCase().includes(searchHelp.toLowerCase()) ||
      f.a.toLowerCase().includes(searchHelp.toLowerCase())
  );

  return (
    <div className="space-y-10 max-w-3xl">
      {/* Header */}
      <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}>
        <span className="text-[10px] font-bold uppercase tracking-widest text-[#586377] dark:text-[#86a0cd] font-label">Support Center</span>
        <h1 className="font-headline text-4xl font-extrabold tracking-tight text-[#002045] dark:text-white mt-1">Help & Support</h1>
        <p className="text-[#586377] dark:text-[#86a0cd] font-body font-medium mt-1.5">
          Find answers, learn the workflow, or reach out to our support team.
        </p>
      </motion.div>

      {/* Search */}
      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.07 }} className="relative">
        <span className="absolute left-4 top-1/2 -translate-y-1/2 material-symbols-outlined text-[18px] text-[#586377] dark:text-[#86a0cd]">search</span>
        <input
          type="text"
          value={searchHelp}
          onChange={e => setSearchHelp(e.target.value)}
          placeholder="Search help articles..."
          className="w-full bg-[#ffffff] dark:bg-[#1a365d] rounded-xl py-4 pl-11 pr-4 text-sm font-body text-[#181c1e] dark:text-white placeholder-[#586377]/60 border border-[#c4c6cf]/15 dark:border-white/5 outline-none transition-all duration-300 focus:shadow-[0_0_0_2px_rgba(0,180,125,0.15)]"
          style={{ boxShadow: '0px 4px 20px rgba(24,28,30,0.04)' }}
        />
      </motion.div>

      {/* Submission Workflow Guide */}
      {!searchHelp && (
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.12 }}>
          <h2 className="font-headline text-xl font-bold text-[#002045] dark:text-white mb-5">Submission Workflow</h2>
          <div className="grid grid-cols-1 sm:grid-cols-5 gap-4">
            {STEPS.map((step, idx) => (
              <div key={idx} className="bg-[#ffffff] dark:bg-[#1a365d] rounded-xl p-5 text-center relative border border-[#c4c6cf]/15 dark:border-white/5 hover:shadow-[0px_12px_32px_rgba(24,28,30,0.06)] dark:hover:shadow-none transition-all duration-300">
                {idx < STEPS.length - 1 && (
                  <div className="hidden sm:block absolute top-1/2 -right-2 w-4 h-0.5 bg-[#d5e0f7] dark:bg-[#002045] z-10" />
                )}
                <div className="w-10 h-10 bg-[#d5e0f7] dark:bg-[#002045] rounded-xl flex items-center justify-center mx-auto mb-3">
                  <span className="material-symbols-outlined text-[18px] text-[#002045] dark:text-[#d5e0f7]" style={{ fontVariationSettings: "'FILL' 1" }}>
                    {step.icon}
                  </span>
                </div>
                <span className="text-[10px] font-bold text-[#586377] dark:text-[#86a0cd] uppercase tracking-widest font-label">Step {idx + 1}</span>
                <p className="font-headline text-sm font-bold text-[#002045] dark:text-[#d5e0f7] mt-0.5">{step.title}</p>
                <p className="text-[11px] text-[#586377] dark:text-[#86a0cd] mt-1 leading-relaxed">{step.desc}</p>
              </div>
            ))}
          </div>
        </motion.div>
      )}

      {/* FAQ Accordion */}
      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.17 }}>
        <h2 className="font-headline text-xl font-bold text-[#002045] dark:text-white mb-5">
          {searchHelp ? `Results for "${searchHelp}"` : 'Frequently Asked Questions'}
        </h2>

        {filteredFaq.length === 0 ? (
          <div className="bg-[#ffffff] dark:bg-[#1a365d] rounded-xl p-12 text-center border border-[#c4c6cf]/15 dark:border-white/5 transition-colors">
            <span className="material-symbols-outlined text-[32px] text-[#586377] dark:text-[#86a0cd] mb-3 block">search_off</span>
            <p className="font-headline font-bold text-[#002045] dark:text-white">No articles found</p>
            <p className="text-sm text-[#586377] dark:text-[#86a0cd] mt-1">Try a different search term.</p>
          </div>
        ) : (
          <div className="space-y-2">
            {filteredFaq.map((item, idx) => (
              <div key={idx} className="bg-[#ffffff] dark:bg-[#1a365d] rounded-xl overflow-hidden border border-[#c4c6cf]/15 dark:border-white/5 hover:shadow-[0px_4px_20px_rgba(24,28,30,0.04)] dark:hover:shadow-none transition-all duration-200">
                <button
                  onClick={() => setOpenFaq(openFaq === idx ? null : idx)}
                  className="w-full flex items-center justify-between px-6 py-4 text-left group"
                >
                  <span className="font-body font-bold text-sm text-[#002045] dark:text-[#d5e0f7] pr-4 group-hover:text-[#00b47d] transition-colors">{item.q}</span>
                  <span className="material-symbols-outlined text-[18px] text-[#586377] dark:text-[#86a0cd] flex-shrink-0 transition-transform duration-200" style={{ transform: openFaq === idx ? 'rotate(180deg)' : 'rotate(0deg)' }}>
                    expand_more
                  </span>
                </button>
                <AnimatePresence>
                  {openFaq === idx && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.2, ease: 'easeOut' }}
                      className="overflow-hidden"
                    >
                      <p className="px-6 pb-5 text-sm text-[#586377] dark:text-[#86a0cd] leading-relaxed border-t border-[#c4c6cf]/15 dark:border-white/5 pt-4 transition-colors">
                        {item.a}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </div>
        )}
      </motion.div>

      {/* Contact Support */}
      {!searchHelp && (
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.22 }}>
          <div className="bg-[#ffffff] dark:bg-[#1a365d] rounded-xl p-8 border border-[#c4c6cf]/15 dark:border-white/5 transition-colors">
            <div className="flex items-start gap-4 mb-6">
              <div className="w-12 h-12 bg-[#d5e0f7] dark:bg-[#002045] rounded-xl flex items-center justify-center flex-shrink-0">
                <span className="material-symbols-outlined text-[22px] text-[#002045] dark:text-[#d5e0f7]" style={{ fontVariationSettings: "'FILL' 1" }}>support_agent</span>
              </div>
              <div>
                <h2 className="font-headline text-lg font-bold text-[#002045] dark:text-white">Contact Support</h2>
                <p className="text-sm text-[#586377] dark:text-[#86a0cd] mt-0.5">Can't find what you're looking for? Our team responds within 24 hours.</p>
              </div>
            </div>
            {messageSent ? (
              <div className="flex items-center gap-3 bg-[#4edea3]/20 text-[#00b47d] px-5 py-4 rounded-xl border border-[#00b47d]/20">
                <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>check_circle</span>
                <p className="font-bold text-sm">Message sent! We'll get back to you within 24 hours.</p>
              </div>
            ) : (
              <div className="space-y-4">
                <textarea
                  value={contactMsg}
                  onChange={e => setContactMsg(e.target.value)}
                  rows={4}
                  placeholder="Describe your issue or question in detail..."
                  className="w-full bg-[#ebeef0] dark:bg-[#002045] focus:bg-white dark:focus:bg-[#001730] rounded-xl py-3 px-4 text-sm font-body text-[#181c1e] dark:text-white placeholder-[#586377]/50 border border-transparent focus:border-[#002045]/20 dark:focus:border-white/10 outline-none transition-all duration-300 resize-none shadow-inner"
                />
                <button
                  onClick={() => { if (contactMsg.trim()) { setMessageSent(true); setContactMsg(''); } }}
                  disabled={!contactMsg.trim()}
                  className="btn-primary-gradient px-8 py-3 text-sm disabled:opacity-40 disabled:cursor-not-allowed disabled:transform-none disabled:shadow-none"
                >
                  Send Message
                </button>
              </div>
            )}
          </div>
        </motion.div>
      )}

      {/* Quick links */}
      {!searchHelp && (
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.27 }}>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {[
              { icon: 'book',         title: 'Documentation',   desc: 'Full feature guides and references' },
              { icon: 'video_library', title: 'Video Tutorials', desc: 'Step-by-step walkthrough videos' },
              { icon: 'forum',        title: 'Community Forum', desc: 'Ask questions, share insights' },
            ].map((link, idx) => (
              <button
                key={idx}
                className="bg-[#ffffff] dark:bg-[#1a365d] rounded-xl p-5 text-left flex items-start gap-4 border border-[#c4c6cf]/15 dark:border-white/5 hover:shadow-[0px_12px_32px_rgba(24,28,30,0.06)] dark:hover:shadow-none hover:bg-[#f7fafc] dark:hover:bg-[#d5e0f7]/5 transition-all duration-200 group"
              >
                <div className="w-10 h-10 bg-[#ebeef0] dark:bg-[#002045] group-hover:bg-[#d5e0f7] dark:group-hover:bg-[#00b47d] rounded-lg flex items-center justify-center flex-shrink-0 transition-colors duration-200">
                  <span className="material-symbols-outlined text-[18px] text-[#002045] dark:text-[#d5e0f7] group-hover:text-[#002045] dark:group-hover:text-white">{link.icon}</span>
                </div>
                <div>
                  <p className="font-body font-bold text-sm text-[#002045] dark:text-[#d5e0f7] group-hover:text-[#00b47d] transition-colors">{link.title}</p>
                  <p className="text-[11px] text-[#586377] dark:text-[#86a0cd] mt-0.5">{link.desc}</p>
                </div>
              </button>
            ))}
          </div>
        </motion.div>
      )}
    </div>
  );
};

export default HelpPage;
