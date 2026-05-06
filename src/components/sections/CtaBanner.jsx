import FadeIn from "../ui/FadeIn";

export default function CtaBanner() {
  const cards = [
    {
      icon: "01",
      title: "Rencanakan Kunjungan",
      desc: "Lihat paket resmi, pilih aktivitas, dan susun perjalanan yang sesuai.",
    },
    {
      icon: "02",
      title: "Temui Cerita Lokal",
      desc: "Jelajahi peta cerita untuk menemukan lanskap, UMKM, dan titik budaya desa.",
    },
    {
      icon: "03",
      title: "Hubungi Pengelola",
      desc: "Dapatkan arahan langsung untuk kunjungan, kolaborasi, atau informasi terbaru.",
    },
  ];

  return (
    <div className="kk-cta-banner">
      <div className="kk-cta-glow"></div>
      <div className="kk-cta-inner">
        <FadeIn>
          <div className="kk-cta-eyebrow">
            <span className="kk-cta-eyebrow-dot"></span>
            Desa Wisata Kakaskasen Dua
          </div>
          <h2 className="kk-cta-title">
            Siap menjelajahi
            <br />
            <em>Kakaskasen Dua?</em>
          </h2>
          <p className="kk-cta-desc">
            Hubungi pengelola atau lihat paket resmi di Jadesta untuk
            merencanakan kunjungan yang lebih terarah.
          </p>
        </FadeIn>

        <FadeIn>
          <div className="kk-cta-cards">
            {cards.map((card) => (
              <div className="kk-cta-card" key={card.title}>
                <span className="kk-cta-card-icon">{card.icon}</span>
                <div>
                  <div className="kk-cta-card-title">{card.title}</div>
                  <div className="kk-cta-card-desc">{card.desc}</div>
                </div>
              </div>
            ))}
          </div>

          <div className="kk-cta-btns kk-cta-btns-upgraded">
            <a
              href="https://jadesta.kemenparekraf.go.id"
              target="_blank"
              rel="noreferrer"
              className="kk-cta-btn-white"
            >
              Lihat Paket Wisata
            </a>
            <a href="#kontak" className="kk-cta-btn-ghost">
              Hubungi Pengelola
            </a>
          </div>
        </FadeIn>
      </div>
    </div>
  );
}
