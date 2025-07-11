// src/types.ts

// 🧾 Core Inventory Types
export interface Inventory {
  id: number;
  name: string;
}

// 📦 Item
export interface Item {
  id: number;
  name: string;
  description?: string;
  quantity: number;
  category_id: number;
  location_id: number;
  inventory_id: number;
}

// 📁 Category
export interface Category {
  id: number;
  name: string;
  inventory_id: number;
}

// 📍 Location
export interface Location {
  id: number;
  name: string;
  description?: string;
  inventory_id: number;
}

// 👤 User
export interface User {
  id: number;
  username: string;
  email?: string;
}

// 🛡️ SharedInventory
export interface SharedInventory {
  id: number;
  user_id: number;
  inventory_id: number;
  role: 'admin' | 'viewer';
}

// ✅ Generic Form Field Validation (optional use)
export interface FieldError {
  field: string;
  message: string;
}
