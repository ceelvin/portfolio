import React, { useState, useEffect } from "react";
import "./Skills.css";
import { skills } from "../../data/skills";
import FilterButtons from "../common/FilterButtons";
import { CATEGORY_COLORS, ANIMATION_DELAYS } from "../../constants";
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
    let ticking = false;

    const handleScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          const skillCards = document.querySelectorAll(".skill-card");
          const newVisibleSkills = [];

          skillCards.forEach((card, index) => {
            const rect = card.getBoundingClientRect();
            if (rect.top < window.innerHeight * 0.8) {
              newVisibleSkills.push(index);
            }
          });

          setVisibleSkills(newVisibleSkills);
          ticking = false;
        });
        ticking = true;
      }
    };

    // Throttle scroll events
    const throttledHandleScroll = () => {
      if (!ticking) {
        requestAnimationFrame(handleScroll);
      }
    };

    window.addEventListener("scroll", throttledHandleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener("scroll", throttledHandleScroll);
  }, []);


  const skillCategories = React.useMemo(() => ({
    frontend: {
      title: "Frontend Development",
      color: CATEGORY_COLORS.FRONTEND,
      icon: "",
      skills: skills.filter(skill => skill.category === 'frontend'),
    },
    backend: {
      title: "Backend Development",
      color: CATEGORY_COLORS.BACKEND,
      icon: "",
      skills: skills.filter(skill => skill.category === 'backend'),
    },
    tools: {
      title: "Tools & Technologies",
      color: CATEGORY_COLORS.TOOLS,
      icon: "",
      skills: skills.filter(skill => skill.category === 'tools'),
    },
  }), []);

  const allSkills = React.useMemo(() => {
    try {
      return Object.values(skillCategories).flatMap((cat) =>
        Array.isArray(cat.skills) ? cat.skills.map((skill) => ({ ...skill, category: cat })) : []
      );
    } catch (error) {
      console.error('Error processing skills data:', error);
      return [];
    }
  }, [skillCategories]);

  const filteredSkills = React.useMemo(() => {
    try {
      if (activeCategory === "all") {
        return allSkills;
      }
      const categoryData = skillCategories[activeCategory];
      return Array.isArray(categoryData?.skills)
        ? categoryData.skills.map((skill) => ({ ...skill, category: categoryData }))
        : [];
    } catch (error) {
      console.error('Error filtering skills:', error);
      return [];
    }
  }, [activeCategory, allSkills, skillCategories]);

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


        <FilterButtons
          categories={categories}
          activeFilter={activeCategory}
          onFilterChange={setActiveCategory}
          className="skills-filter"
        />

        <div className="skills-grid">
          {filteredSkills.length > 0 ? filteredSkills.map((skill, index) => (
            <div
              key={`${skill.category?.title || 'unknown'}-${skill.name || `skill-${index}`}`}
              className={`skill-card ${visibleSkills.includes(index) ? "visible" : ""}`}
              style={{
                "--delay": `${index * ANIMATION_DELAYS.FAST}s`,
                "--category-color": skill.category?.color || CATEGORY_COLORS.DEFAULT,
              }}
            >
              <div className="skill-header">
                <div
                  className="skill-icon"
                  style={{ backgroundColor: skill.category?.color || CATEGORY_COLORS.DEFAULT }}
                >
                  {iconMap[skill.icon] || <span>?</span>}
                </div>
                <div className="skill-info">
                  <h3 className="skill-name">{skill.name || 'Unknown Skill'}</h3>
                  <span className="skill-category">{skill.category?.title || 'General'}</span>
                </div>
              </div>

              <div className="skill-progress">
                <div className="progress-bar">
                  <div
                    className="progress-fill"
                    style={{
                      width: `${Math.max(0, Math.min(100, skill.level || 0))}%`,
                      backgroundColor: skill.category?.color || CATEGORY_COLORS.DEFAULT,
                    }}
                  ></div>
                </div>
              </div>
            </div>
          )) : (
            <div className="no-skills">
              <p>No skills found for the selected category.</p>
            </div>
          )}
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
