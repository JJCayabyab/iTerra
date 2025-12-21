"use client";
import { AddTrip } from "@/lib/actions/add-trip"
import { UploadButton } from "@/lib/uploadthing";
import { useState } from "react";
import Image from "next/image";
import Button from "@/app/component/ui/Button";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";


export default function NewTripForm() {
    const [imageUrl, setImageUrl] = useState<string | null>(null);
    const [pending, setPending] = useState(false);
    const [startDate, setStartDate] = useState<string>("");
    const today = new Date().toISOString().split("T")[0];
    const router = useRouter();

    // Function to handle form submission
    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        setPending(true);

        //  FormData object to hold the form data
        const formData = new FormData(event.currentTarget);

        try {
            const response = await AddTrip(formData);

            if (response?.error) {
                throw new Error(response.error);
            }
            //show success toast
            toast.success("Trip created successfully!", {
                duration: 4000,
                position: "top-center",
            });

            router.push("/trips");

        } catch (error) {
            console.error(error);
            //show error toast
            toast.error("Failed to create trip. Please try again.", {
                duration: 4000,
                position: "top-center",
            });
        } finally {
            setPending(false);
        }
    };

    return (
        <>
            <form className="space-y-6" onSubmit={handleSubmit}>
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Trip Name</label>
                    <input
                        type="text"
                        name="title"
                        className="w-full border border-gray-300 px-3 py-2 outline-none rounded-md focus:border-primary"
                        placeholder="(e.g., Brazil Trip, Hawaiian Vacation, Tokyo Trip)"
                        required
                        disabled={pending}
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
                    <textarea
                        name="description"
                        className="w-full border border-gray-300 px-3 py-2 outline-none rounded-md focus:border-primary"
                        placeholder="Trip description"
                        required
                        disabled={pending}
                    />
                </div>
                <div className="space-y-4 gap-4 md:flex">
                    <div className="md:w-1/2">
                        <label className="block text-sm font-medium text-gray-700 mb-2">Start Date</label>
                        <input
                            type="date"
                            name="startDate"
                            className="w-full border border-gray-300 px-3 py-2 outline-none rounded-md focus:border-primary"
                            required
                            disabled={pending}
                            onChange={(e) => {
                                setStartDate(e.target.value);
                            }}
                            min={today}
                        />
                    </div>
                    <div className="md:w-1/2">
                        <label className="block text-sm font-medium text-gray-700 mb-2">End Date</label>
                        <input
                            type="date"
                            name="endDate"
                            className="w-full border border-gray-300 px-3 py-2 outline-none rounded-md focus:border-primary"
                            required
                            disabled={pending}
                            min={startDate}
                        />
                    </div>
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Trip Image</label>
                    {imageUrl && (
                        <div className="mb-3">
                            <Image src={imageUrl} alt="Trip Image" width={400} height={150} className="w-full rounded-lg" />
                        </div>
                    )}
                    <div className={pending ? "opacity-50 pointer-events-none" : ""}>
                        <UploadButton
                            endpoint="imageUploader"
                            onClientUploadComplete={(res) => {
                                if (res && res[0].ufsUrl) {
                                    setImageUrl(res[0].ufsUrl)
                                }
                            }}
                            onUploadError={(error: Error) => {
                                console.error("Upload Error", error)
                            }}
                        />
                    </div>
                    <input type="hidden" name="imageUrl" value={imageUrl || ""} />
                </div>
                <Button
                    disabled={pending}
                    btnName={pending ? "Creating Trip..." : "Create Trip"}
                    className="w-full text-lg"
                    type="submit"
                />
            </form>
        </>
    );
}