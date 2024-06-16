const express = require("express");
const dotenv = require("dotenv");
const exphbs = require("express-handlebars");
const session = require("express-session");
const pgStore = require("connect-pg-simple")(session);
const csrf = require("csurf");
const flash = require("connect-flash");
const db = require("./models");
const pool = require("./config/db");

// ENV variables
dotenv.config();

// App
const app = express();

// Initialize requests
app.use(express.json());
app.use(express.urlencoded({ extends: false }));

// Session
app.use(
  session({
    store: new pgStore({
      pool,
      tableName: "user_session",
    }),
    secret: "my secret value",
    resave: false,
    saveUninitialized: false,
  })
);

// Message
app.use(flash());

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
    // const connect = await db.sequelize.sync({ force: true });
    const connect = await db.sequelize.sync();

    app.listen(PORT, () => {
      console.log(`Server running at ${PORT}`);
    });
  } catch (error) {
    console.log(error);
  }
};

start();
