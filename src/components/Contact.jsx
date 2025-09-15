import icons from "../assets";

const Contact = () => {
  return (
    <section
      id="contact"
      className="py-20 px-4 sm:px-6 lg:px-8 bg-[#1b263b]/50"
    >
      <div className="max-w-7xl mx-auto text-center">
        <h2 className="text-4xl font-bold mb-6">Contact</h2>
        <p className="text-lg max-w-xl mx-auto mb-6">
          Feel free to reach out via email or connect with me on social
          platforms.
        </p>
        <p className="text-base mb-6">Email: your.email@example.com</p>
        <div className="flex justify-center gap-6">
          <a
            href="https://github.com"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:opacity-80 transition-opacity"
          >
            <img
              src={icons.Large.Light.Github}
              alt="GitHub"
              className="w-10 h-10"
            />
          </a>
          <a
            href="https://linkedin.com"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:opacity-80 transition-opacity"
          >
            <img
              src={icons.Large.Light.Linkedin}
              alt="LinkedIn"
              className="w-10 h-10"
            />
          </a>
          <a
            href="https://x.com"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:opacity-80 transition-opacity"
          >
            <img
              src={icons.Large.Light.TwitterX}
              alt="X"
              className="w-10 h-10"
            />
          </a>
        </div>
      </div>
    </section>
  );
};

export default Contact;
