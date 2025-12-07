'use client';
import { login } from "@/lib/auth-actions"; // Server action

export default function SignInButtons() {
    return (
        <>
            {/* Google Sign In */}
            <form action={() => login("google")}>
                <button
                    type="submit"
                    className="bg-accent px-4 py-2 rounded-lg text-sm hover:bg-[#DB760F] transition text-white"
                >
                    Sign in with Google
                </button>
            </form>

            {/* GitHub Sign In */}
            <form action={() => login("github")}>
                <button
                    type="submit"
                    className="bg-gray-700 px-4 py-2 rounded-lg text-sm hover:bg-gray-600 transition text-white"
                >
                    Sign in with GitHub
                </button>
            </form>
        </>
    );
}
