// src/types.ts

export interface Item {
  id: number;
  name: string;
  description?: string;
  quantity: number;
  category_id: number;
  location_id: number;
  inventory_id: number;
}

export interface Inventory {
  id: number;
  name: string;
}
