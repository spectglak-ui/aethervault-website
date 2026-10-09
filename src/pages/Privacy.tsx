import { Database, EyeOff, HardDrive, LockKeyhole, UserX, Wifi } from "lucide-react";
import { useReveal } from "../hooks/useReveal";

const POINTS = [
  { icon: HardDrive, t: "100 % local", d: "Bibliothèque, lectures, statistiques : tout vit sur votre machine. Aucun cloud, aucun serveur AetherVault." },
  { icon: UserX, t: "Sans compte", d: "Pas d'inscription, pas d'e-mail, pas de profil en ligne. Les profils existent uniquement dans votre base locale." },
  { icon: EyeOff, t: "Zéro tracker", d: "Aucune analytique, aucun pixel de suivi, aucune télémétrie. Le site et l'app sont silencieux par conception." },
  { icon: LockKeyhole, t: "Coffre chiffré", d: "L'espace Privé est verrouillé par PIN ou mot de passe : la clé est dérivée localement et ne quitte jamais votre disque." },
  { icon: Database, t: "Vos données, votre disque", d: "Base SQLite, vignettes et fonds stockés dans le dossier applicatif de votre session. Supprimez-le : tout disparaît." },
  { icon: Wifi, t: "Réseau uniquement sur choix", d: "Les seules sorties réseau sont celles que vous activez : métadonnées TMDB, flux YouTube/IPTV, partage entre amis." },
];

export default function Privacy() {
  useReveal();
  return (
    <section className="section container">
      <h1 className="reveal">Confidentialité : <span className="gradient-text">le silence est une fonctionnalité</span></h1>
      <p className="sub reveal">
        AetherVault Media est conçu selon un principe simple : ce que vous regardez ne regarde que vous.
      </p>
      <div className="priv-grid">
        {POINTS.map((p, i) => (
          <div className="card reveal" key={p.t} style={{ transitionDelay: `${i * 60}ms` }}>
            <span className="ico"><p.icon size={24} style={{ color: "var(--accent-2)" }} /></span>
            <h3>{p.t}</h3>
            <p>{p.d}</p>
          </div>
        ))}
      </div>
      <div className="cta reveal" style={{ marginTop: 48 }}>
        <h2>Ce qui sort de votre machine — et seulement ça</h2>
        <ul style={{ textAlign: "left", maxWidth: 620, margin: "18px auto 0", color: "var(--muted)", fontSize: 14, lineHeight: 2 }}>
          <li><b style={{ color: "var(--text)" }}>TMDB</b> — si vous renseignez une clé API et activez l'enrichissement automatique ;</li>
          <li><b style={{ color: "var(--text)" }}>YouTube / Cobalt / yt-dlp</b> — uniquement quand vous lisez un contenu AetherFy ;</li>
          <li><b style={{ color: "var(--text)" }}>Serveurs IPTV</b> — uniquement quand vous regardez une chaîne TV ;</li>
          <li><b style={{ color: "var(--text)" }}>Vos amis AetherVault</b> — uniquement si vous activez le partage d'activité.</li>
        </ul>
        <p style={{ marginTop: 18, color: "var(--muted)", fontSize: 13 }}>
          Rien d'autre. Jamais. Aucune de ces connexions n'est établie par défaut.
        </p>
      </div>
    </section>
  );
}