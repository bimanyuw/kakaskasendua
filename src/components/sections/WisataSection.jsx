import { useEffect, useRef, useState } from "react";
import FadeIn from "../ui/FadeIn";
import { wisataData } from "../../data/wisata";
import { useAdminCollection } from "../../hooks/useAdminCollection";

function MarkKakaskasenDua({ text }) {
  const parts = String(text).split(/(Kakaskasen Dua)/gi);

  return parts.map((part, index) =>
    part.toLowerCase() === "kakaskasen dua" ? (
      <span className="kk-kd" key={index}>{part}</span>
    ) : (
      part
    )
  );
}

export default function WisataSection() {
  const [activeFilter, setActiveFilter] = useState("all");
  const [activeIndex, setActiveIndex] = useState(0);
  const [activeRenderedIndex, setActiveRenderedIndex] = useState(0);
  const carouselRef = useRef(null);
  const scrollFrameRef = useRef(null);
  const activeRenderedIndexRef = useRef(0);
  const wisataItems = useAdminCollection("wisata", wisataData);

  const filterButtons = ["Semua", "Alam", "Budaya", "Edukasi", "Kuliner"];

  const filteredCards =
    activeFilter === "all"
      ? wisataItems
      : wisataItems.filter((item) => item.cat === activeFilter);
  const loopedCards = [...filteredCards, ...filteredCards, ...filteredCards];

  function getRealIndex(index) {
    if (!filteredCards.length) return 0;
    return ((index % filteredCards.length) + filteredCards.length) % filteredCards.length;
  }

  useEffect(() => {
    const targetIndex = Math.min(1, Math.max(filteredCards.length - 1, 0));
    const renderedIndex = filteredCards.length + targetIndex;

    setActiveIndex(targetIndex);
    setActiveRenderedIndex(renderedIndex);
    activeRenderedIndexRef.current = renderedIndex;
    requestAnimationFrame(() => scrollToCard(renderedIndex, "auto"));
  }, [activeFilter, filteredCards.length]);

  useEffect(() => {
    return () => {
      if (scrollFrameRef.current) {
        cancelAnimationFrame(scrollFrameRef.current);
      }
    };
  }, []);

  function updateActiveCard() {
    const carousel = carouselRef.current;
    if (!carousel || !filteredCards.length) return;

    const cards = Array.from(carousel.querySelectorAll(".kk-w-show-card"));
    const carouselRect = carousel.getBoundingClientRect();
    const carouselCenter = carouselRect.left + carouselRect.width / 2;

    const closestIndex = cards.reduce((closest, card, index) => {
      const cardRect = card.getBoundingClientRect();
      const cardCenter = cardRect.left + cardRect.width / 2;
      const distance = Math.abs(cardCenter - carouselCenter);

      return distance < closest.distance ? { index, distance } : closest;
    }, { index: 0, distance: Number.POSITIVE_INFINITY }).index;

    const realIndex = getRealIndex(closestIndex);
    let renderedIndex = closestIndex;

    if (closestIndex < filteredCards.length) {
      renderedIndex = closestIndex + filteredCards.length;
    } else if (closestIndex >= filteredCards.length * 2) {
      renderedIndex = closestIndex - filteredCards.length;
    }

    setActiveIndex(realIndex);
    setActiveRenderedIndex(renderedIndex);
    activeRenderedIndexRef.current = renderedIndex;

    if (renderedIndex !== closestIndex) {
      scrollToCard(renderedIndex, "auto");
    }
  }

  function handleCarouselScroll() {
    if (scrollFrameRef.current) {
      cancelAnimationFrame(scrollFrameRef.current);
    }

    scrollFrameRef.current = requestAnimationFrame(updateActiveCard);
  }

  function scrollToCard(index, behavior = "smooth") {
    const carousel = carouselRef.current;
    if (!carousel) return;

    const cards = Array.from(carousel.querySelectorAll(".kk-w-show-card"));
    const targetCard = cards[index];
    if (!targetCard) return;

    carousel.scrollTo({
      left: targetCard.offsetLeft - (carousel.clientWidth - targetCard.clientWidth) / 2,
      behavior,
    });
  }

  function scrollCarousel(direction) {
    const carousel = carouselRef.current;
    if (!carousel) return;

    const cards = Array.from(carousel.querySelectorAll(".kk-w-show-card"));
    if (!cards.length) return;

    const targetIndex = activeRenderedIndexRef.current + direction;

    scrollToCard(targetIndex);
    setActiveIndex(getRealIndex(targetIndex));
    setActiveRenderedIndex(targetIndex);
    activeRenderedIndexRef.current = targetIndex;
  }

  return (
    <section className="kk-wisata kk-wisata-showcase" id="wisata">
      <div className="kk-wisata-showcase-head kk-section-heading">
        <FadeIn>
          <div className="kk-wisata-kicker">
            <span></span>
            STAY IN KAKASKASEN
            <span></span>
          </div>
          <h2>Find the best activity for your journey</h2>
        </FadeIn>

        <FadeIn>
          <p>
            Pilih pengalaman wisata di <span className="kk-kd">Kakaskasen Dua</span>,
            dari trekking, budaya, edukasi bunga, sampai kuliner lokal.
          </p>
        </FadeIn>
      </div>

      <FadeIn>
        <div className="kk-wisata-filter-row" aria-label="Filter wisata">
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

      <div className="kk-wisata-carousel" ref={carouselRef} onScroll={handleCarouselScroll}>
        {loopedCards.map((card, index) => (
          <article
            className={`kk-w-card kk-w-show-card${index === activeRenderedIndex ? " is-featured" : ""}`}
            key={`${card.title}-${index}`}
            aria-hidden={getRealIndex(index) !== activeIndex ? "true" : undefined}
          >
            <img src={card.img} alt={card.alt} />
            <div className="kk-w-card-body">
              <div className="kk-w-card-cat">{card.cardCat}</div>
              <div className="kk-w-card-title">{card.title}</div>
              <p className="kk-w-card-desc"><MarkKakaskasenDua text={card.desc} /></p>
              <div className="kk-w-card-footer">
                <span className="kk-w-duration">{card.duration}</span>
                <a
                  href="https://jadesta.kemenparekraf.go.id"
                  target="_blank"
                  rel="noreferrer"
                  className="kk-w-link"
                >
                  Details
                  <span>&rarr;</span>
                </a>
              </div>
            </div>
          </article>
        ))}
      </div>

      <div className="kk-wisata-arrows" aria-label="Navigasi carousel wisata">
        <button onClick={() => scrollCarousel(-1)} aria-label="Geser ke kiri">&larr;</button>
        <button onClick={() => scrollCarousel(1)} aria-label="Geser ke kanan">&rarr;</button>
      </div>
    </section>
  );
}
