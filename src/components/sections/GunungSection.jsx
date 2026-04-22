import FadeIn from "../ui/FadeIn";

const statusLevels = [
  {
    color: "#3B6D11",
    num: "I",
    title: "Normal",
    desc: "Aktivitas gunung dalam kondisi normal. Wisata trekking dan aktivitas luar ruang aman dilakukan.",
  },
  {
    color: "#9A6B00",
    num: "II",
    title: "Waspada",
    desc: "Ada peningkatan aktivitas. Wisatawan disarankan tidak mendekati kawah dalam radius tertentu.",
  },
  {
    color: "#B5520A",
    num: "III",
    title: "Siaga",
    desc: "Aktivitas signifikan. Beberapa jalur ditutup. Ikuti arahan pengelola dan pihak berwenang setempat.",
  },
  {
    color: "#A32D2D",
    num: "IV",
    title: "Awas",
    desc: "Ancaman erupsi. Kawasan dievakuasi. Wisata ditangguhkan sepenuhnya hingga status diturunkan.",
  },
];

const safetyTips = [
  "Periksa status gunung di MAGMA PVMBG sebelum berangkat",
  "Patuhi arahan dari pemandu wisata dan masyarakat lokal",
  "Kenakan perlengkapan trekking yang memadai dan sesuai cuaca",
  "Hindari zona terlarang jika ada peringatan atau papan pembatas",
  "Selalu berangkat dalam kelompok dengan pemandu lokal bersertifikat",
];

export default function GunungSection() {
  return (
    <section className="kk-gunung kk-section" id="gunung">
      <div className="kk-section-inner">
        <FadeIn>
          <p className="kk-section-label">Keselamatan Wisata</p>
        </FadeIn>

        <FadeIn>
          <h2 className="kk-section-title">
            Info Gunung <em>&amp; Keamanan</em>
          </h2>
        </FadeIn>

        <FadeIn>
          <p className="kk-section-body">
            Desa Wisata Kakaskasen II berada dekat kawasan gunung berapi aktif.
            Pastikan selalu memeriksa status gunung sebelum berkunjung.
          </p>
        </FadeIn>

        <div className="kk-gunung-grid">
          <FadeIn>
            <div className="kk-status-card" style={{ marginBottom: "1.5rem" }}>
              <div className="kk-status-header">
                <div className="kk-section-label">Status Terkini</div>
                <div className="kk-status-name">Gunung Lokon</div>
                <div className="kk-status-badge kk-status-waspada">
                  <span
                    style={{
                      width: "8px",
                      height: "8px",
                      borderRadius: "50%",
                      background: "#9A6B00",
                      display: "inline-block",
                    }}
                  ></span>
                  Level II — Waspada
                </div>
              </div>

              <div className="kk-status-body">
                <div className="kk-status-row">
                  <span>Ketinggian</span>
                  <strong>1.580 mdpl</strong>
                </div>
                <div className="kk-status-row">
                  <span>Lokasi</span>
                  <strong>Tomohon, Sulawesi Utara</strong>
                </div>
                <div className="kk-status-row">
                  <span>Update terakhir</span>
                  <strong>Lihat MAGMA PVMBG</strong>
                </div>

                <a
                  href="https://magma.esdm.go.id"
                  target="_blank"
                  rel="noreferrer"
                  className="kk-status-src"
                >
                  Lihat Sumber Resmi MAGMA →
                </a>

                <p className="kk-status-disclaimer">
                  * Data status bersifat indikatif. Selalu periksa informasi
                  terbaru di sumber resmi PVMBG sebelum berkunjung.
                </p>
              </div>
            </div>

            <div className="kk-status-card">
              <div className="kk-status-header">
                <div className="kk-section-label">Status Terkini</div>
                <div className="kk-status-name">Gunung Mahawu</div>
                <div className="kk-status-badge kk-status-normal">
                  <span
                    style={{
                      width: "8px",
                      height: "8px",
                      borderRadius: "50%",
                      background: "#3B6D11",
                      display: "inline-block",
                    }}
                  ></span>
                  Level I — Normal
                </div>
              </div>

              <div className="kk-status-body">
                <div className="kk-status-row">
                  <span>Ketinggian</span>
                  <strong>1.324 mdpl</strong>
                </div>
                <div className="kk-status-row">
                  <span>Lokasi</span>
                  <strong>Tomohon, Sulawesi Utara</strong>
                </div>
                <div className="kk-status-row">
                  <span>Update terakhir</span>
                  <strong>Lihat MAGMA PVMBG</strong>
                </div>

                <a
                  href="https://magma.esdm.go.id"
                  target="_blank"
                  rel="noreferrer"
                  className="kk-status-src"
                >
                  Lihat Sumber Resmi MAGMA →
                </a>
              </div>
            </div>
          </FadeIn>

          <FadeIn>
            <h3
              style={{
                fontFamily: "var(--serif)",
                fontSize: "1.25rem",
                fontWeight: 400,
                marginBottom: "1.5rem",
              }}
            >
              Arti Level Status Gunung
            </h3>

            <div className="kk-level-grid">
              {statusLevels.map((level, index) => (
                <div key={index} className="kk-level-item">
                  <div className="kk-level-num" style={{ color: level.color }}>
                    {level.num}
                  </div>
                  <div>
                    <div className="kk-level-title">{level.title}</div>
                    <p className="kk-level-desc">{level.desc}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="kk-safety-tips">
              <h3>Panduan Keselamatan Wisatawan</h3>
              {safetyTips.map((tip, index) => (
                <div key={index} className="kk-tip-item">
                  <div className="kk-tip-bullet"></div>
                  {tip}
                </div>
              ))}
            </div>
          </FadeIn>
        </div>
      </div>
    </section>
  );
}