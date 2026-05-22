import FadeIn from "../ui/FadeIn";
import JourneyMap from "./JourneyMap";

export default function JourneySection() {
  return (
    <section className="kk-journey kk-journey-clean kk-section" id="journey">
      <div className="kk-section-inner kk-journey-clean-inner">
        <div className="kk-journey-header kk-section-heading">
          <FadeIn>
            <p className="kk-section-label">Story Map</p>
          </FadeIn>

          <FadeIn>
            <h2 className="kk-section-title">
              Jelajahi titik cerita
              <br />
              <em className="kk-kd">Kakaskasen Dua</em>
            </h2>
          </FadeIn>

          <FadeIn>
            <p className="kk-section-body kk-journey-intro">
              Telusuri destinasi, fasilitas, dan aktivitas lokal melalui peta
              interaktif. Gunakan filter kategori, lalu klik titik pada peta
              untuk membuka detail lokasinya.
            </p>
          </FadeIn>
        </div>

        <FadeIn className="kk-journey-map-wrap">
          <JourneyMap />
        </FadeIn>
      </div>
    </section>
  );
}
