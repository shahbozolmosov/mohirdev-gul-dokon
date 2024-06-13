const express = require("express");
const exphbs = require("express-handlebars");

// App
const app = express();

// Initialize template engine (handlebars)
app.engine(".hbs", exphbs.engine({ extname: ".hbs" }));
app.set("view engine", ".hbs");

// Routes
app.use("/auth", require("./routes/auth.route"));

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
