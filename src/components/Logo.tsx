const SRC = `${import.meta.env.BASE_URL}logo.png`;

/** Logo officiel AetherVault Media (fichier public/logo.png). */
export function Logo({ size = 28, glow = true }: { size?: number; glow?: boolean }) {
  return (
    <img
      src={SRC}
      alt=""
      aria-hidden="true"
      className={glow ? "logo-img logo-img--glow" : "logo-img"}
      style={{ width: size, height: size }}
    />
  );
}