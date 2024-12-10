'use server'

export async function getUser(JWT : string) {
    const API_URL = process.env.API_URL;

    try {
        const response = await fetch(`${API_URL}/auth/userfind`, {
            method: "POST",
            body: JWT,
            headers: {
                "Content-Type": "application/json",
                "Authorization": JWT
            },
            cache: "no-store",
        });

        if (!response.ok) {
            throw new Error("User not found");
        }
        const data = await response.json();
        return data.data;


    } catch (error) {
        console.error("Error fetching menu items:", error);
        return [];
    }
}
