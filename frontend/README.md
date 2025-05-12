# 🖥️ Home Inventory Frontend

This is the **frontend** application for the [Home Inventory System](../README.md), a full-stack project built to help users manage and track personal inventory — including items, categories, storage locations, and item conditions.

The frontend is a **PWA-ready** React + TypeScript application styled with **TailwindCSS**, communicating with a **FastAPI backend** via secure RESTful APIs.

---

## ⚙️ Tech Stack

- **Framework**: React (via Vite)
- **Language**: TypeScript
- **Styling**: TailwindCSS
- **Routing**: React Router
- **API Layer**: Axios (with token-based interceptors)
- **State Management**: React Context (AuthContext)
- **Environment Config**: `.env.local`
- **PWA Support**: Vite PWA Plugin (coming soon)

---

## 🚀 Getting Started

### 1️⃣ Install Dependencies

```bash
cd frontend
npm install
```

### 2️⃣ Create `.env.local`

```env
VITE_API_URL=http://localhost:8000
```

> Replace with deployed backend URL (e.g. EC2 instance or domain) when ready.

### 3️⃣ Start Development Server

```bash
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

---

## 🧭 App Structure

```
frontend/
├── public/             → Static assets (icons, manifest)
├── src/
│   ├── api/            → Axios instance and auth setup
│   ├── components/     → Reusable UI components
│   ├── context/        → Global state (e.g., auth)
│   ├── pages/          → Route-level components (Dashboard, Items, etc.)
│   ├── styles/         → Tailwind/global CSS
│   └── main.tsx        → App root + routing
├── .env.local          → Local dev config
├── tailwind.config.js  → Tailwind setup
├── vite.config.ts      → Vite + PWA config
```

---

## ✅ Features Implemented

- 🔐 JWT login + signup flow with `AuthContext`
- 🛡️ Route protection via `ProtectedRoute.tsx`
- 📦 View + manage items with location/category IDs
- ✏️ Form-based item creation with validation
- 🧭 Dashboard with navigation links
- ⚙️ Live API ping to check backend status
- 📱 Mobile-friendly layout via Tailwind

---

## 🚧 Coming Soon

- ✅ Token refresh and logout UI improvements
- 📱 Full PWA installability
- 🌐 Netlify / Vercel deployment configs
- 🖌️ Tailwind polish + dark mode
- 🧪 Unit & integration testing

---

## 🔗 Related Projects

- [Backend API - FastAPI, PostgreSQL](../README.md)

---

## 📸 Screenshots

_Add screenshots of the login, dashboard, item form, etc. here._

---

## 📄 License

MIT License © Sterling Loughmiller
