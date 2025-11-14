# Student Quizzes & Announcements Backend

>A minimal Express + TypeScript backend that provides CRUD APIs for announcements and quizzes, plus a simple auth route and Swagger API docs.

## Tech stack

- Node.js + TypeScript
- Express
- MongoDB (via Mongoose)
- Swagger (swagger-autogen + swagger-ui-express)

## Project structure (important folders)

- `src/` — TypeScript source
- `src/routes` — route definitions (`auth`, `annoucments`, `quizzes`)
- `src/controllers` — request handlers
- `src/models` — Mongoose models
- `src/config/database.ts` — MongoDB connection

## Prerequisites

- Node.js (>= 16 recommended)
- npm or yarn
- A running MongoDB instance and its connection URI

## Environment

Create a `.env` file in the project root with the following variables (example):

```
PORT=3000
MONGO_URI=mongodb://localhost:27017/your-db-name
SECERT_KEY=your_jwt_secret_here
NODE_ENV=development
```

Notes:
- The code expects `MONGO_URI` for MongoDB and `SECERT_KEY` (note the current spelling in code) for signing JWTs.
- `NODE_ENV` triggers development logging (morgan) when set to `development`.

## Scripts

Available npm scripts (from `package.json`):

- `npm run dev` — start development server with `ts-node` + `nodemon`
- `npm run build` — compile TypeScript to `dist/`
- `npm start` — run compiled code (`node dist/index.js`)
- `npm run prod` — build then start
- `npm run swagger` — generate/run swagger definitions (`ts-node src/swagger.ts`)

Examples (PowerShell):

```powershell
npm install
npm run dev
```

To run the production build:

```powershell
npm run build; npm start
```

## API Endpoints

The app mounts routes under `/api`.

- Auth
  - `POST /api/auth/login` — returns a dummy user and a JWT token (signed with `SECERT_KEY`).

- Announcements (CRUD)
  - `GET /api/announcments` — list all announcements
  - `POST /api/announcments` — create announcement
  - `GET /api/announcments/:id` — get single announcement
  - `PUT /api/announcments/:id` — update announcement
  - `DELETE /api/announcments/:id` — delete announcement

  Important: the route path currently used in the code is spelled `/api/announcments` (missing the second "e"). If you expect `/api/announcements`, update the route names in `src/app.ts` and `src/routes/annoucmentsRoute.ts`.

- Quizzes (CRUD)
  - `GET /api/quizzes` — list quizzes
  - `POST /api/quizzes` — create quiz
  - `GET /api/quizzes/:id` — get single quiz
  - `PUT /api/quizzes/:id` — update quiz
  - `DELETE /api/quizzes/:id` — delete quiz

- Swagger UI
  - `GET /api-docs` — interactive API docs (served from `src/swagger-output.json`)

## Database

The app uses Mongoose to connect to MongoDB. Ensure `MONGO_URI` is set and reachable before starting the server.

## Development notes

- The `auth` route currently returns a dummy user and a JWT token using `SECERT_KEY` (see `src/routes/auth.ts`). Replace with real auth logic for production use.
- Validation is implemented using `joi` in some places; see `src/middleware/validate.ts` for details.
- Error handling middleware is in `src/middleware/errorHandler.ts`.

## Testing

There are no automated tests included for the backend in this project; use tools like Postman or curl to exercise the endpoints locally.




