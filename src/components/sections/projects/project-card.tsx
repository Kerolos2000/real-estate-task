import Image from "next/image";
import { Badge } from "src/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "src/components/ui/card";
import type { Project } from "src/types";

interface ProjectCardProps {
  project: Project;
}

export function ProjectCard({ project }: ProjectCardProps) {
  return (
    <Card className="overflow-hidden hover:shadow-lg transition-shadow cursor-pointer group pt-0">
      <div className="relative h-48 bg-muted overflow-hidden">
        <Image
          fill
          src={project.image}
          alt={project.name}
          className="w-full h-full object-cover transition-transform duration-300"
        />
        <Badge className="absolute top-3 right-3 bg-primary text-primary-foreground">
          {project.totalUnits} units
        </Badge>
      </div>
      <CardHeader>
        <CardTitle className="text-lg py-2">{project.name}</CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        <CardDescription className="text-muted-foreground text-sm line-clamp-2">
          {project.description}
        </CardDescription>
        <div className="space-y-2 text-sm">
          <div className="flex items-center justify-between">
            <span className="text-muted-foreground">Developer:</span>
            <span className="font-medium text-foreground">
              {project.developer}
            </span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-muted-foreground">Location:</span>
            <span className="font-medium text-foreground">
              {project.location}
            </span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
