import React, { useEffect, useState } from "react";
import api from "@/lib/api";

const API_BASE =
  import.meta.env.VITE_API_URL?.replace(/\/$/, "") ||
  "https://portfolio-w34d.onrender.com/api/v1";

export default function BlogManager() {
  const [blogs, setBlogs] = useState([]);
  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const [form, setForm] = useState({
    title: "",
    content: "",
    category: "",
    tags: "",
    externalLink: "",
    published: "true",
    image: null as File | null,
    existingImage: "",
    publishedAt: "",
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

  const getImageUrl = (path: string) => {
    if (!path) return "";
    if (path.startsWith("http")) return path;

    const base = API_BASE.replace("/api/v1", "");
    return `${base}${path.startsWith("/") ? path : `/${path}`}`;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!form.title || !form.content || !form.tags || !form.externalLink) {
      alert("Please fill in all required fields.");
      return;
    }

    const formData = new FormData();
    formData.append("title", form.title);
    formData.append("content", form.content);
    formData.append("category", form.category);
    formData.append("tags", form.tags);
    formData.append("externalLink", form.externalLink);
    formData.append("published", form.published);
    formData.append("publishedAt", form.publishedAt);

    if (form.image instanceof File) {
      formData.append("image", form.image);
    } else if (form.existingImage) {
      formData.append("existingImage", form.existingImage);
    }

    if (editId) {
      await api.put(`/blog/${editId}`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
    } else {
      await api.post("/blog", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
    }

    setForm({
      title: "",
      content: "",
      category: "",
      tags: "",
      externalLink: "",
      published: "true",
      image: null,
      existingImage: "",
      publishedAt: "",
    });
    setPreviewImage(null);
    setEditId(null);
    fetchBlogs();
  };

  const handleDelete = async (id: string) => {
    await api.delete(`/blog/${id}`);
    fetchBlogs();
  };

  const handleImageChange = (file: File | null) => {
    setForm({ ...form, image: file });
    if (file) {
      setPreviewImage(URL.createObjectURL(file));
    } else {
      setPreviewImage(null);
    }
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
          className="w-full border text-gray-500 rounded-lg px-4 py-2"
        />
        <textarea
          placeholder="Content *"
          value={form.content}
          onChange={(e) => setForm({ ...form, content: e.target.value })}
          className="w-full border text-gray-500 rounded-lg px-4 py-2 h-28"
        />
        <input
          type="text"
          placeholder="Category"
          value={form.category}
          onChange={(e) => setForm({ ...form, category: e.target.value })}
          className="w-full border text-gray-500 rounded-lg px-4 py-2"
        />
        <input
          type="text"
          placeholder="Tags *"
          value={form.tags}
          onChange={(e) => setForm({ ...form, tags: e.target.value })}
          className="w-full border text-gray-500 rounded-lg px-4 py-2"
        />
         <input
          type="date"
          placeholder="published At"
          value={form.publishedAt}
          onChange={(e) => setForm({ ...form, publishedAt: e.target.value })}
          className="w-full border text-gray-500 rounded-lg px-4 py-2"
        />
        <input
          type="url"
          placeholder="External Link *"
          value={form.externalLink}
          onChange={(e) => setForm({ ...form, externalLink: e.target.value })}
          className="w-full border text-gray-500 rounded-lg px-4 py-2"
        />
        <select
          value={form.published}
          onChange={(e) => setForm({ ...form, published: e.target.value })}
          className="w-full border text-gray-500 rounded-lg px-4 py-2"
        >
          <option value="true">Published</option>
          <option value="false">Draft</option>
        </select>

        <input
          type="file"
          onChange={(e) => handleImageChange(e.target.files?.[0] || null)}
          className="w-full"
        />

        {previewImage && (
          <img
            src={previewImage}
            alt="Preview"
            className="w-full h-40 object-cover rounded-lg mb-3"
          />
        )}
        {!previewImage && form.existingImage && (
          <img
            src={getImageUrl(form.existingImage)}
            alt="Current"
            className="w-full h-40 object-cover rounded-lg mb-3"
          />
        )}

        <button
          type="submit"
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium px-4 py-2 rounded-lg"
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
              className="bg-white border rounded-lg shadow p-4 flex flex-col"
            >
              {b.image && (
                <img
                  src={getImageUrl(b.image)}
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
                  b.published === "true"
                    ? "text-green-600"
                    : "text-yellow-500"
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
                      existingImage: b.image,
                      publishedAt: b.publishedAt
                    });
                    setPreviewImage(null);
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
