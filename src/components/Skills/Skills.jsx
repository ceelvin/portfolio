import "./Skills.css";

const Skills = () => {
  const skills = [
    "Angular",
    "React",
    "JavaScript",
    "TypeScript",
    "Node.js",
    "Docker",
    "Python",
    "Tailwind CSS",
    "HTML/CSS",
    "Git",
  ];

  return (
    <section id="skills" className="skills-section">
      <div className="skills-container">
        <h2 className="skills-title">Skills</h2>
        <div className="skills-box">
          <ul className="skills-list">
            {skills.map((skill, index) => (
              <li key={index} className="skill-item">
                {skill}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
};

export default Skills;
