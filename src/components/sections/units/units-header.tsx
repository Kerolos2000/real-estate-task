"use client";

import { useParams } from "next/navigation";
import { projects } from "src/data";

export function UnitsHeader() {
  const params = useParams();
  const projectId = params.projectId;
  const project = projects.find((p) => p.id === projectId);

  if (!project) return null;

  return (
    <div>
      <h1 className="text-3xl font-bold text-foreground">{project.name}</h1>
      <p className="mt-2 text-muted-foreground">{project.location}</p>
    </div>
  );
}
