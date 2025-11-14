# Student Dashboard Application

A full-stack student dashboard application built with React, TypeScript, Redux, Material UI, and Supabase, displaying quizzes and announcements for the current semester.

## Features

- **Authentication System**: Simple login/logout functionality with protected routes using Higher Order Components
- **Responsive Design**: Fully responsive layout that adapts to all screen sizes (mobile, tablet, desktop)
- **Redux State Management**: Centralized state management for authentication, quizzes, and announcements
- **Material UI Components**: Modern, beautiful UI using Material UI component library
- **Internationalization (i18n)**: Ready for multi-language support using react-i18next
- **RESTful API**: Full CRUD operations for quizzes and announcements via Supabase Edge Functions
- **Testing**: Comprehensive unit and integration tests using Vitest and React Testing Library
- **Database**: PostgreSQL database with Supabase, including Row Level Security policies

## Tech Stack

### Frontend
- **React 18** - UI library
- **TypeScript** - Type safety
- **Redux Toolkit** - State management
- **Material UI** - Component library
- **react-i18next** - Internationalization
- **Vite** - Build tool
- **Vitest** - Testing framework

### Backend
- **Supabase** - Backend as a Service
- **PostgreSQL** - Database
- **Edge Functions** - Serverless API endpoints

## Project Structure

```
src/
├── components/          # React components
│   ├── HomePage.tsx
│   ├── Dashboard.tsx
│   ├── Sidebar.tsx
│   ├── QuizzesList.tsx
│   ├── AnnouncementsList.tsx
│   └── __tests__/      # Component tests
├── store/              # Redux store
│   ├── index.ts
│   ├── hooks.ts
│   └── slices/
│       ├── authSlice.ts
│       ├── quizzesSlice.ts
│       ├── announcementsSlice.ts
│       └── __tests__/  # Store tests
├── hoc/                # Higher Order Components
│   ├── requireAuth.tsx
│   └── useNavigate.ts
├── i18n/               # Internationalization
│   ├── index.ts
│   └── locales/
│       └── en.json
└── test/               # Test configuration
    └── setup.ts

supabase/
└── functions/          # Edge Functions
    ├── announcements/
    └── quizzes/
```

## Installation

1. Clone the repository
2. Install dependencies:
```bash
npm install
```

3. The environment variables are already configured in `.env`

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm test` - Run tests
- `npm run test:watch` - Run tests in watch mode
- `npm run lint` - Lint code
- `npm run typecheck` - Type check without emitting files

## Key Implementation Details

### Authentication
- Simple login/logout mechanism without username/password
- Authentication state persisted in localStorage
- `requireAuth` HOC protects the Dashboard route
- Redirects unauthenticated users to home page

### State Management
- Redux Toolkit for efficient state management
- Separate slices for auth, quizzes, and announcements
- Async thunks for API calls
- TypeScript types for type-safe Redux usage

### API Integration
- Supabase Edge Functions for all CRUD operations
- RESTful API endpoints:
  - `GET /functions/v1/quizzes` - Fetch all quizzes
  - `POST /functions/v1/quizzes` - Create quiz
  - `PUT /functions/v1/quizzes/:id` - Update quiz
  - `DELETE /functions/v1/quizzes/:id` - Delete quiz
  - Similar endpoints for announcements

### Database Schema

**Quizzes Table:**
- id (uuid, primary key)
- title (text)
- description (text)
- due_date (timestamptz)
- total_points (integer)
- duration_minutes (integer)
- created_at, updated_at (timestamptz)
- published (boolean)

**Announcements Table:**
- id (uuid, primary key)
- title (text)
- content (text)
- created_at, updated_at (timestamptz)
- published (boolean)

### Responsive Design
- Mobile-first approach
- Sidebar converts to drawer on mobile devices
- Grid layout adapts to screen size
- Touch-friendly interactions

### Internationalization
- i18next configuration ready for multiple languages
- Translation keys defined in JSON files
- Easy to add new languages by creating new locale files

### Testing
- Unit tests for Redux slices
- Component tests for key UI elements
- Integration tests for user interactions
- All tests passing with good coverage

## Code Quality

- **Clean Code**: Follows best practices and design patterns
- **Modular Architecture**: Reusable components with single responsibility
- **Type Safety**: Full TypeScript coverage
- **ESLint**: Code linting for consistency
- **Component Reusability**: Maximum code reuse

## Custom Code

All application code was written specifically for this project, including:
- All React components and their logic
- Redux store configuration and slices
- Supabase Edge Functions
- Database migrations and schema
- Test suites
- HOC implementation
- i18n configuration

The only boilerplate used is from the initial Vite + React + TypeScript template configuration.

## Future Enhancements

- Add more languages for i18n
- Implement real authentication with Supabase Auth
- Add quiz submission and grading functionality
- Implement announcement notifications
- Add search and filter capabilities
- Dark mode support
