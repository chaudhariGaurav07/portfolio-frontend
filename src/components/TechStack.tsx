import { motion } from "framer-motion";
import {
  SiReact,
  SiTypescript,
  SiNextdotjs,
  SiTailwindcss,
  SiNodedotjs,
  SiExpress,
  SiMongodb,
  SiAmazon,
  SiVercel,
  SiGit,
  SiGithub,
  SiReactivex,
  SiFramer,
  SiFirebase,
} from "react-icons/si";

const techCategories = [
  {
    title: "Frontend",
    techs: [
      { name: "React", icon: SiReact, color: "text-blue-400", proficiency: 95 },
      {
        name: "TypeScript",
        icon: SiTypescript,
        color: "text-blue-600",
        proficiency: 90,
      },
      {
        name: "Next.js",
        icon: SiNextdotjs,
        color: "text-black",
        proficiency: 85,
      },
      {
        name: "Tailwind CSS",
        icon: SiTailwindcss,
        color: "text-cyan-400",
        proficiency: 92,
      },
    ],
  },
  {
    title: "Backend",
    techs: [
      {
        name: "Node.js",
        icon: SiNodedotjs,
        color: "text-green-500",
        proficiency: 88,
      },
      {
        name: "Express",
        icon: SiExpress,
        color: "text-gray-800",
        proficiency: 85,
      },
      {
        name: "Python",
        icon: SiMongodb,
        color: "text-green-600",
        proficiency: 80,
      },
      {
        name: "REST APIs",
        icon: SiExpress,
        color: "text-orange-500",
        proficiency: 90,
      },
    ],
  },
  {
    title: "Database & Cloud",
    techs: [
      {
        name: "MongoDB",
        icon: SiMongodb,
        color: "text-green-600",
        proficiency: 88,
      },
      {
        name: "Firebase",
        icon: SiFirebase,
        color: "text-blue-700",
        proficiency: 82,
      },
      {
        name: "AWS",
        icon: SiAmazon,
        color: "text-orange-400",
        proficiency: 78,
      },
      {
        name: "Vercel",
        icon: SiVercel,
        color: "text-gray-900",
        proficiency: 85,
      },
    ],
  },
  {
    title: "Tools & Others",
    techs: [
      { name: "Git", icon: SiGit, color: "text-red-500", proficiency: 92 },
      { name: "Github", icon: SiGithub, color: "text-black", proficiency: 75 },
      {
        name: "React Native",
        icon: SiReactivex,
        color: "text-purple-500",
        proficiency: 70,
      },
      {
        name: "Framer Motion",
        icon: SiFramer,
        color: "text-pink-400",
        proficiency: 88,
      },
    ],
  },
];

const allTechs = techCategories.flatMap((cat) => cat.techs);

const getIconPosition = (index) => {
  const radius = 140;
  const angle = (index / allTechs.length) * Math.PI * 2;
  const x = Math.cos(angle) * radius;
  const y = Math.sin(angle) * radius;
  return { x, y };
};

export default function TechStack() {
  return (
    <section id="about" className="section-padding bg-muted/30">
      <div className="container-custom">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            <span className="gradient-text">Tech Stack</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Technologies I work with to bring ideas to life
          </p>
        </motion.div>

        <div className="relative">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.2 }}
            className="relative mx-auto max-w-4xl h-96 bg-gradient-card rounded-3xl border border-border/30 overflow-hidden"
            style={{ perspective: "1000px", transformStyle: "preserve-3d" }}
          >
            <div className="absolute inset-0 opacity-10">
              <div className="grid grid-cols-8 grid-rows-6 h-full">
                {[...Array(48)].map((_, i) => (
                  <div key={i} className="border border-primary/20" />
                ))}
              </div>
            </div>

            {/* Floating Tech Icons container with continuous rotation */}
            <motion.div
              className="absolute inset-0 flex items-center justify-center"
              animate={{ rotate: 360 }}
              transition={{
                repeat: Infinity,
                duration: 20,
                ease: "linear",
              }}
            >
              {allTechs.map((tech, index) => {
                const { x, y } = getIconPosition(index);
                return (
                  <motion.div
                    key={tech.name}
                    className="absolute tech-icon cursor-pointer group"
                    initial={{ scale: 0, opacity: 0 }}
                    whileInView={{ scale: 1, opacity: 1 }}
                    transition={{ duration: 0.5, delay: 0.5 + index * 0.05 }}
                    whileHover={{
                      scale: 1.3,
                      rotateX: -15,
                      rotateY: 15,
                      transition: { duration: 0.3 },
                    }}
                    style={{
                      x,
                      y,
                      rotate: -360 // Counter-rotate the icon so it stays upright
                    }}
                  >
                    {/* Individual icon rotation */}
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{
                        repeat: Infinity,
                        duration: 5,
                        ease: "linear",
                      }}
                    >
                      <tech.icon
                        className={`w-8 h-8 ${tech.color} group-hover:scale-110 transition-transform duration-300`}
                      />
                    </motion.div>

                    {/* Tooltip */}
                    <div className="absolute -top-12 left-1/2 transform -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-card border border-border rounded-lg px-3 py-1 text-sm font-medium whitespace-nowrap z-10">
                      {tech.name}
                      <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-2 h-2 bg-card border-r border-b border-border rotate-45 -mt-1" />
                    </div>

                    {/* Progress circle */}
                    <div className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <svg
                        className="absolute inset-0 w-full h-full"
                        viewBox="0 0 100 100"
                      >
                        <circle
                          cx="50"
                          cy="50"
                          r="45"
                          fill="none"
                          stroke="hsl(var(--border))"
                          strokeWidth="2"
                        />
                        <circle
                          cx="50"
                          cy="50"
                          r="45"
                          fill="none"
                          stroke="hsl(var(--primary))"
                          strokeWidth="2"
                          strokeDasharray={`${tech.proficiency * 2.83} 283`}
                          strokeLinecap="round"
                          transform="rotate(-90 50 50)"
                        />
                      </svg>
                    </div>
                  </motion.div>
                );
              })}
            </motion.div>

            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-32 h-32 bg-gradient-primary rounded-full opacity-20 blur-3xl animate-pulse-glow" />
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 mt-12">
            {techCategories.map((category, index) => (
              <motion.div
                key={category.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 + 0.5 }}
                className="text-center p-6 card-3d"
              >
                <h3 className="text-lg font-semibold mb-3 gradient-text">
                  {category.title}
                </h3>
                <div className="space-y-2">
                  {category.techs.map((tech) => (
                    <div
                      key={tech.name}
                      className="flex items-center justify-between text-sm"
                    >
                      <span className="text-muted-foreground">{tech.name}</span>
                      <div className="flex items-center space-x-1">
                        <div className="w-12 h-1 bg-muted rounded-full overflow-hidden">
                          <div
                            className="h-full bg-gradient-primary rounded-full transition-all duration-1000"
                            style={{ width: `${tech.proficiency}%` }}
                          />
                        </div>
                        <span className="text-xs text-muted-foreground">
                          {tech.proficiency}%
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}