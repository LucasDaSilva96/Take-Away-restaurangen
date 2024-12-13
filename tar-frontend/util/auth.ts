import axios from 'axios';
import { catchError } from './catchError';
import { User_Get, User_login_Post, User_Post } from '@/types/user';

import {
  resetUserData,
  saveTokenToLocalStorage,
  saveUserRoleToLocalStorage,
} from './localStorage';
import {
  BASE_API_URL,
  JWT_SECRET,
  ROLE_KEY,
  USER_KEY,
} from '@/constants/localStorageKeys';
import { permanentRedirect } from 'next/navigation';
import {
  removeRoleAsCookie,
  removeTokenAsCookie,
  saveRoleAsCookie,
  saveTokenAsCookie,
} from './cookies';
import toast from 'react-hot-toast';
// The BASE_API_URL is defined in the .env file and is used to make requests to the backend API.

export type User_login_Response = {
  token: string;
  userId: string;
  userRole: 'Admin' | 'Customer';
  expiresIn: number;
};

// loginUser is an async function that makes a POST request to the /auth/login endpoint of the backend API. It takes an email and password as arguments and returns a User_login_Response object.
export async function loginUser({ email, password }: User_login_Post) {
  try {
    const response = await axios.post<User_login_Response>(
      BASE_API_URL + '/auth/sign-in',
      { email, password }
    );

    //Edit to allow for user to be stored. Previuosly only token was stored as the user.
    // Extract token and save it seperated. Do the same for the user object aswell as the current role.
    const token = response.data.token;
    saveTokenToLocalStorage(token);
    saveTokenAsCookie(token);
    saveUserRoleToLocalStorage(response.data.userRole);
    saveRoleAsCookie(response.data.userRole);
    return response.data;
  } catch (error) {
    console.error(error);
    toast.error(catchError(error));
  }
}

// registerUser is an async function that makes a POST request to the /auth/sign-up endpoint of the backend API. It takes an email and password as arguments and returns a message object.
export async function registerUser({
  email,
  password,
  role,
  username,
}: User_Post) {
  try {
    const response = await axios.post<{ message: string }>(
      BASE_API_URL + '/auth/sign-up',
      { email, password, role, username }
    );

    return response.data;
  } catch (error) {
    console.error(error);
    toast.error(catchError(error));
  }
}

// getUserByJWT is an async function that makes a POST request to the /auth/userfind endpoint of the backend API. It takes a JWT token as an argument and returns a User_login_Response object.
export const getUserByJWT = async (JWT: string) => {
  try {
    const response = await axios.post<{ data: User_Get }>(
      BASE_API_URL + '/auth/userfind',
      { JWT },
      {
        headers: {
          Authorization: JWT,
        },
      }
    );

    return response.data.data;
  } catch (error) {
    resetUserData();
    toast.error(catchError(error));
  }
};

//A simple function to sign out users, clear all sensitive data and redirect to the home page.
export const logoutUser = async () => {
  const keysToDelete = [JWT_SECRET, USER_KEY, ROLE_KEY, 'user'];

  keysToDelete.forEach((key) => {
    localStorage.removeItem(key);
  });

  removeTokenAsCookie();
  removeRoleAsCookie();
  permanentRedirect('/');
};

type UpdateProps = {
  email: string;
  username: string;
  newEmail?: string;
  image?: File;
};

export const updateUser = async ({
  email,
  username,
  image,
  newEmail,
}: UpdateProps) => {
  if (!email || !username) return;

  const formData = new FormData();
  formData.append('email', email);
  formData.append('username', username);
  if (newEmail) formData.append('newEmail', newEmail);
  if (image && typeof image !== 'string') formData.append('image', image);

  try {
    const res = await axios.post<{ message: string; token: string }>(
      BASE_API_URL + '/auth/update',
      formData,
      {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      }
    );

    return res.data.token;
  } catch (error) {
    console.error(error);
    toast.error(catchError(error));
  }
};
