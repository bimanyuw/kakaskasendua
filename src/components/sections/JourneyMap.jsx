import { useMemo, useState, useEffect } from "react";
import { geoMercator, geoPath } from "d3-geo";
import { kakaskasenGeojson } from "../../data/kakaskasenGeojson";
import { journeyPoints } from "../../data/journeyPoints";

const WIDTH = 1100;
const HEIGHT = 680;

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

function getCountByCategory() {
  const c = { all: journeyPoints.length };
  journeyPoints.forEach(p => { c[p.category] = (c[p.category] || 0) + 1; });
  return c;
}

export default function JourneyMap() {
  const [activeFilter, setActiveFilter] = useState("all");
  const [selectedPoint, setSelectedPoint] = useState(null);
  const [hoveredPoint, setHoveredPoint] = useState(null);
  const [tooltipPos, setTooltipPos] = useState({ x: 0, y: 0 });
  const [isAreaHovered, setIsAreaHovered] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => { setMounted(true); }, []);

  const counts = useMemo(() => getCountByCategory(), []);

  const polygonFeature = kakaskasenGeojson.features.find(
    (f) => f.geometry.type === "Polygon"
  );

  const projection = useMemo(() =>
    geoMercator().fitExtent([[80, 80], [WIDTH - 80, HEIGHT - 80]], polygonFeature),
    [polygonFeature]
  );

  const pathGenerator = useMemo(() => geoPath(projection), [projection]);
  const areaPath = useMemo(() =>
    polygonFeature ? pathGenerator(polygonFeature) : "",
    [polygonFeature, pathGenerator]
  );

  const visiblePoints = useMemo(() =>
    activeFilter === "all" ? journeyPoints : journeyPoints.filter(p => p.category === activeFilter),
    [activeFilter]
  );

  const handlePointHover = (e, point) => {
    const svgRect = e.currentTarget.ownerSVGElement.getBoundingClientRect();
    setHoveredPoint(point);
    setTooltipPos({ x: e.clientX - svgRect.left, y: e.clientY - svgRect.top });
  };

  const selCfg = selectedPoint ? categoryConfig[selectedPoint.category] : null;
  const activeFilterCfg = allFilters.find(f => f.cat === activeFilter);

  return (
    <div className={"jm-root" + (mounted ? " jm-mounted" : "")}>

      {/* SIDEBAR */}
      <aside className="jm-sidebar">
        <div className="jm-sidebar-top">
          <div className="jm-sidebar-pill">
            <span className="jm-sidebar-pill-dot"></span>
            Peta Interaktif
          </div>
          <h3 className="jm-sidebar-heading">Jelajahi<br /><em>Kakaskasen II</em></h3>
          <p className="jm-sidebar-sub">
            {counts.all} destinasi di kawasan ini
          </p>
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
                  onClick={() => setActiveFilter(f.cat)}
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
                    e.currentTarget.parentElement.classList.add("jm-img-error");
                    e.currentTarget.style.display = "none";
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

      {/* MAP */}
      <div className="jm-map-area">
        <div className="jm-map-canvas">
          <div className="jm-map-badge">
            <span className="jm-map-badge-dot"></span>
            Interactive Village Map
          </div>

          <div className="jm-compass" aria-hidden="true">
            <svg viewBox="0 0 52 52" fill="none" xmlns="http://www.w3.org/2000/svg">
              <circle cx="26" cy="26" r="24" fill="rgba(248,245,239,0.97)" stroke="#EDE8DC" strokeWidth="1.5"/>
              <polygon points="26,7 29.5,23 26,20.5 22.5,23" fill="#2B4D0F"/>
              <polygon points="26,45 29.5,29 26,31.5 22.5,29" fill="#C9B8A2"/>
              <polygon points="45,26 29,22.5 31.5,26 29,29.5" fill="#C9B8A2"/>
              <polygon points="7,26 23,22.5 20.5,26 23,29.5" fill="#C9B8A2"/>
              <circle cx="26" cy="26" r="2.8" fill="#2B4D0F"/>
              <text x="26" y="14.5" textAnchor="middle" fontSize="7.5" fontWeight="800" fill="#2B4D0F" fontFamily="DM Sans,sans-serif">N</text>
            </svg>
          </div>

          <div className="jm-map-counter">
            <span className="jm-map-counter-n">{visiblePoints.length}</span>
            <span className="jm-map-counter-u">lokasi</span>
          </div>

          <svg
            className="jm-map-svg"
            viewBox={"0 0 " + WIDTH + " " + HEIGHT}
            preserveAspectRatio="xMidYMid meet"
          >
            <defs>
              <filter id="jmAreaGlow" x="-25%" y="-25%" width="150%" height="150%">
                <feDropShadow dx="0" dy="8" stdDeviation="20" floodColor="rgba(43,77,15,0.15)" />
              </filter>
              <filter id="jmPinGlow" x="-80%" y="-80%" width="260%" height="260%">
                <feDropShadow dx="0" dy="4" stdDeviation="6" floodColor="rgba(0,0,0,0.18)" />
              </filter>
              <radialGradient id="jmBgGrad" cx="35%" cy="35%" r="80%">
                <stop offset="0%" stopColor="#FAF8F3"/>
                <stop offset="100%" stopColor="#EAE4D8"/>
              </radialGradient>
              <pattern id="jmDots" width="32" height="32" patternUnits="userSpaceOnUse">
                <circle cx="16" cy="16" r="0.7" fill="rgba(122,97,72,0.12)"/>
              </pattern>
              <linearGradient id="jmBoundaryFill" x1="0" y1="0" x2="0.6" y2="1">
                <stop offset="0%" stopColor="rgba(200,218,176,0.32)"/>
                <stop offset="100%" stopColor="rgba(200,218,176,0.10)"/>
              </linearGradient>
            </defs>

            <rect x="0" y="0" width={WIDTH} height={HEIGHT} fill="url(#jmBgGrad)"/>
            <rect x="0" y="0" width={WIDTH} height={HEIGHT} fill="url(#jmDots)"/>

            {/* Decorative terrain zones */}
            <ellipse cx="255" cy="248" rx="145" ry="86" fill="rgba(61,107,23,0.045)"
              stroke="rgba(61,107,23,0.08)" strokeWidth="1" strokeDasharray="6 4"/>
            <ellipse cx="590" cy="255" rx="172" ry="90" fill="rgba(154,123,60,0.035)"
              stroke="rgba(154,123,60,0.08)" strokeWidth="1" strokeDasharray="6 4"/>
            <ellipse cx="898" cy="250" rx="128" ry="78" fill="rgba(74,122,107,0.04)"
              stroke="rgba(74,122,107,0.08)" strokeWidth="1" strokeDasharray="6 4"/>

            {/* Mountain silhouettes */}
            <path d="M 118 320 L 152 262 L 185 320 Z" fill="rgba(61,107,23,0.055)"/>
            <path d="M 155 320 L 196 248 L 236 320 Z" fill="rgba(61,107,23,0.035)"/>
            <path d="M 818 308 L 852 255 L 886 308 Z" fill="rgba(74,122,107,0.045)"/>
            <path d="M 852 308 L 880 262 L 908 308 Z" fill="rgba(74,122,107,0.03)"/>

            {/* Village boundary */}
            <path
              d={areaPath}
              onMouseEnter={() => setIsAreaHovered(true)}
              onMouseLeave={() => setIsAreaHovered(false)}
              style={{
                fill: isAreaHovered ? "rgba(43,77,15,0.13)" : "url(#jmBoundaryFill)",
                stroke: "#2B4D0F",
                strokeWidth: isAreaHovered ? 3 : 2.2,
                strokeLinejoin: "round",
                filter: "url(#jmAreaGlow)",
                transition: "fill 0.3s, stroke-width 0.2s",
              }}
            />

            {/* Pins */}
            {visiblePoints.map((point) => {
              const [x, y] = projection(point.coordinates);
              const cfg = categoryConfig[point.category] || { color: "#2B4D0F", bg: "#EEF5E6" };
              const isSelected = selectedPoint?.id === point.id;
              const isHov = hoveredPoint?.id === point.id;
              const r = isSelected ? 17 : isHov ? 15.5 : 13;

              return (
                <g
                  key={point.id}
                  onMouseMove={(e) => handlePointHover(e, point)}
                  onMouseEnter={(e) => handlePointHover(e, point)}
                  onMouseLeave={() => setHoveredPoint(null)}
                  onClick={() => setSelectedPoint(isSelected ? null : point)}
                  style={{ cursor: "pointer" }}
                  className="jm-svg-pin"
                >
                  {isSelected && (
                    <>
                      <circle cx={x} cy={y} r="36" fill={cfg.color} opacity="0.06" className="jm-pulse-outer"/>
                      <circle cx={x} cy={y} r="26" fill={cfg.color} opacity="0.10" className="jm-pulse-inner"/>
                      <circle cx={x} cy={y} r={r + 8} fill="none" stroke={cfg.color}
                        strokeWidth="1.5" opacity="0.3" strokeDasharray="4 3"/>
                    </>
                  )}
                  <circle cx={x} cy={y + 2.5} r={r + 2} fill="rgba(0,0,0,0.10)"/>
                  <circle cx={x} cy={y} r={r} fill={cfg.color} stroke="white" strokeWidth="3"
                    style={{ transition: "r 0.22s cubic-bezier(.34,1.56,.64,1)" }}
                    filter="url(#jmPinGlow)"/>
                  <circle cx={x} cy={y} r={r * 0.5} fill="rgba(255,255,255,0.28)"
                    style={{ transition: "r 0.22s ease" }}/>
                  <circle cx={x} cy={y} r={r * 0.26} fill="white"
                    style={{ transition: "r 0.22s ease" }}/>
                </g>
              );
            })}
          </svg>

          {/* Tooltip */}
          {hoveredPoint && (() => {
            const cfg = categoryConfig[hoveredPoint.category] || { color: "#2B4D0F", bg: "#EEF5E6", border: "#C8DAB0", label: hoveredPoint.category, emoji: "📍" };
            return (
              <div className="jm-tooltip" style={{ left: tooltipPos.x + 24, top: tooltipPos.y - 16 }}>
                <div className="jm-tt-header">
                  <span className="jm-tt-pin" style={{ background: cfg.color }}></span>
                  <span className="jm-tt-name">{hoveredPoint.name}</span>
                </div>
                <div className="jm-tt-badge"
                  style={{ background: cfg.bg, color: cfg.color, border: "1px solid " + cfg.border }}>
                  {cfg.emoji} {cfg.label}
                </div>
                {hoveredPoint.title !== hoveredPoint.name && (
                  <div className="jm-tt-sub">{hoveredPoint.title}</div>
                )}
                <div className="jm-tt-cta">Klik untuk detail →</div>
              </div>
            );
          })()}
        </div>
      </div>
    </div>
  );
}
