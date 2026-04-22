// ── Mock Data: JoinEazy Assignment & Review Dashboard ─────────────────────────

export const COURSES = [
  { 
    id: 'c1', 
    title: 'Software Engineering', 
    code: 'CS301', 
    students: 45, 
    instructor: 'Dr. Sarah Jenkins', 
    image: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?q=80&w=400&auto=format&fit=crop',
    description: 'Principles and practices of software development, including lifecycle models, requirements engineering, and design.'
  },
  { 
    id: 'c2', 
    title: 'Deep Neural Networks', 
    code: 'AI402', 
    students: 30, 
    instructor: 'Prof. Michael Chen', 
    image: 'https://images.unsplash.com/photo-1620712943543-bcc4688e7485?q=80&w=400&auto=format&fit=crop',
    description: 'Advanced topics in neural networks, focusing on deep learning architectures like CNNs, RNNs, and Transformers.'
  },
  { 
    id: 'c3', 
    title: 'Usability Engineering', 
    code: 'HCI201', 
    students: 55, 
    instructor: 'Dr. Emily Watson', 
    image: 'https://images.unsplash.com/photo-1586717791821-3f44a563eb4c?q=80&w=400&auto=format&fit=crop',
    description: 'Human-computer interaction principles, user-centered design, and formal usability evaluation methods.'
  },
];

export const GROUPS = [
  { 
    id: 'g1', 
    name: 'Neural Pioneers', 
    courseId: 'c2', 
    leaderId: 's1', 
    members: ['s1', 's2'], 
    status: 'active',
    inviteCode: 'NP-123'
  },
];

export const MOCK_USERS = [
  { 
    id: 's1', 
    name: 'Arjun Singh', 
    email: 'arjun@university.edu', 
    role: 'student', 
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Arjun',
    groupId: 'g1'
  },
  { 
    id: 's2', 
    name: 'Ananya Sharma', 
    email: 'ananya@university.edu', 
    role: 'student', 
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Ananya',
    groupId: 'g1'
  },
  { 
    id: 's3', 
    name: 'Rohan Gupta', 
    email: 'rohan@university.edu', 
    role: 'student', 
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Rohan',
    groupId: null
  },
  { 
    id: 'p1', 
    name: 'Dr. Sarah Jenkins', 
    email: 'sarah.j@university.edu', 
    role: 'professor', 
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah'
  },
];

export const INITIAL_ASSIGNMENTS = [
  {
    id: '1',
    courseId: 'c1',
    title: 'Agile Process Model Analysis',
    subject: 'Software Engineering',
    deadline: '2026-05-10',
    status: 'pending',
    progress: 33,
    type: 'individual',
    driveLink: 'https://onedrive.live.com/sample1',
    description: 'Analyze the trade-offs between Scrum and Kanban in a startup environment. Provide a 2000-word comparative report with real-world case studies.',
    subtasks: [
      { id: '1-1', title: 'Problem Statement', completed: true },
      { id: '1-2', title: 'Research / Literature Review', completed: true },
      { id: '1-3', title: 'Implementation / Coding', completed: false },
      { id: '1-4', title: 'Testing', completed: false },
      { id: '1-5', title: 'Documentation / Report', completed: false },
      { id: '1-6', title: 'Final Submission', completed: false },
    ],
    submissions: [
      { studentId: 's1', studentName: 'Arjun Singh', submitted: false, progress: 33, timestamp: null },
      { studentId: 's2', studentName: 'Ananya Sharma', submitted: false, progress: 45, timestamp: null },
    ],
    feedback: null,
    grade: null,
  },
  {
    id: '2',
    courseId: 'c2',
    title: 'CNN Architecture Implementation',
    subject: 'Deep Neural Networks',
    deadline: '2026-05-15',
    status: 'pending',
    progress: 50,
    type: 'group',
    driveLink: 'https://onedrive.live.com/sample2',
    description: 'Build a CNN from scratch using NumPy to classify CIFAR-10 images with at least 70% validation accuracy.',
    subtasks: [
      { id: '2-1', title: 'Data Preprocessing', completed: true },
      { id: '2-2', title: 'Forward Propagation', completed: true },
      { id: '2-3', title: 'Backpropagation', completed: true },
      { id: '2-4', title: 'Optimization Loop', completed: false },
    ],
    submissions: [
      { groupId: 'g1', groupName: 'Neural Pioneers', submitted: false, timestamp: null },
    ],
    feedback: null,
    grade: null,
  },
  {
    id: '3',
    courseId: 'c3',
    title: 'Heuristic Evaluation: Blinkit App',
    subject: 'Usability Engineering',
    deadline: '2026-04-20',
    status: 'submitted',
    progress: 100,
    type: 'individual',
    driveLink: 'https://onedrive.live.com/sample3',
    description: 'Perform a detailed heuristic evaluation of a popular e-commerce application using Nielsen\'s 10 heuristics.',
    subtasks: [
      { id: '3-1', title: 'Problem Statement', completed: true },
      { id: '3-2', title: 'Evaluation', completed: true },
      { id: '3-3', title: 'Final Report', completed: true },
    ],
    submissions: [
      { studentId: 's1', studentName: 'Arjun Singh', submitted: true, progress: 100, timestamp: '2026-04-18T10:30:00Z' },
    ],
    feedback: 'Excellent work! Clear analysis with well-documented findings.',
    grade: 'A',
  },
];

export const CURRENT_USER = MOCK_USERS[0]; // Default to Arjun (Student)

export const ALL_STUDENTS = MOCK_USERS.filter(u => u.role === 'student');

export const MOCK_NOTIFICATIONS = [
  { id: 'n1', type: 'success', title: 'Submission Confirmed', body: 'Heuristic Evaluation has been submitted.', time: '2 hours ago', read: false },
  { id: 'n2', type: 'warning', title: 'Deadline Approaching', body: 'Agile Process Model Analysis is due in 2 days.', time: '5 hours ago', read: false },
];

export const FAQ_ITEMS = [
  {
    q: 'How do I submit an assignment?',
    a: 'Navigate to your assignment card, upload your work to the provided OneDrive link, then click "Mark as Submitted" and confirm in the modal.',
  },
  {
    q: 'How does role switching work?',
    a: 'In Round 2, you can switch between Professor and Student roles in Settings to see the different dashboards.',
  },
  {
    q: 'How do group assignments work?',
    a: 'For group assignments, only the Group Leader can acknowledge the final submission. Once acknowledged, it marks as submitted for all members.',
  },
];
