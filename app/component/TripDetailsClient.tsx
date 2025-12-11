"use client";
import { Trip } from "../generated/prisma/client";
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
type TripDetailsClientProps = {
    trip: Trip
}

export default function TripDetailsClient({ trip }: TripDetailsClientProps) {

    const durationDays = Math.ceil((trip.endDate.getTime() - trip.startDate.getTime()) / (1000 * 60 * 60 * 24));
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

                <div className="mt-2 flex items-center gap-2 text-sm font-light text-slate-500">
                    <FaRegCalendarAlt />
                    <span>
                        {trip?.startDate.toDateString()} - {trip?.endDate.toDateString()}
                    </span>
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

                            {/* Section 1: Description */}
                            <div>
                                <h3 className="text-lg font-semibold text-slate-800 mb-2 flex items-center gap-2">
                                    <FaInfoCircle className="text-blue-500" />
                                    About this Trip
                                </h3>
                                <div className="bg-slate-50 p-4 rounded-lg border border-slate-100">
                                    <p className="text-slate-600 leading-relaxed">
                                        {trip?.description || "No description provided for this trip."}
                                    </p>
                                </div>
                            </div>

                            {/* Section 2: Key Details Grid */}
                            <div>
                                <h3 className="text-lg font-semibold text-slate-800 mb-4">Trip Details</h3>
                                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">

                                    {/* Duration Card */}
                                    <div className="p-4 rounded-lg border border-slate-200 bg-white flex flex-col items-center justify-center text-center shadow-sm">
                                        <div className="p-2 bg-blue-50 text-blue-600 rounded-full mb-2">
                                            <FaClock size={20} />
                                        </div>
                                        <span className="text-slate-500 text-xs uppercase font-bold tracking-wider">Duration</span>
                                        <span className="text-slate-800 font-semibold mt-1">{durationDays} Days</span>
                                    </div>



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