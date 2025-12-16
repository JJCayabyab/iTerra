"use client";
import { Location, Trip } from "../generated/prisma/client";
import Image from "next/image";
import Button from "./ui/Button";
import { FaInfoCircle, FaMapMarkerAlt, FaRegCalendarAlt } from "react-icons/fa";
import Link from "next/link";
import { FaClock } from "react-icons/fa";
import {
    Tabs,
    TabsList,
    TabsTrigger,
    TabsContent
} from "@/app/component/ui/Tabs";
import Map from "./ui/Map";
import DeleteTrip from "@/lib/actions/delete-trip";
import { useRouter } from "next/navigation";

export type TripWithLocation = Trip & {
    locations: Location[];
};

type TripDetailsClientProps = {
    trip: TripWithLocation;
};

export default function TripDetailsClient({ trip }: TripDetailsClientProps) {
    const router = useRouter();

    const now = new Date();
    const isUpcoming = new Date(trip.startDate) > now;

    const durationDays = Math.ceil(
        (trip.endDate.getTime() - trip.startDate.getTime()) /
        (1000 * 60 * 60 * 24)
    );
    const locationCount = trip.locations.length;

    // delete handler 
    const handleDelete = async () => {
        const confirmed = confirm("Are you sure you want to delete this trip?");
        if (!confirmed) return;

        await DeleteTrip(trip.id);
    };

    return (
        <>
            <div className="relative w-full h-72 md:h-80 mb-5 shadow-lg">
                <Image
                    src={trip?.imageUrl || "/images/default-trip.jpg"}
                    alt={trip?.title || "Trip image"}
                    fill
                    className="object-cover rounded-lg"
                />
            </div>

            <div className="bg-white shadow-md p-5 rounded-lg">
                <div className="flex justify-between items-center gap-3">
                    <h1 className="text-xl md:text-3xl lg:text-4xl font-bold text-slate-800">
                        {trip?.title}
                    </h1>

                    <div className="flex gap-3">
                        <Link href={`/trips/${trip.id}/itenerary/new`}>
                            <Button btnName="Add Location" className="text-sm" />
                        </Link>
                        {isUpcoming && (
                            <Button btnName="Delete Trip" className="text-sm bg-red-600  hover:bg-red-700 " onClick={handleDelete} />
                        )}
                    </div>
                </div>
            </div>

            {/* TABS */}
            <div className="w-full border-none bg-white shadow-md p-5 rounded-lg mt-6 mb-6">
                <Tabs defaultValue="overview" className="w-full">
                    {/* The Tabs List */}
                    <div className="flex justify-start">
                        <TabsList>
                            <TabsTrigger value="overview">Overview</TabsTrigger>
                            <TabsTrigger value="itinerary">Itinerary</TabsTrigger>
                            <TabsTrigger value="map">Map</TabsTrigger>
                        </TabsList>
                    </div>

                    {/* Content for 'Overview' */}
                    <TabsContent value="overview">
                        <div className="mt-6 space-y-6">
                            <h3 className="text-lg font-semibold text-slate-800 mb-3 flex items-center gap-2">
                                <FaInfoCircle className="text-slate-400" />
                                About this Trip
                            </h3>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                {/* Total Duration */}
                                <div className="bg-slate-50 p-4 rounded-xl border border-slate-100 flex items-center gap-4">
                                    <div className="p-3 bg-blue-100 text-blue-600 rounded-full">
                                        <FaClock size={20} />
                                    </div>
                                    <div>
                                        <p className="text-sm text-slate-500 font-medium">Duration</p>
                                        <p className="text-lg font-bold text-slate-800">
                                            {durationDays} Days
                                        </p>
                                    </div>
                                </div>

                                {/* Number of Destinations */}
                                <div className="bg-slate-50 p-4 rounded-xl border border-slate-100 flex items-center gap-4">
                                    <div className="p-3 bg-emerald-100 text-emerald-600 rounded-full">
                                        <FaMapMarkerAlt size={20} />
                                    </div>
                                    <div>
                                        <p className="text-sm text-slate-500 font-medium">
                                            Destinations
                                        </p>
                                        <p className="text-lg font-bold text-slate-800">
                                            {locationCount} Stops
                                        </p>
                                    </div>
                                </div>
                            </div>

                            {/* Date */}
                            <div className="flex items-center gap-3 flex-col md:flex-row">
                                <span className="px-3 py-1 bg-slate-100 text-slate-600 text-sm font-medium rounded-md flex items-center gap-2">
                                    <FaRegCalendarAlt />
                                    {trip.startDate.toLocaleDateString()}
                                </span>

                                <span className="px-3 py-1 bg-slate-100 text-slate-600 text-sm font-medium rounded-md flex items-center gap-2">
                                    <FaRegCalendarAlt />
                                    {trip.endDate.toLocaleDateString()}
                                </span>
                            </div>
                        </div>
                    </TabsContent>

                    {/* Content for 'Itinerary' */}
                    <TabsContent value="itinerary"></TabsContent>

                    {/* Content for 'Map' */}
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
