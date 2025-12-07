"use server";

import { signIn, signOut } from "@/auth";

export const login = async (provider: "github" | "google") => {
  await signIn(provider, { callbackUrl: "/" });
};

export const logout = async () => {
  await signOut({ redirectTo: "/" });
};
