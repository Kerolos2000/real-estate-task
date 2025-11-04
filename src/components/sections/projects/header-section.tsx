import { LogoutButton } from "src/components";

export function HeaderSection() {
  return (
    <div className="border-b border-border bg-linear-to-br from-card to-background">
      <div className="mx-auto container px-4 py-8 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between flex-wrap gap-4">
          <div className="space-y-2">
            <h1 className="text-4xl font-bold text-foreground">
              Real Estate Task
            </h1>
            <p className="text-muted-foreground text-lg">
              Discover premium properties in prime locations
            </p>
          </div>
          <LogoutButton />
        </div>
      </div>
    </div>
  );
}
