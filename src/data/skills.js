const skillsData = [
  // Frontend Skills
  {
    name: "React",
    level: 50,
    icon: "react",
    category: "frontend",
  },
  {
    name: "Angular",
    level: 75,
    icon: "angular",
    category: "frontend",
  },
  {
    name: "TypeScript",
    level: 75,
    icon: "typescript",
    category: "frontend",
  },
  {
    name: "JavaScript",
    level: 70,
    icon: "javascript",
    category: "frontend",
  },
  {
    name: "HTML/CSS",
    level: 78,
    icon: "html5",
    category: "frontend",
  },
  {
    name: "Tailwind CSS",
    level: 47,
    icon: "tailwind",
    category: "frontend",
  },
  // Backend Skills
  {
    name: "Node.js",
    level: 48,
    icon: "nodejs",
    category: "backend",
  },
  {
    name: "Python",
    level: 34,
    icon: "python",
    category: "backend",
  },
  {
    name: "Docker",
    level: 64,
    icon: "docker",
    category: "backend",
  },
  // Tools & Technologies
  {
    name: "Git",
    level: 70,
    icon: "git",
    category: "tools",
  },
  {
    name: "GitHub",
    level: 73,
    icon: "github",
    category: "tools",
  },
  {
    name: "CI/CD",
    level: 57,
    icon: "cypress",
    category: "tools",
  },
];

export const skills = skillsData.sort((a, b) => b.level - a.level);

// Legacy exports for backward compatibility
export const frontend = skills.filter(skill => skill.category === 'frontend');
export const backend = skills.filter(skill => skill.category === 'backend');
export const tools = skills.filter(skill => skill.category === 'tools');
