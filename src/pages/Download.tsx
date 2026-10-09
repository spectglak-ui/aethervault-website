import DownloadButtons from "../components/DownloadButtons";
import { useReveal } from "../hooks/useReveal";
export default function Download() {
  useReveal();
  return (
    <section className="section container">
      <h1 className="reveal">Télécharger</h1>
      <p className="sub reveal">Dernière version stable : 0.7.0 « Orbite ».</p>
      <DownloadButtons />
    </section>
  );
}