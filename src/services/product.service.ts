// src/services/product.service.ts
import api, { isTestEnv } from "@/api/api";
import { endpoints } from "@/api/endpoints";
import { decryptData } from "@/utils/encryption";
import type {
  ApiProductCategory,
  ApiProduct,
  ApiProductDetail,
  ApiProductsListData,
  ApiCategoriesResponse,
} from "@/types/products";

// ─── Shared decrypt helper (handles both encrypted string and plain JSON) ──────
function tryDecrypt(data: unknown): unknown {
  if (isTestEnv) return data;
  if (typeof data === "string" && data.includes(":")) {
    return decryptData(data);
  }
  return data;
}

// ─── Categories ───────────────────────────────────────────────────────────────
export async function getProductCategories(): Promise<ApiProductCategory[]> {
  try {
    const res = await api.get(endpoints.PRODUCT_CATEGORIES);
    const payload = tryDecrypt(res.data) as ApiCategoriesResponse;
    if (payload?.status && Array.isArray(payload.data)) {
      return payload.data;
    }
    return [];
  } catch (err) {
    console.error("getProductCategories error:", err);
    return [];
  }
}

// ─── Products list (encrypted) ────────────────────────────────────────────────
export interface GetProductsParams {
  category_id?: string | number;
  search?: string;
  page?: number;
  per_page?: number;
}

export async function getProducts(
  params: GetProductsParams = {},
): Promise<ApiProductsListData | null> {
  try {
    // Build query string
    const qs = new URLSearchParams();
    if (params.category_id != null)
      qs.set("category_id", String(params.category_id));
    if (params.search) qs.set("search", params.search);
    if (params.page != null) qs.set("page", String(params.page));
    if (params.per_page != null) qs.set("per_page", String(params.per_page));

    const url = `${endpoints.PRODUCTS}${qs.toString() ? `?${qs}` : ""}`;
    const res = await api.post<string | object>(url, "");

    let payload: unknown;
    if (isTestEnv) {
      payload = res.data;
    } else {
      payload = decryptData(res.data as string);
    }

    const data = payload as {
      code: number;
      status: boolean;
      data: ApiProductsListData;
    };

    if (data?.status && data.data) {
      return data.data as ApiProductsListData;
    }
    return null;
  } catch (err) {
    console.error("getProducts error:", err);
    return null;
  }
}

// ─── Single product (encrypted) ───────────────────────────────────────────────
export async function getProductById(
  id: string | number,
): Promise<ApiProductDetail | null> {
  try {
    const url = `${endpoints.PRODUCTS}?product_id=${id}`;
    const res = await api.post<string | object>(url, "");

    let payload: unknown;
    if (isTestEnv) {
      payload = res.data;
    } else {
      payload = decryptData(res.data as string);
    }

    const data = payload as {
      code: number;
      status: boolean;
      data: ApiProductDetail;
    };

    if (data?.status && data.data) {
      return data.data as ApiProductDetail;
    }
    return null;
  } catch (err) {
    console.error("getProductById error:", err);
    return null;
  }
}

// ─── Popular products helper ───────────────────────────────────────────────────
export async function getPopularProducts(): Promise<ApiProduct[]> {
  const list = await getProducts({ per_page: 24 });
  if (!list) return [];
  return list.data.filter((p) => p.is_popular === 1);
}
