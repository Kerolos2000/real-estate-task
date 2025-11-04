"use client";

import dynamic from "next/dynamic";
import { useParams } from "next/navigation";
import { useMemo } from "react";
import { units } from "src/data";
import { useDataStore } from "src/hooks";
import type { Unit } from "src/types";

const UnitMap = dynamic(() => import("./unit-map"), { ssr: false });

export function UnitsList() {
  const { projectId } = useParams();

  const searchQuery = useDataStore((store) => store.searchQuery);
  const selectedZone = useDataStore((store) => store.selectedZone);
  const setSelectedUnit = useDataStore((store) => store.setSelectedUnit);
  const selectedUnit = useDataStore((store) => store.selectedUnit);

  const finalUnits = useMemo(() => {
    return units.filter((unit) => {
      const matchesProject = unit.projectId === projectId;
      const matchesSearch =
        !searchQuery ||
        unit.name.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesZone = !selectedZone || unit.zone === selectedZone;
      return matchesProject && matchesSearch && matchesZone;
    });
  }, [projectId, searchQuery, selectedZone]);

  return (
    <div className="grid gap-8 lg:grid-cols-3 mt-6">
      <div className="lg:col-span-1">
        <div className="sticky top-4 space-y-3 max-h-[calc(100vh-200px)] overflow-y-auto">
          {finalUnits.map((unit: Unit) => (
            <div
              key={unit.id}
              onClick={() => setSelectedUnit(unit)}
              className={`cursor-pointer rounded-lg border p-3 transition-all ${
                selectedUnit?.id === unit.id
                  ? "border-primary bg-primary/10"
                  : "border-border hover:border-primary/50"
              }`}
            >
              <p className="font-semibold text-foreground">{unit.name}</p>
              <p className="text-xs text-muted-foreground">{unit.zone}</p>
              <p className="mt-1 text-sm font-bold text-primary">
                ${unit.price.toLocaleString()}
              </p>
            </div>
          ))}
        </div>
      </div>

      <div className="lg:col-span-2">
        {selectedUnit ? (
          <UnitMap units={[selectedUnit]} />
        ) : (
          <div className="flex h-96 min-h-[400px] items-center justify-center rounded-lg border-2 border-dashed border-border">
            <p className="text-muted-foreground">
              Select a unit to view its location on the map
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
