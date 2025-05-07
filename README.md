# 🏠 Home Inventory API

A personal home inventory management system built with **FastAPI**, **SQLAlchemy**, and **Pydantic** — designed to help track items, categories, locations, and conditions.  
This project also serves as a showcase of backend development, database management, and Python ecosystem skills.

---

## 📦 Project Structure




```
/app
├── /api
│ ├── category.py → FastAPI routes for categories
│ ├── condition.py → FastAPI routes for conditions
│ ├── item.py → FastAPI routes for items
│ └── location.py → FastAPI routes for locations
│
├── /crud
│ ├── category.py → Database operations (CRUD) for categories
│ ├── condition.py → CRUD logic for conditions
│ ├── item.py → CRUD logic for items
│ └── location.py → CRUD logic for locations
│
├── /models
│ ├── category.py → SQLAlchemy database model for Category
│ ├── condition.py → SQLAlchemy model for Condition
│ ├── item.py → SQLAlchemy model for Item
│ └── location.py → SQLAlchemy model for Location
│
├── /schemas
│ ├── category.py → Pydantic schemas (request/response models) for Category
│ ├── condition.py → Pydantic schemas for Condition
│ ├── item.py → Pydantic schemas for Item
│ └── location.py → Pydantic schemas for Location
│
├── main.py → FastAPI app entry point, router setup
│
/tests → Test cases (empty for now, to be implemented)
/.env → Environment variables (DB URL, secret keys)
alembic.ini → Alembic migration configuration
requirements.txt → Python dependencies
README.md → Project documentation (this file)
```

## 🚀 Getting Started

### 1️⃣ Clone the repository

bash

```

git clone https://github.com/yourusername/home-inventory-api.git
cd home-inventory-api

```
### 2️⃣ Set up environment

python3 -m venv venv
source venv/bin/activate
pip install -r requirements.txt

### 3️⃣ Configure environment variables

DATABASE_URL=sqlite:///./test.db
SECRET_KEY=your_secret_key

### 4️⃣ Initialize the database

python scripts/seed_data.py

### 🌐 Run the FastAPI server

uvicorn app.main:app --reload
Access docs:

Swagger UI → http://localhost:8000/docs

ReDoc → http://localhost:8000/redoc

### 🧪 Running Tests

Set up test cases in /tests (coming soon).

### ⚡ Features

✅ User management
✅ Categories, items, locations, conditions
✅ Database seed script
✅ Modular project layout
✅ Ready for API testing with Swagger

### 💡 Next Steps

Add JWT authentication

Build a PWA frontend

Add barcode scanning support

Deploy to AWS (Elastic Beanstalk / EC2)

### 📄 License

MIT License © [Your Name]
