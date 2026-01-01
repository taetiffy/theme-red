export interface BackpackItem {
  id: string;
  name: string;
  image: string;
  quantity: number;
  rarity: "common" | "rare" | "epic" | "legendary";
  description: string;
  category?: "consumable" | "equipment" | "material" | "currency";
  value?: number;
}

export interface BackpackSlot {
  slotIndex: number;
  item: BackpackItem | null;
}

export interface BackpackConfig {
  totalSlots: number;
  maxStackSize: number;
  categories: string[];
}

export type SortOption = "name" | "rarity" | "quantity" | "value";
export type FilterOption = "all" | "consumable" | "equipment" | "material" | "currency";