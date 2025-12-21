"use client";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { Menu, X } from "lucide-react";
import SignInButtons from "./auth/SignInButtons";
import SignOutButton from "./auth/SignOutButton";
import { Session } from "next-auth";

interface NavbarProps {
    session: Session | null;
}

export default function Navbar({ session }: NavbarProps) {
    const [isOpen, setIsOpen] = useState<boolean>(false);

    return (
        <nav className="bg-white shadow-md py-1 sticky top-0 z-50">
            <div className="container mx-auto flex justify-between items-center px-6 lg:px-12">
                {/* Logo */}
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

                {/* Desktop Menu */}
                <div className="hidden md:flex items-center space-x-4 font-medium">
                    {session?.user ? (
                        <>
                            <Link href="/" className="text-black hover:text-blue-900">
                                Home
                            </Link>
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

                {/* Mobile Hamburger Button */}
                <button
                    onClick={() => setIsOpen(!isOpen)}
                    className="md:hidden text-black hover:text-blue-900 transition"
                    aria-label="Toggle menu"
                >
                    {isOpen ? <X size={28} className="text-primary" /> : <Menu size={28} className="text-primary" />}
                </button>
            </div>

            {/* Mobile Menu */}
            {isOpen && (
                <div className="md:hidden bg-white border-t border-gray-200 shadow-lg">
                    <div className="flex flex-col space-y-4 px-6 py-4 font-medium">
                        {session?.user ? (
                            <>
                                <Link
                                    href="/"
                                    className="text-black hover:text-blue-900 py-2"
                                    onClick={() => setIsOpen(false)}
                                >
                                    Home
                                </Link>
                                <Link
                                    href="/trips"
                                    className="text-black hover:text-blue-900 py-2"
                                    onClick={() => setIsOpen(false)}
                                >
                                    Trips
                                </Link>
                                <Link
                                    href="/globe"
                                    className="text-black hover:text-blue-900 py-2"
                                    onClick={() => setIsOpen(false)}
                                >
                                    3D Globe
                                </Link>
                                <div onClick={() => setIsOpen(false)}>
                                    <SignOutButton />
                                </div>
                            </>
                        ) : (
                            <div onClick={() => setIsOpen(false)}>
                                <SignInButtons />
                            </div>
                        )}
                    </div>
                </div>
            )}
        </nav>
    );
}