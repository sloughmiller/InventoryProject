// 🧾 Core Inventory Types
export interface Inventory {
  id: string; // changed from number → string (UUID)
  name: string;
}

// 📦 Item
export interface Item {
  id: string;
  name: string;
  description?: string;
  quantity: number;
  category_id: string;
  location_id: string;
  inventory_id: string;
}

// 📁 Category
export interface Category {
  id: string;
  name: string;
  inventory_id: string;
}

// 📍 Location
export interface Location {
  id: string;
  name: string;
  description?: string;
  inventory_id: string;
}

// 👤 User
export interface User {
  id: string; // UUID
  username: string;
  email?: string;
}

// 🛡️ SharedInventory
export interface SharedInventory {
  id: string;
  user_id: string;
  inventory_id: string;
  role: 'admin' | 'viewer';
}

// ✅ Generic Form Field Validation (optional use)
export interface FieldError {
  field: string;
  message: string;
}
