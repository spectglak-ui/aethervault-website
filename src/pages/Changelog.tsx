import { useEffect, useState } from "react";
import { REPO } from "../config";
import { useReveal } from "../hooks/useReveal";
import { osIconFor } from "../components/OsIcons";

interface Asset { id: number; name: string; size: number; browser_download_url: string; }
interface Release {
  id: number;
  tag_name: string;
  name: string;
  published_at: string;
  prerelease: boolean;
  body: string;
  html_url: string;
  assets: Asset[];
}

export default function Changelog() {
  useReveal();
  const [releases, setReleases] = useState<Release[] | null>(null);
  const [error, setError] = useState(false);

  useEffect(() => {
    fetch(`https://api.github.com/repos/${REPO}/releases`)
      .then((r) => (r.ok ? r.json() : Promise.reject()))
      .then(setReleases)
      .catch(() => setError(true));
  }, []);

  return (
    <section className="section container">
      <h1 className="reveal">Changelog</h1>
      <p className="sub reveal">Historique des versions, généré automatiquement depuis les releases GitHub.</p>

      {error && (
        <p style={{ color: "var(--muted)" }}>
          Impossible de joindre l'API GitHub.{" "}
          <a href={`https://github.com/${REPO}/releases`} target="_blank" rel="noreferrer" style={{ color: "var(--accent-2)" }}>
            Voir les releases sur GitHub →
          </a>
        </p>
      )}
      {!error && releases === null && <p style={{ color: "var(--muted)" }}>Chargement…</p>}

      {releases?.map((r, idx) => (
        <article key={r.id} className="cl-item reveal" style={{ transitionDelay: `${Math.min(idx, 6) * 60}ms` }}>
          <header>
            <span className="cl-tag">{r.tag_name}</span>
            <span className="cl-date">
              {new Date(r.published_at).toLocaleDateString("fr-FR", { day: "numeric", month: "long", year: "numeric" })}
            </span>
            {r.prerelease && <span className="cl-pre">pré-release</span>}
          </header>
          <div className="cl-body">
            {String(r.body ?? "")
              .split(/\r?\n/)
              .filter((l) => l.trim())
              .map((line, i) =>
                line.trim().startsWith("-") ? (
                  <p key={i} className="cl-li">{line.replace(/^\s*-\s*/, "")}</p>
                ) : (
                  <p key={i} style={{ color: "var(--text)", fontWeight: line.startsWith("#") ? 700 : 400 }}>
                    {line.replace(/^#+\s*/, "")}
                  </p>
                )
              )}
          </div>
          {r.assets.length > 0 && (
            <div className="cl-assets">
              {r.assets.map((a) => (
                <a key={a.id} href={a.browser_download_url} className="btn btn--ghost" style={{ padding: "6px 12px", fontSize: 12 }}>
                  {osIconFor(a.name)} {a.name} · {(a.size / 1e6).toFixed(1)} Mo
                </a>
              ))}
            </div>
          )}
        </article>
      ))}
    </section>
  );
}