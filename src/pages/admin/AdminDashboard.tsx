
import React, { useState } from 'react';
import ProjectManager from './ProjectManager';
import BlogManager from './BlogManager';
import AnalyticsDashboard from './AnalyticsDashboard';

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState('projects');

  return (
    <div className="p-8 space-y-6">
      <h1 className="text-3xl font-bold mb-6">Admin Dashboard</h1>

      <div className="flex gap-4">
        <button onClick={() => setActiveTab('projects')} className={activeTab === 'projects' ? 'font-bold' : ''}>Projects</button>
        <button onClick={() => setActiveTab('blogs')} className={activeTab === 'blogs' ? 'font-bold' : ''}>Blogs</button>
        <button onClick={() => setActiveTab('analytics')} className={activeTab === 'analytics' ? 'font-bold' : ''}>Analytics</button>
      </div>

      {activeTab === 'projects' && <ProjectManager />}
      {activeTab === 'blogs' && <BlogManager />}
      {activeTab === 'analytics' && <AnalyticsDashboard />}
    </div>
  );
}
