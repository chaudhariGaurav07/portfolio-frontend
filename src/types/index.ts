// Project interface
export interface Project {
  _id: string; 
  title: string;
  description: string;
  image: string;
  techStack: string[];
  githubUrl: string;
  liveUrl: string;
  featured?: boolean;
  createdAt?: string;
  updatedAt?: string;
}


// BlogPost interface
export interface BlogPost {
  _id: string; // changed from id
  title: string;
  content: string;
  excerpt: string;
  tags: string[];
  publishedAt: string; // ISO string (e.g., "2025-08-05T12:00:00Z")
  readTime: number;
  author: string;
  coverImage?: string; 
  createdAt?: string;
  updatedAt?: string;
}


export interface ContactForm {
  name: string;
  email: string;
  message: string;
}

export interface AIMessage {
  _id: string;
  content: string;
  role: 'user' | 'assistant';
  timestamp: string; // Use ISO string instead of Date object for API
}

export interface Experience {
  id: string;
  company: string;
  position: string;
  duration: string;
  description: string;
  technologies: string[];
  location: string;
}

export interface TechStack {
  _id?: string; // optional if you fetch it from backend
  name: string;
  icon: string;
  category: 'frontend' | 'backend' | 'database' | 'tools' | 'cloud';
  proficiency: number; // between 1 to 100
}