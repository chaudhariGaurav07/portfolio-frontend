import { motion } from "framer-motion";
import { Calendar, MapPin } from "lucide-react";

const experiences = [
  {
    id: "1",
    company: "GirlScript Summer of Code",
    position: "Contributor + Campus Ambassador",
    duration: "Jul 2025 – Present",
    location: "Remote",
    logo: "/assets/gssoc.png",
    status: "active",
    description:
      "Built scalable full-stack features, fixed bugs, and improved documentation for open-source projects...",
    technologies: ["React", "Node.js", "TypeScript", "MongoDB", "Express.js", "Git", "GitHub"],
    subRoles: [
      { title: "Contributor", duration: "Jul 2025 – Present" },
      { title: "Campus Ambassador", duration: "Jul 2025 – Jul 2025" },
    ],
  },
  {
    id: "2",
    company: "Akatsuki Coding Club",
    position: "Core Team Member + Technical Team Member",
    duration: "Oct 2024 – Present",
    location: "RC Patel Institute of Technology, Shirpur",
    logo: "/assets/akatsuki.png",
    status: "active",
    description:
      "Contributing to club leadership, conducting workshops, building event tools, managing technical workflows...",
    technologies: ["React", "Express.js", "MongoDB", "Tailwind CSS", "Node.js", "Git", "React-Native", "Expo"],
    subRoles: [
      { title: "Core Team Member", duration: "Oct 2025 – Present" },
      { title: "Technical Team Member", duration: "Oct 2024 – Present" },
    ],
  },
  {
    id: "3",
    company: "R3 System India Private Limited",
    position: "Data Analyst",
    duration: "Jun 2023 – Jul 2023",
    location: "Nashik",
    logo: "/assets/r3sys.png",
    status: "closed",
    description:
      "Created interactive dashboards using Power BI for event and performance analysis...",
    technologies: ["Power BI", "Excel", "DAX", "Data Visualization", "Figma"],
  },
];

export default function Experience() {
  return (
    <section id="experience" className="section-padding grid-bg">
      <div className="container-custom">

        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="mb-16"
        >
          <p className="font-mono text-xs tracking-widest mb-2" style={{ color: 'rgba(0,245,255,0.5)' }}>
            cat experience.log
          </p>
          <h2 className="font-orbitron font-bold text-3xl md:text-4xl tracking-wider" style={{ color: '#E8EDF3' }}>
            SYS_LOG<span style={{ color: '#00F5FF' }}>:</span>EXPERIENCE
          </h2>
          <div className="h-px mt-3 w-32" style={{ background: 'linear-gradient(90deg, #00F5FF, transparent)' }} />
        </motion.div>

        {/* Timeline */}
        <div className="relative">
          <div className="timeline-line hidden md:block" />

          <div className="space-y-12">
            {experiences.map((exp, index) => (
              <motion.div
                key={exp.id}
                initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: '-80px' }}
                transition={{ duration: 0.7, delay: index * 0.1 }}
                className={`relative flex flex-col md:items-center ${
                  index % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
                }`}
              >
                {/* Timeline dot */}
                <div className="timeline-dot hidden md:block" style={{ top: '2rem' }} />

                {/* Card — compact by default, full details slide up on hover */}
                <div className={`w-full md:w-[calc(50%-2rem)] ${index % 2 === 0 ? "md:mr-auto md:pr-8" : "md:ml-auto md:pl-8"}`}>
                  <motion.div
                    transition={{ duration: 0.2 }}
                    className="card-terminal group relative overflow-hidden"
                    style={{ minHeight: '140px' }}
                  >
                    {/* Card top border glow */}
                    <div className="absolute top-0 left-0 right-0 h-px z-10"
                      style={{ background: 'linear-gradient(90deg, transparent, rgba(0,245,255,0.3), transparent)' }} />

                    {/* ── COMPACT VIEW (always visible, hides on hover) ── */}
                    <div
                      className="p-5 flex items-center gap-4 transition-all duration-400 group-hover:opacity-0 group-hover:pointer-events-none"
                    >
                      {/* Logo */}
                      <div className="w-12 h-12 rounded flex-shrink-0 flex items-center justify-center"
                        style={{ background: 'rgba(0,245,255,0.06)', border: '1px solid rgba(0,245,255,0.15)' }}>
                        <img src={exp.logo} alt={exp.company} className="w-full h-full object-contain p-1.5" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="font-mono text-xs mb-0.5" style={{ color: '#00F5FF' }}>{exp.company}</p>
                        <h3 className="font-orbitron font-bold text-sm leading-snug mb-2" style={{ color: '#E8EDF3' }}>
                          {exp.position}
                        </h3>
                        <div className="flex items-center gap-3 flex-wrap">
                          {exp.status === 'active' ? (
                            <span className="status-active font-mono text-xs">STATUS: ACTIVE</span>
                          ) : (
                            <span className="status-closed font-mono text-xs">● STATUS: CLOSED</span>
                          )}
                          <span className="font-mono text-xs flex items-center gap-1" style={{ color: 'rgba(232,237,243,0.4)' }}>
                            <Calendar className="w-3 h-3" />{exp.duration}
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* ── EXPANDED VIEW (slides up from bottom on hover) ── */}
                    <div
                      className="absolute inset-0 p-5 translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-out overflow-hidden"
                      style={{
                        background: 'rgba(13,17,23,0.97)',
                        borderTop: '1px solid rgba(0,245,255,0.18)',
                      }}
                    >
                      {/* Header row */}
                      <div className="flex items-start justify-between gap-3 mb-3">
                        <div className="flex-1 min-w-0">
                          <h3 className="font-orbitron font-bold text-sm mb-0.5" style={{ color: '#00F5FF' }}>
                            {exp.position}
                          </h3>
                          <p className="font-mono text-xs" style={{ color: 'rgba(232,237,243,0.6)' }}>
                            {exp.company}
                          </p>
                        </div>
                        <div className="w-9 h-9 rounded overflow-hidden flex-shrink-0"
                          style={{ background: 'rgba(0,245,255,0.05)', border: '1px solid rgba(0,245,255,0.1)' }}>
                          <img src={exp.logo} alt={exp.company} className="w-full h-full object-contain p-1" />
                        </div>
                      </div>

                      {/* Meta */}
                      <div className="flex flex-wrap gap-3 mb-3 text-xs font-mono" style={{ color: 'rgba(232,237,243,0.4)' }}>
                        <span className="flex items-center gap-1"><Calendar className="w-3 h-3" />{exp.duration}</span>
                        <span className="flex items-center gap-1"><MapPin className="w-3 h-3" />{exp.location}</span>
                      </div>

                      {/* Status */}
                      <div className="mb-3">
                        {exp.status === 'active' ? (
                          <span className="status-active font-mono text-xs">STATUS: ACTIVE</span>
                        ) : (
                          <span className="status-closed font-mono text-xs">● STATUS: CLOSED</span>
                        )}
                      </div>

                      {/* Description */}
                      <p className="text-xs leading-relaxed mb-3"
                        style={{ color: 'rgba(232,237,243,0.55)', fontFamily: 'Inter, sans-serif' }}>
                        {exp.description}
                      </p>

                      {/* Sub-roles */}
                      {exp.subRoles && (
                        <div className="mb-3 space-y-1.5 pl-3"
                          style={{ borderLeft: '1px solid rgba(0,245,255,0.15)' }}>
                          {exp.subRoles.map((role, i) => (
                            <div key={i}>
                              <p className="font-mono text-xs font-semibold" style={{ color: '#00F5FF' }}>{role.title}</p>
                              <p className="font-mono text-xs" style={{ color: 'rgba(232,237,243,0.35)' }}>{role.duration}</p>
                            </div>
                          ))}
                        </div>
                      )}

                      {/* Tech tags */}
                      <div className="flex flex-wrap gap-1.5">
                        {exp.technologies.map((tech) => (
                          <span key={tech} className="tag-cyan text-xs">{tech}</span>
                        ))}
                      </div>
                    </div>
                  </motion.div>
                </div>

                {/* Spacer for alternating */}
                <div className="hidden md:block w-[calc(50%-2rem)]" />
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
