# 🛠 TODO: Home Inventory API

This file tracks the development progress and planned features for the Home Inventory 
---

## ✅ CORE FEATURES

- [ ] Build CRUD operations:
  - [ ] Items (`crud/item.py`)
  - [ ] Categories (`crud/category.py`)
  - [ ] Locations (`crud/location.py`)
  - [ ] Conditions (`crud/condition.py`)
  - [ ] Users (`crud/user.py`)

- [ ] Implement API routes (`api/`):
  - [ ] Items
  - [ ] Categories
  - [ ] Locations
  - [ ] Conditions
  - [ ] Users

- [ ] Wire up routers in `main.py`

---

## 💾 DATABASE + BACKEND SETUP

- [x] Set up SQLAlchemy models
- [x] Create Pydantic schemas
- [x] Write and run seed script (`scripts/seed_data.py`)
- [ ] Review DB for 1NF, 2NF, 3NF normalization
- [ ] Add indexes (e.g., foreign keys, barcode)

---

## 🧪 TESTING

- [ ] Write `scripts/test_query.py` to verify seeded data
- [ ] Add automated tests using `pytest`:
  - [ ] Item CRUD tests
  - [ ] User CRUD tests
  - [ ] Category CRUD tests

---

## 🔐 AUTHENTICATION + SECURITY

- [ ] Add JWT-based user authentication
- [ ] Restrict POST/PUT/DELETE endpoints to authenticated users
- [ ] Hash passwords with `passlib`

---

## 🚀 DEPLOYMENT + OPTIMIZATION

- [ ] Deploy backend to AWS (Beanstalk / EC2)
- [ ] Use `.env` for configs (DB, secret keys)
- [ ] Optimize DB queries; implement pagination
- [ ] Migrate to PostgreSQL (optional)

---

## 💡 BONUS FEATURES

- [ ] Add barcode scanning support (API-ready)
- [ ] Build React/Vue/Svelte PWA frontend
- [ ] Create analytics dashboard (e.g., items per category)

---

## 📝 DOCUMENTATION + PRACTICES

- [ ] Maintain `README.md` with clear instructions
- [ ] Write inline code comments where logic is non-trivial
- [ ] Use meaningful, frequent git commits
- [ ] (Optional) Set up GitHub project board or issues

---
