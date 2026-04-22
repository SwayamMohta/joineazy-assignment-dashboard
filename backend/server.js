const express = require('express');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

// In-memory data store for the mock backend
let assignments = [
  {
    id: '1',
    title: 'Design System Architecture',
    subject: 'Software Engineering',
    description: 'Create a comprehensive design system for the new academic portal.',
    deadline: '2026-05-01',
    driveLink: 'https://onedrive.live.com',
    type: 'group',
    status: 'pending',
    progress: 40,
    submissions: [
      { groupId: 'g1', groupName: 'Alpha Team', submitted: false, progress: 40 }
    ],
    subtasks: [
      { id: 'st1', title: 'Component Library', completed: true },
      { id: 'st2', title: 'Color Tokens', completed: false }
    ]
  },
  {
    id: '2',
    title: 'Neural Network Implementation',
    subject: 'Deep Learning',
    description: 'Implement a CNN from scratch using Python and NumPy.',
    deadline: '2026-04-25',
    driveLink: 'https://onedrive.live.com',
    type: 'individual',
    status: 'pending',
    progress: 0,
    submissions: [
      { studentId: 's1', studentName: 'Arjun Singh', submitted: false, progress: 0 }
    ],
    subtasks: [
      { id: 'st3', title: 'Data Preprocessing', completed: false },
      { id: 'st4', title: 'Model Architecture', completed: false }
    ]
  }
];

let courses = [
  { id: 'c1', title: 'Software Engineering', code: 'CS301', students: 45, image: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=500&q=80' },
  { id: 'c2', title: 'Deep Learning', code: 'CS405', students: 30, image: 'https://images.unsplash.com/photo-1620712943543-bcc4688e7485?w=500&q=80' }
];

// --- Routes ---

// Get all assignments
app.get('/api/assignments', (req, res) => {
  res.json(assignments);
});

// Create new assignment
app.post('/api/assignments', (req, res) => {
  const newAssignment = {
    ...req.body,
    id: `a-${Date.now()}`,
    status: 'pending',
    progress: 0,
    submissions: [],
    subtasks: req.body.subtasks || []
  };
  assignments.unshift(newAssignment);
  res.status(201).json(newAssignment);
});

// Update assignment
app.put('/api/assignments/:id', (req, res) => {
  const { id } = req.params;
  const index = assignments.findIndex(a => a.id === id);
  if (index !== -1) {
    assignments[index] = { ...assignments[index], ...req.body };
    res.json(assignments[index]);
  } else {
    res.status(404).json({ message: 'Assignment not found' });
  }
});

// Delete assignment
app.delete('/api/assignments/:id', (req, res) => {
  const { id } = req.params;
  assignments = assignments.filter(a => a.id !== id);
  res.json({ message: 'Deleted successfully' });
});

// Get courses
app.get('/api/courses', (req, res) => {
  res.json(courses);
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Backend server running on http://localhost:${PORT}`);
});
