const Sequelize = require("sequelize");

const sequelize = new Sequelize("flower_shop", "postgres", "secret12", {
  host: "localhost",
  dialect: "postgres",
});

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

// user
db.user = require("./user.model")(sequelize, Sequelize);

// product
db.product = require("./product.model")(sequelize, Sequelize);

// region
db.region = require("./region.model")(sequelize, Sequelize);

// export
module.exports = db;
