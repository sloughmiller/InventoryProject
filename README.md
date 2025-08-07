# 🏠 Home Inventory APP

A full-stack, secure inventory management platform with a FastAPI backend and React PWA frontend. Built to help users manage categorized household items across multiple inventories, the project demonstrates professional backend API architecture, secure token-based authentication, and clean, responsive frontend design using Tailwind CSS.

## Backend Highlights (FastAPI)

* RESTful API design using FastAPI
* OAuth2-compatible JWT login system (OAuth2PasswordRequestForm)
* Secure password hashing and verification (bcrypt)
* Fully modular route + schema + crud structure
* UUID-based routing for secure resource access
* Scoped multi-inventory access per user
* SQLAlchemy ORM + PostgreSQL for persistence
* Alembic migrations for schema evolution
* Deployed via Render with live PostgreSQL backend

---

## Frontend Highlights (React PWA)

* Vite + React + TypeScript
* Responsive Tailwind-styled UI
* Modular card-based layout with reusable components
* Centralized Auth & Inventory contexts
* API abstraction layer per domain (items, categories, etc.)
* Modal-based forms with live updates
* Deployed as a PWA on Netlify

---

## 🔧 Tech Stack

* **Backend**: FastAPI, SQLAlchemy, Pydantic
* **Database**: PostgreSQL (via Render)
* **Auth**: OAuth2 + JWT (token-based authentication)
* **Frontend**: React + Vite + TypeScript + Tailwind CSS (PWA)
* **Hosting**: Backend & DB on Render, Frontend on Netlify

---

## 📁 Project Structure

```

/project-root
    ├── app/              → FastAPI backend
    ├── frontend/         → React + Tailwind frontend (PWA)
    ├── alembic/          → Migrations
    ├── scripts/          → Seeding and utility scripts

```

---

## ✅ Core Features

* 🔐 Secure user authentication (OAuth2 + JWT)
* 🧾 Inventory scoping: users can only access their own inventories
* 📦 Full CRUD for items, categories, and locations
* 📋 Modular FastAPI architecture with Pydantic & Alembic
* 💅 Tailwind-styled React PWA frontend
* 🔄 Modal-based forms for fast UX
* 🐘 PostgreSQL database on Render

---

## 🚧 Planned Improvements

* 👥 Shared inventories with role-based access (admin/viewer)
* 📊 Item condition field frontend integration
* 📸 Barcode scanning support

---

## 🌐 Live Demo

> ⚠️ Backend may take 30–60 seconds to wake up if idle

* 🧩 Frontend: [https://your-inventory-app.netlify.app](https://your-inventory-app.netlify.app)
* 🔗 API Docs: [https://your-api-url.onrender.com/docs](https://your-api-url.onrender.com/docs)

---

## 📜 License

MIT License © Sterling Loughmiller