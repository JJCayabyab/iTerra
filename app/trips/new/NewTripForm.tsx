"use client";
import Button from "@/app/component/ui/button"
import { AddTrip } from "@/lib/actions/add-trip"
import { UploadButton } from "@/lib/uploadthing";
import { useState } from "react";
import Image from "next/image";

export default function NewTripForm() {
    const [imageUrl, setImageUrl] = useState<string | null>(null);
    const [pending, setPending] = useState(false);


    return (
        <>
            <form className="space-y-6" action={AddTrip}>
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