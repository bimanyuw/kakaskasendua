import FadeIn from "../ui/FadeIn";
import { galleryData } from "../../data/gallery";
import { useAdminCollection } from "../../hooks/useAdminCollection";

export default function GaleriSection() {
  const galleryItems = useAdminCollection("gallery", galleryData);

  return (
    <section className="kk-galeri kk-section" id="galeri">
      <div className="kk-section-inner">
        <FadeIn>
          <p className="kk-section-label">Koleksi Visual</p>
        </FadeIn>

        <FadeIn>
          <h2 className="kk-section-title">
            Galeri <em>Kakaskasen Dua</em>
          </h2>
        </FadeIn>

        <FadeIn>
          <div className="kk-galeri-grid">
            {galleryItems.map((item, index) => (
              <div key={index} className="kk-g-item">
                <img src={item.src} alt={item.alt} />
                <div className="kk-g-overlay">
                  <span className="kk-g-expand">Perbesar</span>
                </div>
              </div>
            ))}
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
