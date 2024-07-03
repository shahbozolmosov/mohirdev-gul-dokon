const db = require("../models");
const Region = db.region;
const Product = db.product;
const Order = db.order;

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
    // Get product
    const product = await Product.findByPk(req.params.productId, {
      raw: true,
    });

    if (!product) {
      req.flash("error", "Product not found");
      return res.redirect(`/${req.params.productId}/order/create`);
    }

    // Create new order
    await Order.create({
      fio: req.body.fio,
      phone: req.body.phone,
      productId: product.id,
      regionId: req.body.region
    });

    return res.status(200).redirect("/");
  } catch (err) {
    console.log(err);
  }
};

module.exports = {
  getNewOrderPage,
  addNewOrder,
};
