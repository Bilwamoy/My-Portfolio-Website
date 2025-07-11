
export interface Project {
  title: string;
  description: string;
  tags: string[];
  image: string;
  liveDemoUrl?: string;
  githubUrl?: string;
}

export interface SkillCategory {
  title: string;
  skills: string[];
}
