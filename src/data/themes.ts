/** Thèmes embarqués (secours si l'API GitHub est inaccessible).
 * Mêmes clés CSS que l'export JSON de l'app (Paramètres → Couleurs du thème). */
export type ThemeVars = Record<string, string>;

export interface BundledTheme {
  name: string;
  author: string;
  vars: ThemeVars;
}

export const BUNDLED_THEMES: BundledTheme[] = [
  {
    name: "Ocean",
    author: "Équipe AetherVault",
    vars: {
      "--color-bg": "#0a1628", "--color-surface": "#0f2035", "--color-surface-hover": "#142d4a",
      "--color-border": "rgba(100,170,255,.10)", "--color-accent": "#1e80ef", "--color-accent-hover": "#1668c7",
      "--color-text": "#e2e8f0", "--color-text-muted": "#7b93a8", "--color-sidebar": "#0d1a2d", "--color-card": "#0f2035",
    },
  },
  {
    name: "Cherry",
    author: "Équipe AetherVault",
    vars: {
      "--color-bg": "#1a0a10", "--color-surface": "#2a1018", "--color-surface-hover": "#3a1825",
      "--color-border": "rgba(255,100,150,.10)", "--color-accent": "#e8365d", "--color-accent-hover": "#c72d4f",
      "--color-text": "#f0e2e6", "--color-text-muted": "#a87b8b", "--color-sidebar": "#1f0c14", "--color-card": "#2a1018",
    },
  },
  {
    name: "Forest",
    author: "Équipe AetherVault",
    vars: {
      "--color-bg": "#0a1a10", "--color-surface": "#102a18", "--color-surface-hover": "#183a25",
      "--color-border": "rgba(100,255,150,.10)", "--color-accent": "#36e86d", "--color-accent-hover": "#2dc75a",
      "--color-text": "#e2f0e6", "--color-text-muted": "#7ba88b", "--color-sidebar": "#0c1f12", "--color-card": "#102a18",
    },
  },
  {
    name: "Sunset",
    author: "Équipe AetherVault",
    vars: {
      "--color-bg": "#1a120a", "--color-surface": "#2a1a10", "--color-surface-hover": "#3a2518",
      "--color-border": "rgba(255,180,100,.10)", "--color-accent": "#e89036", "--color-accent-hover": "#c77a2d",
      "--color-text": "#f0e8e2", "--color-text-muted": "#a8937b", "--color-sidebar": "#1f160c", "--color-card": "#2a1a10",
    },
  },
];