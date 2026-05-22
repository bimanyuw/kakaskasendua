import { useEffect, useState } from "react";
import "./IntroLoader.css";

const letters = ["K", "a", "k", "a", "s", "k", "a", "s", "e", "n", "D", "u", "a"];

export default function IntroLoader({ onFinish }) {
  const [hide, setHide] = useState(false);

  useEffect(() => {
    document.body.classList.add("intro-lock");

    const hideTimer = window.setTimeout(() => {
      setHide(true);
    }, 4800);

    const finishTimer = window.setTimeout(() => {
      document.body.classList.remove("intro-lock");
      onFinish();
    }, 5600);

    return () => {
      window.clearTimeout(hideTimer);
      window.clearTimeout(finishTimer);
      document.body.classList.remove("intro-lock");
    };
  }, [onFinish]);

  return (
    <div className={`intro-loader${hide ? " intro-hide" : ""}`} aria-label="Opening Kakaskasen Dua">
      <div className="intro-small intro-top-left">
        DESA WISATA <br /> TOMOHON
      </div>

      <div className="intro-small intro-top-right">
        <span className="kk-kd">KAKASKASEN DUA</span> <br /> NORTH SULAWESI
      </div>

      <div className="intro-main-text">
        Desa sejuk di antara Lokon dan Mahawu
      </div>

      <div className="intro-letters" aria-hidden="true">
        {letters.map((letter, index) => (
          <span
            key={`${letter}-${index}`}
            className="intro-letter"
            style={{ "--i": index }}
          >
            {letter}
          </span>
        ))}
      </div>

      <div className="intro-logo-box">
        <h1>
          <span className="kk-kd">Kakaskasen Dua</span>
        </h1>
        <p>lokon . mahawu . minahasa</p>
      </div>
    </div>
  );
}
