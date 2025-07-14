import type { ComponentType } from 'react';
import { Project, SkillCategory } from './types';
import { GitHubIcon, LinkedInIcon } from '../components/icons/SocialIcons';
import {
  ReactIcon,
  NextJsIcon,
  TailwindCssIcon,
  HtmlIcon,
  CssIcon,
  JavascriptIcon,
  TypescriptIcon,
  NodeJsIcon,
  ExpressJsIcon,
  MongoDBIcon,
  GitIcon,
  PostmanIcon,
  FigmaIcon,
  MysqlIcon,
  VercelIcon,
  MongooseIcon,
  AstroIcon,
  SvelteIcon,
} from '../components/icons/TechIcons';

export const PERSONAL_INFO = {
  name: "Bilwamoy Chakraborty",
  title: "Creative Full-Stack Developer",
  objective:
    "Motivated and dedicated B.Tech Computer Science student with hands-on experience in React, Next.js, and Node.js. Passionate about full-stack web development and eager to contribute to real-world projects while continuously expanding my technical expertise.",
  email: "chakrabortybilwamoy@gmail.com",
  socials: [
    { name: 'GitHub', url: 'https://github.com/joygaara', icon: GitHubIcon },
    { name: 'LinkedIn', url: 'https://www.linkedin.com/in/bilwamoy/', icon: LinkedInIcon },
  ],
};

export const PROJECTS: Project[] = [
  {
    title: "Animated E-commerce Website",
    description:
      "Developed a fully functional e-commerce website with animated UI using React and Tailwind CSS. Features include product listing, cart management, and user authentication.",
    tags: ["React", "Tailwind CSS", "Express.js", "MongoDB"],
    image: "/project-placeholder.png",
    liveDemoUrl: "#",
    githubUrl: "https://github.com/joygaara/Ecommerce.git",
  },
  {
    title: "Coffee Shop Web Application",
    description:
      "Created a fully functional online coffee shop (except real payment integration). Features include product listing, cart, checkout, and user login system.",
    tags: ["React", "Node.js", "MongoDB"],
    image: "/project-placeholder.png",
    liveDemoUrl: "#",
    githubUrl: "https://github.com/joygaara/coffe_shop.git",
  },
  {
    title: "URL Shortener",
    description:
      "A React-based web app to shorten URLs using backend APIs. Includes features like redirection, copy to clipboard, and user history.",
    tags: ["React", "Backend API"],
    image: "/project-placeholder.png",
    liveDemoUrl: "#",
    githubUrl: "https://github.com/joygaara/URL_shortener.git",
  },
  {
    title: "Gemini Clone",
    description:
      "Designed a Gemini-inspired AI chatbot UI using React with clean UX and dummy AI flow, focusing on a modern and responsive user interface.",
    tags: ["React", "UI/UX Design"],
    image: "/project-placeholder.png",
    liveDemoUrl: "#",
    githubUrl: "https://github.com/joygaara/Gemini_clone.git",
  },
  {
    title: "Travel Blog Website",
    description:
      "A personal travel blog website built with Next.js and Tailwind CSS, featuring dynamic content, responsive design, and a clean user interface.",
    tags: ["expressjs", "tailwindcss", "react"],
    image: "/project-placeholder.png",
    liveDemoUrl: "#",
    githubUrl: "https://github.com/joygaara/blog.git",
  },
];

// Fix type compatibility for both SVG and Iconify icons
type IconType = ComponentType<any>;

export const SKILLS: SkillCategory[] = [
  {
    title: "Frontend",
    skills: [
      { name: "React.js", icon: ReactIcon as IconType },
      { name: "Next.js", icon: NextJsIcon as IconType },
      { name: "Tailwind CSS", icon: TailwindCssIcon as IconType },
      { name: "HTML5", icon: HtmlIcon as IconType },
      { name: "CSS3", icon: CssIcon as IconType },
      { name: "JavaScript (ES6+)", icon: JavascriptIcon as IconType },
      { name: "TypeScript", icon: TypescriptIcon as IconType },
    ],
  },
  {
    title: "Backend",
    skills: [
      { name: "Node.js", icon: NodeJsIcon as IconType },
      { name: "Express.js", icon: ExpressJsIcon as IconType },
      { name: "Next.js", icon: NextJsIcon as IconType },
    ],
  },
  {
    title: "Database",
    skills: [
      { name: "MongoDB", icon: MongoDBIcon as IconType },
      { name: "MongoDB Atlas", icon: MongoDBIcon as IconType },
      { name: "Mongoose", icon: MongooseIcon as IconType },
      { name: "MySQL", icon: MysqlIcon as IconType },
    ],
  },
  {
    title: "Tools & Others",
    skills: [
      { name: "Git", icon: GitIcon as IconType },
      { name: "GitHub", icon: GitHubIcon as IconType },
      { name: "Postman", icon: PostmanIcon as IconType },
      { name: "Figma", icon: FigmaIcon as IconType },
      { name: "Vercel", icon: VercelIcon as IconType },
      { name: "Astro (Learning)", icon: AstroIcon as IconType },
      { name: "Svelte (Learning)", icon: SvelteIcon as IconType },
    ],
  },
];

export const EDUCATION = [
  {
    degree: "B.Tech in Computer Science Engineering",
    institution: "Brainware University, Barasat",
    period: "2022 - 2026",
  },
  {
    degree: "Higher Secondary (12th)",
    institution: "Ichapur Northland Boys High School",
    period: "2021-2023",
  },
];

export const SOFT_SKILLS = [
  "Fast learner and team player",
  "Effective communicator",
  "Strong analytical thinking",
  "Attention to detail",
  "Passionate about new technologies",
];
