import { useEffect, useState } from "react";
import FadeIn from "../ui/FadeIn";

const statusConfig = {
  normal: {
    label: "Normal",
    level: "I",
    dotColor: "#2E9E4A",
    bg: "#EDF3EC",
    text: "#2A5E30",
    border: "#7CC48B",
    desc: "Aktivitas rendah",
    className: "kk-status-normal",
  },
  waspada: {
    label: "Waspada",
    level: "II",
    dotColor: "#C89000",
    bg: "#FFF3CD",
    text: "#6A4800",
    border: "#D4A820",
    desc: "Peningkatan aktivitas",
    className: "kk-status-waspada",
  },
  siaga: {
    label: "Siaga",
    level: "III",
    dotColor: "#D45010",
    bg: "#FFE0D0",
    text: "#7A2800",
    border: "#D46030",
    desc: "Berbahaya",
    className: "kk-status-siaga",
  },
  awas: {
    label: "Awas",
    level: "IV",
    dotColor: "#B81818",
    bg: "#FDDEDE",
    text: "#7A0A0A",
    border: "#CC3030",
    desc: "Evakuasi segera",
    className: "kk-status-awas",
  },
};

const volcanoFallback = [
  {
    id: "lokon",
    name: "Lokon",
    query: "Lokon",
    image: "https://upload.wikimedia.org/wikipedia/commons/c/c5/Lokon.JPG",
    imageAlt: "Gunung Lokon",
    elevation: "1.580 m dpl",
    location: "Tomohon, Sulawesi Utara",
    type: "Stratovulkano Aktif",
    krb: "1.5 km dari Kawah Tompaluan",
    lastEruption: "2012",
    coordinates: "1°21'26\" LU, 124°47'31\" BT",
    recommendation: "Hindari radius 1.5 km",
    statusKey: "waspada",
  },
  {
    id: "mahawu",
    name: "Mahawu",
    query: "Mahawu",
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQKhaAzCAmt8tcbwoZVxC0AukvWHnRHJ1kKRA&s",
    imageAlt: "Gunung Mahawu",
    elevation: "1.311 m dpl",
    location: "Tomohon, Sulawesi Utara",
    type: "Stratovulkano, Kawah Danau",
    krb: "1.0 km dari pusat kawah",
    lastEruption: "1977",
    coordinates: "1°21'29\" LU, 124°51'0\" BT",
    recommendation: "Terbuka untuk wisata",
    statusKey: "normal",
  },
];

const levelMeta = [
  { level: "IV", statusKey: "awas" },
  { level: "III", statusKey: "siaga" },
  { level: "II", statusKey: "waspada" },
  { level: "I", statusKey: "normal" },
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
      return current.statusKey;
    }
  }

  return null;
}

function formatUpdatedAt() {
  return new Intl.DateTimeFormat("id-ID", {
    day: "numeric",
    month: "long",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    timeZoneName: "short",
  }).format(new Date());
}

function useVolcanoStatuses() {
  const [data, setData] = useState({
    items: volcanoFallback,
    updatedAt: "Menggunakan data cadangan",
    isLive: false,
  });
  const [loading, setLoading] = useState(false);

  const loadStatus = async (signal) => {
    setLoading(true);
    try {
      const response = await fetch("https://magma.esdm.go.id/", { signal });
      const html = await response.text();
      const nextItems = volcanoFallback.map((item) => {
        const statusKey = parseMagmaStatus(html, item.query);
        return statusKey ? { ...item, statusKey } : item;
      });

      setData({
        items: nextItems,
        updatedAt: formatUpdatedAt(),
        isLive: true,
      });
    } catch {
      setData((prev) => ({ ...prev, isLive: false }));
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const controller = new AbortController();
    loadStatus(controller.signal);
    return () => controller.abort();
  }, []);

  return {
    ...data,
    loading,
    refresh: () => loadStatus(),
  };
}

function VolcanoCard({ volcano }) {
  const cfg = statusConfig[volcano.statusKey];

  return (
    <article className="kk-vol-card">
      <div className="kk-vol-photo-wrap">
        <img src={volcano.image} alt={volcano.imageAlt} className="kk-vol-photo" />
        <span className="kk-vol-photo-label">Gunung {volcano.name}</span>
      </div>

      <p className="kk-vol-name">
        Gunung <em>{volcano.name}</em>
      </p>
      <p className="kk-vol-elev">
        {volcano.elevation} · {volcano.location}
      </p>

      <div className="kk-vol-status-row">
        <span className="kk-vol-pulse-dot" style={{ background: cfg.dotColor }} />
        <span
          className="kk-vol-badge"
          style={{
            background: cfg.bg,
            color: cfg.text,
            borderColor: cfg.border,
          }}
        >
          Level {cfg.level} - {cfg.label}
        </span>
      </div>

      <div className="kk-vol-details">
        <div className="kk-vol-detail-row">
          <span>Tipe</span>
          <strong>{volcano.type}</strong>
        </div>
        <div className="kk-vol-detail-row">
          <span>KRB Radius</span>
          <strong>{volcano.krb}</strong>
        </div>
        <div className="kk-vol-detail-row">
          <span>Letusan Terakhir</span>
          <strong>{volcano.lastEruption}</strong>
        </div>
        <div className="kk-vol-detail-row">
          <span>Koordinat</span>
          <strong>{volcano.coordinates}</strong>
        </div>
        <div className="kk-vol-detail-row">
          <span>Rekomendasi</span>
          <strong>{volcano.recommendation}</strong>
        </div>
      </div>
    </article>
  );
}

export default function GunungSection() {
  const { items: volcanoStatuses, updatedAt, isLive, loading, refresh } = useVolcanoStatuses();

  return (
    <section className="kk-gunung kk-section" id="gunung" aria-label="Status Aktivitas Gunung Berapi">
      <div className="kk-section-inner kk-volcano-inner">
        <FadeIn>
          <header className="kk-vol-header kk-section-heading">
            <p className="kk-vol-eyebrow">Desa Wisata · Kakaskasen Dua</p>
            <h2 className="kk-vol-headline">
              Dua <em>Puncak</em>
              <br />
              Sulawesi Utara
            </h2>
            <p className="kk-vol-subtext">
              Pantau status aktivitas vulkanik Gunung Lokon dan Gunung Mahawu secara berkala
              sebelum merencanakan kunjungan wisata.
            </p>
          </header>
        </FadeIn>

        <FadeIn>
          <div className="kk-vol-divider">
            <span>Status Terkini</span>
            <div />
          </div>
        </FadeIn>

        <FadeIn>
          <div className="kk-vol-grid">
            {volcanoStatuses.map((volcano) => (
              <VolcanoCard key={volcano.id} volcano={volcano} />
            ))}
          </div>
        </FadeIn>

        <FadeIn>
          <div className="kk-vol-bottom">
            <div className="kk-vol-legend">
              {Object.entries(statusConfig).map(([key, cfg]) => (
                <div className="kk-vol-legend-item" key={key}>
                  <span className="kk-vol-legend-dot" style={{ background: cfg.dotColor }} />
                  <span>
                    <strong>{cfg.label}</strong> - {cfg.desc}
                  </span>
                </div>
              ))}
            </div>

            <div className="kk-vol-meta">
              <span>Diperbarui: {isLive ? updatedAt : "Lihat MAGMA PVMBG"}</span>
              <a href="https://magma.esdm.go.id/" target="_blank" rel="noreferrer">
                PVMBG · MAGMA Indonesia
              </a>
              <button className="kk-vol-refresh-btn" onClick={refresh} type="button" disabled={loading}>
                <span className={loading ? "is-spinning" : ""}>↻</span>
                {loading ? "Memuat..." : "Perbarui status"}
              </button>
            </div>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
