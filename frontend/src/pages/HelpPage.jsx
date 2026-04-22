import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FAQ_ITEMS } from '../data/mockData';

// ── HelpPage: FAQ accordion, guides, contact support ─────────────────────────

const STEPS = [
  { icon: 'login', title: 'Authentication', desc: 'Secure access via your university credentials.' },
  { icon: 'account_tree', title: 'Find Module', desc: 'Navigate to assignments to view your current tasks.' },
  { icon: 'cloud_upload', title: 'Upload Work', desc: 'Upload your local work to the designated OneDrive folder.' },
  { icon: 'task_alt', title: 'Submit Task', desc: 'Confirm submission status to finalize your module record.' },
  { icon: 'verified', title: 'View Feedback', desc: 'Check finalized feedback and performance grades.' },
];

const HelpPage = () => {
  const [openFaq, setOpenFaq] = useState(null);
  const [searchHelp, setSearchHelp] = useState('');
  const [messageSent, setMessageSent] = useState(false);
  const [contactMsg, setContactMsg] = useState('');

  const filteredFaq = FAQ_ITEMS.filter(
    f => !searchHelp ||
      f.q.toLowerCase().includes(searchHelp.toLowerCase()) ||
      f.a.toLowerCase().includes(searchHelp.toLowerCase())
  );

  return (
    <div className="space-y-12 max-w-4xl pb-12">
      {/* Header */}
      <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}>
        <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-brand-muted/70 dark:text-dark-muted font-label">Support & Resources</span>
        <h1 className="font-headline text-4xl font-bold tracking-tight text-brand-primary dark:text-dark-text mt-2">Help Center</h1>
        <p className="text-brand-muted dark:text-dark-muted font-body mt-2">
          Guides, frequently asked questions, and direct support.
        </p>
      </motion.div>

      {/* Global Search */}
      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.07 }} className="relative group">
        <span className="absolute left-5 top-1/2 -translate-y-1/2 material-symbols-outlined text-[20px] text-brand-muted group-focus-within:text-brand-accent transition-colors">search</span>
        <input
          type="text"
          value={searchHelp}
          onChange={e => setSearchHelp(e.target.value)}
          placeholder="Search the help center..."
          className="w-full bg-brand-card dark:bg-dark-sidebar rounded-2xl py-5 pl-14 pr-6 text-[15px] font-body text-brand-primary dark:text-dark-text placeholder-brand-muted/50 border border-brand-border dark:border-dark-border outline-none transition-all duration-300 focus:shadow-card-lg focus:border-brand-accent/30 premium-depth"
        />
        <div className="absolute right-5 top-1/2 -translate-y-1/2 text-[10px] font-bold text-brand-muted/30 uppercase tracking-widest font-label pointer-events-none">
          SEARCH
        </div>
      </motion.div>

      {/* Submission Workflow Guide */}
      {!searchHelp && (
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.12 }}>
          <div className="mb-8">
            <h2 className="font-headline text-xl font-bold text-brand-primary dark:text-dark-text tracking-tight">Submission Guide</h2>
            <p className="text-[10px] font-bold text-brand-muted/50 uppercase tracking-widest font-label mt-1">Step-by-step process</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-5 gap-4">
            {STEPS.map((step, idx) => (
              <div key={idx} className="bg-brand-card dark:bg-dark-sidebar rounded-2xl p-6 text-center relative border border-brand-border dark:border-dark-border hover:shadow-card-sm transition-all duration-300 group">
                {idx < STEPS.length - 1 && (
                  <div className="hidden sm:block absolute top-1/2 -right-2.5 w-5 h-[1px] bg-brand-border dark:bg-dark-border z-10 opacity-50" />
                )}
                <div className="w-12 h-12 bg-brand-bg-low dark:bg-white/5 rounded-2xl flex items-center justify-center mx-auto mb-4 text-brand-muted group-hover:text-brand-accent transition-colors shadow-sm">
                  <span className="material-symbols-outlined text-[20px]" style={{ fontVariationSettings: "'FILL' 0" }}>
                    {step.icon}
                  </span>
                </div>
                <span className="text-[9px] font-bold text-brand-muted/40 uppercase tracking-[0.2em] font-label">0{idx + 1}</span>
                <p className="font-headline text-[13px] font-bold text-brand-primary dark:text-dark-text mt-2 leading-none">{step.title}</p>
                <p className="text-[10px] text-brand-muted dark:text-dark-muted mt-3 leading-relaxed px-1 opacity-70 group-hover:opacity-100 transition-opacity">{step.desc}</p>
              </div>
            ))}
          </div>
        </motion.div>
      )}

      {/* FAQ Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.17 }} className="lg:col-span-12">
          <div className="mb-8 flex justify-between items-end">
            <div>
              <h2 className="font-headline text-xl font-bold text-brand-primary dark:text-dark-text tracking-tight">
                {searchHelp ? `Search Results for "${searchHelp}"` : 'Frequently Asked Questions'}
              </h2>
              <p className="text-[10px] font-bold text-brand-muted/50 uppercase tracking-widest font-label mt-1">Common Queries</p>
            </div>
          </div>

          {filteredFaq.length === 0 ? (
            <div className="bg-brand-card dark:bg-dark-sidebar rounded-2xl p-20 text-center border border-brand-border dark:border-dark-border premium-depth">
              <span className="material-symbols-outlined text-[48px] text-brand-muted/20 mb-4 block">manage_search</span>
              <p className="font-headline font-bold text-brand-primary dark:text-dark-text">No articles matched your search</p>
              <p className="text-sm text-brand-muted mt-2">Try different keywords or browse common topics.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {filteredFaq.map((item, idx) => (
                <div key={idx} className="bg-brand-card dark:bg-dark-sidebar rounded-2xl overflow-hidden border border-brand-border dark:border-dark-border hover:shadow-card-sm transition-all duration-300 group">
                  <button
                    onClick={() => setOpenFaq(openFaq === idx ? null : idx)}
                    className="w-full flex items-start justify-between p-6 text-left"
                  >
                    <span className="font-body font-bold text-[13px] text-brand-primary dark:text-dark-text pr-6 leading-relaxed group-hover:text-brand-accent transition-colors">{item.q}</span>
                    <span className="material-symbols-outlined text-[20px] text-brand-muted flex-shrink-0 transition-all duration-300" style={{ transform: openFaq === idx ? 'rotate(180deg)' : 'rotate(0deg)', color: openFaq === idx ? 'var(--brand-accent)' : '' }}>
                      expand_more
                    </span>
                  </button>
                  <AnimatePresence>
                    {openFaq === idx && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        className="overflow-hidden"
                      >
                        <div className="px-6 pb-6 text-sm text-brand-muted dark:text-dark-muted leading-relaxed border-t border-brand-border dark:border-dark-border pt-4 bg-brand-bg-low/30 dark:bg-white/[0.01]">
                          {item.a}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ))}
            </div>
          )}
        </motion.div>
      </div>

      {/* Footer Support section */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Contact Support */}
        <motion.div initial={{ opacity: 0, scale: 0.98 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.22 }} className="lg:col-span-8">
          <div className="bg-brand-card dark:bg-dark-sidebar rounded-2xl p-10 border border-brand-border dark:border-dark-border premium-depth">
            <div className="flex items-center gap-6 mb-10">
              <div className="w-14 h-14 bg-brand-bg-low dark:bg-white/5 rounded-2xl flex items-center justify-center flex-shrink-0 text-brand-accent shadow-card-sm">
                <span className="material-symbols-outlined text-[24px]" style={{ fontVariationSettings: "'FILL' 0" }}>support_agent</span>
              </div>
              <div>
                <h2 className="font-headline text-xl font-bold text-brand-primary dark:text-dark-text tracking-tight">Contact Support</h2>
                <p className="text-[10px] font-bold text-brand-muted/50 uppercase tracking-widest font-label mt-1">Direct help desk</p>
              </div>
            </div>
            {messageSent ? (
              <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="flex items-center gap-4 bg-emerald-500/5 text-emerald-500 p-6 rounded-2xl border border-emerald-500/20">
                <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>verified</span>
                <p className="font-bold text-sm">Message received. Our team will respond to your email within 24 hours.</p>
              </motion.div>
            ) : (
              <div className="space-y-6">
                <textarea
                  value={contactMsg}
                  onChange={e => setContactMsg(e.target.value)}
                  rows={4}
                  placeholder="How can we help you today?"
                  className="w-full bg-brand-bg-low dark:bg-white/[0.03] focus:bg-brand-card dark:focus:bg-dark-card rounded-2xl p-5 text-sm font-body text-brand-primary dark:text-dark-text placeholder-brand-muted/40 border border-brand-border dark:border-dark-border outline-none transition-all duration-300 resize-none shadow-sm"
                />
                <button
                  onClick={() => { if (contactMsg.trim()) { setMessageSent(true); setContactMsg(''); } }}
                  disabled={!contactMsg.trim()}
                  className="btn-primary px-10 py-4 text-[10px] uppercase tracking-[0.2em] shadow-card-lg disabled:opacity-30 disabled:grayscale transition-all duration-500"
                >
                  Send Message
                </button>
              </div>
            )}
          </div>
        </motion.div>

        {/* Resources Sidebar */}
        <motion.div initial={{ opacity: 0, scale: 0.98 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.27 }} className="lg:col-span-4 space-y-4">
          {[
            { icon: 'book_5', title: 'Knowledge Ledger', desc: 'Technical references' },
            { icon: 'smart_display', title: 'Video Protocol', desc: 'Audio-visual guides' },
            { icon: 'forum', title: 'Student Forum', desc: 'Peer collaboration' },
          ].map((link, idx) => (
            <button
              key={idx}
              className="w-full bg-brand-card dark:bg-dark-sidebar rounded-2xl p-6 text-left flex items-center gap-5 border border-brand-border dark:border-dark-border premium-depth transition-all duration-300 hover:border-brand-accent/30 group"
            >
              <div className="w-12 h-12 bg-brand-bg-low dark:bg-white/5 group-hover:bg-brand-accent/10 border border-transparent group-hover:border-brand-accent/20 rounded-xl flex items-center justify-center flex-shrink-0 transition-all duration-500 shadow-sm">
                <span className="material-symbols-outlined text-[20px] text-brand-muted group-hover:text-brand-accent transition-colors">{link.icon}</span>
              </div>
              <div>
                <p className="font-headline font-bold text-sm text-brand-primary dark:text-dark-text group-hover:text-brand-accent transition-colors">{link.title}</p>
                <p className="text-[10px] text-brand-muted/70 mt-1 uppercase tracking-widest font-label">{link.desc}</p>
              </div>
            </button>
          ))}
        </motion.div>
      </div>
    </div>
  );
};


export default HelpPage;
