export default function HeroSection() {
  return (
    <section className="kk-hero" id="beranda">
      <div className="kk-hero-bg"></div>

      <div className="kk-hero-content">
        <div className="kk-hero-tag">
          Desa Wisata · Tomohon Utara · Sulawesi Utara
        </div>

        <h1>
          Menjelajahi desa
          <br />
          melalui <em>cerita,</em>
          <br />
          alam, dan karya
        </h1>

        <p className="kk-hero-sub">
          Portal digital Desa Wisata Kakaskasen Dua — mengenal destinasi,
          menelusuri peta cerita, dan melihat potensi lokal.
        </p>

        <div className="kk-hero-btns">
          <a href="#journey" className="kk-btn-primary">
            Jelajahi Journey Map
          </a>
          <a
            href="https://jadesta.kemenparekraf.go.id"
            target="_blank"
            rel="noreferrer"
            className="kk-btn-outline"
          >
            Lihat Paket Wisata
          </a>
        </div>
      </div>

      <div className="kk-hero-scroll">
        <div className="kk-hero-scroll-line"></div>
        <span>Scroll</span>
      </div>
    </section>
  );
}