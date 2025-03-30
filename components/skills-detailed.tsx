import { Badge } from "@/components/ui/badge";

const skillCategories = [
  {
    name: "Programming Languages",
    color: "amber",
    skills: [
      "Python",
      "JavaScript",
      "TypeScript",
      "C++",
      "C",
      "HTML/CSS",
      "SQL",
    ],
  },
  {
    name: "Frontend Technologies",
    color: "orange",
    skills: [
      "React.js",
      "Next.js",
      "Tailwind CSS",
      "Redux",
      "Recoil",
      "WebRTC",
      "Material UI",
      "Bootstrap",
      "shadcn/ui",
    ],
  },
  {
    name: "Backend & Databases",
    color: "rose",
    skills: [
      "Node.js",
      "Express.js",
      "Prisma ORM",
      "PostgreSQL",
      "MongoDB",
      "MySQL",
      "Firebase",
      "Redis",
      "REST APIs",
      "GraphQL",
      "WebSockets",
      "next-auth",
      "JWT",
      "Redis",
      "AWS S3",
      "AWS ECR",
      "AWS EKS",
    ],
  },
  {
    name: "DevOps & Cloud",
    color: "blueviolet",
    skills: [
      "Docker",
      "Kubernetes",
      "Docker Swarm",
      "AWS",
      "GCP",
      "CI/CD",
      "GitLab CI/CD",
      "Git/GitHub",
      "Helm Charts",
      "Linux/Unix",
      "Bash",
      "Route53",
      "Cloudflare",
      "Microservices",
    ],
  },
  {
    name: "Data Science & ML",
    color: "azure",
    skills: [
      "NumPy",
      "Pandas",
      "Matplotlib",
      "Scikit-learn",
      "Seaborn",
      "LLMs",
      "NLP",
      "GNN",
      "Keras",
      "Deep Learning",
      "SMOTE",
      "Gemini API",
    ],
  },
  {
    name: "Architecture & Tools",
    color: "amber",
    skills: [
      "Turborepo",
      "OpenAPI Spec",
      "Postman",
      "Figma",
      "DevOps",
      "Agile Methodologies",
      "Jira",
      "Notion",
      "Jupyter Notebook",
      "VS Code",
      "Algorithm Design",
      "System Design",
    ],
  },
];

export default function SkillsDetailed() {
  return (
    <section className="py-16 bg-gray-50">
      <div className="container max-w-6xl mx-auto px-4">
        <div className="mb-10">
          <h2 className="text-3xl font-bold text-gray-800 mb-3">
            Technical Expertise
          </h2>
          <p className="text-gray-600 max-w-3xl">
            A comprehensive overview of my technical skills across software
            development, cloud infrastructure, and data science gained through
            practical experience and academic projects.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {skillCategories.map((category) => (
            <div
              key={category.name}
              className="bg-white border border-gray-200 rounded-lg shadow-sm overflow-hidden hover:shadow-md transition-all duration-300"
            >
              <div className={`h-1.5 bg-${category.color}-500`}></div>
              <div className="p-6">
                <h3
                  className={`text-xl font-semibold mb-4 text-${category.color}-600`}
                >
                  {category.name}
                </h3>
                <div className="flex flex-wrap gap-2">
                  {category.skills.map((skill) => (
                    <Badge
                      key={skill}
                      variant="outline"
                      className={`bg-white border border-${category.color}-200 text-gray-700 hover:bg-${category.color}-50 transition-colors py-1`}
                    >
                      {skill}
                    </Badge>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-12 text-center">
          <p className="text-gray-600">
            Solved 450+ problems on LeetCode, showcasing strong algorithm design
            and problem-solving abilities. Continuously expanding expertise
            through professional experience and self-directed learning.
          </p>
        </div>
      </div>
    </section>
  );
}
