
```
/app
 ├── /api
 │    ├── category.py      → FastAPI routes for categories
 │    ├── condition.py     → FastAPI routes for conditions
 │    ├── item.py          → FastAPI routes for items
 │    └── location.py      → FastAPI routes for locations
 │
 ├── /crud
 │    ├── category.py      → Database operations (CRUD) for categories
 │    ├── condition.py     → CRUD logic for conditions
 │    ├── item.py          → CRUD logic for items
 │    └── location.py      → CRUD logic for locations
 │
 ├── /models
 │    ├── category.py      → SQLAlchemy database model for Category
 │    ├── condition.py     → SQLAlchemy model for Condition
 │    ├── item.py          → SQLAlchemy model for Item
 │    └── location.py      → SQLAlchemy model for Location
 │
 ├── /schemas
 │    ├── category.py      → Pydantic schemas (request/response models) for Category
 │    ├── condition.py     → Pydantic schemas for Condition
 │    ├── item.py          → Pydantic schemas for Item
 │    └── location.py      → Pydantic schemas for Location
 │
 ├── main.py               → FastAPI app entry point, router setup
 │
/tests                    → Test cases (empty for now, to be implemented)
/.env                     → Environment variables (DB URL, secret keys)
alembic.ini               → Alembic migration configuration
requirements.txt          → Python dependencies
README.md                → Project documentation (this file)
```