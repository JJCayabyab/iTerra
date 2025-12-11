"use client"
import { useRouter } from "next/navigation";
export default function BackButton() {
    const router = useRouter();

    return (
        <button
            onClick={() => router.back()}   //
            className="text-primary hover:underline mb-4"
        >
            ← Back
        </button>
    );
}
