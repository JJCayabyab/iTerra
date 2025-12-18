import { auth } from "@/auth"
import SignInRequired from "../component/auth/SignInRequired"
import Button from "../component/ui/Button"
import Container from "../component/Container"
import Link from "next/link"
import { prisma } from "@/lib/prisma"
import { FaRegCalendarAlt, FaMapMarkerAlt } from "react-icons/fa"
import TripCard from "../component/ui/TripGridCard"
export default async function TripsPage() {
   const session = await auth()

   // check if user is authenticated
   if (!session) {
      return <SignInRequired />
   }

   const trips = await prisma.trip.findMany({
      where: {
         userId: session?.user?.id
      }
   })

   const now = new Date()

   // for ongoing trips
   const ongoingTrips = trips.filter((trip) => {
      return trip.startDate <= now && trip.endDate >= now
   })

   // for upcoming trips 
   const upcomingTrips = trips
      .filter((trip) => trip.startDate > now)
      .sort((a, b) => a.startDate.getTime() - b.startDate.getTime())

   // for completed trips 
   const completedTrips = trips
      .filter((trip) => trip.endDate < now)
      .sort((a, b) => b.startDate.getTime() - a.startDate.getTime()) // Sort by most recent


   const totalTrips = trips.length
   const upcomingCount = upcomingTrips.length
   const ongoingCount = ongoingTrips.length

   // Get the very next trip for the countdown
   const nextTrip = upcomingTrips[0] 

   const daysLeft = nextTrip
      ? Math.ceil(
         (nextTrip.startDate.getTime() - now.getTime()) /
         (1000 * 60 * 60 * 24)
      )
      : null

   return (
      <div className="bg-slate-50 min-h-screen pb-20">
         <Container>
            {/* Header */}
            <div className="flex justify-between items-center pt-10">
               <h1 className="text-xl md:text-3xl lg:text-4xl font-bold text-slate-800">
                  <span className="font-light text-slate-500">Welcome Back,</span> {session.user?.name}
               </h1>

               <Link href="/trips/new">
                  <Button
                     btnName="Add Trip"
                     className="text-sm md:text-lg" />
               </Link>
            </div>

            {/* Stats Section */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
               {/* Total Trips  */}
               <div className="p-6 bg-white rounded-xl shadow-sm border border-slate-100 border-l-4 border-l-blue-500">
                  <p className="text-sm font-medium text-slate-500 uppercase tracking-wide">Total Trips</p>
                  <p className="text-3xl font-extrabold text-slate-800 mt-2">{totalTrips}</p>
               </div>

               {/* Upcoming Trips  */}
               <div className="p-6 bg-white rounded-xl shadow-sm border border-slate-100 border-l-4 border-l-emerald-500">
                  <p className="text-sm font-medium text-slate-500 uppercase tracking-wide">Upcoming Trips</p>
                  <p className="text-3xl font-extrabold text-slate-800 mt-2">{upcomingCount}</p>
               </div>

               {/* Days Until Next Trip*/}
               <div className="p-6 bg-white rounded-xl shadow-sm border border-slate-100 border-l-4 border-l-amber-500">
                  <p className="text-sm font-medium text-slate-500 uppercase tracking-wide">Next Adventure In</p>
                  <div className="flex items-baseline gap-1 mt-2">
                     <p className="text-3xl font-extrabold text-slate-800">
                        {ongoingCount > 0 ? "Now!" : (daysLeft ?? "—")}
                     </p>
                     {daysLeft && ongoingCount === 0 && <span className="text-sm text-slate-400 font-medium">days</span>}
                  </div>
               </div>
            </div>

            {/* Ongoing Trips */}
            {ongoingTrips.length > 0 && (
               <div className="mt-12">
                  <div className="flex items-center gap-3 mb-6">
                     <span className="relative flex h-3 w-3">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500"></span>
                     </span>
                     <h2 className="text-2xl font-bold text-slate-800">Happening Now</h2>
                  </div>

                  <div className="grid grid-cols-1 gap-6">
                     {ongoingTrips.map((trip) => {

                        const totalDuration = trip.endDate.getTime() - trip.startDate.getTime();

                        // Calculate how much time has elapsed since the trip started in milliseconds
                        const elapsed = now.getTime() - trip.startDate.getTime();

                        // Calculate the progress percentae for the progress bar
                        // Ensure it stays between 0% and 100%
                        const percentage = Math.min(100, Math.max(0, (elapsed / totalDuration) * 100));

                        const currentDay = Math.ceil(elapsed / (1000 * 60 * 60 * 24));
                        const totalDays = Math.ceil(totalDuration / (1000 * 60 * 60 * 24));

                        return (
                           <div
                              key={trip.id}
                              className="bg-white rounded-2xl overflow-hidden shadow-md border border-emerald-100 flex flex-col md:flex-row"
                           >
                              {/* Image for Ongoing */}
                              <div className="relative w-full md:w-1/3 h-48 md:h-auto">
                                 <img
                                    src={trip.imageUrl || "/images/default-trip.jpg"}
                                    alt={trip.title}
                                    className="w-full h-full object-cover"
                                 />
                                 <div className="absolute top-4 left-4 bg-emerald-500 text-white px-4 py-1 rounded-full text-xs font-bold shadow-sm uppercase tracking-wider">
                                    Current Trip
                                 </div>
                              </div>

                              <div className="p-6 md:p-8 flex-1 flex flex-col justify-center">
                                 <div className="flex flex-col md:flex-row justify-between items-start">
                                    <h3 className="text-2xl md:text-3xl font-bold text-slate-800 mb-2">
                                       {trip.title}
                                    </h3>
                                    <span className=" text-emerald-600 font-semibold bg-emerald-50 px-1 md:px-2 py-1  rouded:sm md:rounded-md text-sm">
                                       Day {currentDay} of {totalDays}
                                    </span>
                                 </div>

                                 <div className="flex items-center gap-2 text-slate-500 mb-6 mt-2">
                                    <FaRegCalendarAlt className="text-emerald-500" />
                                    <span className="font-medium">
                                       {trip.startDate.toLocaleDateString(undefined, { month: 'short', day: 'numeric' })}
                                       {' - '}
                                       {trip.endDate.toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' })}
                                    </span>
                                 </div>

                                 {/* Progress Bar */}
                                 <div className="w-full bg-slate-100 rounded-full h-2.5 mb-6">
                                    <div
                                       className="bg-emerald-500 h-2.5 rounded-full transition-all duration-1000"
                                       style={{ width: `${percentage}%` }}
                                    ></div>
                                 </div>

                                 <Link href={`/trips/${trip.id}`}>
                                    <button className="w-full py-2 rounded-lg text-sm font-medium bg-primary  hover:bg-primary-hover text-white">
                                       View Details
                                    </button>
                                 </Link>
                              </div>
                           </div>
                        )
                     })}
                  </div>
               </div>
            )}

            {/* Upcoming Trips  */}
            <div className="mt-16 mb-6 flex items-end gap-3">
               <h2 className="text-2xl font-bold text-slate-800">
                  {upcomingCount > 1 ? "Upcoming Trips" : "Upcoming Trip"}
               </h2>
               <div className="h-px bg-slate-200 flex-1 mb-3"></div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
               {upcomingCount > 0 ? (
                  upcomingTrips.map((trip) => (

                     <TripCard key={trip.id} trip={trip} variant="upcoming" />
                  ))
               ) : (
                  <div className="col-span-full py-12 text-center border-2 border-dashed border-slate-200 rounded-xl bg-slate-50/50">
                     <p className="text-slate-500 mb-2">No upcoming trips planned yet.</p>
                     <Link href="/trips/new" className="text-primary font-medium hover:underline">
                        Start planning your next adventure
                     </Link>
                  </div>
               )}
            </div>

            {/* Completed Trips */}
            <div className="mt-16 mb-6 flex items-end gap-3">
               <h2 className="text-2xl font-bold text-slate-800">
                  Completed Trips
               </h2>
               <div className="h-px bg-slate-200 flex-1 mb-3"></div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
               {completedTrips.length > 0 ? (
                  completedTrips.map((trip) => (
                     <TripCard key={trip.id} trip={trip} variant="completed" />
                  ))
               ) : (
                  <div className="col-span-full py-12 text-center border-2 border-dashed border-slate-200 rounded-xl bg-slate-50/50">
                     <Link href="/trips/new" className="text-primary font-medium hover:underline">
                        Start planning your first adventure
                     </Link>
                  </div>
               )}
            </div>
         </Container>
      </div>
   )
}