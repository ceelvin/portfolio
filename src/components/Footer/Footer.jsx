import { FaGithub, FaLinkedin, FaEnvelope, FaMapMarkerAlt } from "react-icons/fa";
import { Link, useLocation } from "react-router-dom";
import "./Footer.css";

const Footer = () => {
  const location = useLocation();

  const copyEmail = () => {
    navigator.clipboard.writeText("Celvin.Kuhn@gmail.com");
  };


  const socialLinks = [
    {
      name: "GitHub",
      url: "https://github.com/ceelvin",
      icon: <FaGithub className="social-icon" />,
      color: "#333",
    },
    {
      name: "LinkedIn",
      url: "https://linkedin.com/in/celvin-kuhn/",
      icon: <FaLinkedin className="social-icon" />,
      color: "#0077b5",
    },
    {
      name: "Email",
      url: "mailto:Celvin.Kuhn@gmail.com",
      icon: <FaEnvelope className="social-icon" />,
      color: "#ea4335",
      action: copyEmail,
    },
  ];

  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-main">
          <div className="footer-brand">
            <h2 className="footer-title">
              <span className="title-accent">Celvin</span> Kuhn
            </h2>
            <p className="footer-description">
              Full-Stack Developer passionate about creating innovative
              solutions and bringing ideas to life through code.
            </p>
            <div className="footer-status">
              <div className="status-dot"></div>
              <span>Available for new opportunities</span>
            </div>
          </div>

          <div className="footer-section">
            <h3 className="section-title">Get In Touch</h3>
            <div className="contact-info">
              <div className="contact-item">
                <FaMapMarkerAlt className="contact-icon" />
                <span className="contact-text">Mannheim, Germany</span>
              </div>
              <div className="social-links">
                {socialLinks.map((social, index) => (
                <a
                  key={index}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="social-link"
                  aria-label={`Visit my ${social.name} profile`}
                  onClick={social.action}
                  style={{ "--hover-color": social.color }}
                >
                  {typeof social.icon === "string" ? (
                    <span className="social-emoji">{social.icon}</span>
                  ) : (
                    social.icon
                  )}
                  <span className="social-name">{social.name}</span>
                </a>
                ))}
              </div>
            </div>
           </div>
         </div>

         <div className="footer-bottom">
          <div className="footer-divider"></div>
          <div className="footer-meta">
            <p>&copy; 2025 Celvin Kuhn. All rights reserved.</p>
             {location.pathname !== '/impressum' && (
               <Link to="/impressum" className="footer-link">Impressum</Link>
             )}
             <p className="footer-update">Last updated: November 2025</p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
