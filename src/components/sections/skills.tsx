"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  Database, 
  Layout, 
  Server, 
  Wrench 
} from "lucide-react";

const skills = [
  {
    category: "Frontend",
    icon: Layout,
    items: ["React", "Next.js", "TypeScript", "Tailwind CSS", "Framer Motion", "React Native", "Zustand"]
  },
  {
    category: "Backend",
    icon: Server,
    items: ["Node.js", "Python", "FastAPI", "Express", "Server Actions", "REST APIs"]
  },
  {
    category: "Database",
    icon: Database,
    items: ["PostgreSQL", "MongoDB", "Drizzle ORM", "Prisma", "Redis"]
  },
  {
    category: "DevOps & Tools",
    icon: Wrench,
    items: ["Docker", "Git", "GitHub Actions", "Linux", "Vercel", "AWS"]
  }
];

export default function Skills() {
  return (
    <section className="py-20 px-4" id="skills">
      <div className="container mx-auto max-w-5xl">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold mb-4">Technical Skills</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            A curated list of technologies I use to build modern, scalable applications.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          {skills.map((skillGroup) => (
            <Card key={skillGroup.category} className="border-none shadow-md hover:shadow-lg transition-shadow bg-secondary/20">
              <CardHeader className="flex flex-row items-center gap-4 pb-2">
                <div className="p-2 bg-primary/10 rounded-lg">
                  <skillGroup.icon className="h-6 w-6 text-primary" />
                </div>
                <CardTitle className="text-xl">{skillGroup.category}</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  {skillGroup.items.map((item) => (
                    <Badge 
                      key={item} 
                      variant="secondary" 
                      className="px-3 py-1 text-sm font-medium hover:bg-primary hover:text-primary-foreground transition-colors cursor-default"
                    >
                      {item}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
