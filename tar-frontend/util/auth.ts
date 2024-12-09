import axios from "axios";
import { catchError } from "./catchError";
import { User_login_Post, User_Post } from "@/types/user";

import {
  saveTokenToLocalStorage,
  saveUserRoleToLocalStorage,
  saveUserToLocalStorage,
} from "./localStorage";
import {
  BASE_API_URL,
  JWT_SECRET,
  ROLE_KEY,
  USER_KEY,
} from "@/constants/localStorageKeys";
import { permanentRedirect } from "next/navigation";
import { saveTokenAsCookie } from "./cookies";
// The BASE_API_URL is defined in the .env file and is used to make requests to the backend API.

export type User_login_Response = {
  token: string;
  userId: string;
  userRole: "Admin" | "Customer";
  expiresIn: number;
};

// loginUser is an async function that makes a POST request to the /auth/login endpoint of the backend API. It takes an email and password as arguments and returns a User_login_Response object.
export async function loginUser({ email, password }: User_login_Post) {
  try {
    const response = await axios.post<User_login_Response>(
      BASE_API_URL + "/auth/sign-in",
      { email, password }
    );

    //Edit to allow for user to be stored. Previuosly only token was stored as the user.
    // Extract token and save it seperated. Do the same for the user object aswell as the current role.

    const token = response.data.token;
    console.log(token);
    saveTokenToLocalStorage(token);
    saveTokenAsCookie(token);
    const user = await getUserByJWT(token);
    saveUserToLocalStorage(user);
    saveUserRoleToLocalStorage(response.data.userRole);
    return response.data;
  } catch (error) {
    console.error(error);
    throw new Error(catchError(error));
  }
}

// registerUser is an async function that makes a POST request to the /auth/sign-up endpoint of the backend API. It takes an email and password as arguments and returns a message object.
export async function registerUser({ email, password, role }: User_Post) {
  try {
    const response = await axios.post<{ message: string }>(
      BASE_API_URL + "/auth/sign-up",
      { email, password, role }
    );

    return response.data;
  } catch (error) {
    console.error(error);
    throw new Error(catchError(error));
  }
}

// getUserByJWT is an async function that makes a POST request to the /auth/userfind endpoint of the backend API. It takes a JWT token as an argument and returns a User_login_Response object.
export const getUserByJWT = async (JWT: string) => {
  try {
    const response = await axios.post<User_login_Response>(
      BASE_API_URL + "/auth/userfind",
      { JWT },
      {
        headers: {
          Authorization: JWT,
        },
      }
    );

    return response.data;
  } catch (error) {
    console.error(error);
    throw new Error(catchError(error));
  }
};

// TODO: Implement logoutUser function

//A simple function to sign out users, clear all sensitive data and redirect to the home page.
export const logoutUser = async () => {
  const keysToDelete = [JWT_SECRET, USER_KEY, ROLE_KEY];

  keysToDelete.forEach((key) => {
    localStorage.removeItem(key);
  });

  permanentRedirect("/");
};
