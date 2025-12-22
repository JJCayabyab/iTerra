"use server";
import { rateLimit } from "@/app/redis";
import { auth } from "@/auth";
import { prisma } from "../prisma";

export async function AddLocation(formData: FormData) {
  const session = await auth();

  // Check if user is authenticated
  if (!session || !session.user?.id) {
    return{error:"You must be logged in to add a location."}
  }

  const { success } = await rateLimit.limit(`add-location:${session.user.id}`);

  if (!success) {
    return {
      success: false,
      error: "Too many requests. Please try again later.",
    };
  }
  const locationTitle = formData.get("locationTitle")?.toString();
  const latStr = formData.get("lat")?.toString();
  const lngStr = formData.get("lng")?.toString();
  const tripId = formData.get("tripId")?.toString();

  // Validate required fields
  if (!locationTitle || !latStr || !lngStr || !tripId) {
    return { error: "Please fill in all required fields." };
  }

  try {
    const lat = parseFloat(latStr);
    const lng = parseFloat(lngStr);

    const maxOrderLocation = await prisma.location.findFirst({
      where: { tripId },
      orderBy: { order: "desc" },
      select: { order: true },
    });

    const newOrder = (maxOrderLocation?.order ?? -1) + 1;

    await prisma.location.create({
      data: { locationTitle, lat, lng, tripId, order: newOrder },
    });

    return { success: true };
  } catch (error) {
    return {
      error: "An unexpected database error occurred.",
    };
  }
}
