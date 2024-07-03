const db = require("../models");
const Region = db.region;
const Product = db.product;

// Desc       Get new order page
// Route      GET order/:productId/new
// Access     Public
const getNewOrderPage = async (req, res) => {
  try {
    // Get product
    const product = await Product.findByPk(req.params.productId, {
      raw: true,
    });

    if (!product) {
      req.flash("error", "Product not found");
      return res.render("order", {
        title: `New order - Not found`,
        isAuthenticated: false,
        productNotFound: true,
      });
    }

    // Get all regions
    const regions = await Region.findAll({
      raw: true,
    });

    return res.render("order", {
      title: `Order - ${product?.title}`,
      isAuthenticated: false,
      ...product,
      regions,
    });
  } catch (err) {
    console.log(err);
  }
};

// Desc       Create new order
// Route      POST order/:productId/new
// Access     Public
const addNewOrder = async (req, res) => {
  try {
    console.log("🚀 ~ createNewOrder ~ req:", req.body);
    return;
    // Get product
    const product = await Product.findByPk(req.params.productId, {
      raw: true,
    });

    if (!product) {
      req.flash("error", "Product not found");
      return res.redirect(`${req.params.productId}/order/create`);
    }
  } catch (err) {
    console.log(err);
  }
};

module.exports = {
  getNewOrderPage,
  addNewOrder,
};
