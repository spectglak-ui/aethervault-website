import { useState } from "react";
import { Play } from "lucide-react";
import { PROMO_VIDEO } from "../config";

/** Lecteur de la vidéo promotionnelle : iframe YouTube "nocookie"
 * chargée au clic, ou <video> auto-hébergée. */
export default function PromoVideo() {
  const [playing, setPlaying] = useState(false);

  if (PROMO_VIDEO.type === "youtube") {
    return playing ? (
      <div className="pv__frame">
        <iframe
          className="pv__media"
          src={`https://www.youtube-nocookie.com/embed/${PROMO_VIDEO.id}?autoplay=1&rel=0`}
          title="AetherVault Media — vidéo de présentation"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        />
      </div>
    ) : (
      <button
        className="pv__frame pv__poster"
        onClick={() => setPlaying(true)}
        aria-label="Lire la vidéo de présentation"
      >
        {PROMO_VIDEO.poster && <img src={PROMO_VIDEO.poster} alt="" />}
        <span className="pv__play"><Play size={26} fill="currentColor" /></span>
      </button>
    );
  }

  return (
    <div className="pv__frame">
      <video
        className="pv__media"
        src={PROMO_VIDEO.src}
        poster={PROMO_VIDEO.poster}
        controls
        playsInline
        preload="metadata"
      />
    </div>
  );
}