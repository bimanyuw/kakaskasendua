export default function Navbar({ scrolled, onToggleMenu }) {
  return (
    <nav className={`kk-nav${scrolled ? " scrolled" : ""}`} id="mainNav">
      <div className="kk-nav-inner">
        <a href="#beranda" className="kk-nav-logo">
          Kakaskasen <span>Dua</span>
        </a>

        <ul className="kk-nav-links">
          <li><a href="#tentang">Tentang</a></li>
          <li><a href="#journey">Journey Map</a></li>
          <li><a href="#wisata">Wisata</a></li>
          <li><a href="#umkm">UMKM</a></li>
          <li><a href="#gunung">Info Gunung</a></li>
          <li><a href="#kontak">Kontak</a></li>
        </ul>

        <a
          href="https://jadesta.kemenparekraf.go.id"
          target="_blank"
          rel="noreferrer"
          className="kk-nav-cta"
        >
          Paket Wisata
        </a>

        <button className="kk-nav-burger" onClick={onToggleMenu}>
          <span></span>
          <span></span>
          <span></span>
        </button>
      </div>
    </nav>
  );
}