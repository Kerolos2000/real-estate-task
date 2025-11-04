import { Unit } from "src/types";
import { create } from "zustand";
import { persist } from "zustand/middleware";

interface DataState {
  clearFilters: () => void;
  selectedUnit: Unit | null;
  searchQuery: string;
  selectedDeveloper: string | null;
  selectedZone: string | null;
  setFilters: (
    filters: Partial<
      Pick<DataState, "searchQuery" | "selectedDeveloper" | "selectedZone">
    >
  ) => void;
  setSelectedUnit: (unit: Unit | null) => void;
}

export const useDataStore = create<DataState>()(
  persist(
    (set) => ({
      selectedUnit: null,
      searchQuery: "",
      selectedDeveloper: null,
      selectedZone: null,

      setFilters: (filters) => set(filters),
      setSelectedUnit: (unit) => set({ selectedUnit: unit }),
      clearFilters: () =>
        set({
          searchQuery: "",
          selectedZone: null,
          selectedDeveloper: null,
        }),
    }),
    { name: "data-store" }
  )
);
