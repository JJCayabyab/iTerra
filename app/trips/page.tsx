import { auth } from "@/auth"
import SignInRequired from "../component/auth/SignInRequired"
import Button from "../component/ui/button"
import Container from "../component/Container"
import Link from "next/link"
import { prisma } from "@/lib/prisma"

export default async function TripsPage() {
   const session = await auth()

   //check if user is authenticated
   if (!session) {
      return (
         <>
            <SignInRequired />
         </>
      )
   }

   const trips = await prisma.trip.findMany({
      where: {
         userId: session?.user?.id
      }
   })


   const totalTrips = trips.length

   const upcomingTrips = trips.filter((trip) => {
      return trip.startDate > new Date()
   })

   const upcomingCount = upcomingTrips.length

   const nextTrip = trips.find(
      t => t.startDate > new Date()
   )

   const daysLeft = nextTrip
      ? Math.ceil(
         (nextTrip.startDate.getTime() - Date.now()) /
         (1000 * 60 * 60 * 24)
      )
      : null

   return (
      <>
         <Container>
            {/* Header */}
            <div className="flex justify-between items-center">
               <h1 className="text-lg md:text-2xl lg:text-4xl font-semibold">
                  <span className="font-light">Welcome Back</span>, {session.user?.name}
               </h1>

               <Link href="/trips/new">
                  <Button
                     btnName="Add Trip"
                     className="text-sm md:text-lg"
                  />
               </Link>
            </div>
            {/* Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
               {/* Total Trips  Count*/}
               <div className="p-4 border rounded-xl bg-white border-none shadow-md">
                  <p className="text-sm text-gray-500">Total Trips</p>
                  <p className="text-3xl font-bold">{totalTrips}</p>
               </div>

               {/* Upcoming Trips Count */}
               <div className="p-4 border rounded-xl bg-white border-none shadow-md">
                  <p className="text-sm text-gray-500">Upcoming Trips</p>
                  <p className="text-3xl font-bold">{upcomingCount}</p>
               </div>

               {/* Days Until Next Trip  Count*/}
               <div className="p-4 border rounded-xl bg-white border-none shadow-md">
                  <p className="text-sm text-gray-500">Days Until Next Trip</p>
                  <p className="text-3xl font-bold">
                     {daysLeft ?? "—"}
                  </p>
               </div>
            </div>

            {/* Upcoming Trips */}
            <div className="mt-6">
               <h1 className="text-lg md:text-2xl lg:text-4xl font-semibold">
                  Upcoming Trips
               </h1>
               <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-6">
                  {upcomingCount > 0 ? (
                     upcomingTrips.map((trip) => {
                        return (

                           <div
                              key={trip.id}
                              className="rounded-xl overflow-hidden bg-white shadow-md border border-gray-100"
                           >
                              <img
                                 src={trip.imageUrl || "/images/default-trip.jpg"}
                                 alt={trip.title}
                                 className="w-full h-40 object-cover"
                              />

                              <div className="p-4">
                                 <h2 className="text-lg font-semibold text-gray-800">
                                    {trip.title}
                                 </h2>

                                 <p className="text-sm text-gray-500 mt-1">
                                    {trip.startDate.toDateString()} — {trip.endDate.toDateString()}
                                 </p>

                                 <Link href={`/trips/${trip.id}`} className="block mt-4">
                                    <button className="w-full bg-primary text-white py-2 rounded-md hover:bg-primary-dark transition">
                                       View Trip
                                    </button>
                                 </Link>
                              </div>
                           </div>



                        )
                     })
                  ) : (
                     <p className="text-sm text-gray-500">No upcoming trips yet</p>
                  )}
               </div>

            </div>
         </Container>

      </>
   )
}