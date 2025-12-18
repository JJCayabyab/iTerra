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

function CollageImage({
  src,
  alt,
  width,
  height,
  className,
}: {
  src: string;
  alt: string;
  width: number;
  height: number;
  className: string;
}) {
  return (
    <div
      className={`absolute rounded-xl bg-white p-[4px] shadow-md transition-all duration-500 ease-out hover:scale-110 hover:z-[100] hover:rotate-0 ${className}`}
    >
      <div className="relative overflow-hidden rounded-lg">
        <Image
          src={src}
          alt={alt}
          width={width}
          height={height}
          className="object-cover transition-transform duration-500 hover:scale-110"
          priority
        />
      </div>
    </div>
  );
}

export default async function HomePage() {
  const session = await auth();
  return (
    <Container>
      {/* Hero Section */}
      <section className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center py-12 md:py-24">
        {/* Left Contents */}
        <div className="space-y-6 text-center lg:text-left order-1">
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

        {/* Right Collage */}
        <div className="relative h-[450px] md:h-[550px] w-full mt-10 lg:mt-0 order-1 lg:order-2 scale-75 md:scale-90 lg:scale-100">
          {/* Background glows */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-64 w-64 rounded-full bg-accent/20 blur-[80px]" />
          <div className="absolute bottom-0 left-0 h-48 w-48 rounded-full bg-primary/10 blur-[80px]" />

          <div className="relative h-full w-full">
            <CollageImage
              src="/images/hero-iterra.png"
              alt="Iceland"
              className="top-0 left-[5%] -rotate-12 opacity-80 z-0"
              width={160}
              height={110}
            />
            <CollageImage
              src="/images/barcelona.jpg"
              alt="Barcelona"
              className="top-4 right-[5%] rotate-12 opacity-90 z-10"
              width={180}
              height={120}
            />
            <CollageImage
              src="/images/hawaii.jpg"
              alt="Hawaii"
              className="top-[15%] left-[35%] -rotate-3 z-20"
              width={200}
              height={140}
            />
            <CollageImage
              src="/images/japan.jpg"
              alt="Japan"
              className="top-[45%] left-[0%] rotate-6 z-30"
              width={220}
              height={150}
            />
            <CollageImage
              src="/images/palawan.jpeg"
              alt="Palawan"
              className="bottom-[20%] right-[20%] -rotate-6 z-40"
              width={240}
              height={160}
            />
            <CollageImage
              src="/images/paris.jpg"
              alt="Paris"
              className="bottom-0 left-[10%] rotate-12 z-50"
              width={190}
              height={130}
            />
            <CollageImage
              src="/images/switzerland.jpg"
              alt="Switzerland"
              className="bottom-4 right-[2%] rotate-2 scale-110 z-[60] shadow-2xl"
              width={220}
              height={150}
            />
          </div>
        </div>
      </section>

      {/* Powered By Section */}
      <section>
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
            <div
              key={tech.name}
              className="group relative flex flex-col items-center"
            >
              {/* Tooltip */}
              <span className="pointer-events-none absolute -top-10 rounded-md bg-gray-900 px-3 py-1 text-sm text-white opacity-0 shadow-lg transition-all duration-200 group-hover:opacity-100 group-hover:-top-12 group-focus-within:opacity-100">
                {tech.name}
              </span>

              {/* Icon */}
              <Image
                src={tech.src}
                width={100}
                height={100}
                alt={tech.name}
                className="transition-transform duration-200 group-hover:scale-110"
              />
            </div>
          ))}
        </div>
      </section>

      {/* Features */}
      <section className="py-24">
        <h2 className="text-3xl font-bold text-center mb-14">
          Everything you need for your journey
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {[
            {
              title: "Trip & Itinerary Planning",
              desc: "Create trips, manage destinations, and customize your itinerary with ease.",
              icon: CalendarRange,
            },
            {
              title: "Dashboard Overview",
              desc: "See total trips, upcoming adventures, ongoing trips, and completed journeys.",
              icon: LayoutDashboard,
            },
            {
              title: "2D Map Visualization",
              desc: "View your itinerary on an interactive map to better understand your route.",
              icon: Map,
            },
            {
              title: "3D Globe Experience",
              desc: "Explore visited and planned locations through an immersive 3D globe.",
              icon: Globe,
            },
            {
              title: "Secure Authentication",
              desc: "Quick and safe sign-in using Google or GitHub authentication.",
              icon: LogIn,
            },
            {
              title: "Built for Travelers",
              desc: "Designed to keep your adventures organized and stress-free.",
              icon: PlaneTakeoff,
            },
          ].map((feature, i) => (
            <div
              key={i}
              className="group rounded-2xl bg-white p-8 shadow-md hover:shadow-xl transition"
            >
              <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary group-hover:bg-primary group-hover:text-white transition">
                <feature.icon className="h-6 w-6" />
              </div>

              <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
              <p className="text-gray-600">{feature.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Call to Action */}
      <section
        className="relative py-24 bg-cover bg-center bg-no-repeat rounded-3xl"
        style={{ backgroundImage: "url('/images/hero-iterra.png')" }}
      >
        {/* Overlay */}
        <div className="absolute inset-0 bg-black/40 rounded-3xl"></div>

        {/* Content */}
        <div className="relative z-10 max-w-4xl mx-auto text-center px-6">
          <h2 className="text-3xl md:text-4xl font-bold text-accent-light! mb-4">
            Your next adventure starts here
          </h2>

          <p className="mx-auto max-w-xl text-white mb-8">
            Plan your trips, visualize your journey, and relive your adventures
            — all in one place with iTerra.
          </p>

          <Link
            href="/trips/new"
            className="inline-block rounded-xl bg-white px-8 py-3 font-semibold text-primary shadow hover:bg-primary hover:text-white  hover:shadow-lg transition"
          >
            Start Planning
          </Link>
        </div>
      </section>
    </Container>
  );
}
