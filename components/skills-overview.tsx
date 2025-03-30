import { Badge } from "@/components/ui/badge";

const skillCategories = [
  {
    name: "Languages",
    color: "amber",
    skills: [
      "Python",
      "JavaScript",
      "TypeScript",
      "C",
      "C++",
      "HTML",
      "CSS",
      "SQL",
    ],
  },
  {
    name: "Frontend Development",
    color: "orange",
    skills: [
      "React.js",
      "Next.js",
      "Tailwind CSS",
      "Material UI",
      "Redux",
      "Context API",
      "WebRTC",
    ],
  },
  {
    name: "Backend Development",
    color: "rose",
    skills: [
      "Node.js",
      "Express.js",
      "REST APIs",
      "GraphQL",
      "Microservices",
      "WebSockets",
      "Socket.io",
    ],
  },
  {
    name: "Databases & Storage",
    color: "blueviolet",
    skills: [
      "MongoDB",
      "PostgreSQL",
      "MySQL",
      "Redis",
      "Firebase",
      "Prisma ORM",
    ],
  },
  {
    name: "DevOps & Cloud",
    color: "azure",
    skills: [
      "Docker",
      "Kubernetes",
      "AWS",
      "GCP",
      "CI/CD",
      "Cloudflare",
      "Helm Charts",
      "Linux",
      "Bash",
      "Git",
    ],
  },
];

export default function SkillsOverview() {
  return (
    <section className="py-14 border-t bg-gray-50">
      <div className="container max-w-6xl mx-auto">
        <h2 className="text-3xl font-bold mb-2 text-gray-800">
          Technical Expertise
        </h2>
        <p className="text-gray-600 mb-10 max-w-3xl">
          A comprehensive overview of my technical skills and proficiencies
          across various domains of software development.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {skillCategories.map((category) => (
            <div
              key={category.name}
              className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-shadow duration-300"
            >
              <div className={`h-2 bg-${category.color}-500`}></div>
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
                      className={`bg-white border border-${category.color}-200 text-gray-700 hover:bg-${category.color}-50 transition-colors py-1.5`}
                    >
                      {skill}
                    </Badge>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-16 text-center">
          <p className="text-gray-600">
            Committed to continuous learning and staying updated with the latest
            industry trends and technologies.
          </p>
        </div>
      </div>
    </section>
  );
}
