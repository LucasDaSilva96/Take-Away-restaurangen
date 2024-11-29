import axios from 'axios';
import { catchError } from './catchError';
import { User_login_Post, User_Post } from '@/types/user';
// The BASE_API_URL is defined in the .env file and is used to make requests to the backend API.
const BASE_API_URL = process.env.API_URL!;

type User_login_Response = {
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
      BASE_API_URL + '/auth/sign-up',
      { email, password, role }
    );

    return response.data;
  } catch (error) {
    console.error(error);
    throw new Error(catchError(error));
  }
}
