import { useEffect } from "react";
import { Link, NavLink, Route, Routes, useLocation } from "react-router-dom";
import Starfield from "./components/Starfield";
import { Logo } from "./components/Logo";
import Home from "./pages/Home";
import Discover from "./pages/Discover";
import Download from "./pages/Download";
import Feedback from "./pages/Feedback";
import Themes from "./pages/Themes";
import Changelog from "./pages/Changelog";
import Privacy from "./pages/Privacy";
import { REPO } from "./config";

function ScrollTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

export default function App() {
  return (
    <>
      <Starfield />
      <ScrollTop />
      <header className="nav">
        <div className="container nav__inner">
          <NavLink to="/" className="nav__brand">
  <span className="nav__logo"><Logo size={26} /></span>
  <span style={{ fontFamily: "var(--mono-display)", fontSize: 18, letterSpacing: 1 }}>
    AetherVault
  </span>
  <em style={{ fontFamily: "var(--mono-display)", fontSize: 18, color: "var(--accent-2)", letterSpacing: 1, fontStyle: "normal" }}>
    Media
  </em>
</NavLink>
          <nav className="nav__links">
            <NavLink to="/" end>Accueil</NavLink>
            <NavLink to="/decouvrir">Découvrir</NavLink>
            <NavLink to="/telecharger">Télécharger</NavLink>
            <NavLink to="/themes">Thèmes</NavLink>
            <NavLink to="/changelog">Changelog</NavLink>
            <NavLink to="/feedback">Feedback</NavLink>
          </nav>
          <a
            className="btn btn--ghost"
            style={{ padding: "8px 14px", fontSize: 13 }}
            href={`https://github.com/${REPO}`}
            target="_blank"
            rel="noreferrer"
          >
            GitHub ↗
          </a>
        </div>
      </header>
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/decouvrir" element={<Discover />} />
          <Route path="/telecharger" element={<Download />} />
          <Route path="/themes" element={<Themes />} />
          <Route path="/changelog" element={<Changelog />} />
          <Route path="/feedback" element={<Feedback />} />
          <Route path="/privacy" element={<Privacy />} />
          <Route path="*" element={<Home />} />
        </Routes>
      </main>
      <footer>
        <div className="container">
          <span>© {new Date().getFullYear()} AetherVault Media — fait avec ❤️ et libmpv.</span>
          <span style={{ display: "flex", gap: 18, flexWrap: "wrap" }}>
            <Link to="/themes">Thèmes</Link>
            <Link to="/changelog">Changelog</Link>
            <Link to="/privacy">Confidentialité</Link>
            <a href={`https://github.com/${REPO}`} target="_blank" rel="noreferrer">GitHub</a>
          </span>
        </div>
      </footer>
    </>
  );
}