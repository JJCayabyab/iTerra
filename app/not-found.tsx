import Link from "next/link";
import { Home, MapPinned, Search } from "lucide-react";
import Container from "./component/Container";

export default function NotFound() {
    return (
        <Container>
            <div className="flex flex-col items-center justify-center min-h-[85vh] px-4 py-12">

                <div className="text-center p-6 md:p-12 bg-white border border-gray-100 rounded-[2rem] shadow-xl max-w-xl w-full relative overflow-hidden">

                    <div className="absolute top-0 right-0 -mr-8 -mt-8 h-24 w-24 md:h-32 md:w-32 rounded-full bg-accent/5 blur-3xl" />
                    <div className="absolute bottom-0 left-0 -ml-8 -mb-8 h-24 w-24 md:h-32 md:w-32 rounded-full bg-primary/5 blur-3xl" />


                    <div className="flex justify-center mb-6 md:mb-8">
                        <div className="relative">
                            <div className="h-16 w-16 md:h-20 md:w-20 bg-primary/10 rounded-lg flex items-center justify-center ">
                                <MapPinned className="h-8 w-8 md:h-10 md:w-10 text-primary" />
                            </div>
                            <div className="absolute -bottom-4 -right-1 h-8 w-8 md:h-10 md:w-10 bg-red-500 rounded-lg flex items-center justify-center  shadow-lg">
                                <Search className="h-4 w-4 md:h-5 md:w-5 text-white" />
                            </div>
                        </div>
                    </div>

                    {/* Text Content */}
                    <h1 className="text-5xl md:text-7xl font-black text-gray-100 mb-2 leading-none">
                        404
                    </h1>
                    <h2 className="text-xl md:text-3xl font-bold text-gray-900 mb-4">
                        Destination Not Found
                    </h2>
                    <p className="text-gray-500 text-sm md:text-lg mb-8 max-w-sm mx-auto">
                        It looks like you&apos;ve wandered off the map. The page you&apos;re looking for
                        doesn&apos;t exist or has been moved.
                    </p>


                    <div className="flex flex-col sm:flex-row gap-3 justify-center">
                        <Link
                            href="/"
                            className="flex items-center justify-center gap-2 px-6 md:px-8 py-3.5 bg-primary text-white font-bold rounded-xl shadow-md hover:bg-primary/90 transition-all active:scale-95 w-full sm:w-auto"
                        >
                            <Home className="h-5 w-5" />
                            Return Home
                        </Link>

                        <Link
                            href="/trips"
                            className="flex items-center justify-center gap-2 px-6 md:px-8 py-3.5 bg-white text-gray-700 border border-gray-200 font-bold rounded-xl hover:bg-gray-50 transition-all active:scale-95 w-full sm:w-auto"
                        >
                            Explore Trips
                        </Link>
                    </div>


                </div>
            </div>
        </Container>
    );
}