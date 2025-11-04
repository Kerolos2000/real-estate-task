"use client";

import { projects } from "src/data";
import { useDataStore } from "src/hooks";
import { ProjectFilters } from "./project-filters";

export function FiltersSection() {
  const selectedDeveloper = useDataStore((store) => store.selectedDeveloper);
  const selectedZone = useDataStore((store) => store.selectedZone);
  const searchQuery = useDataStore((store) => store.searchQuery);
  const setFilters = useDataStore((store) => store.setFilters);

  const developers = Array.from(new Set(projects.map((p) => p.developer)));
  const zones = Array.from(new Set(projects.map((p) => p.location)));

  const handleResetFilters = () => {
    setFilters({
      selectedDeveloper: null,
      selectedZone: null,
      searchQuery: "",
    });
  };

  return (
    <div className="lg:col-span-1">
      <ProjectFilters
        developers={developers}
        locations={zones}
        selectedDeveloper={selectedDeveloper}
        selectedLocation={selectedZone}
        searchQuery={searchQuery}
        onDeveloperChange={(dev) => setFilters({ selectedDeveloper: dev })}
        onLocationChange={(zone) => setFilters({ selectedZone: zone })}
        onSearchChange={(query) => setFilters({ searchQuery: query })}
        onReset={handleResetFilters}
      />
    </div>
  );
}
