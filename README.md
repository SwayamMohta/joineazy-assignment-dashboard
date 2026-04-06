# Assignment and Review Dashboard

### Frontend Intern Assignment for Joineazy

---

## Project Overview

This is a role-based assignment dashboard built as a frontend intern assignment. Students can track their assignments, mark completed parts, and submit their work. Admins can create, manage, and monitor assignments while tracking class-wide progress through an analytics page.

The application is fully responsive and built using React with Vite and Tailwind CSS. All data is stored using local storage so it works without a backend.

---

## Features

### Student Features

- View all assigned work in one place
- Track individual assignment progress using a checklist
- Mark specific parts of an assignment as completed
- Submit assignments after all parts are done
- Receive and view notifications for deadlines and updates
- Switch between light and dark mode

### Admin Features

- Create new assignments with title, subject, deadline, and description
- View per-student progress and submission status
- Delete assignments when needed
- Monitor class-wide completion rates
- Use the analytics page to see trends and subject breakdowns
- View a student performance leaderboard

### Common Features

- Responsive layout that works on desktop and mobile
- Light and dark theme toggle with smooth transitions
- Theme preference saved using local storage
- Search bar that filters assignments by keyword
- Filter chips to sort by status (All, Pending, Submitted)
- Settings page for profile preferences and data export

---

## Tech Stack

- React.js (with hooks)
- Vite (build tool and dev server)
- Tailwind CSS (utility-first styling with dark mode support)
- Framer Motion (page transitions and micro-animations)
- Google Fonts (Manrope for headings, Inter for body text)
- Material Symbols (icon library from Google)
- Local Storage (data persistence, no backend required)

---

## Folder Structure

```text
src/
  components/         # Reusable UI components (Navbar, Sidebar, Cards, Modals)
  pages/              # Full page views (Dashboard, Assignments, Analytics, etc.)
  data/               # Mock data and initial state
  App.jsx             # Root component with routing and global state
  index.css           # Global styles and design tokens
  main.jsx            # Entry point
```

---

## How to Run

Install dependencies:

```bash
npm install
```

Start the development server:

```bash
npm run dev
```

Build for production:

```bash
npm run build
```

The app runs at `http://localhost:5173` by default.

---

## Design Decisions

**Role-based pages**: The app has two distinct views (student and admin) because the requirements for each user type are very different. A student needs to track their own work, while an admin needs to manage the whole class. Keeping them separate made the UI cleaner and easier to maintain.

**Local storage instead of a backend**: The assignment brief did not require a backend, so I used local storage to save assignments, theme preferences, and notifications. This keeps the app fully functional without any server setup and makes it easy to run locally.

**Component-based structure**: Breaking the UI into smaller components (like AssignmentCard, SummaryCard, and NotificationsPanel) made the code easier to read and reuse. It also made debugging much simpler because each piece of UI has a clear responsibility.

**Dashboard-style layout**: A sidebar navigation with a fixed top navbar is a common pattern for application dashboards. I chose this because it gives easy access to all sections while keeping the main content area clean.

---

## Important Note

This project uses local storage for data persistence. If you clear your browser storage or use a private/incognito window, the assignment data will reset to the default mock values. This is expected behavior since there is no real backend.

---

## Future Improvements

- Connect to a real backend with a REST API or GraphQL
- Add a proper login and authentication system
- Store data in a database instead of local storage
- Add assignment grading with rubrics and scoring
- Implement real-time notifications using websockets
- Add a calendar view for assignment deadlines

---

## Author

Developed by Swayam Mohta

Frontend Intern Assignment for Joineazy
