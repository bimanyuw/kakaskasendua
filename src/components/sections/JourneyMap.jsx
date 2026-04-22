import { useMemo, useState } from "react";
import { MapContainer, TileLayer, Polygon, Marker, Tooltip } from "react-leaflet";
import L from "leaflet";
import { kakaskasenGeojson } from "../../data/kakaskasenGeojson";
import { journeyPoints } from "../../data/journeyPoints";

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

  // Ambil data polygon dari file geojson
  const polygonFeature = kakaskasenGeojson.features.find(
    (feature) => feature.geometry.type === "Polygon"
  );

  // Balik koordinat dari [lng, lat] (format GeoJSON) ke [lat, lng] (format Leaflet)
  const polygonPositions = polygonFeature.geometry.coordinates[0].map(
    coord => [coord[1], coord[0]]
  );

  const visiblePoints = useMemo(() => {
    if (activeFilter === "all") return journeyPoints;
    return journeyPoints.filter((point) => point.category === activeFilter);
  }, [activeFilter]);

  // Membuat icon titik secara dinamis agar warnanya sesuai kategori
  const createIcon = (color) => {
    return L.divIcon({
      className: "custom-leaflet-icon",
      html: `<div style="background-color: ${color}; width: 16px; height: 16px; border-radius: 50%; border: 3px solid white; box-shadow: 0 2px 4px rgba(0,0,0,0.3);"></div>`,
      iconSize: [16, 16],
      iconAnchor: [8, 8],
      popupAnchor: [0, -8],
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
              Klik marker pada peta untuk melihat detail lokasi.
            </div>
          )}
        </div>
      </div>

      <div className="kk-map-canvas" style={{ borderRadius: '4px', overflow: 'hidden', border: '1px solid var(--cream-dark)', minHeight: "520px", zIndex: 0 }}>
        {/* Bounds akan otomatis mengarahkan dan menyesuaikan zoom ke polygon Kakaskasen II */}
        <MapContainer 
          bounds={polygonPositions} 
          scrollWheelZoom={false} 
          style={{ height: "100%", width: "100%", minHeight: "520px", zIndex: 1 }}
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          
          <Polygon 
            positions={polygonPositions} 
            pathOptions={{ color: '#2B4D0F', fillColor: '#C8DAB0', fillOpacity: 0.25, weight: 2 }} 
          />
          
          {visiblePoints.map((point) => (
            <Marker 
              key={point.id} 
              position={[point.coordinates[1], point.coordinates[0]]}
              icon={createIcon(categoryColors[point.category] || "#2B4D0F")}
              eventHandlers={{
                click: () => setSelectedPoint(point),
              }}
            >
              <Tooltip direction="top" offset={[0, -10]} opacity={1}>
                <strong>{point.name}</strong>
              </Tooltip>
            </Marker>
          ))}
        </MapContainer>
      </div>
    </div>
  );
}