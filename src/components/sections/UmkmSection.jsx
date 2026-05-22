import { useState } from "react";
import FadeIn from "../ui/FadeIn";
import WhatsAppIcon from "../icons/WhatsAppIcon";

// accent tokens: references to CSS variables defined in :root
// "kuliner" → gold, "tanaman" → green, "kerajinan" → earth
const umkmStores = [
  {
    id: 1,
    name: "Dapur Bu Ranti",
    owner: "Ranti Makalew",
    category: "Kuliner",
    accentVar: "gold",   // maps to --gold in CSS
    description:
      "Masakan rumahan khas Minahasa dari dapur Bu Ranti, dibuat dari bahan segar pilihan lereng Lokon dan resep turun-temurun warga Kakaskasen.",
    location: "Kakaskasen Dua",
    storeImage: "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=600&q=80",
    whatsapp: "6281234567890",
    products: [
      {
        id: "p1",
        name: "Klappertaart Klasik",
        category: "Kue & Dessert",
        description: "Klappertaart lembut dengan kelapa muda segar dan susu full cream.",
        price: "Rp 85.000",
        image: "https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=500&q=80",
      },
      {
        id: "p2",
        name: "Tinutuan Porridge",
        category: "Makanan Utama",
        description: "Bubur Manado autentik dengan sayuran segar dan rempah pilihan.",
        price: "Rp 25.000",
        image: "https://images.unsplash.com/photo-1547592166-23ac45744acd?w=500&q=80",
      },
      {
        id: "p3",
        name: "Kue Kering Minahasa",
        category: "Camilan",
        description: "Aneka kue kering tradisional, cocok untuk oleh-oleh.",
        price: "Rp 55.000",
        image: "https://images.unsplash.com/photo-1558961363-fa8fdf82db35?w=500&q=80",
      },
      {
        id: "p4",
        name: "Sambal Dabu-Dabu",
        category: "Bumbu & Sambal",
        description: "Sambal segar khas Manado dengan tomat, cabai lokal, dan aroma jeruk.",
        price: "Rp 30.000",
        image: "https://images.unsplash.com/photo-1596040033229-a9821ebd058d?w=500&q=80",
      },
    ],
  },
  {
    id: 2,
    name: "Kebun Bunga Warga",
    owner: "Kolektif Tani Kakaskasen",
    category: "Tanaman & Bunga",
    accentVar: "green",  // maps to --green-mid in CSS
    description:
      "Etalase bunga segar, bibit, dan tanaman hias dari kebun warga setempat. Dikelola bersama oleh kelompok tani Kakaskasen Dua.",
    location: "Kakaskasen Dua",
    storeImage: "https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=600&q=80",
    whatsapp: "6281234567891",
    products: [
      {
        id: "p5",
        name: "Bunga Potong Krisan",
        category: "Bunga Segar",
        description: "Krisan segar langsung dari kebun, tersedia berbagai warna.",
        price: "Rp 35.000 / ikat",
        image: "https://images.unsplash.com/photo-1508610048659-a06b669e3321?w=500&q=80",
      },
      {
        id: "p6",
        name: "Bunga Gladiol",
        category: "Bunga Segar",
        description: "Gladiol tinggi dan elegan, cocok untuk dekorasi acara.",
        price: "Rp 45.000 / ikat",
        image: "https://images.unsplash.com/photo-1490750967868-88df5691a539?w=500&q=80",
      },
      {
        id: "p7",
        name: "Bibit Bunga Matahari",
        category: "Bibit",
        description: "Bibit bunga matahari siap tanam untuk pekarangan rumah.",
        price: "Rp 15.000 / pak",
        image: "https://images.unsplash.com/photo-1597848212624-a19eb35e2651?w=500&q=80",
      },
      {
        id: "p8",
        name: "Tanaman Hias Potted",
        category: "Tanaman Hias",
        description: "Tanaman hias dalam pot, siap pajang di dalam atau luar ruangan.",
        price: "Rp 65.000",
        image: "https://images.unsplash.com/photo-1485955900006-10f4d324d411?w=500&q=80",
      },
    ],
  },
  {
    id: 3,
    name: "Kerajinan Karawo",
    owner: "Siti Mokodompit",
    category: "Kerajinan Tangan",
    accentVar: "earth",  // maps to --earth in CSS
    description:
      "Sulaman tangan karawo dengan sentuhan modern. Setiap produk dikerjakan teliti oleh pengrajin lokal dan cocok sebagai cendera mata.",
    location: "Kakaskasen Dua",
    storeImage: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&q=80",
    whatsapp: "6281234567892",
    products: [
      {
        id: "p9",
        name: "Selendang Karawo Merah",
        category: "Aksesori",
        description: "Selendang sulam karawo motif bunga dengan warna merah marun.",
        price: "Rp 350.000",
        image: "https://images.unsplash.com/photo-1606760227091-3dd870d97f1d?w=500&q=80",
      },
      {
        id: "p10",
        name: "Tas Sulam Premium",
        category: "Tas",
        description: "Tas tangan dengan sulaman karawo halus, kombinasi kulit dan kain.",
        price: "Rp 550.000",
        image: "https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=500&q=80",
      },
      {
        id: "p11",
        name: "Taplak Meja Sulam",
        category: "Dekorasi Rumah",
        description: "Taplak dengan motif karawo tradisional untuk meja ruang tamu.",
        price: "Rp 275.000",
        image: "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=500&q=80",
      },
    ],
  },
];

function ProductSlider({ store }) {
  const [current, setCurrent] = useState(0);
  const total = store.products.length;
  const product = store.products[current];
  const cssAccent = store.accentVar === "green" ? "var(--green-mid)" : `var(--${store.accentVar})`;
  const accentStyle = {
    "--store-accent": cssAccent,
  };

  const prev = () => setCurrent((value) => (value - 1 + total) % total);
  const next = () => setCurrent((value) => (value + 1) % total);
  const waText = encodeURIComponent(`Halo, saya tertarik dengan produk ${product.name}`);

  return (
    <div className="kk-mp-slider" style={accentStyle}>
      <div className="kk-mp-product-card">
        <div className="kk-mp-product-image-wrap">
          <img src={product.image} alt={product.name} className="kk-mp-product-image" />
          <span className="kk-mp-product-badge">{product.category}</span>
          <span className="kk-mp-product-count">{current + 1} / {total}</span>
        </div>

        <div className="kk-mp-product-info">
          <h4>{product.name}</h4>
          <p>{product.description}</p>
          <strong>{product.price}</strong>
          <a
            href={`https://wa.me/${store.whatsapp}?text=${waText}`}
            target="_blank"
            rel="noreferrer"
            className="kk-mp-wa"
          >
            <WhatsAppIcon />
            Hubungi Penjual
          </a>
        </div>
      </div>

      <div className="kk-mp-slider-nav">
        <div className="kk-mp-dots" aria-label={`Navigasi produk ${store.name}`}>
          {store.products.map((item, index) => (
            <button
              key={item.id}
              className={`kk-mp-dot${index === current ? " active" : ""}`}
              onClick={() => setCurrent(index)}
              aria-label={`Lihat produk ${index + 1}`}
              type="button"
            />
          ))}
        </div>

        <div className="kk-mp-arrows">
          <button onClick={prev} type="button" aria-label="Produk sebelumnya">
            {"<"}
          </button>
          <button onClick={next} type="button" aria-label="Produk berikutnya">
            {">"}
          </button>
        </div>
      </div>
    </div>
  );
}

function StoreCard({ store }) {
  const cssAccent = store.accentVar === "green" ? "var(--green-mid)" : `var(--${store.accentVar})`;
  return (
    <article className="kk-mp-card" style={{ "--store-accent": cssAccent }}>
      <div className="kk-mp-store-panel">
        <div className="kk-mp-store-image-wrap">
          <img src={store.storeImage} alt={store.name} className="kk-mp-store-image" />
          <div className="kk-mp-store-image-overlay" />
        </div>

        <div className="kk-mp-store-info">
          <span className="kk-mp-store-category">{store.category}</span>
          <h3>{store.name}</h3>
          <p className="kk-mp-store-owner">
            {store.owner} - {store.location}
          </p>
          <p className="kk-mp-store-desc">{store.description}</p>
        </div>
      </div>

      <div className="kk-mp-divider" />

      <div className="kk-mp-products-panel">
        <p className="kk-mp-products-label">Produk Kami</p>
        <ProductSlider store={store} />
      </div>
    </article>
  );
}

export default function UmkmSection() {
  return (
    <section className="kk-umkm kk-market-showcase kk-mp-section" id="umkm">
      <div className="kk-mp-inner">
        <FadeIn className="kk-mp-header">
          <p className="kk-mp-eyebrow">Desa Kakaskasen Dua</p>
          <h2>
            Pasar <em>Lokal</em>
          </h2>
          <p>
            Produk autentik dari tangan warga: kuliner, kerajinan, bunga, dan hasil kebun
            dari lereng Gunung Lokon dan Mahawu.
          </p>
          <span className="kk-mp-header-line" />
        </FadeIn>

        <div className="kk-mp-cards">
          {umkmStores.map((store) => (
            <FadeIn key={store.id}>
              <StoreCard store={store} />
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}