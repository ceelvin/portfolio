import "./About.css";

const About = () => {
  return (
    <section id="about" className="about-section">
      <div className="about-container">
        <div className="about-content">
          <h1 className="about-title">About Me</h1>
          <p className="about-text">
            My coding adventure began with 15 years, tinkering with code and
            discovering the magic of turning ideas into digital reality. That
            sparked my love for building, leading me to small personal projects
            that honed my creativity and problem solving chops.
          </p>
          <p className="about-text">
            With a clear vision, I dove into tech school to grasp the
            fundamentals of development, then launched into my software
            developer apprenticeship, wrapping it up in 2023 with hands-on
            skills in crafting robust applications.
          </p>
          <p className="about-text">
            From there, I hit the ground running as a Junior Developer, owning a
            data visualization and processing app that streamlined internal
            workflows. Then I worked in a big team on a web-based Supply Chain
            Management tool as a Frontend Developer, building intuitive UIs with
            Angular, TypeScript, HTML5, and CSS3—focusing on scalability,
            performance, and user delight. A year in, I evolved into full-stack
            developer, tackling responsibilities across frontend and backend.
          </p>
          <p className="about-text last">
            What drives me? The thrill of solving complex puzzles through clean,
            responsive interfaces or optimizing backend systems. I'm passionate
            about collaboration and pushing tech boundaries.
          </p>
        </div>
      </div>
    </section>
  );
};

export default About;
