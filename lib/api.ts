const API_BASE_URL = "https://openapi.programming-hero.com/api/bazardor";
const FALLBACK_URL = "https://api.api-store.workers.dev/api/bazardor";

export interface ProductMarket {
  market: string;
  division: string;
  min: number;
  max: number;
}

export interface Product {
  id: number;
  slug: string;
  nameBn: string;
  category: string;
  categoryNameBn: string;
  categoryIcon: string;
  unit: string;
  image: string;
  today: number;
  yesterday: number;
  lastWeek: number;
  lastMonth: number;
  change: {
    dir: "up" | "down" | "flat" | string;
    pct: number;
  };
  markets: ProductMarket[];
}

export interface Category {
  id: string;
  slug: string;
  nameBn: string;
  icon: string;
}

export async function getProducts(): Promise<Product[]> {
  try {
    const res = await fetch(`${API_BASE_URL}/products`, {
      next: { revalidate: 60 },
    });
    if (!res.ok) throw new Error("Main API error");
    const data = await res.json();
    return Array.isArray(data) ? data : [];
  } catch (err) {
    try {
      const fallbackRes = await fetch(`${FALLBACK_URL}/products`, {
        next: { revalidate: 60 },
      });
      const data = await fallbackRes.json();
      return Array.isArray(data) ? data : [];
    } catch (e) {
      return [];
    }
  }
}

export async function getProductById(id: string | number): Promise<Product | null> {
  try {
    const res = await fetch(`${API_BASE_URL}/products/${id}`, {
      next: { revalidate: 60 },
    });
    if (!res.ok) throw new Error("Main API error");
    const data = await res.json();
    return data || null;
  } catch (err) {
    try {
      const fallbackRes = await fetch(`${FALLBACK_URL}/products/${id}`, {
        next: { revalidate: 60 },
      });
      const data = await fallbackRes.json();
      return data || null;
    } catch (e) {
      return null;
    }
  }
}

export async function getCategories(): Promise<Category[]> {
  try {
    const res = await fetch(`${API_BASE_URL}/categories`, {
      next: { revalidate: 3600 },
    });
    if (!res.ok) throw new Error("Main API error");
    const data = await res.json();
    return Array.isArray(data) ? data : [];
  } catch (err) {
    try {
      const fallbackRes = await fetch(`${FALLBACK_URL}/categories`, {
        next: { revalidate: 3600 },
      });
      const data = await fallbackRes.json();
      return Array.isArray(data) ? data : [];
    } catch (e) {
      return [];
    }
  }
}
