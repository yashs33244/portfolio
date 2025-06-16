"use client";

import { useState, useEffect } from "react";
import { Badge } from "@/components/ui/badge";
import { Code, Database, Palette, Cloud, Brain, Settings } from "lucide-react";

const skills = [
  {
    category: "Programming Languages",
    icon: Code,
    items: [
      { name: "Python", level: 90 },
      { name: "JavaScript", level: 85 },
      { name: "TypeScript", level: 85 },
      { name: "C++", level: 80 },
      { name: "C", level: 75 },
      { name: "HTML/CSS", level: 90 },
    ],
  },
  {
    category: "Backend & Databases",
    icon: Database,
    items: [
      { name: "Node.js", level: 85 },
      { name: "Express.js", level: 80 },
      { name: "PostgreSQL", level: 85 },
      { name: "MongoDB", level: 80 },
      { name: "Redis", level: 75 },
      { name: "Prisma ORM", level: 85 },
      { name: "REST APIs", level: 90 },
      { name: "GraphQL", level: 75 },
    ],
  },
  {
    category: "Frontend & Web",
    icon: Palette,
    items: [
      { name: "React.js", level: 90 },
      { name: "Next.js", level: 85 },
      { name: "Tailwind CSS", level: 85 },
      { name: "WebRTC", level: 75 },
      { name: "Web3.js", level: 70 },
      { name: "Recoil", level: 80 },
      { name: "Material UI", level: 80 },
      { name: "shadcn/ui", level: 85 },
    ],
  },
  {
    category: "DevOps & Cloud",
    icon: Cloud,
    items: [
      { name: "Docker", level: 85 },
      { name: "Kubernetes", level: 80 },
      { name: "AWS", level: 80 },
      { name: "GCP", level: 75 },
      { name: "CI/CD", level: 85 },
      { name: "Helm Charts", level: 75 },
      { name: "Git/GitHub", level: 90 },
      { name: "GitLab", level: 80 },
    ],
  },
  {
    category: "Machine Learning",
    icon: Brain,
    items: [
      { name: "NumPy", level: 85 },
      { name: "Pandas", level: 85 },
      { name: "Scikit-learn", level: 80 },
      { name: "Matplotlib", level: 80 },
      { name: "Seaborn", level: 75 },
      { name: "LLMs", level: 75 },
      { name: "NLP", level: 70 },
      { name: "GNN", level: 70 },
    ],
  },
  {
    category: "Tools & Technologies",
    icon: Settings,
    items: [
      { name: "VS Code", level: 90 },
      { name: "Postman", level: 85 },
      { name: "Figma", level: 75 },
      { name: "Jira", level: 80 },
      { name: "OpenAPI Spec", level: 80 },
      { name: "Turborepo", level: 75 },
      { name: "Firebase", level: 80 },
      { name: "Cloudflare", level: 75 },
    ],
  },
];

export default function SkillsDetailed() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
      {skills.map((category, categoryIndex) => {
        const IconComponent = category.icon;
        return (
          <div
            key={category.category}
            className={`bg-figma-menu border border-white/10 rounded-lg p-8 hover:border-figma-purple/30 transition-all duration-500 group ${
              mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            }`}
            style={{ transitionDelay: `${categoryIndex * 100}ms` }}
          >
            {/* Category Header */}
            <div className="flex items-center gap-4 mb-6">
              <div className="w-12 h-12 bg-figma-gradient rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                <IconComponent className="w-6 h-6 text-black" />
              </div>
              <h3 className="text-xl font-bold text-white font-poppins group-hover:text-figma-gradient transition-colors duration-300">
                {category.category}
              </h3>
            </div>

            {/* Skills Grid */}
            <div className="grid grid-cols-2 gap-3">
              {category.items.map((skill, skillIndex) => (
                <div
                  key={skill.name}
                  className={`transition-all duration-300 delay-${
                    skillIndex * 50
                  } ${
                    mounted ? "opacity-100 scale-100" : "opacity-0 scale-95"
                  }`}
                >
                  <div className="bg-figma-dark rounded-lg p-3 hover:bg-figma-purple/10 transition-all duration-300 group/skill">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-white/90 text-sm font-medium group-hover/skill:text-white transition-colors">
                        {skill.name}
                      </span>
                      <span className="text-figma-purple text-xs font-bold">
                        {skill.level}%
                      </span>
                    </div>

                    {/* Progress Bar */}
                    <div className="w-full bg-white/10 rounded-full h-1.5 overflow-hidden">
                      <div
                        className={`bg-figma-gradient rounded-full h-full transition-all duration-1000 ease-out ${
                          mounted ? "" : "w-0"
                        }`}
                        style={{
                          width: mounted ? `${skill.level}%` : "0%",
                          transitionDelay: `${
                            categoryIndex * 100 + skillIndex * 50 + 200
                          }ms`,
                        }}
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Category Footer */}
            <div className="mt-6 pt-6 border-t border-white/10">
              <div className="flex items-center justify-between">
                <span className="text-white/60 text-sm">
                  {category.items.length} Technologies
                </span>
                <div className="flex items-center gap-1">
                  <div className="w-2 h-2 bg-figma-gradient rounded-full animate-pulse" />
                  <span className="text-figma-purple text-sm font-medium">
                    Expert Level
                  </span>
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
