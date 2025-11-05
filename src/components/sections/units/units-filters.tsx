"use client";

import { useParams } from "next/navigation";
import { useMemo } from "react";
import {
  Button,
  Input,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "src/components";
import { units } from "src/data";
import { useDataStore } from "src/hooks";

export function UnitsFilters() {
  const params = useParams();
  const projectId = params?.projectId as string | undefined;

  const searchQuery = useDataStore((s) => s.searchQuery);
  const selectedZone = useDataStore((s) => s.selectedZone);
  const setFilters = useDataStore((s) => s.setFilters);
  const clearFilters = useDataStore((s) => s.clearFilters);

  const allZones = useMemo(() => {
    if (!projectId) return [];
    return Array.from(
      new Set(units.filter((u) => u.projectId === projectId).map((u) => u.zone))
    );
  }, [projectId]);

  return (
    <div className="mb-6 space-y-4 rounded-lg border border-border bg-card p-4">
      <div className="flex flex-col gap-1">
        <span className="text-sm font-medium text-foreground">
          Search Units
        </span>
        <Input
          placeholder="Search by unit name..."
          value={searchQuery}
          onChange={(e) => setFilters({ searchQuery: e.target.value })}
        />
      </div>

      <div className="flex flex-col gap-1">
        <span className="text-sm font-medium text-foreground">
          Filter by Zone
        </span>

        <Select
          value={selectedZone || "all"}
          onValueChange={(val) =>
            setFilters({ selectedZone: val === "all" ? null : val })
          }
          aria-labelledby="zone-label"
        >
          <SelectTrigger className="w-full" aria-label="Zone">
            <SelectValue placeholder="All Zones" />
          </SelectTrigger>
          <SelectContent className=" relative z-100">
            <SelectItem value="all">All Zones</SelectItem>
            {allZones.map((zone) => (
              <SelectItem key={zone} value={zone}>
                {zone}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="flex justify-end mt-2">
        <Button variant="destructive" onClick={clearFilters}>
          Clear Filters
        </Button>
      </div>
    </div>
  );
}
