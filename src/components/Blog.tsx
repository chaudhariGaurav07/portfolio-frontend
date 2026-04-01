import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Clock, Calendar, User, ExternalLink, Newspaper } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogClose,
} from "@/components/ui/dialog";
import { X, Tag } from "lucide-react";
import { Button } from "@/components/ui/button";
import { blogAPI } from "@/lib/api";
import { BlogPost } from "@/types";

const tagColors = ['tag-cyan', 'tag-green', 'tag-blue', 'tag-yellow'];

export default function Blog() {
  const [blogs, setBlogs] = useState<BlogPost[]>([]);
  const [selectedBlog, setSelectedBlog] = useState<BlogPost | null>(null);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const res = await blogAPI.getAll();
        const mappedBlogs = res.map((item: any) => ({ ...item, id: item._id }));
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
      <section id="blog" className="section-padding grid-bg">
        <div className="container-custom">
          <div className="flex items-center justify-center py-20">
            <div className="font-mono text-sm" style={{ color: '#00F5FF' }}>
              <span style={{ color: '#00FF41' }}>{'>'}</span> fetching blog posts<span className="terminal-cursor ml-1" />
            </div>
          </div>
        </div>
      </section>
    );
  }

  // Duplicate for seamless infinite marquee loop
  const marqueeBlogs = [...blogs, ...blogs];

  return (
    <>
      <section id="blog" className="section-padding grid-bg">
        <div className="container-custom">

          {/* Section Header */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, amount: 0.15, margin: "-60px" }}
            transition={{ duration: 1.0, ease: [0.22, 1, 0.36, 1] }}
            className="mb-12"
          >
            <p className="font-mono text-xs tracking-widest mb-2" style={{ color: 'rgba(0,245,255,0.5)' }}>
              grep -r "articles" ./blog
            </p>
            <h2 className="font-orbitron font-bold text-3xl md:text-4xl tracking-wider" style={{ color: '#E8EDF3' }}>
              READ_<span style={{ color: '#00F5FF' }}>BLOG</span>
            </h2>
            <div className="h-px mt-3 w-24" style={{ background: 'linear-gradient(90deg, #00FF41, transparent)' }} />
          </motion.div>

          {/* Blog Marquee Row */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, amount: 0.15, margin: "-60px" }}
            transition={{ duration: 1.0, ease: [0.22, 1, 0.36, 1] }}
          >
            <div
              className="overflow-hidden"
              style={{
                maskImage: 'linear-gradient(90deg, transparent, black 6%, black 94%, transparent)',
                WebkitMaskImage: 'linear-gradient(90deg, transparent, black 6%, black 94%, transparent)',
              }}
            >
              <div
                className="flex gap-4 blog-marquee-track"
                style={{ width: 'max-content' }}
              >
                {marqueeBlogs.map((blog, index) => {
                  const cardKey = `blog-${blog._id}-${index}`;
                  return (
                  <a
                    key={cardKey}
                    href={blog.externalLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-shrink-0 group"
                    style={{ width: '300px' }}
                  >
                    <div
                      className="h-full flex flex-col rounded-lg overflow-hidden transition-all duration-500"
                      style={{
                        background: 'rgba(13,17,23,0.85)',
                        border: '1px solid rgba(0,245,255,0.12)',
                        /* subtle dim by default — torch lifts it on hover */
                        filter: 'brightness(0.55) saturate(0.6)',
                        boxShadow: 'inset 0 0 24px rgba(0,0,0,0.5)',
                        transform: 'translateY(0)',
                      }}
                      onMouseEnter={e => {
                        const el = e.currentTarget as HTMLElement;
                        el.style.filter = 'brightness(1) saturate(1)';
                        el.style.borderColor = 'rgba(0,245,255,0.5)';
                        el.style.boxShadow = '0 0 28px rgba(0,245,255,0.25), 0 8px 32px rgba(0,0,0,0.5)';
                        el.style.transform = 'translateY(-5px)';
                      }}
                      onMouseLeave={e => {
                        const el = e.currentTarget as HTMLElement;
                        el.style.filter = 'brightness(0.55) saturate(0.6)';
                        el.style.borderColor = 'rgba(0,245,255,0.12)';
                        el.style.boxShadow = 'inset 0 0 24px rgba(0,0,0,0.5)';
                        el.style.transform = 'translateY(0)';
                      }}
                    >
                      {/* Cover image */}
                      {blog.image && (
                        <div className="overflow-hidden" style={{ height: '140px' }}>
                          <img
                            src={blog.image}
                            alt={blog.title}
                            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                          />
                        </div>
                      )}

                      <div className="p-4 flex flex-col gap-2 flex-1">
                        {/* Date + tag */}
                        <div className="flex items-center justify-between">
                          <span className="font-mono text-[10px] flex items-center gap-1" style={{ color: 'rgba(232,237,243,0.35)' }}>
                            <Calendar className="w-3 h-3" />
                            {new Date(blog.publishedAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                          </span>
                          {blog.tags[0] && (
                            <span className={tagColors[index % tagColors.length]} style={{ fontSize: '0.6rem' }}>
                              {blog.tags[0]}
                            </span>
                          )}
                        </div>

                        {/* Title */}
                        <p
                          className="font-semibold text-xs leading-snug line-clamp-2 transition-colors duration-200"
                          style={{ color: '#E8EDF3', fontFamily: 'Inter, sans-serif' }}
                        >
                          {blog.title}
                        </p>

                        {/* Footer */}
                        <div className="flex items-center justify-between mt-auto pt-2" style={{ borderTop: '1px solid rgba(0,245,255,0.08)' }}>
                          <div className="flex items-center gap-2 font-mono text-[10px]" style={{ color: 'rgba(232,237,243,0.35)' }}>
                            <span className="flex items-center gap-1"><User className="w-3 h-3" />{blog.author}</span>
                            <span className="flex items-center gap-1"><Clock className="w-3 h-3" />{blog.readTime}m</span>
                          </div>
                          <span className="font-mono text-[10px] flex items-center gap-0.5" style={{ color: 'rgba(0,245,255,0.6)' }}>
                            READ <ExternalLink className="w-2.5 h-2.5" />
                          </span>
                        </div>
                      </div>
                    </div>
                  </a>
                );
                })}
              </div>
            </div>
          </motion.div>

          {/* View All */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, amount: 0.15, margin: "-60px" }}
            transition={{ duration: 1.0, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="text-center mt-10"
          >
            <motion.a
              href="https://medium.com/@gauravchaudhari_"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.04, y: -2 }}
              whileTap={{ scale: 0.97 }}
              className="btn-terminal inline-flex items-center gap-2"
            >
              <Newspaper className="w-4 h-4" />
              VIEW_ALL_POSTS
            </motion.a>
          </motion.div>
        </div>
      </section>

      {/* Blog Modal */}
      <AnimatePresence>
        {isModalOpen && selectedBlog && (
          <Dialog open={isModalOpen} onOpenChange={closeBlog}>
            <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto"
              style={{ background: '#0D1117', border: '1px solid rgba(0,245,255,0.2)' }}>
              <DialogHeader className="space-y-4">
                <div className="flex items-start justify-between">
                  <DialogTitle className="text-xl font-bold gradient-text pr-8">
                    {selectedBlog.title}
                  </DialogTitle>
                  <DialogClose asChild>
                    <Button variant="ghost" size="icon" className="flex-shrink-0">
                      <X className="w-4 h-4" />
                    </Button>
                  </DialogClose>
                </div>
                <div className="flex flex-wrap gap-4 text-xs font-mono"
                  style={{ color: 'rgba(0,245,255,0.5)' }}>
                  <span className="flex items-center gap-1"><User className="w-3 h-3" />{selectedBlog.author}</span>
                  <span className="flex items-center gap-1"><Calendar className="w-3 h-3" />{new Date(selectedBlog.publishedAt).toLocaleDateString()}</span>
                  <span className="flex items-center gap-1"><Clock className="w-3 h-3" />{selectedBlog.readTime} min read</span>
                </div>
                <div className="flex flex-wrap gap-2">
                  {selectedBlog.tags.map((tag) => (
                    <span key={tag} className="tag-cyan text-xs">
                      <Tag className="w-3 h-3 inline mr-1" />{tag}
                    </span>
                  ))}
                </div>
              </DialogHeader>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1.0, ease: [0.22, 1, 0.36, 1] }}
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
