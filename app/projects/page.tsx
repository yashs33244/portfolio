import ProjectCard from "@/components/project-card";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import { projects } from "@/lib/data";

export default function ProjectsPage() {
  return (
    <>
      <Navbar />
      <div className="container mx-auto px-4 py-12">
        <h1 className="text-4xl font-bold mb-8">Projects</h1>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>
      </div>
      <Footer />
    </>
  );
}
