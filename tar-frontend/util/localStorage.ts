// This is the secret key for the JWT token
const JWT_Secret = process.env.jwtSecret!;

// saveTokenToLocalStorage is a function that takes a JWT token as an argument and saves it to the local storage.
export function saveTokenToLocalStorage(token: string) {
  localStorage.setItem(JWT_Secret, token);
}

// getTokenFromLocalStorage is a function that retrieves the JWT token from the local storage.
export function getTokenFromLocalStorage() {
  return localStorage.getItem(JWT_Secret);
}

// removeTokenFromLocalStorage is a function that removes the JWT token from the local storage.
export function removeTokenFromLocalStorage() {
  localStorage.removeItem(JWT_Secret);
}
