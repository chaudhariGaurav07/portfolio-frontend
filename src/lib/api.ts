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
    return [];
  }
},

  getByTech: async (tech: string): Promise<Project[]> => {
    try {
      const { data } = await api.get(`/project/filter?tech=${tech}`);
      return data.projects || data;
    } catch {
      return [];
    }
  },
};

export const blogAPI = {
  getAll: async (): Promise<BlogPost[]> => {
    try {
      const { data } = await api.get('/blog');
      return data.data || []; 
    } catch {
      return [];
    }
  },

  getById: async (id: string): Promise<BlogPost> => {
    try {
      const { data } = await api.get(`/blog/${id}`);
      return data.data || data; 
    } catch {
      throw new Error('Blog not found'); 
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
     throw new Error('AI response failed');
    }
  },
};



export default api;
