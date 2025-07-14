
export interface Project {
  title: string;
  description: string;
  tags: string[];
  image: string;
  liveDemoUrl?: string;
  githubUrl?: string;
}

import { ComponentType } from 'react';

export interface Skill {
  name: string;
  icon?: ComponentType<any>;
}


export interface SkillCategory {
  title: string;
  skills: Skill[];
}
