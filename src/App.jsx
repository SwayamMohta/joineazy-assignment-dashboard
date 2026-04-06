import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Sidebar from './components/Sidebar';
import Navbar from './components/Navbar';
import SummaryCard from './components/SummaryCard';
import AssignmentCard from './components/AssignmentCard';
import ConfirmationModal from './components/ConfirmationModal';
import NotificationsPanel from './components/NotificationsPanel';
import CreateAssignmentModal from './components/CreateAssignmentModal';
import AssignmentsPage from './pages/AssignmentsPage';
import ReviewsPage from './pages/ReviewsPage';
import AnalyticsPage from './pages/AnalyticsPage';
import SettingsPage from './pages/SettingsPage';
import HelpPage from './pages/HelpPage';
import DashboardPage from './pages/DashboardPage';
import { INITIAL_ASSIGNMENTS, MOCK_NOTIFICATIONS } from './data/mockData';

function App() {
  // core app state
  const [role, setRole] = useState('student');
  const [activeTab, setActiveTab] = useState('dashboard');
  const [assignments, setAssignments] = useState(() => {
    const saved = localStorage.getItem('joineazy_assignments');
    return saved ? JSON.parse(saved) : INITIAL_ASSIGNMENTS;
  });

  // UI toggles
  const [theme, setTheme] = useState(() => {
    return localStorage.getItem('joineazy_theme') || 'light';
  });
  const [showSubmitModal, setShowSubmitModal] = useState(false);
  const [selectedAssignment, setSelectedAssignment] = useState(null);
  const [showSidebar, setShowSidebar] = useState(false);
  const [showNotifs, setShowNotifs] = useState(false);
  const [showCreateModal, setShowCreateModal] = useState(false);

  // search and filter (dashboard)
  const [searchQuery, setSearchQuery] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');

  // notifications
  const [notifications, setNotifications] = useState(MOCK_NOTIFICATIONS);
  const unreadCount = notifications.filter(n => !n.read).length;

  // clear search when navigating tabs
  useEffect(() => {
    setSearchQuery('');
  }, [activeTab]);

  // ── Theme: toggle 'dark' class on <html> — that's all Tailwind needs ──────
  useEffect(() => {
    localStorage.setItem('joineazy_theme', theme);
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [theme]);

  // persist assignments to localStorage
  useEffect(() => {
    localStorage.setItem('joineazy_assignments', JSON.stringify(assignments));
  }, [assignments]);

  // --- stats computed from assignments ---
  const totalCount = assignments.length;
  const submittedCount = assignments.filter(a => a.status === 'submitted').length;
  const pendingCount = assignments.filter(a => a.status === 'pending').length;
  const avgProgress = totalCount
    ? Math.round(assignments.reduce((sum, a) => sum + a.progress, 0) / totalCount)
    : 0;

  // filter assignments for dashboard view
  const filteredAssignments = assignments.filter(a => {
    const matchesStatus = filterStatus === 'all' || a.status === filterStatus;
    const q = searchQuery.toLowerCase();
    const matchesSearch = !q || a.title.toLowerCase().includes(q) || a.subject.toLowerCase().includes(q);
    return matchesStatus && matchesSearch;
  });

  // build recent activity feed from real data
  const recentActivity = [];
  assignments.forEach(a => {
    if (a.status === 'submitted') {
      recentActivity.push({ icon: 'task_alt', label: `${a.title} submitted`, time: 'Recently', color: '#00b47d' });
    }
    if (a.progress > 0 && a.progress < 100) {
      recentActivity.push({ icon: 'assignment', label: `${a.title} — ${a.progress}% complete`, time: 'In progress', color: '#002045' });
    }
    const daysLeft = Math.ceil((new Date(a.deadline) - new Date()) / 86400000);
    if (daysLeft >= 0 && daysLeft <= 3 && a.status !== 'submitted') {
      recentActivity.push({ icon: 'pending_actions', label: `${a.title} due in ${daysLeft}d`, time: 'Urgent', color: '#ba1a1a' });
    }
  });

  // --- handlers ---

  const handleOpenSubmitModal = (assignment) => {
    setSelectedAssignment(assignment);
    setShowSubmitModal(true);
  };

  const handleConfirmSubmission = () => {
    if (!selectedAssignment) return;
    // mark the assignment as submitted
    setAssignments(prev =>
      prev.map(a =>
        a.id === selectedAssignment.id ? { ...a, status: 'submitted', progress: 100 } : a
      )
    );
    // add a confirmation notification
    setNotifications(prev => [{
      id: `n-${Date.now()}`,
      type: 'success',
      title: 'Submission Confirmed',
      body: `"${selectedAssignment.title}" has been submitted.`,
      time: 'Just now',
      read: false,
    }, ...prev]);
    setShowSubmitModal(false);
    setSelectedAssignment(null);
  };

  const toggleSubtask = (assignmentId, subtaskId) => {
    setAssignments(prev => prev.map(asn => {
      if (asn.id !== assignmentId) return asn;
      if (!asn.subtasks) return asn;
      
      const newSubtasks = asn.subtasks.map(st => 
        st.id === subtaskId ? { ...st, completed: !st.completed } : st
      );
      
      const completedCount = newSubtasks.filter(st => st.completed).length;
      const newProgress = newSubtasks.length > 0 
        ? Math.round((completedCount / newSubtasks.length) * 100)
        : 0;
      
      return { ...asn, subtasks: newSubtasks, progress: newProgress };
    }));
  };

  const handleCreateAssignment = (newAssignment) => {
    setAssignments(prev => [newAssignment, ...prev]);
    // let everyone know a new assignment was posted
    setNotifications(prev => [{
      id: `n-${Date.now()}`,
      type: 'info',
      title: 'New Assignment Created',
      body: `"${newAssignment.title}" has been posted to all students.`,
      time: 'Just now',
      read: false,
    }, ...prev]);
  };

  const handleMarkAllRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, read: true })));
  };

  const handleDismissNotif = (id) => {
    setNotifications(prev => prev.filter(n => n.id !== id));
  };

  // summary stat cards data
  const statsCards = [
    { title: 'Total Assignments', value: totalCount, icon: 'library_books', trend: 12, isPositive: true },
    { title: 'Submitted', value: submittedCount, icon: 'task_alt', trend: 5, isPositive: true },
    { title: 'Pending', value: pendingCount, icon: 'pending_actions', trend: 2, isPositive: false },
    { title: 'Avg. Completion', value: `${avgProgress}%`, icon: 'bar_chart', trend: 8, isPositive: true },
  ];

  // --- page router ---
  const renderPage = () => {
    switch (activeTab) {
      case 'dashboard':
        return (
          <DashboardPage
            role={role}
            assignments={assignments}
            statsCards={statsCards}
            filteredAssignments={filteredAssignments}
            recentActivity={recentActivity}
            filterStatus={filterStatus}
            setFilterStatus={setFilterStatus}
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
            setActiveTab={setActiveTab}
            setShowCreateModal={setShowCreateModal}
            handleOpenSubmitModal={handleOpenSubmitModal}
            toggleSubtask={toggleSubtask}
            pendingCount={pendingCount}
            submittedCount={submittedCount}
            totalCount={totalCount}
            avgProgress={avgProgress}
          />
        );
      case 'assignments':
        return (
          <AssignmentsPage
            assignments={assignments}
            setAssignments={setAssignments}
            role={role}
            onOpenSubmitModal={handleOpenSubmitModal}
            onToggleSubtask={toggleSubtask}
            searchQuery={searchQuery}
          />
        );
      case 'reviews':
        return (
          <ReviewsPage
            assignments={assignments}
            setAssignments={setAssignments}
            role={role}
          />
        );
      case 'analytics':
        return <AnalyticsPage assignments={assignments} role={role} />;
      case 'settings':
        return (
          <SettingsPage
            role={role}
            setRole={setRole}
            theme={theme}
            setTheme={setTheme}
            assignments={assignments}
            setAssignments={setAssignments}
            setNotifications={setNotifications}
          />
        );
      case 'help':
        return <HelpPage />;
      default:
        return (
          <DashboardPage
            role={role}
            assignments={assignments}
            statsCards={statsCards}
            filteredAssignments={filteredAssignments}
            recentActivity={recentActivity}
            filterStatus={filterStatus}
            setFilterStatus={setFilterStatus}
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
            setActiveTab={setActiveTab}
            setShowCreateModal={setShowCreateModal}
            handleOpenSubmitModal={handleOpenSubmitModal}
            toggleSubtask={toggleSubtask}
            pendingCount={pendingCount}
            submittedCount={submittedCount}
            totalCount={totalCount}
            avgProgress={avgProgress}
          />
        );
    }
  };

  return (
    <div
      className="min-h-screen bg-brand-bg dark:bg-dark-bg text-brand-text dark:text-dark-text transition-colors duration-300"
      style={{ fontFamily: 'Inter, sans-serif' }}
    >

      <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />

      <div className="md:pl-64 flex flex-col min-h-screen">
        <Navbar
          role={role}
          setRole={setRole}
          theme={theme}
          setTheme={setTheme}
          toggleSidebar={() => setShowSidebar(!showSidebar)}
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          unreadCount={unreadCount}
          onToggleNotif={() => setShowNotifs(prev => !prev)}
          activeTab={activeTab}
          setActiveTab={setActiveTab}
        />

        {/* page content with animated transitions */}
        <main className="flex-1 bg-brand-bg-low dark:bg-dark-bg-low px-6 sm:px-10 pt-[88px] pb-12 transition-colors duration-300">
          <div className="max-w-7xl mx-auto pt-8">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeTab}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.25, ease: 'easeOut' }}
              >
                {renderPage()}
              </motion.div>
            </AnimatePresence>
          </div>
        </main>

        <footer className="bg-brand-bg dark:bg-dark-bg px-10 py-6 border-t border-black/5 dark:border-white/5 text-center transition-colors duration-300">
          <p className="text-[11px] text-brand-muted dark:text-dark-muted font-label font-bold uppercase tracking-widest">
            © 2026 JoinEazy
          </p>
        </footer>
      </div>

      {/* overlays and modals */}
      <NotificationsPanel
        isOpen={showNotifs}
        onClose={() => setShowNotifs(false)}
        notifications={notifications}
        onMarkAllRead={handleMarkAllRead}
        onDismiss={handleDismissNotif}
      />

      <ConfirmationModal
        isOpen={showSubmitModal}
        onClose={() => setShowSubmitModal(false)}
        onConfirm={handleConfirmSubmission}
        assignment={selectedAssignment}
      />

      <CreateAssignmentModal
        isOpen={showCreateModal}
        onClose={() => setShowCreateModal(false)}
        onCreate={handleCreateAssignment}
      />

      {/* mobile sidebar backdrop */}
      <AnimatePresence>
        {showSidebar && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setShowSidebar(false)}
            className="fixed inset-0 z-[55] md:hidden"
            style={{ backgroundColor: 'rgba(24,28,30,0.40)', backdropFilter: 'blur(4px)' }}
          />
        )}
      </AnimatePresence>
    </div>
  );
}

export default App;
