export default function Footer() {
  return (
    <footer className="kk-footer">
      <div className="kk-footer-inner">
        <div className="kk-footer-brand">
          <div className="kk-footer-logo">
            <span className="kk-kd">Kakaskasen Dua</span>
          </div>
          <p>
            Desa wisata di Tomohon Utara dengan cerita gunung, kebun bunga,
            kuliner lokal, dan budaya Minahasa.
          </p>
        </div>

        <div className="kk-footer-group">
          <h4>Navigasi</h4>
          <div className="kk-footer-links">
            <a href="#tentang">Tentang</a>
            <a href="#journey">Story Map</a>
            <a href="#wisata">Wisata</a>
            <a href="#umkm">Marketplace</a>
            <a href="#gunung">Info Gunung</a>
            <a href="#kontak">Kontak</a>
          </div>
        </div>

        <div className="kk-footer-group">
          <h4>Kanal Resmi</h4>
          <div className="kk-footer-links">
            <a
              href="https://jadesta.kemenparekraf.go.id"
              target="_blank"
              rel="noreferrer"
            >
              Jadesta
            </a>
            <a
              href="https://magma.esdm.go.id"
              target="_blank"
              rel="noreferrer"
            >
              MAGMA PVMBG
            </a>
            <a
              href="https://tomohon.go.id"
              target="_blank"
              rel="noreferrer"
            >
              Pemkot Tomohon
            </a>
          </div>
        </div>

        <div className="kk-footer-bottom">
          <span>Tomohon Utara, Sulawesi Utara</span>
          <span>(c) 2025 Desa Wisata Kakaskasen II</span>
        </div>
      </div>
    </footer>
  );
}
