import { REPO } from "../config";
import { useReveal } from "../hooks/useReveal";
export default function Feedback() {
  useReveal();
  return (
    <section className="section container">
      <h1 className="reveal">Feedback & bugs</h1>
      <p className="sub reveal">Formulaire complet (→ issue GitHub pré-remplie) dans la prochaine itération.</p>
      <a className="btn btn--primary reveal" href={`https://github.com/${REPO}/issues/new/choose`} target="_blank" rel="noreferrer">
        Ouvrir une issue GitHub ↗
      </a>
    </section>
  );
}