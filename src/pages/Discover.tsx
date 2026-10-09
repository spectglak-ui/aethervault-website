import { useReveal } from "../hooks/useReveal";
export default function Discover() {
  useReveal();
  return (
    <section className="section container">
      <h1 className="reveal">Découvrir <span className="gradient-text">AetherVault Media</span></h1>
      <p className="sub reveal">Page de présentation complète + vidéo — arrivée dans la prochaine itération.</p>
      <div className="card reveal" style={{ aspectRatio: "16/9", display: "grid", placeItems: "center", color: "var(--muted)" }}>
        ▶ Emplacement de ta vidéo de présentation
      </div>
    </section>
  );
}