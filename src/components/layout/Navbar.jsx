export default function Navbar({ scrolled, onToggleMenu, darkMode, onToggleDark }) {
  return (
    <nav
      className={`kk-nav kk-nav-fixed-tone${scrolled ? " scrolled" : ""}`}
      id="mainNav"
      style={{
        background: "rgba(36, 23, 22, 0.92)",
        borderBottom: "1px solid rgba(255, 248, 240, 0.22)",
        boxShadow: "0 14px 38px rgba(36, 23, 22, 0.28)",
        backdropFilter: "blur(14px) saturate(1.18)",
        WebkitBackdropFilter: "blur(14px) saturate(1.18)",
      }}
    >
      <div className="kk-nav-inner">
        <a href="#beranda" className="kk-nav-logo">
          <span className="kk-kd">Kakaskasen Dua</span>
        </a>

        <ul className="kk-nav-links">
          <li><a href="#tentang">Tentang</a></li>
          <li><a href="#journey">Journey Map</a></li>
          <li><a href="#wisata">Wisata</a></li>
          <li><a href="#umkm">Marketplace</a></li>
          <li><a href="#gunung">Info Gunung</a></li>
          <li><a href="#kontak">Kontak</a></li>
        </ul>

        <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
          <button
            className="kk-dark-toggle"
            onClick={onToggleDark}
            title={darkMode ? "Switch to Light Mode" : "Switch to Dark Mode"}
            aria-label={darkMode ? "Aktifkan Mode Terang" : "Aktifkan Mode Gelap"}
          >
            {darkMode ? "☀️" : "🌙"}
          </button>

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
      </div>
    </nav>
  );
}
