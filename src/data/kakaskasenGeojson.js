export const kakaskasenGeojson = {
  type: "FeatureCollection",
  name: "kakaskasen_dua_story_map",
  crs: {
    type: "name",
    properties: {
      name: "EPSG:4326",
    },
  },
  metadata: {
    title: "Kakaskasen Dua / Kakaskasen II Story Map Geometry",
    source: "Custom Coordinates",
    note: "Polygon diperbarui dengan titik detail batas wilayah yang baru.",
    status: "updated",
  },
  features: [
    {
      type: "Feature",
      properties: {
        id: "kakaskasen-polygon",
        name: "Batas Area Kakaskasen Dua",
        style: {
          fill: "#C8DAB0",
          fillOpacity: 0.22,
          stroke: "#2B4D0F",
          strokeWidth: 2,
        },
      },
      geometry: {
        type: "Polygon",
        coordinates: [
          [
            [124.862749, 1.353322], // Titik awal (Timur)
            [124.862894, 1.353096],
            [124.849941, 1.351499],
            [124.841161, 1.347953],
            [124.837389, 1.346960],
            [124.836140, 1.346404],
            [124.835102, 1.346268],
            [124.836099, 1.346376],
            [124.835024, 1.346242],
            [124.827992, 1.346280], // Area Selatan-Tengah
            [124.799195, 1.358041], // Area Barat (Lokon)
            [124.801082, 1.358414],
            [124.802888, 1.359212],
            [124.805308, 1.360891], // Barat Laut
            [124.819674, 1.353173],
            [124.829117, 1.351909],
            [124.834075, 1.351973],
            [124.834318, 1.351934],
            [124.862749, 1.353322]  // Titik akhir (Menutup ke titik awal)
          ]
        ],
      },
    }
  ],
};