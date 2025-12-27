import { getProjects } from "@/app/actions/portfolio";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Github, ExternalLink } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

export async function ProjectsSection() {
  const projects = await getProjects();

  if (projects.length === 0) return null;

  return (
    <section className="py-20 px-4" id="projects">
      <div className="container mx-auto max-w-4xl">
        <h2 className="text-3xl font-bold mb-16 text-center">Projects</h2>
        <div className="flex flex-col gap-20">
          {projects.map((project) => (
            <div key={project.id} className="flex flex-col md:flex-row gap-8 items-start group">
              {project.image && (
                <div className="w-full md:w-[45%] aspect-video relative rounded-xl overflow-hidden border bg-muted shadow-sm">
                  <Image 
                    src={project.image} 
                    alt={project.title} 
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105" 
                  />
                </div>
              )}
              <div className="flex-1 space-y-4">
                <div>
                  <h3 className="text-2xl font-bold group-hover:text-primary transition-colors">{project.title}</h3>
                  <p className="text-muted-foreground mt-3 leading-relaxed">{project.description}</p>
                </div>
                
                <div className="flex flex-wrap gap-2">
                  {project.technologies?.map((tech) => (
                    <Badge key={tech} variant="secondary" className="rounded-md px-2 py-0.5 text-xs font-normal">{tech}</Badge>
                  ))}
                </div>

                <div className="flex gap-4 pt-2">
                  {project.githubUrl && (
                    <Link href={project.githubUrl} target="_blank">
                      <Button variant="outline" size="sm" className="gap-2">
                        <Github className="h-4 w-4" /> Code
                      </Button>
                    </Link>
                  )}
                  {project.url && (
                    <Link href={project.url} target="_blank">
                      <Button size="sm" className="gap-2">
                        <ExternalLink className="h-4 w-4" /> Live Demo
                      </Button>
                    </Link>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
