"use client";
import { useState } from "react";
import { Location, Trip } from "../generated/prisma/client";
import Image from "next/image";
import Button from "./ui/Button";
import { FaInfoCircle, FaMapMarkerAlt, FaRegCalendarAlt, FaClock } from "react-icons/fa";
import Link from "next/link";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/app/component/ui/Tabs";
import Map from "./ui/Map";
import DeleteTrip from "@/lib/actions/delete-trip";
import toast, { Toaster } from "react-hot-toast";
import { useRouter } from "next/navigation";
import SortableItinerary from "./ui/SortableItenerary";

export type TripWithLocation = Trip & {
    locations: Location[];
};

type TripDetailsClientProps = {
    trip: TripWithLocation;
};

export default function TripDetailsClient({ trip }: TripDetailsClientProps) {
    const router = useRouter();
    const now = new Date();
    const isUpcoming = trip.startDate > now;
    const durationDays = Math.ceil((trip.endDate.getTime() - trip.startDate.getTime()) / (1000 * 60 * 60 * 24));
    const locationCount = trip.locations.length;
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
    const isOngoing = trip.startDate <= now && trip.endDate >= now;

    // Function to handle trip deletion
    const handleDelete = async () => {
        try {
            await DeleteTrip(trip.id);

            // Add 'position: "top-center"' here
            toast.success("Trip deleted successfully!", {
                duration: 4000,
                position: "top-center"
            });

            setIsModalOpen(false)
            router.push("/trips");
        } catch (error) {
            console.error(error);


            toast.error("Failed to delete trip.", {
                duration: 4000,
                position: "top-center"
            });
        }
    };

    return (
        <>


            {/* Custom Modal */}
            {isModalOpen && (
                <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
                    <div className="bg-white rounded-lg shadow-lg p-6 max-w-sm w-full animate-fadeIn">
                        <h3 className="text-lg font-bold text-slate-800 mb-4">Confirm Deletion</h3>
                        <p className="text-slate-600 mb-6">
                            Are you sure you want to delete this trip? This action cannot be undone.
                        </p>
                        <div className="flex justify-end gap-3">
                            <button
                                className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300"
                                onClick={() => setIsModalOpen(false)}
                            >
                                Cancel
                            </button>
                            <button
                                className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
                                onClick={handleDelete}
                            >
                                Delete
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* Trip Image */}
            <div className="relative w-full h-72 md:h-80 mb-5 shadow-lg">
                <Image
                    src={trip?.imageUrl || "/images/default-trip.jpg"}
                    alt={trip?.title || "Trip image"}
                    fill
                    className="object-cover rounded-lg"
                />
            </div>

            {/* Trip Header */}
            <div className=" bg-white shadow-md p-5 rounded-lg">
                <div className="flex flex-col md:flex-row justify-between items-center gap-3">
                    <h1 className="text-xl md:text-3xl lg:text-4xl font-bold text-slate-800">{trip?.title}</h1>
                    <div className="flex gap-3">
                        {(isUpcoming || isOngoing) && (
                            <Link href={`/trips/${trip.id}/itenerary/new`}>

                                <Button btnName="Add Location" className="text-sm" />
                            </Link>
                        )}

                        {isUpcoming && (
                            <Button
                                btnName="Delete Trip"
                                className="text-sm bg-red-600 hover:bg-red-700"
                                onClick={() => setIsModalOpen(true)}
                            />
                        )}
                    </div>
                </div>
            </div>

            {/* Tabs */}
            <div className="w-full border-none bg-white shadow-md p-5 rounded-lg mt-6 mb-6">
                <Tabs defaultValue="overview" className="w-full">
                    <div className="flex justify-start">
                        <TabsList>
                            <TabsTrigger value="overview">Overview</TabsTrigger>
                            <TabsTrigger value="itinerary">Itinerary</TabsTrigger>
                            <TabsTrigger value="map">Map</TabsTrigger>
                        </TabsList>
                    </div>

                    <TabsContent value="overview">
                        <div className="mt-6 space-y-6">
                            <h3 className="text-lg font-semibold text-slate-800 mb-3 flex items-center gap-2">
                                <FaInfoCircle className="text-slate-400" /> About this Trip
                            </h3>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div className="bg-slate-50 p-4 rounded-xl border border-slate-100 flex items-center gap-4">
                                    <div className="p-3 bg-blue-100 text-blue-600 rounded-full">
                                        <FaClock size={20} />
                                    </div>
                                    <div>
                                        <p className="text-sm text-slate-500 font-medium">Duration</p>
                                        <p className="text-lg font-bold text-slate-800">{durationDays} Days</p>
                                    </div>
                                </div>

                                <div className="bg-slate-50 p-4 rounded-xl border border-slate-100 flex items-center gap-4">
                                    <div className="p-3 bg-emerald-100 text-emerald-600 rounded-full">
                                        <FaMapMarkerAlt size={20} />
                                    </div>
                                    <div>
                                        <p className="text-sm text-slate-500 font-medium">Destinations</p>
                                        <p className="text-lg font-bold text-slate-800">{locationCount} Stops</p>
                                    </div>
                                </div>
                            </div>

                            <div className="flex items-center gap-3 flex-col md:flex-row">
                                <span className="px-3 py-1 bg-slate-100 text-slate-600 text-sm font-medium rounded-md flex items-center gap-2">
                                    <FaRegCalendarAlt /> {trip.startDate.toLocaleDateString()}
                                </span>

                                <span className="px-3 py-1 bg-slate-100 text-slate-600 text-sm font-medium rounded-md flex items-center gap-2">
                                    <FaRegCalendarAlt /> {trip.endDate.toLocaleDateString()}
                                </span>
                            </div>
                        </div>
                    </TabsContent>

                    <TabsContent value="itinerary">
                        <SortableItinerary locations={trip.locations} />
                    </TabsContent>

                    <TabsContent value="map">
                        <div className="mt-6 space-y-6">
                            <Map locations={trip.locations} />
                        </div>
                    </TabsContent>
                </Tabs>
            </div>
        </>
    );
}
