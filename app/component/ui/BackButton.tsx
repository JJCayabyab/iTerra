"use client"
import { useRouter } from "next/navigation";
export default function BackButton({ href }: { href: string }) {
    const router = useRouter();

    return (
        <button
            onClick={() => router.push(href)}
             className="text-primary hover:underline mb-4"
        >
            ← Back
        </button>
    );
}
