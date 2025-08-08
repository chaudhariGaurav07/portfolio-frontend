// Project interface
export interface Project {
  _id: string; 
  title: string;
  description: string;
  imageUrl: string;       // changed from image
  techStack: string[];
  githubLink: string;     // changed from githubUrl
  liveDemo: string;       // changed from liveUrl
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
  image?: string; 
  createdAt?: string;
  updatedAt?: string;
  externalLink:string;
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
  timestamp: string; 
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

export interface AIResponse {
  statusCode: number;
  data: {
    answer: string;
  };
  message: string;
  success: boolean;
}