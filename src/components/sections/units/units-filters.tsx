"use client";

import { useParams } from "next/navigation";
import { useMemo } from "react";
import { units } from "src/data";
import { useDataStore } from "src/hooks";

export function UnitsFilters() {
  const params = useParams();
  const projectId = params?.projectId as string | undefined;

  const searchQuery = useDataStore((store) => store.searchQuery);
  const selectedZone = useDataStore((store) => store.selectedZone);
  const setFilters = useDataStore((store) => store.setFilters);
  const clearFilters = useDataStore((store) => store.clearFilters);

  const finalUnits = useMemo(() => {
    if (!projectId) return [];
    return units.filter((unit) => {
      const matchesProject = unit.projectId === projectId;
      const matchesSearch =
        !searchQuery ||
        unit.name.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesZone = !selectedZone || unit.zone === selectedZone;
      return matchesProject && matchesSearch && matchesZone;
    });
  }, [projectId, searchQuery, selectedZone]);

  const allZones = useMemo(() => {
    if (!projectId) return [];
    return Array.from(
      new Set(units.filter((u) => u.projectId === projectId).map((u) => u.zone))
    );
  }, [projectId]);

  return (
    <div className="mb-6 space-y-4 rounded-lg border border-border bg-card p-4">
      <div>
        <label className="block text-sm font-medium text-foreground">
          Search Units
        </label>
        <input
          type="text"
          placeholder="Search by unit name..."
          value={searchQuery}
          onChange={(e) => setFilters({ searchQuery: e.target.value })}
          className="mt-1 w-full rounded-md border border-input bg-background px-4 py-2 text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-foreground">
          Filter by Zone
        </label>
        <select
          value={selectedZone || ""}
          onChange={(e) => setFilters({ selectedZone: e.target.value || null })}
          className="mt-1 w-full rounded-md border border-input bg-background px-4 py-2 text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
        >
          <option value="">All Zones</option>
          {allZones.map((zone) => (
            <option key={zone} value={zone}>
              {zone}
            </option>
          ))}
        </select>
      </div>

      <div className="flex justify-end mt-2">
        <button
          onClick={clearFilters}
          className="rounded-md bg-red-500 text-white px-4 py-2 text-sm hover:bg-red-600 transition"
        >
          Clear Filters
        </button>
      </div>
    </div>
  );
}
