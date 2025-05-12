# 🏠 Home Inventory API

A full-stack personal inventory management system built with **FastAPI**, **PostgreSQL**, and **SQLAlchemy**, designed to help users track household items, categories, storage locations, and item conditions.

This project serves as a demonstration of backend development, RESTful API design, database modeling, and modern Python practices — and is being actively deployed to **AWS EC2 + RDS**.

---

## 🔧 Tech Stack

- **Backend**: FastAPI, SQLAlchemy, Pydantic
- **Database**: PostgreSQL (via RDS)
- **Hosting**: EC2 + Nginx reverse proxy (in progress)
- **Auth**: JWT-based auth (coming soon)
- **Frontend**: React + Tailwind (PWA, linked repo coming soon)

---

## 📁 Project Structure

```
/app
├── api/         → FastAPI route definitions
├── crud/        → SQLAlchemy database interaction logic
├── models/      → Database schema definitions
├── schemas/     → Pydantic request/response validation
├── main.py      → App startup, router setup
/tests           → (To be added)
/.env             → Environment variables
```

---

## 🚀 Quickstart

### 1️⃣ Clone the repo

```bash
git clone https://github.com/yourusername/home-inventory-api.git
cd home-inventory-api
```

### 2️⃣ Set up the environment

```bash
python3 -m venv venv
source venv/bin/activate
pip install -r requirements.txt
```

### 3️⃣ Configure environment variables

Create a `.env` file in the root:

```env
DATABASE_URL=postgresql://<user>:<password>@<host>:5432/home_inventory?sslmode=require
SECRET_KEY=your_secret_key
```

### 4️⃣ Initialize the database

```bash
python scripts/seed_data.py
```

---

## 🌐 API Access

Once running with:

```bash
uvicorn app.main:app --reload
```

- [Swagger UI](http://localhost:8000/docs)
- [ReDoc](http://localhost:8000/redoc)

---

## ✅ Features

- 🧑‍💼 User management (admin seeding and auth in progress)
- 📦 Inventory items, categories, locations, and condition tracking
- ⚙️ Modular FastAPI architecture
- 🧪 API-ready for integration and testing
- 🐘 PostgreSQL support (local & cloud)

---

## 🚧 In Progress

- 🔐 JWT authentication
- 🖼️ React + Tailwind frontend (PWA)
- ☁️ EC2 + RDS deployment (backend complete, frontend in progress)
- 📸 Barcode scanning (planned feature)

---

## 📜 License

MIT License © Sterling Loughmiller