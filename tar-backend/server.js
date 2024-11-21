const { default: mongoose } = require('mongoose');
const app = require('./app');

// This is the entry point of the application
const PORT = process.env.PORT || 8000;

// This is the connection-url to the database
const { ATLAS_URI } = process.env;

// This is the connection to the database
mongoose
  .connect(ATLAS_URI)
  .then(() => {
    console.log('Connected to database');
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.log('Error', err);
  });
