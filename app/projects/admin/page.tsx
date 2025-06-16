"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Switch } from "@/components/ui/switch";
import { Trash2, Edit, ExternalLink, Github, Eye, LogOut } from "lucide-react";

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
  updatedAt: string;
}

export default function ProjectAdminPage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [projects, setProjects] = useState<Project[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [editingProject, setEditingProject] = useState<Project | null>(null);
  const { toast } = useToast();

  // Form state
  const [formData, setFormData] = useState({
    title: "",
    slug: "",
    description: "",
    coverImage: "",
    liveLink: "",
    githubLink: "",
    demoLink: "",
    technologies: "",
    featured: false,
    published: false,
  });

  // Login state
  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
  });

  useEffect(() => {
    checkAuthAndLoadProjects();
  }, []);

  const checkAuthAndLoadProjects = async () => {
    try {
      // Check if user is authenticated by trying to fetch admin projects
      const response = await fetch("/api/projects?admin=true");
      if (response.ok) {
        setIsAuthenticated(true);
        loadProjects();
      }
    } catch (error) {
      console.error("Auth check failed:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const loadProjects = async () => {
    try {
      const response = await fetch("/api/projects?admin=true");
      if (response.ok) {
        const data = await response.json();
        setProjects(data.projects);
      }
    } catch (error) {
      console.error("Failed to load projects:", error);
      toast({
        title: "Error",
        description: "Failed to load projects",
        variant: "destructive",
      });
    }
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const response = await fetch("/api/projects/admin/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(loginData),
      });

      if (response.ok) {
        setIsAuthenticated(true);
        loadProjects();
        toast({
          title: "Success",
          description: "Logged in successfully",
        });
      } else {
        const error = await response.json();
        toast({
          title: "Error",
          description: error.error || "Invalid credentials",
          variant: "destructive",
        });
      }
    } catch (error) {
      console.error("Login failed:", error);
      toast({
        title: "Error",
        description: "Login failed",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleLogout = async () => {
    try {
      await fetch("/api/projects/admin/login", {
        method: "DELETE",
      });
      setIsAuthenticated(false);
      setProjects([]);
      toast({
        title: "Success",
        description: "Logged out successfully",
      });
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const projectData = {
        ...formData,
        technologies: formData.technologies
          .split(",")
          .map((tech) => tech.trim())
          .filter(Boolean),
      };

      const response = await fetch("/api/projects", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(projectData),
      });

      if (response.ok) {
        toast({
          title: "Success",
          description: "Project created successfully",
        });
        setFormData({
          title: "",
          slug: "",
          description: "",
          coverImage: "",
          liveLink: "",
          githubLink: "",
          demoLink: "",
          technologies: "",
          featured: false,
          published: false,
        });
        setShowForm(false);
        loadProjects();
      } else {
        const error = await response.json();
        toast({
          title: "Error",
          description: error.error || "Failed to create project",
          variant: "destructive",
        });
      }
    } catch (error) {
      console.error("Failed to create project:", error);
      toast({
        title: "Error",
        description: "Failed to create project",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-figma-dark flex items-center justify-center">
        <div className="text-white">Loading...</div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-figma-dark flex items-center justify-center">
        <Card className="w-full max-w-md bg-figma-menu border-white/10">
          <CardHeader>
            <CardTitle className="text-white text-center">
              Projects Admin Login
            </CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleLogin} className="space-y-4">
              <div>
                <Label htmlFor="email" className="text-white">
                  Email
                </Label>
                <Input
                  id="email"
                  type="email"
                  value={loginData.email}
                  onChange={(e) =>
                    setLoginData({ ...loginData, email: e.target.value })
                  }
                  className="bg-figma-dark border-white/20 text-white"
                  required
                />
              </div>
              <div>
                <Label htmlFor="password" className="text-white">
                  Password
                </Label>
                <Input
                  id="password"
                  type="password"
                  value={loginData.password}
                  onChange={(e) =>
                    setLoginData({ ...loginData, password: e.target.value })
                  }
                  className="bg-figma-dark border-white/20 text-white"
                  required
                />
              </div>
              <Button
                type="submit"
                className="w-full bg-figma-gradient hover:bg-figma-gradient/90 text-black"
                disabled={isLoading}
              >
                {isLoading ? "Logging in..." : "Login"}
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-figma-dark">
      <div className="figma-container py-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-white">Projects Admin</h1>
          <div className="flex gap-4">
            <Button
              onClick={() => setShowForm(!showForm)}
              className="bg-figma-gradient hover:bg-figma-gradient/90 text-black"
            >
              {showForm ? "Cancel" : "Add New Project"}
            </Button>
            <Button
              onClick={handleLogout}
              variant="outline"
              className="border-white/20 text-white hover:bg-white/10"
            >
              <LogOut className="w-4 h-4 mr-2" />
              Logout
            </Button>
          </div>
        </div>

        <Tabs defaultValue="projects" className="w-full">
          <TabsList className="bg-figma-menu border-white/10">
            <TabsTrigger value="projects" className="text-white">
              Projects ({projects.length})
            </TabsTrigger>
            {showForm && (
              <TabsTrigger value="form" className="text-white">
                {editingProject ? "Edit Project" : "New Project"}
              </TabsTrigger>
            )}
          </TabsList>

          <TabsContent value="projects" className="space-y-4 mt-6">
            {projects.length === 0 ? (
              <Card className="bg-figma-menu border-white/10">
                <CardContent className="py-8 text-center">
                  <p className="text-white/70">No projects found</p>
                </CardContent>
              </Card>
            ) : (
              <div className="grid gap-4">
                {projects.map((project) => (
                  <Card
                    key={project.id}
                    className="bg-figma-menu border-white/10"
                  >
                    <CardContent className="p-6">
                      <div className="flex justify-between items-start">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-2">
                            <h3 className="text-lg font-semibold text-white">
                              {project.title}
                            </h3>
                            {project.featured && (
                              <Badge className="bg-figma-gradient text-black">
                                Featured
                              </Badge>
                            )}
                            {!project.published && (
                              <Badge
                                variant="outline"
                                className="border-white/20 text-white/70"
                              >
                                Draft
                              </Badge>
                            )}
                          </div>
                          <p className="text-white/70 text-sm mb-3">
                            {project.description.substring(0, 150)}...
                          </p>
                          <div className="flex flex-wrap gap-2 mb-3">
                            {project.technologies.map((tech, index) => (
                              <Badge
                                key={index}
                                variant="outline"
                                className="border-white/20 text-white/70"
                              >
                                {tech}
                              </Badge>
                            ))}
                          </div>
                          <div className="flex gap-4 text-xs text-white/50">
                            <span>
                              Created:{" "}
                              {new Date(project.createdAt).toLocaleDateString()}
                            </span>
                            <span>
                              Updated:{" "}
                              {new Date(project.updatedAt).toLocaleDateString()}
                            </span>
                          </div>
                        </div>
                        <div className="flex gap-2 ml-4">
                          {project.liveLink && (
                            <Button
                              size="sm"
                              variant="outline"
                              className="border-transparent text-black hover:bg-figma-gradient"
                              asChild
                            >
                              <a
                                href={project.liveLink}
                                target="_blank"
                                rel="noopener noreferrer"
                              >
                                <ExternalLink className="w-4 h-4" />
                              </a>
                            </Button>
                          )}
                          {project.githubLink && (
                            <Button
                              size="sm"
                              variant="outline"
                              className="border-transparent text-black hover:bg-figma-gradient"
                              asChild
                            >
                              <a
                                href={project.githubLink}
                                target="_blank"
                                rel="noopener noreferrer"
                              >
                                <Github className="w-4 h-4" />
                              </a>
                            </Button>
                          )}
                          {project.demoLink && (
                            <Button
                              size="sm"
                              variant="outline"
                              className="border-transparent text-black hover:bg-figma-gradient"
                              asChild
                            >
                              <a
                                href={project.demoLink}
                                target="_blank"
                                rel="noopener noreferrer"
                              >
                                <Eye className="w-4 h-4" />
                              </a>
                            </Button>
                          )}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </TabsContent>

          {showForm && (
            <TabsContent value="form" className="mt-6">
              <Card className="bg-figma-menu border-white/10">
                <CardHeader>
                  <CardTitle className="text-white">
                    {editingProject ? "Edit Project" : "Create New Project"}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="title" className="text-white">
                          Title *
                        </Label>
                        <Input
                          id="title"
                          value={formData.title}
                          onChange={(e) =>
                            setFormData({ ...formData, title: e.target.value })
                          }
                          className="bg-figma-dark border-white/20 text-white"
                          required
                        />
                      </div>
                      <div>
                        <Label htmlFor="slug" className="text-white">
                          Slug *
                        </Label>
                        <Input
                          id="slug"
                          value={formData.slug}
                          onChange={(e) =>
                            setFormData({ ...formData, slug: e.target.value })
                          }
                          className="bg-figma-dark border-white/20 text-white"
                          required
                        />
                      </div>
                    </div>

                    <div>
                      <Label htmlFor="description" className="text-white">
                        Description *
                      </Label>
                      <Textarea
                        id="description"
                        value={formData.description}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            description: e.target.value,
                          })
                        }
                        className="bg-figma-dark border-white/20 text-white min-h-[100px]"
                        required
                      />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="githubLink" className="text-white">
                          GitHub Link *
                        </Label>
                        <Input
                          id="githubLink"
                          value={formData.githubLink}
                          onChange={(e) =>
                            setFormData({
                              ...formData,
                              githubLink: e.target.value,
                            })
                          }
                          className="bg-figma-dark border-white/20 text-white"
                          required
                        />
                      </div>
                      <div>
                        <Label htmlFor="liveLink" className="text-white">
                          Live Link
                        </Label>
                        <Input
                          id="liveLink"
                          value={formData.liveLink}
                          onChange={(e) =>
                            setFormData({
                              ...formData,
                              liveLink: e.target.value,
                            })
                          }
                          className="bg-figma-dark border-white/20 text-white"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="demoLink" className="text-white">
                          Demo Link
                        </Label>
                        <Input
                          id="demoLink"
                          value={formData.demoLink}
                          onChange={(e) =>
                            setFormData({
                              ...formData,
                              demoLink: e.target.value,
                            })
                          }
                          className="bg-figma-dark border-white/20 text-white"
                        />
                      </div>
                      <div>
                        <Label htmlFor="coverImage" className="text-white">
                          Cover Image URL
                        </Label>
                        <Input
                          id="coverImage"
                          value={formData.coverImage}
                          onChange={(e) =>
                            setFormData({
                              ...formData,
                              coverImage: e.target.value,
                            })
                          }
                          className="bg-figma-dark border-white/20 text-white"
                        />
                      </div>
                    </div>

                    <div>
                      <Label htmlFor="technologies" className="text-white">
                        Technologies (comma-separated)
                      </Label>
                      <Input
                        id="technologies"
                        value={formData.technologies}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            technologies: e.target.value,
                          })
                        }
                        placeholder="React, Next.js, TypeScript, Tailwind CSS"
                        className="bg-figma-dark border-white/20 text-white"
                      />
                    </div>

                    <div className="flex gap-6">
                      <div className="flex items-center space-x-2">
                        <Switch
                          id="published"
                          checked={formData.published}
                          onCheckedChange={(checked) =>
                            setFormData({ ...formData, published: checked })
                          }
                        />
                        <Label htmlFor="published" className="text-white">
                          Published
                        </Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Switch
                          id="featured"
                          checked={formData.featured}
                          onCheckedChange={(checked) =>
                            setFormData({ ...formData, featured: checked })
                          }
                        />
                        <Label htmlFor="featured" className="text-white">
                          Featured
                        </Label>
                      </div>
                    </div>

                    <Button
                      type="submit"
                      className="bg-figma-gradient hover:bg-figma-gradient/90 text-black"
                      disabled={isLoading}
                    >
                      {isLoading
                        ? "Creating..."
                        : editingProject
                        ? "Update Project"
                        : "Create Project"}
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </TabsContent>
          )}
        </Tabs>
      </div>
    </div>
  );
}
