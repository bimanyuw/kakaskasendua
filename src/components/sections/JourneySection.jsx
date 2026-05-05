import FadeIn from "../ui/FadeIn";
import JourneyMap from "./JourneyMap";

export default function JourneySection() {
  return (
    <section className="kk-journey kk-section" id="journey">
      <div className="kk-section-inner">
        <div className="kk-journey-header">
          <FadeIn>
            <p className="kk-section-label">Fitur Utama</p>
          </FadeIn>

          <FadeIn>
            <h2 className="kk-section-title">
              Story Map
              <br />
              <em>Cerita Desa Kakaskasen Dua</em>
            </h2>
          </FadeIn>

          <FadeIn>
            <p className="kk-section-body kk-journey-intro">
              Setiap sudut Desa Kakaskasen Dua menyimpan cerita. Mulai dari
              objek wisata, fasilitas yang tersedia, hingga aktivitas UMKM bunga
              yang menjadi identitas desa. Sebelum berkunjung, telusuri Desa
              Kakaskasen Dua melalui peta interaktif yang disusun bersama
              masyarakat lokal!
              <br />
              <br />
              Klik titik pada peta dan rasakan bagaimana Desa Kakaskasen Dua
              diceritakan dari sudut pandang masyarakat.
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
