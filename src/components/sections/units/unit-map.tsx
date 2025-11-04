"use client";

import "leaflet/dist/leaflet.css";
import dynamic from "next/dynamic";
import type { Unit } from "src/types";

const DynamicLeafletMap = dynamic(
  async () => {
    const { MapContainer, Marker, Popup, TileLayer } = await import(
      "react-leaflet"
    );
    const L = await import("leaflet");

    const markerIcon = new L.Icon({
      iconUrl:
        "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon.png",
      iconRetinaUrl:
        "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon-2x.png",
      shadowUrl:
        "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-shadow.png",
      iconSize: [25, 41],
      iconAnchor: [12, 41],
      popupAnchor: [1, -34],
      shadowSize: [41, 41],
    });

    return function LeafletMap({ units }: { units: Unit[] }) {
      return (
        <div className="w-full space-y-4">
          {units.map((unit) => (
            <div
              key={unit.id}
              className="rounded-lg border border-border overflow-hidden bg-card"
            >
              <MapContainer
                center={[unit.latitude, unit.longitude]}
                zoom={13}
                scrollWheelZoom={false}
                style={{ height: 400, width: "100%" }}
              >
                <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
                <Marker
                  position={[unit.latitude, unit.longitude]}
                  icon={markerIcon}
                >
                  <Popup>
                    {unit.name} <br /> {unit.zone}
                  </Popup>
                </Marker>
              </MapContainer>
            </div>
          ))}
        </div>
      );
    };
  },
  { ssr: false }
);

interface UnitMapProps {
  units: Unit[];
}
export default function UnitMap({ units }: UnitMapProps) {
  if (!units.length) return null;
  return <DynamicLeafletMap units={units} />;
}
