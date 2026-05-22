import FadeIn from "../ui/FadeIn";

const IMG_MAIN =
  "https://www.indonesia.travel/contentassets/72d37942fd654b1490f6443e2c7122fa/tomohon_banner.jpg";

function SafeImg({ src, alt, className, fallbackClass }) {
  return (
    <img
      src={src}
      alt={alt}
      className={className}
      onError={(e) => {
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
    <section className="kk-about kk-about-editorial" id="tentang">
      <div className="kk-about-editorial-inner">
        <FadeIn>
          <p className="kk-about-eyebrow">
            WELCOME TO <span className="kk-kd">KAKASKASEN DUA</span>
          </p>
          <h2 className="kk-about-headline">
            Somewhere between the slopes of Lokon and the blooms of Tomohon,
            lives a village shaped by stories.
          </h2>
        </FadeIn>

        <div className="kk-about-editorial-grid">
          <FadeIn className="kk-about-editorial-media">
            <div className="kk-about-editorial-img-wrap">
              <SafeImg
                src={IMG_MAIN}
                alt="Pemandangan Desa Kakaskasen Dua"
                className="kk-about-editorial-img"
                fallbackClass="kk-about-editorial-fallback"
              />
              <div className="kk-about-editorial-fallback" style={{ display: "none" }}>
                <svg width="64" height="64" viewBox="0 0 64 64" fill="none">
                  <path
                    d="M8 48 L20 28 L32 38 L44 20 L56 48 Z"
                    fill="rgba(0,0,0,0.08)"
                    stroke="#111"
                    strokeWidth="1.5"
                    strokeLinejoin="round"
                  />
                  <circle
                    cx="42"
                    cy="18"
                    r="8"
                    fill="rgba(0,0,0,0.08)"
                    stroke="#111"
                    strokeWidth="1.5"
                  />
                </svg>
                <span className="kk-kd">Kakaskasen Dua</span>
              </div>
            </div>
          </FadeIn>

          <FadeIn className="kk-about-editorial-copy">
            <p>
              Desa Wisata <strong className="kk-kd">Kakaskasen Dua</strong> berada di Kecamatan
              Tomohon Utara, Sulawesi Utara. Dikelilingi lanskap vulkanik,
              kebun bunga, dan udara pegunungan, kawasan ini menyimpan ritme
              hidup yang dekat dengan alam sekaligus budaya Minahasa.
            </p>
            <p>
              Dari pembibitan bunga, trekking kawah, kuliner lokal, hingga
              kerajinan tangan, <span className="kk-kd">Kakaskasen Dua</span> menghadirkan pengalaman yang
              tenang, hangat, dan berlapis untuk dijelajahi pelan-pelan.
            </p>
            <a href="#journey" className="kk-about-discover">DISCOVER</a>
          </FadeIn>
        </div>
      </div>
    </section>
  );
}
