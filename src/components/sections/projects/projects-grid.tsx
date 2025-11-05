"use client";

import Link from "next/link";
import { Button, ProjectCard } from "src/components";
import { projects } from "src/data";
import { useDataStore } from "src/hooks";

export function ProjectsGrid() {
  const selectedDeveloper = useDataStore((store) => store.selectedDeveloper);
  const selectedZone = useDataStore((store) => store.selectedZone);
  const searchQuery = useDataStore((store) => store.searchQuery);
  const setFilters = useDataStore((store) => store.setFilters);

  const handleResetFilters = () => {
    setFilters({
      selectedDeveloper: null,
      selectedZone: null,
      searchQuery: "",
    });
  };

  const filteredProjects = projects.filter((p) => {
    const bySearch =
      !searchQuery || p.name.toLowerCase().includes(searchQuery.toLowerCase());
    const byDeveloper = !selectedDeveloper || p.developer === selectedDeveloper;
    const byZone = !selectedZone || p.location === selectedZone;
    return bySearch && byDeveloper && byZone;
  });

  if (!filteredProjects.length) {
    return (
      <div className="rounded-lg border border-border bg-card p-12 text-center">
        <p className="text-lg text-muted-foreground">
          No projects found matching your filters
        </p>
        <Button
          onClick={handleResetFilters}
          variant="outline"
          className="mt-4 bg-transparent"
        >
          Clear Filters
        </Button>
      </div>
    );
  }

  return (
    <>
      <div className="flex items-center justify-between">
        <p className="text-muted-foreground">
          Showing {filteredProjects.length} of {projects.length} projects
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
        {filteredProjects.map((project) => (
          <div
            key={project.id}
            className="cursor-pointer transition-transform duration-500 hover:-translate-y-1 h-full"
          >
            <Link href={`/projects/${project.id}/units`} passHref>
              <ProjectCard project={project} />
            </Link>
          </div>
        ))}
      </div>
    </>
  );
}
