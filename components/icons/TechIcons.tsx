import React from 'react';
import { Icon } from '@iconify/react';

export const ReactIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="-11.5 -10.23174 23 20.46348" fill="currentColor" {...props}>
    <circle cx="0" cy="0" r="2.05" fill="#61DAFB"/>
    <g stroke="#61DAFB" strokeWidth="1" fill="none">
      <ellipse rx="11" ry="4.2"/>
      <ellipse rx="11" ry="4.2" transform="rotate(60)"/>
      <ellipse rx="11" ry="4.2" transform="rotate(120)"/>
    </g>
  </svg>
);

export const NextJsIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" {...props}>
    <path d="M12 2a10 10 0 1010 10A10 10 0 0012 2zm0 18a8 8 0 118-8 8 8 0 01-8 8z"/>
    <path d="M8.25 14.75L12 10.25l3.75 4.5H8.25z"/>
  </svg>
);

export const NodeJsIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" {...props}>
    <path d="M12 2a10 10 0 1010 10A10 10 0 0012 2zm4.75 14.75H7.25v-9.5h9.5z"/>
  </svg>
);

export const VercelIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="#000000" {...props}>
    <path d="M24 22.525H0L12 2.475z"/>
  </svg>
);

export const GitHubIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" aria-hidden="true" {...props}>
    <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0 0 16 8c0-4.42-3.58-8-8-8z"/>
  </svg>
);

export const DefaultTechIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" {...props}>
    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1.5 15h-1.5v-6h1.5v6zm3-1.5h-1.5v-4.5h1.5v4.5z"/>
  </svg>
);

// Iconify Icons
export const TypescriptIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => <Icon icon="mdi:language-typescript" {...props} />;
export const TailwindCssIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => <Icon icon="mdi:tailwind" {...props} />;
export const ExpressJsIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => <Icon icon="simple-icons:express" {...props} />;
export const MongooseIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => <Icon icon="simple-icons:mongoose" {...props} />;
export const FigmaIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => <Icon icon="mdi:figma" {...props} />;
export const AstroIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => <Icon icon="simple-icons:astro" {...props} />;
export const SvelteIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => <Icon icon="simple-icons:svelte" {...props} />;
export const MongoDBIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => <Icon icon="mdi:database" {...props} />;
export const MysqlIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => <Icon icon="mdi:database" {...props} />;
export const PostmanIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => <Icon icon="simple-icons:postman" {...props} />;
export const GitIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => <Icon icon="mdi:git" {...props} />;
export const HtmlIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => <Icon icon="mdi:language-html5" {...props} />;
export const CssIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => <Icon icon="mdi:language-css3" {...props} />;
export const JavascriptIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => <Icon icon="mdi:language-javascript" {...props} />;