import {
  BookOpen, Clapperboard, History, Library, LockKeyhole, Music,
  Palette, Server, Share2, ShieldCheck, Tv, type LucideIcon,
} from "lucide-react";
import { useReveal } from "../hooks/useReveal";

interface WikiSection {
  id: string;
  icon: LucideIcon;
  title: string;
  intro: string;
  points: string[];
}

const SECTIONS: WikiSection[] = [
  {
    id: "univers",
    icon: Library,
    title: "Univers & médiathèque",
    intro: "Toute votre médiathèque est organisée en univers : Films, Séries, Animé, Documentaires, Lecture et TV. Chaque dossier ajouté est scanné, reconnu et enrichi automatiquement.",
    points: [
      "Scan des bibliothèques locales ou réseau : détection des fichiers et de leur structure (saisons, tomes, albums) ;",
      "Enrichissement TMDB optionnel : affiches, synopsis, notes, distribution (votre propre clé API) ;",
      "Page Explorer : facettes catégorie, année, genre, résolution avec compteurs en temps réel ;",
      "Accueil personnalisable : bannière « à la une », univers avec compteurs, ajouts récents, statistiques.",
    ],
  },
  {
    id: "lecteur",
    icon: Clapperboard,
    title: "Le lecteur vidéo",
    intro: "Lecture native par libmpv et FFmpeg : aucun transcodage, aucune perte. Les informations techniques du flux s'affichent en direct (résolution, cadence, codec, conteneur, piste audio, sous-titres).",
    points: [
      "4 préréglages de post-traitement : Standard, Netteté, Couleurs vives, Anime4K-lite ;",
      "Pistes audio multiples et sous-titres sélectionnables à la volée ;",
      "Reprise de lecture là où vous vous étiez arrêté ;",
      "Rendu adaptatif : la résolution interne s'ajuste pour rester fluide sur les machines modestes.",
    ],
  },
  {
    id: "aetherfy",
    icon: Music,
    title: "AetherFy : YouTube, sans navigateur",
    intro: "Un module YouTube complet intégré à l'application : parcourez, regardez et écoutez sans jamais ouvrir de navigateur.",
    points: [
      "Abonnements et chaînes suivies depuis l'application ;",
      "Playlists et files de lecture ;",
      "Mode musique : audio seul avec visualiseur spectral et mini-player persistant ;",
      "Haute qualité selon disponibilité du flux, jeton PO géré pour les flux protégés.",
    ],
  },
  {
    id: "tv",
    icon: Tv,
    title: "TV en direct",
    intro: "Regardez vos chaînes IPTV/HLS directement dans AetherVault Media.",
    points: [
      "Import de listes M3U en un clic ;",
      "Zapping instantané entre chaînes, arrêt propre du flux ;",
      "Favoris selon votre liste.",
    ],
  },
  {
    id: "coffre",
    icon: LockKeyhole,
    title: "Coffre privé",
    intro: "Un espace chiffré pour vos contenus personnels : vidéos, galeries et lectures. Le contenu est chiffré en AES-256-GCM et n'existe jamais en clair sur le disque.",
    points: [
      "Déverrouillage par PIN ou mot de passe ;",
      "Chiffrement de bout en bout local : aucune exposition réseau ;",
      "Invisible pour les autres profils de l'application ;",
      "Aperçus et compteurs masqués tant que le coffre est verrouillé.",
    ],
  },
  {
    id: "partage",
    icon: Share2,
    title: "Partage par code entre amis",
    intro: "Invitez un ami qui possède AetherVault Media à vous téléverser un média via un code temporaire — sans cloud, sans compte, de logiciel à logiciel.",
    points: [
      "Génération d'un code du type AVM-XXXX-XXXX à transmettre à votre ami ;",
      "Chiffrement SHA-256 + AES-256-GCM, connexion de bout en bout ;",
      "Aucune exposition réseau non contrôlée : vous acceptez chaque transfert ;",
      "Statut de connexion visible en direct.",
    ],
  },
  {
    id: "timecapsule",
    icon: History,
    title: "Time Capsule",
    intro: "Vos statistiques de visionnage sur un an, présentées en un coup d'œil.",
    points: [
      "Heures regardées par univers et par mois ;",
      "Titres en cours, terminés, ajoutés ;",
      "Répartition Films / Séries / Animé / Documentaires / Lecture.",
    ],
  },
  {
    id: "lecture",
    icon: BookOpen,
    title: "Lecture : manga, webtoon, BD, roman",
    intro: "Un lecteur de livres et bandes dessinées intégré, avec progression mémorisée tome par tome et chapitre par chapitre.",
    points: [
      "Ouvrages image (manga, webtoon, BD) et texte (romans) ;",
      "Progression mémorisée et reprise automatique (ex. « Tome 2 · Chapitre 87 — 64 % ») ;",
      "Sens de lecture et fond adaptés au type d'ouvrage.",
    ],
  },
  {
    id: "personnalisation",
    icon: Palette,
    title: "Thèmes, profils & fonds animés",
    intro: "Chaque membre de la maison a son profil ; chaque profil a son univers visuel.",
    points: [
      "Profils locaux avec avatar, permissions et accès rapide — aucun compte en ligne ;",
      "Notes et watchlist par profil : de 0,5 à 5 étoiles, statuts À voir / En cours / Vu ;",
      "Thèmes personnalisables : couleurs, typographies, fonds animés vidéo ;",
      "Export / import JSON : partagez vos thèmes via la galerie communautaire du site.",
    ],
  },
  {
    id: "nas",
    icon: Server,
    title: "Stockage local & NAS",
    intro: "Vos bibliothèques peuvent vivre sur n'importe quel dossier local, disque externe, NAS ou partage réseau.",
    points: [
      "Bibliothèques pointant vers un chemin réseau (SMB/NFS selon l'OS) ;",
      "Lecture en LAN sans recopie locale ;",
      "Indexation et vignettes conservées localement.",
    ],
  },
  {
    id: "confidentialite",
    icon: ShieldCheck,
    title: "Local-first, open source",
    intro: "AetherVault Media est conçu selon un principe simple : ce que vous regardez ne regarde que vous.",
    points: [
      "Aucun abonnement, aucun compte en ligne, aucun tracker, aucune télémétrie ;",
      "Les seules connexions réseau sont celles que vous activez (TMDB, YouTube, IPTV, partage) ;",
      "Code open source (MIT), builds officiels Windows, macOS et Linux ;",
      "Détail complet sur la page Confidentialité.",
    ],
  },
];

export default function Wiki() {
  useReveal();
  const goTo = (id: string) =>
    document.getElementById(`wiki-${id}`)?.scrollIntoView({ behavior: "smooth", block: "start" });

  return (
    <section className="section container">
      <span className="badge reveal"><span className="dot" /> Documentation · v0.7.5</span>
      <h1 className="reveal" style={{ marginTop: 14 }}>
        Le wiki <span className="gradient-text">AetherVault Media</span>
      </h1>
      <p className="sub reveal">
        Toutes les fonctionnalités du logiciel, expliquées simplement. Choisissez une section ou faites défiler.
      </p>

      <div className="wiki">
        <nav className="wiki__toc reveal" aria-label="Sommaire du wiki">
          {SECTIONS.map(({ id, icon: Icon, title }) => (
            <button key={id} onClick={() => goTo(id)}>
              <Icon size={13} style={{ marginRight: 7, verticalAlign: "-2px" }} />
              {title}
            </button>
          ))}
        </nav>

        <div>
          {SECTIONS.map(({ id, icon: Icon, title, intro, points }, i) => (
            <section
              key={id}
              id={`wiki-${id}`}
              className="card reveal"
              style={{ transitionDelay: `${Math.min(i, 6) * 50}ms`, marginBottom: 18 }}
            >
              <span className="ico"><Icon size={24} style={{ color: "var(--accent-2)" }} /></span>
              <h3 style={{ fontSize: 20 }}>{title}</h3>
              <p style={{ marginTop: 8 }}>{intro}</p>
              <ul className="wiki__points">
                {points.map((p) => <li key={p}>{p}</li>)}
              </ul>
            </section>
          ))}
        </div>
      </div>
    </section>
  );
}