import { useEffect, useRef, useState } from "react";

const ROW_1 = [
  { id: 1, src: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=1000&q=85", title: "Puncak Lokon", subtitle: "Di atas awan", wide: true },
  { id: 2, src: "https://images.unsplash.com/photo-1490750967868-88df5691cc51?w=700&q=85", title: "Bunga Lokon", subtitle: "Musim mekar", wide: false },
  { id: 3, src: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=900&q=85", title: "Bukit Hijau", subtitle: "Sabana tak berujung", wide: true },
  { id: 4, src: "https://images.unsplash.com/photo-1448375240586-882707db888b?w=700&q=85", title: "Ngarai Dalam", subtitle: "Kesunyian abadi", wide: false },
  { id: 5, src: "https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=700&q=85", title: "Biji Pilihan", subtitle: "Arabika Lokon", wide: false },
  { id: 6, src: "https://images.unsplash.com/photo-1497436072909-60f360e1d4b1?w=900&q=85", title: "Lembah Mistis", subtitle: "Fajar pertama", wide: true },
];

const ROW_2 = [
  { id: 7, src: "https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?w=900&q=85", title: "Danau Sunyi", subtitle: "Refleksi pagi", wide: true },
  { id: 8, src: "https://images.unsplash.com/photo-1501854140801-50d01698950b?w=700&q=85", title: "Hutan Tropis", subtitle: "Hijau abadi", wide: false },
  { id: 9, src: "https://images.unsplash.com/photo-1518173946687-a4c8892bbd9f?w=700&q=85", title: "Bukit Doa", subtitle: "Senja merah", wide: false },
  { id: 10, src: "https://images.unsplash.com/photo-1472214103451-9374bd1c798e?w=1000&q=85", title: "Lembah Emas", subtitle: "Cahaya sore", wide: true },
  { id: 11, src: "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=700&q=85", title: "Jalan Setapak", subtitle: "Menembus rimba", wide: false },
  { id: 12, src: "https://images.unsplash.com/photo-1426604966848-d7adac402bff?w=900&q=85", title: "Pagi Berkabut", subtitle: "Embun pertama", wide: true },
];

function MarqueeRow({ items, direction = 1, speed = 38 }) {
  const trackRef = useRef(null);
  const posRef = useRef(0);
  const pausedRef = useRef(false);
  const rafRef = useRef(null);
  const lastTimeRef = useRef(null);
  const [hoveredId, setHoveredId] = useState(null);

  const doubled = [...items, ...items];

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return undefined;

    const singleWidth = track.scrollWidth / 2;

    const animate = (time) => {
      if (lastTimeRef.current == null) lastTimeRef.current = time;
      const delta = (time - lastTimeRef.current) / 1000;
      lastTimeRef.current = time;

      if (!pausedRef.current) {
        posRef.current += speed * direction * delta;
        if (direction === 1 && posRef.current >= singleWidth) posRef.current -= singleWidth;
        if (direction === -1 && posRef.current <= 0) posRef.current += singleWidth;
        track.style.transform = `translateX(${-posRef.current}px)`;
      }

      rafRef.current = requestAnimationFrame(animate);
    };

    rafRef.current = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(rafRef.current);
  }, [direction, speed]);

  return (
    <div
      style={{ overflow: "hidden", cursor: "grab" }}
      onMouseEnter={() => { pausedRef.current = true; }}
      onMouseLeave={() => { pausedRef.current = false; setHoveredId(null); }}
    >
      <div
        ref={trackRef}
        style={{
          display: "flex",
          gap: "8px",
          willChange: "transform",
          width: "max-content",
        }}
      >
        {doubled.map((item, i) => (
          <PhotoCard
            key={`${item.id}-${i}`}
            item={item}
            isHovered={hoveredId === `${item.id}-${i}`}
            onEnter={() => setHoveredId(`${item.id}-${i}`)}
            onLeave={() => setHoveredId(null)}
          />
        ))}
      </div>
    </div>
  );
}

function PhotoCard({ item, isHovered, onEnter, onLeave }) {
  const w = item.wide ? 420 : 280;
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const ref = useRef(null);

  const handleMouseMove = (e) => {
    if (!ref.current) return;
    const r = ref.current.getBoundingClientRect();
    setMousePos({
      x: ((e.clientX - r.left) / r.width - 0.5) * 12,
      y: ((e.clientY - r.top) / r.height - 0.5) * 12,
    });
  };

  return (
    <div
      ref={ref}
      onMouseEnter={onEnter}
      onMouseLeave={() => { onLeave(); setMousePos({ x: 0, y: 0 }); }}
      onMouseMove={handleMouseMove}
      style={{
        position: "relative",
        width: `${w}px`,
        height: "320px",
        flexShrink: 0,
        overflow: "hidden",
        borderRadius: "2px",
        cursor: "pointer",
        transform: isHovered ? "scale(1.025)" : "scale(1)",
        transition: "transform 700ms cubic-bezier(0.22,1,0.36,1)",
        boxShadow: isHovered ? "0 24px 60px rgba(0,0,0,0.5)" : "0 8px 24px rgba(0,0,0,0.3)",
      }}
    >
      <div
        style={{
          position: "absolute",
          inset: 0,
          zIndex: 8,
          pointerEvents: "none",
          border: "1px solid rgba(255,255,255,0.06)",
          borderRadius: "2px",
        }}
      />

      <div
        style={{
          position: "absolute",
          inset: "-10%",
          transform: isHovered
            ? `scale(1.08) rotateX(${-mousePos.y * 0.25}deg) rotateY(${mousePos.x * 0.25}deg)`
            : "scale(1) rotateX(0) rotateY(0)",
          transformStyle: "preserve-3d",
          transition: "transform 700ms cubic-bezier(0.22,1,0.36,1)",
        }}
      >
        <img
          src={item.src}
          alt={item.title}
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
            filter: isHovered ? "brightness(0.55) saturate(1.15)" : "brightness(0.75) saturate(0.95)",
            transition: "filter 700ms cubic-bezier(0.22,1,0.36,1)",
          }}
        />
      </div>

      <div
        style={{
          position: "absolute",
          inset: 0,
          zIndex: 3,
          background: isHovered
            ? "linear-gradient(to top, rgba(15,4,4,0.95) 0%, rgba(15,4,4,0.15) 45%, transparent 100%)"
            : "linear-gradient(to top, rgba(15,4,4,0.6) 0%, transparent 55%)",
          transition: "background 600ms ease",
        }}
      />

      <div
        style={{
          position: "absolute",
          bottom: 0,
          left: 0,
          right: 0,
          padding: "18px 18px 20px",
          zIndex: 6,
        }}
      >
        <p
          style={{
            fontFamily: "'DM Sans', sans-serif",
            fontSize: "9px",
            letterSpacing: "0.2em",
            textTransform: "uppercase",
            color: "rgba(201,169,110,0.75)",
            margin: "0 0 3px",
            opacity: isHovered ? 1 : 0,
            transform: isHovered ? "translateY(0)" : "translateY(8px)",
            transition: "all 400ms cubic-bezier(0.22,1,0.36,1) 50ms",
          }}
        >
          {item.subtitle}
        </p>
        <h3
          style={{
            fontFamily: "'Cormorant Garamond', serif",
            fontSize: item.wide ? "22px" : "18px",
            fontWeight: 300,
            color: "#F5EDD8",
            margin: 0,
            lineHeight: 1.1,
            transform: isHovered ? "translateY(0)" : "translateY(5px)",
            transition: "transform 500ms cubic-bezier(0.22,1,0.36,1)",
          }}
        >
          {item.title}
        </h3>

        <div
          style={{
            marginTop: "10px",
            width: isHovered ? "32px" : "0px",
            height: "1px",
            background: "#C9A96E",
            transition: "width 600ms cubic-bezier(0.22,1,0.36,1) 180ms",
          }}
        />
      </div>
    </div>
  );
}

export default function GaleriSection() {
  const headerRef = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true); },
      { threshold: 0.2 }
    );
    if (headerRef.current) obs.observe(headerRef.current);
    return () => obs.disconnect();
  }, []);

  return (
    <section
      id="galeri"
      style={{
        background: "#160807",
        padding: "96px 0 108px",
        position: "relative",
        overflow: "hidden",
      }}
    >
      <div
        style={{
          position: "absolute",
          top: 0,
          left: "50%",
          transform: "translateX(-50%)",
          width: "70%",
          height: "40%",
          background: "radial-gradient(ellipse, rgba(140,60,20,0.1) 0%, transparent 70%)",
          pointerEvents: "none",
        }}
      />

      <div
        ref={headerRef}
        style={{
          maxWidth: "1280px",
          margin: "0 auto",
          padding: "0 56px 52px",
          display: "flex",
          alignItems: "flex-end",
          justifyContent: "space-between",
          flexWrap: "wrap",
          gap: "20px",
        }}
      >
        <div>
          <p
            style={{
              fontFamily: "'DM Sans', sans-serif",
              fontSize: "9px",
              letterSpacing: "0.3em",
              color: "#C9A96E",
              textTransform: "uppercase",
              margin: "0 0 12px",
              opacity: visible ? 1 : 0,
              transform: visible ? "none" : "translateY(10px)",
              transition: "all 700ms cubic-bezier(0.22,1,0.36,1)",
            }}
          >
            Koleksi Visual
          </p>
          <h2
            style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontSize: "clamp(38px, 5vw, 66px)",
              fontWeight: 300,
              color: "#F5EDD8",
              margin: 0,
              lineHeight: 1,
              letterSpacing: "-0.01em",
              opacity: visible ? 1 : 0,
              transform: visible ? "none" : "translateY(18px)",
              transition: "all 800ms cubic-bezier(0.22,1,0.36,1) 80ms",
            }}
          >
            Galeri{" "}
            <em style={{ color: "#C9A96E", fontStyle: "italic", fontWeight: 300 }}>
              Kakaskasen Dua
            </em>
          </h2>
        </div>

      </div>

      <div style={{ marginBottom: "8px" }}>
        <MarqueeRow items={ROW_1} direction={1} speed={36} />
      </div>

      <MarqueeRow items={ROW_2} direction={-1} speed={28} />

      <div
        style={{
          maxWidth: "1280px",
          margin: "52px auto 0",
          padding: "0 56px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          gap: "24px",
          flexWrap: "wrap",
        }}
      >
        <div
          style={{
            flex: 1,
            height: "1px",
            background: "linear-gradient(to right, rgba(201,169,110,0.35), transparent)",
          }}
        />
        <p
          style={{
            fontFamily: "'DM Sans', sans-serif",
            fontSize: "9px",
            letterSpacing: "0.22em",
            color: "rgba(201,169,110,0.45)",
            textTransform: "uppercase",
            margin: 0,
            whiteSpace: "nowrap",
          }}
        >
          {ROW_1.length + ROW_2.length} Karya
        </p>
        <div
          style={{
            flex: 1,
            height: "1px",
            background: "linear-gradient(to left, rgba(201,169,110,0.35), transparent)",
          }}
        />
      </div>
    </section>
  );
}
