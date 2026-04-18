import { motion } from "framer-motion";
import { ComponentType, CSSProperties } from "react";
import {
  SiReact, SiTypescript, SiNextdotjs, SiNodedotjs, SiMongodb, SiGit, SiGithub,
  SiPython, SiCplusplus, SiJavascript, SiPostman, SiUbuntu,
  SiMysql, SiLeetcode, SiCodechef 
} from "react-icons/si";
import { FaJava, FaWindows } from "react-icons/fa";

const aboutHighlights = [
  { label: "EDUCATION", value: "B.Tech CSE - Final Year", color: "#00FF41" },
  { label: "INSTITUTE", value: "RCPIT, Shirpur", color: "#00F5FF" },
  { label: "FOCUS", value: "Web, App Dev & SWE", color: "#0786D8" },
  { label: "STATUS", value: "Exploring ML & New Tech", color: "#FF9900" },
];

type Tech = { name: string; icon: ComponentType<{ className?: string; style?: CSSProperties }>; color: string };

const row1: Tech[] = [
  { name: "C", icon: SiCplusplus, color: "#A8B9CC" },
  { name: "C++", icon: SiCplusplus, color: "#00599C" },
  { name: "JAVA", icon: FaJava, color: "#007396" },
  { name: "JAVASCRIPT", icon: SiJavascript, color: "#F7DF1E" },
  { name: "TYPESCRIPT", icon: SiTypescript, color: "#3178C6" },
  { name: "PYTHON", icon: SiPython, color: "#3776AB" },
  { name: "REACT", icon: SiReact, color: "#61DAFB" },
  { name: "NODE.JS", icon: SiNodedotjs, color: "#339933" },
  { name: "NEXT.JS", icon: SiNextdotjs, color: "#E8EDF3" },
];

const row2: Tech[] = [
  { name: "MONGODB", icon: SiMongodb, color: "#47A248" },
  { name: "SQL", icon: SiMysql, color: "#4479A1" },
  { name: "GIT", icon: SiGit, color: "#F05032" },
  { name: "GITHUB", icon: SiGithub, color: "#E8EDF3" },
  { name: "POSTMAN", icon: SiPostman, color: "#FF6C37" },
  { name: "UBUNTU", icon: SiUbuntu, color: "#E95420" },
  { name: "WINDOWS", icon: FaWindows, color: "#0078D6" },
];

const doubled1: Tech[] = [...row1, ...row1, ...row1];
const doubled2: Tech[] = [...row2, ...row2, ...row2];

function TechPill({ name, icon: Icon, color }: Tech) {
  return (
    <div
      className="flex items-center gap-2 px-4 py-2 rounded flex-shrink-0 group cursor-default transition-all duration-200"
      style={{
        background: "rgba(13,17,23,0.7)",
        border: "1px solid rgba(0,245,255,0.12)",
      }}
      onMouseEnter={(e) => {
        const el = e.currentTarget as HTMLElement;
        el.style.borderColor = `${color}50`;
        el.style.boxShadow = `0 0 12px ${color}20`;
      }}
      onMouseLeave={(e) => {
        const el = e.currentTarget as HTMLElement;
        el.style.borderColor = "rgba(0,245,255,0.12)";
        el.style.boxShadow = "none";
      }}
    >
      <Icon className="w-4 h-4 flex-shrink-0" style={{ color }} />
      <span
        className="font-mono text-xs whitespace-nowrap font-semibold tracking-wider"
        style={{ color: "rgba(232,237,243,0.75)" }}
      >
        {name}
      </span>
    </div>
  );
}

export default function TechStack() {
  return (
    <section id="about" className="section-padding grid-bg">
      <div className="container-custom">

        {/* ── ABOUT CARD ── */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.15, margin: "-60px" }}
          transition={{ duration: 1.0, ease: [0.22, 1, 0.36, 1] }}
          className="mb-20"
        >
          {/* Section label */}
          <div className="mb-8">
            <p className="font-mono text-xs tracking-widest mb-2" style={{ color: "rgba(0,245,255,0.5)" }}>
              FILE: ABOUT.TXT
            </p>
            <div className="h-px w-20 mt-1" style={{ background: "linear-gradient(90deg, #00F5FF, transparent)" }} />
          </div>

          <div className="grid lg:grid-cols-2 gap-10 items-start">
            {/* Left: Text */}
            <div>
              <h2
                className="text-2xl md:text-3xl font-bold mb-4 leading-snug"
                style={{ color: "#E8EDF3", fontFamily: "Inter, sans-serif" }}
              >
                Final year B.Tech Computer Science and Engineering student at R. C. Patel Institute of Technology, Shirpur.
              </h2>
              <p
                className="text-sm leading-relaxed mb-6"
                style={{ color: "rgba(232,237,243,0.5)", fontFamily: "Inter, sans-serif" }}
              >
                Passionate about building innovative solutions and exploring new technologies, I focus on web development, app development, and software engineering. I also have a foundational knowledge of Machine Learning.
              </p>

              <div className="flex flex-wrap gap-3 mb-6">
                <motion.a
                  href="https://drive.google.com/file/d/1VwNaH1t4zrD8TYgpoN7JIpu_ed5Bb0Pu/view"
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.04, y: -1 }}
                  whileTap={{ scale: 0.97 }}
                  className="btn-terminal flex items-center gap-2 text-xs"
                  style={{ padding: "0.5rem 1.25rem", fontSize: "0.72rem" }}
                >
                  ▶ RESUME.PDF
                </motion.a>
              </div>

              {/* Profiles */}
              <div className="flex items-center gap-3">
                <p className="font-mono text-xs text-[#00F5FF]/70 mr-2">PROFILES:</p>
                <a href="https://github.com/chaudhariGaurav07" target="_blank" rel="noreferrer" className="text-[#E8EDF3] hover:text-[#00F5FF] transition-colors"><SiGithub size={20} title="GitHub" /></a>
                <a href="https://leetcode.com/u/_chaudharigaurav/" target="_blank" rel="noreferrer" className="text-[#FFA500] hover:text-[#00F5FF] transition-colors"><SiLeetcode size={20} title="LeetCode" /></a>
                <a href="https://www.codechef.com/users/gaurav_7717" target="_blank" rel="noreferrer" className="text-[#5B4638] hover:text-[#00F5FF] transition-colors"><SiCodechef size={20} title="CodeChef" /></a>
              </div>
            </div>

            {/* Right: Stat cards */}
            <div className="grid grid-cols-2 gap-3">
              {aboutHighlights.map((item, i) => (
                <motion.div
                  key={item.label}
                  initial={{ opacity: 0, scale: 0.95 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: false, amount: 0.15, margin: "-60px" }}
                  transition={{ duration: 0.85, delay: i * 0.12, ease: [0.22, 1, 0.36, 1] }}
                  className="rounded-lg p-4 flex flex-col justify-center"
                  style={{
                    background: "rgba(0,245,255,0.03)",
                    border: "1px solid rgba(0,245,255,0.1)",
                  }}
                >
                  <p className="font-mono text-[10px] tracking-widest mb-1.5" style={{ color: "rgba(0,245,255,0.4)" }}>
                    {item.label}
                  </p>
                  <p className="font-mono text-sm font-semibold" style={{ color: item.color }}>
                    {item.value}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* ── TECH STACK MARQUEE ── */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.15, margin: "-60px" }}
          transition={{ duration: 1.0, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className="mb-6">
            <p className="font-mono text-xs tracking-widest mb-1" style={{ color: "rgba(0,245,255,0.5)" }}>
              TECH_SKILLS & TOOLS --list-all
            </p>
            <div className="h-px w-16 mt-1" style={{ background: "linear-gradient(90deg, #00FF41, transparent)" }} />
          </div>

          {/* Marquee rows */}
          <div
            className="space-y-3 overflow-hidden"
            style={{ maskImage: "linear-gradient(90deg, transparent, black 8%, black 92%, transparent)" }}
          >
            <div className="flex gap-3 marquee-track">
              {doubled1.map((tech, i) => (
                <TechPill key={`r1-${i}`} {...tech} />
              ))}
            </div>
            <div className="flex gap-3 marquee-track-reverse">
              {doubled2.map((tech, i) => (
                <TechPill key={`r2-${i}`} {...tech} />
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}