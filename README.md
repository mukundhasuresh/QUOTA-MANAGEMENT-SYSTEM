# Quota-Limited Request Management System  

---

## Project Overview

The **Quota-Limited Request Management System** is a full-stack web application that allows users to submit a limited number of requests based on a predefined quota.  
The system strictly enforces quota limits at the backend level using persistent database storage.

Once a user’s quota is exhausted, further requests are **rejected before processing**, ensuring compliance with business rules.

---

## User Roles & Permissions

### USER
- Register and log in
- View remaining quota
- Submit requests
- Requests consume quota

### ADMIN
- Register and log in
- Assign quota limits to users
- View usage reports of all users

---

## Tech Stack

### Frontend
- React (Vite)
- JavaScript
- CSS (custom styling with hover effects)
- Axios
- React Router DOM

### Backend
- Node.js
- Express.js
- JWT Authentication
- PostgreSQL
- bcrypt
- dotenv

### Database
- PostgreSQL (persistent storage)

---

## Authentication & Authorization

- JWT-based authentication
- Role-based authorization (USER / ADMIN)
- Protected backend APIs
- Secure environment configuration using `.env`

---

## Business Rule (Critical)

> Requests are **rejected immediately** once the assigned quota is exhausted.  
> Quota validation occurs **before** request processing.  
> No in-memory counters are used — all quota tracking is database-driven.

---

## Database Schema

### Users Table
```sql
CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  name VARCHAR(100),
  email VARCHAR(100) UNIQUE NOT NULL,
  password TEXT NOT NULL,
  role VARCHAR(10) CHECK (role IN ('USER','ADMIN')),
  quota_limit INT DEFAULT 0,
  quota_used INT DEFAULT 0,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

```
## API Endpoints

### Authentication

| Method | Endpoint | Description |
|------|----------|-------------|
| POST | `/api/auth/register` | Register user or admin |
| POST | `/api/auth/login` | Login and receive JWT |

---

### User APIs

| Method | Endpoint | Description |
|------|----------|-------------|
| POST | `/api/requests` | Submit request (quota enforced) |
| GET | `/api/requests/quota` | View remaining quota |

---

### Admin APIs

| Method | Endpoint | Description |
|------|----------|-------------|
| PUT | `/api/admin/quota/:userId` | Assign quota to user |
| GET | `/api/admin/reports` | View usage reports |


### Live Deployment Links
- **Frontend:** https://<frontend-live-link>  
- **Backend:** https://<backend-live-link>  

---

## Key Learning Outcomes

- JWT authentication and authorization  
- Role-based access control  
- Database-driven quota enforcement  
- Secure backend development  
- Full-stack integration  

---

## Author 

**Name:** Mukundha Suresh 
