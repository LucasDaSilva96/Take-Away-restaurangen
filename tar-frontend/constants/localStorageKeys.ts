// The JWT_SECRET is defined in the .env file and is used to sign and verify JWT tokens.
export const JWT_SECRET = process.env.NEXT_PUBLIC_jwtSecret!;
// The USER_KEY is used to store the user object in the local storage.
export const USER_KEY = "resuyek";
// The CART_KEY is used to store the cart object in the local storage.
export const CART_KEY = process.env.NEXT_PUBLIC_CART_KEY!;
// The BASE_API_URL is defined in the .env file and is used to make requests to the backend API.
export const BASE_API_URL = process.env.NEXT_PUBLIC_API_URL!;
// The key for retrieving the user role from local storage.
export const ROLE_KEY = "twrRokeyle";
