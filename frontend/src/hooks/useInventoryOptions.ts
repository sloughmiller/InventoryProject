// src/hooks/useInventoryOptions.ts
import { useEffect, useRef, useState } from "react";
import { getCategoriesForInventory, type Category } from "../api/categoryApi";
import { getLocationsForInventory, type Location } from "../api/locationApi";

export function useInventoryOptions(inventoryId?: string) {
  const cache = useRef<Record<string, { categories: Category[]; locations: Location[] }>>({});

  const [categories, setCategories] = useState<Category[]>([]);
  const [locations, setLocations] = useState<Location[]>([]);

  useEffect(() => {
    if (!inventoryId) return;

    const cached = cache.current[inventoryId];
    if (cached) {
      setCategories(cached.categories);
      setLocations(cached.locations);
      return;
    }

    const load = async () => {
      const [cats, locs] = await Promise.all([
        getCategoriesForInventory(inventoryId),
        getLocationsForInventory(inventoryId),
      ]);
      cache.current[inventoryId] = { categories: cats, locations: locs };
      setCategories(cats);
      setLocations(locs);
    };

    load();
  }, [inventoryId]);

  return { categories, locations };
}
