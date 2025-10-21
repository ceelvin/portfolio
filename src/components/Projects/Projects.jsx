import { useState, useRef } from "react";
import "./Projects.css";
import { projects } from "../../data/projects";
import useMultipleIntersectionObserver from "../../hooks/useMultipleIntersectionObserver";
import { FaLayerGroup, FaGamepad, FaChartBar, FaArrowRight } from "react-icons/fa";

const Projects = () => {
  const [filter, setFilter] = useState("all");

  const filteredProjects =
    filter === "all"
      ? projects
      : projects.filter((project) => project.category === filter);

  const projectRefs = [useRef(), useRef()];

  useMultipleIntersectionObserver(projectRefs);

  const categories = [
    { id: "all", label: "All Projects", icon: <FaLayerGroup /> },
    { id: "game", label: "Games", icon: <FaGamepad /> },
    { id: "data", label: "Data Viz", icon: <FaChartBar /> },
  ];

  return (
    <section id="projects" className="projects-section">
      <div className="projects-container">
        <div className="projects-header">
          <h2 className="projects-title">
            <span className="title-accent">My</span> Projects
          </h2>
          <p className="projects-subtitle">
            A showcase of my recent work and creative solutions
          </p>
        </div>

        <div className="filter-buttons">
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => setFilter(category.id)}
              className={`filter-btn ${filter === category.id ? "active" : ""}`}
            >
              <span className="filter-icon">{category.icon}</span>
              {category.label}
            </button>
          ))}
        </div>

        <div className="projects-grid">
          {filteredProjects.map((project, index) => (
            <article
              key={index}
              ref={projectRefs[index]}
              className={`project-card ${project.featured ? "featured" : ""}`}
              style={{ "--delay": `${index * 0.1}s` }}
            >
              <div className="project-content">
                <h3 className="project-title">{project.title}</h3>
                <p className="project-description">{project.description}</p>

                <div className="project-tech">
                  {project.technologies.map((tech, techIndex) => (
                    <span key={techIndex} className="tech-tag">
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              <div className="project-border"></div>
            </article>
          ))}
        </div>

        <div className="projects-cta">
          <h3>Interested in working together?</h3>
          <p>Let&apos;s create something amazing together</p>
           <a href="#contact" className="cta-button">
             Get In Touch
             <FaArrowRight size={20} />
           </a>
        </div>
      </div>
    </section>
  );
};

export default Projects;
