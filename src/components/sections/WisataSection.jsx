import { useState } from "react";
import FadeIn from "../ui/FadeIn";
import { wisataData } from "../../data/wisata";

export default function WisataSection() {
  const [activeFilter, setActiveFilter] = useState("all");

  const filterButtons = ["Semua", "Alam", "Budaya", "Edukasi", "Kuliner"];

  const filteredCards =
    activeFilter === "all"
      ? wisataData
      : wisataData.filter((item) => item.cat === activeFilter);

  return (
    <section className="kk-wisata kk-section" id="wisata">
      <div className="kk-section-inner">
        <FadeIn>
          <p className="kk-section-label">Aktivitas Tersedia</p>
        </FadeIn>

        <FadeIn>
          <h2 className="kk-section-title">
            Wisata & <em>Aktivitas</em>
          </h2>
        </FadeIn>

        <FadeIn>
          <p className="kk-section-body">
            Semua aktivitas wisata di bawah ini tersedia di Desa Wisata
            Kakaskasen Dua dan terdaftar di Jadesta. Kunjungi kanal resmi
            untuk informasi paket dan pemesanan.
          </p>
        </FadeIn>

        <FadeIn>
          <div className="kk-wisata-filters">
            {filterButtons.map((button) => {
              const value = button === "Semua" ? "all" : button.toLowerCase();

              return (
                <button
                  key={button}
                  className={`kk-wf-btn${activeFilter === value ? " active" : ""}`}
                  onClick={() => setActiveFilter(value)}
                >
                  {button}
                </button>
              );
            })}
          </div>
        </FadeIn>

        <div className="kk-wisata-grid">
          {filteredCards.map((card, index) => (
            <FadeIn key={index}>
              <div className="kk-w-card">
                <img src={card.img} alt={card.alt} />
                <div className="kk-w-card-body">
                  <div className="kk-w-card-cat">{card.cardCat}</div>
                  <div className="kk-w-card-title">{card.title}</div>
                  <p className="kk-w-card-desc">{card.desc}</p>
                  <div className="kk-w-card-footer">
                    <span className="kk-w-duration">{card.duration}</span>
                    <a
                      href="https://jadesta.kemenparekraf.go.id"
                      target="_blank"
                      rel="noreferrer"
                      className="kk-w-link"
                    >
                      Kanal Resmi
                    </a>
                  </div>
                </div>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}