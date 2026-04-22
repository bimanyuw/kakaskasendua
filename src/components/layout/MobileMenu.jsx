export default function MobileMenu({ menuOpen, onClose }) {
  return (
    <div className={`kk-mobile-menu${menuOpen ? " open" : ""}`}>
      <a href="#tentang" onClick={onClose}>Tentang Desa</a>
      <a href="#journey" onClick={onClose}>Journey Map</a>
      <a href="#wisata" onClick={onClose}>Wisata & Aktivitas</a>
      <a href="#umkm" onClick={onClose}>UMKM & Produk Lokal</a>
      <a href="#gunung" onClick={onClose}>Info Gunung</a>
      <a href="#galeri" onClick={onClose}>Galeri</a>
      <a href="#kontak" onClick={onClose}>Kontak</a>
      <a
        href="https://jadesta.kemenparekraf.go.id"
        target="_blank"
        rel="noreferrer"
      >
        Paket Wisata Resmi ↗
      </a>
    </div>
  );
}