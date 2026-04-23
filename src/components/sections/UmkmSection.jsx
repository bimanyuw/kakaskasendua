import FadeIn from "../ui/FadeIn";
import WhatsAppIcon from "../icons/WhatsAppIcon";
import { umkmData } from "../../data/umkm";

export default function UmkmSection() {
  return (
    <section className="kk-umkm kk-section" id="umkm">
      <div className="kk-section-inner">
        <FadeIn>
          <p className="kk-section-label">Marketplace</p>
        </FadeIn>

        <FadeIn>
          <h2 className="kk-section-title">
            Karya & <em>Produk Lokal</em>
          </h2>
        </FadeIn>

        <FadeIn>
          <p className="kk-section-body">
            Karya dan produk unggulan dari tangan masyarakat Kakaskasen Dua.
            Mendukung ekonomi lokal dengan membeli langsung dari pengrajin
            dan petani desa.
          </p>
        </FadeIn>

        <div className="kk-umkm-grid">
          {umkmData.map((item, index) => (
            <FadeIn key={index}>
              <div className="kk-u-card">
                <img src={item.img} alt={item.alt} />
                <div className="kk-u-card-body">
                  <div className="kk-u-card-cat">{item.cat}</div>
                  <div className="kk-u-card-title">{item.title}</div>
                  <p className="kk-u-card-desc">{item.desc}</p>
                  <div className="kk-u-card-price">{item.price}</div>
                  <a href="#kontak" className="kk-u-card-wa">
                    <WhatsAppIcon />
                    {item.waLabel}
                  </a>
                </div>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}