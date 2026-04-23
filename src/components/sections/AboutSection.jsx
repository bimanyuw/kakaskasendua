import FadeIn from "../ui/FadeIn";

const IMG_MAIN =
  "https://images.unsplash.com/photo-1602867741746-6df80f40b3f6?w=700&q=80&auto=format&fit=crop";
const IMG_ACCENT =
  "https://images.unsplash.com/photo-1490750967868-88df5691cc7f?w=500&q=80&auto=format&fit=crop";

function SafeImg({ src, alt, className, fallbackClass }) {
  return (
    <img
      src={src}
      alt={alt}
      className={className}
      onError={e => {
        e.currentTarget.style.display = "none";
        if (fallbackClass) {
          const fb = e.currentTarget.parentElement.querySelector("." + fallbackClass);
          if (fb) fb.style.display = "flex";
        }
      }}
    />
  );
}

export default function AboutSection() {
  return (
    <section className="kk-about kk-section" id="tentang">
      <div className="kk-section-inner">
        <div className="kk-about-grid">
          <FadeIn>
            <p className="kk-section-label">Mengenal Desa</p>
            <h2 className="kk-section-title">
              Kakaskasen Dua —
              <br />
              di antara <em>gunung dan bunga</em>
            </h2>

            <div className="kk-divider"></div>

            <p className="kk-section-body">
              Desa Wisata Kakaskasen Dua terletak di Kelurahan Kakaskasen Dua,
              Kecamatan Tomohon Utara, Kota Tomohon, Sulawesi Utara.
              Dikelilingi lanskap vulkanik dari Gunung Lokon dan Gunung Mahawu,
              desa ini menawarkan pengalaman wisata yang kaya akan alam, budaya,
              dan kearifan lokal.
            </p>

            <p className="kk-section-body" style={{ marginTop: "1rem" }}>
              Dari pembibitan bunga eksotis, trekking kawah, hingga seni
              kerajinan tangan Minahasa — Kakaskasen Dua menjadi destinasi yang
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
            {/* Main image */}
            <div className="kk-about-img-main-wrap">
              <SafeImg
                src={IMG_MAIN}
                alt="Pemandangan Desa Kakaskasen Dua"
                className="kk-about-img-main"
                fallbackClass="kk-about-img-fallback"
              />
              <div className="kk-about-img-fallback" style={{ display: "none" }}>
                <svg width="64" height="64" viewBox="0 0 64 64" fill="none">
                  <path d="M8 48 L20 28 L32 38 L44 20 L56 48 Z" fill="rgba(43,77,15,0.15)" stroke="#2B4D0F" strokeWidth="1.5" strokeLinejoin="round"/>
                  <circle cx="42" cy="18" r="8" fill="rgba(154,123,60,0.2)" stroke="#9A7B3C" strokeWidth="1.5"/>
                </svg>
                <span>Kakaskasen Dua</span>
              </div>
            </div>

            {/* Accent image */}
            <div className="kk-about-img-accent-wrap">
              <SafeImg
                src={IMG_ACCENT}
                alt="Bunga lokal Kakaskasen"
                className="kk-about-img-accent"
                fallbackClass="kk-about-accent-fallback"
              />
              <div className="kk-about-accent-fallback" style={{ display: "none" }}>
                <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
                  <circle cx="24" cy="24" r="8" fill="rgba(154,123,60,0.3)"/>
                  {[0,60,120,180,240,300].map((deg, i) => (
                    <ellipse key={i} cx="24" cy="24" rx="5" ry="10"
                      fill="rgba(200,218,176,0.7)"
                      transform={`rotate(${deg} 24 24) translate(0 -12)`}/>
                  ))}
                </svg>
              </div>
            </div>
          </FadeIn>
        </div>
      </div>
    </section>
  );
}
