import { auth } from "@/auth"
import SignInRequired from "../component/auth/SignInRequired"
import Button from "../component/ui/button"
import Container from "../component/Container"
import Link from "next/link"
import { prisma } from "@/lib/prisma"

export default async function TripsPage() {
   const session = await auth()

   // check if user is authenticated
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
                  <p className="text-sm font-medium text-slate-500 uppercase tracking-wide">Upcoming</p>
                  <p className="text-3xl font-extrabold text-slate-800 mt-2">{upcomingCount}</p>
               </div>

               {/* Days Until Next */}
               <div className="p-6 bg-white rounded-xl shadow-sm border border-slate-100 border-l-4 border-l-amber-500">
                  <p className="text-sm font-medium text-slate-500 uppercase tracking-wide">Next Adventure In</p>
                  <div className="flex items-baseline gap-1 mt-2">
                     <p className="text-3xl font-extrabold text-slate-800">
                        {daysLeft ?? "—"}
                     </p>
                     {daysLeft && <span className="text-sm text-slate-400 font-medium">days</span>}
                  </div>
               </div>
            </div>

            {/* Upcoming Trips Header */}
            <div className="mt-16 mb-6 flex items-end gap-3">
               <h2 className="text-2xl font-bold text-slate-800">
                  Upcoming Trips
               </h2>
               <div className="h-px bg-slate-200 flex-1 mb-2"></div>
            </div>

            {/* Trips Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
               {upcomingCount > 0 ? (
                  upcomingTrips.map((trip) => {
                     return (
                        <div
                           key={trip.id}
                           className="group bg-white rounded-2xl overflow-hidden shadow-sm border border-slate-100 hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
                        >
                     
                           <div className="relative h-48 overflow-hidden">
                              <img
                                 src={trip.imageUrl || "/images/default-trip.jpg"}
                                 alt={trip.title}
                                 className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                              />
                       
                              <div className="absolute top-3 left-3 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-bold text-slate-700 shadow-sm">
                                 {trip.startDate.toLocaleDateString(undefined, { month: 'short', day: 'numeric' })}
                              </div>
                           </div>

                           <div className="p-5">
                              <h3 className="text-lg font-bold text-slate-800 leading-tight">
                                 {trip.title}
                              </h3>

                              <div className="mt-2 flex items-center gap-2 text-sm text-slate-500">
                                 {/* Simple Calendar Icon SVG */}
                                 <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path></svg>
                                 <span>
                                    {trip.startDate.toDateString()}
                                 </span>
                              </div>

                              <Link href={`/trips/${trip.id}`} className="block mt-5">
                                 <button className="w-full py-2 rounded-lg text-sm font-medium bg-primary text-white">
                                    View Details
                                 </button>
                              </Link>
                           </div> 
                        </div>
                     )
                  })
               ) : (
                  <div className="col-span-full py-12 text-center border-2 border-dashed border-slate-200 rounded-xl bg-slate-50/50">
                     <p className="text-slate-500 mb-2">No upcoming trips planned yet.</p>
                     <Link href="/trips/new" className="text-indigo-600 font-medium hover:underline">
                        Start planning your next adventure
                     </Link>
                  </div>
               )}
            </div>
         </Container>
      </div>
   )
}