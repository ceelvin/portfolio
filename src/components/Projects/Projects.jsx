import React, { useState } from "react";
import "./Projects.css";
import { projects } from "../../data/projects";
import FilterButtons from "../common/FilterButtons";
import CardGrid from "../common/CardGrid";
import { ANIMATION_DELAYS } from "../../constants";
import { FaLayerGroup, FaChartBar } from "react-icons/fa";

const Projects = () => {
  const [filter, setFilter] = useState("all");

  const filteredProjects = React.useMemo(() => {
    if (!Array.isArray(projects) || projects.length === 0) {
      return [];
    }
    return filter === "all"
      ? projects
      : projects.filter((project) => project.category === filter);
  }, [filter]);

  const categories = [
    { id: "all", label: "All Projects", icon: <FaLayerGroup /> },
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

        <FilterButtons
          categories={categories}
          activeFilter={filter}
          onFilterChange={setFilter}
        />

        {filteredProjects.length > 0 ? (
          <CardGrid
            items={filteredProjects}
            className="projects-grid"
            itemClassName="project-card"
            animationDelay={ANIMATION_DELAYS.FAST}
            renderItem={(project) => (
              <article className={project.featured ? "featured" : ""}>
                <div className="project-content">
                  <h3 className="project-title">
                    {project.title || "Untitled Project"}
                  </h3>
                  <p className="project-description">
                    {project.description || "No description available"}
                  </p>

                  <div className="project-tech">
                    {Array.isArray(project.technologies) &&
                      project.technologies.map((tech, techIndex) => (
                        <span key={techIndex} className="tech-tag">
                          {tech}
                        </span>
                      ))}
                  </div>
                </div>

                <div className="project-border"></div>
              </article>
            )}
          />
        ) : (
          <div className="no-projects">
            <p>No projects found for the selected category.</p>
          </div>
        )}
      </div>
    </section>
  );
};

export default Projects;
