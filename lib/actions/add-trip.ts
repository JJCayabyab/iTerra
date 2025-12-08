import { auth } from "@/auth";

export default async function AddTrip(formData: FormData) {
  const session = await auth();

  if (!session) {
    throw new Error("Not authenticated");
  }

  const title = formData.get("title")?.toString();
  const description = formData.get("description")?.toString();
  const startDateStr = formData.get("startDate")?.toString();
  const endDateStr = formData.get("endDate")?.toString();

  if (!title || !description || !startDateStr || !endDateStr) {
    throw new Error("Missing required fields");
  }

  const startDate = new Date(startDateStr!);
  const endDate = new Date(endDateStr!);
}
