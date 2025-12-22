"use client";

import { useState, useEffect } from "react";
import { CiSearch } from "react-icons/ci";
import { FaMapMarkerAlt } from "react-icons/fa";
import { AddLocation } from "@/lib/actions/add-location";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
export default function NewLocationForm({ tripId }: { tripId: string }) {
    const [query, setQuery] = useState<string>("");
    const [suggestions, setSuggestions] = useState<any[]>([]);
    const [selectedLocation, setSelectedLocation] = useState<any>(null);
    const [pending, setPending] = useState(false);
    const GEOAPIFY_API_KEY = process.env.NEXT_PUBLIC_GEO_API_KEY;
    const router = useRouter()
    // Fetch suggestions when query changes
    useEffect(() => {
        if (!query || query.length < 3) {
            setSuggestions([]);
            return;
        }

        const fetchSuggestions = async () => {
            if (!GEOAPIFY_API_KEY) return;

            try {
                const res = await fetch(
                    `https://api.geoapify.com/v1/geocode/autocomplete?text=${encodeURIComponent(
                        query
                    )}&limit=5&apiKey=${GEOAPIFY_API_KEY}`
                );
                const data = await res.json();
                setSuggestions(data.features || []);
            } catch (err) {
                console.error(err);
                setSuggestions([]);
            }
        };

        fetchSuggestions();
    }, [query]);


    //handle selected location
    const handleSelect = (item: any) => {
        setSelectedLocation({
            title: item.properties.formatted,
            lat: item.properties.lat,
            lng: item.properties.lon,
        });
        setQuery(item.properties.formatted);
        setSuggestions([]);
        console.log(item.properties);
    };

    //handle submit
    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        setPending(true);

        const formData = new FormData(event.currentTarget);
        try {
            const response = await AddLocation(formData);

            if (response?.error) {
                toast.error(response.error);
            } else {

                toast.success("Location added successfully!", {
                    duration: 4000,
                    position: "top-center",
                });
            }
            router.push(`/trips/${tripId}`);
        } catch (error) {
            toast.error("Failed to create trip. Please try again.", {
                duration: 4000,
                position: "top-center",
            });
            router.push(`/trips/${tripId}`);
        } finally {
            setPending(false);
        }
    }
    return (
        <>

            <form onSubmit={handleSubmit} className="max-w-md mx-auto bg-white rounded-xl shadow-md border border-gray-100 p-6 space-y-6 mb-56">
                <h2 className="text-xl font-semibold text-gray-800 mb-4 flex items-center gap-2">
                    <span className="text-blue-500"></span> Add Destination
                </h2>

                {/* Search Input */}
                <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center ">
                        <CiSearch className="text-gray-400 text-xl" />
                    </div>
                    <input
                        type="text"
                        placeholder="Search for a city, landmark, or hotel..."
                        value={query}
                        onChange={(e) => {
                            setQuery(e.target.value);
                            setSelectedLocation(null);
                        }}
                        className="w-full pl-10 pr-10 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white transition-all text-gray-700 placeholder-gray-400"
                    />

                    {/* Suggestions */}
                    {suggestions.length > 0 && !selectedLocation && (
                        <div className="absolute z-50 w-full mt-1 bg-white border border-gray-100 rounded-lg shadow-xl max-h-60 overflow-y-auto">
                            {suggestions.map((item, i) => (
                                <div
                                    key={i}
                                    onClick={() => handleSelect(item)}
                                    className="flex items-start gap-3 px-4 py-3 hover:bg-blue-50 cursor-pointer transition-colors border-b border-gray-50 last:border-0"
                                >
                                    <FaMapMarkerAlt className="text-gray-400 mt-1 flex-shrink-0" />
                                    <div>
                                        <p className="text-sm font-medium text-gray-700 leading-snug">{item.properties.formatted}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>

                {/* Selected Location Preview */}
                {selectedLocation && (
                    <div className="mt-4 bg-blue-50 border border-blue-100 rounded-lg p-4">
                        <p className="text-xs font-bold text-blue-600 uppercase tracking-wide">Selected Destination</p>
                        <p className="font-medium text-gray-800 mt-1">{selectedLocation.title}</p>
                        <p className="text-xs text-gray-500 mt-1">
                            Coordinates: {selectedLocation.lat.toFixed(4)}, {selectedLocation.lng.toFixed(4)}
                        </p>

                        {/* Hidden inputs to submit and save location data to database */}
                        <input type="hidden" name="locationTitle" value={selectedLocation.title} />
                        <input type="hidden" name="lat" value={selectedLocation.lat} />
                        <input type="hidden" name="lng" value={selectedLocation.lng} />
                        <input type="hidden" name="tripId" value={tripId} />
                    </div>
                )}

                <button
                    type="submit"
                    disabled={!selectedLocation}
                    className="w-full bg-primary hover:bg-primary-hover text-white font-medium py-2.5 rounded-lg transition-colors shadow-sm active:transform active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                    Add to Itinerary
                </button>
            </form>
        </>

    );
}
