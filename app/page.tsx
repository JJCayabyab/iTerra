import { auth } from "@/auth";
import Image from "next/image";
import Link from "next/link";
import Container from "./component/Container";
import {
  Map,
  Globe,
  CalendarRange,
  LayoutDashboard,
  LogIn,
  PlaneTakeoff,
} from "lucide-react";
import SignInButtons from "./component/auth/SignInButtons";
import ChatBot from "./component/ChatBot";


function BentoBox({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <div className={`relative overflow-hidden rounded-lg  md:rounded-2xl bg-white shadow-md border border-gray-100 ${className}`}>
      {children}
    </div>
  );
}

export default async function HomePage() {
  const session = await auth();

  return (
    <div className="min-h-screen">
      <Container>
        {/* Hero Section */}
        <section className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center py-12 md:py-24">
          {/* Left Contents */}
          <div className="space-y-6 text-center lg:text-left order-1 lg:order-1">
            <span className="inline-block rounded-full bg-primary/10 px-4 py-1 text-sm font-medium text-primary">
              Travel smarter with iTerra
            </span>

            <h1 className="text-4xl md:text-6xl font-extrabold leading-tight tracking-tight">
              Plan, track, and visualize your trips with{" "}
              <span className="text-accent">iTerra</span>
            </h1>

            <p className="text-gray-600 max-w-xl mx-auto lg:mx-0 text-lg">
              A modern travel planner that lets you create itineraries,
              track adventures, and explore your journey using interactive
              2D maps and a 3D globe.
            </p>

            <div className="flex flex-wrap justify-center lg:justify-start gap-4">
              {session === null ? (
                <SignInButtons />
              ) : (
                <Link
                  href="/trips"
                  className="rounded-xl bg-white px-8 py-4 font-bold text-primary shadow-md hover:shadow-lg border border-gray-100 transition-all active:scale-95"
                >
                  View Trips
                </Link>
              )}
            </div>
          </div>

          {/* Right Contents  */}
          <div className="relative h-[450px] md:h-[550px] w-full mt-10 lg:mt-0 order-2 lg:order-2">

            <div className="grid grid-cols-4 grid-rows-4 gap-3 h-full w-full">

              <BentoBox className="col-span-3 row-span-2">
                <Image
                  src="/images/japan.jpg"
                  alt="Japan"
                  fill
                  className="object-cover opacity-90"
                />

              </BentoBox>


              <BentoBox className="col-span-1 row-span-3">
                <Image
                  src="/images/paris.jpg"
                  alt="Paris"
                  fill
                  className="object-cover"
                />
              </BentoBox>


              <BentoBox className="col-span-1 row-span-2 bg-primary flex flex-col items-center justify-center text-white">
                <Image
                  src="/images/palawan.jpeg"
                  alt="Palawan"
                  fill
                  className="object-cover"
                />
              </BentoBox>

              <BentoBox className="col-span-2 row-span-2">
                <Image
                  src="/images/switzerland.jpg"
                  alt="Switzerland"
                  fill
                  className="object-cover"
                />
              </BentoBox>


              <BentoBox className="col-span-1 row-span-1 bg-accent/10 flex items-center justify-center">
                <Image
                  src="/images/barcelona.jpg"
                  alt="Barcelona"
                  fill
                  className="object-cover"
                />
              </BentoBox>

            </div>
          </div>
        </section>

        {/* ChatBot Section */}
        <ChatBot />

        {/* Powered By Section */}
        <section className="mt-12">
          <h2 className="text-3xl font-bold text-center mb-14">Powered by</h2>
          <div className="grid grid-cols-3 lg:grid-cols-6 justify-center gap-5">
            {[
              { src: "/images/icons/nextjs-icon.png", name: "Next.js" },
              { src: "/images/icons/neondb-icon.png", name: "NeonDB" },
              { src: "/images/icons/postgre-icon.png", name: "PostgreSQL" },
              { src: "/images/icons/tailwind-icon.png", name: "Tailwind CSS" },
              { src: "/images/icons/prisma-icon.png", name: "Prisma" },
              { src: "/images/icons/maplibre-icon.svg", name: "MapLibre" },
            ].map((tech) => (
              <div key={tech.name} className="group relative flex flex-col items-center">
                <span className="pointer-events-none absolute -top-10 rounded-md bg-gray-900 px-3 py-1 text-sm text-white opacity-0 shadow-lg transition-all duration-200 group-hover:opacity-100 group-hover:-top-12">
                  {tech.name}
                </span>
                <Image src={tech.src} width={100} height={100} alt={tech.name} className="transition-transform duration-200 group-hover:scale-110" />
              </div>
            ))}
          </div>
        </section>

        {/* Features */}
        <section className="py-24" id="features">
          <h2 className="text-3xl font-bold text-center mb-14">
            Everything you need for your journey
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
            {[
              { title: "Trip & Itinerary Planning", desc: "Create trips, manage destinations, and customize your itinerary with ease.", icon: CalendarRange },
              { title: "Dashboard Overview", desc: "See total trips, upcoming adventures, ongoing trips, and completed journeys.", icon: LayoutDashboard },
              { title: "2D Map Visualization", desc: "View your itinerary on an interactive map to better understand your route.", icon: Map },
              { title: "3D Globe Experience", desc: "Explore visited and planned locations through an immersive 3D globe.", icon: Globe },
              { title: "Secure Authentication", desc: "Quick and safe sign-in using Google or GitHub authentication.", icon: LogIn },
              { title: "Built for Travelers", desc: "Designed to keep your adventures organized and stress-free.", icon: PlaneTakeoff },
            ].map((feature, i) => (
              <div key={i} className="group rounded-2xl bg-white p-8 shadow-md hover:shadow-xl transition">
                <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary group-hover:bg-primary group-hover:text-white transition">
                  <feature.icon className="h-6 w-6" />
                </div>
                <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                <p className="text-gray-600 text-sm">{feature.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Call to Action */}
        <section className="relative py-24 bg-cover bg-center bg-no-repeat rounded-3xl overflow-hidden" style={{ backgroundImage: "url('/images/CTA.png')" }}>
          <div className="absolute inset-0 bg-black/20"></div>
          <div className="relative z-10 max-w-4xl mx-auto text-center px-6">
            <h2 className="text-3xl md:text-4xl font-bold  mb-4 text-accent-light!">Your next adventure starts here</h2>
            <p className="mx-auto max-w-xl text-white/90 mb-8">Plan your trips, visualize your journey, and relive your adventures — all in one place with iTerra.</p>
            <Link href="/trips/new" className="inline-block rounded-xl bg-white px-8 py-3 font-semibold text-primary shadow hover:bg-primary hover:text-white transition">
              Start Planning
            </Link>
          </div>
        </section>
      </Container>
    </div>

  );
}