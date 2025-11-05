import {
  Badge,
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "src/components";
import type { Unit } from "src/types";

interface UnitCardProps {
  unit: Unit;
}

export function UnitCard({ unit }: UnitCardProps) {
  const statusColor = unit.status === "Available" ? "default" : "secondary";

  return (
    <Card className="hover:shadow-lg transition-shadow">
      <CardHeader>
        <div className="flex justify-between items-start">
          <CardTitle className="text-lg">{unit.name}</CardTitle>
          <Badge variant={statusColor}>{unit.status}</Badge>
        </div>
      </CardHeader>
      <CardContent className="space-y-2">
        <div className="grid grid-cols-2 gap-2 text-sm">
          <div>
            <p className="text-muted-foreground">Zone</p>
            <p className="font-semibold">{unit.zone}</p>
          </div>
          <div>
            <p className="text-muted-foreground">Size</p>
            <p className="font-semibold">{unit.size} sqft</p>
          </div>
        </div>
        <div>
          <p className="text-muted-foreground text-sm">Price</p>
          <p className="text-lg font-bold">${unit.price.toLocaleString()}</p>
        </div>
        {unit.amenities.length > 0 && (
          <div className="flex flex-wrap gap-1">
            {unit.amenities.map((amenity) => (
              <Badge key={amenity} variant="outline" className="text-xs">
                {amenity}
              </Badge>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
