# Loving Source Logistics — MERN Stack Website

Professional courier and logistics website with full admin panel built in MERN stack.

---

## Project Structure

```
loving-source-logistics/
├── backend/          → Node.js + Express + MongoDB API
└── frontend/         → React + Tailwind CSS (Public site + Admin panel)
```

---

## Tech Stack

| Layer     | Technology                              |
|-----------|-----------------------------------------|
| Frontend  | React 18, Tailwind CSS, Framer Motion   |
| Backend   | Node.js, Express.js                     |
| Database  | MongoDB Atlas                           |
| Images    | Cloudinary                              |
| Auth      | JWT (JSON Web Tokens)                   |
| Email     | Nodemailer (Gmail SMTP)                 |

---

## Features

### Public Website
- Animated Hero section with live stats (CountUp)
- Services section (loaded from database)
- Why Choose Us section
- Industries We Serve
- Testimonials slider (Swiper)
- Gallery page
- Request a Quote form (saves to DB + email notification)
- Contact page
- Fully responsive (mobile first)

### Admin Panel (`/admin`)
- Secure login (JWT protected)
- Dashboard with stats and recent quotes
- Hero section editor (headline, stats, background image)
- Services manager (add/edit/delete with Cloudinary image upload)
- Gallery manager (upload, show/hide, delete)
- Quote Requests (view, update status, admin notes, pagination)
- Testimonials manager (add/edit/delete with photo upload)
- Site Settings (business info, social links, SEO, logo upload)

---

## Setup Instructions

### 1. Clone / extract the project

```bash
cd loving-source-logistics
```

### 2. Install all dependencies

```bash
npm run install:all
```

### 3. Configure Backend Environment

```bash
cd backend
cp .env.example .env
```

Edit `.env` and fill in:
- `MONGO_URI` — Your MongoDB Atlas connection string
- `JWT_SECRET` — Any long random string
- `CLOUDINARY_CLOUD_NAME`, `CLOUDINARY_API_KEY`, `CLOUDINARY_API_SECRET` — From cloudinary.com
- `EMAIL_USER`, `EMAIL_PASS` — Gmail credentials (use App Password)
- `ADMIN_EMAIL`, `ADMIN_PASSWORD` — Your admin login credentials

### 4. Run in Development

From the root folder:

```bash
npm run dev
```

This starts both:
- Backend at `http://localhost:5000`
- Frontend at `http://localhost:3000`

### 5. Access Admin Panel

```
http://localhost:3000/admin/login
```

Use the email and password you set in `.env`:
```
ADMIN_EMAIL=admin@lovingsourcelogistics.com
ADMIN_PASSWORD=Admin@123456
```

---

## Environment Variables Reference

### Backend `.env`

```env
PORT=5000
MONGO_URI=mongodb+srv://...
JWT_SECRET=your_secret_key
JWT_EXPIRE=7d

CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret

EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_USER=your_gmail@gmail.com
EMAIL_PASS=your_app_password
EMAIL_FROM=info@lovingsourcelogistics.com

ADMIN_EMAIL=admin@lovingsourcelogistics.com
ADMIN_PASSWORD=Admin@123456
```

### Frontend `.env` (optional)

```env
REACT_APP_API_URL=http://localhost:5000/api
```

---

## API Endpoints

| Method | Endpoint                    | Auth | Description              |
|--------|-----------------------------|------|--------------------------|
| GET    | /api/hero                   | No   | Get hero content         |
| PUT    | /api/hero                   | Yes  | Update hero              |
| GET    | /api/services               | No   | Get active services      |
| GET    | /api/services/admin         | Yes  | Get all services         |
| POST   | /api/services               | Yes  | Create service           |
| PUT    | /api/services/:id           | Yes  | Update service           |
| DELETE | /api/services/:id           | Yes  | Delete service           |
| GET    | /api/gallery                | No   | Get active gallery       |
| POST   | /api/gallery                | Yes  | Upload image             |
| DELETE | /api/gallery/:id            | Yes  | Delete image             |
| POST   | /api/quotes                 | No   | Submit quote request     |
| GET    | /api/quotes                 | Yes  | Get all quotes           |
| PUT    | /api/quotes/:id/status      | Yes  | Update quote status      |
| GET    | /api/testimonials           | No   | Get active testimonials  |
| POST   | /api/testimonials           | Yes  | Add testimonial          |
| GET    | /api/settings               | No   | Get site settings        |
| PUT    | /api/settings               | Yes  | Update settings          |
| POST   | /api/auth/login             | No   | Admin login              |
| GET    | /api/auth/me                | Yes  | Get current user         |

---

## Deployment

### Backend (Render / Railway / VPS)
1. Set all environment variables in your hosting dashboard
2. Set start command: `node server.js`
3. Set `CLIENT_URL` env to your frontend URL

### Frontend (Vercel / Netlify)
1. Set `REACT_APP_API_URL` to your backend URL
2. Build command: `npm run build`
3. Output directory: `build`

---

## Cloudinary Setup

1. Create a free account at [cloudinary.com](https://cloudinary.com)
2. Copy your Cloud Name, API Key, and API Secret from the dashboard
3. Add them to your backend `.env`

All images uploaded through the admin panel will be stored in Cloudinary under the `loving-source-logistics/` folder, organized by type (services, gallery, hero, testimonials, branding).

---

## Support

Built by **BizzOne Digital**
Email: info@bizzoneDigital.com
