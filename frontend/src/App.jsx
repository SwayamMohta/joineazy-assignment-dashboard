import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Sidebar from './components/Sidebar';
import Navbar from './components/Navbar';
import SummaryCard from './components/SummaryCard';
import AssignmentCard from './components/AssignmentCard';
import ConfirmationModal from './components/ConfirmationModal';
import NotificationsPanel from './components/NotificationsPanel';
import CreateAssignmentModal from './components/CreateAssignmentModal';

// Pages
import LoginPage from './pages/LoginPage';
import DashboardPage from './pages/DashboardPage';
import AssignmentsPage from './pages/AssignmentsPage';
import ReviewsPage from './pages/ReviewsPage';
import AnalyticsPage from './pages/AnalyticsPage';
import SettingsPage from './pages/SettingsPage';
import HelpPage from './pages/HelpPage';
import CoursesPage from './pages/CoursesPage';
import GroupPage from './pages/GroupPage';
import AssignmentDetailsPage from './pages/AssignmentDetailsPage';
import StudentDashboard from './pages/StudentDashboard';
import ProfessorDashboard from './pages/ProfessorDashboard';

import { INITIAL_ASSIGNMENTS, MOCK_NOTIFICATIONS, COURSES, GROUPS } from './data/mockData';

function App() {
  // --- auth state ---
  const [user, setUser] = useState(() => {
    try {
      const saved = localStorage.getItem('joineazy_user');
      return saved ? JSON.parse(saved) : null;
    } catch (e) {
      console.error("Failed to parse user from localStorage", e);
      return null;
    }
  });

  // --- core app state ---
  const [role, setRole] = useState(user?.role || 'student');
  const [activeTab, setActiveTab] = useState('dashboard');
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [selectedAssignment, setSelectedAssignment] = useState(null);

  const [assignments, setAssignments] = useState(() => {
    try {
      const saved = localStorage.getItem('joineazy_assignments');
      const parsed = saved ? JSON.parse(saved) : null;
      return Array.isArray(parsed) ? parsed : INITIAL_ASSIGNMENTS;
    } catch (e) {
      console.error("Failed to parse assignments from localStorage", e);
      return INITIAL_ASSIGNMENTS;
    }
  });

  const [groups, setGroups] = useState(() => {
    try {
      const saved = localStorage.getItem('joineazy_groups');
      const parsed = saved ? JSON.parse(saved) : null;
      return Array.isArray(parsed) ? parsed : GROUPS;
    } catch (e) {
      console.error("Failed to parse groups from localStorage", e);
      return GROUPS;
    }
  });

  const [notifications, setNotifications] = useState(() => {
    try {
      const saved = localStorage.getItem('joineazy_notifications');
      const parsed = saved ? JSON.parse(saved) : null;
      return Array.isArray(parsed) ? parsed : MOCK_NOTIFICATIONS;
    } catch (e) {
      console.error("Failed to parse notifications from localStorage", e);
      return MOCK_NOTIFICATIONS;
    }
  });

  // --- UI toggles ---
  const [theme, setTheme] = useState(() => {
    return localStorage.getItem('joineazy_theme') || 'light';
  });
  const [showSubmitModal, setShowSubmitModal] = useState(false);
  const [showSidebar, setShowSidebar] = useState(false);
  const [showNotifs, setShowNotifs] = useState(false);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // --- search and filter ---
  const [searchQuery, setSearchQuery] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');

  // Sync role with user
  useEffect(() => {
    if (user) setRole(user.role);
  }, [user]);

  // Persist user
  useEffect(() => {
    if (user) localStorage.setItem('joineazy_user', JSON.stringify(user));
    else localStorage.removeItem('joineazy_user');
  }, [user]);

  // --- Theme Logic ---
  useEffect(() => {
    localStorage.setItem('joineazy_theme', theme);
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [theme]);

  // Persist assignments
  useEffect(() => {
    localStorage.setItem('joineazy_assignments', JSON.stringify(assignments));
  }, [assignments]);

  // Persist groups
  useEffect(() => {
    localStorage.setItem('joineazy_groups', JSON.stringify(groups));
  }, [groups]);

  // Derive active group
  const activeGroup = user ? groups.find(g => g.members.includes(user.id) || g.id === user.groupId) : null;

  // --- stats computed ---
  const getIsSubmittedForUser = (a) => {
    if (!user) return false;
    const sub = (a.submissions || []).find(s => 
      (a.type === 'group' && user.groupId === s.groupId) || 
      (a.type === 'individual' && user.id === s.studentId)
    );
    return sub ? sub.submitted : false;
  };

  const totalCount = assignments.length;
  const submittedCount = role === 'professor' 
    ? assignments.filter(a => a.status === 'submitted').length
    : assignments.filter(a => getIsSubmittedForUser(a)).length;
  const pendingCount = role === 'professor' 
    ? assignments.filter(a => a.status === 'pending').length
    : assignments.filter(a => !getIsSubmittedForUser(a)).length;

  const avgProgress = totalCount
    ? Math.round(assignments.reduce((sum, a) => sum + a.progress, 0) / totalCount)
    : 0;

  // --- stats cards data ---
  const statsCards = [
    { title: 'Active Courses', value: COURSES.length, icon: 'school', trend: 0, isPositive: true },
    { title: 'Submissions', value: submittedCount, icon: 'task_alt', trend: 5, isPositive: true },
    { title: 'Pending Tasks', value: pendingCount, icon: 'pending_actions', trend: 2, isPositive: false },
    { title: 'Avg. Momentum', value: `${avgProgress}%`, icon: 'bar_chart', trend: 8, isPositive: true },
  ];

  const unreadCount = notifications.filter(n => !n.read).length;

  // build recent activity feed
  const recentActivity = [];
  assignments.forEach(a => {
    const isSub = role === 'professor' ? a.status === 'submitted' : getIsSubmittedForUser(a);
    if (isSub) {
      recentActivity.push({ icon: 'task_alt', label: `${a.title} submitted`, time: 'Recently', color: '#10B981' });
    }
    if (!isSub && a.progress > 0 && a.progress < 100) {
      recentActivity.push({ icon: 'assignment', label: `${a.title} — ${a.progress}% complete`, time: 'In progress', color: '#3B82F6' });
    }
  });

  // --- handlers ---
  const handleLogin = (userData) => {
    setUser(userData);
    setActiveTab('dashboard');
  };

  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem('joineazy_user');
  };

  const handleOpenAssignment = (assignment) => {
    setSelectedAssignment(assignment);
    setActiveTab('assignment-detail');
  };

  const handleConfirmSubmission = (assignment) => {
    setAssignments(prev =>
      prev.map(a => {
        if (a.id !== assignment.id) return a;

        // Update the specific submission record for the professor view
        const updatedSubmissions = (a.submissions || []).map(s => {
          if (a.type === 'group' && s.groupId === user.groupId) {
            return { ...s, submitted: true, progress: 100, timestamp: new Date().toISOString() };
          }
          if (a.type === 'individual' && s.studentId === user.id) {
            return { ...s, submitted: true, progress: 100, timestamp: new Date().toISOString() };
          }
          return s;
        });

        // Determine if EVERYTHING is submitted (optional, but let's keep status as 'active' or something)
        // For individual view, we care about the user's status.
        return {
          ...a,
          submissions: updatedSubmissions
        };
      })
    );

    setNotifications(prev => [{
      id: `n-${Date.now()}`,
      type: 'success',
      title: 'Submission Acknowledged',
      body: `"${assignment.title}" has been successfully logged.`,
      time: 'Just now',
      read: false,
    }, ...prev]);
    setActiveTab('dashboard');
  };

  const handleEditAssignment = (updatedAsgn) => {
    setAssignments(prev => prev.map(a => a.id === updatedAsgn.id ? updatedAsgn : a));
  };

  const toggleSubtask = (assignmentId, subtaskId) => {
    setAssignments(prev => prev.map(asn => {
      if (asn.id !== assignmentId) return asn;
      if (!asn.subtasks) return asn;
      const newSubtasks = asn.subtasks.map(st =>
        st.id === subtaskId ? { ...st, completed: !st.completed } : st
      );
      const completedCount = newSubtasks.filter(st => st.completed).length;
      const newProgress = Math.round((completedCount / newSubtasks.length) * 100);
      return { ...asn, subtasks: newSubtasks, progress: newProgress };
    }));
  };

  const handleCreateAssignment = (newAsgn) => {
    setAssignments(prev => [newAsgn, ...prev]);
    setShowCreateModal(false);
  };

  const handleMarkAllRead = () => setNotifications(prev => prev.map(n => ({ ...n, read: true })));
  const handleDismissNotif = (id) => setNotifications(prev => prev.filter(n => n.id !== id));

  // --- Page Router ---
  const renderPage = () => {
    switch (activeTab) {
      case 'dashboard':
        return role === 'professor' ? (
          <ProfessorDashboard
            user={user}
            courses={COURSES}
            assignments={assignments}
            statsCards={statsCards}
            onSelectCourse={(c) => { setSelectedCourse(c); setActiveTab('assignments'); }}
            setShowCreateModal={setShowCreateModal}
          />
        ) : (
          <StudentDashboard
            user={user}
            courses={COURSES}
            assignments={assignments}
            statsCards={statsCards}
            recentActivity={recentActivity}
            onOpenAssignment={handleOpenAssignment}
            toggleSubtask={toggleSubtask}
            setActiveTab={setActiveTab}
            onSelectCourse={(c) => { setSelectedCourse(c); setActiveTab('assignments'); }}
          />
        );
      case 'courses':
        return <CoursesPage role={role} onSelectCourse={(c) => { setSelectedCourse(c); setActiveTab('dashboard'); }} />;
      case 'assignments':
        return <AssignmentsPage user={user} assignments={assignments} setAssignments={setAssignments} onEditAssignment={handleEditAssignment} role={role} onOpenSubmitModal={handleOpenAssignment} onToggleSubtask={toggleSubtask} searchQuery={searchQuery} />;
      case 'assignment-detail':
        return <AssignmentDetailsPage assignment={selectedAssignment} user={user} activeGroup={activeGroup} onBack={() => setActiveTab('dashboard')} onConfirmSubmission={handleConfirmSubmission} toggleSubtask={toggleSubtask} />;
      case 'groups':
        return <GroupPage user={user} setUser={setUser} groups={groups} setGroups={setGroups} assignments={assignments} />;
      case 'reviews':
        return <ReviewsPage assignments={assignments} setAssignments={setAssignments} role={role} />;
      case 'analytics':
        return <AnalyticsPage assignments={assignments} role={role} />;
      case 'settings':
        return <SettingsPage role={role} setRole={setRole} theme={theme} setTheme={setTheme} assignments={assignments} setAssignments={setAssignments} setNotifications={setNotifications} />;
      case 'help':
        return <HelpPage />;
      default:
        return (
          <DashboardPage
            user={user}
            role={role}
            assignments={assignments}
            statsCards={statsCards}
            filteredAssignments={assignments} // Simplified for the default view
            recentActivity={recentActivity}
            filterStatus={filterStatus}
            setFilterStatus={setFilterStatus}
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
            setActiveTab={setActiveTab}
            setShowCreateModal={setShowCreateModal}
            handleOpenSubmitModal={handleOpenAssignment}
            toggleSubtask={toggleSubtask}
            pendingCount={pendingCount}
            submittedCount={submittedCount}
            totalCount={totalCount}
            avgProgress={avgProgress}
          />
        );
    }
  };

  if (!user) {
    return <LoginPage onLogin={handleLogin} />;
  }

  return (
    <div className="min-h-screen bg-brand-bg dark:bg-dark-bg text-brand-text dark:text-dark-text transition-colors duration-500" style={{ fontFamily: 'Inter, sans-serif' }}>
      <Sidebar
        activeTab={activeTab}
        setActiveTab={(tab) => { setActiveTab(tab); setIsMobileMenuOpen(false); }}
        isOpen={isMobileMenuOpen}
        onClose={() => setIsMobileMenuOpen(false)}
      />

      <div className="md:pl-64 flex flex-col min-h-screen">
        <Navbar
          user={user}
          role={role}
          setRole={setRole}
          theme={theme}
          setTheme={setTheme}
          toggleSidebar={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          unreadCount={unreadCount}
          onToggleNotif={() => setShowNotifs(prev => !prev)}
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          onLogout={handleLogout}
        />

        <main className="flex-1 bg-brand-bg-low dark:bg-dark-bg-low px-6 sm:px-10 pt-[88px] pb-12 transition-colors duration-500">
          <div className="max-w-7xl mx-auto pt-8">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeTab}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
              >
                {renderPage()}
              </motion.div>
            </AnimatePresence>
          </div>
        </main>

        <footer className="bg-brand-bg dark:bg-dark-bg px-10 py-8 border-t border-brand-border dark:border-dark-border text-center transition-colors duration-500">
          <p className="text-[10px] text-brand-muted dark:text-dark-muted font-label font-bold uppercase tracking-[0.3em] opacity-50">
            JoinEazy Dashboard • 2026
          </p>
        </footer>
      </div>

      <NotificationsPanel isOpen={showNotifs} onClose={() => setShowNotifs(false)} notifications={notifications} onMarkAllRead={handleMarkAllRead} onDismiss={handleDismissNotif} />
      <CreateAssignmentModal isOpen={showCreateModal} onClose={() => setShowCreateModal(false)} onCreate={handleCreateAssignment} />
      <ConfirmationModal isOpen={showSubmitModal} onClose={() => setShowSubmitModal(false)} onConfirm={handleConfirmSubmission} assignment={selectedAssignment} />
    </div>
  );
}

export default App;
