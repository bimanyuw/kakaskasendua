export default function MobileMenu({ menuOpen, onClose }) {
  const links = [
    ["Tentang", "#tentang"],
    ["Journey Map", "#journey"],
    ["Wisata", "#wisata"],
    ["Marketplace", "#umkm"],
    ["Info Gunung", "#gunung"],
    ["Galeri", "#galeri"],
    ["Kontak", "#kontak"],
  ];

  return (
    <div className={`kk-mobile-menu${menuOpen ? " open" : ""}`} aria-hidden={!menuOpen}>
      <div className="kk-mobile-menu-head">
        <span>Menu</span>
        <button type="button" onClick={onClose} aria-label="Tutup menu">
          <span></span>
          <span></span>
        </button>
      </div>

      <nav className="kk-mobile-menu-links" aria-label="Menu utama">
        {links.map(([label, href]) => (
          <a href={href} onClick={onClose} key={href}>{label}</a>
        ))}
      </nav>

      <a
        href="https://jadesta.kemenparekraf.go.id"
        target="_blank"
        rel="noreferrer"
        className="kk-mobile-menu-cta"
      >
        Paket Wisata Resmi
      </a>
    </div>
  );
}
