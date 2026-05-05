import { useEffect, useState } from "react";
import FadeIn from "../ui/FadeIn";

const statusLevels = [
  {
    color: "#3B6D11",
    num: "I",
    title: "Normal",
    desc: "Aktivitas gunung dalam kondisi normal. Wisata trekking dan aktivitas luar ruang aman dilakukan.",
  },
  {
    color: "#9A6B00",
    num: "II",
    title: "Waspada",
    desc: "Ada peningkatan aktivitas. Wisatawan disarankan tidak mendekati kawah dalam radius tertentu.",
  },
  {
    color: "#B5520A",
    num: "III",
    title: "Siaga",
    desc: "Aktivitas signifikan. Beberapa jalur ditutup. Ikuti arahan pengelola dan pihak berwenang setempat.",
  },
  {
    color: "#A32D2D",
    num: "IV",
    title: "Awas",
    desc: "Ancaman erupsi. Kawasan dievakuasi. Wisata ditangguhkan sepenuhnya hingga status diturunkan.",
  },
];

const safetyTips = [
  "Periksa status gunung di MAGMA PVMBG sebelum berangkat",
  "Patuhi arahan dari pemandu wisata dan masyarakat lokal",
  "Kenakan perlengkapan trekking yang memadai dan sesuai cuaca",
  "Hindari zona terlarang jika ada peringatan atau papan pembatas",
  "Selalu berangkat dalam kelompok dengan pemandu lokal bersertifikat",
];

const volcanoFallback = [
  {
    name: "Gunung Lokon",
    query: "Lokon",
    height: "1.580 mdpl",
    location: "Tomohon, Sulawesi Utara",
    level: "II",
    status: "Waspada",
    className: "kk-status-waspada",
    color: "#9A6B00",
  },
  {
    name: "Gunung Mahawu",
    query: "Mahawu",
    height: "1.324 mdpl",
    location: "Tomohon, Sulawesi Utara",
    level: "I",
    status: "Normal",
    className: "kk-status-normal",
    color: "#3B6D11",
  },
];

const levelMeta = [
  { level: "IV", status: "Awas", className: "kk-status-awas", color: "#A32D2D" },
  { level: "III", status: "Siaga", className: "kk-status-siaga", color: "#B5520A" },
  { level: "II", status: "Waspada", className: "kk-status-waspada", color: "#9A6B00" },
  { level: "I", status: "Normal", className: "kk-status-normal", color: "#3B6D11" },
];

function parseMagmaStatus(html, volcanoName) {
  const doc = new DOMParser().parseFromString(html, "text/html");
  const text = doc.body.innerText.replace(/\s+/g, " ");

  for (let index = 0; index < levelMeta.length; index += 1) {
    const current = levelMeta[index];
    const start = text.indexOf(`Level ${current.level}`);
    if (start === -1) continue;

    const next = levelMeta[index + 1];
    const nextStart = next ? text.indexOf(`Level ${next.level}`, start + 1) : -1;
    const section = text.slice(start, nextStart === -1 ? undefined : nextStart);

    if (section.toLowerCase().includes(volcanoName.toLowerCase())) {
      return current;
    }
  }

  return null;
}

function useVolcanoStatuses() {
  const [data, setData] = useState({
    items: volcanoFallback,
    updatedAt: "Menggunakan data cadangan",
    isLive: false,
  });

  useEffect(() => {
    const controller = new AbortController();

    async function loadStatus() {
      try {
        const response = await fetch("https://magma.esdm.go.id/", {
          signal: controller.signal,
        });
        const html = await response.text();
        const nextItems = volcanoFallback.map((item) => {
          const live = parseMagmaStatus(html, item.query);
          return live ? { ...item, ...live } : item;
        });

        setData({
          items: nextItems,
          updatedAt: new Intl.DateTimeFormat("id-ID", {
            dateStyle: "medium",
            timeStyle: "short",
          }).format(new Date()),
          isLive: true,
        });
      } catch {
        setData((prev) => ({
          ...prev,
          isLive: false,
        }));
      }
    }

    loadStatus();
    return () => controller.abort();
  }, []);

  return data;
}

function VolcanoStatusCard({ volcano, updatedAt, isLive, showDisclaimer }) {
  return (
    <div className="kk-status-card" style={{ marginBottom: showDisclaimer ? "1.5rem" : 0 }}>
      <div className="kk-status-header">
        <div className="kk-section-label">Status Terkini</div>
        <div className="kk-status-name">{volcano.name}</div>
        <div className={`kk-status-badge ${volcano.className}`}>
          <span
            style={{
              width: "8px",
              height: "8px",
              borderRadius: "50%",
              background: volcano.color,
              display: "inline-block",
            }}
          ></span>
          Level {volcano.level} - {volcano.status}
        </div>
      </div>

      <div className="kk-status-body">
        <div className="kk-status-row">
          <span>Ketinggian</span>
          <strong>{volcano.height}</strong>
        </div>
        <div className="kk-status-row">
          <span>Lokasi</span>
          <strong>{volcano.location}</strong>
        </div>
        <div className="kk-status-row">
          <span>Update terakhir</span>
          <strong>{isLive ? updatedAt : "Lihat MAGMA PVMBG"}</strong>
        </div>

        <a
          href="https://magma.esdm.go.id/"
          target="_blank"
          rel="noreferrer"
          className="kk-status-src"
        >
          Lihat Sumber Resmi MAGMA
        </a>

        {showDisclaimer && (
          <p className="kk-status-disclaimer">
            * Website mencoba mengambil status langsung dari MAGMA PVMBG. Jika
            browser memblokir akses lintas-domain, data cadangan ditampilkan
            dan sumber resmi tetap tersedia melalui tautan MAGMA.
          </p>
        )}
      </div>
    </div>
  );
}

export default function GunungSection() {
  const { items: volcanoStatuses, updatedAt, isLive } = useVolcanoStatuses();

  return (
    <section className="kk-gunung kk-section" id="gunung">
      <div className="kk-section-inner">
        <FadeIn>
          <p className="kk-section-label">Keselamatan Wisata</p>
        </FadeIn>

        <FadeIn>
          <h2 className="kk-section-title">
            Info Gunung <em>&amp; Keamanan</em>
          </h2>
        </FadeIn>

        <FadeIn>
          <p className="kk-section-body">
            Desa Wisata Kakaskasen Dua berada dekat kawasan gunung berapi aktif.
            Pastikan selalu memeriksa status gunung sebelum berkunjung.
          </p>
        </FadeIn>

        <div className="kk-gunung-grid">
          <FadeIn>
            {volcanoStatuses.map((volcano, index) => (
              <VolcanoStatusCard
                key={volcano.name}
                volcano={volcano}
                updatedAt={updatedAt}
                isLive={isLive}
                showDisclaimer={index === 0}
              />
            ))}
          </FadeIn>

          <FadeIn>
            <h3
              style={{
                fontFamily: "var(--serif)",
                fontSize: "1.25rem",
                fontWeight: 400,
                marginBottom: "1.5rem",
              }}
            >
              Arti Level Status Gunung
            </h3>

            <div className="kk-level-grid">
              {statusLevels.map((level, index) => (
                <div key={index} className="kk-level-item">
                  <div className="kk-level-num" style={{ color: level.color }}>
                    {level.num}
                  </div>
                  <div>
                    <div className="kk-level-title">{level.title}</div>
                    <p className="kk-level-desc">{level.desc}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="kk-safety-tips">
              <h3>Panduan Keselamatan Wisatawan</h3>
              {safetyTips.map((tip, index) => (
                <div key={index} className="kk-tip-item">
                  <div className="kk-tip-bullet"></div>
                  {tip}
                </div>
              ))}
            </div>
          </FadeIn>
        </div>
      </div>
    </section>
  );
}
