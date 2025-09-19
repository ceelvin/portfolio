import "./Projects.css";

const Projects = () => {
  const projects = [
    {
      title: "Project One",
      description:
        "A web application built with React and Node.js, showcasing modern UI/UX principles.",
      link: "https://example.com/project-one",
    },
    {
      title: "Project Two",
      description:
        "A mobile-friendly e-commerce platform with secure payment integration.",
      link: "https://example.com/project-two",
    },
    {
      title: "Project Three",
      description:
        "An interactive data visualization tool using D3.js and Python.",
      link: "https://example.com/project-three",
    },
  ];

  return (
    <section id="projects" className="projects-section">
      <div className="projects-container">
        <h2 className="projects-title">Projects</h2>
        <div className="projects-grid">
          {projects.map((project, index) => (
            <article key={index} className="project-card">
              <h3 className="project-title">{project.title}</h3>
              <p className="project-description">{project.description}</p>
              <a
                href={project.link}
                target="_blank"
                rel="noopener noreferrer"
                className="project-link"
              >
                View Project →
              </a>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;
