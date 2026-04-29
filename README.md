# Job Application Tracker

A full-stack web application for tracking job applications throughout the job search process.

---

## 📋 Table of Contents

- [Tech Stack](#tech-stack)
- [Features](#features)
- [Project Structure](#project-structure)
- [Environment Setup](#environment-setup)
- [Installation](#installation)
- [Running the Application](#running-the-application)
- [API Endpoints](#api-endpoints)
- [License](#license)

---

## 🛠 Tech Stack

### Backend

| Technology                                                  | Purpose            |
| ----------------------------------------------------------- | ------------------ |
| [Express.js](https://expressjs.com/)                        | Web framework      |
| [MongoDB](https://www.mongodb.com/)                         | Database           |
| [Redis](https://redis.io/)                                  | Caching layer      |
| [Joi](https://joi.dev/)                                     | Input validation   |
| [Winston](https://github.com/winstonjs/winston)             | Logging            |
| [Bcrypt](https://github.com/kelektiv/node.bcrypt.js)        | Password hashing   |
| [Cookie Parser](https://github.com/expressjs/cookie-parser) | Session management |

### Frontend

| Technology                              | Purpose                    |
| --------------------------------------- | -------------------------- |
| [Nuxt 4](https://nuxt.com/)             | Vue meta-framework         |
| [Vue 3](https://vuejs.org/)             | UI framework               |
| [Vuetify](https://vuetifyjs.com/)       | Material Design components |
| [Vue Router](https://router.vuejs.org/) | Client-side routing        |

---

## ✨ Features

### Authentication

- User registration with email/password
- Secure login with bcrypt password hashing
- Cookie-based session management
- Protected routes with auth middleware

### Job Application Management

- Create, read, update, and delete job applications
- Track application status (Applied, Interview, Offer, Rejected, etc.)
- Store company details, job titles, URLs, and notes
- Pagination for large datasets

### User Management

- Default admin user creation on setup

### Performance & Reliability

- Winston logging for debugging and monitoring
- Global error handling middleware
- Input validation with Joi

---

## 📂 Project Structure

```
2-job-application-tracker/
├── job-tracker-backend/
│   ├── config.js              # Environment configuration
│   ├── index.js               # Express app entry point
│   ├── setup.js               # Database initialization
│   ├── controllers/           # Request handlers
│   │   ├── auth.controller.js
│   │   ├── job.application.controller.js
│   │   └── user.controller.js
│   ├── middleware/            # Express middleware
│   │   ├── auth.middleware.js
│   │   └── error.middleware.js
│   ├── models/                # Mongoose schemas
│   │   ├── job.application.model.js
│   │   └── user.model.js
│   ├── repositories/         # Data access layer
│   │   ├── job.application.repository.js
│   │   └── user.repository.js
│   ├── routes/                # API route definitions
│   │   ├── auth.route.js
│   │   ├── job.application.route.js
│   │   └── user.route.js
│   ├── services/              # Business logic
│   │   ├── auth.service.js
│   │   └── user.service.js
│   └── utils/                 # Utility functions
│       ├── cache.util.js
│       ├── error.util.js
│       ├── hash-password.util.js
│       ├── logger.util.js
│       ├── paginate.util.js
│       └── redis-client.util.js
│
├── job-tracker-web/
│   ├── nuxt.config.ts         # Nuxt configuration
│   ├── app/
│   │   ├── app.vue            # Root component
│   │   ├── assets/            # Static assets
│   │   ├── components/        # Reusable Vue components
│   │   │   ├── ConfirmDelete.vue
│   │   │   ├── InputLabel.vue
│   │   │   ├── JobApplicationDetails.vue
│   │   │   └── JobApplicationForm.vue
│   │   ├── composables/      # Vue composables
│   │   │   ├── useApplication.js
│   │   │   ├── useUser.js
│   │   │   └── useUtils.js
│   │   ├── layouts/           # Page layouts
│   │   │   ├── default.vue
│   │   │   └── plain.vue
│   │   ├── middleware/       # Route guards
│   │   │   └── auth.ts
│   │   ├── pages/            # Route pages
│   │   │   ├── index.vue
│   │   │   ├── login.vue
│   │   │   ├── logout.vue
│   │   │   ├── signup.vue
│   │   │   └── [id]/
│   │   │       └── dashboard.vue
│   │   ├── plugins/          # Nuxt plugins
│   │   │   └── vuetify.ts
│   │   └── public/           # Public assets
│   │       └── robots.txt
│   └── package.json
│
└── sample-env.md              # Environment template
```

---

## ⚙️ Environment Setup

Copy the contents below into your `.env` file in the `job-tracker-backend/` directory:

```bash
## Backend

# MONGO DB Configuration
MONGO_URI=mongodb://localhost:27017
MONGO_DB=job_tracker

# Server Configuration
PORT=3000

# Redis Cloud Configuration
REDIS_HOST=your-redis-host.redis.cloud
REDIS_PASSWORD=your-redis-password
REDIS_PORT=12345

# Default Admin User
DEFAULT_USER_EMAIL=admin@example.com
DEFAULT_USER_PASSWORD=your-secure-password

## Frontend

# API URL (for production)
API=http://localhost:3000
PORT=3001
```

### Environment Variables Reference

| Variable                | Description               | Example                     |
| ----------------------- | ------------------------- | --------------------------- |
| `MONGO_URI`             | MongoDB connection string | `mongodb://localhost:27017` |
| `MONGO_DB`              | Database name             | `job_applications_tracker`  |
| `PORT`                  | Backend server port       | `3000`                      |
| `REDIS_HOST`            | Redis server host         | `redis.cloud`               |
| `REDIS_PASSWORD`        | Redis authentication      | (your password)             |
| `REDIS_PORT`            | Redis server port         | `12345`                     |
| `DEFAULT_USER_EMAIL`    | Initial admin email       | `admin@example.com`         |
| `DEFAULT_USER_PASSWORD` | Initial admin password    | (your password)             |
| `API`                   | Backend API URL           | `http://localhost:3000`     |
| `PORT`                  | Frontend dev server port  | `3001`                      |

---

## 📦 Installation

### Prerequisites

- [Node.js](https://nodejs.org/) (v18+)
- [MongoDB](https://www.mongodb.com/) (local or Atlas)
- [Redis](https://redis.io/) (local or cloud)

### Backend Setup

```bash
cd job-tracker-backend
npm install
```

### Frontend Setup

```bash
cd job-tracker-web
npm install
```

---

## 🚀 Running the Application

### Development Mode

**Backend:**

```bash
cd job-tracker-backend
npm run dev
```

The API will be available at `http://localhost:3000`

**Frontend:**

```bash
cd job-tracker-web
npm run dev
```

The application will be available at `http://localhost:3001`

### Production Mode

**Backend:**

```bash
cd job-tracker-backend
npm start
```

**Frontend:**

```bash
cd job-tracker-web
npm run build
npm run preview
```

---

## 🔌 API Endpoints

### Authentication

| Method | Endpoint             | Description         |
| ------ | -------------------- | ------------------- |
| `POST` | `/api/auth/register` | Register a new user |
| `POST` | `/api/auth/login`    | User login          |
| `POST` | `/api/auth/logout`   | User logout         |
| `GET`  | `/api/auth/me`       | Get current user    |

### Job Applications

| Method   | Endpoint                    | Description                       |
| -------- | --------------------------- | --------------------------------- |
| `GET`    | `/api/job-applications`     | List all applications (paginated) |
| `GET`    | `/api/job-applications/:id` | Get single application            |
| `POST`   | `/api/job-applications`     | Create new application            |
| `PUT`    | `/api/job-applications/:id` | Update application                |
| `DELETE` | `/api/job-applications/:id` | Delete application                |

### Users

| Method | Endpoint         | Description         |
| ------ | ---------------- | ------------------- |
| `GET`  | `/api/users/:id` | Get user by ID      |
| `PUT`  | `/api/users/:id` | Update user profile |

---

## 📄 License

MIT License
