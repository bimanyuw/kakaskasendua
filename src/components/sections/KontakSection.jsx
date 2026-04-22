import FadeIn from "../ui/FadeIn";
import {
  ClockIcon,
  LocationIcon,
  MailIcon,
  MapPinLargeIcon,
  PhoneIcon,
} from "../icons/ContactIcons";

export default function KontakSection() {
  return (
    <section className="kk-kontak kk-section" id="kontak">
      <div className="kk-section-inner">
        <FadeIn>
          <p className="kk-section-label">Temukan Kami</p>
        </FadeIn>

        <FadeIn>
          <h2 className="kk-section-title">
            Kontak & <em>Akses</em>
          </h2>
        </FadeIn>

        <div className="kk-kontak-grid">
          <FadeIn>
            <div className="kk-kontak-info">
              <h3>Informasi Pengelola</h3>

              <div className="kk-k-item">
                <div className="kk-k-icon">
                  <LocationIcon />
                </div>
                <div>
                  <div className="kk-k-label">Alamat</div>
                  <div className="kk-k-val">
                    Kelurahan Kakaskasen Dua, Kecamatan Tomohon Utara,
                    Kota Tomohon, Sulawesi Utara
                  </div>
                </div>
              </div>

              <div className="kk-k-item">
                <div className="kk-k-icon">
                  <PhoneIcon />
                </div>
                <div>
                  <div className="kk-k-label">Telepon / WhatsApp</div>
                  <div className="kk-k-val">
                    <a href="tel:+62">Hubungi via Jadesta</a>
                  </div>
                </div>
              </div>

              <div className="kk-k-item">
                <div className="kk-k-icon">
                  <MailIcon />
                </div>
                <div>
                  <div className="kk-k-label">Email / Kanal Resmi</div>
                  <div className="kk-k-val">
                    <a
                      href="https://jadesta.kemenparekraf.go.id"
                      target="_blank"
                      rel="noreferrer"
                    >
                      jadesta.kemenparekraf.go.id
                    </a>
                  </div>
                </div>
              </div>

              <div className="kk-k-item">
                <div className="kk-k-icon">
                  <ClockIcon />
                </div>
                <div>
                  <div className="kk-k-label">Jam Kunjungan</div>
                  <div className="kk-k-val">
                    Sesuai jadwal paket — hubungi pengelola untuk konfirmasi
                  </div>
                </div>
              </div>
            </div>

            <h3
              style={{
                fontFamily: "var(--serif)",
                fontSize: "1.1rem",
                fontWeight: 400,
                margin: "1.5rem 0 .75rem",
              }}
            >
              Media Sosial & Kanal Resmi
            </h3>

            <div className="kk-social-links">
              <a
                href="https://jadesta.kemenparekraf.go.id"
                target="_blank"
                rel="noreferrer"
                className="kk-social-link"
              >
                Jadesta
              </a>
              <a
                href="https://magma.esdm.go.id"
                target="_blank"
                rel="noreferrer"
                className="kk-social-link"
              >
                MAGMA PVMBG
              </a>
              <a
                href="https://tomohon.go.id"
                target="_blank"
                rel="noreferrer"
                className="kk-social-link"
              >
                Pemkot Tomohon
              </a>
              <a href="#" className="kk-social-link">
                Instagram
              </a>
              <a href="#" className="kk-social-link">
                Facebook
              </a>
            </div>
          </FadeIn>

          <FadeIn>
            <div className="kk-kontak-map">
              <div className="kk-map-placeholder">
                <MapPinLargeIcon />
                <p>Kelurahan Kakaskasen Dua</p>
                <p style={{ fontSize: ".75rem" }}>
                  Tomohon Utara, Sulawesi Utara
                </p>
              </div>

              <div className="kk-map-btns">
                <a
                  href="https://www.google.com/maps/search/Kakaskasen+Dua+Tomohon"
                  target="_blank"
                  rel="noreferrer"
                  className="kk-map-btn primary"
                >
                  Buka Google Maps
                </a>
                <a
                  href="https://jadesta.kemenparekraf.go.id"
                  target="_blank"
                  rel="noreferrer"
                  className="kk-map-btn secondary"
                >
                  Kanal Resmi Wisata
                </a>
              </div>
            </div>

            <div
              style={{
                marginTop: "1.5rem",
                padding: "1.25rem",
                background: "var(--surface)",
                borderRadius: "3px",
                border: "1px solid var(--border)",
              }}
              className="kk-access-info"
            >
              <p
                style={{
                  fontSize: ".8rem",
                  color: "var(--text-muted)",
                  lineHeight: 1.7,
                  fontWeight: 300,
                }}
              >
                <strong style={{ fontWeight: 500, color: "var(--text)" }}>
                  Akses menuju Kakaskasen II:
                </strong>
                <br />
                Dari pusat Kota Tomohon ke arah utara, sekitar 10–15 menit
                berkendara. Tersedia angkutan kota (angkot) dan ojek lokal.
                Untuk paket trekking, disarankan menggunakan kendaraan pribadi
                atau booking transfer dengan pengelola wisata.
              </p>
            </div>
          </FadeIn>
        </div>
      </div>
    </section>
  );
}