import Container from "@/app/component/Container";
import { prisma } from "@/lib/prisma";

import BackButton from "@/app/component/ui/BackButton";
import { auth } from "@/auth";
import SignInRequired from "@/app/component/auth/SignInRequired";
import Link from "next/link";
import TripDetailsClient from "@/app/component/TripDetailsClient";


export default async function TripDetails({ params }: { params: { tripId: string } }) {
    const session = await auth();

    if (!session) {
        return (
            <SignInRequired />
        )
    }
    const { tripId } = params;

    const trip = await prisma.trip.findUnique({
        where: { id: tripId },
        include:{
            locations: true
        }
    });

    console.log(trip?.locations?.length);
    //Trip not found
    if (!trip) {
        return (
            <>
                <div className="flex flex-col items-center justify-center min-h-[60vh] text-center px-4">

                    <img src="/images/trip-not-found.png" className="size-30" alt="Trip not found" />
                    <h2 className="text-2xl md:text-3xl font-bold text-slate-800 mb-2">
                        Trip Not Found
                    </h2>
                    <p className="text-slate-500 max-w-md mb-8">
                        We couldn't locate the trip details you requested. It may have been deleted or the link is incorrect.
                    </p> 


                    <Link
                        href="/dashboard"
                        className="bg-primary text-white text-sm font-medium py-3 px-6 rounded-lg transition-colors duration-200 shadow-sm"
                    >
                        Return to Dashboard
                    </Link>
                </div >
            </>
        )
    }

    return (
        <Container>
            <BackButton />
            <TripDetailsClient trip={trip} />
        </Container>

    )
}
