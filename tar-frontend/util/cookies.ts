"use server";

import { JWT_SECRET, ROLE_KEY } from "@/constants/localStorageKeys";
import { cookies } from "next/headers";

export async function saveTokenAsCookie(token: string) {
  const cookie = await cookies();
  cookie.set(JWT_SECRET, token);
}
export async function saveRoleAsCookie(role: string) {
  const cookie = await cookies();
  cookie.set(ROLE_KEY, role);
}
export async function removeRoleAsCookie() {
  const cookie = await cookies();
  cookie.delete(ROLE_KEY);
}

export async function removeTokenAsCookie() {
  const cookie = await cookies();
  cookie.delete(JWT_SECRET);
}
