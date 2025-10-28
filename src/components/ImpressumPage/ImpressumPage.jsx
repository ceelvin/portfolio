import React from "react";
import { Link } from "react-router-dom";
import StarryBackground from "../Background/StarryBackground";
import Navigation from "../Navigation/Navigation";
import Footer from "../Footer/Footer";
import "./ImpressumPage.css";

const ImpressumPage = () => {
  return (
    <>
      <StarryBackground />
      <Navigation />
      <main className="main">
        <section className="impressum-page-section">
          <div className="impressum-page-container">
            <h1 className="impressum-page-title">Impressum</h1>
            <div className="impressum-content">
              <h2>Angaben gemäß § 5 TMG</h2>
              <p>Celvin Kuhn</p>
              <p>Mannheim, Germany</p>
              <p>Email: <a href="mailto:Celvin.Kuhn@gmail.com">Celvin.Kuhn@gmail.com</a></p>

              <h2>Haftung für Inhalte</h2>
              <p>Die Inhalte unserer Seiten wurden mit größter Sorgfalt erstellt. Für die Richtigkeit, Vollständigkeit und Aktualität der Inhalte können wir jedoch keine Gewähr übernehmen.</p>

              <h2>Haftung für Links</h2>
              <p>Unser Angebot enthält Links zu externen Webseiten Dritter, auf deren Inhalte wir keinen Einfluss haben. Deshalb können wir für diese fremden Inhalte auch keine Gewähr übernehmen.</p>

              <h2>Urheberrecht</h2>
              <p>Die durch die Seitenbetreiber erstellten Inhalte und Werke auf diesen Seiten unterliegen dem deutschen Urheberrecht.</p>
            </div>
            <Link to="/" className="back-link">← Back to Portfolio</Link>
          </div>
        </section>
        <Footer />
      </main>
    </>
  );
};

export default ImpressumPage;