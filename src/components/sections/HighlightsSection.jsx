import FadeIn from "../ui/FadeIn";
import { highlights } from "../../data/highlights";

export default function HighlightsSection() {
  return (
    <section className="kk-highlights kk-section">
      <div className="kk-section-inner">
        <FadeIn>
          <p className="kk-section-label">Eksplorasi Desa</p>
        </FadeIn>

        <FadeIn>
          <h2 className="kk-section-title">
            Apa saja yang bisa
            <br />
            kamu temukan di <em>Kakaskasen II</em>?
          </h2>
        </FadeIn>

        <div className="kk-highlights-grid">
          {highlights.map((item, index) => (
            <FadeIn key={index}>
              <a href={item.href} className="kk-hl-card">
                <div className="kk-hl-icon">
                  <svg viewBox="0 0 24 24">
                    <path d={item.svgPath} />
                  </svg>
                </div>
                <div className="kk-hl-title">{item.title}</div>
                <p className="kk-hl-desc">{item.desc}</p>
              </a>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}