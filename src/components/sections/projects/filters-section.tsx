"use client";

import { X } from "lucide-react";
import { useEffect, useMemo } from "react";
import { Controller, useForm } from "react-hook-form";
import { Button, Input } from "src/components";
import { projects } from "src/data";
import { useDataStore } from "src/hooks";

interface FiltersFormValues {
  searchQuery: string;
  selectedDeveloper: string | null;
  selectedZone: string | null;
}

interface FilterGroupProps {
  label: string;
  options: string[];
  selected: string | null;
  onChange: (value: string | null) => void;
}

function FilterGroup({ label, options, selected, onChange }: FilterGroupProps) {
  return (
    <div className="flex flex-col gap-2">
      <span className="text-sm font-medium">{label}</span>
      <div className="flex flex-wrap gap-2">
        {options.map((option) => (
          <Button
            key={option}
            variant={selected === option ? "default" : "outline"}
            onClick={() => onChange(selected === option ? null : option)}
            size="sm"
          >
            {option}
          </Button>
        ))}
      </div>
    </div>
  );
}

export function FiltersSection() {
  const selectedDeveloper = useDataStore((s) => s.selectedDeveloper);
  const selectedZone = useDataStore((s) => s.selectedZone);
  const searchQuery = useDataStore((s) => s.searchQuery);
  const setFilters = useDataStore((s) => s.setFilters);

  const developers = useMemo(
    () => Array.from(new Set(projects.map((p) => p.developer))),
    []
  );
  const locations = useMemo(
    () => Array.from(new Set(projects.map((p) => p.location))),
    []
  );

  const form = useForm<FiltersFormValues>({
    defaultValues: {
      searchQuery: searchQuery || "",
      selectedDeveloper: selectedDeveloper || null,
      selectedZone: selectedZone || null,
    },
  });

  const hasActiveFilters =
    form.watch("selectedDeveloper") ||
    form.watch("selectedZone") ||
    form.watch("searchQuery")?.trim() !== "";

  const updateFilters = (values: Partial<FiltersFormValues>) => {
    setFilters({ ...form.getValues(), ...values });
  };

  useEffect(() => {
    form.reset({
      searchQuery: searchQuery || "",
      selectedDeveloper: selectedDeveloper || null,
      selectedZone: selectedZone || null,
    });
  }, [searchQuery, selectedDeveloper, selectedZone, form]);

  return (
    <div className="lg:col-span-1 space-y-6 rounded-lg border border-border bg-card p-6">
      <Controller
        control={form.control}
        name="searchQuery"
        render={({ field }) => (
          <div className="flex flex-col gap-2">
            <span className="text-sm font-medium">Search by Project Name</span>
            <Input
              placeholder="Search projects..."
              {...field}
              onChange={(e) => {
                field.onChange(e);
                updateFilters({ searchQuery: e.target.value });
              }}
            />
          </div>
        )}
      />

      <Controller
        control={form.control}
        name="selectedDeveloper"
        render={({ field }) => (
          <FilterGroup
            label="Developer"
            options={developers}
            selected={field.value}
            onChange={(val) => {
              field.onChange(val);
              updateFilters({ selectedDeveloper: val });
            }}
          />
        )}
      />

      <Controller
        control={form.control}
        name="selectedZone"
        render={({ field }) => (
          <FilterGroup
            label="Location"
            options={locations}
            selected={field.value}
            onChange={(val) => {
              field.onChange(val);
              updateFilters({ selectedZone: val });
            }}
          />
        )}
      />

      {hasActiveFilters && (
        <Button
          onClick={() => {
            form.reset({
              searchQuery: "",
              selectedDeveloper: null,
              selectedZone: null,
            });
            setFilters({
              searchQuery: "",
              selectedDeveloper: null,
              selectedZone: null,
            });
          }}
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
