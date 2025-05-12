# 🖥️ Home Inventory Frontend

This is the **frontend** for the Home Inventory app — a Progressive Web App (PWA) built with **React**, **TypeScript**, **TailwindCSS**, and **Vite**. It connects to the FastAPI backend and enables users to manage personal inventory items across categories, conditions, and locations.

---

## ⚙️ Tech Stack

- **Frontend Framework**: React + Vite
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **PWA**: Vite PWA plugin (coming soon)
- **API Communication**: REST via Axios or Fetch
- **Environment Management**: `.env.local` for API endpoints

---

## 🚀 Getting Started

### 1️⃣ Install Dependencies

```bash
cd frontend
npm install
```

### 2️⃣ Set up Environment Variables

Create a `.env.local` file in `frontend/`:

```env
VITE_API_URL=http://localhost:8000
```

> Update the URL to point to your backend (e.g. EC2 public IP or domain) when deployed.

### 3️⃣ Run the Dev Server

```bash
npm run dev
```

- Open your browser to [http://localhost:5173](http://localhost:5173)
- The app will auto-reload on changes.

---

## 📁 Project Structure (frontend/)

```
frontend/
├── public/             → Static assets (favicons, icons)
├── src/                → Source code
│   ├── components/     → Reusable UI components
│   ├── pages/          → Route-level pages (Dashboard, Login, etc.)
│   ├── styles/         → Tailwind or global CSS
│   └── main.tsx        → App entry point
├── .env.local          → API base URL and secrets (not committed)
├── tailwind.config.js  → TailwindCSS setup
├── vite.config.ts      → Vite and PWA configuration
```

---

## ✅ Features Implemented

- 🔐 Login & signup flow (JWT-based)
- 📋 Item list with categories, locations, and conditions
- 📦 Integration with FastAPI backend
- 🖼 Responsive layout using Tailwind
- 🧾 Form-based item creation
- 🧭 Navigation routing via `react-router`

---

## 🚧 Coming Soon

- 📱 PWA support and installability
- 🌐 Deployment (Netlify, Vercel, or EC2 via Nginx)
- 🖌️ UI polish with Tailwind enhancements
- 🧪 Unit and integration tests

---

## 🔗 Related Projects

- [Home Inventory API (Backend)](../README.md)

---

## 📄 License

MIT License © Sterling Loughmiller