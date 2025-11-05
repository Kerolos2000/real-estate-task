"use client";

import { X } from "lucide-react";
import { Button } from "src/components";

interface ProjectFiltersProps {
  developers: string[];
  locations: string[];
  selectedDeveloper?: string | null;
  selectedLocation?: string | null;
  searchQuery?: string;
  onDeveloperChange: (developer: string | null) => void;
  onLocationChange: (location: string | null) => void;
  onSearchChange: (query: string) => void;
  onReset: () => void;
}

export function ProjectFilters({
  developers,
  locations,
  selectedDeveloper,
  selectedLocation,
  searchQuery,
  onDeveloperChange,
  onLocationChange,
  onSearchChange,
  onReset,
}: ProjectFiltersProps) {
  const hasActiveFilters = Boolean(
    selectedDeveloper || selectedLocation || searchQuery
  );

  const renderFilterButtons = (
    items: string[],
    selectedItem: string | null | undefined,
    onChange: (value: string | null) => void
  ) =>
    items.map((item) => (
      <button
        key={item}
        onClick={() => onChange(selectedItem === item ? null : item)}
        className={`rounded-full px-4 py-2 text-sm font-medium transition-colors cursor-pointer ${
          selectedItem === item
            ? "bg-primary text-primary-foreground"
            : "border border-input bg-background text-foreground hover:bg-accent"
        }`}
      >
        {item}
      </button>
    ));

  return (
    <div className="space-y-6 rounded-lg border border-border bg-card p-6">
      <div className="flex flex-col gap-2">
        <label className="text-sm font-medium text-foreground">
          Search by Project Name
        </label>
        <input
          type="text"
          placeholder="Search projects..."
          value={searchQuery || ""}
          onChange={(e) => onSearchChange(e.target.value)}
          className="w-full rounded-md border border-input bg-background px-4 py-2 text-sm text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
        />
      </div>

      <div className="flex flex-col gap-2">
        <label className="text-sm font-medium text-foreground">Developer</label>
        <div className="flex flex-wrap gap-2">
          {renderFilterButtons(
            developers,
            selectedDeveloper,
            onDeveloperChange
          )}
        </div>
      </div>

      <div className="flex flex-col gap-2">
        <label className="text-sm font-medium text-foreground">Location</label>
        <div className="flex flex-wrap gap-2">
          {renderFilterButtons(locations, selectedLocation, onLocationChange)}
        </div>
      </div>

      {hasActiveFilters && (
        <Button
          onClick={onReset}
          variant="outline"
          className="w-full gap-2 bg-transparent"
        >
          <X className="h-4 w-4" />
          Reset Filters
        </Button>
      )}
    </div>
  );
}
