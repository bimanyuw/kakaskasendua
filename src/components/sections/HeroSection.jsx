import { useEffect } from "react";

export default function HeroSection() {
  useEffect(() => {
    const items = document.querySelectorAll(".kk-hero-anim");
    const timers = Array.from(items, (el, i) =>
      window.setTimeout(() => el.classList.add("kk-hero-visible"), 150 + i * 180)
    );

    return () => timers.forEach(window.clearTimeout);
  }, []);

  return (
    <section className="kk-hero" id="beranda">
      <div className="kk-hero-bg"></div>
      <div className="kk-hero-grain"></div>
      <div className="kk-hero-mountain kk-hero-mountain-far"></div>
      <div className="kk-hero-mountain kk-hero-mountain-near"></div>
      <div className="kk-hero-vignette"></div>

      <div className="kk-hero-content">
        <div className="kk-hero-tag kk-hero-anim">
          Desa Wisata · Tomohon Utara · Sulawesi Utara
        </div>

        <h1 className="kk-hero-anim">
          Menjelajahi desa
          <br />
          melalui <em>cerita,</em>
          <br />
          alam, dan karya
        </h1>

        <p className="kk-hero-sub kk-hero-anim">
          Portal digital Desa Wisata Kakaskasen Dua — mengenal destinasi,
          menelusuri peta cerita, dan melihat potensi lokal di kaki Gunung Lokon.
        </p>

        <div className="kk-hero-btns kk-hero-anim">
          <a href="#journey" className="kk-btn-primary">
            Jelajahi Journey Map
            <span className="kk-btn-arrow">v</span>
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

        <div className="kk-hero-stats kk-hero-anim">
          {[
            { n: "7+", l: "Atraksi Wisata" },
            { n: "+/-850m", l: "Ketinggian" },
            { n: "2", l: "Gunung Aktif" },
            { n: "Jadesta", l: "Terdaftar" },
          ].map((s) => (
            <div className="kk-hero-stat" key={s.n}>
              <span className="kk-hero-stat-n">{s.n}</span>
              <span className="kk-hero-stat-l">{s.l}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="kk-hero-scroll kk-hero-anim">
        <div className="kk-hero-scroll-line"></div>
        <span>Scroll</span>
      </div>
    </section>
  );
}
