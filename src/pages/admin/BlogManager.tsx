import React, { useEffect, useState } from "react";
import api from "@/lib/api";

export default function BlogManager() {
  const [blogs, setBlogs] = useState([]);
  const [form, setForm] = useState({
    title: "",
    content: "",
    category: "",
    tags: "",
    externalLink: "",
    published: "true",
    image: null as File | null,
  });
  const [editId, setEditId] = useState<string | null>(null);

  const fetchBlogs = async () => {
    try {
      const res = await api.get("/blog");
      setBlogs(Array.isArray(res.data.data) ? res.data.data : []);
    } catch (error) {
      console.error("Error fetching blogs:", error);
      setBlogs([]);
    }
  };

  useEffect(() => {
    fetchBlogs();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!form.title || !form.content || !form.tags || !form.externalLink) {
      alert("Please fill in all required fields.");
      return;
    }

    const formData = new FormData();
    Object.entries(form).forEach(([key, value]) => {
      if (value !== null) formData.append(key, value as any);
    });

    if (editId) {
      await api.put(`/blog/${editId}`, formData);
    } else {
      await api.post("/blog", formData);
    }

    setForm({
      title: "",
      content: "",
      category: "",
      tags: "",
      externalLink: "",
      published: "true",
      image: null,
    });
    setEditId(null);
    fetchBlogs();
  };

  const handleDelete = async (id: string) => {
    await api.delete(`/blog/${id}`);
    fetchBlogs();
  };

  return (
    <div className="max-w-5xl mx-auto p-6">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">
        {editId ? "Edit Blog" : "Add New Blog"}
      </h2>

      {/* Blog Form */}
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
          placeholder="Content *"
          value={form.content}
          onChange={(e) => setForm({ ...form, content: e.target.value })}
          className="w-full border text-gray-500 rounded-lg px-4 py-2 h-28 focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
        <input
          type="text"
          placeholder="Category"
          value={form.category}
          onChange={(e) => setForm({ ...form, category: e.target.value })}
          className="w-full border text-gray-500 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
        <input
          type="text"
          placeholder="Tags *"
          value={form.tags}
          onChange={(e) => setForm({ ...form, tags: e.target.value })}
          className="w-full border text-gray-500 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
        <input
          type="url"
          placeholder="External Link *"
          value={form.externalLink}
          onChange={(e) => setForm({ ...form, externalLink: e.target.value })}
          className="w-full border text-gray-500 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
        <select
          value={form.published}
          onChange={(e) => setForm({ ...form, published: e.target.value })}
          className="w-full border text-gray-500 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
        >
          <option value="true">Published</option>
          <option value="false">Draft</option>
        </select>
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
          {editId ? "Update Blog" : "Add Blog"}
        </button>
      </form>

      {/* Blog List */}
      <h3 className="text-xl font-semibold mt-10 mb-4">Your Blogs</h3>
      {blogs.length === 0 ? (
        <p className="text-gray-500">No blogs found.</p>
      ) : (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {blogs.map((b: any) => (
            <div
              key={b._id}
              className="bg-white border rounded-lg shadow hover:shadow-lg transition p-4 flex flex-col"
            >
              {b.image && (
                <img
                  src={b.image}
                  alt={b.title}
                  className="w-full h-40 object-cover rounded-lg mb-3"
                />
              )}
              <h4 className="text-lg font-bold text-gray-800">{b.title}</h4>
              <p className="text-gray-600 text-sm flex-1">{b.content}</p>
              <span className="text-xs mt-2 text-blue-500">
                {b.category || "Uncategorized"}
              </span>
              <span className="text-xs text-gray-500">{b.tags}</span>
              <span
                className={`mt-1 text-xs font-semibold ${
                  b.published === "true" ? "text-green-600" : "text-yellow-500"
                }`}
              >
                {b.published === "true" ? "Published" : "Draft"}
              </span>

              <div className="flex gap-3 mt-4">
                <a
                  href={b.externalLink}
                  target="_blank"
                  className="text-sm text-green-600 underline"
                >
                  Read More
                </a>
              </div>

              <div className="flex justify-between mt-4">
                <button
                  onClick={() => {
                    setForm({
                      title: b.title,
                      content: b.content,
                      category: b.category,
                      tags: b.tags,
                      externalLink: b.externalLink,
                      published: b.published,
                      image: null,
                    });
                    setEditId(b._id);
                  }}
                  className="px-3 py-1 bg-yellow-400 hover:bg-yellow-500 text-white rounded"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(b._id)}
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
