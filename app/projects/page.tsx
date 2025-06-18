"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { ExternalLink, Github, Eye, ArrowRight, Settings } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { GridOverlay } from "@/components/ui/grid-overlay";

interface Project {
  id: string;
  title: string;
  slug: string;
  description: string;
  coverImage?: string;
  liveLink?: string;
  githubLink: string;
  demoLink?: string;
  technologies: string[];
  featured: boolean;
  published: boolean;
  createdAt: string;
}

export default function ProjectsPage() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    try {
      const response = await fetch("/api/projects");
      if (response.ok) {
        const data = await response.json();
        setProjects(data.projects);
      }
    } catch (error) {
      console.error("Failed to fetch projects:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
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
              My{" "}
              <span className="text-figma-gradient bg-clip-text text-transparent">
                Projects
              </span>
            </h1>

            <p
              className={`text-xl md:text-2xl font-normal leading-[32px] text-white/80 font-poppins mb-12 max-w-[600px] mx-auto transition-all duration-800 delay-600 ${
                mounted
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-8"
              }`}
            >
              A showcase of my latest work in web development, full-stack
              applications, and data science projects.
            </p>

            <Button
              asChild
              className={`bg-figma-gradient hover:bg-figma-gradient/90 text-black font-medium text-lg px-8 py-4 h-auto rounded-full transition-all duration-600 delay-900 hover:scale-105 ${
                mounted ? "opacity-100 scale-100" : "opacity-0 scale-75"
              }`}
            >
              <Link href="/contact">
                Let's Work Together
                <ArrowRight className="ml-2 w-5 h-5" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section className="py-20">
        <div className="figma-container">
          {isLoading ? (
            <div className="text-center py-20">
              <div className="text-white text-xl">Loading projects...</div>
            </div>
          ) : projects.length === 0 ? (
            <div className="text-center py-20">
              <div className="text-white/70 text-xl mb-4">
                No projects found
              </div>
              <p className="text-white/50">Check back soon for new projects!</p>
            </div>
          ) : (
            <>
              {/* Featured Projects */}
              {projects.some((project) => project.featured) && (
                <div className="mb-16">
                  <h2 className="text-3xl font-bold text-white mb-8 font-poppins">
                    Featured Projects
                  </h2>
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    {projects
                      .filter((project) => project.featured)
                      .map((project, index) => (
                        <Card
                          key={project.id}
                          className={`bg-figma-menu border border-white/10 overflow-hidden group hover:border-figma-purple/50 transition-all duration-500 hover:scale-[1.02] ${
                            mounted
                              ? "opacity-100 translate-y-0"
                              : "opacity-0 translate-y-8"
                          }`}
                          style={{ transitionDelay: `${index * 200}ms` }}
                        >
                          <CardContent className="p-0">
                            {project.coverImage && (
                              <div className="relative h-48 overflow-hidden">
                                <Image
                                  src={project.coverImage}
                                  alt={project.title}
                                  fill
                                  className="object-cover group-hover:scale-110 transition-transform duration-500"
                                />
                                <div className="absolute inset-0 bg-figma-gradient/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                              </div>
                            )}
                            <div className="p-6">
                              <div className="flex items-start justify-between mb-4">
                                <div>
                                  <h3 className="text-xl font-semibold text-white mb-2 group-hover:text-figma-purple transition-colors duration-300">
                                    {project.title}
                                  </h3>
                                  <Badge className="bg-figma-gradient text-black text-xs">
                                    Featured
                                  </Badge>
                                </div>
                                <div className="flex gap-2">
                                  {project.liveLink && (
                                    <Button
                                      size="sm"
                                      variant="outline"
                                      className="bg-transparent border-white/20 text-white hover:bg-figma-gradient hover:text-black hover:border-figma-gradient transition-all duration-300"
                                      asChild
                                    >
                                      <a
                                        href={
                                          project.liveLink.startsWith("http")
                                            ? project.liveLink
                                            : `https://${project.liveLink}`
                                        }
                                        target="_blank"
                                        rel="noopener noreferrer"
                                      >
                                        <ExternalLink className="w-4 h-4" />
                                      </a>
                                    </Button>
                                  )}
                                  <Button
                                    size="sm"
                                    variant="outline"
                                    className="bg-transparent border-white/20 text-white hover:bg-figma-gradient hover:text-black hover:border-figma-gradient transition-all duration-300"
                                    asChild
                                  >
                                    <a
                                      href={
                                        project.githubLink.startsWith("http")
                                          ? project.githubLink
                                          : `https://${project.githubLink}`
                                      }
                                      target="_blank"
                                      rel="noopener noreferrer"
                                    >
                                      <Github className="w-4 h-4" />
                                    </a>
                                  </Button>
                                  {project.demoLink && (
                                    <Button
                                      size="sm"
                                      variant="outline"
                                      className="bg-transparent border-white/20 text-white hover:bg-figma-gradient hover:text-black hover:border-figma-gradient transition-all duration-300"
                                      asChild
                                    >
                                      <a
                                        href={
                                          project.demoLink.startsWith("http")
                                            ? project.demoLink
                                            : `https://${project.demoLink}`
                                        }
                                        target="_blank"
                                        rel="noopener noreferrer"
                                      >
                                        <Eye className="w-4 h-4" />
                                      </a>
                                    </Button>
                                  )}
                                </div>
                              </div>

                              <p className="text-white/70 mb-4 leading-relaxed">
                                {project.description}
                              </p>

                              <div className="flex flex-wrap gap-2">
                                {project.technologies.map((tech, techIndex) => (
                                  <Badge
                                    key={techIndex}
                                    variant="outline"
                                    className="border-white/20 text-white/70 hover:border-figma-purple hover:text-figma-purple transition-all duration-300"
                                  >
                                    {tech}
                                  </Badge>
                                ))}
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      ))}
                  </div>
                </div>
              )}

              {/* All Projects */}
              <div>
                <h2 className="text-3xl font-bold text-white mb-8 font-poppins">
                  All Projects
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {projects.map((project, index) => (
                    <Card
                      key={project.id}
                      className={`bg-figma-menu border border-white/10 overflow-hidden group hover:border-figma-purple/50 transition-all duration-500 hover:scale-[1.02] ${
                        mounted
                          ? "opacity-100 translate-y-0"
                          : "opacity-0 translate-y-8"
                      }`}
                      style={{ transitionDelay: `${index * 100}ms` }}
                    >
                      <CardContent className="p-0">
                        {project.coverImage && (
                          <div className="relative h-32 overflow-hidden">
                            <Image
                              src={project.coverImage}
                              alt={project.title}
                              fill
                              className="object-cover group-hover:scale-110 transition-transform duration-500"
                            />
                            <div className="absolute inset-0 bg-figma-gradient/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                          </div>
                        )}
                        <div className="p-4">
                          <div className="flex items-start justify-between mb-3">
                            <h3 className="text-lg font-semibold text-white group-hover:text-figma-purple transition-colors duration-300">
                              {project.title}
                            </h3>
                            <div className="flex gap-1">
                              {project.liveLink && (
                                <Button
                                  size="sm"
                                  variant="ghost"
                                  className="text-white/70 hover:text-figma-purple hover:bg-figma-purple/10 h-8 w-8 p-0 transition-all duration-300"
                                  asChild
                                >
                                  <a
                                    href={
                                      project.liveLink.startsWith("http")
                                        ? project.liveLink
                                        : `https://${project.liveLink}`
                                    }
                                    target="_blank"
                                    rel="noopener noreferrer"
                                  >
                                    <ExternalLink className="w-3 h-3" />
                                  </a>
                                </Button>
                              )}
                              <Button
                                size="sm"
                                variant="ghost"
                                className="text-white/70 hover:text-figma-purple hover:bg-figma-purple/10 h-8 w-8 p-0 transition-all duration-300"
                                asChild
                              >
                                <a
                                  href={
                                    project.githubLink.startsWith("http")
                                      ? project.githubLink
                                      : `https://${project.githubLink}`
                                  }
                                  target="_blank"
                                  rel="noopener noreferrer"
                                >
                                  <Github className="w-3 h-3" />
                                </a>
                              </Button>
                              {project.demoLink && (
                                <Button
                                  size="sm"
                                  variant="ghost"
                                  className="text-white/70 hover:text-figma-purple hover:bg-figma-purple/10 h-8 w-8 p-0 transition-all duration-300"
                                  asChild
                                >
                                  <a
                                    href={
                                      project.demoLink.startsWith("http")
                                        ? project.demoLink
                                        : `https://${project.demoLink}`
                                    }
                                    target="_blank"
                                    rel="noopener noreferrer"
                                  >
                                    <Eye className="w-3 h-3" />
                                  </a>
                                </Button>
                              )}
                            </div>
                          </div>

                          <p className="text-white/70 text-sm mb-3 leading-relaxed">
                            {project.description.length > 100
                              ? `${project.description.substring(0, 100)}...`
                              : project.description}
                          </p>

                          <div className="flex flex-wrap gap-1">
                            {project.technologies
                              .slice(0, 3)
                              .map((tech, techIndex) => (
                                <Badge
                                  key={techIndex}
                                  variant="outline"
                                  className="border-white/20 text-white/70 text-xs hover:border-figma-purple hover:text-figma-purple transition-all duration-300"
                                >
                                  {tech}
                                </Badge>
                              ))}
                            {project.technologies.length > 3 && (
                              <Badge
                                variant="outline"
                                className="border-white/20 text-white/70 text-xs"
                              >
                                +{project.technologies.length - 3}
                              </Badge>
                            )}
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            </>
          )}
        </div>
      </section>
    </div>
  );
}
