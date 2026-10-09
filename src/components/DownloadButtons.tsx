import { useEffect, useState, type JSX } from "react";
import { REPO } from "../config";
import { detectOS, fetchLatestRelease, pickAsset, type LatestRelease, type OS } from "../lib/releases";
import { WindowsIcon, AppleIcon, LinuxIcon } from "./OsIcons";

const ITEMS: { key: OS; icon: (s: number) => JSX.Element; label: string; sub: string }[] = [
  { key: "win", icon: (s) => <WindowsIcon size={s} />, label: "Windows", sub: "10 / 11 — .msi" },
  { key: "linux", icon: (s) => <LinuxIcon size={s} />, label: "Linux", sub: ".AppImage / .deb" },
  { key: "mac", icon: (s) => <AppleIcon size={s} />, label: "macOS", sub: "Intel & Apple Silicon" },
];

export default function DownloadButtons() {
  const [release, setRelease] = useState<LatestRelease | null>(null);
  const os = detectOS();

  useEffect(() => {
    fetchLatestRelease().then(setRelease);
  }, []);

  return (
    <>
      <div className="hero__dl">
        {ITEMS.map((it) => {
          const href =
            (release && pickAsset(release.assets, it.key)) ||
            `https://github.com/${REPO}/releases/latest`;
          return (
            <a
              key={it.key}
              className={`btn btn--os ${it.key === os ? "btn--primary recommended" : ""}`}
              href={href}
              target="_blank"
              rel="noreferrer"
            >
              <span style={{ display: "flex", alignItems: "center", gap: 8 }}>
                {it.icon(16)} {it.label}
              </span>
              <small>{it.sub}</small>
              {it.key === os && <span className="rec">recommandé pour vous</span>}
            </a>
          );
        })}
      </div>
      {release && (
        <div className="hero__meta">
          Dernière version : <b>{release.tag}</b> ·{" "}
          <a href={release.html_url} target="_blank" rel="noreferrer" style={{ color: "var(--accent-2)" }}>
            notes de version →
          </a>
        </div>
      )}
    </>
  );
}