"use server";
import { prisma } from "../prisma";
import { auth } from "@/auth";
export async function UpdateLocationOrder(
  locations: { id: string; order: number }[]
) {
  const session = await auth();

  // Check if user is authenticated
  if (!session || !session.user?.id) {
    return { error: "Not authenticated" };
  }

  const updates = locations.map((loc) =>
    prisma.location.update({
      where: {
        id: loc.id,
        trip: {
          userId: session.user?.id,
        },
      },
      data: { order: loc.order },
    })
  );

  return await prisma.$transaction(updates);
}
