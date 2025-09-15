const Navbar = () => {
  return (
    <nav className="fixed top-0 left-0 w-full bg-[#0d1b2a]/80 backdrop-blur-md z-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <ul className="flex justify-center gap-8 py-4">
          <li>
            <a
              href="#about"
              className="text-lg hover:text-gray-300 transition-colors"
            >
              About
            </a>
          </li>
          <li>
            <a
              href="#projects"
              className="text-lg hover:text-gray-300 transition-colors"
            >
              Projects
            </a>
          </li>
          <li>
            <a
              href="#skills"
              className="text-lg hover:text-gray-300 transition-colors"
            >
              Skills
            </a>
          </li>
          <li>
            <a
              href="#contact"
              className="text-lg hover:text-gray-300 transition-colors"
            >
              Contact
            </a>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
