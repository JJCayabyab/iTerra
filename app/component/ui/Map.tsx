"use client";

import { useRef, useEffect } from "react";
import maplibregl from "maplibre-gl";
import "maplibre-gl/dist/maplibre-gl.css";
import { Location } from "@/app/generated/prisma/client";

interface LocationProps {
    locations: Location[];
}

export default function Map({ locations }: LocationProps) {
    const mapRef = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        if (!mapRef.current || locations.length === 0) return;

        const map = new maplibregl.Map({
            container: mapRef.current,
            style:
                "https://api.maptiler.com/maps/streets/style.json?key=zEeMFOAbSDFx1FM4GKcZ",
            center: [locations[0].lng, locations[0].lat],
            zoom: 6,
        });

        locations.forEach((loc, index) => {
            // popup element
            const popupEl = document.createElement("div");
            popupEl.className = "bg-white text-black p-3 rounded-lg shadow-md max-w-xs sm:max-w-sm break-words";

            //  content
            const contentEl = document.createElement("div");
            contentEl.innerHTML = `<strong>Day ${index + 1}:</strong> ${loc.locationTitle}`;
            popupEl.appendChild(contentEl);

            //  close button
            const closeBtn = document.createElement("button");
            closeBtn.innerHTML = "&times;";
            closeBtn.className =
                "ml-auto mb-1 w-6 h-6 flex items-center justify-center bg-gray-300 text-white rounded-full hover:bg-gray-500 transition text-lg";
            closeBtn.onclick = () => popup.remove();
            popupEl.appendChild(closeBtn);

            const popup = new maplibregl.Popup({ offset: 25, closeButton: false })
                .setDOMContent(popupEl);

            new maplibregl.Marker({ color: "red" })
                .setLngLat([loc.lng, loc.lat])
                .setPopup(popup)
                .addTo(map);
        });

        // Fit map to all markers
        const bounds = new maplibregl.LngLatBounds();
        locations.forEach((loc) => bounds.extend([loc.lng, loc.lat]));
        map.fitBounds(bounds, { padding: 50 });

        return () => map.remove();
    }, [locations]);

    return <div ref={mapRef} className="w-full h-[500px] rounded-lg shadow-lg" />;
}
