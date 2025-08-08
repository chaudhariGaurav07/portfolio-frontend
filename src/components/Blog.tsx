import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Clock, Calendar, User, Tag, X, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogClose,
} from "@/components/ui/dialog";
import { blogAPI } from "@/lib/api";
import { BlogPost } from "@/types";

export default function Blog() {
  const [blogs, setBlogs] = useState<BlogPost[]>([]);
  const [selectedBlog, setSelectedBlog] = useState<BlogPost | null>(null);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const res = await blogAPI.getAll();
        console.log("Fetched blogs:", res);

        const mappedBlogs = res.map((item: any) => ({
          ...item,
          id: item._id,
        }));

        setBlogs(mappedBlogs);
      } catch (error) {
        console.error("Failed to fetch blogs:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchBlogs();
  }, []);

  const openBlog = async (blogId: string) => {
    try {
      const blog = await blogAPI.getById(blogId);
      setSelectedBlog(blog);
      setIsModalOpen(true);
    } catch (error) {
      console.error("Failed to fetch blog:", error);
    }
  };

  const closeBlog = () => {
    setIsModalOpen(false);
    setSelectedBlog(null);
  };

  if (loading) {
    return (
      <section id="blog" className="section-padding">
        <div className="container-custom">
          <div className="text-center">
            <div className="animate-spin w-12 h-12 border-4 border-primary border-t-transparent rounded-full mx-auto" />
            <p className="mt-4 text-muted-foreground">Loading blog posts...</p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <>
      <section id="blog" className="section-padding">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              <span className="gradient-text">Latest Blog Posts</span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Thoughts, insights, and learnings from my development journey
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
           {blogs.map((blog, index) => (
  <motion.a
    key={blog._id}
    href={blog.externalLink}
    target="_blank"
    rel="noopener noreferrer"
    initial={{ opacity: 0, y: 50 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.6, delay: index * 0.1 }}
    whileHover={{ y: -10 }}
    className="group cursor-pointer block"
  >
    <div className="card-3d overflow-hidden h-full flex flex-col border border-border rounded-lg shadow-lg bg-background relative">
      {/* Cover Image */}
      {blog.image && (
        <img
          src={blog.image}
          alt={blog.title}
          className="w-full h-48 object-cover"
        />
      )}

      {/* Blog Header */}
      <div className="p-6 flex-1">
        {/* Tags */}
        <div className="flex flex-wrap gap-2 mb-4">
          {blog.tags.slice(0, 3).map((tag) => (
            <span
              key={tag}
              className="px-2 py-1 bg-primary/10 text-primary rounded text-xs font-medium border border-primary/20"
            >
              #{tag}
            </span>
          ))}
          {blog.tags.length > 3 && (
            <span className="px-2 py-1 bg-muted text-muted-foreground rounded text-xs">
              +{blog.tags.length - 3} more
            </span>
          )}
        </div>

        {/* Title */}
        <h3 className="text-xl font-bold mb-3 group-hover:text-primary transition-colors duration-300 line-clamp-2">
          {blog.title}
        </h3>

        {/* Excerpt */}
        <p className="text-muted-foreground mb-4 text-sm leading-relaxed line-clamp-3">
          {blog.excerpt}
        </p>

        {/* Meta Info */}
        <div className="flex items-center justify-between text-xs text-muted-foreground mt-auto">
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-1">
              <User className="w-3 h-3" />
              <span>{blog.author}</span>
            </div>
            <div className="flex items-center space-x-1">
              <Calendar className="w-3 h-3" />
              <span>
                {new Date(blog.publishedAt).toLocaleDateString()}
              </span>
            </div>
          </div>
          <div className="flex items-center space-x-1">
            <Clock className="w-3 h-3" />
            <span>{blog.readTime} min read</span>
          </div>
        </div>
      </div>

      {/* Read More */}
      <div className="p-6 pt-0 flex items-center justify-center gap-2 text-primary font-medium">
        Read More <ExternalLink className="w-4 h-4" />
      </div>

      {/* Hover Effect */}
      <div className="absolute inset-0 bg-gradient-primary opacity-0 group-hover:opacity-5 transition-opacity duration-300 pointer-events-none" />
    </div>
  </motion.a>
))}

          </div>

          {/* View All Blogs Button */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="text-center mt-12"
          >
            <Button
              variant="outline"
              size="lg"
              className="btn-3d border-primary/30 hover:border-primary bg-transparent"
            >
              View All Blog Posts
            </Button>
          </motion.div>
        </div>
      </section>

      {/* Blog Modal */}
      <AnimatePresence>
        {isModalOpen && selectedBlog && (
          <Dialog open={isModalOpen} onOpenChange={closeBlog}>
            <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto bg-card border border-border">
              <DialogHeader className="space-y-4">
                <div className="flex items-start justify-between">
                  <DialogTitle className="text-2xl font-bold gradient-text pr-8">
                    {selectedBlog.title}
                  </DialogTitle>
                  <DialogClose asChild>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="flex-shrink-0"
                    >
                      <X className="w-4 h-4" />
                    </Button>
                  </DialogClose>
                </div>

                {/* Blog Meta */}
                <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
                  <div className="flex items-center space-x-1">
                    <User className="w-4 h-4" />
                    <span>{selectedBlog.author}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Calendar className="w-4 h-4" />
                    <span>
                      {new Date(selectedBlog.publishedAt).toLocaleDateString()}
                    </span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Clock className="w-4 h-4" />
                    <span>{selectedBlog.readTime} min read</span>
                  </div>
                </div>

                {/* Tags */}
                <div className="flex flex-wrap gap-2">
                  {selectedBlog.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-3 py-1 bg-primary/10 text-primary rounded-full text-xs font-medium border border-primary/20"
                    >
                      <Tag className="w-3 h-3 inline mr-1" />
                      {tag}
                    </span>
                  ))}
                </div>
              </DialogHeader>

              {/* Blog Content */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="prose prose-invert max-w-none mt-6"
                dangerouslySetInnerHTML={{ __html: selectedBlog.content }}
              />
            </DialogContent>
          </Dialog>
        )}
      </AnimatePresence>
    </>
  );
}
