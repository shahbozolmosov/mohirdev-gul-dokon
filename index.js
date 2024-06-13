const express = require("express");
const exphbs = require("express-handlebars");
const db = require("./models");

// App
const app = express();

// Initialize template engine (handlebars)
app.engine(".hbs", exphbs.engine({ extname: ".hbs" }));
app.set("view engine", ".hbs");

// Routes
app.use("/auth", require("./routes/auth.route"));
app.use("/dashboard", require("./routes/dashboard.route"));

// PORT
const PORT = process.env.PORT || 4000;

const start = async () => {
  try {
    const connect = await db.sequelize.sync({ force: true });

    app.listen(PORT, () => {
      console.log(`Server running at ${PORT}`);
    });
  } catch (error) {
    console.log(error);
  }
};

start();
