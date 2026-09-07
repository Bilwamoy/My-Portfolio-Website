export const siteConfig = {
  name: "Bilwamoy Chakraborty | Creative Full-Stack Developer",
  description:
    "Explore the portfolio of Bilwamoy Chakraborty, a passionate and results-driven Full-Stack Developer specializing in React, Next.js, and Node.js. Discover innovative projects, technical skills, and professional experience.",
  url: process.env.NEXT_PUBLIC_SITE_URL || (process.env.NODE_ENV === 'development' ? "http://localhost:3000" : "https://bilwamoy-portfolio.vercel.app"),
  ogImage: "/me.png",
  links: {
    twitter: "https://twitter.com/joygaara",
    github: "https://github.com/joygaara",
  },
  keywords: [
    "Bilwamoy Chakraborty",
    "Full-Stack Developer",
    "React Developer",
    "Next.js Developer",
    "Node.js Developer",
    "Portfolio",
    "Web Developer",
  ],
};
