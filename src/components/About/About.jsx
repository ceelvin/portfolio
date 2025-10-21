import { useRef } from "react";
import "./About.css";
import useMultipleIntersectionObserver from "../../hooks/useMultipleIntersectionObserver";
import { journey } from "../../data/about";
import { FaBolt, FaUsers, FaBriefcase, FaTrophy, FaGraduationCap, FaRocket, FaCode } from "react-icons/fa";

const iconMap = {
  bolt: <FaBolt />,
  users: <FaUsers />,
  briefcase: <FaBriefcase />,
  trophy: <FaTrophy />,
  graduation: <FaGraduationCap />,
  rocket: <FaRocket />,
};

const About = () => {
  const cardRefs = [useRef(), useRef(), useRef(), useRef(), useRef(), useRef()];

  useMultipleIntersectionObserver(cardRefs);



  return (
    <section id="about" className="about-section">
      <div className="about-container">

        <div className="about-hero">
          <div className="hero-content">
            <h1 className="about-title">
              <span className="title-accent">About</span> Me
            </h1>
            <div className="hero-stats">
              <div className="stat-item">
                <span className="stat-number">5+</span>
                <span className="stat-label">Years Coding</span>
              </div>
              <div className="stat-item">
                <span className="stat-number">3+</span>
                <span className="stat-label">Projects</span>
              </div>
              <div className="stat-item">
                <span className="stat-number">∞</span>
                <span className="stat-label">Learning</span>
              </div>
            </div>
          </div>
          <div className="hero-avatar">
            <div className="avatar-glow"></div>
            <div className="avatar-circle">
              <FaCode className="avatar-emoji" />
            </div>
          </div>
        </div>


        <div className="mission-section">
          <div className="mission-card">
            <h2 className="mission-title">My Mission</h2>
             <p className="mission-text">
               What drives me? The thrill of solving complex puzzles through clean,
               responsive interfaces or optimizing backend systems. I&apos;m passionate
               about collaboration and pushing tech boundaries to create meaningful digital experiences.
             </p>
            <div className="mission-highlights">
              <span className="highlight-tag">Problem Solver</span>
              <span className="highlight-tag">Team Player</span>
              <span className="highlight-tag">Innovation Driver</span>
            </div>
          </div>
        </div>


        <div className="journey-section">
          <h2 className="journey-title">My Journey</h2>
          <div className="timeline">
            {journey.map((item, index) => (
              <div
                key={index}
                ref={cardRefs[index]}
                className="timeline-card"
                style={{ '--delay': `${index * 0.2}s` }}
              >
                 <div className="timeline-icon" style={{ backgroundColor: item.color }}>
                   {iconMap[item.icon]}
                 </div>
                <div className="timeline-content">
                  <div className="timeline-year">{item.year}</div>
                  <h3 className="timeline-title">{item.title}</h3>
                  <p className="timeline-description">{item.description}</p>
                </div>
                <div className="timeline-connector"></div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
