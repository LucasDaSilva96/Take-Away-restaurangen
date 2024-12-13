import mongoose from "mongoose";
import { app } from "./app.js";
import helmet from "helmet";

// This is the entry point of the application
const PORT = process.env.PORT || 8000;

const cspConfig = helmet.contentSecurityPolicy({
  directives: {
    // Default policy that falls back for missing specific directives
    defaultSrc: ["'self'"],

    // Script sources
    scriptSrc: [
      "'self'",
      "'unsafe-inline'",
      "https://take-away-restaurangen.vercel.app",
    ],

    // Style sources
    styleSrc: [
      "'self'",
      "'unsafe-inline'",
      "https://take-away-restaurangen.vercel.app",
    ],

    // Connect sources (for fetch/XHR requests)
    connectSrc: [
      "'self'",
      "https://take-away-restaurangen.vercel.app",
      "https://take-away-restaurangen.onrender.com",
      "sandbox.smtp.mailtrap.io",
      "https://res.cloudinary.com",
    ],

    // Image sources
    imgSrc: [
      "'self'",
      "data:",
      "https://take-away-restaurangen.vercel.app",
      "https://take-away-restaurangen.onrender.com",
      "sandbox.smtp.mailtrap.io",
      "https://res.cloudinary.com",
    ],

    // Font sources
    fontSrc: ["'self'", "https://take-away-restaurangen.vercel.app"],

    // Object sources (for <object>, <embed>, etc.)
    objectSrc: ["'none'"],

    // Frame sources
    frameSrc: ["'self'", "https://take-away-restaurangen.vercel.app"],

    // Report URI for CSP violations (optional)
    reportUri: "/csp-violation-report-endpoint",

    // Upgrade insecure requests
    upgradeInsecureRequests: [],
  },

  // Additional Helmet CSP options
  reportOnly: false, // Set to true to only report violations without blocking
  setAllHeaders: false, // Only set X-CSP-Header, not other legacy headers
});

app.use(cspConfig);
// This is the connection-url to the database
const { ATLAS_URI } = process.env;

// This is the connection to the database
mongoose
  .connect(ATLAS_URI)
  .then(() => {
    console.log("Connected to database");
    app.listen(PORT, () => {
      console.log(`Server running on port http://localhost:${PORT}`);
    });
  })
  .catch((err) => {
    console.log("Error", err);
  });
