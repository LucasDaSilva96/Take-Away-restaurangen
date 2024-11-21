const { default: mongoose } = require("mongoose");
const app = require("./app");

const PORT = process.env.PORT || 3000;

const { ATLAS_URI } = process.env;

mongoose
  .connect(ATLAS_URI)
  .then(() => {
    console.log("Connected to database");
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.log("Error", err);
  });
