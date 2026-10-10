import { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import {
  Clapperboard, Library, LockKeyhole, Music, Palette, Tv,
  ShieldCheck, Code2, EyeOff, Monitor, History, Users, Film, KeyRound,
  Server, Share2,
  type LucideIcon,
} from "lucide-react";
import DownloadButtons from "../components/DownloadButtons";
import { Logo } from "../components/Logo";
import { useReveal } from "../hooks/useReveal";
import { REPO } from "../config";

const FEATURES: { icon: LucideIcon; t: string; d: string }[] = [
  { icon: Clapperboard, t: "Lecture native 1080p", d: "Moteur libmpv + rendu logiciel optimisé : zéro transcodage, zéro compromis, même sur les gros fichiers." },
  { icon: Library, t: "Médiathèque organisée", d: "Films, séries, animes, documentaires et livres — métadonnées TMDB enrichies automatiquement après chaque scan." },
  { icon: Music, t: "AetherFy (YouTube)", d: "Abonnements, playlists, mode musique audio-seul et visualiseur spectral — sans quitter l'app." },
  { icon: Tv, t: "TV en direct", d: "Chaînes IPTV/HLS, zapping instantané, import M3U en un clic et arrêt propre du flux." },
  { icon: Server, t: "Stockage NAS", d: "Vos bibliothèques peuvent vivre sur un NAS ou un partage réseau : scan et lecture comme en local, sans aucune recopie." },
  { icon: Share2, t: "Partage entre amis", d: "Demandez à un ami AetherVault de vous téléverser un média via un simple code — de logiciel à logiciel, sans cloud intermédiaire." },
  { icon: LockKeyhole, t: "Coffre privé chiffré", d: "Un espace personnel verrouillé par PIN ou mot de passe, invisible pour les autres profils." },
  { icon: Palette, t: "Thèmes & profils", d: "Couleurs, typographies, fonds animés vidéo, profils locaux à permissions — chaque membre a son univers." },
];

const MARQUEE: { icon: LucideIcon; label: string }[] = [
  { icon: ShieldCheck, label: "100 % local" },
  { icon: Code2, label: "Open source" },
  { icon: EyeOff, label: "Sans tracker" },
  { icon: Monitor, label: "Windows · Linux · macOS" },
  { icon: LockKeyhole, label: "Coffre chiffré" },
  { icon: Tv, label: "TV en direct" },
  { icon: History, label: "Time Capsule" },
  { icon: Users, label: "Amis & activité" },
  { icon: Film, label: "Fonds animés" },
  { icon: KeyRound, label: "PO Token 4K" },
  { icon: Server, label: "Stockage NAS" },
  { icon: Share2, label: "Partage par code" },
];

function Counter({ to, suffix = "" }: { to: number; suffix?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  useEffect(() => {
    const el = ref.current!;
    const io = new IntersectionObserver(([e]) => {
      if (!e.isIntersecting) return;
      io.disconnect();
      const t0 = performance.now();
      const dur = 1400;
      const step = (t: number) => {
        const p = Math.min(1, (t - t0) / dur);
        el.textContent = Math.round(to * (1 - Math.pow(1 - p, 3))) + suffix;
        if (p < 1) requestAnimationFrame(step);
      };
      requestAnimationFrame(step);
    }, { threshold: 0.5 });
    io.observe(el);
    return () => io.disconnect();
  }, [to, suffix]);
  return <span ref={ref}>0{suffix}</span>;
}

export default function Home() {
  useReveal();

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      const card = (e.target as HTMLElement).closest(".card") as HTMLElement | null;
      if (!card) return;
      const r = card.getBoundingClientRect();
      card.style.setProperty("--mx", `${e.clientX - r.left}px`);
      card.style.setProperty("--my", `${e.clientY - r.top}px`);
    };
    addEventListener("mousemove", onMove);
    return () => removeEventListener("mousemove", onMove);
  }, []);

  return (
    <>
      <section className="hero container">
        <div>
          <span className="badge"><span className="dot" /> v0.7.0 — Orbite</span>
          <h1>
            Votre médiathèque.
            <br />
            <span className="gradient-text">Votre univers.</span>
          </h1>
          <p className="lead">
            AetherVault Media rassemble films, séries, animes, TV en direct, musique
            YouTube et coffre privé chiffré dans une seule application de bureau —
            100 % locale, sans abonnement, sans tracker.
          </p>
          <DownloadButtons />
          <div className="hero__meta">
            <Link to="/telecharger" style={{ color: "var(--accent-2)" }}>Toutes les versions & prérequis →</Link>
          </div>
        </div>
        <div className="orbit" aria-hidden="true">
          <div className="orbit__core"><Logo size={54} /></div>
          <div className="orbit__ring orbit__ring--1"><span className="orbit__planet"><Clapperboard size={15} /></span></div>
          <div className="orbit__ring orbit__ring--2"><span className="orbit__planet"><Tv size={15} /></span></div>
          <div className="orbit__ring orbit__ring--3"><span className="orbit__planet"><Music size={15} /></span></div>
        </div>
      </section>

      <div className="marquee" aria-hidden="true">
        <div className="marquee__track">
          {[...MARQUEE, ...MARQUEE].map(({ icon: Icon, label }, i) => (
            <span key={i}><Icon size={12} /> {label}</span>
          ))}
        </div>
      </div>

      <section className="section container">
        <h2 className="reveal">Tout votre contenu, <span className="gradient-text">une seule orbite</span></h2>
        <p className="sub reveal">Conçu pour rester chez vous : vos fichiers, vos règles, votre machine.</p>
        <div className="grid">
          {FEATURES.map(({ icon: Icon, t, d }, i) => (
            <div className="card reveal" key={t} style={{ transitionDelay: `${i * 60}ms` }}>
              <span className="ico"><Icon size={24} style={{ color: "var(--accent-2)" }} /></span>
              <h3>{t}</h3>
              <p>{d}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="section container">
        <div className="stats reveal">
          <div className="stat"><b style={{ color: "var(--accent)" }}><Counter to={3} /></b><span>plateformes natives</span></div>
          <div className="stat"><b style={{ color: "var(--accent-2)" }}><Counter to={100} suffix=" %" /></b><span>local & open source</span></div>
          <div className="stat"><b style={{ color: "var(--accent)" }}><Counter to={0} /></b><span>abonnement, tracker ou cloud</span></div>
          <div className="stat"><b style={{ color: "var(--accent-2)" }}><Counter to={7} suffix="+" /></b><span>univers de médias</span></div>
        </div>
      </section>

      <section className="section container">
        <div className="cta reveal">
          <h2>Un bug ? Une idée ? <span className="gradient-text">Parlez-nous.</span></h2>
          <p className="sub" style={{ margin: "12px auto 28px" }}>
            Le projet avance avec ses utilisateurs : chaque retour compte.
          </p>
          <div style={{ display: "flex", gap: 14, justifyContent: "center", flexWrap: "wrap" }}>
            <Link className="btn btn--primary" to="/feedback">Signaler / proposer</Link>
            <a className="btn btn--ghost" href={`https://github.com/${REPO}`} target="_blank" rel="noreferrer">Voir sur GitHub ↗</a>
            <Link className="btn btn--ghost" to="/decouvrir">Découvrir en vidéo ▶</Link>
          </div>
        </div>
      </section>
    </>
  );
}