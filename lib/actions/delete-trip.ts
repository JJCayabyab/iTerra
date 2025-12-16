"use server";

import { auth } from "@/auth";
import { prisma } from "../prisma";
import { redirect } from "next/navigation";

export default async function DeleteTrip(tripId: string) {
  const session = await auth();

  //check if user is authenticated
  if (!session || !session.user?.id) {
    throw new Error("Not authenticated");
  }

  const trip = await prisma.trip.findUnique({
    where: { id: tripId },
  });

  //check if trip exists and user is authorized to delete it
  if (trip?.userId !== session.user?.id) {
    throw new Error("You are not authorized to delete this trip");
  }

  await prisma.trip.delete({
    where: { id: tripId },
  });

  // Redirect to trips page after deletion
  redirect("/trips");
}
