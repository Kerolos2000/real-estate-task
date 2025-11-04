import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import {
  Button,
  LogoutButton,
  UnitsFilters,
  UnitsHeader,
  UnitsList,
} from "src/components";

export default function UnitsPage() {
  return (
    <main className="min-h-screen bg-background">
      <div className="border-b border-border bg-card">
        <div className="mx-auto container px-4 py-6 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-4">
            <Link href="/">
              <Button
                variant="outline"
                className="text-primary hover:bg-muted bg-transparent flex items-center gap-2 cursor-pointer"
              >
                <ArrowLeft className="h-4 w-4" />
                Back to Projects
              </Button>
            </Link>
            <LogoutButton />
          </div>
          <UnitsHeader />
        </div>
      </div>

      <div className="mx-auto container px-4 py-8 sm:px-6 lg:px-8">
        <UnitsFilters />
        <UnitsList />
      </div>
    </main>
  );
}
