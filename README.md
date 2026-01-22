#  Role Based Project Management System Frontend  

A **secure, role-based, invite-only Project Management Frontend** built with **React.js, TypeScript, Redux Toolkit, and RTK Query**.  
This project demonstrates **real world admin workflows** such as **invite based user onboarding**, **role-based access control**, **and project management**, following modern frontend architecture and best practices.  

---

## Project Overview  

The Project Management frontend enables:  

- **Invite-only user registration** (no public sign-up)  
- **Authentication & role-based access control** (ADMIN, MANAGER, STAFF)  
- **Persisted login sessions** using cookie-based authentication  
- **Admin dashboard** for managing users, projects and invites  
- **Project management system** with role-based permissions  
- **Modern UI/UX** with protected routes, alerts, and responsive design  

This project is developed as part of a **Mid-Level Full Stack Developer Assessment Task**.

---

## Technology Stack  

### Frontend  
- **React.js** – component-based UI  
- **TypeScript** – type-safe frontend development  
- **Redux Toolkit + RTK Query** – state management & API handling  
- **React Router DOM (v6)** – routing and navigation  
- **Tailwind CSS** – modern and responsive styling  
- **SweetAlert2** – alerts & notifications  
- **React Icons** – UI icons  

### Backend (API)  
- **Node.js + Express.js**  
- **TypeScript**  
- **PostgreSQL + Prisma ORM**  
- **JWT (Access & Refresh Tokens)**  
- **Invite-Based Registration System**  

---

## Features  

✅ Invite-only user onboarding  
✅ Role-based authentication (ADMIN / MANAGER / STAFF)  
✅ Cookie-based JWT authentication  
✅ Persisted login on page refresh  
✅ Protected routes (PrivateRoute & AdminRoute)  
✅ Admin user management (role & status control)  
✅ Project creation, update & soft delete  
✅ RTK Query caching & auto refetch  
✅ Clean admin dashboard UI  
✅ Fully responsive design  

---

## Authentication & Authorization  

### Authentication  
- Users log in using email & password  
- Access & refresh tokens stored in **httpOnly cookies**  
- No JWT stored in localStorage or Redux  
- User session restored using `/auth/me`  

### Authorization  
- **PrivateRoute** → logged-in users only  
- **AdminRoute** → ADMIN users only  
- Unauthorized access triggers **SweetAlert error**  

--- 

**Backend Documentation:** [Role Based Project Management System API Docs](https://github.com/mdmasharafilhossain/Suhaas-Job-Task-Server)


## User Roles  

| Role | Permissions |
|------|------------|
ADMIN | Full access (users, invites, projects, audit logs) |
MANAGER | Create & view projects |
STAFF | Create & view projects |

---

## Setup Instructions  

### 1. Clone the repository  
```bash
git clone https://github.com/mdmasharafilhossain/Suhaas-Job-Task-Client
cd Suhaas-Job-Task-Client
```
### 2. Install dependencies  
```bash
npm install
```
### 3. Create .env.local file  
```bash
# add this after create .env.local file
VITE_API = http://localhost:5000
```
### 4. Start the development server
```bash
npm run dev
```

## Live URLs

- **Frontend:** [Role Based Project Management System Live](https://job-task-clinet.vercel.app)  
- **Backend:** [Role Based Project Management System Backend Live](https://job-task-eosin.vercel.app)  

## Demo Credentials

### Admin
- **Email:** admin@gmail.com  
- **Password:** Admin@1234  
  

##  Author

**Mohammad Mashrafil Hossain Mahi**  
Full Stack Developer

Email: mashrafilmahi007@gmail.com  





