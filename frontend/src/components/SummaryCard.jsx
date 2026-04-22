import React from 'react';

const SummaryCard = ({ title, value, icon, trend, isPositive }) => {
  return (
    <div className="group relative bg-brand-card dark:bg-dark-card p-6 rounded-xl border border-brand-border dark:border-dark-border transition-all duration-300 hover:shadow-card-lg dark:hover:shadow-glow/5 premium-depth">
      {/* Header: Icon + Trend chip */}
      <div className="flex items-start justify-between mb-6">
        <div className="w-10 h-10 bg-brand-bg-low dark:bg-white/5 flex items-center justify-center rounded-lg flex-shrink-0 group-hover:scale-110 transition-transform duration-300">
          <span
            className="material-symbols-outlined text-brand-primary dark:text-dark-primary text-[20px]"
            style={{ fontVariationSettings: "'FILL' 1, 'wght' 500, 'GRAD' 0, 'opsz' 24" }}
          >
            {icon}
          </span>
        </div>

        <div className={`flex items-center gap-1 text-[9px] font-bold px-2 py-1 rounded-md font-label uppercase tracking-widest ${
          isPositive
            ? 'bg-amber-100/50 dark:bg-brand-accent/10 text-brand-accent dark:text-brand-accent-dim'
            : 'bg-red-50 dark:bg-red-500/10 text-error-red dark:text-red-400'
        }`}>
          <span className="material-symbols-outlined text-[12px]" style={{ fontVariationSettings: "'FILL' 0, 'wght' 700, 'GRAD' 0, 'opsz' 20" }}>
            {isPositive ? 'trending_up' : 'trending_down'}
          </span>
          {trend}%
        </div>
      </div>

      {/* Stat */}
      <div className="space-y-1">
        <p className="text-[10px] font-bold text-brand-accent dark:text-brand-accent-dim uppercase tracking-[0.2em] font-label opacity-80">
          {title}
        </p>
        <h3 className="font-headline text-3xl font-extrabold text-brand-primary dark:text-dark-text tracking-tight">
          {value}
        </h3>
      </div>
      
      {/* Subtle decorative element */}
      <div className="absolute right-0 bottom-0 w-24 h-24 bg-gradient-to-br from-transparent to-brand-accent/5 dark:to-brand-accent/5 rounded-br-xl pointer-events-none" />
    </div>
  );
};

export default SummaryCard;
