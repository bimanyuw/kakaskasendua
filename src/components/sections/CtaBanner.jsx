export default function CtaBanner() {
  return (
    <div className="kk-cta-banner">
      <div className="kk-cta-inner">
        <div>
          <h2 className="kk-cta-title">
            Siap menjelajahi
            <br />
            <em>Kakaskasen II?</em>
          </h2>
          <p
            style={{
              color: "rgba(255,255,255,.55)",
              marginTop: ".75rem",
              fontSize: ".9rem",
              fontWeight: 300,
            }}
          >
            Hubungi pengelola atau lihat paket resmi di Jadesta untuk
            merencanakan kunjunganmu.
          </p>
        </div>

        <div className="kk-cta-btns">
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
      </div>
    </div>
  );
}