import { FaGithub, FaLinkedin } from "react-icons/fa";

const Contact = () => {
  return (
    <div className="max-w-7xl mx-auto text-center">
      <h2 className="text-4xl font-bold mb-6">Contact</h2>
      <p className="text-lg max-w-xl mx-auto mb-6">
        Feel free to reach out via email or connect with me on social platforms.
      </p>
      <p className="text-base mb-6">Email: Celvin.Kuhn@gmail.com</p>
      <div className="flex justify-center gap-6" role="list" aria-label="Social media links">
        <a
          href="https://github.com/ceelvin"
          target="_blank"
          rel="noopener noreferrer"
          className="hover:opacity-80 transition-opacity"
          aria-label="Visit my GitHub profile"
        >
          <FaGithub className="w-10 h-10" />
        </a>
        <a
          href="https://linkedin.com/in/celvin-kuhn/"
          target="_blank"
          rel="noopener noreferrer"
          className="hover:opacity-80 transition-opacity"
          aria-label="Visit my LinkedIn profile"
        >
          <FaLinkedin className="w-10 h-10" />
        </a>
      </div>
    </div>
  );
};

export default Contact;
