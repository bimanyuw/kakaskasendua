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
    source: "OpenStreetMap export area (bbox) + illustrative internal features",
    note: "Polygon utama masih berupa area export OSM, bukan batas administratif resmi desa.",
    status: "prototype",
  },
  features: [
    {
      type: "Feature",
      properties: {
        id: "kakaskasen-bbox",
        name: "Area Export OSM Kakaskasen Dua",
        alt_name: "Kakaskasen II",
        feature_type: "area_extent",
        geometry_status: "approximate",
        description:
          "Ini adalah area hasil export OpenStreetMap, bukan batas administratif resmi desa.",
        style: {
          fill: "#C8DAB0",
          fillOpacity: 0.22,
          stroke: "#2B4D0F",
          strokeWidth: 2,
        },
      },
      geometry: {
        type: "Polygon",
        coordinates: [[
          [124.8228, 1.34504],
          [124.8446, 1.34504],
          [124.8446, 1.35744],
          [124.8228, 1.35744],
          [124.8228, 1.34504],
        ]],
      },
    },

    {
      type: "Feature",
      properties: {
        id: "kakaskasen-center",
        name: "Kakaskasen Dua",
        alt_name: "Kakaskasen II",
        feature_type: "label_point",
        geometry_status: "approximate",
        label: true,
      },
      geometry: {
        type: "Point",
        coordinates: [124.8325761, 1.3509759],
      },
    },

    {
      type: "Feature",
      properties: {
        id: "north-edge",
        name: "Batas Utara Area",
        feature_type: "reference_edge",
      },
      geometry: {
        type: "LineString",
        coordinates: [
          [124.8228, 1.35744],
          [124.8446, 1.35744],
        ],
      },
    },

    {
      type: "Feature",
      properties: {
        id: "south-edge",
        name: "Batas Selatan Area",
        feature_type: "reference_edge",
      },
      geometry: {
        type: "LineString",
        coordinates: [
          [124.8228, 1.34504],
          [124.8446, 1.34504],
        ],
      },
    },

    {
      type: "Feature",
      properties: {
        id: "west-edge",
        name: "Batas Barat Area",
        feature_type: "reference_edge",
      },
      geometry: {
        type: "LineString",
        coordinates: [
          [124.8228, 1.34504],
          [124.8228, 1.35744],
        ],
      },
    },

    {
      type: "Feature",
      properties: {
        id: "east-edge",
        name: "Batas Timur Area",
        feature_type: "reference_edge",
      },
      geometry: {
        type: "LineString",
        coordinates: [
          [124.8446, 1.34504],
          [124.8446, 1.35744],
        ],
      },
    },

    {
      type: "Feature",
      properties: {
        id: "northwest-corner",
        name: "Sudut Barat Laut",
        feature_type: "reference_corner",
      },
      geometry: {
        type: "Point",
        coordinates: [124.8228, 1.35744],
      },
    },

    {
      type: "Feature",
      properties: {
        id: "northeast-corner",
        name: "Sudut Timur Laut",
        feature_type: "reference_corner",
      },
      geometry: {
        type: "Point",
        coordinates: [124.8446, 1.35744],
      },
    },

    {
      type: "Feature",
      properties: {
        id: "southwest-corner",
        name: "Sudut Barat Daya",
        feature_type: "reference_corner",
      },
      geometry: {
        type: "Point",
        coordinates: [124.8228, 1.34504],
      },
    },

    {
      type: "Feature",
      properties: {
        id: "southeast-corner",
        name: "Sudut Timur Daya",
        feature_type: "reference_corner",
      },
      geometry: {
        type: "Point",
        coordinates: [124.8446, 1.34504],
      },
    },

    {
      type: "Feature",
      properties: {
        id: "story-axis",
        name: "Koridor Cerita Utama",
        feature_type: "story_axis",
        geometry_status: "illustrative",
        description:
          "Garis ilustratif untuk membantu alur visual journey map pada versi prototipe.",
        style: {
          stroke: "#7A6148",
          strokeWidth: 2,
          dashArray: "6 4",
        },
      },
      geometry: {
        type: "LineString",
        coordinates: [
          [124.8275, 1.3545],
          [124.8328, 1.3510],
          [124.8385, 1.3496],
          [124.8415, 1.3478],
        ],
      },
    },

    {
      type: "Feature",
      properties: {
        id: "subzone-lokon",
        name: "Zona Lokon",
        feature_type: "subzone",
        category: "alam",
        geometry_status: "illustrative",
        style: {
          fill: "#3D6B17",
          fillOpacity: 0.08,
          stroke: "#3D6B17",
          strokeWidth: 1,
        },
      },
      geometry: {
        type: "Polygon",
        coordinates: [[
          [124.8242, 1.3528],
          [124.8294, 1.3528],
          [124.8294, 1.3565],
          [124.8242, 1.3565],
          [124.8242, 1.3528],
        ]],
      },
    },

    {
      type: "Feature",
      properties: {
        id: "subzone-village-core",
        name: "Area Inti Kakaskasen II",
        feature_type: "subzone",
        category: "permukiman",
        geometry_status: "illustrative",
        style: {
          fill: "#C8DAB0",
          fillOpacity: 0.12,
          stroke: "#2B4D0F",
          strokeWidth: 1,
        },
      },
      geometry: {
        type: "Polygon",
        coordinates: [[
          [124.8295, 1.3488],
          [124.8392, 1.3488],
          [124.8392, 1.3532],
          [124.8295, 1.3532],
          [124.8295, 1.3488],
        ]],
      },
    },

    {
      type: "Feature",
      properties: {
        id: "subzone-mahawu",
        name: "Zona Mahawu",
        feature_type: "subzone",
        category: "alam",
        geometry_status: "illustrative",
        style: {
          fill: "#3D6B17",
          fillOpacity: 0.06,
          stroke: "#3D6B17",
          strokeWidth: 1,
        },
      },
      geometry: {
        type: "Polygon",
        coordinates: [[
          [124.8385, 1.3505],
          [124.8435, 1.3505],
          [124.8435, 1.3555],
          [124.8385, 1.3555],
          [124.8385, 1.3505],
        ]],
      },
    },
  ],
};