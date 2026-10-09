import { REPO } from "../config";

export interface ReleaseAsset { name: string; url: string; }
export interface LatestRelease { tag: string; html_url: string; assets: ReleaseAsset[]; }

/** Dernière release GitHub — les boutons pointent toujours vers le bon installateur. */
export async function fetchLatestRelease(): Promise<LatestRelease | null> {
  try {
    const res = await fetch(`https://api.github.com/repos/${REPO}/releases/latest`);
    if (!res.ok) return null;
    const j = await res.json();
    return {
      tag: j.tag_name ?? "",
      html_url: j.html_url ?? "",
      assets: (j.assets ?? []).map((a: any) => ({ name: a.name, url: a.browser_download_url })),
    };
  } catch {
    return null;
  }
}

export type OS = "win" | "linux" | "mac";

export function detectOS(): OS {
  const ua = navigator.userAgent.toLowerCase();
  if (ua.includes("mac")) return "mac";
  if (ua.includes("linux")) return "linux";
  return "win";
}

export function pickAsset(assets: ReleaseAsset[], os: OS): string | null {
  const re: Record<OS, RegExp> = {
    win: /\.(msi|exe)$/i,
    linux: /\.(appimage|deb)$/i,
    mac: /\.dmg$/i,
  };
  return assets.find((a) => re[os].test(a.name))?.url ?? null;
}