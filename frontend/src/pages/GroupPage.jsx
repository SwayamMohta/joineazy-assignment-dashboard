import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { GROUPS, MOCK_USERS } from '../data/mockData';

const GroupPage = ({ user, setUser, groups, setGroups, assignments }) => {
  const [activeGroup, setActiveGroup] = useState(() => {
    return groups.find(g => g.members.includes(user.id)) || null;
  });

  const [isCreating, setIsCreating] = useState(false);
  const [isJoining, setIsJoining] = useState(false);
  const [joinError, setJoinError] = useState('');
  const [groupName, setGroupName] = useState('');
  const [inviteCode, setInviteCode] = useState('');

  const handleCreateGroup = (e) => {
    e.preventDefault();
    if (!groupName) return;
    const newGroup = {
      id: `g-${Date.now()}`,
      name: groupName,
      leaderId: user.id,
      members: [user.id],
      status: 'active',
      inviteCode: `GR-${Math.floor(1000 + Math.random() * 9000)}`
    };
    setGroups(prev => [...prev, newGroup]);
    setActiveGroup(newGroup);
    setUser(prev => ({ ...prev, groupId: newGroup.id }));
    setIsCreating(false);
  };

  const handleJoinGroup = (e) => {
    e.preventDefault();
    if (!inviteCode) return;
    
    const group = groups.find(g => g.inviteCode === inviteCode);
    
    if (group) {
      if (group.members.includes(user.id)) {
        setJoinError('You are already a member of this group.');
        return;
      }
      const updatedGroup = { ...group, members: [...group.members, user.id] };
      setGroups(prev => prev.map(g => g.id === group.id ? updatedGroup : g));
      setActiveGroup(updatedGroup);
      setUser(prev => ({ ...prev, groupId: group.id }));
      setIsJoining(false);
      setJoinError('');
    } else {
      setJoinError('Invalid invite code. Please try again.');
    }
  };

  const getMemberData = (id) => MOCK_USERS.find(u => u.id === id);

  const renderPanelContent = () => {
    switch (activePanel) {
      case 'Chat Room':
        return (
          <div className="flex flex-col h-full space-y-4">
            <div className="flex-1 space-y-4 min-h-[300px]">
              <div className="flex gap-3">
                <div className="w-8 h-8 rounded-full bg-brand-accent/20 flex items-center justify-center text-brand-accent font-bold text-xs shrink-0">AI</div>
                <div className="bg-brand-bg-low dark:bg-dark-sidebar p-3 rounded-2xl rounded-tl-sm text-sm dark:text-dark-text border border-brand-border dark:border-dark-border">
                  <p>Welcome to the group chat! Let's discuss our progress here.</p>
                  <span className="text-[9px] text-brand-muted mt-1 block">10:00 AM</span>
                </div>
              </div>
              <div className="flex gap-3 flex-row-reverse">
                <img src={user.avatar} className="w-8 h-8 rounded-full shrink-0" alt="You" />
                <div className="bg-brand-primary dark:bg-brand-accent p-3 rounded-2xl rounded-tr-sm text-sm text-white border border-brand-primary dark:border-brand-accent">
                  <p>Sounds good. I'll start working on the frontend.</p>
                  <span className="text-[9px] text-white/70 mt-1 block text-right">10:05 AM</span>
                </div>
              </div>
            </div>
            <div className="flex gap-2 mt-4 pt-4 border-t border-brand-border dark:border-dark-border">
              <input type="text" placeholder="Type a message..." className="flex-1 bg-brand-bg-low dark:bg-white/5 border border-brand-border dark:border-dark-border rounded-xl px-4 py-2 text-sm dark:text-dark-text focus:ring-2 focus:ring-brand-accent outline-none" />
              <button className="btn-primary px-4 py-2 rounded-xl flex items-center justify-center"><span className="material-symbols-outlined">send</span></button>
            </div>
          </div>
        );
      case 'Shared Drive':
        return (
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <p className="text-sm text-brand-muted dark:text-dark-muted">Team resources and submissions.</p>
              <button className="text-[10px] font-bold uppercase tracking-widest text-brand-accent flex items-center gap-1 hover:underline">
                <span className="material-symbols-outlined text-[16px]">upload</span> Upload File
              </button>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {[
                { name: 'Project_Proposal_v2.pdf', size: '2.4 MB', date: 'Today' },
                { name: 'Dataset_Cleaned.csv', size: '14.1 MB', date: 'Yesterday' },
                { name: 'Meeting_Notes.docx', size: '124 KB', date: 'Oct 12' },
                { name: 'Design_Mockups.fig', size: '8.4 MB', date: 'Oct 10' }
              ].map((file, i) => (
                <div key={i} className="flex items-center gap-3 p-4 rounded-xl border border-brand-border dark:border-dark-border hover:bg-brand-bg-low dark:hover:bg-white/5 cursor-pointer transition-colors group">
                  <div className="w-10 h-10 rounded-lg bg-brand-accent/10 text-brand-accent flex items-center justify-center shrink-0">
                    <span className="material-symbols-outlined">description</span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-bold text-brand-primary dark:text-dark-text truncate group-hover:text-brand-accent transition-colors">{file.name}</p>
                    <p className="text-[10px] text-brand-muted uppercase tracking-widest mt-0.5">{file.size} • {file.date}</p>
                  </div>
                  <button className="text-brand-muted hover:text-brand-primary dark:hover:text-white shrink-0 flex items-center">
                    <span className="material-symbols-outlined text-lg">download</span>
                  </button>
                </div>
              ))}
            </div>
          </div>
        );
      case 'Peer Reviews':
        return (
          <div className="space-y-6">
            <p className="text-sm text-brand-muted dark:text-dark-muted mb-4">Leave feedback for your teammates to improve collaboration.</p>
            <div className="space-y-4">
              {activeGroup.members.filter(id => id !== user.id).map(memberId => {
                const m = getMemberData(memberId);
                if (!m) return null;
                return (
                  <div key={memberId} className="p-5 rounded-2xl border border-brand-border dark:border-dark-border bg-white dark:bg-dark-sidebar">
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center gap-3">
                        <img src={m.avatar} alt={m.name} className="w-8 h-8 rounded-full" />
                        <div>
                          <p className="font-bold text-sm text-brand-primary dark:text-dark-text">{m.name}</p>
                          <p className="text-[10px] text-brand-muted uppercase tracking-widest">{m.role || 'Member'}</p>
                        </div>
                      </div>
                      <div className="flex text-brand-accent">
                        {[1, 2, 3, 4, 5].map(star => (
                          <span key={star} className="material-symbols-outlined text-[16px] cursor-pointer hover:scale-110 transition-transform">
                            {star <= 4 ? 'star' : 'star_outline'}
                          </span>
                        ))}
                      </div>
                    </div>
                    <textarea
                      placeholder={`Write a review for ${m.name}...`}
                      className="w-full bg-brand-bg-low dark:bg-white/5 border border-brand-border dark:border-dark-border rounded-xl px-4 py-3 text-sm dark:text-dark-text focus:ring-2 focus:ring-brand-accent outline-none resize-none h-20"
                    ></textarea>
                    <div className="flex justify-end mt-2">
                      <button className="text-[10px] font-bold uppercase tracking-widest text-brand-accent hover:underline">Submit Review</button>
                    </div>
                  </div>
                );
              })}
              {activeGroup.members.length <= 1 && (
                <div className="text-center py-8 text-brand-muted">
                  No other members to review yet.
                </div>
              )}
            </div>
          </div>
        );
      case 'Task Board':
        return (
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <p className="text-sm text-brand-muted dark:text-dark-muted">Track team milestones and pending work.</p>
              <button className="text-[10px] font-bold uppercase tracking-widest text-brand-accent flex items-center gap-1 hover:underline">
                <span className="material-symbols-outlined text-[16px]">add</span> Add Task
              </button>
            </div>
            <div className="space-y-4">
              {[
                { title: 'Setup GitHub Repository', status: 'completed', assignee: 'Alex', date: 'Oct 10' },
                { title: 'Design Database Schema', status: 'in-progress', assignee: 'You', date: 'Oct 15' },
                { title: 'Implement Authentication', status: 'pending', assignee: 'Sarah', date: 'Oct 20' },
                { title: 'Write API Documentation', status: 'pending', assignee: 'Unassigned', date: 'Oct 22' },
              ].map((task, i) => (
                <div key={i} className="flex items-center justify-between p-4 rounded-xl border border-brand-border dark:border-dark-border bg-white dark:bg-dark-sidebar hover:border-brand-accent/30 transition-colors group">
                  <div className="flex items-center gap-4">
                    <div className={`w-6 h-6 rounded-md flex items-center justify-center border shrink-0 ${task.status === 'completed' ? 'bg-green-500/10 border-green-500/20 text-green-500' :
                        task.status === 'in-progress' ? 'bg-brand-accent/10 border-brand-accent/20 text-brand-accent' :
                          'bg-brand-bg-low dark:bg-white/5 border-brand-border dark:border-dark-border text-brand-muted'
                      }`}>
                      <span className="material-symbols-outlined text-[14px]">
                        {task.status === 'completed' ? 'check' : task.status === 'in-progress' ? 'schedule' : 'radio_button_unchecked'}
                      </span>
                    </div>
                    <div>
                      <p className={`text-sm font-bold ${task.status === 'completed' ? 'line-through text-brand-muted' : 'text-brand-primary dark:text-dark-text'}`}>
                        {task.title}
                      </p>
                      <div className="flex items-center gap-2 mt-1">
                        <span className="text-[9px] font-bold uppercase tracking-widest text-brand-muted bg-brand-bg-low dark:bg-white/5 px-2 py-0.5 rounded-sm">
                          {task.assignee}
                        </span>
                        <span className="text-[9px] text-brand-muted uppercase tracking-widest">• Due {task.date}</span>
                      </div>
                    </div>
                  </div>
                  <button className="opacity-0 group-hover:opacity-100 transition-opacity text-brand-muted hover:text-brand-primary dark:hover:text-white flex items-center">
                    <span className="material-symbols-outlined text-lg">more_vert</span>
                  </button>
                </div>
              ))}
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  if (!activeGroup) {
    return (
      <div className="max-w-4xl mx-auto space-y-12 py-12">
        <div className="text-center space-y-4">
          <div className="w-20 h-20 bg-brand-bg-low dark:bg-white/5 rounded-3xl flex items-center justify-center mx-auto mb-6 text-brand-muted">
            <span className="material-symbols-outlined text-[40px]">group_off</span>
          </div>
          <h1 className="font-headline text-4xl font-extrabold text-brand-primary dark:text-dark-text tracking-tight">Collaboration Hub</h1>
          <p className="text-brand-muted dark:text-dark-muted font-body max-w-md mx-auto">
            You are not part of any group yet. Collaboration is key for group assignments and peer reviews.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <motion.div
            whileHover={{ y: -5 }}
            className="bg-white dark:bg-dark-sidebar p-10 rounded-3xl border border-brand-border dark:border-dark-border premium-depth text-center space-y-6"
          >
            <div className="w-14 h-14 bg-brand-accent/10 rounded-2xl flex items-center justify-center mx-auto text-brand-accent">
              <span className="material-symbols-outlined text-[28px]">add_circle</span>
            </div>
            <div>
              <h3 className="font-headline text-xl font-bold text-brand-primary dark:text-dark-text">Create a Group</h3>
              <p className="text-xs text-brand-muted dark:text-dark-muted mt-2">Start a new group and invite your peers to collaborate.</p>
            </div>
            <button
              onClick={() => setIsCreating(true)}
              className="w-full btn-primary py-3 rounded-xl text-[10px] font-bold uppercase tracking-widest"
            >
              Initialize Group
            </button>
          </motion.div>

          <motion.div
            whileHover={{ y: -5 }}
            className="bg-white dark:bg-dark-sidebar p-10 rounded-3xl border border-brand-border dark:border-dark-border premium-depth text-center space-y-6"
          >
            <div className="w-14 h-14 bg-blue-500/10 rounded-2xl flex items-center justify-center mx-auto text-blue-500">
              <span className="material-symbols-outlined text-[28px]">group_add</span>
            </div>
            <div>
              <h3 className="font-headline text-xl font-bold text-brand-primary dark:text-dark-text">Join a Group</h3>
              <p className="text-xs text-brand-muted dark:text-dark-muted mt-2">Already have an invite code? Enter it here to join your team.</p>
            </div>
            <button
              onClick={() => setIsJoining(true)}
              className="w-full bg-brand-bg-low dark:bg-white/5 text-brand-primary dark:text-dark-text border border-brand-border dark:border-dark-border py-3 rounded-xl text-[10px] font-bold uppercase tracking-widest hover:bg-brand-border dark:hover:bg-white/10 transition-all"
            >
              Enter Code
            </button>
          </motion.div>
        </div>

        {/* Create Modal */}
        <AnimatePresence>
          {isCreating && (
            <div className="fixed inset-0 z-[100] flex items-center justify-center p-6">
              <motion.div
                initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                className="absolute inset-0 bg-dark-bg/60 backdrop-blur-md"
                onClick={() => setIsCreating(false)}
              />
              <motion.div
                initial={{ scale: 0.95, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.95, opacity: 0 }}
                className="relative bg-white dark:bg-dark-sidebar w-full max-w-md p-10 rounded-3xl premium-depth z-10"
              >
                <h3 className="font-headline text-2xl font-bold text-brand-primary dark:text-dark-text mb-6">New Group</h3>
                <form onSubmit={handleCreateGroup} className="space-y-6">
                  <div>
                    <label className="block text-[10px] font-bold text-brand-muted dark:text-dark-muted uppercase tracking-widest mb-2 px-1">Group Name</label>
                    <input
                      type="text"
                      value={groupName}
                      onChange={(e) => setGroupName(e.target.value)}
                      placeholder="e.g. The Debuggers"
                      className="w-full bg-brand-bg-low dark:bg-white/5 border border-brand-border dark:border-dark-border rounded-xl px-4 py-3 text-sm dark:text-dark-text focus:ring-2 focus:ring-brand-accent outline-none"
                    />
                  </div>
                  <button type="submit" className="w-full btn-primary py-4 rounded-xl text-[10px] font-bold uppercase tracking-widest">Create Group</button>
                </form>
              </motion.div>
            </div>
          )}
        </AnimatePresence>

        {/* Join Modal */}
        <AnimatePresence>
          {isJoining && (
            <div className="fixed inset-0 z-[100] flex items-center justify-center p-6">
              <motion.div
                initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                className="absolute inset-0 bg-dark-bg/60 backdrop-blur-md"
                onClick={() => setIsJoining(false)}
              />
              <motion.div
                initial={{ scale: 0.95, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.95, opacity: 0 }}
                className="relative bg-white dark:bg-dark-sidebar w-full max-w-md p-10 rounded-3xl premium-depth z-10"
              >
                <h3 className="font-headline text-2xl font-bold text-brand-primary dark:text-dark-text mb-6">Join Team</h3>
                <form onSubmit={handleJoinGroup} className="space-y-6">
                  <div>
                    <label className="block text-[10px] font-bold text-brand-muted dark:text-dark-muted uppercase tracking-widest mb-2 px-1">Invite Code</label>
                    <input
                      type="text"
                      value={inviteCode}
                      onChange={(e) => setInviteCode(e.target.value)}
                      placeholder="e.g. GR-9921-X"
                      className="w-full bg-brand-bg-low dark:bg-white/5 border border-brand-border dark:border-dark-border rounded-xl px-4 py-3 text-sm dark:text-dark-text focus:ring-2 focus:ring-brand-accent outline-none"
                    />
                  </div>
                  <button type="submit" className="w-full btn-primary py-4 rounded-xl text-[10px] font-bold uppercase tracking-widest">Join Group</button>
                </form>
              </motion.div>
            </div>
          )}
        </AnimatePresence>
      </div>
    );
  }

  return (
    <div className="space-y-10">
      <section className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <span className="text-[10px] font-bold uppercase tracking-widest text-brand-accent font-label">Team Active</span>
            <div className="w-1.5 h-1.5 rounded-full bg-brand-accent animate-pulse" />
          </div>
          <h1 className="font-headline text-4xl font-extrabold tracking-tight text-brand-primary dark:text-dark-text">
            {activeGroup.name}
          </h1>
          <p className="text-brand-muted dark:text-dark-muted font-body font-medium mt-1.5">
            Managing collaborative workflows for Deep Neural Networks.
          </p>
        </div>
        <div className="flex gap-3">
          <button
            onClick={() => setActiveGroup(null)}
            className="px-5 py-2 bg-red-500/10 text-red-500 border border-red-500/20 rounded-xl text-[10px] font-bold uppercase tracking-widest hover:bg-red-500 hover:text-white transition-all"
          >
            Leave Group
          </button>
        </div>
      </section>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Members List */}
        <div className="lg:col-span-8 space-y-6">
          <div className="bg-white dark:bg-dark-sidebar rounded-3xl p-8 border border-brand-border dark:border-dark-border premium-depth">
            <h3 className="font-headline text-xl font-bold text-brand-primary dark:text-dark-text mb-8">Group Members</h3>
            <div className="space-y-4">
              {activeGroup.members.map(memberId => {
                const m = getMemberData(memberId);
                const isLeader = memberId === activeGroup.leaderId;
                return (
                  <div key={memberId} className="flex items-center justify-between p-4 rounded-2xl border border-brand-border dark:border-dark-border hover:bg-brand-bg-low dark:hover:bg-white/[0.02] transition-all group">
                    <div className="flex items-center gap-4">
                      <img src={m.avatar} alt={m.name} className="w-12 h-12 rounded-xl bg-brand-bg-low dark:bg-white/5" />
                      <div>
                        <div className="flex items-center gap-2">
                          <p className="font-bold text-brand-primary dark:text-dark-text">{m.name}</p>
                          {isLeader && (
                            <span className="px-2 py-0.5 bg-brand-accent/10 text-brand-accent text-[8px] font-bold uppercase tracking-widest rounded-full border border-brand-accent/20">Leader</span>
                          )}
                        </div>
                        <p className="text-[10px] text-brand-muted dark:text-dark-muted font-bold uppercase tracking-widest mt-1 opacity-60">{m.email}</p>
                      </div>
                    </div>
                    {isLeader && user.id === activeGroup.leaderId && memberId !== user.id && (
                      <button className="text-[10px] font-bold text-red-500 uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-opacity">Remove</button>
                    )}
                  </div>
                );
              })}
              <button onClick={() => setIsInvitingPeer(true)} className="w-full flex items-center justify-center gap-2 p-4 rounded-2xl border border-dashed border-brand-border dark:border-dark-border text-brand-muted hover:border-brand-accent hover:text-brand-accent transition-all text-[10px] font-bold uppercase tracking-widest">
                <span className="material-symbols-outlined text-[18px]">person_add</span>
                Invite Peer
              </button>
            </div>
          </div>

          <div className="bg-white dark:bg-dark-sidebar rounded-3xl p-8 border border-brand-border dark:border-dark-border premium-depth">
            <h3 className="font-headline text-xl font-bold text-brand-primary dark:text-dark-text mb-6">Active Group Assignments</h3>
            <div className="space-y-4">
              {assignments.filter(a => a.type === 'group').map(a => (
                <div key={a.id} className="flex items-center justify-between p-6 rounded-2xl border border-brand-border dark:border-dark-border">
                  <div className="flex items-center gap-5">
                    <div className="w-12 h-12 rounded-2xl bg-brand-bg-low dark:bg-white/5 flex items-center justify-center text-brand-accent">
                      <span className="material-symbols-outlined">assignment</span>
                    </div>
                    <div>
                      <h4 className="font-bold text-brand-primary dark:text-dark-text">{a.title}</h4>
                      <p className="text-[10px] text-brand-muted dark:text-dark-muted font-bold uppercase tracking-widest mt-1">{a.subject}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-[10px] font-bold text-brand-muted dark:text-dark-muted uppercase tracking-widest mb-1">Status</p>
                    <span className={`px-3 py-1 rounded-full text-[9px] font-bold uppercase tracking-widest ${a.status === 'submitted' ? 'bg-green-500/10 text-green-500 border border-green-500/20' : 'bg-brand-accent/10 text-brand-accent border border-brand-accent/20'
                      }`}>
                      {a.status}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Sidebar info */}
        <div className="lg:col-span-4 space-y-8">
          <div className="bg-brand-primary dark:bg-dark-card rounded-3xl p-8 text-white premium-depth relative overflow-hidden">
            <div className="relative z-10 space-y-6">
              <div>
                <h4 className="text-[10px] font-bold text-white/40 uppercase tracking-[0.3em] mb-2">Team Statistics</h4>
                <div className="flex items-baseline gap-2">
                  <span className="text-4xl font-bold">12</span>
                  <span className="text-sm font-medium opacity-40 uppercase tracking-widest">Tasks Completed</span>
                </div>
              </div>
              <div className="pt-6 border-t border-white/10">
                <div className="flex justify-between items-center text-[10px] font-bold uppercase tracking-widest mb-3">
                  <span className="text-white/40">Collaboration Index</span>
                  <span className="text-brand-accent-dim">High</span>
                </div>
                <div className="w-full h-1.5 bg-white/10 rounded-full overflow-hidden">
                  <div className="h-full bg-brand-accent-dim w-[85%]" />
                </div>
              </div>
            </div>
            <div className="absolute -right-8 -bottom-8 w-32 h-32 bg-brand-accent/20 rounded-full blur-3xl" />
          </div>

          <div className="bg-white dark:bg-dark-sidebar rounded-3xl p-8 border border-brand-border dark:border-dark-border premium-depth">
            <h4 className="text-[10px] font-bold text-brand-muted/50 uppercase tracking-widest mb-6 px-1">Quick Links</h4>
            <div className="space-y-3">
              {['Chat Room', 'Shared Drive', 'Peer Reviews', 'Task Board'].map(link => (
                <button key={link} onClick={() => setActivePanel(link)} className="w-full text-left p-4 rounded-xl border border-transparent hover:border-brand-border dark:hover:border-dark-border hover:bg-brand-bg-low dark:hover:bg-white/[0.02] transition-all flex items-center justify-between group">
                  <span className="text-sm font-bold text-brand-primary dark:text-dark-text group-hover:text-brand-accent transition-colors">{link}</span>
                  <span className="material-symbols-outlined text-[16px] text-brand-muted opacity-40 group-hover:opacity-100 transition-all">open_in_new</span>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Invite Peer Modal */}
      <AnimatePresence>
        {isInvitingPeer && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-6">
            <motion.div
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              className="absolute inset-0 bg-dark-bg/60 backdrop-blur-md"
              onClick={() => setIsInvitingPeer(false)}
            />
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.95, opacity: 0 }}
              className="relative bg-white dark:bg-dark-sidebar w-full max-w-md p-10 rounded-3xl premium-depth z-10"
            >
              <div className="flex justify-between items-center mb-6">
                <h3 className="font-headline text-2xl font-bold text-brand-primary dark:text-dark-text">Invite Peer</h3>
                <button onClick={() => setIsInvitingPeer(false)} className="text-brand-muted hover:text-brand-primary dark:hover:text-white flex items-center justify-center">
                  <span className="material-symbols-outlined">close</span>
                </button>
              </div>
              <form onSubmit={handleInvite} className="space-y-6">
                <div>
                  <label className="block text-[10px] font-bold text-brand-muted dark:text-dark-muted uppercase tracking-widest mb-2 px-1">Email or Name</label>
                  <input
                    type="text"
                    value={inviteEmail}
                    onChange={(e) => setInviteEmail(e.target.value)}
                    placeholder="peer@university.edu"
                    className="w-full bg-brand-bg-low dark:bg-white/5 border border-brand-border dark:border-dark-border rounded-xl px-4 py-3 text-sm dark:text-dark-text focus:ring-2 focus:ring-brand-accent outline-none"
                  />
                </div>
                <button type="submit" className="w-full btn-primary py-4 rounded-xl text-[10px] font-bold uppercase tracking-widest justify-center">Send Invite</button>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Generic Feature Panel Modal */}
      <AnimatePresence>
        {activePanel && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-6">
            <motion.div
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              className="absolute inset-0 bg-dark-bg/60 backdrop-blur-md"
              onClick={() => setActivePanel(null)}
            />
            <motion.div
              initial={{ scale: 0.95, opacity: 0, y: 20 }} animate={{ scale: 1, opacity: 1, y: 0 }} exit={{ scale: 0.95, opacity: 0, y: 20 }}
              className="relative bg-white dark:bg-dark-sidebar w-full max-w-2xl max-h-[80vh] flex flex-col rounded-3xl premium-depth z-10 overflow-hidden"
            >
              <div className="p-6 border-b border-brand-border dark:border-dark-border flex justify-between items-center bg-brand-bg-low dark:bg-white/5">
                <h3 className="font-headline text-xl font-bold text-brand-primary dark:text-dark-text flex items-center gap-3">
                  <span className="material-symbols-outlined text-brand-accent">
                    {activePanel === 'Chat Room' ? 'chat' : activePanel === 'Shared Drive' ? 'folder' : activePanel === 'Peer Reviews' ? 'rate_review' : 'task'}
                  </span>
                  {activePanel}
                </h3>
                <button onClick={() => setActivePanel(null)} className="p-2 rounded-full hover:bg-brand-border dark:hover:bg-white/10 text-brand-muted transition-colors flex items-center justify-center">
                  <span className="material-symbols-outlined text-xl">close</span>
                </button>
              </div>

              <div className="p-6 overflow-y-auto flex-1 bg-brand-bg dark:bg-dark-bg">
                {renderPanelContent()}
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default GroupPage;
