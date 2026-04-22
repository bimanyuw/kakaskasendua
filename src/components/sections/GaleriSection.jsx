import FadeIn from "../ui/FadeIn";
import { galleryData } from "../../data/gallery";

export default function GaleriSection() {
  return (
    <section className="kk-galeri kk-section" id="galeri">
      <div className="kk-section-inner">
        <FadeIn>
          <p className="kk-section-label">Koleksi Visual</p>
        </FadeIn>

        <FadeIn>
          <h2 className="kk-section-title">
            Galeri <em>Kakaskasen II</em>
          </h2>
        </FadeIn>

        <FadeIn>
          <div className="kk-galeri-grid">
            {galleryData.map((item, index) => (
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