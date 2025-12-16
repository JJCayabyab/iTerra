"use server";

import { auth } from "@/auth";
import { prisma } from "../prisma";
import { redirect } from "next/navigation";

export default async function DeleteTrip(tripId: string) {

    // Delete trip by id
    await prisma.trip.delete({
        where: { id: tripId },
    });
}