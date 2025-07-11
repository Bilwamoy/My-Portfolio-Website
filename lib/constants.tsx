

import { Project, SkillCategory } from './types';
import { GitHubIcon, LinkedInIcon } from '../components/icons/SocialIcons';

export const PERSONAL_INFO = {
  name: "Bilwamoy Chakraborty",
  title: "Creative Full-Stack Developer",
  objective: "Motivated and dedicated B.Tech Computer Science student with hands-on experience in React, Next.js, and Node.js. Passionate about full-stack web development and eager to contribute to real-world projects while continuously expanding my technical expertise.",
  email: "chakrabortybilwamoy@gmail.com",
  socials: [
    { name: 'GitHub', url: 'https://github.com/joygaara', icon: GitHubIcon },
    { name: 'LinkedIn', url: 'https://www.linkedin.com/in/bilwamoy/', icon: LinkedInIcon }
  ]
};

export const PROJECTS: Project[] = [
  {
    title: "Animated E-commerce Website",
    description: "Developed a fully functional e-commerce website with animated UI using React and Tailwind CSS. Features include product listing, cart management, and user authentication.",
    tags: ["React", "Tailwind CSS", "Express.js", "MongoDB"],
    image: "/project-placeholder.png",
    liveDemoUrl: "#",
    githubUrl: "#",
  },

  {
    title: "Coffee Shop Web Application",
    description: "Created a fully functional online coffee shop (except real payment integration). Features include product listing, cart, checkout, and user login system.",
    tags: ["React", "Node.js", "MongoDB"],
    image: "/project-placeholder.png",
    liveDemoUrl: "#",
    githubUrl: "#",
  },
  {
    title: "URL Shortener",
    description: "A React-based web app to shorten URLs using backend APIs. Includes features like redirection, copy to clipboard, and user history.",
    tags: ["React", "Backend API"],
    image: "/project-placeholder.png",
    liveDemoUrl: "#",
    githubUrl: "#",
  },
  {
    title: "Gemini Clone",
    description: "Designed a Gemini-inspired AI chatbot UI using React with clean UX and dummy AI flow, focusing on a modern and responsive user interface.",
    tags: ["React", "UI/UX Design"],
    image: "/project-placeholder.png",
    liveDemoUrl: "#",
    githubUrl: "#",
  },
  {
    title: "Travel Blog Website",
    description: "A personal travel blog website built with Next.js and Tailwind CSS, featuring dynamic content, responsive design, and a clean user interface.",
    tags: ["expressjs", "tailwindcss", "react"],
    image: "/project-placeholder.png",
    liveDemoUrl: "#",
    githubUrl: "#",
  },
];

export const SKILLS: SkillCategory[] = [
  {
    title: "Frontend",
    skills: ["React.js", "Next.js", "Tailwind CSS", "HTML5", "CSS3", "JavaScript (ES6+)", "TypeScript"]
  },
  {
    title: "Backend",
    skills: ["Node.js", "Express.js"]
  },
  {
    title: "Database",
    skills: ["MongoDB", "MongoDB Atlas", "Mongoose"]
  },
  {
    title: "Tools & Others",
    skills: ["Git", "GitHub", "Postman", "Figma", "Astro (Learning)", "Svelte (Learning)"]
  }
];

export const EDUCATION = [
  {
    degree: "B.Tech in Computer Science Engineering",
    institution: "Brainware University, Barasat",
    period: "2022 - 2026"
  },
  {
    degree: "Higher Secondary (12th)",
    institution: "Ichapur Northland Boys High School",
    period: "2021-2023"
  }
];

export const SOFT_SKILLS = [
  "Fast learner and team player",
  "Effective communicator",
  "Strong analytical thinking",
  "Attention to detail",
  "Passionate about new technologies"
];


