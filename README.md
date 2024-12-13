# Take-Away Restaurant

## Introduction

The Take-Away Restaurant project is a web application designed to manage menu items, orders, and user authentication for a take-away restaurant. It leverages a modern tech stack to provide a seamless and efficient experience for both administrators and customers.

![Preview of the home page](/tar-frontend/public/images/take-away-restaurant.png)

## Demo

[www.pizzadeluxe.com](https://take-away-restaurangen.vercel.app/)

## Design

[Figma](https://www.figma.com/design/Kj4Oy9saUWAd0286WyLm98/Design?node-id=0-1&node-type=canvas&t=jfv4UQMasXjsVYpW-0)

## Project / Backlog

[GitHub Project](https://github.com/users/LucasDaSilva96/projects/4)

## Tech Stack

### Frontend

- **React.js**: A JavaScript library for building user interfaces.
- **Next.js**: A React framework for server-side rendering and static site generation.
- **TypeScript**: A statically typed superset of JavaScript.
- **Tailwind CSS**: A utility-first CSS framework for rapid UI development.

### Backend

- **Node.js**: A JavaScript runtime for server-side development.
- **Express.js**: A web framework for building RESTful APIs.
- **MongoDB**: A NoSQL database for storing menu items, orders, and user data.
- **Mongoose**: An ODM for MongoDB, providing schema-based data modeling.

### Additional Tools and Services

- **JWT (JSON Web Tokens)**: For secure user authentication and authorization.
- **bcrypt**: For hashing passwords securely.
- **Cloudinary**: For image storage and management.
- **Multer**: Middleware for handling file uploads.
- **React Toastify**: For displaying notifications.

### Development and Deployment

- **Git**: For version control.
- **GitHub**: For code hosting and collaboration.
- **Vercel**: For deploying the frontend.
- **Heroku**: For deploying the backend.

## Features

- **User Authentication**: Secure login and registration using JWT and bcrypt.
- **Menu Management**: CRUD operations for menu items with image upload support.
- **Order Handling**: Create, update, and delete orders with real-time status updates.

## API Endpoints

### User Routes

- `POST /api/auth/register`: Register a new user.
- `POST /api/auth/login`: User login.

### Menu Routes

- `GET /api/menu`: Get all menu items.
- `GET /api/menu/:id`: Get a single menu item.
- `POST /api/menu`: Create a new menu item.
- `PATCH /api/menu/:id`: Update a menu item.
- `DELETE /api/menu/:id`: Delete a menu item.

### Order Routes

- `GET /api/orders`: Get all orders.
- `GET /api/orders/:id`: Get a single order.
- `POST /api/orders`: Create a new order.
- `PATCH /api/orders/:id`: Update an order.
- `DELETE /api/orders/:id`: Delete an order.

## Installation

### Prerequisites

- Node.js
- MongoDB
- Cloudinary account

### Steps

1. Clone the repository:

   ```bash
   git clone https://github.com/LucasDaSilva96/Take-Away-restaurangen.git
   cd take-away-restaurant
   ```

2. Install dependencies:

```bash
  cd tar-frontend
  npm install
  cd ..tar-backend
  npm install
```

3. Set up environment variables: Create a .env file in the root directory and add the following:

```
JWT_SECRET=your_jwt_secret
CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_API_SECRET=your_cloudinary_api_secret
MONGODB_URI=your_mongodb_uri
```

4. Run the development server:

   ```bash
    cd tar-backend
    npm run dev

   ```

5. Run the NextJS frontend:

   ```bash
      cd tar-frontend
      npm run dev
   ```

6. Open your browser and navigate to **http://localhost:3000**.
