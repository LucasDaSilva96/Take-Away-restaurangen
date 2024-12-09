import { JWT_SECRET, ROLE_KEY, USER_KEY } from "@/constants/localStorageKeys";
import { User_login_Response } from "./auth";

// saveTokenToLocalStorage is a function that takes a JWT token as an argument and saves it to the local storage.
export function saveTokenToLocalStorage(token: string) {
  localStorage.setItem(JWT_SECRET, token);
}

// getTokenFromLocalStorage is a function that retrieves the JWT token from the local storage.
export function getTokenFromLocalStorage() {
  return localStorage.getItem(JWT_SECRET);
}

// removeTokenFromLocalStorage is a function that removes the JWT token from the local storage.
export function removeTokenFromLocalStorage() {
  localStorage.removeItem(JWT_SECRET);
}

// saveUserToLocalStorage is a function that takes a User_Get object as an argument and saves it to the local storage.
export const saveUserToLocalStorage = (user: User_login_Response) => {
  localStorage.setItem(USER_KEY, JSON.stringify(user.token));
};

export const saveUserRoleToLocalStorage = (role: string) => {
  localStorage.setItem(ROLE_KEY, role);
};

// getUserFromLocalStorage is a function that retrieves the User_Get object from the local storage.
export const getUserFromLocalStorage = () => {
  const user = localStorage.getItem(USER_KEY);

  if (user) {
    const token = JSON.parse(user) as string;
    return token.replace(/"/g, "");
  }

  return null;
};

// removeUserFromLocalStorage is a function that removes the User_Get object from the local storage.
export const removeUserFromLocalStorage = () => {
  localStorage.removeItem(USER_KEY);
};
