# 📦 Shared Inventory Sprint Plan

## 🎯 Objective

Implement support for:

- Per-user inventories (each user can own multiple inventories)
- Inventory sharing with other users
- Role-based access control per inventory (admin / viewer)

---

## 📆 Sprint 1 – Inventory Ownership Foundation

**Goal**: Replace `owner_id`-based item ownership with full inventory ownership.

### ✅ Sprint 1 Tasks

- [x] Create `Inventory` model (`models/inventory.py`)
- [x] Create Inventory schemas (`schemas/inventory.py`)
- [x] Create Inventory CRUD functions (`crud/inventory.py`)
- [x] Create Inventory API routes (`api/inventory.py`)
- [x] Update `Item` model to use `inventory_id` instead of `owner_id`
- [x] Update all Item CRUD and API logic to use `inventory_id`
- [x] Run Alembic migration to add `inventory_id` to `items`

### 🔍 Sprint 1 Checkpoint

- [x] Can create a named inventory
- [x] Can assign new items to an inventory
- [x] Can fetch only items for the current user's inventories

---

## 📆 Sprint 2 – Shared Inventory Model and Access Control

**Goal**: Enable other users to access an inventory based on shared permissions.

### ✅ Sprint 2 Tasks

- [X] Create `SharedInventory` model (`models/shared_inventory.py`)
- [X] Create SharedInventory schemas (`schemas/shared_inventory.py`)
- [X] Create CRUD for SharedInventory (`crud/shared_inventory.py`)
- [X] Create SharedInventory API routes (`api/shared_inventory.py`)
- [X] Add Alembic migration to create `shared_inventory` table
- [X] Add utility to check current user's role in inventory (for `Depends()` injection)

### 🔍 Sprint 2 Checkpoint

- [X] Can share an inventory with another user
- [X] Can assign roles: `admin`, `viewer`
- [X] Roles are enforced for protected routes

---

## 📆 Sprint 3 – Permissions and Enforcement Layer

**Goal**: Ensure all actions (create/edit/delete items) are permission-restricted.

### ✅ Srpint 3 Tasks

- [X] Create dependency `get_inventory_role_or_403(user, inventory_id)`
- [X] Apply permission checks to all relevant endpoints:
  - Item creation → must be `admin`
  - Item update/delete → must be `admin`
  - View inventory/items → must be `admin` or `viewer`
- [X] Optionally: Add route to list inventories a user has access to

### 🔍 Sprint 3 Checkpoint

- [X] Users can only access their authorized inventories
- [X] Admins can modify items, viewers can only read
- [X] Unauthorized users receive 403 on access attempt

---

## 📆 Sprint 4 – Frontend Coordination & Testing

**Goal**: Connect frontend forms with new inventory logic and test multi-user flows.

### ✅ Sprint 4 Tasks

- [X] Update item form to support selecting from user’s inventories
- [X] Update dashboard to filter by inventory
- [ ] Add simple inventory manager (create, rename, share)
- [ ] Add shared user management (list/add/remove roles)
- [ ] Full testing: create + share + restrict access between test users

### 🔍 Sprint 4 Checkpoint

- [ ] Frontend can create and assign inventories
- [ ] Frontend can manage inventory sharing and roles
- [ ] Users see only their items and shared ones

---

## ✅ Final Deliverables

- `models/inventory.py`
- `models/shared_inventory.py`
- `schemas/inventory.py`
- `schemas/shared_inventory.py`
- `crud/inventory.py`
- `crud/shared_inventory.py`
- `api/inventory.py`
- `api/shared_inventory.py`
- Alembic migrations for `inventory_id` and `shared_inventory` table
- Permission logic in reusable dependencies

---

## 🧠 Notes

- A user can own multiple inventories.
- Items belong to inventories, not directly to users.
- `SharedInventory` defines access control using roles.
- Permissions are enforced at API level via FastAPI dependencies.
