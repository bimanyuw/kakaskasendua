import { useEffect, useState } from "react";
import {
  isSupabaseConfigured,
  supabase,
  SUPABASE_MEDIA_BUCKET,
} from "../lib/supabaseClient";

const STORAGE_PREFIX = "kk-admin-";
const COLLECTION_EVENT = "kk-admin-collection-change";

function normalizeItems(items) {
  return items.map((item, index) => ({
    id: item.id || `item-${index + 1}`,
    ...item,
  }));
}

export function getCollectionKey(collectionName) {
  return `${STORAGE_PREFIX}${collectionName}`;
}

export function loadLocalCollection(collectionName, fallbackItems) {
  if (typeof window === "undefined") return normalizeItems(fallbackItems);

  try {
    const stored = window.localStorage.getItem(getCollectionKey(collectionName));
    if (!stored) return normalizeItems(fallbackItems);
    const parsed = JSON.parse(stored);
    return Array.isArray(parsed) ? normalizeItems(parsed) : normalizeItems(fallbackItems);
  } catch {
    return normalizeItems(fallbackItems);
  }
}

export function saveLocalCollection(collectionName, items) {
  const normalized = normalizeItems(items);
  window.localStorage.setItem(getCollectionKey(collectionName), JSON.stringify(normalized));
  window.dispatchEvent(
    new CustomEvent(COLLECTION_EVENT, {
      detail: { collectionName },
    }),
  );
  return normalized;
}

export function resetLocalCollection(collectionName) {
  window.localStorage.removeItem(getCollectionKey(collectionName));
  window.dispatchEvent(
    new CustomEvent(COLLECTION_EVENT, {
      detail: { collectionName },
    }),
  );
}

export function makeId(prefix) {
  return `${prefix}-${Date.now()}-${Math.random().toString(16).slice(2, 8)}`;
}

export async function loadCollection(collectionName, fallbackItems) {
  if (!isSupabaseConfigured) return loadLocalCollection(collectionName, fallbackItems);

  const { data, error } = await supabase
    .from("site_content")
    .select("item_id,data,sort_order")
    .eq("collection", collectionName)
    .order("sort_order", { ascending: true });

  if (error || !data || data.length === 0) {
    return loadLocalCollection(collectionName, fallbackItems);
  }

  return normalizeItems(
    data.map((row) => ({
      id: row.item_id,
      ...row.data,
    })),
  );
}

export async function saveCollection(collectionName, items) {
  const normalized = normalizeItems(items);

  if (!isSupabaseConfigured) {
    return saveLocalCollection(collectionName, normalized);
  }

  const rows = normalized.map((item, index) => {
    const { id, ...data } = item;
    return {
      collection: collectionName,
      item_id: id,
      data,
      sort_order: index,
    };
  });

  const { error } = await supabase
    .from("site_content")
    .upsert(rows, { onConflict: "collection,item_id" });

  if (error) throw error;
  window.dispatchEvent(
    new CustomEvent(COLLECTION_EVENT, {
      detail: { collectionName },
    }),
  );
  return normalized;
}

export async function deleteCollectionItem(collectionName, id, currentItems) {
  const nextItems = currentItems.filter((item) => item.id !== id);

  if (!isSupabaseConfigured) {
    return saveLocalCollection(collectionName, nextItems);
  }

  const { error } = await supabase
    .from("site_content")
    .delete()
    .eq("collection", collectionName)
    .eq("item_id", id);

  if (error) throw error;
  window.dispatchEvent(
    new CustomEvent(COLLECTION_EVENT, {
      detail: { collectionName },
    }),
  );
  return nextItems;
}

export async function resetCollection(collectionName, fallbackItems) {
  if (!isSupabaseConfigured) {
    resetLocalCollection(collectionName);
    return loadLocalCollection(collectionName, fallbackItems);
  }

  const { error } = await supabase.from("site_content").delete().eq("collection", collectionName);
  if (error) throw error;
  window.dispatchEvent(
    new CustomEvent(COLLECTION_EVENT, {
      detail: { collectionName },
    }),
  );
  return normalizeItems(fallbackItems);
}

export async function uploadMedia(file, collectionName) {
  if (!file) return "";

  if (!isSupabaseConfigured) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result);
      reader.onerror = reject;
      reader.readAsDataURL(file);
    });
  }

  const extension = file.name.split(".").pop() || "jpg";
  const path = `${collectionName}/${Date.now()}-${Math.random()
    .toString(16)
    .slice(2)}.${extension}`;

  const { error } = await supabase.storage
    .from(SUPABASE_MEDIA_BUCKET)
    .upload(path, file, {
      cacheControl: "3600",
      upsert: false,
    });

  if (error) throw error;

  const { data } = supabase.storage.from(SUPABASE_MEDIA_BUCKET).getPublicUrl(path);
  return data.publicUrl;
}

export function useAdminCollection(collectionName, fallbackItems) {
  const [items, setItems] = useState(() => loadLocalCollection(collectionName, fallbackItems));

  useEffect(() => {
    let active = true;

    async function hydrate() {
      const nextItems = await loadCollection(collectionName, fallbackItems);
      if (active) setItems(nextItems);
    }

    const sync = (event) => {
      if (!event.detail || event.detail.collectionName === collectionName) {
        hydrate();
      }
    };

    hydrate();
    window.addEventListener(COLLECTION_EVENT, sync);
    window.addEventListener("storage", sync);
    return () => {
      active = false;
      window.removeEventListener(COLLECTION_EVENT, sync);
      window.removeEventListener("storage", sync);
    };
  }, [collectionName, fallbackItems]);

  return items;
}
