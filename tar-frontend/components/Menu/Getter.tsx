"use server";

export async function getMenuItems() {
  const API_URL = process.env.API_URL;

  try {
    const response = await fetch(`${API_URL}/menu`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      cache: "no-store", // or 'force-cache' depending on your needs
    });

    if (!response.ok) {
      throw new Error("Failed to fetch menu items");
    }

    const data = await response.json();
    return data.menu;
  } catch (error) {
    console.error("Error fetching menu items:", error);
    return [];
  }
}
