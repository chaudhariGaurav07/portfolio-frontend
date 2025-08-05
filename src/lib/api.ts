import axios from 'axios';
import { Project, BlogPost, ContactForm, AIMessage } from '@/types';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'https://portfolio-w34d.onrender.com/api/v1/',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('authToken');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

api.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error('API Error:', error.response?.data || error.message);
    return Promise.reject(error);
  }
);

export const projectsAPI = {
getAll: async (): Promise<Project[]> => {
  try {
    const { data } = await api.get('/project');
    return data.data?.projects || [];
  } catch {
    return mockProjects;
  }
},

  getByTech: async (tech: string): Promise<Project[]> => {
    try {
      const { data } = await api.get(`/project/filter?tech=${tech}`);
      return data.projects || data;
    } catch {
      return mockProjects.filter((p) =>
        p.techStack.some((t) => t.toLowerCase().includes(tech.toLowerCase()))
      );
    }
  },
};

export const blogAPI = {
  getAll: async (): Promise<BlogPost[]> => {
    try {
      const { data } = await api.get('/blog');
      return data.data || []; // ✅ FIX: properly access the `data` array
    } catch {
      return mockBlogs;
    }
  },

  getById: async (id: string): Promise<BlogPost> => {
    try {
      const { data } = await api.get(`/blog/${id}`);
      return data.data || data; // 
    } catch {
      const blog = mockBlogs.find((b) => b._id === id);
      if (!blog) throw new Error('Blog not found');
      return blog;
    }
  },
};


export const contactAPI = {
  send: async (formData: ContactForm): Promise<{ success: boolean; message: string }> => {
    try {
      const { data } = await api.post('/contact', formData);
      return data;
    } catch {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      return { success: true, message: 'Message sent successfully!' };
    }
  },
};

export const aiAPI = {
  ask: async (question: string): Promise<string> => {
    try {
      const { data } = await api.post('/ai/ask', { question });
      return data.answer;
    } catch {
      await new Promise((resolve) => setTimeout(resolve, 2000));
      return getMockAIResponse(question);
    }
  },
};

const mockProjects: Project[] = [
  {
    _id: '1',
    title: 'E-Commerce Platform',
    description: 'A full-stack e-commerce platform with React, Node.js, and MongoDB. Features include user authentication, payment integration, and admin dashboard.',
    image: '/api/placeholder/400/250',
    techStack: ['React', 'Node.js', 'MongoDB', 'TypeScript', 'Stripe'],
    githubUrl: 'https://github.com/gaurav/ecommerce',
    liveUrl: 'https://ecommerce-demo.com',
    featured: true,
  },
  {
    _id: '2',
    title: 'Task Management App',
    description: 'A collaborative task management application with real-time updates, drag-and-drop functionality, and team collaboration features.',
    image: '/api/placeholder/400/250',
    techStack: ['React', 'Firebase', 'Tailwind CSS', 'Framer Motion'],
    githubUrl: 'https://github.com/gaurav/taskapp',
    liveUrl: 'https://taskapp-demo.com',
    featured: true,
  },
  {
    _id: '3',
    title: 'Weather Dashboard',
    description: 'A responsive weather dashboard with location-based forecasts, interactive maps, and weather alerts.',
    image: '/api/placeholder/400/250',
    techStack: ['Next.js', 'OpenWeather API', 'Chart.js', 'Vercel'],
    githubUrl: 'https://github.com/gaurav/weather',
    liveUrl: 'https://weather-demo.com',
    featured: false,
  },
];

const mockBlogs: BlogPost[] = [
  {
    _id: '1',
    title: 'Building Scalable React Applications',
    content: `
      <h2>Introduction</h2>
      <p>Building scalable React applications requires careful planning and architecture decisions...</p>
      <h2>Key Principles</h2>
      <p>1. Component composition over inheritance</p>
      <p>2. State management with proper tools</p>
      <p>3. Performance optimization strategies</p>
      <h2>Conclusion</h2>
      <p>By following these principles, you can build maintainable and scalable React applications.</p>
    `,
    excerpt: 'Learn the key principles for building scalable React applications that can grow with your business needs.',
    tags: ['React', 'JavaScript', 'Architecture', 'Performance'],
    publishedAt: '2024-01-15',
    readTime: 8,
    author: 'Gaurav Chaudhari',
  },
  {
    _id: '2',
    title: 'Modern CSS Techniques for 2024',
    content: `
      <h2>CSS Grid and Flexbox</h2>
      <p>Modern layout techniques that make responsive design easier...</p>
      <h2>CSS Custom Properties</h2>
      <p>How to use CSS variables effectively...</p>
      <h2>Container Queries</h2>
      <p>The future of responsive design...</p>
    `,
    excerpt: 'Explore the latest CSS techniques and features that will make your web development more efficient.',
    tags: ['CSS', 'Web Design', 'Frontend', 'Responsive Design'],
    publishedAt: '2024-01-10',
    readTime: 5,
    author: 'Gaurav Chaudhari',
  },
];

function getMockAIResponse(question: string): string {
  const responses = [
    "That's a great question! Based on my experience in full-stack development, I'd suggest focusing on understanding the fundamentals first, then building practical projects to reinforce your learning.",
    "Interesting! In my projects, I've found that choosing the right tech stack depends on the specific requirements. React is excellent for dynamic UIs, while Node.js provides great backend flexibility.",
    "From my development experience, I recommend starting with a solid foundation in JavaScript, then gradually adding TypeScript for better type safety and developer experience.",
    "That's something I've encountered in my projects too! The key is to balance performance with maintainability. I usually start with a simple solution and optimize as needed.",
  ];

  return responses[Math.floor(Math.random() * responses.length)];
}

export default api;
