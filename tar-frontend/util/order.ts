import axios from "axios";
import { catchError } from "./catchError";
import { Order_Get, Order_Post } from "@/types/order";
import { BASE_API_URL } from "@/constants/localStorageKeys";

// The BASE_API_URL is defined in the .env file and is used to make requests to the backend API.

type Order_Sort = {
  sort: "today" | "week" | "month" | "year" | "all";
};
// getOrders is an async function that makes a GET request to the /order endpoint of the backend API. It returns an array of Order_Get objects.
export const getOrders = async ({ sort }: Order_Sort) => {
  try {
    const response = await axios.get<{ data: Order_Get[] }>(
      BASE_API_URL + "/order" + `?sort=${sort}`
    );

    return response.data.data;
  } catch (error) {
    console.error(error);
    throw new Error(catchError(error));
  }
};

// getOrderById is an async function that makes a GET request to the /order/:id endpoint of the backend API. It returns a single Order_Get object.
export const getOrderById = async (id: string) => {
  try {
    const response = await axios.get<Order_Get>(BASE_API_URL + `/order/${id}`);

    return response.data;
  } catch (error) {
    console.error(error);
    throw new Error(catchError(error));
  }
};

// createOrder is an async function that makes a POST request to the /order endpoint of the backend API. It takes an Order_Post object as an argument and returns an Order_Get object.
export const createOrder = async (order: Order_Post) => {
  try {
    if (!order.guestEmail && !order.userId) {
      throw new Error("User ID or Guest Email is required");
    }
    const response = await axios.post<Order_Get>(
      BASE_API_URL + "/order",
      order
    );

    return response.data;
  } catch (error) {
    console.error(error);
    throw new Error(catchError(error));
  }
};

// updateOrder is an async function that makes a PATCH request to the /order/:id endpoint of the backend API. It takes an Order_Update object as an argument and returns an Order_Get object.
type Order_Update = {
  id: string;
  order: Order_Get;
};
export const updateOrder = async ({ id, order }: Order_Update) => {
  try {
    const response = await axios.patch<Order_Get>(
      BASE_API_URL + `/order/${id}`,
      order
    );

    return response.data;
  } catch (error) {
    console.error(error);
    throw new Error(catchError(error));
  }
};

// deleteOrder is an async function that makes a DELETE request to the /order/:id endpoint of the backend API. It returns a message object.
export const deleteOrder = async (id: string) => {
  try {
    const response = await axios.delete<{ message: string }>(
      BASE_API_URL + `/order/${id}`
    );

    return response.data;
  } catch (error) {
    console.error(error);
    throw new Error(catchError(error));
  }
};
