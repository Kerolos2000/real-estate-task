import { projects, units } from "src/data";
import { Project, Unit } from "src/types";
import { create } from "zustand";
import { persist } from "zustand/middleware";

interface DataState {
  projects: Project[];
  units: Unit[];
  selectedProjectId: string | null;
  searchQuery: string;
  selectedDeveloper: string | null;
  selectedZone: string | null;
  setFilters: (
    filters: Partial<
      Pick<
        DataState,
        | "selectedProjectId"
        | "searchQuery"
        | "selectedDeveloper"
        | "selectedZone"
      >
    >
  ) => void;
  getFilteredUnits: () => Unit[];
  getFilteredProjects: () => Project[];
  getDevelopers: () => string[];
  getZones: () => string[];
}

export const useDataStore = create<DataState>()(
  persist(
    (set, get) => ({
      projects,
      units,
      selectedProjectId: null,
      searchQuery: "",
      selectedDeveloper: null,
      selectedZone: null,

      setFilters: (filters) => set(filters),

      getFilteredUnits: () => {
        const {
          units,
          selectedProjectId,
          searchQuery,
          selectedDeveloper,
          selectedZone,
        } = get();
        return units.filter((u) => {
          const byProject =
            !selectedProjectId || u.projectId === selectedProjectId;
          const bySearch =
            !searchQuery ||
            u.name.toLowerCase().includes(searchQuery.toLowerCase());
          const byDeveloper =
            !selectedDeveloper || u.developer === selectedDeveloper;
          const byZone = !selectedZone || u.zone === selectedZone;
          return byProject && bySearch && byDeveloper && byZone;
        });
      },

      getFilteredProjects: () => {
        const { projects, searchQuery, selectedDeveloper, selectedZone } =
          get();
        return projects.filter((p) => {
          const bySearch =
            !searchQuery ||
            p.name.toLowerCase().includes(searchQuery.toLowerCase());
          const byDeveloper =
            !selectedDeveloper || p.developer === selectedDeveloper;
          const byZone = !selectedZone || p.location === selectedZone;
          return bySearch && byDeveloper && byZone;
        });
      },

      getDevelopers: () =>
        Array.from(new Set(get().projects.map((p) => p.developer))),
      getZones: () =>
        Array.from(new Set(get().projects.map((p) => p.location))),
    }),
    { name: "data-store" }
  )
);
