"use server";

import { BASE_API_URL, JWT_SECRET } from "@/constants/localStorageKeys";
import { User_Get } from "@/types/user";

export async function getUser(JWT: string) {
  try {
    const response = await fetch(`${BASE_API_URL}/auth/userfind`, {
      method: "POST",
      body: JWT,
      headers: {
        "Content-Type": "application/json",
        Authorization: JWT,
      },
      cache: "no-store",
    });

    if (!response.ok) {
      throw new Error("User not found");
    }
    const data = await response.json();
    return data.data as User_Get;
  } catch (error) {
    console.error("Error fetching user", error);
    throw new Error("Error fetching user");
  }
}
