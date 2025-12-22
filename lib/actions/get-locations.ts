"use server";
import { auth } from "@/auth";
import { prisma } from "../prisma";

export default async function GetLocations() {
  const session = await auth();

  //check if user is authenticated
  if (!session || !session.user?.id) {
    return { error: "You must be logged in to view your trips." };
  }

  //return locations for trips that have ended
  const locations = await prisma.location.findMany({
    where: {
      trip: {
        userId: session.user.id,
        endDate: {
          lt: new Date(),
        },
      },
    },
  });
  return locations;
}
