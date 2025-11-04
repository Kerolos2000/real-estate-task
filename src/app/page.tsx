import { FiltersSection, HeaderSection, ProjectsGrid } from "src/components";

export default function ProjectsPage() {
  return (
    <main className="min-h-screen bg-background">
      <HeaderSection />
      <div className="mx-auto container px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid gap-8 lg:grid-cols-4">
          <FiltersSection />
          <div className="lg:col-span-3 space-y-6">
            <ProjectsGrid />
          </div>
        </div>
      </div>
    </main>
  );
}
