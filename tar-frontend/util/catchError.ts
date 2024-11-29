// Code to handle errors in a consistent way. If the error is an instance of Error, return the error message. Otherwise, log the error to the console and return a generic error message.
export const catchError = (error: unknown) => {
  if (error instanceof Error) {
    return error.message;
  } else {
    console.error(error);
    return 'An error occurred. See the console for more detail.';
  }
};
