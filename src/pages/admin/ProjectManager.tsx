import React, { useEffect, useState } from "react";
import api from "@/lib/api";
import { projectsAPI } from "@/lib/api";

export default function ProjectManager() {
  const [projects, setProjects] = useState([]);
  const [form, setForm] = useState({
    title: "",
    description: "",
    techStack: "",
    githubLink: "",
    liveDemo: "",
    image: null as File | null,
  });
  const [editId, setEditId] = useState<string | null>(null);

  const fetchProjects = async () => {
  const allProjects = await projectsAPI.getAll();
  setProjects(allProjects);
};

  useEffect(() => {
    fetchProjects();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!form.title || !form.description || !form.techStack || !form.githubLink || !form.liveDemo) {
      alert("Please fill in all required fields.");
      return;
    }

    const formData = new FormData();
    Object.entries(form).forEach(([key, value]) => {
      if (value !== null) formData.append(key, value as any);
    });

    if (editId) {
      await api.put(`/project/${editId}`, formData);
    } else {
      await api.post("/project", formData);
    }

    setForm({
      title: "",
      description: "",
      techStack: "",
      githubLink: "",
      liveDemo: "",
      image: null,
    });
    setEditId(null);
    fetchProjects();
  };

  const handleDelete = async (id: string) => {
    await api.delete(`/project/${id}`);
    fetchProjects();
  };

  return (
    <div className="max-w-5xl mx-auto p-6">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">
        {editId ? "Edit Project" : "Add New Project"}
      </h2>

      {/* Form */}
      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-md rounded-lg p-6 space-y-4 border border-gray-200"
      >
        <input
          type="text"
          placeholder="Title *"
          value={form.title}
          onChange={(e) => setForm({ ...form, title: e.target.value })}
          className="w-full border text-gray-500 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
        <textarea
          placeholder="Description *"
          value={form.description}
          onChange={(e) => setForm({ ...form, description: e.target.value })}
          className="w-full border text-gray-500 rounded-lg px-4 py-2 h-24 focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
        <input
          type="text"
          placeholder="Tech Stack *"
          value={form.techStack}
          onChange={(e) => setForm({ ...form, techStack: e.target.value })}
          className="w-full border text-gray-500 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
        <input
          type="url"
          placeholder="GitHub Link *"
          value={form.githubLink}
          onChange={(e) => setForm({ ...form, githubLink: e.target.value })}
          className="w-full border text-gray-500 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
        <input
          type="url"
          placeholder="Live Demo *"
          value={form.liveDemo}
          onChange={(e) => setForm({ ...form, liveDemo: e.target.value })}
          className="w-full text-gray-500 border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
        <input
          type="file"
          onChange={(e) =>
            setForm({ ...form, image: e.target.files?.[0] || null })
          }
          className="w-full"
        />

        <button
          type="submit"
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium px-4 py-2 rounded-lg transition-colors"
        >
          {editId ? "Update Project" : "Add Project"}
        </button>
      </form>

      {/* Project List */}
      <h3 className="text-xl font-semibold mt-10 mb-4">Your Projects</h3>
      {projects.length === 0 ? (
        <p className="text-gray-500">No projects found.</p>
      ) : (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((p: any) => (
            <div
              key={p._id}
              className="bg-white border rounded-lg shadow hover:shadow-lg transition p-4 flex flex-col"
            >
              {p.image && (
                <img
                  src={p.image}
                  alt={p.title}
                  className="w-full h-40 object-cover rounded-lg mb-3"
                />
              )}
              <h4 className="text-lg font-bold text-gray-800">{p.title}</h4>
              <p className="text-gray-600 text-sm flex-1">{p.description}</p>
              <span className="text-xs mt-2 text-blue-500">{p.techStack}</span>

              <div className="flex gap-3 mt-4">
                <a
                  href={p.githubLink}
                  target="_blank"
                  className="text-sm text-gray-700 underline"
                >
                  GitHub
                </a>
                <a
                  href={p.liveDemo}
                  target="_blank"
                  className="text-sm text-green-600 underline"
                >
                  Live Demo
                </a>
              </div>

              <div className="flex justify-between mt-4">
                <button
                  onClick={() => {
                    setForm({
                      title: p.title,
                      description: p.description,
                      techStack: p.techStack,
                      githubLink: p.githubLink,
                      liveDemo: p.liveDemo,
                      image: null,
                    });
                    setEditId(p._id);
                  }}
                  className="px-3 py-1 bg-yellow-400 hover:bg-yellow-500 text-white rounded"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(p._id)}
                  className="px-3 py-1 bg-red-500 hover:bg-red-600 text-white rounded"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
