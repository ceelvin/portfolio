import React from "react";
import ReactDOM from "react-dom/client";
import StarryBackground from "./components/Background/StarryBackground";
import Headliner from "./components/Headliner/Headliner";
import About from "./components/About/About";
import Projects from "./components/Projects/Projects";
import Contact from "./components/Contact/Contact";
import "./index.css";
import Skills from "./components/Skills/Skills";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <StarryBackground />
    <main className="main">
      <section id="headliner" className="headliner">
        <Headliner />
      </section>
      <section className="about">
        <About />
      </section>
      <div className="portfolio-wrapper">
        <section id="projects" className="projects-section-wrapper">
          <Projects />
        </section>
        <section id="skills" className="skills-section-wrapper">
          <Skills />
        </section>
      </div>
      <footer id="contact" className="contact">
        <Contact />
      </footer>
    </main>
  </React.StrictMode>,
);
