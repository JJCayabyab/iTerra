'use client';
import { logout } from "@/lib/auth-actions";

export default function SignOutButton() {
    return (
        <form action={logout}>
            <button className="bg-red-600 px-4 py-2 rounded-lg text-sm hover:bg-red-700 transition text-white">
                Logout
            </button>
        </form>
    );
}
