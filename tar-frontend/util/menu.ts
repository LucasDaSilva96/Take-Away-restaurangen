import { Menu_Get } from '@/types/menu';
import axios from 'axios';
import { catchError } from './catchError';
import { BASE_API_URL } from '@/constants/localStorageKeys';
// The BASE_API_URL is defined in the .env file and is used to make requests to the backend API.

// getMenu is an async function that makes a GET request to the /menu endpoint of the backend API. It returns an array of Menu_Get objects.
export async function getMenu() {
  try {
    const response = await axios.get<{ data: Menu_Get[] }>(
      BASE_API_URL + '/menu'
    );

    return response.data.data;
  } catch (error) {
    console.error(error);
    throw new Error(catchError(error));
  }
}

// getMenuById is an async function that makes a GET request to the /menu/:id endpoint of the backend API. It returns a single Menu_Get object.
export async function getMenuById(id: string) {
  try {
    const response = await axios.get<{ data: Menu_Get }>(
      BASE_API_URL + `/menu/${id}`
    );

    return response.data.data;
  } catch (error) {
    console.error(error);
    throw new Error(catchError(error));
  }
}

// createMenu is an async function that makes a POST request to the /menu endpoint of the backend API. It takes a Menu_Get object as an argument and returns the created Menu_Get object.
export async function createMenu(formData: FormData) {
  try {
    console.log(Object.fromEntries(formData.entries()));
    const response = await axios.post<Menu_Get>(
      BASE_API_URL + '/menu',
      formData,
      {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      }
    );

    return response.data;
  } catch (error) {
    console.error(error);
    throw new Error(catchError(error));
  }
}

// updateMenu is an async function that makes a PUT request to the /menu/:id endpoint of the backend API. It takes a Menu_Get object as an argument and returns the updated Menu_Get object.
type MenuPatch = {
  id: string;
  formData: FormData;
  hasImagedUpdated: boolean;
};
export const updateMenu = async ({
  formData,
  id,
  hasImagedUpdated,
}: MenuPatch) => {
  try {
    formData.delete('id');
    formData.delete('_id');
    formData.delete('__v');
    if (!hasImagedUpdated) {
      formData.delete('image');
    }

    const response = await axios.patch<Menu_Get>(
      BASE_API_URL + `/menu/${id}`,
      formData,
      {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error(error);
    throw new Error(catchError(error));
  }
};

// deleteMenu is an async function that makes a DELETE request to the /menu/:id endpoint of the backend API. It takes an id as an argument and returns a success message.
export const deleteMenu = async (id: string) => {
  try {
    const response = await axios.delete<{ message: string }>(
      BASE_API_URL + `/menu/${id}`
    );
    return response.data;
  } catch (error) {
    console.error(error);
    throw new Error(catchError(error));
  }
};
