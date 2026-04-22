import React from 'react';
import { motion } from 'framer-motion';
import { COURSES } from '../data/mockData';

const CoursesPage = ({ onSelectCourse, role }) => {
  return (
    <div className="space-y-8">
      <section className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
        <div>
          <span className="text-[10px] font-bold uppercase tracking-widest text-brand-muted dark:text-dark-muted font-label">
            Academic Year 2026
          </span>
          <h1 className="font-headline text-4xl font-extrabold tracking-tight text-brand-primary dark:text-dark-text mt-1">
            {role === 'professor' ? 'My Courses' : 'Enrolled Courses'}
          </h1>
          <p className="text-brand-muted dark:text-dark-muted font-body font-medium mt-1.5">
            {role === 'professor' 
              ? 'Manage your active curriculum and track student progress across all sections.' 
              : 'View your active courses and upcoming assignment deadlines.'}
          </p>
        </div>
        {role === 'professor' && (
          <button className="btn-primary flex items-center gap-2">
            <span className="material-symbols-outlined text-[18px]">add</span>
            New Course
          </button>
        )}
      </section>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {COURSES.map((course, idx) => (
          <motion.div
            key={course.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.1 }}
            onClick={() => onSelectCourse(course)}
            className="group bg-white dark:bg-dark-sidebar rounded-3xl overflow-hidden border border-brand-border dark:border-dark-border premium-depth cursor-pointer transition-all hover:scale-[1.02] hover:shadow-card-lg"
          >
            <div className="h-48 overflow-hidden relative">
              <img src={course.image} alt={course.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
              <div className="absolute inset-0 bg-gradient-to-t from-dark-bg/80 via-transparent to-transparent opacity-60" />
              <div className="absolute top-4 right-4 px-3 py-1 bg-white/20 backdrop-blur-md rounded-full border border-white/20">
                <span className="text-[10px] font-bold text-white uppercase tracking-widest">{course.code}</span>
              </div>
            </div>
            <div className="p-8 space-y-4">
              <div>
                <h3 className="font-headline text-xl font-bold text-brand-primary dark:text-dark-text group-hover:text-brand-accent transition-colors">
                  {course.title}
                </h3>
                <p className="text-xs text-brand-muted dark:text-dark-muted mt-2 line-clamp-2 leading-relaxed">
                  {course.description}
                </p>
              </div>
              
              <div className="flex items-center justify-between pt-4 border-t border-brand-border dark:border-dark-border">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-brand-bg-low dark:bg-white/5 flex items-center justify-center">
                    <span className="material-symbols-outlined text-[16px] text-brand-muted">group</span>
                  </div>
                  <span className="text-[10px] font-bold text-brand-primary dark:text-dark-text uppercase tracking-widest">
                    {course.students} Students
                  </span>
                </div>
                <div className="flex items-center gap-2 text-brand-accent">
                  <span className="text-[10px] font-bold uppercase tracking-widest">View Course</span>
                  <span className="material-symbols-outlined text-[14px]">arrow_forward</span>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default CoursesPage;
