import { galleryData } from "./gallery";
import { journeyPoints } from "./journeyPoints";
import { umkmData } from "./umkm";
import { wisataData } from "./wisata";

export const adminCollections = {
  storyMap: {
    label: "Story Map",
    fallback: journeyPoints,
  },
  wisata: {
    label: "Wisata & Aktivitas",
    fallback: wisataData,
  },
  marketplace: {
    label: "Marketplace",
    fallback: umkmData,
  },
  gallery: {
    label: "Galeri Kakaskasen",
    fallback: galleryData,
  },
};
