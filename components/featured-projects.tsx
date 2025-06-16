"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { ExternalLink, Github, Eye } from "lucide-react";
import { Loader, ProjectSkeletonCard } from "@/components/ui/loader";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

interface Project {
  id: string;
  title: string;
  slug: string;
  description: string;
  coverImage: string | null;
  liveLink: string | null;
  githubLink: string | null;
  demoLink: string | null;
  technologies: string[];
  featured: boolean;
}

export default function FeaturedProjects() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [mounted, setMounted] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const projectsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setMounted(true);
    fetchFeaturedProjects();
  }, []);

  useEffect(() => {
    if (!mounted || loading || projects.length === 0) return;

    const ctx = gsap.context(() => {
      if (!sectionRef.current || !titleRef.current || !projectsRef.current) {
        return;
      }

      // Set initial states
      gsap.set(titleRef.current, {
        opacity: 0,
        x: -50,
      });

      // Animate title
      gsap.to(titleRef.current, {
        opacity: 1,
        x: 0,
        duration: 1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
          toggleActions: "play none none none",
          once: true,
        },
      });

      // Animate project cards
      const projectCards =
        projectsRef.current.querySelectorAll(".project-card");
      projectCards.forEach((card: Element, index: number) => {
        const cardElement = card as HTMLElement;
        const projectImage = cardElement.querySelector(".project-image");
        const projectContent = cardElement.querySelector(".project-content");

        // Set initial states
        gsap.set([projectImage, projectContent], {
          opacity: 0,
          y: 60,
        });

        // Create timeline for each project
        const projectTl = gsap.timeline({
          scrollTrigger: {
            trigger: cardElement,
            start: "top 85%",
            toggleActions: "play none none none",
            once: true,
          },
        });

        projectTl
          .to(projectImage, {
            opacity: 1,
            y: 0,
            duration: 1,
            ease: "power3.out",
          })
          .to(
            projectContent,
            {
              opacity: 1,
              y: 0,
              duration: 0.8,
              ease: "power3.out",
            },
            "-=0.5"
          );

        // Add hover animations
        cardElement.addEventListener("mouseenter", () => {
          gsap.to(projectImage, {
            scale: 1.02,
            duration: 0.4,
            ease: "power2.out",
          });

          gsap.to(cardElement, {
            y: -5,
            duration: 0.4,
            ease: "power2.out",
          });
        });

        cardElement.addEventListener("mouseleave", () => {
          gsap.to(projectImage, {
            scale: 1,
            duration: 0.4,
            ease: "power2.out",
          });

          gsap.to(cardElement, {
            y: 0,
            duration: 0.4,
            ease: "power2.out",
          });
        });
      });
    }, sectionRef);

    return () => ctx.revert();
  }, [mounted, loading, projects]);

  const fetchFeaturedProjects = async () => {
    try {
      const response = await fetch("/api/projects?featured=true&limit=3");
      if (response.ok) {
        const data = await response.json();
        setProjects(data.projects || []);
      }
    } catch (error) {
      console.error("Failed to fetch featured projects:", error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <section className="bg-figma-dark py-16">
        <div className="figma-container">
          <div className="flex items-center gap-4 mb-16">
            <h2 className="text-[40px] font-normal leading-[56px] text-white font-poppins">
              Some Featured projects
            </h2>
            <div className="w-9 h-9 bg-transparent border border-white/20 rounded-lg flex items-center justify-center">
              <div className="w-4 h-4 bg-white/10 rounded" />
            </div>
          </div>

          <div className="space-y-16">
            {[1, 2, 3].map((i) => (
              <div
                key={i}
                className="bg-figma-card rounded-lg p-12 border border-white/5"
              >
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                  <div className="h-[400px] bg-white/5 rounded-lg animate-pulse" />
                  <div className="space-y-6">
                    <div className="w-12 h-12 bg-white/5 rounded-full animate-pulse" />
                    <div className="h-8 bg-white/5 rounded w-3/4 animate-pulse" />
                    <div className="h-4 bg-white/5 rounded w-full animate-pulse" />
                    <div className="h-4 bg-white/5 rounded w-2/3 animate-pulse" />
                    <div className="flex gap-3">
                      <div className="h-10 bg-white/5 rounded w-24 animate-pulse" />
                      <div className="h-10 bg-white/5 rounded w-24 animate-pulse" />
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section
      ref={sectionRef}
      className="bg-figma-dark py-16 bg-grainy-gradient-dark"
    >
      <div className="figma-container">
        {/* Section title */}
        <div ref={titleRef} className="flex items-center gap-4 mb-16">
          <h2 className="text-[40px] font-normal leading-[56px] text-white font-poppins">
            Some Featured projects
          </h2>
          <div className="w-9 h-9 bg-transparent border border-white/20 rounded-lg flex items-center justify-center">
            <div className="w-4 h-4 bg-white/10 rounded" />
          </div>
        </div>

        {/* Project cards */}
        {projects.length > 0 ? (
          <div ref={projectsRef} className="space-y-16">
            {projects.map((project, index) => (
              <div
                key={project.id}
                className="project-card bg-figma-card rounded-lg p-12 border border-white/5 hover:border-figma-purple/30 group"
              >
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                  {/* Left side - Project image */}
                  <div className="project-image relative h-[400px] bg-figma-gradient rounded-lg overflow-hidden">
                    {project.coverImage ? (
                      <Image
                        src={project.coverImage}
                        alt={project.title}
                        fill
                        className="object-cover"
                        sizes="(max-width: 1024px) 100vw, 50vw"
                      />
                    ) : (
                      <div className="w-full h-full bg-figma-gradient flex items-center justify-center">
                        <div className="text-6xl font-bold text-black/20">
                          {project.title.charAt(0)}
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Right side - Project info */}
                  <div className="project-content space-y-8">
                    {/* Project number badge */}
                    <div className="relative w-[53px] h-[53px]">
                      <div className="absolute inset-0 bg-black/5 rounded-full border border-figma-gradient" />
                      <div className="absolute inset-[1px] bg-figma-gradient rounded-full flex items-center justify-center">
                        <span className="text-[20px] font-bold text-black font-mono">
                          {String(index + 1).padStart(2, "0")}
                        </span>
                      </div>
                    </div>

                    <div className="space-y-4">
                      <h3 className="text-[36px] font-bold leading-[44px] text-white font-poppins group-hover:text-figma-gradient transition-colors duration-300">
                        {project.title}
                      </h3>

                      <p className="text-white/70 text-lg leading-relaxed">
                        {project.description}
                      </p>

                      {/* Technologies */}
                      {project.technologies.length > 0 && (
                        <div className="flex flex-wrap gap-2">
                          {project.technologies.map((tech, techIndex) => (
                            <span
                              key={techIndex}
                              className="px-3 py-1 bg-figma-menu border border-white/10 rounded-full text-white/80 text-sm hover:border-figma-purple/30 transition-colors duration-300"
                            >
                              {tech}
                            </span>
                          ))}
                        </div>
                      )}

                      {/* Action buttons */}
                      <div className="flex flex-wrap gap-4 pt-4">
                        {project.liveLink && (
                          <Button
                            asChild
                            size="sm"
                            className="bg-figma-menu border border-white/20 text-white hover:bg-white/10 hover:border-figma-purple/50 transition-all duration-300 group/btn"
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
                              <ExternalLink className="w-4 h-4 mr-2 group-hover/btn:scale-110 transition-transform duration-300" />
                              Live Demo
                            </a>
                          </Button>
                        )}

                        {project.githubLink && (
                          <Button
                            asChild
                            size="sm"
                            variant="outline"
                            className="bg-figma-menu border border-white/20 text-white hover:bg-white/10 hover:border-figma-purple/50 transition-all duration-300 group/btn"
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
                              <Github className="w-4 h-4 mr-2 group-hover/btn:scale-110 transition-transform duration-300" />
                              Source Code
                            </a>
                          </Button>
                        )}

                        <Button
                          asChild
                          size="sm"
                          variant="outline"
                          className="bg-figma-menu border border-white/20 text-white hover:bg-white/10 hover:border-figma-purple/50 transition-all duration-300 group/btn"
                        >
                          <Link href={`/projects/${project.slug}`}>
                            <Eye className="w-4 h-4 mr-2 group-hover/btn:scale-110 transition-transform duration-300" />
                            View Details
                          </Link>
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <div className="bg-figma-card rounded-lg p-12 border border-white/5">
              <h3 className="text-2xl font-bold text-white mb-4">
                No Featured Projects Yet
              </h3>
              <p className="text-white/70 mb-8">
                Check back soon for amazing projects!
              </p>
              <Button
                asChild
                className="bg-figma-gradient hover:bg-figma-gradient/90 text-black font-medium"
              >
                <Link href="/projects">View All Projects</Link>
              </Button>
            </div>
          </div>
        )}

        {/* View all projects link */}
        {projects.length > 0 && (
          <div
            className={`text-center mt-16 transition-all duration-1000 delay-800 ${
              mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            }`}
          >
            <Button
              asChild
              className="bg-figma-gradient hover:bg-figma-gradient/90 text-black font-medium text-lg px-8 py-4 h-auto rounded-full transition-all duration-300 hover:scale-105"
            >
              <Link href="/projects">View All Projects</Link>
            </Button>
          </div>
        )}
      </div>
    </section>
  );
}
