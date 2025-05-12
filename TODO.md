# 🛠 TODO: Home Inventory API

This file tracks the development progress and planned features for the Home Inventory

---

## ✅ CORE FEATURES

---

- [x] Build CRUD operations:
  - [x] Activity (`crud/activity.py`)
  - [x] Categories (`crud/category.py`)
  - [x] Items(`crud/items.py`)
  - [x] Locations (`crud/location.py`)
  - [x] Conditions (`crud/condition.py`)
  - [x] Users (`crud/user.py`)

- [x] Implement API routes (`api/`):
  - [x] Activity
  - [x] Items
  - [x] Categories
  - [x] Locations
  - [x] Conditions
  - [x] Users

- [x] Wire up routers in `main.py`

---

## 💾 DATABASE + BACKEND SETUP

---

- [x] Set up SQLAlchemy models
- [x] Create Pydantic schemas
- [x] Write and run seed script (`scripts/seed_data.py`)
- [x] Review DB for 1NF, 2NF, 3NF normalization
- [ ] Add indexes (e.g., foreign keys, barcode)

---

## 🧪 TESTING

---

- [x] Write `scripts/test_query.py` to verify seeded data
- [x] Add automated tests using `pytest`:
  - [x] Item CRUD tests
  - [x] User CRUD tests
  - [x] Category CRUD tests

---

## 🔐 AUTHENTICATION & SECURITY

- [x] OAuth2PasswordRequestForm login route
- [x] JWT token generation with `jose`
- [x] Token-based `get_current_user` dependency
- [x] Password hashing using `passlib[bcrypt]`
- [x] `@app.middleware` for logging requests
- [ ] Add role-based auth (admin vs user)
- [ ] Limit protected routes by role

---

## 🌐 FRONTEND (React + Vite + TS)


- [x] Login screen
- [x] Signup screen
- [x] Dashboard with:
  - [x] UserProfile (GET /users/me)
  - [x] UserList (GET /users)
- [x] Central AuthContext for token handling
- [x] Auto-redirects after login
- [x] Frontend env config via `.env.local`
- [ ] Tailwind CSS integration
- [ ] Toast feedback (login errors, etc.)
- [ ] Item/category creation forms

---

## 🚀 DEPLOYMENT & OPTIMIZATION

- [ ] Deploy backend to AWS (Beanstalk / EC2)
- [ ] Use `.env` for configs (DB, secret keys)
- [ ] Optimize DB queries; implement pagination
- [ ] Migrate to PostgreSQL (optional)
- [ ] Deploy backend to EC2
- [ ] PostgreSQL + RDS migration
- [ ] Frontend hosted via Netlify or CloudFront
- [ ] Move `SECRET_KEY` and credentials to SSM / .env.prod

---

## 📦 EXTRA FEATURES

- [ ] Barcode scanning integration (React Native / browser)
- [ ] Image upload per item
- [ ] Audit history for item changes
- [ ] Analytics dashboard

---

## 📝 DOCUMENTATION + PRACTICES

- [ ] Maintain `README.md` with clear instructions
- [ ] Write inline code comments where logic is non-trivial
- [ ] Use meaningful, frequent git commits
- [ ] (Optional) Set up GitHub project board or issues

---
