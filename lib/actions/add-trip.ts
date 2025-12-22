"use server";
import { rateLimit } from "@/app/redis";
import { auth } from "@/auth";
import { prisma } from "../prisma";
import { revalidatePath } from "next/cache";

export async function AddTrip(formData: FormData) {
  const session = await auth();

  // 1. Return an object instead of throwing for authentication
  if (!session || !session.user?.id) {
    return { error: "You must be logged in to create a trip." };
  }

  const { success } = await rateLimit.limit(`add-location:${session.user.id}`);

  if (!success) {
    return {
      success: false,
      error: "Too many requests. Please try again later.",
    };
  }

  const imageUrl = formData.get("imageUrl")?.toString();
  const startDateStr = formData.get("startDate")?.toString();
  const endDateStr = formData.get("endDate")?.toString();
  const title = formData.get("title")?.toString();
  const description = formData.get("description")?.toString();

  // 2. Return an object for validation errors
  if (!title || !description || !startDateStr || !endDateStr) {
    return { error: "All fields are required." };
  }

  try {
    const startDate = new Date(startDateStr);
    const endDate = new Date(endDateStr);

    await prisma.trip.create({
      data: {
        title,
        description,
        startDate,
        endDate,
        imageUrl,
        userId: session.user.id,
      },
    });

    revalidatePath("/trips");

    return { success: true };
  } catch (error) {
    console.error("Database Error:", error);
    return { error: "Something went wrong while saving the trip." };
  }
}
