import { useState, useEffect } from "react";
import "./Skills.css";
import { backend, frontend, tools } from "../../data/skills";
import { FaTools, FaDesktop, FaServer, FaWrench, FaReact, FaAngular, FaJs, FaHtml5, FaNodeJs, FaPython, FaGitAlt, FaGithub } from "react-icons/fa";
import { SiTypescript, SiTailwindcss, SiDocker, SiCypress } from "react-icons/si";

const iconMap = {
  react: <FaReact />,
  angular: <FaAngular />,
  typescript: <SiTypescript />,
  javascript: <FaJs />,
  html5: <FaHtml5 />,
  tailwind: <SiTailwindcss />,
  nodejs: <FaNodeJs />,
  python: <FaPython />,
  docker: <SiDocker />,
  git: <FaGitAlt />,
  github: <FaGithub />,
  cypress: <SiCypress />,
};

const Skills = () => {
  const [activeCategory, setActiveCategory] = useState("all");
  const [visibleSkills, setVisibleSkills] = useState([]);

  useEffect(() => {
    const handleScroll = () => {
      const skillCards = document.querySelectorAll(".skill-card");
      const newVisibleSkills = [];

      skillCards.forEach((card, index) => {
        const rect = card.getBoundingClientRect();
        if (rect.top < window.innerHeight * 0.8) {
          newVisibleSkills.push(index);
        }
      });

      setVisibleSkills(newVisibleSkills);
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);


  const skillCategories = {
    frontend: {
      title: "Frontend Development",
      color: "#00d4ff",
      icon: "",
      skills: frontend,
    },
    backend: {
      title: "Backend Development",
      color: "#9b59b6",
      icon: "",
      skills: backend,
    },
    tools: {
      title: "Tools & Technologies",
      color: "#e74c3c",
      icon: "",
      skills: tools,
    },
  };

  const allSkills = Object.values(skillCategories).flatMap((cat) =>
    cat.skills.map((skill) => ({ ...skill, category: cat })),
  );

  const filteredSkills =
    activeCategory === "all"
      ? allSkills
      : skillCategories[activeCategory]?.skills.map((skill) => ({
          ...skill,
          category: skillCategories[activeCategory],
        })) || [];

  const categories = [
    { id: "all", label: "All Skills", icon: <FaTools /> },
    { id: "frontend", label: "Frontend", icon: <FaDesktop /> },
    { id: "backend", label: "Backend", icon: <FaServer /> },
    { id: "tools", label: "Tools", icon: <FaWrench /> },
  ];

  return (
    <section id="skills" className="skills-section">
      <div className="skills-container">
        <div className="skills-header">
          <h2 className="skills-title">
            <span className="title-accent">My</span> Skills
          </h2>
          <p className="skills-subtitle">
            Technologies and tools I work with to bring ideas to life
          </p>
        </div>


        <div className="skills-filter">
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => setActiveCategory(category.id)}
              className={`filter-btn ${activeCategory === category.id ? "active" : ""}`}
            >
              <span className="filter-icon">{category.icon}</span>
              {category.label}
            </button>
          ))}
        </div>

        <div className="skills-grid">
          {filteredSkills.map((skill, index) => (
            <div
              key={`${skill.category.title}-${skill.name}`}
              className={`skill-card ${visibleSkills.includes(index) ? "visible" : ""}`}
              style={{
                "--delay": `${index * 0.1}s`,
                "--category-color": skill.category.color,
              }}
            >
              <div className="skill-header">
                <div
                  className="skill-icon"
                  style={{ backgroundColor: skill.category.color }}
                >
                  {iconMap[skill.icon]}
                </div>
                <div className="skill-info">
                  <h3 className="skill-name">{skill.name}</h3>
                  <span className="skill-category">{skill.category.title}</span>
                </div>
              </div>

              <div className="skill-progress">
                <div className="progress-bar">
                  <div
                    className="progress-fill"
                    style={{
                      width: `${skill.level}%`,
                      backgroundColor: skill.category.color,
                    }}
                  ></div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="skills-overview">
          <div className="overview-card">
            <h3>Continuous Learning</h3>
            <p>
              Always exploring new technologies and staying up-to-date with
              industry trends
            </p>
            <div className="overview-stats">
              <div className="stat">
                <span className="stat-number">5+</span>
                <span className="stat-label">Years Experience</span>
              </div>
              <div className="stat">
                <span className="stat-number">10+</span>
                <span className="stat-label">Technologies</span>
              </div>
              <div className="stat">
                <span className="stat-number">∞</span>
                <span className="stat-label">Learning</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Skills;
