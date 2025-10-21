export const skills = [
  // Frontend Skills
  {
    name: "React",
    level: 78,
    icon: "react",
    category: "frontend",
  },
  {
    name: "Angular",
    level: 92,
    icon: "angular",
    category: "frontend",
  },
  {
    name: "TypeScript",
    level: 93,
    icon: "typescript",
    category: "frontend",
  },
  {
    name: "JavaScript",
    level: 85,
    icon: "javascript",
    category: "frontend",
  },
  {
    name: "HTML/CSS",
    level: 95,
    icon: "html5",
    category: "frontend",
  },
  {
    name: "Tailwind CSS",
    level: 67,
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
    level: 90,
    icon: "git",
    category: "tools",
  },
  {
    name: "GitHub",
    level: 87,
    icon: "github",
    category: "tools",
  },
  {
    name: "CI/CD",
    level: 85,
    icon: "cypress",
    category: "tools",
  },
];

// Legacy exports for backward compatibility
export const frontend = skills.filter(skill => skill.category === 'frontend');
export const backend = skills.filter(skill => skill.category === 'backend');
export const tools = skills.filter(skill => skill.category === 'tools');
