import { useEffect, useMemo, useState } from "react";
import { adminCollections } from "../../data/adminCollections";
import {
  deleteCollectionItem,
  loadCollection,
  makeId,
  resetCollection,
  saveCollection,
  uploadMedia,
} from "../../hooks/useAdminCollection";
import { isSupabaseConfigured, supabase } from "../../lib/supabaseClient";

const ADMIN_PASSWORD = "admin123";

const emptyForms = {
  storyMap: {
    name: "",
    title: "",
    category: "wisata",
    longitude: "",
    latitude: "",
    image: "",
    text: "",
  },
  wisata: {
    title: "",
    cat: "alam",
    subCategory: "",
    img: "",
    desc: "",
    duration: "",
  },
  marketplace: {
    title: "",
    cat: "",
    img: "",
    desc: "",
    price: "",
    phone: "",
  },
  gallery: {
    src: "",
    alt: "",
  },
};

const tabs = [
  { id: "storyMap", label: "Story Map" },
  { id: "wisata", label: "Wisata" },
  { id: "marketplace", label: "Marketplace" },
  { id: "gallery", label: "Galeri" },
];

async function getInitialAuth() {
  if (!isSupabaseConfigured) {
    return window.sessionStorage.getItem("kk-admin-auth") === "true";
  }

  const { data } = await supabase.auth.getSession();
  return Boolean(data.session);
}

function getInitialItems() {
  return adminCollections.storyMap.fallback.map((item, index) => ({
    id: item.id || `item-${index + 1}`,
    ...item,
  }));
}

function getImageField(tab) {
  if (tab === "gallery") return "src";
  if (tab === "storyMap") return "image";
  return "img";
}

function normalizePhone(phone) {
  const digits = phone.replace(/[^\d]/g, "");
  if (!digits) return "";
  if (digits.startsWith("0")) return `62${digits.slice(1)}`;
  if (digits.startsWith("62")) return digits;
  return digits;
}

function prepareItem(tab, form, editingId) {
  if (tab === "storyMap") {
    return {
      id: editingId || makeId("story"),
      name: form.name || form.title,
      title: form.title || form.name,
      category: form.category,
      coordinates: [Number(form.longitude), Number(form.latitude)],
      image: form.image,
      text: form.text,
    };
  }

  if (tab === "wisata") {
    const subCategory = form.subCategory.trim();
    return {
      id: editingId || makeId("wisata"),
      title: form.title,
      cat: form.cat,
      subCategory,
      img: form.img,
      alt: form.title,
      cardCat: subCategory ? `${form.cat} · ${subCategory}` : form.cat,
      desc: form.desc,
      duration: form.duration,
    };
  }

  if (tab === "marketplace") {
    const phone = normalizePhone(form.phone);
    return {
      id: editingId || makeId("produk"),
      title: form.title,
      cat: form.cat,
      img: form.img,
      alt: form.title,
      desc: form.desc,
      price: form.price,
      phone,
      waLabel: phone ? "Hubungi Penjual" : "Kontak belum tersedia",
    };
  }

  return {
    id: editingId || makeId("galeri"),
    src: form.src,
    alt: form.alt || "Foto Kakaskasen Dua",
  };
}

function itemToForm(tab, item) {
  if (tab === "storyMap") {
    return {
      ...emptyForms.storyMap,
      name: item.name || "",
      title: item.title || "",
      category: item.category || "wisata",
      longitude: item.coordinates?.[0] ?? "",
      latitude: item.coordinates?.[1] ?? "",
      image: item.image || "",
      text: item.text || "",
    };
  }

  if (tab === "wisata") {
    return {
      ...emptyForms.wisata,
      title: item.title || "",
      cat: item.cat || "alam",
      subCategory: item.subCategory || item.cardCat?.split("·").pop()?.trim() || "",
      img: item.img || "",
      desc: item.desc || "",
      duration: item.duration || "",
    };
  }

  if (tab === "marketplace") {
    return {
      ...emptyForms.marketplace,
      title: item.title || "",
      cat: item.cat || "",
      img: item.img || "",
      desc: item.desc || "",
      price: item.price || "",
      phone: item.phone || "",
    };
  }

  return {
    ...emptyForms.gallery,
    src: item.src || "",
    alt: item.alt || "",
  };
}

function AdminFields({ activeTab, form, onChange, onFile }) {
  const imageField = getImageField(activeTab);

  return (
    <div className="kk-admin-form-grid">
      {activeTab === "storyMap" && (
        <>
          <label>
            Nama titik
            <input value={form.name} onChange={(e) => onChange("name", e.target.value)} />
          </label>
          <label>
            Judul card
            <input value={form.title} onChange={(e) => onChange("title", e.target.value)} />
          </label>
          <label>
            Kategori pin
            <select value={form.category} onChange={(e) => onChange("category", e.target.value)}>
              <option value="wisata">Destinasi Wisata</option>
              <option value="umkm_bunga">UMKM Bunga</option>
              <option value="fasilitas">Fasilitas Umum</option>
            </select>
          </label>
          <label>
            Longitude
            <input value={form.longitude} onChange={(e) => onChange("longitude", e.target.value)} placeholder="124.8410" />
          </label>
          <label>
            Latitude
            <input value={form.latitude} onChange={(e) => onChange("latitude", e.target.value)} placeholder="1.3495" />
          </label>
          <label className="kk-admin-span">
            Deskripsi
            <textarea value={form.text} onChange={(e) => onChange("text", e.target.value)} rows="4" />
          </label>
        </>
      )}

      {activeTab === "wisata" && (
        <>
          <label>
            Judul
            <input value={form.title} onChange={(e) => onChange("title", e.target.value)} />
          </label>
          <label>
            Kategori
            <select value={form.cat} onChange={(e) => onChange("cat", e.target.value)}>
              <option value="alam">Alam</option>
              <option value="budaya">Budaya</option>
              <option value="edukasi">Edukasi</option>
              <option value="kuliner">Kuliner</option>
            </select>
          </label>
          <label>
            Sub kategori
            <input value={form.subCategory} onChange={(e) => onChange("subCategory", e.target.value)} placeholder="Trekking, Edukasi, Kuliner" />
          </label>
          <label>
            Durasi
            <input value={form.duration} onChange={(e) => onChange("duration", e.target.value)} placeholder="Durasi: 2-3 jam" />
          </label>
          <label className="kk-admin-span">
            Deskripsi
            <textarea value={form.desc} onChange={(e) => onChange("desc", e.target.value)} rows="4" />
          </label>
        </>
      )}

      {activeTab === "marketplace" && (
        <>
          <label>
            Judul produk
            <input value={form.title} onChange={(e) => onChange("title", e.target.value)} />
          </label>
          <label>
            Kategori
            <input value={form.cat} onChange={(e) => onChange("cat", e.target.value)} placeholder="Kuliner, Kerajinan, Bunga" />
          </label>
          <label>
            Harga
            <input value={form.price} onChange={(e) => onChange("price", e.target.value)} placeholder="Mulai Rp 25.000" />
          </label>
          <label>
            Kontak WhatsApp
            <input value={form.phone} onChange={(e) => onChange("phone", e.target.value)} placeholder="081234567890" />
          </label>
          <label className="kk-admin-span">
            Deskripsi
            <textarea value={form.desc} onChange={(e) => onChange("desc", e.target.value)} rows="4" />
          </label>
        </>
      )}

      {activeTab === "gallery" && (
        <label className="kk-admin-span">
          Keterangan foto
          <input value={form.alt} onChange={(e) => onChange("alt", e.target.value)} />
        </label>
      )}

      <label className="kk-admin-span">
        Link thumbnail/foto
        <input value={form[imageField]} onChange={(e) => onChange(imageField, e.target.value)} placeholder="https://..." />
      </label>
      <label className="kk-admin-span">
        Upload file foto
        <input type="file" accept="image/*" onChange={(e) => onFile(e.target.files?.[0])} />
      </label>
    </div>
  );
}

export default function AdminPanel() {
  const [isAuthed, setIsAuthed] = useState(false);
  const [authChecked, setAuthChecked] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [activeTab, setActiveTab] = useState("storyMap");
  const [items, setItems] = useState(getInitialItems);
  const [form, setForm] = useState(emptyForms.storyMap);
  const [editingId, setEditingId] = useState(null);
  const [message, setMessage] = useState("");
  const [isSaving, setIsSaving] = useState(false);

  const activeMeta = adminCollections[activeTab];
  const title = useMemo(() => activeMeta.label, [activeMeta]);

  useEffect(() => {
    let active = true;

    getInitialAuth().then((authed) => {
      if (!active) return;
      setIsAuthed(authed);
      setAuthChecked(true);
    });
    loadCollection("storyMap", adminCollections.storyMap.fallback).then((nextItems) => {
      if (active) setItems(nextItems);
    });

    return () => {
      active = false;
    };
  }, []);

  async function switchTab(tab) {
    setActiveTab(tab);
    setItems(await loadCollection(tab, adminCollections[tab].fallback));
    setForm(emptyForms[tab]);
    setEditingId(null);
    setMessage("");
  }

  async function login(e) {
    e.preventDefault();
    setMessage("");

    if (isSupabaseConfigured) {
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });
      if (error) {
        setMessage(error.message);
        return;
      }
      setIsAuthed(true);
      return;
    }

    if (password === ADMIN_PASSWORD) {
      window.sessionStorage.setItem("kk-admin-auth", "true");
      setIsAuthed(true);
    } else {
      setMessage("Password admin salah.");
    }
  }

  function updateField(field, value) {
    setForm((prev) => ({ ...prev, [field]: value }));
  }

  async function handleFile(file) {
    if (!file) return;
    const imageField = getImageField(activeTab);
    setIsSaving(true);
    setMessage("Mengunggah foto...");
    try {
      const publicUrl = await uploadMedia(file, activeTab);
      updateField(imageField, publicUrl);
      setMessage("Foto berhasil diunggah.");
    } catch (error) {
      setMessage(error.message || "Upload foto gagal.");
    } finally {
      setIsSaving(false);
    }
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setIsSaving(true);
    setMessage("");
    const nextItem = prepareItem(activeTab, form, editingId);
    const nextItems = editingId
      ? items.map((item) => (item.id === editingId ? nextItem : item))
      : [nextItem, ...items];

    try {
      const saved = await saveCollection(activeTab, nextItems);
      setItems(saved);
      setForm(emptyForms[activeTab]);
      setEditingId(null);
      setMessage("Data berhasil disimpan.");
    } catch (error) {
      setMessage(error.message || "Data gagal disimpan.");
    } finally {
      setIsSaving(false);
    }
  }

  function editItem(item) {
    setEditingId(item.id);
    setForm(itemToForm(activeTab, item));
  }

  async function deleteItem(id) {
    setIsSaving(true);
    setMessage("");
    try {
      const saved = await deleteCollectionItem(activeTab, id, items);
      setItems(saved);
      if (editingId === id) {
        setEditingId(null);
        setForm(emptyForms[activeTab]);
      }
      setMessage("Data berhasil dihapus.");
    } catch (error) {
      setMessage(error.message || "Data gagal dihapus.");
    } finally {
      setIsSaving(false);
    }
  }

  async function resetData() {
    setIsSaving(true);
    setMessage("");
    try {
      const fallback = await resetCollection(activeTab, activeMeta.fallback);
      setItems(fallback);
      setForm(emptyForms[activeTab]);
      setEditingId(null);
      setMessage("Data kembali ke contoh awal.");
    } catch (error) {
      setMessage(error.message || "Reset data gagal.");
    } finally {
      setIsSaving(false);
    }
  }

  if (!authChecked) {
    return (
      <main className="kk-admin-shell kk-admin-login">
        <div className="kk-admin-login-card">
          <p>Memeriksa sesi admin...</p>
        </div>
      </main>
    );
  }

  if (!isAuthed) {
    return (
      <main className="kk-admin-shell kk-admin-login">
        <form className="kk-admin-login-card" onSubmit={login}>
          <p className="kk-section-label">Admin Kakaskasen Dua</p>
          <h1>Masuk Admin</h1>
          <p>
            {isSupabaseConfigured
              ? "Masuk menggunakan akun Supabase Auth admin."
              : "Mode lokal aktif. Gunakan password demo untuk pengembangan."}
          </p>
          {isSupabaseConfigured && (
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email admin"
            />
          )}
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password admin"
          />
          <button type="submit">Masuk</button>
          {message && <p className="kk-admin-message">{message}</p>}
          <a href="/">Kembali ke website</a>
        </form>
      </main>
    );
  }

  return (
    <main className="kk-admin-shell">
      <header className="kk-admin-header">
        <div>
          <p className="kk-section-label">Admin Panel</p>
          <h1>CRUD Konten Kakaskasen Dua</h1>
        </div>
        <div className="kk-admin-header-actions">
          <a href="/">Lihat Website</a>
          <button
            type="button"
            onClick={() => {
              if (isSupabaseConfigured) {
                supabase.auth.signOut();
              } else {
                window.sessionStorage.removeItem("kk-admin-auth");
              }
              setIsAuthed(false);
            }}
          >
            Keluar
          </button>
        </div>
      </header>

      <div className="kk-admin-tabs">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            className={activeTab === tab.id ? "active" : ""}
            onClick={() => switchTab(tab.id)}
            type="button"
          >
            {tab.label}
          </button>
        ))}
      </div>

      <section className="kk-admin-layout">
        <form className="kk-admin-card" onSubmit={handleSubmit}>
          <div className="kk-admin-card-head">
            <h2>{editingId ? `Edit ${title}` : `Tambah ${title}`}</h2>
            {editingId && (
              <button
                type="button"
                onClick={() => {
                  setEditingId(null);
                  setForm(emptyForms[activeTab]);
                }}
              >
                Batal edit
              </button>
            )}
          </div>

          <AdminFields
            activeTab={activeTab}
            form={form}
            onChange={updateField}
            onFile={handleFile}
          />

          <button className="kk-admin-submit" type="submit" disabled={isSaving}>
            {editingId ? "Simpan Perubahan" : "Tambah Data"}
          </button>
          {message && <p className="kk-admin-message">{message}</p>}
        </form>

        <section className="kk-admin-card">
          <div className="kk-admin-card-head">
            <h2>Data {title}</h2>
            <button type="button" onClick={resetData}>Reset contoh</button>
          </div>

          <div className="kk-admin-list">
            {items.map((item) => (
              <article className="kk-admin-row" key={item.id}>
                <img src={item.image || item.img || item.src} alt={item.title || item.alt || item.name} />
                <div>
                  <strong>{item.title || item.name || item.alt}</strong>
                  <p>{item.cat || item.category || item.price || "Galeri"}</p>
                </div>
                <div className="kk-admin-row-actions">
                  <button type="button" onClick={() => editItem(item)}>Edit</button>
                  <button type="button" onClick={() => deleteItem(item.id)}>Hapus</button>
                </div>
              </article>
            ))}
          </div>
        </section>
      </section>
    </main>
  );
}
