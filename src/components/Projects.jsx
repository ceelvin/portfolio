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
    <section
      id="projects"
      className="py-20 px-4 sm:px-6 lg:px-8 bg-[#1b263b]/50"
    >
      <div className="max-w-7xl mx-auto">
        <h2 className="text-4xl font-bold text-center mb-8">Projects</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project, index) => (
            <div
              key={index}
              className="bg-[#0d1b2a]/80 p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow"
            >
              <h3 className="text-xl font-semibold mb-2">{project.title}</h3>
              <p className="text-base mb-4">{project.description}</p>
              <a
                href={project.link}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-400 hover:text-blue-300 transition-colors"
              >
                View Project
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;
