import React from 'react';

const SummaryCard = ({ title, value, icon, trend, isPositive }) => {
  return (
    <div className="group bg-brand-card dark:bg-dark-card p-6 rounded-xl border border-black/5 dark:border-white/5 transition-all duration-300 hover:shadow-card dark:hover:shadow-none cursor-default">
      {/* Header: Icon + Trend chip */}
      <div className="flex items-start justify-between mb-5">
        <div className="w-10 h-10 bg-brand-bg-low dark:bg-dark-bg-low flex items-center justify-center rounded-lg flex-shrink-0 group-hover:bg-brand-chip dark:group-hover:bg-brand-secondary transition-colors duration-300">
          <span
            className="material-symbols-outlined text-brand-primary dark:text-dark-primary text-[20px]"
            style={{ fontVariationSettings: "'FILL' 1, 'wght' 500, 'GRAD' 0, 'opsz' 24" }}
          >
            {icon}
          </span>
        </div>

        <div className={`flex items-center gap-1 text-[10px] font-bold px-2.5 py-1 rounded-md font-label uppercase tracking-wide ${
          isPositive
            ? 'bg-brand-accent/15 text-brand-accent dark:text-brand-accent-dim'
            : 'bg-red-100 dark:bg-red-900/20 text-error-red dark:text-red-300'
        }`}>
          <span className="material-symbols-outlined text-[12px]" style={{ fontVariationSettings: "'FILL' 0, 'wght' 600, 'GRAD' 0, 'opsz' 20" }}>
            {isPositive ? 'trending_up' : 'trending_down'}
          </span>
          {trend}%
        </div>
      </div>

      {/* Stat */}
      <p className="text-[10px] font-bold text-brand-muted dark:text-dark-muted uppercase tracking-widest font-label mb-1.5">
        {title}
      </p>
      <h3 className="font-headline text-2xl font-extrabold text-brand-primary dark:text-dark-text tracking-tight">
        {value}
      </h3>
    </div>
  );
};

export default SummaryCard;
