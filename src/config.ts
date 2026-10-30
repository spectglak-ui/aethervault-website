/** ⚠️ REMPLACE par ton username GitHub réel */
export const REPO = "spectglak-ui/aethervault-media";
export const SITE_NAME = "AetherVault Media";
export const TAGLINE = "Votre médiathèque. Votre univers.";
/** Vidéo promotionnelle : "file" (auto-hébergée) ou "youtube" (id de la vidéo). */
export const PROMO_VIDEO:
  | { type: "youtube"; id: string; poster?: string }
  | { type: "file"; src: string; poster?: string } = {
  type: "file",
  src: `${import.meta.env.BASE_URL}video/promo-v1.mp4`,
  poster: `${import.meta.env.BASE_URL}video/poster.jpg`,
};