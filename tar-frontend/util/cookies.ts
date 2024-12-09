"use server";

import { JWT_SECRET } from "@/constants/localStorageKeys";
import { cookies } from "next/headers";

export async function saveTokenAsCookie(token: string) {
  const cookie = await cookies();
  cookie.set(JWT_SECRET, token);
}

export async function removeTokenAsCookie() {
  const cookie = await cookies();
  cookie.delete(JWT_SECRET);
}
