import Link from "next/link"
import { FaRegCalendarAlt } from "react-icons/fa"
import { Trip } from "@/app/generated/prisma/client"

interface TripCardProps {
    trip: Trip
    variant?: "upcoming" | "completed"
}

export default function TripCard({ trip, variant = "upcoming" }: TripCardProps) {
    const isCompleted = variant === "completed"

    return (
        <div className="group bg-white rounded-2xl overflow-hidden shadow-sm border border-slate-100 hover:shadow-xl hover:-translate-y-1 transition-all duration-200">

            {/* Image Section */}
            <div className="relative h-40 overflow-hidden">
                <img
                    src={trip.imageUrl || "/images/default-trip.jpg"}
                    alt={trip.title}
                    className={`w-full h-full object-cover transition-transform duration-500 ${isCompleted
                        ? "grayscale hover:grayscale-0"
                        : "hover:scale-105"
                        }`}
                />

                {/* Floating Badge */}
                <div className="absolute top-3 left-3 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-bold text-slate-700 shadow-sm">
                    {isCompleted
                        ? "Completed"
                        : trip.startDate.toLocaleDateString(undefined, { month: 'short', day: 'numeric' })
                    }
                </div>
            </div>

            {/* Content Section */}
            <div className="p-5">
                <h3 className="text-lg font-bold text-slate-800 leading-tight">
                    {trip.title}
                </h3>

                <div className="mt-2 flex items-center gap-2 text-sm text-slate-500">
                    <FaRegCalendarAlt />
                    <span>
                        {trip.startDate.toDateString()}
                    </span>
                </div>

                <Link href={`/trips/${trip.id}`} className="block mt-5">
                    <button className="w-full py-2 rounded-lg text-sm font-medium bg-primary hover:bg-primary-hover text-white">
                        View Details
                    </button>
                </Link>
            </div>
        </div>
    )
}