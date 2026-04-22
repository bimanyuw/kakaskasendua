import FadeIn from "../ui/FadeIn";

export default function AboutSection() {
  return (
    <section className="kk-about kk-section" id="tentang">
      <div className="kk-section-inner">
        <div className="kk-about-grid">
          <FadeIn>
            <p className="kk-section-label">Mengenal Desa</p>
            <h2 className="kk-section-title">
              Kakaskasen II —
              <br />
              di antara <em>gunung dan bunga</em>
            </h2>

            <div className="kk-divider"></div>

            <p className="kk-section-body">
              Desa Wisata Kakaskasen II terletak di Kelurahan Kakaskasen Dua,
              Kecamatan Tomohon Utara, Kota Tomohon, Sulawesi Utara.
              Dikelilingi lanskap vulkanik dari Gunung Lokon dan Gunung Mahawu,
              desa ini menawarkan pengalaman wisata yang kaya akan alam, budaya,
              dan kearifan lokal.
            </p>

            <p className="kk-section-body" style={{ marginTop: "1rem" }}>
              Dari pembibitan bunga eksotis, trekking kawah, hingga seni
              kerajinan tangan Minahasa — Kakaskasen II menjadi destinasi yang
              menggabungkan petualangan alam dengan kehangatan budaya lokal.
            </p>

            <div className="kk-about-stats">
              <div className="kk-stat-item">
                <div className="kk-stat-num">7+</div>
                <div className="kk-stat-label">Atraksi & Aktivitas Wisata</div>
              </div>
              <div className="kk-stat-item">
                <div className="kk-stat-num">2</div>
                <div className="kk-stat-label">Kawah Gunung Aktif Terdekat</div>
              </div>
              <div className="kk-stat-item">
                <div className="kk-stat-num">±850m</div>
                <div className="kk-stat-label">Ketinggian di Atas Laut</div>
              </div>
              <div className="kk-stat-item">
                <div className="kk-stat-num">Jadesta</div>
                <div className="kk-stat-label">Terdaftar di Portal Resmi</div>
              </div>
            </div>
          </FadeIn>

          <FadeIn className="kk-about-img">
            <img
              src="https://images.unsplash.com/photo-1595433306580-9db1d47c5a9c?w=600&q=80"
              alt="Pemandangan Desa Kakaskasen II"
            />
            <img
              className="kk-about-img-accent"
              src="https://images.unsplash.com/photo-1561488111-5d800fd56b8a?w=400&q=80"
              alt="Bunga lokal Kakaskasen"
            />
          </FadeIn>
        </div>
      </div>
    </section>
  );
}