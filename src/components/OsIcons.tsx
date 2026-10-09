/** Marques OS en SVG inline (lucide ne fournit pas Windows/Apple/Tux). */
export function WindowsIcon({ size = 16 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M3 5.5 10.5 4.4v7.1H3zM11.5 4.2 21 3v8.5h-9.5zM3 12.5h7.5v7.1L3 18.5zM11.5 12.5H21V21l-9.5-1.2z" />
    </svg>
  );
}

export function AppleIcon({ size = 16 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M16.7 12.9c0-2 1.6-3 1.7-3.1-1-1.4-2.4-1.6-2.9-1.6-1.2-.1-2.4.7-3 .7-.6 0-1.6-.7-2.6-.7-1.3 0-2.6.8-3.3 2-1.4 2.4-.4 6 1 8 .7 1 1.5 2.1 2.6 2 1-.1 1.4-.7 2.6-.7s1.6.7 2.6.7c1.1 0 1.8-1 2.5-2 .8-1.1 1.1-2.2 1.1-2.3-.1 0-2.3-.9-2.3-3zM14.8 6.7c.5-.7.9-1.6.8-2.6-.8 0-1.8.6-2.3 1.2-.5.6-1 1.6-.8 2.5.9.1 1.8-.4 2.3-1.1z" />
    </svg>
  );
}

export function LinuxIcon({ size = 16 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M12 2a4 4 0 0 0-4 4c0 1 .2 2-.3 3-.6 1.2-1.7 2.2-2.4 3.5A6.8 6.8 0 0 0 4.5 16c0 .8.1 1.5.4 2.1-.3.6-.5 1.2-.5 1.7 0 1.2 1 1.9 2.2 2 .6.1 1.2.1 1.7.3.5.2.9.5 1.4.6.7.2 1.5.3 2.3.3s1.6-.1 2.3-.3c.5-.1.9-.4 1.4-.6.5-.2 1.1-.2 1.7-.3 1.2-.1 2.2-.8 2.2-2 0-.5-.2-1.1-.5-1.7.3-.6.4-1.3.4-2.1 0-1.2-.3-2.4-.8-3.5-.7-1.3-1.8-2.3-2.4-3.5-.5-1-.3-2-.3-3a4 4 0 0 0-4-4Zm-1.6 3.2c.4 0 .7.4.7.9s-.3.9-.7.9-.7-.4-.7-.9.3-.9.7-.9Zm3.2 0c.4 0 .7.4.7.9s-.3.9-.7.9-.7-.4-.7-.9.3-.9.7-.9Z" />
    </svg>
  );
}

/** Icône selon le nom d'un asset de release GitHub. */
export function osIconFor(name: string, size = 14) {
  if (/\.(msi|exe)$/i.test(name)) return <WindowsIcon size={size} />;
  if (/\.dmg$/i.test(name)) return <AppleIcon size={size} />;
  if (/\.(appimage|deb|rpm)$/i.test(name)) return <LinuxIcon size={size} />;
  return null;
}