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

// comment
db.comment = require("./comment.model")(sequelize, Sequelize);

// region
db.region = require("./region.model")(sequelize, Sequelize);

// order
db.order = require("./order.model")(sequelize, Sequelize);

// payment
db.payment = require("./payment.model")(sequelize, Sequelize);

/* =============== RELATIONSHIP ============== */
// USER

// PRODUCT
db.product.hasMany(db.order, {
  as: "order",
  constraints: true,
});

// REGION
db.region.hasMany(db.order, {
  as: "order",
  constraints: true,
});

// ORDER
db.order.belongsTo(db.product, {
  foreignKey: "productId",
  as: "product",
});
db.order.belongsTo(db.region, {
  foreignKey: "regionId",
  as: "region",
});
db.order.hasOne(db.payment, {
  as: "payment",
  foreignKey: "orderId",
  constraints: true,
});

// PAYMENT
db.payment.belongsTo(db.order, {
  foreignKey: "orderId",
  as: "order",
});

// export
module.exports = db;
