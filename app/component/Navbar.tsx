import Image from "next/image";
import Link from "next/link";
import { auth } from "@/auth";
import SignInButtons from "./auth/SignInButtons";
import SignOutButton from "./auth/SignOutButton";

export default async function Navbar() {
    const session = await auth();

    return (
        <nav className="bg-white shadow-md py-1 sticky top-0 z-50">
            <div className="container mx-auto flex justify-between items-center px-6 lg:px-12">

                <Link href="/" className="flex items-center">
                    <Image
                        src="/iterra.svg"
                        alt="Iterra Logo"
                        className="w-32 md:w-36 lg:w-40 h-auto"
                        width={0}
                        height={0}
                        sizes="100vw"
                    />
                </Link>


                <div className="hidden md:flex items-center space-x-4 font-medium">


                    {session?.user ? (
                        <>
                            <Link href="/trips" className="text-black hover:text-blue-900">
                                Trips
                            </Link>
                            <Link href="/globe" className="text-black hover:text-blue-900">
                                3D Globe
                            </Link>
                            <SignOutButton />
                        </>

                    ) : (
                        <SignInButtons />
                    )}
                </div>

            </div>
        </nav>
    );
}
