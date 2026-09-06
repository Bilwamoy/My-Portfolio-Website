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
    title: "CollabMind — AI Collaborative Workspace",
    description:
      "Hackathon project for RAG-integrated chat with document grounding, interactive Knowledge Graph visualizations, digital whiteboard, and custom Claymorphism UI system with fluid transitions. (Role: Frontend Developer)",
    tags: ["Next.js 16", "React 19", "Tailwind CSS v4", "Framer Motion", "RAG / AI"],
    image: "/project-placeholder.png",
    liveDemoUrl: "#",
    githubUrl: "#",
  },
  {
    title: "Voicer — Zero-Shot Voice Conversion for Indic Dialects",
    description:
      "Built a zero-shot voice conversion system for low-resource spoken dialects (e.g. Bhojpuri) using a cappella folk singing reference audio. Pipeline: Demucs → HuBERT → pitch normalization → Resemblyzer speaker embeddings → FreeVC → HiFi-GAN waveform generation (MOS 3.92).",
    tags: ["Python", "PyTorch", "Audio AI", "HiFi-GAN", "Speech Processing"],
    image: "/project-placeholder.png",
    liveDemoUrl: "#",
    githubUrl: "#",
  },
  {
    title: "Brew & Bliss — E-Commerce Platform",
    description:
      "Developed a coffee shop e-commerce platform built with Next.js, Firebase, and Tailwind CSS featuring user authentication, product catalog, cart flow, and responsive UI.",
    tags: ["Next.js", "Firebase", "Tailwind CSS", "React"],
    image: "/BREW & BLISS.png",
    liveDemoUrl: "https://brewbliss-flax.vercel.app/",
    githubUrl: "https://github.com/Bilwamoy/Coffee-shop-BrewBliss.git",
  },
  {
    title: "Nexora — E-Commerce Web Application",
    description:
      "Built a scalable e-commerce application with React.js, Next.js, MongoDB, and Tailwind CSS featuring product listings, user management, and cart workflows.",
    tags: ["React.js", "Next.js", "MongoDB", "Tailwind CSS"],
    image: "/NEXORA.png",
    liveDemoUrl: "https://nexora-pi-eosin.vercel.app/",
    githubUrl: "https://github.com/Bilwamoy/E-commerce-Nexora.git",
  },
  {
    title: "Visionary Nest — AI Portfolio & Resume Generator",
    description:
      "Hackathon project for AI-generated portfolios and resumes with AI-driven explanations and customized layout generation. (Role: Frontend Developer)",
    tags: ["Next.js", "AI Concepts", "Tailwind CSS", "TypeScript"],
    image: "/project-placeholder.png",
    liveDemoUrl: "#",
    githubUrl: "#",
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
    title: "Backend & ML",
    skills: [
      { name: "Node.js", icon: NodeJsIcon as IconType },
      { name: "Express.js", icon: ExpressJsIcon as IconType },
      { name: "Next.js", icon: NextJsIcon as IconType },
      { name: "Python / Machine Learning", icon: JavascriptIcon as IconType },
      { name: "Java", icon: JavascriptIcon as IconType },
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
    title: "Tools & Core",
    skills: [
      { name: "Git", icon: GitIcon as IconType },
      { name: "GitHub", icon: GitHubIcon as IconType },
      { name: "Postman", icon: PostmanIcon as IconType },
      { name: "Figma", icon: FigmaIcon as IconType },
      { name: "Vercel", icon: VercelIcon as IconType },
      { name: "DSA & OOP", icon: GitIcon as IconType },
    ],
  },
];

export const EDUCATION = [
  {
    degree: "B.Tech in Computer Science and Engineering",
    institution: "Brainware University, Barasat",
  },
  {
    degree: "Higher Secondary (Class 12)",
    institution: "Ichapur Northland High School",
  },
  {
    degree: "Secondary (Class 10)",
    institution: "Ramakrishna Vivekananda Mission, Barrackpore",
  },
];

export const SOFT_SKILLS = [
  "Fast learner and team player",
  "Effective communicator",
  "Strong analytical thinking",
  "Attention to detail",
  "Passionate about new technologies",
];
