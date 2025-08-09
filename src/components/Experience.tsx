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
      "Built scalable full-stack features, fixed bugs, and improved documentation for open-source projects. Promoted GSSoC in college, organized info sessions, and onboarded participants. Collaborated in code reviews and gained expertise in Git, GitHub, and CI/CD workflows.",
    technologies: [
      "React",
      "Node.js",
      "TypeScript",
      "MongoDB",
      "Express.js",
      "Git",
      "GitHub",
    ],
  },
  {
    id: "2",
    company: "Akatsukin Coding Club",
    position: "Technical Team Member",
    duration: "Oct 2024 - Present",
    logo: "/assets/akatsuki.png",
    location: "RC Patel Institute of Technology, Shirpur",
    description:
      "Developed internal tools and event websites, handled technical setups, and contributed to UI/UX design. Conducted workshops, including React.js training, and collaborated across teams for smooth event execution.",
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
  },
  {
    id: "3",
    company: "R3 System India Private Limited",
    position: "Data Analyst",
    duration: "Jun 2023 - Jul 2023",
    logo: "/assets/r3sys.png",
    location: "Nashik",
    description:
      "Created interactive dashboards and visual reports using Power BI for event and performance analysis. Collected, cleaned, and analyzed data to support decision-making and integrated insights into internal tools.",
    technologies: ["Power BI", "Excel", "DAX", "Data Visualization", "Figma"],
  },
];


export default function Experience() {
  return (
    <section id="experience" className="section-padding">
      <div className="container-custom">
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
          {/* Timeline Line */}
          <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-0.5 bg-gradient-primary transform md:-translate-x-1/2" />

          <div className="space-y-12">
            {experiences.map((exp, index) => (
              <motion.div
                key={exp.id}
                initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: index * 0.2 }}
                className={`relative flex items-center ${
                  index % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
                } flex-col md:space-x-8`}
              >
                {/* Timeline Dot */}
                <div className="absolute left-4 md:left-1/2 w-4 h-4 bg-primary rounded-full transform md:-translate-x-1/2 border-4 border-background z-10 shadow-3d">
                  <div className="absolute inset-0 bg-primary rounded-full animate-ping opacity-30" />
                </div>

                {/* Content */}
                <div
                  className={`w-full md:w-1/2 ml-12 md:ml-0 ${
                    index % 2 === 0 ? "md:pr-8" : "md:pl-8"
                  }`}
                >
                  <motion.div
                    whileHover={{
                      scale: 1.02,
                      rotateY: index % 2 === 0 ? 2 : -2,
                    }}
                    className="card-3d p-6 group cursor-pointer"
                  >
                    {/* Company & Position */}
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <h3 className="text-xl font-bold text-foreground group-hover:text-primary transition-colors duration-300">
                          {exp.position}
                        </h3>
                        <div className="flex items-center space-x-2 text-primary mt-1">
                          <Building className="w-4 h-4" />
                          <span className="font-medium">{exp.company}</span>
                        </div>
                      </div>
                      <div className="w-12 h-12 rounded-lg flex items-center justify-center flex-shrink-0 overflow-hidden">
                        <img
                          src={exp.logo}
                          alt={`${exp.company} logo`}
                          className="w-12 h-12 object-contain"
                        />
                      </div>
                    </div>

                    {/* Duration & Location */}
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
                    <p className="text-muted-foreground mb-4 leading-relaxed">
                      {exp.description}
                    </p>

                    {/* Technologies */}
                    <div className="space-y-2">
                      <h4 className="text-sm font-semibold text-foreground">
                        Key Technologies:
                      </h4>
                      <div className="flex flex-wrap gap-2">
                        {exp.technologies.map((tech) => (
                          <motion.span
                            key={tech}
                            whileHover={{ scale: 1.1, rotateZ: 2 }}
                            className="px-3 py-1 bg-primary/10 text-primary rounded-full text-xs font-medium border border-primary/20 cursor-pointer"
                          >
                            {tech}
                          </motion.span>
                        ))}
                      </div>
                    </div>

                    {/* Hover Effect */}
                    <div className="absolute inset-0 bg-gradient-primary opacity-0 group-hover:opacity-5 rounded-lg transition-opacity duration-300 pointer-events-none" />
                  </motion.div>
                </div>

                {/* Spacer for the other side */}
                <div className="hidden md:block w-1/2" />
              </motion.div>
            ))}
          </div>

          {/* Bottom decoration */}
          <motion.div
            initial={{ opacity: 0, scale: 0 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="absolute bottom-0 left-4 md:left-1/2 w-8 h-8 bg-secondary rounded-full transform md:-translate-x-1/2 flex items-center justify-center shadow-3d"
          >
            <div className="w-3 h-3 bg-secondary-foreground rounded-full" />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
