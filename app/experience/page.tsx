"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import {
  ArrowRight,
  Building,
  Calendar,
  MapPin,
  Users,
  Award,
  ExternalLink,
  Briefcase,
  GraduationCap,
  Code,
  Globe,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { GridOverlay } from "@/components/ui/grid-overlay";
import {
  QueryClient,
  QueryClientProvider,
  useQuery,
} from "@tanstack/react-query";
import { githubAPI } from "@/lib/platform-api";

// Experience data type
interface Experience {
  id: string;
  title: string;
  company: string;
  type: "full-time" | "part-time" | "internship" | "freelance" | "contract";
  location: string;
  startDate: string;
  endDate?: string;
  current: boolean;
  description: string;
  achievements: string[];
  technologies: string[];
  companyUrl?: string;
  teamSize?: string;
}

// Education data type
interface Education {
  id: string;
  degree: string;
  institution: string;
  field: string;
  startDate: string;
  endDate?: string;
  current: boolean;
  location: string;
  gpa?: string;
  achievements: string[];
  coursework: string[];
}

// Skills data type
interface SkillCategory {
  category: string;
  skills: {
    name: string;
    level: "beginner" | "intermediate" | "advanced" | "expert";
    yearsOfExperience: number;
  }[];
}

// Dynamic experience data (this would typically come from a CMS or API)
const experienceData: Experience[] = [
  {
    id: "1",
    title: "Full Stack Developer",
    company: "ViewR Technologies",
    type: "full-time",
    location: "Remote",
    startDate: "2023-06",
    current: true,
    description:
      "Leading the development of ViewR, an innovative AR platform that transforms how users interact with digital content in physical spaces.",
    achievements: [
      "Built scalable full-stack architecture serving 1000+ concurrent users",
      "Implemented real-time AR tracking with 99.9% accuracy",
      "Optimized performance resulting in 40% faster load times",
      "Led technical decision-making for product roadmap",
    ],
    technologies: [
      "React",
      "Node.js",
      "TypeScript",
      "PostgreSQL",
      "WebRTC",
      "Three.js",
      "AWS",
    ],
    companyUrl: "https://viewr.tech",
    teamSize: "5-10",
  },
  {
    id: "2",
    title: "Co-Founder & CTO",
    company: "FinalCV",
    type: "full-time",
    location: "India",
    startDate: "2022-08",
    endDate: "2023-05",
    current: false,
    description:
      "Co-founded and led technical development of FinalCV, an AI-powered resume optimization platform helping job seekers create compelling resumes.",
    achievements: [
      "Developed AI-powered resume analysis engine with 95% accuracy",
      "Scaled platform to serve 5000+ users across multiple countries",
      "Built comprehensive analytics dashboard for user insights",
      "Secured partnerships with major job placement agencies",
    ],
    technologies: [
      "Next.js",
      "Python",
      "FastAPI",
      "MongoDB",
      "OpenAI API",
      "Stripe",
      "Vercel",
    ],
    companyUrl: "https://finalcv.com",
    teamSize: "3-5",
  },
  {
    id: "3",
    title: "Software Development Intern",
    company: "TechCorp Solutions",
    type: "internship",
    location: "Bangalore, India",
    startDate: "2022-01",
    endDate: "2022-06",
    current: false,
    description:
      "Contributed to large-scale web applications and gained hands-on experience with modern development practices and agile methodologies.",
    achievements: [
      "Implemented 15+ user-facing features with React and Node.js",
      "Reduced API response times by 30% through optimization",
      "Collaborated with senior developers on code reviews",
      "Participated in daily standups and sprint planning",
    ],
    technologies: ["React", "Node.js", "MySQL", "Docker", "Jenkins", "AWS"],
    teamSize: "10-15",
  },
];

const educationData: Education[] = [
  {
    id: "1",
    degree: "Bachelor of Technology",
    institution: "Himachal Pradesh Technical University",
    field: "Computer Science & Engineering",
    startDate: "2020-08",
    endDate: "2024-06",
    current: false,
    location: "Himachal Pradesh, India",
    gpa: "8.5/10",
    achievements: [
      "Dean's List for academic excellence (4 semesters)",
      "Led university coding club with 200+ members",
      "Organized technical workshops and coding competitions",
      "Published research paper on machine learning applications",
    ],
    coursework: [
      "Data Structures & Algorithms",
      "Database Management Systems",
      "Computer Networks",
      "Machine Learning",
      "Software Engineering",
      "Operating Systems",
    ],
  },
];

const skillsData: SkillCategory[] = [
  {
    category: "Programming Languages",
    skills: [
      { name: "JavaScript/TypeScript", level: "expert", yearsOfExperience: 4 },
      { name: "Python", level: "advanced", yearsOfExperience: 3 },
      { name: "Java", level: "intermediate", yearsOfExperience: 2 },
      { name: "C++", level: "intermediate", yearsOfExperience: 2 },
    ],
  },
  {
    category: "Frontend Development",
    skills: [
      { name: "React/Next.js", level: "expert", yearsOfExperience: 4 },
      { name: "Vue.js", level: "intermediate", yearsOfExperience: 2 },
      { name: "HTML/CSS", level: "expert", yearsOfExperience: 5 },
      { name: "Tailwind CSS", level: "advanced", yearsOfExperience: 3 },
    ],
  },
  {
    category: "Backend Development",
    skills: [
      { name: "Node.js", level: "expert", yearsOfExperience: 4 },
      { name: "Express.js", level: "advanced", yearsOfExperience: 3 },
      { name: "FastAPI", level: "advanced", yearsOfExperience: 2 },
      { name: "PostgreSQL", level: "advanced", yearsOfExperience: 3 },
    ],
  },
  {
    category: "Cloud & DevOps",
    skills: [
      { name: "AWS", level: "advanced", yearsOfExperience: 3 },
      { name: "Docker", level: "intermediate", yearsOfExperience: 2 },
      { name: "Vercel", level: "advanced", yearsOfExperience: 3 },
      { name: "GitHub Actions", level: "intermediate", yearsOfExperience: 2 },
    ],
  },
];

// Experience Card Component
function ExperienceCard({ experience }: { experience: Experience }) {
  const getTypeColor = (type: string) => {
    switch (type) {
      case "full-time":
        return "bg-green-500/20 text-green-400";
      case "part-time":
        return "bg-blue-500/20 text-blue-400";
      case "internship":
        return "bg-purple-500/20 text-purple-400";
      case "freelance":
        return "bg-orange-500/20 text-orange-400";
      case "contract":
        return "bg-yellow-500/20 text-yellow-400";
      default:
        return "bg-gray-500/20 text-gray-400";
    }
  };

  const formatDate = (date: string) => {
    return new Date(date).toLocaleDateString("en-US", {
      month: "short",
      year: "numeric",
    });
  };

  return (
    <div className="bg-figma-menu border border-white/10 rounded-lg p-6 hover:border-figma-purple/30 transition-all duration-300 group">
      <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between mb-4">
        <div className="flex-1">
          <div className="flex items-center gap-3 mb-2">
            <h3 className="text-xl font-bold text-white group-hover:text-figma-purple transition-colors duration-300">
              {experience.title}
            </h3>
            {experience.companyUrl && (
              <Link
                href={experience.companyUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="opacity-0 group-hover:opacity-100 transition-opacity duration-300"
              >
                <ExternalLink className="w-4 h-4 text-figma-purple" />
              </Link>
            )}
          </div>

          <div className="flex items-center gap-2 text-white/70 mb-2">
            <Building className="w-4 h-4" />
            <span className="font-medium">{experience.company}</span>
            {experience.teamSize && (
              <>
                <span>•</span>
                <Users className="w-4 h-4" />
                <span>{experience.teamSize} people</span>
              </>
            )}
          </div>

          <div className="flex flex-wrap items-center gap-4 text-sm text-white/60 mb-3">
            <div className="flex items-center gap-1">
              <Calendar className="w-4 h-4" />
              <span>
                {formatDate(experience.startDate)} -{" "}
                {experience.current
                  ? "Present"
                  : formatDate(experience.endDate!)}
              </span>
            </div>
            <div className="flex items-center gap-1">
              <MapPin className="w-4 h-4" />
              <span>{experience.location}</span>
            </div>
          </div>
        </div>

        <Badge
          className={`${getTypeColor(experience.type)} border-0 capitalize`}
        >
          {experience.type.replace("-", " ")}
        </Badge>
      </div>

      <p className="text-white/80 mb-4 leading-relaxed">
        {experience.description}
      </p>

      <div className="space-y-4">
        <div>
          <h4 className="text-sm font-semibold text-white mb-2 flex items-center gap-2">
            <Award className="w-4 h-4 text-figma-purple" />
            Key Achievements
          </h4>
          <ul className="space-y-1">
            {experience.achievements.map((achievement, index) => (
              <li
                key={index}
                className="flex items-start gap-2 text-white/70 text-sm"
              >
                <div className="w-1.5 h-1.5 bg-figma-gradient rounded-full mt-2 flex-shrink-0" />
                <span>{achievement}</span>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="text-sm font-semibold text-white mb-2 flex items-center gap-2">
            <Code className="w-4 h-4 text-figma-purple" />
            Technologies Used
          </h4>
          <div className="flex flex-wrap gap-2">
            {experience.technologies.map((tech, index) => (
              <Badge
                key={index}
                variant="outline"
                className="border-white/20 text-white/70 text-xs"
              >
                {tech}
              </Badge>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

// Education Card Component
function EducationCard({ education }: { education: Education }) {
  const formatDate = (date: string) => {
    return new Date(date).toLocaleDateString("en-US", {
      month: "short",
      year: "numeric",
    });
  };

  return (
    <div className="bg-figma-menu border border-white/10 rounded-lg p-6 hover:border-figma-purple/30 transition-all duration-300">
      <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between mb-4">
        <div className="flex-1">
          <h3 className="text-xl font-bold text-white mb-2">
            {education.degree}
          </h3>

          <div className="flex items-center gap-2 text-white/70 mb-2">
            <GraduationCap className="w-4 h-4" />
            <span className="font-medium">{education.institution}</span>
          </div>

          <div className="flex flex-wrap items-center gap-4 text-sm text-white/60 mb-3">
            <div className="flex items-center gap-1">
              <Calendar className="w-4 h-4" />
              <span>
                {formatDate(education.startDate)} -{" "}
                {education.current ? "Present" : formatDate(education.endDate!)}
              </span>
            </div>
            <div className="flex items-center gap-1">
              <MapPin className="w-4 h-4" />
              <span>{education.location}</span>
            </div>
          </div>
        </div>

        {education.gpa && (
          <Badge className="bg-figma-purple/20 text-figma-purple border-0">
            GPA: {education.gpa}
          </Badge>
        )}
      </div>

      <div className="text-white/70 mb-4">
        <span className="font-medium">Field of Study:</span> {education.field}
      </div>

      <div className="space-y-4">
        <div>
          <h4 className="text-sm font-semibold text-white mb-2 flex items-center gap-2">
            <Award className="w-4 h-4 text-figma-purple" />
            Achievements
          </h4>
          <ul className="space-y-1">
            {education.achievements.map((achievement, index) => (
              <li
                key={index}
                className="flex items-start gap-2 text-white/70 text-sm"
              >
                <div className="w-1.5 h-1.5 bg-figma-gradient rounded-full mt-2 flex-shrink-0" />
                <span>{achievement}</span>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="text-sm font-semibold text-white mb-2 flex items-center gap-2">
            <Code className="w-4 h-4 text-figma-purple" />
            Relevant Coursework
          </h4>
          <div className="flex flex-wrap gap-2">
            {education.coursework.map((course, index) => (
              <Badge
                key={index}
                variant="outline"
                className="border-white/20 text-white/70 text-xs"
              >
                {course}
              </Badge>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

// Skills Section Component
function SkillsSection() {
  const getLevelColor = (level: string) => {
    switch (level) {
      case "expert":
        return "bg-red-500";
      case "advanced":
        return "bg-orange-500";
      case "intermediate":
        return "bg-yellow-500";
      case "beginner":
        return "bg-green-500";
      default:
        return "bg-gray-500";
    }
  };

  const getLevelWidth = (level: string) => {
    switch (level) {
      case "expert":
        return "100%";
      case "advanced":
        return "75%";
      case "intermediate":
        return "50%";
      case "beginner":
        return "25%";
      default:
        return "0%";
    }
  };

  return (
    <div className="space-y-8">
      {skillsData.map((category, categoryIndex) => (
        <div
          key={categoryIndex}
          className="bg-figma-menu border border-white/10 rounded-lg p-6"
        >
          <h3 className="text-xl font-bold text-white mb-6">
            {category.category}
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {category.skills.map((skill, skillIndex) => (
              <div key={skillIndex} className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-white font-medium">{skill.name}</span>
                  <div className="flex items-center gap-2">
                    <span className="text-white/60 text-sm capitalize">
                      {skill.level}
                    </span>
                    <span className="text-white/40 text-xs">
                      ({skill.yearsOfExperience}y)
                    </span>
                  </div>
                </div>
                <div className="w-full bg-white/10 rounded-full h-2">
                  <div
                    className={`h-2 rounded-full transition-all duration-500 ${getLevelColor(
                      skill.level
                    )}`}
                    style={{ width: getLevelWidth(skill.level) }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

export default function Experience() {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        retry: 2,
        staleTime: 1000 * 60 * 5, // 5 minutes
        refetchOnWindowFocus: false,
      },
    },
  });

  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <div className="min-h-screen bg-figma-dark">
        {/* Hero Section */}
        <section className="relative py-20 overflow-hidden">
          <GridOverlay />

          <div className="figma-container relative z-10">
            <div className="text-center max-w-4xl mx-auto">
              <h1
                className={`text-[60px] md:text-[80px] lg:text-[100px] font-bold leading-[0.9] text-white font-poppins mb-6 transition-all duration-1000 delay-300 ${
                  mounted
                    ? "opacity-100 translate-y-0"
                    : "opacity-0 translate-y-12"
                }`}
              >
                Professional{" "}
                <span className="text-figma-gradient bg-clip-text text-transparent">
                  Experience
                </span>
              </h1>

              <p
                className={`text-xl md:text-2xl font-normal leading-[32px] text-white/80 font-poppins mb-12 max-w-[700px] mx-auto transition-all duration-800 delay-600 ${
                  mounted
                    ? "opacity-100 translate-y-0"
                    : "opacity-0 translate-y-8"
                }`}
              >
                Explore my journey through software development, from
                co-founding innovative startups to building scalable solutions
                that impact thousands of users worldwide.
              </p>

              <div
                className={`flex flex-col sm:flex-row gap-4 justify-center transition-all duration-600 delay-900 ${
                  mounted ? "opacity-100 scale-100" : "opacity-0 scale-75"
                }`}
              >
                <Button
                  asChild
                  className="bg-figma-gradient hover:bg-figma-gradient/90 text-black font-medium text-lg px-8 py-4 h-auto rounded-full transition-all duration-300 hover:scale-105"
                >
                  <Link href="/contact">
                    <Briefcase className="mr-2 w-5 h-5" />
                    Let's Work Together
                  </Link>
                </Button>

                <Button
                  asChild
                  variant="outline"
                  className="border-white hover:border-transparent text-white hover:text-black bg-transparent hover:bg-figma-gradient font-medium text-lg px-8 py-4 h-auto rounded-full transition-all duration-300 hover:scale-105"
                >
                  <Link href="/projects">
                    <Globe className="mr-2 w-5 h-5" />
                    View My Work
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Experience Timeline */}
        <section className="py-16">
          <div className="figma-container">
            <div
              className={`mb-12 transition-all duration-1000 delay-400 ${
                mounted
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-12"
              }`}
            >
              <h2 className="text-4xl font-bold text-white mb-4 font-poppins text-center">
                Work <span className="text-figma-gradient">Experience</span>
              </h2>
              <p className="text-white/70 text-center max-w-2xl mx-auto text-lg">
                A timeline of my professional journey, highlighting key roles,
                achievements, and the technologies I've mastered along the way.
              </p>
            </div>

            <div className="space-y-8">
              {experienceData.map((experience, index) => (
                <div
                  key={experience.id}
                  className={`transition-all duration-1000 ${
                    mounted
                      ? "opacity-100 translate-y-0"
                      : "opacity-0 translate-y-12"
                  }`}
                  style={{ transitionDelay: `${600 + index * 200}ms` }}
                >
                  <ExperienceCard experience={experience} />
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Education Section */}
        <section className="py-16">
          <div className="figma-container">
            <div
              className={`mb-12 transition-all duration-1000 delay-800 ${
                mounted
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-12"
              }`}
            >
              <h2 className="text-4xl font-bold text-white mb-4 font-poppins text-center">
                Academic <span className="text-figma-gradient">Background</span>
              </h2>
              <p className="text-white/70 text-center max-w-2xl mx-auto text-lg">
                My educational foundation in computer science and the academic
                achievements that shaped my technical expertise.
              </p>
            </div>

            <div className="space-y-8">
              {educationData.map((education, index) => (
                <div
                  key={education.id}
                  className={`transition-all duration-1000 ${
                    mounted
                      ? "opacity-100 translate-y-0"
                      : "opacity-0 translate-y-12"
                  }`}
                  style={{ transitionDelay: `${1000 + index * 200}ms` }}
                >
                  <EducationCard education={education} />
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Skills Section */}
        <section className="py-16">
          <div className="figma-container">
            <div
              className={`mb-12 transition-all duration-1000 delay-1200 ${
                mounted
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-12"
              }`}
            >
              <h2 className="text-4xl font-bold text-white mb-4 font-poppins text-center">
                Technical <span className="text-figma-gradient">Skills</span>
              </h2>
              <p className="text-white/70 text-center max-w-2xl mx-auto text-lg">
                A comprehensive overview of my technical expertise, organized by
                category and proficiency level developed over years of hands-on
                experience.
              </p>
            </div>

            <div
              className={`transition-all duration-1000 delay-1400 ${
                mounted
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-12"
              }`}
            >
              <SkillsSection />
            </div>
          </div>
        </section>

        {/* Call to Action */}
        <section className="py-16">
          <div className="figma-container">
            <div
              className={`text-center transition-all duration-1000 delay-1600 ${
                mounted
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-12"
              }`}
            >
              <div className="bg-figma-menu border border-white/10 rounded-lg p-12">
                <h2 className="text-3xl font-bold text-white mb-6 font-poppins">
                  Ready to Work Together?
                </h2>
                <p className="text-white/70 mb-8 max-w-2xl mx-auto text-lg">
                  I'm always open to discussing new opportunities, challenging
                  projects, and innovative ideas. Let's create something amazing
                  together!
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button
                    asChild
                    className="bg-figma-gradient hover:bg-figma-gradient/90 text-black font-medium text-lg px-8 py-4 h-auto rounded-full transition-all duration-300 hover:scale-105"
                  >
                    <Link href="/contact">
                      Start a Conversation
                      <ArrowRight className="ml-2 w-5 h-5" />
                    </Link>
                  </Button>
                  <Button
                    asChild
                    variant="outline"
                    className="border-white hover:border-transparent text-white hover:text-black bg-transparent hover:bg-figma-gradient font-medium text-lg px-8 py-4 h-auto rounded-full transition-all duration-300 hover:scale-105"
                  >
                    <Link href="/competitive">View Coding Stats</Link>
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </QueryClientProvider>
  );
}
