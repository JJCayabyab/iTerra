'use client';
import { login } from "@/lib/auth-actions"; // Server action
import { FaGithub } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";

export default function SignInButtons() {
    return (
        <div className="flex flex-col md:flex-row gap-3">
            {/* Google Sign In */}
            <form action={() => login("google")}>
                <button
                    type="submit"
                    className="flex items-center justify-center gap-2 px-4 py-2 rounded-lg text-sm font-medium bg-white text-black hover:bg-gray-100 transition-shadow shadow-sm"
                >
                    <FcGoogle className="w-5 h-5" />
                    Sign in with Google
                </button>
            </form>

            {/* GitHub Sign In */}
            <form action={() => login("github")}>
                <button
                    type="submit"
                    className="flex items-center justify-center gap-2 px-4 py-2 rounded-lg text-sm font-medium bg-black text-white hover:bg-gray-800 transition-shadow shadow-sm"
                >
                    <FaGithub className="w-5 h-5" />
                    Sign in with GitHub
                </button>
            </form>
        </div>
    );
}
