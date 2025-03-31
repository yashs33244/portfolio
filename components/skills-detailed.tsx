import { Badge } from "@/components/ui/badge";

const skills = [
  {
    category: "Programming Languages",
    color: "amber",
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
    color: "orange",
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
    color: "rose",
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
    color: "blueviolet",
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
    color: "azure",
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
    color: "amber",
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
  return (
    <section className="py-16 bg-gray-50">
      <div className="container max-w-6xl mx-auto px-4">
        <div className="mb-10">
          <h2 className="text-3xl font-bold text-gray-800 mb-3">
            Technical Expertise
          </h2>
          <p className="text-gray-600 max-w-3xl">
            A comprehensive overview of my technical skills across software
            development, cloud infrastructure, and machine learning. Proficient
            in building scalable applications, implementing secure
            authentication systems, and developing innovative solutions using
            cutting-edge technologies.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {skills.map((category) => (
            <div
              key={category.category}
              className="bg-white border border-gray-200 rounded-lg shadow-sm overflow-hidden hover:shadow-md transition-all duration-300"
            >
              <div className={`h-1.5 bg-${category.color}-500`}></div>
              <div className="p-6">
                <h3
                  className={`text-xl font-semibold mb-4 text-${category.color}-600`}
                >
                  {category.category}
                </h3>
                <div className="flex flex-wrap gap-2">
                  {category.items.map((item) => (
                    <Badge
                      key={item.name}
                      variant="outline"
                      className={`bg-white border border-${category.color}-200 text-gray-700 hover:bg-${category.color}-50 transition-colors py-1`}
                    >
                      {item.name}
                    </Badge>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-12 text-center">
          <p className="text-gray-600">
            Proven track record in developing secure and scalable applications,
            with expertise in cloud infrastructure, microservices architecture,
            and machine learning. Continuously expanding knowledge through
            professional experience and competitive programming achievements.
          </p>
        </div>
      </div>
    </section>
  );
}
