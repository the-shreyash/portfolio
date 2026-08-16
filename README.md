# Shreyash Yadav — Intelligent Portfolio & MERN Content Architecture

An immersive, cinematic portfolio website powered by a secure **MongoDB + Express + React + Node.js (MERN)** architecture. The frontend delivers high-fidelity animations, GSAP interactions, Lenis smooth scrolling, and dynamic portfolio content fetched from a protected MongoDB backend.

---

## 1. Architecture Overview

```text
                 PUBLIC VISITOR
                       │
                       ▼
                React Portfolio (Vite + GSAP + Tailwind CSS)
                       │
                       ▼
                Express REST API (Helmet, CORS, Rate Limiters)
                       │
                       ▼
                MongoDB Database (Mongoose Schemas & Indexes)

                 AUTHENTICATED ADMIN
                       │
                       ▼
                Admin CMS (/admin)
                       │
                       ▼
                JWT-Protected API (/api/admin/*)
                       │
                       ▼
                MongoDB Database (CRUD, Reorder, Draft/Publish)
```

- **React (Presentation Layer):** Immersive UI, cinematic hero, GSAP timelines, Lenis smooth scrolling, real-time fallbacks.
- **Express (API & Business Layer):** Public content REST endpoints, input sanitization, rate limiting, and centralized error handling.
- **MongoDB (Content Database):** Collections for Profile, Projects, Figma Designs, Certifications, Experience, Education, Skills, Contacts, and Admin Users.
- **JWT Authentication:** Cryptographically signed tokens with bcrypt password hashing for admin access.
- **Media Layer:** Publicly accessible optimized images (`/images/projects/`, `/images/figma/`, `/profile/`) with cloud storage readiness.
- **Security:** Strict separation of environment secrets (`backend/.env`), zero leakage to client bundle.

---

## 2. MongoDB Collections & Schemas

| Collection | Description | Key Fields |
| :--- | :--- | :--- |
| **`Profile`** | Public bio & contact info | `name`, `role`, `headline`, `bio`, `location`, `email`, `photoUrl`, `availability`, `githubUrl`, `linkedinUrl`, `domains` |
| **`Project`** | Projects & case studies | `title`, `slug`, `number`, `category`, `description`, `technologies`, `capabilities`, `theme`, `image`, `demoUrl`, `githubUrl`, `featured`, `published`, `order`, `caseStudy` |
| **`Design`** | Figma design showcases | `title`, `slug`, `category`, `description`, `image`, `figmaUrl`, `featured`, `published`, `order` |
| **`Certification`** | Credentials & awards | `title`, `issuer`, `type`, `url`, `published`, `order` |
| **`Experience`** | Work history & builder record | `role`, `company`, `type`, `startDate`, `endDate`, `description`, `achievements`, `technologies`, `published`, `order` |
| **`Education`** | Academic background | `institution`, `degree`, `startYear`, `endYear`, `location`, `description`, `published`, `order` |
| **`Skill`** | Structured skills & tech stack | `category`, `name`, `level`, `published`, `order` |
| **`ContactSubmission`** | Contact form inquiries | `name`, `email`, `company`, `projectType`, `budget`, `message`, `status` (`new`, `read`, `replied`) |
| **`AdminUser`** | Authenticated admin accounts | `username`, `email`, `password` (bcrypt hashed), `role`, `lastLogin` |

---

## 3. API Endpoints

### Public REST APIs
- `GET /health` — Service health check & timestamp
- `GET /api/portfolio` — Aggregated public payload (`profile`, `featuredProjects`, `otherProjects`, `designs`, `certifications`, `experience`, `education`, `skills`)
- `GET /api/profile` — Public profile details
- `GET /api/projects` — Published projects (supports `?featured=true`)
- `GET /api/projects/:slug` — Single published project by slug
- `GET /api/designs` — Published Figma designs
- `GET /api/certifications` — Published credentials
- `GET /api/experience` — Published work history
- `GET /api/education` — Published education
- `GET /api/skills` — Published skills
- `POST /api/contact` — Validated, rate-limited contact submission pipeline with optional email notification

### Protected Admin APIs (`/api/admin/*`)
- `POST /api/admin/login` — Admin login (returns signed JWT)
- `GET /api/admin/me` — Current admin session info
- `GET /api/admin/stats` — Content and message metrics
- `GET / PUT /api/admin/profile` — Profile update
- `GET / POST / PUT / DELETE /api/admin/projects` — Full project management (including draft items)
- `GET / POST / PUT / DELETE /api/admin/designs` — Figma designs management
- `GET / POST / PUT / DELETE /api/admin/certifications` — Certificates management
- `GET / POST / PUT / DELETE /api/admin/experience` — Experience management
- `GET / POST / PUT / DELETE /api/admin/education` — Education management
- `GET / POST / PUT / DELETE /api/admin/skills` — Skills management
- `GET /api/admin/contacts` — Inquiries list
- `PATCH /api/admin/contacts/:id/status` — Inquiries status update (`new` / `read` / `replied`)
- `DELETE /api/admin/contacts/:id` — Inquiries deletion

---

## 4. Environment Variables

### Backend (`backend/.env`)
```env
PORT=4000
NODE_ENV=development
MONGO_URI=mongodb://localhost:27017/portfolio
CORS_ORIGIN=http://localhost:5173,http://localhost:5174,http://127.0.0.1:5173
JWT_SECRET=replace_with_a_secure_long_random_jwt_secret_key_minimum_32_chars
ADMIN_USER=admin
ADMIN_PASSWORD=change_this_to_a_secure_admin_password
ADMIN_EMAIL=shs140326@gmail.com

# Optional Email Notification Configuration (Nodemailer)
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=465
EMAIL_USER=shs140326@gmail.com
EMAIL_PASSWORD=
CONTACT_RECEIVER=shs140326@gmail.com
```

### Frontend (`frontend/.env`)
```env
VITE_API_URL=http://localhost:4000
```

---

## 5. Local Setup & Quickstart

### 1. Install Dependencies
```bash
# Backend
cd backend
npm install

# Frontend
cd ../frontend
npm install
```

### 2. Seed & Migrate Database
Populate MongoDB with all initial projects, designs, certificates, profile information, and default admin user:
```bash
cd backend
npm run seed
```

### 3. Run Development Servers
```bash
# Terminal 1: Backend API (port 4000)
cd backend
npm run dev

# Terminal 2: Frontend App (port 5173)
cd frontend
npm run dev
```

Visit the website at `http://localhost:5173` and the CMS dashboard at `http://localhost:5173/admin`.

---

## 6. Security Notes

- **Zero Client Secret Exposure:** Sensitive tokens (`MONGO_URI`, `JWT_SECRET`, `ADMIN_PASSWORD`, `EMAIL_PASSWORD`) exist solely on the server.
- **Draft Content Isolation:** Un-published drafts (`published: false`) are strictly omitted from all public endpoints and only visible inside authenticated `/api/admin/*` sessions.
- **Contact Defense in Depth:** Contact route is protected with IP rate limiting, MongoDB operator sanitization (`$`, `.`), email format validation, and string length caps.
- **Graceful Fallbacks:** The frontend maintains a resilient local snapshot fallback cache, preventing crashes or blank states even during network disruptions.
