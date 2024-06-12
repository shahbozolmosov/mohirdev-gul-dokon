const express = require("express");

// App
const app = express();

// PORT
const PORT = process.env.PORT || 4000;

const start = async () => {
  try {
    app.listen(PORT, () => {
      console.log(`Server running at ${PORT}`);
    });
  } catch (error) {
    console.log(error);
  }
};

start();
