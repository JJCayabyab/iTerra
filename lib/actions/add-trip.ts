"use server";

import { auth } from "@/auth";
import { prisma } from "../prisma";
import { redirect } from "next/navigation";

export async function AddTrip(formData: FormData) {
  const session = await auth();

  //check if user is authenticated
  if (!session || !session.user?.id) {
    throw new Error("Not authenticated");
  }

  const startDateStr = formData.get("startDate")?.toString();
  const endDateStr = formData.get("endDate")?.toString();
  const title = formData.get("title")?.toString();
  const description = formData.get("description")?.toString();
  const imageUrl = formData.get("imageUrl")?.toString();

  //validate if all fields are filled
  if (!title || !description || !startDateStr || !endDateStr) {
    throw new Error("Missing required fields");
  }

  const startDate = new Date(startDateStr!);
  const endDate = new Date(endDateStr!);

  //create trip in database
  await prisma.trip.create({
    data: {
      title,
      description,
      startDate,
      endDate,
      imageUrl,
      userId: session.user?.id,
    },
  });

  redirect("/trips");
}
