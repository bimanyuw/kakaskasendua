import { useState, useEffect, useRef } from "react";
import { MapContainer, TileLayer, GeoJSON, CircleMarker, Tooltip, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { kakaskasenGeojson } from "../../data/kakaskasenGeojson";
import { journeyPoints } from "../../data/journeyPoints";

const MAP_CENTER = [1.3505, 124.831];
const MAP_ZOOM = 14;

const categoryConfig = {
  wisata:     { color: "#3D6B17", bg: "#EEF5E6", border: "#C8DAB0", label: "Destinasi Wisata",  emoji: "🌿" },
  umkm_bunga: { color: "#C0480A", bg: "#FAECE4", border: "#ECC9B4", label: "UMKM Bunga",        emoji: "🌸" },
  fasilitas:  { color: "#4A7A6B", bg: "#E6F0EC", border: "#B8D4C8", label: "Fasilitas Umum",    emoji: "🏛" },
};

const allCategories = Object.keys(categoryConfig);

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

// Prevent map click-through on the filter popup
function FilterPopup({ activeCategories, onToggle, onToggleAll, counts, open, onClose, buttonRef }) {
  const popupRef = useRef(null);
  const allSelected = activeCategories.length === allCategories.length;

  useEffect(() => {
    if (!open) return;
    function handleClick(e) {
      if (
        popupRef.current && !popupRef.current.contains(e.target) &&
        buttonRef.current && !buttonRef.current.contains(e.target)
      ) {
        onClose();
      }
    }
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, [open, onClose, buttonRef]);

  if (!open) return null;

  return (
    <div
      ref={popupRef}
      className="jm-filter-popup"
      onClick={e => e.stopPropagation()}
      onMouseDown={e => e.stopPropagation()}
    >
      <div className="jm-fp-header">
        <span className="jm-fp-title">Filter Kategori</span>
        <button className="jm-fp-close" onClick={onClose}>✕</button>
      </div>

      {/* Semua Lokasi toggle */}
      <button
        className={"jm-fp-row jm-fp-row-all" + (allSelected ? " jm-fp-row-active-all" : "")}
        onClick={onToggleAll}
      >
        <span className="jm-fp-check">{allSelected ? "✓" : ""}</span>
        <span className="jm-fp-dot" style={{ background: "#2B4D0F" }}></span>
        <span className="jm-fp-name">Semua Lokasi</span>
        <span className="jm-fp-count">{counts.all}</span>
      </button>

      <div className="jm-fp-divider"></div>

      {allCategories.map(cat => {
        const cfg = categoryConfig[cat];
        const isOn = activeCategories.includes(cat);
        return (
          <button
            key={cat}
            className={"jm-fp-row" + (isOn ? " jm-fp-row-active" : "")}
            style={isOn ? { "--fclr": cfg.color, "--fbg": cfg.bg, "--fborder": cfg.border } : {}}
            onClick={() => onToggle(cat)}
          >
            <span className="jm-fp-check" style={isOn ? { color: cfg.color } : {}}>{isOn ? "✓" : ""}</span>
            <span className="jm-fp-dot" style={{ background: cfg.color }}></span>
            <span className="jm-fp-name">{cfg.label}</span>
            <span
              className="jm-fp-count"
              style={isOn ? { background: cfg.color, color: "#fff" } : {}}
            >
              {counts[cat] ?? 0}
            </span>
          </button>
        );
      })}

      {/* Legend inside popup */}
      <div className="jm-fp-divider"></div>
      <div className="jm-fp-legend-title">Legenda</div>
      {allCategories.map(cat => {
        const cfg = categoryConfig[cat];
        return (
          <div key={cat} className="jm-fp-legend-row">
            <span className="jm-fp-legend-dot" style={{ background: cfg.color }}></span>
            <span className="jm-fp-legend-lbl">{cfg.emoji} {cfg.label}</span>
          </div>
        );
      })}
    </div>
  );
}

export default function JourneyMap() {
  const [activeCategories, setActiveCategories] = useState(allCategories);
  const [selectedPoint, setSelectedPoint] = useState(null);
  const [mounted, setMounted] = useState(false);
  const [filterOpen, setFilterOpen] = useState(false);
  const filterBtnRef = useRef(null);
  const counts = getCounts();

  useEffect(() => { setMounted(true); }, []);

  const visiblePoints = journeyPoints.filter(p => activeCategories.includes(p.category));

  const selCfg = selectedPoint ? categoryConfig[selectedPoint.category] : null;

  function toggleCategory(cat) {
    setActiveCategories(prev =>
      prev.includes(cat) ? prev.filter(c => c !== cat) : [...prev, cat]
    );
    setSelectedPoint(null);
  }

  function toggleAll() {
    if (activeCategories.length === allCategories.length) {
      setActiveCategories([]);
    } else {
      setActiveCategories(allCategories);
    }
    setSelectedPoint(null);
  }

  return (
    <div className={"jm-root jm-root-fullmap" + (mounted ? " jm-mounted" : "")}>

      {/* ─── MAP FULL WIDTH ─── */}
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
              <TileLayer
                url="https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png"
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OSM</a> &copy; <a href="https://carto.com/attributions">CARTO</a>'
                subdomains="abcd"
                maxZoom={20}
              />

              <GeoJSON data={kakaskasenGeojson} style={boundaryStyle} />
              <FlyToFilter points={visiblePoints} />

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

          {/* Map badge top-left */}
          <div className="jm-map-badge">
            <span className="jm-map-badge-dot"></span>
            Peta Interaktif Desa
          </div>

          {/* ── FILTER BUTTON inside map ── */}
          <button
            ref={filterBtnRef}
            className={"jm-filter-toggle-btn" + (filterOpen ? " jm-filter-toggle-open" : "")}
            onClick={e => { e.stopPropagation(); setFilterOpen(v => !v); }}
            title="Filter Kategori"
          >
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M2 4h12M4 8h8M6 12h4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round"/>
            </svg>
            <span>Filter Kategori</span>
            {activeCategories.length < allCategories.length && (
              <span className="jm-filter-toggle-badge">{activeCategories.length}</span>
            )}
          </button>

          {/* ── FILTER POPUP inside map ── */}
          <FilterPopup
            activeCategories={activeCategories}
            onToggle={toggleCategory}
            onToggleAll={toggleAll}
            counts={counts}
            open={filterOpen}
            onClose={() => setFilterOpen(false)}
            buttonRef={filterBtnRef}
          />

          {/* ── DETAIL CARD inside map (bottom-left, when point selected) ── */}
          {selectedPoint && selCfg && (
            <div className="jm-inmap-detail">
              <div className="jm-inmap-detail-cat"
                style={{ background: selCfg.bg, color: selCfg.color, border: "1px solid " + selCfg.border }}>
                {selCfg.emoji} {selCfg.label}
              </div>
              <div className="jm-inmap-detail-title">{selectedPoint.title}</div>
              <div className="jm-inmap-detail-text">{selectedPoint.text}</div>
              <button className="jm-inmap-detail-close" onClick={() => setSelectedPoint(null)}>
                ✕ Tutup
              </button>
            </div>
          )}

          {/* Legend bottom-right (permanent) — hidden when detail card is open */}
          <div className={"jm-inmap-legend" + (selectedPoint ? " jm-inmap-legend-hidden" : "")}>
            <div className="jm-inmap-legend-title">Legenda</div>
            {Object.entries(categoryConfig).map(([cat, cfg]) => (
              <div key={cat} className="jm-inmap-legend-row">
                <span className="jm-inmap-legend-dot" style={{ background: cfg.color }}></span>
                <span className="jm-inmap-legend-lbl">{cfg.label}</span>
              </div>
            ))}
            <div className="jm-inmap-legend-row">
              <span className="jm-inmap-legend-dot jm-inmap-legend-dot-border"></span>
              <span className="jm-inmap-legend-lbl">Batas Desa</span>
            </div>
          </div>

          {/* Counter bottom-right */}
          <div className="jm-map-counter">
            <span className="jm-map-counter-n">{visiblePoints.length}</span>
            <span className="jm-map-counter-u">lokasi</span>
          </div>
        </div>
      </div>
    </div>
  );
}
