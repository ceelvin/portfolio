import React, { useEffect } from "react";
import ReactDOM from "react-dom/client";
import StarryBackground from "./components/Background/StarryBackground";
import Navigation from "./components/Navigation/Navigation";
import About from "./components/About/About";
import Projects from "./components/Projects/Projects";
import Footer from "./components/Footer/Footer";
import BackToTop from "./components/BackToTop/BackToTop";
import "./index.css";
import Skills from "./components/Skills/Skills";
import useIntersectionObserver from "./hooks/useIntersectionObserver";


const App = () => {
  const aboutRef = React.useRef();
  const projectsRef = React.useRef();
  const skillsRef = React.useRef();

  useIntersectionObserver(aboutRef, { threshold: 0.2 });
  useIntersectionObserver(projectsRef, { threshold: 0.1 });
  useIntersectionObserver(skillsRef, { threshold: 0.1 });


  useEffect(() => {
    const timer = setTimeout(() => {
      document.body.classList.add("loaded");
    }, 100);

    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      <StarryBackground />
      <BackToTop />
      <Navigation />
      <main className="main">
        <section
          ref={aboutRef}
          id="about"
          className="about fade-in slide-in-left"
        >
          <About />
        </section>

        <div ref={projectsRef} className="portfolio-wrapper fade-in scale-in">
          <section id="projects" className="projects-section-wrapper">
            <Projects />
          </section>
          <section
            ref={skillsRef}
            id="skills"
            className="skills-section-wrapper fade-in slide-in-right"
          >
            <Skills />
          </section>
        </div>

        <Footer />
      </main>
    </>
  );
};

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);
