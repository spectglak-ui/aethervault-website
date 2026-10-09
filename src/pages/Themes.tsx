import { useEffect, useState, type CSSProperties } from "react";
import { Download, ExternalLink, Plus } from "lucide-react";
import { REPO } from "../config";
import { BUNDLED_THEMES, type ThemeVars } from "../data/themes";
import { useReveal } from "../hooks/useReveal";

interface GalleryTheme {
  name: string;
  author: string;
  vars: ThemeVars;
  raw: string;
  community: boolean;
}

/** Charge les thèmes communautaires déposés dans le dossier /themes du repo
 * (API GitHub contents — zéro backend, zéro maintenance). */
async function loadCommunity(): Promise<GalleryTheme[]> {
  try {
    const res = await fetch(`https://api.github.com/repos/${REPO}/contents/themes`);
    if (!res.ok) return [];
    const list = (await res.json()) as any[];
    const out: GalleryTheme[] = [];
    for (const f of list.filter((x) => x.name.endsWith(".json"))) {
      const raw = await fetch(f.download_url).then((r) => r.text());
      const json = JSON.parse(raw);
      out.push({
        name: json.name ?? f.name.replace(/\.json$/, ""),
        author: json.author ?? "Communauté",
        vars: json.vars ?? json,
        raw,
        community: true,
      });
    }
    return out;
  } catch {
    return [];
  }
}

/** Mini-maquette de l'app colorée par les variables du thème — aperçu live. */
function ThemePreview({ vars }: { vars: ThemeVars }) {
  const v = (k: string, d: string) => vars[k] ?? d;
  return (
    <div
      className="tp"
      style={{ background: v("--color-bg", "#0b0c10"), borderColor: v("--color-border", "#26282f") } as CSSProperties}
    >
      <div className="tp__side" style={{ background: v("--color-sidebar", "#101216") }} />
      <div className="tp__main">
        <div className="tp__title" style={{ color: v("--color-text", "#eee") }}>Ma médiathèque</div>
        <div className="tp__muted" style={{ color: v("--color-text-muted", "#999") }}>128 titres · 3 bibliothèques</div>
        <div
          className="tp__card"
          style={{ background: v("--color-card", "#181a1f"), borderColor: v("--color-border", "#26282f") }}
        >
          <div className="tp__line" style={{ background: v("--color-surface-hover", "#22252b") }} />
          <div className="tp__line tp__line--short" style={{ background: v("--color-surface-hover", "#22252b") }} />
        </div>
        <span className="tp__btn" style={{ background: v("--color-accent", "#7c5cff") }}>Lecture</span>
      </div>
    </div>
  );
}

export default function Themes() {
  useReveal();
  const [themes, setThemes] = useState<GalleryTheme[]>(() =>
    BUNDLED_THEMES.map((t) => ({ ...t, raw: JSON.stringify(t.vars, null, 2), community: false }))
  );

  useEffect(() => {
    loadCommunity().then((community) => {
      if (community.length > 0) setThemes((prev) => [...community, ...prev]);
    });
  }, []);

  const download = (t: GalleryTheme) => {
    const blob = new Blob([t.raw], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${t.name.toLowerCase().replace(/\s+/g, "-")}-theme.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <section className="section container">
      <h1 className="reveal">Galerie de <span className="gradient-text">thèmes</span></h1>
      <p className="sub reveal">
        Des thèmes créés par la communauté, avec aperçu live. Téléchargez le JSON,
        puis importez-le dans l'app : <b>Paramètres → Couleurs du thème → Importer</b>.
      </p>

      <div className="theme-grid">
        {themes.map((t, i) => (
          <div className="card reveal" key={`${t.name}-${i}`} style={{ transitionDelay: `${(i % 6) * 60}ms` }}>
            <div className="theme-card__head">
              <h3 style={{ margin: 0 }}>{t.name}</h3>
              <span className="theme-card__author">{t.author}{t.community ? " · communauté" : ""}</span>
            </div>
            <ThemePreview vars={t.vars} />
            <div className="theme-card__actions">
              <button className="btn" style={{ padding: "8px 14px", fontSize: 13 }} onClick={() => download(t)}>
                <Download size={14} /> JSON
              </button>
            </div>
          </div>
        ))}
      </div>

      <div className="cta reveal" style={{ marginTop: 48 }}>
        <h2>Votre thème dans la galerie ?</h2>
        <p className="sub" style={{ margin: "12px auto 20px" }}>
          Créez-le dans l'app (Paramètres → Couleurs du thème), exportez le JSON,
          puis déposez-le dans le dossier <code>themes/</code> du repo :
          il apparaît ici automatiquement.
        </p>
        <ol style={{ textAlign: "left", maxWidth: 560, margin: "0 auto 22px", color: "var(--muted)", fontSize: 14, lineHeight: 1.9 }}>
          <li>Exportez votre thème depuis l'app (bouton <b>Exporter</b>) ;</li>
          <li>Ouvrez le lien ci-dessous (GitHub crée le fichier dans <code>themes/</code>) ;</li>
          <li>Collez le JSON, nommez le fichier <code>mon-theme.json</code>, proposez la modification.</li>
        </ol>
        <div style={{ display: "flex", gap: 14, justifyContent: "center", flexWrap: "wrap" }}>
          <a className="btn btn--primary" href={`https://github.com/${REPO}/new/main/themes`} target="_blank" rel="noreferrer">
            <Plus size={15} /> Déposer mon thème
          </a>
          <a className="btn btn--ghost" href={`https://github.com/${REPO}/tree/main/themes`} target="_blank" rel="noreferrer">
            <ExternalLink size={14} /> Voir le dossier themes/
          </a>
        </div>
      </div>
    </section>
  );
}