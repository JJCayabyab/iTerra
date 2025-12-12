"use server";

import { auth } from "@/auth";
import { prisma } from "../prisma";
import { redirect } from "next/navigation";

export async function AddLocation(formData: FormData) {
  const session = await auth();

  // Check if user is authenticated
  if (!session || !session.user?.id) {
    throw new Error("Not authenticated");
  }

  // 
  const locationTitle = formData.get("locationTitle")?.toString();
  const latStr = formData.get("lat")?.toString();
  const lngStr = formData.get("lng")?.toString();
  const tripId = formData.get("tripId")?.toString();

  // Validate required fields
  if (!locationTitle || !latStr || !lngStr || !tripId) {
    throw new Error("Missing required fields");
  }

  const lat = parseFloat(latStr);
  const lng = parseFloat(lngStr);

  // Create location in the database
  await prisma.location.create({
    data: {
      locationTitle,
      lat,
      lng,
      tripId,
    },
  });


  redirect(`/trips/${tripId}`);
}
