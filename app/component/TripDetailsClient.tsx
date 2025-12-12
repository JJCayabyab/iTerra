"use client";
import { Location, Trip } from "../generated/prisma/client";
import Image from "next/image";
import Button from "./ui/Button";
import { FaInfoCircle, FaMapMarkerAlt, FaRegCalendarAlt, FaWallet } from "react-icons/fa";
import Link from "next/link";
import { FaClock } from "react-icons/fa";
import {
    Tabs,
    TabsList,
    TabsTrigger,
    TabsContent
} from "@/app/component/ui/Tabs";

type TripWithLocation = Trip & {
    trip: Trip;
    locations: Location[];
};

type TripDetailsClientProps = {
    trip: TripWithLocation
}

export default function TripDetailsClient({ trip }: TripDetailsClientProps ) {

    const durationDays = Math.ceil((trip.endDate.getTime() - trip.startDate.getTime()) / (1000 * 60 * 60 * 24));
    const locationCount = trip.locations.length;
    console.log(trip);
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
                <div className="flex justify-between">
                    <h1 className="text-xl md:text-3xl lg:text-4xl font-bold text-slate-800">
                        {trip?.title}
                    </h1>
                    <Link href={`/trips/${trip.id}/itenerary/new`}>
                        <Button btnName="Add Location" className="text-sm" />
                    </Link>

                </div>



            </div>

            {/* TABS */}
            <div className="w-full border-none bg-white shadow-md p-5 rounded-lg mt-6">

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
                        <div className="mt-6 space-y-8">

                            <div>
                                <h3 className="text-lg font-semibold text-slate-800 mb-2 flex items-center gap-2">
                                    <FaInfoCircle className="text-blue-500" />
                                    About this Trip
                                </h3>
                                <div className=" p-4 rounded-lg">
                                    <p className="text-slate-600 leading-relaxed">
                                        {trip?.description || "No description provided for this trip."}
                                    </p>
                                </div>
                                <div className="mt-2 flex items-center gap-2 text-sm font-normal text-slate-500">
                                    <div className="flex  gap-2 items-center">
                                        <FaRegCalendarAlt />
                                        <p>Date</p>
                                    </div>

                                </div>
                                <div className="mt-2 flex items-center gap-2 text-sm font-normal text-slate-500">
                                    <FaRegCalendarAlt />
                                    <span>
                                        {trip?.startDate.toDateString()} - {trip?.endDate.toDateString()}
                                    </span>
                                    {locationCount}
                                </div>
                            </div>


                        </div>
                    </TabsContent>

                    {/* Content for 'Itinerary' */}
                    <TabsContent value="itinerary">

                    </TabsContent>

                    {/* Content for 'Map' */}
                    <TabsContent value="map">

                    </TabsContent>

                </Tabs>
            </div>

        </>
    )
}