import { useMemo, useState } from "react";
import { geoMercator, geoPath } from "d3-geo";
import { kakaskasenGeojson } from "../../data/kakaskasenGeojson";
import { journeyPoints } from "../../data/journeyPoints";

const WIDTH = 900;
const HEIGHT = 560;

const filters = [
  { cat: "all", label: "Semua Lokasi", color: "#2B4D0F" },
  { cat: "alam", label: "Alam & Trekking", color: "#3D6B17" },
  { cat: "budaya", label: "Budaya & Tradisi", color: "#7A6148" },
  { cat: "kuliner", label: "Kuliner Lokal", color: "#9A7B3C" },
  { cat: "umkm", label: "UMKM & Kerajinan", color: "#C0480A" },
  { cat: "edukasi", label: "Edukasi & Bunga", color: "#4A7A6B" },
];

const categoryColors = {
  alam: "#3D6B17",
  budaya: "#7A6148",
  kuliner: "#9A7B3C",
  umkm: "#C0480A",
  edukasi: "#4A7A6B",
};

export default function JourneyMap() {
  const [activeFilter, setActiveFilter] = useState("all");
  const [selectedPoint, setSelectedPoint] = useState(null);
  const [hoveredPoint, setHoveredPoint] = useState(null);
  const [tooltipPos, setTooltipPos] = useState({ x: 0, y: 0 });
  const [isAreaHovered, setIsAreaHovered] = useState(false);

  const polygonFeature = kakaskasenGeojson.features.find(
    (feature) => feature.geometry.type === "Polygon"
  );

  const labelPoint = kakaskasenGeojson.features.find(
    (feature) => feature.geometry.type === "Point"
  );

  const projection = useMemo(() => {
    return geoMercator().fitSize([WIDTH, HEIGHT], polygonFeature);
  }, [polygonFeature]);

  const pathGenerator = useMemo(() => geoPath(projection), [projection]);

  const areaPath = useMemo(() => {
    return polygonFeature ? pathGenerator(polygonFeature) : "";
  }, [polygonFeature, pathGenerator]);

  const projectedLabelPoint = useMemo(() => {
    if (!labelPoint) return null;
    return projection(labelPoint.geometry.coordinates);
  }, [labelPoint, projection]);

  const visiblePoints = useMemo(() => {
    if (activeFilter === "all") return journeyPoints;
    return journeyPoints.filter((point) => point.category === activeFilter);
  }, [activeFilter]);

  const handleMarkerHover = (event, point) => {
    const svgRect = event.currentTarget.ownerSVGElement.getBoundingClientRect();
    setHoveredPoint(point);
    setTooltipPos({
      x: event.clientX - svgRect.left,
      y: event.clientY - svgRect.top,
    });
  };

  return (
    <div className="kk-journey-wrap">
      <div className="kk-journey-sidebar">
        <h3>Filter Kategori</h3>

        <ul className="kk-filter-list">
          {filters.map((filter) => (
            <li
              key={filter.cat}
              className={`kk-filter-item${activeFilter === filter.cat ? " active" : ""}`}
              onClick={() => {
                setActiveFilter(filter.cat);
                if (
                  selectedPoint &&
                  filter.cat !== "all" &&
                  selectedPoint.category !== filter.cat
                ) {
                  setSelectedPoint(null);
                }
              }}
            >
              <span
                className="kk-filter-dot"
                style={{ background: filter.color }}
              ></span>
              {filter.label}
            </li>
          ))}
        </ul>

        <div className="kk-filter-divider"></div>

        <div className={`kk-pinned-info${selectedPoint ? " has-data" : ""}`}>
          {selectedPoint ? (
            <>
              <img
                className="kk-pinned-img"
                src={selectedPoint.image}
                alt={selectedPoint.title}
              />
              <div className="kk-pinned-body">
                <div className="kk-pinned-cat">{selectedPoint.category}</div>
                <div className="kk-pinned-title">{selectedPoint.title}</div>
                <div className="kk-pinned-text">{selectedPoint.text}</div>
              </div>
            </>
          ) : (
            <div className="kk-pinned-empty">
              Hover marker untuk preview. Klik marker untuk melihat detail lokasi
              secara permanen.
            </div>
          )}
        </div>
      </div>

      <div className="kk-map-canvas">
        <div className="kk-map-compass">N</div>
        <div className="kk-map-scale">Journey Map Kakaskasen II</div>

        <svg
          className="kk-map-svg-premium"
          viewBox={`0 0 ${WIDTH} ${HEIGHT}`}
          preserveAspectRatio="xMidYMid meet"
        >
          <defs>
            <filter id="kkShadow" x="-20%" y="-20%" width="140%" height="140%">
              <feDropShadow dx="0" dy="8" stdDeviation="12" floodOpacity="0.16" />
            </filter>

            <pattern
              id="kkGrid"
              width="36"
              height="36"
              patternUnits="userSpaceOnUse"
            >
              <path
                d="M 36 0 L 0 0 0 36"
                fill="none"
                stroke="rgba(122,97,72,0.05)"
                strokeWidth="1"
              />
            </pattern>
          </defs>

          <rect
            x="0"
            y="0"
            width={WIDTH}
            height={HEIGHT}
            fill="url(#kkGrid)"
          />

          <path
            d={areaPath}
            className="kk-desa-boundary"
            onMouseEnter={() => setIsAreaHovered(true)}
            onMouseLeave={() => setIsAreaHovered(false)}
            style={{
              fill: isAreaHovered
                ? "rgba(200,218,176,0.32)"
                : "rgba(200,218,176,0.22)",
              stroke: "#2B4D0F",
              strokeWidth: isAreaHovered ? 3 : 2,
              filter: "url(#kkShadow)",
            }}
          />

          <g opacity="0.35">
            <path
              d="M260 120 C 340 140, 420 170, 520 180 S 700 190, 760 210"
              stroke="rgba(122,97,72,0.18)"
              strokeWidth="3"
              fill="none"
              strokeLinecap="round"
            />
            <path
              d="M280 330 C 360 320, 430 310, 510 305 S 640 295, 730 270"
              stroke="rgba(122,97,72,0.15)"
              strokeWidth="2.2"
              fill="none"
              strokeLinecap="round"
            />
            <path
              d="M420 90 C 430 160, 440 240, 445 360 S 450 460, 455 520"
              stroke="rgba(122,97,72,0.12)"
              strokeWidth="2"
              fill="none"
              strokeLinecap="round"
            />
          </g>

          <g opacity="0.22">
            <rect x="315" y="210" width="36" height="18" rx="3" fill="rgba(43,77,15,0.18)" />
            <rect x="360" y="228" width="42" height="20" rx="3" fill="rgba(43,77,15,0.16)" />
            <rect x="412" y="235" width="30" height="16" rx="3" fill="rgba(43,77,15,0.14)" />
            <rect x="470" y="245" width="44" height="18" rx="3" fill="rgba(43,77,15,0.16)" />
            <rect x="520" y="210" width="34" height="17" rx="3" fill="rgba(43,77,15,0.15)" />
            <rect x="555" y="280" width="38" height="18" rx="3" fill="rgba(43,77,15,0.15)" />
            <rect x="390" y="300" width="40" height="18" rx="3" fill="rgba(43,77,15,0.14)" />
          </g>

          <g opacity="0.18">
            <circle cx="610" cy="255" r="18" fill="rgba(74,122,107,0.18)" />
            <circle cx="630" cy="270" r="12" fill="rgba(74,122,107,0.14)" />
          </g>

          <text x="340" y="205" className="kk-map-mini-label">
            Permukiman
          </text>
          <text x="585" y="245" className="kk-map-mini-label">
            Area Hijau
          </text>
          <text x="455" y="120" className="kk-map-mini-label">
            Koridor Utama
          </text>

          {projectedLabelPoint && (
            <>
              <circle
                cx={projectedLabelPoint[0]}
                cy={projectedLabelPoint[1]}
                r="6"
                fill="#2B4D0F"
              />
              <text
                x={projectedLabelPoint[0] + 10}
                y={projectedLabelPoint[1] - 10}
                className="kk-map-label"
              >
                Kakaskasen II
              </text>
            </>
          )}

          {visiblePoints.map((point) => {
            const [x, y] = projection(point.coordinates);
            const color = categoryColors[point.category] || "#2B4D0F";
            const isSelected = selectedPoint?.id === point.id;

            return (
              <g
                key={point.id}
                className="kk-premium-pin"
                onMouseMove={(event) => handleMarkerHover(event, point)}
                onMouseEnter={(event) => handleMarkerHover(event, point)}
                onMouseLeave={() => setHoveredPoint(null)}
                onClick={() => setSelectedPoint(point)}
                style={{ cursor: "pointer" }}
              >
                {isSelected && (
                  <circle
                    cx={x}
                    cy={y}
                    r="22"
                    fill={color}
                    opacity="0.18"
                  />
                )}

                <circle
                  cx={x}
                  cy={y}
                  r="12"
                  fill={color}
                  stroke="#ffffff"
                  strokeWidth="4"
                />
                <circle
                  cx={x}
                  cy={y}
                  r="4"
                  fill="#ffffff"
                />

                <rect
                  x={x - 30}
                  y={y + 16}
                  width="60"
                  height="18"
                  rx="4"
                  fill="rgba(255,255,255,0.95)"
                  stroke="rgba(0,0,0,0.06)"
                />
                <text
                  x={x}
                  y={y + 28}
                  textAnchor="middle"
                  className="kk-pin-label"
                >
                  {point.name}
                </text>
              </g>
            );
          })}
        </svg>

        {hoveredPoint && (
          <div
            className="kk-map-hover-card"
            style={{
              left: tooltipPos.x + 16,
              top: tooltipPos.y - 20,
            }}
          >
            <div className="kk-map-hover-title">{hoveredPoint.name}</div>
            <div
              className="kk-map-hover-badge"
              style={{
                background: `${categoryColors[hoveredPoint.category] || "#3046b8"}22`,
                color: categoryColors[hoveredPoint.category] || "#3046b8",
              }}
            >
              {hoveredPoint.category}
            </div>
            <div className="kk-map-hover-text">{hoveredPoint.title}</div>
          </div>
        )}
      </div>
    </div>
  );
}