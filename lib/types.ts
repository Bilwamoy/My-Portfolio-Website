
export interface Project {
  title: string;
  description: string;
  tags: string[];
  image: string;
  liveDemoUrl?: string;
  githubUrl?: string;
}

export interface Skill {
  name: string;
  icon?: React.FC<React.SVGProps<SVGSVGElement>>;
}

export interface SkillCategory {
  title: string;
  skills: Skill[];
}
