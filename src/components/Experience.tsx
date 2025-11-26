import { motion } from "framer-motion";
import { Calendar, MapPin, Building } from "lucide-react";

const experiences = [
  {
    id: "1",
    company: "GirlScript Summer of Code",
    position: "Contributor + Campus Ambassador",
    duration: "Jul 2025 - Present",
    location: "Remote",
    logo: "/assets/gssoc.png",
    description:
      "Built scalable full-stack features, fixed bugs, and improved documentation for open-source projects...",
    technologies: [
      "React",
      "Node.js",
      "TypeScript",
      "MongoDB",
      "Express.js",
      "Git",
      "GitHub",
    ],
    subRoles: [
      {
        title: "Contributor",
        duration: "Jul 2025 - Present",
      },
      {
        title: "Campus Ambassador",
        duration: "Jul 2025 - Jul 2025",
      },
    ],
  },

  {
    id: "2",
    company: "Akatsuki Coding Club",
    position: "Core Team Member + Technical Team Member",
    duration: "Oct 2024 - Present",
    logo: "/assets/akatsuki.png",
    location: "RC Patel Institute of Technology, Shirpur",
    description:
      "Contributing to club leadership, conducting workshops, building event tools, managing technical workflows...",
    technologies: [
      "React",
      "Express.js",
      "MongoDB",
      "Tailwind CSS",
      "Node.js",
      "Git",
      "GitHub",
      "React-Native",
      "Expo",
    ],
    subRoles: [
      {
        title: "Core Team Member",
        duration: "Oct 2025 - Present",
      },
      {
        title: "Technical Team Member",
        duration: "Oct 2024 - Present",
      },
    ],
  },

  {
    id: "3",
    company: "R3 System India Private Limited",
    position: "Data Analyst",
    duration: "Jun 2023 - Jul 2023",
    logo: "/assets/r3sys.png",
    location: "Nashik",
    description:
      "Created interactive dashboards using Power BI for event and performance analysis...",
    technologies: ["Power BI", "Excel", "DAX", "Data Visualization", "Figma"],
  },
];

export default function Experience() {
  return (
    <section id="experience" className="section-padding">
      <div className="container-custom">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            <span className="gradient-text">Professional Experience</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            My journey through different roles and companies, building scalable
            solutions
          </p>
        </motion.div>

        <div className="relative">
          {/* Timeline line */}
          <div className="hidden md:block absolute left-1/2 top-0 bottom-0 w-0.5 bg-gradient-primary transform -translate-x-1/2" />

          <div className="space-y-14">
            {experiences.map((exp, index) => (
              <motion.div
                key={exp.id}
                initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: index * 0.2 }}
                className={`relative flex flex-col md:items-center ${
                  index % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
                } md:space-x-8`}
              >
                {/* Timeline dot */}
                <div className="hidden md:block absolute left-1/2 w-4 h-4 bg-primary rounded-full transform -translate-x-1/2 border-4 border-background z-10 shadow-3d">
                  <div className="absolute inset-0 bg-primary rounded-full animate-ping opacity-30" />
                </div>

                {/* Main Card */}
                <div
                  className={`w-full md:w-1/2 ${
                    index % 2 === 0 ? "md:pr-8" : "md:pl-8"
                  }`}
                >
                  <motion.div
                    whileHover={{
                      scale: 1.02,
                      rotateY: index % 2 === 0 ? 2 : -2,
                    }}
                    className="card-3d p-6 group cursor-pointer relative"
                  >
                    {/* Header */}
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <h3 className="text-xl font-bold group-hover:text-primary transition-colors duration-300">
                          {exp.position}
                        </h3>
                        <div className="flex items-center space-x-2 text-primary mt-1">
                          <Building className="w-4 h-4" />
                          <span className="font-medium">{exp.company}</span>
                        </div>
                      </div>

                      <div className="w-12 h-12 flex-shrink-0 overflow-hidden rounded-lg">
                        <img
                          src={exp.logo}
                          alt={`${exp.company} logo`}
                          className="w-12 h-12 object-contain"
                        />
                      </div>
                    </div>

                    {/* Duration + Location */}
                    <div className="flex flex-col sm:flex-row sm:items-center sm:space-x-6 mb-4 text-sm text-muted-foreground">
                      <div className="flex items-center space-x-2">
                        <Calendar className="w-4 h-4" />
                        <span>{exp.duration}</span>
                      </div>
                      <div className="flex items-center space-x-2 mt-1 sm:mt-0">
                        <MapPin className="w-4 h-4" />
                        <span>{exp.location}</span>
                      </div>
                    </div>

                    {/* Description */}
                    <p className="text-muted-foreground mb-6 leading-relaxed">
                      {exp.description}
                    </p>

                    {/* Sub-Roles (Badge removed) */}
                    {exp.subRoles && (
                      <div className="mt-6 space-y-5">
                        {exp.subRoles.map((role, i) => (
                          <div key={i} className="flex items-start space-x-4">
                            {/* Tiny timeline dot */}
                            <div className="mt-1 w-3 h-3 rounded-full bg-primary border-2 border-background shadow" />

                            <div>
                              <p className="font-semibold text-foreground">
                                {role.title}
                              </p>
                              <p className="text-xs text-muted-foreground">
                                {role.duration}
                              </p>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}

                    {/* Technologies */}
                    <div className="space-y-2 mt-6">
                      <h4 className="text-sm font-semibold">Key Technologies:</h4>
                      <div className="flex flex-wrap gap-2">
                        {exp.technologies.map((tech) => (
                          <motion.span
                            key={tech}
                            whileHover={{ scale: 1.1, rotateZ: 2 }}
                            className="px-3 py-1 bg-primary/10 text-primary rounded-full text-xs font-medium border border-primary/20"
                          >
                            {tech}
                          </motion.span>
                        ))}
                      </div>
                    </div>

                    {/* Hover Layer */}
                    <div className="absolute inset-0 bg-gradient-primary opacity-0 group-hover:opacity-5 rounded-lg transition-opacity duration-300 pointer-events-none" />
                  </motion.div>
                </div>

                <div className="hidden md:block w-1/2" />
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
