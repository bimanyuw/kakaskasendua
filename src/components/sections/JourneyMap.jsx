import { useState, useEffect, useRef } from "react";
import { MapContainer, TileLayer, GeoJSON, CircleMarker, Tooltip, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { kakaskasenGeojson } from "../../data/kakaskasenGeojson";
import { journeyPoints } from "../../data/journeyPoints";

const MAP_CENTER = [1.3505, 124.831];
const MAP_ZOOM = 14;

const categoryConfig = {
  alam:    { color: "#3D6B17", bg: "#EEF5E6", border: "#C8DAB0", label: "Alam & Trekking",  emoji: "🌿" },
  budaya:  { color: "#7A6148", bg: "#F2EBE2", border: "#DDD0BC", label: "Budaya & Tradisi",  emoji: "🏛" },
  kuliner: { color: "#9A7B3C", bg: "#F5EDDB", border: "#E3D4B2", label: "Kuliner Lokal",     emoji: "🍽" },
  umkm:    { color: "#C0480A", bg: "#FAECE4", border: "#ECC9B4", label: "UMKM & Kerajinan",  emoji: "🧶" },
  edukasi: { color: "#4A7A6B", bg: "#E6F0EC", border: "#B8D4C8", label: "Edukasi & Bunga",   emoji: "🌸" },
};

const allFilters = [
  { cat: "all", label: "Semua Lokasi", color: "#2B4D0F", bg: "#EEF5E6", border: "#C8DAB0", emoji: "🗺" },
  ...Object.entries(categoryConfig).map(([cat, cfg]) => ({ cat, ...cfg })),
];

function getCounts() {
  const c = { all: journeyPoints.length };
  journeyPoints.forEach(p => { c[p.category] = (c[p.category] || 0) + 1; });
  return c;
}

const boundaryStyle = {
  fillColor: "#C8DAB0",
  fillOpacity: 0.22,
  color: "#2B4D0F",
  weight: 2.5,
  dashArray: null,
};

function FlyToFilter({ points }) {
  const map = useMap();
  useEffect(() => {
    if (points.length === 0) return;
    if (points.length === journeyPoints.length) {
      map.flyTo(MAP_CENTER, MAP_ZOOM, { duration: 0.8 });
      return;
    }
    const lats = points.map(p => p.coordinates[1]);
    const lngs = points.map(p => p.coordinates[0]);
    const bounds = [
      [Math.min(...lats) - 0.002, Math.min(...lngs) - 0.002],
      [Math.max(...lats) + 0.002, Math.max(...lngs) + 0.002],
    ];
    map.flyToBounds(bounds, { padding: [40, 40], duration: 0.8 });
  }, [points]);
  return null;
}

export default function JourneyMap() {
  const [activeFilter, setActiveFilter] = useState("all");
  const [selectedPoint, setSelectedPoint] = useState(null);
  const [mounted, setMounted] = useState(false);
  const counts = getCounts();

  useEffect(() => { setMounted(true); }, []);

  const visiblePoints = activeFilter === "all"
    ? journeyPoints
    : journeyPoints.filter(p => p.category === activeFilter);

  const selCfg = selectedPoint ? categoryConfig[selectedPoint.category] : null;
  const activeFilterCfg = allFilters.find(f => f.cat === activeFilter);

  return (
    <div className={"jm-root" + (mounted ? " jm-mounted" : "")}>

      {/* ─── SIDEBAR ─── */}
      <aside className="jm-sidebar">
        <div className="jm-sidebar-top">
          <div className="jm-sidebar-pill">
            <span className="jm-sidebar-pill-dot"></span>
            Peta Interaktif
          </div>
          <h3 className="jm-sidebar-heading">Jelajahi<br /><em>Kakaskasen II</em></h3>
          <p className="jm-sidebar-sub">{counts.all} destinasi di kawasan ini</p>
        </div>

        <div className="jm-filter-section">
          <div className="jm-filter-label">Filter Kategori</div>
          <div className="jm-filter-list">
            {allFilters.map(f => {
              const isActive = activeFilter === f.cat;
              return (
                <button
                  key={f.cat}
                  className={"jm-filter-btn" + (isActive ? " jm-filter-active" : "")}
                  style={isActive ? { "--fclr": f.color, "--fbg": f.bg, "--fborder": f.border } : {}}
                  onClick={() => { setActiveFilter(f.cat); if (isActive) return; setSelectedPoint(null); }}
                >
                  <span className="jm-filter-dot" style={{ background: f.color }}></span>
                  <span className="jm-filter-name">{f.label}</span>
                  <span className="jm-filter-count"
                    style={isActive ? { background: f.color, color: "#fff" } : {}}>
                    {counts[f.cat] ?? 0}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        <div className="jm-sep"></div>

        <div className="jm-detail">
          {selectedPoint && selCfg ? (
            <div className="jm-detail-card jm-detail-has-data">
              <div className="jm-detail-img-wrap">
                <img
                  className="jm-detail-img"
                  src={selectedPoint.image}
                  alt={selectedPoint.title}
                  onError={e => {
                    e.currentTarget.style.display = "none";
                    e.currentTarget.parentElement.classList.add("jm-img-error");
                  }}
                />
                <div className="jm-detail-img-shade"></div>
                <div className="jm-detail-cat-tag"
                  style={{ background: selCfg.bg, color: selCfg.color, border: "1px solid " + selCfg.border }}>
                  {selCfg.emoji} {selCfg.label}
                </div>
              </div>
              <div className="jm-detail-body">
                <div className="jm-detail-title">{selectedPoint.title}</div>
                <div className="jm-detail-text">{selectedPoint.text}</div>
                <button className="jm-detail-close" onClick={() => setSelectedPoint(null)}>
                  ✕ Tutup
                </button>
              </div>
            </div>
          ) : (
            <div className="jm-detail-card jm-detail-empty-state">
              <div className="jm-empty-icon">
                <svg width="44" height="44" viewBox="0 0 44 44" fill="none">
                  <circle cx="22" cy="22" r="21" stroke="#C8DAB0" strokeWidth="1.5"/>
                  <circle cx="22" cy="20" r="7.5" stroke="#3D6B17" strokeWidth="1.5"/>
                  <path d="M22 27.5 C18 31.5 15 35 22 40 C29 35 26 31.5 22 27.5Z"
                    stroke="#3D6B17" strokeWidth="1.5" strokeLinejoin="round" fill="none"/>
                  <circle cx="22" cy="20" r="2.5" fill="#3D6B17"/>
                </svg>
              </div>
              <div className="jm-empty-title">Pilih Destinasi</div>
              <div className="jm-empty-text">
                Klik titik pada peta untuk melihat informasi lengkap tentang lokasi.
              </div>
              {activeFilter !== "all" && activeFilterCfg && (
                <div className="jm-empty-hint"
                  style={{ background: activeFilterCfg.bg, color: activeFilterCfg.color, border: "1px solid " + activeFilterCfg.border }}>
                  {activeFilterCfg.emoji} {activeFilterCfg.label}
                </div>
              )}
            </div>
          )}
        </div>

        <div className="jm-legend">
          <div className="jm-legend-title">Legenda</div>
          <div className="jm-legend-grid">
            {Object.entries(categoryConfig).map(([cat, cfg]) => (
              <div key={cat} className="jm-legend-row">
                <span className="jm-legend-dot" style={{ background: cfg.color }}></span>
                <span className="jm-legend-lbl">{cfg.label}</span>
              </div>
            ))}
          </div>
        </div>
      </aside>

      {/* ─── MAP ─── */}
      <div className="jm-map-area">
        <div className="jm-map-canvas jm-leaflet-canvas">
          {mounted && (
            <MapContainer
              center={MAP_CENTER}
              zoom={MAP_ZOOM}
              style={{ width: "100%", height: "100%", minHeight: "640px" }}
              zoomControl={false}
              scrollWheelZoom={true}
              className="jm-leaflet-map"
            >
              {/* Terrain map tiles — CartoDB Voyager shows roads + natural features */}
              <TileLayer
                url="https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png"
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OSM</a> &copy; <a href="https://carto.com/attributions">CARTO</a>'
                subdomains="abcd"
                maxZoom={20}
              />

              {/* Village boundary */}
              <GeoJSON
                data={kakaskasenGeojson}
                style={boundaryStyle}
              />

              {/* Fly to filtered area */}
              <FlyToFilter points={visiblePoints} />

              {/* Location pins */}
              {visiblePoints.map(point => {
                const cfg = categoryConfig[point.category] || { color: "#2B4D0F" };
                const isSelected = selectedPoint?.id === point.id;
                const lat = point.coordinates[1];
                const lng = point.coordinates[0];

                return (
                  <CircleMarker
                    key={point.id}
                    center={[lat, lng]}
                    radius={isSelected ? 15 : 11}
                    pathOptions={{
                      fillColor: cfg.color,
                      color: "#ffffff",
                      weight: isSelected ? 3.5 : 3,
                      fillOpacity: 1,
                      opacity: 1,
                    }}
                    eventHandlers={{
                      click: () => setSelectedPoint(isSelected ? null : point),
                    }}
                  >
                    <Tooltip
                      permanent={false}
                      direction="top"
                      offset={[0, -14]}
                      opacity={1}
                      className="jm-leaflet-tooltip"
                    >
                      <div className="jm-tt-inner">
                        <div className="jm-tt-name">{point.name}</div>
                        <div className="jm-tt-badge"
                          style={{ background: cfg.bg, color: cfg.color, border: "1px solid " + cfg.border }}>
                          {cfg.emoji} {cfg.label}
                        </div>
                      </div>
                    </Tooltip>
                  </CircleMarker>
                );
              })}
            </MapContainer>
          )}

          {/* Map label badge */}
          <div className="jm-map-badge">
            <span className="jm-map-badge-dot"></span>
            Interactive Village Map
          </div>

          {/* Counter */}
          <div className="jm-map-counter">
            <span className="jm-map-counter-n">{visiblePoints.length}</span>
            <span className="jm-map-counter-u">lokasi</span>
          </div>
        </div>
      </div>
    </div>
  );
}
