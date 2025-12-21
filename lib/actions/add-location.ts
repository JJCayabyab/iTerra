"use server";

import { auth } from "@/auth";
import { prisma } from "../prisma";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
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

  // Get the current max order for this trip
  const maxOrderLocation = await prisma.location.findFirst({
    where: { tripId },
    orderBy: { order: "desc" },
    select: { order: true },
  });

  const newOrder = (maxOrderLocation?.order ?? -1) + 1;

  // Create location in the database
  await prisma.location.create({
    data: {
      locationTitle,
      lat,
      lng,
      tripId,
      order: newOrder,
    },
  });
  
  revalidatePath(`/trips/${tripId}`);
  redirect(`/trips/${tripId}`);
}
