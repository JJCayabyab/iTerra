"use client";

import { useRef, useEffect } from "react";
import maplibregl from "maplibre-gl";
import "maplibre-gl/dist/maplibre-gl.css";
import { Location } from "@/app/generated/prisma/client";

interface MapProps {
  locations: Location[];
}

export default function Map({ locations }: MapProps) {
  const mapRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!mapRef.current || locations.length === 0) return;

    const map = new maplibregl.Map({
      container: mapRef.current,
      style:
        "https://api.maptiler.com/maps/streets/style.json?key=zEeMFOAbSDFx1FM4GKcZ", // Google Maps-like style
      center: [locations[0].lng, locations[0].lat],
      zoom: 6,
    });

    // Add markers
    locations.forEach((loc, index) => {
      new maplibregl.Marker({ color: "red" })
        .setLngLat([loc.lng, loc.lat])
        .setPopup(
          new maplibregl.Popup({ offset: 25 }).setHTML(
            `<div className="bg-white text-black px-3 py-2 rounded-lg shadow-md text-sm font-medium">
                ${loc.locationTitle}
             </div>`
          )
        )
        .addTo(map);
    });

    // Fit map to all markers
    const bounds = new maplibregl.LngLatBounds();
    locations.forEach((loc) => bounds.extend([loc.lng, loc.lat]));
    map.fitBounds(bounds, { padding: 50 });

    return () => map.remove();
  }, [locations]);

  return (
    <div
      ref={mapRef}
      className="w-full h-[500px] rounded-lg shadow-lg"
    />
  );
}
