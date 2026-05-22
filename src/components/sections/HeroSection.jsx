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
      <div className="kk-hero-bg" aria-hidden="true"></div>
      <video
        className="kk-hero-video"
        autoPlay
        muted
        loop
        playsInline
        preload="metadata"
        aria-hidden="true"
      >
        <source src="/videos/hero.mp4" type="video/mp4" />
      </video>
      <div className="kk-hero-grain" aria-hidden="true"></div>
      <div className="kk-hero-vignette" aria-hidden="true"></div>

      <div className="kk-hero-content">
        <p className="kk-hero-kicker kk-hero-anim">Desa Wisata Tomohon Utara</p>
        <h1 className="kk-hero-anim">
          <span>KAKASKASEN</span>
          <span>DUA</span>
        </h1>
        <p className="kk-hero-sub kk-hero-anim">A VILLAGE OF MANY STORIES</p>
      </div>

      <div className="kk-hero-bottom kk-hero-anim">
        <a className="kk-hero-scroll" href="#tentang" aria-label="Scroll ke bagian tentang">
          <span></span>
        </a>
      </div>
    </section>
  );
}
