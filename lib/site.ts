export const siteConfig = {
  name: "Bilwamoy Chakraborty | Creative Full-Stack Developer",
  description:
    "Explore the portfolio of Bilwamoy Chakraborty, a passionate and results-driven Full-Stack Developer specializing in React, Next.js, and Node.js. Discover innovative projects, technical skills, and professional experience.",
  url: process.env.NODE_ENV === 'development' ? "http://localhost:3000" : "https://your-domain.com", // Replace with your actual domain
  ogImage: process.env.NODE_ENV === 'development' ? "http://localhost:3000/og-image.png" : "https://your-domain.com/og-image.png", // Replace with your actual OG image URL
  links: {
    twitter: "https://twitter.com/your-twitter-handle", // Replace with your Twitter handle
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
