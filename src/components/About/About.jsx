import React from "react";
import "./About.css";
import useIntersectionObserver from "../../hooks/useIntersectionObserver";
import { journey } from "../../data/about";
import { ANIMATION_DELAYS } from "../../constants";
import avatarImage from "../../assets/images/avatar.jpeg";
import camelotIcon from "../../assets/images/camelot-itlab-logo.jpg";
import accentureIcon from "../../assets/images/accenture-logo.png";

const iconMap = {
  camelot: camelotIcon,
  accenture: accentureIcon 
};

const About = () => {
  const cardRefs = React.useMemo(() =>
    Array.from({ length: journey.length }, () => React.createRef()), []
  );

  useIntersectionObserver(cardRefs, {}, 'visible');

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
            </div>
          </div>
           <div className="hero-avatar">
             <div className="avatar-glow"></div>
             <div className="avatar-circle">
                <img
                  src={avatarImage}
                  alt="Avatar"
                  className="avatar-image"
                />
             </div>
           </div>
        </div>


        <div className="mission-section">
          <div className="mission-card">
             <p className="mission-text">I'm a full-stack developer who loves building apps and websites that make life easier for people. What drives me? Figuring out tough problems by creating simple, user-friendly designs. I get excited about working with teams to try new things and build stuff that really helps and connects with folks.
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
                style={{ "--delay": `${index * ANIMATION_DELAYS.MEDIUM}s` }}
              >
                 <img
                   src={iconMap[item.icon]}
                   alt={item.icon}
                   className={`timeline-icon ${
                     item.icon=== "camelot" ? "rounded-full" : ""
                   } ${item.icon === "accenture" ? "rounded-none p-2" : ""}`}
                   style={{ backgroundColor: item.color }}
                 />

                <div className="timeline-content">
                  <div className="timeline-year">{(item.year)}</div>
                  <h3 className="timeline-title">{(item.title)}</h3>
                  <p className="timeline-description">
                    {(item.description)}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
