const db = require("../models");
const Product = db.product;

// Desc       Get home page
// Route      GET /
// Access     Public
const getHomePage = async (req, res) => {
  try {
    // Get products
    const products = await Product.findAll({
      raw: true,
    });

    return res.render("main", {
      title: "Home Page",
      isAuthenticated: false,
      products,
    });
  } catch (err) {
    console.log(err);
  }
};

// Desc       Get product details page
// Route      GET /:productId/order
// Access     Public
const getProductDetailsPage = async (req, res) => {
  try {
    // Get product
    const product = await Product.findByPk(req.params.productId, {
      raw: true,
    });

    return res.render("details", {
      title: `Details - ${product?.title}`,
      isAuthenticated: false,
      ...product,
    });
  } catch (err) {
    console.log(err);
  }
};

module.exports = {
  getHomePage,
  getProductDetailsPage,
};
