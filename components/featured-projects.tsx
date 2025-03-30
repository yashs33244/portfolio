import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { ArrowRight, Github, ExternalLink } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { projects } from "@/lib/data";

export default function FeaturedProjects() {
  // Get only featured projects
  const featuredProjects = projects.filter((project) => project.featured);

  return (
    <section className="py-12 border-t">
      <div className="container">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-3xl font-bold text-blueviolet">
            Featured Projects
          </h2>
          <Button
            variant="outline"
            asChild
            className="border-orange text-orange hover:bg-orange hover:text-white"
          >
            <Link href="/projects">
              View all projects <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {featuredProjects.map((project) => (
            <div
              key={project.id}
              className="border border-amber rounded-lg overflow-hidden group hover:border-rose transition-colors"
            >
              <div className="relative h-48 overflow-hidden">
                <Image
                  src={project.image || "/placeholder.svg"}
                  alt={project.title}
                  fill
                  className="object-cover transition-transform group-hover:scale-105"
                />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-semibold mb-2 text-orange">
                  {project.title}
                </h3>
                <p className="text-gray-600 mb-4 line-clamp-3">
                  {project.description}
                </p>
                <div className="flex flex-wrap gap-2 mb-4">
                  {project.tags.map((tag) => (
                    <Badge
                      key={tag}
                      variant="outline"
                      className="bg-white border-azure"
                    >
                      {tag}
                    </Badge>
                  ))}
                </div>
                <div className="flex gap-4 mb-4">
                  <Link
                    href={project.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-600 hover:text-blueviolet transition-colors"
                  >
                    <Github className="h-5 w-5" />
                    <span className="sr-only">GitHub</span>
                  </Link>
                  {project.demo && (
                    <Link
                      href={project.demo}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-gray-600 hover:text-blueviolet transition-colors"
                    >
                      <ExternalLink className="h-5 w-5" />
                      <span className="sr-only">Live Demo</span>
                    </Link>
                  )}
                </div>
                <Button
                  variant="outline"
                  asChild
                  className="w-full border-rose text-rose hover:bg-rose hover:text-white transition-colors"
                >
                  <Link href={`/projects/${project.id}`}>View Details</Link>
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
